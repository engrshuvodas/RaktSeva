'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const BLOOD_GROUPS = ['O-','O+','A-','A+','B-','B+','AB-','AB+'];

export default function AdminBloodStock() {
  const router = useRouter();
  const [stock, setStock] = useState([]);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) { router.push('/login'); return; }
      const meData = await meRes.json();
      setRole(meData.user?.role);

      const res = await fetch('/api/admin/blood-stock');
      if (res.ok) {
        const data = await res.json();
        setStock(data.stock || []);
        const editMap = {};
        (data.stock || []).forEach(s => { editMap[s.blood_group] = s.units_available; });
        setEditing(editMap);
      }
    } catch { router.push('/login'); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const handleUpdate = async (blood_group) => {
    setSaving(blood_group);
    setMessage('');
    try {
      const res = await fetch('/api/admin/blood-stock', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ blood_group, units: editing[blood_group] })
      });
      if (res.ok) {
        await load();
        setMessage(`✅ ${blood_group} stock updated!`);
        setTimeout(() => setMessage(''), 3000);
      }
    } finally { setSaving(''); }
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
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>Blood Stock</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>Manage available blood units per group</p>
          </div>
        </div>

        {message && <div className="alert-success" style={{ marginBottom:20 }}>{message}</div>}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
          {BLOOD_GROUPS.map(bg => {
            const stockItem = stock.find(s => s.blood_group === bg);
            const units = stockItem?.units_available || 0;
            const pct = Math.min(100, (units / 20) * 100);
            const color = units === 0 ? '#dc2626' : units < 5 ? '#eab308' : '#16a34a';

            return (
              <div key={bg} className="glass-card" style={{ padding:24 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <div className="blood-badge" style={{ width:52, height:52, fontSize:16 }}>{bg}</div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:28, fontWeight:800, color }}>{units}</div>
                    <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', fontWeight:600 }}>units</div>
                  </div>
                </div>

                {/* Stock bar */}
                <div style={{ height:6, background:'rgba(255,255,255,0.06)', borderRadius:3, marginBottom:16 }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:3, transition:'width 0.4s' }} />
                </div>

                <div style={{ display:'flex', gap:8 }}>
                  <input
                    type="number" min={0} max={999}
                    className="input-field" style={{ flex:1, padding:'9px 12px', fontSize:14 }}
                    value={editing[bg] ?? units}
                    onChange={e => setEditing(prev => ({ ...prev, [bg]: Number(e.target.value) }))}
                  />
                  <button
                    className="btn-primary" style={{ padding:'9px 16px', fontSize:13, whiteSpace:'nowrap' }}
                    disabled={saving === bg}
                    onClick={() => handleUpdate(bg)}>
                    {saving === bg ? '...' : '💾 Save'}
                  </button>
                </div>

                {stockItem && (
                  <div style={{ color:'#6b7280', fontSize:11, marginTop:10 }}>
                    Last updated: {new Date(stockItem.last_updated).toLocaleDateString('en-IN')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
