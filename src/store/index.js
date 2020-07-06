import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/usuarios/auth.js'
import usuarios from './modules/usuarios/usuarios.js'
import tipoProductos from './modules/productos/tipoProductos.js'
import facturasCompra from './modules/proveedores/facturasCompra.js'
import productos from './modules/productos/productos.js'
import proveedores from './modules/proveedores/proveedores.js'
import clientes from './modules/clientes/clientes.js'
import entregas from './modules/clientes/entregasCliente.js'
import familiasProducto from './modules/productos/familiaProductos.js'
import datosEmpresa from './modules/datosEmpresa.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    usuarios,
    tipoProductos,
    facturasCompra,
    productos,
    proveedores,
    familiasProducto,
    clientes,
    entregas,
    datosEmpresa
  }
})