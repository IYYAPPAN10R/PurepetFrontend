const processSteps = [
    { num: '01', title: 'Raw Material Selection', desc: 'Premium FDA-grade PET resin selected from certified suppliers worldwide.' },
    { num: '02', title: 'Preform Design & Molding', desc: 'Precision injection molding produces perfect preforms with consistent wall thickness.' },
    { num: '03', title: 'Stretch Blow Molding', desc: 'Advanced SBM technology transforms preforms into finished PET bottles with perfect uniformity.' },
    { num: '04', title: 'Quality Inspection', desc: '100% leak, pressure, and dimensional testing on every single bottle before packaging.' },
    { num: '05', title: 'Packaging & Dispatch', desc: 'Hygienic packaging and timely dispatch to clients across India and internationally.' },
]

const coreValues = [
    {
        title: 'Precision',
        desc: "Every bottle is engineered to exact tolerances. Precision is not optional — it's our standard.",
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
    },
    {
        title: 'Sustainability',
        desc: 'Environmental responsibility is integrated into every decision we make.',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22c5-5 10-9 20-8C22 4 17 2 12 2 7 2 2 7 2 12c0 5 3 9 7 11" /><path d="M12 22c2-4 3-7 2-10" />
            </svg>
        ),
    },
    {
        title: 'Partnership',
        desc: 'We treat our clients as partners, collaborating for mutual long-term success.',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Innovation',
        desc: 'Continuous R&D investment keeps us ahead of industry trends and technology.',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
            </svg>
        ),
    },
]

// Initial avatar based on name
function TeamAvatar({ name, role }) {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    return (
        <div style={{
            width: 80,
            height: 80,
            background: 'var(--gradient-btn)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'white',
            fontFamily: 'var(--font-heading)',
            margin: '0 auto 16px',
            letterSpacing: '0.02em',
        }}>
            {initials}
        </div>
    )
}

const team = [
    { name: 'Arjun Mehta', role: 'CEO & Founder' },
    { name: 'Priya Sharma', role: 'Head of R&D' },
    { name: 'Ravi Kumar', role: 'Chief Engineer' },
    { name: 'Ananya Patel', role: 'Sustainability Director' },
]

function About() {
    return (
        <>
            <div className="page-hero">
                <div className="container">
                    <div className="section-tag">About Us</div>
                    <h1 className="page-hero-title">Our <span className="gradient-text">Story &amp; Mission</span></h1>
                    <p className="page-hero-subtitle">
                        Founded in 2009, PurePet Solutions has grown into a leading PET bottle manufacturer committed to quality, innovation, and sustainability.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <section className="section">
                <div className="container">
                    <div className="grid-2" style={{ gap: 32 }}>
                        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(26,111,212,0.06), rgba(14,165,233,0.04))', border: '1px solid rgba(26,111,212,0.1)' }}>
                            <div style={{ marginBottom: 16 }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>Our Mission</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                To manufacture the highest quality PET bottles that meet our clients' exact specifications, using eco-responsible processes that protect our planet for future generations. We aim to be India's most trusted packaging partner.
                            </p>
                        </div>
                        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.06), rgba(56,189,248,0.04))', border: '1px solid rgba(14,165,233,0.1)' }}>
                            <div style={{ marginBottom: 16 }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>Our Vision</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                To lead the global transition to sustainable PET packaging by 2030 — achieving 100% recycled material usage, net-zero carbon manufacturing, and setting the international standard for green packaging innovation.
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div style={{ marginTop: 60 }}>
                        <div className="section-header">
                            <div className="section-tag">Core Values</div>
                            <h2 className="section-title">What Drives Everything We Do</h2>
                        </div>
                        <div className="features-grid">
                            {coreValues.map(v => (
                                <div key={v.title} className="card feature-card">
                                    <div className="feature-icon">{v.svg}</div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Process */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Our Process</div>
                        <h2 className="section-title">How We Make <span>Perfect Bottles</span></h2>
                        <p className="section-subtitle">A rigorous 5-stage manufacturing process that guarantees excellence at every step.</p>
                    </div>
                    <div className="process-grid">
                        {processSteps.map(s => (
                            <div key={s.num} className="card process-step">
                                <div className="process-num">{s.num}</div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Our Team</div>
                        <h2 className="section-title">The People Behind <span>PurePet</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                        {team.map(m => (
                            <div key={m.name} className="card" style={{ textAlign: 'center' }}>
                                <TeamAvatar name={m.name} role={m.role} />
                                <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{m.name}</h3>
                                <p style={{ fontSize: 13, color: 'var(--secondary-light)' }}>{m.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-sm section-blue">
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { num: '2009', label: 'Year Established' },
                            { num: '50M+', label: 'Bottles Produced/Year' },
                            { num: '500+', label: 'Corporate Clients' },
                            { num: '30+', label: 'Countries Served' },
                            { num: '1500+', label: 'Employees' },
                            { num: '6', label: 'Manufacturing Plants' },
                        ].map(s => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-number gradient-text">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
