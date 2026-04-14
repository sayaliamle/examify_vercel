import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const featureGroups = [
  {
    category: 'Examination',
    accent: '#F97316',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    features: [
      { title: 'Multiple Question Types', description: 'MCQ, multiple select, true/false, fill in blank, and descriptive with auto/manual grading.' },
      { title: 'Randomized Question Pools', description: 'Pull from your bank randomly, shuffle options, and ensure every student gets a unique paper.' },
      { title: 'Flexible Time Windows', description: 'Set start/end times, grace periods, and auto-submit across all time zones.' },
      { title: 'Secure Exam Mode', description: 'Browser lockdown, fullscreen enforcement, copy-paste disable, and tab-switch monitoring.' },
    ],
  },
  {
    category: 'AI & Automation',
    accent: '#FB923C',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    features: [
      { title: 'AI Question Generation', description: 'Import a PDF or describe a topic — AI generates high-quality MCQs instantly.' },
      { title: 'AI Proctoring', description: 'Face verification, face matching, and anomaly detection during live exams.' },
      { title: 'Smart Analytics', description: 'AI-powered insights into question difficulty and personalized performance recommendations.' },
      { title: 'Auto-Grading', description: 'Instant scoring for objective questions. Descriptive answers graded manually or with AI.' },
    ],
  },
  {
    category: 'Management',
    accent: '#FDBA74',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    features: [
      { title: 'Role-Based Access', description: 'Super admins, institute admins, teachers, and students — each with tailored dashboards.' },
      { title: 'Bulk Student Import', description: 'Upload CSV files or integrate with your student information system in minutes.' },
      { title: 'Certificate Generation', description: 'Automatically generate and send branded PDF certificates to students who pass.' },
      { title: 'Payment & Wallet', description: 'Built-in wallet system with Razorpay integration for exam purchases and top-ups.' },
    ],
  },
  {
    category: 'Integration',
    accent: '#F97316',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    features: [
      { title: 'Cloud Storage', description: 'All uploaded files stored securely on Cloudinary — images, answer sheets, certificates.' },
      { title: 'REST API', description: 'Comprehensive API for integrating with your LMS, SIS, or custom applications.' },
      { title: 'Webhooks', description: 'Real-time event notifications for exam completion, payments, and certificate generation.' },
      { title: 'SSO & SAML', description: 'Enterprise SSO with SAML 2.0 integration for seamless institutional authentication.' },
    ],
  },
];

const stack = [
  { name: 'MongoDB Atlas', desc: 'Database', color: '#F97316' },
  { name: 'Cloudinary', desc: 'File Storage', color: '#FB923C' },
  { name: 'Razorpay', desc: 'Payments', color: '#FDBA74' },
  { name: 'Redis', desc: 'Caching', color: '#F97316' },
];

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

export default function Features() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#090E1A', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes floatUpFeature {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .glass-feature {
          background: linear-gradient(145deg, rgba(21, 8, 40, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%); 
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: floatUpFeature 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          cursor: pointer;
        }

        .glass-feature-glow {
          position: absolute;
          top: -50px; left: -50px;
          width: 100px; height: 100px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .glass-feature:hover {
          background: linear-gradient(145deg, rgba(21, 8, 40, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%);
          transform: translateY(-6px);
        }
        .glass-feature:hover .glass-feature-glow {
          opacity: 1;
        }
        
        .section-title { font-size: clamp(32px, 5vw, 48px); font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; margin-bottom: 16px; }
        .section-subtitle { font-size: 18px; color: #94A3B8; line-height: 1.7; max-width: 600px; }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #F97316, #EA580C);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
        }
        
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent); max-width: 50%; margin: 0 auto; }
        
        .cta-section {
          background: linear-gradient(135deg, #F97316, #EA580C);
          border-radius: 32px;
          padding: 80px;
          position: relative;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .section-title { font-size: 28px; }
          .section-subtitle { font-size: 16px; }
          .cta-section { padding: 48px 24px; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>
        {/* ─── HERO ─── */}
        <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.15) saturate(0.8)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9, 14, 26, 0.85) 0%, rgba(9, 14, 26, 0.7) 50%, rgba(9, 14, 26, 0.95) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.12), transparent)' }} />
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div style={{ animation: 'slideUp 0.7s ease forwards' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '100px', marginBottom: 32 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F97316', boxShadow: '0 0 16px rgba(249, 115, 22, 0.5)' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F97316' }}>Powerful Features</span>
                </div>

                <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
                  Built for <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Modern</span><br />
                  Education
                </h2>

                <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 36, maxWidth: '480px' }}>
                  Every feature designed with educators and students in mind — from simple quizzes to high-stakes proctored examinations.
                </p>

                <div style={{ display: 'flex', gap: 16 }}>
                  <a href="/register" className="btn-primary">
                    Get Started
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'slideUp 0.7s ease forwards 0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                {[
                  { title: '16+ Features', desc: 'Comprehensive tools' },
                  { title: 'AI-Powered', desc: 'Smart automation' },
                  { title: 'Secure', desc: 'Enterprise-grade' },
                  { title: 'Scalable', desc: 'Cloud infrastructure' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="24" height="24" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#94A3B8' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #090E1A, transparent)' }} />
        </section>

        <div className="divider" />

        {/* ─── FEATURE GROUPS ─── */}
        {featureGroups.map((group, gi) => (
          <AnimatedSection key={group.category} delay={gi * 100}>
            <section style={{ padding: '100px 0', background: gi % 2 === 1 ? 'rgba(15, 23, 42, 0.3)' : '#090E1A' }}>
              <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                  <div style={{ order: gi % 2 === 0 ? 0 : 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px', background: `${group.accent}15`, border: `1px solid ${group.accent}30`, borderRadius: 100, marginBottom: 24 }}>
                      <svg width="20" height="20" fill="none" stroke={group.accent} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={group.icon} /></svg>
                      <span style={{ fontSize: 13, fontWeight: 600, color: group.accent }}>{group.category}</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
                      {group.category}<br />
                      <span style={{ background: `linear-gradient(135deg, ${group.accent}, ${group.accent}80)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Features</span>
                    </h2>
                    <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 32 }}>
                      Explore our comprehensive {group.category.toLowerCase()} features designed to streamline your workflow.
                    </p>
                    <a href="/register" className="btn-primary" style={{ display: 'inline-flex' }}>
                      Learn More
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </a>
                  </div>

                  <div style={{ order: gi % 2 === 0 ? 1 : 0 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {group.features.map((f, fi) => (
                        <div key={f.title} style={{ padding: '24px', background: 'linear-gradient(145deg, rgba(21, 8, 40, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)', border: `1px solid ${group.accent}20`, borderRadius: '20px', transition: 'all 0.4s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden', opacity: 0, animation: `floatUpFeature 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${fi * 0.15}s` }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = `${group.accent}60`;
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = `0 10px 30px ${group.accent}15`;
                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(21, 8, 40, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)';
                            e.currentTarget.children[0].style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = `${group.accent}20`;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(21, 8, 40, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)';
                            e.currentTarget.children[0].style.opacity = '0';
                          }}>
                          <div style={{ position: 'absolute', top: -50, left: -50, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${group.accent}25 0%, transparent 70%)`, pointerEvents: 'none', opacity: 0, transition: 'opacity 0.4s ease' }} />
                          <div style={{ width: 44, height: 44, borderRadius: 14, background: `${group.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                            <svg width="20" height="20" fill="none" stroke={group.accent} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', marginBottom: 8, position: 'relative', zIndex: 1 }}>{f.title}</h3>
                          <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
        ))}

        <div className="divider" />

        {/* ─── TECH STACK ─── */}
        <AnimatedSection>
          <section style={{ padding: '100px 0', background: 'rgba(15, 23, 42, 0.3)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <h2 className="section-title">Built With <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Best-in-Class</span></h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>Powered by enterprise-grade infrastructure for reliability, security, and performance at scale.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {stack.map(item => (
                  <div key={item.name} style={{ padding: '32px 24px', background: 'rgba(15, 23, 42, 0.6)', border: `1px solid ${item.color}30`, borderRadius: 20, textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${item.color}50`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${item.color}30`; }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${item.color}18`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, boxShadow: `0 0 16px ${item.color}` }} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#94A3B8' }}>{item.desc}</div>
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
              <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 26, 0.98))', border: '1px solid rgba(249, 115, 22, 0.4)', boxShadow: 'inset 0 0 40px rgba(249, 115, 22, 0.05), 0 20px 40px rgba(0, 0, 0, 0.4)', padding: '54px 64px', borderRadius: '24px' }}>
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
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Try It Free</span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
                      Ready to Experience It?
                    </h2>

                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 540 }}>
                      Start your free trial today. No credit card required.
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
      </main>

      <Footer />
    </div>
  );
}
