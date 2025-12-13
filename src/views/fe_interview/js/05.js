// 面经05：超链接target属性、CSS3伪类、字符串大小写切换
console.log('=== 面经05：超链接target属性、CSS3伪类、字符串大小写切换 ===');

// 1. 超链接target属性
console.log('\n1. 超链接target属性：');
console.log('- _self: 默认属性，在当前窗口或框架中加载目标文档');
console.log('- _blank: 打开新的窗口或标签页（建议添加rel="noopener norefferrer"）');
console.log('- _parent: 在父级框架中载入目标文档');
console.log('- _top: 直接在顶层的框架中载入目标文档，加载整个窗口');

// 2. CSS3新增伪类
console.log('\n2. CSS3新增伪类：');
console.log('- :nth-child(n): 选择作为某个元素的子元素的第n个兄弟元素');
console.log('- :nth-of-type(n): 选择作为某个元素的指定类型的子元素中的第n个元素');
console.log('- :not(selector): 选择不匹配给定选择器的元素');
console.log('- :first-child: 选择作为其父元素的第一个子元素的元素');
console.log('- :last-child: 选择作为其父元素的最后一个子元素的元素');
console.log('- :first-of-type: 选择作为其父元素的指定类型的子元素中的第一个元素');
console.log('- :last-of-type: 选择作为其父元素的指定类型的子元素中的最后一个元素');
console.log('- :empty: 选择没有任何子元素的元素');
console.log('- :checked: 选择已选中的input元素');
console.log('- :enabled: 选择启用的表单元素');
console.log('- :disabled: 选择被禁用的表单元素');
console.log('- :hover: 选择鼠标悬停在元素上的状态');
console.log('- :focus: 选择获取焦点的表单元素');
console.log('- :target: 选择与URL中的锚点相匹配的元素');

// 3. 字符串大小写切换
console.log('\n3. 字符串大小写切换：');

function toggleCase(str) {
  let arr = [];
  for (let item of str) {
    if (item === item.toUpperCase()) {
      item = item.toLowerCase();
    } else {
      item = item.toUpperCase();
    }
    arr.push(item);
  }
  return arr.join('');
}

let testStr = 'aBcDeFgH';
console.log('原字符串：', testStr);
console.log('大小写切换后：', toggleCase(testStr));