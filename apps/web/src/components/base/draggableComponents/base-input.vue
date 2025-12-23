<template>
  <div class="input-item">
    <div class="mar">
      <span class="input-name">{{ form.inputName }}</span>
      <el-input v-model="form.inputValue" style="width: 240px" placeholder="Please input" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { draggableObj } from "@/store/index.ts"

const draggableObjStore = draggableObj()

let form = ref({
  inputName: "输入框名称",
  inputValue: "",
})

watch(
  () => draggableObjStore.$state.inputObj,
  (newValue: any, oldValue: any) => {
    console.log("newValue, oldValue: ", newValue, oldValue)
    form.value = { ...newValue }
  },
  { deep: true }
)
</script>
<style lang="less" scope>
.input-item {
  width: 450px;
  border: 1px solid #fff;
}
.input-name {
  background: "#fff";
  margin-right: 20px;
}

.mar {
  margin: 15px;
}
</style>
