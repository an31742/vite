<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Confirm">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";

export default {
  setup() {
    const router = useRouter();
    const ruleForm = reactive({
      name: "admin",
      password: 12345,
    });

    const submitForm = () => {
      window.localStorage.setItem("token", "why");

      router.push({
        path: "/",
      });
    };

    const resetForm = () => {};
    return {
      ruleForm,
      submitForm,
      resetForm,
    };
  },
};
</script>
<style scope lang="less">
.demo-ruleForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
body {
  background: url("@/assets/bgLogin.webp") no-repeat;
}
</style>
