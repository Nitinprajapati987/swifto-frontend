import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { label:'Home',           to:'/' },
  { label:'Book Delivery',  to:'/booking' },
  { label:'Track Order',    to:'/tracking' },
  { label:'Driver Partner', to:'/driver-partner' },
  { label:'Login',          to:'/login' },
];

const SERVICES = ['B2B Logistics','Factory Delivery','Return Load Matching','Fleet Management','Enterprise Plans'];

export default function Footer() {
  return (
    <footer style={{ background:'#0a0a0f', borderTop:'1px solid rgba(255,255,255,0.06)', fontFamily:"'Plus Jakarta Sans', sans-serif", color:'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .footer-link { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.18s; }
        .footer-link:hover { color: #f59e0b; }
        .footer-contact-link { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.18s; display: block; }
        .footer-contact-link:hover { color: #f59e0b; }
      `}</style>

      {/* Main grid */}
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'4rem 5% 3rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr', gap:'3rem', marginBottom:'3rem' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom:'1rem' }}>
              <span style={{ fontSize:'1.8rem', fontWeight:800, color:'#f59e0b', letterSpacing:'-1px', lineHeight:1, display:'block' }}>SWIFTO</span>
              <span style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.3)', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase' }}>Aasaan Logistics, Pakki Delivery</span>
            </div>
            <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.35)', lineHeight:1.75, maxWidth:'260px', marginBottom:'1.5rem' }}>
              India's first B2B Logistics Platform. Pan India delivery from Pithampur, Indore.
            </p>
            <div style={{ display:'flex', gap:'8px' }}>
              {[
                { label:'Call', href:'tel:+919179838941', c:'#f59e0b' },
                { label:'WhatsApp', href:'https://wa.me/919179838941', c:'#22c55e' },
                { label:'Email', href:'mailto:info@swifto.in', c:'#38bdf8' },
              ].map(b => (
                <a key={b.label} href={b.href} target={b.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ textDecoration:'none' }}>
                  <div style={{ background:`${b.c}18`, border:`1px solid ${b.c}30`, borderRadius:'8px', padding:'6px 12px', fontSize:'0.72rem', fontWeight:700, color:b.c, transition:'all 0.18s', cursor:'pointer' }}>
                    {b.label}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Quick Links</p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}>
              {LINKS.map(l => (
                <li key={l.to}><Link to={l.to} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Services</p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}>
              {SERVICES.map(s => (
                <li key={s}><span className="footer-link" style={{ cursor:'default' }}>{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize:'0.62rem', fontWeight:700, color:'#f59e0b', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Contact</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <a href="tel:+919179838941" className="footer-contact-link">+91 9179838941</a>
              <a href="mailto:info@swifto.in" className="footer-contact-link">info@swifto.in</a>
              <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.35)', lineHeight:1.6, margin:0 }}>Pithampur Industrial Zone,<br />Indore, Madhya Pradesh</p>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e' }} />
                <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#22c55e' }}>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:'rgba(255,255,255,0.06)', marginBottom:'1.5rem' }} />

        {/* Bottom bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.25)', margin:0 }}>
            &copy; 2025 SWIFTO Logistics Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display:'flex', gap:'1.5rem' }}>
            {['Privacy Policy','Terms of Service','Refund Policy'].map(l => (
              <span key={l} className="footer-link" style={{ cursor:'pointer', fontSize:'0.75rem' }}>{l}</span>
            ))}
          </div>
          <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.2)', margin:0 }}>Made with Pride in India</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}