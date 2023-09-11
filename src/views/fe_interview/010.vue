<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/28">
              viewport常见设置都有哪些？</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
    <code>
在移动端做开发时，必须要搞清楚 viewport 这一设置。

viewport 就是视区窗口，也就是浏览器中显示网页的部分。PC 端上基本等于设备显示区域，但在移动端上 viewport 会超出设备的显示区域（即会有横向滚动条出现）。
设备默认的 viewport 在 980 - 1024 之间。

为了让移动端可以很好地显示页面，因此需要对 viewport 进行设置。相关的设置值如下：


设置	解释
width	设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"
initial-scale	设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale	允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale	允许用户的最大缩放值，为一个数字，可以带小数
height	设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
user-scalable	是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许


viewport 是在 meta 标签内进行控制.

```
// width=device-width, initial-scale=1.0 是为了兼容不同浏览器
meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"

````
相关的衍生知识： dpr 与 CSS 像素。CSS 像素的 1px 在 PC 端上与设备的物理像素基本一致，而到手机端就会有两个物理像素对应一个 CSS 像素的情况出现（如 iPhone 的视网膜屏）。
所以 iPhone 上的 dpr = 2 即 2 个物理像素 / 一个 CSS 像素（独立像素)
    </code>
              </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/29">
              对比下px、em、rem有什么不同?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
    <code>
px、em、rem都是计量单位，都能表示尺寸，但是有有所不同，而且其各有各的优缺点。

Px表示“绝对尺寸”（并非真正的绝对），实际上就是css中定义的像素（此像素与设备的物理像素有一定的区别，后续详细说明见文末说明1），利用px设置字体大小及元素宽高等比较稳定和精确。Px的缺点是其不能适应浏览器缩放时产生的变化，因此一般不用于响应式网站。

em表示相对尺寸，其相对于当前对象内文本的font-size（如果当前对象内文本的font-size计量单位也是em，则当前对象内文本的font-size的参考对象为父元素文本font-size）。使用em可以较好的相应设备屏幕尺寸的变化，但是在进行元素设置时都需要知道父元素文本的font-size及当前对象内文本的font-size，如有遗漏可能会导致错误。

rem也表示相对尺寸，其参考对象为根元素的font-size，因此只需要确定这一个font-size。
    </code>
              </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/30">
              简要描述下什么是回调函数并写一个例子出来?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
    <code>
回调是把一个函数作为参数传递给另一个函数，当该函数满足某个条件时触发该参数函数。
主要用于异步操作 例如网络请求 防止页面同步代码阻塞导致渲染线程停止

function longTask(callback,timeout) {
  setTimeout(callback,timeout)
}
longTask(()=>{console.log("回调任务被执行了");},2000);
console.log("我是同步代码 不会阻塞我");

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
