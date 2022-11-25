import Vue from 'vue'
import VueRouter from 'vue-router'
import CloudLogin from '../components/CloudLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'CloudLogin',
    component: CloudLogin,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
