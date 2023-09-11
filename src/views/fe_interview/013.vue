<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/38">
              html5中的form怎么关闭自动完成?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
          <code>
h5新增的补全功能，菜鸟教程上写的比较含糊比较难懂；
解释： 在部分浏览器上，foucs输入框可以把之前输入过的值自动填入，如果不想自动填入，可以关掉它；
autocomplete="off"
默认是"on" 开启状态

一般业务下不会调整这个自动完成，因为对产品来说简化用户操作，建议打开


<form action="" id="formDom">
        <label for="in1">请输入</label><input id="in1" type="text" >
        <input type="submit" value="提交"  autocomplete='off'>
</form>

let formDom=document.querySelector('#formDom')
    formDom.onclick=function(e){
         e.preventDefault(); //阻止默认事件，防止自动提交
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
            ><a href="https://github.com/haizlin/fe-interview/issues/39">
              ::before和:after中单冒号和双冒号的区别是什么，这两个伪元素有什么作用？
              #39?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
          <code>
:表示伪类，是一种样式，比如:hover, :active等
::表示伪元素，是具体的内容，比如::before是在元素前面插入内容，::after则是在元素后面插入内容，不过需要content配合，并且插入的内容是inline的。
:before和:after其实还是表示伪元素，在css3中已经修订为::before和::after了，只是为了能兼容IE浏览器，所以也可以表示成:before和:after
          </code>
                    </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/40">
              说说你对javascript的作用域的理解?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
          <code>
全局作用域。这个没啥说的，就是在顶层环境中申明的变量都是全局作用域，他们的属性其实都在window对象下面。
2.函数作用域。在函数内部定义的变量都是函数作用域，只能在函数中访问到，当然也可以通过闭包来访问。除此之外，在其他地方是没法访问函数内部的变量的。
局部作用域。es6中新增的特性，弥补了以前只能使用匿名及时运行函数来创建局部变量的缺陷。使用很简单，直接用let来申明变量就行。也可以使用const来申明变量，表明这是常数。
作用域链。要说清这个，需要首先明白javascript的代码运行过程。假设现在有个函数funcA，在该函数内部申明了一个局部变量a，在函数内部又定义了一个函数funcB，在函数B中申明了变量b。如下：
function funcA () {
let a;
function funcB () {
let b;
}
}
当进入funcA时，这时候会把变量a压入当前的作用域A中，并且将作用域A入栈，当进入funcB时，则会把变量b压入当前的作用域B中，并且将作用域B入栈，那么这时候栈中就有了作用域A和作用域B，当在funcB中查找某个变量时，会先从当前的作用域B中查找，如果没有的话，那么就根据栈中的作用域依次往上查找，这就是作用域链。
          </code>
                    </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/41">
              http都有哪些状态码?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
          <code>
            200 成功
301 重定向
304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
400 (错误请求) 服务器不理解请求的语法。
403 (禁止) 服务器拒绝请求。
404 (未找到) 服务器找不到请求的网页。
500 (服务器内部错误) 服务器遇到错误，无法完成请求。
501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。
503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。
504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。
505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本
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
