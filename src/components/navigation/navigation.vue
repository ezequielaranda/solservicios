<template>
  <b-container fluid class="navigation">
        <b-navbar class="shadow" toggleable="lg" type="dark" variant="info">
          <b-navbar-brand to="/">Gestión de Stock</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="isAuthenticated">
                  <b-dropdown pill size="sm" text="Productos" class="shadow m-sm-1" variant="outline-light" >
                    <b-dropdown-item to="/productos">Lista de Productos</b-dropdown-item>
                    <b-dropdown-item to="/stockProductos">Stock de Productos</b-dropdown-item>
                    <b-dropdown-item to="/tipoProductos">Lista de Tipos de Productos</b-dropdown-item>
                    <b-dropdown-item to="/familiaProductos">Lista de Familias de Productos</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item to="/newEntregaClienteView">Alta de Entrega de productos</b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown text="Proveedores" class="shadow m-sm-1" variant="outline-light">
                      <b-dropdown-item to="/listaProveedores">Lista de Proveedores</b-dropdown-item>
                      <b-dropdown-item to="/listaFacturasCompra">Facturas de compra</b-dropdown-item>
                      <b-dropdown-item disabled to="">Órdenes de compra</b-dropdown-item>

                  </b-dropdown>
                  <b-dropdown text="Clientes" class="m-sm-1" variant="outline-light">
                      <b-dropdown-item to="/listaClientes">Lista de clientes</b-dropdown-item>
                  </b-dropdown>
                    <b-dropdown disabled text="Usuarios" class="m-sm-1" variant="outline-light">
                      <b-dropdown-item to="">Lista de usuarios</b-dropdown-item>
                  </b-dropdown>
                  </b-navbar-nav>
                  <b-navbar-nav class="ml-auto">

                  <b-nav-form v-if="isAuthenticated" >
                    <b-avatar icon="person-lines-fill" size="md" class="shadow mr-2" variant="light" v-b-toggle.sidebar-1></b-avatar>
                      <b-sidebar id="sidebar-1" 
                                 title="" sidebar-class="border-right border-danger"
                                 backdrop-variant="info"
                                 backdrop 
                                 right
                                 shadow
                                 bg-variant="light">
                        <b-card border-variant="dark"
                                header="Usuario"
                                header-bg-variant="transparent"
                                bg-variant="light"
                                class="mr-2 ml-2 text-center">

                          <b-card-body>
                            <b-table-simple table-variant="info" bordered stacked small>
                              <b-tbody>
                                <b-tr >
                                  <b-th sticky-column>Nombre: </b-th>
                                  <b-td>{{this.getProfile.first_name}}</b-td>
                                </b-tr>
                                <b-tr>
                                  <b-th sticky-column>Apellido: </b-th>
                                  <b-td>{{this.getProfile.last_name}}</b-td>
                                </b-tr>
                                <b-tr>
                                  <b-th sticky-column>Nombre de usuario: </b-th>
                                  <b-td>{{this.getProfile.username}}</b-td>
                                </b-tr>
                                <b-tr class="table-success">
                                  <b-th sticky-column>Es administrador: </b-th>
                                  <b-td>{{(this.getProfile.is_superuser) ? "SI" : "NO"}}</b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </b-card-body>
                          <b-button variant="outline-danger" size=md @click="logout()">
                            <b-icon icon="power" aria-hidden="true"></b-icon> Salir</b-button>
                        </b-card>
                      </b-sidebar>
                      <!--b-card-text>Usuario: <b-badge variant="info">{{ this.getUserName }}</b-badge-->  
                    

                     <!--b-input-group size="sm" prepend="Usuario: " >
                       <b-form-input size="sm" disabled v-model="this.getUserName"></b-form-input>
                      <b-button pill size="sm" variant='dark' class=""  @click="logout()">Salir</b-button>
                    </b-input-group-->
                    


                  </b-nav-form>
                </b-navbar-nav>
               </b-collapse>
        </b-navbar>
        
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
    },

    getProfile: function () {
      return this.$store.getters.getProfile
    }

    
  }
}
</script>
