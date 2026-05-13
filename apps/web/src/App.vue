<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import Modal from "@/components/com/Modal/index.vue";
import { initModalInstance } from "@/components/com/Modal/modalApi";

const modalRef = ref(null);

onMounted(async () => {
  await nextTick();
  if (modalRef.value) {
    initModalInstance(modalRef.value);
  }
});
</script>

<template>
  <div>
    <RouterView />
    <Modal ref="modalRef" />
  </div>
</template>

<style scoped></style>
