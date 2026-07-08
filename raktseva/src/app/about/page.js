'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0505 0%, #1a0505 50%, #0f0000 100%)',
      padding: '0 0 80px'
    }}>
      {/* Navbar */}
      <nav className="navbar">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 24 }}>🩸</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fef2f2' }}>
            Rakt<span style={{ color: '#b91c1c' }}>Seva</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/login" className="btn-secondary" style={{ padding: '8px 18px', fontSize: 14 }}>Login</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>Register</Link>
        </div>
      </nav>

      <div className="bg-blob" style={{ width: 400, height: 400, background: '#b91c1c', top: -100, right: -100 }} />

      {/* Hero */}
      <section style={{
        padding: '140px 24px 80px', maxWidth: 800,
        margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1
      }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🏥</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fef2f2', marginBottom: 16, lineHeight: 1.2 }}>
          About <span className="gradient-text">RaktSeva</span>
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
          RaktSeva is a blood bank management platform built with the vision that no life should be lost due to a lack of blood or information. 
          We believe every drop matters, and every second counts.
        </p>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            {
              icon: '🩸', title: 'Our Mission',
              text: 'To create a seamless bridge between blood donors and patients in need, leveraging smart matching algorithms, location awareness, and instant notifications to save lives faster.'
            },
            {
              icon: '🌟', title: 'Our Vision',
              text: 'A world where geographical and informational barriers never stand between a patient and the blood they need. A future powered by community and compassion.'
            },
            {
              icon: '🏥', title: 'Our Partnership',
              text: 'RaktSeva is affiliated with Parul Sevashram Hospital, Waghodia, Vadodara — one of the leading multispecialty hospitals in Gujarat, ensuring professional medical oversight.'
            }
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fef2f2', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: 15 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Info */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="glass-card" style={{
          padding: 48, display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 260px' }}>
            <div style={{
              background: 'rgba(185,28,28,0.15)', borderRadius: 16, padding: 32,
              textAlign: 'center', border: '1px solid rgba(185,28,28,0.3)'
            }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🏥</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fef2f2', marginBottom: 4 }}>Parul Sevashram Hospital</div>
              <div style={{ fontSize: 14, color: '#9ca3af' }}>Partner Hospital</div>
            </div>
          </div>
          <div style={{ flex: '2 1 300px' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fef2f2', marginBottom: 16, lineHeight: 1.3 }}>
              Our <span className="gradient-text">Partner</span> Hospital
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Parul Sevashram Hospital is a state-of-the-art tertiary care hospital located in Waghodia, Vadodara, Gujarat. 
              It is part of the Parul University campus and is known for its world-class facilities.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['📍 Location', 'Waghodia, Vadodara, Gujarat, India'],
                ['🔬 Specialty', 'Multi-Specialty Tertiary Care Hospital'],
                ['🩸 Blood Bank', 'Licensed Blood Bank with 24/7 service'],
                ['🏆 Affiliation', 'Parul University Health System']
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fca5a5', whiteSpace: 'nowrap' }}>{label}:</span>
                  <span style={{ fontSize: 14, color: '#e5e7eb' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '0 24px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fef2f2', marginBottom: 16 }}>
          Be the Reason Someone <span className="gradient-text">Lives</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 32 }}>Register today and join our life-saving community.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register?role=donor" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            🩸 Become a Donor
          </Link>
          <Link href="/register?role=requester" className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
            🏥 Request Blood
          </Link>
        </div>
      </section>
    </div>
  );
}
