import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Star,
    ShoppingCart,
    Minus,
    Plus,
    ChevronRight,
    Truck,
    Shield,
    RotateCcw,
    Package,
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import ReviewCard from '../components/ReviewCard'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import productService from '../services/productService'
import toast from 'react-hot-toast'

const DEMO_PRODUCT = {
    _id: '1',
    name: 'Whey Protein Isolate — Chocolate',
    price: 49.99,
    originalPrice: 59.99,
    description:
        'Premium whey protein isolate with 25g protein per serving. Fast-absorbing, low in fat and carbs. Perfect for post-workout recovery. Available in rich chocolate flavor made with real cocoa.\n\n• 25g protein per serving\n• Low fat & carbs\n• Fast absorption\n• No artificial colors\n• Third-party tested',
    category: 'Protein & Supplements',
    rating: 4.8,
    numReviews: 234,
    countInStock: 50,
    discount: 17,
    image: 'https://placehold.co/600x600/059669/ffffff?text=Whey+Protein',
    images: [
        'https://placehold.co/600x600/059669/ffffff?text=Whey+Protein',
        'https://placehold.co/600x600/047857/ffffff?text=Side+View',
        'https://placehold.co/600x600/065f46/ffffff?text=Nutrition+Facts',
    ],
    reviews: [
        { _id: 'r1', name: 'John D.', rating: 5, comment: 'Best protein I\'ve ever tried! Great taste and mixes easily.', createdAt: '2026-02-15' },
        { _id: 'r2', name: 'Sarah M.', rating: 4, comment: 'Good quality protein. Slightly sweet but overall excellent.', createdAt: '2026-02-10' },
        { _id: 'r3', name: 'Mike R.', rating: 5, comment: 'Clean ingredients and great chocolate flavor. Will buy again!', createdAt: '2026-01-28' },
    ],
}

export default function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useCart()
    const { isAuthenticated } = useAuth()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [qty, setQty] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
    const [showReviewForm, setShowReviewForm] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const data = await productService.getProductById(id)
                setProduct(data.product || data)
            } catch {
                setProduct(DEMO_PRODUCT)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, qty)
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            toast.error('Please login to submit a review')
            return
        }
        try {
            await productService.createReview(id, reviewForm)
            toast.success('Review submitted!')
            setShowReviewForm(false)
            setReviewForm({ rating: 5, comment: '' })
        } catch {
            toast.error('Failed to submit review')
        }
    }

    if (loading) return <LoadingSpinner />
    if (!product)
        return (
            <div className="text-center py-20">
                <p className="text-dark-400 text-lg">Product not found</p>
            </div>
        )

    const images = product.images?.length > 0 ? product.images : [product.image]
    const reviews = product.reviews || []

    return (
        <div className="min-h-screen bg-dark-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-dark-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-dark-400">
                        <Link to="/" className="hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/products" className="hover:text-primary-600 transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-dark-700 font-medium truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Images */}
                    <div>
                        <div className="bg-white rounded-2xl border border-dark-100 overflow-hidden mb-4">
                            <div className="aspect-square">
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-3">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${i === selectedImage
                                                ? 'border-primary-500 shadow-lg shadow-primary-500/20'
                                                : 'border-dark-200 hover:border-dark-300'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <p className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-2">
                            {product.category}
                        </p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-dark-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className={`w-5 h-5 ${s <= Math.round(product.rating || 0)
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-dark-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-dark-500">
                                {product.rating?.toFixed(1)} ({product.numReviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-dark-900">
                                ${product.price?.toFixed(2)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <span className="text-lg text-dark-400 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2 mb-6">
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                            <span className="text-sm font-medium text-dark-600">
                                {product.countInStock > 0
                                    ? `In Stock (${product.countInStock} available)`
                                    : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-dark-600 text-sm leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity + Add to Cart */}
                        {product.countInStock > 0 && (
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border border-dark-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="p-3 hover:bg-dark-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-semibold">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQty(Math.min(product.countInStock, qty + 1))
                                        }
                                        className="p-3 hover:bg-dark-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                            </div>
                        )}

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: Truck, label: 'Free shipping over $50' },
                                { icon: Shield, label: 'Quality guarantee' },
                                { icon: RotateCcw, label: '30-day returns' },
                                { icon: Package, label: 'Secure packaging' },
                            ].map((b) => (
                                <div
                                    key={b.label}
                                    className="flex items-center gap-2.5 p-3 bg-dark-50 rounded-xl"
                                >
                                    <b.icon className="w-4 h-4 text-primary-600 shrink-0" />
                                    <span className="text-xs text-dark-600">{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-dark-900">
                            Customer Reviews ({reviews.length})
                        </h2>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="px-5 py-2.5 bg-dark-900 hover:bg-dark-800 text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                            Write a Review
                        </button>
                    </div>

                    {showReviewForm && (
                        <form
                            onSubmit={handleReviewSubmit}
                            className="bg-white border border-dark-100 rounded-2xl p-6 mb-8"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Rating
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() =>
                                                setReviewForm({ ...reviewForm, rating: s })
                                            }
                                        >
                                            <Star
                                                className={`w-6 h-6 cursor-pointer ${s <= reviewForm.rating
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-dark-200 hover:text-amber-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Comment
                                </label>
                                <textarea
                                    value={reviewForm.comment}
                                    onChange={(e) =>
                                        setReviewForm({ ...reviewForm, comment: e.target.value })
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 resize-none transition-all"
                                    placeholder="Share your experience with this product..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors"
                            >
                                Submit Review
                            </button>
                        </form>
                    )}

                    {reviews.length > 0 ? (
                        <div className="grid gap-4">
                            {reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-dark-400 text-center py-10">
                            No reviews yet. Be the first to review this product!
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
