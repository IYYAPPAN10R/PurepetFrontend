import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Order from './pages/Order'
import LoadingSpinner from './components/LoadingSpinner'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner fullScreen />
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  const { loading } = useAuth()

  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('splashShown') === 'true'
  )

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true')
    setSplashDone(true)
  }

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        className="app-wrapper"
        style={!splashDone ? { visibility: 'hidden' } : undefined}
      >
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  )
}

export default App
