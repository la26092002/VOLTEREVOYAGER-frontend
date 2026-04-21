import axios from 'axios'

const api = axios.create({
  baseURL: 'https://volter.hayvoya.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vv_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vv_token')
      localStorage.removeItem('vv_user')
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────
// POST /api/login  { email, password }
// → { success, message, token, user: { id, email } }
export const adminLogin = (data) => api.post('/login', data)

// ── Orders ────────────────────────────────────────────
// POST /api/orders  { fullName, phone, address, quantity }
// → { success, message, data: { id, fullName, phone, address, quantity, createdAt } }
export const placeOrder = (data) =>
  api.post('/orders', {
    fullName: data.fullName,
    phone:    data.phone,
    address:  data.address,
    quantity: data.quantity,
  })

// GET /api/orders  (requires Bearer token)
// → { success, data: [ ...orders ] }
export const getAllOrders = () => api.get('/orders')

// ── Location ──────────────────────────────────────────
// POST /api/location  { deviceId, latitude, longitude }
// → { success, message, data: { id, deviceId, latitude, longitude, timestamp } }
export const submitLocation = (data) => api.post('/location', data)

// GET /api/location/:deviceId
// → { success, data: { id, deviceId, latitude, longitude, timestamp } }
export const getLocation = (deviceId) => api.get(`/location/${deviceId}`)

export default api
