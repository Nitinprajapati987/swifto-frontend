import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="contact" className="bg-black text-gray-400 pt-14 pb-6 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FBBF24', textShadow: '0 0 20px rgba(251,191,36,0.5)', fontFamily: 'Manrope, sans-serif', marginBottom: '0.5rem' }}>SWIFTO</div>
            <p className="text-sm text-gray-500 mb-4">Aasaan Logistics, Pakki Delivery</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              India's first B2B Logistics Platform.
              Pan India delivery from Pithampur, Indore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/booking" className="hover:text-yellow-400 transition">Book Delivery</Link></li>
              <li><Link to="/tracking" className="hover:text-yellow-400 transition">Track Order</Link></li>
              <li><Link to="/driver-partner" className="hover:text-yellow-400 transition">Driver Partner</Link></li>
              <li><Link to="/login" className="hover:text-yellow-400 transition">Login / Register</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-yellow-400 transition cursor-pointer">B2B Logistics</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Factory Delivery</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Return Load Matching</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Fleet Management</li>
              <li className="hover:text-yellow-400 transition cursor-pointer">Enterprise Plans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+919179838941" className="hover:text-yellow-400 transition flex items-center gap-2">
                  Phone: +91 9179838941
                </a>
              </li>
              <li>
                <a href="mailto:support@swifto.in" className="hover:text-yellow-400 transition flex items-center gap-2">
                  Email: support@swifto.in
                </a>
              </li>
              <li>
                Address: Pithampur Industrial Zone, Indore, MP
              </li>
              <li className="text-xs text-green-400 font-semibold">
                Available 24/7
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 SWIFTO Logistics Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer transition">Refund Policy</span>
          </div>
          <p>Made with Pride in India, India</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;