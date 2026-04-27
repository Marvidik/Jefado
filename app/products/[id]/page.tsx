'use client';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ALL_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import ReviewsSection from '@/components/ui/ReviewsSection';

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
    return <span style={{ display: 'inline-flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--secondary)' : '#e2e8f0' }}>★</span>)}</span>;
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = parseInt(params.id as string);

    const product = useMemo(() => ALL_PRODUCTS.find(p => p.id === productId), [productId]);

    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>Product Not Found</h1>
                <a href="/products" style={{ color: 'var(--primary)', fontWeight: 700 }}>Back to Products</a>
            </div>
        );
    }

    const RELATED = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const tabs = [
        { key: 'description' as const, label: 'Description' },
        { key: 'specs' as const, label: 'Specifications' },
        { key: 'reviews' as const, label: `Reviews (${product.reviews.toLocaleString()})` },
    ];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="container" style={{ padding: '24px var(--gutter)' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', flexWrap: 'wrap', textTransform: 'capitalize' }}>
                    <a href="/" style={{ color: 'var(--text-muted)' }}>Home</a>
                    <span>›</span>
                    <a href="/products" style={{ color: 'var(--text-muted)' }}>Products</a>
                    <span>›</span>
                    <a href={`/products?category=${product.category}`} style={{ color: 'var(--text-muted)' }}>{product.category}</a>
                    <span>›</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
                </div>

                {/* Main Grid */}
                <div className="detail-grid" style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '40px' }}>

                    {/* ── Images ── */}
                    <div>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                            {product.image ? (
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '120px', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.15))' }}>{product.emoji}</span>
                            )}
                            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {product.discount && <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>-{product.discount}%</span>}
                                {product.isBestSeller && <span style={{ background: 'var(--warning)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>BESTSELLER</span>}
                            </div>
                        </div>
                    </div>

                    {/* ── Info ── */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                            <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.brand}</a>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>ID: {product.id}</span>
                        </div>

                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.5px' }}>{product.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <Stars rating={product.rating} size={16} />
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{product.rating}</span>
                            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>({product.reviews.toLocaleString()} reviews)</span>
                            <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '13px', color: product.inStock ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{product.inStock ? '✓ In Stock' : 'Out of Stock'}</span>
                                {product.inStock && (
                                    <span style={{ fontSize: '12px', background: 'var(--success-light)', color: 'var(--success-dark)', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                                        {product.stockQuantity} remaining
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--primary)', letterSpacing: '-1px' }}>₦{product.price}</span>
                            {product.originalPrice && (
                                <div>
                                    <div style={{ fontSize: '16px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₦{product.originalPrice}</div>
                                    <div style={{ background: 'var(--danger)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                                        Save ₦{product.originalPrice - product.price}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Qty + Actions */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0, background: 'var(--surface)' }}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '12px 18px', fontSize: '18px', border: 'none', background: 'transparent', cursor: 'pointer' }}>−</button>
                                <span style={{ padding: '0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.stockQuantity, q + 1))} style={{ padding: '12px 18px', fontSize: '18px', border: 'none', background: 'transparent', cursor: 'pointer' }}>+</button>
                            </div>
                            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ flex: 1, padding: '14px 24px', background: added ? 'var(--success)' : 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(238, 18, 23, 0.2)' }}>
                                {added ? '✓ Added to Cart!' : `Add to Cart — ₦${(product.price * qty).toLocaleString()}`}
                            </button>
                            <button onClick={() => setWishlisted(!wishlisted)} style={{ width: '48px', height: '48px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: wishlisted ? '#fff5f5' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.2s' }}>{wishlisted ? '❤️' : '🤍'}</button>
                        </div>

                        <button style={{ width: '100%', padding: '14px', border: '1.5px solid var(--primary)', color: 'var(--primary)', background: 'transparent', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', marginBottom: '24px', cursor: 'pointer' }} onClick={() => { window.location.href = '/checkout'; }}>⚡ Buy It Now</button>

                        {/* Seller */}
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '16px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🏪</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>{product.seller}</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Authorized Dealer • Verified Seller</p>
                                </div>
                                <a href="#" style={{ padding: '8px 16px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Visit Store</a>
                            </div>
                        </div>

                        {/* Guarantees */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[['↩️', '30-day Free Returns'], ['🚚', 'Secure Shipping'], ['🔒', 'Verified Payments']].map(([icon, text]) => (
                                <div key={text} style={{ flex: 1, padding: '10px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    <span>{icon}</span>{text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '48px' }}>
                    <div className="detail-tabs-nav" style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                        {tabs.map(tab => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '16px 32px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: `3px solid ${activeTab === tab.key ? 'var(--primary)' : 'transparent'}`, borderRight: '1px solid var(--border)', background: activeTab === tab.key ? 'var(--surface)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>{tab.label}</button>
                        ))}
                    </div>
                    <div style={{ padding: '32px' }}>
                        {activeTab === 'description' && (
                            <div style={{ maxWidth: '800px' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '16px' }}>Product Overview</h3>
                                <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div style={{ maxWidth: '600px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {product.specs?.map(([label, value], i) => (
                                            <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '14px 0', fontWeight: 600, color: 'var(--text-secondary)', width: '40%' }}>{label}</td>
                                                <td style={{ padding: '14px 0', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <ReviewsSection reviews={product.reviewsList} initialRating={product.rating} />
                        )}
                    </div>
                </div>

                {/* Related */}
                {RELATED.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Similar Discoveries</h2>
                            <a href={`/products?category=${product.category}`} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>Explore More →</a>
                        </div>
                        <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {RELATED.map(p => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .detail-grid {
                    @media (max-width: 992px) {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                }
                .related-grid {
                    @media (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
}
