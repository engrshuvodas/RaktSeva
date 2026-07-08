'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { DISTRICTS_AND_AREAS, DISTRICTS } from '@/lib/locations';

const BLOOD_GROUPS = ['O-','O+','A-','A+','B-','B+','AB-','AB+'];

export default function NewRequest() {
  const router = useRouter();
  const [form, setForm] = useState({
    patient_name:'', blood_group:'O+', quantity:1,
    urgency_level:'normal', district:'Vadodara', area:'',
    hospital_name:''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const areas = DISTRICTS_AND_AREAS[form.district] || [];
  useEffect(() => {
    setForm(f => ({ ...f, area: areas[0] || '' }));
  }, [form.district]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/requests', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, quantity: Number(form.quantity) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setResult(data);
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (result) return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role="requester" />
      <main className="content-with-sidebar" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div className="glass-card" style={{ padding:48, maxWidth:480, textAlign:'center' }}>
          <div style={{ fontSize:64, marginBottom:16 }}>{result.matchedCount > 0 ? '🎯' : '📋'}</div>
          <h2 style={{ fontSize:26, fontWeight:800, color:'#fef2f2', marginBottom:12 }}>
            {result.matchedCount > 0 ? 'Donors Found!' : 'Request Submitted'}
          </h2>
          {result.matchedCount > 0 ? (
            <>
              <p style={{ color:'#9ca3af', fontSize:15, marginBottom:8 }}>
                <span style={{ color:'#4ade80', fontWeight:700, fontSize:22 }}>{result.matchedCount}</span> eligible donor{result.matchedCount !== 1 ? 's' : ''} matched.
              </p>
              {result.notifiedCount > 0 && (
                <p style={{ color:'#9ca3af', fontSize:14, marginBottom:24 }}>
                  📧 <span style={{ color:'#60a5fa' }}>{result.notifiedCount}</span> donor{result.notifiedCount !== 1 ? 's' : ''} notified via email.
                </p>
              )}
            </>
          ) : (
            <p style={{ color:'#9ca3af', fontSize:15, marginBottom:24 }}>
              Your request is queued. We'll notify you when a matching donor becomes available.
            </p>
          )}
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => router.push(`/requester/matched-donors/${result.request._id}`)}
              className="btn-primary" style={{ fontSize:15 }}>
              👁 View Matched Donors
            </button>
            <button onClick={() => router.push('/requester/dashboard')}
              className="btn-secondary" style={{ fontSize:15 }}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0f0505' }}>
      <Sidebar role="requester" />
      <main className="content-with-sidebar">
        <div className="page-header">
          <div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'#fef2f2', marginBottom:4 }}>New Blood Request</h1>
            <p style={{ color:'#9ca3af', fontSize:15 }}>Fill in patient and hospital details to find matching donors</p>
          </div>
        </div>

        <div style={{ maxWidth:640 }}>
          <div className="glass-card" style={{ padding:36 }}>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div>
                <label className="form-label">Patient Name</label>
                <input type="text" name="patient_name" className="input-field"
                  placeholder="Full name of the patient" value={form.patient_name}
                  onChange={handleChange} required />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <label className="form-label">Blood Group Required</label>
                  <select name="blood_group" className="input-field" value={form.blood_group} onChange={handleChange} required>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Quantity (Units)</label>
                  <input type="number" name="quantity" className="input-field"
                    min={1} max={10} value={form.quantity} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="form-label">Urgency Level</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                  {['normal','urgent','critical'].map(level => (
                    <button key={level} type="button"
                      onClick={() => setForm(f => ({...f, urgency_level:level}))}
                      style={{
                        padding:'12px 0', borderRadius:10, border:'2px solid',
                        borderColor: form.urgency_level===level
                          ? (level==='critical'?'#dc2626':level==='urgent'?'#eab308':'#b91c1c')
                          : 'rgba(185,28,28,0.2)',
                        background: form.urgency_level===level
                          ? (level==='critical'?'rgba(220,38,38,0.15)':level==='urgent'?'rgba(234,179,8,0.1)':'rgba(185,28,28,0.12)')
                          : 'transparent',
                        color: form.urgency_level===level
                          ? (level==='critical'?'#f87171':level==='urgent'?'#fbbf24':'#fca5a5')
                          : '#6b7280',
                        fontWeight:600, fontSize:13, cursor:'pointer',
                        textTransform:'capitalize', transition:'all 0.2s'
                      }}>
                      {level==='critical'?'🚨':level==='urgent'?'⚡':'📋'} {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Hospital Name</label>
                <input type="text" name="hospital_name" className="input-field"
                  placeholder="Name of the hospital" value={form.hospital_name}
                  onChange={handleChange} required />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <label className="form-label">District</label>
                  <select name="district" className="input-field" value={form.district} onChange={handleChange} required>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Area</label>
                  <select name="area" className="input-field" value={form.area} onChange={handleChange} required>
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {error && <div className="alert-error">⚠️ {error}</div>}

              <button type="submit" className="btn-primary" disabled={loading}
                style={{ justifyContent:'center', fontSize:16, padding:'14px 0', width:'100%', marginTop:4 }}>
                {loading ? '🔍 Searching for Donors...' : '🩸 Submit Request & Find Donors'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
