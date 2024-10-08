<template>
  <el-input v-model="props.value" style="width: 240px" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
const props = defineProps(["value"])
</script>
