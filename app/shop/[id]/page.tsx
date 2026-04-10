'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';

const SHOP_DATA = {
    name: 'TechZone Official Store',
    handle: '@techzone',
    rating: 4.8,
    reviews: 12450,
    joined: 'Jan 2026',
    bio: 'Premium electronics and gadgets at the best prices. We specialize in high-quality accessories, audio devices, and computer peripherals. Authorized reseller of top brands.',
    location: 'San Francisco, CA',
};

const SHOP_PRODUCTS = [
    { id: 1, name: 'Amazon High Speed HDMI Cable 6ft 4K', price: 80, originalPrice: 120, discount: 33, rating: 4.7, reviews: 3594, emoji: '🔌' },
    { id: 2, name: 'Logitech MX Master 3S Wireless Mouse', price: 89, originalPrice: 120, discount: 26, rating: 4.9, reviews: 2341, emoji: '🖱️', isBestSeller: true },
    { id: 3, name: 'Sony WH-1000XM5 Noise Cancelling Headphones', price: 279, originalPrice: 399, discount: 30, rating: 4.9, reviews: 5621, emoji: '🎧', isBestSeller: true },
    { id: 4, name: 'Apple AirPods Pro 2nd Gen with MagSafe Case', price: 199, originalPrice: 249, discount: 20, rating: 4.8, reviews: 12450, emoji: '🎵' },
    { id: 5, name: 'Samsung Electronics Galaxy S21 5G 128GB', price: 500, originalPrice: 700, discount: 29, rating: 4.6, reviews: 11, emoji: '📱' },
    { id: 6, name: 'Razer BlackWidow V3 Mechanical Gaming Keyboard', price: 139, originalPrice: 180, discount: 23, rating: 4.7, reviews: 892, emoji: '⌨️', isNew: true },
    { id: 7, name: 'Logitech C920s HD Pro Webcam 1080p Video', price: 69, originalPrice: 99, discount: 30, rating: 4.6, reviews: 2890, emoji: '📹' },
    { id: 8, name: 'JBL FLIP 4 Waterproof Portable Bluetooth Speaker', price: 150, originalPrice: 200, discount: 25, rating: 4.8, reviews: 189, emoji: '🔊' },
];

export default function ShopPage({ params }: { params: { id: string } }) {
    const [tab, setTab] = useState('All Products');
    
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Banner */}
            <div style={{ height: '240px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', position: 'relative' }}>
                <div className="container" style={{ position: 'relative', height: '100%' }}>
                    {/* Floating Info Box */}
                    <div style={{ position: 'absolute', bottom: '-80px', left: 'var(--gutter)', right: 'var(--gutter)', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', flexWrap: 'wrap', zIndex: 10 }}>
                        
                        {/* Avatar */}
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '40px', fontWeight: 800, fontFamily: 'var(--font-display)', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                            T
                        </div>
                        
                        {/* Shop Main Info */}
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>{SHOP_DATA.name}</h1>
                                <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>✓ VERIFIED SHOP</span>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px', fontWeight: 500 }}>{SHOP_DATA.handle}</p>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{SHOP_DATA.rating}</span>
                                    <span>({SHOP_DATA.reviews.toLocaleString()} reviews)</span>
                                </div>
                                <span>📍 {SHOP_DATA.location}</span>
                                <span>🗓️ Joined {SHOP_DATA.joined}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'var(--surface)', border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>Contact Seller</button>
                            <button style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}>+ Follow Shop</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container" style={{ marginTop: '120px', padding: '0 var(--gutter)' }}>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    
                    {/* Left Sidebar: About Shop */}
                    <div style={{ flex: '1 1 280px', maxWidth: '320px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About {SHOP_DATA.name}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>{SHOP_DATA.bio}</p>
                        
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Store Performance</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Positive Feedback</span>
                                <span style={{ fontWeight: 600, color: 'var(--success)' }}>98.5%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Shipping Time</span>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>1-2 Days</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Response Rate</span>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>99%</span>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {['Electronics', 'Accessories', 'Audio', 'Office Tech', 'Gaming'].map(c => (
                                <button key={c} style={{ background: 'transparent', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s' }}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content: Products */}
                    <div style={{ flex: '3 1 600px', minWidth: '300px' }}>
                        {/* Shop Header Tabs */}
                        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
                            {['All Products', 'Best Sellers', 'New Arrivals', 'Promotions'].map(t => (
                                <button key={t} onClick={() => setTab(t)} style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--primary)' : 'transparent'}`, color: tab === t ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: tab === t ? 700 : 500, fontSize: '15px', padding: '0 4px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            {SHOP_PRODUCTS.map(p => (
                                <div key={p.id}>
                                    <ProductCard {...p} />
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                            <button style={{ padding: '12px 32px', background: 'transparent', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >Load More Products</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
