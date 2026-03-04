import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck, CheckCircle, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import orderService from '../services/orderService'
import toast from 'react-hot-toast'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
    const navigate = useNavigate()
    const { items, subtotal, discount, cartTotal, coupon, clearCart } = useCart()
    const [step, setStep] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const [shipping, setShipping] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        phone: '',
    })

    const [payment, setPayment] = useState({
        method: 'card',
        cardNumber: '',
        expiry: '',
        cvv: '',
    })

    const shippingCost = subtotal >= 50 ? 0 : 5.99
    const total = cartTotal + shippingCost

    const validateShipping = () => {
        const required = ['fullName', 'address', 'city', 'state', 'zipCode', 'phone']
        for (const field of required) {
            if (!shipping[field].trim()) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
                return false
            }
        }
        return true
    }

    const validatePayment = () => {
        if (payment.method === 'card') {
            if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
                toast.error('Please fill in all card details')
                return false
            }
        }
        return true
    }

    const handleNext = () => {
        if (step === 0 && !validateShipping()) return
        if (step === 1 && !validatePayment()) return
        setStep(step + 1)
    }

    const handlePlaceOrder = async () => {
        setSubmitting(true)
        try {
            const orderData = {
                items: items.map((item) => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image,
                })),
                shippingAddress: shipping,
                paymentMethod: payment.method,
                itemsPrice: subtotal,
                shippingPrice: shippingCost,
                discount,
                totalPrice: total,
                coupon: coupon?.code,
            }
            await orderService.createOrder(orderData)
            clearCart()
            toast.success('Order placed successfully!')
            navigate('/orders')
        } catch {
            toast.success('Order placed! (Demo mode)')
            clearCart()
            navigate('/')
        } finally {
            setSubmitting(false)
        }
    }

    if (items.length === 0) {
        navigate('/cart')
        return null
    }

    return (
        <div className="min-h-screen bg-dark-50">
            <div className="bg-dark-900 py-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
                    {/* Steps */}
                    <div className="flex items-center justify-between">
                        {STEPS.map((label, i) => (
                            <div key={label} className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-dark-700 text-dark-400'
                                            }`}
                                    >
                                        {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                    </div>
                                    <span
                                        className={`text-sm font-medium hidden sm:block ${i <= step ? 'text-white' : 'text-dark-500'
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-dark-600 mx-2 sm:mx-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-8">
                    {/* Step 0: Shipping */}
                    {step === 0 && (
                        <div className="bg-white border border-dark-100 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="w-5 h-5 text-primary-600" />
                                <h2 className="text-lg font-bold text-dark-900">Shipping Address</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={shipping.fullName}
                                        onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">Address</label>
                                    <input
                                        type="text"
                                        value={shipping.address}
                                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="123 Main Street"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">City</label>
                                    <input
                                        type="text"
                                        value={shipping.city}
                                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">State</label>
                                    <input
                                        type="text"
                                        value={shipping.state}
                                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="NY"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">ZIP Code</label>
                                    <input
                                        type="text"
                                        value={shipping.zipCode}
                                        onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="10001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-1.5">Phone</label>
                                    <input
                                        type="tel"
                                        value={shipping.phone}
                                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Payment */}
                    {step === 1 && (
                        <div className="bg-white border border-dark-100 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-5 h-5 text-primary-600" />
                                <h2 className="text-lg font-bold text-dark-900">Payment Method</h2>
                            </div>

                            <div className="space-y-3 mb-6">
                                {[
                                    { value: 'card', label: 'Credit / Debit Card' },
                                    { value: 'paypal', label: 'PayPal' },
                                    { value: 'cod', label: 'Cash on Delivery' },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${payment.method === opt.value
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-dark-200 hover:border-dark-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={opt.value}
                                            checked={payment.method === opt.value}
                                            onChange={(e) =>
                                                setPayment({ ...payment, method: e.target.value })
                                            }
                                            className="accent-primary-600"
                                        />
                                        <span className="text-sm font-medium text-dark-900">
                                            {opt.label}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {payment.method === 'card' && (
                                <div className="space-y-4 pt-4 border-t border-dark-100">
                                    <div>
                                        <label className="block text-sm font-medium text-dark-700 mb-1.5">Card Number</label>
                                        <input
                                            type="text"
                                            value={payment.cardNumber}
                                            onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                            placeholder="4242 4242 4242 4242"
                                            maxLength={19}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dark-700 mb-1.5">Expiry</label>
                                            <input
                                                type="text"
                                                value={payment.expiry}
                                                onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-dark-700 mb-1.5">CVV</label>
                                            <input
                                                type="text"
                                                value={payment.cvv}
                                                onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                                placeholder="123"
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Review */}
                    {step === 2 && (
                        <div className="space-y-6">
                            {/* Items */}
                            <div className="bg-white border border-dark-100 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-dark-900 mb-4">Order Items</h2>
                                <div className="divide-y divide-dark-100">
                                    {items.map((item) => (
                                        <div key={item._id} className="flex items-center gap-4 py-3">
                                            <div className="w-14 h-14 bg-dark-50 rounded-lg overflow-hidden shrink-0">
                                                <img
                                                    src={item.image || `https://placehold.co/100x100/059669/ffffff?text=${encodeURIComponent(item.name?.slice(0, 6))}`}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-dark-900 truncate">{item.name}</p>
                                                <p className="text-xs text-dark-400">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-dark-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping summary */}
                            <div className="bg-white border border-dark-100 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-dark-900 mb-3">Shipping Details</h2>
                                <p className="text-sm text-dark-600">{shipping.fullName}</p>
                                <p className="text-sm text-dark-600">{shipping.address}</p>
                                <p className="text-sm text-dark-600">{shipping.city}, {shipping.state} {shipping.zipCode}</p>
                                <p className="text-sm text-dark-600">{shipping.phone}</p>
                            </div>

                            {/* Payment summary */}
                            <div className="bg-white border border-dark-100 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-dark-900 mb-3">Payment</h2>
                                <p className="text-sm text-dark-600 capitalize">{payment.method === 'cod' ? 'Cash on Delivery' : payment.method === 'paypal' ? 'PayPal' : `Card ending in ${payment.cardNumber?.slice(-4) || '****'}`}</p>
                            </div>

                            {/* Totals */}
                            <div className="bg-white border border-dark-100 rounded-2xl p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-500">Subtotal</span>
                                        <span className="text-dark-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-500">Shipping</span>
                                        <span className="text-dark-900">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-500">Discount</span>
                                            <span className="text-red-500">-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-base font-bold pt-3 border-t border-dark-100">
                                        <span className="text-dark-900">Total</span>
                                        <span className="text-dark-900">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-2.5 bg-dark-100 hover:bg-dark-200 text-dark-700 text-sm font-semibold rounded-xl transition-colors"
                            >
                                Back
                            </button>
                        ) : (
                            <div />
                        )}
                        {step < 2 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-300 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all"
                            >
                                {submitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
