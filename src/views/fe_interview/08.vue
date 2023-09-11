<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizln/fe-interview/issues/19">
              第8天 简述下html5的离线储存原理，同时说明如何使用？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
  <code>
    HTML5的离线储存（Offline Storage）是一种在浏览器中缓存网页及相关资源的技术，允许用户在没有网络连接的情况下访问已缓存的网页。它的实现是通过使用浏览器提供的`Application Cache`API。

离线储存的原理如下：

1. 在服务器端创建一个包含缓存资源清单（Cache Manifest）的文本文件，通常以`.appcache`为后缀，例如`myapp.appcache`。

2. 在HTML的`html`标签中使用`manifest`属性来指定缓存清单的URL。

3. 浏览器在第一次加载网页时，会根据`manifest`属性中指定的URL下载并解析缓存清单。

4. 缓存清单中列出了需要缓存的资源，包括HTML文件、CSS样式表、JavaScript脚本、图片等。

5. 浏览器会根据缓存清单中的指示，将资源下载到本地存储，并在后续离线状态下使用这些缓存的资源。

使用离线储存的步骤如下：

1. 在服务器端创建缓存清单文件，列出需要缓存的资源。

   ```text
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
   ```

2. 在HTML文件中，使用`html`标签的`manifest`属性来指定缓存清单的URL。

   ```
   <html manifest="myapp.appcache"> </html>
   ```

3. 在缓存清单中的`CACHE`部分列出需要缓存的资源。可以是相对路径或绝对URL。

4. 在`NETWORK`部分列出需要在线访问的资源，可以使用`*`表示所有资源。

5. 可以在`FALLBACK`部分定义离线状态下的替代页面。

6. 浏览器会自动下载并缓存指定的资源，以供离线访问。

需要注意的是，浏览器会根据缓存清单的版本号（即清单文件的URL）来判断是否更新缓存。在缓存清单文件发生变化时，浏览器会重新下载并更新缓存。

使用HTML5的离线储存可以提升网页的访问速度和用户体验，但也需要注意清理过期的缓存和及时更新缓存清单，以保持资源的最新性。
  </code>
            </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/23"
              >清除浮动的方式有哪些及优缺点？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                   <code>
原文链接：https://xiangshuo.blog.csdn.net/article/details/52749993

回答前的唠叨：

在现在的实际工作当中我已经很少用浮动来布局了，真的很少，刚开始学习的时候用的还蛮多，现在Flex布局，标准文档流以及 定位 已经可以满足大部分的布局需求了。
浮动带来的问题是盒子塌陷问题，所以我们就来解决这个问题吧
什么是盒子塌陷？
外部盒子本应该包裹住内部的浮动盒子，结果却没有。

问题出现的原因
父元素只包含浮动元素，那么它的高度就会塌缩为零（前提就是你们没有设置高度（height）属性，或者设置了为auto，就会出现这种情况，如果父元素不包含任何的可见背景，这个问题会很难被注意到。
因为子元素设置了float属性，而float属性会把元素从标准文档流中抽离，直接结果就是外部盒子丢了两个孩子，因为内部没有其它盒子了，所以外部盒子只包裹文本节点内容，却把两个内部盒子扔在外面了。

解决方案

上面分析了问题出现的原因，不难找到第一种解决方案（既然孩子丢了，那就去找呗）——给外部盒子也添加浮动
把外部盒子也从标准文档流中抽离，让它和孩子们见面。
缺点：可读性差，不易于维护（别人很难理解为什么要给父元素也添上float），而且可能需要调整整个页面布局。

在外部盒子内最下方添上带clear属性的空盒子
可以是div也可以是其它块级元素，把 <div style="clear:both;"></div>放在盒内底部，用最下面的空盒子清除浮动，把盒子重新撑起来。
缺点：引入了冗余元素

用overflow:hidden清除浮动
给外部盒子添上这个属性就好了，非常简单。
缺点：有可能造成溢出元素不可见，影响展示效果。

用after伪元素清除浮动
给外部盒子的after伪元素设置clear属性，再隐藏它
这其实是对空盒子方案的改进，一种纯CSS的解决方案，不用引入冗余元素。

.clearfix {*zoom: 1;}
.clearfix:before,.clearfix:after {display: table;line-height: 0;content: "";}
.clearfix:after {clear: both;}
这也是bootstrap框架采用的清除浮动的方法。

题外话

其实还有一种最直接的办法：给每个盒子规定width和height，要多大给多大即可。但这并不算什么解决方案，因为这样的布局不是内容自适应的，但如果页面内容极少发生变动，这也是一个不错的方案，因为它的兼容性是毋庸置疑的。


                    </code>
               </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/24"
              >写一个加密字符串的方法？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                      <code>
function encode (str) {
	return btoa(encodeURIComponent(str));
}

function decode (str) {
	return decodeURIComponent(atob(str));
}
  


// 利用 base64, 浏览器环境自带 btoa / atob 方法
// Node.js 需要引入相关库
const str = "abcdefg";

console.log(btoa(str));
console.log(atob(btoa(str)));

// 凯撒密码
const encodeCaesar = ({str = "", padding = 3}) =>
  !str
    ? str
    : str
        .split("")
        .map((s) => String.fromCharCode(s.charCodeAt() + padding))
        .join("");

const decodeCaesar = ({str = "", padding = 3}) =>
  !str
    ? str
    : str
        .split("")
        .map((s) => String.fromCharCode(s.charCodeAt() - padding))
        .join("");

console.log(encodeCaesar({str: "hello world"}));
console.log(decodeCaesar({str: "khoor#zruog"}));
                      </code>
                  </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let child = "aaa";
    let parent = "aaabcaaaopaaalu";
    let childInNums = parent.split(child).length - 1;
    console.log(childInNums);
    return {
      childInNums,
    };
  },
});
</script>
