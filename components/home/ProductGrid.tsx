'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';
import { ProductSkeleton } from '../ui/Skeleton';
import { getProducts } from '@/services/publicService';
import { Product } from '@/services/types';

const tabs = ['All Products', 'Fashion', 'Electronics', 'Home', 'Sports'];

const CATEGORY_MAP: Record<string, string | undefined> = {
    'All Products': undefined,
    'Fashion': 'fashion',
    'Electronics': 'electronics',
    'Home': 'home',
    'Sports': 'sports',
};

export default function ProductGrid() {
    const [activeTab, setActiveTab] = useState('All Products');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const category = CATEGORY_MAP[activeTab];
                const data = await getProducts({ category, page_size: 12 });
                setProducts(data?.results || []);
            } catch (err) {
                console.error("Failed to fetch products for tab:", activeTab, err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeTab]);

    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            {/* Section Header */}
            <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Featured</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                        Top Marketplace Deals
                    </h2>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '7px 16px',
                                    borderRadius: '20px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-body)',
                                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                    color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                                    border: `1.5px solid ${activeTab === tab ? 'var(--primary)' : 'var(--border)'}`,
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                }}
                            >{tab}</button>
                        ))}
                        <a href="/products" style={{
                            padding: '7px 16px',
                            fontSize: '13px', fontWeight: 600,
                            color: 'var(--primary)',
                            border: '1.5px solid var(--primary)',
                            borderRadius: '20px',
                            textDecoration: 'none'
                        }}>Show All</a>
                    </div>
                </div>
            </div>

            {/* Grid + Sidebar */}
            <div className="product-grid-with-sidebar" style={{ display: 'flex', gap: '16px' }}>
                {/* Products */}
                <div className="pg-grid" style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                    gap: '12px',
                    minHeight: '400px',
                    position: 'relative'
                }}>
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                    ) : (
                        products.map((p) => (
                            <ProductCard key={p.id} {...p as any} />
                        ))
                    )}
                    {(!loading && products.length === 0) && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                            No products found in this category.
                        </div>
                    )}
                </div>

                {/* Sidebar Ad */}
                <div className="pg-sidebar" style={{
                    width: '210px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                }}>
                    {/* Ad 1 */}
                    <div style={{
                        background: 'var(--announce-bg)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '24px 20px',
                        textAlign: 'center',
                        flex: 1,
                    }}>
                        <p style={{ fontSize: '24px', marginBottom: '12px' }}>🎧</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>Shop JEFEDO core products</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>Escape the noise. It&apos;s time to shop the magic.</p>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius)',
                            padding: '8px',
                            marginBottom: '14px',
                        }}>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Only for:</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#fff' }}>The Best Prices</p>
                        </div>
                        <button style={{
                            width: '100%', padding: '10px',
                            background: 'var(--primary)', color: '#fff',
                            borderRadius: 'var(--radius)',
                            fontWeight: 700, fontSize: '13px',
                            fontFamily: 'var(--font-body)',
                        }}>Shop Now →</button>
                    </div>

                    {/* Ad 2 */}
                    <div style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '20px',
                        textAlign: 'center',
                    }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '4px' }}>10%</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>DISCOUNT</p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Summer Sales</p>
                        <p style={{ fontSize: '11px', color: '#fff', fontWeight: 600, marginBottom: '12px' }}>only for <strong>JEFEDO CORE </strong> PRODUCTS.</p>
                        <button style={{
                            width: '100%', padding: '9px',
                            background: '#fff', color: '#f97316',
                            borderRadius: 'var(--radius)',
                            fontWeight: 700, fontSize: '13px',
                            fontFamily: 'var(--font-body)',
                        }}>Shop Now →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}