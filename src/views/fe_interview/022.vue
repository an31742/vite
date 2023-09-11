<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/74">
              js放在html的body和head有什么区别?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        在浏览器解析HTML中的时候，如果在head标签中遇到了script标签并且是同步执行的，那么就会影响文档的加载，如果引入的过多的同步脚本文件
        那么加载会变得非常怪异且卡顿；但是放在body中，根据script标签，从上到下的解析顺序，它不会对html进行阻塞；
        那么在一般业务中我们如何做呢？一般情况下是在网站中，同步在head加载的脚本通常是业务必须的，比如说我要注册一个window对象，或者用document.write写入一些内容，或者是业务需求，我们可以用head来做加载，
        就是意味着没有这个脚本，下面的文档走不下去；
        那么我们也可以在头部给script标签加入async的属性，表示它是异步加载的脚本,不会对html进行阻塞，这也是大部分网站的做法；
        除了上面的情况我们都需要把js引入到底部或者body中合适的位置，比如说我的jq从那个html代码进行了使用，那么就在它之前均可;
        <!-- <div v-highlight>
          <pre>
                    <code>

                    </code>
                    </pre>
        </div> -->
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/75">
              说说浏览器解析CSS选择器的过程?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        从上到下，从右到左
        因为从左到右，首先浏览器会遍历你最左边的选择器，可能是div，可能是span，我需要在整个页面去把匹配成功的dom找出来，可以说是海底捞针，但是从右到左不一样了，它通过具体的遍历条件去寻找一个最匹配的值，查找之后在向上查询，是否符合自己的选择器规则，才最后匹配成功；
        前者会浪费大量的遍历时间，造成大量错误的匹配结果
        <!-- <div v-highlight>
          <pre>
                        <code>
                      
                        </code>
                        </pre>
        </div> -->
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/76">
              对new操作符的理解是什么？手动实现一个new方法?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一


new的步骤：
模拟new操作前，要先知道new操作是发生了什么，就拿new Object()举例:

创建一个新对象
把新对象的原型指向构造函数的prototype
把构造函数里的this指向新对象
返回这个新对象


构造函数：
```
function constructorFunction(name, age){
  this.name = name;
  this.age = age;
}
constructorFunction.prototype.say = function(){
  return 'Hello '+ this.name
}
```

原生new：
var obj = new constructorFunction('willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian

模拟new:
模拟的new 暂称为newNew  （囡..囡 哈哈~）
使用：newNew(constructor, arg1, arg2, ..) 第0个参数传入构造函数，1~n个参数是构造函数的形参。
使用上面的构造函数试一下


```
function newNew(){
 var newObj = {}
 // 1. 创建一个新对象
 var Con = [].shift.call(arguments)
 // 得到构造函数
 newObj.__proto__ = Con.prototype;
 // 2. 把新对象的原型指向构造函数的prototype
 var res = Con.apply(newObj, arguments)
 // 3. 把构造函数里的this指向新对象
 return typeof res === 'object' ? res : newObj;
 // 4. 返回新对象
}
var obj = newNew(constructorFunction, 'willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian
```

                            </code>
                        </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/77">
              前端工程师这个职位你是怎么样理解的？聊聊它的前景</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
           <code>
            通过各种终端来向用户展示数据，或者给用户提供一些和后台的交互接口。
前景：首先，在我看来，一切和用户交互的终端都可以属于前端。并且随着现在跨端开发框架的兴起，比如Electron框架等，也使得前端的那套开发技术栈以及开发流程可以复制到桌面端来，使得前端的范畴越来越广泛。
并且，随着AR，VR技术的兴起，手机app中应用了大量的3维场景来提高用户体验，比如手机app上看房，看车，甚至是看一个城市的街景，都已经有了3D的场景，并且用户还能进行简单的操作。而这些都对前端提出了更高的要求
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
