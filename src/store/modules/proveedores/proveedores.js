import {  getProveedores,
  addProveedor,
  editProveedor,
  deleteProveedor } from '@/services/proveedores.js'


const state = {
proveedores: []
}

const actions = {
GET_PROVEEDORES: (context) => {
getProveedores().then((response) => { context.commit('SET_PROVEEDORES', response.data) })
},

ADD_PROVEEDOR: (context, data) => {
addProveedor(data).then((response) => { context.commit('ADD_PROVEEDOR', response.data) }) 
},

EDIT_PROVEEDOR: (context, data) => {
editProveedor(data).then((response) => { context.commit('EDIT_PROVEEDOR', response.data) })
},

DELETE_PROVEEDOR: (context, idProveedor) => {
  return new Promise((resolve, reject) => {
    deleteProveedor(idProveedor).then(() => {
      context.commit('DELETE_PROVEEDOR', idProveedor)
      resolve()
    }, (error) => {
        reject(error)
       }) 
  })
},
}

const mutations = {
SET_PROVEEDORES: (state, proveedores) => { state.proveedores = proveedores },

ADD_PROVEEDOR: (state, proveedor) => { state.proveedores.push(proveedor) },

EDIT_PROVEEDOR: (state, proveedor) => {
  const index = state.proveedores.map(o => o.id).indexOf(proveedor.id);
  state.proveedores.splice(index, 1, proveedor);
},
DELETE_PROVEEDOR: (state, idProveedor) => {
  const objIndex = state.proveedores.findIndex(obj => obj.id === idProveedor)
  state.proveedores.splice(objIndex, 1)
}

}

const getters = {
PROVEEDORES: state => { return state.proveedores },
PROVEEDOR_BY_ID: (state) => (idProveedor) => { return state.proveedores.find(proveedor => proveedor.id === idProveedor) }
}

export default {
state,
mutations,
actions,
getters
}
