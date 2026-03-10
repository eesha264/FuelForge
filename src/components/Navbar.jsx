import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Search, ShoppingCart, User, Menu, X, LogOut, Package,
    Settings, LayoutDashboard, Dumbbell,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const menuRef = useRef(null)

    useEffect(() => {
        const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) { navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`); setSearchQuery(''); setMobileOpen(false) }
    }

    const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/') }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary-100/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md shadow-primary-200/50">
                            <Dumbbell className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight hidden sm:block">
                            <span className="text-dark-800">Fuel</span>
                            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Forge</span>
                        </span>
                    </Link>

                    {/* Desktop search */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                            <input
                                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search protein, yoga mats, gloves..."
                                className="w-full pl-10 pr-4 py-2.5 bg-dark-50 border border-dark-200/60 rounded-2xl text-sm text-dark-800 placeholder-dark-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                            />
                        </div>
                    </form>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/" className="px-4 py-2 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-colors">Home</Link>
                        <Link to="/products" className="px-4 py-2 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-colors">Products</Link>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-1.5 ml-4">
                        <Link to="/cart" className="relative p-2.5 text-dark-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-rose-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-md shadow-rose-200">{cartCount > 9 ? '9+' : cartCount}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative" ref={menuRef}>
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1.5 hover:bg-primary-50 rounded-xl transition-colors">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-300 to-accent-300 rounded-xl flex items-center justify-center shadow-sm">
                                        <span className="text-xs font-bold text-white">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                                    </div>
                                    <span className="hidden lg:block text-sm font-medium text-dark-700">{user?.name?.split(' ')[0]}</span>
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-dark-100 rounded-2xl shadow-xl shadow-dark-200/20 py-2 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-2.5 border-b border-dark-100">
                                            <p className="text-sm font-semibold text-dark-800 truncate">{user?.name}</p>
                                            <p className="text-xs text-dark-400 truncate">{user?.email}</p>
                                        </div>
                                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"><Settings className="w-4 h-4" />Profile</Link>
                                        <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"><Package className="w-4 h-4" />My Orders</Link>
                                        {isAdmin && <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"><LayoutDashboard className="w-4 h-4" />Dashboard</Link>}
                                        <div className="border-t border-dark-100 mt-1 pt-1">
                                            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors"><LogOut className="w-4 h-4" />Logout</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-semibold rounded-2xl transition-all shadow-md shadow-primary-200/50 hover:shadow-lg hover:shadow-primary-200/60">
                                <User className="w-4 h-4" /><span className="hidden sm:block">Login</span>
                            </Link>
                        )}

                        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2.5 text-dark-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-dark-100">
                    <div className="px-4 py-3">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 bg-dark-50 border border-dark-200/60 rounded-2xl text-sm text-dark-800 placeholder-dark-400 focus:outline-none focus:border-primary-300 transition-all" />
                            </div>
                        </form>
                    </div>
                    <div className="px-4 pb-4 space-y-1">
                        <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">Home</Link>
                        <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">Products</Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
