<template>
  <b-container class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/familiaProductos">Lista de Familias de Producto</b-breadcrumb-item>
            <b-breadcrumb-item v-if="isEdit" active>Edición de Familia de Producto</b-breadcrumb-item>
            <b-breadcrumb-item v-if="!isEdit" active>Nueva Familia de Producto</b-breadcrumb-item>
    </b-breadcrumb>
      <b-card class="shadow text-left mt-2" header-tag="header" footer-tag="footer">
        <b-form class="text-left" @submit="onSubmit" @reset="onReset" >
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
            <b-icon icon="check-box"></b-icon>Guardar</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/familiaProductos">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'newEditFamiliaProductoView',
  data () {
    return {
      form: {
        codigo: '',
        descripcion: '',
        id: null
      },
      show: true,
      isEdit: null
    }
  },

  computed: {
    feedbackCodigo () {
      if (this.form.codigo.length > 2 && this.form.codigo.length < 9) {
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
      
      if (this.stateCodigo && this.stateDescripcion) {
        evt.preventDefault()
        if(this.isEdit) {
          this.$store.dispatch('EDIT_FAMILIA_PRODUCTO', this.form).then(
            swal('Familia de Producto editada exitosamente!', '', 'success'),
            this.$router.push('familiaProductos')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        } else {
          this.$store.dispatch('ADD_FAMILIA_PRODUCTO', this.form).then(
            swal('Familia de Producto creada exitosamente!', '', 'success'),
            this.$router.push('familiaProductos')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        }
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.codigo = ''
      this.form.descripcion = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

    mounted () {
    let idFamiliaProducto = null
    idFamiliaProducto = this.$route.params.idFamiliaProducto
    if(idFamiliaProducto==null) {
      this.isEdit = false
    } else {
      this.isEdit = true
      const familiaProducto = this.$store.getters.FAMILIA_PRODUCTO_BY_ID(idFamiliaProducto)
      this.form.codigo = familiaProducto.codigo
      this.form.descripcion = familiaProducto.descripcion
      this.form.id = idFamiliaProducto
    }
  }
}
</script>
