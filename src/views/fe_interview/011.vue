<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/31">
              你对标签语义化的理解是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
      <code>
        见名知意，方便多人认识，
        且命名统一，简洁，易于重构代码
        有利于seo
  
      </code>
                </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/32">
              css常用的布局方式有哪些?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
      <code>
流式布局: 最基本的布局，就是顺着 html 像流水一样流下来
绝对定位: 利用 position: absolute 进行绝对定位的布局
float 布局: 最初用来解决多栏布局的问题。比如圣杯、双飞燕的布局都可以用 float 来实现
珊格布局: bootstrap 用的布局，把页面分为 24 分，通过 row 和 col 进行布局
flex 布局: css3 的布局可以非常灵活地进行布局和排版
grid 布局: 网格布局
      </code>
                </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/33">
              简要描述下JS有哪些内置的对象?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
      <code>
JS 的内置对象也称为“全局作用域里的对象”。与“全局对象”不同，全局对象是通过 this 访问（在浏览器里也就是 window 对象）。

标准的内置对象可以理解为可以直接调用的对象。常用的有下面这些:

undefined
NaN
null
eval()
parseInt() / parseFloat()
encodeURI() / encodeURIComponent()
decodeURI() / decodeURIComponent()
Number / Math / Date / RegExp / Array / String / Map / WeekMap / Set / WeekSet / Symbol / Object / Function / Error (都是可以 new 出来的对象)
JSON

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects
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
