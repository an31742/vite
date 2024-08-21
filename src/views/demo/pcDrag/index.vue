<template>
  <main class="home">
    <div class="drag"></div>
    <div class="canvas"></div>
    <div class="control"></div>
  </main>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>
<style>
.el-main {
  padding: 0;
  margin: 0;
}</style>
<style lang="less" scoped>


//经典三栏布局多种方法  margin float 方法不可以按照顺序摆放盒子
//--------------1第一种方法
// .drag{
//   float: left;
// width: 200px;
//   height: 100vh;
//   background: #8b8c8d;
// }
// .control{
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
// .control {
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
// .control{
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
  background: #c49d9d;
}
.control {
  width: 200px;
  height: 100vh;
  background: #c49d9d;
}
.canvas {
  height: 100vh;
  width: 100%;
  background: #7e7979;
  .pc {
    display: block;
    margin: auto;
    background: url("~@/assets/pc-box.png") no-repeat;
    background-size: cover;
    height: 700px;
    width: 100%;
    // border:1px solid red;
    padding: 50px 5px;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    p {
      color: red;
    }
    .drag-area {
      margin: 0 auto;
      width: 1080px;
      height: 620px;
      overflow: auto;
      // flex: 1;
      .list-group-item {
        width: 100%;
      }
      .list-layout-item {
        margin-bottom: 20px;
        width: 100%;
      }
    }
  }
}
</style>
