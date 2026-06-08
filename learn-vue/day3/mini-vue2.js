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
    cleanup(effectFn)  //为什么要清理
    activeEffect = effectFn  // 监听执行
    const result = fn()
    activeEffect = null  //情况运行
    return result //return 直接返回fn不可以吗
  }

  effectFn.deps = []
  effectFn.scheduler = scheduler

  //如果不是懒加载就是立即执行
  if (!lazy) {
    effectFn()
  }
  return effectFn
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



const state = reactive({ count: 0 })

watch(
  () => state.count,   // 监听 getter
  (newVal, oldVal, onCleanup) => {
    console.log('变化:', oldVal, '->', newVal)
    onCleanup(() => console.log('清理'))
  }
)

state.count = 1   // 变化: 0 -> 1
state.count = 2   // 先输出“清理”，再输出“变化: 1 -> 2”