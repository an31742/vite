<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a
            href="https://github.com/haizlin/fe-interview/issues/140"
            target="_blank"
          >
            说说你对cookie和session的理解</a
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
         <code>
 Cookie：
Cookie是服务器发送到用户浏览器并保存在本地的一小段数据。
它通常包含有关用户的信息，例如登录状态、偏好设置等。
浏览器会在每次请求时将cookie发送回服务器，以便服务器能够识别用户并提供个性化的服务。
Cookie可以设置过期时间，过期后将自动删除。
由于cookie存储在用户的浏览器中，用户可以通过浏览器设置来控制cookie的使用。
Session：
Session是服务器为每个用户创建的一种会话机制。
当用户首次访问网站时，服务器会创建一个唯一的session，并将其与用户的请求关联起来。
在后续的请求中，服务器可以通过session来识别用户，并维护用户的会话状态。
Session通常存储在服务器端的内存或数据库中，以确保数据的安全性和可靠性。
Session可以包含各种用户信息，例如登录状态、购物车内容等。
Session的有效期可以通过服务器设置来控制，过期后会话将自动结束。
总的来说，cookie和session都是用于在Web应用中维护用户状态和提供个性化服务的重要机制。它们的区别在于cookie存储在用户的浏览器中，而session存储在服务器端。在实际应用中，通常会结合使用cookie和session来实现更好的用户体验和数据管理

        </code>
        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a
              href="https://github.com/haizlin/fe-interview/issues/141"
              target="_blank"
            >
              实现单行文本居中和多行文本左对齐并超出显示"..."</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
            <code>
这是单行居中并超出显示..

```
 .single-line {
      width: 200px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
```
这是多行左对齐并超出显示...
 .multi-line {
      width: 200px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }

             </code>
            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a
              href="https://github.com/haizlin/fe-interview/issues/142"
              target="_blank"
            >
              说说你对eval的理解</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>


eval 函数在 JavaScript 中用于将字符串作为 JavaScript 代码进行动态执行。
优点：
具有很高的灵活性，可以根据不同的输入字符串执行不同的代码逻辑。
缺点和风险：
安全性问题：如果输入的字符串来自不可信的来源，可能会执行恶意代码，导致安全漏洞。
性能开销：通常比直接执行预编译的代码效率低，因为它需要在运行时进行解析和编译。
代码可读性和可维护性差：使用 eval 会使代码变得难以理解和调试，因为代码的逻辑不是直接可见的

 
                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a
              href="https://github.com/haizlin/fe-interview/issues/143"
              target="_blank"
            >
              你知道网页三剑客指的是什么吗？你有用过Dreamwear
            </a></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
Dreamweaver、Fireworks 和 Flash 这三款软件。
            </code>
             </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
