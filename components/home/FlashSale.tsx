'use client';
import { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';
import ProductCard from '../ui/ProductCard';
import { getProducts } from '@/services/publicService';
import { Product } from '@/services/types';

export default function FlashSale() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashSales = async () => {
            setLoading(true);
            try {
                // Fetch products with significant discounts
                const data = await getProducts({ min_discount: 20, page_size: 6 });
                setProducts(data?.results || []);
            } catch (err) {
                console.error("Failed to fetch flash sales", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFlashSales();
    }, []);

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
                <a href="/products?min_discount=20" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', border: '1.5px solid var(--primary)', padding: '7px 16px', borderRadius: 'var(--radius)', whiteSpace: 'nowrap', textDecoration: 'none' }}>View All →</a>
            </div>
            
            <div className="flash-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)', 
                gap: '12px',
                minHeight: '200px'
            }}>
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="skeleton" style={{ height: '280px', background: 'var(--surface-2)', borderRadius: 'var(--radius)' }} />
                    ))
                ) : (
                    products.map((p) => (
                        <ProductCard key={p.id} {...p as any} badgeColor="#ef4444" />
                    ))
                )}
                {!loading && products.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No flash sales available at this moment.
                    </div>
                )}
            </div>
            
            <style jsx>{`
                @media (max-width: 1200px) {
                    .flash-grid { grid-template-columns: repeat(4, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .flash-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>
        </section>
    );
}