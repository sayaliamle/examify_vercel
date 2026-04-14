import Header from './Header';
import Footer from './Footer';
import { useEffect, useRef } from 'react';

const team = [
  { name: 'Vikram Singh', role: 'Founder & CEO', avatar: 'VS', bio: 'Former IIT professor with 15 years in educational technology.' },
  { name: 'Neha Gupta', role: 'CTO', avatar: 'NG', bio: 'Built exam systems serving 5M+ students at previous venture.' },
  { name: 'Arjun Mehta', role: 'Head of Product', avatar: 'AM', bio: 'Product leader with deep expertise in edtech and user experience.' },
  { name: 'Sneha Reddy', role: 'Head of Engineering', avatar: 'SR', bio: 'Distributed systems expert passionate about scalable architecture.' },
];

const values = [
  { title: 'Integrity First', description: 'We build technology that maintains the highest standards of examination integrity. Our AI proctoring is fair, accurate, and transparent.' },
  { title: 'Accessible Everywhere', description: 'Education should have no barriers. Our platform works on any device, in any location, regardless of technical constraints.' },
  { title: 'Speed & Reliability', description: '99.9% uptime and sub-second response times. Your exams never face technical delays when it matters most.' },
  { title: 'Privacy & Security', description: 'Student data privacy is paramount. GDPR compliant, end-to-end encryption, never compromising on data protection.' },
];

const milestones = [
  { year: '2022', label: 'Founded', detail: 'Dr. Vikram Singh builds the first version in 3 months' },
  { year: '2022', label: 'First 12 Institutions', detail: '50,000+ examinations across Delhi in year one' },
  { year: '2023', label: '100+ Institutions', detail: 'Expanded to colleges and universities nationwide' },
  { year: '2024', label: '500+ Institutions', detail: 'Processing millions of examinations annually' },
];

export default function About() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#090E1A', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .animate-on-scroll{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease;}
        .floating-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
        .glass-card{background:rgba(255,255,255,0.03);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:20px;}
        .badge{background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.25);color:#F97316;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;display:inline-block;}
        .btn-primary{background:#F97316;color:#fff;font-weight:700;border:none;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:inherit;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(249,115,22,0.45);}
        .btn-outline{background:transparent;color:#fff;font-weight:600;border:1.5px solid rgba(255,255,255,0.2);cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:inherit;}
        .btn-outline:hover{border-color:#F97316;background:rgba(249,115,22,0.09);color:#F97316;}
        .section-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(249,115,22,0.2),rgba(249,115,22,0.15),transparent);}
        .stat-card{background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:16px;padding:28px 20px;text-align:center;}
        @media(max-width:768px){.grid-4col{grid-template-columns:1fr!important;}}
      `}</style>

      <Header />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '160px 24px 100px' }}>
        <div className="floating-glow" style={{ width: 600, height: 500, top: -150, right: '10%', background: 'radial-gradient(circle,rgba(249,115,22,0.15) 0%,transparent 70%)' }} />
        <div className="floating-glow" style={{ width: 400, height: 400, bottom: -100, left: '5%', background: 'radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <span className="badge">About Us</span>
              <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginTop: 24, marginBottom: 24 }}>
                Building the Future of <span style={{ color: '#F97316' }}>Education</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
                Founded with a simple mission: make high-quality online examinations accessible to every educational institution in India.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/register" className="btn-primary" style={{ padding: '14px 28px', borderRadius: 12, fontSize: 15 }}>Get Started</a>
                <a href="#story" className="btn-outline" style={{ padding: '14px 28px', borderRadius: 12, fontSize: 15 }}>Learn More</a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { value: '500+', label: 'Institutions' },
                { value: '2M+', label: 'Exams Yearly' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Support' },
              ].map(stat => (
                <div key={stat.label} className="glass-card stat-card">
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#F97316', marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:768px){
            .hero-grid{display:block!important;}
            .hero-cards{grid-template-columns:1fr 1fr!important;margin-top:32px;}
          }
        `}</style>
      </section>

      <div className="section-divider" />

      {/* OUR STORY */}
      <section id="story" ref={addToRefs} className="animate-on-scroll" style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <span className="badge" style={{ marginBottom: 20 }}>Our Story</span>
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 24, lineHeight: 1.15 }}>
                From IIT Classroom to 500+ Institutions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
                  In 2022, Dr. Vikram Singh was teaching at IIT when the pandemic forced universities online. Existing solutions were too expensive, too complex, or lacked security features for high-stakes assessments.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
                  With support from colleagues and students, Vikram built the first version of ExamSaaS in just three months — immediately adopted by 12 institutions across Delhi, handling 50,000+ examinations.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.8 }}>
                  Today, ExamSaaS serves 500+ institutions — from small schools to major universities — processing millions of examinations annually across every state in India.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'linear-gradient(145deg,rgba(249,115,22,0.1),rgba(249,115,22,0.04))', border: '1px solid rgba(249,115,22,0.22)', borderRadius: 24, padding: 34, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -18, right: -10, fontSize: 100, color: 'rgba(249,115,22,0.07)', fontFamily: 'Georgia,serif', fontWeight: 900, lineHeight: 1, pointerEvents: 'none' }}>"</div>
                <blockquote style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginBottom: 22, position: 'relative' }}>
                  The examination is not just a test of knowledge — it is a pillar of educational integrity. We take that responsibility seriously.
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: 'linear-gradient(135deg,#F97316,#FFB432)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>VS</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>Dr. Vikram Singh</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12.5, marginTop: 2 }}>Founder & CEO, ExamSaaS</div>
                  </div>
                </div>
              </div>
              <div className="glass-card" style={{ padding: '8px 24px' }}>
                {milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '18px 0', borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <div style={{ minWidth: 56, padding: '4px 10px', borderRadius: 8, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', textAlign: 'center' }}>
                      <span style={{ color: '#F97316', fontSize: 12, fontWeight: 800 }}>{m.year}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 3 }}>{m.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.6 }}>{m.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:768px){
            #story > div > div:first-child{display:block!important;}
            #story > div > div:last-child{margin-top:32px;}
          }
        `}</style>
      </section>

      <div className="section-divider" />

      {/* VALUES */}
      <section ref={addToRefs} className="animate-on-scroll" style={{ padding: '88px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge" style={{ marginBottom: 16 }}>Our Values</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, color: '#fff' }}>
              What <span style={{ color: '#F97316' }}>Drives</span> Us Every Day
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Our core principles guide every decision we make and every feature we build.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <div key={v.title} className="glass-card" style={{ padding: 32, borderTop: '3px solid rgba(249,115,22,0.4)', transition: 'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(249,115,22,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(249,115,22,0.08))', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                    {i === 1 && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                    {i === 2 && <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>}
                    {i === 3 && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>}
                  </svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#fff' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TEAM */}
      <section ref={addToRefs} className="animate-on-scroll" style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge" style={{ marginBottom: 16 }}>Our Team</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, color: '#fff' }}>
              Meet the People Behind <span style={{ color: '#F97316' }}>ExamSaaS</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              A passionate team dedicated to transforming education through technology.
            </p>
          </div>
          <div className="grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {team.map(member => (
              <div key={member.name} className="glass-card" style={{ padding: 32, textAlign: 'center', transition: 'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(249,115,22,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg,#F97316,#FFB432)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20, margin: '0 auto 20px', boxShadow: '0 8px 32px rgba(249,115,22,0.3)' }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#fff' }}>{member.name}</h3>
                <div style={{ color: '#F97316', fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{member.role}</div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.65 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* STATS */}
      <section ref={addToRefs} className="animate-on-scroll" style={{ padding: '64px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="grid-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { value: '2022', label: 'Founded' },
              { value: '40+', label: 'Team Members' },
              { value: 'Delhi NCR', label: 'Headquarters' },
              { value: '24/7', label: 'Support' },
            ].map(stat => (
              <div key={stat.label} className="glass-card" style={{ padding: '28px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F97316', marginBottom: 6 }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={addToRefs} className="animate-on-scroll" style={{ padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="floating-glow" style={{ width: 500, height: 350, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(249,115,22,0.15) 0%,transparent 70%)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, color: '#fff' }}>
            Want to Partner With Us?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, marginBottom: 32, lineHeight: 1.7 }}>
            Institution, integration partner, or investor — we would love to hear from you.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/register" className="btn-primary" style={{ padding: '16px 36px', borderRadius: 12, fontSize: 16 }}>Get Started</a>
            <a href="mailto:hello@examsaas.com" className="btn-outline" style={{ padding: '16px 36px', borderRadius: 12, fontSize: 16 }}>Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
