<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/70">
              谈谈你对input元素中readonly和disabled属性的理解?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                  <code>
相同点:都会使文本框变成只读,不可编辑

不同点:
disabled属性在将input文本框变成只读不可编辑的同时,还会使文本框变灰,但是readonly不会。例如:左侧的input文本框设置了readonly属性,右侧的input文本框设置了disabled属性
设置了readonly属性的input元素依然可以获取焦点,但是设置了disabled属性的input元素没有办法获取焦点
readonly只针对input和textarea有效,而disabled对于所有的表单元素都有效
常用情况:
在某个表单中为用户预先填写了某个内容,不允许用户改动,但是在提交时需要传递该值,此时应该将它的属性设置为readonly
常常在用户按了提交按钮后,利用JavaScript将提交按钮禁用掉,可以防止用户反复点击按钮,多次提交
总结
readonly:不可编辑、可复制、可选择、可以接收焦点但不能被修改,后台会接收到传值
disabled:不可编辑、不可复制、不可选择、不能接收焦点,后台也不会接收到传值
                  </code>
                  </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/71">
              说说你对line-height是如何理解的?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                      <code>
                        "line-height" 属性用于控制文本行之间的行高（行间距）。它可以影响到文本在行框内的垂直对齐方式和整体间距的外观。下面是我对这个属性的理解:

1. **行高的计算**:
   - 行高的计算是相对于文本字体大小来进行的,可以使用绝对单位（如像素）或相对单位（如百分比、倍数）来指定行高的值。
   - 行高的计算包括文本的实际高度、上行高度（水平线以上）和下行高度（水平线以下）。这些值的组合形成了文本行的整体高度。

2. **行高的影响**:
   - "line-height" 属性不仅影响文本行之间的垂直间距,还会影响行内元素在行框中的垂直对齐方式。
   - 如果行高值大于文本字体大小,文本将垂直居中显示在行框内。如果行高值小于字体大小,文本将向上对齐。
   - 行高值还会影响文本行在垂直方向上的外观,决定了行与行之间的间距大小。

总结起来,"line-height" 属性是控制文本行与行之间的垂直间距的一种方式。通过设置适当的行高值,可以影响文本的垂直对齐方式和整体间距,以满足设计和排版的需求。
                      </code>
                      </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/72">
              写一个方法验证是否为中文?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                          <code>
function isChinese(str) {
  const re = /^[\u4e00-\u9fa5]+$/;
  return re.test(str);
}
  
Unicode 编码 4e00  和 9fa5 分别表示第一个汉字和最后一个汉字的编码
  
  
                          </code>
                      </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/73">
              来说说你对重绘和重排的理解,以及如何优化</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                          <code>
        重绘:
        当盒子的位置、大小以及其他属性,例如颜色、字体大小等都确定下来之后,浏览器便把这些原色都按照各自的特性绘制一遍,将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为,浏览器会根据元素的新属性重新绘制,使元素呈现新的外观。
        触发重绘的条件:改变元素外观属性。如:color,background-color,font-size等.
        重排(回流):
        渲染树中的一部分(或全部)因为元素的规模尺寸,布局,隐藏等改变而需要重新构建,
        这就称为回流(reflow)。每个页面至少需要一次回流,就是在页面第一次加载的时候。
        重绘和重排的关系:在回流的时候,浏览器会使渲染树中受到影响的部分失效,并重新构造这部分渲染树,完成回流后,浏览器会重新绘制受影响的部分到屏幕中,该过程称为重绘。
        所以,重排必定会引发重绘,但重绘不一定会引发重排。
        触发重排的条件:任何页面布局和几何属性的改变都会触发重排, 比如:
        1、页面渲染初始化；(无法避免) 2、添加或删除可见的DOM元素；
        3、元素位置的改变,或者使用动画； 4、元素尺寸的改变——大小,外边距,边框；
        5、浏览器窗口尺寸的变化resize事件发生时;
        6、填充内容的改变,比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变；
        触发重排的条件:改变元素的大小 位置
        等如:width、height、pading、margin、position等;添加删除DOM操作等
        重绘重排的代价:耗时,导致浏览器卡慢. 优化
        1、浏览器自己的优化:浏览器会维护1个队列,把所有会引起回流、重绘的操作放入这个队列,等队列中的操作到了一定的数量或者到了一定的时间间隔,浏览器就会flush队列,进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
        2、我们要注意的优化:我们要减少重绘和重排就是要减少对渲染树的操作,则我们可以合并多次的DOM和样式的修改。并减少对style样式的请求。
        1直接改变元素的className
        2display:none；先设置元素为display:none；然后进行页面布局等操作；设置完成后将元素设置为display:block；这样的话就只引发两次重绘和重排；
        3不要经常访问浏览器的flush队列属性；如果一定要访问,可以利用缓存。将访问的值存储起来,接下来使用就不会再引发回流；
        4使用cloneNode(true or false) 和 replaceChild 技术,引发一次回流和重绘；
        5将需要多次重排的元素,position属性设为absolute或fixed,元素脱离了文档流,它的变化不会影响到其他元素；
        6如果需要创建多个DOM节点,可以使用DocumentFragment创建完后一次性的加入document;
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
