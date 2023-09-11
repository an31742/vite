<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/16">
              第6天 label都有哪些作用？并举相应的例子说明？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
  <code>
    //在 HTML 中，'label' 标签用于定义一个表单元素的标签，并为其提供相应的文本和功能。`label` 元素可以通过以下几种方式来帮助用户：
  
  1. 文本标签：'label' 标签可以为关联的表单元素提供文本标签，使用户能够清晰地了解该表单元素的用途。用户可以点击标签或聚焦在标签上时，关联的表单元素将获得焦点。
  
  ```
  <label for="username">用户名：</label>
  <input type="text" id="username">
  ```
  
  2. 利用点击扩大响应区域：将 `input` 元素包裹在 `label` 元素内，可以扩大用户点击的响应区域，提高表单的可用性。
  
  ```
  <label for="username">
    用户名：</label>
    <input type="text" id="username"> <input/>
  ```
  1,利用label"模拟"button来解决不同浏览器原生button样式不同的问题
  
  2,结合checkbox、radio表单元素实现纯CSS状态切换，这样的实例就太多了。比如控制CSS动画播放和停止。下面是一部分代码. 
  例子  https://codepen.io/mts123/pen/EzqdbM
  
  3,input的focus事件会触发锚点定位，我们可以利用label当触发器实现选项卡切换效果。下面代码选自张鑫旭《CSS世界>
  例子 https://demo.cssworld.cn/6/4-3.php
  
  </code>
            </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/17"
              >用css创建一个三角形，并简述原理？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
                   <code>
  width: 0;
  height: 0;
  margin: 100px auto;
  border-top: 50px solid transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
  
  原理：创建一个div，宽高都为0，实现效果如下，发现border的四个边都是一个三角形，要实现三角形只需将其中几个边background设置为transparent，即可得到三角形
  
                    </code>
               </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/18"
              >写一个去除制表符和换行符的方法？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
                      <code>
                        /**
   * \f  匹配换页字符。
   * \n  匹配换行字符。
   * \r  匹配回车符字符。
   * \t  匹配制表字符。
   * \v  匹配垂直制表符。
   * @param str
   * @returns {void | string}
   */
  const removeEmpty = (str) => str.replace(/[\t\n\v\r\f]/g, "");
  
  console.log(removeEmpty(`|
    
     
  |`))
  
                      </code>
                  </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let str = "1  0 9 9  9 88";

    console.log(str.split(" ").join(""));

    var string = " 1 2 3445 6    ";
    console.log(string.split(" ").join("")); // 输出"1234456"
    const router = useRouter();

    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1",
        query: {
          id: 1,
        },
      });
    };
    const toLocalStorage = () => {
      router.push({
        path: "/toLocalStorage",
      });
    };

    return {
      string,
      str,
      toLocalStorage,
      fe_interview,
    };
  },
});
</script>

<style scoped></style>
