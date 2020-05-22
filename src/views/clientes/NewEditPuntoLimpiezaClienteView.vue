<template>
  <b-container class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item v-if="isEdit" active>Edición de Punto de Limpieza de Cliente</b-breadcrumb-item>
            <b-breadcrumb-item v-if="!isEdit" active>Nuevo Punto de Limpieza de Cliente</b-breadcrumb-item>
  </b-breadcrumb>
    <b-card  class="shadow mt-2" header-tag="header" footer-tag="footer">
      <b-form class="text-left" @submit.stop.prevent ="onSubmit" @reset="onReset" v-if="show">

      <b-form-group
               label="Cliente:"
               label-for="input-6"
               label-cols-lg="3">
        <v-select id="input-6"
                 label="nombre_completo"
                 :reduce="nombre_completo => nombre_completo.id"
                 v-model="form.cliente"
                 :options="listaClientes">
          <div slot="no-options">No se encontraron resultados</div>
        </v-select>
        <b-form-invalid-feedback :state="stateCliente">
           Se debe elegir un cliente de la lista.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Nombre completo:"
        label-for="input-1"
        label-cols-lg="3"
        :invalid-feedback="feedbackNombreCompleto"
        :valid-feedback="feedbackNombreCompleto"
      >
        <b-form-input
          id="input-1"
          v-model="form.nombre_completo"
          type="text"
          placeholder=""
          class="mb-1"
          name="nombre_completo"
          :state="stateNombreCompleto"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Domicilio:"
        label-for="input-2"
        label-cols-lg="3"
        :invalid-feedback="feedbackDomicilio"
        :valid-feedback="feedbackDomicilio"
      >
        <b-form-input
          id="input-2"
          v-model="form.domicilio"
          type="text"
          placeholder=""
          class="mb-1"
          name="domicilio"
          :state="stateDomicilio"
        ></b-form-input>
      </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon>Guardar Punto de Limpieza</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/listaClientes">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>

import swal from 'sweetalert'

export default {

  name: 'newEditPuntoLimpiezaClienteView',
  data () {
    return {
      form: {
        nombre_completo: '',
        domicilio: '',
        id: null,
        cliente: null
      },
      show: true,
      isEdit: null
    }
  },
  computed: {
    feedbackNombreCompleto () {
      if (this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51) {
        return ''
      } else { return 'El nombre debe tener entre 5 y 50 caracteres.' }
    },
    feedbackDomicilio () {
      if (this.form.domicilio.length > 4 && this.form.domicilio.length < 51) {
        return ''
      } else { return 'El domicilio debe tener entre 5 y 50 caracteres.' }
    },
    stateNombreCompleto () { return this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51 },
    stateDomicilio () { return this.form.domicilio.length > 4 && this.form.domicilio.length < 51 },
    stateCliente () { return this.form.cliente != null },
    listaClientes () { return this.$store.getters.CLIENTES },
  },

  methods: {
    onSubmit (evt) {
      if (this.stateDomicilio && this.stateNombreCompleto && this.stateCliente) {
        evt.preventDefault()
        if(this.isEdit) {
          this.$store.dispatch('EDIT_PUNTO_CLIENTE', this.form).then(
            swal('Punto de Limpieza editado exitosamente!', '', 'success'),
            this.$router.push('listaClientes')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        } else {
          this.$store.dispatch('ADD_PUNTO_CLIENTE', this.form).then(
            swal('Punto de Limpieza creado exitosamente!', '', 'success'),
            this.$router.push('listaClientes')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        }
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

    onReset (evt) {
      evt.preventDefault()
      this.form.nombre_completo = ''
      this.form.domicilio = ''
      this.form.cliente = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

    mounted () {
      let idCliente = this.$route.params.idCliente
      if (idCliente !== null) { this.form.cliente = idCliente }
      let idPuntoLimpiezaCliente = null
      idPuntoLimpiezaCliente = this.$route.params.idPuntoLimpiezaCliente
      if(idPuntoLimpiezaCliente==null) {
        this.isEdit = false
      } else {
        this.isEdit = true
        const puntoLimpiezaCliente = this.$store.getters.PUNTO_CLIENTE_BY_ID(idPuntoLimpiezaCliente)
        this.form.nombre_completo = puntoLimpiezaCliente.nombre_completo
        this.form.domicilio = puntoLimpiezaCliente.domicilio
        this.form.id = idPuntoLimpiezaCliente
      }
    }
}
</script>

<style>

</style>
