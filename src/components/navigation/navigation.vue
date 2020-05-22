<template>
  <b-container class="navigation" fluid>
      <b-col >
        <b-navbar class="shadow" toggleable="lg" type="dark" variant="info">
          <b-navbar-brand to="/">SOL SERVICIOS S.A.</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="isAuthenticated">
                  <b-dropdown pill size="sm" text="Productos" class="shadow m-sm-3" variant="outline-light" >
                    <b-dropdown-item to="/productos">Lista de Productos</b-dropdown-item>
                    <b-dropdown-item to="/stockProductos">Stock de Productos</b-dropdown-item>
                    <b-dropdown-item to="/tipoProductos">Lista de Tipos de Productos</b-dropdown-item>
                    <b-dropdown-item to="/familiaProductos">Lista de Familias de Productos</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item to="/newEntregaProductoView">Alta de Entrega de productos</b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown text="Proveedores" class="shadow m-sm-3" variant="outline-light">
                      <b-dropdown-item to="/listaProveedores">Lista de Proveedores</b-dropdown-item>
                      <b-dropdown-item to="/listaFacturasCompra">Facturas de compra</b-dropdown-item>

                  </b-dropdown>
                  <b-dropdown text="Clientes" class="m-sm-3" variant="outline-light">
                      <b-dropdown-item to="/listaClientes">Lista de clientes</b-dropdown-item>
                  </b-dropdown>
                    <b-dropdown disabled text="Usuarios" class="m-sm-3" variant="outline-light">
                      <b-dropdown-item to="">Lista de usuarios</b-dropdown-item>
                  </b-dropdown>
                  </b-navbar-nav>
                  <b-navbar-nav class="ml-auto">
                  <b-nav-form class="" v-if="isAuthenticated" >
                    <b-card bg-variant="light" no-body class="shadow" variant="success">
                     <b-card-body>
                      <b-card-text>Usuario: <b-badge variant="info">{{ this.getUserName }}</b-badge>  | <b-link @click="logout()">Salir</b-link></b-card-text>
                    </b-card-body>

                     <!--b-input-group size="sm" prepend="Usuario: " >
                       <b-form-input size="sm" disabled v-model="this.getUserName"></b-form-input>
                      <b-button pill size="sm" variant='dark' class=""  @click="logout()">Salir</b-button>
                    </b-input-group-->
                    </b-card>


                  </b-nav-form>
                </b-navbar-nav>
               </b-collapse>
        </b-navbar>
        </b-col>
    </b-container>
</template>

<script>
export default {
  name: 'navigation',

  data () {
    return {

    }
  },

  mounted () {


  },

  methods: {
    logout () {
      this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/auth'))
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated
      // return true

    },
    getUserName: function () {
      return this.$store.getters.getUserName
    }
  }
}
</script>
