export default function FullWidthPromo() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div className="promo-full" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, var(--primary-light) 100%)', borderRadius: 'var(--radius-xl)', padding: '36px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border)', overflow: 'hidden', position: 'relative', gap: '20px' }}>
                <div style={{ position: 'absolute', right: '300px', top: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(26,86,219,0.05)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '20px', marginBottom: '14px' }}>Save up to $200.00</span>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', letterSpacing: '-1px', marginBottom: '10px' }}>Macbook Pro</h2>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage</p>
                    <a href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: '#fff', padding: '12px 28px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 20px rgba(26,86,219,0.3)', textDecoration: 'none' }}>Shop Now →</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
                    <div style={{ background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(26,86,219,0.4)', textAlign: 'center', lineHeight: 1.1 }}>$1999</div>
                    <div className="promo-full-emoji" style={{ fontSize: '110px', filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.15))' }}>💻</div>
                </div>
            </div>
        </section>
    );
}