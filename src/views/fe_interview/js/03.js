// 面经03：HTML全局属性、元素隐藏、字符串操作
console.log('=== 面经03：HTML全局属性、元素隐藏、字符串操作 ===');

// 1. HTML全局属性
console.log('\n1. HTML全局属性：');
console.log('- accesskey: 设置快捷键');
console.log('- class: 为元素设置类标识');
console.log('- contenteditable: 指定元素内容是否可编辑');
console.log('- data-*: 为元素增加自定义属性');
console.log('- draggable: 设置元素是否可拖拽');
console.log('- hidden: 规定元素仍未或不在相关');
console.log('- id: 元素id，文档内唯一');
console.log('- lang: 元素内容的语言');
console.log('- style: 行内css样式');
console.log('- tabindex: 设置元素可以获得焦点');
console.log('- title: 规定元素有关的额外信息');

// 2. 隐藏元素的方法
console.log('\n2. 隐藏元素的方法：');
console.log('- display: none');
console.log('- opacity: 0');
console.log('- visibility: hidden');
console.log('- z-index: -9999999999999');
console.log('- transform: scale(0)');
console.log('- margin-left: -100%');
console.log('- width: 0; height: 0;');

// 3. 去除字符串中最后一个指定字符
console.log('\n3. 去除字符串中最后一个指定字符：');

// 方法1：使用substring和lastIndexOf
function delLast(str, del) {
  if (typeof str !== 'string') {
    console.log('请确认要删除的对象为字符串！');
    return false;
  }
  // 找到最后一个字符出现的位置
  let index = str.lastIndexOf(del);
  // 截取最后一个之前的所有字符 + 截取最后一个字符之后的所有字符
  return str.substring(0, index) + str.substring(index + 1, str.length);
}

// 方法2：使用正则
function delLast2(str, target) {
  let reg = new RegExp(`${target}(?=([^${target}]*)$)`);
  return str.replace(reg, '');
}

// 方法3：使用split和join
function delLast3(str, target) {
  return str.split('').reverse().join('').replace(target, '').split('').reverse().join('');
}

let testStr = 'asdfghhj';
console.log('原字符串：', testStr);
console.log('方法1删除最后一个h：', delLast(testStr, 'h'));
console.log('方法2删除最后一个h：', delLast2(testStr, 'h'));
console.log('方法3删除最后一个h：', delLast3(testStr, 'h'));