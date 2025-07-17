<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const response = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('/health')
    response.value = res.data.status
    console.log("response.value",response.value)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <router-view />
  </div>

</template>

<style scoped>

</style>
