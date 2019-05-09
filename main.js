import Vue from 'vue'
import App from './App'
import axios from './Api/axios'
import api from './Api/api'
import store from './store'
Vue.prototype.$store = store;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = false
//引入图片懒加载组件
import lazyImage from "./components/lazy-image"
Vue.component('lazy-image',lazyImage)
App.mpType = 'app'
//引入保持后台运行方法
import realTime from "./common/js/realTime.js"
Vue.prototype.$realTime = realTime;
const app = new Vue({
    ...App
})
app.$mount()
