import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    LogOut,
    Package,
    Settings,
    LayoutDashboard,
    Dumbbell,
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
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setUserMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setMobileOpen(false)
        }
    }

    const handleLogout = () => {
        logout()
        setUserMenuOpen(false)
        navigate('/')
    }

    return (
        <nav className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 shadow-lg shadow-dark-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group shrink-0"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Dumbbell className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
                            Fuel<span className="text-primary-400">Forge</span>
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex flex-1 max-w-md mx-8"
                    >
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search protein, yoga mats, gloves..."
                                className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-600 rounded-xl text-sm text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                            />
                        </div>
                    </form>

                    {/* Desktop Nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className="px-3 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="px-3 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
                        >
                            Products
                        </Link>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 ml-4">
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2.5 text-dark-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User menu */}
                        {isAuthenticated ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
                                >
                                    <div className="w-7 h-7 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <span className="hidden lg:block text-sm font-medium">
                                        {user?.name?.split(' ')[0] || 'User'}
                                    </span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-dark-800 border border-dark-600 rounded-xl shadow-2xl shadow-black/40 py-2 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-2 border-b border-dark-700">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs text-dark-400 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                            Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                                        >
                                            <Package className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                        {isAdmin && (
                                            <Link
                                                to="/admin/dashboard"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <div className="border-t border-dark-700 mt-1 pt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/20"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:block">Login</span>
                            </Link>
                        )}

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-dark-800 border-t border-dark-700 animate-in slide-in-from-top-2">
                    <div className="px-4 py-3">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-600 rounded-xl text-sm text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-all"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="px-4 pb-4 space-y-1">
                        <Link
                            to="/"
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                        >
                            Products
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
