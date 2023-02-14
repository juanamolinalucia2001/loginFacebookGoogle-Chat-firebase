import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '@/firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: { requireAuth: true}
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue'),
    
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    meta: { requireAuth: true}
  },
  {
    path: '/',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    //meta: { requireAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  //pregunto si existe el meta requireAuth
  if(to.matched.some(record => record.meta.requireAuth)){
    //pregunto si existe el usuario
    const usuario = auth.currentUser
    console.log('usuario desde router', usuario)

    if(usuario){
      next()
    }else{
      next({path:'/ingreso'})
    }
    

  }else{
    next()
  }
})

export default router
