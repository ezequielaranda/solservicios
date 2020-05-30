import moment from 'moment';
import { getEntregasCliente,
  addEntregaCliente,
  addItemEntregaCliente,
  addStockItemEntregaCliente,
  deleteEntregaCliente,
  getEntregaClienteById } from '@/services/clientes.js'




const state = {
entregasCliente: []
}

const actions = {
  GET_ENTREGAS: (context) => {
    getEntregasCliente().then((response) => { context.commit('SET_ENTREGAS', response.data) })
  },

  ADD_ENTREGA: (context, entrega) => {
    addEntregaCliente(entrega).then((responseEntregaCliente) => {
      entrega.itemsEntrega.forEach(elementEntrega => {
        elementEntrega.producto = elementEntrega.nombreProducto.id
        elementEntrega.entregaCliente = responseEntregaCliente.data.id
        context.dispatch('ADD_ITEM_ENTREGA', elementEntrega)
      })
      context.commit('ADD_ENTREGA', responseEntregaCliente.data)
    })
  },

  ADD_DEVOLUCION: (context, entrega) => {
      entrega.itemsEntrega.forEach(elementEntrega => {
        elementEntrega.producto = elementEntrega.nombreProducto.id
        elementEntrega.entregaCliente = entrega.idEntregaCliente
        context.dispatch('ADD_ITEM_DEVOLUCION', elementEntrega)
      })
      
   
  },

  ADD_ITEM_ENTREGA: (context, itemEntrega) => {
    addItemEntregaCliente(itemEntrega).then((responseItemEntrega) => {
      let dataStock = {}
      dataStock.fecha_alta = responseItemEntrega.data.fecha_alta_item_entrega
      dataStock.cantidad = -responseItemEntrega.data.cantidad
      dataStock.estacion_kanban = 'ST_OUT'
      dataStock.estado = 0
      dataStock.producto = responseItemEntrega.data.producto
      dataStock.itemEntrega = responseItemEntrega.data.id
      dataStock.itemFactura = null
      context.dispatch('ADD_STOCK_ITEM_ENTREGA', dataStock)
    })
  },

  ADD_ITEM_DEVOLUCION: (context, itemEntrega) => {
    addItemEntregaCliente(itemEntrega).then((responseItemEntrega) => {
      let dataStock = {}
      dataStock.fecha_alta = responseItemEntrega.data.fecha_alta_item_entrega
      dataStock.cantidad = responseItemEntrega.data.cantidad
      dataStock.estacion_kanban = 'ST_IN'
      dataStock.estado = 0
      dataStock.producto = responseItemEntrega.data.producto
      dataStock.itemEntrega = responseItemEntrega.data.id
      dataStock.itemFactura = null
      context.dispatch('ADD_STOCK_ITEM_ENTREGA', dataStock)
    })
  },

  ADD_STOCK_ITEM_ENTREGA: (context, data) => {
    addStockItemEntregaCliente(data)
  }
}

const mutations = {

  SET_ENTREGAS: (state, entregasCliente) => {
    state.entregasCliente = entregasCliente
  },

  ADD_ENTREGA: (state, entregaCliente) => {
    // HAgo el GET a la base antes de insertarlo al array, para tener los itemsEntrega
    getEntregaClienteById(entregaCliente.id).then((response) => {
      state.entregasCliente.push(response.data)
    })
  },

  DELETE_ENTREGA: (state, entregaCliente) => {

  }
}

const getters = {
  ENTREGAS: state => { return state.entregasCliente },
  ENTREGA_BY_ID: (state) => (idEntrega) => { return state.entregasCliente.find(entrega => entrega.id === idEntrega) },
  ENTREGAS_LAST_XX_DAYS: (state) => (days) => {
    return state.entregasCliente.filter(entrega => moment(entrega.fecha_entrega) > moment().subtract(days, 'days'))
  } 
}

export default {
state,
mutations,
actions,
getters
}
