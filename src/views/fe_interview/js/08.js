// 面经08：HTML5离线存储、清除浮动、字符串加密
console.log('=== 面经08：HTML5离线存储、清除浮动、字符串加密 ===');

// 1. HTML5离线存储原理和使用
console.log('\n1. HTML5离线存储：');
console.log('原理：基于Application Cache API，使用缓存清单(.appcache文件)');
console.log('使用步骤：');
console.log('1. 在服务器端创建缓存清单文件，列出需要缓存的资源');
console.log('2. 在HTML的html标签中使用manifest属性指定缓存清单URL');
console.log('3. 浏览器根据缓存清单下载并缓存资源');
console.log('4. 离线状态下，浏览器会通过被离线存储的数据进行页面展示');

console.log('\n缓存清单示例：');
const manifestExample = `
CACHE MANIFEST
# Version 1.0

CACHE:
/index.html
/styles.css
/script.js
/images/logo.png

NETWORK:
*

FALLBACK:
/offline.html
`;
console.log(manifestExample);

// 2. 清除浮动的方式
console.log('\n2. 清除浮动的方式：');
console.log('问题：父元素只包含浮动元素，高度会塌缩为零');
console.log('解决方案：');
console.log('1. 给外部盒子也添加浮动（不推荐）');
console.log('2. 在外部盒子内最下方添加带clear属性的空盒子');
console.log('3. 用overflow:hidden清除浮动');
console.log('4. 用after伪元素清除浮动（推荐）');

const clearfixCSS = `
.clearfix {*zoom: 1;}
.clearfix:before,.clearfix:after {display: table;line-height: 0;content: "";}
.clearfix:after {clear: both;}
`;
console.log('clearfix方法（Bootstrap采用）：', clearfixCSS);

// 3. 字符串加密方法
console.log('\n3. 字符串加密方法：');

// Base64加密解密
function encode(str) {
  return btoa(encodeURIComponent(str));
}

function decode(str) {
  return decodeURIComponent(atob(str));
}

// 凯撒密码
const encodeCaesar = ({str = "", padding = 3}) =>
  !str ? str : str
    .split("")
    .map((s) => String.fromCharCode(s.charCodeAt() + padding))
    .join("");

const decodeCaesar = ({str = "", padding = 3}) =>
  !str ? str : str
    .split("")
    .map((s) => String.fromCharCode(s.charCodeAt() - padding))
    .join("");

let testStr = "hello world";
console.log('原字符串：', testStr);

// 注意：在Node.js环境中可能没有btoa/atob，这里用try-catch处理
try {
  console.log('Base64加密：', encode(testStr));
  console.log('Base64解密：', decode(encode(testStr)));
} catch (e) {
  console.log('Base64方法在当前环境不可用');
}

console.log('凯撒密码加密：', encodeCaesar({str: testStr}));
console.log('凯撒密码解密：', decodeCaesar({str: encodeCaesar({str: testStr})}));