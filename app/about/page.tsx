'use client';
import { useState } from 'react';

export default function AboutPage() {
    return (
        <div style={{ background: '#0f172a', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '70vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("/images/about_vision.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.6,
                    zIndex: 1
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.9) 100%)',
                    zIndex: 2
                }} />
                
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', padding: '0 20px' }}>
                    <h1 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'clamp(40px, 8vw, 84px)', 
                        fontWeight: 900, 
                        lineHeight: 1, 
                        marginBottom: '24px',
                        background: 'linear-gradient(to bottom, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-4px'
                    }}>
                        Architecting the Future of Commerce
                    </h1>
                    <p style={{ 
                        fontSize: 'clamp(16px, 2vw, 20px)', 
                        color: 'rgba(255,255,255,0.7)', 
                        lineHeight: 1.6,
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        We aren&apos;t just a marketplace. We are the decentralized infrastructure for the next generation of global trade, power and velocity.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <button style={{ 
                            padding: '16px 32px', 
                            background: 'var(--primary)', 
                            color: '#fff', 
                            borderRadius: '14px', 
                            fontWeight: 800, 
                            border: 'none', 
                            fontSize: '16px',
                            boxShadow: '0 10px 30px -10px rgba(26,86,219,0.5)'
                        }}>Explore Our Core</button>
                    </div>
                </div>
            </div>

            {/* Features/Stats Grid */}
            <div style={{ maxWidth: '1200px', margin: '-100px auto 100px', padding: '0 24px', position: 'relative', zIndex: 20 }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '24px' 
                }}>
                    {[
                        { title: 'Global Velocity', val: '0.04ms', desc: 'Latency optimized transaction layer for instantaneous global trade.' },
                        { title: 'Secure Prototcol', val: 'AES-512', desc: 'Military-grade encryption for every identity and transaction.' },
                        { title: 'Elite Network', val: '10k+', desc: 'Curated ecosystem of top-tier verified merchants and brands.' }
                    ].map((s, i) => (
                        <div key={i} style={{
                            padding: '40px',
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            transition: 'transform 0.3s'
                        }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{s.title}</p>
                            <p style={{ fontSize: '42px', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>{s.val}</p>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '15px' }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vision Section */}
            <div style={{ maxWidth: '1000px', margin: '0 auto 120px', padding: '0 24px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-1.5px' }}>Our Mission</h2>
                <div style={{ fontSize: '20px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ marginBottom: '24px' }}>
                        Jefado was founded on the principle that commerce should be borderless, frictionless, and secure. We build the tools that empower small vendors to reach a global audience with the same velocity as multinational corporations.
                    </p>
                    <p>
                        By 2026, our goal is to become the primary layer for decentralized multi-vendor ecosystems, ensuring that every handshake, digital or physical, is backed by the most robust technology stack ever built.
                    </p>
                </div>
            </div>

            {/* Team/Node section placeholder */}
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '100px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div className="about-footer-grid">
                        <div>
                            <h3 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>Global Infrastructure</h3>
                            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '32px' }}>
                                Our servers are distributed across 32 regional nodes, ensuring that your store is always online and your customers always experience zero-latency shopping.
                            </p>
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                {['NA', 'EU', 'AS', 'AF', 'LATAM'].map(node => (
                                    <div key={node} style={{ padding: '8px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>{node}</div>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                             <div style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                background: 'linear-gradient(45deg, #1e293b, #0f172a)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                             }}>
                                 {/* Abstract technical visualization */}
                                 <div style={{ width: '80%', height: '80%', opacity: 0.3, border: '1px dashed rgba(255,255,255,0.5)', borderRadius: '50%', animation: 'spin 20s linear infinite' }} />
                                 <div style={{ position: 'absolute', width: '60%', height: '60%', opacity: 0.2, border: '1px solid var(--primary)', borderRadius: '50%', animation: 'spin 15s linear reverse infinite' }} />
                                 <p style={{ position: 'relative', zIndex: 5, fontSize: '14px', fontWeight: 700, letterSpacing: '2px', color: 'var(--primary)' }}>SYSTEM_CONNECTED</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .about-footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
                @media (max-width: 768px) {
                    .about-footer-grid { grid-template-columns: 1fr; gap: 40px; }
                    .about-footer-grid h3 { font-size: 28px; }
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
