'use client';

export default function AboutPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
            {/* Hero Section */}
            <div className="about-hero" style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                padding: '120px 0 160px', 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(180px)', opacity: 0.15 }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'var(--secondary)', filter: 'blur(180px)', opacity: 0.15 }}></div>

                <div className="container animate-in">
                    <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'var(--primary)', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '32px' }}>
                        Our Vision 2026
                    </div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 900, 
                        fontSize: 'clamp(42px, 8vw, 72px)', 
                        color: '#fff', 
                        marginBottom: '24px',
                        letterSpacing: '-2.5px',
                        lineHeight: 1.05
                    }}>
                        Architecting the <span style={{ color: 'var(--primary)' }}>Future</span> of Global Trade.
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: 'rgba(255,255,255,0.7)', 
                        maxWidth: '750px', 
                        margin: '0 auto 48px',
                        lineHeight: 1.6
                    }}>
                        We aren't just a marketplace. We are the decentralized infrastructure for the next generation of commerce, built on velocity, security, and global reach.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button style={{ padding: '16px 36px', background: 'var(--primary)', color: '#fff', borderRadius: '14px', fontWeight: 800, fontSize: '16px', boxShadow: '0 10px 40px -10px rgba(238,18,23,0.5)' }}>Explore Marketplace</button>
                        <button style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '14px', fontWeight: 700, fontSize: '16px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>Watch Manifesto</button>
                    </div>
                </div>
            </div>

            {/* Impact Grid */}
            <div className="container impact-grid" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                <div className="impact-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '100px' }}>
                    {[
                        { title: 'Global Velocity', val: '0.04ms', desc: 'Zero-latency transaction layer for instantaneous trade execution.' },
                        { title: 'Secure Prototcol', val: 'AES-512', desc: 'Military-grade encryption securing every identity and asset.' },
                        { title: 'Elite Network', val: '10k+', desc: 'A curated ecosystem of premium verified merchants and creators.' }
                    ].map((s, i) => (
                        <div key={i} className="impact-card" style={{
                            padding: '48px 40px',
                            background: 'var(--surface)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--border)',
                            borderRadius: '32px',
                            boxShadow: 'var(--shadow-lg)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{s.title}</p>
                            <p className="impact-val" style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>{s.val}</p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="mission-section" style={{ background: 'var(--surface)', padding: '120px 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="mission-title" style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                            Our Mission is to <span style={{ color: 'var(--primary)' }}>Empower</span> Every Merchant.
                        </h2>
                        <div style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            <p style={{ marginBottom: '24px' }}>
                                Jefado was founded on the principle that commerce should be borderless and frictionless. We build the tools that empower vendors to reach their full potential.
                            </p>
                            <p>
                                By 2026, our goal is to become the primary layer for the global multi-vendor ecosystem, ensuring every transaction is backed by the most robust technology stack ever built.
                            </p>
                        </div>
                        <div style={{ marginTop: '48px', display: 'flex', gap: '40px', justifyContent: 'center' }}>
                            <div>
                                <p style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>32+</p>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Nodes</p>
                            </div>
                            <div style={{ width: '1px', background: 'var(--border)' }} />
                            <div>
                                <p style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>$1.2B</p>
                                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Volume Processed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-in { animation: fadeInUp 0.6s ease both; }
                
                @media (max-width: 768px) {
                    .about-hero { padding: 60px 0 60px !important; }
                    .impact-grid { margin-top: -30px !important; padding: 0 16px !important; }
                    .impact-container { grid-template-columns: 1fr !important; gap: 12px !important; }
                    .impact-card { padding: 20px !important; borderRadius: 20px !important; }
                    .impact-val { font-size: 24px !important; margin-bottom: 8px !important; }
                    .mission-section { padding: 40px 0 !important; }
                    .mission-title { font-size: 24px !important; }
                }
            `}</style>
        </div>
    );
}
