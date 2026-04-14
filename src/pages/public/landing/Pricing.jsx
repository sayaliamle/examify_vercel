import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for individual teachers and small classes.',
    features: ['Up to 50 students', '10 exams per month', 'Basic question bank', 'Email support', 'Standard reports'],
    cta: 'Get Started',
    href: '/register',
    accent: '#F97316',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹999',
    period: 'per month',
    description: 'For growing institutions and dedicated departments.',
    features: ['Up to 2,000 students', 'Unlimited exams', 'AI question generation', 'AI proctoring', 'Advanced analytics', 'Priority support', 'Custom certificates', 'Payment integration'],
    cta: 'Start Free Trial',
    href: '/register',
    accent: '#FB923C',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For universities and large organizations.',
    features: ['Unlimited everything', 'SSO & SAML', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option', 'Custom development', 'Training & onboarding'],
    cta: 'Contact Sales',
    href: 'mailto:hello@examsaas.com',
    accent: '#FDBA74',
    popular: false,
  },
];

const faqs = [
  { q: 'Is there a free trial for paid plans?', a: 'Yes, the Professional plan includes a 14-day free trial with full access to all features. No credit card required to start.' },
  { q: 'Can I switch plans at any time?', a: 'Absolutely. Upgrades take effect immediately, and downgrades apply at the next billing cycle with no data loss.' },
  { q: 'How does the student limit work?', a: 'Your student limit is the total number of unique students enrolled across all exams. Inactive students can be removed to free up slots.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers. All payments are processed securely via Razorpay.' },
  { q: 'Is my data secure?', a: 'Yes. All data is encrypted in transit and at rest. We use MongoDB Atlas with enterprise-grade security and are GDPR compliant.' },
  { q: 'Do you offer annual billing discounts?', a: 'Annual billing saves you up to 20% vs monthly. Contact us for institutional volume discounts on Professional and Enterprise plans.' },
];

const comparison = [
  { feature: 'Students', starter: '50', pro: '2,000', enterprise: 'Unlimited' },
  { feature: 'Monthly Exams', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'AI Question Generation', starter: false, pro: true, enterprise: true },
  { feature: 'AI Proctoring', starter: false, pro: true, enterprise: true },
  { feature: 'Advanced Analytics', starter: false, pro: true, enterprise: true },
  { feature: 'Custom Certificates', starter: false, pro: true, enterprise: true },
  { feature: 'SSO / SAML', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated Manager', starter: false, pro: false, enterprise: true },
  { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true },
  { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7 Dedicated' },
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

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [billing, setBilling] = useState('monthly');

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
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 26, 0.98));
          border: 1px solid rgba(249, 115, 22, 0.4);
          box-shadow: inset 0 0 40px rgba(249, 115, 22, 0.05), 0 20px 40px rgba(0, 0, 0, 0.4);
          border-radius: 24px;
        }
        
        .billing-toggle { display: inline-flex; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 4px; gap: 4px; }
        .billing-btn { padding: 8px 20px; border-radius: 9px; border: none; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.25s; }
        .billing-btn.active { background: rgba(249, 115, 22, 0.18); color: #F97316; border: 1px solid rgba(249, 115, 22, 0.3); }
        .billing-btn.inactive { background: transparent; color: rgba(255, 255, 255, 0.45); }
        
        .plan-card {
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; background: transparent; border: none; cursor: pointer; color: #FFFFFF; font-family: inherit; text-align: left; transition: background 0.2s; }
        .faq-btn:hover { background: rgba(255, 255, 255, 0.03); }
        
        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .section-title { font-size: 28px; }
          .section-subtitle { font-size: 16px; }
        }
      `}</style>

      <Header />

      <main style={{ flex: 1 }}>
        {/* ─── HERO ─── */}
        <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1554224155-6726b3bff858f?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.15) saturate(0.8)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9, 14, 26, 0.85) 0%, rgba(9, 14, 26, 0.7) 50%, rgba(9, 14, 26, 0.95) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.12), transparent)' }} />
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 24px', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', maxWidth: 1000, margin: '0 auto' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '100px', marginBottom: 32, animation: 'slideUp 0.7s ease forwards' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F97316', boxShadow: '0 0 16px rgba(249, 115, 22, 0.5)' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F97316' }}>Simple Pricing</span>
                </div>

                <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, animation: 'slideUp 0.7s ease forwards 0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                  Simple, <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Transparent</span><br />
                  Pricing
                </h2>

                <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 36, maxWidth: '480px', animation: 'slideUp 0.7s ease forwards 0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                  Start free, scale as you grow. No hidden fees, no surprises. Choose the plan that fits your institution.
                </p>

                <div style={{ display: 'flex', gap: 14, animation: 'slideUp 0.7s ease forwards 0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                  <a href="/register" className="btn-primary">
                    Get Started
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'slideUp 0.7s ease forwards 0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                {[
                  { title: '3 Plans', desc: 'Free to Enterprise' },
                  { title: 'No Hidden Fees', desc: 'Transparent pricing' },
                  { title: '14-day Trial', desc: 'Full access' },
                  { title: 'Cancel Anytime', desc: 'No commitments' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="22" height="22" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{item.title}</div>
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

        {/* ─── BILLING TOGGLE ─── */}
        <AnimatedSection>
          <section style={{ padding: '60px 0 20px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <div className="billing-toggle">
                <button className={`billing-btn ${billing === 'monthly' ? 'active' : 'inactive'}`} onClick={() => setBilling('monthly')}>Monthly</button>
                <button className={`billing-btn ${billing === 'annual' ? 'active' : 'inactive'}`} onClick={() => setBilling('annual')}>
                  Annual
                  <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(249, 115, 22, 0.2)', color: '#F97316', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>-20%</span>
                </button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ─── PLANS ─── */}
        <AnimatedSection>
          <section style={{ padding: '60px 0 100px' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {plans.map(plan => {
                  const annualPrice = plan.price === '₹999' ? '₹799' : plan.price;
                  const displayPrice = billing === 'annual' ? annualPrice : plan.price;
                  return (
                    <div key={plan.name} className="glass-card" style={{ position: 'relative', transform: plan.popular ? 'scale(1.02)' : undefined }}>
                      {plan.popular && (
                        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#F97316', color: '#ffffff', fontSize: 11, fontWeight: 800, padding: '4px 16px', borderRadius: 20, letterSpacing: '0.5px', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)' }}>
                          MOST POPULAR
                        </div>
                      )}

                      <div style={{ marginBottom: 24 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${plan.accent}18`, border: `1px solid ${plan.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: plan.accent, boxShadow: `0 0 12px ${plan.accent}80` }} />
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>{plan.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                          <span style={{ fontSize: 44, fontWeight: 800, color: plan.accent, letterSpacing: '-2px', lineHeight: 1 }}>{displayPrice}</span>
                          <span style={{ color: '#64748B', fontSize: 13 }}>/ {plan.period}</span>
                        </div>
                        {billing === 'annual' && plan.price === '₹999' && (
                          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>
                            <span style={{ textDecoration: 'line-through', marginRight: 6 }}>₹999/mo</span>
                            <span style={{ color: '#F97316', fontWeight: 600 }}>Save ₹2,400/year</span>
                          </div>
                        )}
                        <p style={{ color: '#94A3B8', fontSize: 14 }}>{plan.description}</p>
                      </div>

                      <ul style={{ listStyle: 'none', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {plan.features.map(feature => (
                          <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: `${plan.accent}18`, border: `1px solid ${plan.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="12" height="12" fill="none" stroke={plan.accent} strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span style={{ color: '#94A3B8', fontSize: 13 }}>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a href={plan.href} style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 14, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.3s', background: plan.popular ? `linear-gradient(135deg, ${plan.accent}, ${plan.accent}cc)` : 'rgba(255, 255, 255, 0.06)', color: '#ffffff', boxShadow: plan.popular ? `0 8px 30px rgba(249, 115, 22, 0.3)` : 'none' }}>
                        {plan.cta}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />

        {/* ─── CTA ─── */}
        <AnimatedSection>
          <section style={{ padding: '100px 0' }}>
            <div className="container">
              <div className="cta-section" style={{ padding: '54px 64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', marginBottom: 24 }}>
                      <svg width="16" height="16" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#F97316' }}>Get Started Today</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}>
                      Still Have Questions?
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 500 }}>
                      Our team is here to help. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <a href="/register" className="btn-primary">
                      Start Free Trial
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </a>
                    <a href="mailto:hello@examsaas.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontWeight: 600, fontSize: 15, borderRadius: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
                      Talk to Sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="divider" />
      </main>

      <Footer />
    </div>
  );
}
