<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/46">
              title与h1的区别、b与strong的区别、i与em的区别?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
                title与h1的区别

定义：
title是网站标题，一个页面只能有一个
h1是文章主题

作用：
title概括网站信息，可以直接告诉搜索引擎和用户这 个网站是关于什么主题和内容的，是显示在网页Tab栏里的；
h1突出文章主题，面对用户，更突出其视觉效果，指向 页面主体信息，是显示在网页中的。

注意：
如果title为空，但是页面存在h1,b,strong标签，搜索引擎会默认页面title为h1内的内容，所以 得出结论h1是在没有外界干扰下除title以外第二个能强调页面主旨的标记，在一个页面中应该使用且只使用一次h1标记。

b与strong的区别

定义：
b(bold)是实体标签，用来给文字加粗
strong是逻辑标签，作用是加强字符语气

区别：
b标签只是加粗的样式，没有实际含义，常用来表达无强调或着中意味的粗体文字
strong表示标签内字符重要，用以强调，其默认格式是加粗，但是可以通过css添加样式，使用别的样式强调

建议：为了符合css3的规范语义化，b应尽量少用而改用strong

i与em的区别

定义：
i(italic)是实体标签，用来使字符倾斜
em(emphasis)是逻辑标签，作用是强调文本内容

区别：
i标签只是斜体的样式，没有实际含义，常用来表达无强调或着重意味的斜体，比如生物学名、术语、外来语；
em表示标签内字符重要，用以强调，其默认格式是斜体，但是可以通过CSS添加样式。

建议：为了符合CSS3的规 范，i应尽量少用而改用em

tootip:
物理元素是告诉浏览器我应该以何种格式显示文字，逻辑元素告诉浏览器这些文字有怎么样的重要性。
对于搜索引擎来说em和strong比i和b要重视的多
  
              </code>
                        </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/47">
              style标签写在body前和body后的区别是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
                前
利于浏览器逐步渲染

后
由于浏览器以逐行方式对html文档进行解析；

当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染

在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

HTML4 中
不应该把 style 放到 body 中间

浏览器在渲染页面时 DOM 和 CSSOM 是并行的，然后两者结合形成 Render Tree 显示页面

从直觉上来说，style 写在 body 前不会对 DOM 的渲染进行阻塞；而写在 body 内会对 DOM 渲染进行阻塞

不过 W3C 在 HTML5.2 的定义中对于 style 标签的使用的定义中是允许将 style 放到 body 中的
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
              写一个数组去重的方法（支持多维数组）么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
  
 function uniqueArr(arr) {
  return [...new Set(arr.flat(Infinity))]
}

//判断是不是多维数组要是多维数据就变成1维
function flat(arr, target) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      flat(item, target)
    } else {
      target.push(item)
    }
  })
}
//先判断是增加一个数据
function flatArr(arr) {
  let result = []
  
  flat(arr, result)
  
  return result
}
在数组去重
function uniqueArr(arr) {
  return [...new Set(flatArr(arr))]
}

const result = uniqueArr([1, 2, 3, 4, [3, 4, [4, 6]]])

console.log(result) // 1,2,3,4,6


              </code>
                        </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/49">
              第15天 对于加班你是怎么看的?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
                加班就像借钱，救急不救穷
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
