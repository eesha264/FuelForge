import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                fontFamily: 'Inter, sans-serif',
                                borderRadius: '14px',
                                background: '#fff',
                                color: '#262626',
                                border: '1px solid #e5e5e5',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                            },
                            success: { iconTheme: { primary: '#14b8a6', secondary: '#fff' } },
                            error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
                        }}
                    />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
