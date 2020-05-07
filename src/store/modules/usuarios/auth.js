/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/modules/usuarios/authActions.js'
import { USER_REQUEST } from '@/store/modules/usuarios/usuariosActions.js'
import api from '@/services/api'
import { getAuth } from '@/services/auth.js'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => state.token !== '',
  authStatus: state => state.status
}

const mutations = {

  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
  }
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      getAuth(user).then(response => {
        localStorage.setItem('user-token', response.data.token)
        // console.log(response.data.token)
        // console.log(localStorage.getItem('user-token'))
        api.defaults.headers.common['Authorization'] = 'Token ' + response.data.token
        commit(AUTH_SUCCESS, response)
        dispatch(USER_REQUEST, user.username)
        resolve(response)
      })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },

  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      delete api.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
