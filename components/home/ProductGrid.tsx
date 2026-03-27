'use client';
import { useState } from 'react';
import ProductCard from '../ui/ProductCard';

const tabs = ['All Products', 'Keyboard & Mouse', 'Headphone', 'Webcam', 'Printers'];

const productsByTab: Record<string, Array<{
    name: string; price: number; originalPrice?: number; discount?: number;
    rating: number; reviews: number; emoji: string; isNew?: boolean; isBestSeller?: boolean;
}>> = {
    'All Products': [
        { name: 'Amazon High Speed HDMI Cable 6ft 4K', price: 80, originalPrice: 120, discount: 33, rating: 4.7, reviews: 3594, emoji: '🔌' },
        { name: 'Portable Washing Machine, 11lbs Capacity', price: 150, originalPrice: 200, discount: 25, rating: 4.2, reviews: 596, emoji: '🫧', isBestSeller: true },
        { name: 'TOZO T6 True Wireless Earbuds Bluetooth', price: 70, originalPrice: 120, discount: 42, rating: 4.5, reviews: 9900, emoji: '🎧', isNew: true },
        { name: 'Dell Optiplex 7000 7480 All-in-One Computer Monitor', price: 880, originalPrice: 1200, discount: 27, rating: 4.0, reviews: 1442, emoji: '🖥️' },
        { name: 'Samsung Electronics Galaxy S21 5G 128GB', price: 500, originalPrice: 700, discount: 29, rating: 4.6, reviews: 11, emoji: '📱' },
        { name: 'Wired One-Ear Gaming Headphones with USB', price: 70, originalPrice: 100, discount: 30, rating: 4.3, reviews: 209, emoji: '🎮' },
        { name: 'External Converter CATV 2018 Engine Measurement', price: 670, originalPrice: 880, discount: 24, rating: 4.1, reviews: 67, emoji: '📡' },
        { name: 'JBL FLIP 4 Waterproof Portable Bluetooth Speaker', price: 150, originalPrice: 200, discount: 25, rating: 4.8, reviews: 189, emoji: '🔊' },
    ],
    'Keyboard & Mouse': [
        { name: 'AK-900 Wired Keyboard RGB Mechanical Gaming', price: 60, originalPrice: 100, discount: 40, rating: 4.6, reviews: 715, emoji: '⌨️' },
        { name: 'Logitech MX Master 3S Wireless Mouse', price: 89, originalPrice: 120, discount: 26, rating: 4.9, reviews: 2341, emoji: '🖱️', isBestSeller: true },
        { name: 'Razer BlackWidow V3 Mechanical Gaming Keyboard', price: 139, originalPrice: 180, discount: 23, rating: 4.7, reviews: 892, emoji: '⌨️', isNew: true },
        { name: 'Corsair K95 RGB Platinum Mechanical Keyboard', price: 179, originalPrice: 230, discount: 22, rating: 4.5, reviews: 445, emoji: '⌨️' },
    ],
    'Headphone': [
        { name: 'Sony WH-1000XM5 Noise Cancelling Headphones', price: 279, originalPrice: 399, discount: 30, rating: 4.9, reviews: 5621, emoji: '🎧', isBestSeller: true },
        { name: 'Apple AirPods Pro 2nd Gen with MagSafe Case', price: 199, originalPrice: 249, discount: 20, rating: 4.8, reviews: 12450, emoji: '🎵' },
        { name: 'Bose QuietComfort 45 Wireless Bluetooth Headphones', price: 259, originalPrice: 329, discount: 21, rating: 4.7, reviews: 3201, emoji: '🎧', isNew: true },
        { name: 'JBL Tune 760NC Wireless Over-Ear NC Headphones', price: 79, originalPrice: 130, discount: 39, rating: 4.4, reviews: 876, emoji: '🎧' },
    ],
    'Webcam': [
        { name: 'Logitech C920s HD Pro Webcam 1080p Video', price: 69, originalPrice: 99, discount: 30, rating: 4.6, reviews: 2890, emoji: '📹', isBestSeller: true },
        { name: 'Razer Kiyo X Full HD Streaming Webcam', price: 59, originalPrice: 90, discount: 34, rating: 4.4, reviews: 654, emoji: '📷', isNew: true },
        { name: 'Microsoft LifeCam HD-3000 Webcam 720p', price: 29, originalPrice: 45, discount: 36, rating: 4.2, reviews: 1230, emoji: '📹' },
        { name: 'Elgato FaceCam Pro 4K Webcam for Streaming', price: 199, originalPrice: 250, discount: 20, rating: 4.7, reviews: 341, emoji: '🎥' },
    ],
    'Printers': [
        { name: 'HP LaserJet Pro M15w Wireless Laser Printer', price: 159, originalPrice: 220, discount: 28, rating: 4.5, reviews: 789, emoji: '🖨️' },
        { name: 'Canon PIXMA TR8620a All-in-One Inkjet Printer', price: 149, originalPrice: 200, discount: 25, rating: 4.3, reviews: 432, emoji: '🖨️', isBestSeller: true },
        { name: 'Epson EcoTank ET-2800 All-in-One Supertank Printer', price: 199, originalPrice: 280, discount: 29, rating: 4.6, reviews: 2134, emoji: '🖨️', isNew: true },
        { name: 'Brother HL-L2350DW Compact Monochrome Laser Printer', price: 99, originalPrice: 140, discount: 29, rating: 4.4, reviews: 567, emoji: '🖨️' },
    ],
};

export default function ProductGrid() {
    const [activeTab, setActiveTab] = useState('All Products');
    const products = productsByTab[activeTab] ?? productsByTab['All Products'];

    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            {/* Section Header */}
            <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Featured</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                        Computer Accessories
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
                        <a href="#" style={{
                            padding: '7px 16px',
                            fontSize: '13px', fontWeight: 600,
                            color: 'var(--primary)',
                            border: '1.5px solid var(--primary)',
                            borderRadius: '20px',
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
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px',
                }}>
                    {products.slice(0, 8).map((p) => (
                        <ProductCard key={p.name} {...p} />
                    ))}
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
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>Xiaomi True Wireless Earbuds</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>Escape the noise. It&apos;s time to hear the magic.</p>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius)',
                            padding: '8px',
                            marginBottom: '14px',
                        }}>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>Only for:</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#fff' }}>$299 USD</p>
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
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '4px' }}>37%</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>DISCOUNT</p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Summer Sales</p>
                        <p style={{ fontSize: '11px', color: '#fff', fontWeight: 600, marginBottom: '12px' }}>only for <strong>SmartPhone</strong> product.</p>
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