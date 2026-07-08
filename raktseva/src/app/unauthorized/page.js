'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0505 0%, #1a0505 50%, #0f0000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px', textAlign: 'center'
    }}>
      <div>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🚫</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fef2f2', marginBottom: 12 }}>Access Denied</h1>
        <p style={{ color: '#9ca3af', fontSize: 17, marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
          You don't have permission to view this page. Please log in with an appropriate account.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/login" className="btn-primary">🔑 Login</Link>
          <Link href="/" className="btn-secondary">🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
