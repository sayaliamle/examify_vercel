import { useState, useEffect } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'About', path: '/about' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                .ap-nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
                    padding: 0 48px; height: 76px;
                    display: flex; align-items: center; justify-content: space-between;
                    font-family: 'Inter', sans-serif;
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .ap-nav.scrolled {
                    background: rgba(17, 24, 39, 0.95);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(249, 115, 22, 0.1);
                    height: 68px;
                }
                .ap-logo {
                    display: flex; align-items: center; gap: 14px;
                    text-decoration: none;
                    flex: 1;
                    position: relative;
                }
                .ap-logo-icon {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                .ap-logo-icon::before {
                    content: '';
                    position: absolute;
                    top: -50%; left: -50%;
                    width: 200%; height: 200%;
                    background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%);
                    animation: shine 3s infinite;
                }
                @keyframes shine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }
                .ap-logo:hover .ap-logo-icon {
                    transform: scale(1.05) rotate(3deg);
                    box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
                }
                .ap-logo-text {
                    font-size: 24px; font-weight: 800; letter-spacing: -1px;
                    color: #ffffff;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }
                .ap-nav-center {
                    flex: 2;
                    display: flex; justify-content: center;
                }
                .ap-nav-links {
                    display: flex; gap: 8px; align-items: center;
                    list-style: none; margin: 0; padding: 0;
                }
                .ap-nav-links a {
                    color: rgba(255, 255, 255, 0.75);
                    text-decoration: none;
                    font-size: 15px; font-weight: 500;
                    transition: all 0.3s;
                    position: relative;
                    padding: 10px 18px;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .ap-nav-links a::before {
                    content: '';
                    position: absolute;
                    bottom: 6px; left: 50%;
                    width: 0; height: 2px;
                    background: linear-gradient(90deg, #f97316, #ea580c);
                    transform: translateX(-50%);
                    transition: width 0.3s;
                    border-radius: 2px;
                }
                .ap-nav-links a:hover {
                    color: #ffffff;
                    background: rgba(249, 115, 22, 0.1);
                }
                .ap-nav-links a:hover::before {
                    width: 60%;
                }
                .ap-nav-links a.active {
                    color: #f97316;
                    background: rgba(249, 115, 22, 0.15);
                }
                .ap-nav-links a.active::before {
                    width: 60%;
                }
                .ap-nav-actions {
                    flex: 1;
                    display: flex; justify-content: flex-end; gap: 12px;
                    align-items: center;
                }
                .ap-btn-signin {
                    padding: 10px 24px; border-radius: 12px;
                    font-size: 15px; font-weight: 600;
                    background: transparent;
                    color: rgba(255, 255, 255, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    cursor: pointer; text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                .ap-btn-signin::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.5s;
                }
                .ap-btn-signin:hover {
                    color: #ffffff;
                    border-color: rgba(255, 255, 255, 0.4);
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-2px);
                }
                .ap-btn-signin:hover::before {
                    left: 100%;
                }
                .ap-btn-cta {
                    padding: 12px 28px; border-radius: 12px;
                    font-size: 15px; font-weight: 600;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: #fff; border: none;
                    cursor: pointer; text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    display: inline-flex; align-items: center; gap: 10px;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
                }
                .ap-btn-cta::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }
                .ap-btn-cta:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
                }
                .ap-btn-cta:hover::before {
                    left: 100%;
                }
                .ap-btn-cta svg {
                    transition: transform 0.3s;
                }
                .ap-btn-cta:hover svg {
                    transform: translateX(4px);
                }
                .ap-mobile-toggle {
                    display: none;
                    width: 44px; height: 44px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    transition: all 0.3s;
                }
                .ap-mobile-toggle:hover {
                    background: rgba(249, 115, 22, 0.2);
                    border-color: rgba(249, 115, 22, 0.3);
                }
                .ap-mobile-menu {
                    display: none;
                    position: fixed;
                    top: 76px; left: 0; right: 0;
                    background: rgba(17, 24, 39, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 24px;
                    flex-direction: column;
                    gap: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    animation: slideDown 0.3s ease;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .ap-mobile-menu.open { display: flex; }
                .ap-mobile-menu a {
                    color: rgba(255, 255, 255, 0.85);
                    text-decoration: none;
                    font-size: 16px; font-weight: 500;
                    padding: 14px 18px;
                    border-radius: 12px;
                    transition: all 0.3s;
                    border: 1px solid transparent;
                }
                .ap-mobile-menu a:hover {
                    background: rgba(249, 115, 22, 0.15);
                    border-color: rgba(249, 115, 22, 0.3);
                    color: #f97316;
                }
                .ap-mobile-menu .ap-mobile-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .ap-mobile-menu .ap-btn-signin {
                    text-align: center;
                    width: 100%;
                }
                .ap-mobile-menu .ap-btn-cta {
                    text-align: center;
                    justify-content: center;
                }
                
                @media (max-width: 900px) {
                    .ap-desktop-nav { display: none !important; }
                    .ap-mobile-toggle { display: flex !important; }
                    .ap-nav { padding: 0 20px; height: 68px; }
                    .ap-logo-text { font-size: 20px; }
                }
            `}</style>

            <nav className={`ap-nav ${scrolled ? 'scrolled' : ''}`}>
                <a href="/" className="ap-logo">
                    <div className="ap-logo-icon">
                        <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <span className="ap-logo-text">Exam<span style={{ color: '#f97316' }}>Spot</span></span>
                </a>

                <div className="ap-nav-center">
                    <ul className="ap-nav-links ap-desktop-nav">
                        {navLinks.map(({ label, path }) => (
                            <li key={label}>
                                <a 
                                    href={path} 
                                    className={currentPath === path ? 'active' : ''}
                                    onMouseEnter={() => setHoveredLink(label)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ap-nav-actions ap-desktop-nav">
                    <a href="/login" className="ap-btn-signin">Sign In</a>
                    <a href="/register" className="ap-btn-cta">
                        Get Started
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>

                <button className="ap-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
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
            </nav>

            <div className={`ap-mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(({ label, path }) => (
                    <a key={label} href={path} onClick={() => setMenuOpen(false)}>
                        {label}
                    </a>
                ))}
                <div className="ap-mobile-actions">
                    <a href="/login" className="ap-btn-signin" onClick={() => setMenuOpen(false)}>Sign In</a>
                    <a href="/register" className="ap-btn-cta" onClick={() => setMenuOpen(false)}>
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
