import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > 80) {
                        setScrolled(true);
                        if (currentScrollY > lastScrollY.current) {
                            setVisible(false);
                        } else {
                            setVisible(true);
                        }
                    } else {
                        setScrolled(false);
                        setVisible(true);
                    }
                    
                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'About', path: '/about' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                
                .premium-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 48px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .premium-nav::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(9, 14, 26, 0.8);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                
                .premium-nav.scrolled::before {
                    opacity: 1;
                }
                
                .premium-nav.hidden {
                    transform: translateY(-100%);
                }
                
                .premium-nav.visible {
                    transform: translateY(0);
                }
                
                .premium-nav-content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .premium-nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    text-decoration: none;
                }
                
                .premium-nav-logo-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #F97316, #EA580C);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
                    transition: all 0.3s ease;
                }
                
                .premium-nav-logo:hover .premium-nav-logo-icon {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
                }
                
                .premium-nav-logo-text {
                    font-size: 22px;
                    font-weight: 800;
                    color: #FFFFFF;
                    letter-spacing: -0.02em;
                }
                
                .premium-nav-logo-text span {
                    background: linear-gradient(135deg, #F97316, #FB923C);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .premium-nav-links {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .premium-nav-link {
                    padding: 10px 18px;
                    font-size: 15px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }
                
                .premium-nav-link:hover {
                    color: #FFFFFF;
                    background: rgba(255, 255, 255, 0.08);
                }
                
                .premium-nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .premium-btn-signin {
                    padding: 12px 24px;
                    font-size: 15px;
                    font-weight: 600;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    transition: all 0.3s ease;
                }
                
                .premium-btn-signin:hover {
                    color: #F97316;
                    border-color: #F97316;
                    background: rgba(249, 115, 22, 0.1);
                }
                
                .premium-btn-cta {
                    padding: 14px 28px;
                    font-size: 15px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #F97316, #EA580C);
                    color: #090E1A;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
                }
                
                .premium-btn-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
                }
                
                .premium-btn-cta svg {
                    transition: transform 0.3s ease;
                }
                
                .premium-btn-cta:hover svg {
                    transform: translateX(4px);
                }
                
                .premium-mobile-toggle {
                    display: none;
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 14px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    transition: all 0.3s ease;
                }
                
                .premium-mobile-toggle:hover {
                    background: rgba(249, 115, 22, 0.15);
                    border-color: rgba(249, 115, 22, 0.3);
                }
                
                .premium-mobile-menu {
                    display: none;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: rgba(9, 14, 26, 0.98);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    padding: 24px;
                    flex-direction: column;
                    gap: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    animation: slideDown 0.3s ease;
                    z-index: 999;
                }
                
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .premium-mobile-menu.open { display: flex; }
                
                .premium-mobile-menu a {
                    color: rgba(255, 255, 255, 0.85);
                    text-decoration: none;
                    font-size: 17px;
                    font-weight: 600;
                    padding: 16px 20px;
                    border-radius: 14px;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }
                
                .premium-mobile-menu a:hover {
                    background: rgba(249, 115, 22, 0.15);
                    border-color: rgba(249, 115, 22, 0.2);
                    color: #F97316;
                }
                
                .premium-mobile-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 16px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                }
                
                .premium-mobile-actions .premium-btn-signin,
                .premium-mobile-actions .premium-btn-cta {
                    width: 100%;
                    justify-content: center;
                }
                
                @media (max-width: 900px) {
                    .premium-nav { padding: 0 20px; height: 72px; }
                    .premium-mobile-toggle { display: flex; }
                    .premium-nav-links { display: none; }
                    .premium-nav-actions { display: none; }
                    .premium-mobile-menu { top: 72px; }
                }
            `}</style>

            <nav className={`premium-nav ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}>
                <div className="premium-nav-content">
                    <a href="/" className="premium-nav-logo">
                        <div className="premium-nav-logo-icon">
                            <svg width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="premium-nav-logo-text">Exam<span>Spot</span></span>
                    </a>

                    <div className="premium-nav-links">
                        {navLinks.map(({ label, path }) => (
                            <a key={label} href={path} className="premium-nav-link">
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="premium-nav-actions">
                        <a href="/login" className="premium-btn-signin">Sign In</a>
                        <a href="/register" className="premium-btn-cta">
                            Get Started
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>

                    <button className="premium-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            <div className={`premium-mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(({ label, path }) => (
                    <a key={label} href={path} onClick={() => setMenuOpen(false)}>
                        {label}
                    </a>
                ))}
                <div className="premium-mobile-actions">
                    <a href="/login" className="premium-btn-signin" onClick={() => setMenuOpen(false)}>Sign In</a>
                    <a href="/register" className="premium-btn-cta" onClick={() => setMenuOpen(false)}>
                        Get Started
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}
