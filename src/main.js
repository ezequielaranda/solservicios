import Vue from 'vue'
import App from '@/App.vue'

import moment from 'moment';

import store from '@/store' 
import router from '@/router'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vSelect from 'vue-select'
import VueSession from 'vue-session'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

moment.locale('es');
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(VueSession)
Vue.component('v-select', vSelect)


const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
