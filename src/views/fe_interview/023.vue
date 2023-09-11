<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/78">
              form标签的enctype属性你有哪些了解？</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        form 标签的 enctype
        属性指定将数据回发到服务器时浏览器如果对表单数据进行编码，其有三种编码形式：
        application/x-www-form-urlencoded(也是默认格式)
        application/x-www-form-urlencoded编码类型会将表单中发送到服务器之前都会进行编码(空格转换为
        "+" 加号，特殊符号转换为 ASCII HEX
        值)，数据编码成键值对的形式，当表单的action为post时，它会把form数据封装到
        http body
        中，然后发送到服务器；当表单的action位get时，它会把表单中发送的数据转换成一个字符串(如：a=1&b=2&c=3)并使用?连接到
        url 后面。在不指定 enctype 属性时 application/x-www-form-urlencoded
        是默认属性。 multipart/form-data
        它不对字符进行编码，在使用包含文件(如图片、mp4等文件)上传控件的表单时必须使用该值
        text/plain 数据以纯文本格式进行编码，空格转换为 "+"
        加号，但不对特殊字符编码
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
            ><a href="https://github.com/haizlin/fe-interview/issues/79">
              说说CSS的优先级是如何计算的?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        !important > 内联样式（1000） > id 选择器（100） > class 选择器（10） >
        tag（1） > *

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
            ><a href="https://github.com/haizlin/fe-interview/issues/80">
              0.1 + 0.2、0.1 + 0.3和0.1 * 0.2分别等于多少？并解释下为什么？
              #80</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                              <code>
````
除了含含糊糊的精度损失，你能给出更有营养的解释么？让我们看看到底是为什么！

首先，让我们举一个整数的例子，比如：

十进制「13」：1*(10^1) + 3(10^0) = 10 + 3 = 13
二进制「1101」：1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0) = 8 + 4 + 0 + 1 = 13
接着，让我们再举一个小数的例子，比如：

十进制「0.625」：6*(10^-1) + 2*(10^-2) + 5*(10^-3) = 0.625
二进制「0.101」：1*(2^-1) + 0*(2^-2) + 1*(2^-3) = 5/8 = 0.625
最重要的一点是你要明白计算机是如何表示小数的：比如二进制的「0.1111111」，无非就是十进制的「1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64 + 1/128」，不过细心的你可能已经发现问题了，计算机这种处理小数的方式存在精度损失的，比如一个十进制的「0.1」，换算成分数的话就是十进制的「1/10」，对比前面的结果，你会发现计算机没办法精确表示它，只能近似等于二进制的「0.00011」，也就是十进制的「1/16 + 1/32 = 3/32」，当然二进制小数点后可以多取几位，可惜结果是只能无限趋近，但永远不可能等于。

下面看看为什么「0.1 + 0.2 != 0.3」，而「0.1 + 0.3 == 0.4」。既然存在精度损失，那么「0.1 + 0.2 != 0.3」也说得过去，我们推算一下为什么「0.1 + 0.3 == 0.4」：

十进制的「0.1」近似等于二进制「0.00011」
十进制的「0.3」近似等于二进制「0.01001」
十进制的「0.4」近似等于二进制「0.01100」
于是，十进制的「0.1 + 0.3」也就是二进制的「0.00011 + 0.01001」：
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
            ><a href="https://github.com/haizlin/fe-interview/issues/81">
              说说一件或几件（介绍下除了工作外）你觉得能为你面试加分的事</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
             <code>
 除工作外的，这主要是想从另一方面考查面试者对自我的了解及认识（性格特点）。比如可以这么回答：

每年都要跑满1000公里，已经坚持3年了
我风雨无阻每天早上4：30起床坚持阅读，坚持了10年，已经习惯了！
我坚持每周至少三次去锻炼身体
……
可以从坚持、勇敢、适应环境、担当、人际关系等个人性格特点方面回答
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
