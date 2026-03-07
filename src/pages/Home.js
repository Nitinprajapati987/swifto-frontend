import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OurClients from '../components/OurClients';
import WhySWIFTO from '../components/WhySWIFTO';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Arun Pandey',
    company: 'Bajaj Auto Supplier, Pithampur',
    text: 'SWIFTO ne hamari logistics problem solve kar di! Pehle 3 ghante lagta tha truck dhundne mein — ab 10 minute mein confirm ho jaata hai.',
    rating: 5,
  },
  {
    name: 'Sunita Patel',
    company: 'Cipla Vendor, Indore',
    text: 'Real-time tracking bahut helpful hai. Ab hume call karke driver se poochna nahi padta — sab kuch app mein dikh jaata hai.',
    rating: 5,
  },
  {
    name: 'Rahul Rajput',
    company: 'Truck Owner, 32ft Fleet',
    text: 'SWIFTO se pehle return trip mein truck khali jaata tha. Ab return load bhi milta hai — double income ho gayi!',
    rating: 5,
  },
];

function Home() {
  return (
    <div style={{ background: '#f5f7ff' }}>
      <Navbar />
      <Hero />
      <OurClients />

      {/* Testimonials */}
      <div style={{ background: 'white', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', background: '#eef0ff', color: '#4361ee', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reviews</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
              Customer <span style={{ color: '#4361ee' }}>Reviews</span>
            </h2>
            <p style={{ color: '#2e5bb6', fontSize: '1rem' }}>Log kya kehte hain SWIFTO ke baare mein!</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <div key={i}
                style={{ background: '#f5f7ff', border: '1.5px solid #e8eaff', borderRadius: '20px', padding: '1.75rem', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(67,97,238,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', marginBottom: '0.75rem' }}>
                  {[...Array(t.rating)].map((_, j) => <span key={j}>⭐</span>)}
                </div>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid #e8eaff', paddingTop: '1rem' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#1a1a2e' }}>{t.name}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '2px' }}>{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhySWIFTO />
      <Footer />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}

export default Home;