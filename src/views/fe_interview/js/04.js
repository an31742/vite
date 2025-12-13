// 面经04：HTML5离线存储、CSS选择器、命名转换
console.log('=== 面经04：HTML5离线存储、CSS选择器、命名转换 ===');

// 1. HTML5离线存储
console.log('\n1. HTML5离线存储：');
console.log('使用方法：创建manifest文件，在页面头部加入manifest属性');
console.log('原理：基于.appcache文件的缓存机制，通过解析清单离线存储资源');
console.log('Service Worker工作原理：在客户端请求网站时，先注册Service Worker，然后利用其拦截并缓存页面所需资源');

// 2. CSS选择器
console.log('\n2. CSS选择器类型：');
console.log('- 元素选择器：div, p, a');
console.log('- 类选择器：.classname');
console.log('- ID选择器：#idname');
console.log('- 后代选择器：div p');
console.log('- 直接子元素选择器：div > p');
console.log('- 兄弟选择器：p ~ span');
console.log('- 属性选择器：[type="text"]');
console.log('- 伪类选择器：:hover');
console.log('- 伪元素选择器：::before');

console.log('\n可继承的CSS属性：');
console.log('- 字体相关：font-family, font-size, font-weight');
console.log('- 文本相关：color, text-align, text-decoration');

// 3. 下划线命名转大驼峰命名
console.log('\n3. 下划线命名转大驼峰命名：');

// 方法1：正则替换
function underscoreToCamelCase(underscoreName) {
  return underscoreName.replace(/_([a-z])/g, function(match, letter) {
    return letter.toUpperCase();
  });
}

// 方法2：split + map
function toCamelCase(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .split('_')
    .map(item => item.charAt(0).toUpperCase() + item.substr(1, item.length))
    .join('');
}

let underscoreName = "my_variable_name";
console.log('原字符串：', underscoreName);
console.log('方法1结果：', underscoreToCamelCase(underscoreName));
console.log('方法2结果：', toCamelCase(underscoreName));

// charAt()和toUpperCase()方法说明
console.log('\n--- 方法说明 ---');
let demoStr = "Hello World";
console.log('charAt(0)：', demoStr.charAt(0));
console.log('charAt(6)：', demoStr.charAt(6));
console.log('toUpperCase()：', demoStr.toUpperCase());