import React from 'react';

import bajaj from '../assets/logos/bajaj_auto_private_limited.png';
import cipla from '../assets/logos/capla_limited.png';
import dhoot from '../assets/logos/dhoot_automotive_limited.png';
import eicher from '../assets/logos/eicher_limited.png';
import force from '../assets/logos/force_motors.png';
import hindustan from '../assets/logos/Hindustan_Motors-.png';
import lupin from '../assets/logos/lupin_limited.png';
import mahindra from '../assets/logos/mahindra_privated_limited.png';
import mahle from '../assets/logos/mahle_engine_components.png';
import mylan from '../assets/logos/Mylan_limited.png';
import pratibha from '../assets/logos/pratibha.png';
import shree from '../assets/logos/shree_tirupati_balaji_fibc_ltd.png';
import srf from '../assets/logos/SRF.png';
import tata from '../assets/logos/tata_motors.png';

const companies = [
  { name: 'Bajaj Auto', img: bajaj },
  { name: 'Cipla', img: cipla },
  { name: 'Dhoot Automotive', img: dhoot },
  { name: 'Eicher', img: eicher },
  { name: 'Force Motors', img: force },
  { name: 'Hindustan Motors', img: hindustan },
  { name: 'Lupin', img: lupin },
  { name: 'Mahindra', img: mahindra },
  { name: 'MAHLE', img: mahle },
  { name: 'Mylan', img: mylan },
  { name: 'Pratibha', img: pratibha },
  { name: 'Shree Tirupati Balajee', img: shree },
  { name: 'SRF', img: srf },
  { name: 'TATA Motors', img: tata },
];

const row1 = [...companies, ...companies, ...companies];
const row2 = [...companies, ...companies, ...companies].reverse();

const statsData = [
  { val: '20+',     label: 'Pithampur Companies', gradient: 'linear-gradient(135deg, #5b21b6, #8b5cf6)' },
  { val: '20+',     label: 'Factories Served',    gradient: 'linear-gradient(135deg, #b45309, #f59e0b)' },
  { val: 'Rs.50L+', label: 'Goods Delivered',     gradient: 'linear-gradient(135deg, #be185d, #ec4899)' },
  { val: '99.2%',   label: 'On-Time Delivery',    gradient: 'linear-gradient(135deg, #065f46, #10b981)' },
];

const Card = ({ c }) => (
  <div style={{
    flexShrink: 0,
    width: '160px',
    background: 'white',
    border: '1.5px solid #ffe8e8',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 10px 10px',
    boxShadow: '0 2px 8px rgba(230,57,70,0.06)',
    transition: 'all 0.25s',
    cursor: 'default',
    gap: '8px',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#e63946';
      e.currentTarget.style.transform = 'scale(1.06)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(230,57,70,0.18)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#ffe8e8';
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(230,57,70,0.06)';
    }}
  >
    <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <img src={c.img} alt={c.name} style={{ maxWidth: '130px', maxHeight: '50px', objectFit: 'contain' }} />
    </div>
    <div style={{ width: '100%', height: '1px', background: '#fff0f0' }} />
    <p style={{
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 700,
      fontSize: '0.72rem',
      color: '#374151',
      textAlign: 'center',
      margin: 0,
      lineHeight: 1.3,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      padding: '0 4px',
    }}>
      {c.name}
    </p>
  </div>
);

function OurClients() {
  return (
    <div style={{ background: 'white', padding: '4.5rem 0', overflow: 'hidden', borderTop: '1px solid #fff0f0', borderBottom: '1px solid #fff0f0' }}>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 5%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff0f0', border: '1.5px solid #ffcccc', borderRadius: '100px', padding: '0.45rem 1.25rem', marginBottom: '1.25rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e63946', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', fontWeight: 800, color: '#e63946', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Our Clients</span>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e63946', display: 'inline-block' }} />
        </div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          Powering Logistics for <span style={{ color: '#e63946' }}>India's Finest</span> Industries
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          Trusted by leading manufacturers, pharma giants and industrial brands across India.
        </p>
      </div>

      {/* Row 1 — Left to Right */}
      <div style={{ overflow: 'hidden', marginBottom: '1.25rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '1.25rem', animation: 'scrollLeft 40s linear infinite', width: 'max-content', padding: '0.5rem 0' }}>
          {row1.map((c, i) => <Card key={i} c={c} />)}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '1.25rem', animation: 'scrollRight 50s linear infinite', width: 'max-content', padding: '0.5rem 0' }}>
          {row2.map((c, i) => <Card key={i} c={c} />)}
        </div>
      </div>

      {/* Stats — gradient cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '3rem', padding: '0 5%' }}>
        {statsData.map((s, i) => (
          <div key={i}
            style={{
              textAlign: 'center',
              padding: '1.25rem 1.75rem',
              background: s.gradient,
              borderRadius: '20px',
              minWidth: '150px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.6rem', fontWeight: 900, color: 'white', lineHeight: 1, margin: 0 }}>{s.val}</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', margin: '4px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default OurClients;