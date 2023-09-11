<template>
  <div class="front-main">
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toVue3 = () => {
      router.push({
        path: "/vue3",
        query: {
          id: 1,
        },
      });
    };
    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1/01",
      });
    };
    const toDemo = () => {
      router.push({
        path: "/demo/toLocalStorage",
      });
    };

    return {
      toDemo,
      toVue3,
      fe_interview,
    };
  },
});
</script>

<style scoped lang="less">



.front-main {
  background: url("../assets/bgLogin.webp") no-repeat 100% 100%;
   width: 100%;
  height: 100%;

}

body > .el-container {
  margin-bottom: 40px;
}


</style>
