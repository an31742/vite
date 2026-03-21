<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Confirm">
      <ElInput v-model="ruleForm.name" />
    </el-form-item>
    <ElFormItem label="Password">
      <el-input v-model="ruleForm.password" />
    </ElFormItem>
    <el-form-item>
      <ElButton type="primary" @click="submitForm">Submit</ElButton>
      <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useCounter } from "@/store/index.ts";

export default {
  setup() {
    const store = useCounter();
    const router = useRouter();
    const ruleForm = reactive({
      name: "admin",
      password: 12345,
    });

    const submitForm = () => {
      store.getUserInfo(ruleForm); //在登录的时候获取用户信息
      store.getAuthButtonList(); //在登录的时候获取按钮级别权限
      window.localStorage.setItem("token", "an31742");
      router.push({
        path: "/",
      });
    };
    console.log(
      "🚀 ~ submitForm ~ store.getAuthButtonList():",
      store.getAuthButtonList(),
    );

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
