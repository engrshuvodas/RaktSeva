'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      const { role } = data.user;
      if (role === 'donor') router.push('/donor/dashboard');
      else if (role === 'requester') router.push('/requester/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
      else if (role === 'super_admin') router.push('/super-admin/manage-admins');
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
      padding: '32px 16px'
    }}>
      <div className="bg-blob" style={{ width: 500, height: 500, background: '#b91c1c', top: -200, left: -200 }} />
      <div className="bg-blob" style={{ width: 350, height: 350, background: '#7f1d1d', bottom: -100, right: -100, animationDelay: '2s' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>🩸</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fef2f2' }}>
              Rakt<span style={{ color: '#b91c1c' }}>Seva</span>
            </span>
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fef2f2', marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ color: '#9ca3af', fontSize: 15 }}>Login to your RaktSeva account</p>
        </div>

        <div className="glass-card" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email" name="email" className="input-field"
                placeholder="your@email.com" value={form.email}
                onChange={handleChange} required autoComplete="email"
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password" name="password" className="input-field"
                placeholder="Your password" value={form.password}
                onChange={handleChange} required autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="alert-error">⚠️ {error}</div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ justifyContent: 'center', fontSize: 16, padding: '14px 0', width: '100%', marginTop: 4 }}>
              {loading ? '⏳ Logging in...' : '🔑 Login'}
            </button>

            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#fca5a5', fontWeight: 600 }}>Register here</Link>
            </p>
          </form>
        </div>

        {/* Demo credentials hint */}
        <div className="glass-card" style={{ padding: 16, marginTop: 16 }}>
          <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', marginBottom: 8 }}>
            <strong style={{ color: '#fca5a5' }}>Test Credentials (Super Admin)</strong>
          </p>
          <p style={{ color: '#6b7280', fontSize: 12, textAlign: 'center', fontFamily: 'monospace' }}>
            superadmin@raktseva.org / SuperAdminSecurePass123!
          </p>
        </div>
      </div>
    </div>
  );
}
