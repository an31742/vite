<!--
 * @Author: maxiangan
 * @Date: 2023-11-02 17:25:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-13 17:34:43
 * @Description: 请填写简介
-->
<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/118">
            html和html5有什么区别呢</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>

          新的标签：HTML5引入了一些新的语义化标签，如header、footer、nav、article等，这些标签可以更清晰地描述网页的结构。

          多媒体支持：HTML5提供了内置的多媒体支持，包括video和audio标签，可以在网页中直接嵌入视频和音频。

          Canvas绘图：HTML5引入了anvas标签，可以使用JavaScript在网页上绘制图形、动画和游戏。

          表单控件：HTML5增加了一些新的表单控件，如日期选择器、颜色选择器、范围选择器等，使表单的输入更方便和丰富。

          本地存储：HTML5提供了本地存储的功能，可以使用localStorage和sessionStorage来在浏览器中存储数据，而不需要依赖服务器

            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span><a href="https://github.com/haizlin/fe-interview/issues/119">
                用CSS绘制一个三角形</a></span>
            </div>
          </template>
          <div class="text item">
            <div v-highlight>
              <pre>
                   <code>
```
.rect {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #fff;
  &::before{
    position: absolute;
    content: '';
    bottom: 7px;
    left: 20px;
    border: 80px solid transparent;
    border-bottom-color: white;
    z-index: 2;
   }
  &::after{
    position: absolute;
    content: '';
    bottom: 0px;
    border: 100px solid transparent;
    border-bottom-color: rgb(34, 230, 220);
    z-index: 1;
  }
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
          <span><a href="https://github.com/haizlin/fe-interview/issues/120">
            说说你对this的理解 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
```
基本上可以归为四类，
全局this 是window
函数this 是调用者
构造函数的this 是new 之后的新对象
call 和 apply bind的this第一个参数

```

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
