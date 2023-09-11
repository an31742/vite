<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/58">
              怎样在页面上实现一个圆形的可点击区域?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
DOM 元素配合 border-radius: 50% 即可实现圆形点击区域。例子

利用 map 和 area 标签设置圆形点击区域。参考文章: <a href="https://www.zhangxinxu.com/wordpress/2017/05/html-area-map/">HTML 标签及在实际开发中的应用</a>

利用 SVG 作出圆形，然后添加点击事件。

如果在 canvas 上，就需要画出圆形，然后计算鼠标的坐标是否落在圆内。
            </code>
            </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/59">
              CSS 什么是FOUC？你是如何避免FOUC的?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                <code>
FOUC 即 Flash of Unstyled Content，是指页面一开始以样式 A（或无样式）的渲染，突然变成样式B。
原因是样式表的晚于 HTML 加载导致页面重新进行绘制。

通过 @import 方式导入样式表
style 标签在 body 中
解决方法：把 link 标签将样式放在 head 中
                </code>
                </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/60">
              理解的"use strict";是什么?使用它有什么优缺点?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                    <code>
                        严格模式，其实就是更严格了

设立"严格模式"的目的，主要有以下几个：
- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全;
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

我放几个常见的吧，详情可以去下面的文章中看

禁止this关键字指向全局对象
禁止在函数内部遍历调用栈
全局变量必须显式声明
arguments不再追踪参数的变化

```
(function(){
	"use strict"
	b=1//Uncaught ReferenceError: b is not defined
})()
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode
http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html
                    </code>
                </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/61">
              如何看待团建的？你们团建一般都怎么实施</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                    <code>
公司希望团建加强团队的凝聚力，大家可能在想：怎么可能能加强，吃喝玩乐，玩几个游戏就可以加强了？其实公司加强的是对公司有认可度的那群人的凝聚力，而不是那群打酱油，每天骂公司、摸鱼的那群人的凝聚力。
团建人太多了确实没太大的意义，更多就是完成公司的政治任务，对外宣传。我经常是参加团建的时候去认识公司的那些高级领导，和他们聊聊天，混个脸熟。后面我更多就带着小组的人一起出去浪，或者带着其他想和我们一起出去浪的同事出去浪，很多时候都是 AA 或者公司出一小部分，因为只要走公司账，他们经常玩不尽兴，总想着钱太少，玩的没意思，并且又有占便宜的心理，总之会玩的不舒服，所以很多时候我们都是自费出去玩。大家都是在外面打工的一群人，周末有很大一部分人想出去玩但是一个人不知道干啥，所以有一群人出去玩就会玩的比较好。
个人做法、看法，随意评价
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
