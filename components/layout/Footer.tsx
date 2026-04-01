'use client';
export default function Footer() {
    return (
        <footer style={{ background: 'var(--announce-bg)', color: 'rgba(255,255,255,0.75)', paddingTop: '52px', marginTop: '12px' }}>
            <div className="container" style={{ padding: '0 var(--gutter)' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 1.2fr', gap: '32px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* Brand */}
                    <div>
                        <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#fff', letterSpacing: '-0.5px', display: 'block', marginBottom: '14px' }}>
                            Jefado<span style={{ color: 'var(--accent)' }}>.</span>
                        </a>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Your one-stop multi-vendor marketplace. Shop from thousands of verified sellers.</p>
                        <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <input placeholder="Enter your email" style={{ flex: 1, padding: '9px 12px', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                            <button style={{ padding: '9px 14px', background: 'var(--accent)', color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Subscribe</button>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ fontSize: '12px', lineHeight: 1.6 }}>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
                            <p style={{ fontSize: '12px' }}>📧 support@jefado.com</p>
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
                                { label: 'Wishlist', href: '/account?tab=wishlist' },
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {[
                                { label: 'Privacy Policy', href: '#' },
                                { label: 'Terms Of Use', href: '#' },
                                { label: 'FAQ', href: '#' },
                                { label: 'Contact', href: '#' },
                                { label: 'Become a Seller', href: '/auth?type=seller' },
                                { label: 'About Us', href: '#' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                                >{item.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Download */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>Download App</h4>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '14px' }}>Save $3 with App — New User Only</p>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                            <div style={{ width: '68px', height: '68px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📱</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {['App Store', 'Google Play'].map(store => (
                                    <a key={store} href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius)', padding: '5px 10px', fontSize: '11px', fontWeight: 600, color: '#fff' }}>
                                        {store === 'App Store' ? '🍎' : '🤖'} {store}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['𝕏', 'f', 'in', '📸'].map((s, i) => (
                                <a key={i} href="#" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
                                >{s}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ padding: '18px 0', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                    © {new Date().getFullYear()} Jefado. All rights reserved.
                </div>
            </div>
        </footer>
    );
}