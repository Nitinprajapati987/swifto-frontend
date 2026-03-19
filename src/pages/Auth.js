import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

const CITIES = [
  'Indore','Pithampur','Bhopal','Dewas','Ujjain',
  'Mumbai','Pune','Nagpur','Delhi','Ahmedabad',
  'Jaipur','Surat','Hyderabad','Bangalore','Chennai',
  'Kolkata','Lucknow','Raipur','Nashik','Vadodara',
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
.sw-root { min-height:100vh; background:#f0f2f5; display:flex; align-items:center; justify-content:center; padding:1.5rem; font-family:'Plus Jakarta Sans',sans-serif; }
.sw-wrap { display:grid; grid-template-columns:1fr 1fr; max-width:900px; width:100%; border-radius:24px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.13); }
.sw-left { background:#0f172a; padding:3rem 2.5rem; display:flex; flex-direction:column; justify-content:center; position:relative; overflow:hidden; }
.sw-left::before { content:''; position:absolute; top:-80px; right:-80px; width:260px; height:260px; border-radius:50%; background:rgba(245,158,11,0.08); pointer-events:none; }
.sw-left::after  { content:''; position:absolute; bottom:-60px; left:-60px; width:180px; height:180px; border-radius:50%; background:rgba(245,158,11,0.05); pointer-events:none; }
.sw-logo    { font-size:2.2rem; font-weight:800; color:#f59e0b; letter-spacing:3px; margin-bottom:4px; position:relative; z-index:1; }
.sw-tagline { font-size:0.62rem; font-weight:600; letter-spacing:3px; color:rgba(255,255,255,0.3); text-transform:uppercase; margin-bottom:2.5rem; position:relative; z-index:1; }
.sw-left-title { font-size:1.75rem; font-weight:800; color:white; line-height:1.25; margin-bottom:1rem; position:relative; z-index:1; letter-spacing:-0.5px; }
.sw-left-title span { color:#f59e0b; }
.sw-left-desc { font-size:0.82rem; color:rgba(255,255,255,0.45); line-height:1.7; margin-bottom:2rem; position:relative; z-index:1; }
.sw-feat { display:flex; gap:10px; align-items:center; margin-bottom:14px; position:relative; z-index:1; }
.sw-feat-icon { width:28px; height:28px; border-radius:8px; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.sw-feat-icon svg { width:13px; height:13px; stroke:#f59e0b; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.sw-feat-text { font-size:0.78rem; color:rgba(255,255,255,0.6); font-weight:500; }
.sw-divider { width:36px; height:1px; background:rgba(255,255,255,0.1); margin:1.5rem 0; position:relative; z-index:1; }
.sw-stats { display:flex; gap:1.5rem; position:relative; z-index:1; }
.sw-stat-num { font-size:1.4rem; font-weight:800; color:#f59e0b; line-height:1; }
.sw-stat-lbl { font-size:0.6rem; font-weight:600; color:rgba(255,255,255,0.3); letter-spacing:1.5px; text-transform:uppercase; margin-top:2px; }
.sw-right { background:white; padding:2.5rem 2.25rem; overflow-y:auto; max-height:100vh; }
.sw-greeting { font-size:0.62rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#9ca3af; margin-bottom:5px; }
.sw-title { font-size:1.5rem; font-weight:800; color:#0f172a; letter-spacing:-0.5px; margin-bottom:1.5rem; }
.sw-tabs { display:flex; border:1px solid #e5e7eb; border-radius:10px; overflow:hidden; margin-bottom:1.75rem; }
.sw-tab { flex:1; padding:9px 0; border:none; background:transparent; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.8rem; font-weight:600; cursor:pointer; color:#9ca3af; transition:all 0.2s; }
.sw-tab.active { background:#0f172a; color:white; }
.sw-progress { display:flex; gap:4px; margin-bottom:1.5rem; }
.sw-seg { flex:1; height:3px; background:#e5e7eb; transition:background 0.3s; }
.sw-seg.done { background:#f59e0b; }
.sw-error { background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:9px 12px; margin-bottom:1rem; color:#dc2626; font-size:0.76rem; }
.sw-field { margin-bottom:1rem; }
.sw-label { display:block; font-size:0.65rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#6b7280; margin-bottom:6px; }
.sw-input { width:100%; padding:11px 13px; background:#f9fafb; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.86rem; color:#111827; outline:none; transition:all 0.2s; }
.sw-input:focus { border-color:#f59e0b; background:#fffbeb; }
.sw-input::placeholder { color:#d1d5db; }
.sw-input:disabled { background:#f1f5f9; color:#94a3b8; cursor:not-allowed; }
.sw-input option { background:white; color:#111; }
.sw-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.sw-row { display:flex; gap:8px; margin-bottom:1rem; }
.sw-row .sw-input { flex:1; }
.sw-otp-input { flex:1; text-align:center; font-size:1.2rem; font-weight:800; letter-spacing:6px; padding:11px 13px; background:#f9fafb; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; color:#111827; outline:none; transition:all 0.2s; }
.sw-otp-input:focus { border-color:#f59e0b; background:#fffbeb; }
.sw-obtn { padding:11px 16px; border-radius:10px; border:none; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.78rem; font-weight:700; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
.sw-obtn.amber { background:#f59e0b; color:#0f172a; }
.sw-obtn.amber:hover { background:#d97706; }
.sw-obtn.dark  { background:#0f172a; color:white; }
.sw-obtn.gray  { background:#e5e7eb; color:#9ca3af; cursor:not-allowed; }
.sw-obtn.green { background:#dcfce7; color:#16a34a; cursor:default; font-size:0.8rem; }
.sw-verified { display:flex; align-items:center; gap:8px; padding:9px 12px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; margin-bottom:1rem; font-size:0.78rem; color:#15803d; font-weight:600; }
.sw-btn { width:100%; padding:12px; background:#f59e0b; border:none; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.88rem; font-weight:800; color:#111827; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; }
.sw-btn:hover { background:#d97706; transform:translateY(-1px); box-shadow:0 6px 20px rgba(245,158,11,0.35); }
.sw-btn:disabled { opacity:0.55; cursor:not-allowed; transform:none; box-shadow:none; }
.sw-ghost { width:100%; padding:10px; background:transparent; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.8rem; font-weight:600; color:#6b7280; cursor:pointer; margin-top:8px; transition:all 0.2s; }
.sw-ghost:hover { border-color:#9ca3af; color:#374151; }
.sw-switch { text-align:center; margin-top:1.25rem; font-size:0.78rem; color:#9ca3af; }
.sw-switch span { color:#f59e0b; cursor:pointer; font-weight:700; }
.sw-switch span:hover { text-decoration:underline; }
.sw-forgot { text-align:right; font-size:0.72rem; color:#f59e0b; cursor:pointer; font-weight:600; margin-bottom:1.25rem; margin-top:-0.5rem; }
.sw-forgot:hover { text-decoration:underline; }
@keyframes sw-spin { to { transform:rotate(360deg); } }
.sw-spin { width:13px; height:13px; border:2px solid rgba(0,0,0,0.2); border-top-color:#111; border-radius:50%; animation:sw-spin 0.7s linear infinite; display:inline-block; }
.sw-spin.w { border-top-color:white; }
.sw-right::-webkit-scrollbar { width:4px; }
.sw-right::-webkit-scrollbar-thumb { background:#e5e7eb; border-radius:2px; }
@media (max-width:640px) {
  .sw-wrap { grid-template-columns:1fr; }
  .sw-left { display:none; }
  .sw-right { border-radius:24px; }
}
`;

const Field = ({ label, name, type='text', placeholder, autoComplete='new-password', value, onChange, disabled }) => (
  <div className="sw-field">
    <label className="sw-label">{label}</label>
    <input className="sw-input" name={name} type={type} placeholder={placeholder}
      value={value} onChange={onChange} autoComplete={autoComplete} disabled={disabled}
      maxLength={name==='phone'?10:undefined} />
  </div>
);

const CitySelect = ({ value, onChange }) => (
  <div className="sw-field">
    <label className="sw-label">City *</label>
    <select className="sw-input" name="city" value={value} onChange={onChange}>
      <option value="">Select your city</option>
      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  </div>
);

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode]       = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Login
  const [loginId, setLoginId]   = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  // Register
  const [form, setForm]                   = useState({ firstName:'', lastName:'', phone:'', email:'', city:'', password:'' });
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent]             = useState(false);
  const [otp, setOtp]                     = useState('');
  const [sessionId, setSessionId]         = useState('');
  const [otpLoading, setOtpLoading]       = useState(false);
  const [otpError, setOtpError]           = useState('');
  const [countdown, setCountdown]         = useState(0);

  useEffect(() => {
    if (localStorage.getItem('swifto_token')) navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const reset = () => {
    setError(''); setLoginId(''); setLoginPwd('');
    setForm({ firstName:'', lastName:'', phone:'', email:'', city:'', password:'' });
    setPhoneVerified(false); setOtpSent(false); setOtp('');
    setOtpError(''); setCountdown(0); setSessionId('');
  };

  const switchMode = m => { reset(); setMode(m); };

  const saveAndGo = data => {
    localStorage.setItem('swifto_token', data.token);
    localStorage.setItem('swifto_user', JSON.stringify(data.user));
    navigate('/');
  };

  const handleFormChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
    if (e.target.name === 'phone') {
      setPhoneVerified(false); setOtpSent(false);
      setOtp(''); setOtpError(''); setCountdown(0);
    }
  };

  // ✅ FIX: handleLogin — email aur phone dono sahi bhejo backend ko
  const handleLogin = async () => {
    const id = loginId.trim();
    if (!id)            { setError('Enter your email or phone number.'); return; }
    if (!loginPwd.trim()) { setError('Enter your password.'); return; }

    setLoading(true);
    setError('');
    try {
      const isPhone = /^[6-9]\d{9}$/.test(id);

      // ✅ Phone ke liye { phone, password }, email ke liye { email, password }
      const payload = isPhone
        ? { phone: id, password: loginPwd }
        : { email: id, password: loginPwd };

      const res = await authAPI.login(payload);

      if (res.data && res.data.token) {
        saveAndGo(res.data);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Enter key se bhi login ho
  const handleLoginKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  // ── REGISTER: Send OTP ──
  const sendOTP = async () => {
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) {
      setOtpError('Enter a valid 10-digit phone number.'); return;
    }
    setOtpLoading(true); setOtpError('');
    try {
      const res = await authAPI.sendOTP({ phone: form.phone });
      setSessionId(res.data.sessionId);
      setOtpSent(true);
      setCountdown(30);
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    }
    setOtpLoading(false);
  };

  // ── REGISTER: Verify OTP ──
  const verifyOTP = async () => {
    if (!otp || otp.length < 4) { setOtpError('Please enter the OTP.'); return; }
    setOtpLoading(true); setOtpError('');
    try {
      await authAPI.verifyOTP({ phone: form.phone, otp, sessionId });
      setPhoneVerified(true); setOtpError('');
    } catch (err) {
      setOtpError(err.response?.data?.message || 'Invalid OTP. Try again.');
    }
    setOtpLoading(false);
  };

  // ── REGISTER: Submit ──
  const handleRegister = async () => {
    if (!form.firstName.trim())                     { setError('First name is required.'); return; }
    if (!phoneVerified)                             { setError('Please verify your phone number first.'); return; }
    if (!form.city)                                 { setError('Please select your city.'); return; }
    if (!form.password || form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const verRes = await authAPI.verifyOTP({ phone: form.phone, otp, sessionId, name: fullName });
      await authAPI.register({
        firstName: form.firstName, lastName: form.lastName,
        phone: form.phone, email: form.email,
        city: form.city, password: form.password,
      });
      saveAndGo(verRes.data);
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Session expired. Please send OTP again.');
        setPhoneVerified(false); setOtpSent(false); setOtp('');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Try again.');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="sw-root">
        <div className="sw-wrap">

          {/* LEFT */}
          <div className="sw-left">
            <div className="sw-logo">SWIFTO</div>
            <div className="sw-tagline">India's B2B Logistics Platform</div>
            <h2 className="sw-left-title">Welcome to<br /><span>SWIFTO</span></h2>
            <p className="sw-left-desc">India's most trusted logistics network. Pithampur se Pan India — fast, reliable, transparent.</p>
            {[
              { path:'M5 12h14M12 5l7 7-7 7',                                                                            text:'Truck confirmed in 10 minutes' },
              { path:'M2 5h20v14H2zM2 10h20', rect:true,                                                                 text:'Payment in 24 hours' },
              { path:'M12 8v4l3 3', circle:true,                                                                          text:'Real-time GPS tracking' },
              { path:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', circle2:true, text:'2,500+ verified drivers' },
            ].map((f, i) => (
              <div key={i} className="sw-feat">
                <div className="sw-feat-icon">
                  <svg viewBox="0 0 24 24">
                    {f.circle  && <circle cx="12" cy="12" r="10" />}
                    {f.circle2 && <circle cx="9"  cy="7"  r="4"  />}
                    {f.rect    && <rect x="2" y="5" width="20" height="14" rx="2" />}
                    <path d={f.path} />
                  </svg>
                </div>
                <span className="sw-feat-text">{f.text}</span>
              </div>
            ))}
            <div className="sw-divider" />
            <div className="sw-stats">
              {[['100+','Trips'],['20+','Companies'],['28+','Cities']].map(([n,l]) => (
                <div key={l}><div className="sw-stat-num">{n}</div><div className="sw-stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="sw-right">
            <div className="sw-greeting">{mode==='login' ? 'Welcome back' : 'Create account'}</div>
            <div className="sw-title">{mode==='login' ? 'Sign In' : 'Register'}</div>

            <div className="sw-tabs">
              <button className={`sw-tab${mode==='login'?' active':''}`}    onClick={() => switchMode('login')}>Login</button>
              <button className={`sw-tab${mode==='register'?' active':''}`} onClick={() => switchMode('register')}>Sign Up</button>
            </div>

            {error && <div className="sw-error">{error}</div>}

            {/* ══ LOGIN ══ */}
            {mode === 'login' && (
              <>
                <div className="sw-field">
                  <label className="sw-label">Email or Phone Number</label>
                  <input className="sw-input" type="text"
                    placeholder="Email address or 10-digit phone"
                    value={loginId}
                    onChange={e => { setLoginId(e.target.value); setError(''); }}
                    onKeyDown={handleLoginKeyDown}
                    autoComplete="username"
                  />
                </div>

                <div className="sw-field">
                  <label className="sw-label">Password</label>
                  <input className="sw-input" type="password"
                    placeholder="Enter your password"
                    value={loginPwd}
                    onChange={e => { setLoginPwd(e.target.value); setError(''); }}
                    onKeyDown={handleLoginKeyDown}
                    autoComplete="current-password"
                  />
                </div>

                <div className="sw-forgot">Forgot password?</div>

                <button className="sw-btn" onClick={handleLogin} disabled={loading}>
                  {loading ? <><span className="sw-spin" /> Signing in...</> : 'Sign In →'}
                </button>
              </>
            )}

            {/* ══ REGISTER ══ */}
            {mode === 'register' && (
              <>
                <div className="sw-progress">
                  <div className={`sw-seg${phoneVerified ? ' done' : ''}`} />
                  <div className={`sw-seg${phoneVerified ? ' done' : ''}`} />
                </div>

                <div className="sw-grid2">
                  <Field label="First Name *" name="firstName" placeholder="First name" autoComplete="off" value={form.firstName} onChange={handleFormChange} />
                  <Field label="Last Name"    name="lastName"  placeholder="Last name"  autoComplete="off" value={form.lastName}  onChange={handleFormChange} />
                </div>

                {/* Phone + Send OTP */}
                <label className="sw-label">Phone Number *</label>
                <div className="sw-row">
                  <input className="sw-input" name="phone" type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone} onChange={handleFormChange}
                    maxLength={10} disabled={phoneVerified}
                    style={{ background: phoneVerified ? '#f0fdf4' : undefined }}
                  />
                  {!phoneVerified && (
                    <button
                      className={`sw-obtn ${countdown > 0 ? 'gray' : 'amber'}`}
                      onClick={sendOTP}
                      disabled={otpLoading || countdown > 0}
                    >
                      {otpLoading ? <span className="sw-spin" /> : countdown > 0 ? `${countdown}s` : otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  )}
                  {phoneVerified && (
                    <button className="sw-obtn green" disabled>✓ Verified</button>
                  )}
                </div>

                {/* OTP Input */}
                {otpSent && !phoneVerified && (
                  <div className="sw-row">
                    <input className="sw-otp-input" type="text" inputMode="numeric"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={e => { setOtp(e.target.value.replace(/\D/g,'')); setOtpError(''); }}
                      maxLength={6}
                    />
                    <button className="sw-obtn dark" onClick={verifyOTP} disabled={otpLoading}>
                      {otpLoading ? <span className="sw-spin w" /> : 'Verify'}
                    </button>
                  </div>
                )}
                {otpError && <p style={{ fontSize:'0.7rem', color:'#ef4444', marginBottom:'0.75rem', marginTop:'-0.5rem' }}>{otpError}</p>}

                {phoneVerified && (
                  <div className="sw-verified">✓ Phone number verified successfully!</div>
                )}

                <Field label="Email Address (Optional)" name="email" type="email" placeholder="your@email.com" autoComplete="off" value={form.email} onChange={handleFormChange} />
                <CitySelect value={form.city} onChange={handleFormChange} />
                <Field label="Password *" name="password" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={handleFormChange} />

                <button className="sw-btn" onClick={handleRegister} disabled={loading}>
                  {loading ? <><span className="sw-spin" /> Creating account...</> : 'Sign Up →'}
                </button>
              </>
            )}

            <div className="sw-switch">
              {mode === 'login'
                ? <>Don't have an account? <span onClick={() => switchMode('register')}>Sign up free</span></>
                : <>Already have an account? <span onClick={() => switchMode('login')}>Sign in</span></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
