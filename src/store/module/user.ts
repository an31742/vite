/*
 * @Author: maxiangan
 * @Date: 2023-08-27 21:46:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-26 13:54:07
 * @Description: 请填写简介
 */import { defineStore } from "pinia";

interface UserStore {
  userInfo: any;
  isCollapse: boolean;
  userResourceTree: any;
  routes: never[];
}

export const useCounter = defineStore("user", {
  state: (): UserStore => ({
    // 初始化 state 属性的值
    userInfo: {},
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
      payload.roles = ["admin","super-management"];
      let newData=  JSON.parse(JSON.stringify(payload)) 
       
      localStorage.setItem("userInfo", JSON.stringify(payload));
      this.userInfo = newData;
      
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
