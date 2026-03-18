import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { tag:'B2B Logistics',   title:'Factory-to-Factory Delivery',          desc:'Pithampur se Pan India — daily runs for manufacturers & suppliers.',    accent:'#f59e0b', dark:'#b45309', path:'/booking' },
  { tag:'Trucks',          title:'Hassle-free Transport up to 25 Ton',   desc:'7ft se 40ft Container — har size. Same-day booking confirmation.',        accent:'#0ea5e9', dark:'#0369a1', path:'/booking' },
  { tag:'Two-Wheelers',    title:'Small Parcel Delivery up to 20 kg',    desc:'Local courier, kirana supply aur urgent deliveries — fastest option.',    accent:'#22c55e', dark:'#15803d', path:'/booking' },
  { tag:'Return Load',     title:'Never Run Empty — Earn Both Ways',     desc:'AI-powered return load matching — return trip mein bhi load milta hai.',  accent:'#a855f7', dark:'#7e22ce', path:'/driver-partner' },
  { tag:'Packers & Movers',title:'House & Office Shifting Made Easy',    desc:'Complete packing, loading aur unloading — safe aur affordable.',          accent:'#f43f5e', dark:'#be123c', path:'/booking' },
  { tag:'Enterprise',      title:'Streamlining Ops for Large Business',  desc:'Monthly contracts, dedicated fleet aur priority support for factories.',  accent:'#10b981', dark:'#047857', path:'/booking' },
  { tag:'API Integration', title:'Automate Logistics with Our API',      desc:'Apne ERP ya app se directly SWIFTO connect karo — fully automated.',     accent:'#818cf8', dark:'#4338ca', path:'/booking' },
];

export default function OurServices() {
  const scrollRef = useRef(null);
  const navigate  = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 260, behavior:'smooth' });

  const handleScroll = () => {
    if (!scrollRef.current) return;
    setActiveIdx(Math.round(scrollRef.current.scrollLeft / 260));
  };

  return (
    <div style={{ background:'#f7f6f3', padding:'5rem 0', overflow:'hidden', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .svc-scroll::-webkit-scrollbar { height: 0; }
      `}</style>

      {/* Header */}
      <div style={{ padding:'0 5%', marginBottom:'2.5rem', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem' }}>
        <div>
          <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'0.75rem' }}>Our Services</p>
          <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.6rem)', fontWeight:800, color:'#0f172a', letterSpacing:'-0.5px', margin:0, lineHeight:1.1 }}>
            Everything You Need,<br /><span style={{ color:'#f59e0b' }}>One Platform</span>
          </h2>
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          {[-1, 1].map((dir, i) => (
            <button key={i} onClick={() => scroll(dir)} style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1.5px solid #e2e8f0', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', color:'#0f172a', transition:'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b'; e.currentTarget.style.color='#0f172a'; }}
              onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.color='#0f172a'; }}>
              {dir === -1 ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards scroll track */}
      <div ref={scrollRef} onScroll={handleScroll} className="svc-scroll" style={{ display:'flex', gap:'14px', overflowX:'auto', padding:'0.5rem 5% 1.5rem', scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch' }}>
        {SERVICES.map((s, i) => (
          <div key={i} onClick={() => navigate(s.path)} style={{ flexShrink:0, width:'240px', background:'white', border:`1.5px solid ${s.accent}25`, borderRadius:'20px', padding:'1.75rem', scrollSnapAlign:'start', cursor:'pointer', display:'flex', flexDirection:'column', gap:'0.75rem', transition:'all 0.22s', position:'relative', overflow:'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${s.accent}22`; e.currentTarget.style.borderColor=`${s.accent}60`; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor=`${s.accent}25`; }}>

            {/* Accent dot bg */}
            <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'90px', height:'90px', borderRadius:'50%', background:`${s.accent}10`, pointerEvents:'none' }} />

            {/* Icon badge */}
            <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:`${s.accent}12`, border:`1.5px solid ${s.accent}25`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:s.accent }} />
            </div>

            {/* Tag */}
            <span style={{ fontSize:'0.6rem', fontWeight:700, color:s.accent, background:`${s.accent}10`, border:`1px solid ${s.accent}20`, padding:'3px 9px', borderRadius:'100px', width:'fit-content', textTransform:'uppercase', letterSpacing:'0.8px' }}>{s.tag}</span>

            {/* Text */}
            <h3 style={{ fontSize:'0.95rem', fontWeight:800, color:'#0f172a', lineHeight:1.3, margin:0, letterSpacing:'-0.2px' }}>{s.title}</h3>
            <p style={{ fontSize:'0.78rem', color:'#64748b', lineHeight:1.65, margin:0 }}>{s.desc}</p>

            {/* Arrow */}
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:`${s.accent}12`, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'auto', color:s.accent, fontSize:'0.9rem', fontWeight:700 }}>→</div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display:'flex', justifyContent:'center', gap:'6px', marginTop:'0.5rem' }}>
        {SERVICES.map((_, i) => (
          <div key={i} style={{ width: activeIdx === i ? '20px' : '6px', height:'6px', borderRadius:'100px', background: activeIdx === i ? '#f59e0b' : '#e2e8f0', transition:'all 0.3s' }} />
        ))}
      </div>
    </div>
  );
}