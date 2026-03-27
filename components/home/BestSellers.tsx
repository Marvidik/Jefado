'use client';

const columns = [
    {
        title: 'Flash Sale Today', badge: '🔥', products: [
            { name: 'Bose Sport Earbuds Wireless Bluetooth Headphones', price: 79, originalPrice: 149, emoji: '🎧', rating: 4.5 },
            { name: 'Samsung Electronics Galaxy S21 5G Factory Unlocked', price: 500, originalPrice: 700, emoji: '📱', rating: 4.6 },
            { name: '4K UHD LED Smart TV with Chromecast Built-in', price: 280, originalPrice: 420, emoji: '📺', rating: 4.6 },
            { name: 'Sony DSC-H300 High Zoom Point & Shoot Camera', price: 139, originalPrice: 199, emoji: '📷', rating: 4.2 },
        ]
    },
    {
        title: 'Best Sellers', badge: '⭐', products: [
            { name: 'Portable Washing Machine 11lbs Capacity Model 1BMAT', price: 1300, originalPrice: 1800, emoji: '🫧', rating: 4.1 },
            { name: 'Simple Mobile 4G LTE Galaxy 12 Note 64GB Phone', price: 299, originalPrice: 399, emoji: '📱', rating: 4.2 },
            { name: 'Sony DSC-H300 High Zoom Point & Shoot Camera', price: 139, originalPrice: 199, emoji: '📷', rating: 4.2 },
            { name: 'Waze Cam 1080p Full HD Dual Dash Cam Indoor', price: 299, originalPrice: 399, emoji: '📹', rating: 4.4 },
        ]
    },
    {
        title: 'Top Rated', badge: '🏆', products: [
            { name: 'Portable Washing Machine 11lbs Capacity', price: 1300, originalPrice: 1800, emoji: '🫧', rating: 4.8 },
            { name: 'Dell Optiplex 7480 All-in-One Computer Monitor', price: 880, originalPrice: 1200, emoji: '🖥️', rating: 4.9 },
            { name: 'External Converter CATV 2018 Engine Measurement', price: 670, originalPrice: 880, emoji: '📡', rating: 4.7 },
            { name: 'Sony DSC-H300 High Zoom Camera', price: 139, originalPrice: 199, emoji: '📷', rating: 4.8 },
        ]
    },
    {
        title: 'New Arrivals', badge: '✨', products: [
            { name: 'TOZO T6 True Wireless Earbuds Bluetooth Headphones', price: 70, originalPrice: 120, emoji: '🎧', rating: 4.5 },
            { name: 'JBL FLIP 4 Waterproof Portable Bluetooth Speaker', price: 150, originalPrice: 200, emoji: '🔊', rating: 4.8 },
            { name: 'Waze Cam 1080p Full HD Dual Dash Cam Indoor', price: 299, originalPrice: 399, emoji: '📹', rating: 4.4 },
            { name: 'JBL FLIP 4 Waterproof Portable Bluetooth', price: 150, originalPrice: 200, emoji: '🔊', rating: 4.6 },
        ]
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
                                    <div style={{ width: '50px', height: '50px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{p.emoji}</div>
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