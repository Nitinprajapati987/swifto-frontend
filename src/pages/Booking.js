import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useSearchParams } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import phonePeQR from '../assets/logos/phonepe-qr.png';

function Booking() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    pickup:  searchParams.get('pickup')  || '',
    drop:    searchParams.get('drop')    || '',
    vehicle: searchParams.get('vehicle') || '',
    date: '', goods: '', weight: '', userType: 'company',
  });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [apiError, setApiError]   = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = 'Name is required';
    if (!form.phone.trim())  e.phone  = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number';
    if (!form.pickup.trim()) e.pickup = 'Pickup location is required';
    if (!form.drop.trim())   e.drop   = 'Drop location is required';
    if (!form.vehicle)       e.vehicle = 'Please select a vehicle';
    if (!form.date)          e.date   = 'Date is required';
    return e;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); window.scrollTo({ top: 200, behavior: 'smooth' }); return; }
    setLoading(true);
    setApiError('');
    try {
      const res = await bookingAPI.create(form);
      setTrackingId(res.data.trackingId);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Booking failed. Please try again.');
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

  const labelStyle = { fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: 600 };

  if (submitted) {
    return (
      <div style={{ background: 'linear-gradient(160deg, #bcc8f0 0%, #c5d0f5 50%, #aebde8 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '6rem 1.5rem 2rem' }}>

          <div style={{ width: '72px', height: '72px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'white', fontSize: '2rem', fontWeight: 900 }}>✓</span>
          </div>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
          <p style={{ color: '#374151', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Thank you, <strong>{form.name}</strong>!</p>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Our team will contact you at <strong style={{ color: '#4361ee' }}>{form.phone}</strong> shortly.</p>

          {/* Booking Details */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 2rem', textAlign: 'left', width: '100%', maxWidth: '420px', border: '1px solid rgba(67,97,238,0.1)', boxShadow: '0 4px 24px rgba(67,97,238,0.12)', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '1rem' }}>Booking Details</p>
            {[
              ['Tracking ID', trackingId, true],
              ['Pickup',      form.pickup,  false],
              ['Drop',        form.drop,    false],
              ['Vehicle',     form.vehicle, false],
              ['Date',        form.date,    false],
            ].map(([label, val, highlight]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>{label}</span>
                <span style={{ fontWeight: 700, color: highlight ? '#4361ee' : '#1a1a2e' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* PhonePe Payment Section */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem 2rem', width: '100%', maxWidth: '420px', border: '2px solid #5f259f', boxShadow: '0 4px 24px rgba(95,37,159,0.15)', marginBottom: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#5f259f', margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Pay via PhonePe</h3>
            <p style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1rem' }}>Scan to pay advance — remaining amount on delivery</p>

            <div style={{ background: '#f3f0ff', borderRadius: '16px', padding: '1rem', marginBottom: '1rem', display: 'inline-block' }}>
              <img src={phonePeQR} alt="PhonePe QR Code" style={{ width: '180px', height: '180px', borderRadius: '12px', display: 'block' }} />
            </div>

            <p style={{ color: '#5f259f', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
              Works with PhonePe, Google Pay, and Paytm
            </p>

            {!paymentDone ? (
              <button onClick={() => setPaymentDone(true)}
                style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: 'none', background: '#5f259f', color: 'white', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(95,37,159,0.3)' }}>
                I Have Completed Payment
              </button>
            ) : (
              <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '12px', padding: '0.85rem', color: '#16a34a', fontWeight: 700, fontSize: '0.95rem' }}>
                Payment Confirmed! Our team will contact you shortly.
              </div>
            )}
          </div>

          <p style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Please save your Tracking ID to track your order.</p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => { setSubmitted(false); setPaymentDone(false); setForm({ name: '', phone: '', email: '', pickup: '', drop: '', vehicle: '', date: '', goods: '', weight: '', userType: 'company' }); }}
              style={{ background: '#4361ee', color: 'white', padding: '0.85rem 2rem', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(67,97,238,0.3)' }}>
              New Booking
            </button>
            <Link to="/tracking">
              <button style={{ background: 'white', color: '#4361ee', padding: '0.85rem 2rem', borderRadius: '100px', fontWeight: 700, border: '1.5px solid #4361ee', cursor: 'pointer' }}>
                Track Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(160deg, #bcc8f0 0%, #c5d0f5 50%, #aebde8 100%)', minHeight: '100vh', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(245,240,225,0.7)', borderRadius: '50%', pointerEvents: 'none' }} />
      <Navbar />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '7rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-1px', marginBottom: '0.5rem' }}>Book a <span style={{ color: '#4361ee' }}>Delivery</span></h2>
          <p style={{ color: '#374151', fontSize: '1rem' }}>Fill in the details — our team will contact you immediately!</p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 48px rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.08)' }}>

          {apiError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>
              {apiError}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 600 }}>Who are you?</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[{ val: 'company', label: 'Company / Factory' }, { val: 'individual', label: 'Individual' }].map(t => (
                <button key={t.val} onClick={() => setForm({ ...form, userType: t.val })}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', background: form.userType === t.val ? '#4361ee' : '#f5f7ff', color: form.userType === t.val ? 'white' : '#374151', border: `1.5px solid ${form.userType === t.val ? '#4361ee' : '#e8eaff'}` }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder={form.userType === 'company' ? 'Company name' : 'Your name'}
                style={inputStyle(errors.name)}
                onFocus={e => e.target.style.borderColor = '#4361ee'}
                onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : '#e8eaff'} />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="9876543210" maxLength={10}
                style={inputStyle(errors.phone)}
                onFocus={e => e.target.style.borderColor = '#4361ee'}
                onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : '#e8eaff'} />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.phone}</p>}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Pickup Location *</label>
            <input name="pickup" value={form.pickup} onChange={handleChange}
              placeholder="Full pickup address"
              style={inputStyle(errors.pickup)}
              onFocus={e => e.target.style.borderColor = '#4361ee'}
              onBlur={e => e.target.style.borderColor = errors.pickup ? '#ef4444' : '#e8eaff'} />
            {errors.pickup && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.pickup}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Drop Location *</label>
            <input name="drop" value={form.drop} onChange={handleChange}
              placeholder="Full drop address"
              style={inputStyle(errors.drop)}
              onFocus={e => e.target.style.borderColor = '#4361ee'}
              onBlur={e => e.target.style.borderColor = errors.drop ? '#ef4444' : '#e8eaff'} />
            {errors.drop && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.drop}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Vehicle Type *</label>
            <select name="vehicle" value={form.vehicle} onChange={handleChange}
              style={{ ...inputStyle(errors.vehicle), cursor: 'pointer', appearance: 'auto' }}>
              <option value="">Select vehicle...</option>
              <optgroup label="Light Vehicles">
                <option value="Two Wheeler">Two Wheeler</option>
                <option value="Car / Sedan">Car / Sedan</option>
              </optgroup>
              <optgroup label="Small Trucks">
                <option value="7 ft Truck">7 ft Truck</option>
                <option value="10 ft Truck">10 ft Truck</option>
                <option value="14 ft Truck">14 ft Truck</option>
              </optgroup>
              <optgroup label="Medium Trucks">
                <option value="19 ft Truck">19 ft Truck</option>
                <option value="22 ft Truck">22 ft Truck</option>
                <option value="24 ft Truck">24 ft Truck</option>
              </optgroup>
              <optgroup label="Heavy Trucks">
                <option value="28 ft Truck">28 ft Truck</option>
                <option value="32 ft Truck">32 ft Truck</option>
              </optgroup>
              <optgroup label="Containers">
                <option value="20 ft Container">20 ft Container</option>
                <option value="40 ft Container">40 ft Container</option>
              </optgroup>
              <optgroup label="Special">
                <option value="Dumper">Dumper</option>
                <option value="Tanker">Tanker</option>
                <option value="Trailer">Trailer</option>
              </optgroup>
            </select>
            {errors.vehicle && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.vehicle}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Pickup Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                style={inputStyle(errors.date)}
                onFocus={e => e.target.style.borderColor = '#4361ee'}
                onBlur={e => e.target.style.borderColor = errors.date ? '#ef4444' : '#e8eaff'} />
              {errors.date && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.date}</p>}
            </div>
            <div>
              <label style={labelStyle}>Approx Weight</label>
              <input name="weight" value={form.weight} onChange={handleChange}
                placeholder="e.g. 500 kg, 2 ton"
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = '#4361ee'}
                onBlur={e => e.target.style.borderColor = '#e8eaff'} />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Goods Description</label>
            <textarea name="goods" value={form.goods} onChange={handleChange}
              placeholder="What are you shipping — furniture, machinery, FMCG..."
              rows={3}
              style={{ ...inputStyle(false), resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#4361ee'}
              onBlur={e => e.target.style.borderColor = '#e8eaff'} />
          </div>

          <div style={{ background: '#eef0ff', border: '1px solid rgba(67,97,238,0.2)', borderRadius: '12px', padding: '1rem', fontSize: '0.82rem', color: '#3451d1', marginBottom: '1.25rem' }}>
            <strong>Note:</strong> After submitting, our team will call you within 10 minutes to confirm the final price.
          </div>

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#7a90f0' : '#4361ee', color: 'white', boxShadow: '0 4px 16px rgba(67,97,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {loading ? (
              <><svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>Processing...</>
            ) : 'Submit Booking'}
          </button>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
      `}</style>
    </div>
  );
}

export default Booking;