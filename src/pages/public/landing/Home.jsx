import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import AIInsightsSlide from './AIInsightsSlide';

const features = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Exam Environment', description: 'AI-powered proctoring, tab-switch detection, and browser lockdown ensure exam integrity at every step.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Instant Results', description: 'Automatic grading and real-time score calculation provide immediate, actionable feedback to students.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Deep Analytics', description: 'Institutional-level reporting with AI-powered insights into student performance trends and outcomes.' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Smart Question Bank', description: 'AI-generated questions from any PDF. Organize by subject, topic, and difficulty level automatically.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Flexible Scheduling', description: 'Schedule in advance, set custom time windows, and manage multiple concurrent exam sessions effortlessly.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Multi-tenant Platform', description: 'Support unlimited institutions and organizations from a single, unified, role-based dashboard.' },
];

const launchSteps = [
  { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title: 'Create Account', desc: 'Sign up in seconds' },
  { icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z', title: 'Build Exam', desc: 'Configure settings' },
  { icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', title: 'Invite Students', desc: 'Share exam link' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Analyze Results', desc: 'Get insights' },
];

const trustedInstitutions = [
  { name: 'Delhi University', logo: 'DU', desc: "One of India's largest universities with 100+ colleges" },
  { name: 'IIT Roorkee', logo: 'IITR', desc: 'Premier technical institution of India' },
  { name: 'Mumbai University', logo: 'MU', desc: 'Leading multi-disciplinary university' },
  { name: 'Anna University', logo: 'AU', desc: 'Top engineering university in Tamil Nadu' },
  { name: 'JNU', logo: 'JNU', desc: 'Renowned for arts and humanities' },
  { name: 'BITS Pilani', logo: 'BITS', desc: 'Deemed university for technical education' },
];

const testimonials = [
  { name: 'Dr. Priya Sharma', role: 'Director of Examinations, Delhi University', avatar: 'PS', content: 'ExamSpot transformed our online examination process. The AI proctoring gave us complete confidence in result integrity.' },
  { name: 'Prof. Rajesh Kumar', role: 'Head of CS Department, IIT Roorkee', avatar: 'RK', content: 'The question bank and analytics are exceptional. We now identify student weaknesses and adapt teaching in real time.' },
  { name: 'Anita Desai', role: 'Principal, Sunrise Public School', avatar: 'AD', content: 'Setting up exams used to take days. With ExamSpot we launch a full exam in under an hour. Truly a game changer.' },
];

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, ''));
        let current = 0;
        const step = Math.ceil(num / 50);
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  const hasPlus = target.includes('+');
  const hasPct = target.includes('%');
  const hasM = target.includes('M');
  const display = hasM
    ? (count >= 1000 ? (count / 1000).toFixed(0) + 'M' : count + 'k') + (hasPlus ? '+' : '')
    : count + (hasPlus ? '+' : '') + (hasPct ? '%' : '');
  return <span ref={ref} className="counter-number">{display}</span>;
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        }, delay);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroTotal = 4;
  const modalRef = useRef(null);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => setHeroSlide(s => (s + 1) % heroTotal), 1500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setHeroSlide(s => (s - 1 + heroTotal) % heroTotal);
  const nextSlide = () => setHeroSlide(s => (s + 1) % heroTotal);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && modalOpen) setModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalOpen]);

  const openModal = (institution) => {
    setSelectedInstitution(institution);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedInstitution(null);
    document.body.style.overflow = '';
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#090E1A', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --primary: #F97316;
          --primary-dark: #EA580C;
          --bg-dark: #090E1A;
          --bg-card: rgba(15, 23, 42, 0.6);
          --text-primary: #FFFFFF;
          --text-secondary: #E2E8F0;
          --text-muted: #94A3B8;
          --border: rgba(255, 255, 255, 0.08);
        }
        
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes smokeDrift { 0% { opacity:0.5; transform: scale(1) translateX(0); } 50% { opacity:0.8; transform: scale(1.06) translateX(3%); } 100% { opacity:0.5; transform: scale(1) translateX(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scrollBounce { 0%, 100% { transform: rotate(45deg) translate(-2px,-2px); } 50% { transform: rotate(45deg) translate(2px,2px); } }
        @keyframes screenGlow { 0%,100% { box-shadow: 0 0 40px rgba(99,102,241,0.45), 0 30px 80px rgba(0,0,0,0.6); } 50% { box-shadow: 0 0 70px rgba(99,102,241,0.7), 0 30px 80px rgba(0,0,0,0.6); } }
        
        .slide-up { animation: slideUp 0.7s ease forwards; }
        .fade-in { animation: fadeIn 0.7s ease forwards; }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--primary), #FB923C, #FDBA74);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        }
        
        .gradient-border {
          position: relative;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, var(--primary), transparent, var(--primary-dark));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
        }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          transform: translateY(-8px);
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(249, 115, 22, 0.1);
        }
        
        .section-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        
        .section-subtitle {
          font-size: 18px;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 600px;
        }
        
        .counter-number {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--primary), #FB923C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: #090E1A;
          font-weight: 700;
          font-size: 15px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.7s ease;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
        }
        
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: transparent;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 15px;
          border-radius: 14px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          text-decoration: none;
          transition: all 0.7s ease;
        }
        .btn-secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(249, 115, 22, 0.1);
        }
        
        .icon-box {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.05));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .stat-card {
          text-align: center;
          padding: 40px 24px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
          border: 1px solid var(--border);
          transition: all 0.4s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(249, 115, 22, 0.2);
        }
        
        .feature-card {
          padding: 32px;
          height: 100%;
        }
        
        .slider-track {
          display: flex;
          gap: 24px;
          padding: 24px 0;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .slider-track::-webkit-scrollbar { display: none; }
        .slider-item {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 340px;
        }
        
        .institution-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          text-align: center;
        }
        .institution-logo {
          width: 140px;
          height: 140px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.05));
          border: 1px solid rgba(249, 115, 22, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          color: var(--primary);
          margin: 0 auto 16px;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .institution-logo:hover {
          transform: scale(1.05) translateY(-4px);
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2);
          border-color: var(--primary);
        }
        
        .checklist-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
          border: 1px solid var(--border);
          transition: all 0.4s ease;
        }
        .checklist-card:hover {
          transform: translateX(8px);
          border-color: rgba(249, 115, 22, 0.3);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(15, 23, 42, 0.4));
        }
        .checklist-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .testimonial-card {
          padding: 32px;
          height: 100%;
        }
        .testimonial-avatar {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          color: #090E1A;
          margin-bottom: 20px;
        }
        
        .cta-section {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          border-radius: 32px;
          padding: 80px;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .modal-content {
          background: linear-gradient(135deg, #0F172A, #1E293B);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 28px;
          padding: 48px;
          max-width: 480px;
          width: 100%;
          position: relative;
          animation: scaleIn 0.7s ease;
        }
        .modal-logo {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: #090E1A;
          margin-bottom: 24px;
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .modal-close:hover {
          background: rgba(249, 115, 22, 0.2);
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent);
          max-width: 50%;
          margin: 0 auto;
        }
        
        .footer-gradient {
          position: relative;
        }
        .footer-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }
        
        /* ── HERO LAYOUT (VR-style: full-bleed image right, text bottom-left) ── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #150828;
        }
        /* The big photo — absolutely positioned, right half, full height */
        .hero-photo {
          position: absolute;
          top: 0; right: 0;
          width: 62%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        /* Gradient that bleeds photo into bg on the left */
        .hero-photo-fade {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg,
            #150828 0%,
            #150828 30%,
            rgba(21,8,40,0.85) 45%,
            rgba(21,8,40,0.3) 62%,
            transparent 78%
          );
          pointer-events: none;
        }
        /* Bottom fade to blend into next section */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 260px;
          background: linear-gradient(to top, #090E1A 20%, transparent);
          pointer-events: none;
          z-index: 2;
        }
        /* Top gradient overlay for mood */
        .hero-top-fade {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 180px;
          background: linear-gradient(to bottom, rgba(21,8,40,0.7) 0%, transparent);
          pointer-events: none;
          z-index: 2;
        }
        /* Purple ambient glow behind the photo */
        .hero-glow {
          position: absolute;
          top: 10%; right: 5%;
          width: 55%;
          height: 80%;
          background: radial-gradient(ellipse at center, rgba(120,60,200,0.28) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        /* Content is in the lower-left, z above photo */
        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 0 72px 80px 72px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          min-height: 100vh;
        }
        .hero-tagline {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F97316;
          margin-bottom: 18px;
          animation: fadeInLeft 0.7s 0.1s both;
        }
        .hero-headline {
          font-size: clamp(44px, 5.5vw, 76px);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 22px;
          max-width: 520px;
          animation: fadeInLeft 0.7s 0.2s both;
        }
        .hero-headline-dot { color: #F97316; }
        .hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.58);
          line-height: 1.7;
          max-width: 360px;
          margin-bottom: 40px;
          font-weight: 400;
          animation: fadeInLeft 0.7s 0.4s both;
        }
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: fadeInLeft 0.7s 0.5s both;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: #F97316;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.7s ease;
          box-shadow: 0 6px 24px rgba(249,115,22,0.45);
        }
        .hero-btn-primary:hover { background: #EA580C; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(249,115,22,0.6); }
        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          background: transparent;
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          font-size: 14px;
          border-radius: 50px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.25);
          transition: all 0.7s ease;
        }
        .hero-btn-outline:hover { border-color: rgba(255,255,255,0.6); color: #fff; background: rgba(255,255,255,0.06); }
        .hero-scroll-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          animation: fadeInLeft 0.7s 0.6s both;
          cursor: default;
        }
        .hero-scroll-icon span {
          display: block;
          width: 1.5px;
          height: 28px;
          background: rgba(255,255,255,0.22);
          border-radius: 2px;
        }
        .hero-scroll-icon i {
          display: block;
          width: 8px;
          height: 8px;
          border-right: 1.5px solid rgba(255,255,255,0.3);
          border-bottom: 1.5px solid rgba(255,255,255,0.3);
          transform: rotate(45deg);
          animation: scrollBounce 1.6s ease-in-out infinite;
          margin-top: -4px;
        }

        @media (max-width: 1024px) {
          .hero-content { padding: 0 40px 64px 40px; }
          .hero-photo { width: 75%; }
          .hero-photo-fade { background: linear-gradient(90deg, #150828 0%, #150828 20%, rgba(21,8,40,0.8) 38%, rgba(21,8,40,0.25) 60%, transparent 80%); }
          .slider-item { width: 300px; }
          .cta-section { padding: 60px 40px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .section-title { font-size: 32px; }
          .section-subtitle { font-size: 16px; }
          .counter-number { font-size: 40px; }
          .slider-item { width: 280px; }
          .cta-section { padding: 48px 24px; }
          .glass-card { border-radius: 20px; }
          .hero-content { padding: 0 24px 56px 24px; }
          .hero-photo { width: 100%; opacity: 0.35; }
          .hero-photo-fade { background: rgba(21,8,40,0.7); }
          .hero-headline { font-size: clamp(38px, 10vw, 56px); max-width: 100%; }
          .hero-sub { max-width: 100%; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>
        {/* ─── HERO CAROUSEL ─── */}
        <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

          {/* ── SLIDE 0: Full-bleed photo right, text bottom-left (current style) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: heroSlide === 0 ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: heroSlide === 0 ? 'auto' : 'none'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: '#150828' }} />
            <img
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=85"
              alt="Student taking online exam"
              style={{ position: 'absolute', top: 0, right: 0, width: '62%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #150828 0%, #150828 30%, rgba(21,8,40,0.85) 45%, rgba(21,8,40,0.3) 62%, transparent 78%)' }} />
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '55%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(120,60,200,0.28) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px', background: 'linear-gradient(to top, #090E1A 20%, transparent)', zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to bottom, rgba(21,8,40,0.7), transparent)', zIndex: 2 }} />
            <div className="hero-content" style={{ position: 'relative', zIndex: 3 }}>
              <p className="hero-tagline">Secure. Scalable. Smart.</p>
              <h1 className="hero-headline">Conduct your exams<br />with confidence<span className="hero-headline-dot">.</span></h1>
              <p className="hero-sub">AI-powered proctoring, instant results, and deep analytics — built for institutions across India.</p>
              <div className="hero-cta">
                <a href="/register" className="hero-btn-primary">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14" /></svg>
                  Login to get started
                </a>
                <a href="/about" className="hero-btn-outline">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
                  Explore platform
                </a>
              </div>
            </div>
          </div>

          {/* ── SLIDE 1: Dark centered, star-field, big centered headline ── */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: heroSlide === 1 ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: heroSlide === 1 ? 'auto' : 'none',
            background: '#060914',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {/* Star dots */}
            {[...Array(28)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: i % 4 === 0 ? 3 : 2,
                height: i % 4 === 0 ? 3 : 2,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.5)',
                top: `${8 + (i * 13 + i * i * 0.7) % 80}%`,
                left: `${5 + (i * 17 + i * i * 1.3) % 90}%`,
                animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.22).toFixed(1)}s`
              }} />
            ))}
            {/* Radial arcs */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(150,100,255,0.08)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(150,100,255,0.12)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(100,60,200,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #090E1A 25%, transparent)' }} />
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 32px', maxWidth: '780px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: 24, animation: 'slideUp 0.7s 0.1s both' }}>When you get it right</p>
              <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, animation: 'slideUp 0.7s 0.2s both' }}>
                One go-to platform<br />
                <span style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>that orchestrates and delivers</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 40px', animation: 'slideUp 0.7s 0.4s both' }}>
                Everything lines up running great exams. We anticipate and resolve everything you need before you even know to ask. We provide strategic guidance of product direction and personal experience.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animation: 'slideUp 0.7s 0.5s both' }}>
                <a href="/register" className="hero-btn-primary">Start Free Trial</a>
                <a href="/about" className="hero-btn-outline">Watch Demo</a>
              </div>
            </div>
          </div>

          {/* ── SLIDE 2: Left text + right wave/analytics visual ── */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: heroSlide === 2 ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: heroSlide === 2 ? 'auto' : 'none',
            background: '#0a0618',
            display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center'
          }}>
            {/* Left */}
            <div style={{ padding: '0 72px', zIndex: 2 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F97316', marginBottom: 20, animation: heroSlide===2?'fadeInLeft 0.7s 0.1s both':'none' }}>High-touch milestone</p>
              <h1 style={{ fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, animation: heroSlide===2?'fadeInLeft 0.7s 0.2s both':'none' }}>
                A collaborative and intuitive<br />
                <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>partner you can count on</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, maxWidth: 400, marginBottom: 36, animation: heroSlide===2?'fadeInLeft 0.7s 0.4s both':'none' }}>
                Our interviewers already align and translate the every product you choose. We actively align, collaborate and advise exactly what you need, whenever and however you'll need it.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: heroSlide===2?'fadeInLeft 0.7s 0.5s both':'none' }}>
                <a href="/register" className="hero-btn-primary">Get started today</a>
                <a href="/about" className="hero-btn-outline">See how it works</a>
              </div>
            </div>
            {/* Right — abstract wave viz */}
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(124,58,237,0.15) 50%, rgba(6,1,24,0.9) 100%)' }} />
              <svg viewBox="0 0 600 600" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90%', height: '90%', opacity: 0.7 }}>
                <defs>
                  <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {[0,1,2,3,4,5,6,7].map(i => (
                  <path key={i}
                    d={`M ${50 + i*10},${300 + Math.sin(i)*60} Q ${300},${100 + i*40} ${550 - i*10},${300 - Math.sin(i)*60}`}
                    fill="none" stroke="url(#wg1)" strokeWidth={0.8 + i*0.15} opacity={0.6 - i*0.05}
                  />
                ))}
                {[0,1,2,3,4,5].map(i => (
                  <path key={`b${i}`}
                    d={`M ${80 + i*12},${320 + i*15} Q ${300},${480 - i*30} ${520 - i*12},${310 + i*12}`}
                    fill="none" stroke="#A78BFA" strokeWidth={0.6} opacity={0.4 - i*0.05}
                  />
                ))}
              </svg>
              {[['Institutions','500+',60,30],['Exams','2,000+',75,55],['Uptime','99%',50,70]].map(([lbl,val,x,y])=>(
                <div key={lbl} style={{ position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)', textAlign:'center' }}>
                  <div style={{ fontSize:24, fontWeight:800, color:'#F97316' }}>{val}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLIDE 3: Light gradient bg, centered, cards/steps below headline ── */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: heroSlide === 3 ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: heroSlide === 3 ? 'auto' : 'none',
            background: 'linear-gradient(160deg, #1a0a35 0%, #0d0622 40%, #090E1A 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center'
          }}>
            {/* Spiral/fan visual */}
            <svg viewBox="0 0 800 400" style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'80%', maxWidth:900, opacity:0.35 }}>
              <defs>
                <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
              {[...Array(22)].map((_,i)=>(
                <line key={i}
                  x1="400" y1="400"
                  x2={400 + Math.cos((i/22)*Math.PI - Math.PI/2)*380}
                  y2={400 - Math.sin((i/22)*Math.PI)*320}
                  stroke="url(#sg1)" strokeWidth={1.2} opacity={0.6 - i*0.015}
                />
              ))}
            </svg>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to top, #090E1A 30%, transparent)' }} />
            <div style={{ position:'relative', zIndex:2, padding:'0 32px', maxWidth:900 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: 20 }}>Dynamic orchestration</p>
              <h1 style={{ fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, marginBottom: 20, letterSpacing:'-0.02em' }}>
                Your teams get to enjoy<br />
                <span style={{ background: 'linear-gradient(135deg, #A78BFA, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>seamless continuous exams</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, margin:'0 auto 48px' }}>
                Unify your functional team&apos;s the easy way. Rely on our entire expertise, tame complexity and deliver lasting value. The ExamSpot Foundation is associated so you don&apos;t have to.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 720, margin: '0 auto' }}>
                {[
                  { label: 'Design', desc: "You specify once every forward. We make sure they don't get repeated." },
                  { label: 'Engineering', desc: "Your builds have clarity built in. We curate what's needed, what's changed and why it matters." },
                  { label: 'Construction', desc: 'Teams can get validated on infrastructure multiple levels. Solving shows up felt right.' },
                ].map((c,i)=>(
                  <div key={i} style={{ padding:'20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, textAlign:'left' }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:8 }}>{c.label}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', lineHeight:1.6 }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Carousel Controls ── */}
          {/* Prev / Next arrows */}
          <button onClick={prevSlide} style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', zIndex:20, width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(249,115,22,0.2)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} style={{ position:'absolute', right:24, top:'50%', transform:'translateY(-50%)', zIndex:20, width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(249,115,22,0.2)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          {/* Dot indicators */}
          <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:20, display:'flex', gap:10, alignItems:'center' }}>
            {[0,1,2,3].map(i=>(
              <button key={i} onClick={()=>setHeroSlide(i)} style={{ width: heroSlide===i ? 28 : 8, height:8, borderRadius:4, background: heroSlide===i ? '#F97316' : 'rgba(255,255,255,0.3)', border:'none', cursor:'pointer', padding:0, transition:'all 0.4s ease' }} />
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ─── STATS ─── */}
        <AnimatedSection>
          <style>{`
            .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr)); gap: 32px; width: 100%; max-width: 1100px; }
          `}</style>
          <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, #090E1A 0%, rgba(15, 23, 42, 0.5) 100%)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="stats-grid">
                <style>{`
                  @keyframes floatUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                  .stat-card-animated {
                    opacity: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 40px 20px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: floatUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    position: relative;
                    overflow: hidden;
                  }
                  .stat-card-animated::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.7s ease;
                  }
                  .stat-card-animated:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(249, 115, 22, 0.3);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(249, 115, 22, 0.15);
                  }
                  .stat-card-animated:hover::before { opacity: 1; }
                `}</style>
                {[
                  { value: '500+', label: 'Institutions', color: '#F97316', delay: '0s' },
                  { value: '2000+', label: 'Exams Conducted', color: '#A78BFA', delay: '0.1s' },
                  { value: '99%', label: 'Uptime SLA', color: '#38BDF8', delay: '0.2s' },
                  { value: '10000+', label: 'Students Served', color: '#22C55E', delay: '0.7s' },
                ].map((stat, i) => (
                  <div key={i} className="stat-card-animated" style={{ animationDelay: stat.delay }}>
                    <div className="counter-number" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}><Counter target={stat.value} /></div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.15em', position: 'relative', zIndex: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />

        {/* ─── FEATURES (VR Slide Layout: Title Left, Grid Right) ─── */}
        <AnimatedSection>
          <style>{`
            .features-split { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: start; }
            .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
            .feature-box { 
              background: linear-gradient(145deg, rgba(21, 8, 40, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%); 
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(249, 115, 22, 0.15); 
              padding: 24px; 
              border-radius: 16px; 
              transition: all 0.4s ease; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              text-align: center; 
              position: relative;
              overflow: hidden;
            }
            .feature-box::before {
              content: '';
              position: absolute;
              top: -50px; left: -50px;
              width: 100px; height: 100px;
              background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%);
              pointer-events: none;
            }
            .feature-box:hover { 
              background: linear-gradient(145deg, rgba(21, 8, 40, 0.8) 0%, rgba(249, 115, 22, 0.05) 100%); 
              border-color: rgba(249, 115, 22, 0.4); 
              transform: translateY(-4px); 
              box-shadow: 0 10px 30px rgba(249, 115, 22, 0.08);
            }
            @media (min-width: 1024px) {
              .features-split { grid-template-columns: 35% 1fr; gap: 80px; align-items: center; }
            }
            @media (max-width: 768px) {
              .features-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 480px) {
              .features-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          <section style={{ padding: '120px 0', background: 'rgba(15, 23, 42, 0.3)' }}>
            <div className="container">
              <div className="features-split">
                {/* Left Text */}
                <div style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
                    Everything <span style={{ color: '#F97316' }}>You Need</span>
                  </h2>
                  <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7 }}>
                    From secure proctoring to instant results — a complete examination ecosystem built for scale and reliability without the clunky interfaces.
                  </p>
                </div>

                {/* Right Grid */}
                <div className="features-grid">
                  {features.map((f, i) => (
                    <div key={i} className="feature-box">
                      <div className="icon-box" style={{ marginBottom: 16 }}>
                        <svg width="24" height="24" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                      </div>
                      <h3 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>{f.title}</h3>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />

        {/* ─── TRUSTED INSTITUTIONS ─── */}
        <AnimatedSection>
          <style>{`
            .marquee-container {
              display: flex;
              overflow: hidden;
              width: 100%;
              mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
              -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
              padding: 20px 0;
            }
            .marquee-track {
              display: flex;
              gap: 40px;
              animation: scrollMarquee 35s linear infinite;
              min-width: max-content;
            }
            .marquee-track:hover { animation-play-state: paused; }
            @keyframes scrollMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 20px)); }
            }
            .inst-pill {
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 16px 32px;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 100px;
              cursor: pointer;
              transition: all 0.7s ease;
            }
            .inst-pill:hover {
              background: rgba(249,115,22,0.08);
              border-color: rgba(249,115,22,0.3);
              transform: translateY(-2px);
            }
            .inst-logo-badge {
              font-size: 16px;
              font-weight: 800;
              color: #F97316;
              background: rgba(249,115,22,0.15);
              padding: 6px 12px;
              border-radius: 8px;
            }
            .inst-name {
              font-size: 15px;
              font-weight: 600;
              color: rgba(255,255,255,0.85);
            }
          `}</style>
          <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%)' }}>
            <div className="container" style={{ padding: '0 24px' }}>
              <div style={{ textAlign: 'center', marginBottom: 54 }}>
                <h2 className="section-title">Trusted by Leading Institutions</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>Universities and colleges across India rely on ExamSpot.</p>
              </div>

              <div className="marquee-container">
                <div className="marquee-track">
                  {/* Duplicate array for seamless infinite scroll */}
                  {[...trustedInstitutions, ...trustedInstitutions].map((inst, i) => (
                    <div
                      key={i}
                      className="inst-pill"
                      onClick={() => openModal(inst)}
                      onKeyDown={(e) => e.key === 'Enter' && openModal(inst)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="inst-logo-badge">{inst.logo}</div>
                      <div className="inst-name">{inst.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {modalOpen && selectedInstitution && (
          <div
            className="modal-overlay"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="modal-content"
              ref={modalRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="modal-logo">{selectedInstitution.logo}</div>
              <h3 id="modal-title" style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>{selectedInstitution.name}</h3>
              <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 32 }}>{selectedInstitution.desc}</p>
              <a
                href="/register"
                className="btn-primary"
                style={{ width: 'fit-content' }}
              >
                Partner With Us
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
          </div>
        )}

        <div className="divider" />

        {/* ─── HOW IT WORKS ─── */}
        <AnimatedSection>
          <section style={{ padding: '100px 0', background: 'rgba(15, 23, 42, 0.3)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <h2 className="section-title">Launch in Minutes</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>Get started in four simple steps.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                {launchSteps.map((step, i) => (
                  <div key={i} className="checklist-card">
                    <div className="checklist-icon">
                      <svg width="24" height="24" fill="none" stroke="#090E1A" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={step.icon} /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 14, color: '#94A3B8' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />

        {/* ─── CTA ─── */}
        <AnimatedSection>
          <section style={{ padding: '100px 0' }}>
            <div className="container">
              <div className="cta-section" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 26, 0.98))', border: '1px solid rgba(249, 115, 22, 0.4)', boxShadow: 'inset 0 0 40px rgba(249, 115, 22, 0.05), 0 20px 40px rgba(0, 0, 0, 0.4)', padding: '54px 64px', borderRadius: '24px' }}>
                <style>{`
                  .cta-banner { display: flex; align-items: center; justify-content: space-between; gap: 48px; position: relative; z-index: 2; }
                  @media (max-width: 900px) {
                    .cta-banner { flex-direction: column; text-align: center; }
                    .cta-buttons { justify-content: center; }
                  }
                `}</style>
                <div className="cta-banner">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', marginBottom: 24 }}>
                      <svg width="16" height="16" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get Started Today</span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
                      Ready to Transform Your Examinations?
                    </h2>

                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 540 }}>
                      Join 500+ educational institutions processing millions of exams securely. Start your free pilot today — no credit card required.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 320 }}>
                    <div className="cta-buttons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <a href="/register" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '18px 36px', background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#ffffff', fontWeight: 700, fontSize: 16, borderRadius: 16, textDecoration: 'none', boxShadow: '0 8px 30px rgba(249,115,22,0.3)', flex: 1 }}>
                        Start Free
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </a>
                      <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '18px 32px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontWeight: 600, fontSize: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
                        Learn More
                      </a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
                      {[
                        { icon: 'M5 13l4 4L19 7', text: 'No credit card' },
                        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: '14-day trial' },
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <svg width="18" height="18" fill="none" stroke="#94A3B8" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8' }}>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />

        {/* ─── TESTIMONIALS ─── */}
        <AnimatedSection>
          <section style={{ padding: '100px 0', background: 'rgba(15, 23, 42, 0.3)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <h2 className="section-title">Trusted by Educators</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>See what institutions across India are saying.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="glass-card testimonial-card">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: '#E2E8F0', marginBottom: 24 }}>"{t.content}"</p>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 14, color: '#94A3B8' }}>{t.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}
