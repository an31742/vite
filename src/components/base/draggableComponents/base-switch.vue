<template>
    <div class="switch-item">
      <div class="mar">
        <span class="switch-name">{{ form.switchName }}</span>
        <el-switch v-model="form.switchValue" style="width: 240px" placeholder="Please switch" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from "vue"
  import { draggableObj } from "@/store/index.ts"
  
  const draggableObjStore = draggableObj()
  
  let form = ref({
    switchName: "输入开关名称",
    switchValue: "",
  })
  
  watch(
    () => draggableObjStore.$state.switchObj,
    (newValue: any, oldValue: any) => {
      console.log("newValue, oldValue: ", newValue, oldValue)
      form.value = { ...newValue }
    },
    { deep: true }
  )
  </script>
  <style lang="less" scope>
  .switch-item {
    border: 1px solid #fff;
  }
  .switch-name {
    background: "#fff";
    margin-right: 20px;
  }
  
  .mar {
    margin: 15px;
  }
  </style>
  