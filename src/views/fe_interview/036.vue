<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/132">
            HTML与XHTML二者有不同</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
         <code>
 <!-- <div class="edit" contenteditable="true" style="resize: both">这里是可以编辑的内容，配合容器的 overflow ，多行截断，自定义滚动条，简直好用的不要不要的</div> -->
 语法规范：

HTML： HTML对标签的书写比较宽松，不强制要求大小写一致，并允许一些未闭合的标签。
XHTML： XHTML更加严格，要求标签必须按照规定的格式书写，并强制大小写敏感。每个标签必须有相应的闭合标签。
文档结构：

HTML： HTML文档结构相对宽松，可以存在一些不规范的标签嵌套和属性写法。
XHTML： XHTML对文档结构有更高的规范性，要求所有标签必须正确嵌套，属性必须用双引号括起来。
解析方式：

HTML： HTML解析器在遇到错误时会尽量容忍，并尝试修复错误，使文档能够正常渲染。
XHTML： XHTML解析器对错误更为敏感，一旦遇到不规范的标签或语法，可能会导致整个文档无法正常解析。
MIME 类型：

HTML： HTML文档使用text/html的MIME类型。
XHTML： XHTML文档使用application/xhtml+xml的MIME类型。这种类型在Internet Explorer等一些浏览器中可能不被支持，因此在实际应用中需要谨慎选择。
DOCTYPE 声明：

HTML： HTML文档通常使用<!DOCTYPE html>声明。
XHTML： XHTML文档通常使用更为详细的DOCTYPE声明，如<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">。
        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/133">
             写出主流浏览器内核私有属性的css前缀</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
WebKit（Chrome、Safari）:

-webkit-
Gecko（Firefox）:

-moz-
Trident（Internet Explorer）:

-ms-
EdgeHTML（Microsoft Edge，已弃用）:

-ms-
Blink（Chrome、新版Edge）:

-webkit-（在某些情况下，Chrome和新版Edge也会使用WebKit前缀）

             </code>
            </pre>
        </div>

      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/134">
            请手写一个幻灯片的效果 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>


.box > .main > .swiper > .swiperList {
position: absolute;
display: flex;
width: 3500px;
height: 270px;
animation: 20s swiper infinite; /循环/
}
.swiper > .swiperList > li {
width: 625px;
height: 270px;
}
.box > .main > .swiper > .swiperList > li:first-child {
background: url(images/banner.jpg) no-repeat center center / 100% 100%;
}
.box > .main > .swiper > .swiperList > li:nth-child(2) {
background: url(images/banner.jpg) no-repeat center center / 100% 100%;
}
.box > .main > .swiper > .swiperList > li:nth-child(3) {
background: url(images/banner.jpg) no-repeat center center / 100% 100%;
}
.box > .main > .swiper > .swiperList > li:nth-child(4) {
background: url(images/banner.jpg) no-repeat center center / 100% 100%;
}
.box > .main > .swiper > .swiperList > li:nth-child(5) {
background: url(images/banner.jpg) no-repeat center center / 100% 100%;
}

/动画/
@Keyframes swiper {
0% {
left: 0px;
}

12% {
left: 0px;
}

25% {
left: -625px;
}

37% {
left: -625px;
}

50% {
left: -1250px;
}

62% {
left: -1250px;
}

75% {
left: -1875px;
}

87% {
left: -1875px;
}

100% {
left: -2500px;
}
}


                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/135">
              谈一谈你知道的前端性能优化方案有哪些 </a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
前端安全涉及到多个方面，其中包括防范 XSS（跨站脚本攻击）和 CSRF（跨站请求伪造）等攻击。以下是对 XSS 和 CSRF 的简要理解：

### XSS（跨站脚本攻击）：

XSS 是一种攻击，攻击者通过注入恶意脚本（通常是 JavaScript）到网页中，然后让用户的浏览器执行这些脚本。攻击的目标是获取用户的敏感信息、劫持用户会话或者其他恶意行为。

#### 类型：

1. **存储型（Stored XSS）**：
   - 攻击者将恶意脚本存储在服务器上，用户访问页面时加载并执行。

2. **反射型（Reflected XSS）**：
   - 攻击者构造一个包含恶意脚本的 URL，用户点击包含恶意脚本的链接时执行。

3. **DOM 型（DOM-based XSS）**：
   - 攻击者通过修改页面的 DOM 结构来执行恶意脚本。

#### 防御措施：

- 输入验证和过滤：对用户输入进行验证和过滤，确保不允许注入恶意脚本。
- 输出编码：在输出到页面时，对用户提供的数据进行适当的编码，防止脚本执行。

### CSRF（跨站请求伪造）：

CSRF 是一种攻击，攻击者通过欺骗用户在已经登录的站点上执行一些操作，利用用户的身份来伪造请求，以执行未经授权的操作。

#### 防御措施：

- **CSRF Token**：为每个用户生成一个唯一的令牌，该令牌在用户进行敏感操作时需要一同提交，服务器验证令牌的有效性。
- **SameSite Cookie 属性**：限制第三方站点对用户 Cookie 的访问，可以减少 CSRF 的攻击面。
- **使用 POST 请求**：GET 请求更容易受到 CSRF 攻击，因此在执行敏感操作时应该使用 POST 请求。

综合来说，前端安全是一个广泛而复杂的主题，需要开发者在设计和实现应用时采取一系列的安全措施，以保护用户和系统的安全。

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
