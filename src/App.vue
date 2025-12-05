<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Modal from "@/components/com/Modal/index.vue";
import { initModalInstance } from "@/components/com/Modal/modalApi";
const response = ref("");
const modalRef = ref(null)
onMounted(async () => {
  try {
    const res = await axios.get("/health");
    response.value = res.data.status;
    console.log("response.value", response.value);
  } catch (error) {
    console.error(error);
  }
  console.log("🚀 ~ modalRef.value:", modalRef.value)
  if (modalRef.value) {
    initModalInstance(modalRef.value);
  }
});
</script>

<template>
  <div>
    <router-view />
    <Modal ref="modalRef" />
  </div>
</template>

<style scoped></style>
