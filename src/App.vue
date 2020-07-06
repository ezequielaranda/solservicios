<template>
    <b-container id="app" fluid>
     <b-row class="navigation-bar">
        <navigation v-if="isAuthenticated" />
     </b-row>
    <b-row class="main-container">
      <router-view />
    </b-row>
  <div v-if="isAuthenticated" class="sq-footer shadow">
    {{getDomicilioEmpresa()}} , Argentina - <a target="_blank" href="http://www.XXXXXXXXXXXXXX.com.ar"> - {{getNombreEmpresa()}}</a>
  </div>

  </b-container>
</template>

<script>
import navigation from '@/components/navigation/navigation.vue'
export default {

  components: {
    navigation
  },
  name: 'app',

  data () {
    return {}
  },
  
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated
    }
  },
  

  created: function () {
    if (!this.$store.getters.isAuthenticated || this.$store.getters.authStatus === '') { 
      this.logout()
    } 
  },

  methods: {
    logout () { 
      this.$store.dispatch('AUTH_LOGOUT').then(
        () => this.$router.push('/auth')
      )
    },
    
    getDomicilioEmpresa() { 
      return this.$store.getters.DOMICILIOEMPRESA
    },

    getNombreEmpresa() { 
      return this.$store.getters.NOMBREEMPRESA
    },

    getCiudadEmpresa() { 
      return this.$store.getters.CIUDADEMPRESA
    },
  }
}

</script>

<!--style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;



  font-family: 'Manrope', sans-serif !important;
  line-height: 1.0;
}
</style-->

<style>

#nav-collapse a.router-link-exact-active {
  color: #cccccc;
}

body {
  font-family: 'Roboto', sans-serif !important;
  font-size: 15px;
  line-height: 1.1;
}

#app {
  padding-right: 15px;
  padding-left: 15px;
}

.navigation-bar {
  background-color: #ffffff;
}

.main-container {
  min-height: calc(100vh - 130px);
  background-color: #ffffff;
}

.sq-footer {
  background-color: #53aeca;
  height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  padding-right: 1em;
  font-family: 'Montserrat', sans-serif !important;
}
</style>
