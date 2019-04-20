import Vue from 'vue'
import App from './App'
import axios from './Api/axios'
import api from './Api/api'
import store from './store'
Vue.prototype.$store = store;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
