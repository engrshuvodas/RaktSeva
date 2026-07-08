'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function MatchedDonors({ params }) {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.requestId;
        setRequestId(id);

        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) { router.push('/login'); return; }

        const res = await fetch(`/api/requests/${id}/matches`);
        if (res.ok) {
          const data = await res.json();
          setMatches(data.matches || []);
        }
      } catch { router.push('/login'); }
      finally { setLoading(false); }
    }
    load();
  }, [params, router]);

  if (loading) return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f0505' }}>
      <div style={{ fontSize:48, animation:'pulse 1.5s ease-in-out infinite' }}>🩸</div>
    </div>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role="requester" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>Matched Donors</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>
              {matches.length} compatible, eligible donor{matches.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="glass-card" style={{ padding:60, textAlign:'center' }}>
            <div style={{ fontSize:60, marginBottom:16 }}>😔</div>
            <h2 style={{ color:'#fef2f2', fontSize:22, fontWeight:700, marginBottom:8 }}>No Eligible Donors Found</h2>
            <p style={{ color:'#9ca3af', maxWidth:400, margin:'0 auto' }}>
              There are no eligible donors matching this request's blood type and location currently. 
              You will be notified when one becomes available.
            </p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
            {matches.map((donor, i) => (
              <div key={i} className="glass-card" style={{ padding:24 }}>
                <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:20 }}>
                  <div className="blood-badge">{donor.blood_group}</div>
                  <div>
                    <div style={{ fontWeight:700, color:'#fef2f2', fontSize:16 }}>
                      {donor.user_id?.name || 'Anonymous Donor'}
                    </div>
                    <div style={{ color: '#4ade80', fontSize:12, fontWeight:600 }}>● Available</div>
                  </div>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {[
                    ['📍 Location', `${donor.area}, ${donor.district}`],
                    ['📞 Contact', donor.user_id?.phone || 'N/A'],
                    ['💉 Total Donations', donor.total_donations || 0],
                  ].map(([label, val], j) => (
                    <div key={j} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ color:'#9ca3af', fontSize:13 }}>{label}</span>
                      <span style={{ color:'#fef2f2', fontSize:13, fontWeight:600 }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid rgba(185,28,28,0.2)' }}>
                  <a href={`tel:${donor.user_id?.phone}`} className="btn-primary"
                    style={{ width:'100%', justifyContent:'center', fontSize:14, padding:'10px 0', display:'flex' }}>
                    📞 Call Donor
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
