<template>
  <div>{{ form.inputName }} :</div>
  <el-input v-model="form.inputValue" style="width: 240px" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { draggableObj } from "@/store/index.ts"

const draggableObjStore = draggableObj()

let form = ref({
  inputName: "",
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
