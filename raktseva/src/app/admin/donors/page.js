'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminDonors() {
  const router = useRouter();
  const [donors, setDonors] = useState([]);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('');

  async function load() {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) { router.push('/login'); return; }
      const meData = await meRes.json();
      setRole(meData.user?.role);

      const res = await fetch('/api/admin/donors');
      if (res.ok) {
        const data = await res.json();
        setDonors(data.donors || []);
      }
    } catch { router.push('/login'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const updateDonor = async (donorId, updates) => {
    setSaving(donorId);
    try {
      const res = await fetch('/api/admin/donors', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ donorId, ...updates })
      });
      if (res.ok) await load();
    } catch(e) { console.error(e); }
    finally { setSaving(''); }
  };

  if (loading) return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f0505' }}>
      <div style={{ fontSize:48, animation:'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role={role} />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>Manage Donors</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>{donors.length} total registered donors</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding:24 }}>
          {donors.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px 0', color:'#6b7280' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>👥</div>
              <p>No donors registered yet.</p>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Blood Group</th>
                    <th>Location</th>
                    <th>Availability</th>
                    <th>Donations</th>
                    <th>Approval</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map(d => (
                    <tr key={d._id}>
                      <td>
                        <div style={{ fontWeight:600, color:'#fef2f2' }}>{d.user_id?.name}</div>
                        <div style={{ color:'#6b7280', fontSize:12 }}>{d.user_id?.email}</div>
                        <div style={{ color:'#6b7280', fontSize:12 }}>{d.user_id?.phone}</div>
                      </td>
                      <td><div className="blood-badge">{d.blood_group}</div></td>
                      <td style={{ color:'#9ca3af', fontSize:13 }}>{d.area}, {d.district}</td>
                      <td>
                        <span className={`badge ${d.availability_status ? 'badge-approved' : 'badge-unapproved'}`}>
                          {d.availability_status ? '✅ Available' : '❌ Unavailable'}
                        </span>
                      </td>
                      <td style={{ color:'#fef2f2', fontWeight:600, textAlign:'center' }}>{d.total_donations || 0}</td>
                      <td>
                        <span className={`badge ${d.isApproved ? 'badge-approved' : 'badge-unapproved'}`}>
                          {d.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                          {!d.isApproved ? (
                            <button
                              className="btn-success" style={{ fontSize:12, padding:'6px 12px' }}
                              disabled={saving === d._id}
                              onClick={() => updateDonor(d._id, { isApproved:true })}>
                              {saving === d._id ? '...' : '✅ Approve'}
                            </button>
                          ) : (
                            <button
                              className="btn-danger" style={{ fontSize:12, padding:'6px 12px' }}
                              disabled={saving === d._id}
                              onClick={() => updateDonor(d._id, { isApproved:false })}>
                              {saving === d._id ? '...' : '❌ Revoke'}
                            </button>
                          )}
                          <button
                            className="btn-secondary" style={{ fontSize:12, padding:'6px 12px', borderRadius:8 }}
                            disabled={saving === d._id}
                            onClick={() => updateDonor(d._id, { availability_status: !d.availability_status })}>
                            {saving === d._id ? '...' : '🔄 Toggle'}
                          </button>
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
