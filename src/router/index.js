import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import api from '@/assets/js/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// api 攔截處理
api.api.interceptors.response.use((response) => {
  return response
}, () => {
  console.log('err');
})

export default router
