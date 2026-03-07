import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Auth() {
  const [isLogin, setIsLogin]         = useState(true);
  const [userType, setUserType]       = useState('company');
  const [form, setForm]               = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors]           = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [apiError, setApiError]       = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim())  e.name = 'Name is required';
    if (!isLogin && !form.phone.trim()) e.phone = 'Phone number is required';
    else if (!isLogin && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    setApiError('');
    try {
      let res;
      if (isLogin) {
        res = await authAPI.login({ email: form.email, password: form.password });
      } else {
        res = await authAPI.register({
          name: form.name, email: form.email,
          phone: form.phone, password: form.password,
          role: userType === 'truck' ? 'driver' : 'user',
        });
      }
      localStorage.setItem('swifto_token', res.data.token);
      localStorage.setItem('swifto_user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    background: '#f5f7ff', color: '#1a1a2e',
    padding: '0.85rem 1rem', borderRadius: '10px', width: '100%',
    outline: 'none', border: `1.5px solid ${hasError ? '#ef4444' : '#e8eaff'}`,
    fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  });

  return (
    <div style={{ background: 'linear-gradient(160deg, #bcc8f0 0%, #c5d0f5 50%, #aebde8 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(245,240,225,0.7)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', background: 'rgba(100,130,220,0.2)', borderRadius: '50%', pointerEvents: 'none' }} />
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '6rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#4361ee' }}>SWIFTO</h1>
            <p style={{ color: '#374151', fontSize: '0.85rem', marginTop: '4px' }}>Fast & Reliable Logistics</p>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.6)', borderRadius: '100px', padding: '4px', marginBottom: '1.5rem', border: '1px solid rgba(67,97,238,0.15)' }}>
            {[{ val: true, label: 'Login' }, { val: false, label: 'Register' }].map(({ val, label }) => (
              <button key={label} onClick={() => { setIsLogin(val); setErrors({}); setApiError(''); }}
                style={{ flex: 1, padding: '0.65rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s', background: isLogin === val ? '#4361ee' : 'transparent', color: isLogin === val ? 'white' : '#374151' }}>
                {label}
              </button>
            ))}
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#374151', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 600 }}>Who are you?</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[{ val: 'company', label: 'Company / Factory' }, { val: 'truck', label: 'Truck Owner' }].map(t => (
                  <button key={t.val} onClick={() => setUserType(t.val)}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', background: userType === t.val ? '#4361ee' : 'white', color: userType === t.val ? 'white' : '#374151', border: `1.5px solid ${userType === t.val ? '#4361ee' : '#e8eaff'}` }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 48px rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.08)' }}>
            {apiError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>
                {apiError}
              </div>
            )}

            {!isLogin && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder={userType === 'company' ? 'Company name' : 'Your name'} style={inputStyle(errors.name)} onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : '#e8eaff'} />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
              </div>
            )}

            {!isLogin && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" maxLength={10} style={inputStyle(errors.phone)} onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : '#e8eaff'} />
                {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.phone}</p>}
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Email Address *</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle(errors.email)} onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : '#e8eaff'} />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder={isLogin ? 'Your password' : 'Minimum 6 characters'} style={{ ...inputStyle(errors.password), paddingRight: '3rem' }} onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = errors.password ? '#ef4444' : '#e8eaff'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#6b7280' }}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.password}</p>}
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#7a90f0' : '#4361ee', color: 'white', boxShadow: '0 4px 16px rgba(67,97,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? (
                <><svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>{isLogin ? 'Logging in...' : 'Creating account...'}</>
              ) : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </div>

          <p style={{ textAlign: 'center', color: '#374151', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={() => { setIsLogin(!isLogin); setErrors({}); setApiError(''); }} style={{ color: '#4361ee', cursor: 'pointer', fontWeight: 700 }}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap'); @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } input::placeholder { color: #9ca3af; }`}</style>
    </div>
  );
}

export default Auth;