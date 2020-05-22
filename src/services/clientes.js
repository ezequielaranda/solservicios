import api from '@/services/api'

const END_POINT_CLIENTE = 'clientes/'
const END_POINT_PUNTO_LIMPIEZA_CLIENTE = 'puntosLimpiezaCliente/'
const END_POINT_ENTREGA_CLIENTE = 'entregasCliente/'
const END_POINT_ITEMS_ENTREGA_CLIENTE = 'itemEntregaCliente/'


const getPuntoLimpiezaClienteById = (puntoLimpiezaClienteId) => api.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE + puntoLimpiezaClienteId)
const getPuntosLimpiezaCliente = () => api.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE)
const getPuntosLimpiezaClienteByIdCliente = (clienteId) => api.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE, { params: { cliente: clienteId } })
const addPuntoLimpiezaCliente = (formPuntoLimpiezaCliente) => api.post(END_POINT_PUNTO_LIMPIEZA_CLIENTE, formPuntoLimpiezaCliente)
const editPuntoLimpiezaCliente = (formPuntoLimpiezaCliente) => api.put(END_POINT_PUNTO_LIMPIEZA_CLIENTE + formPuntoLimpiezaCliente.id + '/', formPuntoLimpiezaCliente)
const deletePuntoLimpiezaCliente = (puntoLimpiezaClienteId) => api.delete(END_POINT_PUNTO_LIMPIEZA_CLIENTE + puntoLimpiezaClienteId + '/')

const getEntregasCliente = () => api.get(END_POINT_ENTREGA_CLIENTE)
const getEntregaCliente = (entregaId) => api.get(END_POINT_ENTREGA_CLIENTE + entregaId)
const addEntregaCliente = async (entregaCliente) => api.post(END_POINT_ENTREGA_CLIENTE, entregaCliente)
const addItemEntregaCliente = async (itemEntregaCliente) => api.post(END_POINT_ITEMS_ENTREGA_CLIENTE, itemEntregaCliente)
const deleteEntregaCliente = (entregaId) => api.delete(END_POINT_ENTREGA_CLIENTE + entregaId + '/')

const getClientes = () => api.get(END_POINT_CLIENTE)
const getClienteById = (clienteId) => api.get(END_POINT_CLIENTE + clienteId + '/')
const addCliente = (formCliente) => api.post(END_POINT_CLIENTE, formCliente)
const editCliente = (formCliente) => api.put(END_POINT_CLIENTE + formCliente.id + '/', formCliente)
const deleteCliente = (clienteId) => api.delete(END_POINT_CLIENTE + clienteId + '/')



// const addStockItemEntregaCliente = async (stockItemEntregaCliente) => httpClient.post(END_POINT_STOCK_PRODUCTO, stockItemFacturaCompra)

export {
  getClientes,
  getPuntosLimpiezaClienteByIdCliente,
  getPuntosLimpiezaCliente,
  getEntregaCliente,
  addEntregaCliente,
  addItemEntregaCliente,
  getEntregasCliente,
  getPuntoLimpiezaClienteById,
  addCliente,
  addPuntoLimpiezaCliente,
  deleteEntregaCliente,
  editCliente,
  deleteCliente,
  editPuntoLimpiezaCliente,
  deletePuntoLimpiezaCliente,
  getClienteById

}
