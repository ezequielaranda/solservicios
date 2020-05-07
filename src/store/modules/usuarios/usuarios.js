import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '@/store/modules/usuarios/usuariosActions.js'
import { AUTH_LOGOUT } from '@/store/modules/usuarios/authActions.js'
import { getUserByUsername } from '@/services/auth.js'
import Vue from 'vue'

const state = {
  status: '',
  profile: {}
}

const getters = {
  getProfile: state => state.profile,
  getUserName: state => { return state.profile.username },
  isProfileLoaded: state => !!state.profile.name,
  isAdminUser: state => state.profile.is_superuser
}

const mutations = {
  [USER_REQUEST]: state => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
    //state.profile.first_name = resp.first_name
    //state.profile.last_name = resp.last_name
    //state.profile.username = resp.username
  },
  [USER_ERROR]: state => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {}
  }
}

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, username) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      getUserByUsername(username).then(response => {
        // console.log(response.data[0])
        commit(USER_SUCCESS, response.data[0])
        resolve(response.data[0])
      })
        .catch(err => {
          commit(USER_ERROR, err)
          dispatch(AUTH_LOGOUT)
          reject(err)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
