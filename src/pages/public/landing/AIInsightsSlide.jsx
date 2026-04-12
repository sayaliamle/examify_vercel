import { useState } from 'react';

const AIInsightsSlide = () => {
  const [temperatureValue, setTemperatureValue] = useState(0.7);
  const [activeCard, setActiveCard] = useState(null);

  const concepts = [
    {
      term: 'Tokens',
      explanation: 'Every word, code snippet, or symbol in a student\'s answer is broken into tokens. Our AI grader processes up to 4,000 tokens per response.',
      icon: '🔤',
    },
    {
      term: 'Context Window',
      explanation: 'The AI remembers the last 8,000 tokens of the exam session — including previous answers and proctoring events.',
      icon: '🪟',
    },
    {
      term: 'Temperature',
      explanation: 'Controls the randomness of AI-generated distractors. Low = predictable, high = creative question variations.',
      icon: '🌡️',
    },
    {
      term: 'Hallucination',
      explanation: 'When the AI invents false facts. ExamSpot uses cross-checking to flag potential hallucinations for human review.',
      icon: '👻',
    },
    {
      term: 'RAG',
      explanation: 'Retrieval-Augmented Generation. ExamSpot pulls from your verified question bank — grounding every output in real data.',
      icon: '📚',
    },
  ];

  return (
    <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, #090E1A 0%, #0F172A 50%, #090E1A 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'radial-gradient(ellipse at 30% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(251, 146, 60, 0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
      
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start', marginBottom: '80px' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(249, 115, 22, 0.1)', padding: '8px 20px', borderRadius: '60px', marginBottom: '24px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F97316', boxShadow: '0 0 12px #F97316' }} />
              <span style={{ fontWeight: 600, color: '#F97316', fontSize: '13px' }}>TOP 10% know this</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              5 AI Terms<br />
              <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>You Must Know</span>
            </h2>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: '15px', marginBottom: '32px' }}>
              ExamSpot leverages cutting‑edge AI to deliver fair, accurate, and insightful assessments.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['99.9% accuracy', 'RAG-powered', 'Real-time'].map((tag, i) => (
                <span key={i} style={{ 
                  padding: '6px 14px', 
                  background: 'rgba(249, 115, 22, 0.1)', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  color: '#FB923C', 
                  fontSize: '11px', 
                  fontWeight: 500 
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {concepts.map((c, idx) => (
              <div
                key={idx}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '28px 0',
                  borderBottom: idx < concepts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeCard === idx ? 'rgba(249, 115, 22, 0.03)' : 'transparent',
                  borderRadius: '16px',
                  paddingLeft: activeCard === idx ? '20px' : '0',
                  marginLeft: activeCard === idx ? '-20px' : '0',
                  paddingRight: activeCard === idx ? '20px' : '0',
                  marginRight: activeCard === idx ? '-20px' : '0',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(249, 115, 22, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  transition: 'all 0.3s ease',
                  transform: activeCard === idx ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    background: 'linear-gradient(135deg, #F97316, #FB923C)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text', 
                    fontSize: '17px', 
                    fontWeight: 700, 
                    marginBottom: activeCard === idx ? '8px' : '0',
                    transition: 'all 0.3s ease'
                  }}>{c.term}</h3>
                  <p style={{ 
                    color: '#94A3B8', 
                    fontSize: '13px', 
                    lineHeight: 1.6,
                    overflow: 'hidden',
                    maxHeight: activeCard === idx ? '100px' : '0',
                    opacity: activeCard === idx ? 1 : 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {c.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '48px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(249, 115, 22, 0.15)',
            borderRadius: '32px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontWeight: 600, color: '#FCD9B6', fontSize: '15px' }}>focused</span>
            <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '16px' }}>🌡️ Temperature Control</span>
            <span style={{ fontWeight: 600, color: '#FCD9B6', fontSize: '15px' }}>creative</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={temperatureValue}
            onChange={(e) => setTemperatureValue(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '12px',
              borderRadius: '12px',
              background: `linear-gradient(90deg, #F97316 ${temperatureValue * 100}%, rgba(255,255,255,0.1) ${temperatureValue * 100}%)`,
              appearance: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: '#64748B', fontSize: '13px' }}>
            <span>0.0</span>
            <span style={{ color: '#F97316', fontWeight: 700, fontSize: '18px' }}>{temperatureValue.toFixed(2)}</span>
            <span>1.0</span>
          </div>
          <p style={{ marginTop: '20px', color: '#94A3B8', fontSize: '14px' }}>
            Adaptive temperature for MCQs vs essay prompts
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIInsightsSlide;
