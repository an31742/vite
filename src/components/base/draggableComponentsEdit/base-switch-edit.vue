<template>
  <h4>输入框属性编辑</h4>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="开关名称">
      <el-input v-model="form.switchName" />
    </el-form-item>
    <el-form-item label="开关的值">
      <el-input v-model="form.switchValue" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue"
import { draggableObj } from "@/store/index.ts"

const storeDraggableObj = draggableObj()

const form: any = reactive({
  switchName: "",
  switchValue: "",
})

watch(
  () => form,
  (newValue, oldValue) => {
    storeDraggableObj.getSwitchObj(newValue)
  },
  { deep: true }
)
</script>
