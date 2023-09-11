<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/1"
              >页面导入样式时，使用link和@import有什么区别？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <div>
          <p>1.link是HTML标签，@import是css提供的。</p>
          <p>
            2.link引入的样式页面加载时同时加载，@import引入的样式需等页面加载完成后再加载。
          </p>
          <p>3.link没有兼容性问题，@import不兼容ie5以下。</p>
          <p>4.link可以通过js操作DOM动态引入样式表改变样式，而@import不可以</p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
            <a href="https://github.com/haizlin/fe-interview/issues/2"
              >圣杯布局和双飞翼布局的理解和区别，并用代码实现？</a
            >
          </span>
        </div>
      </template>

      <div class="text item">
        <div>
          <p>
            作用：圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。
          </p>
          <p>
            区别：圣杯布局，为了中间div内容不被遮挡，将中间div设置了左右padding-left和padding-right后，将左右两个div用相对布局position:
            relative并分别配合right和left属性，以便左右两栏div移动后不遮挡中间div。双飞翼布局，为了中间div内容不被遮挡，直接在中间div内部创建子div用于放置内容，在该子div里用margin-left和margin-right为左右两栏div留出位置。
          </p>
          圣杯布局
          <div v-html="content"></div>
          双飞翼布局
          <div v-html="content2"></div>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/3"
              >用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值？</a
            ></span
          >
        </div>
      </template>

      <div class="text item">
        <!-- 要高亮的代码块用 "v-highlight"  -->
        <div v-highlight>
          <pre>
            <code>
            <!-- 高亮代码块 -->
            // 6 行写完 
            function buildArray(arr, length, min, max) { 
              var num = Math.floor(Math.random() * (max - min + 1)) + min;
               if(!arr.includes(num)) { arr.push(num); 
              } return arr.length === length ?arr : buildArray(arr, length, min, max); 
            }
            var result = buildArray([], 5, 2, 32); console.table(result);

            
            //点赞最多的
            function inserertArr(arr,i=0,main=2,max=32){

              const num=Math.max(min,Math.ceil(Math.ramdom()*mxa))
               if(!arr[arr.length-1]){
                if(!arr.includes(num)){
                  arr[i++]=num
                }
                return inserertArr(arr,i)
               }
            }
            const arr= new Array(5)

            const result = insertArr(arr)

            console.log(result)



            </code>
        </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const content = reactive({
      content: `<body>
<div id="hd">header</div>
<div id="bd">
  <div id="middle">middle</div>
  <div id="left">left</div>
  <div id="right">right</div>
</div>
<div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#bd{
    /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
    padding:0 200px 0 180px;
    height:100px;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
    /*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
    position:relative;
    left:-180px;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
    /*中间栏的位置摆正之后，右栏的位置也相应左移，通过相对定位的right恢复到正确位置*/
    position:relative;
    right:-200px;
}
#footer{
    height:50px;
    background: #666;
    text-align: center;
}
</style>`,
    });

    const content2 = reactive({
      content2: `<body>
<div id="hd">header</div> 
  <div id="middle">
    <div id="inside">middle</div>
  </div>
  <div id="left">left</div>
  <div id="right">right</div>
  <div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/     
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
}

/*给内部div添加margin，把内容放到中间栏，其实整个背景还是100%*/ 
#inside{
    margin:0 200px 0 180px;
    height:100px;
}
#footer{  
   clear:both; /*记得清楚浮动*/  
   height:50px;     
   background: #666;    
   text-align: center; 
} 
</style>`,
    });
    return {
      ...toRefs(content),
      ...toRefs(content2),
    };
  },
});
</script>

<style scoped>
/* .main {
  display: flex;
  flex-direction: grow;
  justify-content: space-around;
} */
</style>
