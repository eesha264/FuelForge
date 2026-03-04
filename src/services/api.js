import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor — attach JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor — handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response
            if (status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                if (window.location.pathname !== '/login') {
                    toast.error('Session expired. Please log in again.')
                    window.location.href = '/login'
                }
            } else if (status === 500) {
                toast.error('Server error. Please try again later.')
            }
        } else if (error.request) {
            toast.error('Network error. Check your connection.')
        }
        return Promise.reject(error)
    }
)

export default api
