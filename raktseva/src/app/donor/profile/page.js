'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { DISTRICTS_AND_AREAS, DISTRICTS } from '@/lib/locations';

const BLOOD_GROUPS = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export default function DonorProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', phone: '', blood_group: '', district: '', area: '',
    last_donation_date: '', availability_status: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) { router.push('/login'); return; }
        const meData = await meRes.json();

        const profileRes = await fetch('/api/donor/profile');
        if (!profileRes.ok) { router.push('/login'); return; }
        const pData = await profileRes.json();
        const d = pData.donor;

        setForm({
          name: meData.user?.name || '',
          phone: meData.user?.phone || '',
          blood_group: d.blood_group || 'O+',
          district: d.district || 'Vadodara',
          area: d.area || '',
          last_donation_date: d.last_donation_date
            ? new Date(d.last_donation_date).toISOString().split('T')[0]
            : '',
          availability_status: d.availability_status !== false
        });
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  const areas = DISTRICTS_AND_AREAS[form.district] || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/donor/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0505' }}>
      <div style={{ fontSize: 48, animation: 'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0505' }}>
      <Sidebar role="donor" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fef2f2', marginBottom: 4 }}>My Profile</h1>
            <p style={{ color: '#9ca3af', fontSize: 15 }}>Update your donor information and availability</p>
          </div>
        </div>

        <div style={{ maxWidth: 640 }}>
          <div className="glass-card" style={{ padding: 36 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fca5a5', borderBottom: '1px solid rgba(185,28,28,0.2)', paddingBottom: 12 }}>
                Personal Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className="input-field" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" className="input-field" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fca5a5', borderBottom: '1px solid rgba(185,28,28,0.2)', paddingBottom: 12, marginTop: 8 }}>
                Donor Details
              </h2>

              <div>
                <label className="form-label">Blood Group</label>
                <select name="blood_group" className="input-field" value={form.blood_group} onChange={handleChange} required>
                  {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label className="form-label">District</label>
                  <select name="district" className="input-field" value={form.district} onChange={handleChange} required>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Area</label>
                  <select name="area" className="input-field" value={form.area} onChange={handleChange} required>
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Last Donation Date</label>
                <input
                  type="date" name="last_donation_date" className="input-field"
                  value={form.last_donation_date} onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  onClick={() => setForm(f => ({ ...f, availability_status: !f.availability_status }))}
                  style={{
                    width: 48, height: 26, borderRadius: 13, cursor: 'pointer',
                    background: form.availability_status ? 'linear-gradient(135deg, #b91c1c, #e11d48)' : 'rgba(255,255,255,0.1)',
                    position: 'relative', transition: 'background 0.3s', flexShrink: 0,
                    border: '1px solid rgba(185,28,28,0.3)'
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
                    background: 'white', transition: 'left 0.3s',
                    left: form.availability_status ? 25 : 3, boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                  }} />
                </div>
                <label style={{ color: '#fef2f2', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => setForm(f => ({ ...f, availability_status: !f.availability_status }))}>
                  I am currently available to donate
                </label>
              </div>

              {message && (
                <div className={message.type === 'success' ? 'alert-success' : 'alert-error'}>
                  {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={saving}
                style={{ justifyContent: 'center', fontSize: 16, padding: '14px 0', width: '100%' }}>
                {saving ? '⏳ Saving...' : '💾 Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
