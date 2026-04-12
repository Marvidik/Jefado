'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
        <div style={{ background: '#020617', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                .contact-container { max-width: 1200px; margin: 0 auto; padding: 120px 24px; position: relative; z-index: 10; }
                .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 80px; align-items: flex-start; }
                .contact-title { font-family: var(--font-display); fontSize: 64px; font-weight: 900; margin-bottom: 24px; letter-spacing: -2px; line-height: 1; }
                .contact-form-card { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.1); padding: 48px; borderRadius: 32px; boxShadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

                @media (max-width: 1024px) {
                    .contact-container { padding: 80px 24px; }
                    .contact-grid { gap: 40px; }
                    .contact-title { font-size: 48px; }
                }

                @media (max-width: 768px) {
                    .contact-container { padding: 60px 20px; }
                    .contact-grid { grid-template-columns: 1fr; gap: 60px; }
                    .contact-title { font-size: 38px; }
                    .contact-form-card { padding: 32px 24px; }
                    .form-row { grid-template-columns: 1fr; }
                }
            `}</style>
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(26,86,219,0.1)', filter: 'blur(100px)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(249,115,22,0.05)', filter: 'blur(100px)' }} />

            <div className="contact-container">
                <div className="contact-grid">
                    
                    {/* Left: Info */}
                    <div>
                        <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--primary)', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                            Comm Link Initiated
                        </div>
                        <h1 className="contact-title">Connect with the Hub.</h1>
                        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '48px', maxWidth: '400px' }}>
                            Need assistance with your node or merchant account? Our support protocols are active 24/7.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {[
                                { label: 'Direct Support', val: 'support@jefado.io', icon: '📩' },
                                { label: 'Merchant Relations', val: '+1 (888) 2026-HUB', icon: '📞' },
                                { label: 'Core Headquarters', val: 'Silicon Valley Node, CA', icon: '📍' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</p>
                                        <p style={{ fontSize: '18px', fontWeight: 600 }}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-card">
                        {sent ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', boxShadow: '0 10px 30px rgba(22,163,74,0.3)' }}>✓</div>
                                <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Protocol Received</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Your transmission has been logged. Our agents will respond shortly.</p>
                                <button onClick={() => setSent(false)} style={{ marginTop: '32px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Send Another Transmission</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div className="form-row">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                        <input required type="text" placeholder="Identity" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Digital Mail</label>
                                        <input required type="email" placeholder="Mail-relay" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Subject</label>
                                    <select style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', appearance: 'none' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                                        <option>Merchant Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Partnership Request</option>
                                        <option>Security Protocol</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Transmission</label>
                                    <textarea required placeholder="Payload content..." rows={5} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', resize: 'none' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                </div>
                                <button type="submit" disabled={loading} style={{ 
                                    padding: '18px', 
                                    background: 'var(--primary)', 
                                    color: '#fff', 
                                    borderRadius: '14px', 
                                    fontWeight: 800, 
                                    fontSize: '16px', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    boxShadow: '0 10px 30px -10px rgba(238,18,23,0.5)',
                                    transition: 'all 0.2s',
                                    marginTop: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>{loading ? '⏳ Synchronizing Payload…' : 'Finalize Transmission →'}</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
