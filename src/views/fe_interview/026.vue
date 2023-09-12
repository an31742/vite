<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/78">
            解释下你对GBK和UTF-8的理解？并说说页面上产生乱码的可能原因 #90？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
  
  ```
  GBK：

GBK（Guojia Biaozhun Kuozhan）是中国国家标准局制定的中文字符集编码方案之一，属于双字节编码。
GBK编码可以表示绝大部分汉字和许多其他字符，是在GB2312标准的基础上进行扩展而来的。
GBK编码通常用于简体中文环境中，可以满足大部分汉字的需求。
UTF-8：

UTF-8（Unicode Transformation Format - 8-bit）是一种通用的字符编码，可以表示世界上几乎所有的字符，包括各种语言的文字、符号等。
UTF-8使用变长编码，可以用1到4个字节表示一个字符，通常用于国际化的环境。
页面产生乱码的可能原因：

不一致的字符编码设置：

当网页的字符编码设置与实际内容的编码不匹配时，就会导致乱码。比如，如果页面使用UTF-8编码，但实际内容是以GBK编码保存的，就会产生乱码。
服务器发送的HTTP头信息不正确：

如果服务器发送的HTTP头信息中的Content-Type字段没有正确指定字符编码，浏览器可能会默认使用某种编码，导致乱码。
文本编辑器保存时的编码设置：

当使用文本编辑器编辑网页文件时，需要确保编辑器保存文件时的编码设置与页面声明的字符编码一致。
数据库或后台程序输出的编码问题：

如果网页内容来自于数据库或后台程序，需要确保数据库和后台程序正确地处理并输出相应的字符编码。
浏览器的自动猜测：

如果浏览器无法从HTTP头信息中获取字符编码，它可能会尝试自动猜测编码，但这可能会导致错误。
特殊字符没有正确转义：

如果在网页中使用了特殊字符（如&、&lt;、>等），没有进行正确的HTML转义，也可能导致显示错误。
总的来说，解决乱码问题需要确保网页的各个环节（包括编辑、存储、传输等）都使用一致的字符编码，并在HTML中正确声明字符编码
 
  ```

                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/91">
            说说你对z-index的理解</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
z-index 是 CSS 属性，用于控制元素在层叠上下文中的显示顺序。它可以影响元素的显示顺序，使得一个元素可以覆盖另一个元素。

以下是我对 z-index 的理解：

层叠上下文（Stacking Context）：

每个 HTML 元素都可以看作一个独立的层叠上下文。层叠上下文决定了元素在垂直方向上的显示顺序。
z-index 值：

z-index 接受一个整数值，通常为正整数，也可以为负数。值越高，元素就会越靠近用户，覆盖在其他元素的上方。
只对定位元素有效：

z-index 只对已经定位（positioned）的元素有效，比如 position: absolute、position: relative 或 position: fixed。
父元素的 z-index 影响子元素：

子元素的 z-index 值不能超过其父元素的 z-index 值。即使子元素的 z-index 很高，如果父元素的 z-index 比较低，那么子元素也不会覆盖其他层叠上下文中的元素。
层叠顺序：

在同一个层叠上下文中，后面出现在 HTML 结构中的元素会覆盖前面的元素，除非前面的元素具有更高的 z-index 值。
层叠上下文的影响：

如果一个元素拥有层叠上下文，那么它的子元素会相对于它进行层叠，而不会影响到其他层叠上下文中的元素。
默认值：

元素的默认 z-index 值为 auto，不会创建新的层叠上下文，它的层叠顺序由其在 HTML 结构中的位置决定。
总的来说，z-index 是一个用于控制层叠顺序的重要属性，可以通过合理设置 z-index 值来实现页面元素的覆盖和显示效果。但需要注意避免滥用，以免导致代码的复杂性和难以维护性增加。






Regenerate
Send a message

Free Research Preview. ChatGPT may produce inaccurat
```
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/88">
              写一个判断设备来源的方法</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
 ```
call 和 apply 是立即执行函数，而 bind 返回一个新的函数，需要后续调用。
call 和 apply 可以立即传递参数，而 bind 可以预先设定参数，也可以在后续调用时传递。
bind 的返回值是一个新函数，可以稍后调用，而 call 和 apply 是立即执行


//myCall
Function.prototype.myCall = function (context = window) {
  context.fn = this;

  var args = [...arguments].slice(1);

  var result = context.fn(...args);
  // 执行完后干掉
  delete context.fn;
  return result;
}
//myApply
Function.prototype.myApply = function (context = window) {
  context.fn = this;

  var result
  // 判断 arguments[1] 是不是 undefined
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result;
}


//myBind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
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
          <span><a href="https://github.com/haizlin/fe-interview/issues/93">
            你对Git的branch及工作流的理解是什么？</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
 Branch（分支）：

分支是指将代码的不同版本保存在一个独立的分支中，使得可以在不影响主线（master）的情况下进行开发、测试和实验。
在 Git 中，可以创建多个分支，每个分支都可以拥有自己的代码变化，这样可以在不同的分支上同时进行不同的开发工作。
工作流（Workflow）：

工作流是指开发者在项目中进行代码变更的方式和步骤，它可以是一种特定的开发模式或者一系列操作的组合。
在 Git 中，有多种常用的工作流模型，如：集中式工作流、特性分支工作流、Gitflow 工作流等。
具体来说：

集中式工作流：

所有开发者都在同一个分支上进行工作，通常是在 master 分支上。这种工作流适用于小型项目或者个人项目。
特性分支工作流：

每个新功能或修复都在一个单独的分支上进行开发，然后再合并回主分支（通常是 master）。这种工作流适用于大型项目或者需要多人协作的项目。
Gitflow 工作流：

Gitflow 是一种比较复杂的工作流模型，它将开发分成了不同的阶段（feature、develop、release、hotfix等分支），每个阶段都有特定的责任和使用规则。
GitHub Flow：

GitHub Flow 是一种简单且适合团队协作的工作流，它鼓励频繁的将代码推送到主分支（通常是 master），并使用特性分支来开发新功能。
GitLab Flow：

GitLab Flow 是一种结合了 CI/CD 的工作流，它允许开发者将新功能推送到生产环境，同时保持了相对简单的流程。
不同的工作流适用于不同规模和类型的项目，选择合适的工作流对于项目的管理和协作至关重要

               </code>
  
               </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="less" scoped></style>
