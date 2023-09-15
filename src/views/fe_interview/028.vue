<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/98">
            说说你对<meta>标签的理解？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
                          <meta> 标签是 HTML 中的一个元标记（meta tag），用于提供关于网页的元信息（metadata）。这些元信息通常不会直接显示在网页上，而是提供了关于网页内容的描述，以便浏览器、搜索引擎和其他自动化程序能够更好地理解和处理网页。

以下是一些常见的 <meta> 标签及其作用：

1. **字符集设置**：
   ```html
   <meta charset="UTF-8">
   ```
   这个标签告诉浏览器当前页面使用 UTF-8 字符编码，确保页面能正确地显示各种语言的文字。

2. **视口设置**（Viewport）：
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
   这个标签是响应式设计中非常重要的一部分，它告诉浏览器如何显示页面以适应不同设备的屏幕尺寸。

3. **描述**：
   ```html
   <meta name="description" content="网页描述">
   ```
   这个标签提供了对网页内容的简短描述，通常会在搜索引擎结果中显示。

4. **关键词**：
   ```html
   <meta name="keywords" content="关键词1, 关键词2, ...">
   ```
   这个标签提供了一组描述网页内容的关键词，尽管大多数搜索引擎不再依赖于它们来确定搜索结果，但有时仍然会被用作参考。

5. **作者**：
   ```html
   meta name="author" content="作者名"
   ```
   这个标签用于指定网页的作者。

6. **刷新**：
   ```html
   meta http-equiv="refresh" content="5;url=https://example.com"
   ```
   这个标签会在指定的时间间隔后自动刷新页面，可用于实现页面定时跳转。

7. **X-UA-Compatible**：
   ```html
   meta http-equiv="X-UA-Compatible" content="IE=edge"
   ```
   这个标签用于告诉 Internet Explorer 使用最新的渲染引擎。

8. **Open Graph（社交媒体分享）**：
   ```html
   meta property="og:title" content="标题"
   meta property="og:description" content="描述"
   meta property="og:image" content="图片链接"
   meta property="og:url" content="网页链接"
   ```
   这些标签提供了在社交媒体分享时显示的元信息，包括标题、描述、图片等。

这些只是 <meta> 标签的一部分，它们可以提供有关网页内容的重要信息，对于搜索引擎优化（SEO）和网页性能优化非常重要。同时，也可以通过自定义 <meta> 标签来提供其他特定于网站的元信息。
                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/99">
            rgba()和opacity这两个的透明效果有什么区别呢</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
`rgba()` 和 `opacity` 都可以用来实现元素的透明效果，但它们有一些重要的区别：

1. **语法和应用方式**：

   - `rgba()` 是一种 CSS 函数，用于设置元素的颜色和透明度。它接受四个参数：红色、绿色、蓝色和透明度（alpha），范围都是从 0 到 1，0 表示完全透明，1 表示完全不透明。
   
     例如：`rgba(255, 0, 0, 0.5)` 表示红色，透明度为 0.5。
   
   - `opacity` 是一个 CSS 属性，可以应用于元素的整体透明度。它接受一个值，范围也是从 0 到 1，0 表示完全透明，1 表示完全不透明。

2. **影响范围**：

   - `rgba()` 只影响元素的颜色，不影响元素的其他样式属性（如边框、文字等）。
   
   - `opacity` 影响整个元素，包括元素的所有子元素。

3. **性能和渲染**：

   - `rgba()` 在设置颜色透明度时，只会影响颜色，而不会触发合成层的创建。这意味着在复杂的页面中，使用 `rgba()` 可能会比 `opacity` 更具性能优势，因为不会引起合成层的变化。
   
   - `opacity` 会触发一个新的合成层，这可能会对性能产生一些影响，特别是在需要频繁重绘的情况下。

4. **继承性**：

   - `rgba()` 不具有继承性，它只会影响直接应用它的元素。
   
   - `opacity` 具有继承性，会影响元素及其所有子元素。

综上所述，如果你只需要设置元素的颜色透明度，而不影响其他样式属性，可以优先选择使用 `rgba()`。如果你希望整个元素（包括其子元素）变得半透明，可以使用 `opacity` 属性。同时，要考虑到性能方面的因素，特别是在需要频繁变化的情况下。
```
<form autocomplete="off">
  <!-- 表单元素 -->
</form>
```


使用type="password"：

对于密码字段，可以将其类型设置为password，这样Chrome不会自动填充密码

```
input type="password" name="password"
```

你也可以结合使用上述方法，以达到更好的效果

```
input[type="password"]:-webkit-autofill {
  background-color: #fff;
}
```

```
form autocomplete="off"
  input type="password" name="password"
/form

```
```
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/100">
              `[].forEach.call($$("*"),function(a){ a.style.outline="1px solid #"+(~~(Math.random()*(1&lt;&lt;24))).toString(16) })`解释下面代码的意思</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
                                  这段代码是一段 JavaScript 代码，它使用了 DOM（文档对象模型）来选择页面中的所有元素，并为它们添加一个随机颜色的边框。

让我逐步解释代码：

1. `$$("*")`：
   - `$$` 是一个浏览器环境下的特殊函数，它相当于 `document.querySelectorAll` 的一个快捷方式，用于选择匹配特定 CSS 选择器的所有元素。
   - 在这里，`"*"` 表示选择所有类型的元素，也就是页面上的所有元素。

2. `[].forEach.call(...)`：
   - 这是一个数组的原型方法 `forEach` 的调用，但是它被应用在一个类数组对象上。
   - `$$("*")` 返回的是一个 NodeList（节点列表），它并不是一个真正的数组，但它可以通过类数组对象的方式来遍历，这里通过 `[].forEach.call(...)` 的方式来实现。

3. `function(a) {...}`：
   - 这是一个匿名的回调函数，它将会作为 `forEach` 的参数，对 `$$("*")` 选中的每一个元素执行一次。

4. `a.style.outline = ...`：
   - `a` 是 `forEach` 遍历的当前元素。
   - `style` 是该元素的 CSS 样式对象。
   - `outline` 是一个 CSS 属性，它通常用于在元素周围创建一个轮廓。在这里，被设置成了一个随机颜色的 1 像素实线边框。

5. `~~(Math.random()*(1&lt;&lt; 24))`：
   - 这部分代码生成一个随机的24位颜色值。它的具体含义如下：
     - `Math.random()` 生成一个范围在 0 到 1 之间的随机数。
     - `1&lt;&lt;24` 将数字 1 左移 24 位，得到一个大约为 16777216（即 2^24）的数值。
     - `Math.random()*(2^24)` 将随机数控制在这个范围内。
     - `~~` 是将浮点数强制转换为整数的一种快速方式，它将舍去小数部分。

   - 最终，这部分代码会生成一个介于 0 和 16777216 之间的随机整数。

6. `.toString(16)`：
   - 这将把生成的随机整数转换成一个16进制的字符串。

综合起来，这段代码的作用是为页面中的所有元素添加一个随机颜色的 1 像素实线边框。这个颜色是通过随机生成一个24位的颜色值，并将其转换为16进制来实现的。

                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/101">
            在浏览器中输入url到页面显示出来的过程发生了什么</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
                在浏览器中输入URL并按下回车后，发生了以下一系列的步骤，通常称为“浏览器的请求-响应过程”：

1. **URL解析**：
   - 浏览器首先会解析输入的URL。这个URL包含了协议（如http或https）、主机名（如www.example.com）以及路径（如/index.html）等信息。

2. **DNS解析**：
   - 浏览器将主机名（www.example.com）转换为对应的IP地址。这一步是通过DNS服务器进行的。

3. **建立TCP连接**：
   - 浏览器与服务器之间建立一个TCP连接。TCP协议确保了数据在网络上的可靠传输。

4. **发起HTTP请求**：
   - 浏览器向服务器发送一个HTTP请求。这个请求包含了要访问的资源的类型（GET请求通常用于获取页面内容）、资源路径等信息。

5. **服务器处理请求**：
   - 服务器接收到浏览器发送的请求，然后根据请求的内容进行处理。这可能涉及到从数据库中检索数据、执行代码等。

6. **服务器返回响应**：
   - 服务器会返回一个HTTP响应，包括响应状态码（如200表示成功，404表示未找到资源等）和响应内容（如HTML、CSS、JavaScript等文件）。

7. **接收响应**：
   - 浏览器接收到服务器的响应后，开始解析响应内容。

8. **解析HTML**：
   - 如果响应内容是HTML页面，浏览器会开始解析HTML文档，并构建文档的DOM树（文档对象模型）。

9. **加载外部资源**：
   - 浏览器会继续解析HTML以及其中引用的外部资源，如CSS、JavaScript、图片等。这些资源会触发额外的HTTP请求。

10. **构建渲染树**：
    - 浏览器会根据DOM树和CSS样式表构建一个渲染树，渲染树包含了所有需要显示的元素以及它们的样式信息。

11. **布局和绘制**：
    - 浏览器使用渲染树来计算每个元素在屏幕上的位置和大小，并将其绘制出来。

12. **显示页面**：
    - 最终，页面的内容会在浏览器窗口中显示给用户。

需要注意的是，这个过程是高度并行化的，意味着浏览器可以同时处理多个请求和解析任务，从而提高页面加载速度。此外，现代浏览器还会使用缓存、预加载等技术来优化页面加载性能。
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
