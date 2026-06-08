## Vue 响应式第三天：`watchEffect` 与 `watch` 原理及实现

### 今日目标
- 理解 `watchEffect` 和 `watch` 的本质——都是基于 `effect` 的封装
- 掌握两者的依赖收集方式、执行时机和清理机制
- 手写简化版 `watchEffect` 和 `watch`
- 深入理解 `oldValue` 的闭包实现与数据流
- 对比 React 的 `useEffect`，写出差异表格

---

### 一、核心基础：`effect` 的功能回顾

在 Day2 中我们实现了一个可停止、可清理的 `effect` 函数：

```js
function effect(fn, options = {}) {
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
  if (!lazy) effectFn()
  return effectFn
}
```

它提供了两个关键能力：
1. **自动依赖收集**：执行 `fn` 时会读取响应式属性，`track` 自动将 `effectFn` 收集为该属性的依赖。
2. **触发控制**：当依赖变化时，`trigger` 会检查 `effectFn.scheduler`。若无调度器则直接执行 `effectFn`；若有调度器，则执行调度器。

`watchEffect` 和 `watch` 正是对这一基础能力的两种不同封装。

---

### 二、`watchEffect`：自动依赖 + 立即执行

#### 1. Vue 3 行为回顾

```js
import { ref, watchEffect } from 'vue'
const count = ref(0)

const stop = watchEffect((onCleanup) => {
  console.log(count.value)
  onCleanup(() => { /* 清理逻辑 */ })
})
count.value++ // 自动重新执行回调
```

- 回调**立即执行一次**，自动收集所有响应式依赖。
- 依赖变化时**同步再次执行**（默认 `flush: 'pre'`）。
- 返回 `stop` 函数可手动停止。
- 通过 `onCleanup` 注册失效回调，在下次执行前或停止时调用。

#### 2. 手写简化版 `watchEffect`

```js
function watchEffect(fn) {
  let cleanupFn = null
  const onCleanup = (cb) => { cleanupFn = cb }

  const effectFn = effect(
    () => {
      if (cleanupFn) cleanupFn()   // 执行上次的清理
      fn(onCleanup)                // 将 onCleanup 传给用户回调
    },
    // 不传入 lazy，使用默认 false，立即执行
  )
  // 返回停止函数
  return () => {
    if (cleanupFn) cleanupFn()
    stop(effectFn)
  }
}
```

**执行流程：**
1. 创建 `effect`，`fn` 中包含用户回调。
2. 因为 `lazy: false`，`effectFn` 立即执行 → 用户回调立即运行 → 依赖被收集。
3. 当任何依赖变化时，`trigger` 发现 `effectFn` 无 `scheduler`，直接再次运行 `effectFn` → 重新执行用户回调（自动拿到新值）。
4. 每次执行前，会先调用 `cleanupFn`（上次用户注册的清理函数）。

**`watchEffect` 数据流：**
```
创建 → effectFn 立即执行 → 用户回调运行 → 读取响应式数据 → track 收集
变化 → trigger → 执行 effectFn → cleanup 清理 → 用户回调重跑 → 看到新值
```

---

### 三、`watch`：指定依赖 + 懒执行 + 新旧值对比

#### 1. Vue 3 行为回顾

```js
import { watch, ref } from 'vue'
const count = ref(0)

watch(
  () => count.value,
  (newVal, oldVal, onCleanup) => {
    console.log(oldVal, '->', newVal)
    onCleanup(() => { /* 清理 */ })
  },
  { immediate: true }
)
```

- **不立即执行回调**（除非 `immediate: true`）。
- 手动指定监听源（getter 函数），依赖精确可控。
- 回调获得**新旧值**。
- 也支持 `onCleanup`。

#### 2. 完整手写实现

```js
function watch(source, cb, options = {}) {
  let oldValue, newValue
  let cleanupFn = null
  const onCleanup = (fn) => { cleanupFn = fn }

  // 统一为 getter 函数
  const getter = typeof source === 'function' ? source : () => source

  const effectFn = effect(
    () => getter(),   // 仅用于依赖收集和取值
    {
      lazy: true,     // 不立即执行
      scheduler: () => {
        if (cleanupFn) cleanupFn()      // 执行上次的清理
        newValue = getter()             // 直接调用 getter 拿最新值
        cb(newValue, oldValue, onCleanup) // 触发用户回调
        oldValue = newValue             // 滚动保存为下一次的旧值
      }
    }
  )

  if (options.immediate) {
    newValue = effectFn()
    cb(newValue, undefined, onCleanup)
    oldValue = newValue
  } else {
    oldValue = effectFn()   // 仅记录初始值，不触发回调
  }

  return () => stop(effectFn)
}
```

**关键机制：调度器 (scheduler)**

`watch` 的核心在于传入 `effect` 的 `scheduler` 选项。

- 传给 `effect` 的 `fn` 是 `() => getter()`，它**只负责读取响应式数据**并返回值，不含任何业务逻辑。
- 当依赖变化时，`trigger` 发现 `effectFn.scheduler` 存在，**不执行 `effectFn` 本身，而是执行 `scheduler`**。
- `scheduler` 中：
  1. 先执行用户注册的清理函数。
  2. 直接调用 `getter()` 获取最新值（避免了重新设置 `activeEffect` 等复杂过程，也防止了死循环）。
  3. 调用用户回调 `cb`，传入新值、旧值、`onCleanup`。
  4. 更新 `oldValue` 为新值，为下一次变化做好准备。

#### 3. `oldValue` 闭包详解

这是 `watch` 中最容易困惑的地方：**为什么 `oldValue` 能够“记住”旧值？**

```js
function watch(source, cb) {
  let oldValue, newValue   // 定义在 watch 作用域内的普通变量

  const scheduler = () => {
    newValue = getter()
    cb(newValue, oldValue)  // 这里使用的 oldValue 是上一轮保存的值
    oldValue = newValue     // 把新值覆盖进去，成为下一次的旧值
  }
  // ...
}
```

- `oldValue` 和 `newValue` 是 `watch` 函数内部的局部变量。
- `scheduler` 定义在同一个作用域内，形成了**闭包**，它可以永远访问这两个变量。
- 初始化时：`oldValue = effectFn()` 将当前值存入 `oldValue`。
- 第一次变化：`scheduler` 执行时，`oldValue` 仍然是初始值；回调结束后 `oldValue = newValue` 被更新为第一次变化后的值。
- 第二次变化：`scheduler` 再次执行，此时闭包中的 `oldValue` 已经变成了第一次变化后的值，完美充当“旧值”。

**并不是 `cb` 缓存了值，而是闭包变量 `oldValue` 替我们保留了上一次的状态。**

形象比喻：闭包就像一个保险箱，`oldValue` 是箱子里的一张纸条。每次数据变化时，`scheduler` 拿出纸条看一眼（旧值），记下新值，然后把纸条擦掉写上最新的值（更新 `oldValue`），关箱走人。下次再打开时，纸条上就是上次的值。

#### 4. `watch` 数据流

```
创建阶段：
  watch(getter, cb)
  → 创建 effect({ lazy: true, scheduler })
  → 手动执行 oldValue = effectFn() → getter 运行 → track 收集
  → 用户的 cb 仍未执行

变化阶段：
  state.count = 10
  → trigger 找到 effectFn
  → 发现有 scheduler → 执行 scheduler()
      → cleanupFn()
      → newValue = getter() → 10
      → cb(10, oldValue(0))   // 输出 0 -> 10
      → oldValue = 10
```

---

### 四、`watchEffect` vs `watch` 对比表

| 特性 | `watchEffect` | `watch` |
|------|--------------|--------|
| **回调执行时机** | 立即执行一次，之后每次依赖变化再执行 | 默认不执行，只在监听源变化时执行 |
| **依赖收集** | 自动收集回调内所有响应式依赖 | 仅收集 getter 中读取的确定依赖 |
| **是否获取旧值** | 否（无法知道之前的值） | 是（通过闭包变量 `oldValue` 滚动记录） |
| **调度器** | 无，直接重跑 effectFn | 有 `scheduler`，拦截 effectFn 的执行 |
| **清理方式** | `onCleanup` 回调 | `onCleanup` 回调 |
| **典型场景** | 副作用与多个状态关联，无需旧值对比 | 需要精确监听某个值的变化并对比 |

---

### 五、与 React `useEffect` 的对比

| 维度 | React `useEffect` | Vue `watchEffect` | Vue `watch` |
|------|-------------------|-------------------|-------------|
| 依赖声明 | 手动声明依赖数组 | 自动收集 | 手动指定监听源 |
| 首次执行 | 默认执行（挂载后） | 默认执行 | 默认不执行（`immediate` 可开启） |
| 执行时机 | 渲染后异步（`commit` 后） | 依赖变化时同步（默认 `pre`） | 监听源变化时同步 |
| 清理函数 | 返回一个清理函数 | `onCleanup` 参数注册 | `onCleanup` 参数注册 |
| 获取旧值 | 无直接支持（需 `useRef` 记录） | 不支持 | 回调提供 `oldVal` / `newVal` |

---

### 六、定时器清理示例（Vue 写法对比 React）

#### React
```jsx
function Timer() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000)
    return () => clearInterval(id)
  }, [])
}
```

#### Vue（`watchEffect`）
```vue
<script setup>
import { ref, watchEffect } from 'vue'
const count = ref(0)

watchEffect((onCleanup) => {
  const id = setInterval(() => count.value++, 1000)
  onCleanup(() => clearInterval(id))
})
</script>
```

注意：Vue 的 `watchEffect` 会在依赖变化时重建整个副作用，所以通常用于依赖不变或需要动态重建的场景。如需确保只启动一次定时器，应使用 `onMounted` + `onUnmounted`。

---

### 七、今日成果检验

用下面的代码验证自己的理解，追踪每一步的变量值：

```js
const state = reactive({ count: 0 })

watchEffect(() => {
  console.log('watchEffect:', state.count)
})

watch(
  () => state.count,
  (newVal, oldVal) => {
    console.log(`watch: ${oldVal} -> ${newVal}`)
  }
)

state.count = 1
state.count = 2
```

**预期输出与内部状态**

| 步骤 | 输出 | 内部状态 |
|------|------|----------|
| 初始化 | `watchEffect: 0` | watchEffect 的 effectFn 被收集为依赖；watch 的 oldValue = 0，effectFn 也被收集 |
| `state.count = 1` | `watchEffect: 1`<br>`watch: 0 -> 1` | watchEffect 的 effectFn 直接重跑；watch 的 scheduler 运行：getter → 1，cb(1,0)，oldValue = 1 |
| `state.count = 2` | `watchEffect: 2`<br>`watch: 1 -> 2` | 同上，oldValue 已经是 1，可以正确输出 1 -> 2 |

---

### 八、今日总结

- **`watchEffect`** = 自动依赖收集 + 立即执行 + 无新旧值。本质上就是一个带有自动清理的 `effect`。
- **`watch`** = 手动指定监听源 + 懒执行 + 新旧值。核心是通过 `scheduler` 拦截 `effectFn` 的执行，在调度器中取值并调用回调。
- **旧值的秘密** 不是特殊 API，而是利用闭包变量 `oldValue`，每次调度器执行后滚动更新。
- **调度器 (`scheduler`) 的存在** 使得 `watch` 能够解耦“追踪依赖”和“业务回调”，并安全地避免死循环。
- 两者均可通过 `onCleanup` 或 `stop` 进行副作用清理。

> **明日预告**：Day4 将学习 `computed` 的实现，它采用类似的惰性求值与缓存机制，是 `watch` 的一种“纯计算”变体。今天掌握的 `scheduler` 和闭包思想将直接复用。