import {
  createApp
} from "vue";
import router from "./router";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Loading from './components/Loading'

const app = createApp(App)

app.use(Loading)

app.config.globalProperties.$filters = {
  formatNumber: (val) => {
    return val.toFixed(2)
  }
}
app.use(router).use(Antd).mount("#app");