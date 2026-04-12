'use client';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../ui/ProductCard';
import { ALL_PRODUCTS } from '@/lib/data';

const flashProducts = ALL_PRODUCTS.slice(4, 10); // Pick a diverse range

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