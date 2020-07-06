<template>
  <b-container fluid class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/tipoProductos">Lista de Tipos de Producto</b-breadcrumb-item>
            <b-breadcrumb-item active>Edición de Tipo de Producto</b-breadcrumb-item>
    </b-breadcrumb>
      <b-card class="shadow mt-2" header-tag="header" footer-tag="footer">
        <b-form class="" @submit="onSubmit" @reset="onReset" >
          <b-form-group
            id="input-group-1"
            label="Código:"
            label-for="input-1"
            label-cols-lg="2"
            :invalid-feedback="feedbackCodigo"
            :valid-feedback="feedbackCodigo"
          >
            <b-form-input
              id="input-1"
              v-model="form.codigo"
              type="text"
              required
              placeholder=""
              class="mb-1"
              :state="stateCodigo"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción:"
            label-for="input-2"
            label-cols-lg="2"
            :invalid-feedback="feedbackDescripcion"
            :valid-feedback="feedbackDescripcion"
          >
            <b-form-input
              id="input-2"
              v-model="form.descripcion"
              type="text"
              required
              placeholder=""
              class="mb-1"
              :state="stateDescripcion"
            ></b-form-input>
        </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon>Guardar Tipo de Producto</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/tipoProductos">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>

  </b-container>

</template>

<script>
// @ is an alias to /src
import swal from 'sweetalert'

export default {
  name: 'editTipoProductoView',
  data () {
    return {
      loading: false,
      items: [
        { text: 'Productos', active: false },
        { text: 'Lista de Tipos de Productos', to: { name: 'listaTipoProductosView' } },
        { text: 'Edición de Tipo de Producto', active: true }
      ],
      form: {
        codigo: '',
        descripcion: '',
        id: ''
      },
      error: null
    }
  },

  created () {
      this.error = null
      this.loading = true
      let tipoProducto = this.$store.getters.TIPO_PRODUCTO_BY_ID(this.$route.params.idTipoProducto)
      this.form.codigo = tipoProducto.codigo 
      this.form.id = tipoProducto.id 
      this.form.descripcion = tipoProducto.descripcion 
  },

  computed: {
    feedbackCodigo () {
      if (this.form.codigo.length > 2 && this.form.codigo < 9) {
        return ''
      } else { return 'El código debe tener entre 3 y 8 caracteres.' }
    },
    feedbackDescripcion () {
      if (this.form.descripcion.length > 4 && this.form.descripcion.length < 51) {
        return ''
      } else { return 'La descripción debe tener entre 5 y 50 caracteres.' }
    },
    stateCodigo () { return this.form.codigo.length > 2 && this.form.codigo.length < 9 },
    stateDescripcion () { return this.form.descripcion.length > 4 && this.form.descripcion.length < 51 }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateCodigo && this.stateDescripcion) {
        evt.preventDefault()
        this.$store.dispatch('EDIT_TIPO_PRODUCTO', this.form).then(() => {
          swal('Tipo de Producto editado exitosamente!', '', 'success')
          this.$router.push({ name: 'listaTipoProductosView' })
        }).catch((error) => {
          swal(error.toString(), '', 'error') 
        })
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.codigo = ''
      this.form.descripcion = ''
      this.form.id = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }

}
</script>
