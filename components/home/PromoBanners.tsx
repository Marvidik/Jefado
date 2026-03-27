export default function PromoBanners() {
    const banners = [
        { tag: 'Introducing New', title: 'New Apple HomePod Mini', desc: 'Jam-packed with innovation. HomePod mini delivers unexpectedly.', cta: 'Shop Now', emoji: '🔊', bg: 'var(--surface)', titleColor: 'var(--text-primary)', tagColor: 'var(--primary)', descColor: 'var(--text-muted)', ctaStyle: { background: 'transparent', color: 'var(--primary)', border: '1.5px solid var(--primary)' } },
        { tag: 'Introducing New', title: 'Xiaomi Mi 11 Ultra 12GB+256GB', desc: 'Data provided by internet, laboratories, and industry measurement.', cta: 'Shop Now', emoji: '📱', bg: 'var(--announce-bg)', titleColor: '#fff', tagColor: '#60a5fa', descColor: 'rgba(255,255,255,0.6)', ctaStyle: { background: 'var(--primary)', color: '#fff', border: 'none' }, price: '$580' },
    ];

    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div className="promo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {banners.map((b) => (
                    <div key={b.title} className="promo-banner-inner" style={{ background: b.bg, borderRadius: 'var(--radius-xl)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border)', overflow: 'hidden', minHeight: '160px' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: b.tagColor, marginBottom: '6px' }}>{b.tag}</p>
                            {b.price && <div style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', padding: '2px 10px', borderRadius: '20px', marginBottom: '6px' }}>{b.price}</div>}
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: b.titleColor, marginBottom: '6px', lineHeight: 1.25 }}>{b.title}</h3>
                            <p style={{ fontSize: '12px', color: b.descColor, marginBottom: '16px', lineHeight: 1.5, maxWidth: '200px' }}>{b.desc}</p>
                            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', transition: 'all 0.2s', ...b.ctaStyle }}>{b.cta} →</button>
                        </div>
                        <div className="promo-emoji" style={{ fontSize: '72px', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))', marginLeft: '16px', flexShrink: 0 }}>{b.emoji}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}