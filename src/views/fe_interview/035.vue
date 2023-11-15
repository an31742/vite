<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/128">
            用一个div模拟textarea的实现</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
         <code>
 <!-- <div class="edit" contenteditable="true" style="resize: both">这里是可以编辑的内容，配合容器的 overflow ，多行截断，自定义滚动条，简直好用的不要不要的</div> -->
 .edit{
    width: 300px;
    height: 200px;
    padding: 5px;
    border: solid 1px #ccc;
    resize: both;
    overflow:auto;
}
        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/129">
              使用flex实现三栏布局，两边固定，中间自适应</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                   <code>
            ```     
<!-- <div class="container">
  <section class="left red"></section>
  <section class="middle blue"></section>
  <section class="right red"></section>
</div> -->

.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.left,
.right {
  flex: 0 0 auto;
  width: 50px;
  height: 100%;
}

.middle {
  flex: 1 1 auto;
  height: 100%;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
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
          <span><a href="https://github.com/haizlin/fe-interview/issues/130">
             谈一谈你知道的前端性能优化方案有哪些 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
之所以会报错，是因为在这里的 . 发生了歧义，它既可以理解为小数点，也可以理解为对方法的调用。
因为这个点紧跟于一个数字之后，按照规范，解释器就把它判断为一个小数点。

所以我们可以这样修改下：

(10).toFixed(10)
10..toFixed(10)
10 .toFixed(10)
10.0.toFixed(10)

当然出现这个报错是因为前面这个数是整数，如果本来就是小数就不会出现这个报错
 

  
                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/131">
              谈一谈你知道的前端性能优化方案有哪些 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
客户端优化
减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
使用CSS雪碧图（CSS Sprites）CSS Sprites一句话：将多个图片合并到一张单独的图片，这样就大大减少了页面中图片的HTTP请求。
减少DOM操作次数，优化javascript性能。
少用全局变量、减少DOM操作、缓存DOM节点查找的结果。减少IO读取操作。
延迟加载 | 延迟渲染
图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。
避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
服务端优化
尽量减少响应的体积，比如用 gzip 压缩，优化图片字节数，压缩 css 和 js；或加快文件读取速度，优化服务端的缓存策略。
客户端优化 dom、css 和 js 的代码和加载顺序；或进行服务器端渲染，减轻客户端渲染的压力。
优化网络路由，比如增加 CDN 缓存；或增加并发处理能力，比如服务端设置多个域名，客户端使用多个域名同时请求资源，增加并发量。

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
