// 面经010：viewport设置、px/em/rem对比、回调函数
console.log('=== 面经010：viewport设置、px/em/rem对比、回调函数 ===');

// 1. viewport常见设置
console.log('\n1. viewport常见设置：');
console.log('viewport就是视区窗口，也就是浏览器中显示网页的部分');
console.log('PC端上基本等于设备显示区域，但在移动端上viewport会超出设备的显示区域');
console.log('设备默认的viewport在980-1024之间');

console.log('\nviewport设置参数：');
console.log('- width: 设置layout viewport的宽度，为一个正整数，或字符串"width-device"');
console.log('- initial-scale: 设置页面的初始缩放值，为一个数字，可以带小数');
console.log('- minimum-scale: 允许用户的最小缩放值，为一个数字，可以带小数');
console.log('- maximum-scale: 允许用户的最大缩放值，为一个数字，可以带小数');
console.log('- height: 设置layout viewport的高度，这个属性对我们并不重要，很少使用');
console.log('- user-scalable: 是否允许用户进行缩放，值为"no"或"yes"');

const viewportMeta = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`;
console.log('\n常用设置：', viewportMeta);

console.log('\n相关知识：dpr与CSS像素');
console.log('CSS像素的1px在PC端上与设备的物理像素基本一致');
console.log('到手机端就会有两个物理像素对应一个CSS像素的情况（如iPhone的视网膜屏）');
console.log('所以iPhone上的dpr = 2，即2个物理像素/一个CSS像素（独立像素）');

// 2. px、em、rem的不同
console.log('\n2. px、em、rem的对比：');
console.log('px（像素）：');
console.log('- 表示"绝对尺寸"（并非真正的绝对）');
console.log('- 实际上就是CSS中定义的像素');
console.log('- 利用px设置字体大小及元素宽高等比较稳定和精确');
console.log('- 缺点：不能适应浏览器缩放时产生的变化，因此一般不用于响应式网站');

console.log('em（相对单位）：');
console.log('- 表示相对尺寸，相对于当前对象内文本的font-size');
console.log('- 如果当前对象内文本的font-size计量单位也是em，则参考对象为父元素文本font-size');
console.log('- 使用em可以较好的响应设备屏幕尺寸的变化');
console.log('- 缺点：在进行元素设置时都需要知道父元素文本的font-size');

console.log('rem（根相对单位）：');
console.log('- 也表示相对尺寸，其参考对象为根元素的font-size');
console.log('- 因此只需要确定这一个font-size');
console.log('- 相比em更容易计算和使用');

// 3. 回调函数
console.log('\n3. 回调函数：');
console.log('回调是把一个函数作为参数传递给另一个函数，当满足某个条件时触发该参数函数');
console.log('主要用于异步操作，例如网络请求，防止页面同步代码阻塞导致渲染线程停止');

function longTask(callback, timeout) {
  setTimeout(callback, timeout);
}

console.log('\n开始执行异步任务...');
longTask(() => {
  console.log("回调任务被执行了");
}, 2000);

console.log('我是同步代码，不会被阻塞');

// 更多回调函数示例
function processData(data, callback) {
  console.log('处理数据中...');
  setTimeout(() => {
    const result = data.map(item => item * 2);
    callback(result);
  }, 1000);
}

processData([1, 2, 3, 4, 5], (result) => {
  console.log('处理结果：', result);
});

// 回调函数的应用场景
console.log('\n回调函数的应用场景：');
console.log('- 事件处理：addEventListener("click", callback)');
console.log('- 异步请求：fetch().then(callback)');
console.log('- 定时器：setTimeout(callback, delay)');
console.log('- 数组方法：array.map(callback), array.filter(callback)');
console.log('- 文件操作：fs.readFile(path, callback)');