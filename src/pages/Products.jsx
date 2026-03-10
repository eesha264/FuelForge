import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import productService from '../services/productService'

const ALL_CATEGORIES = ['All', 'Protein & Supplements', 'Yoga & Flexibility', 'Gym Equipment', 'Accessories', 'Apparel']
const SORT_OPTIONS = [{ value: 'newest', label: 'Newest' }, { value: 'price_asc', label: 'Price: Low → High' }, { value: 'price_desc', label: 'Price: High → Low' }, { value: 'rating', label: 'Highest Rated' }]

const DEMO_PRODUCTS = [
    { _id: '1', name: 'Whey Protein Isolate', price: 49.99, originalPrice: 59.99, category: 'Protein & Supplements', rating: 4.8, numReviews: 234, countInStock: 50, discount: 17, image: 'https://placehold.co/400x400/ccfbf1/0d9488?text=Whey+Protein' },
    { _id: '2', name: 'Premium Yoga Mat', price: 34.99, category: 'Yoga & Flexibility', rating: 4.6, numReviews: 189, countInStock: 30, image: 'https://placehold.co/400x400/ede9fe/7c3aed?text=Yoga+Mat' },
    { _id: '3', name: 'Leather Gym Gloves', price: 24.99, category: 'Accessories', rating: 4.5, numReviews: 156, countInStock: 80, image: 'https://placehold.co/400x400/fef3c7/d97706?text=Gym+Gloves' },
    { _id: '4', name: 'Resistance Band Set', price: 19.99, originalPrice: 29.99, category: 'Gym Equipment', rating: 4.7, numReviews: 312, countInStock: 100, discount: 33, image: 'https://placehold.co/400x400/ffe4e6/e11d48?text=Resistance+Bands' },
    { _id: '5', name: 'BCAA Energy Drink Mix', price: 29.99, category: 'Protein & Supplements', rating: 4.4, numReviews: 98, countInStock: 60, image: 'https://placehold.co/400x400/e0f2fe/0284c7?text=BCAA+Mix' },
    { _id: '6', name: 'Foam Roller Pro', price: 27.99, category: 'Yoga & Flexibility', rating: 4.3, numReviews: 145, countInStock: 45, image: 'https://placehold.co/400x400/f0fdfa/0d9488?text=Foam+Roller' },
    { _id: '7', name: 'Adjustable Dumbbell Set', price: 149.99, originalPrice: 199.99, category: 'Gym Equipment', rating: 4.9, numReviews: 420, countInStock: 15, discount: 25, image: 'https://placehold.co/400x400/ddd6fe/7c3aed?text=Dumbbells' },
    { _id: '8', name: 'Compression Sport Socks', price: 14.99, category: 'Apparel', rating: 4.2, numReviews: 78, countInStock: 200, image: 'https://placehold.co/400x400/fecdd3/e11d48?text=Sport+Socks' },
    { _id: '9', name: 'Pre-Workout Powder', price: 39.99, category: 'Protein & Supplements', rating: 4.6, numReviews: 201, countInStock: 40, image: 'https://placehold.co/400x400/ccfbf1/0d9488?text=Pre-Workout' },
    { _id: '10', name: 'Jump Rope Speed Pro', price: 12.99, category: 'Accessories', rating: 4.1, numReviews: 67, countInStock: 150, image: 'https://placehold.co/400x400/fef3c7/d97706?text=Jump+Rope' },
    { _id: '11', name: 'Yoga Block Set (2)', price: 16.99, category: 'Yoga & Flexibility', rating: 4.4, numReviews: 102, countInStock: 90, image: 'https://placehold.co/400x400/ede9fe/7c3aed?text=Yoga+Blocks' },
    { _id: '12', name: 'Kettlebell 20kg', price: 59.99, category: 'Gym Equipment', rating: 4.7, numReviews: 88, countInStock: 25, image: 'https://placehold.co/400x400/e0f2fe/0284c7?text=Kettlebell' },
]

const ITEMS_PER_PAGE = 8

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState(searchParams.get('category') || 'All')
    const [sort, setSort] = useState('newest')
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [page, setPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 500])

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const params = {}
                if (category && category !== 'All') params.category = category
                if (search) params.search = search
                if (sort) params.sort = sort
                params.page = page; params.limit = ITEMS_PER_PAGE
                const d = await productService.getProducts(params)
                setProducts(d.products || d || [])
            } catch { setProducts(DEMO_PRODUCTS) }
            finally { setLoading(false) }
        })()
    }, [category, sort, search, page])

    const filteredProducts = (() => {
        let items = products.length > 0 ? [...products] : [...DEMO_PRODUCTS]
        if (category && category !== 'All') items = items.filter(p => p.category === category)
        if (search) { const q = search.toLowerCase(); items = items.filter(p => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)) }
        items = items.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
        switch (sort) { case 'price_asc': items.sort((a, b) => a.price - b.price); break; case 'price_desc': items.sort((a, b) => b.price - a.price); break; case 'rating': items.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break }
        return items
    })()

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    const handleCategoryChange = (cat) => { setCategory(cat); setPage(1); const p = new URLSearchParams(searchParams); cat === 'All' ? p.delete('category') : p.set('category', cat); setSearchParams(p) }
    const handleSearchSubmit = (e) => { e.preventDefault(); setPage(1); const p = new URLSearchParams(searchParams); search ? p.set('search', search) : p.delete('search'); setSearchParams(p) }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-10 border-b border-primary-100/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-dark-800 mb-1">All Products</h1>
                    <p className="text-dark-500">{filteredProducts.length} products found</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
                                className="w-full md:w-80 pl-10 pr-10 py-2.5 bg-white border border-dark-200/60 rounded-2xl text-sm focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all" />
                            {search && <button type="button" onClick={() => { setSearch(''); const p = new URLSearchParams(searchParams); p.delete('search'); setSearchParams(p) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"><X className="w-4 h-4" /></button>}
                        </div>
                    </form>
                    <div className="flex items-center gap-3">
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2.5 bg-white border border-dark-200/60 rounded-2xl text-sm focus:outline-none focus:border-primary-300 cursor-pointer">
                            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-dark-200/60 rounded-2xl text-sm hover:bg-primary-50 transition-colors"><SlidersHorizontal className="w-4 h-4" />Filters</button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 shrink-0`}>
                        <div className="bg-white border border-dark-100/60 rounded-2xl p-5 sticky top-24 shadow-sm">
                            <h3 className="text-xs font-semibold text-dark-800 uppercase tracking-wider mb-4">Categories</h3>
                            <div className="space-y-1">
                                {ALL_CATEGORIES.map(cat => (
                                    <button key={cat} onClick={() => handleCategoryChange(cat)} className={`block w-full text-left px-3 py-2 text-sm rounded-xl transition-colors ${category === cat ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-dark-600 hover:bg-dark-50 hover:text-dark-800'}`}>{cat}</button>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-dark-100">
                                <h3 className="text-xs font-semibold text-dark-800 uppercase tracking-wider mb-4">Price Range</h3>
                                <div className="flex items-center gap-2">
                                    <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full px-3 py-2 border border-dark-200/60 rounded-xl text-sm focus:outline-none focus:border-primary-300" placeholder="Min" min={0} />
                                    <span className="text-dark-300">—</span>
                                    <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full px-3 py-2 border border-dark-200/60 rounded-xl text-sm focus:outline-none focus:border-primary-300" placeholder="Max" min={0} />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        {loading ? <LoadingSpinner /> : paginatedProducts.length === 0 ? (
                            <div className="text-center py-20"><p className="text-dark-400 text-lg mb-2">No products found</p><p className="text-dark-300 text-sm">Try adjusting your filters</p></div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedProducts.map(p => <ProductCard key={p._id} product={p} />)}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2.5 bg-white border border-dark-200/60 rounded-xl disabled:opacity-40 hover:bg-primary-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${p === page ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md shadow-primary-200/40' : 'bg-white border border-dark-200/60 text-dark-600 hover:bg-primary-50'}`}>{p}</button>
                                        ))}
                                        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2.5 bg-white border border-dark-200/60 rounded-xl disabled:opacity-40 hover:bg-primary-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
