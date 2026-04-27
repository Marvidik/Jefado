'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
            {/* Hero & Contact Section */}
            <div className="contact-hero" style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                padding: '100px 0 180px', 
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'var(--primary)', filter: 'blur(200px)', opacity: 0.1 }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'var(--secondary)', filter: 'blur(200px)', opacity: 0.1 }}></div>

                <div className="container animate-in">
                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
                        
                        {/* Left Info */}
                        <div>
                            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'var(--primary)', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '32px' }}>
                                Comm Link Alpha
                            </div>
                            <h1 className="contact-title" style={{ 
                                fontFamily: 'var(--font-display)', 
                                fontWeight: 900, 
                                fontSize: 'clamp(40px, 6vw, 68px)', 
                                color: '#fff', 
                                marginBottom: '24px',
                                letterSpacing: '-2.5px',
                                lineHeight: 1.1
                            }}>
                                Connect with the <span style={{ color: 'var(--primary)' }}>Hub.</span>
                            </h1>
                            <p className="contact-desc" style={{ 
                                fontSize: '18px', 
                                color: 'rgba(255,255,255,0.6)', 
                                lineHeight: 1.7, 
                                marginBottom: '48px'
                            }}>
                                Need technical assistance or merchant support? Our protocol is active 24/7 to ensure your global trade never stops.
                            </p>

                            <div className="contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {[
                                    { label: 'Merchant Support', val: 'support@jefado.io', icon: '📩' },
                                    { label: 'Voice Relay', val: '+1 (888) 2026-HUB', icon: '📞' },
                                    { label: 'Headquarters', val: 'Silicon Valley Node 01, CA', icon: '📍' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <div className="contact-info-icon" style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', backdropFilter: 'blur(10px)' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{item.label}</p>
                                            <p style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Form Card */}
                        <div className="contact-form-card" style={{ 
                            background: 'rgba(255, 255, 255, 0.03)', 
                            backdropFilter: 'blur(40px)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '48px', 
                            borderRadius: '40px', 
                            boxShadow: '0 40px 100px rgba(0,0,0,0.5)' 
                        }}>
                            {sent ? (
                                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                    <div style={{ width: '100px', height: '100px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '40px', boxShadow: '0 15px 40px rgba(34,197,94,0.3)' }}>✓</div>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Transmission Sent.</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Your payload has been synchronized with our core nodes. We will respond shortly.</p>
                                    <button onClick={() => setSent(false)} style={{ marginTop: '48px', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px 28px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                                    >Send New Message</button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Identify</label>
                                            <input required type="text" placeholder="Full Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Mail-Relay</label>
                                            <input required type="email" placeholder="Email Address" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Payload Type</label>
                                        <select style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', appearance: 'none' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                                            <option>Merchant Inquiry</option>
                                            <option>Technical Support</option>
                                            <option>Global Logistics</option>
                                            <option>Partnership Protocol</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</label>
                                        <textarea required rows={4} placeholder="How can we assist your business?" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}></textarea>
                                    </div>
                                    <button type="submit" disabled={loading} style={{ 
                                        marginTop: '12px',
                                        padding: '20px', 
                                        background: 'var(--primary)', 
                                        color: '#fff', 
                                        borderRadius: '16px', 
                                        fontWeight: 800, 
                                        fontSize: '16px', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '1.5px',
                                        boxShadow: '0 12px 30px rgba(238,18,23,0.3)',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        {loading ? '⏳ Synchronizing Payload…' : 'Finalize Transmission →'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Node Map placeholder */}
            <div style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '48px', letterSpacing: '-0.5px' }}>Global Infrastructure Status</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
                        {[
                            { name: 'North America', status: 'Online', latency: '12ms' },
                            { name: 'Europe Hub', status: 'Online', latency: '18ms' },
                            { name: 'Asia Pacific', status: 'Optimal', latency: '24ms' },
                            { name: 'Africa Core', status: 'Online', latency: '32ms' }
                        ].map(node => (
                            <div key={node.name} style={{ textAlign: 'center' }}>
                                <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', margin: '0 auto 12px', boxShadow: '0 0 15px var(--success)' }}></div>
                                <p style={{ fontWeight: 800, fontSize: '14px' }}>{node.name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{node.latency} latency</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-in { animation: fadeInUp 0.5s ease both; }
                
                @media (max-width: 768px) {
                    .contact-hero { padding: 60px 0 100px !important; }
                    .contact-grid { gap: 40px !important; }
                    .contact-form-card { padding: 32px 24px !important; }
                    .contact-form { gap: 16px !important; }
                    .contact-form > div { gap: 4px !important; }
                    .contact-title { font-size: 36px !important; margin-bottom: 16px !important; }
                    .contact-desc { margin-bottom: 32px !important; font-size: 16px !important; }
                    .contact-info-list { gap: 20px !important; }
                    .contact-info-icon { width: 52px !important; height: 52px !important; fontSize: 22px !important; }
                }
            `}</style>
        </div>
    );
}
