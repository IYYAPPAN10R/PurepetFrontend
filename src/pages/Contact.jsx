import { useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'

const contactInfo = [
    {
        label: 'Address', value: 'Industrial Area, Phase II, Mumbai - 400001, India',
        svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    },
    {
        label: 'Phone', value: '+91 98765 43210',
        svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l1.15-.98a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    },
    {
        label: 'Email', value: 'info@purepet.com',
        svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    },
    {
        label: 'Business Hours', value: 'Mon - Sat: 9:00 AM – 6:00 PM IST',
        svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    },
]

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [aiResponse, setAiResponse] = useState(null)

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.subject.trim()) e.subject = 'Subject is required'
        if (!form.message.trim()) e.message = 'Message is required'
        else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters'
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
            const { data } = await api.post('/contact', form)
            toast.success('Message sent successfully!')
            setAiResponse(data.aiResponse)
            setForm({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send message.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="page-hero">
                <div className="container">
                    <div className="section-tag">Contact Us</div>
                    <h1 className="page-hero-title">Get In <span className="gradient-text">Touch</span></h1>
                    <p className="page-hero-subtitle">Have a project in mind? We'd love to discuss how PurePet Solutions can serve your packaging needs.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Info Panel */}
                        <div>
                            <div className="contact-info-card">
                                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 28 }}>Contact Information</h3>
                                {contactInfo.map(info => (
                                    <div key={info.label} className="contact-info-item">
                                        <div className="contact-icon">{info.svg}</div>
                                        <div>
                                            <h4>{info.label}</h4>
                                            <p>{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card" style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(5,150,105,0.05))', borderColor: 'rgba(5,150,105,0.2)' }}>
                                <div style={{ marginBottom: 12 }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                </div>
                                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Quick Response</h4>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    Our AI assistant will send you an instant acknowledgment. Our sales team responds within 24 business hours.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="card">
                            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 24 }}>Send a Message</h3>
                            {aiResponse && (
                                <div style={{
                                    background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.3)',
                                    borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 24,
                                }}>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary-light)', marginBottom: 8 }}>AI Auto-Response:</div>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{aiResponse}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <input name="name" value={form.name} onChange={handleChange} className={`form-input ${errors.name ? 'error' : ''}`} placeholder="John Doe" />
                                        {errors.name && <p className="form-error">{errors.name}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input name="email" value={form.email} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="john@company.com" />
                                        {errors.email && <p className="form-error">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject *</label>
                                        <input name="subject" value={form.subject} onChange={handleChange} className={`form-input ${errors.subject ? 'error' : ''}`} placeholder="Bulk order inquiry..." />
                                        {errors.subject && <p className="form-error">{errors.subject}</p>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} className={`form-input ${errors.message ? 'error' : ''}`} placeholder="Tell us about your requirements..." />
                                    {errors.message && <p className="form-error">{errors.message}</p>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
