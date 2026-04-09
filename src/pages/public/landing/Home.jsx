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
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

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
        
        .title-hero { font-size: clamp(40px, 7vw, 72px); font-weight: 800; letter-spacing: -3px; line-height: 1.05; margin-bottom: 24px; color: #ffffff; }
        .title-section { font-size: clamp(28px, 4vw, 48px); font-weight: 700; letter-spacing: -1px; margin-bottom: 16px; color: #ffffff; }
        .title-card { font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #ffffff; }
        
        .subtitle { font-size: 20px; color: rgba(255,255,255,0.85); line-height: 1.7; max-width: 600px; }
        
        .btn-primary { background: #f97316; color: #ffffff; font-weight: 600; padding: 16px 36px; border-radius: 14px; border: none; cursor: pointer; transition: all 0.3s; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary:hover { background: #ea580c; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(249,115,22,0.4); }
        .btn-secondary { background: transparent; color: #ffffff; font-weight: 600; padding: 16px 36px; border-radius: 14px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; font-size: 16px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; }
        .btn-secondary:hover { border-color: #f97316; color: #f97316; background: rgba(249,115,22,0.1); }
        
        .card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 40px 32px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); text-align: center; backdrop-filter: blur(10px); }
        .card:hover { transform: translateY(-8px); background: rgba(255,255,255,0.15); border-color: rgba(249,115,22,0.5); box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(249,115,22,0.15); }
        .card-icon { width: 64px; height: 64px; border-radius: 18px; background: linear-gradient(135deg, #f97316, #ea580c); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #fff; box-shadow: 0 8px 30px rgba(249,115,22,0.3); }
        .card-desc { color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7; }
        
        .step-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 32px 28px; text-align: center; transition: all 0.4s; cursor: pointer; position: relative; overflow: hidden; }
        .step-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #f97316, #ea580c); transform: scaleX(0); transition: transform 0.3s; }
        .step-card:hover::before, .step-card.active::before { transform: scaleX(1); }
        .step-card:hover, .step-card.active { background: rgba(255,255,255,0.15); border-color: rgba(249,115,22,0.4); transform: translateY(-4px); }
        .step-number { font-size: 42px; font-weight: 800; color: rgba(255,255,255,0.2); margin-bottom: 16px; transition: color 0.3s; }
        .step-card.active .step-number { color: #f97316; }
        .step-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; color: #ffffff; }
        .step-desc { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6; }
        
        .stat-box { text-align: center; padding: 40px 24px; position: relative; }
        .stat-box::after { content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); height: 60%; width: 1px; background: linear-gradient(transparent, rgba(255,255,255,0.2), transparent); }
        .stat-box:last-child::after { display: none; }
        .stat-value { font-size: 56px; font-weight: 800; color: #f97316; letter-spacing: -2px; margin-bottom: 12px; text-shadow: 0 0 40px rgba(249,115,22,0.4); }
        .stat-label { font-size: 15px; color: rgba(255,255,255,0.75); font-weight: 500; }
        
        .testimonial-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 40px; text-align: left; transition: all 0.4s; position: relative; }
        .testimonial-card::before { content: '"'; position: absolute; top: 20px; right: 30px; font-size: 100px; color: rgba(249,115,22,0.15); font-family: Georgia, serif; line-height: 1; }
        .testimonial-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }
        .testimonial-avatar { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #f97316, #ea580c); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 18px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(249,115,22,0.3); }
        .testimonial-content { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 24px; }
        .testimonial-name { font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 4px; }
        .testimonial-role { font-size: 13px; color: rgba(255,255,255,0.6); }
        
        .badge { display: inline-block; padding: 8px 20px; border-radius: 30px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; background: rgba(249,115,22,0.2); color: #f97316; border: 1px solid rgba(249,115,22,0.3); margin-bottom: 24px; }
        
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px; }
        
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent); max-width: 80%; }
        
        .cta-box { padding: 64px; background: rgba(249,115,22,0.95); border-radius: 32px; border: none; position: relative; overflow: hidden; }
        .cta-box::before { content: ''; position: absolute; top: -50%; right: -20%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); border-radius: 50%; }
        
        @media (max-width: 1024px) {
          .container-wide { padding: 0 32px; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .container-wide { padding: 0 20px; }
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .grid-auto { grid-template-columns: 1fr; }
          .section { padding: 60px 0; }
          .section-sm { padding: 48px 0; }
          .title-hero { letter-spacing: -1px; }
          .cta-box { padding: 40px 24px; }
          .stat-box::after { display: none; }
          .stat-value { font-size: 42px; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* ─── HERO ─── */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 1 }} />
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '100px 24px' }}>
            <div style={{ marginBottom: 32, animation: 'float 3s ease-in-out infinite' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 28px', borderRadius: 50, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', backdropFilter: 'blur(10px)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 20px rgba(249,115,22,0.8)', animation: 'pulse-glow 2s infinite' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', letterSpacing: 0.5 }}>Now serving 500+ institutions across India</span>
              </div>
            </div>
            
            <h1 className="title-hero">
              The Modern<br />
              <span style={{ color: '#f97316', position: 'relative' }}>Exam Platform
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, transparent, #f97316, transparent)', borderRadius: 2 }} />
              </span>
              <br />for India
            </h1>
            
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: 48 }}>
              Conduct secure, scalable online examinations with AI-powered proctoring,
              instant results, and deep analytics — trusted by universities, colleges & schools.
            </p>
            
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/register" className="btn-primary">
                Start Free Trial
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="/about" className="btn-secondary">Watch Demo</a>
            </div>
            
            <div style={{ marginTop: 60, display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>AI-Powered Proctoring</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Bank-Level Security</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── STATS ─── */}
        <section style={{ padding: '48px 0', background: 'rgba(17,24,39,0.7)' }}>
          <div className="container-wide">
            <div className="grid-4">
              <div className="stat-box">
                <div className="stat-value"><Counter target="500+" /></div>
                <div className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Institutions</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="2000+" /></div>
                <div className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Exams Conducted</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="99%" /></div>
                <div className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Uptime SLA</div>
              </div>
              <div className="stat-box">
                <div className="stat-value"><Counter target="10000+" /></div>
                <div className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Students Served</div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── FEATURES ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.75)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 40 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8, color: '#ffffff' }}>Everything You Need</h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, textAlign: 'left' }}>From secure proctoring to instant results — a complete examination ecosystem.</p>
            </div>
            
            <div className="grid-3">
              {features.map(f => (
                <div key={f.title} className="card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="card-icon">{f.icon}</div>
                  <h3 className="title-card" style={{ color: '#ffffff' }}>{f.title}</h3>
                  <p className="card-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.7)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 40 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8, color: '#ffffff' }}>Launch in Minutes</h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, textAlign: 'left' }}>Get started in four simple steps.</p>
            </div>
            
            <div className="grid-4">
              {steps.map((step, i) => (
                <div key={step.number} className={`step-card ${activeStep === i ? 'active' : ''}`} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="step-number">{step.number}</div>
                  <h3 className="step-title" style={{ color: '#ffffff' }}>{step.title}</h3>
                  <p className="step-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── TESTIMONIALS ─── */}
        <section style={{ padding: '64px 0', background: 'rgba(17,24,39,0.75)' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 40 }}>
              <h2 className="title-section" style={{ textAlign: 'left', marginBottom: 8, color: '#ffffff' }}>Trusted by Educators</h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, textAlign: 'left' }}>See what institutions across India are saying.</p>
            </div>
            
            <div className="grid-3">
              {testimonials.map(t => (
                <div key={t.name} className="testimonial-card" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <p className="testimonial-content" style={{ color: 'rgba(255,255,255,0.85)' }}>"{t.content}"</p>
                  <div className="testimonial-name" style={{ color: '#ffffff' }}>{t.name}</div>
                  <div className="testimonial-role" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="container-wide" style={{ padding: '80px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', background: 'linear-gradient(135deg, rgba(249,115,22,0.95) 0%, #ea580c 100%)', borderRadius: 32, padding: '60px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 30, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', background: 'rgba(255,255,255,0.2)', color: '#ffffff', marginBottom: 24 }}>Get Started Today</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', marginBottom: 16 }}>Ready to Transform Your Examinations?</h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 32 }}>Join 500+ educational institutions that trust ExamSpot. Start free — no credit card required.</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="/register" style={{ background: '#ffffff', color: '#f97316', fontWeight: 600, padding: '16px 36px', borderRadius: 14, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  Get Started Free
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="/about" style={{ background: 'transparent', color: '#ffffff', fontWeight: 600, padding: '16px 36px', borderRadius: 14, border: '2px solid rgba(255,255,255,0.4)', fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Learn More
                </a>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[['No credit card required', 'Start your 14-day free trial today'], ['Instant setup', 'Up and running in minutes'], ['24/7 Support', 'Always here when you need us']].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'rgba(255,255,255,0.15)', borderRadius: 16, backdropFilter: 'blur(10px)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </div>
  );
}
