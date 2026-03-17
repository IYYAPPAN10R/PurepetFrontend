import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Fallback images by category
import roundBottle1 from '../images/round_bottle_v1.png'
import roundBottle2 from '../images/round_bottle_v2.png'
import squareBottle from '../images/square-bottle-v1.png'
import juiceBottle from '../images/juice-bottle-v1.png'
import customImg from '../images/custom-solutions.png'
import defaultImg from '../images/bottles-v0.png'

const FALLBACK = { water: roundBottle1, beverage: juiceBottle, pharma: roundBottle2, food: squareBottle, chemical: squareBottle, custom: customImg }

function CartItemImage({ item }) {
    const src = (item.product.image && item.product.image.trim())
        ? item.product.image
        : FALLBACK[item.product.category] || defaultImg
    return (
        <img
            src={src}
            alt={item.product.name}
            className="cart-item-img"
            onError={e => { e.target.src = FALLBACK[item.product.category] || defaultImg }}
        />
    )
}

export default function Cart() {
    const { cart, removeFromCart, updateQty, cartCount } = useCart()
    const navigate = useNavigate()
    const { user } = useAuth()

    if (cart.length === 0) {
        return (
            <div className="cart-empty-wrapper">
                <div className="cart-empty">
                    <div className="cart-empty-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </div>
                    <h2>Your cart is empty</h2>
                    <p>Browse our product range and add items to your cart.</p>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-block' }}>
                        Browse Products →
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="page-wrapper">
            <div className="page-hero" style={{ paddingBottom: 40 }}>
                <div className="container">
                    <div className="section-tag">Bulk Order Cart</div>
                    <h1 className="page-hero-title">Your <span className="gradient-text">Cart</span></h1>
                    <p className="page-hero-subtitle">{cartCount} item{cartCount !== 1 ? 's' : ''} selected for bulk order request</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 32 }}>
                <div className="container">
                    <div className="cart-layout">
                        {/* Cart items */}
                        <div className="cart-items-col">
                            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                {cart.map((item, idx) => (
                                    <div key={item.product._id} className={`cart-item-row ${idx < cart.length - 1 ? 'cart-item-row--bordered' : ''}`}>
                                        <CartItemImage item={item} />
                                            <div className="cart-item-info">
                                                <div className="cart-item-name">{item.product.name}</div>
                                                <div className="cart-item-meta">
                                                    <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{item.product.category}</span>
                                                    {item.product.capacity && <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{item.product.capacity}</span>}
                                                </div>
                                                {item.quantity > item.product.countInStock && (
                                                    <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 4, fontWeight: 'bold' }}>
                                                        ⚠️ Only {item.product.countInStock} available in stock.
                                                    </div>
                                                )}
                                            </div>
                                        <div className="cart-qty-stepper">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQty(item.product._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                            >−</button>
                                            <input
                                                type="number"
                                                className="qty-input"
                                                value={item.quantity}
                                                min={1}
                                                onChange={e => updateQty(item.product._id, e.target.value)}
                                                aria-label="Quantity"
                                            />
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQty(item.product._id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >+</button>
                                        </div>
                                        <button
                                            className="cart-remove-btn"
                                            onClick={() => removeFromCart(item.product._id)}
                                            aria-label="Remove item"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary sidebar */}
                        <div className="cart-summary-col">
                            <div className="card cart-summary-card">
                                <h3 className="cart-summary-title">Order Summary</h3>
                                <div className="cart-summary-lines">
                                    {cart.map(item => (
                                        <div key={item.product._id} className="cart-summary-line">
                                            <span className="cart-summary-pname">{item.product.name}</span>
                                            <span className="cart-summary-qty">×{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-summary-divider" />
                                <div className="cart-summary-total">
                                    <span>Total Units</span>
                                    <span className="cart-total-count">{cartCount}</span>
                                </div>
                                <p className="cart-summary-note">
                                    This is a B2B bulk order request. Our team will contact you with a custom quote.
                                </p>
                                {user ? (
                                    <button
                                        className="btn btn-primary btn-full"
                                        style={{ marginTop: 16 }}
                                        onClick={() => navigate('/order')}
                                        disabled={cart.some(item => item.quantity > item.product.countInStock)}
                                    >
                                        {cart.some(item => item.quantity > item.product.countInStock) ? '⚠ Insufficient Stock' : 'Place Bulk Order Request →'}
                                    </button>
                                ) : (
                                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <Link to="/login" className="btn btn-primary btn-full" style={{ textAlign: 'center' }}>
                                            Login to Place Order
                                        </Link>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                                            Or <Link to="/signup" style={{ color: 'var(--secondary-light)' }}>create a free account</Link>
                                        </p>
                                    </div>
                                )}
                                <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: 13, color: 'var(--text-muted)' }}>
                                    ← Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
