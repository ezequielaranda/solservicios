<template>
  <b-container fluid class="bg-light" >
    <!--b-card title="Gestión Integral de Operaciones" align-h="center">
      <div class="shadow border-top my-3"></div-->
      
      <b-form class="mt-5 form-signin" @submit="onSubmit" @reset="onReset">
        <b-img class="mb-3" style="width: 120px" center src="http://www.solservicios.com.ar/img/sol-servicios-logo-b.png"></b-img>
        <!--b-img class="mb-3" style="width: 120px" center src="http://www.sutterservicios.com.ar/wp-content/uploads/elementor/thumbs/sutter-logo-header-white-350x157-nwhpmj3yfywdz8jzh53yrsqtvoj60lgrtl8jzyx5sy.png"></b-img-->
        <b-form-group id="input-group-1" label="Nombre de Usuario:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="credentials.username"
            type="text"
            required
            placeholder="Ingrese su nombre de usuario"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="credentials.password"
            required
            placeholder="Ingrese su contraseña"
            type="password"
          ></b-form-input>
        </b-form-group>
        
        <div class="shadow border-top my-3"></div>
        <b-row align-h="center">
          <b-button pill size="sm" type="submit" variant="outline-success" class="shadow mr-2"> Ingresar</b-button>
          <!--b-button pill size="sm" type="reset" variant="outline-secondary" class="shadow ">Cancelar</b-button-->
        </b-row>
      </b-form>
    <!--/b-card-->
  </b-container>

</template>

<script>
import swal from 'sweetalert'


export default {
  name: 'auth',

  data () {
    return {
      credentials: {},
      valid: true,
      loading: false

    }
  },

  computed: {
    isAdminUser: function () { return this.$store.getters.isAdminUser }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.login()
    },

    onReset (evt) {
      evt.preventDefault()
    },
    logout () {
      this.$store.dispatch('AUTH_LOGOUT')
    },

    login () {
      this.$store.dispatch('AUTH_REQUEST', this.credentials)
        .then(() => { 
              this.$store.dispatch('GET_PRODUCTOS')
              this.$store.dispatch('GET_FACTURASCOMPRA')
              this.$store.dispatch('GET_ENTREGAS')
              this.$store.dispatch('GET_PROVEEDORES')
              this.$store.dispatch('GET_CLIENTES')
              this.$store.dispatch('GET_PUNTOS_CLIENTES')
              this.$store.dispatch('GET_TIPO_PRODUCTOS')
              this.$store.dispatch('GET_FAMILIAS_PRODUCTO')
              this.$store.dispatch('GET_ESTADOS_PRODUCTO')
              this.$store.dispatch('GET_DATOSEMPRESA')
              
              this.$router.push('/')
              
              
            })
        .catch(error => {
          this.logout()
          // localStorage.removeItem('user-token')
          swal({
            type: 'warning',
            title: 'Error',
            text: 'El nombre de usuario o contraseña no son correctos.',
            showConfirmButton: false,
            showCloseButton: false,
            timer: 3000
          })
        })
    }
 }

}
</script>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  body {
    background-color: #f5f5f5;
    display:flex;
   
  }
</style>
