/* eslint-disable no-console */
<template>
  <b-container fluid class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/listaEntregaClienteView">Listado de Entregas de Producto</b-breadcrumb-item>
            <b-breadcrumb-item active>Nueva Entrega</b-breadcrumb-item>
        </b-breadcrumb>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
        <b-form-group id="input-group-cliente" label="Cliente:" label-cols-sm="6" label-cols-lg="2">
              <v-select label="nombre_completo" v-model="form.cliente" :options="listaClientes" @input="setPuntosLimpiezaCliente">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback :state="this.stateCliente()">
                  Se debe elegir un cliente de la lista.
             </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-punto" label="Punto de Limpieza:" label-cols-sm="6" label-cols-lg="2">
              <v-select label="nombre_completo"
                        :reduce="nombre_completo => nombre_completo.id"
                        v-model="form.punto_limpieza_cliente"
                        :options="listaPuntosLimpiezaCliente">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback :state="this.statePuntoLimpiezaCliente()">
                  Se debe elegir un punto de limpieza de la lista.
              </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-fecha" label="Fecha de Entrega:" label-for="input-4" label-cols-sm="6" label-cols-lg="2">
          <!--date-pick class="datePick"
              id="input-4"
              v-model="form.fecha_entrega"
              :format="format"
          ></date-pick-->
          <b-form-datepicker id="input-4"
                             v-model="form.fecha_entrega"
                             :state="stateFechaEntrega"
                             placeholder="Seleccionar fecha..."
                             locale="es"
                             ></b-form-datepicker>
          <b-form-invalid-feedback :state="stateFechaEntrega">
                 Elegir una fecha para la entrega.
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="shadow border-top my-3"></div>

          <b-table
            fixed
            show-empty
            empty-text="No se han agregado productos"
            small
            bordered
            outlined
            :items="form.itemsEntrega"
            :fields="fields"
            head-row-variant="secondary"
            class="shadow"

          >
          <template v-slot:table-colgroup="scope">
            <col :style="{ width:'5%' }"/>
            <col :style="{ width:'55%' }"/>
            <col :style="{ width:'15%' }"/>
          </template>

          <template v-slot:cell(index)="row"> {{ row.index + 1 }} </template>

          <template v-slot:cell(producto)="row">
             <p v-if="editIndex !== row.index + 1"> {{ row.item.nombreProducto.nombre_completo }}</p>
             <b-form>
                <v-select label="nombre_completo"
                          v-model="row.item.nombreProducto"
                          :options="listaProductos"
                          v-if="editIndex === row.index + 1"
                          class="shadow style-chooser">
                    <div slot="no-options">No se encontraron resultados</div>
                </v-select>
                <b-form-invalid-feedback :state="stateProducto(row.item)">
                    Se debe elegir un producto de la lista.
                </b-form-invalid-feedback>
             </b-form>
          </template>

          <template v-slot:cell(cantidad)="row">
              <p v-if="editIndex !== row.index + 1"> {{ row.item.cantidad }}</p>
              <b-form-input
                    size="sm"
                    v-if="editIndex === row.index + 1"
                    v-model.number="row.item.cantidad"
                    :state="stateCantidad(row.item)"
                    class="shadow text-dark bg-light">
              </b-form-input>
              <b-form-invalid-feedback :state="stateCantidad(row.item)">
                   Cantidad incorrecta.
                </b-form-invalid-feedback>
          </template>

            <template v-slot:cell(actions)="row">
              <b-row v-if="editIndex !== row.index + 1" class="justify-content-md-center">
                <b-button pill class="mr-2" size="sm" @click="edit(row.item, row.index + 1)" variant="info">
                  <b-icon icon="pencil"></b-icon>Editar</b-button>
                <b-button pill size="sm" @click="remove(row.item, row.index + 1)" variant="outline-danger">
                  <b-icon icon="trash"></b-icon>Eliminar</b-button>
              </b-row>
              <b-row v-if="editIndex === row.index + 1" class="justify-content-md-center">
                <b-button pill class="mr-2" size="sm" @click="cancel(row.item)" variant="outline-secondary">
                  <b-icon icon="x-square"></b-icon>Cancelar</b-button>
                <b-button pill size="sm" @click="save(row.item)" variant="outline-success">
                  <b-icon icon="check-box"></b-icon>Guardar</b-button>
              </b-row>
            </template>

          </b-table>
          <b-row align-h="center">
              <b-button v-if="this.stateCliente() && this.statePuntoLimpiezaCliente() && this.stateFechaEntrega"
                        class="shadow"
                        pill size="sm"
                        v-show="!editIndex"
                        @click="add">Agregar Producto</b-button>
          </b-row>
        <div class="shadow border-top my-3"></div>

        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2 mb-4">
            <b-icon icon="check-box"></b-icon>Guardar Entrega</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" class="mr-2 mb-4">Borrar valores</b-button>
        </b-row>
   </b-form>
  </b-container>
</template>

<script>
import swal from 'sweetalert'

export default {
  components: { },
  name: 'newEntregaClienteView',

  data () {
    return {
      showForm: true,
      form: {
        fecha_entrega: '',
        punto_limpieza_cliente: null,
        cliente: null,
        usuario_alta: this.$store.getters.getUserID,
        itemsEntrega: []
      },
      originalData: null,
      fields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'producto', label: 'Producto a entregar', sortable: false },
        { key: 'cantidad', label: 'Cantidad Entregada', sortable: false },
        { key: 'actions', label: '' }
      ],
      editIndex: null,
      listaClientes: [],
      listaPuntosLimpiezaCliente: [],
      listaProductos: []

    }
  },

  methods: {

    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateCliente() && this.statePuntoLimpiezaCliente() && this.stateFechaEntrega) {
        if (this.form.itemsEntrega.length === 0) {
          swal('No se han agregado productos a la entrega.', '', 'error')
        } else {
          this.$store.dispatch('ADD_ENTREGA', this.form).then(
            response => {
                swal('Entrega de Productos creada exitosamente!', '', 'success')
                this.$router.push({ name: 'ListaEntregaClienteView' })
            },
            error => {
                swal('No se pudo crear la Entrega de Productos.', '', error.toISOString())
            }
          )
        }
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

onReset (evt) {
      evt.preventDefault()
      this.show = false
      this.form.cliente = null
      this.form.punto_limpieza_cliente = null
      this.form.fecha_entrega = ''
      this.form.itemsEntrega = []
      // Trick to reset/clear native browser form validation state
      this.$nextTick(() => {
        this.show = true
      })
    },

    add () {
      this.originalData = null
      this.form.itemsEntrega.push({ producto: '', nombreProducto: null, cantidad: 1, esEntrega: true })
      this.editIndex = this.form.itemsEntrega.length
    },
    edit (item, index) {
      this.originalData = Object.assign({}, item)
      this.editIndex = index
    },
    cancel (item) {
      this.editIndex = null
      if (!this.originalData) {
        this.form.itemsEntrega.splice(this.form.itemsEntrega.indexOf(item), 1)
        return
      }
      Object.assign(item, this.originalData)
      this.originalData = null
    },
    remove (item, index) {
      this.form.itemsEntrega.splice(this.form.itemsEntrega.indexOf(item), 1)
    },
    save (item) {
      if (this.stateProducto(item) && this.stateCantidad(item)) {
        this.originalData = null
        this.form.itemsEntrega.push({ producto: '', nombreProducto: null, cantidad: 1, esEntrega: true })
        this.editIndex = this.form.itemsEntrega.length
      } else {
        swal('Hay datso incompletos en la línea que se intenta guardar', '', 'error')
      }
    },

    stateProducto (item) { return item.nombreProducto != null },
    stateCantidad (item) { return item.cantidad != null && item.cantidad > 0 },
    stateCliente () { return this.form.cliente != null },
    statePuntoLimpiezaCliente () { return this.form.punto_limpieza_cliente != null },
    // stateFechaEntrega () { return this.form.fecha_entrega !== '' },

    setPuntosLimpiezaCliente (cliente) {
      console.log(cliente)
      this.form.punto_limpieza_cliente = null
      this.listaPuntosLimpiezaCliente = this.$store.getters.PUNTO_CLIENTE_BY_CLIENTE_ID(cliente.id)
    },

    fetchData () {
      this.listaClientes = this.$store.getters.CLIENTES
      this.listaProductos = this.$store.getters.PRODUCTOS
    }

  },
  mounted () { this.fetchData() },

  computed: {
    stateFechaEntrega () { return this.form.fecha_entrega !== '' }
  }

}
</script>

<style>
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
