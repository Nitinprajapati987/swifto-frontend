import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import imgAhmedabad from '../assets/logos/cities/ahmedabad.png';
import imgBangalore from '../assets/logos/cities/bangalore.png';
import imgBhopal from '../assets/logos/cities/bhopal.png';
import imgChandigarh from '../assets/logos/cities/chandigarh.png';
import imgChennai from '../assets/logos/cities/chennai.png';
import imgCoimbatore from '../assets/logos/cities/coimbatore.png';
import imgDelhi from '../assets/logos/cities/delhi.png';
import imgDewas from '../assets/logos/cities/dewas.png';
import imgHyderabad from '../assets/logos/cities/hyderabad.png';
import imgIndore from '../assets/logos/cities/indore.png';
import imgJaipur from '../assets/logos/cities/jaipur.png';
import imgKanpur from '../assets/logos/cities/kanpur.png';
import imgKochi from '../assets/logos/cities/kochi.png';
import imgKolkata from '../assets/logos/cities/kolkata.png';
import imgLucknow from '../assets/logos/cities/lucknow.png';
import imgMumbai from '../assets/logos/cities/mumbai.png';
import imgNagpur from '../assets/logos/cities/nagpur.png';
import imgNashik from '../assets/logos/cities/nashik.png';
import imgPithampur from '../assets/logos/cities/pithampur.png';
import imgPune from '../assets/logos/cities/pune.png';
import imgRaipur from '../assets/logos/cities/raipur.png';
import imgSurat from '../assets/logos/cities/surat.png';
import imgUjjain from '../assets/logos/cities/ujjain.png';
import imgVadodara from '../assets/logos/cities/vadodara.png';

import imgBike from '../assets/logos/vehicles/bike.png';
import imgCar from '../assets/logos/vehicles/car.png';
import imgTruck from '../assets/logos/vehicles/truck.png';
import imgHeavyTruck from '../assets/logos/vehicles/heavytruck.png';
import imgContainer from '../assets/logos/vehicles/container.png';
import imgDumper from '../assets/logos/vehicles/dumper.png';
import imgTanker from '../assets/logos/vehicles/tanker.png';
import imgTrailer from '../assets/logos/vehicles/trailer.png';

import pithampurMap from '../assets/logos/hero/pithampur-map.png';

const cities = [
  { name: 'Indore',      state: 'MP', img: imgIndore },
  { name: 'Pithampur',   state: 'MP', img: imgPithampur },
  { name: 'Ujjain',      state: 'MP', img: imgUjjain },
  { name: 'Bhopal',      state: 'MP', img: imgBhopal },
  { name: 'Dewas',       state: 'MP', img: imgDewas },
  { name: 'Mumbai',      state: 'MH', img: imgMumbai },
  { name: 'Pune',        state: 'MH', img: imgPune },
  { name: 'Nagpur',      state: 'MH', img: imgNagpur },
  { name: 'Nashik',      state: 'MH', img: imgNashik },
  { name: 'Delhi',       state: 'DL', img: imgDelhi },
  { name: 'Jaipur',      state: 'RJ', img: imgJaipur },
  { name: 'Ahmedabad',   state: 'GJ', img: imgAhmedabad },
  { name: 'Surat',       state: 'GJ', img: imgSurat },
  { name: 'Vadodara',    state: 'GJ', img: imgVadodara },
  { name: 'Hyderabad',   state: 'TS', img: imgHyderabad },
  { name: 'Bangalore',   state: 'KA', img: imgBangalore },
  { name: 'Chennai',     state: 'TN', img: imgChennai },
  { name: 'Coimbatore',  state: 'TN', img: imgCoimbatore },
  { name: 'Kolkata',     state: 'WB', img: imgKolkata },
  { name: 'Lucknow',     state: 'UP', img: imgLucknow },
  { name: 'Kanpur',      state: 'UP', img: imgKanpur },
  { name: 'Chandigarh',  state: 'PB', img: imgChandigarh },
  { name: 'Raipur',      state: 'CG', img: imgRaipur },
  { name: 'Kochi',       state: 'KL', img: imgKochi },
];

const vehicles = [
  { label: 'Two Wheeler',     value: 'Two Wheeler',     img: imgBike,       desc: 'Small parcels' },
  { label: 'Car / Sedan',     value: 'Car / Sedan',     img: imgCar,        desc: 'Light cargo' },
  { label: '7 ft Truck',      value: '7 ft Truck',      img: imgTruck,      desc: 'Upto 1 ton' },
  { label: '10 ft Truck',     value: '10 ft Truck',     img: imgTruck,      desc: 'Upto 2 ton' },
  { label: '14 ft Truck',     value: '14 ft Truck',     img: imgTruck,      desc: 'Upto 4 ton' },
  { label: '19 ft Truck',     value: '19 ft Truck',     img: imgHeavyTruck, desc: 'Upto 7 ton' },
  { label: '22 ft Truck',     value: '22 ft Truck',     img: imgHeavyTruck, desc: 'Upto 9 ton' },
  { label: '24 ft Truck',     value: '24 ft Truck',     img: imgHeavyTruck, desc: 'Upto 12 ton' },
  { label: '32 ft Truck',     value: '32 ft Truck',     img: imgHeavyTruck, desc: 'Upto 15 ton' },
  { label: '40 ft Container', value: '40 ft Container', img: imgContainer,  desc: 'Upto 25 ton' },
  { label: 'Dumper',          value: 'Dumper',          img: imgDumper,     desc: 'Construction' },
  { label: 'Tanker',          value: 'Tanker',          img: imgTanker,     desc: 'Liquids' },
  { label: 'Trailer',         value: 'Trailer',         img: imgTrailer,    desc: 'Heavy load' },
];

function CityPopup({ onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '780px', maxHeight: '88vh', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.75rem 1.75rem 1rem', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#111', margin: 0 }}>Select Your City</h2>
            <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>X</button>
          </div>
          <input autoFocus type="text" placeholder="Search city..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid #e5e5e5', background: '#fafafa', fontSize: '0.9rem', outline: 'none', color: '#111', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e5e5e5'} />
        </div>
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {filtered.map((city) => (
              <div key={city.name} onClick={() => onSelect(city.name)}
                style={{ cursor: 'pointer', textAlign: 'center', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #ebebeb', transition: 'all 0.2s', background: 'white' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(245,158,11,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ebebeb'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ height: '120px', overflow: 'hidden', position: 'relative' }}>
                  <img src={city.img} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(255,255,255,0.95)', fontSize: '0.55rem', fontWeight: 800, color: '#374151', padding: '2px 6px', borderRadius: '5px' }}>{city.state}</span>
                </div>
                <div style={{ padding: '0.6rem' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.82rem', color: '#111', margin: 0 }}>{city.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VehiclePopup({ onSelect, onClose, selected }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '720px', maxHeight: '88vh', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.75rem 1.75rem 1.25rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#111', margin: '0 0 4px' }}>Select Vehicle Type</h2>
            <p style={{ color: '#888', fontSize: '0.82rem', margin: 0 }}>Choose based on your load requirement</p>
          </div>
          <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontWeight: 700, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem' }}>X</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '0.85rem' }}>
            {vehicles.map((v) => {
              const isSelected = selected === v.value;
              return (
                <div key={v.value} onClick={() => onSelect(v.value)}
                  style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: isSelected ? '2px solid #f59e0b' : '1.5px solid #ebebeb', background: isSelected ? '#fffbeb' : 'white', transition: 'all 0.2s' }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(245,158,11,0.12)'; }}}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#ebebeb'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}}>
                  <div style={{ height: '100px', background: isSelected ? '#fef3c7' : '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', position: 'relative' }}>
                    <img src={v.img} alt={v.label} style={{ maxWidth: '100%', maxHeight: '75px', objectFit: 'contain' }} />
                    {isSelected && <span style={{ position: 'absolute', top: '6px', right: '8px', background: '#f59e0b', color: 'white', fontSize: '0.55rem', fontWeight: 800, padding: '2px 7px', borderRadius: '10px' }}>Selected</span>}
                  </div>
                  <div style={{ padding: '0.65rem 0.75rem 0.75rem' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.82rem', color: isSelected ? '#d97706' : '#111', margin: '0 0 2px' }}>{v.label}</p>
                    <p style={{ fontSize: '0.7rem', color: '#aaa', margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [showVehiclePopup, setShowVehiclePopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Indore');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!pickup || !drop || !vehicle) {
      alert('Please fill pickup, drop location and select vehicle!');
      return;
    }
    navigate('/booking?pickup=' + encodeURIComponent(pickup) + '&drop=' + encodeURIComponent(drop) + '&vehicle=' + encodeURIComponent(vehicle));
  };

  const selectedVehicle = vehicles.find(v => v.value === vehicle);

  return (
    <>
      {showCityPopup && <CityPopup onSelect={(c) => { setSelectedCity(c); setPickup(c); setShowCityPopup(false); }} onClose={() => setShowCityPopup(false)} />}
      {showVehiclePopup && <VehiclePopup selected={vehicle} onSelect={(v) => { setVehicle(v); setShowVehiclePopup(false); }} onClose={() => setShowVehiclePopup(false)} />}

      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '5rem 5% 3rem',
        position: 'relative', overflow: 'hidden',
        backgroundImage: `url(${pithampurMap})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        {/* Gradient overlay — dark left, lighter right */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 100%)' }} />

        {/* Decorative glow */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(245,158,11,0.08)', zIndex: 1, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '30%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(245,158,11,0.06)', zIndex: 1, filter: 'blur(50px)' }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem', alignItems: 'center',
        }}>

          {/* LEFT — Hero Text */}
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '1.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
              India's No.1 Logistics Platform
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', color: 'white', marginBottom: '1.25rem' }}>
              Move Goods.<br />
              <span style={{ color: '#f59e0b' }}>Move Faster.</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '420px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              India's most trusted B2B logistics network. Two Wheelers to 40ft Containers — delivered on time, every time.
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                ['2,500+', 'Active Drivers'],
                ['100+', 'Trips Completed'],
                ['10 Min', 'Confirmation'],
              ].map(([num, label]) => (
                <div key={label} style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '12px' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['No Hidden Charges', '24hr Support', 'Live Tracking'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '0.35rem 0.85rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Booking Card */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 24px 80px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)' }}>

            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 2px' }}>Instant Booking</p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111', margin: 0 }}>Truck Confirmed in 10 Minutes</p>
              </div>
              <button onClick={() => setShowCityPopup(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '100px', padding: '0.4rem 0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fef3c7'; e.currentTarget.style.borderColor = '#f59e0b'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fffbeb'; e.currentTarget.style.borderColor = '#fde68a'; }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400e' }}>{selectedCity}</span>
                <span style={{ fontSize: '0.65rem', color: '#d97706' }}>&#9660;</span>
              </button>
            </div>

            {/* Pickup / Drop */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '2px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#22c55e', border: '2px solid #dcfce7' }} />
                <div style={{ width: '2px', height: '30px', background: 'linear-gradient(#22c55e, #3b82f6)', margin: '3px 0' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#3b82f6', border: '2px solid #dbeafe' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                <input type="text" placeholder="Pickup address..." value={pickup} onChange={e => setPickup(e.target.value)}
                  style={{ background: '#f9fafb', color: '#111', padding: '0.85rem 1rem', borderRadius: '10px', width: '100%', outline: 'none', border: '1.5px solid #e5e7eb', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                <input type="text" placeholder="Drop address..." value={drop} onChange={e => setDrop(e.target.value)}
                  style={{ background: '#f9fafb', color: '#111', padding: '0.85rem 1rem', borderRadius: '10px', width: '100%', outline: 'none', border: '1.5px solid #e5e7eb', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
            </div>

            <div style={{ height: '1px', background: '#f3f4f6', margin: '1rem 0' }} />

            {/* Vehicle Select */}
            <button onClick={() => setShowVehiclePopup(true)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: vehicle ? '#fffbeb' : '#f9fafb', border: vehicle ? '1.5px solid #f59e0b' : '1.5px solid #e5e7eb', borderRadius: '12px', padding: '0.8rem 1rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', marginBottom: '1.25rem' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.background = '#fffbeb'; }}
              onMouseLeave={e => { if (!vehicle) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {selectedVehicle
                  ? <img src={selectedVehicle.img} alt={selectedVehicle.label} style={{ width: '38px', height: '28px', objectFit: 'contain' }} />
                  : <div style={{ width: '38px', height: '28px', background: '#f3f4f6', borderRadius: '6px' }} />
                }
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: vehicle ? '#111' : '#9ca3af' }}>
                  {vehicle ? selectedVehicle.label : 'Select vehicle type...'}
                </span>
              </div>
              <span style={{ color: '#d97706', fontSize: '0.75rem' }}>&#9660;</span>
            </button>

            {/* CTA Button */}
            <button onClick={handleSearch}
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', width: '100%', padding: '1rem', borderRadius: '12px', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 6px 24px rgba(245,158,11,0.45)', transition: 'all 0.2s', letterSpacing: '0.3px' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(245,158,11,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,158,11,0.45)'; }}>
              Get Best Price
            </button>

            {/* Footer trust */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginTop: '1rem' }}>
              {['No Hidden Charges', '10 Min Confirmation', '24hr Support'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#9ca3af' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
          input::placeholder { color: #9ca3af !important; }
        `}</style>
      </div>
    </>
  );
}

export default Hero;