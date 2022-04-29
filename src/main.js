import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import request from "./api/request";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = request

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
