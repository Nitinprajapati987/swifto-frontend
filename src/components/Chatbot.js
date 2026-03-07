import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Namaste! 🙏 Main SWIFTO ka AI Assistant Arjun hoon!\n\nAapki kya madad kar sakta hoon?' },
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
    // Preload voices
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
      .replace(/[🙏🚀✅📍📦🚛🚢🚜🛵🚗💰📞📧⏰🤖😅]/g, '')
      .replace(/\n/g, ' । ')
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
      alert('Voice support ke liye Chrome use karo!');
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
    { label: '📦 Delivery Book Karo', value: 'booking' },
    { label: '🚛 Vehicles Dekho', value: 'vehicles' },
    { label: '📍 Order Track Karo', value: 'track' },
    { label: '💰 Price Jaano', value: 'price' },
    { label: '📞 Contact Karo', value: 'contact' },
  ];

  const handleQuick = (value) => {
    const userMsg = quickReplies.find(q => q.value === value)?.label || value;
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setHasInteracted(true);

    setTimeout(() => {
      if (value === 'booking' || value === 'price') {
        setStep(1);
        addBotMsg('Bilkul! Chalo shuru karte hain! 🚀\n\nPehle batao — Pickup location kahan se hai?');
      } else if (value === 'vehicles') {
        addBotMsg('Hamare paas yeh vehicles hain:\n\n🛵 Two Wheeler — Upto 20 kg\n🚗 Car / Sedan — Upto 100 kg\n🚛 Small Trucks — 7ft to 14ft\n🚚 Medium Trucks — 19ft to 24ft\n🚛 Heavy Trucks — 28ft to 32ft\n🚢 Containers — 20ft to 40ft\n🚜 Special — Dumper, Tanker, Flatbed\n\nKaunsa chahiye? Booking ke liye "Book Karo" likho!');
      } else if (value === 'track') {
        addBotMsg('Track page pe bhej raha hoon! 📍');
        setTimeout(() => navigate('/tracking'), 1500);
      } else if (value === 'contact') {
        addBotMsg('Hamse contact karo:\n\n📞 +91 98765 43210\n📧 support@swifto.in\n📍 Pithampur, Indore, MP\n\n✅ 24/7 available hain — call karo ya WhatsApp karo!');
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
        addBotMsg(`📍 Pickup: ${userText} ✅\n\nAb batao — Drop location kahan hai?`);
      } else if (step === 2) {
        setBookingData(prev => ({ ...prev, drop: userText }));
        setStep(3);
        addBotMsg(`📦 Drop: ${userText} ✅\n\nKaunsa vehicle chahiye?\n\n1️⃣ Two Wheeler\n2️⃣ Car / Sedan\n3️⃣ Small Truck (7-14 ft)\n4️⃣ Medium Truck (19-24 ft)\n5️⃣ Heavy / Container\n\nNumber ya naam likho!`);
      } else if (step === 3) {
        const vehicleMap = {
          '1': 'Two Wheeler', '2': 'Car / Sedan',
          '3': 'Small Truck', '4': 'Medium Truck', '5': 'Heavy Truck',
        };
        const selectedVehicle = vehicleMap[userText.trim()] || userText;
        setBookingData(prev => ({ ...prev, vehicle: selectedVehicle }));
        setStep(0);
        addBotMsg(`✅ Summary:\n\n📍 Pickup: ${bookingData.pickup}\n📦 Drop: ${bookingData.drop}\n🚛 Vehicle: ${selectedVehicle}\n\nBooking page pe bhej raha hoon! 🚀`);
        setTimeout(() => {
          navigate(`/booking?pickup=${encodeURIComponent(bookingData.pickup)}&drop=${encodeURIComponent(bookingData.drop)}&vehicle=${encodeURIComponent(selectedVehicle)}`);
        }, 2000);
      } else {
        // General responses
        const lower = userText.toLowerCase();
        if (lower.includes('price') || lower.includes('rate') || lower.includes('kitna') || lower.includes('cost')) {
          addBotMsg('Price route aur vehicle pe depend karti hai:\n\n🛵 Bike: ₹49 se shuru\n🚗 Car: ₹99 se shuru\n🚛 Truck: Route ke hisaab se\n\nExact price ke liye ab batao — Pickup kahan se?');
          setStep(1);
        } else if (lower.includes('track') || lower.includes('order') || lower.includes('kahan hai')) {
          addBotMsg('Track page pe ja raha hoon! 📍');
          setTimeout(() => navigate('/tracking'), 1500);
        } else if (lower.includes('book') || lower.includes('delivery') || lower.includes('truck') || lower.includes('chahiye')) {
          setStep(1);
          addBotMsg('Booking shuru karte hain! 🚀\n\nPehle batao — Pickup location kahan se hai?');
        } else if (lower.match(/namaste|hello|hi|helo|hola|hey/)) {
          addBotMsg('Namaste! 🙏 Main SWIFTO Assistant Arjun hoon!\n\nKya karein?\n📦 Delivery book karein\n📍 Order track karein\n💰 Price jaanein\n\nBatao kya madad chahiye!');
        } else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone')) {
          addBotMsg('Hamse baat karo:\n\n📞 +91 98765 43210\n📧 support@swifto.in\n\n24/7 available hain! 😊');
        } else {
          addBotMsg('Samajh nahi aaya 😅\n\nNeeche ke buttons use karo ya directly likho:\n● "Booking karo"\n● "Price batao"\n● "Order track karo"\n● "Contact karo"');
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
        speak('Namaste! Main SWIFTO ka Assistant Arjun hoon. Aapki kya madad kar sakta hoon?');
      }, 300);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black w-16 h-16 rounded-full text-3xl shadow-2xl shadow-yellow-400/30 z-50 hover:bg-yellow-300 transition-all duration-200 hover:scale-110 flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-700"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-black px-4 py-3 flex items-center gap-3 border-b border-gray-800">
            <div className={`w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${speaking ? 'animate-pulse' : ''}`}>
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">Arjun — SWIFTO AI</p>
              <p className={`text-xs ${speaking ? 'text-yellow-400' : 'text-green-400'}`}>
                {speaking ? '🔊 Bol raha hoon...' : '● Online — 24/7'}
              </p>
            </div>
            {speaking && (
              <button
                onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false); }}
                className="text-red-400 text-xs hover:text-red-300 flex-shrink-0"
              >
                🔇
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
                      title="Sunao"
                    >
                      🔊
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies — only show at start */}
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
              placeholder={listening ? '🎤 Sun raha hoon...' : step > 0 ? 'Jawab do...' : 'Message likho ya bolo...'}
              className={`flex-1 bg-gray-800 text-white px-3 py-2 rounded-xl text-sm outline-none border transition-colors ${
                listening ? 'border-red-400' : 'border-gray-700 focus:border-yellow-400'
              }`}
            />
            <button
              onClick={listening ? stopListening : startListening}
              className={`px-3 py-2 rounded-xl font-bold transition text-base flex-shrink-0 ${
                listening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={listening ? 'Stop' : 'Voice input'}
            >
              {listening ? '⏹' : '🎤'}
            </button>
            <button
              onClick={handleSend}
              className="bg-yellow-400 text-black px-3 py-2 rounded-xl font-bold hover:bg-yellow-300 transition flex-shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;