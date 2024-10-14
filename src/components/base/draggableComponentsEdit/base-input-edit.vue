<template>
  <h4 style="margin-bottom: 20px;">输入框属性编辑</h4>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="输入框名称">
      <el-input v-model="form.inputName" />
    </el-form-item>
    <el-form-item label="输入框的值">
      <el-input v-model="form.inputValue" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue"
import { draggableObj } from "@/store/index.ts"

const storeDraggableObj = draggableObj()

const form: any = reactive({
  inputName: "",
  inputValue: "",
})

watch(
  () => form,
  (newValue, oldValue) => {
    storeDraggableObj.getInputObj(newValue)
  },
  { deep: true }
)
</script>
