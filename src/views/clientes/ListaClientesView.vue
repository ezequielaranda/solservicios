<template>

   <b-container fluid class="mt-3">
          <b-breadcrumb class="shadow">
            <b-breadcrumb-item active href="#home">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
          </b-breadcrumb>
       <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newEditClienteView" size="sm mr-2" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Cliente
          </b-button>
          <b-button pill variant="outline-success" to="/newEditPuntoLimpiezaClienteView" size="sm" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Punto de Limpieza
          </b-button>
        </b-col>

        <b-col align="right">
          <b-button pill variant="outline-secondary" to="/reporteConsumoClientesView" size="sm mr-2" class="shadow mb-2">
           <b-icon icon="table"></b-icon> Reporte de Entregas</b-button>
          <b-button pill variant="outline-secondary" to="/listaEntregaClienteView" size="sm" class="shadow mb-2">
           <b-icon icon="table"></b-icon> Entregas a Clientes</b-button>
        </b-col>
      </b-row>

      <div class="shadow border-top my-3"></div>
      
      <b-row align-h="between">
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
          <b-icon icon="bar-chart-fill"></b-icon> Imprimir Lista de Clientes</b-button>
        </b-col>
        
        <b-col cols="7">
          <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaClientes"
                    size="sm"
                    pills
                    align="right"
                    >
          </b-pagination>
        </b-col>

      </b-row>

      <b-table id="tablaClientes"
               show-empty=true
               empty-text="No se han encontrado elementos."
               small
               hover
               head-row-variant="secondary"
               :items="clientes"
               :fields="fields"
               :per-page="perPage"
               :current-page="currentPage"
               :busy="isBusy"
               class="shadow mt-2"
               :filter="filter"
               @filtered="onFiltered">
        <template v-slot:cell(action)="row" >
          <b-button pill
                    size="sm"
                    variant="outline-info"
                    class="mr-2"
                    :to="{ name:'NewEditClienteView', params: {idCliente: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>
          </b-button>
          <b-button class="ml-2" 
                    pill 
                    size="sm" 
                    variant="outline-danger"
                    @click='deleteCliente(row.item.id)'>
                    <b-icon icon="trash"></b-icon>
          </b-button>
        </template>
      </b-table>
</b-container>
</template>

<script>

import swal from 'sweetalert'
import JsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  name: 'ListaClientesView',
  data () {
    return {
      filter: null,
      filterOn: [],
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true, class: 'text-center' },
        { key: 'domicilio', label: 'Domicilio', class: 'text-center' },
        { key: 'action', label: 'Acciones', class: 'text-center' }
      ]
    }
  },

  computed: {
    rows () { return this.clientes.length }, 
    clientes () { return this.$store.getters.CLIENTES }
  },


  methods: {
    
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    
    deleteCliente (clienteId) {
      swal('Está seguro de eliminar El Cliente seleccionado?', {
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
              this.$store.dispatch('DELETE_CLIENTE', clienteId).then( 
                response => {
                  swal('Cliente eliminado exitosamente.', '', 'success')
                },
                error => {
                  swal('El Cliente seleccionado no puede ser eliminado.', '', 'error')
                }
              )
              break
          }
        })
    },

    printReporte () {
      var doc = new JsPDF('p', 'pt')
      doc.setFontSize(10)
      doc.text(this.$store.getters.NOMBREEMPRESA, 40, 20)
      doc.line(40, 25, 560, 25)
      doc.setFontSize(10)
      doc.text('Lista de Clientes', 40, 40)
      // doc.text('Cliente:', 40, 60)
      // doc.text('Fecha de Entrega:', 380, 60)
      // doc.setFontSize(12)
      // doc.setFontStyle('bold')
      // doc.text(this.infoModal.punto_limpieza_cliente.nombre_completo, 80, 60)
      // doc.text(this.infoModal.content.fecha_entrega, 480, 60)

      var columns = [
        { title: 'Nombre completo', dataKey: 'nombre_completo' },
        { title: 'Domicilio', dataKey: 'domicilio' }
        // { title: 'ENT / DEV', dataKey: 'esEntrega' }
      ]
      doc.autoTable(
        columns,
        this.clientes, 
        { margin: { top: 70 },
          theme: 'grid',
          allSectionHooks: true,
          //didDrawCell: function (data) {
          //  if (data.row.section === 'body') {
          //    doc.autoTable({
          //      startY: data.cell.y + 10,
          //     margin: { left: data.cell.x + 10 },
          //      tableWidth: data.cell.width - 4,
          //      styles: {
          //        maxCellHeight: 4,
          //      },
          //      columns: [
          //        { dataKey: 'id', header: 'Punto de Limpieza' },
          //        { dataKey: 'name', header: 'Domicilio' },
          //      ],
          //      body: [],
          //    })
          //  }
          //},
        },
      )
      doc.save('lista_de_clientes.pdf')
    }
  }
}
</script>
