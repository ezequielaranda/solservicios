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
    return new Promise((resolve, reject) => {
      addEntregaCliente(entrega).then(
        (responseEntregaCliente) => {
          entrega.itemsEntrega.forEach(elementEntrega => {
            elementEntrega.producto = elementEntrega.nombreProducto.id
            elementEntrega.entregaCliente = responseEntregaCliente.data.id
            context.dispatch('ADD_ITEM_ENTREGA', elementEntrega)
          })
          context.commit('ADD_ENTREGA', responseEntregaCliente.data)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      )
    })
  },

  ADD_DEVOLUCION: (context, entrega) => {
    entrega.itemsEntrega.forEach(elementEntrega => {
      elementEntrega.producto = elementEntrega.nombreProducto.id
      elementEntrega.entregaCliente = entrega.idEntregaCliente
      if(elementEntrega.esEntrega) {
        context.dispatch('ADD_ITEM_ENTREGA', elementEntrega)
      } else {
        context.dispatch('ADD_ITEM_DEVOLUCION', elementEntrega)
      }
   })
   //context.dispatch('GET_ENTREGAS')
  },

  ADD_ITEM_ENTREGA: (context, itemEntrega) => {
    addItemEntregaCliente(itemEntrega).then((responseItemEntrega) => {
      let dataStock = {}
      dataStock.fecha_alta = responseItemEntrega.data.fecha_alta_item_entrega
      dataStock.cantidad = -responseItemEntrega.data.cantidad
      dataStock.estacion_kanban = 'ST_OUT'
      dataStock.comments = 'Entrega a Cliente'
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
      dataStock.comments = 'Devolución desde el cliente'
      dataStock.estado = 0
      dataStock.producto = responseItemEntrega.data.producto
      dataStock.itemEntrega = responseItemEntrega.data.id
      dataStock.itemFactura = null
      context.dispatch('ADD_STOCK_ITEM_ENTREGA', dataStock)
    })
  },

  ADD_STOCK_ITEM_ENTREGA: (context, data) => {
    addStockItemEntregaCliente(data)
  },

  DELETE_ENTREGA: (context, idEntrega) => {
    return new Promise((resolve, reject) => {
      deleteEntregaCliente(idEntrega).then(
        () => {
          context.commit('DELETE_ENTREGA', idEntrega)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  },
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

  DELETE_ENTREGA: (state, idEntregaCliente) => {
    const objIndex = state.entregasCliente.findIndex(obj => obj.id === idEntregaCliente)
    state.entregasCliente.splice(objIndex, 1)
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
