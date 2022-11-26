import Vue from 'vue'
import VueRouter from 'vue-router'
import CloudLogin from '../components/CloudLogin.vue'
import FileExplorer from '../components/FileExplorer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'CloudLogin',
    component: CloudLogin,
  },
  {
    path: '/:id',
    name: 'FileExplorer',
    component: FileExplorer,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
