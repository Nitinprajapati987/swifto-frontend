import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

const services = [
  {
    id: 'b2b-logistics',
    title: 'B2B Logistics',
    subtitle: 'Factory to Factory Delivery',
    color: 'linear-gradient(135deg, #5b21b6, #8b5cf6)',
    desc: 'End-to-end freight solutions designed for industrial and manufacturing businesses. We handle bulk cargo, raw materials, and finished goods between factories, warehouses, and distribution centers across India.',
    features: ['Same-day pickup available', 'Dedicated fleet options', 'Real-time GPS tracking', 'Factory-level coordination', 'GST billing included'],
  },
  {
    id: 'full-truck-load',
    title: 'Full Truck Load',
    subtitle: 'Dedicated Truck for Your Cargo',
    color: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    desc: 'Book an entire truck exclusively for your shipment. Ideal for large volume consignments that require dedicated transport without any intermediate stops or load sharing.',
    features: ['No intermediate stops', 'Faster delivery timelines', 'All vehicle sizes available', 'Door-to-door service', 'Load insurance available'],
  },
  {
    id: 'part-load',
    title: 'Part Load',
    subtitle: 'Pay Only for Space Used',
    color: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    desc: 'Cost-effective freight for smaller shipments. Your goods share truck space with other consignments — you only pay for the space your cargo occupies, making it ideal for small and medium businesses.',
    features: ['Up to 60% cost saving', 'Regular scheduled routes', 'Suitable for 100kg to 5 ton', 'Consolidated billing', 'Digital proof of delivery'],
  },
  {
    id: 'packers-movers',
    title: 'Packers & Movers',
    subtitle: 'Safe Household & Office Relocation',
    color: 'linear-gradient(135deg, #b45309, #f59e0b)',
    desc: 'Professional packing, loading, transport, and unpacking services for homes, offices, and industrial equipment. Our trained team ensures your belongings are handled with the utmost care.',
    features: ['Professional packing team', 'Fragile goods handling', 'Office & industrial moves', 'Insurance coverage', 'Unpacking assistance'],
  },
  {
    id: 'return-load',
    title: 'Return Load Matching',
    subtitle: 'Zero Empty Trips',
    color: 'linear-gradient(135deg, #be185d, #ec4899)',
    desc: 'Our AI-powered system automatically matches trucks returning from a delivery with new loads on the same route. This eliminates empty return trips, reducing costs for both drivers and shippers.',
    features: ['AI-powered matching', 'Up to 40% cheaper rates', 'Same-day matching', 'Pan-India routes covered', 'Real-time notifications'],
  },
  {
    id: 'container-transport',
    title: 'Container Transport',
    subtitle: '20ft & 40ft Containers',
    color: 'linear-gradient(135deg, #065f46, #10b981)',
    desc: 'Specialized container transport for large volume export and import cargo. We handle 20ft and 40ft ISO containers with flatbed trailers and reach stackers, covering all major ports and ICDs.',
    features: ['20ft & 40ft containers', 'Port connectivity', 'Customs documentation support', 'ISO certified handling', 'Multimodal options'],
  },
  {
    id: 'enterprise-plans',
    title: 'Enterprise Plans',
    subtitle: 'Custom Contracts for Businesses',
    color: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
    desc: 'Tailored logistics contracts for large enterprises with high freight volumes. Get dedicated account managers, custom pricing, SLA guarantees, and integrated reporting dashboards.',
    features: ['Dedicated account manager', 'Custom SLA agreements', 'Volume-based pricing', 'Integrated dashboard', 'Priority support 24/7'],
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    subtitle: 'Connect Your ERP to SWIFTO',
    color: 'linear-gradient(135deg, #3f1f69, #7c3aed)',
    desc: 'Seamlessly connect your existing ERP, WMS, or order management system to the SWIFTO platform via our REST API. Automate booking, tracking, and reporting without leaving your existing workflow.',
    features: ['REST API access', 'Webhook notifications', 'ERP & WMS compatible', 'Sandbox testing environment', 'Developer documentation'],
  },
];

function Services() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <p style={{ color: '#e63946', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What We Offer</p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: '1rem' }}>
          Our <span style={{ color: '#e63946' }}>Services</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 1rem', lineHeight: 1.7 }}>
          From two-wheelers to 40ft containers — every logistics need, handled with speed and precision.
        </p>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5% 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {services.map((s) => (
            <div key={s.id} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>

              {/* Color bar */}
              <div style={{ height: '4px', background: s.color }} />

              <div style={{ padding: '1.75rem' }}>
                {/* Title */}
                <div style={{ marginBottom: '1rem' }}>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: 'white', fontSize: '1.15rem', marginBottom: '0.25rem' }}>{s.title}</h2>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{s.subtitle}</p>
                </div>

                {/* Description */}
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{s.desc}</p>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {s.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e63946', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to="/booking" style={{ textDecoration: 'none' }}>
                  <button style={{ width: '100%', padding: '0.75rem', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)', borderRadius: '10px', color: '#e63946', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Manrope, sans-serif' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e63946'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(230,57,70,0.1)'; e.currentTarget.style.color = '#e63946'; }}>
                    Book This Service
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5% 6rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #e63946, #c1121f)', borderRadius: '24px', padding: '3.5rem 2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
            Not Sure Which Service You Need?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '2rem' }}>
            Our team will assess your requirement and recommend the best solution.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <button style={{ background: 'white', color: '#e63946', border: 'none', borderRadius: '10px', padding: '0.9rem 2rem', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.95rem', cursor: 'pointer' }}>
                Talk to Our Team
              </button>
            </Link>
            <Link to="/booking">
              <button style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '10px', padding: '0.9rem 2rem', fontFamily: 'Manrope, sans-serif', fontWeight: 900, fontSize: '0.95rem', cursor: 'pointer' }}>
                Book Directly
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
}

export default Services;