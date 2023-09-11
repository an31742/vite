<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/82">
              说你对属性data-的理解？</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>
 
`data-`属性是HTML5中引入的一种自定义数据属性，它允许开发者将自定义数据附加到HTML元素上。这些属性以`data-`开头，后面可以跟上任何你想要的名称，用来描述元素的一些数据或信息。这些数据通常是与JavaScript交互的，可以用来存储与元素相关的信息，而不会影响元素的样式或行为。

使用`data-`属性的一些常见场景包括：

1. 存储配置信息：你可以将配置信息存储在`data-`属性中，然后在JavaScript代码中访问它们，以便在页面加载时或用户交互时使用。

```html
<button data-color="red">Red</button>
<button data-color="blue">Blue</button>
<button data-color="green">Green</button>
```

2. 管理状态或标记元素：你可以使用`data-`属性来标记或跟踪元素的状态，以便在页面交互中根据这些状态采取不同的行动。

```html
<div data-status="active">Active Item</div>
<div data-status="inactive">Inactive Item</div>
```

3. 存储ID或关联信息：有时候，你可能需要将元素与后端数据或其他元素关联起来，可以使用`data-`属性存储关联信息。

```html
<div data-user-id="123">User Profile</div>
```

要在JavaScript中访问`data-`属性的值，你可以使用`getAttribute`方法或直接访问元素的`dataset`属性。例如：

```javascript
// 使用 getAttribute 方法
const button = document.querySelector('button');
const color = button.getAttribute('data-color');
console.log(color); // 输出: "red"

// 使用 dataset 属性
const div = document.querySelector('div');
const status = div.dataset.status;
console.log(status); // 输出: "active"
```

总之，`data-`属性提供了一种简单但强大的方法，可以将自定义数据附加到HTML元素上，以便在JavaScript中轻松访问和处理这些数据。这对于创建交互性强的Web应用程序非常有用。
                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/83">
              你有用过CSS预处理器吗？喜欢用哪个？原理是什么?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
                          

        Sass和Less是两种常见的CSS预处理器，它们的工作原理类似。下面我将分别解释它们的编译原理：
        Sass编译成CSS的原理：
        Sass使用一种被称为"Sass语法"的扩展语法，它允许开发者使用缩进和嵌套来组织CSS代码。
        在编译过程中，Sass编译器会将Sass代码转换为标准的CSS代码。
        Sass编译器会解析Sass文件，处理其中的变量、嵌套规则、混合和继承等特性，并将其转换为相应的CSS代码。
        最终生成的CSS代码可以通过Sass编译器输出到指定的CSS文件中，或者在开发环境中直接使用。
        Less编译成CSS的原理：
        Less使用一种类似CSS的语法，它扩展了CSS的功能，允许使用变量、嵌套规则、混合等特性。
        在编译过程中，Less编译器会将Less代码转换为标准的CSS代码。
        Less编译器会解析Less文件，处理其中的特性，并将其转换为相应的CSS代码。
        最终生成的CSS代码可以通过Less编译器输出到指定的CSS文件中，或者在开发环境中直接使用。
        总结来说，Sass和Less编译器会解析预处理器的特定语法和功能，并将其转换为普通的CSS代码。这样，开发者可以使用预处理器提供的便利功能来编写样式，并在编译阶段将其转换为浏览器可识别的CSS代码。这样可以提高样式的可读性、可维护性，并使开发过程更加高效。

                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/84">
              如何快速让一个数组乱序，写出来</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
  
1.使用arrsort
  ```
var arr= [1,2,3,4,5]
arr.sort(function(a,b){return Math.random() > 0.5 ? 1 : -1})
console.log(arr);// [ 1, 3, 5, 2, 4 ]
  ```
  
 
使用洗牌算法
  ``` 
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
  ```
  
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
