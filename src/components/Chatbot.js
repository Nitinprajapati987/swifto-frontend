import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to SWIFTO! I am Arjun, your AI Assistant.\n\nHow may I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({ pickup: '', drop: '', vehicle: '' });
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
      .replace(/\n/g, ' . ')
      .replace(/—/g, ' ');

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'hi-IN';
    utter.rate = 0.88;
    utter.pitch = 0.9;
    utter.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice =
      voices.find(v => v.name.includes('Hemant')) ||
      voices.find(v => v.lang === 'hi-IN' && !v.name.includes('Kalpana')) ||
      voices.find(v => v.lang === 'hi-IN') ||
      null;

    if (hindiVoice) utter.voice = hindiVoice;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Please use Chrome for voice support.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const addBotMsg = (text) => {
    setMessages(prev => [...prev, { from: 'bot', text }]);
    speak(text);
  };

  const quickReplies = [
    { label: 'Book a Delivery', value: 'booking' },
    { label: 'View Vehicles', value: 'vehicles' },
    { label: 'Track Order', value: 'track' },
    { label: 'Check Pricing', value: 'price' },
    { label: 'Contact Us', value: 'contact' },
  ];

  const handleQuick = (value) => {
    const userMsg = quickReplies.find(q => q.value === value)?.label || value;
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setHasInteracted(true);

    setTimeout(() => {
      if (value === 'booking' || value === 'price') {
        setStep(1);
        addBotMsg('Great! Let us get started.\n\nPlease enter your Pickup location.');
      } else if (value === 'vehicles') {
        addBotMsg('We offer the following vehicles:\n\nTwo Wheeler - Up to 20 kg\nCar / Sedan - Up to 100 kg\nSmall Trucks - 7ft to 14ft\nMedium Trucks - 19ft to 24ft\nHeavy Trucks - 28ft to 32ft\nContainers - 20ft to 40ft\nSpecial Vehicles - Dumper, Tanker, Flatbed\n\nType "Book Now" to proceed with a booking.');
      } else if (value === 'track') {
        addBotMsg('Redirecting you to the Tracking page...');
        setTimeout(() => navigate('/tracking'), 1500);
      } else if (value === 'contact') {
        addBotMsg('You can reach us at:\n\nPhone: +91 98765 43210\nEmail: support@swifto.in\nAddress: Pithampur, Indore, MP\n\nWe are available 24/7 — call or WhatsApp us anytime.');
      }
    }, 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setHasInteracted(true);

    setTimeout(() => {
      if (step === 1) {
        setBookingData(prev => ({ ...prev, pickup: userText }));
        setStep(2);
        addBotMsg(`Pickup Location: ${userText}\n\nPlease enter your Drop location.`);
      } else if (step === 2) {
        setBookingData(prev => ({ ...prev, drop: userText }));
        setStep(3);
        addBotMsg(`Drop Location: ${userText}\n\nWhich vehicle do you need?\n\n1. Two Wheeler\n2. Car / Sedan\n3. Small Truck (7-14 ft)\n4. Medium Truck (19-24 ft)\n5. Heavy Truck / Container\n\nEnter a number or vehicle name.`);
      } else if (step === 3) {
        const vehicleMap = {
          '1': 'Two Wheeler', '2': 'Car / Sedan',
          '3': 'Small Truck', '4': 'Medium Truck', '5': 'Heavy Truck',
        };
        const selectedVehicle = vehicleMap[userText.trim()] || userText;
        setBookingData(prev => ({ ...prev, vehicle: selectedVehicle }));
        setStep(0);
        addBotMsg(`Booking Summary:\n\nPickup: ${bookingData.pickup}\nDrop: ${bookingData.drop}\nVehicle: ${selectedVehicle}\n\nRedirecting you to the Booking page...`);
        setTimeout(() => {
          navigate(`/booking?pickup=${encodeURIComponent(bookingData.pickup)}&drop=${encodeURIComponent(bookingData.drop)}&vehicle=${encodeURIComponent(selectedVehicle)}`);
        }, 2000);
      } else {
        const lower = userText.toLowerCase();
        if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('kitna')) {
          addBotMsg('Our pricing depends on route and vehicle type:\n\nTwo Wheeler: Starting at Rs.49\nCar / Sedan: Starting at Rs.99\nTrucks: Based on route and load\n\nFor an exact quote, please enter your Pickup location.');
          setStep(1);
        } else if (lower.includes('track') || lower.includes('order') || lower.includes('kahan')) {
          addBotMsg('Redirecting you to the Tracking page...');
          setTimeout(() => navigate('/tracking'), 1500);
        } else if (lower.includes('book') || lower.includes('delivery') || lower.includes('truck') || lower.includes('vehicle')) {
          setStep(1);
          addBotMsg('Let us begin your booking.\n\nPlease enter your Pickup location.');
        } else if (lower.match(/hello|hi|hey|namaste/)) {
          addBotMsg('Hello! I am Arjun, SWIFTO AI Assistant.\n\nI can help you with:\n- Book a Delivery\n- Track your Order\n- Check Pricing\n\nHow may I assist you?');
        } else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone')) {
          addBotMsg('You can reach us at:\n\nPhone: +91 98765 43210\nEmail: support@swifto.in\n\nWe are available 24/7.');
        } else {
          addBotMsg('I am sorry, I did not understand that.\n\nPlease use the quick options below or type:\n- "Book a delivery"\n- "Check pricing"\n- "Track my order"\n- "Contact us"');
        }
      }
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen && !hasInteracted) {
      setTimeout(() => {
        speak('Welcome to SWIFTO. I am Arjun, your AI Assistant. How may I help you?');
      }, 300);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black w-16 h-16 rounded-full text-sm font-bold shadow-2xl shadow-yellow-400/30 z-50 hover:bg-yellow-300 transition-all duration-200 hover:scale-110 flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? 'Close' : 'Chat'}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-700"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-black px-4 py-3 flex items-center gap-3 border-b border-gray-800">
            <div className={`w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${speaking ? 'animate-pulse' : ''}`}>
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">Arjun — SWIFTO AI</p>
              <p className={`text-xs ${speaking ? 'text-yellow-400' : 'text-green-400'}`}>
                {speaking ? 'Speaking...' : 'Online — 24/7'}
              </p>
            </div>
            {speaking && (
              <button
                onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }}
                className="text-red-400 text-xs hover:text-red-300 flex-shrink-0"
              >
                Mute
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] whitespace-pre-line leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-yellow-400 text-black rounded-br-sm font-medium'
                    : 'bg-gray-800 text-white rounded-bl-sm border border-gray-700'
                }`}>
                  {msg.text}
                  {msg.from === 'bot' && (
                    <button
                      onClick={() => speak(msg.text)}
                      className="ml-2 text-gray-500 hover:text-yellow-400 text-xs align-middle"
                      title="Listen"
                    >
                      [Listen]
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          {step === 0 && messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button
                  key={q.value}
                  onClick={() => handleQuick(q.value)}
                  className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full hover:bg-yellow-400 hover:text-black transition border border-gray-700 hover:border-yellow-400"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? 'Listening...' : step > 0 ? 'Type your answer...' : 'Type a message...'}
              className={`flex-1 bg-gray-800 text-white px-3 py-2 rounded-xl text-sm outline-none border transition-colors ${
                listening ? 'border-red-400' : 'border-gray-700 focus:border-yellow-400'
              }`}
            />
            <button
              onClick={listening ? stopListening : startListening}
              className={`px-3 py-2 rounded-xl font-bold transition text-xs flex-shrink-0 ${
                listening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={listening ? 'Stop' : 'Voice Input'}
            >
              {listening ? 'Stop' : 'Voice'}
            </button>
            <button
              onClick={handleSend}
              className="bg-yellow-400 text-black px-3 py-2 rounded-xl font-bold hover:bg-yellow-300 transition flex-shrink-0 text-xs"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;