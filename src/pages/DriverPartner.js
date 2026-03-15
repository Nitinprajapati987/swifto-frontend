import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { driverAPI } from '../services/api';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

function DriverPartner() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', city: '', vehicle: '',
    source: '', rcNumber: '', licenseNumber: '',
    experience: '', fleetSize: '1',
    routes: [],
    fitnessCertNumber: '',
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');

  const cities      = ['Indore','Pithampur','Bhopal','Dewas','Ujjain','Mumbai','Pune','Nagpur','Delhi','Ahmedabad','Jaipur','Surat','Hyderabad','Bangalore','Chennai'];
  const vehicles    = ['Two Wheeler / Bike','Car / Sedan','7 ft Truck','10 ft Truck','14 ft Truck','19 ft Truck','22 ft Truck','24 ft Truck','28 ft Truck','32 ft Truck','20 ft Container','40 ft Container','Dumper','Tanker','Trailer / Flatbed'];
  const sources     = ['Google Search','WhatsApp','Friend / Colleague','Facebook / Instagram','Transport Company','Other'];
  const experiences = ['0-1 Year','1-3 Years','3-5 Years','5-10 Years','10+ Years'];
  const routeOptions = ['Mumbai','Pune','Delhi','Ahmedabad','Surat','Jaipur','Nagpur','Hyderabad','Bangalore','Chennai','Kolkata','Lucknow','Raipur','Bhopal','Nashik','Vadodara','Chandigarh','Gujarat','Maharashtra','Rajasthan','Uttar Pradesh','Pan India'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleUpperCase = (fieldName) => (e) => {
    handleChange({ target: { name: fieldName, value: e.target.value.toUpperCase() } });
  };

  const toggleRoute = (route) => {
    const current = form.routes;
    if (current.includes(route)) {
      setForm({ ...form, routes: current.filter(r => r !== route) });
    } else {
      setForm({ ...form, routes: [...current, route] });
    }
    if (errors.routes) setErrors({ ...errors, routes: '' });
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
    if (!form.vehicle)              e.vehicle    = 'Please select your vehicle type';
    if (!form.experience)           e.experience = 'Please select your experience';
    if (form.routes.length === 0)   e.routes     = 'Please select at least one route';
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
    border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
    fontSize: '0.9rem', outline: 'none', color: 'white',
    background: 'rgba(255,255,255,0.08)', boxSizing: 'border-box',
    fontFamily: 'DM Sans, sans-serif',
  });

  const labelStyle = {
    fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
    display: 'block', marginBottom: '6px', fontWeight: 600,
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
      {[
        { num: 1, label: 'Basic Info' },
        { num: 2, label: 'Vehicle & Routes' },
        { num: 3, label: 'Documents' },
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: step >= s.num ? '#e63946' : 'rgba(255,255,255,0.1)',
              color: step >= s.num ? 'white' : 'rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '0.9rem',
              border: step === s.num ? '3px solid rgba(230,57,70,0.5)' : 'none',
              transition: 'all 0.3s',
            }}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span style={{ fontSize: '0.65rem', color: step >= s.num ? '#e63946' : 'rgba(255,255,255,0.3)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div style={{ height: '2px', width: '50px', marginBottom: '18px', background: step > s.num ? '#e63946' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // SUCCESS SCREEN
  if (step === 4) {
    return (
      <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '3rem 2rem', maxWidth: '480px', width: '100%' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.75rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>Registration Successful!</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Thank you <strong style={{ color: 'white' }}>{form.name}</strong>!</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Our team will contact you at <strong style={{ color: '#e63946' }}>{form.phone}</strong> within 24 hours.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', textAlign: 'left', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>Registration Summary</p>
              {[['Name', form.name],['Phone', form.phone],['City', form.city],['Vehicle', form.vehicle],['Experience', form.experience],['RC Number', form.rcNumber],['License', form.licenseNumber],...(form.fitnessCertNumber ? [['Fitness Cert', form.fitnessCertNumber]] : [])].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                  <span style={{ fontWeight: 700, color: 'white' }}>{val}</span>
                </div>
              ))}
              {form.routes.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>Routes: </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{form.routes.join(', ')}</span>
                </div>
              )}
            </div>
            <div style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ fontWeight: 700, color: '#e63946', fontSize: '0.85rem', marginBottom: '0.5rem' }}>What happens next?</p>
              {['Documents will be verified within 24 hours','SWIFTO team will call you','Training will be provided','You will start receiving loads on your routes'].map((item, i) => (
                <p key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>✓ {item}</p>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => { setStep(1); setForm({ name: '', phone: '', city: '', vehicle: '', source: '', rcNumber: '', licenseNumber: '', experience: '', fleetSize: '1', routes: [], fitnessCertNumber: '' }); }}
                style={{ background: '#e63946', color: 'white', border: 'none', borderRadius: '10px', padding: '0.85rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                Register Another Vehicle
              </button>
              <Link to="/"><button style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.85rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Go to Home</button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 5% 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

        {/* Left Side */}
        <div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-1px' }}>
            Attach Your Vehicle<br/><span style={{ color: '#e63946' }}>Start Earning Today</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '480px', marginBottom: '2rem' }}>
            Full-time or part-time — become a SWIFTO Partner and get guaranteed loads. Earn on return trips too!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: '440px', marginBottom: '2rem' }}>
            {[['Guaranteed Loads','Never run empty'],['24hr Payment','Direct bank transfer'],['Return Load Match','Auto suggestions'],['AI Support','24/7 available'],['Driver App','Coming soon'],['Insurance Cover','Per trip']].map(([title, sub]) => (
              <div key={title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem', fontWeight: 800, color: 'white' }}>{title}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[['500+','Active Drivers'],['10K+','Trips Done'],['Rs.2L+','Avg Monthly Earning']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#e63946' }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side — Form */}
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 48px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <StepIndicator />
          {apiError && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
              {apiError}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Basic Information</h3>
              {[['name','Full Name *','Enter your full name','text'],['phone','Mobile Number *','10-digit mobile number','tel']].map(([name, label, ph, type]) => (
                <div key={name} style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>{label}</label>
                  <input name={name} value={form[name]} onChange={handleChange} placeholder={ph} type={type} maxLength={name==='phone'?10:undefined} style={inputStyle(errors[name])}
                    onFocus={e => e.target.style.borderColor='#e63946'} onBlur={e => e.target.style.borderColor=errors[name]?'#ef4444':'rgba(255,255,255,0.15)'} />
                  {errors[name] && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors[name]}</p>}
                </div>
              ))}
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>City *</label>
                <select name="city" value={form.city} onChange={handleChange} style={{ ...inputStyle(errors.city), cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select your city</option>
                  {cities.map(c => <option key={c} value={c} style={{ background: '#1a1a2e' }}>{c}</option>)}
                </select>
                {errors.city && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.city}</p>}
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>How did you hear about us?</label>
                <select name="source" value={form.source} onChange={handleChange} style={{ ...inputStyle(false), cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select source</option>
                  {sources.map(s => <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Vehicle & Routes</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Vehicle Type *</label>
                <select name="vehicle" value={form.vehicle} onChange={handleChange} style={{ ...inputStyle(errors.vehicle), cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select your vehicle</option>
                  {vehicles.map(v => <option key={v} value={v} style={{ background: '#1a1a2e' }}>{v}</option>)}
                </select>
                {errors.vehicle && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.vehicle}</p>}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Driving Experience *</label>
                <select name="experience" value={form.experience} onChange={handleChange} style={{ ...inputStyle(errors.experience), cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select experience</option>
                  {experiences.map(e => <option key={e} value={e} style={{ background: '#1a1a2e' }}>{e}</option>)}
                </select>
                {errors.experience && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.experience}</p>}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Fleet Size</label>
                <select name="fleetSize" value={form.fleetSize} onChange={handleChange} style={{ ...inputStyle(false), cursor: 'pointer' }}>
                  {['1','2','3','4','5','6-10','11-20','21-50','51-100','100-500','500+'].map(n => (
                    <option key={n} value={n} style={{ background: '#1a1a2e' }}>{n} Truck{n === '1' ? '' : 's'}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Routes Aap Cover Karte Ho * (Multiple select kar sakte ho)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {routeOptions.map(route => {
                    const selected = form.routes.includes(route);
                    return (
                      <button key={route} type="button" onClick={() => toggleRoute(route)}
                        style={{ padding: '0.45rem 0.9rem', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: `1.5px solid ${selected ? '#e63946' : 'rgba(255,255,255,0.15)'}`, background: selected ? 'rgba(230,57,70,0.25)' : 'rgba(255,255,255,0.05)', color: selected ? 'white' : 'rgba(255,255,255,0.6)', transition: 'all 0.15s' }}>
                        {selected ? '✓ ' : ''}{route}
                      </button>
                    );
                  })}
                </div>
                {errors.routes && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '6px' }}>{errors.routes}</p>}
                {form.routes.length > 0 && <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '6px', fontWeight: 600 }}>{form.routes.length} route{form.routes.length > 1 ? 's' : ''} selected</p>}
              </div>
              <div style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', borderRadius: '12px', padding: '1rem' }}>
                <p style={{ fontWeight: 700, color: '#e63946', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Estimated Monthly Earnings</p>
                {[['Per trip average','Rs.8,000 - Rs.15,000'],['Trips per month','10 - 20 trips']].map(([l,v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</span>
                    <span style={{ fontWeight: 700, color: 'white' }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(230,57,70,0.2)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#e63946' }}>Total Earning</span>
                  <span style={{ fontWeight: 900, color: '#e63946', fontSize: '1rem' }}>Rs.80K - Rs.2L/month</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Document Details</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>These details are required for verification — safe and secure</p>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>RC Number (Registration Certificate) *</label>
                <input name="rcNumber" value={form.rcNumber} onChange={handleUpperCase('rcNumber')} placeholder="e.g. MP09AB1234" style={inputStyle(errors.rcNumber)}
                  onFocus={e => e.target.style.borderColor='#e63946'} onBlur={e => e.target.style.borderColor=errors.rcNumber?'#ef4444':'rgba(255,255,255,0.15)'} />
                {errors.rcNumber && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.rcNumber}</p>}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Driving License Number *</label>
                <input name="licenseNumber" value={form.licenseNumber} onChange={handleUpperCase('licenseNumber')} placeholder="e.g. MP0920110012345" style={inputStyle(errors.licenseNumber)}
                  onFocus={e => e.target.style.borderColor='#e63946'} onBlur={e => e.target.style.borderColor=errors.licenseNumber?'#ef4444':'rgba(255,255,255,0.15)'} />
                {errors.licenseNumber && <p style={{ color: '#fca5a5', fontSize: '0.72rem', marginTop: '4px' }}>{errors.licenseNumber}</p>}
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Fitness Certificate Number <span style={{ marginLeft: '6px', background: 'rgba(230,57,70,0.2)', color: '#e63946', fontSize: '0.65rem', padding: '2px 7px', borderRadius: '100px', fontWeight: 700 }}>Optional</span></label>
                <input name="fitnessCertNumber" value={form.fitnessCertNumber} onChange={handleUpperCase('fitnessCertNumber')} placeholder="e.g. FC/MP/2024/12345" style={inputStyle(false)}
                  onFocus={e => e.target.style.borderColor='#e63946'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.15)'} />
              </div>
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.5rem' }}>
                <p style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 600 }}>Your information is 100% safe</p>
                <p style={{ color: 'rgba(74,222,128,0.7)', fontSize: '0.75rem', marginTop: '4px' }}>Documents will only be used for verification. They will not be shared with anyone.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>Registration Summary</p>
                {[['Name',form.name],['Phone',form.phone],['City',form.city],['Vehicle',form.vehicle],['Experience',form.experience]].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: 'white' }}>{val}</span>
                  </div>
                ))}
                {form.routes.length > 0 && (
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>Selected Routes:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {form.routes.map(r => (
                        <span key={r} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                Back
              </button>
            )}
            <button onClick={nextStep} disabled={loading}
              style={{ flex: 2, padding: '0.85rem', borderRadius: '10px', border: 'none', background: loading ? 'rgba(230,57,70,0.5)' : '#e63946', color: 'white', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(230,57,70,0.3)' }}>
              {loading ? 'Submitting...' : step === 3 ? '✅ Submit Registration' : `Next - Step ${step + 1}`}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}

export default DriverPartner;