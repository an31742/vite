<!--
 * @Author: maxiangan
 * @Date: 2023-11-02 17:25:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-02 17:39:01
 * @Description: 请填写简介
-->
<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/114">
            说说你对HTML元素的显示优先级的理解</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
 元素在文档中的顺序：元素在文档中出现的顺序会影响其显示优先级。先出现的元素会先展示，后出现的元素会后展示。
元素的高度和宽度：元素的高度和宽度也会影响其显示优先级。元素的高度和宽度越大，其显示优先级越高。
元素的位置：元素的位置也会影响其显示优先级。元素在页面上的位置越靠前，其显示优先级越高。
元素的z-index属性：元素的z-index属性可以设置元素的显示优先级。当有多个元素具有相同的样式规则时，z-index属性可以用来调整它们的展示顺序


                        </code>
                        </pre>
      <img  style="width:100%;height:100%"  src="./images/auto-imports.d.png" alt="" srcset="">
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/115">
            说下line-height三种赋值方式有何区别</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
div{
	line-height: 24px;
	line-height: 1.5;
	line-height: 1.5em;
	line-height: 150%;
}


对于应用在单个元素上，这几种写法的效果都是一样的（除了 px 需要一些计算）。但由于 line-height 是可以被继承的，因此会影响内部子元素的 line-height。简单的可以总结为：

带有单位的 line-height 会被计算成 px 后继承。子元素的 line-height = 父元素的 line-height * font-size （如果是 px 了就直接继承）

而不带单位的 line-height 被继承的是倍数，子元素的 line-height = 子元素的 font-size * 继承的倍数
```

 
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/117">
            造成内存泄漏的操作有哪些</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
```
内存泄漏通常是由于程序中的一些错误或者不良的编码实践导致的。以下是一些常见导致内存泄漏的操作：

1. **未释放不再需要的引用**：如果你在代码中保留了对某个对象的引用，但后来不再需要使用它，却没有将该引用置为 `null` 或者释放它，这会导致该对象无法被垃圾回收，从而造成内存泄漏。

2. **未清理定时器或者事件监听器**：在 JavaScript 中，如果你创建了定时器或者事件监听器，但在不需要它们的时候没有清理掉，就会导致内存泄漏。特别是在长时间运行的应用程序中，可能会不断创建新的定时器或监听器，导致内存占用不断增加。

3. **循环引用**：两个或多个对象之间互相引用，但没有一个对象是被外部引用的，这会导致这些对象无法被垃圾回收。

4. **大量缓存未被清理**：在缓存数据或对象时，如果不定期清理不再需要的缓存项，会导致内存占用不断增加。

5. **未正确处理DOM元素引用**：在使用 JavaScript 操作 DOM 时，如果保存了对 DOM 元素的引用，但在后续不再需要使用它时没有正确清理掉，就会导致内存泄漏。

6. **闭包中未释放资源**：如果一个函数内部创建了一个闭包，并且在闭包中引用了外部的变量或对象，但这个外部变量或对象在后续不再需要时没有被释放，会导致内存泄漏。

7. **使用全局变量**：在全局作用域中创建的变量或对象，如果不再使用时没有被正确清理掉，会一直存在于内存中。

8. **使用不当的数据结构**：选择不适当的数据结构可能会导致内存泄漏。例如，如果使用一个巨大的数组来存储临时数据，但忘记在不再需要时清空它，会占用大量内存。

为了避免内存泄漏，开发者应该留意这些常见的错误，及时释放不再需要的资源和引用。同时，使用开发者工具（如 Chrome DevTools）可以帮助你检测和解决内存泄漏问题。
```




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
