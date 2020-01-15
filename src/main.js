// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './mock/sellMock.js' // 刚刚手写的mock.js文件
import axios from 'axios' // axios http请求库
import {store} from './store/store'
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
require('./mock/sellMock.js')

Vue.config.productionTip = false
// import axios from 'axios'
// Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
