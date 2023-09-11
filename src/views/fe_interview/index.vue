<template>
  <el-container>
    <el-aside width="200px">
      <ul>
        <li v-for="(item, index) in 100" :key="index">
          {{ item }}
          <router-link
            :to="
              item < 100
                ? `/fe_interview3+1/0${item}`
                : `/fe_interview3+1/${item + 1}`
            "
            >{{ item + "天面试打卡学习" }}</router-link
          >
        </li>
      </ul>
    </el-aside>
    <el-main>
      <router-link to="/layout" style="float: right">返回首页</router-link>
      <router-view> </router-view>
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const fe_interview = () => {
      router.push({
        path: "/fe_interview3+1",
        query: {
          id: 1,
        },
      });
    };
    const toLocalStorage = () => {
      router.push({
        path: "/toLocalStorage",
      });
    };

    return {
      toLocalStorage,
      fe_interview,
    };
  },
});
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 40px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  height: 100vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.content {
  width: 600px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

::v-deep .box-card {
  width: 100%;
  margin: 10px;
  height: 400px;
  overflow: auto;
}
</style>
