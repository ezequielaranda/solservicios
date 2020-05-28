<template>

   <b-container class="mt-3">
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
        <b-col>
          <b-button pill size='sm' variant="outline-success" @click="printReporte" class="shadow mb-2">
          <b-icon icon="bar-chart-fill"></b-icon> Imprimir Lista de Clientes</b-button>
        </b-col>
        <b-col>
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
               class="shadow mt-2">
        <template v-slot:cell(action)="row" >
          <b-button pill
                    size="sm"
                    variant="info"
                    class="mr-2"
                    :to="{ name:'NewEditClienteView', params: {idCliente: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>Editar</b-button>
          <b-button  class="ml-2" pill size="sm" variant="outline-danger" @click='deleteCliente(row.item.id)'>
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
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
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true, class: 'text-center' },
        { key: 'domicilio', label: 'Domicilio', class: 'text-center' },
        { key: 'action', label: '', class: 'text-center' }
      ]
    }
  },

  computed: {
    rows () { return this.clientes.length }, 
    clientes () { return this.$store.getters.CLIENTES }
  },


  methods: {
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
              this.$store.dispatch('DELETE_CLIENTE', clienteId).then( response => {
                swal('Cliente eliminado exitosamente.', '', 'success')
              }, error => {
                swal('El Cliente seleccionado no puede ser eliminado.', '', 'error')
              })
              break
          }
        })
    },

    printReporte () {
      var doc = new JsPDF('p', 'pt')
      doc.setFontSize(10)
      doc.text('SOL SERVICIOS S.A.', 40, 20)
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
      doc.autoTable(columns, this.clientes, {
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
      doc.save('lista_de_clientes.pdf')
    }
  }
}
</script>
