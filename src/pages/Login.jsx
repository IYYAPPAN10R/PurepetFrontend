import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const validate = () => {
        const e = {}
        if (!form.email) e.email = 'Email is required'
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
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
            const { data } = await api.post('/auth/login', form)
            login(data.user, data.token)
            toast.success(`Welcome back, ${data.user.name}!`)
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="auth-wrapper">
            <div className="auth-card card-glass">
                <div className="auth-header">
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
                    <h1>Welcome Back!</h1>
                    <p>Sign in to your PurePet Solutions account</p>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            name="email" type="email"
                            value={form.email} onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="you@company.com"
                            autoComplete="email"
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="password" type={showPass ? 'text' : 'password'}
                                value={form.password} onChange={handleChange}
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                style={{ paddingRight: 48 }}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 18 }}>
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {errors.password && <p className="form-error">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/signup">Create one free</Link>
                </p>
                <p className="auth-footer-text" style={{ marginTop: 8 }}>
                    <Link to="/">← Back to Home</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
