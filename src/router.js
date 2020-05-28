import Vue from 'vue'
import Router from 'vue-router'
// import VueDemo from '@/components/VueDemo'
import Messages from '@/components/Messages'
import store from './store/index.js'

import Auth from './views/login/Auth.vue'
import AccessNotAllowed from './views/login/AccessNotAllowed.vue'
import Home2 from './views/Home2.vue'
import HomeAdmin from './views/HomeAdmin.vue'
import HomeUser from './views/HomeUser.vue'
import ListaProductosView from './views/productos/producto/ListaProductosView.vue'

import ReporteConsumoClientesView from './views/reportes/ReporteConsumoClientesView.vue'

import ListaClientesView from './views/clientes/ListaClientesView.vue'
import NewEditClienteView from './views/clientes/NewEditClienteView.vue'
import NewEditPuntoLimpiezaClienteView from './views/clientes/NewEditPuntoLimpiezaClienteView.vue'

import StockProductosView from './views/productos/producto/StockProductosView.vue'
import NewEditProductoView from './views/productos/producto/NewEditProductoView.vue'
import PreciosProductosView from './views/productos/producto/PreciosProductosView.vue'

import ListaTipoProductosView from './views/productos/tipoProducto/ListaTipoProductosView.vue'
import ListaFamiliaProductosView from './views/productos/familiaProducto/ListaFamiliaProductosView.vue'
import NewEditFamiliaProductoView from './views/productos/familiaProducto/NewEditFamiliaProductoView.vue'

import EditTipoProductoView from './views/productos/tipoProducto/EditTipoProductoView.vue'
import NewTipoProductoView from './views/productos/tipoProducto/NewTipoProductoView.vue'

import NewFacturaCompraView from './views/facturaCompra/NewFacturaCompraView.vue'
import ListaFacturaCompraView from './views/facturaCompra/ListaFacturaCompraView.vue'

import ListaProveedoresView from './views/proveedores/ListaProveedoresView.vue'
import NewEditProveedorView from './views/proveedores/NewEditProveedorView.vue'

import ListaEntregaClienteView from './views/entregas/ListaEntregaClienteView.vue'
import NewEntregaClienteView from './views/entregas/NewEntregaClienteView.vue'
import NewDevolucionEntregaClienteView from './views/entregas/NewDevolucionEntregaClienteView.vue'


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

const ifisAdminUser = (to, from, next) => {
  if (store.getters.isAuthenticated && store.getters.isAdminUser) {
    next()
    return
  }
  next('/accessNotAllowed')
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
      path: '/homeAdmin',
      name: 'homeAdmin',
      component: HomeAdmin,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/homeUser',
      name: 'homeUser',
      component: HomeUser,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/accessNotAllowed',
      name: 'AccessNotAllowed',
      component: AccessNotAllowed
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
    {
      path: '/newTipoProductoView',
      name: 'NewTipoProductoView',
      component: NewTipoProductoView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/tipoProductos',
      name: 'listaTipoProductosView',
      component: ListaTipoProductosView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/familiaProductos',
      name: 'listaFamiliaProductosView',
      component: ListaFamiliaProductosView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/tipoProductos/:idTipoProducto/edit',
      name: 'editTipoProductoView',
      component: EditTipoProductoView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newFacturaCompra',
      name: 'newFacturaCompraView',
      component: NewFacturaCompraView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/listaFacturasCompra',
      name: 'ListaFacturaCompraView',
      component: ListaFacturaCompraView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/listaProveedores',
      name: 'ListaProveedoresView',
      component: ListaProveedoresView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/listaClientes',
      name: 'ListaClientesView',
      component: ListaClientesView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEditProductoView',
      name: 'newEditProductoView',
      component: NewEditProductoView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEditFamiliaProductoView',
      name: 'newEditFamiliaProductoView',
      component: NewEditFamiliaProductoView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEditProveedorView',
      name: 'NewEditProveedorView',
      component: NewEditProveedorView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEditClienteView',
      name: 'NewEditClienteView',
      component: NewEditClienteView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEditPuntoLimpiezaClienteView',
      name: 'NewEditPuntoLimpiezaClienteView',
      component: NewEditPuntoLimpiezaClienteView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/listaEntregaClienteView',
      name: 'ListaEntregaClienteView',
      component: ListaEntregaClienteView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newEntregaClienteView',
      name: 'NewEntregaClienteView',
      component: NewEntregaClienteView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/newDevolucionEntregaClienteView/:entregaId',
      name: 'newDevolucionEntregaClienteView',
      component: NewDevolucionEntregaClienteView,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/stockProductos',
      name: 'StockProductosView',
      component: StockProductosView,
      beforeEnter: ifisAdminUser
    },
    {
      path: '/preciosProductos',
      name: 'PreciosProductosView',
      component: PreciosProductosView,
      beforeEnter: ifisAdminUser
    },
    {
      path: '/reporteConsumoClientesView',
      name: 'ReporteConsumoClientesView',
      component: ReporteConsumoClientesView,
      beforeEnter: ifisAdminUser
    },

    
  ]
})
