//一.数据类型都有哪些
console.log("🎯 JavaScript 数据类型");
console.log("┌─────────────┬──────────────┐");
console.log("│    类型     │     分类     │");
console.log("├─────────────┼──────────────┤");
console.log("│   number    │  基础数据类型  │");
console.log("│   string    │  基础数据类型  │");
console.log("│   boolean   │  基础数据类型  │");
console.log("│  undefined  │  基础数据类型  │");
console.log("│    null     │  基础数据类型  │");
console.log("│   symbol    │  基础数据类型  │");
console.log("│   bigint    │  基础数据类型  │");
console.log("│   object    │  引用数据类型  │");
console.log("└─────────────┴──────────────┘");

//二. 检验数据类型都有哪些方法
// 1. typeof
console.log("🚀 ~ typeof:");
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof []); // object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object
// 2. instanceof
console.log("🚀 ~ instanceof:");
// 基本用法
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function () {} instanceof Function); // true

// 字符串、数字、布尔值的字面量
console.log("str" instanceof String); // false
console.log(123 instanceof Number); // false
console.log(true instanceof Boolean); // false

// 使用构造函数创建的对象
console.log(new String("str") instanceof String); // true
console.log(new Number(123) instanceof Number); // true
console.log(new Boolean(true) instanceof Boolean); // true

// 原型链检测
console.log([] instanceof Object); // true (Array继承自Object)
console.log(new Date() instanceof Object); // true

// 特殊情况
console.log(null instanceof Object); // false
console.log(undefined instanceof Object); // false

//对于字面量的基础数据类型 instanceof 检测会返回 false
// 对于构造函数创建的对象 instanceof 检测会返回 true
// instanceof 检测会沿着原型链上查找
// null和undefined 对任何类型都会返回false

/**
 * typeof: 直接返回数据类型的字符串
 * instanceof: 返回布尔值，需要指定要检测的类型
 */

// 3. Object.prototype.toString.call
console.log(
  "🚀 ~ Object.prototype.toString.call:",
  Object.prototype.toString.call,
);

let a = Object.prototype.toString;

console.log(a.call(2)); //[object Number]
console.log(a.call(true)); //[object Boolean]
console.log(a.call("str")); //[object String]
console.log(a.call([])); //[object Array]
console.log(a.call(function () {})); //[object Function]
console.log(a.call({})); //[object Object]
console.log(a.call(undefined)); //[object Number]
console.log(a.call(null)); //[object Number]

//1.获取获取的数据类型
//2.通过cell改变this的指向能够获取任何值的内部标识

// 4. constructor
console.log("🚀 ~ constructor:", constructor);
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true
/**
 * constructor 属性不能直接判断 null 和 undefined，因为它们没有 constructor 属性。
 * TypeError: Cannot read properties of null (reading 'constructor')
 * TypeError: Cannot read properties of undefined (reading 'constructor')
 */
// console.log(null.constructor)
// console.log(undefined.constructor);

function Fn() {}

Fn.prototype = [];

let f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true

//
// 5. Object.getPrototypeOf
// 6. Object.prototype.isPrototypeOf
// 7. Object.prototype.propertyIsEnumerable
// 8. Object.prototype.hasOwnProperty
// 9. Object.prototype.valueOf
// 10. Object.prototype.toString
// 11. Object.prototype.toLocaleString
// 12. Object.prototype.constructor
// 13. Object.prototype.toSource

//三.Object.prototype.toString.call 输出什么
let b = [];

console.log(Object.prototype.toString.call(b));

//输出[object Array]

//四.箭头函数的this和普通函数的this有什么区别
console.log("🚀 ~ 箭头函数的this和普通函数的this有什么区别:");

//箭头函数 它只会在自己作用域的上一层继承this 也就是捕获上下文的this
//普通函数的this  谁调用指向谁

//1. 对象方法调用 - 指向调用对象
const obj = {
  name: "pbj",
  fn: function (params) {
    console.log(this.name);
  },
};
obj.fn(); //pbj

//2. 普通函数调用 - 默认指向window
function fn(params) {
  console.log(this);
}
fn(); //window

//3. 构造函数调用 - 默认指向实例对象
function Person(name) {
  this.name = name;
}
const p = new Person("李白");
console.log(p.name); //李白

//4.call、apply bind  指向指定的对象
function fng() {
  console.log(this.name);
}

const objg = {
  name: "pj",
};

fng.call(objg); //pj
fng.apply(objg); //pj
fng.bind(objg)(); //pj

//5.事件处理器-指向触发事件的元素
// const btn = document.querySelector("#btn");
// btn.addEventListener("click", function () {
//   console.log(this);
// });

//6 new中的this指向新创建的实例对象
function newFn(params) {
  this.name = params;
  console.log(this);
}
const np = new newFn("pbj");
console.log(np.name); //新创建的对象

//五.什么是闭包
console.log("🚀 ~ 什么是闭包:");

/**
 * 闭包就是函数 加上 其创建时所捕获的词法作用
 * 当一个函数访问了外部的变量，且该函数在其定义的作用域之外被执行 闭包就会形成
 * 形成闭包的条件 1. 函数嵌套  内部函数访问外部的变量 2. 内部函数被导出到外部作用域  返回值或者回调函数
 * 闭包的特点  1.变量私有化  2.不会被垃圾回收机制回收
 */

let bb = 1;
let bbObj = {
  a: 2,
  getA() {
    return this.a;
  },
};
console.log(bbObj.getA()); //2

//六.什么是事件运行机制
console.log("🚀 ~ 什么是事件运行机制:");

/**
 * 同步任务
 *同步任务是指在主线程上按照顺序执行的任务，必须等待当前任务执行完毕后才能执行下一个任务
 */
console.log("🚀 ~ 同步任务:");
//  console.log('1');              // 同步任务
// let a = 1;                     // 同步任务
// let b = 2;                     // 同步任务
// let c = a + b;                 // 同步任务

// function syncFunc() {
//   console.log('执行同步函数');
// }
// syncFunc();                    // 同步任务

// for(let i = 0; i < 3; i++) {
//   console.log(i);              // 同步任务
// }
// Promise 构造函数内的代码（executor 函数）是同步执行的

/**
 * 异步任务（Asynchronous Tasks）
 * 异步任务是指在主线程上执行任务，但任务执行结果不能立即返回，而是通过回调函数返回结果。
 */
console.log("🚀 ~ 异步任务:");

// 1. 定时器
// setTimeout(() => {
//   console.log('异步任务: setTimeout');
// }, 1000);

// Promise 构造函数内的代码（executor 函数）是同步执行的，只有 .then()、.catch()、.finally() 中的回调才是微任务！
// // 2. Promise
// Promise.resolve().then(() => {
//   console.log('异步任务: Promise');
// });

// 3. AJAX请求
// fetch('/api/data').then(response => {
//   console.log('异步任务: AJAX请求完成');
// });

// 4. 事件处理
// document.addEventListener('click', () => {
//   console.log('异步任务: 点击事件');
// });

/**
 * javascript 事件运行机制是事件循环，他是处理JavaScript异步操作的核心机制
 * 组成部分 1.调用栈(call stack) 3.任务队列(task queue) 4.微任务队列(micro task queue)
 */

//调用栈(call stack)
// console.log("🚀 ~ 调用栈(call stack):")
// function dyz_a() {
//   console.log('a');
//   dyz_b();
// }
// function dyz_b() {
//   console.log('b');
// }
// dyz_a(); // 执行顺序：a -> b

/**
 * 任务队列(task queue) 存放宏任务，如 setTimeout、setInterval、I/O 操作等
 * 宏任务：包括 script（整体代码）、setTimeout、setInterval、I/O 操作、UI 绘制、定时器、事件处理函数等 console.log('任务队列示例')  // 同步任务，立即执行

setTimeout(function () {
    console.log(1);          // 宏任务，进入任务队列
});

new Promise(function(resolve,reject){
    console.log(2)           // 同步任务！Promise构造函数内的代码立即执行
    resolve(3)               // 同步任务
}).then(function(val){
    console.log(val);        // 微任务，进入微任务队列
})

new Promise(function(resolve,reject){
    console.log(6)           // 同步任务！Promise构造函数内的代码立即执行
    resolve(7)               // 同步任务
}).then(function(val){
    console.log(val);        // 微任务，进入微任务队列
})

console.log(4);              // 同步任务，立即执行
 * */
// console.log("🚀 ~ 任务队列(task queue):",)
// console.log('1');           // 同步任务，立即执行
// setTimeout(() => {          // 宏任务，进入任务队列
//   console.log('2');
// }, 0);
// console.log('3');           // 同步任务，立即执行
// 输出：1 -> 3 -> 2

/**
 *微任务队列(micro task queue)  存放微任务，
 *微任务 ：Promise.then()、MutationObserver、process.nextTick()等
 */
// console.log("🚀 ~ 微任务队列(micro task queue):")
// console.log('1');
// setTimeout(() => console.log('2'), 0);    // 宏任务
// Promise.resolve().then(() => console.log('3')); // 微任务
// console.log('4');
// 输出：1 -> 4 -> 3 -> 2

/**
 * 执行流程
 * 1、同步任务在调用栈中执行，遇到异步任务时，将其放入任务队列中，并立即返回。
 * 2、异步任务分为宏任务和微任务，分别进入对应的任务队列
 * 3、调用栈为空时，优先执行微任务队列中的所有任务
 * 4、当微任务队列为空时，执行一个宏任务（注意：只执行一个）
 * 5、重复步骤3和4，直到所有任务队列为空
 */

console.log("🚀 ~ 任务队列示例"); // 同步任务，立即执行

// setTimeout(function () {
//     console.log(1);          // 宏任务，进入任务队列
// });

// new Promise(function(resolve,reject){
//     console.log(2)           // 同步任务！Promise构造函数内的代码立即执行
//     resolve(3)               // 同步任务
// }).then(function(val){
//     console.log(val);        // 微任务，进入微任务队列
// })

// new Promise(function(resolve,reject){
//     console.log(6)           // 同步任务！Promise构造函数内的代码立即执行
//     resolve(7)               // 同步任务
// }).then(function(val){
//     console.log(val);        // 微任务，进入微任务队列
// })

// console.log(4);              // 同步任务，立即执行

// 详细执行过程
// 第一阶段：执行所有同步任务

// console.log('任务队列示例') → 输出：任务队列示例
// 执行第一个 Promise 的构造函数 → 输出：2
// resolve(3) → 同步操作
// 执行第二个 Promise 的构造函数 → 输出：6
// resolve(7) → 同步操作
// console.log(4) → 输出：4
// 第二阶段：清空微任务队列

// 第一个 Promise 的 .then() 回调 → 输出：3
// 第二个 Promise 的 .then() 回调 → 输出：7
// 第三阶段：执行宏任务

// setTimeout 的回调 → 输出：1

// 关键理解点
// 重要提醒：Promise 构造函数内的代码（executor 函数）是同步执行的，只有 .then()、.catch()、.finally() 中的回调才是微任务！

// 所以执行顺序是：

// 同步任务：任务队列示例 → 2 → 6 → 4
// 微任务：3 → 7
// 宏任务：1
// 最终输出：任务队列示例 2 6 4 3 7 1

// 这就是为什么 2 6 4 会优先执行的原因——它们根本不是微任务，而是同步任务

//javaScript事件执行中的常见陷阱
console.log("🚀 ~ javaScript事件执行中的常见陷阱:");

// 1.嵌套超过5层的 setTimeout 最小延迟为4ms
// let i = 0;
// function nestedTimeout() {
//   setTimeout(() => {
//     console.log(i++);
//     if (i < 10) nestedTimeout();
//   }, 0);
// }
// nestedTimeout(); // 添加这一行
// 前 5 行的时间戳差值≈1ms；
// 后 5 行的时间戳差值≈4ms；
// 但 i 始终是 0→9 依次递增
// 数值顺序是 0 到 9 依次打印，唯一的区别是前 5 个// 陷阱：Promise构造函数是同步执行的

// 2.Promise构造函数是同步执行的
// console.log('start');

// new Promise((resolve) => {
//   console.log('Promise executor'); // 立即执行
//   resolve();
// }).then(() => {
//   console.log('Promise then'); // 微任务
// });

// console.log('end');

// 输出：start -> Promise executor -> end -> Promise then打印极快、后 5 个打印间隔稍长，不会出现数值乱序或缺失的情况。

// 3.陷阱：async函数的执行机制 制与Promise构造函数一致
// async 函数中，await 之前的代码是同步执行
// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }

// async function async2() {
//   console.log('async2');
// }

// console.log('script start');
// async1();
// console.log('script end');
// 输出：
// script start
// async1 start
// async2
// script end
// async1 end

//4. 陷阱：微任务总是优先于宏任务
// console.log('1');

// setTimeout(() => console.log('2'), 0);

// Promise.resolve().then(() => {
//   console.log('3');
//   setTimeout(() => console.log('4'), 0);
//   Promise.resolve().then(() => console.log('5'));
// });

// console.log('6');

// 输出：1 -> 6 -> 3 -> 5 -> 2 -> 4  先微后(微任务里面的)宏 再微再宏

// 5.陷阱：MutationObserver 是微任务
// const observer = new MutationObserver(() => {
//   console.log('MutationObserver callback');
// });

// observer.observe(document.body, { childList: true });

// console.log('start');
// document.body.appendChild(document.createElement('div'));
// console.log('end');

// 输出：start -> end -> MutationObserver callback

// 6.陷阱：Promise链中的错误处理
// Promise.resolve()
//   .then(() => {
//     throw new Error('error');
//   })
//   .then(() => {
//     console.log('success'); // 不会执行
//   })
//   .catch(err => {
//     console.log('caught:', err.message); // 会执行
//   });

// 7.陷阱：DOM更新和事件循环的关系
// const element = document.getElementById('test');
// element.style.color = 'red';

// 这个修改不会立即渲染，而是在下次渲染时机
// requestAnimationFrame(() => {
// 在这里可以获取到更新后的样式
//   console.log(getComputedStyle(element).color);
// });

// 8.陷阱：queueMicrotask 的优先级
// console.log('start');

// queueMicrotask(() => {
//   console.log('microtask 1');
// });

// Promise.resolve().then(() => {
//   console.log('microtask 2');
// });

// console.log('end');

// 输出：start -> end -> microtask 1 -> microtask 2
// queueMicrotask 的优先级甚至高于 Promise

// 9.陷阱：已经resolved的Promise仍然会进入微任务队列
// console.log('start');

// const resolvedPromise = Promise.resolve('resolved');
// resolvedPromise.then(value => {
//   console.log(value);
// });

// console.log('end');

// 输出：start -> end -> resolved
// 即使Promise已经resolved，回调仍然是异步执行的 只要是.then()方法，就会进入微任务队列

// 七. 手写题
const mockRequest = () => {
  return new Promise((resolve, reject) => {
    // 模拟一个异步请求
    setTimeout(() => {
      // resolve("成功");
      console.log("mock 请求");
      reject(); // 模拟请求失败
    }, 500);
  });
};
// mockRequest 函数：
console.log("🚀 ~ mockRequest 函数：:");

// 模拟一个异步请求，500ms 后 reject（失败）
// 用于测试 retry 功能
// 请实现 Promise.retry
Promise.retry = function (fn, times) {
  return new Promise((resolve, reject) => {
    //如果是resolve成功的就会走then 不会走catch   因为是reject 所有不会走then 走catch 所以在cath里面操作
    fn()
      .then((resolve) => {
        console.log("🚀 ~ resolve:", resolve);
      })
      .catch((err) => {
        console.log("🚀 ~ err:", err);
        //resolve 就是请求失败的返回
        if (times > 0) {
          //变成递归调用将次数减1
          Promise.retry(fn, times - 1)
            .then(resolve)
            .catch(reject);

          // 递归机制：每次失败后递归调用自身，次数递减
          // 状态传递：
          // 成功时通过 .then(resolve) 将成功状态传递到最外层
          // 失败时通过 .catch(reject) 将失败状态传递到最外层
          // 终止条件：当 times <= 0 时停止递归，直接 reject
        } else {
          reject(err);
        }
      });
  });
};

Promise.retry(mockRequest, 3)
  .then(() => {
    console.log("成功");
  })
  .catch((err) => {
    console.log("重试3次失败", err);
  });

// mock 请求
// mock 请求
// mock 请求
// mock 请求
// 重试3次失败

// 定义模拟请求函数

// mockRequest 返回一个总是失败的 Promise
// 500ms 后执行，模拟网络请求
// 使用 reject() 模拟请求失败
// 实现 Promise.retry 方法

// 接收两个参数：fn（要执行的函数）和 times（重试次数）
// 首先执行 fn()
// 如果成功，调用 resolve 结束
// 如果失败且还有重试次数，则递归调用 Promise.retry
// 如果重试次数用完，调用 reject 抛出错误
// 调用 retry 方法

// 尝试执行 mockRequest 最多 3 次
// 最终会因为所有尝试都失败而进入 .catch

// ### 1. 只要有判断和次数，就能实现循环和递归吗？

// **能。**

// - **循环**（如 for 循环、while 循环）的本质就是：**根据条件判断反复执行一段代码，直到条件不满足或次数到达为止**。
//   - while 循环直接依赖判断（条件为真时继续）。
//   - for 循环本质上是“次数控制 + 判断”（比如 i 从 1 到 n，每次 i++ 后判断是否 ≤ n）。

// - **递归**的本质是：**函数调用自身，并在某条件满足时停止（基例）**。
//   - 递归必须有**基例（base case）**，这就是“判断”。
//   - 递归的“次数”体现在递归深度上（比如阶乘 fact(n) 会递归 n 次）。

// **关键结论**：在图灵完备的编程语言中，**循环和递归是等价的**，可以用其中任意一种完全模拟另一种。

// - 用循环模拟递归：很常见，比如用栈手动实现递归过程（尾递归优化本质上就是把递归变成循环）。
// - 用递归模拟循环：也可以，比如用递归函数带一个计数器参数，每次调用自减/自加，直到满足基例停止。

// 所以，只要语言提供了：
// - 条件判断（if-else 或类似）
// - 某种方式控制“次数”（计数器、参数递减等）

// 就足以实现两者。

// ### 2. 循环和递归的区别是什么？

// 虽然表达能力等价，但它们在实现方式、适用场景和特性上有明显区别：

// | 方面           | 循环（Iteration）                          | 递归（Recursion）                              |
// |----------------|--------------------------------------------|------------------------------------------------|
// | **实现方式**   | 通过反复跳转到同一段代码（循环体）         | 函数反复调用自身，形成调用栈                   |
// | **内存使用**   | 通常只用常数额外空间（计数器变量）         | 每次调用压入调用栈，需要 O(n) 空间（n 为深度） |
// | **性能**       | 一般更快，没有函数调用开销                 | 有函数调用和栈帧开销，可能较慢                 |
// | **可读性**     | 对“重复固定次数”或“直到条件变化”的问题直观 | 对分治、自然具有树形结构的问题更优雅（如二叉树遍历、快速排序、汉诺塔） |
// | **终止控制**   | 通过修改循环条件或计数器                   | 通过基例（base case）判断是否返回             |
// | **风险**       | 容易写成无限循环（条件永远为真）           | 容易造成栈溢出（stack overflow，没有基例或深度太深） |
// | **尾递归优化** | 不需要                                     | 某些语言（Scheme、Kotlin 等）可优化为循环，避免栈溢出 |

// **举例对比**：计算阶乘

// ```js
// 循环版本
//     function factorialIterative(n) {
//       if (n < 0) return "请输入非负整数";
//       let result = 1;
//       for (let i = 1; i <= n; i++) {
//         result *= i;
//       }
//       return result;
//     }

//     // 递归版本
//     function factorialRecursive(n) {
//       if (n < 0) return "请输入非负整数";
//       if (n === 0 || n === 1) return 1;
//       return n * factorialRecursive(n - 1);
//     }
// ```

// 两者结果相同，但递归更简洁地表达了“n 的阶乘 = n × (n-1)的阶乘”这一数学归纳本质。

// ### 总结

// - 是的，**只要有判断和次数控制，就能实现循环和递归**，而且两者在计算能力上是等价的（图灵完备）。
// - **区别主要在实现机制、可读性、内存占用和适用场景**：循环更高效、节省内存，适合简单重复；递归更优雅、自然，适合分治和树形问题，但要注意栈溢出风险。

//8手写节流和防抖

//防抖 多次触发执行最后一次

function debounce(fn, delay) {
  //设置定时器表示
  let timer = null;
  return function (...args) {
    //获取this
    const context = this;
    //清除定时器
    if (timer) {
      //每次触发都要重置  只执行最后一次只要有定时器执行就就要清除定时器不再执行
      clearTimeout(timer);
    }
    //设置定时器
    timer = setTimeout(() => {
      //执行函数
      fn.apply(context, args);
    }, delay);
  };
}
/***
 * 第一次触发设置定时器 delay后时间后后执行一次
 * 第二次触发清除之前的定时器 重新设置再次delay后时间执行
 * 连续触发不断重置定时器不断执行
 * 不再触发delay时间后执行
 * 防抖通过延迟执行和重置定时器，确保频繁触发的事件只在最后执行一次，常用于搜索、resize 等场景
 * clearTimeout 会真正取消定时器执行
 * 假如多次调用 debounce，只要有timer就清空不再执行，最后一次调用就会触发
 */

//节流 每隔一定时间触发一次

function throttle(fn, delay) {
  // 记录上一次执行时间从0开始
  let lastTime = 0;
  return function (...args) {
    //获取this
    const context = this;
    //记录当前时间
    const nowTime = Date.now();
    //获取到触发的时间间隔
    if (nowTime - lastTime > delay) {
      //在时间间隔内触发一次 并记录当前时间
      lastTime = nowTime;
      return fn.apply(context, args);
    }
  };
}

/**
 * 1首次触发 lastTime = 0 立即执行并记录时间
 * 频繁触发: 检查时间差，不足 delay 则忽略
 * 间隔足够: 执行函数并更新 lastTime
 * 持续触发每次间隔delay内只执行一次
 * 多次调用时间 throttle  函数每次都是重新开始delay时间内执行一次，如果持续触发就会记录上次时间继续规定时间触发一次
 */

function throttle2(fn, delay) {
  //设置定时器时间标识 每次
  let timer = null;
  return function (...args) {
    //获取到当前的this
    const context = this;
    //说明当前存在定时间就停止
    if (timer) {
      return;
    }
    //创建定时器
    timer = setTimeout(() => {
      //触发函数 在规定的时间内触发
      fn.apply(context, args);
      //清除定时器 每次都是新的定时器都是每隔delay时间执行
      timer = null;
    }, delay);
    console.log("🚀 ~ throttle2 ~ timer:", timer);
  };
}

/**
 *首次触发发 间隔delay时间一开始就直接执行函数 并且清空定时器
 *第二次触发 也是继续创建定时器在间隔delay时间之后执行函数
 *后续都是一样
 *
 * 多次调用节流每次都会在规定时间内触发一次
 */

// 防抖：连续触发5次
debounce(() => console.log("防抖"), 1000);
// 结果：只执行1次（最后一次）
// 需要 clearTimeout 取消前4次

// 节流：连续触发5次
throttle2(() => console.log("节流"), 1000);
// 结果：执行1次（第一次），忽略后4次
// 只需要 timer = null 重置状态
