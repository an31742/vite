<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/102">
            说说你对<meta>标签的理解？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
  无障碍Web（Web Accessibility，简称WAI）是指通过采用一系列的技术和标准，使得Web内容和Web应用程序能够对所有用户无论其能力水平、设备或环境条件如何，都能够访问、理解和使用。

以下是在开发过程中实现无障碍Web的一些建议：

1. **遵循Web内容无障碍指南（WCAG）**：
   - WCAG是一个国际性的标准，提供了一套关于如何使Web内容更加无障碍的指南。开发者应该熟悉并遵循这些指南。

2. **合适的HTML标记**：
   - 使用正确的HTML标记来描述页面的结构，例如正确使用标题、列表、表格等元素。

3. **提供清晰的页面结构和导航**：
   - 确保页面拥有清晰的结构，使得屏幕阅读器和其他辅助技术能够正确解释页面内容。

4. **提供有意义的文本和标签**：
   - 确保所有的页面元素都有合适的文本标签，以便于屏幕阅读器正确阅读和理解页面。

5. **使用无障碍表单**：
   - 确保表单元素具有明确的标签，并提供适当的错误提示信息。

6. **提供适当的图像描述**：
   - 对于所有的图像元素，使用`alt`属性提供适当的描述信息，以便于视觉障碍用户可以理解图像的内容。

7. **避免依赖于颜色**：
   - 不要仅仅依赖于颜色来传递信息，确保信息可以以其他方式传达。

8. **测试和评估无障碍性**：
   - 使用无障碍性测试工具来评估你的网站，例如WAVE、axe等工具。

9. **使用Aria属性**：
   - Accessible Rich Internet Applications（ARIA）提供了一组属性，可以用于改善交互式组件的无障碍性。

10. **键盘导航和焦点管理**：
    - 确保你的网站可以通过键盘进行完整的导航和操作，而无需使用鼠标。

11. **提供文档和培训**：
    - 为团队成员提供无障碍Web开发的培训，并提供相关的文档和资源。

通过遵循以上原则和实施相应的技术，你可以大大提高你的网站的无障碍性，使得更多的用户能够访问和使用你的网站，无论他们是否有特殊的能力需求。
                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/104">
            请描述css的权重计算规则</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>

!important	!important	Infinity
内联样式	style=".."	1000
ID	#id	100
class	.class	10
属性	[type='text']	10
伪类	:hover	10
标签	p	1
伪元素	::first-line	1
相邻选择器、子代选择器、通配符	* > +	0

1000>100。也就是说从左往右逐个等级比较，前一等级相等才往后比。
在权重相同的情况下，后面的样式会覆盖掉前面的样式。
继承属性没有权重值
通配符、子选择器、相邻选择器等的。虽然权值为0，但是也比继承的样式优先。
ie6以上才支持important，并且尽量少用它
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/104">
            写一个获取数组的最大值、最小值的方法</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>

 ```
Math.max.apply(Array,[25,62,91,78,34,62]) //  91
Math.min.apply(Array,[27,64,90,78,34,62]) // 27


Array.prototype.max = function() {
    return Math.max.apply(null, this)
}



let arr = [1,2,3,4] 
Math.max(...arr)
Math.min(...arr)

```
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
