<template>
  <b-container class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Reporte de consumo de productos por Cliente</b-breadcrumb-item>
        </b-breadcrumb>
     <b-row align-h="between">
        <b-col>
          <b-button pill size='sm' variant="outline-success" to="/" class="shadow mb-2">
          <b-icon icon="bar-chart-fill"></b-icon>Imprimir Reporte</b-button>
        </b-col>
    </b-row>
    <div class="shadow border-top my-3"></div>
    <b-form-group id="input-group-cliente" label="Cliente:" label-cols-sm="6" label-cols-lg="2">
              <v-select label="nombre_completo" :options="listaClientes" @input="setPuntosLimpiezaCliente">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
    </b-form-group>
    <b-form-group id="input-group-punto" label="Punto de Limpieza:" label-cols-sm="6" label-cols-lg="2">
              <v-select label="nombre_completo"
                        :reduce="nombre_completo => nombre_completo.id"
                        v-model="form.punto_limpieza_cliente"
                        :options="listaPuntosLimpiezaCliente">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
    </b-form-group>
    <b-row align-h='center'>
      <b-col cols='4'>
        <b-form-group id="input-group-fechaDesde" label="Fecha Desde:" label-for="input-4" label-cols-sm="6" label-cols-lg="4">
          <date-pick class="datePick" id="input-4" v-model="form.fechaDesde" :format="format"></date-pick>
    </b-form-group>
      </b-col>
      <b-col cols='4'>
        <b-form-group id="input-group-fechaHasta" label="Fecha Hasta:" label-for="input-5" label-cols-sm="6" label-cols-lg="4">
          <date-pick class="datePick" id="input-5" v-model="form.fechaHasta" :format="format"></date-pick>
    </b-form-group>
      </b-col>
    </b-row>

    <div class="shadow border-top my-3"></div>
    <b-row>
      <b-col>
        <b-button pill size='sm' variant="outline-success" class="shadow" @click="obtenerReporte()">
          <b-icon icon="eye"></b-icon>Mostrar Reporte</b-button>
      </b-col>
      <b-col>
        <b-pagination pills v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                          aria-controls="tablaFacturasCompra"
                          size="sm">
        </b-pagination>
      </b-col>
    </b-row>

    <b-table
      id="tablaReporteConsumoClientes"
      show-empty
      small
      bordered
      head-row-variant="secondary"
      stacked="sm"
      :items="listaReporte"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      empty-text="No se han encontrado elementos."
      class="shadow"
    >
    </b-table>
  </b-container>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import { getReporteConsumoClientes } from '@/services/productos.js'
import { getClientes, getPuntosLimpiezaCliente } from '@/services/clientes.js'

export default {
  components: { DatePick },
  name: 'ReporteConsumoClientesView',

  data () {
    return {
      format: 'YYYY-MM-DD',
      listaReporte: [],
      loading: true,
      fields: [
        { key: 'nombre_completo', label: 'Producto', sortable: true, class: 'text-left' },
        { key: 'total_entregado', label: 'Cantidad entregada', sortable: true, class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 18,
      form: {
        punto_limpieza_cliente: null,
        fechaDesde: null,
        fechaHasta: null
      },
      listaClientes: [],
      listaPuntosLimpiezaCliente: []

    }
  },

  methods: {
    setPuntosLimpiezaCliente (idCliente) {
      this.form.punto_limpieza_cliente = null
      getPuntosLimpiezaCliente(idCliente.id).then((response) => { this.listaPuntosLimpiezaCliente = response.data })
    },
    fetchData () {
      getClientes().then(response => { this.listaClientes = response.data }).catch(error => console.log(error))
      /*
    getReporteConsumoClientes().then(response => {
        this.listaReporte = response.data
        this.totalRows = response.data.length
        })
        .catch(error => console.log(error))
        .finally(() => { })
      */
    },

    obtenerReporte () {
      console.log(this.form.punto_limpieza_cliente)
      console.log(this.form.fechaDesde)
      console.log(this.form.fechaHasta)
      if (this.form.fechaDesde === '') this.form.fechaDesde = null
      if (this.form.fechaHasta === '') this.form.fechaHasta = null
      getReporteConsumoClientes(this.form.punto_limpieza_cliente, this.form.fechaDesde, this.form.fechaHasta).then((response) => {
        this.listaReporte = response.data
        this.totalRows = response.data.length
      })
        .catch(error => console.log(error))
        .finally(() => { })
    }
  },

  mounted () { this.fetchData() }

}

</script>

<style>
  .vdpComponent {
    position: relative;
    font-size: 10px;
    color: #351717;
  }

  .vdpCell.today {
      color: #6bc9da;
  }

  .datePick>input {
      font-size: 14px;
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      padding-right: 40px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 4px;
      background: transparent;
      border: 1px solid #e0e0e0;

      outline: 0;
  }

  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #fcfcfc;
    border-color: #0b9716;
    color: #394066;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #0b9716;
  }
</style>
