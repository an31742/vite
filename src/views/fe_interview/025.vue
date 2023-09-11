<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/78">
            说说 script script async 和 script defer的区别？</a
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
  
  ```
  script
   元素，用于在页面加载过程中立即下载并执行脚本。
  当浏览器遇到 script 标签时，会停止渲染页面，立即下载并执行脚本，然后再继续渲染页面。
  这可能会导致阻塞页面加载，尤其是如果脚本文件很大或需要较长时间来执行。
  ```
  ```
  script async:
  使用 async 属性的 script 元素会异步加载脚本文件。
  当浏览器遇到 script async 标签时，会继续渲染页面，同时异步下载脚本文件，然后在下载完成后立即执行脚本。
  异步加载的脚本不会阻塞页面的渲染，但也不能保证脚本的执行顺序。
  ```
  ```
  cript defer:

  使用 defer 属性的 script 元素也会异步加载脚本文件，但它保证脚本会按照它们在文档中的顺序执行。
  当浏览器遇到 script defer 标签时，会继续渲染页面，同时异步下载脚本文件，并在文档解析完成后按照它们在文档中的顺序执行。
  cript defer 会在 DOMContentLoaded 事件之前执行。
  ```
  ```
  总结：
  使用 script 会立即下载和执行脚本，可能会阻塞页面加载。
  使用 script async 会异步加载脚本，不会阻塞页面加载，但不能保证执行顺序。
  使用 script defer 也会异步加载脚本，不会阻塞页面加载，并且保证按顺序执行，但会在 DOMContentLoaded 事件之前执行。
  选择哪种加载方式取决于你的具体需求。如果脚本不依赖于页面加载过程中的其他内容，可以考虑使用 async 或 defer 以提高性能。如果需要保证脚本按顺序执行，可以使用 defer。
  ```

                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/79">
              在页面中的应该使用奇数还是偶数的字体？为什么呢?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
常用偶数号字体,但奇数号字体也没关系,例如 知乎正文使用15px字体,豆瓣电影使用13px字体UI设计师导出的设计稿一般都是偶数号字体
偶数字号容易和页面其他标签的其他属性形成比例关系
Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，
而 13、15、17 px 时用的是小一号的点阵（即每个字占的空间大了 1 px，但点阵没变），于是略显稀
疏。(没试过)
```
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/80">
              0.1 + 0.2、0.1 + 0.3和0.1 * 0.2分别等于多少？并解释下为什么？
              #80</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
                                  ```
 function checkPlatform() {
    let userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SysbianOS', 'Windows Phone', 'iPad', 'iPod'];

    for (let i = 0; i &lt; Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            return alert('当前为移动端设备，机型为：' + Agents[i]);
        }
    }
    return alert('当前为PC端');
}

checkPlatform();
                                  ```
                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/89">
              说说你工作中遇到过比较难的技术问题是什么？是如何解决的</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
这是在面试中经常被问到的一个问题，目的是查看面试者解决问题的能力。这里不做详细的某个技术难点来讲，因为可能你认为很难得问题，在别人那里根本不是事，就讲一下回答这个问题的思路吧。
这里的问题代表某个bug或某个难搞的需求。
回答思路：

问题出现的背景，比如说：‘在使用Vue开发xxx功能时中遇到xxx...’
问题出现的原因在哪里，如果定位到的。比如：'在使用xx调试发现的问题出现在xx..'
查找问题解决方法，比如：‘在xx论坛看到解决方法，在某某交流群内提问，询问身边(网上)的技术大佬’
问题解决后达到了什么效果，比如：‘加载速度提升了约4倍，受到领导同事的一致好评..’
问题解决后有什么感悟或收获，比如：‘原来使用xx方法就能xx，记录到我的bug-log中..’

               </code>
  
               </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
