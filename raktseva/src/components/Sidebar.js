'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Sidebar({ role }) {
  const router = useRouter();
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const links = role === 'donor' ? [
    { href: '/donor/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/donor/profile', label: 'My Profile', icon: '👤' },
    { href: '/donor/history', label: 'Donation History', icon: '📋' },
  ] : role === 'requester' ? [
    { href: '/requester/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/requester/new-request', label: 'New Request', icon: '➕' },
  ] : role === 'admin' ? [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/donors', label: 'Manage Donors', icon: '👥' },
    { href: '/admin/blood-stock', label: 'Blood Stock', icon: '🩸' },
    { href: '/admin/requests', label: 'Requests', icon: '📋' },
  ] : [
    { href: '/super-admin/manage-admins', label: 'Manage Admins', icon: '👑' },
    { href: '/admin/dashboard', label: 'Admin Dashboard', icon: '📊' },
    { href: '/admin/donors', label: 'Manage Donors', icon: '👥' },
    { href: '/admin/blood-stock', label: 'Blood Stock', icon: '🩸' },
    { href: '/admin/requests', label: 'Requests', icon: '📋' },
  ];

  return (
    <div className="sidebar">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, textDecoration: 'none' }}>
        <span style={{ fontSize: 24 }}>🩸</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fef2f2' }}>
          Rakt<span style={{ color: '#b91c1c' }}>Seva</span>
        </span>
      </Link>

      <div style={{ flex: 1 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`sidebar-link ${active === l.href ? 'active' : ''}`}
            onClick={() => setActive(l.href)}>
            <span style={{ fontSize: 16 }}>{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(185,28,28,0.2)', paddingTop: 16, marginTop: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', marginBottom: 8,
          background: 'rgba(185,28,28,0.08)', borderRadius: 10
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #b91c1c, #e11d48)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'white', fontWeight: 700, flexShrink: 0
          }}>
            {role === 'super_admin' ? '👑' : role === 'admin' ? '⚙️' : role === 'donor' ? '🩸' : '🏥'}
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#fca5a5', fontWeight: 600, textTransform: 'capitalize' }}>{role?.replace('_', ' ')}</div>
          </div>
        </div>
        <button onClick={logout} className="sidebar-link" style={{ color: '#f87171', width: '100%' }}>
          <span>🚪</span> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
