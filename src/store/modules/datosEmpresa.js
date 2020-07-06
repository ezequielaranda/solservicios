import {  getDatosEmpresa } from '@/services/datosEmpresa.js'

const state = {
  nombre: '',
  domicilio: '',
  ciudad: ''
}

const getters = {
  NOMBREEMPRESA: state => { return state.nombre },
  CIUDADEMPRESA: state => { return state.ciudad },
  DOMICILIOEMPRESA: state => { return state.domicilio },
}

const actions = {
  GET_DATOSEMPRESA: (context) => {
    getDatosEmpresa().then(
      (response) => { 
        context.commit('SET_DATOSEMPRESA', response.data) 
      })
  },
}

const mutations = {
  SET_DATOSEMPRESA: (state, datosEmpresa) => { 
    state.nombre = datosEmpresa[0].nombre
    state.ciudad = datosEmpresa[0].ciudad
    state.domicilio = datosEmpresa[0].domicilio
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}