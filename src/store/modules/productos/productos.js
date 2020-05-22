
import {getProductos, 
  addProducto, 
  deleteProducto,
  editProducto } from '@/services/productos.js'

const state = {
  productos: []
}

const actions = {
  GET_PRODUCTOS: (context) => {
    getProductos().then((response) => { context.commit('SET_PRODUCTOS', response.data) })
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

}

const mutations = {

  SET_PRODUCTOS: (state, productos) => { state.productos = productos },

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
  PRODUCTO_BY_ID: (state) => (id) => { return state.productos.find(producto => producto.id === id) }
}

export default {
  state,
  mutations,
  actions,
  getters
}
