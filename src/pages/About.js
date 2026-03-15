import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import nitinPhoto from '../assets/logos/nitinp.png';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

const team = [
  {
    name: 'Nitin Prajapati',
    role: 'Founder, CEO & Technology Head',
    initials: 'NP',
    photo: nitinPhoto,
    color: '#e63946',
    glow: 'rgba(230,57,70,0.3)',
    desc: 'Nitin Prajapati grew up in Pithampur, Madhya Pradesh — one of India\'s most active industrial zones. Every day, he witnessed factories struggling with the same problem: securing a reliable truck was harder than manufacturing the goods themselves. After completing his MCA from the National Institute of Technology, Trichy, he returned home with a clear mission — to fix the broken logistics system that was slowing down the very factories he grew up around. He built SWIFTO entirely on his own. His vision: an India where no factory ever waits for a truck — where every load moves on time, every driver earns fairly, and every business, big or small, has access to the same reliable freight service.',
    tags: ['NIT Trichy', 'Pithampur', 'Founder', 'CEO'],
  },
  {
    name: 'Shiv Prasad Prajapati',
    role: 'Chairman',
    initials: 'SP',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    desc: 'With over 50 years of hands-on industrial experience, Shiv Prasad Prajapati is the guiding force behind SWIFTO. His deep knowledge of Central India\'s manufacturing sector provides the company with unmatched strategic direction.',
    tags: ['50+ Years Experience', 'Industry Veteran', 'Chairman'],
  },
  {
    name: 'Shaiwal Singh',
    role: 'Tehsildar — Pithampur Industrial Area',
    initials: 'SS',
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.3)',
    desc: 'Shaiwal Singh serves as Tehsildar of the Pithampur Industrial Area. His administrative expertise and deep understanding of the region\'s industrial landscape play a key role in facilitating smooth logistics operations for SWIFTO.',
    tags: ['Pithampur', 'Industrial Area', 'Administration'],
  },
  {
    name: 'Ankit Kumar Prajapati',
    role: 'Head of Industrial Relations',
    initials: 'AK',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
    desc: 'Electrical Engineer with 12+ years of experience across leading textile and manufacturing companies in Gujarat and MP. Former Electrical Manager at Aghara Spintex, Rajsamadhiyala Spintex, and Bridgestone India.',
    tags: ['12+ Years', 'Electrical Engineer', 'Industrial Relations'],
  },
];

const why = [
  { num: '01', title: '10 Minute Confirmation',  desc: 'Fastest truck assignment in the industry. No waiting, no follow-ups.' },
  { num: '02', title: '2,500+ Verified Drivers',  desc: 'Every driver is background-checked, trained, and GPS-equipped.' },
  { num: '03', title: 'Real-Time GPS Tracking',   desc: 'Monitor your shipment live from pickup to final delivery.' },
  { num: '04', title: '24-Hour Payment',           desc: 'Direct bank transfer to drivers within 24 hours of delivery.' },
  { num: '05', title: 'Zero Hidden Charges',       desc: 'Transparent pricing agreed upfront. No surprise invoices.' },
  { num: '06', title: 'Return Load Matching',      desc: 'AI-powered system eliminates empty return trips, saving cost.' },
];

// eslint-disable-next-line no-unused-vars
const timeline = [
  { year: 'Jan 2025', title: 'SWIFTO Founded',          desc: 'Nitin Prajapati incorporates SWIFTO in Pithampur, Madhya Pradesh with a mission to transform B2B freight.' },
  { year: 'Mar 2025', title: 'Platform Launch',          desc: 'Full-stack logistics platform goes live — booking, tracking, driver app, and admin dashboard all built in-house.' },
  { year: 'May 2025', title: '500+ Drivers Onboarded',   desc: 'First 500 verified driver-partners join the SWIFTO network across Central India.' },
  { year: 'Aug 2025', title: 'Pan India Expansion',      desc: 'Operations expand to 28+ cities across 8 states including Maharashtra, Gujarat, Delhi NCR, and South India.' },
  { year: 'Oct 2025', title: '10,000 Trips Milestone',   desc: 'SWIFTO completes 10,000 successful deliveries with a 98% on-time rate.' },
  { year: '2026',     title: 'Next Chapter',             desc: 'Enterprise API integrations, driver mobile app launch, and expansion to 50+ cities planned.' },
];

const values = [
  { title: 'Speed',          desc: 'Every minute a truck waits is money lost. We are obsessed with eliminating delays at every step.',        icon: '⚡' },
  { title: 'Transparency',   desc: 'No hidden charges, no broker commissions, no surprises. What you see is exactly what you pay.',          icon: '🔍' },
  { title: 'Reliability',    desc: 'A confirmed booking at SWIFTO is a guarantee. Our drivers are trained and our systems are redundant.',    icon: '🛡' },
  { title: 'Driver Welfare', desc: 'We treat our drivers as partners — fair pay, on-time payment, and support at every step of the journey.', icon: '🤝' },
];

const clients = [
  'Bajaj Auto', 'Cipla Pharmaceuticals', 'Tata Steel', 'Mahindra Logistics',
  'Reliance Industries', 'Asian Paints', 'Ultratech Cement', 'Godrej Industries',
];

const coverage = [
  { region: 'Madhya Pradesh',  cities: 'Indore, Pithampur, Bhopal, Dewas, Ujjain, Raipur' },
  { region: 'Maharashtra',     cities: 'Mumbai, Pune, Nagpur, Nashik, Aurangabad' },
  { region: 'Gujarat',         cities: 'Ahmedabad, Surat, Vadodara, Rajkot' },
  { region: 'Delhi NCR',       cities: 'Delhi, Gurugram, Noida, Faridabad' },
  { region: 'Rajasthan',       cities: 'Jaipur, Jodhpur, Kota, Udaipur' },
  { region: 'South India',     cities: 'Hyderabad, Bangalore, Chennai, Coimbatore' },
  { region: 'East India',      cities: 'Kolkata, Bhubaneswar, Patna' },
  { region: 'Uttar Pradesh',   cities: 'Lucknow, Kanpur, Agra, Varanasi' },
];

const stats = [
  { num: '2025',    label: 'Founded' },
  { num: '2,500+',  label: 'Active Drivers' },
  { num: '100+',    label: 'Trips Completed' },
  { num: '28+',     label: 'Cities Covered' },
];

function About() {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, minHeight: '100vh', color: 'white' }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '9rem 5% 6rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(230,57,70,0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '0', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(59,130,246,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)', borderRadius: '100px', padding: '0.4rem 1.1rem', marginBottom: '2rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e63946' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#e63946', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Our Story</span>
            </div>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '1.5rem' }}>
              Built for India's<br />
              <span style={{ color: '#e63946', position: 'relative' }}>
                Industrial Backbone
                <span style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #e63946, transparent)', borderRadius: '2px' }} />
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem', maxWidth: '500px' }}>
              SWIFTO was founded in 2025 in Pithampur, Madhya Pradesh — one of India's most powerful industrial zones, home to 1,500+ factories across automotive, pharmaceuticals, engineering, chemicals, and FMCG sectors. Giants like Mahindra, Force Motors, Cipla, and Larsen & Toubro operate here. The zone generates thousands of crores in annual output — yet its freight infrastructure was completely broken. Brokers overcharged. Drivers ran empty. Every load was a phone call that nobody answered.
            </p>

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '500px', marginBottom: '2.5rem', fontStyle: 'italic', borderLeft: '3px solid rgba(230,57,70,0.4)', paddingLeft: '1rem' }}>
              "My vision is an India where no factory ever waits for a truck — where every load moves on time, every driver earns fairly, and logistics is never the reason a business slows down."
              <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.8rem', fontStyle: 'normal', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>— Nitin Prajapati, Founder & CEO</span>
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/booking" style={{ textDecoration: 'none' }}>
                <button style={{ background: '#e63946', color: 'white', border: 'none', borderRadius: '10px', padding: '0.9rem 1.75rem', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(230,57,70,0.35)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(230,57,70,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(230,57,70,0.35)'; }}>
                  Book a Delivery
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.9rem 1.75rem', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Stats + Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '1.75rem', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#e63946', marginBottom: '0.35rem', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(230,57,70,0.08), rgba(230,57,70,0.03))', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '20px', padding: '1.75rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(230,57,70,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Vision</div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'white', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                To become India's most trusted logistics company — setting the benchmark in every freight segment we enter.
              </p>
              <div style={{ height: '1px', background: 'rgba(230,57,70,0.15)', marginBottom: '1.25rem' }} />
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'rgba(230,57,70,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Mission</div>
              {['Deliver the highest quality freight service by maximizing cost efficiency and meeting every deadline.',
                'Build a workforce driven by excellence, accountability, and continuous improvement.',
                'Foster teamwork and create an environment where talent thrives.'].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e63946', marginTop: '7px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{m}</span>
                </div>
              ))}
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: '1rem 0 0', fontStyle: 'italic' }}>— Nitin Prajapati, Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENT TRUST STRIP ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', padding: '2rem 5%', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Trusted by India's Leading Factories & Businesses
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {clients.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.3px', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.3)'; e.currentTarget.style.background = 'rgba(230,57,70,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#e63946', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What We Stand For</div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-1.5px' }}>
            Our Core <span style={{ color: '#e63946' }}>Values</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '2rem', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.6rem', color: 'white' }}>{v.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY SWIFTO ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 5% 6rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#e63946', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Why Choose Us</div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-1.5px', margin: 0 }}>
              The SWIFTO <span style={{ color: '#e63946' }}>Advantage</span>
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.65 }}>
            Six reasons why India's top factories choose SWIFTO over traditional freight brokers.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {why.map((w, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '2rem', position: 'relative', overflow: 'hidden', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontFamily: 'Manrope, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>{w.num}</div>
              <div style={{ width: '40px', height: '3px', background: '#e63946', borderRadius: '2px', marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{w.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TEAM ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 5% 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#e63946', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Our People</div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-1.5px' }}>
            Leadership Team of <span style={{ color: '#e63946' }}>SWIFTO</span>
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #e63946, transparent)', borderRadius: '2px', margin: '1rem auto 0' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {team.map((t, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{
                background: hoveredMember === i ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${hoveredMember === i ? t.color + '40' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '20px', overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                transition: 'all 0.3s',
                position: 'relative',
                boxShadow: hoveredMember === i ? `0 8px 40px ${t.color}15` : 'none',
              }}>

              {/* Left color bar */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: t.color, borderRadius: '20px 0 0 20px', opacity: hoveredMember === i ? 1 : 0.4, transition: 'opacity 0.3s' }} />

              {/* LEFT — Photo + Name */}
              <div style={{
                background: `linear-gradient(160deg, ${t.color}18 0%, ${t.color}06 100%)`,
                borderRight: '1px solid rgba(255,255,255,0.06)',
                padding: '2.5rem 2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                textAlign: 'center',
              }}>
                {/* Number */}
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', fontWeight: 900, color: t.color, opacity: 0.5 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Photo placeholder */}
                <div style={{
                  width: '140px', height: '170px', borderRadius: '16px',
                  background: `linear-gradient(135deg, ${t.color}33, ${t.color}11)`,
                  border: `2px solid ${t.color}50`,
                  overflow: 'hidden',
                  boxShadow: hoveredMember === i ? `0 12px 40px ${t.color}40` : `0 4px 24px rgba(0,0,0,0.5)`,
                  transition: 'box-shadow 0.3s',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '2.5rem', color: t.color }}>{t.initials}</div>
                  }
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '1rem', color: 'white', margin: '0 0 0.3rem' }}>{t.name}</h3>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, color: t.color, textTransform: 'uppercase', letterSpacing: '0.8px', lineHeight: 1.5, margin: 0 }}>{t.role}</p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.58rem', fontWeight: 700, color: t.color, background: t.color + '18', border: `1px solid ${t.color}30`, padding: '2px 8px', borderRadius: '100px' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT — Bio */}
              <div style={{ padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '28px', height: '2px', background: t.color, borderRadius: '2px' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: t.color, letterSpacing: '2px', textTransform: 'uppercase' }}>Profile</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.9, margin: 0, textAlign: 'justify' }}>{t.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ── COVERAGE ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 5% 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#e63946', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pan India Network</div>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '0.5rem' }}>
            Our <span style={{ color: '#e63946' }}>Coverage Areas</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>28+ cities across 8 major regions</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {coverage.map((c, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e63946', marginTop: '5px', flexShrink: 0, boxShadow: '0 0 8px rgba(230,57,70,0.5)' }} />
              <div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.3rem' }}>{c.region}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', lineHeight: 1.6 }}>{c.cities}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 5% 7rem' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)', borderRadius: '28px', padding: '4rem 3rem', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Get Started Today</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Ready to Ship Smarter?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Join thousands of businesses that trust SWIFTO for reliable, fast, and transparent freight logistics.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'white', color: '#e63946', border: 'none', borderRadius: '12px', padding: '1rem 2.25rem', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Book a Delivery
                </button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '12px', padding: '1rem 2.25rem', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}>
                  Contact Our Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

export default About;