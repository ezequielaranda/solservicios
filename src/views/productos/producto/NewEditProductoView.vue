<template>
  <b-container fluid class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Nuevo Producto</b-breadcrumb-item>
  </b-breadcrumb>
    <b-card  class="shadow mt-2" header-tag="header" footer-tag="footer">
      <b-form class="text-right" @submit.stop.prevent ="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Nombre completo:"
        label-for="input-1"
        label-cols-lg="2"
        :invalid-feedback="feedbackNombreCompleto"
        :valid-feedback="feedbackNombreCompleto"
      >
        <b-col sm="7">
          <b-form-input
            id="input-1"
            v-model="form.nombre_completo"
            type="text"
            placeholder=""
            class="mb-1"
            name="nombre_completo"
          ></b-form-input>
              <b-form-invalid-feedback class="text-left" :state="stateNombreCompleto">
                El nombre debe tener entre 5 y 50 caracteres
              </b-form-invalid-feedback>
        </b-col>
      </b-form-group>

      <b-form-group
                    label="Proveedor:"
                    label-for="input-6"
                    label-cols-lg="2">
            <b-col sm="7">
              <v-select id="input-6"
                        label="nombre_completo"
                        :reduce="nombre_completo => nombre_completo.id"
                        v-model="form.proveedor"
                        :options="listaProveedores">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback class="text-left" :state="stateProveedor">
                  Se debe elegir un proveedor de la lista.
              </b-form-invalid-feedback>
            </b-col>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tipo de Producto:" label-cols-lg="2">
            <b-col sm="7">
              <v-select label="descripcion" :reduce="descripcion => descripcion.id" v-model="form.tipoProducto" :options="listaTiposProducto">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback class="text-left" :state="stateTipoProducto">
                  Se debe elegir un tipo de producto de la lista.
              </b-form-invalid-feedback>
            </b-col>
      </b-form-group>

      <b-form-group id="input-group-4" label="Estado de Producto:" label-cols-lg="2">
            <b-col sm="7">
              <v-select label="descripcion" :reduce="descripcion => descripcion.id" v-model="form.estado" :options="listaEstadosProducto">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback class="text-left" :state="stateEstadoProducto">
                  Se debe elegir un estado de la lista.
              </b-form-invalid-feedback>
            </b-col>
      </b-form-group>

      <b-form-group id="input-group-1" label="Familia de Producto:" label-cols-lg="2">
            <b-col sm="7">
              <v-select label="descripcion" :reduce="descripcion => descripcion.id" v-model="form.familiaProducto" :options="listaFamiliasProducto">
                <div slot="no-options">No se encontraron resultados</div>
              </v-select>
              <b-form-invalid-feedback class="text-left" :state="stateFamiliaProducto">
                Se debe elegir una familia de producto de la lista.
              </b-form-invalid-feedback>
            </b-col>
      </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Factor de multiplicación:"
          label-for="input-2"
          label-cols-lg="2"
        >
        <b-col sm="7">
          <b-form-input
              id="input-2"
              v-model.number="form.factor_multiplicacion"
              type="number"
              step="0.01"
              required
              placeholder="1.0"
              class="mb-1"
            ></b-form-input>
        </b-col>  
        </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon='check-box'></b-icon> Guardar Producto</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/productos">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>

import swal from 'sweetalert'

export default {

  name: 'newEditProductoView',
  data () {
    return {
      isEdit: null,
      form: {
        nombre_completo: '',
        estado: null,
        proveedor: null,
        tipoProducto: null,
        familiaProducto: null,
        factor_multiplicacion: 1.0,
        id: null
      },
      // listaProveedores: [],
      // listaTiposProducto: [],
      // listaFamiliasProducto: [],
      show: true
    }
  },
  computed: {
    feedbackNombreCompleto () {
      if (this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51) {
        return ''
      } else { return 'El nombre debe tener entre 5 y 50 caracteres.' }
    },
    stateNombreCompleto () { return this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51 },
    stateProveedor () { return this.form.proveedor != null },
    stateTipoProducto () { return this.form.tipoProducto != null },
    stateEstadoProducto () { return this.form.estado != null },
    stateFamiliaProducto () { return this.form.familiaProducto != null },
    
    listaTiposProducto () { return this.$store.getters.TIPO_PRODUCTOS },
    listaProveedores () { return this.$store.getters.PROVEEDORES },
    listaFamiliasProducto () { return this.$store.getters.FAMILIAS_PRODUCTO },
    listaEstadosProducto () { return this.$store.getters.ESTADOS_PRODUCTO }

  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateProveedor && this.stateTipoProducto && 
          this.stateFamiliaProducto && this.stateNombreCompleto && this.stateEstadoProducto) {
        
        if(this.isEdit) {
          this.$store.dispatch('EDIT_PRODUCTO', this.form).then(
            swal('Producto editado exitosamente!', '', 'success'),
            this.$router.push('productos')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        } else {
          this.$store.dispatch('ADD_PRODUCTO', this.form).then(
            swal('Producto creado exitosamente!', '', 'success'),
            this.$router.push('productos')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        }
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.nombre_completo = ''
      this.form.estado = null
      this.form.proveedor = null
      this.form.tipoProducto = null
      this.form.familiaProducto = null
      this.form.factor_multiplicacion = 1.0
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },

  mounted () {
    let idProducto = null
    idProducto = this.$route.params.productoId
    if(idProducto==null) {
      this.isEdit = false
    } else {
      this.isEdit = true
      const producto = this.$store.getters.PRODUCTO_BY_ID(idProducto)
      this.form.nombre_completo = producto.nombre_completo
      this.form.estado = producto.estado
      this.form.proveedor = producto.proveedor
      this.form.tipoProducto = producto.tipoProducto
      this.form.familiaProducto = producto.familiaProducto
      this.form.factor_multiplicacion = producto.factor_multiplicacion
      this.form.id = idProducto
    }
  }
}
</script>

<style>

</style>
