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
    deps.forEach(effect => {

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
      //收集依赖
      track(target, key)

      //Reflect get又做了什么
      return Reflect.get(target, key, receiver)
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

//调用reactive 拿到a b变为响应式

const state = reactive({ a: 1, b: 2 })

let callCount = 0

//然后使用computed 计算缓存 第一次进入dirty是true所以计算结果拿到值
const sum = computed(() => {
  callCount++
  return state.a + state.b //为什么可以return state.a + state.b  因为getter接收一个函数函数作为参数函数柯里化
})

// console.log(sum.value)  //这里无论怎么读取girty的值都没有变化
// console.log(sum.value)

state.a = 10 //重新设置值函 reactive变化了 通过tirgger发现有scheduler读取scheduler   因为computed调用一次所有effect里面都是compted里面scheduler所以重新设置值就会得到很多

console.log(sum.value)

state.b = 20
state.b = 30

console.log(sum.value)