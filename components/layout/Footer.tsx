'use client';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setStatus('idle');
        try {
            const res = await fetch('/api/brevo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'subscribe', email }),
            });
            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <footer style={{ background: 'var(--announce-bg)', color: 'rgba(255,255,255,0.75)', paddingTop: '52px', marginTop: '12px' }}>
            <div className="container" style={{ padding: '0 var(--gutter)' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 1.2fr', gap: '32px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* Brand & Newsletter */}
                    <div>
                        <a href="/" style={{ display: 'flex', alignItems: 'center', height: '64px', marginBottom: '20px' }}>
                            <img src="/images/newlogo.png" alt="JEFEDO" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                        </a>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '24px', color: 'rgba(255,255,255,0.5)' }}>Your one-stop multi-vendor marketplace. Shop from thousands of verified sellers.</p>
                        <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{ flex: 1, padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)' }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{ padding: '16px 24px', background: 'var(--accent)', color: '#fff', fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', transition: 'all 0.2s', cursor: loading ? 'not-allowed' : 'pointer' }}
                                    onMouseEnter={e => !loading && (e.currentTarget.style.background = 'var(--primary)')}
                                    onMouseLeave={e => !loading && (e.currentTarget.style.background = 'var(--accent)')}
                                >
                                    {loading ? '...' : 'Subscribe'}
                                </button>
                            </div>
                            {status === 'success' && <p style={{ position: 'absolute', bottom: '-24px', left: '0', fontSize: '11px', color: 'var(--success)', fontWeight: 700 }}>✓ Subscribed successfully!</p>}
                            {status === 'error' && <p style={{ position: 'absolute', bottom: '-24px', left: '0', fontSize: '11px', color: 'var(--danger)', fontWeight: 700 }}>⚠ Subscription failed.</p>}
                        </form>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ fontSize: '12px', lineHeight: 1.6 }}>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
                            <p style={{ fontSize: '12px' }}>📧 support@jefedo.com</p>
                            <p style={{ fontSize: '12px' }}>📞 +88015-88888-9999</p>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Account</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {[
                                { label: 'My Account', href: '/account' },
                                { label: 'Login / Register', href: '/auth' },
                                { label: 'Cart', href: '/cart' },
                                { label: 'Orders', href: '/account?tab=orders' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                                >{item.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: 'Privacy Policy', href: '#' },
                                { label: 'Terms Of Use', href: '#' },
                                { label: 'FAQ', href: '#' },
                                { label: 'Contact', href: '/contact' },
                                { label: 'About Us', href: '/about' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                                >{item.label}</a>
                            ))}
                            <a href="/auth?type=seller" style={{
                                marginTop: '8px',
                                display: 'inline-block',
                                textAlign: 'center',
                                padding: '10px 20px',
                                background: 'var(--primary)',
                                border: '1.5px solid var(--primary)',
                                color: '#fff',
                                borderRadius: '100px',
                                fontSize: '12px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'all 0.3s'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-dark)'; e.currentTarget.style.borderColor = 'var(--primary-dark)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(238,18,23,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >Become a Seller</a>
                        </div>
                    </div>

                    {/* Socials Column */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {['𝕏', 'f', 'in', '📸'].map((s, i) => (
                                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff', background: 'rgba(255,255,255,0.05)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
                                >{s}</a>
                            ))}
                        </div>
                        <p style={{ marginTop: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>Architecting the future of global commerce, today.</p>
                    </div>
                </div>
                <div style={{ padding: '18px 0', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                    © {new Date().getFullYear()} Jefedo. All rights reserved.
                </div>
            </div>
        </footer>
    );
}