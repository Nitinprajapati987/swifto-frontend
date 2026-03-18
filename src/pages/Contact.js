import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import factory2 from '../assets/logos/factory2.png';

const SERVICES = ['B2B Logistics','Full Truck Load','Part Load','Packers & Movers','Return Load Matching','Enterprise Plan','API Integration'];

const CONTACT_ITEMS = [
  {
    label: 'Call Us',
    value: '+91 9179838941',
    sub: 'Available 24 hours, 7 days',
    href: 'tel:+919179838941',
    accent: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  {
    label: 'WhatsApp',
    value: '+91 9179838941',
    sub: 'Quick response guaranteed',
    href: 'https://wa.me/919179838941',
    accent: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  {
    label: 'Email',
    value: 'info@swifto.in',
    sub: 'Response within 2 hours',
    href: 'mailto:info@swifto.in',
    accent: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
];

const HOURS = [
  ['Monday – Saturday', '9:00 AM – 8:00 PM'],
  ['Sunday',            '10:00 AM – 5:00 PM'],
  ['Emergency Support', 'All Time Available'],
];

function Field({ label, error, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
      <label style={{ fontSize:'0.7rem', fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.8px' }}>{label}</label>
      {children}
      {error && <p style={{ fontSize:'0.7rem', color:'#ef4444', margin:0 }}>{error}</p>}
    </div>
  );
}

const inp = (hasErr) => ({
  width:'100%', padding:'10px 13px',
  border:`1.5px solid ${hasErr ? '#fca5a5' : '#e2e8f0'}`,
  borderRadius:'10px', fontSize:'0.88rem',
  color:'#0f172a', background: hasErr ? '#fff5f5' : '#f8fafc',
  outline:'none', transition:'all 0.18s', fontFamily:'inherit',
});

export default function Contact() {
  const [form, setForm]         = useState({ name:'', phone:'', email:'', from:'', to:'', service:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors]     = useState({});
  const [visible, setVisible]   = useState({});
  const refs                    = useRef({});

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
      transform: visible[id] ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name required';
    if (!form.phone.trim()) e.phone = 'Phone required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setApiError('');
    try {
      const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); }
      else { setApiError(data.message || 'Failed to send. Please try again.'); }
    } catch {
      setApiError('Network error. Please check your connection.');
    }
    setLoading(false);
  };

  // SUCCESS
  if (submitted) {
    return (
      <div style={{ minHeight:'100vh', background:'#f7f6f3', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
        <style>{CSS}</style>
        <Navbar />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'90vh', padding:'2rem' }}>
          <div style={{ background:'white', borderRadius:'24px', padding:'3.5rem 2.5rem', maxWidth:'480px', width:'100%', textAlign:'center', boxShadow:'0 4px 40px rgba(0,0,0,0.08)', border:'1px solid #e2e8f0' }}>
            <div style={{ width:'72px', height:'72px', background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem', color:'#16a34a', fontWeight:900, fontSize:'1.8rem' }}>✓</div>
            <h2 style={{ fontSize:'1.6rem', fontWeight:800, color:'#0f172a', marginBottom:'0.5rem', letterSpacing:'-0.5px' }}>Message Sent!</h2>
            <p style={{ color:'#64748b', marginBottom:'0.5rem', fontSize:'0.92rem' }}>
              Our team will reach out to you at
            </p>
            <p style={{ color:'#f59e0b', fontWeight:800, fontSize:'1.1rem', marginBottom:'2rem' }}>{form.phone}</p>
            <p style={{ color:'#94a3b8', fontSize:'0.82rem', marginBottom:'2rem', lineHeight:1.7 }}>
              Expected response within 10 minutes during business hours.
            </p>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
              <button onClick={() => { setSubmitted(false); setForm({name:'',phone:'',email:'',from:'',to:'',service:'',message:''}); }}
                style={{ background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', padding:'11px 22px', fontWeight:800, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit' }}>
                Send Another
              </button>
              <a href="/" style={{ textDecoration:'none' }}>
                <button style={{ background:'white', color:'#64748b', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'11px 22px', fontWeight:600, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit' }}>
                  Go Home
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", background:'#f7f6f3', minHeight:'100vh' }}>
      <style>{CSS}</style>
      <Navbar />

      {/* HERO + FORM combined */}
      <div style={{ position:'relative', overflow:'hidden', background:'#0f172a', padding:'7rem 5% 5rem', minHeight:'92vh', display:'flex', alignItems:'center' }}>
        <img src={factory2} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.14, filter:'grayscale(0.4)', display:'block' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.75) 55%, rgba(15,23,42,0.5) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to top, #f7f6f3, transparent)' }} />
        <div style={{ position:'absolute', left:'calc(5% - 20px)', top:'35%', width:'3px', height:'80px', background:'linear-gradient(#f59e0b, transparent)', borderRadius:'2px' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'1240px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 480px', gap:'4rem', alignItems:'center' }} className="contact-grid">

          {/* Left — headline */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'100px', padding:'6px 16px', marginBottom:'1.5rem' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#f59e0b' }} />
              <span style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase' }}>Get In Touch</span>
            </div>
            <h1 style={{ fontSize:'clamp(3rem, 5.5vw, 5rem)', fontWeight:800, color:'white', lineHeight:0.95, letterSpacing:'-3px', marginBottom:'1.5rem' }}>
              Let's Talk<br />
              <span style={{ color:'#f59e0b' }}>Logistics.</span>
            </h1>
            <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.45)', lineHeight:1.8, maxWidth:'420px', marginBottom:'2.5rem' }}>
              Our team is available 24/7. Tell us your requirement and we'll get back within 10 minutes.
            </p>

            {/* Contact quick links */}
            <div style={{ display:'flex', flexDirection:'column', gap:'10px', maxWidth:'380px' }}>
              {CONTACT_ITEMS.map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ textDecoration:'none' }}>
                  <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'0.9rem 1.25rem', display:'flex', alignItems:'center', gap:'12px', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor=c.accent+'60'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:c.accent, flexShrink:0 }} />
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:'0.62rem', fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'1px' }}>{c.label}</p>
                      <p style={{ fontSize:'0.9rem', fontWeight:800, color:'white', margin:0 }}>{c.value}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div {...rv('form')} style={{ ...rv('form').style }}>
            <div style={{ background:'white', borderRadius:'24px', boxShadow:'0 2px 40px rgba(15,23,42,0.08)', border:'1px solid #e2e8f0', overflow:'hidden' }}>
              <div style={{ height:'4px', background:'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }} />
              <div style={{ padding:'2rem 2.25rem 1.5rem', borderBottom:'1px solid #f1f5f9' }}>
                <h2 style={{ fontSize:'1.25rem', fontWeight:800, color:'#0f172a', marginBottom:'3px', letterSpacing:'-0.3px' }}>Send Us a Message</h2>
                <p style={{ color:'#94a3b8', fontSize:'0.8rem', margin:0 }}>We reply within 10 minutes during business hours</p>
              </div>

              <form onSubmit={handleSubmit} style={{ padding:'1.75rem 2.25rem 2.25rem', display:'flex', flexDirection:'column', gap:'14px' }}>

                {apiError && (
                  <div style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:'10px', padding:'10px 14px', color:'#b91c1c', fontSize:'0.82rem' }}>
                    {apiError}
                  </div>
                )}

                {/* Name + Phone */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input className="fi" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inp(!!errors.name)} />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone}>
                    <input className="fi" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} style={inp(!!errors.phone)} />
                  </Field>
                </div>

                {/* Email */}
                <Field label="Email Address">
                  <input className="fi" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email address" style={inp(false)} />
                </Field>

                {/* Route */}
                <div style={{ background:'#f8fafc', borderRadius:'14px', padding:'12px 14px', border:'1px solid #e2e8f0' }}>
                  <p style={{ fontSize:'0.65rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'10px' }}>Shipment Route (Optional)</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                    <Field label="Origin">
                      <input className="fi" name="from" value={form.from} onChange={handleChange} placeholder="e.g. Indore" style={{ ...inp(false), background:'white' }} />
                    </Field>
                    <Field label="Destination">
                      <input className="fi" name="to" value={form.to} onChange={handleChange} placeholder="e.g. Mumbai" style={{ ...inp(false), background:'white' }} />
                    </Field>
                  </div>
                </div>

                {/* Service */}
                <Field label="Service Required">
                  <select className="fi" name="service" value={form.service} onChange={handleChange} style={{ ...inp(false), cursor:'pointer' }}>
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Message">
                  <textarea className="fi" name="message" value={form.message} onChange={handleChange}
                    placeholder="Describe your logistics requirement..."
                    rows={4} style={{ ...inp(false), resize:'vertical', lineHeight:1.65 }} />
                </Field>

                <button type="submit" disabled={loading} className="sub-btn" style={{
                  background: loading ? '#fcd34d' : '#f59e0b',
                  color: '#0f172a', border:'none', borderRadius:'12px',
                  padding:'14px', fontSize:'0.96rem', fontWeight:800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow:'0 4px 20px rgba(245,158,11,0.3)',
                  fontFamily:'inherit', display:'flex', alignItems:'center',
                  justifyContent:'center', gap:'8px', transition:'all 0.2s',
                }}>
                  {loading
                    ? <><span className="spin" /> Sending Message...</>
                    : 'Send Message'
                  }
                </button>

                <p style={{ textAlign:'center', fontSize:'0.68rem', color:'#94a3b8', lineHeight:1.6 }}>
                  We respond within 10 minutes &nbsp;•&nbsp; Available 24/7
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM INFO STRIP */}
      <div style={{ background:'#0f172a', padding:'3rem 5%' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2rem' }} className="bottom-grid">
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'0.6rem' }}>Office</p>
            <p style={{ fontSize:'0.92rem', fontWeight:700, color:'white', marginBottom:'3px' }}>Pithampur Industrial Zone</p>
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', margin:0 }}>Indore, Madhya Pradesh — 454775</p>
          </div>
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Business Hours</p>
            {HOURS.map(([day, time]) => (
              <div key={day} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', padding:'3px 0' }}>
                <span style={{ color:'rgba(255,255,255,0.35)' }}>{day}</span>
                <span style={{ fontWeight:700, color: day === 'Emergency Support' ? '#4ade80' : 'white' }}>{time}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Quick Links</p>
            {['Call: +91 9179838941','WhatsApp: +91 9179838941','Email: info@swifto.in'].map((l,i) => (
              <p key={i} style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', marginBottom:'4px' }}>{l}</p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  input, select, button, textarea { font-family: inherit; }
  input::placeholder, textarea::placeholder { color: #94a3b8 !important; }
  select option { color: #0f172a; background: white; }

  .fi:focus {
    outline: none;
    border-color: #f59e0b !important;
    background: #fffbeb !important;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
  }
  .sub-btn:hover {
    background: #d97706 !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(245,158,11,0.45) !important;
  }
  .sub-btn:active { transform: translateY(0) !important; }

  .contact-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin {
    display: inline-block; width: 16px; height: 16px;
    border: 2.5px solid rgba(0,0,0,0.15); border-top-color: #0f172a;
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }

  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr !important; }
    .contact-grid > div:last-child { position: static !important; }
  }
`;