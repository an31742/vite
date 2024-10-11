import type { App } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { useCounter } from "./module/user.ts"
import { draggableObj } from "./module/draggableObj.ts"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}
export { useCounter, draggableObj }

export default pinia
