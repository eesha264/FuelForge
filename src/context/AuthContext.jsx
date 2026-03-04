import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')
        if (savedToken && savedUser) {
            setToken(savedToken)
            try {
                setUser(JSON.parse(savedUser))
            } catch {
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (credentials) => {
        const data = await authService.login(credentials)
        setToken(data.token)
        setUser(data.user)
        toast.success(`Welcome back, ${data.user.name || 'User'}!`)
        return data
    }

    const register = async (userData) => {
        const data = await authService.register(userData)
        setToken(data.token)
        setUser(data.user)
        toast.success('Account created successfully!')
        return data
    }

    const logout = () => {
        authService.logout()
        setToken(null)
        setUser(null)
        toast.success('Logged out successfully')
    }

    const updateUser = (updatedUser) => {
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    const isAuthenticated = !!token
    const isAdmin = user?.role === 'admin'

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout, updateUser, isAuthenticated, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    )
}
