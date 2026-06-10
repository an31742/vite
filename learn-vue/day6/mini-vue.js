
/**
 *
 * 全局变量
 */
let activeEffect = null
const targetMap = new WeakMap()

/**
 *
 * 异步队列
 */

const queue = [] //设置数组队列

let isFlushPending = false

//如果没有队列就添加上
function queueJob (job) {
  if (!queue.includes(job)) {
    queue.push(job)
  }

  queueFlush()
}


function queueFlush () {
  //如果一开始等待了就是设置为true
  if (isFlushPending) return
  isFlushPending = true

  //在nextTick都是已经把函数添加到微任务为什么在这里还要加入微任务执行
  Promise.resolve().then(() => {
    //设置flag
    isFlushPending = false
    //放在微任务执行
    const jobs = queue.slice() //拷贝避免加入的新干扰
    queue.length = 0
    jobs.forEach(job => job())
  })
}

const resolvedPromise = Promise.resolve()



function nextTick (fn) {
  return resolvedPromise.then(fn)
}



/**
 *
 * 收集依赖和触发
 */
function track (target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)   //设置key

  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)

  activeEffect.deps.push(deps); // 反向收集
}
//如果target有值 就循环effect触发  将trigger加入任务队列
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)

  if (deps) {
    deps.forEach(effect => {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        queueJob(effect)  //在这里执行effect 
      }
    })
  }
}



/**
 *
 * 响应式核心
 */
//通过proxy代理来收集触发
function reactive (target) {
  return new Proxy(target, {

    //拿到的这个key是什么
    get (target, key, receiver) {

      const res = Reflect.get(target, key, receiver) //解析ref
      if (res && res._v_isRef) {
        return res.value
      }
      //收集依赖
      track(target, key)

      //Reflect get又做了什么
      return res
    },
    //什么时候是不是再次调用值变化了就会触发set
    set (target, key, value, receiver) {

      //这个变化进来的值 value 和之前值target[key]
      const oldValue = target[key]
      //Reflect 是做什么用的
      const result = Reflect.set(target, key, value, receiver)

      if (oldValue !== value) {
        //值变化就会触发trigger   触发trigger是怎么更新值的
        trigger(target, key)
      }
      return result;
    }
  })
}


//实现ref

function ref (rawValue) {
  const r = {
    _value: isObject(rawValue) ? reactive(rawValue) : rawValue,  //判断输入的值  如果是对象就走reactive 如果不是对象就使用_value 作为响应式对象
    get value () {
      track(r, "value")  //当读取数据的时候使用 track收集依赖
      return this._value  //拿到当前的值
    },
    set value (newVal) {
      if (newVal !== this._value) {  //如果有新的值修改 首先判断新值和之前的值是否相等不相等 继续判断是否是对象如果是对象就走对象  不是对象还是使用value 更新值
        this._value = isObject(newVal) ? reactive(newVal) : newVal
        trigger(r, 'value')
      }
    }
  }
  return r
}

function toRef (reactiveObj, key) {  //也就是说对象也可以get 读取数据和set 设置数据  toRef接受对象里面的数据设置数据
  const wrapper = {
    get value () {
      return reactiveObj[key]
    },
    set value (val) {
      reactiveObj[key] = val
    }
  }
  return wrapper
}



function toRefs (reactiveObj) {   //将整个ref变味响应式只需要设置对象解析一下就可以了吗这是为什么
  const result = {}
  for (const key in reactiveObj) {
    result[key] = toRef(reactiveObj, key)
  }
  console.log('result', result)  //还有为什么 reactive 不能替换整个对象是因为proxy 只能替换某一个属性吗
  return result
}


function isObject (val) {
  return val !== null && typeof val === "object"
}



/**
 *
 * effect  watch computed
 */

//effect我都可以理解就是不理整体
function effect (fn, options = {}) {
  const { lazy = false, scheduler = null } = options
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    const result = fn()
    activeEffect = null
    return result
  }

  effectFn.deps = []
  effectFn.scheduler = scheduler

  //如果不是懒加载就是立即执行
  if (!lazy) {
    effectFn()
  }
  return effectFn  //是懒加载就是执行effectFn 同时就是执行scheduler
}



function watch (source, cb, options = {}) {
  let oldValue, newValue
  //自定义一个清理函数
  let cleanupFn = null
  const onCleanup = (fn) => { cleanupFn = fn }

  const getter = typeof source === 'function' ? source : () => source  //判断来源是否是一个函数

  const effectFn = effect(
    () => getter(), {
    lazy: true,
    scheduler: () => {
      if (cleanupFn) cleanupFn()
      newValue = getter()  // 修复：直接调用 getter 而不是 effectFn()，避免死循环
      cb(newValue, oldValue, onCleanup)  //这是做什么的
      oldValue = newValue
    }
  })

  //判断是否立即执行
  if (options.immediate) {
    newValue = effectFn()
    cb(newValue, undefined, onCleanup)
    oldValue = newValue  //这样oldValue 和newValue的值不会一样吗
  } else {
    oldValue = effectFn()
  }

  return () => stop(effectFn)
}
function stop (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn))
}



/**
 *
 * 清理依赖工具
 */

function cleanup (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn));
  effectFn.deps.length = 0;  // 清空反向数组
}



function computed (getter) {
  let value;  //设置返回值
  let dirty = true; //设置脏标记
  const effectFn = effect(getter, {  // 修复：直接使用 getter，不要包裹箭头函数  //使用effece以及调度器
    lazy: true, //懒加载
    scheduler: () => {
      dirty = true  // 这个是闭包里面的值所以是私有变量可以缓存
    }
  })

  return {
    // 执行时的返回值
    get value () {
      if (dirty) {
        //如果脏标记为true  get就说明重新再读取的时候获取到的  那就执行那袋返回值同时将脏标记设为false 没有直接返回值
        value = effectFn()
        dirty = false
      }
      return value  //这个是没有通过effect获取为啥还能拿到值 这是上一次缓存的value值
    }
  }
}






const state = reactive({ count: 0 })
let execCount = 0

effect(() => {
  execCount++
  console.log('effect 执行，count:', state.count)
})

// 同步连续修改
state.count = 1
state.count = 2
state.count = 3

console.log('同步代码执行后 execCount:', execCount) // 0

console.log('nextTick执行', state.count)

nextTick(() => {
  console.log('nextTick 中 execCount:', execCount)  // 1
  console.log('最终 count:', state.count)            // 3
})