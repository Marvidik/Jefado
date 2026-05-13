'use client';
import { useState } from 'react';

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        
        const payload = {
            action: 'contact',
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/brevo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                setSent(true);
            } else {
                setError(data.error || 'Transmission failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while synchronizing with the hub.');
        } finally {
            setLoading(false);
        }
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
                                Contact Us
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
                                Get in <span style={{ color: 'var(--primary)' }}>Touch.</span>
                            </h1>
                            <p className="contact-desc" style={{
                                fontSize: '18px',
                                color: 'rgba(255,255,255,0.6)',
                                lineHeight: 1.7,
                                marginBottom: '48px'
                            }}>
                                Have questions or need support? Our team is available 24/7 to help you with your business needs and ensure a seamless experience.
                            </p>

                            <div className="contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {[
                                    { label: 'Customer Support', val: 'support@jefedo.com', icon: '📩' },
                                    { label: 'Direct Line', val: '+2347064957209', icon: '📞' },
                                    { label: 'Headquarters', val: 'no 10 JEFEDO street , amafor nkpor idemili lga anambra state nigeria', icon: '📍' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <div className="contact-info-icon" style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', backdropFilter: 'blur(10px)' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{item.label}</p>
                                            <p style={{ fontSize: '16px', fontWeight: 600, color: '#fff', maxWidth: '300px' }}>{item.val}</p>
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
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Message Sent!</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Thank you for reaching out. We have received your message and will get back to you shortly.</p>
                                    <button onClick={() => setSent(false)} style={{ marginTop: '48px', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px 28px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                                    >Send Another Message</button>
                                </div>
                            ) : (
                                <>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Send Message</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '8px' }}>Please fill out the form below.</p>

                                    {error && (
                                        <div style={{ background: 'rgba(238,18,23,0.1)', border: '1px solid var(--primary)', color: '#fff', padding: '12px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px' }}>
                                            ⚠ {error}
                                        </div>
                                    )}

                                    <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                                <input name="name" required type="text" placeholder="Enter your name" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                                                <input name="email" required type="email" placeholder="Enter your email" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Inquiry Type</label>
                                            <select name="subject" style={{ 
                                                background: 'rgba(255,255,255,0.05)', 
                                                border: '1.5px solid rgba(255,255,255,0.1)', 
                                                padding: '16px 20px', 
                                                borderRadius: '16px', 
                                                color: '#fff', 
                                                outline: 'none', 
                                                appearance: 'none',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s'
                                            }} 
                                            onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} 
                                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                                                <option style={{ background: '#0f172a', color: '#fff' }}>General Inquiry</option>
                                                <option style={{ background: '#0f172a', color: '#fff' }}>Support Request</option>
                                                <option style={{ background: '#0f172a', color: '#fff' }}>Shipping & Logistics</option>
                                                <option style={{ background: '#0f172a', color: '#fff' }}>Business Partnership</option>
                                            </select>
                                            <div style={{ position: 'absolute', right: '20px', bottom: '18px', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>▼</div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</label>
                                            <textarea name="message" required rows={4} placeholder="How can we help you?" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: '16px', color: '#fff', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')} onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}></textarea>
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
                                            {loading ? '⏳ Sending Message…' : 'Send Message →'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Marketing Section */}
            <div style={{ padding: '120px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '8px 24px', background: 'rgba(238,18,23,0.1)', border: '1px solid rgba(238,18,23,0.2)', borderRadius: '100px', color: 'var(--primary)', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        The Jefedo Advantage
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#0f172a', marginBottom: '64px', letterSpacing: '-1.5px' }}>
                        Why Businesses <span style={{ color: 'var(--primary)' }}>Trust Us</span>
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        {[
                            { title: 'Secure Ecosystem', desc: 'Advanced encryption and escrow systems ensuring every transaction is 100% protected.', icon: '🛡️', color: '#EE1217', bg: '#fef2f2' },
                            { title: 'Swift Logistics', desc: 'Strategic delivery partnerships across Nigeria for rapid, reliable order fulfillment.', icon: '⚡', color: '#3b82f6', bg: '#eff6ff' },
                            { title: 'Verified Quality', desc: 'Stringent vendor verification process to ensure only premium products reach your door.', icon: '💎', color: '#f59e0b', bg: '#fffbeb' },
                            { title: 'Global Scaling', desc: 'Advanced tools designed to help small businesses reach millions of potential customers.', icon: '📈', color: '#22c55e', bg: '#f0fdf4' }
                        ].map(feature => (
                            <div key={feature.title} className="presence-card" style={{ 
                                background: '#fff', 
                                border: '1px solid #e2e8f0', 
                                padding: '48px 32px', 
                                borderRadius: '32px', 
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: feature.color }}></div>
                                <div style={{ width: '72px', height: '72px', background: feature.bg, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '32px' }}>
                                    {feature.icon}
                                </div>
                                <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>{feature.title}</h4>
                                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-in { animation: fadeInUp 0.5s ease both; }
                
                .presence-card:hover {
                    background: rgba(255,255,255,0.05) !important;
                    border-color: rgba(255,255,255,0.1) !important;
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }

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
