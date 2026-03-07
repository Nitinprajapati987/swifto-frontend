import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Vehicles() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const trucks = [
    { name: '7 ft Truck', category: 'Small Truck', use: 'Local delivery, courier', popular: false },
    { name: '8 ft Truck', category: 'Small Truck', use: 'Kirana supply, courier', popular: false },
    { name: '10 ft Truck', category: 'Small Truck', use: 'Local delivery, retail', popular: false },
    { name: '12 ft Truck', category: 'Small Truck', use: 'Courier, local supply', popular: false },
    { name: '14 ft Truck', category: 'Small Truck', use: 'City + short highway', popular: false },
    { name: '19 ft Truck', category: 'Medium Truck', use: '1-2 BHK shifting, FMCG', popular: true },
    { name: '20 ft Truck', category: 'Medium Truck', use: 'Retail goods, shifting', popular: false },
    { name: '22 ft Truck', category: 'Medium Truck', use: '2-3 BHK shifting, FMCG', popular: true },
    { name: '24 ft Truck', category: 'Medium Truck', use: 'Bulk retail, shifting', popular: true },
    { name: '28 ft Truck', category: 'Heavy Truck', use: 'Large commercial transport', popular: false },
    { name: '30 ft Truck', category: 'Heavy Truck', use: 'Bulk material transport', popular: false },
    { name: '32 ft Truck', category: 'Heavy Truck', use: 'Highway bulk transport', popular: true },
    { name: '20 ft Container', category: 'Container', use: 'Export-import, factory', popular: false },
    { name: '32 ft Single Axle', category: 'Container', use: 'Factory goods, export', popular: false },
    { name: '32 ft Multi Axle', category: 'Container', use: 'Heavy factory goods', popular: true },
    { name: '40 ft Container', category: 'Container', use: 'Bulk export-import', popular: false },
    { name: 'Dumper', category: 'Special', use: 'Sand, gravel, debris', popular: false },
    { name: 'Trailer (40-50 ft)', category: 'Special', use: 'ODC cargo transport', popular: false },
    { name: 'Flatbed', category: 'Special', use: 'Heavy machine transport', popular: false },
    { name: 'Tanker', category: 'Special', use: 'Oil, water, chemicals', popular: false },
  ];

  const filteredTrucks = trucks.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.use.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryColors = {
    'Small Truck': { bg: '#e8f5e9', accent: '#22c55e' },
    'Medium Truck': { bg: '#eef0ff', accent: '#4361ee' },
    'Heavy Truck': { bg: '#fff3e0', accent: '#f59e0b' },
    'Container': { bg: '#fce4ec', accent: '#f5576c' },
    'Special': { bg: '#f3e5f5', accent: '#764ba2' },
  };

  return (
    <div style={{ background: 'white', padding: '5rem 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-block', background: '#eef0ff', color: '#4361ee', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Our Fleet</div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
            Har Size Ka <span style={{ color: '#4361ee' }}>Truck Available</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' }}>7 ft se 40 ft Container tak — sab available!</p>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search truck size, category, use..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: '#f5f7ff', color: '#1a1a2e', padding: '0.85rem 1.5rem', borderRadius: '100px', width: '100%', maxWidth: '420px', outline: 'none', border: '1.5px solid #e8eaff', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Truck Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
          {filteredTrucks.map((v, i) => {
            const colors = categoryColors[v.category] || { bg: '#f5f7ff', accent: '#4361ee' };
            return (
              <div key={i} onClick={() => navigate(`/booking?vehicle=${encodeURIComponent(v.name)}`)}
                style={{ background: '#f5f7ff', border: '1.5px solid #e8eaff', borderRadius: '16px', padding: '1.25rem 1rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4361ee'; e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(67,97,238,0.22)'; e.currentTarget.querySelectorAll('.tv-name').forEach(el => el.style.color = 'white'); e.currentTarget.querySelectorAll('.tv-cat').forEach(el => el.style.color = 'rgba(255,255,255,0.75)'); e.currentTarget.querySelectorAll('.tv-use').forEach(el => el.style.color = 'rgba(255,255,255,0.65)'); }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f5f7ff'; e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.querySelectorAll('.tv-name').forEach(el => el.style.color = '#1a1a2e'); e.currentTarget.querySelectorAll('.tv-cat').forEach(el => el.style.color = colors.accent); e.currentTarget.querySelectorAll('.tv-use').forEach(el => el.style.color = '#6b7280'); }}
              >
                {v.popular && (
                  <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#4361ee', color: 'white', fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: '100px' }}>🔥 Popular</span>
                )}

                {/* Truck Icon Box — Porter style */}
                <div style={{ width: '64px', height: '64px', background: colors.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '2rem' }}>
                  🚛
                </div>

                <h3 className="tv-name" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.88rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.25rem', transition: 'color 0.2s' }}>{v.name}</h3>
                <p className="tv-cat" style={{ fontSize: '0.7rem', color: colors.accent, fontWeight: 700, marginBottom: '0.4rem', transition: 'color 0.2s' }}>{v.category}</p>
                <p className="tv-use" style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: 1.4, transition: 'color 0.2s' }}>📦 {v.use}</p>
              </div>
            );
          })}
        </div>

        {filteredTrucks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem', fontSize: '0.9rem' }}>Koi truck nahi mila 🔍</p>
        )}

      </div>
    </div>
  );
}

export default Vehicles;