<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <a href="https://github.com/haizlin/fe-interview/issues/94">
            说说你对影子(Shadow)DOM的了解#90？</a>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>            
  
  ```

  影子DOM（Shadow DOM）是Web平台的一项技术，它允许将DOM树的一部分封装起来，使得其与主文档的DOM树相互隔离。这样可以防止CSS和JavaScript从主文档中渗透到封装的DOM中，也可以避免封装的DOM对主文档的影响。

以下是对影子DOM的一些关键概念和了解：

封装性：影子DOM允许你创建一个隔离的DOM子树，它的样式和行为被完全隔离在封装的环境中，不受外部的影响。

Shadow Host：影子DOM的容器称为“Shadow Host”，它是主文档中的一个元素，可以包含一个或多个影子DOM根节点。

Shadow Tree：影子DOM树又被称为“Shadow Tree”，它包含了一组元素，这些元素与主文档的DOM树相互隔离。

Shadow Root：每个Shadow Host都有一个关联的Shadow Root，它是Shadow Tree的根节点，充当了Shadow DOM的入口点。

Encapsulation：影子DOM提供了一种将样式和行为封装在组件内部的机制，从而避免了全局样式和JavaScript的冲突。

Scoped Styles：影子DOM中的样式仅适用于Shadow Tree内部，不会影响主文档或其他影子DOM。

隔离性：影子DOM提供了一定程度的隔离，可以防止封装的组件被外部样式和脚本影响，反之亦然。

组件化：影子DOM为Web组件提供了一个强大的基础，使得可以创建具有高度隔离性和独立性的UI组件。

影子DOM是Web组件规范的一部分，它与自定义元素（Custom Elements）、HTML模板（HTML Templates）等技术一起构成了创建可重用、独立的Web组件的基础。

总的来说，影子DOM是一项强大的技术，可以提高Web应用程序的模块化程度和可维护性，特别是在构建大型应用或开发可复用的UI组件时非常有用。






 
  ```

                        </code>
                        </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/95">
              要修改Chrome浏览器记住密码后自动填充表单的黄色背景，你可以使用以下方法</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                            <code>
```
使用:-webkit-autofill伪类：

在你的CSS样式表中，可以使用:-webkit-autofill伪类来定制自动填充表单的样式。例如：

```
input:-webkit-autofill {
  background-color: #fff; /* 设置背景色为白色 */
  /* 其他样式 */
}

```
使用autocomplete="off"：

在表单的 form 标签中添加autocomplete="off"属性，可以告诉浏览器不要自动填充表单字段。
```
<form autocomplete="off">
  <!-- 表单元素 -->
</form>
```


使用type="password"：

对于密码字段，可以将其类型设置为password，这样Chrome不会自动填充密码

```
<input type="password" name="password">
```

你也可以结合使用上述方法，以达到更好的效果

```
input[type="password"]:-webkit-autofill {
  background-color: #fff;
}
```

```
<form autocomplete="off">
  <input type="password" name="password">
</form>

```
```
                            </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/96">
              说说你对arguments的理解，它是数组吗</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                                <code>
 `arguments` 是一个特殊的对象，在函数内部可以用来获取所有传递给函数的参数。它类似于一个数组，但实际上它并不是一个真正的数组。

以下是对`arguments`的一些理解：

1. **类数组对象**：`arguments` 是一个类数组对象，它具有类似于数组的结构，可以通过索引来访问参数值。

2. **不是真正的数组**：尽管`arguments`具有类似于数组的行为，但它并不是一个真正的数组对象。它没有数组的所有方法，例如`push()`、`pop()`等。

3. **函数内部可用**：`arguments`只在函数内部可用，它是一个局部变量。

4. **动态性**：`arguments`会随着传递给函数的参数的变化而动态更新，即使函数签名中没有明确声明这些参数。

5. **长度属性**：`arguments`对象有一个`length`属性，它表示传递给函数的实际参数个数。

6. **callee属性**：`arguments`对象还有一个特殊的属性`callee`，它是指向当前正在执行的函数的引用。

举个例子，考虑下面的函数：

```javascript
function sum(a, b) {
  console.log(arguments);
  console.log(arguments.length);
  console.log(arguments[0], arguments[1]);
}

sum(1, 2);
```

在这个例子中，当调用`sum(1, 2)`时，`arguments`将会是一个包含两个元素的类数组对象，它的`length`属性是2，可以通过`arguments[0]`和`arguments[1]`分别访问传递给函数的两个参数。

总的来说，`arguments`是一个函数内部特有的对象，用于获取传递给函数的所有参数，但它并不是一个真正的数组。在现代的JavaScript开发中，通常会使用剩余参数（Rest Parameters）或者将`arguments`转为一个真正的数组来更灵活地处理传递的参数。
                                </code>
                            </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><a href="https://github.com/haizlin/fe-interview/issues/97">
              你为什么离职</a></span>
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
               <code>
                钱少事多离家远，主要还是没发展。照着说就行，但是要记住一点就是千万不要说前公司的坏话
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
