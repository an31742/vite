## Vue 响应式第六天：调度器与异步更新队列

### 今日目标
- 理解 Vue 3 为何需要异步批量更新
- 手写简易调度器：`queueJob` + 微任务刷新
- 实现 `nextTick`，掌握其与 Event Loop 的关系
- 将 `trigger` 升级为异步队列模式
- 对比 React 调度机制，明确设计差异

---

### 一、为什么要异步批量更新？

早期手写的 `trigger` 是同步的，数据一变就立即执行所有依赖的 `effect`：

```js
function trigger(target, key) {
  deps.forEach(effect => effect())
}
```

如果在同一段代码中多次修改响应式数据，会触发多次无意义的副作用执行：

```js
state.count = 1
state.name = 'Vue'
// 同步模式下会触发两次 effect，中间结果可能被不必要地渲染
```

Vue 3 实际采用**异步队列**的方式：同一个事件循环（Event Loop）中，多次数据变更只会触发一次副作用的执行和一次 DOM 更新。

**核心原理**：
- 将需要执行的 `effect` 放入一个任务队列，并进行去重。
- 通过微任务（`Promise.then`）统一在下一个微任务中执行队列中的所有任务。
- 用户可在数据变更后通过 `nextTick` 获取更新后的 DOM 或最新状态。

---

### 二、手写调度器：`queueJob` 与 `queueFlush`

#### 1. 基础版（`queueFlush` 内部创建 Promise）

```js
const queue = []                // 任务队列
let isFlushPending = false     // 是否已经安排了刷新任务

function queueJob(job) {
  // 去重：同一个 effect 不重复入队
  if (!queue.includes(job)) {
    queue.push(job)
  }
  queueFlush()                 // 尝试安排刷新
}

function queueFlush() {
  // 已经安排过微任务了，等待执行即可，无需重复安排
  if (isFlushPending) return
  isFlushPending = true

  // 利用微任务延迟执行队列
  Promise.resolve().then(() => {
    isFlushPending = false
    // 拷贝当前队列，避免在执行过程中新增的 job 影响当前轮次
    const jobs = queue.slice()
    queue.length = 0
    jobs.forEach(job => job())
  })
}
```

**执行流程**：
- 第一次调用 `queueJob(job)` 时，`job` 入队，`queueFlush` 创建一个微任务。
- 微任务执行时，`isFlushPending` 重置为 `false`，队列中的 `job` 依次执行。
- 若在同一个同步块中多次触发同一个 `job`，`queue.includes(job)` 会阻止重复添加，并且 `isFlushPending = true` 会阻止重复创建微任务。

#### 2. 升级版：统一 `resolvedPromise`

为了提高可复用性，可以创建一个统一的已决议 Promise，让 `queueFlush` 和 `nextTick` 共用：

```js
const resolvedPromise = Promise.resolve()

function queueFlush() {
  if (isFlushPending) return
  isFlushPending = true
  // 复用 resolvedPromise
  resolvedPromise.then(() => {
    isFlushPending = false
    const jobs = queue.slice()
    queue.length = 0
    jobs.forEach(job => job())
  })
}
```

---

### 三、`nextTick` 的实现

`nextTick` 允许在 DOM 更新完成后执行回调。它依赖于同一个 `resolvedPromise`，保证其回调在队列刷新之后执行。

```js
function nextTick(fn) {
  return resolvedPromise.then(fn)
}
```

**调用时机**：
- 在同一轮事件循环的同步代码最后调用 `nextTick(fn)`。
- `fn` 会被包装为微任务，并排在 `queueFlush` 的微任务之后执行，因此它运行时队列已经清空，DOM 也已更新（因为组件更新 effect 已经执行）。

**验证示例**：

```js
const state = reactive({ count: 0 })
effect(() => console.log('effect:', state.count))

state.count = 1
state.count = 2
state.count = 3

console.log('同步代码结束')
nextTick(() => {
  console.log('nextTick: DOM 已更新，最终 count =', state.count)
})
```

输出顺序：
```
同步代码结束
effect: 3
nextTick: DOM 已更新，最终 count = 3
```

---

### 四、升级 `trigger`：接入异步队列

把之前的 `trigger` 从同步执行改为通过 `queueJob` 入队：

```js
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (deps) {
    deps.forEach(effect => {
      // 如果 effect 有 scheduler（如 watch、computed），交给它处理
      // 否则，将 effect 本身推入异步队列
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        queueJob(effect)
      }
    })
  }
}
```

**注意**：
- 对于 `watch` / `computed`，它们的 `scheduler` 负责自定义逻辑（比较新旧值、标记脏等），不会通过 `queueJob` 重复入队。
- 普通的组件渲染 `effect` 和 `watchEffect` 的 `effect` 没有 `scheduler`，会进入异步队列，享受批量去重的优化。

---

### 五、整个响应式系统协作示意图

```
用户代码：state.count = 1
  → proxy set → trigger(target, 'count')
    → deps 中的 effect
      ├─ 有 scheduler？ → 执行 scheduler（自定义逻辑）
      └─ 无 scheduler？ → queueJob(effect)
          ├─ 加入 queue（去重）
          └─ queueFlush() → 注册微任务 A

用户调用 nextTick(callback) → 注册微任务 B

同步代码结束
  ↓ 开始微任务
微任务 A：执行 queue 中所有 effect → 更新 DOM
微任务 B：执行 callback → 可安全读取更新后的 DOM / 状态
```

---

### 六、与 React 调度机制的对比

| 维度 | Vue 3 | React 18 |
|------|-------|----------|
| 更新触发方式 | 依赖变化 → `trigger` → 入队 | `setState` → 调度更新 |
| 批量策略 | 同步代码后微任务统一执行 | 合成事件、生命周期等自动批处理（18 之后全面支持） |
| 可中断性 | 不可中断（一个 effect 必须执行完） | 可中断（Fiber 架构，可暂停和恢复） |
| 优先级概念 | 无（所有 effect 一视同仁） | 有 Lane 优先级模型，`startTransition` 可降低优先级 |
| 用户钩子 | `nextTick` | `flushSync`（强制同步） |
| 队列设计 | 单一队列 + 去重 | 多优先级 Lane 调度，可插队 |

**设计哲学差异**：
- Vue 的响应式系统细粒度极高，更新开销小，所以采用“不可中断 + 微任务批处理”是简洁高效的。
- React 基于组件树整体重渲染，计算开销可能很大，必须通过可中断的并发模式避免长时间占用主线程。

---

### 七、今日产出

- ✅ 手写调度器核心：`queueJob`、`queueFlush`
- ✅ 实现 `nextTick`
- ✅ `trigger` 升级为异步队列模式
- ✅ 明确 `scheduler` 与 `queueJob` 的分工
- ✅ Vue 与 React 调度机制对比

> **核心理解**：  
> Vue 的响应式系统通过异步队列将同一事件循环内的多次数据变更合并为一次副作用执行，实现自动批处理。  
> `queueFlush` 利用微任务延迟执行，`nextTick` 则挂在同一个微任务链上，确保用户回调在所有副作用执行完毕后触发。  
> 这种设计在保持简洁的同时，达到了与 React 类似的批量更新效果，但实现路径截然不同。

> **明日预告**：Day7 将学习 Vue 的 Patch 算法与 Diff 机制，理解双端对比和组件更新细节，并对比 React 的 Diff 策略。