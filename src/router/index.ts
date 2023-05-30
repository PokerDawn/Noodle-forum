import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: ()=>import("../components/Login")
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import("../components/Register")
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: ()=>import("../components/Home"),
    children:[
      {
        path: '/home/index',
        name: 'index',
        component: ()=>import("../components/index"),
        
      },
      {
        path: '/home/release',
        name: 'release',
        component: ()=>import("../components/Release"),
      },
      {
        path: '/home/chat',
        name: 'chat',
        component: ()=>import("../components/chat"),
      },
      {
        path: '/home/details',
        name: 'details',
        component: ()=>import("../components/Details"),
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{ 
  
  if(to.path == '/') return next()
  if(to.path == '/register') return next()
  let token = store.state.token
  if(token) return next()
  
  return next('/') 
})
export default router
