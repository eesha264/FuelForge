import { useState, useEffect } from 'react'
import { DollarSign, Package, ShoppingCart, Users, Trash2, TrendingUp } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import orderService from '../../services/orderService'
import productService from '../../services/productService'
import toast from 'react-hot-toast'

const DEMO_STATS = { totalOrders: 156, totalRevenue: 12489.50, totalProducts: 48, totalUsers: 320 }
const DEMO_ORDERS = [
    { _id: 'ORD-101', user: { name: 'Alice W.' }, totalPrice: 89.97, status: 'processing', createdAt: '2026-03-04T08:00:00Z' },
    { _id: 'ORD-102', user: { name: 'Bob K.' }, totalPrice: 149.99, status: 'shipped', createdAt: '2026-03-03T15:30:00Z' },
    { _id: 'ORD-103', user: { name: 'Carol L.' }, totalPrice: 34.99, status: 'delivered', createdAt: '2026-03-02T11:00:00Z' },
    { _id: 'ORD-104', user: { name: 'Dan M.' }, totalPrice: 74.98, status: 'delivered', createdAt: '2026-03-01T09:45:00Z' },
]
const DEMO_PRODUCTS = [
    { _id: '1', name: 'Whey Protein Isolate', price: 49.99, category: 'Protein & Supplements', countInStock: 50 },
    { _id: '2', name: 'Premium Yoga Mat', price: 34.99, category: 'Yoga & Flexibility', countInStock: 30 },
    { _id: '3', name: 'Leather Gym Gloves', price: 24.99, category: 'Accessories', countInStock: 80 },
    { _id: '4', name: 'Adjustable Dumbbell Set', price: 149.99, category: 'Gym Equipment', countInStock: 15 },
]

const STATUS_COLORS = { processing: 'bg-amber-100 text-amber-700', shipped: 'bg-blue-100 text-blue-700', delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState(DEMO_STATS)
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        ; (async () => {
            try {
                const [o, p] = await Promise.all([orderService.getAllOrders(), productService.getProducts()])
                setOrders(o.orders || o || DEMO_ORDERS)
                setProducts(p.products || p || DEMO_PRODUCTS)
                if (o.orders) setStats({ totalOrders: o.total || o.orders.length, totalRevenue: o.orders.reduce((s, x) => s + (x.totalPrice || 0), 0), totalProducts: (p.products || p || []).length, totalUsers: 320 })
            } catch { setOrders(DEMO_ORDERS); setProducts(DEMO_PRODUCTS) }
            finally { setLoading(false) }
        })()
    }, [])

    const handleDeleteProduct = async (id) => {
        if (!confirm('Delete this product?')) return
        try { await productService.deleteProduct(id); setProducts(products.filter(p => p._id !== id)); toast.success('Product deleted') }
        catch { toast.error('Failed to delete') }
    }

    if (loading) return <LoadingSpinner />

    const statCards = [
        { icon: ShoppingCart, label: 'Total Orders', value: stats.totalOrders, color: 'from-blue-500 to-blue-600' },
        { icon: DollarSign, label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, color: 'from-primary-500 to-primary-600' },
        { icon: Package, label: 'Products', value: stats.totalProducts, color: 'from-amber-500 to-orange-500' },
        { icon: Users, label: 'Customers', value: stats.totalUsers, color: 'from-purple-500 to-pink-500' },
    ]

    return (
        <div className="min-h-screen bg-dark-50">
            <div className="bg-dark-900 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-primary-400" />
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <p className="text-dark-400 mt-1">Manage orders, products, and analytics</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {statCards.map((s) => (
                        <div key={s.label} className="bg-white border border-dark-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                            <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-3`}><s.icon className="w-5 h-5 text-white" /></div>
                            <p className="text-2xl font-bold text-dark-900">{s.value}</p>
                            <p className="text-xs text-dark-400 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white border border-dark-100 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-dark-900 mb-4">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-dark-100"><th className="text-left py-2 text-dark-500 font-medium">Order</th><th className="text-left py-2 text-dark-500 font-medium">Customer</th><th className="text-left py-2 text-dark-500 font-medium">Total</th><th className="text-left py-2 text-dark-500 font-medium">Status</th></tr></thead>
                                <tbody>
                                    {orders.slice(0, 6).map((o) => (
                                        <tr key={o._id} className="border-b border-dark-50 last:border-0">
                                            <td className="py-3 font-medium text-dark-900">#{o._id?.slice(-6)}</td>
                                            <td className="py-3 text-dark-600">{o.user?.name || 'Customer'}</td>
                                            <td className="py-3 font-semibold text-dark-900">${o.totalPrice?.toFixed(2)}</td>
                                            <td className="py-3"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${STATUS_COLORS[o.status] || 'bg-dark-100 text-dark-600'}`}>{o.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white border border-dark-100 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-dark-900 mb-4">Products</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-dark-100"><th className="text-left py-2 text-dark-500 font-medium">Product</th><th className="text-left py-2 text-dark-500 font-medium">Price</th><th className="text-left py-2 text-dark-500 font-medium">Stock</th><th className="text-left py-2 text-dark-500 font-medium"></th></tr></thead>
                                <tbody>
                                    {products.slice(0, 6).map((p) => (
                                        <tr key={p._id} className="border-b border-dark-50 last:border-0">
                                            <td className="py-3"><p className="font-medium text-dark-900 truncate max-w-[180px]">{p.name}</p><p className="text-xs text-dark-400">{p.category}</p></td>
                                            <td className="py-3 font-semibold text-dark-900">${p.price?.toFixed(2)}</td>
                                            <td className="py-3"><span className={`text-xs font-medium ${p.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>{p.countInStock > 0 ? p.countInStock : 'Out'}</span></td>
                                            <td className="py-3"><button onClick={() => handleDeleteProduct(p._id)} className="p-1.5 text-dark-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
