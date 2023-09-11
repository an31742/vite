<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/42">
              为什么HTML5只需要写!DOCTYPE HTML就可以?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
因为 HTML5 与 HTML4 基于的基准不同。HTML4 基于 SGML 因此需要除了 DOCTYPE 外还需要引入 DTD 来告诉浏览器用什么标准进行渲染。DTD 还分为标准模式、严格模式。如果什么都不写，就完全让浏览器自我发挥，会变成怪异模式。

HTML5 不基于 SGML，因此后面就不要跟 DTD，但是需要 DOCTYPE 来规范浏览器的渲染行为。

注：SGML 是通用标记语言的集合。其中有 HTML、XML，因此需要用 DTD 来指定使用那种规范。
  

            </code>
                      </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/43">
              position:fixed;在ios下无效该怎么办?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
                把需要用手滑动的内容用clss为.content（名字随便起）的div包起来，样式代码如下：

.content {
position: fixed;
top: 0;
left: 0;
bottom: 180px; /距离底部的距离为底部盒子的高度，自己也可以设置/
overflow-y: scroll;
width: 100%;
height: auto;
-webkit-overflow-scrolling: touch; /这句是为了滑动更顺畅/
}
-webkit-overflow-scrolling: touch; /这句是为了滑动更顺畅/
这句代码一定得写，要不上下滑动起来有些卡顿，亲自体验过的。
然后把需要固定在底部的内容用class为.footer（名字随便起）的div包起来，样式代码如下：

.footer {
position: fixed;
bottom: 0;
height: 180px;
}
这样，在真机上再次测试就没有问题了。如有更好的解决办法，希望大家互相交流




当采用 fixed 做吸底、吸顶布局时，如果触发键盘弹出事件则 fixed 属性会失效，布局就会被扰乱。其原因解释如下：

软键盘唤起后，页面的 fixed 元素将失效（即无法浮动，也可以理解为变成了 absolute 定位），所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。

** 第三方库 isScroll.js 可以解决此问题
            </code>
                      </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/44">
              什么是闭包？优缺点分别是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>

  大佬写的非常好
   https://cnodejs.org/topic/5d39c5259969a529571d73a8
            </code>
                      </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/45">
              你最喜欢用哪些编辑器？喜欢它的理由是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
 VSCode
代码开源, 社区强大, 插件丰富
轻量级
原生支持 ts 类型检查
跨平台
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
