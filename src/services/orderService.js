import api from './api'

const orderService = {
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData)
        return response.data
    },

    getOrders: async () => {
        const response = await api.get('/orders')
        return response.data
    },

    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`)
        return response.data
    },

    // Admin
    getAllOrders: async () => {
        const response = await api.get('/orders/admin/all')
        return response.data
    },

    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}/status`, { status })
        return response.data
    },
}

export default orderService
