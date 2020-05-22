import api from '@/services/api'

const END_POINT_FACTURA_COMPRA = 'facturasCompra/'
const END_POINT_ITEMS_FACTURA_COMPRA = 'itemsFacturaCompra/'
const END_POINT_STOCK_PRODUCTO = 'stockProductos/'

const getFacturasCompra = () => api.get(END_POINT_FACTURA_COMPRA)
const addFacturaCompra = (facturaCompra) => api.post(END_POINT_FACTURA_COMPRA, facturaCompra)
const addItemFacturaCompra = (itemFacturaCompra) => api.post(END_POINT_ITEMS_FACTURA_COMPRA, itemFacturaCompra)
const addStockItemFacturaCompra = (stockItemFacturaCompra) => api.post(END_POINT_STOCK_PRODUCTO, stockItemFacturaCompra)
const deleteFacturaCompra = (facturaId) => api.delete(END_POINT_FACTURA_COMPRA + facturaId + '/')
const getFacturaCompraById = (facturaId) => api.get(END_POINT_FACTURA_COMPRA + facturaId + '/')
export {
  getFacturasCompra,
  addFacturaCompra,
  addItemFacturaCompra,
  addStockItemFacturaCompra,
  deleteFacturaCompra,
  getFacturaCompraById

}
