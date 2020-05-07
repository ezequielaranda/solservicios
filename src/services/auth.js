import api from '@/services/api'

const END_POINT_OBTAIN_TOKEN = 'auth/obtain_token/'
// const END_POINT_REFRESH_TOKEN = 'auth/refresh_token/'
const END_POINT_USER_LOGGED = 'usuarios/'

const getAuth = (credentials) => api.post(END_POINT_OBTAIN_TOKEN, credentials)
const getUserByUsername = (username) => api.get(END_POINT_USER_LOGGED, { params: { username: username } })
// const refreshAuth = (credentials) => api.post(END_POINT_REFRESH_TOKEN, credentials)

export {
  getAuth,
  // refreshAuth,
  getUserByUsername
}