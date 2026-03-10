import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';  // ✅ Fix: { io } use karo
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const truckIcon = new L.DivIcon({
  html: '<div style="font-size:2rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">🚛</div>',
  className: '', iconSize: [40, 40], iconAnchor: [20, 20],
});

const pickupIcon = new L.DivIcon({
  html: '<div style="font-size:1.5rem">📍</div>',
  className: '', iconSize: [30, 30], iconAnchor: [15, 30],
});

const STATUS_STEPS = [
  { key: 'confirmed',        label: 'Booking Confirmed' },
  { key: 'driver_assigned',  label: 'Driver Assigned' },
  { key: 'picked_up',        label: 'Goods Picked Up' },
  { key: 'in_transit',       label: 'In Transit' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered',        label: 'Delivered' },
];

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Tracking() {
  const [orderId, setOrderId]               = useState('');
  const [data, setData]                     = useState(null);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [driverLocation, setDriverLocation] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    return () => { if (socketRef.current) socketRef.current.disconnect(); };
  }, []);

  const connectSocket = (trackingId) => {
    if (socketRef.current) socketRef.current.disconnect();
    const socket = io(BACKEND_URL, { transports: ['websocket'] }); // ✅ Fix
    socketRef.current = socket;
    socket.emit('join:tracking', trackingId);
    socket.on(`tracking:${trackingId}`, (locationData) => {
      setDriverLocation(locationData);
    });
  };

  const handleTrack = async () => {
    if (!orderId.trim()) { setError('Please enter your Tracking ID.'); return; }
    setError(''); setLoading(true); setData(null); setDriverLocation(null);
    try {
      const res = await bookingAPI.track(orderId.trim().toUpperCase());
      setData(res.data.tracking);
      connectSocket(orderId.trim().toUpperCase());
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking ID not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const booking        = data?.bookingId;
  const timeline       = data?.timeline || [];
  const currentStatus  = data?.status || 'confirmed';
  const currentStepIdx = STATUS_STEPS.findIndex(s => s.key === currentStatus);
  const progress       = Math.round(((currentStepIdx + 1) / STATUS_STEPS.length) * 100);

  const defaultCenter = [22.7196, 75.8577];
  const mapCenter     = driverLocation ? [driverLocation.lat, driverLocation.lng] : defaultCenter;

  return (
    <div style={{ background: 'linear-gradient(160deg, #bcc8f0 0%, #c5d0f5 50%, #aebde8 100%)', minHeight: '100vh', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(245,240,225,0.7)', borderRadius: '50%', pointerEvents: 'none' }} />
      <Navbar />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '7rem 1.5rem 2rem', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#1a1a2e', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
            Track Your <span style={{ color: '#4361ee' }}>Order</span>
          </h2>
          <p style={{ color: '#374151', fontSize: '1rem' }}>Enter your Tracking ID to see live status</p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 8px 48px rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.08)' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Tracking ID / Booking Number</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input type="text" placeholder="e.g. SWT000001" value={orderId}
              onChange={e => { setOrderId(e.target.value.toUpperCase()); setError(''); setData(null); }}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              style={{ background: '#f5f7ff', color: '#1a1a2e', padding: '0.85rem 1rem', borderRadius: '10px', flex: 1, outline: 'none', border: `1.5px solid ${error ? '#ef4444' : '#e8eaff'}`, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}
              onFocus={e => e.target.style.borderColor = '#4361ee'}
              onBlur={e => e.target.style.borderColor = error ? '#ef4444' : '#e8eaff'}
            />
            <button onClick={handleTrack} disabled={loading}
              style={{ background: '#4361ee', color: 'white', padding: '0.85rem 1.25rem', borderRadius: '10px', border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, boxShadow: '0 4px 12px rgba(67,97,238,0.3)', whiteSpace: 'nowrap' }}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{error}</p>}
          <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '8px' }}>You received this ID after booking confirmation.</p>
        </div>

        {data && booking && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 8px 48px rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.08)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e8eaff', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Tracking ID</p>
                <p style={{ fontWeight: 800, color: '#4361ee', fontFamily: 'Manrope, sans-serif' }}>{data.trackingId}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Vehicle</p>
                <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '0.9rem' }}>{booking.vehicle}</p>
              </div>
              <span style={{ background: '#eef0ff', color: '#4361ee', fontSize: '0.75rem', fontWeight: 700, padding: '0.4rem 0.9rem', borderRadius: '100px', border: '1px solid rgba(67,97,238,0.2)', textTransform: 'capitalize' }}>
                {currentStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', background: '#f5f7ff', borderRadius: '12px', padding: '1rem', border: '1px solid #e8eaff' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '2px' }}>From</p>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1a1a2e' }}>{booking.pickup}</p>
              </div>
              <div style={{ textAlign: 'center', color: '#4361ee', fontSize: '1.25rem' }}>→</div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '2px' }}>To</p>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1a1a2e' }}>{booking.drop}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '8px' }}>
                <span>Progress</span>
                <span style={{ color: '#4361ee', fontWeight: 700 }}>{progress}% Complete</span>
              </div>
              <div style={{ height: '8px', background: '#e8eaff', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#4361ee', borderRadius: '100px', transition: 'width 1s ease' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem', borderRadius: '16px', overflow: 'hidden', border: '2px solid #e8eaff' }}>
              <div style={{ background: '#eef0ff', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#4361ee' }}>Live Map</span>
                {driverLocation
                  ? <span style={{ marginLeft: 'auto', background: '#22c55e', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>LIVE</span>
                  : <span style={{ marginLeft: 'auto', background: '#f59e0b', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>Waiting for driver</span>
                }
              </div>
              <MapContainer center={mapCenter} zoom={12} style={{ height: '280px', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {driverLocation ? (
                  <Marker position={[driverLocation.lat, driverLocation.lng]} icon={truckIcon}>
                    <Popup>
                      Your Truck<br />
                      {driverLocation.address || 'Location updating...'}<br />
                      <small>{new Date(driverLocation.time).toLocaleTimeString('en-IN')}</small>
                    </Popup>
                  </Marker>
                ) : (
                  <Marker position={defaultCenter} icon={pickupIcon}>
                    <Popup>Indore — Truck location will update when driver starts</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            {data.driverName && (
              <div style={{ background: '#f5f7ff', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #e8eaff' }}>
                <div style={{ width: '48px', height: '48px', background: '#4361ee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0 }}>DR</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a2e' }}>{data.driverName}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Driver</p>
                </div>
                {data.driverPhone && (
                  <a href={`tel:${data.driverPhone}`}
                    style={{ background: '#22c55e', color: 'white', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 700, fontSize: '0.75rem' }}>
                    Call
                  </a>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginTop: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a2e', textTransform: 'capitalize' }}>{item.status?.replace(/_/g, ' ')}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.message}</p>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{new Date(item.time).toLocaleString('en-IN')}</p>
                  </div>
                  <span style={{ color: '#22c55e', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>Done</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e8eaff', paddingTop: '1.25rem' }}>
              <Link to="/booking" style={{ display: 'block' }}>
                <button style={{ width: '100%', background: '#4361ee', color: 'white', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,97,238,0.25)' }}>
                  New Booking
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder { color: #9ca3af; }
        .leaflet-container { z-index: 1 !important; }
      `}</style>
    </div>
  );
}

export default Tracking;