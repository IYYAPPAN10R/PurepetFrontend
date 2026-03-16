import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function Order() {
    const { cart, cartCount, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        customerName: user?.name || '',
        companyName: user?.company || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        orderNotes: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        if (cartCount === 0) {
            toast.error('Your cart is empty.')
            navigate('/products')
            return
        }

        setLoading(true)
        try {
            const items = cart.map(i => ({
                productId: i.product._id,
                productName: i.product.name,
                capacity: i.product.capacity || '',
                category: i.product.category || '',
                quantity: i.quantity,
            }))

            await api.post('/orders', { ...form, items })
            clearCart()
            toast.success('Order request submitted! Our team will contact you shortly.')
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (cartCount === 0) {
        navigate('/cart')
        return null
    }

    return (
        <div className="page-wrapper">
            <div className="page-hero" style={{ paddingBottom: 40 }}>
                <div className="container">
                    <div className="section-tag">Bulk Order</div>
                    <h1 className="page-hero-title">Request a <span className="gradient-text">Bulk Quote</span></h1>
                    <p className="page-hero-subtitle">Fill in your details and our team will reach out with a custom quote within 24 hours.</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 32 }}>
                <div className="container">
                    <div className="order-layout">

                        {/* Left: form */}
                        <div className="order-form-col">
                            <div className="card" style={{ padding: 32 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 24 }}>Your Details</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Full Name *</label>
                                            <input name="customerName" value={form.customerName} onChange={handleChange} className="form-input" required placeholder="Your full name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company Name</label>
                                            <input name="companyName" value={form.companyName} onChange={handleChange} className="form-input" placeholder="Your company (optional)" />
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Email *</label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" required placeholder="email@company.com" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone</label>
                                            <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 98765 43210" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Delivery Address *</label>
                                        <textarea name="address" value={form.address} onChange={handleChange} className="form-input" required rows={3} placeholder="Full delivery address including city, state, and pincode" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Order Notes</label>
                                        <textarea name="orderNotes" value={form.orderNotes} onChange={handleChange} className="form-input" rows={3} placeholder="Specific requirements, packaging preferences, deadlines..." />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 8 }}>
                                        {loading ? 'Submitting…' : 'Submit Bulk Order Request →'}
                                    </button>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
                                        By submitting, you agree to be contacted by our sales team.
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Right: order summary */}
                        <div className="order-summary-col">
                            <div className="card" style={{ padding: 24 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {cart.map(item => (
                                        <div key={item.product._id} className="order-summary-item">
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.product.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                                                    {item.product.capacity} · <span style={{ textTransform: 'capitalize' }}>{item.product.category}</span>
                                                </div>
                                            </div>
                                            <div className="order-summary-qty">×{item.quantity}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ borderTop: '1px solid var(--bg-border)', marginTop: 18, paddingTop: 16 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                                        <span>Total Units</span>
                                        <span style={{ color: 'var(--secondary-light)', fontSize: '1.1rem' }}>{cartCount}</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: 18, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', marginBottom: 4 }}>Custom B2B Pricing</div>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        Quote will be provided by our sales team based on quantities, specifications, and delivery requirements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
