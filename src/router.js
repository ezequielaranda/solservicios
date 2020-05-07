import Vue from 'vue'
import Router from 'vue-router'
// import VueDemo from '@/components/VueDemo'
import Messages from '@/components/Messages'
import store from './store/index.js'

import Auth from './views/login/Auth.vue'
import Home2 from './views/Home2.vue'
import ListaProductosView from './views/productos/producto/ListaProductosView.vue'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home2',
      component: Home2,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/productos',
      name: 'listaProductosView',
      component: ListaProductosView,
      beforeEnter: ifAuthenticated
    },
  ]
})
