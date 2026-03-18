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

const COMPANIES = [
  { name:'Bajaj Auto',          img:bajaj },
  { name:'Cipla',               img:cipla },
  { name:'Dhoot Automotive',    img:dhoot },
  { name:'Eicher',              img:eicher },
  { name:'Force Motors',        img:force },
  { name:'Hindustan Motors',    img:hindustan },
  { name:'Lupin',               img:lupin },
  { name:'Mahindra',            img:mahindra },
  { name:'MAHLE',               img:mahle },
  { name:'Mylan',               img:mylan },
  { name:'Pratibha',            img:pratibha },
  { name:'Shree Tirupati',      img:shree },
  { name:'SRF',                 img:srf },
  { name:'TATA Motors',         img:tata },
];

const STATS = [
  { val:'20+',     label:'Pithampur Companies', accent:'#f59e0b' },
  { val:'20+',     label:'Factories Served',    accent:'#0ea5e9' },
  { val:'Rs.50L+', label:'Goods Delivered',     accent:'#22c55e' },
  { val:'99.2%',   label:'On-Time Delivery',    accent:'#a855f7' },
];

const row1 = [...COMPANIES, ...COMPANIES, ...COMPANIES];
const row2 = [...COMPANIES, ...COMPANIES, ...COMPANIES].reverse();

function LogoCard({ c }) {
  return (
    <div className="client-card" style={{ flexShrink:0, width:'150px', background:'white', border:'1px solid #e2e8f0', borderRadius:'14px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'14px 10px', gap:'8px', transition:'all 0.22s', cursor:'default' }}>
      <div style={{ height:'44px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%' }}>
        <img src={c.img} alt={c.name} style={{ maxWidth:'120px', maxHeight:'42px', objectFit:'contain', filter:'grayscale(0.2)', transition:'filter 0.2s' }} />
      </div>
      <div style={{ width:'100%', height:'1px', background:'#f1f5f9' }} />
      <p style={{ fontSize:'0.68rem', fontWeight:700, color:'#64748b', textAlign:'center', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width:'100%', padding:'0 4px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
        {c.name}
      </p>
    </div>
  );
}

export default function OurClients() {
  return (
    <div style={{ background:'white', padding:'5rem 0', overflow:'hidden', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .client-card:hover { border-color: #f59e0b !important; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(245,158,11,0.12); }
        .client-card:hover img { filter: grayscale(0) !important; }
        @keyframes scrollLeft  { from { transform: translateX(0); }       to { transform: translateX(-33.333%); } }
        @keyframes scrollRight { from { transform: translateX(-33.333%);} to { transform: translateX(0); } }
      `}</style>

      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:'3rem', padding:'0 5%' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'100px', padding:'5px 16px', marginBottom:'1rem' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#f59e0b' }} />
          <span style={{ fontSize:'0.62rem', fontWeight:700, color:'#b45309', letterSpacing:'2px', textTransform:'uppercase' }}>Our Clients</span>
        </div>
        <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'#0f172a', letterSpacing:'-0.5px', marginBottom:'0.5rem', lineHeight:1.2 }}>
          Powering Logistics for <span style={{ color:'#f59e0b' }}>India's Finest</span>
        </h2>
        <p style={{ color:'#64748b', fontSize:'0.95rem', maxWidth:'440px', margin:'0 auto' }}>
          Trusted by leading manufacturers, pharma giants and industrial brands.
        </p>
      </div>

      {/* Row 1 — left scroll */}
      <div style={{ overflow:'hidden', marginBottom:'1rem', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right, white, transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left, white, transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ display:'flex', gap:'12px', animation:'scrollLeft 35s linear infinite', width:'max-content', padding:'0.5rem 0' }}>
          {row1.map((c, i) => <LogoCard key={i} c={c} />)}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div style={{ overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right, white, transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left, white, transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ display:'flex', gap:'12px', animation:'scrollRight 45s linear infinite', width:'max-content', padding:'0.5rem 0' }}>
          {row2.map((c, i) => <LogoCard key={i} c={c} />)}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap', marginTop:'3rem', padding:'0 5%' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background:'white', border:`1.5px solid ${s.accent}30`, borderRadius:'16px', padding:'1.25rem 2rem', textAlign:'center', minWidth:'140px', transition:'all 0.2s', cursor:'default' }}
            onMouseEnter={e => { e.currentTarget.style.background = `${s.accent}08`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${s.accent}18`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <p style={{ fontSize:'1.8rem', fontWeight:800, color:s.accent, lineHeight:1, marginBottom:'4px' }}>{s.val}</p>
            <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#64748b', margin:0, textTransform:'uppercase', letterSpacing:'0.8px' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}