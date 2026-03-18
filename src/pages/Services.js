import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import factory1 from '../assets/logos/factory1.png';
import factory2 from '../assets/logos/factory2.png';
import factory3 from '../assets/logos/factory3.png';
import factory4 from '../assets/logos/factory4.png';
import swiftoLogo from '../assets/logos/logo.png';

const SERVICES = [
  {
    id: 'b2b-logistics',
    num: '01',
    title: 'B2B Logistics',
    sub: 'Factory to Factory Delivery',
    desc: 'End-to-end freight for manufacturers and suppliers. Bulk cargo, raw materials, finished goods — on time, every time.',
    features: ['Same-day pickup', 'Dedicated fleet', 'Real-time GPS', 'GST billing'],
    accent: '#f59e0b',
    img: factory1,
    tag: 'Most Popular',
  },
  {
    id: 'full-truck-load',
    num: '02',
    title: 'Full Truck Load',
    sub: 'Dedicated Truck for Your Cargo',
    desc: 'Your goods, one truck, zero sharing. Fastest door-to-door freight for large volume consignments.',
    features: ['No intermediate stops', 'All vehicle sizes', 'Load insurance', 'Door-to-door'],
    accent: '#38bdf8',
    img: factory2,
    tag: 'FTL',
  },
  {
    id: 'part-load',
    num: '03',
    title: 'Part Load',
    sub: 'Pay Only for Space Used',
    desc: 'Share truck space, slash your freight cost by up to 60%. Perfect for SMBs shipping 100kg to 5 tons.',
    features: ['60% cost saving', 'Scheduled routes', 'Digital POD', 'Consolidated billing'],
    accent: '#4ade80',
    img: factory3,
    tag: 'PTL',
  },
  {
    id: 'packers-movers',
    num: '04',
    title: 'Packers & Movers',
    sub: 'Safe Household & Office Shifting',
    desc: 'Professional packing, loading, transport and unpacking. Homes, offices, industrial equipment — handled with care.',
    features: ['Pro packing team', 'Fragile handling', 'Office shifts', 'Insurance'],
    accent: '#fb923c',
    img: factory4,
    tag: 'Relocation',
  },
  {
    id: 'return-load',
    num: '05',
    title: 'Return Load Matching',
    sub: 'Zero Empty Trips',
    desc: 'Our AI matches returning trucks with loads on the same route — eliminating empty trips, cutting costs for everyone.',
    features: ['AI-powered', '40% cheaper', 'Same-day match', 'Pan-India'],
    accent: '#e879f9',
    img: factory1,
    tag: 'AI-Powered',
  },
  {
    id: 'container-transport',
    num: '06',
    title: 'Container Transport',
    sub: '20ft & 40ft Containers',
    desc: 'Specialized heavy-haul container freight for large-volume export and import. All major ports and ICDs covered.',
    features: ['20ft & 40ft', 'Port connectivity', 'ISO certified', 'Customs docs'],
    accent: '#34d399',
    img: factory2,
    tag: 'Heavy Cargo',
  },
  {
    id: 'enterprise-plans',
    num: '07',
    title: 'Enterprise Plans',
    sub: 'Custom Contracts for Businesses',
    desc: 'High-volume freight contracts with SLA guarantees, dedicated account managers and integrated dashboards.',
    features: ['Custom SLA', 'Account manager', 'Volume pricing', 'Dashboard'],
    accent: '#818cf8',
    img: factory3,
    tag: 'Enterprise',
  },
  {
    id: 'api-integration',
    num: '08',
    title: 'API Integration',
    sub: 'Connect Your ERP to SWIFTO',
    desc: 'Connect your ERP or WMS via REST API. Automate booking, tracking and reporting without changing your workflow.',
    features: ['REST API', 'Webhooks', 'ERP & WMS', 'Sandbox env'],
    accent: '#f472b6',
    img: factory4,
    tag: 'Tech',
  },
];

export default function Services() {
  const [hovered, setHovered]   = useState(null);
  const [visible, setVisible]   = useState({});
  const [heroImg, setHeroImg]   = useState(0);
  const [heroFade, setHeroFade] = useState(true);
  const refs       = useRef({});
  const heroImages = [factory1, factory2, factory3, factory4];

  // Hero image rotation
  useEffect(() => {
    const t = setInterval(() => {
      setHeroFade(false);
      setTimeout(() => { setHeroImg(i => (i + 1) % 4); setHeroFade(true); }, 300);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.08 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const rv = (id, delay = 0) => ({
    ref: el => { refs.current[id] = el; },
    'data-id': id,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", background:'#f7f6f3', minHeight:'100vh', color:'#111' }}>
      <style>{CSS}</style>
      <Navbar />

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <div style={{ position:'relative', overflow:'hidden', background:'#111', minHeight:'90vh', display:'flex', alignItems:'center' }}>

        {/* BG image */}
        <img src={heroImages[heroImg]} alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity: heroFade ? 0.22 : 0, transition:'opacity 0.3s ease', filter:'grayscale(0.4)' }} />

        {/* Amber diagonal accent */}
        <div style={{ position:'absolute', top:0, right:'30%', width:'2px', height:'100%', background:'linear-gradient(#f59e0b, transparent)', opacity:0.4 }} />
        <div style={{ position:'absolute', top:0, right:'calc(30% + 80px)', width:'1px', height:'60%', background:'linear-gradient(#f59e0b, transparent)', opacity:0.15 }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'1240px', margin:'0 auto', padding:'9rem 5% 6rem', width:'100%', display:'grid', gridTemplateColumns:'1fr 420px', gap:'5rem', alignItems:'center' }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'100px', padding:'6px 16px', marginBottom:'2rem' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#f59e0b' }} />
              <span style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase' }}>What We Offer</span>
            </div>

            <h1 style={{ fontFamily:"'Clash Display', 'Plus Jakarta Sans', sans-serif", fontSize:'clamp(3.5rem, 7vw, 6.5rem)', fontWeight:700, color:'white', lineHeight:0.92, letterSpacing:'-3px', marginBottom:'2.5rem' }}>
              Every<br />
              Freight<br />
              <span style={{ color:'#f59e0b' }}>Solution.</span>
            </h1>

            <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.45)', lineHeight:1.85, maxWidth:'460px', marginBottom:'3rem', fontWeight:400 }}>
              8 freight services on one platform. Two-wheelers to 40ft containers. Local deliveries to pan-India enterprise contracts.
            </p>

            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <Link to="/booking" style={{ textDecoration:'none' }}>
                <button className="btn-amber">Book a Delivery</button>
              </Link>
              <Link to="/contact" style={{ textDecoration:'none' }}>
                <button className="btn-white">Talk to Sales</button>
              </Link>
            </div>
          </div>

          {/* Right — service count cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              { n:'8+',    l:'Services',       c:'#f59e0b' },
              { n:'2,500+',l:'Active Drivers', c:'#38bdf8' },
              { n:'10',    l:'Min Confirm',    c:'#4ade80' },
              { n:'28+',   l:'Cities',         c:'#e879f9' },
            ].map((s, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', padding:'1.5rem', backdropFilter:'blur(8px)' }}>
                <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'2.2rem', fontWeight:800, color:s.c, lineHeight:1, marginBottom:'6px' }}>{s.n}</p>
                <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.35)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1.5px', margin:0 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          SERVICES — Alternating rows
      ══════════════════════════ */}
      <div style={{ background:'#f7f6f3', padding:'6rem 5% 4rem' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto' }}>

          <div {...rv('sh')} style={{ ...rv('sh').style, display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'5rem', flexWrap:'wrap', gap:'1.5rem' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'0.75rem' }}>
                <img src={swiftoLogo} alt="SWIFTO" style={{ height:'28px', width:'auto', objectFit:'contain' }} />
                <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#94a3b8', letterSpacing:'3px', textTransform:'uppercase', margin:0 }}>Our Services</p>
              </div>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(2rem, 3.5vw, 3rem)', fontWeight:800, color:'#0f172a', letterSpacing:'-1px', margin:0, lineHeight:1.1 }}>
                8 Ways to Move<br />Your Business Forward
              </h2>
            </div>
            <Link to="/booking" style={{ textDecoration:'none' }}>
              <button className="btn-dark">View All Rates</button>
            </Link>
          </div>

          {/* Service rows */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2px', background:'#e2e0db', borderRadius:'24px', overflow:'hidden' }}>
            {SERVICES.map((s, i) => (
              <div key={s.id}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                {...rv(`s${i}`, i * 0.04)}
                style={{
                  ...rv(`s${i}`, i * 0.04).style,
                  background: hovered === s.id ? '#fff' : '#faf9f7',
                  padding:'2rem 2.5rem',
                  display:'grid',
                  gridTemplateColumns:'80px 1fr 280px 200px',
                  gap:'2rem',
                  alignItems:'center',
                  transition:'background 0.2s, opacity 0.6s, transform 0.6s',
                  cursor:'default',
                }} className="svc-row">

                {/* Number */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'6px' }}>
                  <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.65rem', fontWeight:800, color: hovered === s.id ? s.accent : '#cbd5e1', letterSpacing:'2px', transition:'color 0.2s' }}>{s.num}</span>
                  <span style={{ fontSize:'0.58rem', fontWeight:700, color: hovered === s.id ? s.accent : '#94a3b8', background: hovered === s.id ? `${s.accent}15` : '#f1f5f9', border:`1px solid ${hovered === s.id ? s.accent+'30' : 'transparent'}`, padding:'2px 8px', borderRadius:'100px', textTransform:'uppercase', letterSpacing:'0.8px', whiteSpace:'nowrap', transition:'all 0.2s' }}>{s.tag}</span>
                </div>

                {/* Title + desc */}
                <div>
                  <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.15rem', fontWeight:800, color:'#0f172a', marginBottom:'4px', letterSpacing:'-0.3px' }}>{s.title}</h3>
                  <p style={{ fontSize:'0.8rem', fontWeight:600, color: hovered === s.id ? s.accent : '#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'8px', transition:'color 0.2s' }}>{s.sub}</p>
                  <p style={{ fontSize:'0.85rem', color:'#64748b', lineHeight:1.65, margin:0, maxWidth:'480px' }}>{s.desc}</p>
                </div>

                {/* Features pills */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {s.features.map((f, fi) => (
                    <span key={fi} style={{ fontSize:'0.7rem', fontWeight:600, color: hovered === s.id ? '#0f172a' : '#64748b', background: hovered === s.id ? `${s.accent}18` : '#f1f5f9', border:`1px solid ${hovered === s.id ? s.accent+'30' : '#e2e8f0'}`, padding:'4px 10px', borderRadius:'100px', whiteSpace:'nowrap', transition:'all 0.2s' }}>{f}</span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display:'flex', justifyContent:'flex-end' }}>
                  <Link to="/booking" style={{ textDecoration:'none' }}>
                    <button style={{ padding:'10px 20px', background: hovered === s.id ? s.accent : 'transparent', border:`1.5px solid ${hovered === s.id ? s.accent : '#e2e8f0'}`, borderRadius:'10px', color: hovered === s.id ? (s.accent === '#f59e0b' || s.accent === '#4ade80' || s.accent === '#34d399' || s.accent === '#fb923c' ? '#0f172a' : 'white') : '#64748b', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit', whiteSpace:'nowrap' }}>
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          HOW IT WORKS
      ══════════════════════════ */}
      <div style={{ background:'#0f172a', padding:'7rem 5%' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto' }}>
          <div {...rv('hw')} style={{ ...rv('hw').style, textAlign:'center', marginBottom:'5rem' }}>
            <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'1rem' }}>Process</p>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.8rem, 3vw, 2.8rem)', fontWeight:800, color:'white', letterSpacing:'-1px', margin:0 }}>
              Book to Delivery in 4 Steps
            </h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,0.06)', borderRadius:'20px', overflow:'hidden' }} className="steps-grid">
            {[
              { n:'01', t:'Fill the Form',    d:'Pickup, drop, vehicle and goods details in 2 minutes.',         img: factory1 },
              { n:'02', t:'Get Confirmed',    d:'Truck assigned and confirmed in under 10 minutes.',              img: factory2 },
              { n:'03', t:'Track Live',       d:'GPS tracking + WhatsApp updates throughout the journey.',        img: factory3 },
              { n:'04', t:'Delivered & Paid', d:'Goods delivered, payment processed within 24 hours.',           img: factory4 },
            ].map((step, i) => (
              <div key={i} {...rv(`st${i}`, i*0.1)} style={{ ...rv(`st${i}`, i*0.1).style, background:'#111827', padding:'2.5rem 1.75rem', position:'relative', overflow:'hidden' }} className="step-card">
                {/* BG image */}
                <img src={step.img} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.06, display:'block' }} />
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem' }}>
                    <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'0.65rem', fontWeight:800, color:'rgba(255,255,255,0.2)', letterSpacing:'3px' }}>{step.n}</span>
                    <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </div>
                  <h3 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'1.1rem', fontWeight:800, color:'white', marginBottom:'0.75rem', letterSpacing:'-0.3px' }}>{step.t}</h3>
                  <p style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.4)', lineHeight:1.7, margin:0 }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          CTA BANNER
      ══════════════════════════ */}
      <div style={{ padding:'5rem 5% 6rem', background:'#f7f6f3' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto' }}>
          <div {...rv('cta')} style={{ ...rv('cta').style, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.1)' }} className="cta-grid">

            {/* Left — image */}
            <div style={{ position:'relative', minHeight:'360px', overflow:'hidden' }}>
              <img src={factory3} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 60%, #0f172a 100%)' }} />
            </div>

            {/* Right — text */}
            <div style={{ background:'#0f172a', padding:'3.5rem 3rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Not Sure Where to Start?</p>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight:800, color:'white', letterSpacing:'-0.5px', lineHeight:1.2, marginBottom:'1.25rem' }}>
                Our Team Will Find the Right Solution for You
              </h2>
              <p style={{ fontSize:'0.9rem', color:'rgba(255,255,255,0.45)', lineHeight:1.8, marginBottom:'2.5rem' }}>
                Tell us your requirement — we'll recommend the best service, route, and vehicle for your load.
              </p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <Link to="/contact" style={{ textDecoration:'none' }}>
                  <button className="btn-amber">Talk to Our Team</button>
                </Link>
                <Link to="/booking" style={{ textDecoration:'none' }}>
                  <button className="btn-outline">Book Directly</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  button { font-family: inherit; cursor: pointer; }

  .btn-amber {
    background: #f59e0b; color: #0f172a; border: none;
    border-radius: 10px; padding: 13px 28px;
    font-weight: 800; font-size: 0.92rem;
    transition: all 0.2s; letter-spacing: 0.2px;
  }
  .btn-amber:hover { background: #d97706; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.4); }

  .btn-white {
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 10px;
    padding: 13px 28px; font-weight: 600; font-size: 0.92rem; transition: all 0.2s;
  }
  .btn-white:hover { background: rgba(255,255,255,0.14); color: white; }

  .btn-dark {
    background: #0f172a; color: white; border: none;
    border-radius: 10px; padding: 11px 22px;
    font-weight: 700; font-size: 0.85rem; transition: all 0.2s;
  }
  .btn-dark:hover { background: #1e293b; transform: translateY(-1px); }

  .btn-outline {
    background: transparent; color: rgba(255,255,255,0.65);
    border: 1.5px solid rgba(255,255,255,0.2); border-radius: 10px;
    padding: 13px 28px; font-weight: 600; font-size: 0.92rem; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.5); color: white; }

  .svc-row { cursor: default; }

  .step-card { transition: background 0.25s; }
  .step-card:hover { background: #1e293b !important; }

  @media (max-width: 1024px) {
    .svc-row { grid-template-columns: 80px 1fr !important; }
    .svc-row > div:nth-child(3),
    .svc-row > div:nth-child(4) { display: none; }
  }
  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .steps-grid { grid-template-columns: 1fr 1fr !important; }
    .cta-grid   { grid-template-columns: 1fr !important; }
    .cta-grid > div:first-child { min-height: 220px !important; }
    .svc-row { grid-template-columns: 60px 1fr !important; padding: 1.5rem !important; }
  }
  @media (max-width: 500px) {
    .steps-grid { grid-template-columns: 1fr !important; }
  }
`;