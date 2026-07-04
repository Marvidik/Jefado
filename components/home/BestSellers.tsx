'use client';
import { useState, useEffect } from 'react';
import { getProducts } from '@/services/publicService';
import { Product } from '@/services/types';
import { Skeleton } from '../ui/Skeleton';

export default function BestSellers() {
    const [sections, setSections] = useState<{ title: string; badge: string; products: Product[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            setLoading(true);
            try {
                // Fetch best sellers and new arrivals in parallel
                const [best, arrivals, discounted] = await Promise.all([
                    getProducts({ is_best_seller: true, page_size: 4 }),
                    getProducts({ ordering: '-id', page_size: 4 }),
                    getProducts({ min_discount: 25, page_size: 4 })
                ]);

                setSections([
                    { title: 'Flash Sale Today', badge: '🔥', products: discounted?.results || [] },
                    { title: 'Best Sellers', badge: '⭐', products: best?.results || [] },
                    { title: 'Top Rated', badge: '🏆', products: best?.results || [] }, // Reusing for now
                    { title: 'New Arrivals', badge: '✨', products: arrivals?.results || [] }
                ]);
            } catch (err) {
                console.error("Failed to fetch best seller sections", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSections();
    }, []);

    return (
        <section className="container" style={{ padding: '0 var(--gutter) 40px' }}>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>This Month</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Best Selling Products</h2>
                    <a href="/products" style={{ padding: '7px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', textDecoration: 'none' }}>View All</a>
                </div>
            </div>

            <div className="bs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton style={{ height: '30px', marginBottom: '14px', borderRadius: 'var(--radius)' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {Array.from({ length: 4 }).map((_, j) => (
                                    <Skeleton key={j} style={{ height: '70px', borderRadius: 'var(--radius)' }} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : sections.map((col) => (
                    <div key={col.title}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '2px solid var(--primary)', marginBottom: '14px' }}>
                            <span style={{ fontSize: '16px' }}>{col.badge}</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{col.title}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {col.products.map((p) => (
                                <a key={p.id} href={`/products/${p.slug}`}
                                    style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '9px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none', color: 'inherit' }}
                                    onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--primary)'; (e.currentTarget).style.boxShadow = 'var(--shadow)'; }}
                                    onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--border)'; (e.currentTarget).style.boxShadow = 'none'; }}
                                >
                                    <div style={{ width: '50px', height: '50px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                        {p.image ? (
                                            <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '26px' }}>📦</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>₦{parseFloat(p.price).toLocaleString()}</span>
                                            {p.original && <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₦{parseFloat(p.original).toLocaleString()}</span>}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                @media (max-width: 992px) {
                    .bs-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .bs-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}