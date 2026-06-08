let activeEffect = null
const targetMap = new WeakMap()



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
//如果target有值 就循环effect触发
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)

  if (deps) {
    // 拷贝一份 Set，避免 effect 执行时 cleanup+track 导致无限循环
    const effectsToRun = new Set(deps)
    effectsToRun.forEach(effect => {

      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect()
      }
    }
    )
  }
}


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

const count = ref(0)
effect(() => console.log(count.value))
count.value = 1   // 输出 1


const refNum = ref(0) //通过ref设置0
const reactiveObj = reactive({ count: 0 })  //通过reacttive设置count

effect(() => console.log('ref:', refNum.value))
effect(() => console.log('reactive:', reactiveObj.count))

refNum.value = 10      // 触发 effect
reactiveObj.count = 20 // 触发 effect


const state = reactive({ a: 1, b: 2 })
const { a, b } = toRefs(state)
console.log(a.value) // 1
a.value = 100
console.log(state.a) // 100，保持响应式