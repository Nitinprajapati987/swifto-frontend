import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import factory1 from '../assets/logos/factory1.png';
import factory2 from '../assets/logos/factory2.png';
import factory3 from '../assets/logos/factory3.png';
import factory4 from '../assets/logos/factory4.png';
import factory5 from '../assets/logos/factory5.png';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const truckIcon = new L.DivIcon({
  html: '<div style="font-size:2rem;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.3))">&#128699;</div>',
  className: '', iconSize: [40, 40], iconAnchor: [20, 20],
});
const pinIcon = new L.DivIcon({
  html: '<div style="font-size:1.5rem">&#128205;</div>',
  className: '', iconSize: [30, 30], iconAnchor: [15, 30],
});

// Truck / logistics images — rotate every 3s
const IMAGES = [
  factory1,
  factory2,
  factory3,
  factory4,
  factory5,
];

const STEPS = [
  { key: 'confirmed',        label: 'Confirmed',        color: '#3b82f6' },
  { key: 'driver_assigned',  label: 'Driver Assigned',  color: '#8b5cf6' },
  { key: 'picked_up',        label: 'Picked Up',        color: '#f59e0b' },
  { key: 'in_transit',       label: 'In Transit',       color: '#f59e0b' },
  { key: 'out_for_delivery', label: 'Out for Delivery', color: '#f97316' },
  { key: 'delivered',        label: 'Delivered',        color: '#22c55e' },
];

const STATUS_COLORS = {
  confirmed:        { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' },
  driver_assigned:  { bg:'#f5f3ff', color:'#6d28d9', border:'#ddd6fe' },
  picked_up:        { bg:'#fffbeb', color:'#b45309', border:'#fde68a' },
  in_transit:       { bg:'#fffbeb', color:'#b45309', border:'#fde68a' },
  out_for_delivery: { bg:'#fff7ed', color:'#c2410c', border:'#fed7aa' },
  delivered:        { bg:'#f0fdf4', color:'#15803d', border:'#bbf7d0' },
  cancelled:        { bg:'#fff5f5', color:'#b91c1c', border:'#fecaca' },
};

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Tracking() {
  const [orderId, setOrderId]               = useState('');
  const [data, setData]                     = useState(null);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [driverLocation, setDriverLocation] = useState(null);
  const [focused, setFocused]               = useState(false);
  const [imgIdx, setImgIdx]                 = useState(0);
  const [fade, setFade]                     = useState(true);
  const socketRef  = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) setOrderId(id);
    return () => socketRef.current?.disconnect();
  }, []);

  // Auto-rotate images every 3s with fade
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setImgIdx(i => (i + 1) % IMAGES.length);
        setFade(true);
      }, 200);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const connectSocket = (tid) => {
    socketRef.current?.disconnect();
    const s = io(BACKEND_URL, { transports: ['websocket'] });
    socketRef.current = s;
    s.emit('join:tracking', tid);
    s.on(`tracking:${tid}`, loc => setDriverLocation(loc));
  };

  const handleTrack = async () => {
    if (!orderId.trim()) { setError('Please enter your Tracking ID'); return; }
    setError(''); setLoading(true); setData(null); setDriverLocation(null);
    try {
      const res = await bookingAPI.track(orderId.trim().toUpperCase());
      setData(res.data.tracking);
      connectSocket(orderId.trim().toUpperCase());
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking ID not found. Please check and try again.');
    } finally { setLoading(false); }
  };

  const booking   = data?.bookingId;
  const timeline  = data?.timeline || [];
  const status    = data?.status || 'confirmed';
  const stepIdx   = STEPS.findIndex(s => s.key === status);
  const progress  = Math.round(((stepIdx + 1) / STEPS.length) * 100);
  const mapCenter = driverLocation ? [driverLocation.lat, driverLocation.lng] : [22.7196, 75.8577];
  const sc        = STATUS_COLORS[status] || STATUS_COLORS.confirmed;

  return (
    <div style={{ minHeight:'100vh', fontFamily:"'Inter', system-ui, sans-serif", background:'#f1f5f9' }}>
      <style>{CSS}</style>
      <Navbar />

      {/* Hero strip with rotating image */}
      <div style={{
        position:'relative', overflow:'hidden',
        padding:'5.5rem 5% 3rem',
        background:'#0f172a',
        minHeight:'220px',
      }}>
        <img
          key={imgIdx}
          src={IMAGES[imgIdx]}
          alt="logistics"
          style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%', objectFit:'cover',
            opacity: fade ? 0.18 : 0,
            transition:'opacity 0.2s ease',
          }}
        />
        {/* dot indicators */}
        <div style={{ position:'absolute', bottom:'1rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'5px', zIndex:2 }}>
          {IMAGES.map((_, i) => (
            <div key={i} onClick={() => { setFade(false); setTimeout(() => { setImgIdx(i); setFade(true); }, 200); }}
              style={{ width: i===imgIdx ? '18px' : '6px', height:'6px', borderRadius:'100px', background: i===imgIdx ? '#f59e0b' : 'rgba(255,255,255,0.35)', cursor:'pointer', transition:'all 0.3s' }} />
          ))}
        </div>

        <div style={{ position:'relative', zIndex:1, maxWidth:'1240px', margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:'100px', padding:'5px 14px', marginBottom:'1rem' }}>
            <span className="live-dot" style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
            <span style={{ color:'#4ade80', fontSize:'0.65rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' }}>Live Tracking</span>
          </div>
          <h1 style={{ color:'white', fontSize:'clamp(1.8rem,3.5vw,2.5rem)', fontWeight:800, letterSpacing:'-0.5px', marginBottom:'0.5rem' }}>
            Track Your Shipment
          </h1>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.95rem' }}>
            Real-time location, status updates and driver details
          </p>
        </div>
      </div>

      <div className="t-grid" style={{
        maxWidth:'1240px', margin:'0 auto',
        padding:'2rem 5% 4rem',
        display:'grid',
        gridTemplateColumns:'1fr 380px',
        gap:'2rem',
        alignItems:'start',
      }}>

        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', animation:'fadeUp 0.5s ease both' }}>

          {/* Search box */}
          <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', overflow:'hidden' }}>
            <div style={{ padding:'1.5rem 1.75rem' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'10px' }}>Enter Tracking ID</p>
              <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                <input
                  type="text"
                  value={orderId}
                  placeholder="e.g. SWT000001"
                  onChange={e => { setOrderId(e.target.value.toUpperCase()); setError(''); setData(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleTrack()}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    flex:1, padding:'12px 14px',
                    border:`1.5px solid ${error ? '#fca5a5' : focused ? '#f59e0b' : '#e2e8f0'}`,
                    borderRadius:'10px', fontSize:'1rem', fontWeight:700,
                    color:'#0f172a', fontFamily:'monospace',
                    letterSpacing:'2px', outline:'none',
                    background: error ? '#fff5f5' : focused ? '#fffbeb' : '#f8fafc',
                    boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
                    transition:'all 0.18s',
                  }}
                />
                <button onClick={handleTrack} disabled={loading} className="track-btn" style={{
                  background:'#f59e0b', color:'#0f172a', border:'none',
                  borderRadius:'10px', padding:'12px 22px',
                  fontWeight:800, fontSize:'0.88rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  whiteSpace:'nowrap', transition:'all 0.2s', fontFamily:'inherit',
                  boxShadow:'0 4px 16px rgba(245,158,11,0.3)',
                  opacity: loading ? 0.7 : 1,
                  display:'flex', alignItems:'center', gap:'6px',
                }}>
                  {loading ? <span className="spin" /> : 'Track'}
                </button>
              </div>
              {error
                ? <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:'8px' }}>{error}</p>
                : <p style={{ color:'#94a3b8', fontSize:'0.73rem', marginTop:'8px' }}>Tracking ID was sent on WhatsApp after booking confirmation</p>
              }
            </div>
          </div>

          {/* Map */}
          {data && (
            <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', overflow:'hidden' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.1rem 1.5rem', borderBottom:'1px solid #f1f5f9' }}>
                <span style={{ fontWeight:700, fontSize:'0.9rem', color:'#0f172a' }}>Live Map</span>
                {driverLocation
                  ? <span style={{ background:'#dcfce7', color:'#15803d', fontSize:'0.65rem', fontWeight:700, padding:'4px 10px', borderRadius:'100px', border:'1px solid #bbf7d0' }}>LIVE</span>
                  : <span style={{ background:'#fffbeb', color:'#b45309', fontSize:'0.65rem', fontWeight:600, padding:'4px 10px', borderRadius:'100px', border:'1px solid #fde68a' }}>Waiting for driver</span>
                }
              </div>
              <MapContainer center={mapCenter} zoom={12} style={{ height:'300px', width:'100%' }} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {driverLocation
                  ? <Marker position={[driverLocation.lat, driverLocation.lng]} icon={truckIcon}>
                      <Popup>Your Truck — {driverLocation.address || 'Updating...'}</Popup>
                    </Marker>
                  : <Marker position={mapCenter} icon={pinIcon}>
                      <Popup>Indore — Waiting for driver to start</Popup>
                    </Marker>
                }
              </MapContainer>
            </div>
          )}

          {/* Timeline */}
          {data && timeline.length > 0 && (
            <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', padding:'1.5rem' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'1.25rem' }}>Activity Log</p>
              {timeline.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:'14px', paddingBottom:'16px' }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'10px', flexShrink:0 }}>
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: i===0 ? '#22c55e' : '#e2e8f0', flexShrink:0, marginTop:'3px', boxShadow: i===0 ? '0 0 8px rgba(34,197,94,0.4)' : 'none' }} />
                    {i < timeline.length-1 && <div style={{ width:'1px', flex:1, background:'#f1f5f9', marginTop:'4px' }} />}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'3px' }}>
                      <p style={{ fontSize:'0.83rem', fontWeight:700, color:'#0f172a', textTransform:'capitalize' }}>
                        {item.status?.replace(/_/g,' ')}
                      </p>
                      {i===0 && <span style={{ background:'#dcfce7', color:'#15803d', fontSize:'0.6rem', fontWeight:700, padding:'2px 7px', borderRadius:'100px' }}>Latest</span>}
                    </div>
                    <p style={{ fontSize:'0.78rem', color:'#64748b', lineHeight:1.5, marginBottom:'3px' }}>{item.message}</p>
                    <p style={{ fontSize:'0.68rem', color:'#94a3b8' }}>
                      {new Date(item.time).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Placeholder when no data */}
          {!data && (
            <div style={{ background:'white', borderRadius:'20px', border:'1.5px dashed #e2e8f0', padding:'3rem 2rem', textAlign:'center' }}>
              <div style={{ width:'64px', height:'64px', background:'#f8fafc', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', border:'1px solid #e2e8f0' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem' }}>Enter Tracking ID above</h3>
              <p style={{ color:'#94a3b8', fontSize:'0.85rem', lineHeight:1.6 }}>
                Your shipment details, live GPS location<br />and driver information will appear here
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', animation:'fadeUp 0.5s ease 0.12s both', position:'sticky', top:'85px' }}>

          {!data ? (
            <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', overflow:'hidden' }}>
              <div style={{ height:'3px', background:'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }} />
              <div style={{ padding:'1.5rem' }}>
                <p style={{ fontSize:'0.72rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'1rem' }}>What You Will See</p>
                {[
                  { label:'Real-time GPS location', sub:'Live truck position on map' },
                  { label:'Step-by-step status',    sub:'Confirmed to Delivered' },
                  { label:'Driver details',          sub:'Name, phone, rating' },
                  { label:'Full activity log',       sub:'Every update timestamped' },
                ].map((f,i,arr)=>(
                  <div key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start', padding:'10px 0', borderBottom: i<arr.length-1 ? '1px solid #f8fafc' : 'none' }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#f59e0b', flexShrink:0, marginTop:'5px' }} />
                    <div>
                      <p style={{ fontSize:'0.83rem', fontWeight:600, color:'#0f172a', marginBottom:'1px' }}>{f.label}</p>
                      <p style={{ fontSize:'0.72rem', color:'#94a3b8' }}>{f.sub}</p>
                    </div>
                  </div>
                ))}
                <Link to="/booking" style={{ textDecoration:'none', display:'block', marginTop:'1.25rem' }}>
                  <button style={{ width:'100%', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', padding:'11px', fontWeight:800, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit' }}>
                    Book a Delivery
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Status card */}
              <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', overflow:'hidden' }}>
                <div style={{ height:'3px', background:'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }} />
                <div style={{ padding:'1.5rem' }}>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
                    <div>
                      <p style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'1.5px', color:'#94a3b8', textTransform:'uppercase', marginBottom:'4px' }}>Tracking ID</p>
                      <p style={{ fontSize:'1.1rem', fontWeight:800, color:'#f59e0b', fontFamily:'monospace', letterSpacing:'2px' }}>{data.trackingId}</p>
                    </div>
                    <span style={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontSize:'0.72rem', fontWeight:700, padding:'5px 12px', borderRadius:'100px', textTransform:'capitalize', flexShrink:0 }}>
                      {status.replace(/_/g,' ')}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom:'1.25rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'7px' }}>
                      <span style={{ fontSize:'0.72rem', color:'#64748b', fontWeight:500 }}>Delivery progress</span>
                      <span style={{ fontSize:'0.72rem', color:'#f59e0b', fontWeight:700 }}>{progress}%</span>
                    </div>
                    <div style={{ height:'8px', background:'#f1f5f9', borderRadius:'100px', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#f59e0b,#fbbf24)', borderRadius:'100px', transition:'width 1s ease' }} />
                    </div>
                  </div>

                  {/* Steps grid */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'7px' }}>
                    {STEPS.map((step, i) => {
                      const done    = i <= stepIdx;
                      const current = i === stepIdx;
                      return (
                        <div key={step.key} style={{ textAlign:'center' }}>
                          <div style={{
                            width:'34px', height:'34px', borderRadius:'50%', margin:'0 auto 5px',
                            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.78rem', fontWeight:700,
                            background: current ? '#f59e0b' : done ? '#dcfce7' : '#f8fafc',
                            border: current ? 'none' : done ? '1.5px solid #bbf7d0' : '1.5px solid #e2e8f0',
                            color: current ? '#0f172a' : done ? '#15803d' : '#cbd5e1',
                            boxShadow: current ? '0 3px 12px rgba(245,158,11,0.4)' : 'none',
                          }}>
                            {done ? (current ? i+1 : '✓') : i+1}
                          </div>
                          <p style={{ fontSize:'0.6rem', color: done ? '#475569' : '#cbd5e1', fontWeight: current ? 700 : 500, lineHeight:1.3 }}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Route card */}
              {booking && (
                <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', padding:'1.5rem' }}>
                  <p style={{ fontSize:'0.68rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'1rem' }}>Shipment Route</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
                    <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                      <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22c55e', border:'2.5px solid #dcfce7', flexShrink:0 }} />
                      <div>
                        <p style={{ fontSize:'0.6rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px' }}>Pickup</p>
                        <p style={{ fontSize:'0.9rem', fontWeight:700, color:'#0f172a' }}>{booking.pickup}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'12px', alignItems:'center', padding:'6px 0' }}>
                      <div style={{ width:'10px', display:'flex', justifyContent:'center', flexShrink:0 }}>
                        <div style={{ width:'1.5px', height:'28px', background:'linear-gradient(#22c55e,#3b82f6)' }} />
                      </div>
                      <div style={{ flex:1, height:'4px', background:'#f1f5f9', borderRadius:'100px', overflow:'hidden' }}>
                        <div style={{ width:`${progress}%`, height:'100%', background:'linear-gradient(90deg,#22c55e,#f59e0b)', transition:'width 1s ease' }} />
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                      <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#3b82f6', border:'2.5px solid #dbeafe', flexShrink:0 }} />
                      <div>
                        <p style={{ fontSize:'0.6rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px' }}>Delivery</p>
                        <p style={{ fontSize:'0.9rem', fontWeight:700, color:'#0f172a' }}>{booking.drop}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'1.1rem' }}>
                    {[['Vehicle', booking.vehicle],['Date', booking.date]].map(([l,v])=>(
                      <div key={l} style={{ background:'#f8fafc', borderRadius:'10px', padding:'10px 12px', border:'1px solid #e2e8f0' }}>
                        <p style={{ fontSize:'0.62rem', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'3px' }}>{l}</p>
                        <p style={{ fontSize:'0.82rem', fontWeight:700, color:'#0f172a' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Driver card */}
              {data.driverName && (
                <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 2px 20px rgba(0,0,0,0.07)', border:'1px solid #e2e8f0', padding:'1.5rem' }}>
                  <p style={{ fontSize:'0.68rem', fontWeight:700, color:'#94a3b8', letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'1rem' }}>Your Driver</p>
                  <div style={{ display:'flex', alignItems:'center', gap:'13px' }}>
                    <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'1.15rem', flexShrink:0 }}>
                      {data.driverName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:'0.92rem', fontWeight:700, color:'#0f172a', marginBottom:'2px' }}>{data.driverName}</p>
                      <p style={{ fontSize:'0.72rem', color:'#64748b', marginBottom:'3px' }}>Verified Driver Partner</p>
                      <p style={{ fontSize:'0.72rem', color:'#f59e0b', fontWeight:700 }}>4.9 / 5.0 Rating</p>
                    </div>
                    {data.driverPhone && (
                      <a href={`tel:${data.driverPhone}`} style={{ background:'#f0fdf4', color:'#15803d', border:'1.5px solid #bbf7d0', borderRadius:'10px', padding:'8px 13px', fontSize:'0.78rem', fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}>
                        Call Driver
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* New booking CTA */}
              <Link to="/booking" style={{ textDecoration:'none' }}>
                <button style={{ width:'100%', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'12px', padding:'12px', fontWeight:800, cursor:'pointer', fontSize:'0.88rem', fontFamily:'inherit', boxShadow:'0 4px 16px rgba(245,158,11,0.25)' }}>
                  Book Another Shipment
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  input, select, button { font-family: inherit; }
  input::placeholder { color: #94a3b8; }
  .leaflet-container { z-index: 1 !important; }
  .track-btn:hover { background: #e09000 !important; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(245,158,11,0.45) !important; }
  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .spin     { display:inline-block; width:16px; height:16px; border:2.5px solid rgba(0,0,0,0.15); border-top-color:#0f172a; border-radius:50%; animation:spin 0.7s linear infinite; }
  .live-dot { animation: pulse 1.8s ease infinite; }
  @media (max-width: 860px) {
    .t-grid { grid-template-columns: 1fr !important; }
  }
`;