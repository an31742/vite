## Vue 响应式第二天：手写 effect 与依赖收集（完整笔记）

### 今日目标
- 理解 Vue3 响应式系统的核心三角：`reactive` → `track` → `trigger` → `effect`
- 手写一个简易版 `effect` 函数，能自动追踪依赖并在数据变化时重新运行
- 逐行理解依赖存储的三层结构：`targetMap` → `depsMap` → `deps`
- 掌握 `stop`（手动永久停止）和 `cleanup`（自动清理旧依赖）的实现与用途

---

### 一、为什么需要三层依赖结构？

你提出的问题：“既然已经有 `targetMap`，为什么还要 `depsMap` 和 `deps`？” 这个设计是为了**精确追踪哪个对象（target）的哪个属性（key）被哪些副作用（effect）依赖**。

#### 1. 三层结构的职责

```js
targetMap: WeakMap<target, depsMap>
depsMap:   Map<key, deps>
deps:      Set<effect>
```

| 层级 | 存储结构 | 键 | 值 | 作用 |
|------|---------|----|----|------|
| **第一层** `targetMap` | `WeakMap` | 响应式对象（如 `state`） | `depsMap` | 区分不同的响应式对象 |
| **第二层** `depsMap` | `Map` | 属性名（如 `"count"`） | `deps` | 区分同一个对象的不同属性 |
| **第三层** `deps` | `Set` | — | 依赖该属性的所有 `effect` | 收集需要重新执行的副作用 |

#### 2. 为什么不能只用一层？

假设把所有依赖全放在一个全局 `Set` 中：

```js
// ❌ 错误设计
globalDeps = new Set();

function track(target, key) {
  if (activeEffect) globalDeps.add(activeEffect);
}

function trigger(target, key) {
  globalDeps.forEach(e => e()); // 一个属性变了，所有 effect 都执行
}
```

修改 `state.count` 时，连只依赖 `state.name` 的 `effect` 也会被执行，违背了 Vue 的**细粒度更新**原则。

**三层结构就是为了精准配对**：修改 `state.count` → 只触发依赖 `state.count` 的那些 `effect`。

#### 3. 逐层解析

- **第一层 `targetMap`（WeakMap）**  
  `targetMap: { state → depsMap }`  
  键：响应式对象（如 `state`），值：一个 `Map`。  
  使用 `WeakMap` 的好处：当对象不再被引用时，垃圾回收可自动清理该对象的所有依赖记录，防止内存泄漏。

- **第二层 `depsMap`（Map）**  
  `depsMap: { "count" → deps, "name" → deps }`  
  键：属性名，值：一个 `Set`，存储所有依赖该属性的 `effect`。

- **第三层 `deps`（Set）**  
  `deps: { effectFn1, effectFn2 }`  
  存储包装后的 `effectFn`（即我们定义的箭头函数）。`Set` 保证不重复收集。当属性变化时，遍历此 `Set` 执行所有 `effect`。

#### 4. 完整流程示例

```js
const state = reactive({ count: 0, name: 'Vue' })

effect(() => { console.log(state.count) })   // track(state, 'count')
effect(() => { console.log(state.name) })    // track(state, 'name')
```

执行后 `targetMap` 结构：

```
targetMap (WeakMap) = {
  state → Map {
    "count" → Set { effectFn1 },
    "name"  → Set { effectFn2 }
  }
}
```

修改 `state.count = 1` 只会执行 `effectFn1`，修改 `state.name = 'Vue3'` 只会执行 `effectFn2`。这就是精准更新的秘密。

---

### 二、完整代码实现（含 `stop` 和 `cleanup`）

以下是可直接运行的最小响应式引擎，包含了反向收集、`stop` 和 `cleanup` 机制。

```js
let activeEffect = null
const targetMap = new WeakMap()

// ========== 依赖收集 ==========
function track (target, key) {
  if (!activeEffect) return            // 无活跃 effect，不收集

  let depsMap = targetMap.get(target)  // 获取对象的依赖表
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())) // 不存在则创建
  }

  let deps = depsMap.get(key)          // 获取属性的依赖集合
  if (!deps) {
    depsMap.set(key, (deps = new Set())) // 不存在则创建
  }

  deps.add(activeEffect)               // 正向：将当前 effect 加入依赖集合
  activeEffect.deps.push(deps)         // 反向：effect 记录自己被哪些集合引用
}

// ========== 触发更新 ==========
function trigger (target, key) {
  const depsMap = targetMap.get(target)   // 获取对象依赖表
  if (!depsMap) return                    // 无依赖表则退出

  const deps = depsMap.get(key)           // 获取属性的依赖集合
  if (deps) {
    deps.forEach(effect => effect())      // 重新执行所有依赖该属性的 effect
  }
}

// ========== 响应式代理 ==========
function reactive (target) {
  return new Proxy(target, {
    get (target, key, receiver) {
      track(target, key)                      // 收集依赖
      return Reflect.get(target, key, receiver) // 返回原始值
    },
    set (target, key, value, receiver) {
      const oldValue = target[key]             // 记录旧值
      const result = Reflect.set(target, key, value, receiver) // 设置新值
      if (oldValue !== value) {                // 比较新旧值，避免无意义触发
        trigger(target, key)                   // 触发更新
      }
      return result;
    }
  })
}

// ========== 副作用函数 ==========
function effect (fn) {
  const effectFn = () => {
    cleanup(effectFn)        // ① 每次执行前先清除旧的依赖关系
    activeEffect = effectFn  // ② 将自己设为当前活跃的 effect
    fn()                     // ③ 执行用户函数 → 读取属性 → track 收集依赖
    activeEffect = null      // ④ 执行完毕，清除标记
  }

  effectFn.deps = []         // 反向收集数组：存储所有包含此 effect 的 deps 集合
  effectFn()                 // 立即执行一次，完成首次依赖收集
  return effectFn            // 返回副作用函数，方便外部手动 stop
}

// ========== 停止副作用 ==========
function stop (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn)) // 从所有依赖集合中删除自己
}

// ========== 清理函数 ==========
function cleanup (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn)) // 从旧依赖集合中删除自己
  effectFn.deps.length = 0                            // 清空反向数组，准备重新收集
}
```

---

### 三、关键机制详解

#### 1. 反向收集的实现

在 `track` 中增加了两行关键代码：

```js
activeEffect.deps.push(deps);   // track 内
```

同时 `effect` 中初始化：

```js
effectFn.deps = [];
```

这样每个 `effectFn` 都维护了一个数组，记录**所有包含它的 `deps` 集合（Set）**。

**为什么需要反向收集？**

- 正向依赖（`targetMap → deps`）：从数据出发，快速找到所有依赖它的 effect，用于触发更新。
- 反向收集（`effectFn.deps`）：从 effect 出发，快速找到所有包含它的集合，用于 `stop` 和 `cleanup`。

如果没有反向收集，要停止一个 effect 就必须遍历整个 `targetMap`，性能极差。

---

#### 2. `cleanup`：每次执行前自动清理旧依赖

```js
function cleanup (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn));
  effectFn.deps.length = 0;
}
```

**为什么需要 `cleanup`？**

一个 effect 每次执行时，可能会读取不同的属性（例如条件判断）。

**示例（幽灵依赖）**：

```js
const state = reactive({ flag: true, a: 'a', b: 'b' });

effect(() => {
  console.log(state.flag ? state.a : state.b);
});
// 首次执行：依赖 flag 和 a
// state.flag = false → 依赖变为 flag 和 b
// 此时如果不清理，state.a 的变化仍会错误地触发该 effect
```

`cleanup` 在每次 `effectFn` 执行前被调用，清除上一轮的所有依赖，确保每次收集的都是**当前执行真正读取的属性**。

**调用时机**：在 `effectFn` 内部，执行 `fn()` **之前**自动调用。

---

#### 3. `stop`：手动永久停止副作用

```js
function stop (effectFn) {
  effectFn.deps.forEach(dep => dep.delete(effectFn));
}
```

**使用方式**：

```js
const state = reactive({ count: 0 });
const myEffect = effect(() => console.log(state.count));

state.count = 1;  // 输出 1

stop(myEffect);   // 手动停止
state.count = 2;  // 无输出，effect 已失效
```

**与 `cleanup` 的区别**：

|  | `stop(effectFn)` | `cleanup(effectFn)` |
|--|------------------|---------------------|
| **目的** | 永久停用该 effect | 为下一次执行清空旧依赖 |
| **调用方** | 用户手动调用 | `effectFn` 内部自动调用 |
| **是否清空 `deps` 数组** | 否（effect 不再执行） | 是（准备重新收集） |
| **影响** | effect 完全失效 | effect 仍活跃，依赖关系被刷新 |

**记忆方式**：
- `cleanup` = "洗澡"：每次运行前洗干净，接受新的依赖标记。
- `stop` = "退休"：彻底从依赖世界中消失，再也不响应任何变化。

---

### 四、测试验证

#### 基础测试：精准更新

```js
const state = reactive({ count: 0, name: 'Vue' });

effect(() => console.log('effect1 执行: count =', state.count));
effect(() => console.log('effect2 执行: name =', state.name));

console.log('--- 修改 count ---');
state.count = 1;               // 仅触发 effect1

console.log('--- 修改 name ---');
state.name = 'Vue3';           // 仅触发 effect2

console.log('--- 修改 count 为相同值 ---');
state.count = 1;               // 无输出
```

#### 进阶测试：`stop` 与 `cleanup` 的协同

```js
const state2 = reactive({ flag: true, a: 1, b: 2 });

const dynEffect = effect(() => {
  console.log(state2.flag ? state2.a : state2.b);
});

// 初始依赖：flag, a
state2.a = 10;          // 输出 10

// 改变 flag，依赖变为 flag, b（cleanup 自动清除了旧的 a 依赖）
state2.flag = false;    // 输出 2

// 此时再修改 a，不会触发该 effect（幽灵依赖已被清除）
state2.a = 999;         // 无输出
state2.b = 20;          // 输出 20

// 手动停止
stop(dynEffect);
state2.flag = true;     // 无输出，effect 已永久停止
```

---

### 五、完整心智模型

```
state.count = 1
     ↓
Proxy set 陷阱
     ↓
Reflect.set 更新原始值
     ↓
oldValue ≠ value → trigger(target, 'count')
     ↓
从 targetMap 找到 depsMap，再找到 deps (Set)
     ↓
遍历 deps 中的每个 effectFn
     ↓
effectFn 执行前 → cleanup(effectFn) 清除旧依赖
     ↓
activeEffect = effectFn → fn() → 读取属性 → track 重新收集
     ↓
用户逻辑输出新值
```

**完整闭环**：

```
修改数据 → set 陷阱 → 比较新旧值 → trigger
    ↓
找到依赖集合 → 遍历执行 effectFn
    ↓
cleanup 清理旧依赖 → 执行 fn → 重新 track 收集
    ↓
用户看到最新结果

需要停止时：
    stop(effectFn) → 从所有 deps 集合中删除自己 → 永久失效
```

---

### 六、今日核心问答

**Q：`get` 中的 `key` 是什么？**  
A：被访问的属性名字符串，如 `state.count` 中 `key` 为 `"count"`。

**Q：`Reflect.get/set` 做了什么？**  
A：安全地读写对象属性，并能正确传递 `receiver`（代理对象），避免 `this` 指向错误。

**Q：`set` 何时触发？**  
A：给代理对象的属性赋值时触发，`state.count = 1` 即触发 `set` 陷阱。

**Q：`value` 和 `oldValue` 的关系？**  
A：`value` 是要设置的新值，`oldValue` 是设置前原始对象的值。比较它们可以避免无意义的更新。

**Q：`trigger` 怎么更新值？**  
A：`trigger` 不修改值，它只是重新执行依赖该属性的 effect；effect 内部再次读取最新数据，从而获取新值。

**Q：`effectFn` 闭包的作用？**  
A：包装用户函数，在执行前将自身设为 `activeEffect`，使 `track` 能够收集，执行后清除标记。闭包特性使 `fn` 在将来触发时仍能正确执行。

**Q：`activeEffect = null` 后依赖是否失效？**  
A：不会。依赖收集发生在 `fn()` 执行期间，已经记录到 `targetMap` 中。后续 `trigger` 会再次设置 `activeEffect` 并重新收集，保证依赖一直有效。

**Q：反向收集 `effectFn.deps` 的作用？**  
A：让每个 effect 知道自己被哪些依赖集合引用，实现 O(k) 复杂度的高效清理，支撑 `stop` 和 `cleanup`。

**Q：`stop` 和 `cleanup` 的区别？**  
A：`stop` 从外部手动永久停用 effect；`cleanup` 在 effect 每次执行前自动清除上一轮的旧依赖，防止幽灵依赖。

---

### 七、今日产出
- ✅ 手写的 `reactive`、`track`、`trigger`、`effect` 可运行代码
- ✅ 三层依赖结构的深入理解
- ✅ `stop` 和 `cleanup` 的实现与区别
- ✅ 响应式数据更新的完整心智模型（含清理闭环）
- ✅ 逐行代码解释笔记

> **明日预告**：Day3 将学习 Vue 的 `watch` 与 `watchEffect`，并对比 React 的 `useEffect`，你会发现它们都是基于今天这种 effect 机制的封装。