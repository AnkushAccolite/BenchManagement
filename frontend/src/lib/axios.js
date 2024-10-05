import axios from 'axios'

const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Access token expired or invalid. Redirecting to login.')

      // Clear tokens and redirect to login or handle refresh token logic
      localStorage.removeItem('accessToken')
      window.location.href = '/sign-in'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
