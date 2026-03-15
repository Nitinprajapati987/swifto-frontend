import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    tag: 'B2B Logistics',
    title: 'Factory-to-factory delivery across India',
    desc: 'Pithampur se Pan India — daily scheduled runs for manufacturers & suppliers.',
    color: 'from-violet-700 to-purple-500',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
  {
    tag: 'Trucks',
    title: 'Hassle-free goods transport up to 25 ton',
    desc: '7ft se 40ft Container — har size available. Same-day booking confirmation.',
    color: 'from-teal-700 to-emerald-500',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
  {
    tag: 'Two-Wheelers',
    title: 'Reliable small parcel delivery up to 20 kg',
    desc: 'Local courier, kirana supply aur urgent deliveries ke liye fastest option.',
    color: 'from-blue-700 to-blue-500',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
  {
    tag: 'Return Load',
    title: 'Never run empty — earn on return trips',
    desc: 'AI-powered return load matching — drivers ko return trip mein bhi load milta hai.',
    color: 'from-amber-700 to-yellow-500',
    tagBg: 'bg-white/20 text-white',
    path: '/driver-partner',
  },
  {
    tag: 'Packers & Movers',
    title: 'House & office shifting made easy',
    desc: 'Complete packing, loading aur unloading service — safe aur affordable.',
    color: 'from-pink-700 to-rose-500',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
  {
    tag: 'Enterprise Plans',
    title: 'Streamlining operations for large businesses',
    desc: 'Monthly contracts, dedicated fleet aur priority support for factories.',
    color: 'from-green-800 to-emerald-600',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
  {
    tag: 'API Integration',
    title: 'Automate your logistics with our API',
    desc: 'Apne ERP ya app se directly SWIFTO connect karo — fully automated booking.',
    color: 'from-slate-700 to-blue-700',
    tagBg: 'bg-white/20 text-white',
    path: '/booking',
  },
];

function OurServices() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / 240);
    setActiveIdx(idx);
  };

  return (
    <div style={{ background: 'white', padding: '5rem 0', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 5%' }}>
        <div style={{
          display: 'inline-block', background: '#eef0ff', color: '#4361ee',
          fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem',
          borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          Our Services
        </div>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 900, color: '#1a1a2e',
          letterSpacing: '-0.5px', marginBottom: '0.5rem',
        }}>
          Everything You Need, <span style={{ color: '#4361ee' }}>One Platform</span>
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          Two-wheelers se lekar 40ft containers tak — sab kuch ek jagah milega.
        </p>
      </div>

      {/* Scroll Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 5%', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={scrollLeft}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            border: '1.5px solid #e8eaff', background: 'white',
            cursor: 'pointer', fontSize: '1rem', color: '#4361ee',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4361ee'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4361ee'; }}
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            border: '1.5px solid #e8eaff', background: 'white',
            cursor: 'pointer', fontSize: '1rem', color: '#4361ee',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4361ee'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4361ee'; }}
        >
          →
        </button>
      </div>

      {/* Cards Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          padding: '0.5rem 5% 1.5rem',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#e8eaff transparent',
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => navigate(s.path)}
            style={{
              flexShrink: 0,
              width: '220px',
              minHeight: '260px',
              borderRadius: '20px',
              padding: '1.5rem',
              scrollSnapAlign: 'start',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.25s, box-shadow 0.25s',
              background: getGradient(i),
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Decorative circle */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', pointerEvents: 'none',
            }} />

            <div>
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.22)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '100px',
                marginBottom: '1rem',
                letterSpacing: '0.5px',
              }}>
                {s.tag}
              </span>
              <h3 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.05rem',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.3,
                marginBottom: '0.6rem',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.6,
              }}>
                {s.desc}
              </p>
            </div>

            {/* Arrow button */}
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1rem', marginTop: '1.25rem',
              fontWeight: 700,
            }}>
              →
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1rem' }}>
        {services.map((_, i) => (
          <div
            key={i}
            style={{
              width: activeIdx === i ? '20px' : '6px',
              height: '6px',
              borderRadius: '100px',
              background: activeIdx === i ? '#4361ee' : '#e8eaff',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');
        div::-webkit-scrollbar { height: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #e8eaff; border-radius: 4px; }
      `}</style>
    </div>
  );
}

function getGradient(i) {
  const gradients = [
    'linear-gradient(135deg, #5b21b6, #8b5cf6)',
    'linear-gradient(135deg, #0f766e, #14b8a6)',
    'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    'linear-gradient(135deg, #b45309, #f59e0b)',
    'linear-gradient(135deg, #be185d, #ec4899)',
    'linear-gradient(135deg, #065f46, #10b981)',
    'linear-gradient(135deg, #1e3a5f, #2563eb)',
  ];
  return gradients[i % gradients.length];
}

export default OurServices;