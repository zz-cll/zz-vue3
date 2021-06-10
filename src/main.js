import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/antd.css';
import { directives } from './utils/Ginstructions'

const app = createApp(App)
Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
})
app.use(store).use(router).use(Antd).mount('#app')
