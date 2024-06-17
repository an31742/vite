<!--
 * @Author: maxiangan
 * @Date: 2023-11-02 17:25:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-14 11:23:09
 * @Description: 请填写简介
-->
<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/122">
            Standards模式和Quirks模式有什么区别</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                   <code>
 在很久以前的网络上，页面通常有两种版本：为网景（Netscape）的 Navigator 准备的版本，以及为微软（Microsoft）的 Internet Explorer 准备的版本。当 W3C 创立网络标准后，为了不破坏当时既有的网站，浏览器不能直接弃用这些标准。因此，浏览器采用了两种模式，用以把能符合新规范的网站和老旧网站区分开。

目前浏览器的排版引擎使用三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）。在怪异模式下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。在标准模式下，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现
MDN 答案

        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/123">
             浏览器是怎样判断元素是否和某个CSS选择器匹配</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                   <code>
```
div.ready #wrapper > .bg-red
先把所有元素 class 中有 bg-red 的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的 parent id 不为 #wrapper 则把元素从集合中删去。 再向上，从这个元素的父元素开始向上找，没有找到一个 tagName 为 div 且 class 中有 ready 的元素，就把原来的元素从集合中删去。
至此这个选择器匹配结束，所有还在集合中的元素满足。大体就是这样，不过浏览器还会有一些奇怪的优化
```
             </code>
             
            </pre>
        </div>
        <img src="../../assets/img/57994240-c9535e80-7aee-11e9-8f26-9b660fb478b9.jpg" alt="">

        <div v-highlight>
          <pre>
                   <code>
```
1、为什么从后往前匹配因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所哟儿子快而且方便。关于文档流的解析方向，是因为现在的 CSS，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况；应用在即使 html 没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。

2、为什么是用集合主要也还是效率。基于 CSS Rule 数量远远小于元素数量的假设和索引的运用，遍历每一条 CSS Rule 通过集合筛选，比遍历每一个元素再遍历每一条 Rule 匹配要快得多。
```
             </code>
             
            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/120">
              canvas写一个关于520浪漫表白的代码 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
    
        body {
            margin: 0;
            overflow: hidden;
        }
  
        canvas id="canvas" /canvas 
 
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");

        // 设置画布大小
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 设置背景颜色
        context.fillStyle = "#fdeff2";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制文字
        context.font = "60px Arial";
        context.fillStyle = "#ff1493";
        context.textAlign = "center";
        context.fillText("520，我爱你！", canvas.width / 2, canvas.height / 2);

        // 绘制心形
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2 + 50);
        context.bezierCurveTo(
            canvas.width / 2 + 50,
            canvas.height / 2 + 50,
            canvas.width / 2 + 50,
            canvas.height / 2 - 50,
            canvas.width / 2,
            canvas.height / 2 - 50
        );
        context.bezierCurveTo(
            canvas.width / 2 - 50,
            canvas.height / 2 - 50,
            canvas.width / 2 - 50,
            canvas.height / 2 + 50,
            canvas.width / 2,
            canvas.height / 2 + 50
        );
        context.fillStyle = "#ff1493";
        context.fill();

        // 绘制箭头
        context.beginPath();
        context.moveTo(canvas.width / 2 - 50, canvas.height / 2 - 80);
        context.lineTo(canvas.width / 2 - 100, canvas.height / 2 - 140);
        context.lineTo(canvas.width / 2 - 80, canvas.height / 2 - 120);
        context.lineTo(canvas.width / 2 + 100, canvas.height / 2 - 120);
        context.lineTo(canvas.width / 2 + 80, canvas.height / 2 - 140);
        context.lineTo(canvas.width / 2 + 50, canvas.height / 2 - 80);
        context.closePath();
        context.fillStyle = "#ff1493";
        context.fill();

        // 绘制圆形
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2 + 50, 30, 0, 2 * Math.PI);
        context.fillStyle = "#ff1493";
        context.fill();

  
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
