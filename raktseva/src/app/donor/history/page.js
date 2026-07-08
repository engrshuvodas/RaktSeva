'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function DonorHistory() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) { router.push('/login'); return; }
        const histRes = await fetch('/api/donor/history');
        if (histRes.ok) {
          const data = await histRes.json();
          setHistory(data.history || []);
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

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role="donor" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>Donation History</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>Your complete donation record</p>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="glass-card" style={{ padding:60, textAlign:'center' }}>
            <div style={{ fontSize:60, marginBottom:16 }}>💉</div>
            <h2 style={{ color:'#fef2f2', fontSize:22, fontWeight:700, marginBottom:8 }}>No Donations Yet</h2>
            <p style={{ color:'#9ca3af' }}>Your donation records will appear here once you donate.</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {history.map((h, i) => (
              <div key={i} className="glass-card" style={{ padding:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
                <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                  <div style={{
                    width:52, height:52, borderRadius:'50%',
                    background:'linear-gradient(135deg,#b91c1c,#e11d48)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0
                  }}>💉</div>
                  <div>
                    <div style={{ fontWeight:700, color:'#fef2f2', fontSize:16, marginBottom:4 }}>
                      {h.request_id?.patient_name || 'Direct Donation'}
                    </div>
                    <div style={{ color:'#9ca3af', fontSize:13 }}>
                      {h.request_id?.hospital_name || 'N/A'}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:32, alignItems:'center', flexWrap:'wrap' }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:22, fontWeight:800, color:'#b91c1c' }}>{h.units_donated}</div>
                    <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', fontWeight:600 }}>Units</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ color:'#fca5a5', fontWeight:600, fontSize:14 }}>
                      {new Date(h.donation_date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}
                    </div>
                    <div style={{ color:'#6b7280', fontSize:12 }}>Donation Date</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
