import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  //baseURL: 'https://iroiro-st-production.up.railway.app/api',
})

api.interceptors.request.use((config) => {
  if (localStorage) {
    const token = localStorage.getItem('admin_access_token')
    const customerToken = localStorage.getItem('customer_access_token')
    if (token || customerToken) {
      config.headers['x-auth-token'] = token || customerToken
    }
  }
  return config
})
