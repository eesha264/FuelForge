import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()

    const rating = product.rating || 0
    const reviewCount = product.numReviews || 0
    const imageUrl =
        product.image ||
        `https://placehold.co/400x400/065f46/ffffff?text=${encodeURIComponent(product.name?.slice(0, 12) || 'Product')}`

    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1 transition-all duration-300">
            {/* Image */}
            <Link to={`/products/${product._id}`} className="block relative overflow-hidden">
                <div className="aspect-square bg-dark-50">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                {product.countInStock === 0 && (
                    <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}
                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                        -{product.discount}%
                    </span>
                )}
            </Link>

            {/* Info */}
            <div className="p-4">
                <Link to={`/products/${product._id}`}>
                    <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-1">
                        {product.category || 'Fitness'}
                    </p>
                    <h3 className="text-sm font-semibold text-dark-900 line-clamp-2 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${s <= Math.round(rating)
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-dark-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] text-dark-400">({reviewCount})</span>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-dark-900">
                            ${product.price?.toFixed(2)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="ml-2 text-xs text-dark-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => addToCart(product, 1)}
                        disabled={product.countInStock === 0}
                        className="p-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-200 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-600/20"
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
