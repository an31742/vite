import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useCounter } from './module/user.ts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export {
  useCounter
}

export default pinia