import {getFamiliasProducto, 
  editFamiliaProducto, 
  deleteFamiliaProducto,
  addFamiliaProducto } from '@/services/productos.js'


const state = {
  familiasProducto: []
}

const actions = {
  GET_FAMILIAS_PRODUCTO: (context) => {
    getFamiliasProducto().then((response) => { context.commit('SET_FAMILIAS_PRODUCTO', response.data) })
  },

  ADD_FAMILIA_PRODUCTO: (context, data) => {
    addFamiliaProducto(data).then((response) => { context.commit('ADD_FAMILIA_PRODUCTO', response.data) }) 
  },

  EDIT_FAMILIA_PRODUCTO: (context, data) => {
    editFamiliaProducto(data).then((response) => { context.commit('EDIT_FAMILIA_PRODUCTO', response.data) })
  },

  DELETE_FAMILIA_PRODUCTO: (context, idFamiliaProducto) => {
    deleteFamiliaProducto(idFamiliaProducto).then(() => { context.commit('DELETE_FAMILIA_PRODUCTO', idFamiliaProducto)} )
  },
}

const mutations = {
  SET_FAMILIAS_PRODUCTO: (state, familiasProducto) => { state.familiasProducto = familiasProducto },

  ADD_FAMILIA_PRODUCTO: (state, familiaProducto) => { state.familiasProducto.push(familiaProducto) },

  EDIT_FAMILIA_PRODUCTO: (state, familiaProducto) => {
    const index = state.familiasProducto.map(o => o.id).indexOf(familiaProducto.id);
    state.familiasProducto.splice(index, 1, familiaProducto);
  },
  DELETE_FAMILIA_PRODUCTO: (state, idFamiliaProducto) => {
    const objIndex = state.familiasProducto.findIndex(obj => obj.id === idFamiliaProducto)
    state.familiasProducto.splice(objIndex, 1)
}

}

const getters = {
FAMILIAS_PRODUCTO: state => { return state.familiasProducto },
FAMILIA_PRODUCTO_BY_ID: (state) => (id) => { return state.familiasProducto.find(familiaProducto => familiaProducto.id === id) }
}

export default {
state,
mutations,
actions,
getters
}
