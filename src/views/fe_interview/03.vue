<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/7">
              HTML全局属性(global attribute)有哪些？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
              <code>
accesskey:设置快捷键
class:为元素设置类标识
contenteditable:指定元素内容是否可编辑
contextmenu:自定义鼠标右键弹出上下文菜单内容（仅firefox支持）
data-*:为元素增加自定义属性
dir：设置元素文本方向（默认ltr；rtl）
draggable:设置元素是否可拖拽
dropzone:设置元素拖放类型（copy|move|link,H5新属性，主流均不支持）
hidden:规定元素仍未或不在相关
id:元素id，文档内唯一
lang:元素内容的语言
spellcheck:是否启动拼写和语法检查
style:行内css样式
tabindex:设置元素可以获得焦点，通过tab导航
title:规定元素有关的额外信息
translate:元素和子孙节点内容是否需要本地化（均不支持）
               </code>
             </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/8"
              >在页面上隐藏元素的方法有哪些？并简述出第一种方法的应用场景和优劣势？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div v-highlight>
          <pre>
           <code>
 display: none
opacity: 0
visibility: hidden
z-index: -9999999999999
transform: scale(0)
margin-left: -100%
position: relative; left: -100%
width: 0; height: 0;
            </code>
       </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/9"
              >去除字符串中最后一个指定的字符</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
              <code>
                 //使用substring和lastIndexOf
                function delLast (str,del) {
                  //判定是不是字符串
                  if (tpeof str !== 'string') { 
                   alert('请确认要删除的对象为字符串！');
                   retrun false;
                 } else {
                    //找到最后一个字符出现的位置
                 let index = str.lastIndexOf(del);

                 //截取最后一个之前的所有字符 截取最后一个字符之后的所有的
                 str.substring(0,index ) + str.substring(index+1,str.length);
                }
               }
                
               substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

            // 关于字符串都可以用操作都可以用正则来解决
            function delLast(str,target) {
            let reg =new RegExp(`${target}(?=([^${target}]*)$)`)
            return str.replace(reg,'')
            }

            //使用的split 和join来解决
            function delLast(str, target) {
            return str.split('').reverse().join('').replace(target, '').split('').reverse().join('');
            } 
            const str = delLast('asdfghhj', 'h')
             console.log(str) // asdfghj 
            replace这个属性指定了当一个字符串替换所匹配字符串时所调用的方法  所遇到的第一个匹配的字符串



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
