## Vue Day 1 笔记：Vue3 响应式整体架构

### 一、核心链路

```
reactive(obj)
  → new Proxy(obj, {
        get(target, key) {
            track(target, key);       // 依赖收集
            return Reflect.get(...);
        },
        set(target, key, value) {
            Reflect.set(...);
            trigger(target, key);    // 派发更新
        }
    })
```

**一句话**：Vue3 响应式 = `Proxy` 拦截读写 + `track` 收集依赖 + `trigger` 触发更新。

---

### 二、三个核心函数

| 函数 | 触发时机 | 职责 |
|------|---------|------|
| `reactive()` | 创建响应式对象 | 用 `Proxy` 包装对象，拦截 `get`/`set` |
| `track(target, key)` | 读取属性时（`get`） | 记录当前 `effect` 依赖了 `target[key]` |
| `trigger(target, key)` | 修改属性时（`set`） | 找到依赖该属性的所有 `effect` 并重新执行 |

---

### 三、为什么是 WeakMap？

依赖存储结构：

```
targetMap: WeakMap<target, depsMap>
  depsMap: Map<key, Set<effect>>
```

- `targetMap` 为 `WeakMap`，key 是原始对象。
- 当原始对象被垃圾回收时，对应的依赖关系自动消失，**避免内存泄漏**。
- 内层 `depsMap` 和 `deps` 使用普通 `Map`/`Set`，因为它们的生命周期与对象绑定，无需弱引用。

---

### 四、属性粒度的精确更新

Vue3 能做到“属性级更新”，是因为 `track` 精确记录了：

> **哪个 `effect` 依赖了哪个对象的哪个属性。**

修改 `state.name` 时，只重新执行依赖 `state.name` 的 `effect`，不触及依赖其他属性的代码。

**对比 React**：
- React 的 `setState` 会导致整个组件函数重新执行。
- Vue3 的响应式让框架自动知道“哪里需要变”，无需手动 `useMemo` 优化。

---

### 五、手写简易响应式系统（约 40 行）

```js
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (deps) deps.forEach(effect => effect());
}

function reactive(target) {
  return new Proxy(target, {
    get(obj, key) {
      track(obj, key);
      return Reflect.get(obj, key);
    },
    set(obj, key, value) {
      Reflect.set(obj, key, value);
      trigger(obj, key);
      return true;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```

---

### 六、今日一句

> **Vue3 响应式 = Proxy 拦截读写 → track 记录依赖 → trigger 精准更新，属性级粒度，自动高效。**