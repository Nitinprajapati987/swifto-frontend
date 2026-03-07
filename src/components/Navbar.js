import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Booking', to: '/booking' },
    { label: 'Track', to: '/tracking' },
    { label: 'Driver Partner', to: '/driver-partner' },
  ];

  const isActive = (path) => location.pathname === path;

  const WHATSAPP_URL = 'https://wa.me/919179838941?text=Hello%20SWIFTO!%20I%20need%20help%20with%20logistics.';

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-2xl' : 'bg-black/90 backdrop-blur-sm'}`}>
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">

        <Link to="/" className="flex flex-col">
          <span className="font-bold leading-tight" style={{ fontSize: '1.8rem', color: '#FBBF24', textShadow: '0 0 20px rgba(251,191,36,0.5)', letterSpacing: '-0.5px', fontFamily: 'Manrope, sans-serif' }}>SWIFTO</span>
          <span className="text-xs text-gray-400 hidden md:block">Aasaan Logistics, Pakki Delivery</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={`transition-colors duration-200 ${isActive(link.to) ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-400'}`}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>

        <div className="hidden md:flex gap-3 items-center">
          <Link to="/login">
            <button className={`border border-yellow-400 px-5 py-2 rounded-full font-bold transition-all duration-200 ${isActive('/login') ? 'bg-yellow-400 text-black' : 'text-yellow-400 hover:bg-yellow-400 hover:text-black'}`}>
              Login
            </button>
          </Link>
          <Link to="/booking">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold hover:bg-yellow-300 transition-all duration-200 shadow-lg shadow-yellow-400/20">
              Book Now
            </button>
          </Link>
        </div>

        <button className="md:hidden text-2xl text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'X' : '='}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 flex flex-col items-center gap-5 py-6 px-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`text-base font-semibold transition-colors ${isActive(link.to) ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>
              {link.label}
            </Link>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 text-base font-semibold">
            Contact
          </a>
          <div className="flex gap-3 mt-2">
            <Link to="/login">
              <button className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition">Login</button>
            </Link>
            <Link to="/booking">
              <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold hover:bg-yellow-300 transition">Book Now</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;