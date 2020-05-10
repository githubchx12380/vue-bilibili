import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import {Toast} from 'vant'
import 'vant/lib/index.css';
import http from '../http'
import '@/assets/style.css'
Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(vant)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
