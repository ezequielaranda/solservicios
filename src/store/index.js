import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import auth from './modules/usuarios/auth.js'
import usuarios from './modules/usuarios/usuarios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    auth,
    usuarios
  }
})