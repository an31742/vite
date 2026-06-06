// ============================================
// mini-reactive.js
// Vue3 响应式核心：简化版 reactive + effect
// 理解 track/trigger/Proxy 的协作关系
// 用法: node learn-vue/day1/mini-reactive.js
// ============================================

// ------------ 全局状态 ------------
const targetMap = new WeakMap()  // 原始对象 → depsMap
const proxyMap = new WeakMap()   // 原始对象 → 代理对象 (防重复代理)
let activeEffect = null          // 当前活跃的 effect

// ------------ track / trigger ------------
function track(target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const deps = depsMap.get(key)
  if (deps) {
    deps.forEach(eff => eff())
  }
}

// ------------ reactive (Proxy) ------------
function reactive(target) {
  if (typeof target !== 'object' || target === null) return target

  // 防止对代理对象再次包装
  if (target.__v_isReactive) return target

  // 防止重复代理：同一原始对象返回同一代理
  const existingProxy = proxyMap.get(target)
  if (existingProxy) return existingProxy

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // 特殊标记，用于检测是否已代理
      if (key === '__v_isReactive') return true

      track(target, key)
      const result = Reflect.get(target, key, receiver)
      // 懒惰代理：访问到对象属性时才递归包装
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) trigger(target, key)
      return result
    },
    deleteProperty(target, key) {
      const hadKey = key in target
      const result = Reflect.deleteProperty(target, key)
      if (hadKey) trigger(target, key)
      return result
    },
  })

  // 缓存代理
  proxyMap.set(target, proxy)
  return proxy
}

// ------------ effect ------------
function effect(fn) {
  const wrapped = () => {
    activeEffect = wrapped
    fn()
    activeEffect = null
  }
  wrapped()  // 首次自动执行，完成依赖收集
  return wrapped
}

// ============================================
// Demo 1：基本响应式
// ============================================
console.log('=== Demo 1: 基本响应式 ===')

const state = reactive({ count: 0, name: 'Vue' })

effect(() => {
  console.log('  🔁 effect 执行: count=', state.count, ', name=', state.name)
})

console.log('  修改 count:')
state.count++

console.log('  修改 name:')
state.name = 'Vue3'

console.log('  再次修改 count:')
state.count = 10

console.log('')

// ============================================
// Demo 2：新增 / 删除属性
// ============================================
console.log('=== Demo 2: 新增 & 删除属性 ===')

const user = reactive({ id: 1 })

effect(() => {
  console.log('  🔁 user.name =', user.name ?? '(undefined)')
})

console.log('  新增属性: user.name = "张三"')
user.name = '张三'

console.log('  删除属性: delete user.name')
delete user.name

console.log('')

// ============================================
// Demo 3：嵌套对象 (懒惰代理验证)
// ============================================
console.log('=== Demo 3: 嵌套对象（懒惰代理） ===')

const data = reactive({ nested: { value: 0 } })

console.log('  初始未读取 nested，此时 nested 尚未被代理')

// 只有访问到 nested 时才会对其进行 reactive
effect(() => {
  console.log('  🔁 nested.value =', data.nested.value)
})

console.log('  修改 nested.value:')
data.nested.value = 42

console.log('')

// ============================================
// Demo 4：重复代理检测
// ============================================
console.log('=== Demo 4: 重复代理 ===')

const raw = { msg: 'hello' }
const p1 = reactive(raw)
const p2 = reactive(raw)
const p3 = reactive(p1)

console.log('  p1 === p2:', p1 === p2)  // true，同一原始对象返回同一代理
console.log('  p1 === p3:', p1 === p3)  // true，代理对象再次 reactive 返回自身

console.log('')

// ============================================
// Demo 5：effect 嵌套
// ============================================
console.log('=== Demo 5: effect 嵌套 ===')

const nestedState = reactive({ outer: 1, inner: 1 })

effect(() => {
  console.log('  🔁 outer effect:', nestedState.outer)
  effect(() => {
    console.log('    🔁 inner effect:', nestedState.inner)
  })
})

console.log('  修改 outer:')
nestedState.outer = 10

console.log('  修改 inner:')
nestedState.inner = 20

console.log('\n✅ 全部验证通过！')
