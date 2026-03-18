import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { driverAPI } from '../services/api';
import axios from 'axios';
import driver1 from '../assets/logos/driver1.png';
import driver2 from '../assets/logos/driver2.png';
import driver3 from '../assets/logos/driver3.png';

const IMAGES     = [driver1, driver2, driver3];
const API_BASE   = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const BENEFITS   = [
  { num:'Rs.2L+', label:'Avg Monthly Earning', sub:'Per truck, per month' },
  { num:'24 Hr',  label:'Payment Release',     sub:'Direct bank transfer' },
  { num:'500+',   label:'Active Drivers',       sub:'Already earning' },
  { num:'10K+',   label:'Trips Completed',      sub:'And counting' },
];
const CITIES      = ['Indore','Pithampur','Bhopal','Dewas','Ujjain','Mumbai','Pune','Nagpur','Delhi','Ahmedabad','Jaipur','Surat','Hyderabad','Bangalore','Chennai'];
const VEHICLES    = ['Two Wheeler / Bike','Car / Sedan','7 ft Truck','10 ft Truck','14 ft Truck','19 ft Truck','22 ft Truck','24 ft Truck','28 ft Truck','32 ft Truck','20 ft Container','40 ft Container','Dumper','Tanker','Trailer / Flatbed'];
const SOURCES     = ['Google Search','WhatsApp','Friend / Colleague','Facebook / Instagram','Transport Company','Other'];
const EXPERIENCES = ['0-1 Year','1-3 Years','3-5 Years','5-10 Years','10+ Years'];
const ROUTES      = ['Mumbai','Pune','Delhi','Ahmedabad','Surat','Jaipur','Nagpur','Hyderabad','Bangalore','Chennai','Kolkata','Lucknow','Raipur','Bhopal','Nashik','Vadodara','Chandigarh','Gujarat','Maharashtra','Rajasthan','Uttar Pradesh','Pan India'];

function Field({ label, error, optional, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
      <label style={{ fontSize:'0.7rem', fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.8px', display:'flex', alignItems:'center', gap:'6px' }}>
        {label}
        {optional && <span style={{ fontSize:'0.6rem', fontWeight:600, color:'#94a3b8', background:'#f1f5f9', padding:'1px 7px', borderRadius:'100px', textTransform:'none', letterSpacing:0 }}>Optional</span>}
      </label>
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

export default function DriverPartner() {
  const [step, setStep]               = useState(1);
  const [form, setForm]               = useState({ name:'', phone:'', city:'', vehicle:'', source:'', rcNumber:'', licenseNumber:'', experience:'', fleetSize:'1', routes:[], fitnessCertNumber:'' });
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [apiError, setApiError]       = useState('');
  const [imgIdx, setImgIdx]           = useState(0);
  const [imgFade, setImgFade]         = useState(true);
  const [visible, setVisible]         = useState({});
  const refs                          = useRef({});
  const intervalRef                   = useRef(null);

  // OTP states
  const [otpSent, setOtpSent]         = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp]                 = useState('');
  const [sessionId, setSessionId]     = useState('');
  const [otpLoading, setOtpLoading]   = useState(false);
  const [otpError, setOtpError]       = useState('');
  const [otpSuccess, setOtpSuccess]   = useState('');
  const [countdown, setCountdown]     = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImgFade(false);
      setTimeout(() => { setImgIdx(i => (i + 1) % IMAGES.length); setImgFade(true); }, 250);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

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

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const rv = (id, delay = 0) => ({
    ref: el => { refs.current[id] = el; },
    'data-id': id,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
    if (e.target.name === 'phone') {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setOtpError('');
      setOtpSuccess('');
      setCountdown(0);
    }
  };

  const handleUpper = name => e => handleChange({ target: { name, value: e.target.value.toUpperCase() } });

  const toggleRoute = route => {
    setForm(p => ({ ...p, routes: p.routes.includes(route) ? p.routes.filter(r => r !== route) : [...p.routes, route] }));
    setErrors(p => ({ ...p, routes: '' }));
  };

  // Send OTP
  const sendOTP = async () => {
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) {
      setErrors(p => ({ ...p, phone: 'Enter valid 10-digit number first' }));
      return;
    }
    setOtpLoading(true);
    setOtpError('');
    setOtpSuccess('');
    try {
      const res = await axios.post(`${API_BASE}/api/auth/send-otp`, { phone: form.phone });
      setSessionId(res.data.sessionId || '');
      setOtpSent(true);
      setCountdown(30);
      setOtpSuccess(`OTP sent to +91 ${form.phone} via SMS`);
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    if (!otp || otp.length < 4) { setOtpError('Enter the OTP received'); return; }
    setOtpLoading(true);
    setOtpError('');
    try {
      await axios.post(`${API_BASE}/api/auth/verify-otp`, { phone: form.phone, otp, sessionId });
      setOtpVerified(true);
      setOtpSuccess('Phone verified!');
      setOtpError('');
      setErrors(p => ({ ...p, otp: '' }));
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Invalid OTP. Try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim())  e.name = 'Full name required';
      if (!form.phone.trim()) e.phone = 'Phone required';
      else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number';
      if (!otpVerified) e.otp = 'Please verify your phone number with OTP';
      if (!form.city)   e.city = 'Select your city';
    }
    if (step === 2) {
      if (!form.vehicle)       e.vehicle    = 'Select vehicle type';
      if (!form.experience)    e.experience = 'Select experience';
      if (!form.routes.length) e.routes     = 'Select at least one route';
    }
    if (step === 3) {
      if (!form.rcNumber.trim())      e.rcNumber      = 'RC Number required';
      if (!form.licenseNumber.trim()) e.licenseNumber = 'License Number required';
    }
    return e;
  };

  const handleNext = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step < 3) { setStep(step + 1); return; }
    setLoading(true); setApiError('');
    try {
      await driverAPI.register(form);
      setStep(4);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally { setLoading(false); }
  };

  // SUCCESS
  if (step === 4) {
    return (
      <div style={{ minHeight:'100vh', background:'#f7f6f3', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
        <style>{CSS}</style>
        <Navbar />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'90vh', padding:'2rem' }}>
          <div style={{ background:'white', borderRadius:'24px', padding:'3rem 2.5rem', maxWidth:'520px', width:'100%', textAlign:'center', boxShadow:'0 4px 40px rgba(0,0,0,0.08)', border:'1px solid #e2e8f0' }}>
            <div style={{ width:'72px', height:'72px', background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem', fontSize:'2rem', color:'#16a34a', fontWeight:900 }}>✓</div>
            <h2 style={{ fontSize:'1.6rem', fontWeight:800, color:'#0f172a', marginBottom:'0.5rem', letterSpacing:'-0.5px' }}>Registration Successful!</h2>
            <p style={{ color:'#64748b', marginBottom:'0.5rem' }}>Welcome, <strong style={{ color:'#0f172a' }}>{form.name}</strong>!</p>
            <p style={{ color:'#94a3b8', fontSize:'0.88rem', marginBottom:'2rem' }}>
              Our team will call you at <strong style={{ color:'#f59e0b' }}>{form.phone}</strong> within 24 hours.
            </p>
            <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'14px', padding:'1.25rem', marginBottom:'1.25rem', textAlign:'left' }}>
              <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Your Registration</p>
              {[['Name',form.name],['Phone',form.phone],['City',form.city],['Vehicle',form.vehicle],['Experience',form.experience],['RC Number',form.rcNumber],['License',form.licenseNumber]].map(([l,v])=>(
                <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #f1f5f9', fontSize:'0.83rem' }}>
                  <span style={{ color:'#64748b' }}>{l}</span>
                  <span style={{ fontWeight:700, color:'#0f172a' }}>{v}</span>
                </div>
              ))}
              {form.routes.length > 0 && (
                <div style={{ marginTop:'0.75rem' }}>
                  <p style={{ fontSize:'0.65rem', color:'#94a3b8', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'6px' }}>Routes</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                    {form.routes.map(r => <span key={r} style={{ fontSize:'0.7rem', fontWeight:600, color:'#f59e0b', background:'#fffbeb', border:'1px solid #fde68a', padding:'2px 8px', borderRadius:'100px' }}>{r}</span>)}
                  </div>
                </div>
              )}
            </div>
            <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'12px', padding:'1rem', marginBottom:'1.75rem', textAlign:'left' }}>
              <p style={{ fontSize:'0.75rem', fontWeight:700, color:'#b45309', marginBottom:'0.6rem', textTransform:'uppercase', letterSpacing:'0.8px' }}>What Happens Next</p>
              {['Documents verified within 24 hours','SWIFTO team will call you','Short onboarding training provided','You start receiving loads on your routes'].map((item,i)=>(
                <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', marginBottom:'5px' }}>
                  <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
                    <span style={{ fontSize:'0.55rem', color:'#0f172a', fontWeight:900 }}>✓</span>
                  </div>
                  <span style={{ fontSize:'0.82rem', color:'#92400e' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
              <button onClick={() => { setStep(1); setForm({name:'',phone:'',city:'',vehicle:'',source:'',rcNumber:'',licenseNumber:'',experience:'',fleetSize:'1',routes:[],fitnessCertNumber:''}); setOtpSent(false); setOtpVerified(false); setOtp(''); }}
                style={{ background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', padding:'11px 20px', fontWeight:800, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit' }}>
                Register Another
              </button>
              <Link to="/"><button style={{ background:'white', color:'#64748b', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'11px 20px', fontWeight:600, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit' }}>Go Home</button></Link>
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

      <div style={{ position:'relative', overflow:'hidden', background:'#0f172a', minHeight:'88vh', display:'flex', alignItems:'center' }}>
        <img src={IMAGES[imgIdx]} alt=""
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity: imgFade ? 0.2 : 0, transition:'opacity 0.3s', filter:'grayscale(0.3)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,0.3) 100%)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:'linear-gradient(to top, #f7f6f3, transparent)' }} />
        <div style={{ position:'absolute', left:'calc(5% - 20px)', top:'30%', width:'3px', height:'80px', background:'linear-gradient(#f59e0b, transparent)' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'1240px', margin:'0 auto', padding:'9rem 5% 6rem', width:'100%', display:'grid', gridTemplateColumns:'1fr 400px', gap:'5rem', alignItems:'center' }} className="hero-grid">

          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'100px', padding:'6px 16px', marginBottom:'2rem' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#f59e0b' }} />
              <span style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase' }}>Driver Partner Program</span>
            </div>
            <h1 style={{ fontSize:'clamp(3rem, 6.5vw, 5.8rem)', fontWeight:800, color:'white', lineHeight:0.95, letterSpacing:'-3px', marginBottom:'2rem' }}>
              Attach.<br />Earn.<br /><span style={{ color:'#f59e0b' }}>Grow.</span>
            </h1>
            <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.5)', lineHeight:1.85, maxWidth:'460px', marginBottom:'3rem' }}>
              Join SWIFTO's driver network and get guaranteed loads on your route — full-time or part-time. Earn on return trips too.
            </p>
            <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ borderLeft:'3px solid #f59e0b', paddingLeft:'12px' }}>
                  <p style={{ fontSize:'1.6rem', fontWeight:800, color:'#f59e0b', lineHeight:1, marginBottom:'3px' }}>{b.num}</p>
                  <p style={{ fontSize:'0.72rem', fontWeight:700, color:'white', marginBottom:'1px' }}>{b.label}</p>
                  <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.35)', margin:0 }}>{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <div style={{ position:'relative', zIndex:3 }}>
            <div style={{ background:'white', borderRadius:'24px', boxShadow:'0 8px 60px rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.15)', overflow:'hidden' }}>
              <div style={{ height:'4px', background:'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }} />
              <div style={{ padding:'1.5rem 1.75rem 1.25rem', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:'#0f172a', marginBottom:'2px' }}>
                    {step === 1 ? 'Basic Information' : step === 2 ? 'Vehicle & Routes' : 'Document Details'}
                  </h2>
                  <p style={{ color:'#94a3b8', fontSize:'0.75rem', margin:0 }}>Step {step} of 3</p>
                </div>
                <div style={{ display:'flex', gap:'5px' }}>
                  {[1,2,3].map(s => (
                    <div key={s} style={{ width: step === s ? '18px' : '7px', height:'7px', borderRadius:'100px', background: step >= s ? '#f59e0b' : '#e2e8f0', transition:'all 0.3s' }} />
                  ))}
                </div>
              </div>

              <div style={{ padding:'1.25rem 1.75rem 1.75rem', display:'flex', flexDirection:'column', gap:'12px', maxHeight:'65vh', overflowY:'auto' }}>
                {apiError && (
                  <div style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:'10px', padding:'10px 14px', color:'#b91c1c', fontSize:'0.82rem' }}>
                    {apiError}
                  </div>
                )}

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <>
                    <Field label="Full Name *" error={errors.name}>
                      <input className="fi" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inp(!!errors.name)} />
                    </Field>

                    {/* Phone + OTP */}
                    <Field label="Mobile Number *" error={errors.phone}>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <input
                          className="fi" name="phone" type="tel"
                          value={form.phone} onChange={handleChange}
                          placeholder="10-digit mobile number" maxLength={10}
                          disabled={otpVerified}
                          style={{ ...inp(!!errors.phone), flex:1, background: otpVerified ? '#f0fdf4' : (errors.phone ? '#fff5f5' : '#f8fafc') }}
                        />
                        {!otpVerified && (
                          <button
                            onClick={sendOTP}
                            disabled={otpLoading || countdown > 0}
                            style={{
                              padding:'10px 14px', borderRadius:'10px', border:'none',
                              background: countdown > 0 ? '#e2e8f0' : '#f59e0b',
                              color: countdown > 0 ? '#94a3b8' : '#0f172a',
                              fontWeight:700, fontSize:'0.78rem', cursor: (otpLoading || countdown > 0) ? 'not-allowed' : 'pointer',
                              whiteSpace:'nowrap', fontFamily:'inherit', minWidth:'90px',
                              display:'flex', alignItems:'center', justifyContent:'center', gap:'4px'
                            }}
                          >
                            {otpLoading ? <><span className="spin" /></> : countdown > 0 ? `${countdown}s` : otpSent ? 'Resend' : 'Send OTP'}
                          </button>
                        )}
                        {otpVerified && (
                          <div style={{ display:'flex', alignItems:'center', padding:'0 10px', color:'#16a34a', fontWeight:700, fontSize:'0.8rem', whiteSpace:'nowrap' }}>
                            ✓ Verified
                          </div>
                        )}
                      </div>
                    </Field>

                    {/* OTP Input — show after sent, hide after verified */}
                    {otpSent && !otpVerified && (
                      <Field label="Enter OTP *" error={errors.otp}>
                        <div style={{ display:'flex', gap:'8px' }}>
                          <input
                            className="fi" type="text" inputMode="numeric"
                            value={otp} onChange={e => { setOtp(e.target.value.replace(/\D/g,'')); setOtpError(''); }}
                            placeholder="Enter 6-digit OTP" maxLength={6}
                            style={{ ...inp(!!otpError || !!errors.otp), flex:1, letterSpacing:'4px', fontSize:'1rem', textAlign:'center' }}
                          />
                          <button
                            onClick={verifyOTP}
                            disabled={otpLoading}
                            style={{
                              padding:'10px 16px', borderRadius:'10px', border:'none',
                              background:'#0f172a', color:'white',
                              fontWeight:700, fontSize:'0.78rem', cursor: otpLoading ? 'not-allowed' : 'pointer',
                              fontFamily:'inherit', minWidth:'80px',
                              display:'flex', alignItems:'center', justifyContent:'center', gap:'4px'
                            }}
                          >
                            {otpLoading ? <span className="spin" style={{ borderTopColor:'white' }} /> : 'Verify'}
                          </button>
                        </div>
                        {otpError && <p style={{ fontSize:'0.7rem', color:'#ef4444', margin:0 }}>{otpError}</p>}
                        {otpSuccess && !otpError && <p style={{ fontSize:'0.7rem', color:'#16a34a', margin:0 }}>{otpSuccess}</p>}
                      </Field>
                    )}

                    {/* Verified success message */}
                    {otpVerified && (
                      <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'10px', padding:'10px 14px', display:'flex', alignItems:'center', gap:'8px' }}>
                        <span style={{ fontSize:'1rem', color:'#16a34a' }}>✓</span>
                        <p style={{ fontSize:'0.78rem', color:'#15803d', fontWeight:600, margin:0 }}>Phone number verified successfully!</p>
                      </div>
                    )}

                    {errors.otp && !otpSent && (
                      <p style={{ fontSize:'0.7rem', color:'#ef4444', margin:0 }}>{errors.otp}</p>
                    )}

                    <Field label="Your City *" error={errors.city}>
                      <select className="fi" name="city" value={form.city} onChange={handleChange} style={{ ...inp(!!errors.city), cursor:'pointer' }}>
                        <option value="">Select city</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>

                    <Field label="How Did You Hear About Us">
                      <select className="fi" name="source" value={form.source} onChange={handleChange} style={{ ...inp(false), cursor:'pointer' }}>
                        <option value="">Select source</option>
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <>
                    <Field label="Vehicle Type *" error={errors.vehicle}>
                      <select className="fi" name="vehicle" value={form.vehicle} onChange={handleChange} style={{ ...inp(!!errors.vehicle), cursor:'pointer' }}>
                        <option value="">Select vehicle</option>
                        {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </Field>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                      <Field label="Experience *" error={errors.experience}>
                        <select className="fi" name="experience" value={form.experience} onChange={handleChange} style={{ ...inp(!!errors.experience), cursor:'pointer' }}>
                          <option value="">Select</option>
                          {EXPERIENCES.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                      </Field>
                      <Field label="Fleet Size">
                        <select className="fi" name="fleetSize" value={form.fleetSize} onChange={handleChange} style={{ ...inp(false), cursor:'pointer' }}>
                          {['1','2','3','4','5','6-10','11-20','21-50','51-100','100+'].map(n => (
                            <option key={n} value={n}>{n} Truck{n==='1'?'':'s'}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Routes You Cover *" error={errors.routes}>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', padding:'10px', background:'#f8fafc', borderRadius:'10px', border:`1.5px solid ${errors.routes ? '#fca5a5' : '#e2e8f0'}` }}>
                        {ROUTES.map(route => {
                          const sel = form.routes.includes(route);
                          return (
                            <button key={route} type="button" onClick={() => toggleRoute(route)} style={{ padding:'4px 10px', borderRadius:'100px', fontSize:'0.72rem', fontWeight:600, cursor:'pointer', border:`1.5px solid ${sel ? '#f59e0b' : '#e2e8f0'}`, background: sel ? '#fffbeb' : 'white', color: sel ? '#b45309' : '#64748b', transition:'all 0.15s', fontFamily:'inherit' }}>
                              {route}
                            </button>
                          );
                        })}
                      </div>
                      {form.routes.length > 0 && <p style={{ fontSize:'0.68rem', color:'#b45309', fontWeight:600, margin:0 }}>{form.routes.length} route{form.routes.length>1?'s':''} selected</p>}
                    </Field>
                  </>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                  <>
                    <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'10px', padding:'10px 14px' }}>
                      <p style={{ fontSize:'0.78rem', fontWeight:700, color:'#15803d', marginBottom:'2px' }}>Your data is 100% secure</p>
                      <p style={{ fontSize:'0.72rem', color:'#16a34a', margin:0 }}>Used only for verification — never shared.</p>
                    </div>
                    <Field label="RC Number *" error={errors.rcNumber}>
                      <input className="fi" name="rcNumber" value={form.rcNumber} onChange={handleUpper('rcNumber')} placeholder="e.g. MP09AB1234" style={inp(!!errors.rcNumber)} />
                    </Field>
                    <Field label="Driving License Number *" error={errors.licenseNumber}>
                      <input className="fi" name="licenseNumber" value={form.licenseNumber} onChange={handleUpper('licenseNumber')} placeholder="e.g. MP0920110012345" style={inp(!!errors.licenseNumber)} />
                    </Field>
                    <Field label="Fitness Certificate Number" optional>
                      <input className="fi" name="fitnessCertNumber" value={form.fitnessCertNumber} onChange={handleUpper('fitnessCertNumber')} placeholder="e.g. FC/MP/2024/12345" style={inp(false)} />
                    </Field>
                    <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'10px', padding:'0.9rem' }}>
                      <p style={{ fontSize:'0.6rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'0.6rem' }}>Summary</p>
                      {[['Name',form.name],['Phone',form.phone],['City',form.city],['Vehicle',form.vehicle],['Experience',form.experience]].map(([l,v])=>(
                        <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', padding:'3px 0', borderBottom:'1px solid #f1f5f9' }}>
                          <span style={{ color:'#94a3b8' }}>{l}</span>
                          <span style={{ fontWeight:700, color:'#0f172a' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ display:'flex', gap:'8px', paddingTop:'4px' }}>
                  {step > 1 && (
                    <button onClick={() => { setStep(step-1); setErrors({}); }} style={{ flex:1, padding:'11px', background:'white', color:'#64748b', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontWeight:600, cursor:'pointer', fontSize:'0.85rem', fontFamily:'inherit' }}>
                      Back
                    </button>
                  )}
                  <button onClick={handleNext} disabled={loading} className="sub-btn" style={{ flex:2, padding:'12px', background: loading ? '#fcd34d' : '#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer', fontSize:'0.9rem', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:'0 4px 20px rgba(245,158,11,0.35)', transition:'all 0.2s' }}>
                    {loading ? <><span className="spin" />Submitting...</> : step < 3 ? `Continue to Step ${step+1}` : 'Submit Registration'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position:'absolute', bottom:'3rem', left:'5%', display:'flex', gap:'8px', zIndex:2 }}>
          {IMAGES.map((_, i) => (
            <button key={i} onClick={() => { setImgFade(false); setTimeout(() => { setImgIdx(i); setImgFade(true); }, 250); }}
              style={{ width: i===imgIdx ? '26px' : '7px', height:'7px', borderRadius:'100px', background: i===imgIdx ? '#f59e0b' : 'rgba(255,255,255,0.25)', border:'none', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
          ))}
        </div>
      </div>

      {/* TRUST BAR */}
      <div {...rv('trust')} style={{ ...rv('trust').style, background:'#0f172a', padding:'4rem 5%', marginTop:'2rem' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2rem', textAlign:'center' }} className="trust-grid">
          {[
            ['Verified Platform','All drivers are background-verified and trained before onboarding.'],
            ['Direct Bank Payment','No middlemen — payment goes directly to your bank account in 24 hours.'],
            ['24/7 Driver Support','Our operations team is available round the clock to support you on every trip.'],
          ].map(([t,d],i)=>(
            <div key={i} style={{ padding:'1.5rem' }}>
              <div style={{ width:'32px', height:'3px', background:'#f59e0b', borderRadius:'2px', margin:'0 auto 1rem' }} />
              <h3 style={{ fontSize:'0.95rem', fontWeight:800, color:'white', marginBottom:'0.5rem' }}>{t}</h3>
              <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.35)', lineHeight:1.7, margin:0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  input, select, button { font-family: inherit; }
  input::placeholder { color: #94a3b8 !important; }
  select option { color: #0f172a; background: white; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.45; }
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
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin {
    display: inline-block; width: 16px; height: 16px;
    border: 2.5px solid rgba(0,0,0,0.15); border-top-color: #0f172a;
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @media (max-width: 960px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .hero-grid > div:last-child { display: none; }
    .form-grid { grid-template-columns: 1fr !important; }
    .form-grid > div:last-child { position: static !important; }
    .trust-grid { grid-template-columns: 1fr !important; }
  }
`;