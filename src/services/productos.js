import api from '@/services/api'

const END_POINT_PRODUCTO = 'productos/'
const END_POINT_STOCK_PRODUCTOS = 'stockProductosConsulta/'
const END_POINT_TIPO_PRODUCTO = 'tiposproducto/'
const END_POINT_ESTADO_PRODUCTO = 'estadosproducto/'
const END_POINT_FAMILIA_PRODUCTO = 'familiasproducto/'
const END_POINT_PRECIOS = 'preciosHistoricos/'
const END_POINT_PRECIOS_PRODUCTOS = 'preciosHistoricosProductos/'
const END_POINT_REPORTE_CONSUMO_CLIENTES = 'reporteEntregasAClientes/'
const END_POINT_STOCK_HISTORICO_BY_PRODUCTO_ESTADO = 'stockHistoricoByProductoEstado/'

const getStockHistoricoByIdProductoEstado = (productoId, estado) => api.get(END_POINT_STOCK_HISTORICO_BY_PRODUCTO_ESTADO, { params: { producto: productoId, estado: estado } })

const getProductos = () => api.get(END_POINT_PRODUCTO)
const getProductoById = (idProducto) => api.get(END_POINT_PRODUCTO + idProducto + '/')
const getStockProductos = () => api.get(END_POINT_STOCK_PRODUCTOS)
const getPreciosProductos = () => api.get(END_POINT_PRECIOS_PRODUCTOS)
const addProducto = (formProducto) => api.post(END_POINT_PRODUCTO, formProducto)
const editProducto = (formProducto) => api.put(END_POINT_PRODUCTO + formProducto.id + '/', formProducto)
const deleteProducto = (productoId) => api.delete(END_POINT_PRODUCTO + productoId + '/')

const getEstadosProducto = () => api.get(END_POINT_ESTADO_PRODUCTO)

const getTiposProducto = () => api.get(END_POINT_TIPO_PRODUCTO)
const addTipoProducto = (formTipoProducto) => api.post(END_POINT_TIPO_PRODUCTO, formTipoProducto)
const getTipoProductoById = (idTipoProducto) => api.get(END_POINT_TIPO_PRODUCTO + idTipoProducto + '/')
const editTipoProducto = (formTipoProducto) => api.put(END_POINT_TIPO_PRODUCTO + formTipoProducto.id + '/', formTipoProducto)
const deleteTipoProducto = (tipoProductoId) => api.delete(END_POINT_TIPO_PRODUCTO + tipoProductoId + '/')

const getFamiliasProducto = () => api.get(END_POINT_FAMILIA_PRODUCTO)
const addFamiliaProducto = (formFamiliaProducto) => api.post(END_POINT_FAMILIA_PRODUCTO, formFamiliaProducto)
const getFamiliaProductoById = (idFamiliaProducto) => api.get(END_POINT_FAMILIA_PRODUCTO + idFamiliaProducto + '/')
const deleteFamiliaProducto = (familiaProductoId) => api.delete(END_POINT_FAMILIA_PRODUCTO + familiaProductoId + '/')
const editFamiliaProducto = (formFamiliaProducto) => api.put(END_POINT_FAMILIA_PRODUCTO + formFamiliaProducto.id + '/', formFamiliaProducto)

const addPrecioHistoricoProducto = (formPrecio) => api.post(END_POINT_PRECIOS, formPrecio)

const getReporteConsumoClientes = (clienteId, fechaDesde, fechaHasta) => api.get(END_POINT_REPORTE_CONSUMO_CLIENTES, {
  params: {
    cliente: clienteId,
    fechaDesde: fechaDesde,
    fechaHasta: fechaHasta
  }
})

// const getPuntosLimpiezaCliente = (clienteId) => httpClient.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE, { params: { cliente: clienteId } })

export {
  getProductos,
  getStockProductos,
  getTiposProducto,
  getFamiliasProducto,
  addProducto,
  getPreciosProductos,
  addPrecioHistoricoProducto,
  getReporteConsumoClientes,
  editProducto,
  editTipoProducto,
  editFamiliaProducto,
  getProductoById,
  deleteProducto,
  deleteTipoProducto,
  deleteFamiliaProducto,
  getTipoProductoById,
  getFamiliaProductoById,
  addTipoProducto,
  addFamiliaProducto,
  getEstadosProducto,
  getStockHistoricoByIdProductoEstado
}
