import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Truck,
    Shield,
    Headphones,
    Award,
    Dumbbell,
    Flame,
    Heart,
    Zap,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import productService from '../services/productService'

/* ── demo products (used when no backend is running) ── */
const DEMO_PRODUCTS = [
    { _id: '1', name: 'Whey Protein Isolate', price: 49.99, originalPrice: 59.99, category: 'Protein & Supplements', rating: 4.8, numReviews: 234, countInStock: 50, discount: 17, image: 'https://placehold.co/400x400/059669/ffffff?text=Whey+Protein' },
    { _id: '2', name: 'Premium Yoga Mat', price: 34.99, category: 'Yoga & Flexibility', rating: 4.6, numReviews: 189, countInStock: 30, image: 'https://placehold.co/400x400/047857/ffffff?text=Yoga+Mat' },
    { _id: '3', name: 'Leather Gym Gloves', price: 24.99, category: 'Accessories', rating: 4.5, numReviews: 156, countInStock: 80, image: 'https://placehold.co/400x400/065f46/ffffff?text=Gym+Gloves' },
    { _id: '4', name: 'Resistance Band Set', price: 19.99, originalPrice: 29.99, category: 'Gym Equipment', rating: 4.7, numReviews: 312, countInStock: 100, discount: 33, image: 'https://placehold.co/400x400/064e3b/ffffff?text=Resistance+Bands' },
    { _id: '5', name: 'BCAA Energy Drink Mix', price: 29.99, category: 'Protein & Supplements', rating: 4.4, numReviews: 98, countInStock: 60, image: 'https://placehold.co/400x400/10b981/ffffff?text=BCAA+Mix' },
    { _id: '6', name: 'Foam Roller Pro', price: 27.99, category: 'Yoga & Flexibility', rating: 4.3, numReviews: 145, countInStock: 45, image: 'https://placehold.co/400x400/34d399/ffffff?text=Foam+Roller' },
    { _id: '7', name: 'Adjustable Dumbbell Set', price: 149.99, originalPrice: 199.99, category: 'Gym Equipment', rating: 4.9, numReviews: 420, countInStock: 15, discount: 25, image: 'https://placehold.co/400x400/059669/ffffff?text=Dumbbells' },
    { _id: '8', name: 'Compression Sport Socks', price: 14.99, category: 'Apparel', rating: 4.2, numReviews: 78, countInStock: 200, image: 'https://placehold.co/400x400/047857/ffffff?text=Sport+Socks' },
]

const benefits = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Quality Guarantee', desc: '30-day money back' },
    { icon: Headphones, title: '24/7 Support', desc: 'Expert assistance' },
    { icon: Award, title: 'Certified Products', desc: 'Lab-tested quality' },
]

const categories = [
    { icon: Flame, label: 'Protein & Supplements', color: 'from-orange-500 to-red-500' },
    { icon: Heart, label: 'Yoga & Flexibility', color: 'from-pink-500 to-purple-500' },
    { icon: Dumbbell, label: 'Gym Equipment', color: 'from-primary-500 to-accent-500' },
    { icon: Zap, label: 'Accessories', color: 'from-amber-500 to-orange-500' },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getFeaturedProducts()
                setProducts(data.products || data || [])
            } catch {
                setProducts(DEMO_PRODUCTS)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS

    return (
        <div className="min-h-screen">
            {/* ── Hero ── */}
            <section className="relative bg-dark-900 overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-600/10 border border-primary-600/20 rounded-full text-primary-400 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Zap className="w-3.5 h-3.5" />
                                New Arrivals 2026
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                Fuel Your
                                <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                    Fitness Journey
                                </span>
                            </h1>
                            <p className="text-dark-300 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                Premium fitness products designed to maximize your performance. From professional-grade supplements to essential workout gear.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5"
                                >
                                    Shop Now <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/products?category=Protein+%26+Supplements"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-dark-800 hover:bg-dark-700 text-white font-semibold rounded-xl border border-dark-600 transition-all"
                                >
                                    View Supplements
                                </Link>
                            </div>
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-700">
                                {[
                                    { value: '10K+', label: 'Customers' },
                                    { value: '500+', label: 'Products' },
                                    { value: '4.9', label: 'Avg. Rating' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center lg:text-left">
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                        <p className="text-xs text-dark-400 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="hidden lg:block relative">
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-4 bg-gradient-to-br from-primary-600/30 to-accent-500/20 rounded-3xl blur-2xl" />
                                <div className="relative w-full h-full bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-dark-600 flex items-center justify-center overflow-hidden">
                                    <Dumbbell className="w-32 h-32 text-primary-500/30" />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-600/10 to-transparent" />
                                </div>
                                {/* Floating badges */}
                                <div className="absolute -top-3 -right-3 bg-accent-500 text-dark-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg animate-bounce">
                                    25% OFF
                                </div>
                                <div className="absolute -bottom-3 -left-3 bg-dark-800 border border-dark-600 text-white text-xs font-medium px-4 py-2 rounded-xl shadow-lg">
                                    ⭐ Top Rated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="bg-white border-b border-dark-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b) => (
                            <div key={b.title} className="flex items-center gap-3 group">
                                <div className="w-11 h-11 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                                    <b.icon className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-dark-900">{b.title}</p>
                                    <p className="text-xs text-dark-400">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Categories ── */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark-900 mb-3">Shop by Category</h2>
                        <p className="text-dark-500 max-w-lg mx-auto">Find exactly what you need for your fitness routine</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.label}
                                to={`/products?category=${encodeURIComponent(cat.label)}`}
                                className="group relative overflow-hidden rounded-2xl p-6 bg-dark-900 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                <div className="relative">
                                    <cat.icon className="w-8 h-8 text-white mb-3" />
                                    <h3 className="text-sm font-semibold text-white">{cat.label}</h3>
                                    <p className="text-xs text-dark-400 mt-1 flex items-center gap-1 group-hover:text-primary-400 transition-colors">
                                        Shop now <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="py-16 lg:py-20 bg-dark-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-dark-900 mb-2">Featured Products</h2>
                            <p className="text-dark-500">Our most popular fitness essentials</p>
                        </div>
                        <Link
                            to="/products"
                            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayProducts.slice(0, 8).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-10 text-center sm:hidden">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-colors"
                        >
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl px-8 py-14 lg:px-16 lg:py-20 text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl" />
                        <div className="relative">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Start Your Fitness Journey Today
                            </h2>
                            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
                                Join thousands of fitness enthusiasts who trust FuelForge for premium
                                products. Get 15% off your first order!
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-dark-50 text-primary-700 font-bold rounded-xl shadow-xl transition-all hover:-translate-y-0.5"
                            >
                                Explore Products <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
