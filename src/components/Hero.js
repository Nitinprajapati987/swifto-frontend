import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ 3 naye imports add kiye — Bhopal, Dewas, Hyderabad
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

import hero1 from '../assets/logos/hero/hero1.png';
import hero2 from '../assets/logos/hero/hero2.png';
import hero3 from '../assets/logos/hero/hero3.png';
import hero4 from '../assets/logos/hero/hero4.png';
import hero5 from '../assets/logos/hero/hero5.png';
import hero6 from '../assets/logos/hero/hero6.png';

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

const cities = [
  { name: 'Indore',      state: 'MP', img: imgIndore },
  { name: 'Pithampur',   state: 'MP', img: imgPithampur },
  { name: 'Ujjain',      state: 'MP', img: imgUjjain },
  { name: 'Bhopal',      state: 'MP', img: imgBhopal },      // Fixed
  { name: 'Dewas',       state: 'MP', img: imgDewas },       // Fixed
  { name: 'Mumbai',      state: 'MH', img: imgMumbai },
  { name: 'Pune',        state: 'MH', img: imgPune },
  { name: 'Nagpur',      state: 'MH', img: imgNagpur },
  { name: 'Nashik',      state: 'MH', img: imgNashik },
  { name: 'Delhi',       state: 'DL', img: imgDelhi },
  { name: 'Jaipur',      state: 'RJ', img: imgJaipur },
  { name: 'Ahmedabad',   state: 'GJ', img: imgAhmedabad },
  { name: 'Surat',       state: 'GJ', img: imgSurat },
  { name: 'Vadodara',    state: 'GJ', img: imgVadodara },
  { name: 'Hyderabad',   state: 'TS', img: imgHyderabad },   // Fixed
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '780px', maxHeight: '88vh', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.75rem 1.75rem 1rem', borderBottom: '1px solid #f0f2ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#1a1a2e', margin: 0 }}>Select City</h2>
            <button onClick={onClose} style={{ background: '#f5f7ff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.1rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>X</button>
          </div>
          <input autoFocus type="text" placeholder="Search city or state..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid #e8eaff', background: '#f5f7ff', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', color: '#1a1a2e', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = '#e8eaff'} />
        </div>
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {filtered.map((city) => (
              <div key={city.name} onClick={() => onSelect(city.name)}
                style={{ cursor: 'pointer', textAlign: 'center', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #e8eaff', transition: 'all 0.2s', background: 'white' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(67,97,238,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '130px', overflow: 'hidden', position: 'relative' }}>
                  <img src={city.img} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(255,255,255,0.92)', fontSize: '0.55rem', fontWeight: 800, color: '#374151', padding: '2px 6px', borderRadius: '5px' }}>{city.state}</span>
                </div>
                <div style={{ padding: '0.6rem 0.4rem' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#1a1a2e', margin: 0 }}>{city.name}</p>
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '720px', maxHeight: '88vh', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.75rem 1.75rem 1.25rem', borderBottom: '1px solid #f0f2ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 900, color: '#1a1a2e', margin: '0 0 4px 0' }}>Select Vehicle</h2>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Select as per your load requirement</p>
          </div>
          <button onClick={onClose} style={{ background: '#f5f7ff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1.1rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>X</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.75rem 1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem' }}>
            {vehicles.map((v) => {
              const isSelected = selected === v.value;
              return (
                <div key={v.value} onClick={() => onSelect(v.value)}
                  style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: isSelected ? '2px solid #4361ee' : '1.5px solid #e8eaff', background: isSelected ? '#eef0ff' : 'white', transition: 'all 0.2s', boxShadow: isSelected ? '0 4px 16px rgba(67,97,238,0.2)' : 'none' }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(67,97,238,0.12)'; }}}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}}
                >
                  <div style={{ height: '110px', background: isSelected ? '#dde3ff' : '#f5f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '12px' }}>
                    <img src={v.img} alt={v.label} style={{ maxWidth: '100%', maxHeight: '85px', objectFit: 'contain' }} />
                    {isSelected && <span style={{ position: 'absolute', top: '6px', right: '8px', background: '#4361ee', color: 'white', fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>Selected</span>}
                  </div>
                  <div style={{ padding: '0.7rem 0.75rem 0.8rem' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: isSelected ? '#4361ee' : '#1a1a2e', margin: '0 0 3px 0' }}>{v.label}</p>
                    <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>{v.desc}</p>
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
  const [currentImg, setCurrentImg] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

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

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '6rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>

        {heroImages.map((img, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(' + img + ')', backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === currentImg ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }} />
        ))}

        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.45)' }} />

        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
          {heroImages.map((_, i) => (
            <div key={i} onClick={() => setCurrentImg(i)}
              style={{ width: i === currentImg ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === currentImg ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '0.78rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '1.5rem', backdropFilter: 'blur(8px)' }}>
            India's #1 AI-Powered Logistics Platform
          </div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', color: 'white', marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Fast. Safe. <span style={{ color: '#f59e0b' }}>Reliable.</span>
          </h1>
          <p style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Fast & Reliable Logistics Across India</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            India's most trusted logistics platform - From Two Wheelers to 40ft Containers, delivered on time.
          </p>

          <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 8px 48px rgba(0,0,0,0.25)', textAlign: 'left', border: '1px solid rgba(67,97,238,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.72rem', color: '#4361ee', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Truck Confirmed in 10 Minutes</p>
              <button onClick={() => setShowCityPopup(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#eef0ff', border: '1.5px solid #4361ee', borderRadius: '100px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#dde3ff'}
                onMouseLeave={e => e.currentTarget.style.background = '#eef0ff'}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e' }}>{selectedCity}</span>
                <span style={{ fontSize: '0.7rem', color: '#4361ee' }}>v</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ width: '2px', height: '28px', background: '#d1d5db', margin: '3px 0' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4361ee' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <input type="text" placeholder="Enter pickup address..." value={pickup} onChange={e => setPickup(e.target.value)}
                  style={{ background: '#f5f7ff', color: '#1a1a2e', padding: '0.85rem 1rem', borderRadius: '10px', width: '100%', outline: 'none', border: '1.5px solid #e8eaff', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = '#e8eaff'} />
                <input type="text" placeholder="Enter drop address..." value={drop} onChange={e => setDrop(e.target.value)}
                  style={{ background: '#f5f7ff', color: '#1a1a2e', padding: '0.85rem 1rem', borderRadius: '10px', width: '100%', outline: 'none', border: '1.5px solid #e8eaff', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = '#4361ee'} onBlur={e => e.target.style.borderColor = '#e8eaff'} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0f2ff', margin: '1rem 0' }} />

            <button onClick={() => setShowVehiclePopup(true)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: vehicle ? '#eef0ff' : '#f5f7ff', border: vehicle ? '1.5px solid #4361ee' : '1.5px solid #e8eaff', borderRadius: '12px', padding: '0.75rem 1rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', marginBottom: '1rem' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#4361ee'; e.currentTarget.style.background = '#eef0ff'; }}
              onMouseLeave={e => { if (!vehicle) { e.currentTarget.style.borderColor = '#e8eaff'; e.currentTarget.style.background = '#f5f7ff'; }}}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {selectedVehicle ? (
                  <img src={selectedVehicle.img} alt={selectedVehicle.label} style={{ width: '36px', height: '28px', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontSize: '1.3rem' }}></span>
                )}
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: vehicle ? '#1a1a2e' : '#9ca3af' }}>
                  {vehicle ? selectedVehicle.label : 'Select vehicle type...'}
                </span>
              </div>
              <span style={{ color: '#4361ee', fontSize: '0.8rem' }}>v</span>
            </button>

            <button onClick={handleSearch}
              style={{ background: '#4361ee', color: 'white', width: '100%', padding: '1rem', borderRadius: '12px', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(67,97,238,0.35)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = '#3451d1'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.background = '#4361ee'; e.target.style.transform = 'translateY(0)'; }}>
              Get Best Price
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.72rem', color: '#6b7280' }}>
              <span>No Hidden Charges</span>
              <span>10 Min Confirmation</span>
              <span>24hr Support</span>
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
          input::placeholder { color: #9ca3af; }
        `}</style>
      </div>
    </>
  );
}

export default Hero;