import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const QUICK_REPLIES = [
  { label:'Book a Delivery', value:'booking' },
  { label:'View Vehicles',   value:'vehicles' },
  { label:'Track Order',     value:'track' },
  { label:'Check Pricing',   value:'price' },
  { label:'Contact Us',      value:'contact' },
];

export default function Chatbot() {
  const [open, setOpen]             = useState(false);
  const [messages, setMessages]     = useState([{ from:'bot', text:'Welcome to SWIFTO!\n\nI am Arjun, your AI Assistant. How may I assist you today?' }]);
  const [input, setInput]           = useState('');
  const [step, setStep]             = useState(0);
  const [bookingData, setBookingData] = useState({ pickup:'', drop:'', vehicle:'' });
  const [listening, setListening]   = useState(false);
  const [speaking, setSpeaking]     = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef   = useRef(null);
  const recognitionRef = useRef(null);
  const navigate    = useNavigate();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);
  useEffect(() => { if (window.speechSynthesis) window.speechSynthesis.getVoices(); }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/\n/g, ' . ').replace(/—/g, ' ');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'hi-IN'; utter.rate = 0.88; utter.pitch = 0.9; utter.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Hemant')) || voices.find(v => v.lang === 'hi-IN') || null;
    if (v) utter.voice = v;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, []);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Please use Chrome for voice support.'); return; }
    const rec = new SR();
    rec.lang = 'hi-IN'; rec.continuous = false; rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onresult = e => { setInput(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const addBot = (text) => { setMessages(p => [...p, { from:'bot', text }]); speak(text); };

  const handleQuick = (value) => {
    const label = QUICK_REPLIES.find(q => q.value === value)?.label || value;
    setMessages(p => [...p, { from:'user', text:label }]);
    setHasInteracted(true);
    setTimeout(() => {
      if (value === 'booking' || value === 'price') { setStep(1); addBot('Let us get started.\n\nPlease enter your Pickup location.'); }
      else if (value === 'vehicles') addBot('We offer:\n\nTwo Wheeler — Up to 20 kg\nCar / Sedan — Up to 100 kg\nSmall Trucks — 7ft to 14ft\nMedium Trucks — 19ft to 24ft\nHeavy Trucks — 28ft to 32ft\nContainers — 20ft to 40ft\n\nType "Book Now" to proceed.');
      else if (value === 'track') { addBot('Redirecting to Tracking...'); setTimeout(() => navigate('/tracking'), 1500); }
      else if (value === 'contact') addBot('Reach us at:\n\nPhone: +91 9179838941\nEmail: info@swifto.in\nAddress: Pithampur, Indore, MP\n\nAvailable 24/7.');
    }, 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const t = input.trim();
    setMessages(p => [...p, { from:'user', text:t }]);
    setInput(''); setHasInteracted(true);
    setTimeout(() => {
      if (step === 1) { setBookingData(p => ({ ...p, pickup:t })); setStep(2); addBot(`Pickup: ${t}\n\nPlease enter your Drop location.`); }
      else if (step === 2) { setBookingData(p => ({ ...p, drop:t })); setStep(3); addBot(`Drop: ${t}\n\nWhich vehicle?\n\n1. Two Wheeler\n2. Car / Sedan\n3. Small Truck (7-14 ft)\n4. Medium Truck (19-24 ft)\n5. Heavy Truck / Container`); }
      else if (step === 3) {
        const vm = {'1':'Two Wheeler','2':'Car / Sedan','3':'Small Truck','4':'Medium Truck','5':'Heavy Truck'};
        const sv = vm[t.trim()] || t;
        setBookingData(p => ({ ...p, vehicle:sv }));
        setStep(0);
        addBot(`Booking Summary:\n\nPickup: ${bookingData.pickup}\nDrop: ${bookingData.drop}\nVehicle: ${sv}\n\nRedirecting to Booking...`);
        setTimeout(() => navigate(`/booking?pickup=${encodeURIComponent(bookingData.pickup)}&drop=${encodeURIComponent(bookingData.drop)}&vehicle=${encodeURIComponent(sv)}`), 2000);
      } else {
        const l = t.toLowerCase();
        if (l.includes('price') || l.includes('rate') || l.includes('cost')) { addBot('Our pricing:\n\nTwo Wheeler: From Rs.49\nCar / Sedan: From Rs.99\nTrucks: Based on route & load\n\nEnter pickup for exact quote.'); setStep(1); }
        else if (l.includes('track') || l.includes('order')) { addBot('Redirecting to Tracking...'); setTimeout(() => navigate('/tracking'), 1500); }
        else if (l.includes('book') || l.includes('delivery') || l.includes('truck')) { setStep(1); addBot('Let us begin your booking.\n\nPlease enter your Pickup location.'); }
        else if (l.match(/hello|hi|hey|namaste/)) addBot('Hello! I am Arjun, SWIFTO AI Assistant.\n\nHow may I help you?');
        else if (l.includes('contact') || l.includes('call')) addBot('Phone: +91 9179838941\nEmail: info@swifto.in\n\nAvailable 24/7.');
        else addBot('I did not understand that.\n\nPlease use the quick options or type:\n- "Book a delivery"\n- "Check pricing"\n- "Track my order"');
      }
    }, 400);
  };

  return (
    <>
      <style>{CHAT_CSS}</style>

      {/* FAB */}
      <button onClick={() => { const o = !open; setOpen(o); if (o && !hasInteracted) setTimeout(() => speak('Welcome to SWIFTO. I am Arjun. How may I help you?'), 300); }}
        style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', width:'56px', height:'56px', borderRadius:'50%', background:'#f59e0b', color:'#0f172a', border:'none', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', boxShadow:'0 8px 24px rgba(245,158,11,0.45)', zIndex:9998, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans', sans-serif", transition:'all 0.2s', letterSpacing:'0.2px' }}
        className="chat-fab">
        {open ? '✕' : 'Chat'}
      </button>

      {open && (
        <div style={{ position:'fixed', bottom:'5.5rem', right:'1.5rem', width:'340px', height:'520px', background:'white', borderRadius:'24px', boxShadow:'0 24px 80px rgba(0,0,0,0.18)', zIndex:9997, display:'flex', flexDirection:'column', overflow:'hidden', border:'1px solid #e2e8f0', fontFamily:"'Plus Jakarta Sans', sans-serif" }} className="chat-window">

          {/* Header */}
          <div style={{ background:'#0f172a', padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:800, color:'#0f172a', flexShrink:0 }} className={speaking ? 'pulse-anim' : ''}>
              AI
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:'0.88rem', fontWeight:700, color:'white', margin:0 }}>Arjun — SWIFTO AI</p>
              <p style={{ fontSize:'0.68rem', color: speaking ? '#f59e0b' : '#22c55e', margin:0 }}>{speaking ? 'Speaking...' : 'Online — 24/7'}</p>
            </div>
            {speaking && (
              <button onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }} style={{ background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'6px', color:'#f87171', fontSize:'0.68rem', fontWeight:700, padding:'3px 8px', cursor:'pointer', fontFamily:'inherit' }}>Mute</button>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'10px' }} className="chat-scroll">
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth:'82%', padding:'10px 14px', borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.from === 'user' ? '#f59e0b' : '#f8fafc', color: m.from === 'user' ? '#0f172a' : '#0f172a', fontSize:'0.82rem', lineHeight:1.65, whiteSpace:'pre-line', border: m.from === 'bot' ? '1px solid #e2e8f0' : 'none', fontWeight: m.from === 'user' ? 600 : 400 }}>
                  {m.text}
                  {m.from === 'bot' && <button onClick={() => speak(m.text)} style={{ marginLeft:'6px', background:'none', border:'none', cursor:'pointer', fontSize:'0.65rem', color:'#94a3b8', padding:0 }}>[Listen]</button>}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {step === 0 && messages.length <= 2 && (
            <div style={{ padding:'8px 12px', display:'flex', flexWrap:'wrap', gap:'6px', borderTop:'1px solid #f1f5f9', flexShrink:0 }}>
              {QUICK_REPLIES.map(q => (
                <button key={q.value} onClick={() => handleQuick(q.value)} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'100px', padding:'5px 12px', fontSize:'0.72rem', fontWeight:600, color:'#475569', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#fffbeb'; e.currentTarget.style.borderColor='#f59e0b'; e.currentTarget.style.color='#b45309'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.color='#475569'; }}>
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:'10px 12px', borderTop:'1px solid #f1f5f9', display:'flex', gap:'7px', flexShrink:0 }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder={listening ? 'Listening...' : step > 0 ? 'Type your answer...' : 'Type a message...'}
              style={{ flex:1, background:'#f8fafc', border:`1.5px solid ${listening ? '#f43f5e' : '#e2e8f0'}`, borderRadius:'10px', padding:'8px 12px', fontSize:'0.82rem', outline:'none', color:'#0f172a', fontFamily:'inherit', transition:'border-color 0.18s' }}
              onFocus={e => { if (!listening) e.target.style.borderColor='#f59e0b'; }} onBlur={e => { if (!listening) e.target.style.borderColor='#e2e8f0'; }} />
            <button onClick={listening ? () => { recognitionRef.current?.stop(); setListening(false); } : startListening} style={{ background: listening ? '#fef2f2' : '#f8fafc', border:`1.5px solid ${listening ? '#fecaca' : '#e2e8f0'}`, borderRadius:'10px', padding:'8px 10px', cursor:'pointer', fontSize:'0.72rem', fontWeight:700, color: listening ? '#f43f5e' : '#64748b', flexShrink:0, fontFamily:'inherit' }}>
              {listening ? 'Stop' : 'Mic'}
            </button>
            <button onClick={handleSend} style={{ background:'#f59e0b', border:'none', borderRadius:'10px', padding:'8px 14px', cursor:'pointer', fontSize:'0.78rem', fontWeight:800, color:'#0f172a', flexShrink:0, fontFamily:'inherit' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const CHAT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .chat-fab:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(245,158,11,0.55) !important; }
  .chat-scroll::-webkit-scrollbar { width: 3px; }
  .chat-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
  @keyframes pulse-ring { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  .pulse-anim { animation: pulse-ring 1s ease infinite; }
  @keyframes slideUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
  .chat-window { animation: slideUp 0.25s ease; }
`;