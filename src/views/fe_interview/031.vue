<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/110">
            DOM和BOM有什么区别？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
BOM指 浏览器对象模型
提供了独立于内容而与浏览器窗口进行交互的对象。描述了与浏览器进行交互的方法和接口，可以对浏览器窗口进行访问和操作，譬如可以弹出新的窗口，改变状态栏中的文本。

DOM 是针对 HTML 的基于树的 API。描述了处理网页内容的方法和接口，是 HTML 的API，DOM 把整个页面规划成由节点层级构成的文档。
注意: 只有 JS 的宿主环境是浏览器的时候才有 DOM 和 BOM ，在 Node 中是没有这两个对象的


                        </code>
                        </pre>
      <img  style="width:100%;height:100%"  src="./images/auto-imports.d.png" alt="" srcset="">
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/111">
            让网页的字体变得清晰，变细用CSS怎么做</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
要使网页上的字体看起来清晰和细致，你可以使用CSS来调整字体的样式和属性。以下是一些常用的CSS属性，可以帮助你实现这个效果：

1. **字体族和字号**：
   ```css
   body {
     font-family: "Arial", sans-serif; /* 选择清晰的字体 */
     font-size: 16px; /* 设置合适的字号 */
   }
   ```

2. **字体粗细**：
   ```css
   p {
     font-weight: normal; /* 设置为normal以使用默认的字体粗细 */
   }
   ```

3. **字体平滑**：
   ```css
   body {
     -webkit-font-smoothing: antialiased; /* 通过抗锯齿技术使字体更清晰 */
     -moz-osx-font-smoothing: grayscale;
   }
   ```

4. **行高**：
   ```css
   p {
     line-height: 1.5; /* 设置适当的行高，使文字更清晰易读 */
   }
   ```

5. **字体颜色**：
   ```css
   body {
     color: #333; /* 使用合适的颜色以确保文字清晰可读 */
   }
   ```

6. **去除文字装饰**（如下划线）：
   ```css
   a {
     text-decoration: none; /* 去除链接的下划线等装饰效果 */
   }
   ```

7. **字体平滑处理（IE）**：
   ```css
   body {
     -ms-text-size-adjust: 100%; /* 在IE浏览器中设置字体大小为默认值 */
   }
   ```

8. **使用字体平滑的渲染方式**：
   ```css
   body {
     text-rendering: optimizeLegibility; /* 使用合适的字体渲染方式 */
   }
   ```

请注意，以上只是一些常用的样式调整，具体的效果可能会根据你的网页内容和设计需求而变化。你可以根据实际情况调整这些样式，并根据需要进一步定制字体的样式。
```
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/113">
            写一个方法把0和1互转（0置1，1置0）</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
```
~x + 2

```

```
function toggleZeroOne(num) {
  return num ^ 1;
}
```




                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/109">
            解释下CRLF是什么</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
CRLF 是一个缩写，代表“Carriage Return Line Feed”，它是两个特殊字符的组合
Carriage Return (CR)：代表回车符，ASCII 码为 13。它的作用是将光标移动到当前行的开头。

Line Feed (LF)：代表换行符，ASCII 码为 10。它的作用是将光标移动到下一行的开头

在Windows系统中，文本文件的行结束符通常是CRLF（\r\n）。
在Unix/Linux系统中，文本文件的行结束符通常是LF（\n）。
在老式的Mac OS中，文本文件的行结束符通常是CR（\r）
               </code>
               </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped></style>
