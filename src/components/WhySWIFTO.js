import React from 'react';

function WhySWIFTO() {
  const reasons = [
    { icon: '10',   title: '10 Min Truck Confirm',  desc: 'AI confirms the nearest truck in 10 minutes — no waiting, no hassle.',                        gradient: 'linear-gradient(135deg, #5b21b6, #8b5cf6)' },
    { icon: 'GPS',  title: 'Real-Time Tracking',    desc: 'Track your truck live via GPS — get updates every minute on SMS and WhatsApp.',               gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)' },
    { icon: 'Rs.',  title: 'Best Price Guarantee',  desc: 'AI-powered transparent pricing — no hidden charges, pay only what you see.',                   gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' },
    { icon: '500+', title: 'Largest Fleet',         desc: 'From 7ft to 40ft Container — 500+ trucks available on a single platform.',                     gradient: 'linear-gradient(135deg, #b45309, #f59e0b)' },
    { icon: 'AI',   title: 'Hindi AI Agent',        desc: "India's first Hindi Voice AI logistics assistant — available 24/7 in Hindi.",                  gradient: 'linear-gradient(135deg, #be185d, #ec4899)' },
    { icon: '24h',  title: '24hr Payment',          desc: 'Payment processed within 24 hours of delivery — no more 30-60 day waits.',                     gradient: 'linear-gradient(135deg, #065f46, #10b981)' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(160deg, #bcc8f0 0%, #c5d0f5 30%, #b8c5ee 60%, #aebde8 100%)',
      padding: '5rem 5%',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', background: 'rgba(245,240,225,0.7)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', background: 'rgba(100,130,220,0.15)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block', background: '#eef0ff', color: '#4361ee',
          fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem',
          borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase'
        }}>
          Why Choose Us
        </div>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem'
        }}>
          Why <span style={{ color: '#4361ee' }}>SWIFTO?</span>
        </h2>
        <p style={{ color: '#374151', fontSize: '1rem' }}>Better than competitors — here is the proof.</p>
      </div>

      {/* Reasons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {reasons.map((r, i) => (
          <div key={i}
            style={{
              background: r.gradient,
              borderRadius: '24px',
              padding: '2rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-25px', right: '-25px', width: '110px', height: '110px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

            {/* Icon badge */}
            <div style={{
              width: '56px', height: '56px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
              fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.85rem', color: 'white',
            }}>
              {r.icon}
            </div>

            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 900, color: 'white', marginBottom: '0.6rem' }}>{r.title}</h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.65, margin: 0, color: 'rgba(255,255,255,0.85)' }}>{r.desc}</p>
          </div>
        ))}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}

export default WhySWIFTO;