<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/13">
              简述超链接target属性的取值和作用？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                  <code>
 a 标签的 target 属性一共有四个值。

_self

默认属性。在当前窗口或者框架中加载目标文档。

_blank

打开新的窗口或者新的标签页。在使用这个属性时，最好添加 rel="noopener norefferrer" 属性，防止打开的新窗口对原窗口进行篡改。防止 window.opener API 的恶意行为。

_parent

在 frame 或者 iframe 中使用较多。在父级框架中载入目标文档，当 a 标签本身在顶层时，与 _self 相同。

_top

在 frame 或者 iframe 中使用较多。直接在顶层的框架中载入目标文档，加载整个窗口
                   </code>
                 </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/14"
              >CSS3新增伪类有哪些并简要描述？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
CSS3 新增的一些常见的伪类有：

1. :nth-child(n) 伪类：选择作为某个元素的子元素的第 n 个兄弟元素。可以使用参数 n、odd（奇数）和 even（偶数）进行选择。
2. :nth-of-type(n) 伪类：选择作为某个元素的指定类型的子元素中的第 n 个元素。可以使用参数 n、odd 和 even 进行选择。
3. :not(selector) 伪类：选择不匹配给定选择器的元素。
4. :first-child 伪类：选择作为其父元素的第一个子元素的元素。
5. :last-child 伪类：选择作为其父元素的最后一个子元素的元素。
6. :first-of-type 伪类：选择作为其父元素的指定类型的子元素中的第一个元素。
7. :last-of-type 伪类：选择作为其父元素的指定类型的子元素中的最后一个元素。
8. :empty 伪类：选择没有任何子元素（包括文本节点）的元素。
9. :checked 伪类：选择已选中的 input 元素。
10. :enabled 伪类：选择启用的表单元素。
11. :disabled 伪类：选择被禁用的表单元素。
12. :hover 伪类：选择鼠标悬停在元素上的状态。
13. :focus 伪类：选择获取焦点的表单元素。
14. :target 伪类：选择与 URL 中的锚点相匹配的元素。


这些新增的伪类可以根据元素的状态、类型、位置、选择器和属性等条件进行选择和样式控制，为开发者提供了更多灵活的选择器操作，使得样式控制更加可定制和精确.
                </code>
           </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/15"
              >写一个把字符串大小写切换的方法？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                  <code>
let str = 'aBcDeFgH'
let arr = []
for(let item of str) {
  if (item === item.toUpperCase()) {
    item = item.toLowerCase()
  } else {
    item = item.toUpperCase()
  }
  arr.push(item)
}
let newStr = arr.join('')
console.log(newStr)
                  </code>
              </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let str = "1  0 9 9  9 88";

    console.log(str.split(" ").join(""));

    var string = " 1 2 3445 6    ";
    console.log(string.split(" ").join("")); // 输出"1234456"
    const router = useRouter();

    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1",
        query: {
          id: 1,
        },
      });
    };
    const toLocalStorage = () => {
      router.push({
        path: "/toLocalStorage",
      });
    };

    return {
      string,
      str,
      toLocalStorage,
      fe_interview,
    };
  },
});
</script>

<style scoped></style>
