import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const features = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Secure Exam Environment',
    description: 'AI-powered proctoring, tab-switch detection, and browser lockdown ensure exam integrity at every step.',
    accent: '#f97316',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Instant Results',
    description: 'Automatic grading and real-time score calculation provide immediate, actionable feedback to students.',
    accent: '#f97316',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Deep Analytics',
    description: 'Institutional-level reporting with AI-powered insights into student performance trends and outcomes.',
    accent: '#f97316',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Smart Question Bank',
    description: 'AI-generated questions from any PDF. Organize by subject, topic, and difficulty level automatically.',
    accent: '#f97316',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible Scheduling',
    description: 'Schedule in advance, set custom time windows, and manage multiple concurrent exam sessions effortlessly.',
    accent: '#f97316',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Multi-tenant Platform',
    description: 'Support unlimited institutions and organizations from a single, unified, role-based dashboard.',
    accent: '#f97316',
  },
];

const steps = [
  { number: '01', title: 'Create Account', description: 'Sign up in seconds. Set your role as student, teacher, or admin.', color: '#f97316' },
  { number: '02', title: 'Build Your Exam', description: 'Create questions, configure AI proctoring and schedule the exam.', color: '#f97316' },
  { number: '03', title: 'Invite Students', description: 'Share exam links or import your entire student roster via CSV.', color: '#f97316' },
  { number: '04', title: 'Monitor & Analyze', description: 'Watch live attempts and gain deep insights from analytics.', color: '#f97316' },
];

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Director of Examinations, Delhi University',
    avatar: 'PS',
    content: 'ExamSpot transformed our online examination process. The AI proctoring gave us complete confidence in result integrity.',
    color: '#f97316',
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Head of CS Department, IIT Roorkee',
    avatar: 'RK',
    content: 'The question bank and analytics are exceptional. We now identify student weaknesses and adapt teaching in real time.',
    color: '#f97316',
  },
  {
    name: 'Anita Desai',
    role: 'Principal, Sunrise Public School',
    avatar: 'AD',
    content: 'Setting up exams used to take days. With ExamSpot we launch a full exam in under an hour. Truly a game changer.',
    color: '#f97316',
  },
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
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 22);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  const hasPlus = target.includes('+');
  const hasPct = target.includes('%');
  const hasM = target.includes('M');
  const display = hasM
    ? (count >= 1000 ? (count / 1000).toFixed(0) + 'M' : count + 'k') + (hasPlus ? '+' : '')
    : count + (hasPlus ? '+' : '') + (hasPct ? '%' : '');
  return <span ref={ref}>{display}</span>;
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#1f2937', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17,24,39,0.85)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0.4)} 50%{box-shadow:0 0 0 8px rgba(249,115,22,0)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }

        .container { max-width: 800px; margin: 0 auto; padding: 0 24px; }
        .container-wide { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        
        .section { padding: 80px 0; }
        .section-sm { padding: 60px 0; }
        
        .text-center { text-align: center; }
        .text-orange { color: #f97316; }
        .text-orange-shadow { color: #f97316; text-shadow: 0 0 30px rgba(249,115,22,0.3); }
        .text-dark { color: #1f2937; }
        .text-muted { color: #6b7280; }
        .text-lg { font-size: 18px; line-height: 1.7; }
        
        .marquee-container { overflow: hidden; white-space: nowrap; width: 100%; }
        .marquee-content { display: inline-flex; animation: marquee 25s linear infinite; }
        .marquee-item { display: inline-flex; align-items: center; gap: 12px; padding: 0 32px; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.8); letter-spacing: 0.5px; }
        .marquee-item .dot { width: 6px; height: 6px; border-radius: 50%; background: #f97316; flex-shrink: 0; }
        
        .hero-content { max-width: 750px; margin: 0 auto; text-align: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 24px; border-radius: 50px; background: 'rgba(249,115,22,0.15)'; border: '1px solid rgba(249,115,22,0.3)'; font-size: 14px; font-weight: 600; color: '#ffffff'; margin-bottom: 32px; animation: fadeInUp 0.8s ease forwards; }
        .hero-title { font-size: clamp(42px, 7vw, 72px); font-weight: 800; letter-spacing: -2px; line-height: 1.1; margin-bottom: 24px; color: #ffffff; animation: fadeInUp 0.8s ease forwards 0.2s; opacity: 0; }
        .hero-title .highlight { color: #f97316; }
        .hero-subtitle { font-size: clamp(16px, 2vw, 20px); color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 40px; animation: fadeInUp 0.8s ease forwards 0.4s; opacity: 0; }
        .hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; animation: fadeInUp 0.8s ease forwards 0.6s; opacity: 0; }
        
        .btn-primary { background: #f97316; color: #ffffff; font-weight: 600; padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer; transition: all 0.3s; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: #ea580c; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(249,115,22,0.4); }
        .btn-secondary { background: transparent; color: #ffffff; font-weight: 600; padding: 14px 32px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-secondary:hover { border-color: #f97316; color: #f97316; background: rgba(249,115,22,0.1); }
        
        .title-section { font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -1px; margin-bottom: 12px; color: #ffffff; }
        .title-card { font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #ffffff; }
        .subtitle { font-size: 17px; color: rgba(255,255,255,0.7); line-height: 1.6; max-width: 600px; }
        
        .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px 28px; transition: all 0.3s; text-align: center; backdrop-filter: blur(10px); }
        .card:hover { transform: translateY(-6px); background: rgba(255,255,255,0.1); border-color: rgba(249,115,22,0.4); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        .card-icon { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg, #f97316, #ea580c); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #fff; }
        .card-desc { color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.6; }
        
        .step-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 28px 24px; text-align: center; transition: all 0.3s; cursor: pointer; }
        .step-card:hover, .step-card.active { background: rgba(255,255,255,0.1); border-color: rgba(249,115,22,0.4); }
        .step-number { font-size: 36px; font-weight: 800; color: rgba(255,255,255,0.15); margin-bottom: 12px; }
        .step-card.active .step-number { color: #f97316; }
        .step-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; color: #ffffff; }
        .step-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
        
        .stat-box { text-align: center; padding: 32px 20px; }
        .stat-value { font-size: 48px; font-weight: 800; color: #f97316; letter-spacing: -2px; margin-bottom: 8px; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.7); font-weight: 500; }
        
        .testimonial-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px; transition: all 0.3s; }
        .testimonial-card:hover { background: rgba(255,255,255,0.1); }
        .testimonial-avatar { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #f97316, #ea580c); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 16px; margin-bottom: 16px; }
        .testimonial-content { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 20px; }
        .testimonial-name { font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 4px; }
        .testimonial-role { font-size: 13px; color: rgba(255,255,255,0.5); }
        
        .badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; background: rgba(249,115,22,0.2); color: #f97316; }
        
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent); max-width: 60%; margin: 0 auto; }
        
        .cta-box { padding: 60px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 24px; position: relative; overflow: hidden; }
        
        @media (max-width: 1024px) {
          .container-wide { padding: 0 32px; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .container-wide { padding: 0 20px; }
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .grid-auto { grid-template-columns: 1fr; }
          .section { padding: 60px 0; }
          .section-sm { padding: 40px 0; }
          .cta-box { padding: 40px 24px; }
          .stat-value { font-size: 40px; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* ─── HERO ─── */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(17,24,39,0.85) 0%, rgba(0,0,0,0.75) 100%)', zIndex: 1 }} />
          
          <div className="container hero-content" style={{ position: 'relative', zIndex: 2, padding: '120px 24px 80px' }}>
            <div className="hero-badge">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }} />
              Now serving 500+ institutions across India
            </div>
            
            <h1 className="hero-title">
              The Modern <span className="highlight">Exam</span><br />
              Platform for <span className="highlight">India</span>
            </h1>
            
            <p className="hero-subtitle">
              Conduct secure, scalable online examinations with AI-powered proctoring,
              instant results, and deep analytics — trusted by universities, colleges & schools.
            </p>
            
            <div className="hero-buttons">
              <a href="/register" className="btn-primary">
                Start Free Trial
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="/about" className="btn-secondary">Watch Demo</a>
            </div>
            
            <div style={{ marginTop: 60 }}>
              <div className="marquee-container" style={{ background: 'rgba(249,115,22,0.12)', borderRadius: '14px', padding: '14px 0', border: '1px solid rgba(249,115,22,0.15)' }}>
                <div className="marquee-content">
                  {['AI Proctoring', 'Secure Exams', 'Instant Results', 'Smart Analytics', 'Question Bank', 'Flexible', 'Multi-tenant', '24/7 Support'].map((item, i) => (
                    <span key={i} className="marquee-item">
                      <span className="dot"></span>
                      {item}
                    </span>
                  ))}
                  {['AI Proctoring', 'Secure Exams', 'Instant Results', 'Smart Analytics', 'Question Bank', 'Flexible', 'Multi-tenant', '24/7 Support'].map((item, i) => (
                    <span key={`dup-${i}`} className="marquee-item">
                      <span className="dot"></span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── STATS ─── */}
        <section style={{ padding: '40px 0', background: 'rgba(17,24,39,0.75)' }}>
          <div className="container-wide">
            <div className="grid-4">
              <div className="stat-box">
                <div className="stat-value"><Counter target="500+" /></div>
                <div className="stat-label">Institutions</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="2000+" /></div>
                <div className="stat-label">Exams Conducted</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="99%" /></div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="10000+" /></div>
                <div className="stat-label">Students Served</div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── FEATURES ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.8)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 48 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8 }}>Everything You Need</h2>
              <p className="subtitle" style={{ textAlign: 'left' }}>From secure proctoring to instant results — a complete examination ecosystem.</p>
            </div>
            
            <div className="grid-3">
              {features.map(f => (
                <div key={f.title} className="card">
                  <div className="card-icon">{f.icon}</div>
                  <h3 className="title-card">{f.title}</h3>
                  <p className="card-desc">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.75)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 48 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8 }}>Launch in Minutes</h2>
              <p className="subtitle" style={{ textAlign: 'left' }}>Get started in four simple steps.</p>
            </div>
            
            <div className="grid-4">
              {steps.map((step, i) => (
                <div key={step.number} className={`step-card ${activeStep === i ? 'active' : ''}`}>
                  <div className="step-number">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── TESTIMONIALS ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.8)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 48 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8 }}>Trusted by Educators</h2>
              <p className="subtitle" style={{ textAlign: 'left' }}>See what institutions across India are saying.</p>
            </div>
            
            <div className="grid-3">
              {testimonials.map(t => (
                <div key={t.name} className="testimonial-card">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <p className="testimonial-content">"{t.content}"</p>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="container-wide" style={{ padding: '80px 0' }}>
          <div className="cta-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '280px' }}>
                <span className="badge">Get Started Today</span>
                <h2 className="title-section" style={{ marginBottom: 12, color: '#ffffff' }}>Ready to Transform<br />Your Examinations?</h2>
                <p className="subtitle" style={{ marginBottom: 0, textAlign: 'left', color: 'rgba(255,255,255,0.85)' }}>Join 500+ educational institutions. Start free — no credit card required.</p>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="/register" className="btn-primary" style={{ background: '#ffffff', color: '#f97316' }}>
                  Get Started Free
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="/about" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </div>
  );
}
