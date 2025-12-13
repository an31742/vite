// 面经06：label标签、CSS三角形、去除制表符和换行符
console.log('=== 面经06：label标签、CSS三角形、去除制表符和换行符 ===');

// 1. label标签的作用
console.log('\n1. label标签的作用：');
console.log('- 文本标签：为关联的表单元素提供文本标签，用户可以点击标签来聚焦表单元素');
console.log('- 扩大响应区域：将input元素包裹在label内，扩大用户点击的响应区域');
console.log('- 模拟button：解决不同浏览器原生button样式不同的问题');
console.log('- 结合checkbox、radio实现纯CSS状态切换');
console.log('- input的focus事件会触发锚点定位，可以利用label当触发器实现选项卡切换效果');

// 2. CSS创建三角形
console.log('\n2. CSS创建三角形：');
console.log('原理：创建一个div，宽高都为0，利用border的四个边都是三角形的特性');
console.log('将其中几个边设置为transparent，即可得到三角形');

const triangleCSS = `
width: 0;
height: 0;
margin: 100px auto;
border-top: 50px solid transparent;
border-left: 50px solid transparent;
border-right: 50px solid transparent;
border-bottom: 50px solid red;
`;
console.log('CSS代码：', triangleCSS);

// 3. 去除制表符和换行符的方法
console.log('\n3. 去除制表符和换行符：');
console.log('正则表达式说明：');
console.log('\\f  匹配换页字符');
console.log('\\n  匹配换行字符');
console.log('\\r  匹配回车符字符');
console.log('\\t  匹配制表字符');
console.log('\\v  匹配垂直制表符');

const removeEmpty = (str) => str.replace(/[\t\n\v\r\f]/g, "");

let testStr = `|
    
     
  |`;
console.log('原字符串：', JSON.stringify(testStr));
console.log('处理后：', removeEmpty(testStr));