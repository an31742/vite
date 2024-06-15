/*
 * @Author: maxiangan
 * @Date: 2023-08-27 21:46:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-26 14:25:30
 * @Description: 请填写简介
 */import { defineStore } from "pinia";

interface UserStore {
  userInfo: any;
  isCollapse: boolean;
  userResourceTree: any;
  routes: any;
  roles: any
}

export const useCounter = defineStore("user", {
  state: (): UserStore => ({
    // 初始化 state 属性的值
    userInfo: {
    },
    roles: [],

    isCollapse: false,
    userResourceTree: null,
    routes: [],
  }),

  actions: {
    // 定义 actions 的方法
    getUserInfo(payload: any) {

      if (Object.keys(payload).length === 0) {
        payload = {
          name: "admin",
          password: 12345,
        };
      }
      /**
       * 掉接口返回一个数组这个数组就是告诉前端当前页面返回的是管理员权限还是哪些权限
       * 前端在各个路由限制 每个都会有对应的权限如果没有路由就不会展示
       */
      payload.roles = ["admin", "super-management"];
      localStorage.setItem("userInfo", JSON.stringify(payload));

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
