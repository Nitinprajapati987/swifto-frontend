import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SERVICES = [
  { label: 'B2B Logistics',       desc: 'Factory to factory delivery',     to: '/services#b2b-logistics' },
  { label: 'Full Truck Load',      desc: 'Dedicated truck for your cargo',  to: '/services#full-truck-load' },
  { label: 'Part Load',            desc: 'Pay only for space used',         to: '/services#part-load' },
  { label: 'Packers & Movers',     desc: 'Safe household relocation',       to: '/services#packers-movers' },
  { label: 'Return Load Matching', desc: 'Zero empty trips',                to: '/services#return-load' },
  { label: 'Container Transport',  desc: '20ft & 40ft containers',          to: '/services#container-transport' },
  { label: 'Enterprise Plans',     desc: 'Custom contracts for businesses', to: '/services#enterprise-plans' },
  { label: 'API Integration',      desc: 'Connect your ERP to SWIFTO',     to: '/services#api-integration' },
];

const ABOUT = [
  { label: 'About SWIFTO', desc: 'Our story and mission',     to: '/about' },
  { label: 'Why SWIFTO',   desc: 'What sets us apart',        to: '/about' },
  { label: 'Our Coverage', desc: 'Cities we operate in',      to: '/about' },
];

function Navbar() {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{NAVBAR_CSS}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'0 5%', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none', display:'flex', flexDirection:'column', gap:'1px' }}>
            <span style={{ fontSize:'1.6rem', fontWeight:800, color:'#f59e0b', letterSpacing:'-1px', lineHeight:1, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>SWIFTO</span>
            <span style={{ fontSize:'0.55rem', color:'rgba(255,255,255,0.35)', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase' }}>Aasaan Logistics</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links" style={{ display:'flex', gap:'2rem', alignItems:'center', listStyle:'none', margin:0, padding:0 }}>

            <li><Link to="/" style={{ fontSize:'0.88rem', fontWeight:600, color: isActive('/') ? '#f59e0b' : 'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}>Home</Link></li>

            {/* About dropdown */}
            <li style={{ position:'relative', paddingBottom:'8px', marginBottom:'-8px' }}
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}>
              <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'0.88rem', fontWeight:600, color: activeDropdown === 'about' ? '#f59e0b' : 'rgba(255,255,255,0.75)', padding:0, transition:'color 0.2s', fontFamily:'inherit' }}>
                About
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transition:'transform 0.2s', transform: activeDropdown==='about' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {activeDropdown === 'about' && (
                <div className="dropdown-menu" style={{ position:'absolute', top:'calc(100% + 2px)', left:'50%', transform:'translateX(-50%)', background:'white', borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', minWidth:'220px', border:'1px solid #f0f0f0', overflow:'hidden', zIndex:100 }}>
                  {ABOUT.map((item, i) => (
                    <Link key={item.label} to={item.to} style={{ textDecoration:'none', display:'block' }}>
                      <div className="dropdown-item" style={{ padding:'12px 18px', borderBottom: i < ABOUT.length-1 ? '1px solid #f5f5f5' : 'none' }}>
                        <p style={{ fontSize:'0.85rem', fontWeight:700, color:'#0f172a', margin:'0 0 2px' }}>{item.label}</p>
                        <p style={{ fontSize:'0.7rem', color:'#94a3b8', margin:0 }}>{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Services dropdown */}
            <li style={{ position:'relative', paddingBottom:'8px', marginBottom:'-8px' }}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}>
              <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'0.88rem', fontWeight:600, color: activeDropdown === 'services' ? '#f59e0b' : 'rgba(255,255,255,0.75)', padding:0, transition:'color 0.2s', fontFamily:'inherit' }}>
                Services
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transition:'transform 0.2s', transform: activeDropdown==='services' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {activeDropdown === 'services' && (
                <div className="dropdown-menu" style={{ position:'absolute', top:'calc(100% + 2px)', left:'50%', transform:'translateX(-50%)', background:'white', borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', width:'340px', border:'1px solid #f0f0f0', overflow:'hidden', zIndex:100 }}>
                  <div style={{ padding:'10px 14px 6px', background:'#fafafa', borderBottom:'1px solid #f0f0f0' }}>
                    <p style={{ fontSize:'0.6rem', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'1.5px', margin:0 }}>Our Services</p>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
                    {SERVICES.map((s, i) => (
                      <Link key={s.label} to={s.to} style={{ textDecoration:'none' }}>
                        <div className="dropdown-item" style={{ padding:'11px 14px', borderBottom: i < SERVICES.length-2 ? '1px solid #f5f5f5' : 'none', borderRight: i%2===0 ? '1px solid #f5f5f5' : 'none' }}>
                          <p style={{ fontSize:'0.8rem', fontWeight:700, color:'#0f172a', margin:'0 0 2px' }}>{s.label}</p>
                          <p style={{ fontSize:'0.65rem', color:'#94a3b8', margin:0 }}>{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ padding:'8px 12px', borderTop:'1px solid #f0f0f0' }}>
                    <Link to="/services" style={{ textDecoration:'none', display:'block' }}>
                      <div className="dropdown-item" style={{ padding:'8px 10px', borderRadius:'8px', textAlign:'center', background:'#fffbeb' }}>
                        <span style={{ fontSize:'0.75rem', fontWeight:700, color:'#f59e0b' }}>View All Services</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Booking dropdown */}
            <li style={{ position:'relative', paddingBottom:'8px', marginBottom:'-8px' }}
              onMouseEnter={() => setActiveDropdown('booking')}
              onMouseLeave={() => setActiveDropdown(null)}>
              <button style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontSize:'0.88rem', fontWeight:600, color: activeDropdown === 'booking' ? '#f59e0b' : 'rgba(255,255,255,0.75)', padding:0, transition:'color 0.2s', fontFamily:'inherit' }}>
                Booking
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transition:'transform 0.2s', transform: activeDropdown==='booking' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {activeDropdown === 'booking' && (
                <div className="dropdown-menu" style={{ position:'absolute', top:'calc(100% + 2px)', left:'50%', transform:'translateX(-50%)', background:'white', borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', minWidth:'220px', border:'1px solid #f0f0f0', overflow:'hidden', zIndex:100 }}>
                  {[
                    { label:'Book a Delivery', desc:'Schedule your shipment now', to:'/booking' },
                    { label:'Track Order',     desc:'Live shipment tracking',     to:'/tracking' },
                  ].map((item, i) => (
                    <Link key={item.label} to={item.to} style={{ textDecoration:'none', display:'block' }}>
                      <div className="dropdown-item" style={{ padding:'12px 18px', borderBottom: i === 0 ? '1px solid #f5f5f5' : 'none' }}>
                        <p style={{ fontSize:'0.85rem', fontWeight:700, color:'#0f172a', margin:'0 0 2px' }}>{item.label}</p>
                        <p style={{ fontSize:'0.7rem', color:'#94a3b8', margin:0 }}>{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link to="/driver-partner" style={{ fontSize:'0.88rem', fontWeight:600, color: isActive('/driver-partner') ? '#f59e0b' : 'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}>Driver Partner</Link></li>
            <li><Link to="/contact" style={{ fontSize:'0.88rem', fontWeight:600, color: isActive('/contact') ? '#f59e0b' : 'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}>Support</Link></li>
          </ul>

          {/* CTA + Mobile toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <Link to="/login" className="nav-cta-link" style={{ textDecoration:'none' }}>
              <button style={{ background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'100px', padding:'9px 22px', fontSize:'0.85rem', fontWeight:800, cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit', letterSpacing:'0.2px' }}>
                Login
              </button>
            </Link>

            {/* Hamburger */}
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', display:'none', flexDirection:'column', gap:'5px' }}>
              <span style={{ display:'block', width:'22px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none' }} />
              <span style={{ display:'block', width:'22px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display:'block', width:'22px', height:'2px', background:'white', borderRadius:'2px', transition:'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background:'#0a0a0f', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'1.25rem 5%', display:'flex', flexDirection:'column', gap:'4px' }}>
            {[
              { to:'/', label:'Home' },
              { to:'/about', label:'About' },
              { to:'/services', label:'Services' },
              { to:'/booking', label:'Book a Delivery' },
              { to:'/tracking', label:'Track Order' },
              { to:'/driver-partner', label:'Driver Partner' },
              { to:'/contact', label:'Support' },
            ].map(item => (
              <Link key={item.to} to={item.to} style={{ textDecoration:'none', display:'block' }}>
                <div style={{ padding:'11px 14px', borderRadius:'10px', fontSize:'0.9rem', fontWeight:600, color: isActive(item.to) ? '#f59e0b' : 'rgba(255,255,255,0.7)', background: isActive(item.to) ? 'rgba(245,158,11,0.08)' : 'transparent', transition:'all 0.15s' }}>
                  {item.label}
                </div>
              </Link>
            ))}
            <Link to="/login" style={{ textDecoration:'none', display:'block', marginTop:'8px' }}>
              <button style={{ width:'100%', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', padding:'12px', fontSize:'0.9rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>Login</button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

const NAVBAR_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .dropdown-item { transition: background 0.15s; cursor: pointer; }
  .dropdown-item:hover { background: #fafafa; }
  .dropdown-menu { animation: dropIn 0.18s ease; }
  @keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-4px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
  .nav-cta-link button:hover { background: #d97706 !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(245,158,11,0.4); }
  @media (max-width: 900px) {
    .nav-links { display: none !important; }
    .nav-cta-link { display: none !important; }
    .nav-hamburger { display: flex !important; }
  }
`;

export default Navbar;