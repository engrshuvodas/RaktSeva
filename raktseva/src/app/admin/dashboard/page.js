'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) { router.push('/login'); return; }
        const meData = await meRes.json();
        setRole(meData.user?.role);

        const statsRes = await fetch('/api/admin/stats');
        if (statsRes.ok) {
          const sData = await statsRes.json();
          setStats(sData.stats);
        }
      } catch { router.push('/login'); }
      finally { setLoading(false); }
    }
    load();
  }, [router]);

  if (loading || !stats) return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f0505' }}>
      <div style={{ fontSize:48, animation:'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  const BLOOD_GROUPS = ['O-','O+','A-','A+','B-','B+','AB-','AB+'];

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role={role} />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>Admin Dashboard</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>System overview and statistics</p>
          </div>
        </div>

        {/* Top Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20, marginBottom:32 }}>
          {[
            { label:'Total Donors', value:stats.totalDonors, icon:'👥', color:'#b91c1c' },
            { label:'Pending Requests', value:stats.pendingRequests, icon:'⏳', color:'#eab308' },
            { label:'Matched Requests', value:stats.matchedRequests, icon:'🔗', color:'#60a5fa' },
            { label:'Fulfilled Requests', value:stats.fulfilledRequests, icon:'✅', color:'#4ade80' },
            { label:'Total Stock (Units)', value:stats.totalStockUnits, icon:'🩸', color:'#e11d48' },
          ].map((s,i) => (
            <div key={i} className="stat-card fade-in">
              <div className="stat-icon"><span style={{ fontSize:22 }}>{s.icon}</span></div>
              <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:13, color:'#9ca3af', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, flexWrap:'wrap' }}>
          {/* Blood Stock Overview */}
          <div className="glass-card" style={{ padding:24 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:'#fef2f2', marginBottom:20 }}>🩸 Blood Stock Levels</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {BLOOD_GROUPS.map(bg => {
                const units = stats.stockMap?.[bg] || 0;
                const pct = Math.min(100, (units / 20) * 100);
                const color = units === 0 ? '#dc2626' : units < 5 ? '#eab308' : '#16a34a';
                return (
                  <div key={bg}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ color:'#fef2f2', fontWeight:600, fontSize:14 }}>{bg}</span>
                      <span style={{ color, fontWeight:700, fontSize:14 }}>{units} units</span>
                    </div>
                    <div style={{ height:6, background:'rgba(255,255,255,0.06)', borderRadius:3 }}>
                      <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:3, transition:'width 0.5s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Donors by Blood Group */}
          <div className="glass-card" style={{ padding:24 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:'#fef2f2', marginBottom:20 }}>👥 Donors by Blood Group</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {BLOOD_GROUPS.map(bg => {
                const count = stats.donorGroupMap?.[bg] || 0;
                return (
                  <div key={bg} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(185,28,28,0.1)' }}>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <div className="blood-badge" style={{ width:32, height:32, fontSize:11 }}>{bg}</div>
                      <span style={{ color:'#9ca3af', fontSize:14 }}>Blood Group</span>
                    </div>
                    <span style={{ color:'#fef2f2', fontWeight:700, fontSize:16 }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
