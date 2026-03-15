import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { bookingAPI } from '../services/api';

const vehicles = [
  '7 ft Truck','8 ft Truck','10 ft Truck','12 ft Truck','14 ft Truck',
  '19 ft Truck','20 ft Truck','22 ft Truck','24 ft Truck',
  '28 ft Truck','30 ft Truck','32 ft Truck',
  '20 ft Container','32 ft Single Axle','32 ft Multi Axle','40 ft Container',
  'Dumper','Trailer (40-50 ft)','Flatbed','Tanker',
  'Two Wheeler','Car / Sedan',
];

const userTypes = [
  { val: 'company',    label: 'Company / Factory' },
  { val: 'individual', label: 'Individual' },
];

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

function Booking() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    pickup: '', drop: '', vehicle: '',
    date: '', goods: '', weight: '',
    userType: 'company', amount: '',
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess]   = useState(null);

  useEffect(() => {
    const pickup  = searchParams.get('pickup')  || '';
    const drop    = searchParams.get('drop')    || '';
    const vehicle = searchParams.get('vehicle') || '';
    setForm(prev => ({ ...prev, pickup, drop, vehicle }));
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian number';
    if (!form.pickup.trim())  e.pickup  = 'Pickup location is required';
    if (!form.drop.trim())    e.drop    = 'Drop location is required';
    if (!form.vehicle)        e.vehicle = 'Please select a vehicle';
    if (!form.date)           e.date    = 'Please select a date';
    if (!form.amount.trim())  e.amount  = 'Please enter the amount';
    else if (isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    return e;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true); setApiError('');
    try {
      const res = await bookingAPI.create(form);
      setSuccess({ trackingId: res.data.trackingId });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
    border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
    fontSize: '0.9rem', outline: 'none', color: 'white',
    background: 'rgba(255,255,255,0.08)', boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  });

  const labelStyle = {
    fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)',
    display: 'block', marginBottom: '6px', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  // SUCCESS SCREEN
  if (success) {
    return (
      <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '3rem 2.5rem', maxWidth: '520px', width: '100%' }}>

            {/* Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: 'white', margin: 0 }}>Booking Confirmed</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', margin: '2px 0 0' }}>Your shipment has been registered successfully</p>
              </div>
            </div>

            {/* Tracking ID */}
            <div style={{ background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.2)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Tracking ID</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.8rem', fontWeight: 900, color: '#e63946', letterSpacing: '4px', margin: 0 }}>{success.trackingId}</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>Keep this ID to track your shipment status</p>
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {[
                ['Response Time',  '10 Minutes'],
                ['Driver Assignment', 'Same Day'],
                ['Live Tracking',  'Available'],
                ['WhatsApp Updates', 'Enabled'],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '0.85rem 1rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="/tracking" style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ width: '100%', background: '#e63946', color: 'white', border: 'none', borderRadius: '10px', padding: '0.9rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Manrope, sans-serif' }}>
                  Track Shipment
                </button>
              </a>
              <a href="/" style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ width: '100%', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.9rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                  Return Home
                </button>
              </a>
            </div>
          </div>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', paddingBottom: '3rem', position: 'relative', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(230,57,70,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', pointerEvents: 'none' }} />

      <Navbar />

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '7rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: '#e63946', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Logistics Booking</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.4rem', fontWeight: 900, color: 'white', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
            Book a <span style={{ color: '#e63946' }}>Delivery</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>Our team will contact you within 10 minutes of submission</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {apiError && (
            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
              {apiError}
            </div>
          )}

          {/* User Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Customer Type</label>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '4px', gap: '4px' }}>
              {userTypes.map(t => (
                <button key={t.val} onClick={() => setForm({ ...form, userType: t.val })}
                  style={{
                    flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                    cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
                    background: form.userType === t.val ? '#e63946' : 'transparent',
                    color: form.userType === t.val ? 'white' : 'rgba(255,255,255,0.45)',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Full Name / Company Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name or company name" style={inputStyle(errors.name)}
              onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
            {errors.name && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          {/* Phone + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Mobile Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" maxLength={10} style={inputStyle(errors.phone)}
                onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
              {errors.phone && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.phone}</p>}
            </div>
            <div>
              <label style={labelStyle}>Email Address (Optional)</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
          </div>

          {/* Pickup */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Pickup Location *</label>
            <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="e.g. Pithampur, Indore" style={inputStyle(errors.pickup)}
              onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = errors.pickup ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
            {errors.pickup && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.pickup}</p>}
          </div>

          {/* Drop */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Drop Location *</label>
            <input name="drop" value={form.drop} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" style={inputStyle(errors.drop)}
              onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = errors.drop ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
            {errors.drop && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.drop}</p>}
          </div>

          {/* Vehicle + Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Vehicle Type *</label>
              <select name="vehicle" value={form.vehicle} onChange={handleChange} style={{ ...inputStyle(errors.vehicle), cursor: 'pointer' }}>
                <option value="" style={{ background: '#1a1a2e' }}>Select vehicle</option>
                {vehicles.map(v => <option key={v} value={v} style={{ background: '#1a1a2e' }}>{v}</option>)}
              </select>
              {errors.vehicle && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.vehicle}</p>}
            </div>
            <div>
              <label style={labelStyle}>Pickup Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                style={{ ...inputStyle(errors.date), colorScheme: 'dark' }}
                onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = errors.date ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
              {errors.date && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.date}</p>}
            </div>
          </div>

          {/* Goods + Weight */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Goods Type</label>
              <input name="goods" value={form.goods} onChange={handleChange} placeholder="e.g. Auto Parts, FMCG" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={labelStyle}>Weight / Quantity</label>
              <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 500 kg, 2 ton" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = '#e63946'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
          </div>

          {/* Amount */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={labelStyle}>Agreed Freight Amount (Rs.) *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#e63946', fontWeight: 800, fontSize: '1rem', pointerEvents: 'none' }}>₹</span>
              <input name="amount" value={form.amount} onChange={handleChange} placeholder="Enter agreed amount" type="number" min="0"
                style={{ ...inputStyle(errors.amount), paddingLeft: '2.2rem' }}
                onFocus={e => e.target.style.borderColor = '#e63946'}
                onBlur={e => e.target.style.borderColor = errors.amount ? '#ef4444' : 'rgba(255,255,255,0.15)'} />
            </div>
            {errors.amount && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.amount}</p>}
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Freight amount as agreed with the SWIFTO team</p>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{
              width: '100%', padding: '14px', border: 'none', borderRadius: '10px',
              fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? 'rgba(230,57,70,0.5)' : '#e63946',
              color: 'white', transition: 'background 0.2s',
              boxShadow: '0 4px 20px rgba(230,57,70,0.3)',
              letterSpacing: '0.3px',
            }}>
            {loading ? 'Processing Booking...' : 'Confirm Booking'}
          </button>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginTop: '1rem' }}>
            By confirming, you agree to SWIFTO's terms and conditions.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
        select option { background: #1a1a2e; color: white; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
      `}</style>
    </div>
  );
}

export default Booking;