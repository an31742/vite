<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/50">
              第16天 元素的alt和title有什么区别?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
        <code>
            概述
这道题大概还可以加个限定词，我们暂且把 title 标签排除在本次讨论之外。

元素的 alt 和 title 属性 有什么区别？

ALT 属性
最常见用在 img标签上，那我们先来看下 img 标签的 alt 属性。

alt 属性是一个必需的属性，它规定在图像无法显示时的替代文本。

假设由于下列原因用户无法查看图像，alt 属性可以为图像提供替代的信息：

网速太慢
src 属性中的错误
浏览器禁用图像
用户使用的是屏幕阅读器
img标签的 alt 属性指定了替代文本，用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容。

强烈推荐您在文档的每个图像中都使用这个属性。这样即使图像无法显示，用户还是可以看到关于丢失了什么东西的一些信息。而且对于残疾人来说，alt 属性通常是他们了解图像内容的唯一方式。

注释和提示：

注释：alt 属性的值是一个最多可以包含 1024 个字符的字符串，其中包括空格和标点。这个字符串必须包含在引号中。这段 alt 文本中可以包含对特殊字符的实体引用，但它不允许包含其他类别的标记，尤其是不允许有任何样式标签。

注释：当用户把鼠标移动到 img 元素上时，Internet Explorer 会显示出 alt 属性的值。这种行为并不正确。所有其他的浏览器正在向规范靠拢，只要当图像无法显示时，才会显示出替代文本。

提示：如果需要为图像创建工具提示，请使用 title 属性。

用法和语法：

用法：alt 属性只能用在 img、area 和 input 元素中（包括 applet 元素）。对于 input 元素，alt 属性意在用来替换提交按钮的图片。比如：

input type="image" src="image.gif" alt="Submit" 
语法：
规定图像的替代文本

alt 文本的使用原则：

如果图像包含信息 - 使用 alt 描述图像
如果图像在 a 元素中 - 使用 alt 描述目标链接
如果图像仅供装饰 - 使用 alt=""
TITLE 属性
定义和用法：

title 属性规定关于元素的额外信息。

这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）。

提示：title 属性常与 form 以及 a 元素一同使用，以提供关于输入格式和链接目标的信息。同时它也是 abbr 和 acronym 元素的必需属性。当然 title 属性是比较广泛使用的，可以用在除了base，basefont，head，html，meta，param，script 和 title 之外的所有标签。但是并不是必须的。

title 属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。这样就使得访问者知道那些链接将会带他们到什么地方，他们就不会加载一个可能完全不感兴趣的页面。另外一个潜在的应用就是为图像提供额外的说明信息，比如日期或者其他非本质的信息。

TITLE 标签
看时间还早，我们继续来看下 title 标签吧。

title元素可定义文档的标题。

浏览器会以特殊的方式来使用标题，并且通常把它放置在浏览器窗口的标题栏或状态栏上。同样，当把文档加入用户的链接列表或者收藏夹或书签列表时，标题将成为该文档链接的默认名称。

提示： title 标签是 head 标签中唯一要求包含的东西。

延伸阅读： 标题里是什么？

一定要选择一个正确的标题，这对于定义文档并确保它能够在 Web 上有效利用来说是十分重要的。

请记住，用户可以用任何顺序、独立地访问文档集中的每一个文档。所以，文档的标题不仅应当根据其他文档的上下文定义，而且还要显示其自身的特点。

含有文档引用排序的标题通常不是什么好标题。举个例子，像“第十六章”或“第五部分”这样的标题，对读者理解其内容方面毫无用处。描述性更强的标题，像“第十六章：HTML 标题”，或者“第五部分：如何使用标题”，这样的标题不仅表达了它在一个大型文档集中的位置，还说明了文档的具体内容，吸引读者更有兴趣读下去。

自我引用的标题也没有什么用处。像“主页”这样的标题和内容毫无关系，类似的还有“反馈页”或“常用链接”等。你应该设计一个能够传达一定内容和目的的标题，令读者凭这个标题就可以判断是否有必要访问这个页面。“元素的 alt 和 title 有什么区别 - Issue”，这就是一个描述性的标题。

人们常常会花费大量时间去创建 Web 文档，但却经常只是因为一个不吸引人或无意义的标题，而把这些努力全都浪费掉了。当自动为用户搜集链接的特殊软件在 Web 上越来越流行时，只有网页的标题才会作为与页面相关的描述性词语，被插入到庞大的链接数据库中。因此，我们怎么强调这一点都不过分：请为自己的每个文档都认真地选择一个描述性的、实用的并与上下文独立的标题。

END.
        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/51">
              请描述margin边界叠加是什么及解决方案?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
 margin 的边界叠加发生在竖直方向上（左右方向上不会叠加）。兄弟 DOM 节点、父元素中的第一个子节点、以及最后一个尾节点都会产生 margin 边界叠加的现象。由于 CSS 早期主要用在文字、图片排版上，因此上下 margin 的叠加是符合预期效果的。

margin 边界叠加从结果上来看就是以最大的值为准。
margin 边界叠加只会出现在普通文档流中，所以可以触发 BFC 来解决。
除此之外，也可以使用 padding 来代替 margin 或者增加 border 的值

            </code>
            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/48">
              返回到顶部的方法有哪些？把其中一个方法出来?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                <code>
总结了前面几位老哥的答案，另外加了一个 a 标签的锚点方法。

利用 a 标签的锚点。在顶部放一个 a 标签 <a name="top">顶部</a>，在需要回到顶部的位置放置一个 a 标签，地址为 top。 <a href="#top">回到顶部</a>。要做成隐藏的锚点，可以把内部的内容去掉，name 是必须的.

```
<!--  要做成隐藏的锚点，可以把内部的内容去掉，name 是必须的 -->
 a name="top">顶部 /a
a href="#top" target="_self"   回到顶部/a
```

利用 #，在 url 后增加 # 不会让页面刷新，并且可以回到顶部。可以对 location.href 进行设置 location.href += '#'。当这个方法执行多次即有多个 # 时，页面不会有响应.
```
<!--  可以对 location.href 进行设置 location.href += '#'。当这个方法执行多次即有多个 # 时，页面不会有响应 -->
a href="#" 返回顶部/a
```

利用 javascript 设置 scrollTop = 0，一般设置在最外层，即 document.documentElement.scrollTop = 0 就可以返回顶部

```
<!--  一般设置在最外层即 document.documentElement.scrollTop = 0 就可以返回顶部 -->
button @click="top()"  返回顶部/button
script
    function top(){
        document.documentElement.scrollTop = 0;
    }
/script
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
            ><a href="https://github.com/haizlin/fe-interview/issues/53">
              你在的公司有没有做代码审查（CodeReview）？如果有是怎么做的？如果没有你觉得应该怎么做才更好？</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                <code>
1：提交代码会把代码link发群里，全员都可以进行codereview（大佬一定会过一遍）有不合理代码直接提comment改好了再合并
2：每周一次的codereview全员参加，指定两位至三位小伙伴将本周开发的内容拿出来全部过一遍，全员现场提问现场解答，时间大概1~3h
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
