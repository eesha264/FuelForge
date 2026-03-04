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
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({})

    const validate = () => {
        const errs = {}
        if (!isLogin && !form.name.trim()) errs.name = 'Name is required'
        if (!form.email.trim()) errs.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format'
        if (!form.password) errs.password = 'Password is required'
        else if (form.password.length < 6) errs.password = 'Min 6 characters'
        if (!isLogin && form.password !== form.confirmPassword)
            errs.confirmPassword = 'Passwords do not match'
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            if (isLogin) {
                await login({ email: form.email, password: form.password })
            } else {
                await register({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                })
            }
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch (err) {
            toast.error(
                err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed`
            )
        } finally {
            setLoading(false)
        }
    }

    const inputClass = (field) =>
        `w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none transition-all ${errors[field]
            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
            : 'border-dark-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30'
        }`

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-12">
            {/* Background orbs */}
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                            <Dumbbell className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            Fuel<span className="text-primary-400">Forge</span>
                        </span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Tabs */}
                    <div className="flex bg-dark-100 rounded-xl p-1 mb-8">
                        <button
                            onClick={() => { setIsLogin(true); setErrors({}) }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isLogin
                                    ? 'bg-white text-dark-900 shadow-sm'
                                    : 'text-dark-500 hover:text-dark-700'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setErrors({}) }}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isLogin
                                    ? 'bg-white text-dark-900 shadow-sm'
                                    : 'text-dark-500 hover:text-dark-700'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className={inputClass('name')}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={inputClass('email')}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className={`${inputClass('password')} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                                    <input
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={(e) =>
                                            setForm({ ...form, confirmPassword: e.target.value })
                                        }
                                        className={inputClass('confirmPassword')}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-300 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 mt-2"
                        >
                            {loading
                                ? 'Please wait...'
                                : isLogin
                                    ? 'Sign In'
                                    : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-dark-400 mt-6">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setErrors({}) }}
                            className="text-primary-600 font-semibold hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
