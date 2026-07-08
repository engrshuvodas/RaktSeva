'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const STATUS_BADGE = {
  pending: 'badge-pending', matched: 'badge-matched',
  fulfilled: 'badge-fulfilled', cancelled: 'badge-cancelled'
};
const URGENCY_BADGE = {
  normal: 'badge-normal', urgent: 'badge-urgent', critical: 'badge-critical'
};

export default function RequesterDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) { router.push('/login'); return; }
        const meData = await meRes.json();
        setUser(meData.user);

        const reqRes = await fetch('/api/requests');
        if (reqRes.ok) {
          const rData = await reqRes.json();
          setRequests(rData.requests || []);
        }
      } catch { router.push('/login'); }
      finally { setLoading(false); }
    }
    load();
  }, [router]);

  if (loading) return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f0505' }}>
      <div style={{ fontSize:48, animation:'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    matched: requests.filter(r => r.status === 'matched').length,
    fulfilled: requests.filter(r => r.status === 'fulfilled').length,
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role="requester" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div style={{ flex:1 }}>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>
              Welcome, {user?.name?.split(' ')[0]} 🏥
            </h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>Manage your blood requests</p>
          </div>
          <Link href="/requester/new-request" className="btn-primary">
            ➕ New Request
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:20, marginBottom:32 }}>
          {[
            { label:'Total Requests', value:stats.total, icon:'📋', color:'#b91c1c' },
            { label:'Pending', value:stats.pending, icon:'⏳', color:'#eab308' },
            { label:'Matched', value:stats.matched, icon:'🔗', color:'#60a5fa' },
            { label:'Fulfilled', value:stats.fulfilled, icon:'✅', color:'#4ade80' },
          ].map((s,i) => (
            <div key={i} className="stat-card fade-in">
              <div className="stat-icon"><span style={{ fontSize:22 }}>{s.icon}</span></div>
              <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:13, color:'#9ca3af', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Requests Table */}
        <div className="glass-card" style={{ padding:24 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:'#fef2f2', marginBottom:20 }}>📋 My Blood Requests</h2>
          {requests.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px 0', color:'#6b7280' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🏥</div>
              <p style={{ fontSize:16, marginBottom:8 }}>No requests submitted yet.</p>
              <Link href="/requester/new-request" className="btn-primary" style={{ marginTop:16, display:'inline-flex' }}>
                ➕ Submit First Request
              </Link>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r._id}>
                      <td style={{ fontWeight:600, color:'#fef2f2' }}>{r.patient_name}</td>
                      <td><span className="blood-badge" style={{ width:36,height:36,fontSize:12 }}>{r.blood_group}</span></td>
                      <td style={{ color:'#9ca3af', fontSize:13 }}>{r.hospital_name}</td>
                      <td><span className={`badge ${URGENCY_BADGE[r.urgency_level]}`}>{r.urgency_level}</span></td>
                      <td><span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span></td>
                      <td style={{ color:'#6b7280', fontSize:13 }}>
                        {new Date(r.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      </td>
                      <td>
                        {(r.status === 'matched' || r.status === 'fulfilled') && (
                          <Link href={`/requester/matched-donors/${r._id}`}
                            style={{ color:'#fca5a5', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                            View Donors →
                          </Link>
                        )}
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
