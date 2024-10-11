<template>
  <el-input v-model="inputValue" style="width: 240px" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
const props = defineProps(["value"])

const inputValue = computed(() => props.value)
</script>
