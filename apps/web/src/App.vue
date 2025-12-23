<script setup lang="ts">
import { ref, onMounted ,nextTick} from "vue";
import axios from "axios";
import Modal from "@/components/com/Modal/index.vue"; //使用基础公共弹窗将公共弹窗挂载到全局上
import { initModalInstance } from "@/components/com/Modal/modalApi";
const response = ref("");
const modalRef = ref(null);
onMounted(async () => {
  try {
    const res = await axios.get("/health");
    response.value = res.data.status;
    console.log("response.value", response.value);
  } catch (error) {
    console.error(error);
  }
  await nextTick()
  if (modalRef.value) {
    //将组建复制给initModalInstance
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
