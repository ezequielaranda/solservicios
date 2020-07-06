import api from '@/services/api'

const END_POINT_EMPRESA = 'datosEmpresa/'

const getDatosEmpresa = () => api.get(END_POINT_EMPRESA)

export {
  getDatosEmpresa
}