import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRUCKS = [
  { name:'7 ft Truck',         cat:'Small',     use:'Local delivery, courier',        popular:false },
  { name:'8 ft Truck',         cat:'Small',     use:'Kirana supply, courier',          popular:false },
  { name:'10 ft Truck',        cat:'Small',     use:'Local delivery, retail',          popular:false },
  { name:'12 ft Truck',        cat:'Small',     use:'Courier, local supply',           popular:false },
  { name:'14 ft Truck',        cat:'Small',     use:'City and short highway',          popular:false },
  { name:'19 ft Truck',        cat:'Medium',    use:'1-2 BHK shifting, FMCG',         popular:true  },
  { name:'20 ft Truck',        cat:'Medium',    use:'Retail goods, shifting',          popular:false },
  { name:'22 ft Truck',        cat:'Medium',    use:'2-3 BHK shifting, FMCG',         popular:true  },
  { name:'24 ft Truck',        cat:'Medium',    use:'Bulk retail, shifting',           popular:true  },
  { name:'28 ft Truck',        cat:'Heavy',     use:'Large commercial transport',      popular:false },
  { name:'30 ft Truck',        cat:'Heavy',     use:'Bulk material transport',         popular:false },
  { name:'32 ft Truck',        cat:'Heavy',     use:'Highway bulk transport',          popular:true  },
  { name:'20 ft Container',    cat:'Container', use:'Export-import, factory',          popular:false },
  { name:'32 ft Single Axle',  cat:'Container', use:'Factory goods, export',           popular:false },
  { name:'32 ft Multi Axle',   cat:'Container', use:'Heavy factory goods',             popular:true  },
  { name:'40 ft Container',    cat:'Container', use:'Bulk export-import',              popular:false },
  { name:'Dumper',             cat:'Special',   use:'Sand, gravel, debris',            popular:false },
  { name:'Trailer (40-50 ft)', cat:'Special',   use:'ODC cargo transport',             popular:false },
  { name:'Flatbed',            cat:'Special',   use:'Heavy machine transport',         popular:false },
  { name:'Tanker',             cat:'Special',   use:'Oil, water, chemicals',           popular:false },
];

const CAT_STYLE = {
  'Small':     { accent:'#22c55e', bg:'#f0fdf4', border:'#bbf7d0' },
  'Medium':    { accent:'#0ea5e9', bg:'#eff6ff', border:'#bfdbfe' },
  'Heavy':     { accent:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
  'Container': { accent:'#f43f5e', bg:'#fff1f2', border:'#fecdd3' },
  'Special':   { accent:'#a855f7', bg:'#fdf4ff', border:'#e9d5ff' },
};

const ALL_CATS = ['All', 'Small', 'Medium', 'Heavy', 'Container', 'Special'];

export default function Vehicles() {
  const [search, setSearch]   = useState('');
  const [catFilter, setCat]   = useState('All');
  const navigate              = useNavigate();

  const filtered = TRUCKS.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q) || t.use.toLowerCase().includes(q);
    const matchCat    = catFilter === 'All' || t.cat === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ background:'white', padding:'5rem 5%', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); input::placeholder { color: #94a3b8; }`}</style>

      <div style={{ maxWidth:'1240px', margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Our Fleet</p>
          <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'#0f172a', letterSpacing:'-0.5px', marginBottom:'0.5rem' }}>
            Every Size <span style={{ color:'#f59e0b' }}>Truck Available</span>
          </h2>
          <p style={{ color:'#64748b', fontSize:'0.95rem', marginBottom:'1.5rem' }}>From 7 ft to 40 ft Container — all available. Click to book.</p>

          {/* Search */}
          <input type="text" placeholder="Search truck size, category, use..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background:'#f8fafc', color:'#0f172a', padding:'10px 18px', borderRadius:'100px', width:'100%', maxWidth:'400px', outline:'none', border:'1.5px solid #e2e8f0', fontSize:'0.88rem', fontFamily:'inherit', display:'block', margin:'0 auto 1.25rem', transition:'border-color 0.18s' }}
            onFocus={e => e.target.style.borderColor='#f59e0b'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />

          {/* Category filter pills */}
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap' }}>
            {ALL_CATS.map(cat => {
              const style = CAT_STYLE[cat] || {};
              const active = catFilter === cat;
              return (
                <button key={cat} onClick={() => setCat(cat)} style={{ padding:'6px 16px', borderRadius:'100px', border:`1.5px solid ${active ? (style.accent || '#f59e0b') : '#e2e8f0'}`, background: active ? (style.bg || '#fffbeb') : 'white', color: active ? (style.accent || '#f59e0b') : '#64748b', fontSize:'0.78rem', fontWeight:700, cursor:'pointer', transition:'all 0.18s', fontFamily:'inherit' }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(155px, 1fr))', gap:'10px' }}>
          {filtered.map((v, i) => {
            const cs = CAT_STYLE[v.cat] || { accent:'#64748b', bg:'#f8fafc', border:'#e2e8f0' };
            return (
              <div key={i} onClick={() => navigate(`/booking?vehicle=${encodeURIComponent(v.name)}`)} style={{ background:'#f8fafc', border:`1.5px solid #e2e8f0`, borderRadius:'16px', padding:'1.1rem 1rem', textAlign:'center', cursor:'pointer', transition:'all 0.2s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.background=cs.bg; e.currentTarget.style.borderColor=cs.accent; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${cs.accent}22`; }}
                onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>

                {v.popular && (
                  <span style={{ position:'absolute', top:'7px', right:'7px', background:'#f59e0b', color:'#0f172a', fontSize:'0.55rem', fontWeight:800, padding:'2px 7px', borderRadius:'100px', letterSpacing:'0.3px' }}>Popular</span>
                )}

                {/* Vehicle icon box */}
                <div style={{ width:'56px', height:'56px', background:cs.bg, border:`1.5px solid ${cs.border}`, borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.75rem' }}>
                  <span style={{ fontSize:'0.62rem', fontWeight:800, color:cs.accent, textAlign:'center', lineHeight:1.2 }}>{v.name.split(' ').slice(0,2).join('\n')}</span>
                </div>

                <h3 style={{ fontSize:'0.82rem', fontWeight:800, color:'#0f172a', marginBottom:'3px' }}>{v.name}</h3>
                <p style={{ fontSize:'0.65rem', fontWeight:700, color:cs.accent, marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{v.cat}</p>
                <p style={{ fontSize:'0.68rem', color:'#94a3b8', lineHeight:1.4, margin:0 }}>{v.use}</p>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign:'center', color:'#94a3b8', marginTop:'2rem', fontSize:'0.9rem' }}>No vehicles found</p>
        )}
      </div>
    </div>
  );
}