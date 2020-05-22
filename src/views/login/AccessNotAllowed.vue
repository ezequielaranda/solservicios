<template>
  <b-container class="mt-5" style="max-width: 40rem;">
    <b-card title="Acceso no permitido"
            sub-title="El usuario actual no tiene permisos suficientes para la funcionalidad solicitada."
            class="text-center">
              <div class="shadow border-top my-3"></div>
         <b-row align-h="center">
          <b-button pill size="sm" type="submit" variant="outline-info" @click="logout" class="shadow mr-2">Ingresar con otro usuario</b-button>
        </b-row>
    </b-card>
  </b-container>

</template>

<script>

export default {
  name: 'accessNotAllowed',
  methods: {
    logout () {
      this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/auth'))
    }
  },
}
</script>
