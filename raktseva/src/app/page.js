'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const STATS = [
  { value: '5000+', label: 'Lives Saved', icon: '❤️' },
  { value: '2800+', label: 'Active Donors', icon: '🩸' },
  { value: '12', label: 'Blood Groups Covered', icon: '🏥' },
  { value: '24/7', label: 'Emergency Support', icon: '⚡' },
];

const BLOOD_GROUPS = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0505 0%, #1a0505 40%, #0f0000 100%)' }}>
      {/* Navbar */}
      <nav className="navbar">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #b91c1c, #e11d48)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white', boxShadow: '0 2px 10px rgba(185,28,28,0.5)'
          }}>
            🩸
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fef2f2', letterSpacing: '-0.5px' }}>
            Rakt<span style={{ color: '#b91c1c' }}>Seva</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/about" className="btn-secondary" style={{ padding: '8px 18px', fontSize: 14 }}>About</Link>
          <Link href="/login" className="btn-secondary" style={{ padding: '8px 18px', fontSize: 14 }}>Login</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>Register</Link>
        </div>
      </nav>

      {/* Background blobs */}
      <div className="bg-blob" style={{ width: 600, height: 600, background: '#b91c1c', top: -200, right: -200 }} />
      <div className="bg-blob" style={{ width: 400, height: 400, background: '#7f1d1d', bottom: 200, left: -100, animationDelay: '3s' }} />

      {/* Hero Section */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        overflow: 'hidden'
      }}>
        {/* Animated drop */}
        <div style={{
          fontSize: 80, marginBottom: 24,
          filter: 'drop-shadow(0 8px 24px rgba(185,28,28,0.6))',
          animation: 'pulse 3s ease-in-out infinite'
        }}>🩸</div>

        <div style={{ marginBottom: 16 }}>
          <span style={{
            background: 'rgba(185,28,28,0.15)',
            border: '1px solid rgba(185,28,28,0.3)',
            borderRadius: 20, padding: '6px 16px',
            fontSize: 13, fontWeight: 600, color: '#fca5a5',
            textTransform: 'uppercase', letterSpacing: 1
          }}>
            Affiliated with Parul Sevashram Hospital, Vadodara
          </span>
        </div>

        <h1 className="gradient-text" style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900, lineHeight: 1.1,
          marginBottom: 16, letterSpacing: '-2px'
        }}>
          Donate Blood,<br />Donate Hope.
        </h1>

        <p style={{
          fontSize: 20, color: '#9ca3af', maxWidth: 560,
          lineHeight: 1.6, marginBottom: 48
        }}>
          <em style={{ color: '#fca5a5', fontStyle: 'normal', fontWeight: 500 }}>Every Drop, A New Life.</em><br />
          RaktSeva intelligently connects blood requesters with eligible, available donors nearby — instantly.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register?role=donor" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            🩸 Become a Donor
          </Link>
          <Link href="/register?role=requester" className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
            🏥 Request Blood
          </Link>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{ width: 24, height: 40, border: '2px solid #b91c1c', borderRadius: 12, display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
            <div style={{ width: 4, height: 8, background: '#b91c1c', borderRadius: 2, animation: 'scrollDown 2s ease-in-out infinite' }} />
          </div>
        </div>

        <style>{`
          @keyframes scrollDown {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(12px); opacity: 0.4; }
          }
        `}</style>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#b91c1c', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ color: '#9ca3af', fontSize: 15, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 40, fontWeight: 800, marginBottom: 16, color: '#fef2f2' }}>
          How <span className="gradient-text">RaktSeva</span> Works
        </h2>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 16, marginBottom: 64, maxWidth: 500, margin: '0 auto 64px' }}>
          A seamless 3-step process to connect donors with patients in need.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            {
              step: '01', title: 'Register & Set Up',
              desc: 'Create an account as a donor or requester. Donors add blood group, location, and availability.',
              icon: '📋'
            },
            {
              step: '02', title: 'Submit a Request',
              desc: 'Requesters submit a blood request with patient details, hospital, and urgency level.',
              icon: '🏥'
            },
            {
              step: '03', title: 'Instant Match & Notify',
              desc: 'RaktSeva intelligently matches donors by compatibility, location & eligibility, then sends email alerts.',
              icon: '⚡'
            }
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: -10, right: -10,
                fontSize: 80, fontWeight: 900, color: 'rgba(185,28,28,0.08)',
                lineHeight: 1
              }}>{item.step}</div>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{item.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fef2f2', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: 15 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blood Groups Section */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, marginBottom: 16, color: '#fef2f2' }}>
          All Blood Groups <span className="gradient-text">Covered</span>
        </h2>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 15, marginBottom: 48 }}>
          Our network supports all 8 major blood types, ensuring no one is left behind.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {BLOOD_GROUPS.map((bg) => (
            <div key={bg} className="glass-card" style={{
              padding: '20px 32px', textAlign: 'center', minWidth: 100,
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(185,28,28,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(185,28,28,0.2)';
              }}
            >
              <div style={{
                fontSize: 22, fontWeight: 900, color: '#fef2f2', marginBottom: 4
              }}>{bg}</div>
              <div style={{ fontSize: 11, color: '#b91c1c', fontWeight: 600 }}>AVAILABLE</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(185,28,28,0.1), rgba(127,29,29,0.05))',
        borderTop: '1px solid rgba(185,28,28,0.2)',
        borderBottom: '1px solid rgba(185,28,28,0.2)',
        textAlign: 'center',
        margin: '40px 0'
      }}>
        <h2 style={{ fontSize: 42, fontWeight: 900, color: '#fef2f2', marginBottom: 16 }}>
          Ready to Save a <span className="gradient-text">Life?</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: 17, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Join thousands of donors and requesters already making a difference through RaktSeva.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register?role=donor" className="btn-primary" style={{ fontSize: 17, padding: '16px 36px' }}>
            🩸 Register as Donor
          </Link>
          <Link href="/login" className="btn-secondary" style={{ fontSize: 17, padding: '16px 36px' }}>
            🔑 Login to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 24px 32px',
        borderTop: '1px solid rgba(185,28,28,0.15)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>🩸</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fef2f2' }}>Rakt<span style={{ color: '#b91c1c' }}>Seva</span></span>
        </div>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>
          Affiliated with Parul Sevashram Hospital, Waghodia, Vadodara, Gujarat.
        </p>
        <p style={{ color: '#4b5563', fontSize: 13 }}>
          © 2024 RaktSeva. Every Drop, A New Life.
        </p>
      </footer>
    </div>
  );
}
