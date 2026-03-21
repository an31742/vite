// Vue3项目封装过hook吗
console.log("🚀 ~ Vue3项目封装过hook吗:");

//useDebouse  hook就是方法封装好的方法
// import { ref, watch } from 'vue'

// export function useDebounce (value, delay = 300) {
//   const debounceValue = ref(value.value)
//   watch(value, (newValue) => {
//     const timer = setTimeout(() => {
//       debouncedValue.value = newValue
//     }, delay);
//     return () => clearTimeout(timer)
//   })
//   return debounceValue
// }

//hook有什么作用
console.log("🚀 ~ hook有什么作用:");
// 可以让代码更加模块化可用易测试

// Vue2和Vue3的响应式区别
//       vue2   vue3
//  原理  Object.defineProperty  proxy
//  差异  vue使用$set（检索数组变化）  直接支持
//  使用  this变量名   ref reative

// .pinia和vuex的区别

// 特性	Vuex	Pinia
// Mutations	必需	无需，直接修改 state
// TypeScript	复杂配置	原生支持
// 模块化	modules 嵌套	多个 store
// DevTools	支持	更好支持
// 体积	较大

// 渲染一万条数据，怎么解决页面卡顿问题

// 虚拟滚动 - 最有效  只渲染可视区域

// 分页加载 - 简单易实现

// 时间分片 - 渐进式渲染

// Web Worker - 复杂计算场景

// type和interface的区别

// 本质是：type 是“类型组合工具”，interface 是“结构契约”
// 	•	type：给任意类型表达式起别名
// 	•	interface：专门描述对象/类的结构规范

// type 更灵活，interface 更规整

// 1.	语言规则
// •	interface ⊣ 联合类型
// •	type → 支持联合 / 交叉 / 条件类型
// 2.	可扩展性
// •	interface → 可多次声明自动合并
// •	type ⊣ 重复声明
// 3.	使用场景
// •	interface → API / 数据结构规范
// •	type → 复杂类型运算

// ① 定义对象结构 → 用 interface ✅

// interface User {
//   id: number
//   name: string
// }

// ② 需要扩展 / 继承 → interface 更稳

// interface User {
//   age: number
// }

// 👉 自动合并，无需改原文件
// ❗避坑：type 这里会直接报错

// ⸻

// ③ 涉及联合 / 交叉 / 映射 → 用 type ✅

// type Status = 'success' | 'error'

// type UserWithStatus = User & {
//   status: Status
// }

// 👉 interface 无法完成

// ⸻

// ④ 给基础类型起别名 → 只能 type

// type ID = string | number

// ⸻

// ⑤ 类实现接口 → interface 语义更强

// class Admin implements User {
//   id = 1
//   name = 'admin'
// }

// ts的泛型有哪些作用

// 本质是：泛型 = 延迟确定类型
// 	•	不在定义时写死类型
// 	•	在使用时再决定具体类型

// 三个核心要素
// 	1.	复用逻辑
// 	•	同一套逻辑处理不同类型
// 	2.	类型安全
// 	•	泛型 ≠ any
// 	•	编译期约束，运行时零成本
// 	3.	类型推导
// 	•	调用点决定 T，而不是实现者猜

// 四、🧩 步骤拆解器（怎么用）

// ① 最基础作用：保持输入输出类型一致

// function identity<T>(value: T): T {
//   return value
// }

// identity(1)      // T = number
// identity('hi')   // T = string

// 👉 预期结果：类型跟着数据走
// ❗避坑：这里用 any 会直接失去约束

// ⸻

// ② 泛型约束：限制“能传什么”

// function getLength<T extends { length: number }>(val: T) {
//   return val.length
// }

// 👉 只有带 length 的类型才能用
// ❗避免：调用时报 “length 不存在”

// ⸻

// ③ 多泛型：表达多个类型关系

// function merge<A, B>(a: A, b: B): A & B {
//   return { ...a, ...b }
// }

// 👉 明确 A、B 的结构不会被混淆

// ⸻

// ④ 泛型接口：定义“通用结构”

// interface ApiResponse<T> {
//   code: number
//   data: T
// }

// const res: ApiResponse<User> = {
//   code: 0,
//   data: { id: 1, name: 'Tom' }
// }

// 👉 后端接口建模必用

// ⸻

// ⑤ 泛型类：抽象数据容器

// class Store<T> {
//   private state: T
//   constructor(state: T) {
//     this.state = state
//   }
// }

// 👉 状态管理 / 缓存容器常见

// ⸻

// ⑥ 默认泛型：降低使用成本

// interface Result<T = string> {
//   data: T
// }

// 👉 不传也能用，传了更精确

// ⸻

// ⑦ 泛型 + 条件类型（进阶）

// type ReturnTypeEx<T> = T extends (...args: any) => infer R ? R : never

// 👉 类型层面的“if 判断”

// pnpm、npm、yarn有什么区别

// 本质是：三者都解决「依赖下载 + 版本解析 + 脚本执行」问题，但底层模型不同
// 	•	npm：传统“每项目一份 node_modules”
// 	•	yarn：在 npm 之上做“性能 + 稳定性优化”
// 	•	pnpm：用“全局内容寻址存储 + 硬链接”重构模型

// 一句话压缩版（≤12字）：

// pnpm 本质是去重到极致

// npm / yarn
// 项目A
// └─ node_modules
//    ├─ react
//    ├─ lodash
//    └─ axios

// pnpm
// 全局 store
// └─ react@18
// └─ lodash@4

// 项目A node_modules
// └─ .pnpm (硬链接)

// 维度	npm	yarn	pnpm
// 官方支持	✅	❌	❌
// 安装速度	中	快	最快
// 磁盘占用	大	中	最小
// 幽灵依赖	❌	❌	✅ 避免
// Monorepo	一般	好	极强
// CI 友好	一般	好	最好
// 学习成本	最低	中	中
