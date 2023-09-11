<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/25">
              浏览器内多个标签页之间的通信方式有哪些？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
    <code>
WebSocket （可跨域）
postMessage（可跨域）
Worker之SharedWorker
Server-Sent Events
localStorage
BroadcastChannel
Cookies

https://xv700.gitee.io/message-communication-for-web/
    </code>
              </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/26"
              >简述下你理解的优雅降级和渐进增强?</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                     <code>
   优雅降级（Graceful Degradation）和渐进增强（Progressive Enhancement）是两种不同的前端开发策略，目的都是提供更好的用户体验，但在处理浏览器兼容性和功能支持方面有所差异。

1. 优雅降级（Graceful Degradation）：这种策略首先构建一个完全功能的应用程序，针对最先进的浏览器进行开发，利用最新的 HTML、CSS 和 JavaScript 特性。然后，在不支持这些新特性的旧版本浏览器上，以一种优雅的方式进行降级，使应用程序在这些浏览器上仍能正常运行。

   优雅降级的思想是先从最好的情况出发，然后根据浏览器的能力逐步做出妥协。在降级过程中，可能会去掉某些功能、改变布局或样式，并提供某些替代的操作途径或内容展示方式，以保证应用在旧版本浏览器上的可用性。尽管在旧版本浏览器上可能不具备最先进的效果，但至少能良好运行。

2. 渐进增强（Progressive Enhancement）：这种策略则是从基础功能出发，为所有浏览器构建一个基本可用的应用程序。随后，通过逐步增加和增强功能，针对现代浏览器提供更丰富、更交互性的体验。

   渐进增强的思想是从简单到复杂，先确保核心功能的可用性和性能，然后通过添加额外的功能或改进用户界面来提升用户体验。这样，即使旧版本浏览器可能无法支持某些高级特性，基本功能仍然保持可用，并且在支持这些特性的现代浏览器上提供更丰富的体验。

总结来说，优雅降级是先构建高级功能，并向下兼容以支持旧版本浏览器，而渐进增强是从基础功能开始，并逐步增加更高级的功能以提供更好的用户体验。两者的目标都是为了确保应用程序在不同环境和浏览器中的可访问性，并提供最好的用户体验。选择何种策略则取决于具体的项目需求和目标用户的浏览器使用情况。
  
                      </code>
                 </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/27"
              >写一个判断数据类型的方法？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                        <code>
function type (obj) {
	return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,'');
}

console.log(type([]))  //"Array"
console.log(type(1))  //"Number"
  
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
