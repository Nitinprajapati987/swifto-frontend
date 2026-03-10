import React from 'react';

function WhySWIFTO() {
  const reasons = [
    { icon: '10',   title: '10 Min Truck Confirm',  desc: 'AI confirms the nearest truck in 10 minutes — no waiting, no hassle.' },
    { icon: 'GPS',  title: 'Real-Time Tracking',    desc: 'Track your truck live via GPS — get updates every minute on SMS and WhatsApp.' },
    { icon: 'Rs.',  title: 'Best Price Guarantee',  desc: 'AI-powered transparent pricing — no hidden charges, pay only what you see.' },
    { icon: '500+', title: 'Largest Fleet',         desc: 'From 7ft to 40ft Container — 500+ trucks available on a single platform.' },
    { icon: 'AI',   title: 'Hindi AI Agent',        desc: 'India\'s first Hindi Voice AI logistics assistant — available 24/7 in Hindi.' },
    { icon: '24h',  title: '24hr Payment',          desc: 'Payment processed within 24 hours of delivery — no more 30-60 day waits.' },
  ];

  const stats = [
    { value: '20+',    label: 'Factories Served', sub: 'Pithampur and Pan India' },
    { value: '2500+',  label: 'Trucks Network',   sub: 'MP, MH, RJ and more' },
    { value: '10 Min', label: 'Truck Confirm',    sub: 'Average time' },
    { value: '24hr',   label: 'Payment',          sub: 'Guaranteed' },
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

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        maxWidth: '900px',
        margin: '0 auto 4rem',
        position: 'relative',
        zIndex: 1
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center',
            background: 'white',
            borderRadius: '16px',
            padding: '1.25rem 1rem',
            border: '1.5px solid #e8eaff',
            boxShadow: '0 2px 12px rgba(67,97,238,0.08)'
          }}>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.8rem', fontWeight: 900, color: '#4361ee', margin: 0 }}>{s.value}</p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#1a1a2e', margin: '4px 0 2px' }}>{s.label}</p>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: '#eef0ff',
          color: '#4361ee',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.35rem 1rem',
          borderRadius: '100px',
          marginBottom: '0.75rem',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          Why Choose Us
        </div>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 900,
          color: '#1a1a2e',
          letterSpacing: '-0.5px',
          marginBottom: '0.5rem'
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
              background: '#eef0ff',
              border: '1.5px solid #c7d2fe',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(67,97,238,0.06)',
              transition: 'all 0.25s',
              cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#4361ee';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(67,97,238,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#c7d2fe';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(67,97,238,0.06)';
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              background: '#4361ee',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 900,
              fontSize: '0.85rem',
              color: 'white',
            }}>
              {r.icon}
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.6rem' }}>{r.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');
        @media (max-width: 640px) {
          .whyswifto-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default WhySWIFTO;