import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

function Signup() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', company: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email) e.email = 'Email is required'
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            const { name, email, password, phone, company } = form
            const { data } = await api.post('/auth/signup', { name, email, password, phone, company })
            login(data.user, data.token)
            toast.success('Account created! Welcome to PurePet Solutions!')
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const strengthLevel = () => {
        const p = form.password
        if (!p) return 0
        let s = 0
        if (p.length >= 6) s++
        if (/[A-Z]/.test(p)) s++
        if (/[0-9]/.test(p)) s++
        if (/[^A-Za-z0-9]/.test(p)) s++
        return s
    }
    const strength = strengthLevel()
    const strengthColors = ['', '#ef4444', '#f59e0b', '#10b981', '#10b981']
    const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

    return (
        <div className="auth-wrapper">
            <div className="auth-card card-glass">
                <div className="auth-header">
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
                    <h1>Create Your Account</h1>
                    <p>Join PurePet Solutions today for free</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} className={`form-input ${errors.name ? 'error' : ''}`} placeholder="John Doe" />
                            {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address *</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="john@company.com" />
                            {errors.email && <p className="form-error">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Phone (Optional)</label>
                            <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 98765 43210" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company (Optional)</label>
                            <input name="company" value={form.company} onChange={handleChange} className="form-input" placeholder="Your Company Ltd." />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password *</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="password" type={showPass ? 'text' : 'password'}
                                value={form.password} onChange={handleChange}
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                placeholder="Min. 6 characters"
                                style={{ paddingRight: 48 }}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 18 }}>
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {form.password && (
                            <div style={{ marginTop: 8 }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength] : 'var(--bg-border)', transition: 'all 0.3s' }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 12, color: strengthColors[strength] }}>{strengthLabels[strength]} password</span>
                            </div>
                        )}
                        {errors.password && <p className="form-error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password *</label>
                        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className={`form-input ${errors.confirmPassword ? 'error' : ''}`} placeholder="Re-enter password" />
                        {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
                        {loading ? 'Creating Account...' : 'Create Account 🚀'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </p>
                <p className="auth-footer-text" style={{ marginTop: 8 }}>
                    <Link to="/">← Back to Home</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
