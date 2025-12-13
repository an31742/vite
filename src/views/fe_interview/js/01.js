// 面经01：CSS样式导入、布局、递归算法
console.log('=== 面经01：CSS样式导入、布局、递归算法 ===');

// 1. link和@import的区别
console.log('\n1. link和@import的区别：');
console.log('- link是HTML标签，@import是CSS提供的');
console.log('- link引入的样式页面加载时同时加载，@import引入的样式需等页面加载完成后再加载');
console.log('- link没有兼容性问题，@import不兼容ie5以下');
console.log('- link可以通过js操作DOM动态引入样式表改变样式，而@import不可以');

// 2. 圣杯布局和双飞翼布局
console.log('\n2. 圣杯布局和双飞翼布局：');
console.log('作用：两边定宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染');
console.log('区别：圣杯布局用padding+相对定位，双飞翼布局用margin');

// 3. 递归算法实现数组长度为5且元素的随机数在2-32间不重复的值
console.log('\n3. 递归算法生成不重复随机数组：');

function buildArray(arr, length, min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (!arr.includes(num)) {
    arr.push(num);
  }
  return arr.length === length ? arr : buildArray(arr, length, min, max);
}

var result = buildArray([], 5, 2, 32);
console.log('生成的随机数组：', result);

// 另一种实现方式
function insertArr(arr, i = 0, min = 2, max = 32) {
  if (arr.length >= 5) return arr;
  
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (!arr.includes(num)) {
    arr.push(num);
  }
  return insertArr(arr, i + 1, min, max);
}

const result2 = insertArr([]);
console.log('另一种实现的随机数组：', result2);