<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/136">
           html5哪些标签可以优化SEO</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
         <code>
HTML5 引入了一些新的语义化标签，这些标签不仅使得页面结构更加清晰和语义化，同时也对搜索引擎优化（SEO）起到了积极的作用。以下是一些 HTML5 标签，它们可以帮助优化页面的 SEO：

1. *"<header>header</header>"**：
   - 用于定义文档或文档的一部分的页眉（header）。

2. **`<footer>footer</footer>`**：
   - 用于定义文档或文档的一部分的页脚（footer）。

3. **`<nav>nav</nav>`**：
   - 定义导航链接的容器，通常包含页面的主要导航链接。

4. **`<article>article</article>`**：
   - 用于定义独立的、可以独自分配的内容块，比如一篇博客文章。

5. **`<section>section</section>`**：
   - 用于定义文档的某个区域或部分，通常包含一个标题。

6. **`<aside></aside>`**：
   - 定义页面内容之外的内容，通常表示侧边栏或一些附加信息。

7. **`<main>main</main>`**：
   - 用于定义文档的主要内容。在一个文档中应该只包含一个 `<main></main>` 元素。

8. **`<figure>figure</figure>`** 和 **`<figcaption>figcaption</figcaption>`**：
   - `<figure>figure</figure>` 用于包裹媒体内容，例如图片，而 `<figcaption>figcaption</figcaption>` 用于为 `<figure></figure>` 元素添加标题。

9. **`time`**：
   - 用于表示日期和时间，对于一些带时间戳的内容，可以使用 `<time>time</time>` 元素提供更好的语义。

这些标签的使用有助于搜索引擎更好地理解页面的结构和内容，提高页面的可读性和可访问性。除了标签本身，对于 SEO，还需要关注页面的标题、元描述、头部标签的正确使用以及页面的性能等方面。
        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/137">
              不使用border画出1px高的线，在不同浏览器的标准和怪异模式下都能保持效果一样</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
.line {
  position: relative;
}

.line::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5em; /* 调整这个值以控制线的位置 */
  width: 100%;
  height: 1px;
  background-color: black; /* 线的颜色 */
  transform-origin: 0 0;
  transform: scaleY(0.5); /* 调整这个值以控制线的粗细 */
}


             </code>
            </pre>
        </div>

      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/138">
              找到字符串中最长的单词，并返回它的长度</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>


你可以通过编写一个函数来找到字符串中最长的单词，并返回其长度。以下是一个使用 JavaScript 的示例：

```javascript
function findLongestWordLength(str) {
  // 将字符串分割成单词数组
  var words = str.split(' ');

  // 初始化最长单词长度
  var maxLength = 0;

  // 遍历单词数组，更新最长单词长度
  for (var i = 0; i &lt; words.length; i++) {
    // 移除单词中的标点符号等非字母字符
    var cleanWord = words[i].replace(/[^a-zA-Z]/g, '');

    // 更新最长单词长度
    if (cleanWord.length > maxLength) {
      maxLength = cleanWord.length;
    }
  }

  return maxLength;
}

// 示例用法
var sentence = "The quick brown fox jumps over the lazy dog.";
var result = findLongestWordLength(sentence);
console.log(result);  // 输出：6（因为"jumps"是最长的单词）
```

这个函数首先使用 `split(' ')` 将字符串分割成单词数组，然后通过一个循环遍历数组中的每个单词，使用 `replace` 方法去除单词中的标点符号等非字母字符，最后比较单词的长度并更新最长单词长度。

                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/139">
              如果让你快速使用一门你不熟悉的新技术，你该怎么办 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
我现在的做法：
1、一定先去官网查看官方文档和API，其他别人写的教程无视。
2、下载官方Demo运行学习。
3、自己练习1~2个Demo，涵盖常用的重要的API的使用，实践学习理解，有问题就谷歌。
4、运用到项目中。
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
