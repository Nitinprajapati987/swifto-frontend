import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const sendOTP = (phone) => authAPI.sendOTP({ phone });
const verifyOTP = (phone, otp, sessionId, name) => authAPI.verifyOTP({ phone, otp, sessionId, name });

const cities = [
  'Indore','Pithampur','Bhopal','Dewas','Ujjain',
  'Mumbai','Pune','Nagpur','Delhi','Ahmedabad',
  'Jaipur','Surat','Hyderabad','Bangalore','Chennai',
  'Kolkata','Lucknow','Raipur','Nashik','Vadodara',
];

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [loginMethod, setLoginMethod] = useState('email');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    city: '', password: '', otp: '',
  });

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

  const switchMode = (m) => {
    setMode(m); setStep(1); setError(''); setLoginMethod('email');
    setForm({ firstName: '', lastName: '', phone: '', email: '', city: '', password: '', otp: '' });
  };

  const handleSendOTP = async () => {
    if (!form.firstName.trim()) return setError('First name is required');
    if (!form.phone || form.phone.length < 10) return setError('Enter a valid 10-digit phone number');
    if (!form.email.trim()) return setError('Email is required');
    if (!form.city) return setError('Please select your city');
    if (!form.password || form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await sendOTP(form.phone);
      if (res.data.success) { setSessionId(res.data.sessionId); setStep(2); }
    } catch (err) { setError(err.response?.data?.message || 'Failed to send OTP.'); }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!form.otp || form.otp.length !== 6) return setError('Enter the 6-digit OTP');
    setLoading(true);
    try {
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const res = await verifyOTP(form.phone, form.otp, sessionId, fullName);
      localStorage.setItem('swifto_token', res.data.token);
      localStorage.setItem('swifto_user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Invalid OTP.'); }
    setLoading(false);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Email and password required');
    setLoading(true);
    try {
      const res = await authAPI.login({ email: form.email, password: form.password });
      localStorage.setItem('swifto_token', res.data.token);
      localStorage.setItem('swifto_user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Invalid credentials'); }
    setLoading(false);
  };

  const handleLoginSendOTP = async () => {
    if (!form.phone || form.phone.length < 10) return setError('Enter a valid 10-digit phone number');
    setLoading(true);
    try {
      const res = await sendOTP(form.phone);
      if (res.data.success) { setSessionId(res.data.sessionId); setStep(2); }
    } catch (err) { setError(err.response?.data?.message || 'Failed to send OTP.'); }
    setLoading(false);
  };

  const handleLoginVerifyOTP = async () => {
    if (!form.otp || form.otp.length !== 6) return setError('Enter the 6-digit OTP');
    setLoading(true);
    try {
      const res = await authAPI.loginWithOTP({ phone: form.phone, otp: form.otp, sessionId });
      localStorage.setItem('swifto_token', res.data.token);
      localStorage.setItem('swifto_user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Invalid OTP.'); }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: BG,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* ── Two-column wrapper ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mode === 'register' ? '1fr 1fr' : '1fr',
        maxWidth: mode === 'register' ? '900px' : '440px',
        width: '100%', gap: '0',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        transition: 'max-width 0.3s',
      }}>

        {/* ── LEFT PANEL — only on register ── */}
        {mode === 'register' && (
          <div style={{
            background: 'linear-gradient(160deg, #e63946 0%, #c1121f 100%)',
            padding: '48px 36px', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', color: 'white',
          }}>
            <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 6px', letterSpacing: '-1px' }}>SWIFTO</h1>
            <p style={{ fontSize: '14px', opacity: 0.85, margin: '0 0 36px' }}>India's #1 B2B Logistics Platform</p>

            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 20px', lineHeight: 1.3 }}>
              Join 2500+ Drivers &amp;<br />50+ Companies
            </h2>

            {[
              ['', 'Guaranteed Loads', 'Never run empty again'],
              ['', '10 Min Response', 'Fastest booking in India'],
              ['', '24hr Payment', 'Direct bank transfer'],
              ['', 'Live Tracking', 'Real-time GPS updates'],
            ].map(([icon, title, sub]) => (
              <div key={title} style={{ display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '20px', marginTop: '2px' }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{title}</div>
                  <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>{sub}</div>
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '20px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[['2500+','Drivers'],['10K+','Trips'],['500+','Companies']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: '18px', fontWeight: '900' }}>{n}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RIGHT PANEL — form ── */}
        <div style={{ background: 'white', padding: '36px 32px', overflowY: 'auto', maxHeight: '95vh' }}>

          {/* Logo — only when not register (login view) */}
          {mode === 'login' && (
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#e63946', margin: 0, letterSpacing: '-1px' }}>SWIFTO</h1>
              <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Logistics Platform</p>
            </div>
          )}

          {/* Logo small — on register panel */}
          {mode === 'register' && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#e63946', margin: 0 }}>Create Account</h2>
              <p style={{ color: '#999', margin: '4px 0 0', fontSize: '13px' }}>Join SWIFTO today</p>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '24px', background: '#f3f3f3', borderRadius: '10px', padding: '4px', gap: '4px' }}>
            {[['login','Login'], ['register','Sign Up']].map(([m, label]) => (
              <button key={m} onClick={() => switchMode(m)} style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '14px', transition: 'all 0.2s',
                background: mode === m ? '#e63946' : 'transparent',
                color: mode === m ? 'white' : '#888',
              }}>{label}</button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '8px',
              padding: '10px 14px', marginBottom: '16px', color: '#cc0000', fontSize: '13px',
            }}>{error}</div>
          )}

          {/* ══ LOGIN ══ */}
          {mode === 'login' && (
            <div>
              <div style={{ display: 'flex', background: '#f3f3f3', borderRadius: '8px', padding: '3px', gap: '3px', marginBottom: '20px' }}>
                {[['email','Email & Password'], ['phone','Phone OTP']].map(([m, label]) => (
                  <button key={m} onClick={() => { setLoginMethod(m); setStep(1); setError(''); setForm(f => ({ ...f, otp: '' })); }} style={{
                    flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                    fontWeight: '600', fontSize: '13px', transition: 'all 0.2s',
                    background: loginMethod === m ? '#e63946' : 'transparent',
                    color: loginMethod === m ? 'white' : '#888',
                  }}>{label}</button>
                ))}
              </div>

              {loginMethod === 'email' && (
                <form onSubmit={handleEmailLogin}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" type="email" placeholder="enter your email id" value={form.email} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '22px' }}>
                    <label style={labelStyle}>Password</label>
                    <input name="password" type="password" placeholder="Enter password" value={form.password} onChange={handleChange} style={inputStyle} />
                  </div>
                  <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Logging in...' : 'Login'}</button>
                </form>
              )}

              {loginMethod === 'phone' && (
                <div>
                  {step === 1 && (
                    <>
                      <div style={{ marginBottom: '8px' }}>
                        <label style={labelStyle}>Phone Number</label>
                        <input name="phone" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} style={inputStyle} maxLength={10} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#999', marginBottom: '20px' }}>OTP will be sent via SMS</p>
                      <button onClick={handleLoginSendOTP} disabled={loading} style={btnStyle}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div style={{ background: '#f0fff4', border: '1px solid #c3f0ca', borderRadius: '8px', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#2d7a3a' }}>OTP sent to <strong>+91 {form.phone}</strong></p>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Enter 6-Digit OTP</label>
                        <input name="otp" type="number" placeholder="000000" value={form.otp} onChange={handleChange} maxLength={6}
                          style={{ ...inputStyle, textAlign: 'center', fontSize: '24px', letterSpacing: '10px', fontWeight: '700' }} />
                      </div>
                      <button onClick={handleLoginVerifyOTP} disabled={loading} style={btnStyle}>{loading ? 'Verifying...' : 'Verify & Login'}</button>
                      <button onClick={() => { setStep(1); setError(''); }} style={{ ...btnStyle, background: 'transparent', color: '#888', border: '1px solid #ddd', marginTop: '10px' }}>← Change Number</button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ══ REGISTER ══ */}
          {mode === 'register' && (
            <div>
              {step === 1 && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input name="firstName" placeholder="Rahul" value={form.firstName} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input name="lastName" placeholder="Sharma" value={form.lastName} onChange={handleChange} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input name="phone" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} style={inputStyle} maxLength={10} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Email Address *</label>
                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>City *</label>
                    <select name="city" value={form.city} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', color: form.city ? '#222' : '#aaa' }}>
                      <option value="">Select your city</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <label style={labelStyle}>Password *</label>
                    <input name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} style={inputStyle} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '20px' }}>OTP will be sent to your phone for verification</p>
                  <button onClick={handleSendOTP} disabled={loading} style={btnStyle}>{loading ? 'Sending OTP...' : 'Send OTP to Verify'}</button>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ background: '#f0fff4', border: '1px solid #c3f0ca', borderRadius: '8px', padding: '12px', marginBottom: '20px', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#2d7a3a' }}>OTP sent to <strong>+91 {form.phone}</strong></p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Enter 6-Digit OTP</label>
                    <input name="otp" type="number" placeholder="000000" value={form.otp} onChange={handleChange} maxLength={6}
                      style={{ ...inputStyle, textAlign: 'center', fontSize: '24px', letterSpacing: '10px', fontWeight: '700' }} />
                  </div>
                  <button onClick={handleVerifyOTP} disabled={loading} style={btnStyle}>{loading ? 'Verifying...' : 'Verify & Create Account'}</button>
                  <button onClick={() => { setStep(1); setError(''); }} style={{ ...btnStyle, background: 'transparent', color: '#888', border: '1px solid #ddd', marginTop: '10px' }}>← Go Back</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px', color: '#333' };
const inputStyle = { width: '100%', padding: '11px 14px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', color: '#222' };
const btnStyle = { width: '100%', padding: '13px', background: '#e63946', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s', display: 'block' };