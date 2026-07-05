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
        <footer style={{ background: '#070b13', borderTop: '4px solid var(--primary)', color: '#cbd5e1', paddingTop: '56px', marginTop: '12px', overflow: 'hidden' }}>
            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1.2fr 1fr 1fr 1.2fr;
                    gap: 32px;
                    padding-bottom: 40px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }
                @media (max-width: 1100px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 24px;
                    }
                }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 28px;
                    }
                }
                @media (max-width: 500px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 28px;
                    }
                }
                .footer-become-seller {
                    display: block;
                    text-align: center;
                    width: 100%;
                    box-sizing: border-box;
                }
            `}</style>
            <div className="container" style={{ padding: '0 var(--gutter)' }}>
                <div className="footer-grid">

                    {/* Brand & Newsletter */}
                    <div>
                        <a href="/" style={{ display: 'flex', alignItems: 'center', height: '64px', marginBottom: '20px' }}>
                            <img src="/images/newlogo.png" alt="JEFEDO" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                        </a>
                        <p style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px', color: '#94a3b8' }}>
                            Your premium one-stop multi-vendor marketplace. Shop safely from thousands of verified sellers worldwide.
                        </p>
                        <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{ flex: 1, padding: '16px 20px', background: '#111827', border: '1.5px solid #374151', borderRight: 'none', borderRadius: '12px 0 0 12px', outline: 'none', color: '#ffffff', fontSize: '14px', fontFamily: 'var(--font-body)' }}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{ padding: '16px 24px', background: 'var(--primary)', color: '#ffffff', fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-body)', border: '1.5px solid var(--primary)', borderRadius: '0 12px 12px 0', whiteSpace: 'nowrap', transition: 'all 0.25s ease', cursor: loading ? 'not-allowed' : 'pointer' }}
                                    onMouseEnter={e => !loading && (e.currentTarget.style.background = 'var(--primary-dark)', e.currentTarget.style.borderColor = 'var(--primary-dark)')}
                                    onMouseLeave={e => !loading && (e.currentTarget.style.background = 'var(--primary)', e.currentTarget.style.borderColor = 'var(--primary)')}
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
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#ffffff', marginBottom: '8px', letterSpacing: '0.5px' }}>Support</h4>
                        <div style={{ width: '28px', height: '2.5px', background: 'var(--primary)', marginBottom: '18px', borderRadius: '2px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.65 }}>
                            <p style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '16px', flexShrink: 0 }}>📍</span>
                                <span>No. 10 Jefedo Street, Amafor Nkpor, Idemili LGA, Anambra State, Nigeria.</span>
                            </p>
                            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '16px', flexShrink: 0 }}>📧</span>
                                <a href="mailto:support@jefedo.com" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                                >support@jefedo.com</a>
                            </p>
                            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '16px', flexShrink: 0 }}>📞</span>
                                <a href="tel:+2347064957209" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                                >+2347064957209</a>
                            </p>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#ffffff', marginBottom: '8px', letterSpacing: '0.5px' }}>Account</h4>
                        <div style={{ width: '28px', height: '2.5px', background: 'var(--primary)', marginBottom: '18px', borderRadius: '2px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { label: 'My Account', href: '/account' },
                                { label: 'Login / Register', href: '/auth' },
                                { label: 'Cart', href: '/cart' },
                                { label: 'Orders', href: '/account?tab=orders' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{ fontSize: '13px', color: '#cbd5e1', transition: 'all 0.2s ease' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0'; }}
                                >{item.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#ffffff', marginBottom: '8px', letterSpacing: '0.5px' }}>Quick Links</h4>
                        <div style={{ width: '28px', height: '2.5px', background: 'var(--primary)', marginBottom: '18px', borderRadius: '2px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                { label: 'Refund Policy', href: '/refund-policy' },
                                { label: 'Payment & Delivery Policy', href: '/payment-delivery-policy' },
                                { label: 'Terms Of Use', href: '/terms-of-use' },
                                { label: 'FAQ', href: '#' },
                                { label: 'Contact', href: '/contact' },
                                { label: 'About Us', href: '/about' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{ fontSize: '13px', color: '#cbd5e1', transition: 'all 0.2s ease' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0'; }}
                                >{item.label}</a>
                            ))}
                            <a href="/auth?type=seller" className="footer-become-seller" style={{
                                marginTop: '10px',
                                padding: '11px 24px',
                                background: 'linear-gradient(135deg, var(--primary) 0%, #ff4b50 100%)',
                                border: 'none',
                                color: '#ffffff',
                                borderRadius: '100px',
                                fontSize: '12.5px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 15px rgba(238,18,23,0.2)'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(238,18,23,0.45)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(238,18,23,0.2)'; }}
                            >Become a Seller</a>
                        </div>
                    </div>

                    {/* Socials Column */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: '#ffffff', marginBottom: '8px', letterSpacing: '0.5px' }}>Connect</h4>
                        <div style={{ width: '28px', height: '2.5px', background: 'var(--primary)', marginBottom: '18px', borderRadius: '2px' }} />
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {[
                                {
                                    name: 'X',
                                    href: 'https://x.com/Jefed0',
                                    icon: (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Facebook',
                                    href: 'https://www.facebook.com/profile.php?id=61582466183594',
                                    icon: (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V2h-3C10.5 2 9 3.5 9 6v2z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'LinkedIn',
                                    href: 'https://www.linkedin.com/company/jefedo/',
                                    icon: (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <circle cx="4.98" cy="4" r="2.5" />
                                            <rect x="2.5" y="9" width="5" height="15" />
                                            <path d="M16.5 9c-2.7 0-4.5 1.5-5 2.5V9h-5v15h5v-8c0-1.5.5-3 2.5-3s2.5 1.5 2.5 3v8h5V15c0-4.5-2.5-6-5-6z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Instagram',
                                    href: 'https://www.instagram.com/jefed.o/',
                                    icon: (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                        </svg>
                                    )
                                }
                            ].map((social, i) => (
                                <a key={i} id={`footer-social-${social.name.toLowerCase()}`} href={social.href} aria-label={social.name} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', background: 'rgba(255,255,255,0.08)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 5px 15px rgba(238,18,23,0.4)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
                                >{social.icon}</a>
                            ))}
                        </div>
                        <p style={{ marginTop: '24px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>
                            Architecting the future of global commerce, today.
                        </p>
                    </div>
                </div>
                <div style={{ padding: '24px 0', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
                    © {new Date().getFullYear()} Jefedo. All rights reserved.
                </div>
            </div>
        </footer>
    );
}