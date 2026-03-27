'use client';

export default function Footer() {
    return (
        <footer style={{ background: 'var(--announce-bg)', color: 'rgba(255,255,255,0.8)', paddingTop: '52px', marginTop: '12px' }}>
            <div className="container" style={{ padding: '0 var(--gutter)' }}>
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 1.2fr', gap: '32px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* Brand + Newsletter */}
                    <div>
                        <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#fff', letterSpacing: '-0.5px', display: 'block', marginBottom: '16px' }}>
                            Jefado<span style={{ color: 'var(--accent)' }}>.</span>
                        </a>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', color: 'rgba(255,255,255,0.55)' }}>Your one-stop multi-vendor marketplace for everything you need, delivered fast.</p>
                        <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <input placeholder="Enter your email" style={{ flex: 1, padding: '9px 12px', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '12px', fontFamily: 'var(--font-body)' }} />
                            <button style={{ padding: '9px 14px', background: 'var(--primary)', color: '#fff', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Subscribe</button>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Support</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ fontSize: '12px', lineHeight: 1.6 }}>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
                            <p style={{ fontSize: '12px' }}>📧 exclusive@jefado.com</p>
                            <p style={{ fontSize: '12px' }}>📞 +88015-88888-9999</p>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Account</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'].map(item => (
                                <a key={item} href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                                >{item}</a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '16px' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact', 'Become a Seller', 'About Us'].map(item => (
                                <a key={item} href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                                >{item}</a>
                            ))}
                        </div>
                    </div>

                    {/* Download */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>Download App</h4>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '14px' }}>Save $3 with App — New User Only</p>
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
                                <a key={i} href="#" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>{s}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '18px 0', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                    © {new Date().getFullYear()} Jefado. All rights reserved. Powered by Jefado Retail Ltd.
                </div>
            </div>
        </footer>
    );
}