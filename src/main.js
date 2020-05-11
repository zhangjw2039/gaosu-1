import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import BaiduMap from 'vue-baidu-map'
import './assets/goalbe.css'
import 'vant/lib/index.css'
import './assets/font/iconfont.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import util from './util/index.js'
// 引入ajax模块
import axios from 'axios'
// axios.defaults.withCredentials = true
import adminRoutes from '@/router/adminRoutes'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'q8NjyvckoGUEiPYKcvE1xyIDBIjo2rgu'
})
Vue.use(vant)
// https://jxgszlxcx.jxgszl.com
// http://192.168.0.80:9090/

axios.defaults.baseURL = 'http://xiongyunfei.wezoz.com/'
Vue.prototype.$ajax = axios
Vue.prototype.util = util
// 添加进度条效果
router.beforeEach((to, from, next) => {
  console.log(to.path)
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    if (window.localStorage.getItem('ROLS')) {
    // 如果存在则重新加载路由
      util.$addRoutes(router, adminRoutes, util.getRols(store.state.rols))
    // console.log(to.path)
    }
  }
}).$mount('#app')
