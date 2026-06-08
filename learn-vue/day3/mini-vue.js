let activeEffect = null
const targetMap = new WeakMap()


//大概意思明白 判断是否有值就收集  为什么已经有targetMap 还要重新设置一个depsmap  depsMap和targetMap
// targetMap 明明已经有target 为什么还要depsMap收集key
function track (target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())) //如果targetMap有值就要设置
  }

  let deps = depsMap.get(key)   //设置key

  if (!deps) {  //如果为空没有值就冲洗设置值
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)   //酒后添加activeEffect

  activeEffect.deps.push(deps); // 反向收集
}
//如果target有值 就循环effect触发
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)

  if (deps) {
    deps.forEach(effect => effect())
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



//watcheffect 简化写法学习

function watchEffect (fn) {
  //自定义一个清理函数
  let cleanupFn = null
  //执行清理函数
  const onCleanup = (fn) => { cleanupFn = fn }

  const effectFn = () => {
    if (cleanupFn) {
      cleanupFn()
    }
    activeEffect = effectFn
    fn(onCleanup)
    activeEffect = null
  }
  //收集依赖
  effectFn.deps = []
  effectFn()
  return () => {
    if (cleanupFn) cleanupFn() //为什么要执行两遍 为什么上面判断了一遍这边还要判断一遍
    stop(effectFn)
  }
}
function stop (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn))
}



function cleanup (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn));
  effectFn.deps.length = 0;  // 清空反向数组
}



const state = reactive({ count: 0 })

const stopWatcher = watchEffect((onCleanup) => {
  console.log('count:', state.count)
  onCleanup(() => {
    console.log('清理 count =', state.count)
  })
})

state.count = 1   // 先输出清理 count = 0，再输出 count: 1
state.count = 2   // 先输出清理 count = 1，再输出 count: 2
stopWatcher()     // 输出清理 count = 2
state.count = 3