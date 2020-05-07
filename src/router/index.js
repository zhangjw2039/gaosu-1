import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../compoents/home.vue'
import Test from '../compoents/test.vue'
import Maps from '../compoents/map.vue'
import details from '../compoents/other/details.vue'
Vue.use(VueRouter)
const routes = [
  // 自动跳转到home页面中
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Test
  },
  {
    path: '/map',
    name: '/map',
    component: Maps
  },
  {
    path: '/details',
    name: '/details',
    component: details
  }
]
const router = new VueRouter({
  routes
})

export default router
