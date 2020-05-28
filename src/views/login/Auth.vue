<template>
  <b-container class="mt-5" style="max-width: 40rem;">
    <b-card title="Gestión de STOCK - SOL Servicios S.A." align-h="center">
      <div class="shadow border-top my-3"></div>
      <b-form @submit="onSubmit" @reset="onReset">
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
          <b-button pill size="sm" type="submit" variant="outline-success" class="shadow mr-2">Aceptar</b-button>
          <b-button pill size="sm" type="reset" variant="outline-secondary" class="shadow ">Cancelar</b-button>
        </b-row>
    </b-form>
    </b-card>
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
              this.$store.dispatch('GET_PROVEEDORES')
              this.$store.dispatch('GET_CLIENTES')
              this.$store.dispatch('GET_PUNTOS_CLIENTES')
              this.$store.dispatch('GET_TIPO_PRODUCTOS')
              this.$store.dispatch('GET_FAMILIAS_PRODUCTO')
              this.$store.dispatch('GET_ESTADOS_PRODUCTO')
              this.$store.dispatch('GET_PRODUCTOS')
              // this.$store.dispatch('GET_FACTURASCOMPRA')
              this.$store.dispatch('GET_ENTREGAS')
              this.$router.push('/') 
            })
        .catch(error => {
          this.logout()
          localStorage.removeItem('user-token')
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
