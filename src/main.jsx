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
                                borderRadius: '12px',
                                background: '#1f2937',
                                color: '#f9fafb',
                            },
                            success: {
                                iconTheme: { primary: '#059669', secondary: '#f9fafb' },
                            },
                            error: {
                                iconTheme: { primary: '#ef4444', secondary: '#f9fafb' },
                            },
                        }}
                    />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
