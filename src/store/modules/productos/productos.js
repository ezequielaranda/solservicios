
import {getProductos, 
  addProducto, 
  deleteProducto,
  editProducto,
  getStockProductos,
  getEstadosProducto } from '@/services/productos.js'

const state = {
  productos: [],
  estadosProducto: []
}

const actions = {
  GET_PRODUCTOS: (context) => {
    getProductos().then((response) => { context.commit('SET_PRODUCTOS', response.data) })
  },

  GET_ESTADOS_PRODUCTO: (context) => {
    getEstadosProducto().then((response) => { context.commit('SET_ESTADOS_PRODUCTO', response.data) })
  },

  ADD_PRODUCTO: (context, data) => {
    addProducto(data).then((response) => { context.commit('ADD_PRODUCTO', response.data) }) 
  },

  EDIT_PRODUCTO: (context, data) => {
    editProducto(data).then((response) => { context.commit('EDIT_PRODUCTO', response.data) })
  },

  DELETE_PRODUCTO: (context, idProducto) => {
    deleteProducto(idProducto).then(() => { context.commit('DELETE_PRODUCTO', idProducto)} )
  },

  
  GET_STOCK_PRODUCTOS: (context) => {
    return new Promise((resolve, reject) => {
      getStockProductos().then((response) => {
        resolve(response.data)
      }, (error) => {
          reject(error)
         }) 
    })
  },

}

const mutations = {

  SET_PRODUCTOS: (state, productos) => { state.productos = productos },

  SET_ESTADOS_PRODUCTO: (state, estadosProducto) => { state.estadosProducto = estadosProducto },

  ADD_PRODUCTO: (state, producto) => { state.productos.push(producto) },

  EDIT_PRODUCTO: (state, producto) => {
    const index = state.productos.map(o => o.id).indexOf(producto.id);
    state.productos.splice(index, 1, producto);
  },
  DELETE_PRODUCTO: (state, idProducto) => {
    const objIndex = state.productos.findIndex(obj => obj.id === idProducto)
    state.productos.splice(objIndex, 1)
  }

}

const getters = {
  PRODUCTOS: state => { return state.productos },
  ESTADOS_PRODUCTO: state => { return state.estadosProducto },
  PRODUCTO_BY_ID: (state) => (id) => { return state.productos.find(producto => producto.id === id) }
}

export default {
  state,
  mutations,
  actions,
  getters
}
