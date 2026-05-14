/*
 * @Author: maxiangan
 * @Date: 2023-08-27 19:28:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-25 14:00:42
 * @Description: 请填写简介
 */

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_WEB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
