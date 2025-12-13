// 面经07：iframe框架、BFC规范、字符串统计
console.log('=== 面经07：iframe框架、BFC规范、字符串统计 ===');

// 1. iframe框架的优缺点
console.log('\n1. iframe框架的优缺点：');
console.log('优点：');
console.log('- 可以实现异步刷新，单个iframe刷新不影响整体窗口');
console.log('- 可以实现跨域，每个iframe的源都可以不相同');
console.log('- 多页面应用时，对于共同的header、footer可以使用iframe加载');
console.log('- 投放广告之类的飘窗无疑是最好的选择');

console.log('缺点：');
console.log('- 每个iframe都对应一个页面，增加请求开销');
console.log('- 如果iframe内还有滚动条，会严重影响用户体验');
console.log('- window.onload事件会在所有iframe加载完成后才触发');
console.log('- 很多移动设备无法完全显示框架，设备兼容性差');
console.log('- 代码复杂，无法被一些搜索引擎索引');

// 2. BFC规范理解
console.log('\n2. BFC规范：');
console.log('BFC是CSS中的一个渲染机制，相当于一个盒子，内部元素与外界元素互不干扰');
console.log('形成条件（任意一条）：');
console.log('- float的值不是none');
console.log('- position的值不是static或者relative');
console.log('- display的值是inline-block,table-cell,flex,table-caption或者inline-flex');
console.log('- overflow的值不是visible');

console.log('特性：');
console.log('- 内部的盒子会在垂直方向上一个接一个的放置');
console.log('- 每个元素的左外边距与包含块的左边界相接触');
console.log('- BFC的区域不会与float的元素区域重叠');
console.log('- 计算BFC的高度时，浮动子元素也参与计算');
console.log('- BFC就是页面上的一个隔离的独立容器');

// 3. 统计字符或字符串在另一个字符串中出现的次数
console.log('\n3. 统计字符串出现次数：');

// 方法1：使用match和replace
function strCount(str, target) {
  let count = 0;
  if (!target) return count;
  while (str.match(target)) {
    str = str.replace(target, '');
    count++;
  }
  return count;
}

// 方法2：使用split
function strCount2(str, target) {
  return str.split(target).length - 1;
}

// 方法3：使用正则
function strCount3(str, target) {
  if (Object.prototype.toString.call(str).slice(8, -1) === 'String' && !str) {
    console.log("请填写字符串");
    return 0;
  }
  return (str.match(new RegExp(target, 'g')) || []).length;
}

let testStr = 'abcdef abcdef a';
let target = 'abc';
console.log(`在"${testStr}"中查找"${target}":`);
console.log('方法1结果：', strCount(testStr, target));
console.log('方法2结果：', strCount2(testStr, target));
console.log('方法3结果：', strCount3(testStr, target));

// 测试另一个例子
let child = "aaa";
let parent = "aaabcaaaopaaalu";
let childInNums = parent.split(child).length - 1;
console.log(`在"${parent}"中查找"${child}"的次数：`, childInNums);