<template>
  <main class="home">
    <div class="drag">
      <div class="base-drag">
        <template v-for="item in baseData" :key="item">
          <el-button style="margin: 10px; width: 80%">{{ item }}</el-button>
        </template>
      </div>
    </div>
    <div class="canvas">
      <div class="itxst" style="display: flex; justify-content: space-around">
        <div class="col-3">
          <h3>Draggable 1</h3>
          <draggable
            class="dragArea list-group"
            :list="state.list1"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>

        <div class="col-3">
          <h3>Draggable 2</h3>
          <draggable
            class="dragArea list-group"
            :list="state.list2"
            group="people"
            @change="log"
            item-key="name"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="attribute">组件属性</div>
  </main>
</template>

<script setup lang="ts">
import { BASE_COMPONENT } from "./base/base";
import { ref, reactive } from "vue";
import draggable from "vuedraggable";

const baseData = ref(BASE_COMPONENT);

/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list1: [
    { name: "John", id: 1 },
    { name: "Joao", id: 2 },
    { name: "Jean", id: 3 },
    { name: "Gerard", id: 4 },
  ],
  list2: [
    { name: "Juan", id: 5 },
    { name: "Edgard", id: 6 },
    { name: "Johnson", id: 7 },
  ],
});

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};

const log = (evt: any) => {
  console.log(evt);
};
</script>
<style>
.el-main {
  padding: 0;
  margin: 0;
}
</style>
<style lang="less" scoped>
//经典三栏布局多种方法  margin float 方法不可以按照顺序摆放盒子
//--------------1第一种方法
// .drag{
//   float: left;
// width: 200px;
//   height: 100vh;
//   background: #8b8c8d;
// }
// .attribute{
//   float: right;
//   width: 200px;
//   height: 100vh;
//   background: #8b8c8d;
// }
// .canvas{
//   margin-left: 200px;
//   margin-right: 200px;
//   height: 100vh;
//   background-color: rgb(118, 119, 121);
// }
//------------第二种方法   postion是视图距离的绝对位置  margin需要计算视图到盒子中其他的相对位置
// .home {
//   position: relative;
// }
// .drag {
//   width: 200px;
//   height: 100vh;
//   position: absolute;
//   top: 10vh;
//   left: 0;
//   background: #8b8c8d;
// }
// .attribute {
//   width: 200px;
//   height: 100vh;
//   position: absolute;
//   top: 10vh;
//   right: 0;
//   background: #8b8c8d;
// }
// .canvas {
//   //只要在定位加一个左右属性就可以了
//   position: absolute;
//   top: 10vh;
//   height: 100vh;
//   right: 200px;
//   left: 200px;
//   // margin-top: 10vh;
//   background: #000;
// }
//-----------第三种方法  每一个都加了tablecell属性表格
// .home{
//   width: 100%;
//   // display: table;
// }

// .column{
// display: table-cell;
//  height: 100vh;
// }
// .drag{
//   width: 200px;
//  min-width: 200px;
//   background: #c49d9d;
// }
// .attribute{
//   width: 200px;
//    min-width: 200px;
//   background:#c49d9d;
// }
// .canvas{
//   width: 100%;
//   background: #7e7979;
// }
//-------------第四种方法 flex布局
.home {
  display: flex;
  justify-content: space-between;
}
.drag {
  width: 200px;
  height: 100vh;
  background: #fff;
}
.attribute {
  width: 200px;
  height: 100vh;
  background: #fff;
}
.canvas {
  height: 100vh;
  width: 100%;
  background: #ccc;
}
</style>
