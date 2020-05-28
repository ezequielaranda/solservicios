<template>
    <b-container class="homeUser mt-5">
      <b-card-group deck>
        <b-card header-bg-variant="info" bg-variant="light" text-variant="light" header="Acceso directo Clientes" class="shadow">
          <b-button pill size='sm' variant="outline-secondary" to="/newEditClienteView" class="shadow mb-2"><b-icon icon="plus"></b-icon>  Nuevo Cliente</b-button>
          <div class="shadow border-top my-3"></div>
          <b-button pill size='sm' variant="outline-secondary" to="/listaClientes" class="shadow mb-2"><b-icon icon="gear"></b-icon>  Gestión de Clientes</b-button>
          <b-button pill size='sm' variant="outline-secondary" to="/listaEntregaClienteView" class="shadow mb-2"><b-icon icon="gear"></b-icon>  Gestión de Entregas a Clientes</b-button>
          <div class="shadow border-top my-3"></div>
          <!--b-button pill size='sm' variant="outline-secondary" to="/reporteConsumoClientesView" class="shadow mb-2"><b-icon icon="table"></b-icon>  Reporte de Entregas a Clientes</b-button-->
        </b-card>
        <b-card header-bg-variant="info" bg-variant="Light" header-text-variant="white" text-variant="dark" header="Acceso directo Proveedores" class="shadow">
          <b-button pill size='sm' variant="outline-secondary" to="/newProveedorView" class="shadow mb-2 mr-2"><b-icon icon="plus"></b-icon>  Nuevo Provedor</b-button>
          <b-button pill size='sm' variant="outline-secondary" to="/newFacturaCompra" class="shadow mb-2"><b-icon icon="plus"></b-icon>  Nueva Factura</b-button>
          <div class="shadow border-top my-3"></div>
          <b-button pill size='sm' variant="outline-secondary" to="/listaProveedores" class="shadow mb-2"><b-icon icon="gear"></b-icon>  Gestión de Proveedores</b-button>
          <b-button pill size='sm' variant="outline-secondary" to="/listaFacturasCompra" class="shadow mb-2"><b-icon icon="gear"></b-icon>  Gestión de Facturas de Compra</b-button>
          <div class="shadow border-top my-3"></div>
          <!--b-button pill size='sm' variant="outline-secondary" to="/preciosProductos" class="shadow mb-2"><b-icon icon="table"></b-icon>  Reporte de Precios históricos</b-button-->
        </b-card>

        <b-card header-bg-variant="info" bg-variant="white" header-text-variant="white"  text-variant="dark" header="Acceso directo Productos" class="shadow">
          <b-button pill size='sm' variant="outline-secondary" to="/newProducto" class="shadow mb-2"><b-icon icon="plus"></b-icon>  Nuevo Producto</b-button>
          <b-button pill size='sm' variant="outline-secondary" to="/newTipoProductoView" class="shadow mb-2"><b-icon icon="plus"></b-icon>  Nuevo Tipo de Producto</b-button>
          <div class="shadow border-top my-3"></div>
          <b-button pill size='sm' variant="outline-secondary" to="/productos" class="shadow mb-2"><b-icon icon="gear"></b-icon>  Gestión de Productos</b-button>
          <div class="shadow border-top my-3"></div>
          <!--b-button pill size='sm' variant="outline-secondary" to="/reporteConsumoClientesView" class="shadow mb-2"><b-icon icon="table"></b-icon>  Reporte de Stock de Productos</b-button-->
        </b-card>
      </b-card-group>
    </b-container>

</template>

<script>


export default {
  name: 'homeUser',

  computed: {

  },
  data () {
    return {

    }
  },

  methods: {
    // getUltimasEntregas() { return this.$store.getters.ENTREGAS_LAST_XX_DAYS(10).length },
    // getUltimasFacturas() { return this.$store.getters.FACTURAS_LAST_XX_DAYS(10).length },
    // getProductosActivos() { return this.$store.getters.PRODUCTOS.length}
  }
}
</script>
