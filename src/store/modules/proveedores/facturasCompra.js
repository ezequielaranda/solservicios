import moment from 'moment';
import { getFacturasCompra,
         addFacturaCompra,
         addItemFacturaCompra,
         addStockItemFacturaCompra,
         deleteFacturaCompra,
         getFacturaCompraById } from '@/services/facturasCompra.js'
import { addPrecioHistoricoProducto } from '@/services/productos.js'


const state = {
  facturasCompra: []
}

const actions = {
  GET_FACTURASCOMPRA: (context) => {
    getFacturasCompra().then((response) => { context.commit('SET_FACTURASCOMPRA', response.data) })
  },

  ADD_FACTURA_COMPRA: (context, data) => {
    return new Promise((resolve, reject) => {
      addFacturaCompra(data).then( (responseFacturaCompra) => {
        data.itemsFactura.forEach(element => {
          element.producto = element.productoObject.id
          // element.cantidad = element.cantidad * element.productoObject.factor_multiplicacion
          element.facturaCompra = responseFacturaCompra.data.id
          context.dispatch('ADD_ITEM_FACTURA_COMPRA', {'data':element, 
                                                       'fecha':data.fecha_factura_compra,
                                                       'factor_multi': element.productoObject.factor_multiplicacion })
        })
        context.commit('ADD_FACTURA_COMPRA', responseFacturaCompra.data)
        resolve()
      }, (error) => { reject(error) })
    })
  },

  ADD_ITEM_FACTURA_COMPRA: (context, payload) => {
    addItemFacturaCompra(payload.data).then((responseItemFacturaCompra) => {
      let dataStock = {}
      dataStock.fecha_alta = payload.fecha
      dataStock.cantidad = responseItemFacturaCompra.data.cantidad * payload.factor_multi
      dataStock.estacion_kanban = 'ST_IN'
      dataStock.comments = "Carga de Factura de Compra"
      dataStock.estado = 0
      dataStock.producto = responseItemFacturaCompra.data.producto
      dataStock.itemFactura = responseItemFacturaCompra.data.id
      dataStock.itemEntrega = null
      context.dispatch('ADD_STOCK_ITEM_FACTURA_COMPRA', dataStock)
      let precioProducto = {}
      precioProducto.fecha_inicio = payload.fecha
      precioProducto.importe = responseItemFacturaCompra.data.precio_compra
      precioProducto.isCurrent = true
      precioProducto.producto = responseItemFacturaCompra.data.producto
      precioProducto.itemFactura = responseItemFacturaCompra.data.id
      context.dispatch('ADD_PRECIO_ITEM_FACTURA_COMPRA', precioProducto)
    });
  },

  ADD_STOCK_ITEM_FACTURA_COMPRA: (context, data) => {
    addStockItemFacturaCompra(data)
  },

  ADD_PRECIO_ITEM_FACTURA_COMPRA: (context, data) => {
    addPrecioHistoricoProducto(data)
  },

  DELETE_FACTURA_COMPRA: (context, idFacturaCompra) => {
    return new Promise((resolve, reject) => {
      deleteFacturaCompra(idFacturaCompra).then(
        () => {
          context.commit('DELETE_FACTURA_COMPRA', idFacturaCompra)
          resolve()
        }, 
        (error) => {
          reject(error)
        }
      ) 
    })
  }
}

const mutations = {

  SET_FACTURASCOMPRA: (state, facturasCompra) => {
    state.facturasCompra = facturasCompra
  },

  ADD_FACTURA_COMPRA: (state, facturaCompra) => {
    // HAgo el GET a la base antes de insertarlo al array, para tener los itemsFactura
    getFacturaCompraById(facturaCompra.id).then((response) => {
      state.facturasCompra.push(response.data)
    })
  },

  DELETE_FACTURA_COMPRA: (state, idFacturaCompra) => {
    const objIndex = state.facturasCompra.findIndex(obj => obj.id === idFacturaCompra)
    state.facturasCompra.splice(objIndex, 1)
  }
}

const getters = {
  FACTURASCOMPRA: state => {
    return state.facturasCompra
  },
  FACTURAS_LAST_XX_DAYS: (state) => (days) => {
    return state.facturasCompra.filter(factura => moment(factura.fecha_factura_compra) > moment().subtract(days, 'days'))
  } 
}

export default {
  state,
  mutations,
  actions,
  getters
}
