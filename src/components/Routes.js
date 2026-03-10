import React, { useState } from 'react';

const allRoutes = [
  { from: 'Indore', to: 'Mumbai',    km: 580,  price: 'Rs.45-65k',  time: '10-12 hrs' },
  { from: 'Indore', to: 'Delhi',     km: 780,  price: 'Rs.55-80k',  time: '14-16 hrs' },
  { from: 'Indore', to: 'Pune',      km: 590,  price: 'Rs.45-65k',  time: '11-13 hrs' },
  { from: 'Indore', to: 'Ahmedabad', km: 400,  price: 'Rs.30-45k',  time: '7-8 hrs' },
  { from: 'Indore', to: 'Nagpur',    km: 480,  price: 'Rs.35-50k',  time: '9-10 hrs' },
  { from: 'Indore', to: 'Jaipur',    km: 490,  price: 'Rs.35-50k',  time: '9-10 hrs' },
  { from: 'Indore', to: 'Hyderabad', km: 780,  price: 'Rs.60-85k',  time: '14-16 hrs' },
  { from: 'Indore', to: 'Chennai',   km: 1200, price: 'Rs.90-120k', time: '22-24 hrs' },
  { from: 'Indore', to: 'Kolkata',   km: 1400, price: 'Rs.100-130k',time: '26-28 hrs' },
  { from: 'Indore', to: 'Surat',     km: 490,  price: 'Rs.35-50k',  time: '9-10 hrs' },
  { from: 'Indore', to: 'Bangalore', km: 1100, price: 'Rs.80-110k', time: '20-22 hrs' },
  { from: 'Indore', to: 'Bhopal',    km: 190,  price: 'Rs.15-25k',  time: '3-4 hrs' },
];

const cities = [
  'Indore', 'Pithampur', 'Dewas', 'Ujjain', 'Bhopal',
  'Mumbai', 'Delhi', 'Pune', 'Ahmedabad', 'Nagpur',
  'Jaipur', 'Hyderabad', 'Chennai', 'Kolkata', 'Surat',
  'Bangalore', 'Lucknow', 'Chandigarh', 'Raipur', 'Nashik',
];

function Routes() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('popular');

  const filteredCities = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  const filteredRoutes = allRoutes.filter(r =>
    r.from.toLowerCase().includes(search.toLowerCase()) ||
    r.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="routes" style={{ background: 'white', padding: '5rem 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-block', background: '#eef0ff', color: '#4361ee', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Coverage</div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
            Our <span style={{ color: '#4361ee' }}>Routes</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' }}>Pan India Coverage — Pithampur to all of India</p>

          {/* Tabs */}
          <div style={{ display: 'inline-flex', background: '#f5f7ff', borderRadius: '100px', padding: '4px', marginBottom: '1.25rem', border: '1px solid #e8eaff' }}>
            {['popular', 'cities'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: '0.5rem 1.5rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: activeTab === tab ? '#4361ee' : 'transparent', color: activeTab === tab ? 'white' : '#6b7280' }}>
                {tab === 'popular' ? 'Popular Routes' : 'All Cities'}
              </button>
            ))}
          </div>

          <br />
          <input
            type="text"
            placeholder="Search city or route..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#f5f7ff', color: '#1a1a2e', padding: '0.85rem 1.5rem', borderRadius: '100px', width: '100%', maxWidth: '400px', outline: 'none', border: '1.5px solid #e8eaff', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={e => e.target.style.borderColor = '#4361ee'}
            onBlur={e => e.target.style.borderColor = '#e8eaff'}
          />
        </div>

        {activeTab === 'popular' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {filteredRoutes.map((r, i) => (
              <div key={i}
                style={{ background: '#f5f7ff', border: '1.5px solid #e8eaff', borderRadius: '14px', padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#eef0ff'; e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(67,97,238,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f5f7ff'; e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#1a1a2e' }}>{r.from}</span>
                  <span style={{ color: '#4361ee', fontSize: '1.1rem' }}>-&gt;</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#1a1a2e' }}>{r.to}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.72rem', color: '#6b7280' }}>{r.km} km - {r.time}</p>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#4361ee' }}>{r.price}</p>
                </div>
              </div>
            ))}
            {filteredRoutes.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280', padding: '2rem' }}>No routes found</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {filteredCities.map((city, i) => (
              <span key={i}
                style={{ background: '#f5f7ff', color: '#374151', padding: '0.6rem 1.25rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', border: '1.5px solid #e8eaff' }}
                onMouseEnter={e => { e.target.style.background = '#4361ee'; e.target.style.color = 'white'; e.target.style.borderColor = '#4361ee'; }}
                onMouseLeave={e => { e.target.style.background = '#f5f7ff'; e.target.style.color = '#374151'; e.target.style.borderColor = '#e8eaff'; }}
              >
                {city}
              </span>
            ))}
            {filteredCities.length === 0 && (
              <p style={{ color: '#6b7280', marginTop: '1.5rem' }}>No city found</p>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            Your city not listed? <span style={{ color: '#4361ee', cursor: 'pointer', fontWeight: 700 }}>Contact us</span> — we deliver everywhere!
          </p>
        </div>

      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder { color: #9ca3af; }
      `}</style>
    </div>
  );
}

export default Routes;