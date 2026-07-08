'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DISTRICTS_AND_AREAS, DISTRICTS } from '@/lib/locations';

const BLOOD_GROUPS = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultRole = searchParams.get('role') === 'requester' ? 'requester' : 'donor';

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    role: defaultRole, blood_group: 'O+',
    district: 'Vadodara', area: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const areas = DISTRICTS_AND_AREAS[form.district] || [];

  useEffect(() => {
    setForm(f => ({ ...f, area: areas[0] || '' }));
  }, [form.district]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = { ...form };
      if (form.role === 'requester') {
        delete body.blood_group;
        delete body.district;
        delete body.area;
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0505 0%, #1a0505 50%, #0f0000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 16px 32px'
    }}>
      {/* Background blobs */}
      <div className="bg-blob" style={{ width: 500, height: 500, background: '#b91c1c', top: -150, right: -150 }} />
      <div className="bg-blob" style={{ width: 300, height: 300, background: '#7f1d1d', bottom: 50, left: -100, animationDelay: '2s' }} />

      <div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>🩸</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fef2f2' }}>
              Rakt<span style={{ color: '#b91c1c' }}>Seva</span>
            </span>
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fef2f2', marginBottom: 8 }}>Create Account</h1>
          <p style={{ color: '#9ca3af', fontSize: 15 }}>Join the movement to save lives</p>
        </div>

        <div className="glass-card" style={{ padding: 36 }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: '#4ade80', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Registration Successful!</h2>
              <p style={{ color: '#9ca3af' }}>Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Role Toggle */}
              <div>
                <label className="form-label">I am a</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {['donor', 'requester'].map(role => (
                    <button key={role} type="button"
                      onClick={() => setForm(f => ({ ...f, role }))}
                      style={{
                        padding: '12px 0', borderRadius: 10, border: '2px solid',
                        borderColor: form.role === role ? '#b91c1c' : 'rgba(185,28,28,0.2)',
                        background: form.role === role ? 'rgba(185,28,28,0.15)' : 'transparent',
                        color: form.role === role ? '#fca5a5' : '#6b7280',
                        fontWeight: 600, fontSize: 14, cursor: 'pointer',
                        textTransform: 'capitalize', transition: 'all 0.2s'
                      }}
                    >
                      {role === 'donor' ? '🩸 Donor' : '🏥 Requester'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text" name="name" className="input-field"
                  placeholder="Your full name" value={form.name}
                  onChange={handleChange} required
                />
              </div>

              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email" name="email" className="input-field"
                  placeholder="your@email.com" value={form.email}
                  onChange={handleChange} required
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel" name="phone" className="input-field"
                  placeholder="10-digit phone number" value={form.phone}
                  onChange={handleChange} required
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password" name="password" className="input-field"
                  placeholder="At least 8 characters" value={form.password}
                  onChange={handleChange} required minLength={8}
                />
              </div>

              {/* Donor-only fields */}
              {form.role === 'donor' && (
                <>
                  <div>
                    <label className="form-label">Blood Group</label>
                    <select name="blood_group" className="input-field" value={form.blood_group} onChange={handleChange} required>
                      {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
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
                </>
              )}

              {error && (
                <div className="alert-error">⚠️ {error}</div>
              )}

              <button type="submit" className="btn-primary" disabled={loading}
                style={{ justifyContent: 'center', fontSize: 16, padding: '14px 0', width: '100%', marginTop: 4 }}>
                {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
              </button>

              <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#fca5a5', fontWeight: 600 }}>Login here</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
