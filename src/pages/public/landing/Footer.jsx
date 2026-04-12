export default function Footer() {
    const year = new Date().getFullYear();

    const links = {
        Product: [
            { name: 'Features', href: '/features' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Security', href: '/security' },
            { name: 'Changelog', href: '/changelog' },
        ],
        Company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Press', href: '/press' },
        ],
        Support: [
            { name: 'Documentation', href: '/docs' },
            { name: 'Help Center', href: '/help' },
            { name: 'Contact', href: '/contact' },
            { name: 'Status', href: '/status' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'GDPR', href: '/gdpr' },
        ],
    };

    return (
        <>
            <style>{`
                .premium-footer {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: linear-gradient(180deg, rgba(9, 14, 26, 0.95) 0%, #090E1A 100%);
                    position: relative;
                    overflow: hidden;
                }
                
                .premium-footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 800px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.4), rgba(249, 115, 22, 0.6), rgba(249, 115, 22, 0.4), transparent);
                }
                
                .premium-footer-glow {
                    position: absolute;
                    top: -150px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1000px;
                    height: 400px;
                    background: radial-gradient(ellipse, rgba(249, 115, 22, 0.06) 0%, transparent 70%);
                    pointer-events: none;
                }
                
                .premium-footer-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 80px 24px 40px;
                    position: relative;
                }
                
                .premium-footer-top {
                    display: grid;
                    grid-template-columns: 1.5fr repeat(4, 1fr);
                    gap: 48px;
                    margin-bottom: 64px;
                }
                
                .premium-footer-brand {}
                
                .premium-footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    text-decoration: none;
                    margin-bottom: 20px;
                }
                
                .premium-footer-logo-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #F97316, #EA580C);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
                }
                
                .premium-footer-logo-text {
                    font-size: 22px;
                    font-weight: 800;
                    color: #FFFFFF;
                    letter-spacing: -0.02em;
                }
                
                .premium-footer-logo-text span {
                    background: linear-gradient(135deg, #F97316, #FB923C);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .premium-footer-tagline {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 14px;
                    line-height: 1.8;
                    max-width: 260px;
                    margin-bottom: 28px;
                }
                
                .premium-footer-socials {
                    display: flex;
                    gap: 12px;
                }
                
                .premium-social-btn {
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                .premium-social-btn:hover {
                    background: rgba(249, 115, 22, 0.15);
                    border-color: rgba(249, 115, 22, 0.3);
                    color: #F97316;
                    transform: translateY(-3px);
                }
                
                .premium-footer-col h4 {
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                }
                
                .premium-footer-col ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                
                .premium-footer-col ul li a {
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    display: block;
                }
                
                .premium-footer-col ul li a:hover {
                    color: #F97316;
                    transform: translateX(4px);
                }
                
                .premium-footer-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
                    margin-bottom: 32px;
                }
                
                .premium-footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                
                .premium-footer-copy {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 14px;
                }
                
                .premium-footer-badges {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    flex-wrap: wrap;
                }
                
                .premium-badge {
                    padding: 8px 16px;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    border: 1px solid;
                }
                
                .premium-badge-orange {
                    color: #F97316;
                    border-color: rgba(249, 115, 22, 0.3);
                    background: rgba(249, 115, 22, 0.08);
                }
                
                .premium-badge-gold {
                    color: #FFB800;
                    border-color: rgba(255, 184, 0, 0.3);
                    background: rgba(255, 184, 0, 0.08);
                }
                
                .premium-badge-coral {
                    color: #FF6B6B;
                    border-color: rgba(255, 107, 107, 0.3);
                    background: rgba(255, 107, 107, 0.08);
                }
                
                @media (max-width: 1024px) {
                    .premium-footer-top {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }
                }
                
                @media (max-width: 640px) {
                    .premium-footer-top {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }
                    
                    .premium-footer-inner {
                        padding: 60px 20px 32px;
                    }
                    
                    .premium-footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <footer className="premium-footer">
                <div className="premium-footer-glow" />
                <div className="premium-footer-inner">
                    <div className="premium-footer-top">
                        <div className="premium-footer-brand">
                            <a href="/" className="premium-footer-logo">
                                <div className="premium-footer-logo-icon">
                                    <svg width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <span className="premium-footer-logo-text">Exam<span>Spot</span></span>
                            </a>
                            <p className="premium-footer-tagline">
                                India's most trusted examination platform for universities, colleges, and schools.
                            </p>
                            <div className="premium-footer-socials">
                                <a href="#" className="premium-social-btn" aria-label="Twitter">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="premium-social-btn" aria-label="LinkedIn">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" className="premium-social-btn" aria-label="YouTube">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {Object.entries(links).map(([category, items]) => (
                            <div key={category} className="premium-footer-col">
                                <h4>{category}</h4>
                                <ul>
                                    {items.map(item => (
                                        <li key={item.name}><a href={item.href}>{item.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="premium-footer-divider" />

                    <div className="premium-footer-bottom">
                        <p className="premium-footer-copy">
                            © {year} ExamSpot Technologies Pvt. Ltd. All rights reserved. Made with love in India.
                        </p>
                        <div className="premium-footer-badges">
                            <span className="premium-badge premium-badge-orange">GDPR Compliant</span>
                            <span className="premium-badge premium-badge-gold">ISO 27001</span>
                            <span className="premium-badge premium-badge-coral">99.9% Uptime</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
