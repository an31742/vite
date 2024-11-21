import http from "@/service/http.ts"
import * as T from "./types"
const getAuthButtonListData = {
  code: 200,
  data: {
    authButton: ["add", "batchAdd", "export", "batchDelete", "status"],
    useProTable: ["add", "batchAdd", "export", "batchDelete", "status"],
    authTable: ["add", "edit"],
  },
  msg: "成功",
}

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post("/login", params)
  },
}
export default loginApi

// 获取按钮权限
export const getAuthButtonListApi = () => {
  // return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { noLoading: true });
  // return authButtonList;
  return getAuthButtonListData
}
