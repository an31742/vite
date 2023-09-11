<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/62">
              说说你对html中的置换元素和非置换元素的理解?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
                置换元素（Replaced Element）
简单来说，置换元素可以设置宽 高,他们有自己的属性，和inline-block有一样的属性

主要是指 img、input、textarea、select、object 等这类默认就有 CSS 格式化外表范围的元素。

浏览器根据元素的标签和属性，来决定元素的具体显示内容

例如：浏览器根据标签的src属性显示图片。根据type属性决定显示输入框还是按钮
非置换元素（non-Replaced Element）:
就是除了 img、input、textarea、select、object 等置换元素以外的元素。

内容直接展示给浏览器。例如标签，标签里的内容会被浏览器直接显示给用户
              </code>
              </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/63">
              css的属性content有什么作用呢？有哪些场景可以用到?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                  <code>
                    https://xiangshuo.blog.csdn.net/article/details/89843456
                  </code>
                  </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/64">
              attribute"和"property"有什么不同?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                      <code>
                        是DOM中的属性，是JavaScript里的对象

可以读取标签自带属性，包括没有写出来的

不能读取attribute设置的属性

获取方式：读：element.property;            如：p.className;

设置方式：element.property = 'xxx';        如：p.className = 'xiao';

是元素（对象）的属性

attribute
是HTML标签的属性,即直接在html标签添加的都是attribute属性

不能读取property设置的属性

读取方式：element.getAttribute('属性名','属性值');  如：a.getAttribute('href');

设置方式：element.setAttribute('属性名','属性值');  如：a.getAttribute('href','xiaowan.jpg');

直接在html标签上添加的和使用setAttribute添加的情况一致
                      </code>
                  </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/65">
              最近都流行些什么？你经常会浏览哪些网站</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                      <code>
                        github、stackoverflow/segmentfault、Google、相关技术官网文档
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
