<template>
   <b-container fluid class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Precios Históricos de Productos</b-breadcrumb-item>
          </b-breadcrumb>
      <!--b-button pill variant="outline-success" to="/controlStockProductosView" size="sm" class="mb-2 mr-2">
      <b-icon icon="kanban"></b-icon>Control de Stock</b-button-->
      <div class="shadow border-top my-3"></div>
      <b-row>
       <b-col cols="3">
          <b-form-group>
            <b-input-group size="sm">
              <b-form-input v-model="filter" align="left" type="search" id="filterInput" placeholder="Filtro de búsqueda..."></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Borrar Filtro</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="2">
          <b-button disabled pill size='sm' variant="outline-success" @click="printReporte" class="shadow mb-2">
          <b-icon icon="bar-chart-fill"></b-icon>Imprimir Listado de Precios</b-button>
        </b-col>
        <b-col cols="7">
          <b-pagination v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="tablaProductos"
                        size="sm"
                        pills
                        align="right">
          </b-pagination>
        </b-col>  
       </b-row> 
      <b-table id="tablaProductos"
                                   small
                                   empty-text="No existen precios de productos cargados en la Base de Datos."
                                   show-empty
                                   :busy="isBusy"
                                   :per-page="perPage"
                                   :current-page="currentPage"
                                   head-row-variant="secondary"
                                   :items="listaProductos"
                                   :fields="fields"
                                   :filter="filter"
                                   @filtered="onFiltered"
                                   class="shadow">
        <template v-slot:cell(action)="row" >
          <b-row class="justify-content-md-center">
            <b-button pill variant="outline-info" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              <b-icon icon="fullscreen"></b-icon> Precios históricos
          </b-button>
          </b-row>
        </template>
        <template v-slot:cell(precio)="row">
             <strong v-if="row.item.preciosProducto[0]!=null"> {{ row.item.preciosProducto[0].importe | money }}</strong>
             <strong v-else>N/A</strong>
        </template>
        <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
      </b-table>

      <b-modal :id="infoModal.id"
          title="Precios históricos de Producto"
          size="xl"
          centered
          header-bg-variant="info"
          header-text-variant="light"
          footer-bg-variant="light"
          footer-text-variant="light"

          @hide="resetInfoModal"
        >
        <b-input-group size="sm" class="mb-1">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info"><strong class="text-white">Producto:</strong></b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="infoModal.content.nombre_completo"></b-form-input>
        </b-input-group>
        <b-input-group size="sm" class="mb-1">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info"><strong class="text-white">Proveedor:</strong></b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="infoModal.content.nombre_proveedor"></b-form-input>
        </b-input-group>
      <div class="shadow border-top my-3"></div>
      <b-table small
               empty-text="No existen precios de productos cargados en la Base de Datos."
               show-empty
               :busy="isBusy"
               head-row-variant="secondary"
               class="shadow"
               :items="infoModal.preciosHistoricos"
               :fields="fieldsModal">
        <template v-slot:cell(importe)="data">
          <b class="text-success">{{ data.value | money }}</b>
        </template>
      </b-table>
       <template v-slot:modal-footer>
        <div align="right" class="w-100">
          <b-button pill variant="secondary" size="sm" @click="resetInfoModal">Cerrar</b-button>
        </div>
      </template>
    </b-modal>

    </b-container>
</template>

<script>
export default {
  filters: {
    money: (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  },
  name: 'PreciosProductosView',
  data () {
    return {
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      listaProductos: [],
      rows: 0,
      filter: null,
      filterOn: [],
      fields: [
        { key: 'nombre_completo', label: 'Producto', sortable: true },
        { key: 'nombre_proveedor', label: 'Proveedor', class: 'text-center' },
        { key: 'precio', label: 'Último precio activo', class: 'text-center' },
        { key: 'action', label: '' }
      ],
      fieldsModal: [
        { key: 'fecha_inicio',
          label: 'Fecha de Compra', 
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {return this.$moment(item.fecha_inicio).format("LL")}
        },
        { key: 'importe', label: 'Precio de Compra', class: 'text-center', sortable: true }
      ],
      infoModal: {
        id: 'info-modal',
        content: '',
        ultimoPrecio: null,
        preciosHistoricos: []
      }
    }
  },

  computed: {

  },

  methods: {
    
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    fetchData () {
      this.isBusy = true
      this.$store.dispatch('GET_PRECIO_PRODUCTOS').then((value) => {
          this.isBusy = false
          this.listaProductos = value
          this.rows = this.listaProductos.length
     }).catch(error => console.log(error))
    },

    resetInfoModal () {
      this.infoModal.content = ''
      this.infoModal.ultimoPrecio = null
      this.infoModal.preciosHistoricos = []
      this.$root.$emit('bv::hide::modal', this.infoModal.id)
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
    },

    info (item, index, button) {
      this.infoModal.content = item
      if (item.preciosProducto.length > 0) {
        const arrayPrecios = [...item.preciosProducto]
        // this.infoModal.ultimoPrecio = arrayPrecios.splice(0, 1)[0].importe
        this.infoModal.preciosHistoricos = arrayPrecios
      }
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    }

  },

  mounted () {
    this.fetchData()
  }
}
</script>
