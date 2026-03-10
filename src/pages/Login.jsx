import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, Dumbbell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, register } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errs = {}
        if (!isLogin && !form.name.trim()) errs.name = 'Name is required'
        if (!form.email.trim()) errs.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
        if (!form.password) errs.password = 'Password is required'
        else if (form.password.length < 6) errs.password = 'Min 6 characters'
        if (!isLogin && form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
        setErrors(errs); return Object.keys(errs).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); if (!validate()) return; setLoading(true)
        try {
            isLogin ? await login({ email: form.email, password: form.password }) : await register({ name: form.name, email: form.email, password: form.password })
            navigate(location.state?.from?.pathname || '/', { replace: true })
        } catch (err) { toast.error(err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed`) }
        finally { setLoading(false) }
    }

    const inputCls = (f) => `w-full pl-10 pr-4 py-3 border rounded-2xl text-sm focus:outline-none transition-all ${errors[f] ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100' : 'border-dark-200/60 focus:border-primary-300 focus:ring-2 focus:ring-primary-100'}`

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-12">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-rose-100/20 rounded-full blur-3xl" />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl flex items-center justify-center shadow-md shadow-primary-200/50"><Dumbbell className="w-5 h-5 text-white" /></div>
                        <span className="text-2xl font-extrabold"><span className="text-dark-800">Fuel</span><span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Forge</span></span>
                    </Link>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-primary-100/20 border border-white/60 p-8">
                    <div className="flex bg-dark-100/50 rounded-2xl p-1 mb-8">
                        <button onClick={() => { setIsLogin(true); setErrors({}) }} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${isLogin ? 'bg-white text-dark-800 shadow-sm' : 'text-dark-500 hover:text-dark-700'}`}>Login</button>
                        <button onClick={() => { setIsLogin(false); setErrors({}) }} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${!isLogin ? 'bg-white text-dark-800 shadow-sm' : 'text-dark-500 hover:text-dark-700'}`}>Register</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name</label>
                                <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" /><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls('name')} placeholder="John Doe" /></div>
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">Email</label>
                            <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" /><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls('email')} placeholder="you@example.com" /></div>
                            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`${inputCls('password')} pr-10`} placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                            </div>
                            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
                        </div>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1.5">Confirm Password</label>
                                <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" /><input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className={inputCls('confirmPassword')} placeholder="••••••••" /></div>
                                {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:from-dark-200 disabled:to-dark-200 text-white font-semibold rounded-2xl shadow-lg shadow-primary-200/50 transition-all hover:-translate-y-0.5 mt-2">
                            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-dark-400 mt-6">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button onClick={() => { setIsLogin(!isLogin); setErrors({}) }} className="text-primary-600 font-semibold hover:underline">{isLogin ? 'Sign up' : 'Sign in'}</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
