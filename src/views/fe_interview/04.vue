<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/10">
              HTML5的文件离线储存怎么使用，工作原理是什么？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                <code>
                    使用方法：创建一个和html同名的manifest文件，然后在页面头部加入manifest属性：manifest="index.manifest",然后cache。manifest文件中编写需要离线存储的资源，在离线状态下，操作window.applicatiobCahe进行离线缓存的操作
                    原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些支援就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

                    https://www.cnblogs.com/jing-tian/p/11011369.html

                    Service Work 工作原理是在客户端请求网站的时候，先注册Service Work，然后利用其拦截并缓存页面所需要的资源，当离线的时候，请求的资源会优先从Service Work 缓存的资源中返回
                 </code>
               </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/11"
              >CSS选择器有哪些？哪些属性可以继承？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
                CSS中常见的选择器有以下几种：

1. 元素选择器：使用 HTML 元素名称作为选择器，例如 `div`, `p`, `a`。
2. 类选择器：使用类名选择元素，以`.`开始，例如 `.classname`。
3. ID 选择器：使用元素的唯一 ID 属性选择元素，以`#`开始，例如 `#idname`。
4. 后代选择器：选择元素的后代元素，使用空格分隔，例如 `div p` 表示选择 div 内的所有 p 元素。
5. 直接子元素选择器：选择作为某个元素直接子元素的元素，使用`>`分隔，例如 `div > p` 表示选择 div 直接下级的所有 p 元素。
6. 兄弟选择器：选择与某个元素相邻的兄弟元素，使用`~`分隔，例如 `p ~ span` 表示选择 p 元素之后的所有 span 元素。
7. 属性选择器：根据元素的属性选择元素，例如 `[type="text"]` 表示选择 type 属性值为 text 的元素。
8. 伪类选择器：表示元素的特殊状态，例如 `:hover` 表示当鼠标悬停在元素上时。
9. 伪元素选择器：表示元素的特定部分，例如 `::before` 和 `::after` 用于在元素前后插入内容。
10. 全局选择器：使用 `*` 选择所有元素。

至于哪些属性可以继承，一般来说，以下属性是可以被子元素继承的：

1. 字体相关属性：font-family、font-size、font-weight、font-style、line-height。
2. 文本相关属性：color、text-align、text-decoration、text-transform、text-indent。
3. 布局相关属性：margin、padding、border、width、height。
4. 表格相关属性：border-collapse、border-spacing。

需要注意的是，并非所有的属性都可以继承。例如背景图像相关的属性、定位属性、浮动属性等一般不会被子元素继承。此外，继承的行为也可以通过 `inherit` 关键字进行控制，用于确保子元素继承父元素的特定属性。
              </code>
         </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/12"
              >写一个方法把下划线命名转成大驼峰命名？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                <code>

可以使用以下 JavaScript 方法将下划线命名转换为大驼峰命名：
//第一种方法使用正则替换
```javascript
function underscoreToCamelCase(underscoreName) {
  return underscoreName.replace(/_([a-z])/g, function(match, letter) {
    return letter.toUpperCase();
  });
}
```

使用示例：

```javascript
let underscoreName = "my_variable_name";
let camelCaseName = underscoreToCamelCase(underscoreName);
console.log(camelCaseName); // 输出 "myVariableName"
```

在上述方法中，我们使用正则表达式 `/_(\w)/g` 匹配下划线和下划线后的一个字符，并使用 `replace()` 方法将匹配到的字符替换为匹配字母并转换为大写形式的结果。这样，我们就可以实现将下划线命名转换为大驼峰命名的功能。


//第二种方法先将字符串转换成数组然后再将数组的第一个字符转化成为大写            
let str='a_c_dbl'
function toCamelCase(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .split('_')
    .map(item => item.charAt(0).toUpperCase() + item.substr(1, item.length))
    .join('');
}
console.log(toCamelCase(str))


JavaScript 中的字符串方法 `charAt()` 用于返回指定索引位置的字符。

语法：
```javascript
string.charAt(index)
```

参数：
- `index`：要获取字符的索引位置。索引从 0 开始，范围是从 0 到字符串长度减 1。

返回值：
返回给定索引位置的字符。如果索引超出字符串长度或为负数，则返回一个空字符串。

示例：
```javascript
let str = "Hello World";
console.log(str.charAt(0)); // 输出 "H"
console.log(str.charAt(6)); // 输出 "W"
console.log(str.charAt(11)); // 输出 "d"
console.log(str.charAt(20)); // 输出 ""
```

该方法适用于获取字符串中特定位置的字符，可以通过指定的索引来访问和操作字符串中的字符.


JavaScript 中的字符串方法 `toUpperCase()` 用于将字符串中的字母转换为大写形式。

语法：
```javascript
string.toUpperCase()
```

参数：
该方法没有接受任何参数。

返回值：
返回一个新的字符串，其中包含原字符串的大写形式。

示例：
```javascript
let str = "Hello World";
console.log(str.toUpperCase()); // 输出 "HELLO WORLD"
```

`toUpperCase()` 方法将字符串中的所有字母都转换为大写形式，并返回一个新的字符串。原始字符串本身不会被修改，若希望修改原始字符串，需要将新的结果赋值给变量。

需要注意的是，`toUpperCase()` 方法只会将字母字符进行转换，对于非字母字符（如数字、符号等）不会产生影响.
                </code>
            </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let str = "1  0 9 9  9 88";

    console.log(str.split(" ").join(""));

    var string = " 1 2 3445 6    ";
    console.log(string.split(" ").join("")); // 输出"1234456"
    const router = useRouter();

    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1",
        query: {
          id: 1,
        },
      });
    };
    const toLocalStorage = () => {
      router.push({
        path: "/toLocalStorage",
      });
    };

    return {
      string,
      str,
      toLocalStorage,
      fe_interview,
    };
  },
});
</script>

<style scoped></style>
