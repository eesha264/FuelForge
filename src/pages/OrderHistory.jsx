import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Eye, Calendar, DollarSign } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import orderService from '../services/orderService'

const STATUS_COLORS = {
    processing: 'bg-amber-100 text-amber-700',
    shipped: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    pending: 'bg-dark-100 text-dark-600',
}

const DEMO_ORDERS = [
    { _id: 'ORD-001', createdAt: '2026-02-28T10:00:00Z', totalPrice: 89.97, status: 'delivered', items: [{ name: 'Whey Protein Isolate', quantity: 1, price: 49.99 }, { name: 'Resistance Band Set', quantity: 2, price: 19.99 }] },
    { _id: 'ORD-002', createdAt: '2026-03-02T14:30:00Z', totalPrice: 34.99, status: 'shipped', items: [{ name: 'Premium Yoga Mat', quantity: 1, price: 34.99 }] },
    { _id: 'ORD-003', createdAt: '2026-03-04T09:15:00Z', totalPrice: 149.99, status: 'processing', items: [{ name: 'Adjustable Dumbbell Set', quantity: 1, price: 149.99 }] },
]

export default function OrderHistory() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        ; (async () => {
            try { const d = await orderService.getOrders(); setOrders(d.orders || d || []) }
            catch { setOrders(DEMO_ORDERS) }
            finally { setLoading(false) }
        })()
    }, [])

    if (loading) return <LoadingSpinner />

    return (
        <div className="min-h-screen bg-dark-50">
            <div className="bg-dark-900 py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">My Orders</h1>
                    <p className="text-dark-400 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4"><Package className="w-8 h-8 text-dark-300" /></div>
                        <h2 className="text-xl font-bold text-dark-900 mb-2">No orders yet</h2>
                        <p className="text-dark-400 mb-6">Start shopping to see your orders here</p>
                        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-colors">Browse Products</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white border border-dark-100 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center"><Package className="w-5 h-5 text-primary-600" /></div>
                                        <div>
                                            <p className="text-sm font-bold text-dark-900">Order #{order._id?.slice(-6)}</p>
                                            <div className="flex items-center gap-1 text-xs text-dark-400"><Calendar className="w-3 h-3" />{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>{order.status}</span>
                                        <div className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-dark-400" /><span className="text-lg font-bold text-dark-900">{order.totalPrice?.toFixed(2)}</span></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {(order.items || []).slice(0, 3).map((item, i) => (<span key={i} className="text-xs bg-dark-50 border border-dark-100 px-3 py-1.5 rounded-lg text-dark-600">{item.name} × {item.quantity}</span>))}
                                    {(order.items?.length || 0) > 3 && <span className="text-xs text-dark-400">+{order.items.length - 3} more</span>}
                                </div>
                                <button onClick={() => setSelected(selected === order._id ? null : order._id)} className="flex items-center gap-1 mt-4 text-xs text-primary-600 hover:text-primary-500 font-semibold transition-colors"><Eye className="w-3.5 h-3.5" />{selected === order._id ? 'Hide' : 'View'} Details</button>
                                {selected === order._id && (
                                    <div className="mt-4 pt-4 border-t border-dark-100 divide-y divide-dark-50">
                                        {(order.items || []).map((item, i) => (<div key={i} className="flex items-center justify-between py-2 text-sm"><span className="text-dark-600">{item.name} × {item.quantity}</span><span className="font-medium text-dark-900">${(item.price * item.quantity).toFixed(2)}</span></div>))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
