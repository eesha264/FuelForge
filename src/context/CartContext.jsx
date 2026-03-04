import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cart')
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })
    const [coupon, setCoupon] = useState(null)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addToCart = (product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item._id === product._id)
            if (existing) {
                toast.success('Cart updated')
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            toast.success(`${product.name} added to cart`)
            return [...prev, { ...product, quantity }]
        })
    }

    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((item) => item._id !== productId))
        toast.success('Item removed from cart')
    }

    const updateQty = (productId, quantity) => {
        if (quantity < 1) return
        setItems((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
        setCoupon(null)
    }

    const applyCoupon = (couponData) => {
        setCoupon(couponData)
        toast.success(`Coupon "${couponData.code}" applied!`)
    }

    const removeCoupon = () => {
        setCoupon(null)
        toast.success('Coupon removed')
    }

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = coupon ? subtotal * (coupon.discount / 100) : 0
    const cartTotal = subtotal - discount

    return (
        <CartContext.Provider
            value={{
                items,
                coupon,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                applyCoupon,
                removeCoupon,
                cartCount,
                subtotal,
                discount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
