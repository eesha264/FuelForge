import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Dashboard from './pages/admin/Dashboard'

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

export default function App() {
    return (
        <Routes>
            {/* Auth page — no navbar/footer */}
            <Route path="/login" element={<Login />} />

            {/* All other pages with Navbar + Footer */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/products/:id" element={<Layout><ProductDetails /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />

            {/* Protected routes */}
            <Route path="/checkout" element={<Layout><ProtectedRoute><Checkout /></ProtectedRoute></Layout>} />
            <Route path="/orders" element={<Layout><ProtectedRoute><OrderHistory /></ProtectedRoute></Layout>} />
            <Route path="/profile" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<Layout><AdminRoute><Dashboard /></AdminRoute></Layout>} />

            {/* 404 */}
            <Route path="*" element={
                <Layout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <h1 className="text-6xl font-black text-dark-200 mb-4">404</h1>
                            <p className="text-dark-500 mb-6">Page not found</p>
                            <a href="/" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-colors">Go Home</a>
                        </div>
                    </div>
                </Layout>
            } />
        </Routes>
    )
}
