'use client';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../ui/ProductCard';

const flashProducts = [
    { name: 'Xbox Series X 1TB SSD Console w/ Wireless Controller', price: 440, originalPrice: 600, discount: 27, rating: 4.7, reviews: 342, emoji: '🎮', isBestSeller: true },
    { name: 'Bose Sport Earbuds Wireless Bluetooth Headphones', price: 79, originalPrice: 149, discount: 47, rating: 4.5, reviews: 891, emoji: '🎧' },
    { name: 'Simple Mobile 4G LTE Galaxy 12 Note 64GB Phone', price: 299, originalPrice: 399, discount: 25, rating: 4.2, reviews: 156, emoji: '📱' },
    { name: '4K UHD LED Smart TV with Chromecast Built-in 55"', price: 280, originalPrice: 420, discount: 33, rating: 4.6, reviews: 228, emoji: '📺', isNew: true },
    { name: 'Dell Optiplex 7090 i7 All-in-One Desktop Monitor', price: 850, originalPrice: 1200, discount: 29, rating: 4.4, reviews: 63, emoji: '🖥️' },
    { name: 'Portable Folding Washing Machine 11lbs Capacity', price: 1300, originalPrice: 1800, discount: 28, rating: 4.1, reviews: 41, emoji: '🫧' },
];

export default function FlashSale() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div className="flash-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2px' }}>⚡ Today&apos;s</p>
                        <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Flash Sales</h2>
                    </div>
                    <div style={{ width: '1px', height: '44px', background: 'var(--border)' }} />
                    <CountdownTimer targetHours={3} targetMinutes={23} targetSeconds={19} />
                </div>
                <a href="#" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', border: '1.5px solid var(--primary)', padding: '7px 16px', borderRadius: 'var(--radius)', whiteSpace: 'nowrap' }}>View All →</a>
            </div>
            <div className="flash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                {flashProducts.map((p) => (
                    <ProductCard key={p.name} {...p} badgeColor="#ef4444" />
                ))}
            </div>
        </section>
    );
}