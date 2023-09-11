<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/19">
              第7天 iframe框架都有哪些优缺点？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
<code>
优点：
可以实现异步刷新，单个 iframe 刷新不影响整体窗口的刷新（可以实现无刷新上传，在 FormData 无法使用时）
可以实现跨域，每个 iframe 的源都可以不相同（方便引入第三方内容）
多页面应用时，对于共同的 header, footer 可以使用 iframe 加载，拆分代码（导航栏的应用)
投放广告之类的飘窗无疑是最好的选择
缺点：
每一个 iframe 都对应着一个页面，也就意味着多余的 css, js 文件的载入，会增加请求的开销
如果 iframe 内还有滚动条，会严重影响用户体验
window.onload 事件会在所有 iframe 加载完成后才触发，因此会造成页面阻塞
很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差.
代码复杂，无法被一些搜索引擎索引
</code>
          </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/20"
              >简述你对BFC规范的理解？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                 <code>
是CSS中的一个渲染机制，BFC就相当于一个盒子，内部的元素与外界的元素互不干扰。它不会影响外部的布局，外部的布局也不会影响到它。
形成条件（任意一条）
float的值不是none
position 的值不是static或者relative
display的值是inline-block,table-cell,flex,table-caption或者inline-flex
overflow的值不是visible
特性
内部的盒子会在垂直方向上一个接一个的放置。
每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
BFC的区域不会与float的元素区域重叠
计算BFC的高度时，浮动子元素也参与计算
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

                  </code>
             </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/21"
              >统计某一字符或字符串在另一个字符串中出现的次数？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                    <code>

//第一种方法
通过str.match(target)找到是否符合的字符串
 function strCount(str, target) {
  let count = 0
  if (!target) return count
  while(str.match(target)) {
    //找到就会将对应的变成空循环判断加加就可以得到想要的了
    str = str.replace(target, '')
    count++
  }
  return count
}

console.log(strCount('abcdef abcdef a', 'abc'))


//第二种方法

let child='aaa'
let parent='aaabcaaaopaaalu'
var childInNums = parent.split(child).length - 1, 
console.log(childInNums)

//第3种方法
这里找到一个好方法。希望能有用。
function substrCount(str, target) {
if(Object.prototype.toString.call(str).slice(8,-1) === 'String' && !str)
alert("请填写字符串")；
else
// 使用正则全局寻找返回一个数组这个数组出线的次数就是了
return (str.match(new RegExp(target, 'g')).length);

                    </code>
                </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let child = "aaa";
    let parent = "aaabcaaaopaaalu";
    let childInNums = parent.split(child).length - 1;
    console.log(childInNums);
    return {
      childInNums,
    };
  },
});
</script>
