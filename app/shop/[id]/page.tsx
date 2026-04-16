'use client';
import { useState, useMemo, use } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ServiceCard from '@/components/ui/ServiceCard';
import { ALL_PRODUCTS, ALL_SERVICES } from '@/lib/data';

/* ── Types ──────────────────────────────── */
interface ShopInfo {
    name: string;
    handle: string;
    rating: number;
    reviews: number;
    joined: string;
    bio: string;
    location: string;
}

export default function ShopPage({ params }: { params: Promise<{ id: string }> }) {
    const [tab, setTab] = useState('All Products');
    
    // Normalize id from URL (e.g. "TechWizard")
    const { id: shopId } = use(params);

    // Filter data for this shop
    const shopProducts = useMemo(() => 
        ALL_PRODUCTS.filter(p => p.seller.toLowerCase() === shopId.toLowerCase() || p.seller.replace(/\s+/g, '').toLowerCase() === shopId.toLowerCase()),
    [shopId]);

    const shopServices = useMemo(() => 
        ALL_SERVICES.filter(s => s.provider.toLowerCase() === shopId.toLowerCase() || s.provider.replace(/\s+/g, '').toLowerCase() === shopId.toLowerCase()),
    [shopId]);

    // Derive Shop Info from data if available, or use defaults
    const info = useMemo<ShopInfo>(() => {
        const name = shopProducts.length > 0 ? shopProducts[0].seller : (shopServices.length > 0 ? shopServices[0].provider : shopId);
        const avgRating = [...shopProducts.map(p => p.rating), ...shopServices.map(s => s.rating)].reduce((a, b) => a + b, 0) / (shopProducts.length + shopServices.length) || 4.8;
        const totalReviews = shopProducts.reduce((s, p) => s + p.reviews, 0) + shopServices.reduce((s, s_v) => s + s_v.reviewsCount, 0) || 120;

        return {
            name: name,
            handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
            rating: parseFloat(avgRating.toFixed(1)),
            reviews: totalReviews,
            joined: 'Jan 2026',
            bio: `${name} is a verified provider of high-quality products and professional services on the Jefado marketplace. Committed to excellence and customer satisfaction.`,
            location: 'Global',
        };
    }, [shopProducts, shopServices, shopId]);

    const hasServices = shopServices.length > 0;
    const tabs = ['All Products', 'Best Sellers'];
    if (hasServices) tabs.push('Services');
    tabs.push('New Arrivals');

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Banner */}
            <div style={{ height: '240px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', position: 'relative' }}>
                <div className="container" style={{ position: 'relative', height: '100%' }}>
                    {/* Floating Info Box */}
                    <div style={{ position: 'absolute', bottom: '-80px', left: 'var(--gutter)', right: 'var(--gutter)', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', flexWrap: 'wrap', zIndex: 10 }}>
                        
                        {/* Avatar */}
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '40px', fontWeight: 800, fontFamily: 'var(--font-display)', flexShrink: 0, boxShadow: '0 4px 12px rgba(238, 18, 23, 0.3)' }}>
                            {info.name[0]}
                        </div>
                        
                        {/* Shop Main Info */}
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>{info.name}</h1>
                                <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>✓ VERIFIED SHOP</span>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px', fontWeight: 500 }}>{info.handle}</p>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{info.rating}</span>
                                    <span>({info.reviews.toLocaleString()} reviews)</span>
                                </div>
                                <span>📍 {info.location}</span>
                                <span>🗓️ Joined {info.joined}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'var(--surface)', border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>Contact Seller</button>
                            <button style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(238, 18, 23, 0.2)' }}>+ Follow Shop</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container" style={{ marginTop: '120px', padding: '0 var(--gutter)' }}>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    
                    {/* Left Sidebar: About Shop */}
                    <div style={{ flex: '1 1 280px', maxWidth: '320px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About {info.name}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>{info.bio}</p>
                        
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Store Performance</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Positive Feedback</span>
                                <span style={{ fontWeight: 600, color: 'var(--success)' }}>98.5%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Response Rate</span>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>100%</span>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[...new Set(shopProducts.map(p => p.category))].map(c => (
                                <button key={c} style={{ background: 'transparent', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s', textTransform: 'capitalize' }}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content: Products/Services */}
                    <div style={{ flex: '3 1 600px', minWidth: '300px' }}>
                        {/* Shop Header Tabs */}
                        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
                            {tabs.map(t => (
                                <button key={t} onClick={() => setTab(t)} style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--primary)' : 'transparent'}`, color: tab === t ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: tab === t ? 700 : 500, fontSize: '15px', padding: '0 4px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Rendering Logic */}
                        {tab === 'Services' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                {shopServices.map(s => (
                                    <ServiceCard key={s.id} {...s} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                {shopProducts
                                    .filter(p => {
                                        if (tab === 'Best Sellers') return p.isBestSeller;
                                        if (tab === 'New Arrivals') return p.isNew;
                                        return true;
                                    })
                                    .map(p => (
                                        <div key={p.id}>
                                            <ProductCard {...p} />
                                        </div>
                                    ))}
                            </div>
                        )}
                        
                        {(tab === 'Services' ? shopServices : shopProducts).length === 0 && (
                            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                                <p style={{ fontSize: '18px' }}>No items found in this category.</p>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                            <button style={{ padding: '12px 32px', background: 'transparent', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
