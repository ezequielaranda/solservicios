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
    addFacturaCompra(data).then((responseFacturaCompra) => { 
      data.itemsFactura.forEach(element => {
        element.producto = element.productoObject.id
        element.facturaCompra = responseFacturaCompra.data.id
        context.dispatch('ADD_ITEM_FACTURA_COMPRA', {'data':element, 'fecha':data.fecha_factura_compra})
      })
      context.commit('ADD_FACTURA_COMPRA', responseFacturaCompra.data)
    })

  },

  ADD_ITEM_FACTURA_COMPRA: (context, payload) => {
    addItemFacturaCompra(payload.data).then((responseItemFacturaCompra) => {
      let dataStock = {}
      dataStock.fecha_alta = payload.fecha
      dataStock.cantidad = responseItemFacturaCompra.data.cantidad
      dataStock.estacion_kanban = 'ST_IN'
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
  }
}

const mutations = {

  SET_FACTURASCOMPRA: (state, facturasCompra) => {
    state.facturasCompra = facturasCompra
  },

  ADD_FACTURA_COMPRA: (state, facturaCompra) => {
    getFacturaCompraById(facturaCompra.id).then((response) => {
      state.facturasCompra.push(response.data)
    })
  },

  DELETE_FACTURA_COMPRA: (state, facturaCompra) => {

  }
}

const getters = {
  FACTURASCOMPRA: state => {
    return state.facturasCompra
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
