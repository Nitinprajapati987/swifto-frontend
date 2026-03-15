import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import Auth from './pages/Auth';
import DriverPartner from './pages/DriverPartner';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Chatbot from './components/Chatbot';
function App() {
  return (
    <Router>
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/driver-partner" element={<DriverPartner />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
