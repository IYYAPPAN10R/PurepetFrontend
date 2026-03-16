import { Link } from 'react-router-dom'

// SVG social icons
function LinkedInIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}

function TwitterIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    )
}

function YouTubeIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
        </svg>
    )
}

// SVG Logo Icon matching Navbar
function LogoIcon() {
    return (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="9" fill="url(#footerLogoGrad)" />
            <path d="M18 7C18 7 12 12 12 19C12 22.866 14.686 26 18 26C21.314 26 24 22.866 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.9" />
            <path d="M18 7C18 7 16 14 20 18C21.5 19.5 22 21 21 23C22.8 21.5 24 20.3 24 19C24 12 18 7 18 7Z" fill="white" fillOpacity="0.3" />
            <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0a57b8" />
                    <stop offset="1" stopColor="#059669" />
                </linearGradient>
            </defs>
        </svg>
    )
}

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo" style={{ marginBottom: 0 }}>
                            <LogoIcon />
                            <span>
                                <span className="logo-text-pure">Pure</span><span className="logo-text-pet">Pet</span>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}> Solutions</span>
                            </span>
                        </Link>
                        <p>
                            Manufacturing premium PET bottles with precision engineering and eco-friendly practices.
                            Committed to quality, innovation, and a sustainable future.
                        </p>
                        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                            <span>GST: 27AABCP1234C1Z5</span>
                            <span style={{ margin: '0 10px' }}>·</span>
                            <span>ISO 9001:2015 Certified</span>
                        </div>
                        <div className="footer-socials" style={{ marginTop: 20 }}>
                            <a href="#" className="footer-social-btn" aria-label="LinkedIn"><LinkedInIcon /></a>
                            <a href="#" className="footer-social-btn" aria-label="Twitter"><TwitterIcon /></a>
                            <a href="#" className="footer-social-btn" aria-label="Instagram"><InstagramIcon /></a>
                            <a href="#" className="footer-social-btn" aria-label="YouTube"><YouTubeIcon /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <nav className="footer-links">
                            <Link to="/about">About Us</Link>
                            <Link to="/sustainability">Sustainability</Link>
                            <Link to="/products">Products</Link>
                            <Link to="/contact">Contact Us</Link>
                        </nav>
                    </div>

                    <div className="footer-col">
                        <h4>Products</h4>
                        <nav className="footer-links">
                            <Link to="/products">Water Bottles</Link>
                            <Link to="/products">Beverage Bottles</Link>
                            <Link to="/products">Pharma Bottles</Link>
                            <Link to="/products">Food Containers</Link>
                            <Link to="/products">Custom Solutions</Link>
                        </nav>
                    </div>

                    <div className="footer-col">
                        <h4>Contact</h4>
                        <div className="footer-links">
                            <a href="mailto:info@purepet.com">info@purepet.com</a>
                            <a href="tel:+919876543210">+91 98765 43210</a>
                            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>
                                Industrial Area, Phase II,<br />Mumbai — 400001, India
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                                Mon – Sat: 9:00 AM – 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {year} PurePet Solutions Pvt. Ltd. All rights reserved.</p>
                    <p>Crafted with care for a sustainable future</p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Privacy Policy</a>
                        <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
