import React, { useEffect, useRef, useState } from 'react';

const REASONS = [
  { icon:'10', title:'10 Min Truck Confirm',  desc:'AI confirms the nearest truck in 10 minutes — no waiting, no hassle.',                      accent:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
  { icon:'GPS', title:'Real-Time Tracking',   desc:'Track your truck live via GPS — get updates every minute on WhatsApp.',                       accent:'#0ea5e9', bg:'#eff6ff', border:'#bfdbfe' },
  { icon:'Rs.', title:'Best Price Guarantee', desc:'AI-powered transparent pricing — no hidden charges, pay only what you see.',                  accent:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0' },
  { icon:'500+', title:'Largest Fleet',       desc:'From 7ft to 40ft Container — 500+ trucks available on a single platform.',                    accent:'#a855f7', bg:'#fdf4ff', border:'#e9d5ff' },
  { icon:'AI',  title:'Hindi AI Agent',       desc:"India's first Hindi Voice AI logistics assistant — available 24/7 in Hindi.",                  accent:'#f43f5e', bg:'#fff1f2', border:'#fecdd3' },
  { icon:'24h', title:'24hr Payment',         desc:'Payment processed within 24 hours of delivery — no more 30-60 day waits.',                    accent:'#10b981', bg:'#ecfdf5', border:'#a7f3d0' },
];

export default function WhySWIFTO() {
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const rv = (id, delay = 0) => ({
    ref: el => { refs.current[id] = el; },
    'data-id': id,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  return (
    <div style={{ background:'#f7f6f3', padding:'6rem 5%', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      <div style={{ maxWidth:'1240px', margin:'0 auto' }}>

        {/* Header */}
        <div {...rv('head')} style={{ ...rv('head').style, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'end', marginBottom:'4rem' }} className="why-header">
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'1rem' }}>Why Choose Us</p>
            <h2 style={{ fontSize:'clamp(2rem, 3.5vw, 3rem)', fontWeight:800, color:'#0f172a', letterSpacing:'-1px', lineHeight:1.1, margin:0 }}>
              Why <span style={{ color:'#f59e0b' }}>SWIFTO?</span>
            </h2>
          </div>
          <p style={{ fontSize:'0.95rem', color:'#64748b', lineHeight:1.8, margin:0 }}>
            Better than traditional freight brokers in every way — faster confirmation, transparent pricing, live tracking and guaranteed payment.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:'#e2e0db', borderRadius:'20px', overflow:'hidden' }} className="why-grid">
          {REASONS.map((r, i) => (
            <div key={i} {...rv(`r${i}`, i * 0.08)} style={{ ...rv(`r${i}`, i * 0.08).style }}>
              <div className="why-card" style={{ background:'white', padding:'2rem', height:'100%', transition:'background 0.2s', boxSizing:'border-box' }}>
                {/* Icon */}
                <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:r.bg, border:`1.5px solid ${r.border}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                  <span style={{ fontSize:'0.75rem', fontWeight:800, color:r.accent, letterSpacing:'0.5px' }}>{r.icon}</span>
                </div>
                {/* Amber bar */}
                <div style={{ width:'32px', height:'3px', background:r.accent, borderRadius:'2px', marginBottom:'1rem', opacity:0.7 }} />
                <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#0f172a', marginBottom:'0.5rem', letterSpacing:'-0.2px' }}>{r.title}</h3>
                <p style={{ fontSize:'0.83rem', color:'#64748b', lineHeight:1.75, margin:0 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div {...rv('cta', 0.3)} style={{ ...rv('cta', 0.3).style, marginTop:'3rem', background:'#0f172a', borderRadius:'20px', padding:'2rem 2.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem' }}>
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'4px' }}>Ready to Move?</p>
            <h3 style={{ fontSize:'1.2rem', fontWeight:800, color:'white', margin:0, letterSpacing:'-0.3px' }}>Book your first delivery in 2 minutes</h3>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <a href="/booking" style={{ textDecoration:'none' }}>
              <button style={{ background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', padding:'12px 24px', fontWeight:800, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s' }}>
                Book Now
              </button>
            </a>
            <a href="/contact" style={{ textDecoration:'none' }}>
              <button style={{ background:'transparent', color:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(255,255,255,0.2)', borderRadius:'10px', padding:'12px 24px', fontWeight:600, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s' }}>
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .why-card:hover { background: #fffbeb !important; }
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
        @media (max-width: 560px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}