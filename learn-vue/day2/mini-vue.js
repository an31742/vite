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

//副作用方法 effectFn 这个应该是一个闭包这个方法是做什么用的
function effect (fn) {
  const effectFn = () => {
    activeEffect = effectFn;
    fn()
    activeEffect = null

  }

  effectFn.deps = []
  effectFn()
  return effectFn;
}


function stop (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn))
}



function cleanup (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn));
  effectFn.deps.length = 0;  // 清空反向数组
}
// const state = reactive({ count: 0, name: 'Vue' });

// effect(() => {
//   console.log('effect1 执行: count =', state.count);
// })

// effect(() => {
//   console.log('effect2 执行: name =', state.name);
// });


// console.log('--- 修改 count ---');
// state.count = 1;  // 只触发 effect1

// console.log('--- 修改 name ---');
// state.name = 'Vue3'; // 只触发 effect2

// console.log('--- 修改 count 为相同值 ---');
// state.count = 1;  // 没有变化，不应触发（因为我们加了 oldValue !== value 判断）

const state = reactive({ count: 0 });

// 创建一个 effect，并保存返回值
const myEffect = effect(() => {
  console.log('count:', state.count);
});

// 正常触发
state.count = 1;   // 输出 count: 1

// 停止该 effect
// stop(myEffect);
// cleanup(myEffect)
// 再次修改，不会再输出任何内容
state.count = 2;   // 无输出

