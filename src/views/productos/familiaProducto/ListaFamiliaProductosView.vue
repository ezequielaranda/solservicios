<template>
  <b-container class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active href="#home">Lista de Familias de Producto</b-breadcrumb-item>
          </b-breadcrumb>
      <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newEditFamiliaProductoView" size="sm" class="shadow mb-2 mr-2">
            <b-icon icon="plus"></b-icon>Nueva Familia de Producto
          </b-button>
        </b-col>
        <b-col align="right">
        </b-col>
      </b-row>

  <div class="shadow border-top my-3"></div>
    <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="listaFamiliaProductosTable"
                class="mb-2 mt-2"
                size="sm"
                pills
                align="right"
              ></b-pagination>
    <b-table id="listaFamiliaProductosTable"
             show-empty=true
             empty-text="No se han encontrado elementos."
             :current-page="currentPage"
             :per-page="perPage"
             striped
             small
             hover
             head-variant="dark"
             :items="familiaProductos"
             :fields="fields"
             class="shadow mt-2">
        <template v-slot:cell(action)="row" >
          <b-row class="justify-content-md-center">
            <b-button pill
                      size="sm"
                      variant="info"
                      class="mr-2"
                      :to="{ name:'newEditFamiliaProductoView', params: {idFamiliaProducto: row.item.id} }">
                      <b-icon icon="pencil"></b-icon>Editar</b-button>
            <b-button pill
                      size="sm"
                      variant="outline-danger"
                      @click='deleteFamiliaProducto(row.item.id)'>
                      <b-icon icon="trash"></b-icon>Eliminar</b-button>
          </b-row>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>

      </b-table>
  </b-container>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'listaFamiliaProductosView',
  data () {
    return {
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'descripcion', label: 'Descripción' },
        { key: 'codigo', label: 'Código' },
        { key: 'action', label: '' }
      ]
    }
  },
  created () { },
  
  mounted () { 
   },
  
  computed: {
    rows () { return this.familiaProductos.length }, 
    familiaProductos () { return this.$store.getters.FAMILIAS_PRODUCTO }
  },

  methods: {
    deleteFamiliaProducto (familiaProductoId) {
      swal('Está seguro de eliminar el Tipo de Producto seleccionado?', {
        buttons: {
          cancel: 'Cancelar',
          catch: {
            text: 'Aceptar',
            value: 'catch'
          }
        },
        icon: 'warning'
      })
        .then((value) => {
          switch (value) {
            case 'catch':
              this.$store.dispatch('DELETE_FAMILIA_PRODUCTO', familiaProductoId)
              break
          }
        })
    }
  }
}
</script>
