const badges = [
    { icon: '🚚', title: 'Reliable Delivery', desc: 'On all  orders' },
    { icon: '↩️', title: '24 Hours Return', desc: 'Based on our return policy' },
    { icon: '🔒', title: 'Secure Payment', desc: 'Your money is safe' },
    { icon: '🎧', title: '24/7 Support', desc: '1–2 days of message' },
];

export default function TrustBadges() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 22px' }}>
            <div className="trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {badges.map((b) => (
                    <div key={b.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '24px', flexShrink: 0 }}>{b.icon}</span>
                        <div>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '1px' }}>{b.title}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}