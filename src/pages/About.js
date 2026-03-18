import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import nitinPhoto from '../assets/logos/nitinp.png';
import shivPhoto from '../assets/logos/ShivPrasadPrajapati.png';
import ankitPhoto from '../assets/logos/Ankit1.png';
import arunPhoto from '../assets/logos/Arun2.png';
import factory1 from '../assets/logos/factory1.png';
import factory2 from '../assets/logos/factory2.png';
import factory3 from '../assets/logos/factory3.png';
import factory4 from '../assets/logos/factory4.png';
import factory5 from '../assets/logos/factory5.png';

const FACTORIES = [factory1, factory2, factory3, factory4, factory5];

const STATS = [
  { num: '2025',   label: 'Year Founded' },
  { num: '2,500+', label: 'Driver Network' },
  { num: '100+',   label: 'Trips Completed' },
  { num: '28+',    label: 'Cities Covered' },
];

const TEAM = [
  {
    name: 'Nitin Prajapati',
    role: 'Founder, CEO & Technology Head',
    initials: 'NP',
    photo: nitinPhoto,
    accent: '#d97706',
    desc: 'Grew up in Pithampur. After MCA from NIT Trichy, returned to fix the broken logistics system slowing down the factories he grew up around. Built SWIFTO entirely solo — platform, tech, operations.',
    tags: ['Founder', 'CEO', 'Technology Head'],
  },
  {
    name: 'Shiv Prasad Prajapati',
    role: 'Chairman',
    initials: 'SP',
    photo: shivPhoto,
    accent: '#0ea5e9',
    desc: '50+ years of hands-on industrial experience across Central India. Deep expertise in manufacturing supply chains and freight operations that guides SWIFTO\'s strategic direction.',
    tags: ['50+ Years', 'Industry Veteran'],
  },
  {
    name: 'Shaiwal Singh',
    role: 'Tehsildar — Pithampur Industrial Area',
    initials: 'SS',
    photo: null,
    accent: '#10b981',
    desc: 'Administrative backbone of the Pithampur Industrial Area. His governance expertise ensures seamless freight coordination across the entire industrial zone.',
    tags: ['Pithampur', 'Administration'],
  },
  {
    name: 'Ankit Kumar Prajapati',
    role: 'Head of Industrial Relations',
    initials: 'AK',
    photo: ankitPhoto,
    accent: '#8b5cf6',
    desc: 'Electrical Engineer with 12+ years across textile and manufacturing in Gujarat and MP. Former Electrical Manager at Bridgestone India, Aghara Spintex, and Rajsamadhiyala Spintex.',
    tags: ['12+ Years', 'Electrical Engineer'],
  },
  {
    name: 'Arun Pandey',
    role: 'Field Manager',
    initials: 'AP',
    photo: arunPhoto,
    accent: '#ef4444',
    desc: 'On-ground operations leader ensuring every pickup, delivery, and driver coordination runs without a hitch. The bridge between SWIFTO\'s platform and real-world freight movement across Central India.',
    tags: ['Field Ops', 'Ground Execution'],
  },
];

const WHY = [
  { num: '01', title: '10 Min Confirmation',  desc: 'Fastest truck assignment in India. No calls, no waiting, no brokers.' },
  { num: '02', title: 'Verified Driver Fleet', desc: 'Every driver background-checked, trained, and GPS-equipped.' },
  { num: '03', title: 'Live GPS Tracking',     desc: 'Monitor your shipment from pickup to delivery, in real time.' },
  { num: '04', title: '24-Hour Payment',       desc: 'Direct bank transfer to drivers within 24 hours of delivery.' },
  { num: '05', title: 'Zero Hidden Charges',   desc: 'Price agreed upfront. No surprise invoices, ever.' },
  { num: '06', title: 'Return Load AI',        desc: 'Eliminates empty trips — drivers earn more, freight rates drop.' },
];

const COVERAGE = [
  { region: 'Madhya Pradesh', cities: 'Indore · Pithampur · Bhopal · Dewas · Ujjain' },
  { region: 'Maharashtra',    cities: 'Mumbai · Pune · Nagpur · Nashik' },
  { region: 'Gujarat',        cities: 'Ahmedabad · Surat · Vadodara · Rajkot' },
  { region: 'Delhi NCR',      cities: 'Delhi · Gurugram · Noida · Faridabad' },
  { region: 'Rajasthan',      cities: 'Jaipur · Jodhpur · Kota · Udaipur' },
  { region: 'South India',    cities: 'Hyderabad · Bangalore · Chennai' },
  { region: 'East India',     cities: 'Kolkata · Bhubaneswar · Patna' },
  { region: 'Uttar Pradesh',  cities: 'Lucknow · Kanpur · Agra · Varanasi' },
];

const CLIENTS = ['Bajaj Auto','Tata Motors','Cipla','Mahindra','MAHLE','Lupin','Force Motors','SRF','Eicher','Dhoot Automotive','Pratibha','Hindustan Motors'];

export default function About() {
  const [imgIdx, setImgIdx]           = useState(0);
  const [fade, setFade]               = useState(true);
  const [visible, setVisible]         = useState({});
  const intervalRef                   = useRef(null);
  const refs                          = useRef({});

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setImgIdx(i => (i + 1) % FACTORIES.length); setFade(true); }, 250);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

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
      transform: visible[id] ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    },
  });

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", background:'#fafaf8', minHeight:'100vh' }}>
      <style>{CSS}</style>
      <Navbar />

      {/* HERO */}
      <div style={{ position:'relative', height:'92vh', minHeight:'580px', overflow:'hidden' }}>
        <img key={imgIdx} src={FACTORIES[imgIdx]} alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
            opacity: fade ? 1 : 0, transition:'opacity 0.25s ease', filter:'brightness(0.35) saturate(0.85)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to top, #fafaf8, transparent)' }} />

        {/* Amber left accent line */}
        <div style={{ position:'absolute', left:'calc(5% - 24px)', top:'50%', transform:'translateY(-50%)', width:'3px', height:'100px', background:'linear-gradient(#f59e0b, transparent)', borderRadius:'2px' }} />

        <div style={{ position:'absolute', top:'50%', left:'5%', transform:'translateY(-52%)', maxWidth:'700px', zIndex:2 }}>
          <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1.5rem' }}>
            Est. 2025 — Pithampur, Madhya Pradesh
          </p>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(3rem, 6vw, 5.5rem)', fontWeight:700, color:'white', lineHeight:1.0, letterSpacing:'-1px', marginBottom:'2rem' }}>
            Built Where<br />
            <em style={{ color:'#f59e0b' }}>India Works.</em>
          </h1>
          <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.6)', lineHeight:1.8, maxWidth:'500px', marginBottom:'2.5rem', fontWeight:400 }}>
            SWIFTO was born inside Pithampur's 1,500-factory industrial corridor — where logistics was the one problem nobody had solved.
          </p>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <Link to="/booking" style={{ textDecoration:'none' }}>
              <button className="btn-amber">Book a Delivery</button>
            </Link>
            <Link to="/contact" style={{ textDecoration:'none' }}>
              <button className="btn-ghost">Contact Us</button>
            </Link>
          </div>
        </div>

        {/* Dot nav */}
        <div style={{ position:'absolute', bottom:'7rem', left:'5%', display:'flex', gap:'8px', zIndex:2 }}>
          {FACTORIES.map((_, i) => (
            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setImgIdx(i); setFade(true); }, 250); }}
              style={{ width: i===imgIdx ? '28px' : '8px', height:'8px', borderRadius:'100px', background: i===imgIdx ? '#f59e0b' : 'rgba(255,255,255,0.3)', border:'none', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
          ))}
        </div>
      </div>

      {/* STATS STRIP */}
      <div {...rv('stats')} style={{ ...rv('stats').style, background:'#0f172a' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, padding:'0 5%' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'3rem 1rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <p style={{ fontFamily:"'Playfair Display', serif", fontSize:'3rem', fontWeight:700, color:'#f59e0b', lineHeight:1, marginBottom:'8px' }}>{s.num}</p>
              <p style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.35)', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', margin:0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'8rem 5%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6rem', alignItems:'center' }} className="story-grid">
          <div {...rv('story-l')}>
            <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1.5rem' }}>Our Story</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight:700, color:'#0f172a', lineHeight:1.12, letterSpacing:'-0.5px', marginBottom:'2rem' }}>
              A Problem That<br />Needed Solving
            </h2>
            <div style={{ width:'48px', height:'3px', background:'#f59e0b', borderRadius:'2px', marginBottom:'2rem' }} />
            <p style={{ fontSize:'0.96rem', color:'#475569', lineHeight:1.9, marginBottom:'1.5rem' }}>
              Every day in Pithampur, factories with goods ready to ship spent hours chasing trucks. Brokers overcharged. Drivers ran empty on return trips. The system was broken — and nobody was fixing it.
            </p>
            <p style={{ fontSize:'0.96rem', color:'#475569', lineHeight:1.9, marginBottom:'2.5rem' }}>
              Nitin Prajapati grew up watching this. After NIT Trichy, he came back and built SWIFTO — end to end, alone — to solve the problem that had slowed India's industrial backbone for years.
            </p>
            <div style={{ borderLeft:'4px solid #f59e0b', paddingLeft:'1.5rem' }}>
              <p style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.1rem', fontStyle:'italic', color:'#0f172a', lineHeight:1.7, margin:'0 0 0.75rem' }}>
                "My vision is an India where no factory ever waits for a truck."
              </p>
              <p style={{ fontSize:'0.7rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1px', margin:0 }}>
                NITIN PRAJAPATI — FOUNDER & CEO
              </p>
            </div>
          </div>

          <div {...rv('story-r', 0.2)} style={{ ...rv('story-r', 0.2).style, position:'relative' }}>
            <div style={{ borderRadius:'20px', overflow:'hidden', height:'440px' }}>
              <img src={factory2} alt="factory" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
            </div>
            <div style={{ position:'absolute', bottom:'-1.5rem', left:'-1.5rem', background:'white', borderRadius:'16px', padding:'1.25rem 1.5rem', boxShadow:'0 16px 48px rgba(0,0,0,0.12)', border:'1px solid #f1f5f9' }}>
              <p style={{ fontFamily:"'Playfair Display', serif", fontSize:'2rem', fontWeight:700, color:'#f59e0b', lineHeight:1, margin:'0 0 4px' }}>1,500+</p>
              <p style={{ fontSize:'0.68rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'1px', margin:0 }}>Pithampur Factories</p>
            </div>
            <div style={{ position:'absolute', top:'1.5rem', right:'-1rem', background:'#0f172a', borderRadius:'10px', padding:'0.75rem 1.25rem', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
              <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', margin:0 }}>Pithampur, MP</p>
            </div>
          </div>
        </div>
      </div>

      {/* CLIENTS MARQUEE */}
      <div style={{ background:'#0f172a', padding:'2.5rem 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ textAlign:'center', fontSize:'0.58rem', fontWeight:700, color:'rgba(255,255,255,0.2)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'1.5rem' }}>
          Trusted by India's Leading Industries
        </p>
        <div style={{ display:'flex', gap:0, animation:'marquee 22s linear infinite', width:'max-content' }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} style={{ padding:'0 2.5rem', fontSize:'0.85rem', fontWeight:600, color:'rgba(255,255,255,0.22)', borderRight:'1px solid rgba(255,255,255,0.07)', whiteSpace:'nowrap', letterSpacing:'0.3px' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* WHY SWIFTO */}
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'8rem 5%' }}>
        <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'6rem', alignItems:'start' }} className="why-grid">
          <div {...rv('why-l')} style={{ ...rv('why-l').style, position:'sticky', top:'120px' }}>
            <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1.5rem' }}>The Difference</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'3rem', fontWeight:700, color:'#0f172a', lineHeight:1.1, letterSpacing:'-0.5px', marginBottom:'1.5rem' }}>
              Why<br />SWIFTO?
            </h2>
            <div style={{ width:'48px', height:'3px', background:'#f59e0b', borderRadius:'2px', marginBottom:'1.5rem' }} />
            <p style={{ fontSize:'0.88rem', color:'#64748b', lineHeight:1.8 }}>
              Six reasons India's top factories choose SWIFTO over traditional freight brokers.
            </p>
          </div>

          <div {...rv('why-r')}>
            {WHY.map((w, i) => (
              <div key={i} className="why-row" style={{ padding:'1.75rem 0', borderBottom:'1px solid #e2e8f0', display:'grid', gridTemplateColumns:'72px 1fr', gap:'1.5rem', alignItems:'flex-start' }}>
                <span className="why-num" style={{ fontFamily:"'Playfair Display', serif", fontSize:'2.2rem', fontWeight:700, color:'#e2e8f0', lineHeight:1, transition:'color 0.25s' }}>{w.num}</span>
                <div>
                  <h3 style={{ fontSize:'0.96rem', fontWeight:800, color:'#0f172a', marginBottom:'0.4rem' }}>{w.title}</h3>
                  <p style={{ fontSize:'0.85rem', color:'#64748b', lineHeight:1.7, margin:0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div style={{ background:'#0f172a', padding:'8rem 5%' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto' }}>
          <div {...rv('team-h')} style={{ ...rv('team-h').style, marginBottom:'4rem' }}>
            <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1rem' }}>Our People</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem, 3.5vw, 3rem)', fontWeight:700, color:'white', letterSpacing:'-0.5px', margin:0 }}>
              The Leadership Team
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'1rem' }} className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} {...rv(`tm${i}`, i * 0.08)} style={{ ...rv(`tm${i}`, i * 0.08).style }}>
                <div className="team-card" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', overflow:'hidden' }}>
                  <div style={{ height:'3px', background:`linear-gradient(90deg, ${t.accent}, transparent)` }} />
                  <div style={{ padding:'1.25rem', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'0.75rem' }}>
                    <div style={{ width:'72px', height:'88px', borderRadius:'12px', background:`${t.accent}1a`, border:`1.5px solid ${t.accent}40`, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {t.photo
                        ? <img src={t.photo} alt={t.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
                        : <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:'1.7rem', color:t.accent }}>{t.initials}</span>
                      }
                    </div>
                    <div>
                      <h3 style={{ fontSize:'0.85rem', fontWeight:800, color:'white', marginBottom:'4px' }}>{t.name}</h3>
                      <p style={{ fontSize:'0.58rem', fontWeight:700, color:t.accent, textTransform:'uppercase', letterSpacing:'0.8px', margin:0, lineHeight:1.5 }}>{t.role}</p>
                    </div>
                    <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', justifyContent:'center' }}>
                      {t.tags.map(tag => (
                        <span key={tag} style={{ fontSize:'0.58rem', fontWeight:700, color:t.accent, background:`${t.accent}18`, border:`1px solid ${t.accent}2e`, padding:'2px 8px', borderRadius:'100px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ height:'1px', background:'rgba(255,255,255,0.06)', margin:'0 1.25rem' }} />
                  <div style={{ padding:'1rem 1.25rem 1.5rem' }}>
                    <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.45)', lineHeight:1.75, margin:0 }}>{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COVERAGE */}
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'8rem 5%' }}>
        <div {...rv('cov-h')} style={{ ...rv('cov-h').style, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'end', marginBottom:'3.5rem' }} className="cov-header">
          <div>
            <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1rem' }}>Pan India Network</p>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem, 3.5vw, 3rem)', fontWeight:700, color:'#0f172a', letterSpacing:'-0.5px', margin:0, lineHeight:1.12 }}>
              We Deliver<br />Everywhere.
            </h2>
          </div>
          <p style={{ fontSize:'0.93rem', color:'#64748b', lineHeight:1.8, margin:0 }}>
            28+ cities across 8 states. From Pithampur to every corner of India — no route too far.
          </p>
        </div>
        <div {...rv('cov-g')} style={{ ...rv('cov-g').style, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(230px, 1fr))', gap:'1px', background:'#e2e8f0', borderRadius:'16px', overflow:'hidden' }}>
          {COVERAGE.map((c, i) => (
            <div key={i} className="cov-cell" style={{ background:'white', padding:'1.5rem', transition:'background 0.2s' }}>
              <div style={{ width:'22px', height:'3px', background:'#f59e0b', borderRadius:'2px', marginBottom:'0.75rem' }} />
              <h3 style={{ fontSize:'0.86rem', fontWeight:800, color:'#0f172a', marginBottom:'0.35rem' }}>{c.region}</h3>
              <p style={{ fontSize:'0.73rem', color:'#94a3b8', lineHeight:1.7, margin:0 }}>{c.cities}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin:'0 5% 6rem', borderRadius:'28px', overflow:'hidden', position:'relative' }}>
        <img src={factory4} alt="" style={{ width:'100%', height:'460px', objectFit:'cover', display:'block', filter:'brightness(0.28)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'3rem' }}>
          <p style={{ fontSize:'0.63rem', fontWeight:700, color:'#f59e0b', letterSpacing:'4px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Get Started Today</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem, 4vw, 3.5rem)', fontWeight:700, color:'white', letterSpacing:'-0.5px', lineHeight:1.1, marginBottom:'1.25rem', maxWidth:'580px' }}>
            Ready to Move<br />Your Next Load?
          </h2>
          <p style={{ fontSize:'0.96rem', color:'rgba(255,255,255,0.5)', maxWidth:'420px', lineHeight:1.75, marginBottom:'2.5rem' }}>
            10-minute confirmation. Transparent pricing. Real drivers. Real trucks.
          </p>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
            <Link to="/booking" style={{ textDecoration:'none' }}>
              <button className="btn-amber">Book a Delivery</button>
            </Link>
            <Link to="/driver-partner" style={{ textDecoration:'none' }}>
              <button className="btn-ghost">Join as Driver</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  button { font-family: inherit; }

  .btn-amber {
    background: #f59e0b; color: #0f172a; border: none;
    border-radius: 10px; padding: 13px 28px;
    font-weight: 800; font-size: 0.92rem;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;
  }
  .btn-amber:hover { background: #d97706; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,0.4); }

  .btn-ghost {
    background: transparent; color: rgba(255,255,255,0.75);
    border: 1.5px solid rgba(255,255,255,0.25); border-radius: 10px;
    padding: 13px 28px; font-weight: 600; font-size: 0.92rem;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: white; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .why-row { transition: padding 0.2s; cursor: default; }
  .why-row:hover { padding-left: 8px !important; }
  .why-row:hover .why-num { color: #f59e0b !important; }

  .team-card { transition: transform 0.25s, box-shadow 0.25s; }
  .team-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }

  @media (max-width: 1100px) {
    .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
  }
  @media (max-width: 700px) {
    .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  .cov-cell:hover { background: #fffbeb !important; }

  @media (max-width: 900px) {
    .story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .why-grid   { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .cov-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
  }
  @media (max-width: 600px) {
    div[style*="repeat(4,1fr)"] { grid-template-columns: 1fr 1fr !important; }
  }
`;