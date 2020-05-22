import api from '@/services/api'

const END_POINT_PROVEEDOR = 'proveedores/'

const getProveedores = () => api.get(END_POINT_PROVEEDOR)
const getProveedor = (proveedorId) => api.get(END_POINT_PROVEEDOR + proveedorId)

const addProveedor = (formProveedor) => api.post(END_POINT_PROVEEDOR, formProveedor)
const editProveedor = (formProveedor) => api.put(END_POINT_PROVEEDOR + formProveedor.id + '/', formProveedor)
const deleteProveedor = (proveedorId) => api.delete(END_POINT_PROVEEDOR + proveedorId + '/')
const getProveedorById = (proveedorId) => api.get(END_POINT_PROVEEDOR + proveedorId + '/')

export {
  getProveedores,
  getProveedor,
  addProveedor,
  editProveedor,
  deleteProveedor,
  getProveedorById
}
