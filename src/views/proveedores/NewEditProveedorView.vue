<template>
  <b-container fluid class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaProveedores">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Proveedores
            </b-breadcrumb-item>
            <b-breadcrumb-item active>{{ title }}</b-breadcrumb-item>
  </b-breadcrumb>
    <b-card  class="shadow mt-2" header-tag="header" footer-tag="footer">
      <b-form class="text-left" @submit.stop.prevent ="onSubmit" @reset="onReset" v-if="show">
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
        label="Razón Social:"
        label-for="input-2"
        label-cols-lg="3"
        :invalid-feedback="feedbackRazonSocial"
        :valid-feedback="feedbackRazonSocial"
      >
        <b-form-input
          id="input-2"
          v-model="form.razon_social"
          type="text"
          placeholder=""
          class="mb-1"
          name="razon_social"
          :state="stateRazonSocial"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Domicilio:"
        label-for="input-3"
        label-cols-lg="3"
        :invalid-feedback="feedbackDomicilio"
        :valid-feedback="feedbackDomicilio"
      >
        <b-form-input
          id="input-3"
          v-model="form.domicilio"
          type="text"
          placeholder=""
          class="mb-1"
          name="domicilio"
          :state="stateDomicilio"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Ingresos Brutos:"
        label-for="input-4"
        label-cols-lg="3"
        :invalid-feedback="feedbackIngresosBrutos"
        :valid-feedback="feedbackIngresosBrutos"
      >
        <b-form-input
          id="input-4"
          v-model="form.ingresos_brutos"
          type="number"
          placeholder=""
          class="mb-1"
          name="ingresos_brutos"
          :state="stateIngresosBrutos"
        ></b-form-input>
      </b-form-group>
      <b-form-group
                    label="I.V.A.:"
                    label-for="input-6"
                    label-cols-lg="3">
            <b-form-select id="input-6"
                      text-field="desc"
                      value-field="code"
                      v-model="form.condicionIVA"
                      :options="listaCondicionIVA"
                      :state="stateCondicionIVA">
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Elegir una opción --</b-form-select-option>
              </template>
            </b-form-select>
              <b-form-invalid-feedback :state="stateCondicionIVA">
                  Se debe elegir un tipo de IVA de la lista.
               </b-form-invalid-feedback>
      </b-form-group>
      <!--b-form-group
                    label="I.V.A.:"
                    label-for="input-6"
                    label-cols-lg="3">
            <v-select id="input-6"
                      label="desc"
                      :reduce="desc => desc.code"
                      v-model="form.condicionIVA"
                      :options="listaCondicionIVA">
              <div slot="no-options">No se encontraron resultados</div>
            </v-select>
              <b-form-invalid-feedback :state="stateCondicionIVA">
                  Se debe elegir un tipo de IVA de la lista.
               </b-form-invalid-feedback>
      </b-form-group-->
      <b-form-group
        id="input-group-5"
        label="C.U.I.T.:"
        label-for="input-5"
        label-cols-lg="3"
        :invalid-feedback="feedbackCUIT"
        :valid-feedback="feedbackCUIT"
      >
        <b-form-input
          id="input-5"
          v-model="form.cuit"
          type="number"
          placeholder=""
          class="mb-1"
          name="cuit"
          :state="stateCUIT"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-fecha" label="Fecha de Inicio de Actividades:" label-for="input-8" label-cols-lg="3">
          <b-form-datepicker id="input-8"
                             v-model="form.fecha_inicio_actividades"
                             :state="stateFechaInicioActividades"
                             placeholder="Seleccionar fecha..."
                             locale="es"
                             ></b-form-datepicker>
          <b-form-invalid-feedback :state="stateFechaInicioActividades">
                 Definir una fecha de inicio de actividades del proveedor.
          </b-form-invalid-feedback>
      </b-form-group>


        


        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon> Guardar Proveedor</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/listaProveedores">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>

import swal from 'sweetalert'
// import DatePick from 'vue-date-pick'
// import 'vue-date-pick/dist/vueDatePick.css'

export default {
  components: { 
    // DatePick
  },
  name: 'newEditProveedorView',
  data () {
    return {
      form: {
        nombre_completo: '',
        razon_social: '',
        domicilio: '',
        ingresos_brutos: '',
        condicionIVA: '',
        cuit: '',
        fecha_inicio_actividades: '',
        id: null
      },
      format: 'YYYY-MM-DD',
      show: true,
      listaCondicionIVA: [
        { code: 'RI', desc: 'Responsable Inscripto' },
        { code: 'MO', desc: 'Monotributista' },
        { code: 'EX', desc: 'Exento' },
        { code: 'NR', desc: 'No Responsable' },
        { code: 'CF', desc: 'Consumidor Final' }

      ],
      title: 'Nuevo Proveedor',
      titleMessage: 'Proveedor creado existosamente!'
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
    feedbackRazonSocial () {
      if (this.form.razon_social.length > 4 && this.form.razon_social.length < 51) {
        return ''
      } else { return 'La razón social del Proveedor debe tener entre 5 y 50 caracteres.' }
    },
    feedbackIngresosBrutos () {
      if (this.form.ingresos_brutos.length === 10) {
        return ''
      } else { return 'El código de Ingresos Brutos debe tener 10 caracteres (SIN GUIONES).' }
    },
    feedbackCUIT () {
      if (this.form.cuit.length === 11) {
        return ''
      } else { return 'El C.U.I.T. debe tener 11 caracteres (SIN GUIONES).' }
    },
    stateRazonSocial () { return this.form.razon_social.length > 4 && this.form.razon_social.length < 51 },
    stateIngresosBrutos () { return this.form.ingresos_brutos.length === 10 },
    stateCUIT () { return this.form.cuit.length === 11 },
    stateCondicionIVA () { return this.form.condicionIVA.length > 1 },
    stateFechaInicioActividades () { return this.form.fecha_inicio_actividades !== '' },
    stateNombreCompleto () { return this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51 },
    stateDomicilio () { return this.form.domicilio.length > 4 && this.form.domicilio.length < 51 }
  },

  methods: {
    onSubmit (evt) {
      if (this.stateDomicilio && this.stateNombreCompleto && this.stateRazonSocial && this.stateIngresosBrutos &&
          this.stateCUIT && this.stateCondicionIVA && this.stateFechaInicioActividades) {
        evt.preventDefault()
        if(this.isEdit) {
          this.$store.dispatch('EDIT_PROVEEDOR', this.form).then(
            swal(this.titleMessage, '', 'success'),
            this.$router.push('listaProveedores')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        } else {
          this.$store.dispatch('ADD_PROVEEDOR', this.form).then(
            swal(this.titleMessage, '', 'success'),
            this.$router.push('listaProveedores')
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
      this.form.domicilio = ''
      this.form.cuit = ''
      this.form.razon_social = ''
      this.form.ingresos_brutos = ''
      this.form.condicionIVA = ''
      this.form.fecha_inicio_actividades = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    fetchData () {
      let idProveedor = null
      idProveedor = this.$route.params.proveedorId
      if(idProveedor==null) {
        this.isEdit = false
      } else {
        this.isEdit = true
        const proveedor = this.$store.getters.PROVEEDOR_BY_ID(idProveedor)
        this.form.nombre_completo = proveedor.nombre_completo
        this.form.domicilio = proveedor.domicilio
        this.form.cuit = proveedor.cuit
        this.form.razon_social = proveedor.razon_social
        this.form.ingresos_brutos = proveedor.ingresos_brutos
        this.form.condicionIVA = proveedor.condicionIVA
        this.form.fecha_inicio_actividades = proveedor.fecha_inicio_actividades
        this.form.id = idProveedor
        this.title = 'Edición de Proveedor'
        this.titleMessage = 'Proveedor editado exitosamente!'
        }
      }
  },

  mounted () { 
    this.fetchData()
  }
}
</script>

<style>
</style>
