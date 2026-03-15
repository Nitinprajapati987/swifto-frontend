import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SERVICES = [
  { label: 'B2B Logistics',         desc: 'Factory to factory delivery',      to: '/services#b2b-logistics' },
  { label: 'Full Truck Load',        desc: 'Dedicated truck for your cargo',   to: '/services#full-truck-load' },
  { label: 'Part Load',              desc: 'Pay only for space used',          to: '/services#part-load' },
  { label: 'Packers & Movers',       desc: 'Safe household relocation',        to: '/services#packers-movers' },
  { label: 'Return Load Matching',   desc: 'Zero empty trips',                 to: '/services#return-load' },
  { label: 'Container Transport',    desc: '20ft & 40ft containers',           to: '/services#container-transport' },
  { label: 'Enterprise Plans',       desc: 'Custom contracts for businesses',  to: '/services#enterprise-plans' },
  { label: 'API Integration',        desc: 'Connect your ERP to SWIFTO',      to: '/services#api-integration' },
];

const ABOUT = [
  { label: 'About SWIFTO',  desc: 'Our story and mission',        to: '/about' },
  { label: 'Why SWIFTO',    desc: 'What sets us apart',           to: '/about' },
  { label: 'Our Coverage',  desc: 'Cities we operate in',         to: '/about' },
  { label: 'Awards',        desc: 'Recognition & achievements',   to: '/about' },
];

function DropdownMenu({ items, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
      transform: 'translateX(-50%)', background: '#ffffff',
      borderRadius: '14px', boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
      minWidth: '230px', border: '1px solid #ebebeb',
      zIndex: 100, overflow: 'hidden',
    }}>
      {items.map((item, i) => (
        <Link key={item.label} to={item.to || '#'} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#111', marginBottom: '2px' }}>{item.label}</div>
            <div style={{ fontSize: '0.71rem', color: '#999' }}>{item.desc}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null); }, [location]);

  const isActive = (path) => location.pathname === path;

  const NavDropdown = ({ id, label, children }) => (
    <li className="relative"
      onMouseEnter={() => setActiveDropdown(id)}
      onMouseLeave={() => setActiveDropdown(null)}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 0', fontSize: '14px', fontWeight: 500, color: activeDropdown === id ? '#FBBF24' : 'white' }}>
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {activeDropdown === id && (
        <div style={{ position: 'absolute', top: '100%', left: '-20px', right: '-20px', height: '15px', zIndex: 99 }} />
      )}
      {activeDropdown === id && children}
    </li>
  );

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-2xl' : 'bg-black/90 backdrop-blur-sm'}`}>
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span style={{ fontSize: '1.8rem', color: '#FBBF24', letterSpacing: '-0.5px', fontFamily: 'Manrope, sans-serif', fontWeight: 900, lineHeight: 1 }}>SWIFTO</span>
          <span className="text-xs text-gray-400 hidden md:block">Aasaan Logistics, Pakki Delivery</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium items-center">

          <li>
            <Link to="/" className={`transition-colors duration-200 ${isActive('/') ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-400'}`}>Home</Link>
          </li>

          {/* About Dropdown */}
          <NavDropdown id="about" label="About">
            <DropdownMenu items={ABOUT} onClose={() => setActiveDropdown(null)} />
          </NavDropdown>

          {/* Services Dropdown */}
          <NavDropdown id="services" label="Services">
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
              transform: 'translateX(-50%)', background: '#ffffff',
              borderRadius: '14px', boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
              width: '320px', border: '1px solid #ebebeb', zIndex: 100, overflow: 'hidden',
            }}>
              <div style={{ padding: '10px 16px 6px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Our Services</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {SERVICES.map((s, i) => (
                  <Link key={s.label} to={s.to} onClick={() => setActiveDropdown(null)} style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '12px 16px', borderBottom: i < SERVICES.length - 2 ? '1px solid #f5f5f5' : 'none', borderRight: i % 2 === 0 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#111', marginBottom: '2px' }}>{s.label}</div>
                      <div style={{ fontSize: '0.68rem', color: '#bbb' }}>{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
                <Link to="/services" onClick={() => setActiveDropdown(null)} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '8px 12px', borderRadius: '8px', textAlign: 'center', background: 'rgba(230,57,70,0.06)', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(230,57,70,0.06)'}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e63946' }}>View All Services</span>
                  </div>
                </Link>
              </div>
            </div>
          </NavDropdown>

          {/* Booking Dropdown */}
          <NavDropdown id="booking" label="Booking">
            <DropdownMenu
              items={[
                { label: 'Book a Delivery', desc: 'Schedule your shipment now', to: '/booking' },
                { label: 'Track Order',     desc: 'Live shipment tracking',     to: '/tracking' },
              ]}
              onClose={() => setActiveDropdown(null)}
            />
          </NavDropdown>

          <li>
            <Link to="/driver-partner" className={`transition-colors duration-200 ${isActive('/driver-partner') ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-400'}`}>Driver Partner</Link>
          </li>

          <li>
            <Link to="/contact" className={`transition-colors duration-200 ${isActive('/contact') ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-400'}`}>Support</Link>
          </li>

        </ul>

        {/* Login Button */}
        <div className="hidden md:flex gap-3 items-center">
          <Link to="/login">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition-all duration-200">Login</button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-xl text-white focus:outline-none font-bold" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'X' : '='}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 flex flex-col items-center gap-4 py-6 px-6">
          <Link to="/" className={`text-sm font-semibold ${isActive('/') ? 'text-yellow-400' : 'text-white'}`}>Home</Link>
          <Link to="/about" className={`text-sm font-semibold ${isActive('/about') ? 'text-yellow-400' : 'text-white'}`}>About</Link>
          <Link to="/services" className={`text-sm font-semibold ${isActive('/services') ? 'text-yellow-400' : 'text-white'}`}>Services</Link>
          <Link to="/booking" className={`text-sm font-semibold ${isActive('/booking') ? 'text-yellow-400' : 'text-white'}`}>Book a Delivery</Link>
          <Link to="/tracking" className={`text-sm font-semibold ${isActive('/tracking') ? 'text-yellow-400' : 'text-white'}`}>Track Order</Link>
          <Link to="/driver-partner" className={`text-sm font-semibold ${isActive('/driver-partner') ? 'text-yellow-400' : 'text-white'}`}>Driver Partner</Link>
          <Link to="/contact" className={`text-sm font-semibold ${isActive('/contact') ? 'text-yellow-400' : 'text-white'}`}>Support</Link>
          <Link to="/login">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition mt-2">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;