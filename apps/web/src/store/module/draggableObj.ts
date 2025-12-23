import { defineStore } from "pinia"

interface DraggableObjStore {
  inputObj: any
  switchObj: any
}

export const draggableObj = defineStore("draggAbleObj", {
  state: (): DraggableObjStore => ({
    // 初始化 state 属性的值
    inputObj: {
      inputName: "",
      inputValue: "",
    },
    switchObj: {
      switchName: "",
      switchValue: "",
    },
  }),

  actions: {
    // 定义 actions 的方法
    getInputObj(payload: any) {
      this.inputObj = payload
    },
    getSwitchObj(payload: any) {
      this.switchObj = payload
    },
  },
  //增加本地持久化
  persist: {
    key: "draggAbleObj",
    storage: localStorage,
  },
})
