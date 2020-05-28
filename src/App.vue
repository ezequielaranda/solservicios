<template>
    <b-container id="app" fluid>
     <b-row>
        <navigation />
     </b-row>
    <b-row class="main-container">
      <router-view  />
    </b-row>
  <div class="sq-footer shadow">
    Salvador del Carril 2322 (S3004FQF) Santa Fe, Argentina - <a target="_blank" href="http://www.solservicios.com.ar"> - SOL Servicios S.A.</a>
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

  created: function () {
    if (!this.$store.getters.isAuthenticated || this.$store.getters.authStatus === '') { 
      this.logout()
    } 
  },

  methods: {
    logout () { this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/auth')) }
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
}
</style-->

<style>

#nav-collapse a.router-link-exact-active {
  color: #cccccc;
}

body {
  font-family: 'Roboto', sans-serif !important;
  font-size: 16px;
  line-height: 1.2;
}

.main-container {
  min-height: calc(100vh - 130px);
}

.sq-footer {
  background-color: #5bc0de;
  height: 40px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  padding-right: 1em;
}
</style>
