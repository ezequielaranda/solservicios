import {getTiposProducto, 
        editTipoProducto, 
        deleteTipoProducto,
        addTipoProducto } from '@/services/productos.js'


const state = {
  tipoProductos: []
}

const actions = {
  GET_TIPO_PRODUCTOS: (context) => {
    getTiposProducto().then((response) => { context.commit('SET_TIPO_PRODUCTOS', response.data) })
  },

  ADD_TIPO_PRODUCTO: (context, data) => {
    addTipoProducto(data).then((response) => { context.commit('ADD_TIPO_PRODUCTO', response.data) }) 
  },

  EDIT_TIPO_PRODUCTO: (context, data) => {
    editTipoProducto(data).then((response) => { context.commit('EDIT_TIPO_PRODUCTO', response.data) })
  },

  DELETE_TIPO_PRODUCTO: (context, idTipoProducto) => {
    deleteTipoProducto(idTipoProducto).then(() => { context.commit('DELETE_TIPO_PRODUCTO', idTipoProducto)} )
  },
}

const mutations = {
  SET_TIPO_PRODUCTOS: (state, tipoProductos) => { state.tipoProductos = tipoProductos },

  ADD_TIPO_PRODUCTO: (state, tipoProducto) => { state.tipoProductos.push(tipoProducto) },

  EDIT_TIPO_PRODUCTO: (state, tipoProducto) => {
    const index = state.tipoProductos.map(o => o.id).indexOf(tipoProducto.id);
    state.tipoProductos.splice(index, 1, tipoProducto);
  },
  DELETE_TIPO_PRODUCTO: (state, idTipoProducto) => {
    const objIndex = state.tipoProductos.findIndex(obj => obj.id === idTipoProducto)
    state.tipoProductos.splice(objIndex, 1)
  }

}

const getters = {
  TIPO_PRODUCTOS: state => { return state.tipoProductos },
  TIPO_PRODUCTO_BY_ID: (state) => (id) => { return state.tipoProductos.find(tipoProducto => tipoProducto.id === id) }
}

export default {
  state,
  mutations,
  actions,
  getters
}
