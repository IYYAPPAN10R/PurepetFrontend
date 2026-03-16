const ecoCards = [
    { icon: '♻', title: 'Recycled PET Content', desc: 'We integrate 30% recycled PET (rPET) into our standard product lines, significantly reducing virgin plastic consumption and carbon emissions.' },
    { icon: '☀', title: 'Solar Energy', desc: '60% of our manufacturing facilities run on solar power. We have installed 2MW of rooftop solar, generating clean energy year-round.' },
    { icon: '💧', title: 'Water Conservation', desc: 'Closed-loop water systems and advanced filtration units reduce water consumption by 40% compared to industry averages.' },
    { icon: '🌳', title: 'Zero Waste to Landfill', desc: 'Material recovery programs ensure zero production waste goes to landfill. All scrap PET, paper, and metals are recycled or repurposed.' },
    { icon: '🚛', title: 'Green Logistics', desc: 'Optimized delivery routes and CNG-powered trucks in our logistics fleet cut transportation emissions by over 20%.' },
    { icon: '🔬', title: 'Bio-Based Research', desc: 'Our R&D team is actively developing bio-based PET alternatives derived from 100% renewable plant sources for future product lines.' },
]

const certifications = [
    { name: 'ISO 9001:2015', desc: 'Quality Management System' },
    { name: 'ISO 14001:2015', desc: 'Environmental Management' },
    { name: 'BRC Packaging', desc: 'Global Food Safety Standard' },
    { name: 'FDA Approved', desc: 'Food-Grade Materials Certified' },
]

function Sustainability() {
    return (
        <>
            <div className="page-hero" style={{ background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <div className="section-tag" style={{ background: 'rgba(26,111,212,0.1)', borderColor: 'rgba(26,111,212,0.25)', color: 'var(--primary-dark)' }}>Sustainability</div>
                    <h1 className="page-hero-title">
                        Our Commitment to a <span className="gradient-text">Greener Future</span>
                    </h1>
                    <p className="page-hero-subtitle">
                        Sustainability is not a checkbox for us — it's embedded in our culture, processes, and every bottle we make.
                    </p>
                </div>
            </div>

            {/* Eco Initiatives */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Eco Initiatives</div>
                        <h2 className="section-title">How We Protect <span>Our Planet</span></h2>
                        <p className="section-subtitle">Six pillars of our comprehensive sustainability strategy.</p>
                    </div>
                    <div className="eco-grid">
                        {ecoCards.map(c => (
                            <div key={c.title} className="eco-card">
                                <div className="eco-icon">{c.icon}</div>
                                <h3 style={{ fontWeight: 700, margin: '0 0 10px' }}>{c.title}</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Numbers */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Our Impact</div>
                        <h2 className="section-title">Numbers That <span className="gradient-text">Matter</span></h2>
                    </div>
                    <div className="stats-grid">
                        {[
                            { num: '30%', label: 'Recycled PET Used' },
                            { num: '60%', label: 'Solar Power Utilization' },
                            { num: '40%', label: 'Water Consumption Reduced' },
                            { num: '25%', label: 'CO₂ Emissions Cut' },
                            { num: '100%', label: 'Bottles Recyclable' },
                            { num: '0', label: 'Waste to Landfill' },
                        ].map(s => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-number gradient-text">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Certifications</div>
                        <h2 className="section-title">Verified by <span>Global Standards</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                        {certifications.map(c => (
                            <div key={c.name} className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(26,111,212,0.06), rgba(14,165,233,0.04))' }}>
                                <div style={{ width: 52, height: 52, background: 'var(--gradient-btn)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                                <h3 style={{ fontWeight: 800, marginBottom: 8, color: 'var(--primary-light)' }}>{c.name}</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pledge Banner */}
            <section className="section-sm">
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(26,111,212,0.1), rgba(14,165,233,0.05))',
                        border: '1px solid rgba(26,111,212,0.2)',
                        borderRadius: 'var(--radius-xl)', padding: '48px',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            width: 72, height: 72, background: 'rgba(26,111,212,0.1)', borderRadius: '50%',
                            border: '1px solid rgba(26,111,212,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px',
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>Our 2030 Pledge</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
                            By 2030, PurePet Solutions commits to <strong style={{ color: 'var(--primary-dark)' }}>100% recycled or bio-based PET</strong>,
                            full renewable energy manufacturing, and becoming a completely <strong style={{ color: 'var(--primary-dark)' }}>carbon-neutral company</strong>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sustainability
