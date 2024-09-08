<template>
  <div class="raw-displayer">
    <div class="main">
      <pre>{{ JSON.stringify(props.value) }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["value"]);
</script>
<style lang="less" scoped>
.raw-displayer {
  // margin-left:200px;
  border: 1px solid #222;
  height: 500px;
  overflow: auto;
  font-size: 20px;
  background: #ccc;
}
.main {
  display: flex;
  color: #222;
  pre {
    flex: 1;
    text-align: start;
  }
}
</style>
