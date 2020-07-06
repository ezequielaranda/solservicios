import {  getClientes,
  addCliente,
  editCliente,
  deleteCliente,
  getPuntosLimpiezaCliente,
  addPuntoLimpiezaCliente,
  editPuntoLimpiezaCliente,
  deletePuntoLimpiezaCliente } from '@/services/clientes.js'


const state = {
clientes: [],
puntosLimpiezaCliente: []
}

const actions = {
  GET_CLIENTES: (context) => {
    getClientes().then((response) => { context.commit('SET_CLIENTES', response.data) })
  },

  GET_PUNTOS_CLIENTES: (context) => {
    getPuntosLimpiezaCliente().then((response) => { context.commit('SET_PUNTOS_CLIENTES', response.data) })
  },

  ADD_CLIENTE: (context, data) => {
    return new Promise((resolve, reject) => {
      addCliente(data).then(
        (response) => {
          context.commit('ADD_CLIENTE', response.data)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  },

  ADD_PUNTO_CLIENTE: (context, data) => {
    return new Promise((resolve, reject) => {
      addPuntoLimpiezaCliente(data).then(
        (response) => {
          context.commit('ADD_PUNTO_CLIENTE', response.data)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  },

  EDIT_CLIENTE: (context, data) => {
    return new Promise((resolve, reject) => {
      editCliente(data).then(
        (response) => {
          context.commit('EDIT_CLIENTE', response.data)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  },

  EDIT_PUNTO_CLIENTE: (context, data) => {
    return new Promise((resolve, reject) => {
      editPuntoLimpiezaCliente(data).then(
        (response) => {
          context.commit('EDIT_PUNTO_CLIENTE', response.data)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  },

  DELETE_CLIENTE: (context, idCliente) => {
    return new Promise((resolve, reject) => {
      deleteCliente(idCliente).then(() => {
        context.commit('DELETE_CLIENTE', idCliente)
        resolve()
      }, (error) => {
          reject(error)
        }) 
    })
  },

  DELETE_PUNTO_CLIENTE: (context, idPuntoCliente) => {
    return new Promise((resolve, reject) => {
      deletePuntoLimpiezaCliente(idPuntoCliente).then(() => {
        context.commit('DELETE_PUNTO_CLIENTE', idPuntoCliente)
        resolve()
      }, (error) => {
          reject(error)
        }) 
    })
  },
}

const mutations = {
SET_CLIENTES: (state, clientes) => { state.clientes = clientes },

SET_PUNTOS_CLIENTES: (state, puntosClientes) => { state.puntosLimpiezaCliente = puntosClientes },

ADD_CLIENTE: (state, cliente) => { state.clientes.push(cliente) },

ADD_PUNTO_CLIENTE: (state, puntoLimpiezaCliente) => { 
  state.puntosLimpiezaCliente.push(puntoLimpiezaCliente)
},

EDIT_CLIENTE: (state, cliente) => {
  const index = state.clientes.map(o => o.id).indexOf(cliente.id);
  state.clientes.splice(index, 1, cliente);
},

EDIT_PUNTO_CLIENTE: (state, puntoCliente) => {
  const index = state.puntosLimpiezaCliente.map(o => o.id).indexOf(puntoCliente.id);
  state.puntosLimpiezaCliente.splice(index, 1, puntoCliente);
},

DELETE_CLIENTE: (state, idCliente) => {
  const objIndex = state.clientes.findIndex(obj => obj.id === idCliente)
  state.clientes.splice(objIndex, 1)
},

DELETE_PUNTO_CLIENTE: (state, idPuntoCliente) => {
  const objIndex = state.puntosLimpiezaCliente.findIndex(obj => obj.id === idPuntoCliente)
  state.puntosLimpiezaCliente.splice(objIndex, 1)
}

}

const getters = {
  CLIENTES: state => { return state.clientes },
  // CLIENTES: state => { return state.clientes.sort((a,b) => a.nombre_completo.localeCompare(b.nombre_completo) ) },
  CLIENTE_BY_ID: (state) => (idCliente) => { return state.clientes.find(cliente => cliente.id === idCliente) },
  PUNTO_CLIENTE_BY_ID: (state) => (idPuntoLimpiezaCliente) => { 
    return state.puntosLimpiezaCliente.find(puntoLimpiezaCliente => puntoLimpiezaCliente.id === idPuntoLimpiezaCliente)
  },
  PUNTO_CLIENTE_BY_CLIENTE_ID: (state) => (idCliente) => { 
    return state.puntosLimpiezaCliente.filter(puntoLimpiezaCliente => puntoLimpiezaCliente.cliente === idCliente)
  }
}

export default {
state,
mutations,
actions,
getters
}
