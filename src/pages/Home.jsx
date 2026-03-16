import { Link } from 'react-router-dom'
import Bottle3DComponent from '../components/Bottle3D'
import squareBottle from '../images/square-bottle-v1.png'
import roundBottle from '../images/round_bottle_v1.png'
import juiceBottle from '../images/juice-bottle-v1.png'

const highlights = [
    {
        title: 'Precision Manufacturing',
        desc: 'State-of-the-art blow molding technology producing consistently perfect PET bottles.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
    },
    {
        title: 'Eco-Friendly Practices',
        desc: '30% recycled PET usage, solar power, and zero-waste-to-landfill manufacturing policy.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22c5-5 10-9 20-8C22 4 17 2 12 2 7 2 2 7 2 12c0 5 3 9 7 11" /><path d="M12 22c2-4 3-7 2-10" />
            </svg>
        ),
    },
    {
        title: 'ISO 9001 Certified',
        desc: 'International quality management standards met across all production lines.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
    {
        title: 'Fast Delivery',
        desc: '15-21 day lead times for standard orders with express options available.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" /><rect x="9" y="11" width="14" height="10" rx="2" /><circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            </svg>
        ),
    },
    {
        title: 'Custom Designs',
        desc: 'Full custom mold development — bring your unique bottle concept to life.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
        ),
    },
    {
        title: 'Rigorous Testing',
        desc: '100% leak-proof and pressure testing on every batch before dispatch.',
        svg: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5m4 0h10m-6 0v6m0 0h2m-2 0H9" />
            </svg>
        ),
    },
]

const numbers = [
    { num: '50M+', label: 'Bottles/Year' },
    { num: '500+', label: 'Happy Clients' },
    { num: '15+', label: 'Years Experience' },
    { num: '30%', label: 'Recycled PET Used' },
]

function Home() {
    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-grid">
                        <div>
                            <div className="hero-tag">Eco-Friendly Manufacturing</div>
                            <h1 className="hero-title">
                                Premium <span className="gradient-text">PET Bottles</span> Built for the Future
                            </h1>
                            <p className="hero-subtitle">
                                PurePet Solutions delivers precision-engineered PET bottles for water, beverages, pharma, food, and industrial use — crafted with sustainability at the core.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/products" className="btn btn-primary btn-lg">Explore Products →</Link>
                                <Link to="/contact" className="btn btn-secondary btn-lg">Get a Quote</Link>
                            </div>
                            <div className="hero-stats">
                                {numbers.map(s => (
                                    <div key={s.label}>
                                        <div className="hero-stat-num gradient-text">{s.num}</div>
                                        <div className="hero-stat-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hero-visual" style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480 }}>
                            <div className="hero-bottles-container" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                                {/* Soft gradient background */}
                                <div style={{ position: 'absolute', inset: -50, background: 'radial-gradient(circle at center, rgba(186, 230, 253, 0.5) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

                                <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
                                    <Bottle3DComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Why Choose Us</div>
                        <h2 className="section-title">Built on <span>Quality &amp; Trust</span></h2>
                        <p className="section-subtitle">From raw material to finished bottle, every step reflects our commitment to excellence.</p>
                    </div>
                    <div className="features-grid">
                        {highlights.map(h => (
                            <div key={h.title} className="card feature-card">
                                <div className="feature-icon">{h.svg}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>{h.title}</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUSTAINABILITY TEASER */}
            <section className="section">
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(26,111,212,0.06) 0%, rgba(14,165,233,0.04) 100%)',
                        border: '1px solid rgba(26,111,212,0.15)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '60px 48px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 48,
                        alignItems: 'center',
                    }}>
                        <div>
                            <div className="section-tag" style={{ background: 'rgba(26,111,212,0.1)', borderColor: 'rgba(26,111,212,0.25)', color: 'var(--primary)' }}>Sustainability</div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 16 }}>
                                Making Packaging <span className="gradient-text">Greener</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                                We use 30% recycled PET content, solar-powered facilities, and a zero-waste manufacturing process. Our bottles are 100% recyclable, contributing to a circular economy.
                            </p>
                            <Link to="/sustainability" className="btn btn-outline-green" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Learn More →</Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { label: 'Solar Powered', val: '60%' },
                                { label: 'Recycled PET', val: '30%' },
                                { label: 'Water Saved', val: '40%' },
                                { label: 'CO₂ Reduced', val: '25%' },
                            ].map(s => (
                                <div key={s.label} style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(26,111,212,0.1)', borderRadius: 'var(--radius-md)', padding: 20, textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{s.val}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm section-blue">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title" style={{ color: '#fff' }}>Ready to Partner with PurePet?</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto 36px', color: 'rgba(255,255,255,0.9)' }}>
                        Join 500+ companies trusting PurePet Solutions for their packaging needs. Let's build something great together.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn-primary btn-lg">Contact Sales Team</Link>
                        <Link to="/signup" className="btn btn-secondary btn-lg">Create Free Account</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
