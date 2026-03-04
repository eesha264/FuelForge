import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Cart() {
    const {
        items,
        coupon,
        removeFromCart,
        updateQty,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discount,
        cartTotal,
    } = useCart()
    const { isAuthenticated } = useAuth()
    const [couponCode, setCouponCode] = useState('')

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) return
        // Demo coupon
        if (couponCode.toUpperCase() === 'FUEL15') {
            applyCoupon({ code: 'FUEL15', discount: 15 })
        } else if (couponCode.toUpperCase() === 'FIT10') {
            applyCoupon({ code: 'FIT10', discount: 10 })
        } else {
            toast.error('Invalid coupon code')
        }
        setCouponCode('')
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-dark-50 flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="w-20 h-20 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-dark-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-dark-900 mb-2">Your cart is empty</h2>
                    <p className="text-dark-400 mb-8 max-w-sm mx-auto">
                        Looks like you haven't added any products yet. Start browsing our collection!
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all"
                    >
                        Browse Products <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-50">
            <div className="bg-dark-900 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
                    <p className="text-dark-400 mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white border border-dark-100 rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 hover:shadow-md transition-shadow"
                            >
                                <Link to={`/products/${item._id}`} className="shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-dark-50 rounded-xl overflow-hidden">
                                        <img
                                            src={
                                                item.image ||
                                                `https://placehold.co/200x200/059669/ffffff?text=${encodeURIComponent(item.name?.slice(0, 8))}`
                                            }
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <Link
                                                to={`/products/${item._id}`}
                                                className="text-sm sm:text-base font-semibold text-dark-900 hover:text-primary-600 transition-colors line-clamp-2"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-dark-400 mt-0.5">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-2 text-dark-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="flex items-center border border-dark-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateQty(item._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="p-2 hover:bg-dark-50 disabled:opacity-40 transition-colors"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="w-10 text-center text-sm font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQty(item._id, item.quantity + 1)}
                                                className="p-2 hover:bg-dark-50 transition-colors"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-lg font-bold text-dark-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-dark-400 hover:text-red-500 transition-colors mt-2"
                        >
                            Clear entire cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-dark-100 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-dark-900 mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-dark-500">Subtotal ({cartCount} items)</span>
                                    <span className="font-medium text-dark-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-dark-500">Shipping</span>
                                    <span className="font-medium text-primary-600">
                                        {subtotal >= 50 ? 'Free' : '$5.99'}
                                    </span>
                                </div>
                                {coupon && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-500 flex items-center gap-1">
                                            Discount ({coupon.code})
                                            <button
                                                onClick={removeCoupon}
                                                className="text-dark-300 hover:text-red-500"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                        <span className="font-medium text-red-500">
                                            -${discount.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Coupon */}
                            {!coupon && (
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Coupon code"
                                                className="w-full pl-10 pr-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyCoupon}
                                            className="px-4 py-2.5 bg-dark-900 hover:bg-dark-800 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    <p className="text-xs text-dark-400 mt-2">Try: FUEL15 or FIT10</p>
                                </div>
                            )}

                            <div className="border-t border-dark-100 pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-base font-bold text-dark-900">Total</span>
                                    <span className="text-xl font-bold text-dark-900">
                                        ${(cartTotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={isAuthenticated ? '/checkout' : '/login'}
                                className="block w-full text-center px-6 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                            >
                                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                            </Link>

                            <Link
                                to="/products"
                                className="block text-center text-sm text-dark-400 hover:text-primary-600 mt-4 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
