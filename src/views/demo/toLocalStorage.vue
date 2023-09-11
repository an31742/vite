<template>
  <div class="show-viewcom">
    <p>评论:</p>
    <div class="context">llalal</div>
  </div>

  <div class="show-viewcom cont">
    <input class="input-use" type="textarea" v-model="content" />
    <el-button class="button">发表</el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style>
.show-viewcom {
  width: 80%;
  height: 200px;
  margin: 26px;
  padding: 10px;
  border: 1px solid red;
}
p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.cont {
  border: 1px solid blue;
}
.context {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
}

.input-use {
  width: 95%;
  height: 140px;
  padding: 10px;
  border: 1px solid grey;
}

button {
  margin-top: 10px;
  float: right;
}
</style>
