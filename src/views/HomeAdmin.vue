<template>
    <b-container class="homeAdmin mt-5">
      <b-card-group deck>
        <b-card header-bg-variant="info"
                bg-variant="light" 
                text-variant="light" 
                header="Número de productos actuales" 
                class="shadow">
          <b-badge>
            300
          </b-badge>
        </b-card>

        <b-card header-bg-variant="info" 
                bg-variant="Light" 
                header-text-variant="white" 
                text-variant="dark" 
                header="Cantidad de Entregas realizadas en los últimos 10 días" 
                class="shadow">
          <b-badge> {{this.getUltimasEntregas(10)}}
            
          </b-badge>
        </b-card>

        <b-card header-bg-variant="info" 
                bg-variant="white" 
                header-text-variant="white"  
                text-variant="dark" 
                header="Cantidad de Facturas de compra ingresadas en los últmos 30 días" 
                class="shadow">
          <b-badge>
            300
          </b-badge>
        </b-card>
      </b-card-group>
    </b-container>

</template>

<script>


export default {
  name: 'homeAdmin',

  computed: {

  },
  data () {
    return {

    }
  },

  methods: {
    getUltimasEntregas() {
      return this.$store.getters.ENTREGAS_LAST_XX_DAYS(10).length
    }
  }
}
</script>
