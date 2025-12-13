// 面经09：多标签页通信、优雅降级和渐进增强、数据类型判断
console.log('=== 面经09：多标签页通信、优雅降级和渐进增强、数据类型判断 ===');

// 1. 浏览器内多个标签页之间的通信方式
console.log('\n1. 多标签页通信方式：');
console.log('- WebSocket（可跨域）');
console.log('- postMessage（可跨域）');
console.log('- Worker之SharedWorker');
console.log('- Server-Sent Events');
console.log('- localStorage');
console.log('- BroadcastChannel');
console.log('- Cookies');

// 2. 优雅降级和渐进增强
console.log('\n2. 优雅降级和渐进增强：');
console.log('优雅降级（Graceful Degradation）：');
console.log('- 首先构建一个完全功能的应用程序，针对最先进的浏览器进行开发');
console.log('- 然后在不支持这些新特性的旧版本浏览器上，以一种优雅的方式进行降级');
console.log('- 思想：先从最好的情况出发，然后根据浏览器的能力逐步做出妥协');

console.log('渐进增强（Progressive Enhancement）：');
console.log('- 从基础功能出发，为所有浏览器构建一个基本可用的应用程序');
console.log('- 随后，通过逐步增加和增强功能，针对现代浏览器提供更丰富的体验');
console.log('- 思想：从简单到复杂，先确保核心功能的可用性和性能');

console.log('目标：都是为了确保应用在不同环境和浏览器中的可访问性，提供最好的用户体验');

// 3. 判断数据类型的方法
console.log('\n3. 判断数据类型：');

function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
}

// 测试各种数据类型
const testData = [
  [],
  {},
  1,
  "string",
  true,
  false,
  null,
  undefined,
  function() {},
  new Date(),
  /regex/,
  Symbol('test'),
  new Map(),
  new Set()
];

console.log('数据类型检测结果：');
testData.forEach(item => {
  console.log(`${JSON.stringify(item)} 的类型是：${type(item)}`);
});

// Object.prototype.toString.call 的详细说明
console.log('\n--- Object.prototype.toString.call 详解 ---');
console.log('这是最准确的类型检测方法，返回格式为 [object Type]');
console.log('相比 typeof 的优势：');
console.log('- typeof null 返回 "object"，但 toString.call(null) 返回 "[object Null]"');
console.log('- typeof [] 返回 "object"，但 toString.call([]) 返回 "[object Array]"');
console.log('- 可以区分更多的内置对象类型');