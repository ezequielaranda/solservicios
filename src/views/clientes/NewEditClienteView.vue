<template>
  <b-container fluid class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item v-if="isEdit" active>Edición de Cliente</b-breadcrumb-item>
            <b-breadcrumb-item v-if="!isEdit" active>Nuevo Cliente</b-breadcrumb-item>
    </b-breadcrumb>
      <b-card class="shadow text-left mt-2" header-tag="header" footer-tag="footer">
        <b-form class="text-left" @submit="onSubmit" @reset="onReset" >
          <b-form-group
            id="input-group-1"
            label="Nombre completo:"
            label-for="input-1"
            label-cols-lg="2"
            :invalid-feedback="feedbackNombreCompleto"
            :valid-feedback="feedbackNombreCompleto"
          >
            <b-form-input
              id="input-1"
              v-model="form.nombre_completo"
              type="text"
              required
              placeholder=""
              class="mb-1"
              :state="stateNombreCompleto"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Domicilio:"
            label-for="input-2"
            label-cols-lg="2"
            :invalid-feedback="feedbackDomicilio"
            :valid-feedback="feedbackDomicilio"
          >
            <b-form-input
              id="input-2"
              v-model="form.domicilio"
              type="text"
              required
              placeholder=""
              class="mb-1"
              :state="stateDomicilio"
            ></b-form-input>
        </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon> Guardar</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/listaClientes">Cancelar</b-button>
        </b-row>
      </b-form>
      <div v-if="isEdit">
        <div class="shadow border-top my-3"></div>
            <b-button pill
                  variant="outline-success"
                  :to="{ name:'NewEditPuntoLimpiezaClienteView', params: {idCliente: this.form.id} }"
                  size="sm"
                  class="shadow mb-2">
              <b-icon icon="plus"></b-icon>Nuevo Punto de Limpieza
            </b-button>
        <b-table id="tablaPuntosLimpiezaCliente"
                show-empty
                small
                hover
                head-row-variant="secondary"
                :items="listaPuntosLimpiezaCliente"
                :fields="fields"
                class="shadow mt-2"
                empty-text="El cliente no tiene puntos de limpieza asociados.">
          <template v-slot:cell(action)="row" >
            <b-button pill
                      size="sm"
                      variant="info"
                      class="mr-2"
                      :to="{ name:'NewEditPuntoLimpiezaClienteView', params: {idPuntoLimpiezaCliente: row.item.id} }">
                      <b-icon icon="pencil"></b-icon> Editar</b-button>
            <b-button pill size="sm" variant="outline-danger" @click='deletePuntoCliente(row.item.id)'><b-icon icon="trash"></b-icon>
             Eliminar</b-button>
          </template>
        </b-table>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'newEditClienteView',
  data () {
    return {
      form: {
        nombre_completo: '',
        domicilio: '',
        id: null
      },
      listaPuntosLimpiezaCliente: [],
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo' },
        { key: 'domicilio', label: 'Domicilio' },
        { key: 'action', label: '' }
      ],
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
    stateDomicilio () { return this.form.domicilio.length > 4 && this.form.domicilio.length < 51 }
  },

  methods: {
    onSubmit (evt) {
      
      if (this.stateDomicilio && this.stateNombreCompleto) {
        evt.preventDefault()
        if(this.isEdit) {
          this.$store.dispatch('EDIT_CLIENTE', this.form).then(
            swal('Cliente editado exitosamente!', '', 'success'),
            this.$router.push('listaClientes')
          ).catch((error) => { swal(error.toString(), '', 'error') })
        } else {
          this.$store.dispatch('ADD_CLIENTE', this.form).then(
            swal('Cliente creado exitosamente!', '', 'success'),
            this.$router.push('listaClientes')
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
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    deletePuntoCliente (puntoClienteId) {
      swal('Está seguro de eliminar El Punto de Limpieza del Cliente seleccionado?', {
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
              this.$store.dispatch('DELETE_PUNTO_CLIENTE', puntoClienteId).then( 
                response => {
                  this.listaPuntosLimpiezaCliente = this.$store.getters.PUNTO_CLIENTE_BY_CLIENTE_ID(this.$route.params.idCliente)
                  swal('Punto de Limpieza de Cliente eliminado exitosamente.', '', 'success')
                },
                error => {
                  swal('El Punto de Limpieza de Cliente seleccionado no puede ser eliminado.', '', 'error')
                })
              break
          }
        })
    },
  },

    mounted () {
    let idCliente = null
    idCliente = this.$route.params.idCliente
    if(idCliente==null) {
      this.isEdit = false
    } else {
      this.isEdit = true
      this.listaPuntosLimpiezaCliente = this.$store.getters.PUNTO_CLIENTE_BY_CLIENTE_ID(idCliente)
      const cliente = this.$store.getters.CLIENTE_BY_ID(idCliente)
      this.form.nombre_completo = cliente.nombre_completo
      this.form.domicilio = cliente.domicilio
      this.form.id = idCliente
    }
  }
}
</script>
