<template>
   <b-container fluid class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item active>
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
          </b-breadcrumb>
      <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newEditProductoView" size="sm" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Producto
          </b-button>
        </b-col>
        <b-col align="right">
          <b-button pill variant="outline-secondary" to="/preciosProductos" size="sm" class="shadow mb-2 mr-2">
          <b-icon icon="table"></b-icon> Precios de Productos</b-button>
          <b-button pill variant="outline-secondary" to="/stockProductos" size="sm" class="shadow mb-2 mr-2">
          <b-icon icon="table"></b-icon> Stock de Productos</b-button>
        </b-col>
      </b-row>
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
          <b-button pill size='sm' variant="outline-success" @click="printReporte" class="shadow mb-2">
          <b-icon icon="bar-chart-fill"></b-icon> Imprimir seleccionados</b-button>
        </b-col>
        <b-col cols="7">
          <b-pagination v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="tablaProductos"
                        size="sm"
                        pills
                        align="right"
                        >
          </b-pagination>
        </b-col>
      </b-row>

      <b-table id="tablaProductos"
               ref="selectableTable"
               selectable
               @row-selected="onRowSelected"
               show-empty=true
               empty-text="No se han encontrado elementos."
               small
               hover
               head-row-variant="secondary"
               :items="listaProductos"
               :fields="fields"
               :per-page="perPage"
               :current-page="currentPage"
               :busy="isBusy"
               class="shadow mt-2"
               :filter="filter"
               @filtered="onFiltered"
               >
        <template v-slot:cell(action)="row" >
         <b-row class="justify-content-md-center">
          <b-button pill size="sm" @click="info(row.item, row.index, $event.target)" variant="outline-info" class="mr-2">
            <b-icon icon="clipboard-data"></b-icon> +/- Stock</b-button>
          <b-button pill size="sm" variant="outline-info" class="mr-2" :to="{ name:'newEditProductoView', params: {productoId: row.item.id} }">
                    <b-icon icon="pencil"></b-icon></b-button>
          <b-button pill size="sm" variant="outline-danger" >
            <b-icon icon="trash"></b-icon>
            </b-button>

         </b-row>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>
        <template v-slot:cell(selected)="{ rowSelected }">
          <b-form-checkbox disabled v-model="rowSelected" name="check-button" switch/>
        </template>
        <template v-slot:head(selected)="data">
          <b-form-checkbox v-model="allRowSelected" @change="toggleAllRowSelected()" switch/>
        </template>
      </b-table>

      <b-modal
          size="lg"
          :id="infoModal.id"
          ref="modal"
          title="Movimiento manual de Stock"
          header-bg-variant="info"
          header-text-variant="light"
          footer-bg-variant="light"
          footer-text-variant="light"
          centered
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
            <b-input-group-text class="bg-info"><strong class="text-white">Stock actual:</strong></b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="infoModal.stockProducto"></b-form-input>
        </b-input-group>
        <div class="shadow border-top my-3"></div>
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label-cols-lg="2" label="Movimiento:">
              <b-form-radio-group
                id="btn-radios-2"

                v-model="tipoMovimiento"
                :options="optionsMovimiento"
                buttons
                button-variant="outline-info"
                size="sm"
                name="radio-btn-outline"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
              label-cols-lg="2"
              :state="stateCantidadManual"
              label="Cantidad:"
              label-for="name-input"
              invalid-feedback="Ingrese la cantidad"
            >
              <b-form-input
                id="name-input"
                v-model="cantidadManual"
                :state="stateCantidadManual"
              ></b-form-input>
            </b-form-group>
          </form>
        <template v-slot:modal-footer>
          <div align="center" class="w-100">
            <b-button class=" mr-2" pill variant="outline-success" size="sm" @click="handleOk"> <b-icon icon="check-box"></b-icon>Aceptar</b-button>
            <b-button class=" mr-2" pill variant="outline-secondary" size="sm" @click="resetInfoModal">Cerrar</b-button>
          </div>
        </template>
      </b-modal>


    </b-container>
</template>

<script>
import { getStockHistoricoByIdProductoEstado } from '@/services/productos.js'
import JsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  name: 'ListaProductosView',
  data () {
    return {
      
      isBusy: false,
      tipoMovimiento: 'ST_IN',
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'selected', label: ''},
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true },
        // { key: 'estado', label: 'Estado', sortable: false, class: 'text-center' },
        { key: 'descripcion_estado', label: 'Estado', sortable: false, class: 'text-center' },
        { key: 'nombre_proveedor', label: 'Proveedor', sortable: false, class: 'text-center' },
        { key: 'descripcion_tipo_producto', label: 'Tipo', sortable: false, class: 'text-center' },
        { key: 'descripcion_familia_producto', label: 'Familia', sortable: false, class: 'text-center' },
        { key: 'action', label: 'Acciones', sortable: false, class: 'text-center' }
      ],
      selectedItems: [],
      allRowSelected: false,
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        content: '',
        stockProducto: 0
      },
      optionsMovimiento: [
        { text: 'ENTRADA de stock', value: 'ST_IN' },
        { text: 'SALIDA de stock', value: 'ST_OUT' }
      ],
      cantidadManual: null,
    }
  },
  
  computed: {
    rows () { return this.listaProductos.length }, 
    listaProductos () { return this.$store.getters.PRODUCTOS },
    stateCantidadManual () { return this.cantidadManual >= 0 }
  },

  created () { 
    // this.$store.dispatch('GET_PRODUCTOS')
  },

  methods: {
    onFiltered (filteredItems) {
      //this.totalRows = filteredItems.length
      this.rows = filteredItems.length
      this.currentPage = 1
    },
    onRowSelected(items) {
        this.selectedItems = items
      },
    toggleAllRowSelected() {
      this.allRowSelected = !this.allRowSelected
      if(this.allRowSelected) {
        this.$refs.selectableTable.selectAllRows()
      } else {
        this.$refs.selectableTable.clearSelected()
      }
    },
    
    resetInfoModal () {
      this.cantidadManual = null
      this.infoModal.content = ''
      this.infoModal.stockProducto = 0
      this.$root.$emit('bv::hide::modal', this.infoModal.id)
    },

    info (item, index, button) {
      this.infoModal.content = item
      getStockHistoricoByIdProductoEstado(item.id, 0).then((response) => {
        response.data.forEach(element => {
          this.infoModal.stockProducto += element.cantidad
        });
      })
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    
    checkFormValidity () {
      return this.stateCantidadManual
    },

    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      if (!this.checkFormValidity()) { return }
        let dataStock = {}
        dataStock.fecha_alta = new Date().toISOString().substring(0, 10)
        dataStock.cantidad = this.tipoMovimiento === 'ST_IN' ? this.cantidadManual : -this.cantidadManual
        dataStock.estacion_kanban = this.tipoMovimiento
        dataStock.comments = 'Correción Manual de Stock'
        dataStock.estado = 0
        dataStock.producto = this.infoModal.content.id
        dataStock.itemFactura = null
        dataStock.itemEntrega = null
        this.$store.dispatch('ADD_STOCK_ITEM_FACTURA_COMPRA', dataStock)
        // addStockItemFacturaCompra(dataStock)
        this.$nextTick(() => {
          this.$root.$emit('bv::hide::modal', this.infoModal.id)
        })
    },

    printReporte () {
      let listToPrint = this.allRowSelected ? this.listaProductos : this.selectedItems
      if (listToPrint.length === 0) {return}
      var doc = new JsPDF('p', 'pt')
      doc.setFontSize(10)
      doc.text(this.$store.getters.NOMBREEMPRESA, 40, 20)
      doc.line(40, 25, 560, 25)
      doc.setFontSize(10)
      doc.text('Lista de Productos', 40, 40)
      var columns = [
        { title: 'Nombre completo', dataKey: 'nombre_completo' },
        { title: 'Proveedor', dataKey: 'nombre_proveedor' },
        { title: 'Tipo de Producto', dataKey: 'descripcion_tipo_producto' },
        { title: 'Estado', dataKey: 'estado' }
      ]
      doc.autoTable(columns, listToPrint, {
        margin: { top: 70 },
        theme: 'grid',
        allSectionHooks: true
      })
      doc.save('lista_de_productos.pdf')
    }

  }
}
</script>
