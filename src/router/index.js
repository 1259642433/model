import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/model'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('../views/Model')
  },
  {
    path: '/modeldemo',
    name: 'ModelDemo',
    component: () => import('../views/ModelDemo')
  },
  {
    path: '/3d',
    name: 'Vue3DModel',
    component: () => import('../views/Vue3DModel')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
