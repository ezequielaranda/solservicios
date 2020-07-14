<template>
<b-container fluid class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaProveedores">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Proveedores
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/listaFacturasCompra">Listado de Facturas de Compra</b-breadcrumb-item>
            <b-breadcrumb-item active>Nueva Factura de Compra</b-breadcrumb-item>
        </b-breadcrumb>

    <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">

      <b-form-group id="input-group-3" label="Proveedor:" label-cols-sm="6" label-cols-lg="2">
            <v-select label="nombre_completo"
                      :reduce="nombre_completo => nombre_completo.id"
                      v-model="form.proveedor"
                      :options="listaProveedores">
              <div slot="no-options">No se encontraron resultados</div>
            </v-select>
            <b-form-invalid-feedback :state="this.stateProveedor()">
                  Se debe elegir un proveedor de la lista.
            </b-form-invalid-feedback>
      </b-form-group>

      <!--b-form-group id="input-group-2" label="Fecha de Factura:" label-for="input-4" label-cols-sm="6" label-cols-lg="2">
         <date-pick class="datePick"
             id="input-4"
             v-model="form.fecha_factura_compra"
             :format="format"
         ></date-pick>
        <b-form-invalid-feedback :state="this.stateFechaFactura()">
                Elegir una fecha para la Factura.
         </b-form-invalid-feedback>
      </b-form-group-->
      <b-form-group id="input-group-2" label="Fecha de Factura:" label-for="input-4" label-cols-lg="2">
          <b-form-datepicker id="input-4"
                             v-model="form.fecha_factura_compra"
                             :state="this.stateFechaFactura()"
                             placeholder="Seleccionar fecha..."
                             locale="es"
                             ></b-form-datepicker>
          <b-form-invalid-feedback :state="this.stateFechaFactura()">
                 Definir una fecha para la Factura.
          </b-form-invalid-feedback>
      </b-form-group>

     <div class="border-top my-3"></div>

      <b-table
            show-empty
            empty-text="No se han agregado productos"
            small
            bordered
            outlined
            :items="form.itemsFactura"
            :fields="fields"
            head-row-variant="secondary"
            class="shadow"

          >
          <template v-slot:table-colgroup="scope">
            <col :style="{ width:'3%' }"/>
            <col :style="{ width:'30%' }"/>
            <col :style="{ width:'5%' }"/>
            <col :style="{ width:'6%' }"/>
            <col :style="{ width:'9%' }"/>
            <col :style="{ width:'4%' }"/>
            <col :style="{ width:'8%' }"/>
            <col :style="{ width:'7%' }"/>
            <col :style="{ width:'8%' }"/>
          </template>

          <template v-slot:cell(index)="row">
             {{ row.index + 1 }}
          </template>

          <template v-slot:cell(productoObject)="row">
             <p v-if="editIndex !== row.index + 1"> {{ row.item.productoObject.nombre_completo }}</p>
             <v-select v-if="editIndex === row.index + 1"
                       label="nombre_completo"
                       v-model="row.item.productoObject"
                       :options="listaProductos">
                 <div slot="no-options">No se encontraron resultados</div>
              </v-select>
               <b-form-invalid-feedback :state="stateProducto(row.item)">
                  Se debe elegir un producto de la lista.
               </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(cantidad)="row">
             <p v-if="editIndex !== row.index + 1"> {{ row.item.cantidad }}</p>
             <b-form-input
                   size="sm"
                   v-if="editIndex === row.index + 1"
                   v-model.number="row.item.cantidad"
                   placeholder="">
             </b-form-input>
             <b-form-invalid-feedback :state="stateCantidad(row.item)">
                   <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
             </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(unidad_medida)="row">
            <p v-if="editIndex !== row.index + 1"> {{ row.item.unidad_medida }}</p>
            <b-form-input
                  size="sm"
                  v-if="editIndex === row.index + 1"
                   v-model="row.item.unidad_medida"
                  placeholder="">
            </b-form-input>
            <b-form-invalid-feedback :state="stateunidadMedida(row.item)">
                   <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
            </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(precio_compra)="row">
            <p v-if="editIndex !== row.index + 1"> {{ row.item.precio_compra | money }}</p>
            <b-form-input
                  size="sm"
                  v-if="editIndex === row.index + 1"
                   v-model.number="row.item.precio_compra"
                  placeholder="">
            </b-form-input>
            <b-form-invalid-feedback :state="statePrecioUnitario(row.item)">
                   <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
            </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(bonificacion)="row">
            <p v-if="editIndex !== row.index + 1"> {{ row.item.bonificacion }}</p>
            <b-form-input
                  size="sm"
                  v-if="editIndex === row.index + 1"
                   v-model.number="row.item.bonificacion"
                  placeholder="">
            </b-form-input>
            <b-form-invalid-feedback :state="stateBonificacion(row.item)">
                   error.
            </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(subtotal)="row">
            <p> {{ subtotalItem(row.item) | money }}</p>
          </template>

          <template v-slot:cell(alicuotaIVA)="row">
            <p v-if="editIndex !== row.index + 1"> {{ row.item.alicuotaIVA }}</p>
            <b-form-input
                  size="sm"
                  v-if="editIndex === row.index + 1"
                   v-model.number="row.item.alicuotaIVA"
                  placeholder="alícuota IVA">
            </b-form-input>
            <b-form-invalid-feedback :state="stateAlicuotaIVA(row.item)">
                   error.
            </b-form-invalid-feedback>
          </template>

          <template v-slot:cell(total)="row">
            <p> {{ totalItem(row.item) | money }}</p>
          </template>

          <template v-slot:cell(actions)="row">
            <b-row v-if="editIndex !== row.index + 1" class="justify-content-md-center">
              <b-button pill class="mr-2" size="sm" @click="edit(row.item, row.index + 1)" variant="info">
                <b-icon icon="pencil"></b-icon> Editar</b-button>
              <b-button pill size="sm" @click="remove(row.item, row.index + 1)" variant="outline-danger">
                <b-icon icon="trash"></b-icon> Eliminar</b-button>
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
             <b-button class="shadow" pill size="sm" :disabled="editIndex" @click="addNewProduct">Agregar Producto a Factura</b-button>
         </b-row>

    <!--/b-form-->

    <div class="border-top my-3"></div>

    <div class="col-3 offset-9">
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Sub total</span>
        </div>
        <input class="form-control form-control-sm text-right" disabled :value="this.allSubTotal | money">
      </div>
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">I.V.A.</span>
        </div>
        <input class="form-control form-control-sm" type="number" v-model.number="tax">
        <div class="input-group-append">
          <span class="input-group-text">%</span>
        </div>
      </div>
      <div class="input-group input-group-lg mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Total</span>
        </div>
        <input class="form-control form-control-lg text-right" disabled :value="this.total | money">
      </div>
    </div>

    <div class="shadow border-top my-3"></div>
    <b-row class="justify-content-md-center">
      <b-button pill size="sm" type="outline-submit" variant="outline-success" class="mr-2 mb-4">
        <b-icon icon="check-box"></b-icon>Guardar Factura</b-button>
      <b-button pill size="sm" type="reset" variant="outline-secondary" class="mb-4">Borrar valores</b-button>
    </b-row>
 </b-form>
  <!--/div-->
  </b-container>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import swal from 'sweetalert'

export default {
  components: { DatePick },
  name: 'NewFacturaCompraView',
  filters: {
    money: (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  },
  data () {
    return {
      // variables para la fecha
      format: 'YYYY-MM-DD',
      date: new Date(),
      // ///////////////////////////
      itemsBreadcrumbs: [
        { text: 'Productos', active: false },
        { text: 'Lista de Productos', to: { name: 'listaProductosView' } },
        { text: 'Nuevo Producto', active: true }
      ],
      showForm: true,
      form: {
        proveedor: null,
        usuario_alta: this.$store.getters.getUserID,
        fecha_factura_compra: '',
        fecha_alta_factura: '',
        importe_neto_gravado: null,
        importe_total: null,
        iva27: 0,
        iva21: null,
        iva105: 0,
        iva0: 0,
        itemsFactura: []
      },
      fields: [
        { key: 'index', label: '#', sortable: false, class: "text-center" },
        { key: 'productoObject', label: 'Producto', sortable: false },
        { key: 'cantidad', label: 'cantidad', sortable: false, class: "text-center" },
        { key: 'unidad_medida', label: 'unidad', sortable: false, class: "text-center" },
        { key: 'precio_compra', label: 'precio unit.', sortable: false, class: "text-center" },
        { key: 'bonificacion', label: 'bonif.', sortable: false, class: "text-center" },
        { key: 'subtotal', label: 'subtotal', sortable: false, class: "text-center" },
        { key: 'alicuotaIVA', label: '% IVA', sortable: false, class: "text-center" },
        { key: 'total', label: 'total', sortable: false, class: "text-center" },
        { key: 'actions', label: 'Acciones', class: 'text-center' }
      ],
      editIndex: null,
      originalData: null,
      tax: 21,
      listaProveedores: [],
      listaProductos: []

    }
  },
  methods: {
    
    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateProveedor() && this.stateFechaFactura()) {
        if (this.form.itemsFactura.length > 0) {
          // this.form.usuario_alta = 1
          this.form.fecha_alta_factura = new Date().toISOString().substring(0, 10)
          this.form.importe_total = this.total
          this.form.importe_neto_gravado = this.allSubTotal
          this.form.iva21 = this.allIVAitems
          this.$store.dispatch('ADD_FACTURA_COMPRA', this.form).then(
            response => {
                swal('Factura de Compra creada exitosamente!', '', 'success')
                this.$router.push({ name: 'ListaFacturaCompraView' })
            },
            error => {
                swal('No se pudo crear la nueva Factura de Compra.', '', error.toISOString())
            }
          )
        } else {
          swal('No se han agregado productos a la Factura.', '', 'error')
        }
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

    onReset (evt) {
      evt.preventDefault()
      this.show = false
      this.form.proveedor = null
      this.form.fecha_factura_compra = ''
      this.form.itemsFactura = []
      // Trick to reset/clear native browser form validation state

      this.$nextTick(() => {
        this.show = true
      })
    },
    addNewProduct () {
      this.originalData = null
      this.form.itemsFactura.push({ index: '', productoObject: null, cantidad: 1, unidad_medida: '', precio_compra: 0, bonificacion: 0, alicuotaIVA: 21 })
      this.editIndex = this.form.itemsFactura.length
    },
    edit (item, index) {
      this.originalData = Object.assign({}, item)
      this.editIndex = index
    },
    cancel (item) {
      this.editIndex = null
      if (!this.originalData) { // Esto es por si presiona Cancelar antes de que se haya guardado alguna vez el item
        this.form.itemsFactura.splice(this.form.itemsFactura.indexOf(item), 1)
        return
      }
      Object.assign(item, this.originalData)
      this.originalData = null
    },
    remove (item, index) {
      this.form.itemsFactura.splice(index - 1, 1)
    },
    save (item) {
      if (this.stateProducto(item) &&
          this.stateCantidad(item) &&
          this.stateunidadMedida(item) &&
          this.stateBonificacion(item) &&
          this.stateAlicuotaIVA(item) &&
          this.statePrecioUnitario(item)) {

        this.originalData = null
        this.editIndex = null
      } else {
        swal('Hay datos incompletos en la línea que se intenta guardar', '', 'error')
      }
    },
    subtotalItem (item) {
      return (item.cantidad * item.precio_compra) - (item.cantidad * item.precio_compra * item.bonificacion / 100)
    },

    ivaItem (item) {
      return Number((this.totalItem(item) - this.subtotalItem(item)).toFixed(2))
    },

    totalItem (item) {
      return (item.cantidad * item.precio_compra * (100 + item.alicuotaIVA) / 100)
    },

    fetchData () {
      this.listaProveedores = this.$store.getters.PROVEEDORES
      this.listaProductos = this.$store.getters.PRODUCTOS
    },

    stateProveedor () { return this.form.proveedor != null },
    stateFechaFactura () { return this.form.fecha_factura_compra !== '' },
    stateProducto (item) { return item.productoObject != null },
    stateCantidad (item) { return item.cantidad != null && item.cantidad > 0 },
    statePrecioUnitario (item) { return item.precio_compra != null && item.precio_compra > 0 },
    stateunidadMedida (item) { return item.unidad_medida != null && item.unidad_medida.length > 0 },
    stateBonificacion (item) { return item.bonificacion != null },
    stateAlicuotaIVA (item) { return item.alicuotaIVA != null }
  },
  computed: {
    allSubTotal () {
      return this.form.itemsFactura.map(item => this.subtotalItem(item)).reduce((a, b) => a + b, 0)
    },
    allIVAitems () {
      return this.form.itemsFactura.map(item => this.ivaItem(item)).reduce((a, b) => a + b, 0)
    },
    total () {
      return this.tax
        ? this.allSubTotal + (this.allSubTotal * (this.tax / 100))
        : this.allSubTotal
    }
  },

  mounted () {
    this.fetchData()
  }
}
</script>

<style>
  input[type="number"] {
    text-align: right;
  }
</style>
