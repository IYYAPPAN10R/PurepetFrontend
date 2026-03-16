import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

// SVG Logo Icon (leaf/bottle shape)
function LogoIcon() {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="9" fill="url(#logoGrad)" />
            <path d="M18 7C18 7 12 12 12 19C12 22.866 14.686 26 18 26C21.314 26 24 22.866 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.9" />
            <path d="M18 7C18 7 16 14 20 18C21.5 19.5 22 21 21 23C22.8 21.5 24 20.3 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.3" />
            <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1a6fd4" />
                    <stop offset="1" stopColor="#0ea5e9" />
                </linearGradient>
            </defs>
        </svg>
    )
}

function Navbar() {
    const { user, logout } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully!')
        navigate('/')
        setMenuOpen(false)
    }

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/products', label: 'Products' },
        { to: '/sustainability', label: 'Sustainability' },
        { to: '/contact', label: 'Contact' },
    ]

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-inner">
                        <Link to="/" className="navbar-logo logo-pop" onClick={() => setMenuOpen(false)}>
                            <LogoIcon />
                            <span>
                                <span className="logo-text-pure">Pure</span><span className="logo-text-pet">Pet</span>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.95rem', marginLeft: 2 }}>Solutions</span>
                            </span>
                        </Link>

                        <div className="navbar-links">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === '/'}
                                    className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="navbar-actions">
                            {/* Cart icon */}
                            <Link to="/cart" className="cart-nav-btn" aria-label="Cart">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                                )}
                            </Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="btn btn-secondary btn-sm">
                                        {user.role === 'admin' ? 'Admin' : 'Dashboard'}
                                    </Link>
                                    <button onClick={handleLogout} className="btn btn-primary btn-sm">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
                                    <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
                                </>
                            )}
                        </div>

                        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                            <span style={{ opacity: menuOpen ? 0 : 1 }} />
                            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <NavLink
                        key={link.to} to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}
                <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
                    <Link to="/cart" className="cart-nav-btn" onClick={() => setMenuOpen(false)} aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar
