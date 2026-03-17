import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

// -------- Admin: Product Form Modal --------
function ProductModal({ product, onClose, onSave }) {
    const isEdit = !!product?._id
    const [form, setForm] = useState(product || {
        name: '', capacity: '', material: 'PET (Polyethylene Terephthalate)',
        description: '', category: 'water', color: 'Clear / Transparent',
        weight: '', dimensions: '', inStock: true, countInStock: 0, image: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEdit) {
                await api.put(`/products/${product._id}`, form)
                toast.success('Product updated!')
            } else {
                await api.post('/products', form)
                toast.success('Product created!')
            }
            onSave()
            onClose()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save product.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{isEdit ? '✏️ Edit Product' : '➕ New Product'}</h3>
                    <button onClick={onClose} style={{ fontSize: 20, color: 'var(--text-muted)' }}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} className="form-input" required placeholder="AquaSlim 500ml" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Capacity *</label>
                            <input name="capacity" value={form.capacity} onChange={handleChange} className="form-input" required placeholder="500ml" />
                        </div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select name="category" value={form.category} onChange={handleChange} className="form-input filter-select">
                                {['water', 'beverage', 'pharma', 'food', 'chemical', 'custom'].map(c => (
                                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Color</label>
                            <input name="color" value={form.color} onChange={handleChange} className="form-input" placeholder="Clear / Transparent" />
                        </div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Weight</label>
                            <input name="weight" value={form.weight} onChange={handleChange} className="form-input" placeholder="18g" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Dimensions</label>
                            <input name="dimensions" value={form.dimensions} onChange={handleChange} className="form-input" placeholder="Ø65mm x H205mm" />
                        </div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Stock Count *</label>
                            <input type="number" name="countInStock" value={form.countInStock} onChange={handleChange} className="form-input" required min="0" />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
                            <input type="checkbox" name="inStock" id="inStock" checked={form.inStock} onChange={handleChange} />
                            <label htmlFor="inStock" className="form-label" style={{ margin: 0 }}>Manual In Stock Force</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="form-input" required rows={3} placeholder="Describe the product..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Product Image URL</label>
                        <input
                            name="image"
                            value={form.image || ''}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="https://example.com/bottle.png (optional)"
                        />
                        {form.image && form.image.trim() !== '' && (
                            <div style={{
                                marginTop: 10,
                                background: 'rgba(10,87,184,0.08)',
                                border: '1px solid rgba(10,87,184,0.2)',
                                borderRadius: 'var(--radius-md)',
                                padding: 10,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 6, background: '#0d1f3d' }}
                                    onError={e => { e.target.style.display = 'none' }}
                                />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Image preview — if blank, image URL may be invalid.</span>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 8 }}>
                        {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}

// -------- Dashboard --------
function Dashboard() {
    const { user, logout, updateUser } = useAuth()
    const [activeTab, setActiveTab] = useState('overview')
    const [products, setProducts] = useState([])
    const [messages, setMessages] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [showProductModal, setShowProductModal] = useState(false)
    const [msgStatusFilter, setMsgStatusFilter] = useState('all')
    const [orderStatusFilter, setOrderStatusFilter] = useState('all')
    const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '', company: user?.company || '' })
    const [profileLoading, setProfileLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        setLoadingData(true)
        try {
            const { data } = await api.get('/products', { params: { limit: 50 } })
            setProducts(data.products)
        } catch { toast.error('Failed to load products') }
        finally { setLoadingData(false) }
    }, [])

    const fetchMessages = useCallback(async () => {
        setLoadingData(true)
        try {
            const { data } = await api.get(`/contact?status=${msgStatusFilter}`)
            setMessages(data.messages)
        } catch { toast.error('Failed to load messages') }
        finally { setLoadingData(false) }
    }, [msgStatusFilter])

    const fetchOrders = useCallback(async () => {
        setLoadingData(true)
        try {
            const { data } = await api.get(`/orders?status=${orderStatusFilter}&limit=50`)
            setOrders(data.orders)
        } catch { toast.error('Failed to load orders') }
        finally { setLoadingData(false) }
    }, [orderStatusFilter])

    const fetchUsers = useCallback(async () => {
        setLoadingData(true)
        try {
            const { data } = await api.get('/auth/users')
            setUsers(data.users)
        } catch { toast.error('Failed to load users') }
        finally { setLoadingData(false) }
    }, [])

    const fetchRecommendations = useCallback(async () => {
        try {
            const { data } = await api.get('/ai/recommendations')
            setRecommendations(data.recommendations)
        } catch { /* silently fail */ }
    }, [])

    useEffect(() => {
        if (activeTab === 'products' || activeTab === 'overview') fetchProducts()
        if (activeTab === 'messages' && user?.role === 'admin') fetchMessages()
        if (activeTab === 'orders' && user?.role === 'admin') fetchOrders()
        if (activeTab === 'users' && user?.role === 'admin') fetchUsers()
        if (activeTab === 'overview') fetchRecommendations()
    }, [activeTab, fetchProducts, fetchMessages, fetchOrders, fetchUsers, fetchRecommendations, user])

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            await api.delete(`/products/${id}`)
            toast.success('Product deleted.')
            fetchProducts()
        } catch { toast.error('Failed to delete product.') }
    }

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to completely remove this user? This action cannot be undone.')) return
        try {
            await api.delete(`/auth/users/${id}`)
            toast.success('User removed.')
            fetchUsers()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to remove user.')
        }
    }

    const handleUpdateMsgStatus = async (id, status) => {
        try {
            await api.put(`/contact/${id}`, { status })
            setMessages(prev => prev.map(m => m._id === id ? { ...m, status } : m))
            toast.success('Status updated.')
        } catch { toast.error('Failed to update status.') }
    }

    const handleDeleteMsg = async (id) => {
        if (!window.confirm('Delete this message?')) return
        try {
            await api.delete(`/contact/${id}`)
            setMessages(prev => prev.filter(m => m._id !== id))
            toast.success('Message deleted.')
        } catch { toast.error('Failed to delete message.') }
    }

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setProfileLoading(true)
        try {
            const { data } = await api.put('/auth/me', profileForm)
            updateUser(data.user)
            toast.success('Profile updated!')
        } catch { toast.error('Failed to update profile.') }
        finally { setProfileLoading(false) }
    }

    const tabs = [
        { id: 'overview', label: '📊 Overview' },
        { id: 'products', label: '🧴 Products' },
        ...(user?.role === 'admin' ? [
            { id: 'messages', label: '📬 Messages' },
            { id: 'orders', label: '🛒 Orders' },
            { id: 'users', label: '👥 Users' },
        ] : []),
        { id: 'profile', label: '👤 Profile' },
    ]

    const statusColor = { unread: 'var(--error)', read: 'var(--warning)', replied: 'var(--success)' }

    return (
        <div className="dashboard-wrapper">
            <div className="container">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="dash-welcome">
                        <h1>
                            {user?.role === 'admin' ? '⚡' : '👋'} {user?.name}
                            {user?.role === 'admin' && <span className="badge badge-blue" style={{ marginLeft: 12, fontSize: 12 }}>ADMIN</span>}
                        </h1>
                        <p>Welcome to your PurePet Solutions Dashboard</p>
                    </div>
                    <button onClick={logout} className="btn btn-secondary btn-sm">🚪 Logout</button>
                </div>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    {tabs.map(t => (
                        <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div>
                        <div className="dashboard-grid" style={{ marginBottom: 32 }}>
                            <div className="dashboard-stat-card">
                                <div className="stat-icon bg-blue">🧴</div>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{products.length}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Products Available</div>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="stat-icon bg-green">✅</div>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{products.filter(p => p.inStock).length}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>In Stock</div>
                                </div>
                            </div>
                            <div className="dashboard-stat-card">
                                <div className="stat-icon bg-yellow">⭐</div>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{recommendations.length}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Recommendations For You</div>
                                </div>
                            </div>
                            {user?.role === 'admin' && (
                                <div className="dashboard-stat-card">
                                    <div className="stat-icon bg-red">📬</div>
                                    <div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{messages.filter(m => m.status === 'unread').length}</div>
                                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Unread Messages</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* AI Recommendations */}
                        {recommendations.length > 0 && (
                            <div>
                                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>🤖 AI Recommended For You</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                                    {recommendations.map(p => (
                                        <div key={p._id} className="card" style={{ padding: 16 }}>
                                            <div style={{ fontSize: 36, marginBottom: 10, textAlign: 'center' }}>🧴</div>
                                            <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{p.name}</h4>
                                            <p style={{ fontSize: 12, color: 'var(--secondary-light)' }}>{p.capacity}</p>
                                            <span className={`badge ${p.inStock ? 'badge-green' : 'badge-gray'}`} style={{ marginTop: 8 }}>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <h3 style={{ fontWeight: 700 }}>🧴 Product Catalog ({products.length})</h3>
                            {user?.role === 'admin' && (
                                <button className="btn btn-primary btn-sm" onClick={() => { setEditingProduct(null); setShowProductModal(true); }}>
                                    ➕ Add Product
                                </button>
                            )}
                        </div>
                        {loadingData ? <LoadingSpinner /> : (
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th><th>Category</th><th>Capacity</th><th>Stock</th><th>Status</th>
                                            {user?.role === 'admin' && <th>Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p._id}>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.color}</div>
                                                </td>
                                                <td><span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>{p.category}</span></td>
                                                <td style={{ color: 'var(--secondary-light)' }}>{p.capacity}</td>
                                                <td style={{ fontWeight: 700 }}>{p.countInStock}</td>
                                                <td><span className={`badge ${p.inStock ? 'badge-green' : 'badge-gray'}`}>{p.inStock ? 'In Stock' : 'Out of Stock'}</span></td>
                                                {user?.role === 'admin' && (
                                                    <td>
                                                        <div style={{ display: 'flex', gap: 8 }}>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => { setEditingProduct(p); setShowProductModal(true); }}>✏️ Edit</button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(p._id)}>🗑️</button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Messages Tab (Admin) */}
                {activeTab === 'messages' && user?.role === 'admin' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <h3 style={{ fontWeight: 700 }}>📬 Contact Messages</h3>
                            <select className="filter-select" value={msgStatusFilter} onChange={e => setMsgStatusFilter(e.target.value)}>
                                {['all', 'unread', 'read', 'replied'].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        {loadingData ? <LoadingSpinner /> : messages.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                                <div style={{ fontSize: 48 }}>📭</div>
                                <p style={{ marginTop: 12 }}>No messages found.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {messages.map(m => (
                                    <div key={m._id} className="card" style={{ padding: 20 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                                            <div>
                                                <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{m.subject}</h4>
                                                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>From: {m.name} ({m.email}){m.phone ? ` • ${m.phone}` : ''}</p>
                                                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{new Date(m.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: statusColor[m.status] }} />
                                                <select
                                                    className="filter-select"
                                                    style={{ fontSize: 12, padding: '4px 8px' }}
                                                    value={m.status}
                                                    onChange={e => handleUpdateMsgStatus(m._id, e.target.value)}
                                                >
                                                    {['unread', 'read', 'replied'].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMsg(m._id)}>🗑️</button>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{m.message}</p>
                                        {m.aiResponse && (
                                            <div style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--secondary-light)' }}>🤖 AI Response Sent:</span>
                                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.6 }}>{m.aiResponse}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab (Admin) */}
                {activeTab === 'orders' && user?.role === 'admin' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <h3 style={{ fontWeight: 700 }}>🛒 Bulk Order Requests ({orders.length})</h3>
                            <select className="filter-select" value={orderStatusFilter} onChange={e => setOrderStatusFilter(e.target.value)}>
                                {['all', 'pending', 'processing', 'completed', 'cancelled'].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        {loadingData ? <LoadingSpinner /> : orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                                <div style={{ fontSize: 48 }}>📭</div>
                                <p style={{ marginTop: 12 }}>No orders found.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {orders.map(o => {
                                    const statusColors = { pending: 'var(--warning)', processing: 'var(--primary)', completed: 'var(--success)', cancelled: 'var(--error)' }
                                    return (
                                        <div key={o._id} className="card" style={{ padding: 20 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{o.customerName} {o.companyName && <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 13 }}>· {o.companyName}</span>}</h4>
                                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{o.email}{o.phone ? ` · ${o.phone}` : ''}</p>
                                                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{new Date(o.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: statusColors[o.status] }} />
                                                    <select
                                                        className="filter-select"
                                                        style={{ fontSize: 12, padding: '4px 8px' }}
                                                        value={o.status}
                                                        onChange={async e => {
                                                            try {
                                                                await api.put(`/orders/${o._id}`, { status: e.target.value })
                                                                setOrders(prev => prev.map(x => x._id === o._id ? { ...x, status: e.target.value } : x))
                                                                toast.success('Status updated.')
                                                            } catch { toast.error('Failed to update order.') }
                                                        }}
                                                    >
                                                        {['pending', 'processing', 'completed', 'cancelled'].map(s => (
                                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                        ))}
                                                    </select>
                                                    <button className="btn btn-danger btn-sm" onClick={async () => {
                                                        if (!window.confirm('Delete this order?')) return
                                                        try {
                                                            await api.delete(`/orders/${o._id}`)
                                                            setOrders(prev => prev.filter(x => x._id !== o._id))
                                                            toast.success('Order deleted.')
                                                        } catch { toast.error('Failed to delete order.') }
                                                    }}>🗑️</button>
                                                </div>
                                            </div>
                                            {/* Ordered items */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                                                {o.items.map((item, i) => (
                                                    <span key={i} className="badge badge-blue" style={{ fontSize: 12 }}>
                                                        {item.productName} {item.capacity && `· ${item.capacity}`} × {item.quantity}
                                                    </span>
                                                ))}
                                            </div>
                                            {o.address && <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {o.address}</p>}
                                            {o.orderNotes && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, fontStyle: 'italic' }}>"{o.orderNotes}"</p>}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Users Tab (Admin) */}
                {activeTab === 'users' && user?.role === 'admin' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <h3 style={{ fontWeight: 700 }}>👥 Registered Users ({users.length})</h3>
                        </div>
                        {loadingData ? <LoadingSpinner /> : (
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User Details</th>
                                            <th>Role</th>
                                            <th>Last Login</th>
                                            <th>Joined Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id}>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</div>
                                                    {u.company && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>🏢 {u.company}</div>}
                                                    {u.phone && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📞 {u.phone}</div>}
                                                </td>
                                                <td>
                                                    <span className={`badge ${u.role === 'admin' ? 'badge-blue' : 'badge-green'}`}>
                                                        {u.role === 'admin' ? 'Admin' : 'User'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {u.lastLogin ? (
                                                        <div style={{ color: 'var(--text-primary)' }}>{new Date(u.lastLogin).toLocaleDateString()}</div>
                                                    ) : (
                                                        <div style={{ color: 'var(--text-muted)' }}>Never</div>
                                                    )}
                                                    {u.lastLogin && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(u.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                                                </td>
                                                <td style={{ color: 'var(--text-secondary)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    {user._id !== u._id ? (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDeleteUser(u._id)}
                                                            title="Remove User"
                                                        >
                                                            🗑️ Remove
                                                        </button>
                                                    ) : (
                                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>Current User</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div style={{ maxWidth: 560 }}>
                        <h3 style={{ fontWeight: 700, marginBottom: 24 }}>👤 My Profile</h3>
                        <div className="card" style={{ marginBottom: 20, padding: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{ width: 64, height: 64, background: 'var(--gradient-btn)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                                    {user?.role === 'admin' ? '⚡' : '👤'}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 700 }}>{user?.name}</h4>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user?.email}</p>
                                    <span className={`badge ${user?.role === 'admin' ? 'badge-blue' : 'badge-green'}`} style={{ marginTop: 4 }}>
                                        {user?.role === 'admin' ? '⚡ Admin' : '👤 User'}
                                    </span>
                                </div>
                            </div>
                            <form onSubmit={handleProfileSave}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input value={profileForm.company} onChange={e => setProfileForm(p => ({ ...p, company: e.target.value }))} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email (cannot be changed)</label>
                                    <input value={user?.email} className="form-input" disabled style={{ opacity: 0.5 }} />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                                    {profileLoading ? 'Saving...' : '💾 Save Changes'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Product Modal */}
                {showProductModal && (
                    <ProductModal
                        product={editingProduct}
                        onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
                        onSave={() => { fetchProducts(); }}
                    />
                )}
            </div>
        </div>
    )
}

export default Dashboard
