'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const STATUS_BADGE = {
  pending: 'badge-pending', matched: 'badge-matched',
  fulfilled: 'badge-fulfilled', cancelled: 'badge-cancelled'
};
const URGENCY_BADGE = {
  normal: 'badge-normal', urgent: 'badge-urgent', critical: 'badge-critical'
};

export default function AdminRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');

  async function load() {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) { router.push('/login'); return; }
      const meData = await meRes.json();
      setRole(meData.user?.role);

      const res = await fetch('/api/requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch { router.push('/login'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const updateStatus = async (requestId, status) => {
    setSaving(requestId);
    try {
      await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status })
      });
      await load();
    } finally { setSaving(''); }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0505' }}>
      <div style={{ fontSize: 48, animation: 'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0505' }}>
      <Sidebar role={role} />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fef2f2', marginBottom: 4 }}>All Requests</h1>
            <p style={{ color: '#9ca3af', fontSize: 15 }}>{requests.length} total blood requests</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          {requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p>No requests submitted yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Requester</th>
                    <th>Blood</th>
                    <th>Hospital</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r._id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#fef2f2' }}>{r.patient_name}</div>
                        <div style={{ color: '#6b7280', fontSize: 12 }}>{r.quantity} unit(s)</div>
                      </td>
                      <td>
                        <div style={{ color: '#e5e7eb', fontSize: 13 }}>{r.requester_id?.name}</div>
                        <div style={{ color: '#6b7280', fontSize: 12 }}>{r.requester_id?.phone}</div>
                      </td>
                      <td><div className="blood-badge" style={{ width: 36, height: 36, fontSize: 11 }}>{r.blood_group}</div></td>
                      <td style={{ color: '#9ca3af', fontSize: 13 }}>
                        <div>{r.hospital_name}</div>
                        <div style={{ fontSize: 11 }}>{r.area}, {r.district}</div>
                      </td>
                      <td><span className={`badge ${URGENCY_BADGE[r.urgency_level]}`}>{r.urgency_level}</span></td>
                      <td><span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span></td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {r.status !== 'fulfilled' && r.status !== 'cancelled' && (
                            <button className="btn-success" style={{ fontSize: 11, padding: '5px 10px' }}
                              disabled={saving === r._id}
                              onClick={() => updateStatus(r._id, 'fulfilled')}>
                              {saving === r._id ? '...' : '✅ Fulfill'}
                            </button>
                          )}
                          {r.status !== 'cancelled' && r.status !== 'fulfilled' && (
                            <button className="btn-danger" style={{ fontSize: 11, padding: '5px 10px' }}
                              disabled={saving === r._id}
                              onClick={() => updateStatus(r._id, 'cancelled')}>
                              {saving === r._id ? '...' : '❌ Cancel'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
