## Vue 响应式第五天：`ref`、`toRef` 与 `toRefs` 源码实现

### 今日目标
- 理解为什么需要 `ref`：弥补 `reactive` 无法代理原始类型的缺陷
- 手写简易版 `ref`，掌握 `.value` 的实现原理
- 理解 `toRef` 和 `toRefs` 如何保持响应式链接
- 明确 `ref` 与 `reactive` 的适用场景及局限

---

### 一、为什么需要 `ref`

`reactive` 基于 `Proxy`，而 `Proxy` 只能代理**对象**。  
对于 `number`、`string`、`boolean` 等基本类型，无法直接变成响应式。  
`ref` 通过一个对象包裹原始值，并暴露 `.value` 进行读写，从而将任意类型变为响应式。

---

### 二、手写 `ref`

`ref` 的核心是一个拥有 `.value` 属性的对象，通过存取器实现依赖收集与触发。

```js
function ref(rawValue) {
  const r = {
    _value: isObject(rawValue) ? reactive(rawValue) : rawValue,
    get value() {
      track(r, 'value')      // 收集依赖
      return this._value
    },
    set value(newVal) {
      if (newVal !== this._value) {
        this._value = isObject(newVal) ? reactive(newVal) : newVal
        trigger(r, 'value')  // 触发更新
      }
    }
  }
  return r
}

function isObject(val) {
  return val !== null && typeof val === 'object'
}
```

**解释**：
- `_value` 存储真正的值，若为对象则调用 `reactive` 转换，保证深层响应式。
- 读取 `.value` → `track` 收集当前活跃的 `effect`。
- 设置 `.value` → 比较新旧值，不同则更新并 `trigger` 触发相关依赖。

**测试**：
```js
const count = ref(0)
effect(() => console.log(count.value))
count.value = 1   // 控制台输出 1
```

---

### 三、`ref` vs `reactive`

| 特性 | `ref` | `reactive` |
|------|-------|-----------|
| 数据类型 | 任意类型（原始值或对象） | 只能是对象 |
| 访问方式 | 必须通过 `.value` | 直接访问属性 |
| 深层响应式 | 自动将对象转为 `reactive` | 递归代理所有属性 |
| 解包 | 在模板和 `reactive` 内自动解包 | 无 |
| 整体替换 | 可以通过 `.value = newObj` 替换 | 不可整体替换对象本身 |

---

### 四、`toRef`：为 `reactive` 的属性创建引用

解构 `reactive` 对象时，普通解构会丢失响应式。  
`toRef` 可以为单个属性创建一个**响应式引用**，保持与原对象的连接。

```js
function toRef(reactiveObj, key) {
  const wrapper = {
    get value() {
      return reactiveObj[key]   // 读取时触发 reactive 的 getter → track
    },
    set value(val) {
      reactiveObj[key] = val    // 赋值时触发 reactive 的 setter → trigger
    }
  }
  return wrapper
}
```

**关键点**：
- `toRef` 本身不调用 `track`/`trigger`，它依赖 `reactiveObj` 自带的代理行为。
- 读写 `wrapper.value` 本质是在读写 `reactiveObj[key]`，所以响应式链条完整。

**示例**：
```js
const state = reactive({ count: 0 })
const countRef = toRef(state, 'count')

effect(() => console.log(countRef.value))
countRef.value = 10   // 控制台输出 10，state.count 也变为 10
```

---

### 五、`toRefs`：批量转换为引用

将整个 `reactive` 对象的所有属性转换为 `ref`，常用于组合式函数返回时保持响应式。

```js
function toRefs(reactiveObj) {
  const result = {}
  for (const key in reactiveObj) {
    result[key] = toRef(reactiveObj, key)
  }
  return result
}
```

**使用**：
```js
const state = reactive({ x: 1, y: 2 })
const { x, y } = toRefs(state)  // 解构后仍保持响应式

effect(() => console.log(x.value, y.value))
x.value = 100   // 触发 effect，state.x 也同步为 100
```

---

### 六、为什么 `reactive` 不能整体替换

```js
let state = reactive({ a: 1 })
state = reactive({ a: 2 })  // 这并不会使旧对象失效，但变量指向了新对象
```

但直接对 `reactive` 变量赋值新对象是常见需求，但 `reactive` 无法监听变量本身的重新赋值，因为 `Proxy` 只能代理对象内部操作。

**解决方案**：使用 `ref` 包裹对象。
```js
const state = ref({ a: 1 })
state.value = { a: 2 }   // 修改 .value 会触发 setter，从而响应式更新
```

`ref` 的 `.value` 是属性访问，可以被 Vue 的响应式系统拦截，因此**整体替换对象请用 `ref`**。

---

### 七、今日产出与总结

- ✅ 手写 `ref` 实现（基于 `track`/`trigger`，支持对象自动转 `reactive`）
- ✅ `ref` 与 `reactive` 的差异理解
- ✅ `toRef` 及 `toRefs` 的原理：利用 `reactive` 原有拦截，而非重新实现
- ✅ 清楚了解为什么 `reactive` 不能整体替换对象，以及 `ref` 的解决方案

**核心心法**：
> `ref` 是“响应式盒子”，让任意值通过 `.value` 参与响应式系统。  
> `toRef` 和 `toRefs` 是“桥梁”，让解构/拆分不会切断与原始响应式对象的连接。  
> 响应式的本质是 **对属性的读写进行拦截**，而 `ref` 将 `.value` 作为这样一个属性。

---

> **明日预告**：Day6 将学习 Vue3 的调度器与 `nextTick`，理解异步更新队列和批量处理，并对比 React 的调度机制。