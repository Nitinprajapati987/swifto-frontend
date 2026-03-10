import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const STATUS_OPTIONS = [
  { value: 'confirmed',        label: 'Confirmed',        color: '#4361ee' },
  { value: 'driver_assigned',  label: 'Driver Assigned',  color: '#7209b7' },
  { value: 'picked_up',        label: 'Picked Up',        color: '#f77f00' },
  { value: 'in_transit',       label: 'In Transit',       color: '#023e8a' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: '#0077b6' },
  { value: 'delivered',        label: 'Delivered',        color: '#2d6a4f' },
  { value: 'cancelled',        label: 'Cancelled',        color: '#ef4444' },
];

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('bookings');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [driverModal, setDriverModal] = useState(null);
  const [driverForm, setDriverForm] = useState({ driverName: '', driverPhone: '' });
  const [statusModal, setStatusModal] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('swifto_token');
    const user  = JSON.parse(localStorage.getItem('swifto_user') || '{}');
    if (!token || user.role !== 'admin') {
      alert('Admin access only!');
      navigate('/login');
    } else {
      fetchAll();
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, b, u] = await Promise.all([
        api.get('/api/admin/stats'),
        api.get('/api/admin/bookings'),
        api.get('/api/admin/users'),
      ]);
      setStats(s.data);
      setBookings(b.data.bookings);
      setUsers(u.data.users);
    } catch (err) {
      alert('Fetch failed: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const updateStatus = async () => {
    try {
      await api.patch(`/api/admin/bookings/${statusModal._id}`, { status: newStatus });
      alert('Status updated!');
      setStatusModal(null);
      fetchAll();
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const assignDriver = async () => {
    try {
      await api.patch(`/api/admin/bookings/${driverModal._id}/driver`, driverForm);
      alert('Driver assigned!');
      setDriverModal(null);
      setDriverForm({ driverName: '', driverPhone: '' });
      fetchAll();
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.phone?.includes(search)
  );

  const getStatusColor = (status) => STATUS_OPTIONS.find(s => s.value === status)?.color || '#6b7280';

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#4361ee', fontWeight: 700, fontSize: '1.2rem' }}>Loading Admin Panel...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7ff' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Manrope,sans-serif', fontSize: '2rem', fontWeight: 900, color: '#1a1a2e', margin: 0 }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>SWIFTO Logistics Control Panel</p>
        </div>

        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Bookings',  value: stats.totalBookings,   color: '#4361ee' },
              { label: 'Active Bookings', value: stats.activeBookings,  color: '#f77f00' },
              { label: 'Delivered',       value: stats.deliveredBookings, color: '#2d6a4f' },
              { label: 'Total Users',     value: stats.totalUsers,      color: '#7209b7' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: `2px solid ${s.color}20`, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color, fontFamily: 'Manrope,sans-serif' }}>{s.value}</div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{ key: 'bookings', label: 'Bookings' }, { key: 'users', label: 'Users' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                background: tab === t.key ? '#4361ee' : 'white',
                color: tab === t.key ? 'white' : '#6b7280',
                boxShadow: tab === t.key ? '0 4px 12px rgba(67,97,238,0.3)' : 'none',
              }}>
              {t.label}
            </button>
          ))}
          <button onClick={fetchAll}
            style={{ marginLeft: 'auto', padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid #4361ee', background: 'white', color: '#4361ee', fontWeight: 700, cursor: 'pointer' }}>
            Refresh
          </button>
        </div>

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div>
            <input
              placeholder="Search by name, phone, tracking ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '2px solid #e8eaff', marginBottom: '1rem', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBookings.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No bookings found</div>
              )}
              {filteredBookings.map(b => (
                <div key={b._id} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1.5px solid #e8eaff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'Manrope,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#1a1a2e' }}>{b.trackingId}</span>
                        <span style={{ background: getStatusColor(b.status) + '20', color: getStatusColor(b.status), padding: '0.2rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {STATUS_OPTIONS.find(s => s.value === b.status)?.label || b.status}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 0.25rem', color: '#374151', fontWeight: 600 }}>Customer: {b.name} — {b.phone}</p>
                      <p style={{ margin: '0 0 0.25rem', color: '#6b7280', fontSize: '0.9rem' }}>Pickup: {b.pickup} — Drop: {b.drop}</p>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.85rem' }}>Vehicle: {b.vehicle} | Date: {b.date}</p>
                      {b.driverName && <p style={{ margin: '0.25rem 0 0', color: '#7209b7', fontSize: '0.85rem', fontWeight: 600 }}>Driver: {b.driverName} — {b.driverPhone}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button onClick={() => { setStatusModal(b); setNewStatus(b.status); }}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '2px solid #4361ee', background: 'white', color: '#4361ee', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                        Update Status
                      </button>
                      <button onClick={() => setDriverModal(b)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#7209b7', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                        Assign Driver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {users.map(u => (
              <div key={u._id} style={{ background: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem', border: '1.5px solid #e8eaff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#1a1a2e', fontSize: '1rem' }}>{u.name}</p>
                  <p style={{ margin: '0 0 0.25rem', color: '#6b7280', fontSize: '0.85rem' }}>Email: {u.email} | Phone: {u.phone}</p>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.8rem' }}>Joined: {new Date(u.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <span style={{ background: u.role === 'admin' ? '#4361ee20' : '#f3f4f6', color: u.role === 'admin' ? '#4361ee' : '#6b7280', padding: '0.3rem 0.9rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.8rem' }}>
                  {u.role === 'admin' ? 'Admin' : 'User'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Modal */}
      {statusModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'Manrope,sans-serif', color: '#1a1a2e' }}>Update Status — {statusModal.trackingId}</h3>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e8eaff', fontSize: '0.95rem', marginBottom: '1rem' }}>
              {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={updateStatus}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#4361ee', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                Update
              </button>
              <button onClick={() => setStatusModal(null)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #e8eaff', background: 'white', color: '#6b7280', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Driver Modal */}
      {driverModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'Manrope,sans-serif', color: '#1a1a2e' }}>Assign Driver — {driverModal.trackingId}</h3>
            <input placeholder="Driver Name" value={driverForm.driverName}
              onChange={e => setDriverForm({ ...driverForm, driverName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e8eaff', fontSize: '0.95rem', marginBottom: '0.75rem', boxSizing: 'border-box' }} />
            <input placeholder="Driver Phone" value={driverForm.driverPhone}
              onChange={e => setDriverForm({ ...driverForm, driverPhone: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #e8eaff', fontSize: '0.95rem', marginBottom: '1rem', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={assignDriver}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#7209b7', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                Assign
              </button>
              <button onClick={() => setDriverModal(null)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #e8eaff', background: 'white', color: '#6b7280', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}