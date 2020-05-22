<template>
   <b-container class="mt-3">
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
          <b-icon icon="table"></b-icon>Precios de Productos</b-button>
          <b-button pill variant="outline-secondary" to="/stockProductos" size="sm" class="shadow mb-2 mr-2">
          <b-icon icon="table"></b-icon>Stock de Productos</b-button>
          <b-button pill variant="outline-secondary" to="/listaEntregaClienteView" size="sm" class="shadow mb-2">
           <b-icon icon="table"></b-icon>Entregas a Clientes</b-button>
        </b-col>
      </b-row>

      <div class="shadow border-top my-3"></div>
      <b-row>
        <b-col>
          <b-button pill size='sm' variant="outline-success" @click="printReporte" class="shadow mb-2">
          <b-icon icon="bar-chart-fill"></b-icon>Imprimir Lista de Productos</b-button>
        </b-col>
        <b-col>
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
               >
        <template v-slot:cell(action)="row" >
         <b-row class="justify-content-md-center">
            <b-button pill size="sm" variant="info" class="mr-2" :to="{ name:'newEditProductoView', params: {productoId: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>Editar</b-button>
          <b-button pill size="sm" variant="outline-danger">
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
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
import JsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  name: 'ListaProductosView',
  data () {
    return {
      isBusy: false,
      // listaProductos: [],
      // rows: 0,
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true },
        { key: 'estado', label: 'Estado', sortable: false, class: 'text-center' },
        { key: 'nombre_proveedor', label: 'Proveedor', sortable: false, class: 'text-center' },
        { key: 'descripcion_tipo_producto', label: 'Tipo', sortable: false, class: 'text-center' },
        { key: 'descripcion_familia_producto', label: 'Familia', sortable: false, class: 'text-center' },
        { key: 'action', label: 'Acciones', sortable: false, class: 'text-center' }
      ]
    }
  },

  created () { 
    this.isBusy = true
    // this.$store.dispatch('GET_PRODUCTOS')
    this.isBusy = false
  },
  mounted () { },
  
  computed: {
    rows () { return this.listaProductos.length }, 
    listaProductos () { return this.$store.getters.PRODUCTOS }
  },

  methods: {
    printReporte () {
      var doc = new JsPDF('p', 'pt')
      doc.setFontSize(10)
      doc.text('SOL SERVICIOS S.A.', 40, 20)
      doc.line(40, 25, 560, 25)
      doc.setFontSize(10)
      doc.text('Lista de Productos', 40, 40)
      // doc.text('Cliente:', 40, 60)
      // doc.text('Fecha de Entrega:', 380, 60)
      // doc.setFontSize(12)
      // doc.setFontStyle('bold')
      // doc.text(this.infoModal.punto_limpieza_cliente.nombre_completo, 80, 60)
      // doc.text(this.infoModal.content.fecha_entrega, 480, 60)

      var columns = [
        { title: 'Nombre completo', dataKey: 'nombre_completo' },
        { title: 'Proveedor', dataKey: 'nombre_proveedor' },
        { title: 'Tipo de Producto', dataKey: 'descripcion_tipo_producto' },
        { title: 'Estado', dataKey: 'estado' }

      ]
      doc.autoTable(columns, this.listaProductos, {
        margin: { top: 70 },
        theme: 'grid',
        allSectionHooks: true
        // didParseCell: function (data) {
        //   if (data.column.dataKey === 'esEntrega' && data.row.section === 'body') {
        //     if (data.cell.raw === true) {
        //       data.cell.text = 'ENTREGA'
        //     } else {
        //       data.cell.text = 'DEVOLUCIÓN'
        //     }
        //   }
        // }
      })
      doc.save('lista_de_productos.pdf')
    }

  }
}
</script>
