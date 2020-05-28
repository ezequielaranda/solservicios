<template>
  <b-container class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Listado de Entregas de Producto</b-breadcrumb-item>
        </b-breadcrumb>
    <b-row align-h="between">
        <b-col>
          <b-button pill size='sm' variant="outline-success" to="/newEntregaClienteView" class="shadow mb-2">
          <b-icon icon="plus"></b-icon>Nueva Entrega de Producto</b-button>
        </b-col>
        <b-col align="right">
        </b-col>
      </b-row>
  <div class="shadow border-top my-3"></div>
     <b-row>
      <!--b-col cols="1">
        <label>Filtro:</label>
      </b-col-->
      <b-col cols="5">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input v-model="filter" align="left" type="search" id="filterInput" placeholder="Filtro de búsqueda..."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Borrar Filtro</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="7">
       <b-pagination pills
                     v-model="currentPage"
                     :total-rows="totalRows"
                     :per-page="perPage"
                     align="right"
                     aria-controls="tablaEntregaCliente"
                     size="sm">
        </b-pagination>
      </b-col>
     </b-row>

    <b-table
      id="tablaEntregaCliente"
      show-empty
      small
      head-row-variant="secondary"
      stacked="sm"
      :items="listaEntregasCliente"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      empty-text="No se han encontrado Entregas a Cliente"
      class="shadow"
    >
      <template v-slot:cell(actions)="row">
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          <b-icon icon="eye"></b-icon> Ver detalles
          </b-button>
          <b-button pill size="sm" :to="{ name:'newDevolucionEntregaClienteView', params: {entregaId: row.item.id} }" class="mr-2">
          <b-icon icon="plus"></b-icon> Agregar devolución
          </b-button>
          <b> | </b>
           <b-button  class="ml-2" pill size="sm" variant="outline-danger" @click='deleteEntregaCliente(row.item.id)'>
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
        </b-row>
      </template>
    </b-table>
    <b-modal :id="infoModal.id"
             title="Detalle de la Entrega"
             size="xl"
             scrollable
             centered
             header-bg-variant="info"
             header-text-variant="light"
             footer-bg-variant="light"
            footer-text-variant="light"
             @hide="resetInfoModal">

      <b-row class="bg-light">
        <b-col><p class="text-dark mt-3 thick" >Cliente: <b-badge variant="info">{{ infoModal.punto_limpieza_cliente.nombre_completo }}</b-badge></p></b-col>
        <b-col><p class="text-dark mt-3 thick" >Domicilio: <b-badge variant="info">{{ infoModal.punto_limpieza_cliente.domicilio }}</b-badge></p></b-col>
        <b-col><p class="text-dark mt-3 thick" >Fecha de Entrega: <b-badge variant="info">{{ infoModal.content.fecha_entrega }}</b-badge></p></b-col>
      </b-row>
      <div class="shadow border-top my-3"></div>
      <b-table bordered small striped :fields="fieldsModal" :items="infoModal.content.itemsEntrega"></b-table>

      <b-row cols='1'>
      </b-row>
      <template v-slot:modal-footer>
        <b-container>
          <b-row align-h="between">
            <b-col cols="2">
              <b-button pill variant="info" size="sm" @click="printReporte" class="shadow"><b-icon icon="bar-chart-fill"></b-icon>Imprimir planilla</b-button>
            </b-col>
            <b-col cols="1">
              <b-button pill variant="secondary" size="sm" @click="resetInfoModal" class="shadow">Cerrar</b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
  </b-container>

</template>

<script>


import JsPDF from 'jspdf'
import 'jspdf-autotable'
import swal from 'sweetalert'

export default {
  name: 'listaEntregaClienteView',
  data () {
    return {
      listaEntregasCliente: [],
      loading: false,
      fields: [
        { key: 'nombre_punto_limpieza_cliente', label: 'Punto de Limpieza de Cliente', sortable: true, class: 'text-left' },
        { key: 'fecha_entrega', label: 'Fecha de Entrega', sortable: true, class: 'text-center' },
        { key: 'actions', label: '' }
      ],
      fieldsModal: [
        { key: 'nombre_producto', label: 'Nombre de Producto' },
        { key: 'cantidad', label: 'Cantidad', sortable: true, class: 'text-center' },
        { key: 'esEntrega', label: 'Entrega / Devolución', formatter: (value, key, item) => { return value ? 'ENT' : 'DEV' }, class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
        // cliente: { },
        punto_limpieza_cliente: {}
      }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
  },

  mounted () {
    this.listaEntregasCliente = this.$store.getters.ENTREGAS
    this.totalRows = this.listaEntregasCliente.length
  },

  created () {
        this.$store.dispatch('GET_ENTREGAS')
  },

  methods: {

    info (item, index, button) {
      // getPuntoLimpiezaCliente(item.punto_limpieza_cliente).then((response) => { this.infoModal.punto_limpieza_cliente = response.data })
      
      this.infoModal.punto_limpieza_cliente = this.$store.getters.PUNTO_CLIENTE_BY_ID(item.punto_limpieza_cliente)
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.$root.$emit('bv::hide::modal', this.infoModal.id)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    deleteEntregaCliente (entregaId) {
      swal('Está seguro de eliminar la Entrega a Cliente seleccionada?', {
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
              // deleteEntregaCliente(entregaId).then((response) => { this.fetchData() })
              // this.$store.dispatch('DELETE_TIPO_PRODUCTO', facturaId)
              break
          }
        })
    },

    printReporte () {
      var doc = new JsPDF('p', 'pt')
      doc.setFontSize(12)
      doc.text('SOL SERVICIOS S.A.', 40, 20)
      doc.line(40, 25, 560, 25)
      doc.setFontSize(10)
      doc.text('Planilla de Entrega de Productos a Cliente', 40, 40)
      doc.text('Cliente:', 40, 60)
      doc.text('Fecha de Entrega:', 380, 60)
      doc.setFontSize(12)
      doc.setFontStyle('bold')
      doc.text(this.infoModal.punto_limpieza_cliente.nombre_completo, 80, 60)
      doc.text(this.infoModal.content.fecha_entrega, 480, 60)

      var columns = [
        { title: 'Producto', dataKey: 'nombre_producto' },
        { title: 'Cantidad', dataKey: 'cantidad' },
        { title: 'ENT / DEV', dataKey: 'esEntrega' }
      ]
      doc.autoTable(columns, this.infoModal.content.itemsEntrega, {
        margin: { top: 70 },
        theme: 'grid',
        allSectionHooks: true,
        didParseCell: function (data) {
          if (data.column.dataKey === 'esEntrega' && data.row.section === 'body') {
            if (data.cell.raw === true) {
              data.cell.text = 'ENTREGA'
            } else {
              data.cell.text = 'DEVOLUCIÓN'
            }
          }
        }
      })
      doc.save('reporte.pdf')
    }
  }

}
</script>

<style scoped>
  .thick {
    font-size: 20px;
    color: white;
  }
</style>
