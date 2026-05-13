'use client';

export default function PromoBanners() {
    const banners = [
        {
            tag: 'Sell on Jefedo',
            title: 'Master Your Business',
            desc: 'Manage your store, track real-time sales and scale with professional tools.',
            cta: 'Vendor Dashboard',
            emoji: '📈',
            bg: 'linear-gradient(135deg, var(--secondary-light) 0%, #dbeafe 100%)',
            titleColor: 'var(--secondary-dark)',
            tagColor: 'var(--secondary)',
            descColor: 'var(--secondary-dark)cc',
            ctaBg: 'var(--secondary)',
            ctaColor: '#fff',
            ctaBorder: 'none',
            href: '/account?tab=orders'
        },
        {
            tag: 'Order History',
            title: 'Seamless Management',
            desc: 'Monitor your orders from click to delivery and manage your account essentials.',
            cta: 'Manage Account',
            emoji: '📦',
            bg: 'linear-gradient(135deg, var(--primary-light) 0%, #fee2e2 100%)',
            titleColor: 'var(--primary-dark)',
            tagColor: 'var(--primary)',
            descColor: 'var(--primary-dark)cc',
            ctaBg: 'var(--primary)',
            ctaColor: '#fff',
            ctaBorder: 'none',
            href: '/account'
        },
    ];
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div className="promo-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
                {banners.map((b) => (
                    <div key={b.title} className="promo-banner-inner"
                        style={{
                            background: b.bg,
                            borderRadius: 'var(--radius-2xl)',
                            padding: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(0,0,0,0.03)',
                            overflow: 'hidden',
                            minHeight: '200px',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                        }}
                    >
                        {/* Decorative Circle */}
                        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', zIndex: 0 }} />

                        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: b.tagColor, marginBottom: '10px' }}>{b.tag}</p>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: b.titleColor, marginBottom: '10px', lineHeight: 1.1, letterSpacing: '-0.5px' }}>{b.title}</h3>
                            <p style={{ fontSize: '14px', color: b.descColor, marginBottom: '24px', lineHeight: 1.5, maxWidth: '240px', fontWeight: 500 }}>{b.desc}</p>
                            <a href={b.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 26px', borderRadius: '50px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', background: b.ctaBg, color: b.ctaColor, border: b.ctaBorder, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>{b.cta} →</a>
                        </div>
                        <div className="promo-emoji" style={{ fontSize: '88px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))', opacity: 1, position: 'relative', zIndex: 1, transform: 'rotate(5deg)' }}>{b.emoji}</div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .promo-banner-inner:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }
                @media (max-width: 768px) {
                    .promo-grid { grid-template-columns: 1fr !important; }
                    .promo-banner-inner { padding: 24px !important; min-height: 180px !important; }
                    .promo-emoji { fontSize: 64px !important; }
                }
            `}</style>
        </section>
    );
}