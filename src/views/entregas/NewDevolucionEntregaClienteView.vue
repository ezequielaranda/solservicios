<template>
  <b-container fluid class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/listaEntregaClienteView">Listado de Entregas de Producto</b-breadcrumb-item>
            <b-breadcrumb-item active>Editar Entrega</b-breadcrumb-item>
        </b-breadcrumb>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">

    <b-row class="mb-1">
      <b-col cols="9">
        <b-input-group size="sm">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info">
              <strong class="text-white">Cliente --> Punto de Limpieza:</strong>
            </b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="nombreClienteEntrega + ` --> ` + nombrePuntoLimpiezaEntrega" ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group size="sm">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info">
              <a class="text-white">Fecha de Entrega:</a>
            </b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="fechaEntrega"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    
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
            <col :style="{ width:'45%' }"/>
            <col :style="{ width:'10%' }"/>
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
          
          <template v-slot:cell(esEntrega)="row">
              <b-form-checkbox
                  size="sm" 
                  v-if="editIndex === row.index + 1"
                  v-model="row.item.esEntrega" 
                  name="check-button" button>
                  <b>{{ (row.item.esEntrega) ? "ENTREGA" : "DEVOLUCIÓN" }}</b>
              </b-form-checkbox>
              <p v-if="editIndex !== row.index + 1 && row.item.esEntrega"> ENTREGA</p>
              <p v-if="editIndex !== row.index + 1 && !row.item.esEntrega"> DEVOLUCIÓN</p>
              
              
              
              <!--b-form-input
                    size="sm"
                    v-if="editIndex === row.index + 1"
                    v-model="row.item.esEntrega"
                    
                    class="shadow text-dark bg-light">
              </b-form-input-->
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
                <b-button pill class="mr-2" size="sm" @click="edit(row.item, row.index + 1)" variant="outline-info">
                  <b-icon icon="pencil"></b-icon></b-button>
                <b-button pill size="sm" @click="remove(row.item, row.index + 1)" variant="outline-danger">
                  <b-icon icon="trash"></b-icon></b-button>
              </b-row>
              <b-row v-if="editIndex === row.index + 1" class="justify-content-md-center">
                <b-button pill class="mr-2" size="sm" @click="cancel(row.item)" variant="outline-secondary">
                  <b-icon icon="x-square"></b-icon> Cancelar</b-button>
                <b-button pill size="sm" @click="save(row.item)" variant="outline-success">
                  <b-icon icon="check-box"></b-icon> Guardar</b-button>
              </b-row>
            </template>

          </b-table>
          <b-row align-h="center">
              <b-button class="shadow"
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
  name: 'newDevolucionEntregaClienteView',

  data () {
    return {
      // idEntregaCliente: null,
      nombreClienteEntrega: '',
      nombrePuntoLimpiezaEntrega: '',
      fechaEntrega: '',
      showForm: true,
      form: {
        idEntregaCliente: null,
        usuario_alta: this.$store.getters.getUserID,
        itemsEntrega: []
      },
      originalData: null,
      fields: [
        { key: 'index', label: '#', sortable: false, class: 'text-center' },
        { key: 'producto', label: 'Producto', sortable: false, class: 'text-center' },
        { key: 'esEntrega', label: 'ENT / DEV', sortable: false, class: 'text-center' },
        { key: 'cantidad', label: 'Cantidad', sortable: false, class: 'text-center' },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
      ],
      editIndex: null,
      listaProductos: []

    }
  },

  methods: {
   async onSubmit (evt) {
      evt.preventDefault()
      if (this.form.itemsEntrega.length === 0) {
        swal('No se han agregado productos.', '', 'error')
      } else {
        await this.$store.dispatch('ADD_DEVOLUCION', this.form).then(
            response => {
                swal('Edición de Entrega exitosa.', '', 'success')
                this.$store.dispatch('GET_ENTREGAS')
                this.$router.push({ name: 'ListaEntregaClienteView' })
            },
            error => {
                swal('No se pudo editar la Entrega de Productos.', '', error.toISOString())
            }
          )
      }

    },

    onReset (evt) {
      evt.preventDefault()
      this.show = false
      this.form.itemsEntrega = []
      this.$nextTick(() => {
        this.show = true
      })
    },

    add () {
      this.originalData = null
      this.form.itemsEntrega.push({ producto: '', nombreProducto: null, cantidad: 1, esEntrega: false })
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
        swal('Hay datos incompletos en la línea que se intenta guardar', '', 'error')
      }
    },

    stateProducto (item) { return item.nombreProducto != null },
    stateCantidad (item) { return item.cantidad != null && item.cantidad > 0 },
    stateCliente () { return this.form.cliente != null },
    statePuntoLimpiezaCliente () { return this.form.punto_limpieza_cliente != null },
    stateFechaEntrega () { return this.form.fecha_entrega !== '' },

    setPuntosLimpiezaCliente (idCliente) {
      this.form.punto_limpieza_cliente = null
      // getPuntosLimpiezaCliente(idCliente.id).then((response) => { this.listaPuntosLimpiezaCliente = response.data })
      this.listaPuntosLimpiezaCliente = this.$store.getters.PUNTO_CLIENTE_BY_CLIENTE_ID(idCliente)
    },

    fetchData () {
      // getClientes().then(response => { this.listaClientes = response.data }).catch(error => console.log(error))
      this.listaProductos = this.$store.getters.PRODUCTOS
      // getProductos().then(response => { this.listaProductos = response.data }).catch(error => console.log(error))
      let entrega = this.$store.getters.ENTREGA_BY_ID(this.$route.params.entregaId)
      this.form.idEntregaCliente = entrega.id
      this.nombrePuntoLimpiezaEntrega = entrega.nombre_punto_limpieza_cliente
      this.nombreClienteEntrega = entrega.nombre_cliente
      this.fechaEntrega = this.$moment(entrega.fecha_entrega).format("LL");
    }

  },
  mounted () { this.fetchData() }

}
</script>

<style>
</style>
