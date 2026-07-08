'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const ROLE_BADGE_COLOR = {
  admin: { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
  donor: { bg: 'rgba(185,28,28,0.15)', color: '#fca5a5' },
  requester: { bg: 'rgba(52,211,153,0.15)', color: '#34d399' },
};

export default function SuperAdminManageAdmins() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');
  const [search, setSearch] = useState('');

  async function load() {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) { router.push('/login'); return; }
      const meData = await meRes.json();
      if (meData.user?.role !== 'super_admin') { router.push('/admin/dashboard'); return; }

      const res = await fetch('/api/super-admin/admins');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch { router.push('/login'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const changeRole = async (userId, newRole) => {
    setSaving(userId);
    try {
      await fetch('/api/super-admin/admins', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      });
      await load();
    } finally { setSaving(''); }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0505' }}>
      <div style={{ fontSize: 48, animation: 'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0505' }}>
      <Sidebar role="super_admin" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fef2f2', marginBottom: 4 }}>
              👑 Manage Admins
            </h1>
            <p style={{ color: '#9ca3af', fontSize: 15 }}>Promote users to admin or change their roles</p>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 24 }}>
          <input
            type="text" className="input-field" placeholder="🔍 Search by name or email..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
              <p>No users found.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Current Role</th>
                    <th>Joined</th>
                    <th>Change Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => {
                    const roleStyle = ROLE_BADGE_COLOR[u.role] || {};
                    return (
                      <tr key={u._id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#fef2f2' }}>{u.name}</div>
                          <div style={{ color: '#6b7280', fontSize: 12 }}>{u.email}</div>
                        </td>
                        <td style={{ color: '#9ca3af', fontSize: 13 }}>{u.phone}</td>
                        <td>
                          <span style={{
                            display: 'inline-flex', padding: '4px 12px', borderRadius: 20,
                            fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                            background: roleStyle.bg, color: roleStyle.color
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ color: '#6b7280', fontSize: 12 }}>
                          {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {u.role !== 'admin' && (
                              <button
                                style={{
                                  background: 'rgba(96,165,250,0.15)', color: '#60a5fa',
                                  border: '1px solid rgba(96,165,250,0.3)',
                                  padding: '5px 12px', borderRadius: 6, fontSize: 12,
                                  fontWeight: 600, cursor: 'pointer'
                                }}
                                disabled={saving === u._id}
                                onClick={() => changeRole(u._id, 'admin')}>
                                {saving === u._id ? '...' : '⬆️ Make Admin'}
                              </button>
                            )}
                            {u.role === 'admin' && (
                              <button
                                style={{
                                  background: 'rgba(185,28,28,0.15)', color: '#fca5a5',
                                  border: '1px solid rgba(185,28,28,0.3)',
                                  padding: '5px 12px', borderRadius: 6, fontSize: 12,
                                  fontWeight: 600, cursor: 'pointer'
                                }}
                                disabled={saving === u._id}
                                onClick={() => changeRole(u._id, 'donor')}>
                                {saving === u._id ? '...' : '⬇️ Demote'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
