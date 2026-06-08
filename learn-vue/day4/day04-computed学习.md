## Vue 响应式第四天：`computed` 原理与手写实现

### 今日目标
- 理解 `computed` 的惰性求值与缓存机制
- 手写简化版 `computed`
- 掌握 `dirty` 标记与 `scheduler` 的配合
- 搞懂数据变化时 `computed` 如何感知并重新计算
- 对比 `computed`、`watch`、`watchEffect` 及 React `useMemo`

---

### 一、`computed` 的核心特性

```js
const state = reactive({ a: 1, b: 2 })
const sum = computed(() => state.a + state.b)

console.log(sum.value) // 3
console.log(sum.value) // 3 (缓存命中，不重新计算)
state.a = 10
console.log(sum.value) // 12 (依赖变化后才重新计算)
```

- 接受一个 **getter 函数**，返回一个**只读响应式对象**（通过 `.value` 访问结果）。
- **惰性求值**：创建时不计算，只在第一次读取 `.value` 时才执行 getter。
- **自动缓存**：依赖没变时，多次读取直接返回上一次缓存的结果，getter 不会执行。
- **依赖变化时只打脏标记**，不立即计算，等下次读取时再重新计算。

---

### 二、手写 `computed` 实现

```js
function computed(getter) {
  let value          // 缓存的计算结果
  let dirty = true   // 脏标记：true 表示需要重新计算

  const effectFn = effect(
    () => getter(),   // effect 的 fn，只负责取值和依赖收集
    {
      lazy: true,     // 不立即执行
      scheduler: () => {
        dirty = true  // 依赖变化时仅标记为脏，不立刻计算
      }
    }
  )

  return {
    get value() {
      if (dirty) {
        value = effectFn()   // 执行 getter，重新收集依赖，拿到最新值
        dirty = false
      }
      return value           // 返回缓存值（新或旧）
    }
  }
}
```

#### 逐行解析

- **`let value`**  
  闭包变量，存储最后一次的计算结果。初始为 `undefined`。

- **`let dirty = true`**  
  脏标记。初始为 `true` 保证第一次读取 `.value` 时会执行 getter。  
  后续依赖变化时由 `scheduler` 设为 `true`，读取时重新计算并重置为 `false`。

- **`effect(() => getter(), { lazy: true, scheduler })`**  
  创建一个 `effectFn`，但它不会自动执行（`lazy: true`）。  
  传给 `effect` 的 `fn` 是 `() => getter()`，调用 `effectFn()` 时会运行 getter 并返回结果。  
  同时挂载了一个 `scheduler` 函数，当依赖变化时，**`trigger` 会执行这个 `scheduler` 而不是 `effectFn`**。

- **`scheduler: () => { dirty = true }`**  
  这个箭头函数被保存在 `effectFn.scheduler` 上。  
  当任何一个依赖（如 `state.a`）变化时，`trigger` 发现该 `effectFn` 有 `scheduler`，就调用它，仅将 `dirty` 置为 `true`。  
  **注意**：此时 `value` 不会被清除，仍然保留旧值。

- **`get value()`**  
  通过 getter 拦截 `.value` 的读取。  
  如果 `dirty === true`（首次或依赖已变化），调用 `effectFn()` 重新执行 getter，用最新结果更新 `value`，然后将 `dirty` 重置为 `false`。  
  如果 `dirty === false`，直接返回缓存的 `value`，完全不执行 getter。

---

### 三、完整数据流剖析

#### 1. 初始化 `computed`
- 只创建 `effectFn` 和闭包变量，**不执行任何 getter**。
- 此时没有任何依赖关系。

#### 2. 首次读取 `sum.value`
```
get value()  → dirty = true
  → value = effectFn()
    → 执行 cleanup (首次无操作)
    → activeEffect = effectFn
    → 运行 getter() → 读取 state.a, state.b → track 将 effectFn 收集为这两个属性的依赖
    → activeEffect = null
    → 返回计算结果（例如 3）
  → value = 3, dirty = false
  → 返回 3
```

#### 3. 修改依赖 `state.a = 10`
```
Proxy set → trigger(state, 'a')
  → 从 deps 中找到 effectFn
  → 发现 effectFn.scheduler 存在 → 执行 scheduler()
    → scheduler 只做 dirty = true
  → 不执行 effectFn，value 仍为 3
```

#### 4. 再次读取 `sum.value`
```
get value() → dirty = true
  → value = effectFn()
    → cleanup 清空上一轮的依赖关系
    → activeEffect = effectFn
    → 运行 getter() → 读取 state.a (10), state.b (2) → track 重新收集依赖
    → activeEffect = null
    → 返回 12
  → value = 12, dirty = false
  → 返回 12
```

**关键点总结：**
- `trigger` → `scheduler` → 只改 `dirty`，不计算。
- `.value` 的 getter → 检查 `dirty` → 如果脏，调用 `effectFn()` 计算。
- `effectFn` 负责取值并重建依赖。

---

### 四、与 `watch` / `watchEffect` 的对比

| 特性 | `computed` | `watch` | `watchEffect` |
|------|-----------|--------|---------------|
| 目的 | 派生一个**新值** | 观察变化，执行**副作用** | 自动收集依赖，执行**副作用** |
| 返回值 | 响应式引用（`.value`） | `stop` 函数 | `stop` 函数 |
| 执行时机 | 惰性（读取时计算） | 依赖变化时执行回调 | 立即执行 + 依赖变化 |
| 缓存 | **有**（依赖不变返回旧值） | 无 | 无 |
| 新旧值 | 仅最新结果 | 回调提供 `(newVal, oldVal)` | 无 |

---

### 五、与 React `useMemo` 的对比

| 维度 | Vue `computed` | React `useMemo` |
|------|----------------|-----------------|
| 依赖收集 | 自动（getter 内读取时收集） | 手动声明依赖数组 |
| 执行时机 | 惰性：仅在读取 `.value` 且依赖变化时执行 | 每次渲染时检查依赖数组，变化则执行 |
| 缓存持久性 | 持久，直到依赖再次变化 | 仅当次渲染有效，下次渲染可能重新计算 |
| 本质 | 独立的响应式数据源 | 渲染优化手段，避免重复高开销计算 |

---

### 六、常见疑问解答

**Q1：为什么 `computed` 接受函数，而不是直接传值？**  
A：如果直接传值（如 `computed(state.a + state.b)`），表达式会**立即计算**，变成一个固定数字，无法响应变化。  
传入函数可以保留计算逻辑，由 `computed` 内部在合适的时机执行，并在此过程中自动追踪依赖。  
这是**高阶函数**（回调模式），不是柯里化。

**Q2：为什么 `return value` 能直接拿到值，而不需要每次都调用 effect？**  
A：`value` 是闭包变量，存储着上一次的计算结果。  
当 `dirty` 为 `false` 时，说明依赖没变，缓存仍然有效，直接返回 `value` 即可。  
只有当 `dirty` 为 `true` 时，才通过 `effectFn()` 更新 `value`。

**Q3：依赖变化后，`computed` 为什么能感知？全靠 `scheduler` 吗？**  
A：没错。依赖变化 → `trigger` → 发现 `effectFn` 有 `scheduler` → 执行 `scheduler` → 将 `dirty` 设为 `true`。  
但 `scheduler` **不负责计算**，它只是“通知”缓存失效。  
真正的计算发生在下次读取 `.value` 的时候，由 `get value()` 调用 `effectFn()` 完成。

**Q4：`effectFn` 和 `scheduler` 的关系是什么？**  
A：`effectFn` 是普通副作用函数，调用它会执行 getter、收集依赖并返回值。  
`scheduler` 是挂在 `effectFn` 上的一个可选函数，依赖变化时 `trigger` 会优先调用它，而不是 `effectFn`。  
`computed` 利用 `scheduler` 拦截了默认的“依赖一变就执行副作用”的行为，改为“依赖一变仅标记脏”，把实际计算推迟到了读值时刻。

---

### 七、今日产出

- ✅ 手写 `computed` 实现（基于 `effect` + `scheduler`）
- ✅ 完整数据流图（初始化 → 首次计算 → 依赖变化 → 再次读取）
- ✅ `computed` / `watch` / `watchEffect` 功能对比表
- ✅ Vue `computed` vs React `useMemo` 对比
- ✅ 多个核心疑问的深度解答

---

> **明日预告**：Day5 将深入 `ref` 与 `reactive` 的源码区别，手写 `ref` 简易实现，理解为什么基本类型需要 `.value`，以及 `ref` 如何将普通值变成响应式。今天 `computed` 返回的 `.value` 对象正是借鉴了 `ref` 的设计模式。