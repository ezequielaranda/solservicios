<template>
    <b-container class="homeAdmin mt-5">
      <b-card-group deck>
        <b-card header-bg-variant="info"
                bg-variant="light" 
                text-variant="light" 
                header="Cantidad de productos activos" 
                class="shadow">
          <b-badge> {{this.getProductosActivos()}} </b-badge>
        </b-card>
        <b-card header-bg-variant="info" 
                bg-variant="Light" 
                header-text-variant="white" 
                text-variant="dark" 
                header="Entregas a clientes en los últimos 10 días" 
                class="shadow">
          <b-badge> {{this.getUltimasEntregas(10)}} </b-badge>
        </b-card>
        <b-card header-bg-variant="info" 
                bg-variant="white" 
                header-text-variant="white"  
                text-variant="dark" 
                header="Facturas en los últimos 30 días" 
                class="shadow">
          <b-badge> {{this.getUltimasFacturas(10)}} </b-badge>
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
    getUltimasEntregas() { return this.$store.getters.ENTREGAS_LAST_XX_DAYS(10).length },
    getUltimasFacturas() { return this.$store.getters.FACTURAS_LAST_XX_DAYS(10).length },
    getProductosActivos() { return this.$store.getters.PRODUCTOS.length}
  }
}
</script>
