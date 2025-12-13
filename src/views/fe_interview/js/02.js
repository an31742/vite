// 面经02：HTML元素、CSS3特性、字符串处理
console.log('=== 面经02：HTML元素、CSS3特性、字符串处理 ===');

// 1. HTML元素分类
console.log('\n1. HTML元素分类：');
console.log('常用块级元素：div、p、ul、li、ol、h1-h6、table、form');
console.log('常用行内元素：a、img、span、em、i、strong、button、input');

// 2. CSS3新增特性
console.log('\n2. CSS3新增特性：');
console.log('- 边框：border-radius、box-shadow、border-image');
console.log('- 背景：background-size、background-origin、background-clip');
console.log('- 渐变：linear-gradient、radial-gradient');
console.log('- 转换：transform、transition');
console.log('- 动画：@keyframes、animation');

// 3. 去除字符串空格的方法
console.log('\n3. 去除字符串空格的方法：');

let str = "1  0 9 9  9 88";
console.log('原字符串：', str);

// 方法1：正则表达式
console.log('去除所有空格：', str.replace(/\s*/g, ""));
console.log('去除两头空格：', str.replace(/^\s*|\s*$/g, ""));

// 方法2：split和join
console.log('split+join方法：', str.split(' ').join(''));

// split和join的详细解释
console.log('\n--- split和join详解 ---');
const testStr = 'The quick brown fox jumps over the lazy dog.';
const words = testStr.split(' ');
console.log('split(" ")结果：', words);

const chars = testStr.split('');
console.log('split("")结果：', chars.slice(0, 10), '...(截取前10个)');

const elements = ['Fire', 'Air', 'Water'];
console.log('join()结果：', elements.join());
console.log('join("")结果：', elements.join(''));
console.log('join("-")结果：', elements.join('-'));