import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', from: '', to: '', service: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    try {
      const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setApiError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setApiError('Network error. Please check your connection.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)', color: 'white',
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif',
  };

  const labelStyle = {
    fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
    display: 'block', marginBottom: '6px', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  if (submitted) {
    return (
      <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '3rem 2rem', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(230,57,70,0.15)', border: '2px solid rgba(230,57,70,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', color: '#e63946', fontWeight: 900 }}>✓</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>Message Sent Successfully</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Our team will reach out to you at <strong style={{ color: 'white' }}>{form.phone}</strong> shortly.
            </p>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', from: '', to: '', service: '', message: '' }); }}
              style={{ background: '#e63946', color: 'white', border: 'none', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', fontFamily: 'Manrope, sans-serif' }}>
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 5% 4rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ color: '#e63946', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>GET IN TOUCH</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'white', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
            Contact <span style={{ color: '#e63946' }}>SWIFTO</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Our logistics team is available around the clock to assist you with any enquiry.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>

          {/* LEFT — Form */}
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '2.25rem', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 8px 48px rgba(0,0,0,0.3)' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: 'white', fontSize: '1.25rem', marginBottom: '0.4rem' }}>Send Us a Message</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>Fill in the form and we will get back to you within 10 minutes.</p>

            {apiError && (
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit number" required maxLength={10} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Origin</label>
                  <input name="from" value={form.from} onChange={handleChange} placeholder="e.g. Indore" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
                <div>
                  <label style={labelStyle}>Destination</label>
                  <input name="to" value={form.to} onChange={handleChange} placeholder="e.g. Mumbai" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Service Required</label>
                <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select a service</option>
                  {['B2B Logistics','Full Truck Load','Part Load','Packers & Movers','Return Load Matching','Enterprise Plan','API Integration'].map(s => (
                    <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={labelStyle}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your logistics requirement in detail..."
                  rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '13px', background: loading ? 'rgba(230,57,70,0.5)' : '#e63946',
                color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'Manrope, sans-serif',
                fontWeight: 900, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(230,57,70,0.3)', letterSpacing: '0.3px',
              }}>
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* RIGHT — Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Call Now Card */}
            <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', borderRadius: '20px', padding: '2rem', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.75, marginBottom: '0.5rem' }}>Call Us Directly</p>
              <a href="tel:+919179838941" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.9rem', fontWeight: 900, color: 'white', textDecoration: 'none', display: 'block', marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>
                +91 9179838941
              </a>
              <p style={{ fontSize: '0.83rem', opacity: 0.75, margin: 0 }}>Available 24 hours, 7 days a week</p>
            </div>

            {/* WhatsApp */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>WhatsApp</p>
              <a href="https://wa.me/919179838941" target="_blank" rel="noreferrer"
                style={{ color: '#25d366', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                +91 9179838941
              </a>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Quick response guaranteed</p>
            </div>

            {/* Email */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Email</p>
              <a href="mailto:info@swifto.in" style={{ color: '#e63946', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                info@swifto.in
              </a>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>We respond within 2 hours</p>
            </div>

            {/* Office */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Office Address</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: 'white', fontSize: '1rem', marginBottom: '0.25rem' }}>Pithampur Industrial Zone</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Indore, Madhya Pradesh — 454775</p>
            </div>

            {/* Business Hours */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Business Hours</p>
              {[
                ['Monday – Saturday', '9:00 AM – 8:00 PM'],
                ['Sunday',            '10:00 AM – 5:00 PM'],
                ['Emergency Support', '24 / 7'],
              ].map(([day, time]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{day}</span>
                  <span style={{ fontWeight: 700, color: 'white' }}>{time}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25) !important; }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}

export default Contact;