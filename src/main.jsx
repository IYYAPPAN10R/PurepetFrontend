import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0a1628',
                color: '#e2e8f0',
                border: '1px solid #1e3a5f',
                borderRadius: '14px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#0a1628' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#0a1628' } },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
