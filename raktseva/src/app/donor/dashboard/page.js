'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function DonorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [donor, setDonor] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) { router.push('/login'); return; }
        const data = await res.json();
        setUser(data.user);
        setDonor(data.donorProfile);

        const histRes = await fetch('/api/donor/history');
        if (histRes.ok) {
          const hData = await histRes.json();
          setHistory(hData.history || []);
        }
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f0505' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: 'pulse 1.5s ease-in-out infinite' }}>🩸</div>
        <p style={{ color: '#9ca3af' }}>Loading your dashboard...</p>
      </div>
    </div>
  );

  const isEligible = !donor?.last_donation_date ||
    new Date(donor.last_donation_date) <= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0505' }}>
      <Sidebar role="donor" />
      <main className="content-with-sidebar">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fef2f2', marginBottom: 4 }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#9ca3af', fontSize: 15 }}>Here's your donation overview</p>
          </div>
        </div>

        {/* Approval Banner */}
        {donor && !donor.isApproved && (
          <div className="alert-warning" style={{ marginBottom: 24 }}>
            ⏳ <strong>Pending Approval:</strong> Your donor profile is awaiting admin verification. You'll receive notifications once approved.
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { label: 'Blood Group', value: donor?.blood_group || '–', icon: '🩸', color: '#b91c1c' },
            { label: 'Total Donations', value: donor?.total_donations || 0, icon: '💉', color: '#e11d48' },
            { label: 'Approval Status', value: donor?.isApproved ? 'Approved' : 'Pending', icon: '✅', color: donor?.isApproved ? '#16a34a' : '#eab308' },
            { label: 'Eligibility', value: isEligible ? 'Eligible' : 'On Cooldown', icon: '⚡', color: isEligible ? '#16a34a' : '#dc2626' },
          ].map((s, i) => (
            <div key={i} className="stat-card fade-in">
              <div className="stat-icon"><span style={{ fontSize: 22 }}>{s.icon}</span></div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Location info */}
        {donor && (
          <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fef2f2', marginBottom: 16 }}>📍 Your Location</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>District</div>
                <div style={{ color: '#fef2f2', fontSize: 16, fontWeight: 600 }}>{donor.district}</div>
              </div>
              <div>
                <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Area</div>
                <div style={{ color: '#fef2f2', fontSize: 16, fontWeight: 600 }}>{donor.area}</div>
              </div>
              <div>
                <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Availability</div>
                <div style={{ color: donor.availability_status ? '#4ade80' : '#f87171', fontSize: 16, fontWeight: 600 }}>
                  {donor.availability_status ? '✅ Available' : '❌ Unavailable'}
                </div>
              </div>
              {donor.last_donation_date && (
                <div>
                  <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Last Donation</div>
                  <div style={{ color: '#fef2f2', fontSize: 16, fontWeight: 600 }}>
                    {new Date(donor.last_donation_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/donor/profile" className="btn-secondary" style={{ fontSize: 14, padding: '9px 20px' }}>
                ✏️ Edit Profile
              </Link>
            </div>
          </div>
        )}

        {/* Recent Donations */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fef2f2' }}>💉 Recent Donations</h2>
            <Link href="/donor/history" style={{ color: '#fca5a5', fontSize: 14, fontWeight: 600 }}>View All →</Link>
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>💉</div>
              <p>No donation history yet.</p>
              <p style={{ fontSize: 13, marginTop: 6 }}>Your donations will appear here once recorded.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {history.slice(0, 5).map((h, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px',
                  background: 'rgba(185,28,28,0.06)',
                  borderRadius: 10, border: '1px solid rgba(185,28,28,0.15)'
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 24 }}>💉</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fef2f2', fontSize: 14 }}>
                        {h.request_id?.patient_name || 'Direct Donation'}
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: 12 }}>
                        {h.request_id?.hospital_name || ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#fca5a5', fontWeight: 600, fontSize: 14 }}>{h.units_donated} Unit(s)</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>
                      {new Date(h.donation_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
