import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import factory1 from '../assets/logos/factory1.png';
import factory2 from '../assets/logos/factory2.png';
import factory3 from '../assets/logos/factory3.png';
import factory4 from '../assets/logos/factory4.png';
import factory5 from '../assets/logos/factory5.png';
import driver1 from '../assets/logos/driver1.png';
import driver2 from '../assets/logos/driver2.png';
import driver3 from '../assets/logos/driver3.png';


const vehicles = [
  'Two Wheeler','Car / Sedan',
  '7 ft Truck','8 ft Truck','10 ft Truck','12 ft Truck','14 ft Truck',
  '19 ft Truck','20 ft Truck','22 ft Truck','24 ft Truck',
  '28 ft Truck','30 ft Truck','32 ft Truck',
  '20 ft Container','32 ft Single Axle','32 ft Multi Axle','40 ft Container',
  'Dumper','Trailer (40-50 ft)','Flatbed','Tanker',
];

// Logistics images — Unsplash, all 900px wide for fast load
const IMAGES = [
  factory1,
  factory2,
  factory3,
  factory4,
  factory5,
  driver1,
  driver2,
  driver3,
];

function Field({ label, error, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
      <label style={{ fontSize:'0.72rem', fontWeight:600, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.6px' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize:'0.7rem', color:'#ef4444', marginTop:'2px' }}>{error}</p>}
    </div>
  );
}

const makeInput = (hasErr) => ({
  width:'100%', padding:'10px 13px',
  border:`1.5px solid ${hasErr ? '#fca5a5' : '#e2e8f0'}`,
  borderRadius:'10px', fontSize:'0.88rem',
  color:'#0f172a', background: hasErr ? '#fff5f5' : '#f8fafc',
  outline:'none', transition:'all 0.18s',
  fontFamily:'inherit',
});

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name:'', phone:'', email:'',
    pickup:'', drop:'', vehicle:'',
    date:'', goods:'', weight:'',
    userType:'company', amount:'',
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState(null);

  // Image slideshow
  const [imgIdx, setImgIdx]     = useState(0);
  const [fade, setFade]         = useState(true);
  const intervalRef             = useRef(null);

  useEffect(() => {
    setForm(p => ({
      ...p,
      pickup:  searchParams.get('pickup')  || '',
      drop:    searchParams.get('drop')    || '',
      vehicle: searchParams.get('vehicle') || '',
    }));
  }, [searchParams]);

  // Auto-rotate images every 3 seconds with fade transition
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setImgIdx(i => (i + 1) % IMAGES.length);
        setFade(true);
      }, 200); // 0.2s fade out before switching
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = 'Name required';
    if (!form.phone.trim())  e.phone  = 'Phone required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
    if (!form.pickup.trim()) e.pickup = 'Pickup location required';
    if (!form.drop.trim())   e.drop   = 'Drop location required';
    if (!form.vehicle)       e.vehicle = 'Please select a vehicle';
    if (!form.date)          e.date   = 'Please select a date';
    if (!form.amount.trim()) e.amount = 'Amount required';
    else if (isNaN(form.amount) || +form.amount <= 0) e.amount = 'Enter valid amount';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await bookingAPI.create(form);
      setSuccess({ trackingId: res.data.trackingId });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Booking failed. Try again.');
    } finally { setLoading(false); }
  };

  // ── SUCCESS SCREEN ──
  if (success) {
    return (
      <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Inter', system-ui, sans-serif" }}>
        <style>{CSS}</style>
        <Navbar />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'90vh', padding:'2rem' }}>
          <div style={{ background:'white', borderRadius:'24px', padding:'3rem 2.5rem', maxWidth:'460px', width:'100%', textAlign:'center', boxShadow:'0 4px 40px rgba(0,0,0,0.08)', border:'1px solid #e2e8f0' }}>
            <div style={{ width:'72px', height:'72px', background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem', fontSize:'2rem' }}>
              &#10003;
            </div>
            <h2 style={{ fontSize:'1.6rem', fontWeight:800, color:'#0f172a', marginBottom:'0.5rem' }}>Booking Confirmed!</h2>
            <p style={{ color:'#64748b', marginBottom:'2rem', fontSize:'0.92rem' }}>Our team will contact you within 30 minutes</p>
            <div style={{ background:'#fffbeb', border:'1.5px solid #fde68a', borderRadius:'16px', padding:'1.5rem', marginBottom:'1.75rem' }}>
              <p style={{ fontSize:'0.65rem', fontWeight:700, color:'#92400e', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>Your Tracking ID</p>
              <p style={{ fontSize:'2.2rem', fontWeight:800, color:'#d97706', letterSpacing:'4px', fontFamily:'monospace' }}>{success.trackingId}</p>
            </div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
              <button onClick={() => window.location.href = `/tracking?id=${success.trackingId}`}
                style={{ background:'#f59e0b', color:'white', border:'none', borderRadius:'10px', padding:'11px 22px', fontWeight:700, cursor:'pointer', fontSize:'0.9rem', fontFamily:'inherit' }}>
                Track Order
              </button>
              <button onClick={() => { setSuccess(null); setForm({ name:'',phone:'',email:'',pickup:'',drop:'',vehicle:'',date:'',goods:'',weight:'',userType:'company',amount:'' }); }}
                style={{ background:'white', color:'#64748b', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'11px 22px', fontWeight:600, cursor:'pointer', fontSize:'0.9rem', fontFamily:'inherit' }}>
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN PAGE ──
  return (
    <div style={{ minHeight:'100vh', fontFamily:"'Inter', system-ui, sans-serif", background:'#f1f5f9' }}>
      <style>{CSS}</style>
      <Navbar />

      <div className="b-grid" style={{
        maxWidth:'1240px', margin:'0 auto',
        padding:'6rem 5% 4rem',
        display:'grid',
        gridTemplateColumns:'1fr 500px',
        gap:'3rem',
        alignItems:'start',
      }}>

        {/* ── LEFT PANEL ── */}
        <div className="b-left" style={{ paddingTop:'0.5rem', animation:'fadeUp 0.55s ease both' }}>

          {/* AUTO-ROTATING IMAGE CARD */}
          <div style={{
            borderRadius:'20px', overflow:'hidden',
            position:'relative', height:'280px', marginBottom:'1.75rem',
            background:'#1e293b',
          }}>
            <img
              key={imgIdx}
              src={IMAGES[imgIdx]}
              alt="SWIFTO Logistics"
              style={{
                width:'100%', height:'100%', objectFit:'cover', display:'block',
                opacity: fade ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
              onError={e => { e.target.style.display='none'; }}
            />
            {/* Dark gradient overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%)' }} />

            {/* Text over image */}
            <div style={{ position:'absolute', bottom:'1.5rem', left:'1.75rem', right:'1.75rem' }}>
              <span style={{ display:'inline-block', background:'rgba(245,158,11,0.92)', color:'#0f172a', fontSize:'0.63rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'4px 10px', borderRadius:'6px', marginBottom:'8px' }}>
                India's No.1 B2B Platform
              </span>
              <h1 style={{ color:'white', fontSize:'1.8rem', fontWeight:800, lineHeight:1.2, letterSpacing:'-0.5px' }}>
                Fast, Reliable<br />Logistics Delivery
              </h1>
            </div>

            {/* Dot indicators */}
            <div style={{ position:'absolute', bottom:'1.25rem', right:'1.25rem', display:'flex', gap:'5px' }}>
              {IMAGES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => { setFade(false); setTimeout(() => { setImgIdx(i); setFade(true); }, 200); }}
                  style={{
                    width: i === imgIdx ? '18px' : '6px',
                    height:'6px',
                    borderRadius:'100px',
                    background: i === imgIdx ? '#f59e0b' : 'rgba(255,255,255,0.4)',
                    cursor:'pointer',
                    transition:'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* 4 stat cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'1.75rem' }}>
            {[
              { val:'10 Min', label:'Truck Confirmed',  icon:'Fast',    bg:'#fffbeb', color:'#b45309', border:'#fde68a' },
              { val:'2500+',  label:'Active Trucks',    icon:'Fleet',   bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' },
              { val:'99.2%',  label:'On-Time Delivery', icon:'Reliable',bg:'#f0fdf4', color:'#15803d', border:'#bbf7d0' },
              { val:'24 Hr',  label:'Payment Released', icon:'Quick',   bg:'#fdf4ff', color:'#7e22ce', border:'#e9d5ff' },
            ].map((s, i) => (
              <div key={i} style={{ background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:'14px', padding:'1rem 1.2rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                  <span style={{ fontSize:'0.6rem', fontWeight:700, color:s.color, background:`${s.border}88`, padding:'2px 7px', borderRadius:'4px', letterSpacing:'0.5px', textTransform:'uppercase' }}>{s.icon}</span>
                  <span style={{ fontSize:'1.4rem', fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</span>
                </div>
                <p style={{ fontSize:'0.73rem', color:'#475569', fontWeight:500 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Why SWIFTO */}
          <div style={{ background:'white', borderRadius:'18px', padding:'1.5rem', border:'1px solid #e2e8f0' }}>
            <p style={{ fontSize:'0.68rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'1rem' }}>Why Choose SWIFTO</p>
            {[
              { label:'Secure',      text:'Goods fully insured in transit' },
              { label:'Live',        text:'Real-time GPS tracking via WhatsApp' },
              { label:'Transparent', text:'Zero hidden charges, pay what you see' },
              { label:'24x7',        text:'Dedicated support team, always available' },
            ].map((f, i, arr) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom: i < arr.length-1 ? '1px solid #f1f5f9' : 'none' }}>
                <span style={{ fontSize:'0.6rem', fontWeight:700, color:'#f59e0b', background:'#fffbeb', border:'1px solid #fde68a', padding:'2px 7px', borderRadius:'4px', textTransform:'uppercase', letterSpacing:'0.5px', flexShrink:0 }}>{f.label}</span>
                <span style={{ fontSize:'0.86rem', color:'#334155', fontWeight:500 }}>{f.text}</span>
                <span style={{ marginLeft:'auto', color:'#22c55e', fontSize:'0.85rem', fontWeight:700, flexShrink:0 }}>Yes</span>
              </div>
            ))}
          </div>

          {/* Clients strip */}
          <div style={{ marginTop:'1.75rem', padding:'1rem 1.25rem', background:'white', borderRadius:'14px', border:'1px solid #e2e8f0' }}>
            <p style={{ fontSize:'0.65rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Trusted By</p>
            <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', alignItems:'center' }}>
              {['Bajaj Auto','Tata Motors','Cipla','Mahindra','MAHLE','Lupin'].map(c => (
                <span key={c} style={{ fontSize:'0.75rem', fontWeight:600, color:'#475569', background:'#f8fafc', border:'1px solid #e2e8f0', padding:'4px 10px', borderRadius:'6px' }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: FORM ── */}
        <div className="b-form" style={{
          background:'white',
          borderRadius:'24px',
          boxShadow:'0 2px 40px rgba(15,23,42,0.09)',
          border:'1px solid #e2e8f0',
          overflow:'hidden',
          position:'sticky',
          top:'88px',
          animation:'fadeUp 0.55s ease 0.12s both',
        }}>
          {/* Amber top accent bar */}
          <div style={{ height:'4px', background:'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)' }} />

          {/* Form header */}
          <div style={{ padding:'1.6rem 2rem 1.2rem', borderBottom:'1px solid #f1f5f9' }}>
            <h2 style={{ fontSize:'1.3rem', fontWeight:800, color:'#0f172a', marginBottom:'3px' }}>Book a Delivery</h2>
            <p style={{ color:'#94a3b8', fontSize:'0.8rem' }}>Aasaan Logistics, Pakki Delivery</p>
          </div>

          <div style={{ padding:'1.5rem 2rem 2rem', display:'flex', flexDirection:'column', gap:'13px' }}>

            {apiError && (
              <div style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:'10px', padding:'10px 14px', color:'#b91c1c', fontSize:'0.82rem' }}>
                Error: {apiError}
              </div>
            )}

            {/* User type toggle */}
            <div style={{ display:'flex', background:'#f1f5f9', borderRadius:'10px', padding:'3px', gap:'3px' }}>
              {[{v:'company',l:'Company / Factory'},{v:'individual',l:'Individual'}].map(t => (
                <button key={t.v} onClick={() => setForm({...form, userType:t.v})} style={{
                  flex:1, padding:'8px', border:'none', borderRadius:'8px',
                  fontWeight:600, fontSize:'0.82rem', cursor:'pointer',
                  transition:'all 0.18s', fontFamily:'inherit',
                  background: form.userType === t.v ? '#f59e0b' : 'transparent',
                  color:       form.userType === t.v ? 'white' : '#64748b',
                  boxShadow:   form.userType === t.v ? '0 1px 8px rgba(245,158,11,0.3)' : 'none',
                }}>{t.l}</button>
              ))}
            </div>

            {/* Name + Phone */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'11px' }}>
              <Field label="Full Name *" error={errors.name}>
                <input className="fi" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" style={makeInput(!!errors.name)} />
              </Field>
              <Field label="Phone Number *" error={errors.phone}>
                <input className="fi" name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="Your mobile number" maxLength={10} style={makeInput(!!errors.phone)} />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email Address (Optional)">
              <input className="fi" name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="Your email address" style={makeInput(false)} />
            </Field>

            {/* Route box */}
            <div style={{ background:'#f8fafc', borderRadius:'14px', padding:'12px 14px', border:'1px solid #e2e8f0' }}>
              <p style={{ fontSize:'0.65rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'10px' }}>Pickup and Drop Route</p>
              <div style={{ display:'flex', gap:'12px', alignItems:'stretch' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'8px', paddingBottom:'8px' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22c55e', border:'2.5px solid #dcfce7', flexShrink:0 }} />
                  <div style={{ width:'2px', flex:1, background:'linear-gradient(#22c55e, #3b82f6)', margin:'3px 0', minHeight:'26px' }} />
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#3b82f6', border:'2.5px solid #dbeafe', flexShrink:0 }} />
                </div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'7px' }}>
                  <div>
                    <input className="fi" name="pickup" value={form.pickup} onChange={handleChange}
                      placeholder="Enter pickup city or address" style={{ ...makeInput(!!errors.pickup), background:'white' }} />
                    {errors.pickup && <p style={{ fontSize:'0.68rem', color:'#ef4444', marginTop:'2px' }}>{errors.pickup}</p>}
                  </div>
                  <div>
                    <input className="fi" name="drop" value={form.drop} onChange={handleChange}
                      placeholder="Enter drop city or address" style={{ ...makeInput(!!errors.drop), background:'white' }} />
                    {errors.drop && <p style={{ fontSize:'0.68rem', color:'#ef4444', marginTop:'2px' }}>{errors.drop}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle + Date */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'11px' }}>
              <Field label="Vehicle Type *" error={errors.vehicle}>
                <select className="fi" name="vehicle" value={form.vehicle} onChange={handleChange}
                  style={{ ...makeInput(!!errors.vehicle), cursor:'pointer' }}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </Field>
              <Field label="Pickup Date *" error={errors.date}>
                <input className="fi" name="date" type="date" value={form.date} onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} style={makeInput(!!errors.date)} />
              </Field>
            </div>

            {/* Goods + Weight + Amount */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px' }}>
              <Field label="Goods Type">
                <input className="fi" name="goods" value={form.goods} onChange={handleChange}
                  placeholder="e.g. Auto parts, Steel" style={makeInput(false)} />
              </Field>
              <Field label="Weight (kg)">
                <input className="fi" name="weight" value={form.weight} onChange={handleChange}
                  placeholder="Weight in kg" style={makeInput(false)} />
              </Field>
              <Field label="Amount (Rs.) *" error={errors.amount}>
                <input className="fi" name="amount" value={form.amount} onChange={handleChange}
                  placeholder="Agreed amount" style={makeInput(!!errors.amount)} />
              </Field>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="sub-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? '#fcd34d' : '#f59e0b',
                color: '#0f172a',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '0.96rem',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                marginTop: '4px',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                letterSpacing: '0.2px',
              }}
            >
              {loading
                ? <><span className="spin" /> Submitting...</>
                : 'Submit'
              }
            </button>

            <p style={{ textAlign:'center', fontSize:'0.68rem', color:'#94a3b8', lineHeight:1.6 }}>
              WhatsApp confirmation sent instantly &nbsp;&bull;&nbsp; Zero hidden charges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  input, select, button, textarea { font-family: inherit; }
  input::placeholder, textarea::placeholder { color: #94a3b8; }
  select option { color: #0f172a; background: white; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.45; }
  .fi:focus {
    outline: none;
    border-color: #f59e0b !important;
    background: #fffbeb !important;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
  }
  .sub-btn:hover {
    background: #e09000 !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(245,158,11,0.45) !important;
  }
  .sub-btn:active { transform: translateY(0) !important; }
  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .spin {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2.5px solid rgba(0,0,0,0.15);
    border-top-color: #0f172a;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @media (max-width: 900px) {
    .b-grid { grid-template-columns: 1fr !important; padding: 5rem 5% 3rem !important; gap: 2rem !important; }
    .b-left { display: none !important; }
    .b-form { position: static !important; }
  }
`;