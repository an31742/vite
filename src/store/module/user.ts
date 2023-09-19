import { error } from "console";
import { defineStore } from "pinia";

interface UserStore {
  userInfo: any;
  isCollapse: boolean;
  userResourceTree: any;
  routes: never[];
}

export const useCounter = defineStore("user", {
  state: (): UserStore => ({
    // 初始化 state 属性的值
    userInfo: null,
    isCollapse: false,
    userResourceTree: null,
    routes: [],
  }),

  actions: {
    // 定义 actions 的方法
    getUserInfo(payload: any) {
      return new Promise((resolve, reject) => {
        try {
          if (Object.keys(payload).length === 0) {
            payload = {
              name: "admin",
              password: 12345,
            };
          }

          setTimeout(() => {
            payload.roles = ["admin"];
            localStorage.setItem("userInfo", JSON.stringify(payload));
            this.userInfo = payload;
            resolve(payload);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    setUserResourceTree(payload: any) {
      this.userResourceTree = payload;
    },
    getRoutes(payload: any) {
      this.routes = payload || "";
    },
    getCollapse(payload: boolean) {
      this.isCollapse = payload;
    },
  },
  //增加本地持久化
  persist: {
    key: "user",
    storage: localStorage,
  },
});
