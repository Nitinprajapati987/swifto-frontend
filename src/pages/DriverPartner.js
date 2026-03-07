import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { driverAPI } from '../services/api';

function DriverPartner() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', city: '', vehicle: '',
    source: '', rcNumber: '', licenseNumber: '',
    experience: '', fleetSize: '1',
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');

  const cities      = ['Indore','Pithampur','Bhopal','Dewas','Ujjain','Mumbai','Pune','Nagpur','Delhi','Ahmedabad','Jaipur','Surat','Hyderabad','Bangalore','Chennai'];
  const vehicles    = ['Two Wheeler / Bike','Car / Sedan','7 ft Truck','10 ft Truck','14 ft Truck','19 ft Truck','22 ft Truck','24 ft Truck','28 ft Truck','32 ft Truck','20 ft Container','40 ft Container','Dumper','Tanker','Trailer / Flatbed'];
  const sources     = ['Google Search','WhatsApp','Friend / Colleague','Facebook / Instagram','Transport Company','Other'];
  const experiences = ['0-1 Year','1-3 Years','3-5 Years','5-10 Years','10+ Years'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleUpperCase = (fieldName) => (e) => {
    handleChange({ target: { name: fieldName, value: e.target.value.toUpperCase() } });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit number';
    if (!form.city) e.city = 'Please select your city';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.vehicle)    e.vehicle    = 'Please select your vehicle type';
    if (!form.experience) e.experience = 'Please select your experience';
    return e;
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.rcNumber.trim())      e.rcNumber      = 'RC Number is required';
    if (!form.licenseNumber.trim()) e.licenseNumber = 'License Number is required';
    return e;
  };

  const nextStep = async () => {
    let e = {};
    if (step === 1) e = validateStep1();
    if (step === 2) e = validateStep2();
    if (step === 3) e = validateStep3();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});

    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true); setApiError('');
      try {
        await driverAPI.register(form);
        setStep(4);
      } catch (err) {
        setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
    border: `1.5px solid ${hasError ? '#ef4444' : '#e8eaff'}`,
    fontSize: '0.9rem', outline: 'none', color: '#1a1a2e',
    background: '#f9faff', boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif',
  });

  const labelStyle = {
    fontSize: '0.75rem', color: '#6b7280',
    display: 'block', marginBottom: '6px', fontWeight: 600,
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
      {[
        { num: 1, label: 'Basic Info' },
        { num: 2, label: 'Vehicle' },
        { num: 3, label: 'Documents' },
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: step >= s.num ? '#4361ee' : '#e8eaff',
              color: step >= s.num ? 'white' : '#9ca3af',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '0.9rem',
              border: step === s.num ? '3px solid #1a3aad' : 'none',
              transition: 'all 0.3s',
            }}>
              {step > s.num ? 'Done' : s.num}
            </div>
            <span style={{ fontSize: '0.65rem', color: step >= s.num ? '#4361ee' : '#9ca3af', fontWeight: 600 }}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div style={{
              height: '2px', width: '60px', marginBottom: '18px',
              background: step > s.num ? '#4361ee' : '#e8eaff',
              transition: 'background 0.3s',
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 4 — Success
  if (step === 4) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #eef0ff 0%, #dde3ff 50%, #c8d2ff 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '3rem 2rem', maxWidth: '480px', width: '100%', boxShadow: '0 8px 48px rgba(67,97,238,0.15)' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.75rem', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.5rem' }}>Registration Successful!</h2>
            <p style={{ color: '#555', marginBottom: '0.5rem' }}>Thank you <strong>{form.name}</strong>!</p>
            <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Our team will contact you at <strong style={{ color: '#4361ee' }}>{form.phone}</strong> within 24 hours.
            </p>

            <div style={{ background: '#f5f7ff', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>Registration Summary</p>
              {[
                ['Name', form.name],
                ['Phone', form.phone],
                ['City', form.city],
                ['Vehicle', form.vehicle],
                ['Experience', form.experience],
                ['RC Number', form.rcNumber],
                ['License', form.licenseNumber],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: '#6b7280' }}>{label}</span>
                  <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#eef0ff', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ fontWeight: 700, color: '#4361ee', fontSize: '0.85rem', marginBottom: '0.5rem' }}>What happens next?</p>
              {[
                'Documents will be verified within 24 hours',
                'SWIFTO team will call you',
                'Training will be provided',
                'You will start receiving loads',
              ].map((item, i) => (
                <p key={i} style={{ fontSize: '0.8rem', color: '#374151', marginBottom: '0.25rem' }}>- {item}</p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => { setStep(1); setForm({ name: '', phone: '', city: '', vehicle: '', source: '', rcNumber: '', licenseNumber: '', experience: '', fleetSize: '1' }); }}
                style={{ background: '#4361ee', color: 'white', border: 'none', borderRadius: '10px', padding: '0.85rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                Register Another Vehicle
              </button>
              <Link to="/">
                <button style={{ background: 'white', color: '#1a1a2e', border: '1.5px solid #e0e0e0', borderRadius: '10px', padding: '0.85rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                  Go to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: 'linear-gradient(135deg, #eef0ff 0%, #dde3ff 50%, #c8d2ff 100%)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 5% 3rem', display: 'grid', gridTemplateColumns: '1fr 440px', gap: '3rem', alignItems: 'start' }}>

        {/* Left Side */}
        <div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#1a1a2e', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-1px' }}>
            Attach Your Vehicle<br/><span style={{ color: '#4361ee' }}>Start Earning Today</span>
          </h1>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '480px', marginBottom: '2rem' }}>
            Full-time or part-time — become a SWIFTO Partner and get guaranteed loads. Earn on return trips too!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: '440px', marginBottom: '2rem' }}>
            {[
              ['Guaranteed Loads', 'Never run empty'],
              ['24hr Payment', 'Direct bank transfer'],
              ['Return Load Match', 'Auto suggestions'],
              ['AI Support', '24/7 available'],
              ['Driver App', 'Coming soon'],
              ['Insurance Cover', 'Per trip'],
            ].map(([title, sub]) => (
              <div key={title} style={{ background: 'white', border: '1px solid rgba(67,97,238,0.15)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem', fontWeight: 800, color: '#1a1a2e' }}>{title}</div>
                <div style={{ fontSize: '0.72rem', color: '#777' }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {[['500+', 'Active Drivers'], ['10K+', 'Trips Done'], ['Rs.2L+', 'Avg Monthly Earning']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#4361ee' }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side — Form */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 48px rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.1)' }}>

          <StepIndicator />

          {apiError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>
              {apiError}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Basic Information
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Enter your full name"
                  style={inputStyle(errors.name)} />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Mobile Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10} style={inputStyle(errors.phone)} />
                {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.phone}</p>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>City *</label>
                <select name="city" value={form.city} onChange={handleChange}
                  style={{ ...inputStyle(errors.city), cursor: 'pointer' }}>
                  <option value="">Select your city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.city && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.city}</p>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>How did you hear about us?</label>
                <select name="source" value={form.source} onChange={handleChange}
                  style={{ ...inputStyle(false), cursor: 'pointer' }}>
                  <option value="">Select source</option>
                  {sources.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#1a1a2e', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Vehicle Details
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Vehicle Type *</label>
                <select name="vehicle" value={form.vehicle} onChange={handleChange}
                  style={{ ...inputStyle(errors.vehicle), cursor: 'pointer' }}>
                  <option value="">Select your vehicle</option>
                  {vehicles.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                {errors.vehicle && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.vehicle}</p>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Driving Experience *</label>
                <select name="experience" value={form.experience} onChange={handleChange}
                  style={{ ...inputStyle(errors.experience), cursor: 'pointer' }}>
                  <option value="">Select experience</option>
                  {experiences.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.experience && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.experience}</p>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Fleet Size (Number of trucks)</label>
                <select name="fleetSize" value={form.fleetSize} onChange={handleChange}
                  style={{ ...inputStyle(false), cursor: 'pointer' }}>
                  {['1','2','3','4','5','6-10','10+'].map(n => (
                    <option key={n} value={n}>{n} Truck{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div style={{ background: '#eef0ff', borderRadius: '12px', padding: '1rem' }}>
                <p style={{ fontWeight: 700, color: '#4361ee', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Estimated Monthly Earnings
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#6b7280' }}>Per trip average</span>
                  <span style={{ fontWeight: 700, color: '#1a1a2e' }}>Rs.8,000 - Rs.15,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#6b7280' }}>Trips per month</span>
                  <span style={{ fontWeight: 700, color: '#1a1a2e' }}>10 - 20 trips</span>
                </div>
                <div style={{ borderTop: '1px solid #c5cfff', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#4361ee' }}>Total Earning</span>
                  <span style={{ fontWeight: 900, color: '#4361ee', fontSize: '1rem' }}>Rs.80K - Rs.2L/month</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#1a1a2e', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Document Details
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                These details are required for verification — safe and secure
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>RC Number (Registration Certificate) *</label>
                <input
                  name="rcNumber"
                  value={form.rcNumber}
                  onChange={handleUpperCase('rcNumber')}
                  placeholder="e.g. MP09AB1234"
                  style={inputStyle(errors.rcNumber)}
                />
                {errors.rcNumber && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.rcNumber}</p>}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Driving License Number *</label>
                <input
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleUpperCase('licenseNumber')}
                  placeholder="e.g. MP0920110012345"
                  style={inputStyle(errors.licenseNumber)}
                />
                {errors.licenseNumber && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px' }}>{errors.licenseNumber}</p>}
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.5rem' }}>
                <p style={{ color: '#166534', fontSize: '0.8rem', fontWeight: 600 }}>Your information is 100% safe</p>
                <p style={{ color: '#166534', fontSize: '0.75rem', marginTop: '4px' }}>
                  Documents will only be used for verification. They will not be shared with anyone.
                </p>
              </div>

              <div style={{ background: '#f5f7ff', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>
                  Registration Summary
                </p>
                {[
                  ['Name', form.name],
                  ['Phone', form.phone],
                  ['City', form.city],
                  ['Vehicle', form.vehicle],
                  ['Experience', form.experience],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                    <span style={{ color: '#6b7280' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '2px solid #e8eaff', background: 'white', color: '#4361ee', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                Back
              </button>
            )}
            <button onClick={nextStep} disabled={loading}
              style={{ flex: 2, padding: '0.85rem', borderRadius: '10px', border: 'none', background: loading ? '#7a90f0' : '#4361ee', color: 'white', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? 'Submitting...' : step === 3 ? 'Submit Registration' : `Next - Step ${step + 1}`}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #9ca3af; }
        select option { color: #1a1a2e; }
      `}</style>
    </div>
  );
}

export default DriverPartner;