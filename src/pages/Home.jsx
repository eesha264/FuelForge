import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Headphones, Award, Dumbbell, Flame, Heart, Zap } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import productService from '../services/productService'

const DEMO_PRODUCTS = [
    { _id: '1', name: 'Whey Protein Isolate', price: 49.99, originalPrice: 59.99, category: 'Protein & Supplements', rating: 4.8, numReviews: 234, countInStock: 50, discount: 17, image: 'https://placehold.co/400x400/ccfbf1/0d9488?text=Whey+Protein' },
    { _id: '2', name: 'Premium Yoga Mat', price: 34.99, category: 'Yoga & Flexibility', rating: 4.6, numReviews: 189, countInStock: 30, image: 'https://placehold.co/400x400/ede9fe/7c3aed?text=Yoga+Mat' },
    { _id: '3', name: 'Leather Gym Gloves', price: 24.99, category: 'Accessories', rating: 4.5, numReviews: 156, countInStock: 80, image: 'https://placehold.co/400x400/fef3c7/d97706?text=Gym+Gloves' },
    { _id: '4', name: 'Resistance Band Set', price: 19.99, originalPrice: 29.99, category: 'Gym Equipment', rating: 4.7, numReviews: 312, countInStock: 100, discount: 33, image: 'https://placehold.co/400x400/ffe4e6/e11d48?text=Resistance+Bands' },
    { _id: '5', name: 'BCAA Energy Drink Mix', price: 29.99, category: 'Protein & Supplements', rating: 4.4, numReviews: 98, countInStock: 60, image: 'https://placehold.co/400x400/e0f2fe/0284c7?text=BCAA+Mix' },
    { _id: '6', name: 'Foam Roller Pro', price: 27.99, category: 'Yoga & Flexibility', rating: 4.3, numReviews: 145, countInStock: 45, image: 'https://placehold.co/400x400/f0fdfa/0d9488?text=Foam+Roller' },
    { _id: '7', name: 'Adjustable Dumbbell Set', price: 149.99, originalPrice: 199.99, category: 'Gym Equipment', rating: 4.9, numReviews: 420, countInStock: 15, discount: 25, image: 'https://placehold.co/400x400/ddd6fe/7c3aed?text=Dumbbells' },
    { _id: '8', name: 'Compression Sport Socks', price: 14.99, category: 'Apparel', rating: 4.2, numReviews: 78, countInStock: 200, image: 'https://placehold.co/400x400/fecdd3/e11d48?text=Sport+Socks' },
]

const benefits = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', bg: 'bg-sky-50', color: 'text-sky-500' },
    { icon: Shield, title: 'Quality Guarantee', desc: '30-day money back', bg: 'bg-primary-50', color: 'text-primary-500' },
    { icon: Headphones, title: '24/7 Support', desc: 'Expert assistance', bg: 'bg-accent-50', color: 'text-accent-500' },
    { icon: Award, title: 'Certified Products', desc: 'Lab-tested quality', bg: 'bg-warm-50', color: 'text-warm-400' },
]

const categories = [
    { icon: Flame, label: 'Protein & Supplements', bg: 'bg-gradient-to-br from-rose-50 to-rose-100', iconBg: 'bg-rose-200/60', iconColor: 'text-rose-500' },
    { icon: Heart, label: 'Yoga & Flexibility', bg: 'bg-gradient-to-br from-accent-50 to-accent-100', iconBg: 'bg-accent-200/60', iconColor: 'text-accent-500' },
    { icon: Dumbbell, label: 'Gym Equipment', bg: 'bg-gradient-to-br from-primary-50 to-primary-100', iconBg: 'bg-primary-200/60', iconColor: 'text-primary-600' },
    { icon: Zap, label: 'Accessories', bg: 'bg-gradient-to-br from-warm-50 to-warm-100', iconBg: 'bg-warm-200/60', iconColor: 'text-warm-400' },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try { const d = await productService.getFeaturedProducts(); setProducts(d.products || d || []) }
            catch { setProducts(DEMO_PRODUCTS) }
            finally { setLoading(false) }
        })()
    }, [])

    const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-20 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-100/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100/60 border border-primary-200/60 rounded-full text-primary-600 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Zap className="w-3.5 h-3.5" /> New Arrivals 2026
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-800 leading-tight mb-6">
                                Fuel Your
                                <span className="block bg-gradient-to-r from-primary-500 via-accent-400 to-rose-400 bg-clip-text text-transparent">Fitness Journey</span>
                            </h1>
                            <p className="text-dark-500 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                Premium fitness products designed to maximize your performance. From professional-grade supplements to essential workout gear.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <Link to="/products" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-200/50 hover:shadow-xl hover:shadow-primary-200/60 transition-all hover:-translate-y-0.5">
                                    Shop Now <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/products?category=Protein+%26+Supplements" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-dark-50 text-dark-700 font-semibold rounded-2xl border border-dark-200 shadow-sm transition-all">
                                    View Supplements
                                </Link>
                            </div>
                            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-100">
                                {[{ value: '10K+', label: 'Customers' }, { value: '500+', label: 'Products' }, { value: '4.9', label: 'Avg. Rating' }].map((stat) => (
                                    <div key={stat.label} className="text-center lg:text-left">
                                        <p className="text-2xl font-bold text-dark-800">{stat.value}</p>
                                        <p className="text-xs text-dark-400 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero visual */}
                        <div className="hidden lg:block relative">
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-4 bg-gradient-to-br from-primary-200/30 to-accent-200/20 rounded-[2rem] blur-2xl" />
                                <div className="relative w-full h-full bg-gradient-to-br from-primary-50 to-accent-50 rounded-[2rem] border border-primary-100/60 flex items-center justify-center overflow-hidden shadow-xl shadow-primary-100/20">
                                    <Dumbbell className="w-32 h-32 text-primary-300/40" />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent-100/20 to-transparent" />
                                </div>
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-rose-300 to-rose-400 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg shadow-rose-200/50 animate-bounce">25% OFF</div>
                                <div className="absolute -bottom-3 -left-3 bg-white border border-dark-100 text-dark-700 text-xs font-medium px-4 py-2 rounded-2xl shadow-lg">⭐ Top Rated</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-white border-y border-dark-100/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b) => (
                            <div key={b.title} className="flex items-center gap-3 group">
                                <div className={`w-11 h-11 ${b.bg} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                    <b.icon className={`w-5 h-5 ${b.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-dark-800">{b.title}</p>
                                    <p className="text-xs text-dark-400">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark-800 mb-3">Shop by Category</h2>
                        <p className="text-dark-500 max-w-lg mx-auto">Find exactly what you need for your fitness routine</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link key={cat.label} to={`/products?category=${encodeURIComponent(cat.label)}`}
                                className={`group relative overflow-hidden rounded-2xl p-6 ${cat.bg} border border-dark-100/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-100/30 transition-all duration-300`}>
                                <div className={`w-12 h-12 ${cat.iconBg} rounded-2xl flex items-center justify-center mb-3`}>
                                    <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                                </div>
                                <h3 className="text-sm font-semibold text-dark-800">{cat.label}</h3>
                                <p className="text-xs text-dark-400 mt-1 flex items-center gap-1 group-hover:text-primary-500 transition-colors">Shop now <ArrowRight className="w-3 h-3" /></p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-primary-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-dark-800 mb-2">Featured Products</h2>
                            <p className="text-dark-500">Our most popular fitness essentials</p>
                        </div>
                        <Link to="/products" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors">View All <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                    {loading ? <LoadingSpinner /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayProducts.slice(0, 8).map((p) => <ProductCard key={p._id} product={p} />)}
                        </div>
                    )}
                    <div className="mt-10 text-center sm:hidden">
                        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-md shadow-primary-200/40 transition-all">View All <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 rounded-3xl px-8 py-14 lg:px-16 lg:py-20 text-center shadow-xl shadow-primary-200/30">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-300/20 rounded-full blur-3xl" />
                        <div className="relative">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Start Your Fitness Journey Today</h2>
                            <p className="text-primary-100 max-w-2xl mx-auto mb-8">Join thousands of fitness enthusiasts who trust FuelForge. Get 15% off your first order!</p>
                            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-dark-50 text-primary-700 font-bold rounded-2xl shadow-xl transition-all hover:-translate-y-0.5">
                                Explore Products <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
