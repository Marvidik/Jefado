'use client';
import { ALL_PRODUCTS } from '@/lib/data';

const columns = [
    {
        title: 'Flash Sale Today', badge: '🔥', 
        products: ALL_PRODUCTS.filter(p => p.discount && p.discount > 25).slice(0, 4)
    },
    {
        title: 'Best Sellers', badge: '⭐', 
        products: ALL_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4)
    },
    {
        title: 'Top Rated', badge: '🏆', 
        products: ALL_PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 4)
    },
    {
        title: 'New Arrivals', badge: '✨', 
        products: ALL_PRODUCTS.filter(p => p.isNew).slice(0, 4)
    },
];

export default function BestSellers() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 40px' }}>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>This Month</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Best Selling Products</h2>
                    <a href="#" style={{ padding: '7px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>View All</a>
                </div>
            </div>

            <div className="bs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {columns.map((col) => (
                    <div key={col.title}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '2px solid var(--primary)', marginBottom: '14px' }}>
                            <span style={{ fontSize: '16px' }}>{col.badge}</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{col.title}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {col.products.map((p) => (
                                <div key={p.name}
                                    onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--primary)'; (e.currentTarget).style.boxShadow = 'var(--shadow)'; }}
                                    onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--border)'; (e.currentTarget).style.boxShadow = 'none'; }}
                                    style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '9px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <div style={{ width: '50px', height: '50px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                        {p.image ? (
                                            <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '26px' }}>{p.emoji}</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>${p.price}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${p.originalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}