import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OurClients from '../components/OurClients';
import OurServices from '../components/OurServices';
import WhySWIFTO from '../components/WhySWIFTO';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Arun Pandey',
    company: 'Bajaj Auto Supplier, Pithampur',
    text: 'SWIFTO ne hamari logistics problem solve kar di! Pehle 3 ghante lagta tha truck dhundne mein — ab 10 minute mein confirm ho jaata hai.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #5b21b6, #8b5cf6)',
  },
  {
    name: 'Sunita Patel',
    company: 'Cipla Vendor, Indore',
    text: 'Real-time tracking bahut helpful hai. Ab hume call karke driver se poochna nahi padta — sab kuch app mein dikh jaata hai.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
  },
  {
    name: 'Rahul Rajput',
    company: 'Truck Owner, 32ft Fleet',
    text: 'SWIFTO se pehle return trip mein truck khali jaata tha. Ab return load bhi milta hai — double income ho gayi!',
    rating: 5,
    gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
  },
];

const stats = [
  { value: '20+',    label: 'Factories Served', sub: 'Pithampur and Pan India', gradient: 'linear-gradient(135deg, #b45309, #f59e0b)' },
  { value: '2500+',  label: 'Trucks Network',   sub: 'MP, MH, RJ and more',    gradient: 'linear-gradient(135deg, #be185d, #ec4899)' },
  { value: '10 Min', label: 'Truck Confirm',    sub: 'Average time',            gradient: 'linear-gradient(135deg, #065f46, #10b981)' },
  { value: '24hr',   label: 'Payment',          sub: 'Guaranteed',              gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)' },
];

function Home() {
  return (
    <div style={{ background: '#fff5f5' }}>
      <Navbar />
      <Hero />
      <OurClients />
      <OurServices />

      {/* Testimonials */}
      <div style={{ background: '#f8f8ff', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', background: '#fff0f0', color: '#e63946', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reviews</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
              Customer <span style={{ color: '#e63946' }}>Reviews</span>
            </h2>
            <p style={{ color: '#b61c28', fontSize: '1rem' }}>Log kya kehte hain SWIFTO ke baare mein!</p>
          </div>

          {/* ── FIXED: equal height cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}>
            {testimonials.map((t, i) => (
              <div key={i}
                style={{
                  background: t.gradient,
                  borderRadius: '24px',
                  padding: '2rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

                {/* Stars */}
                <div style={{ display: 'flex', marginBottom: '1rem', fontSize: '1rem' }}>
                  {[...Array(t.rating)].map((_, j) => <span key={j}>⭐</span>)}
                </div>

                {/* Review text — flex-grow pushes footer down */}
                <p style={{ fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.93)', flexGrow: 1 }}>
                  "{t.text}"
                </p>

                {/* Author — always at bottom */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '1rem' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: 'white', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: '3px', marginBottom: 0 }}>{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ background: '#f0f0ff', padding: '4rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {stats.map((s, i) => (
            <div key={i}
              style={{
                background: s.gradient,
                borderRadius: '24px',
                padding: '2.75rem 2rem',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.16)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)', fontWeight: 900, color: 'white', marginBottom: '0.35rem' }}>{s.value}</p>
              <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'white', marginBottom: '0.25rem' }}>{s.label}</p>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <WhySWIFTO />
      <Footer />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}

export default Home;