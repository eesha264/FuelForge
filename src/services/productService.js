import api from './api'

const productService = {
    getProducts: async (params = {}) => {
        const response = await api.get('/products', { params })
        return response.data
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`)
        return response.data
    },

    getFeaturedProducts: async () => {
        const response = await api.get('/products', {
            params: { featured: true, limit: 8 },
        })
        return response.data
    },

    getCategories: async () => {
        const response = await api.get('/products/categories')
        return response.data
    },

    createReview: async (productId, reviewData) => {
        const response = await api.post(`/products/${productId}/reviews`, reviewData)
        return response.data
    },

    // Admin
    createProduct: async (data) => {
        const response = await api.post('/products', data)
        return response.data
    },

    updateProduct: async (id, data) => {
        const response = await api.put(`/products/${id}`, data)
        return response.data
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`)
        return response.data
    },
}

export default productService
