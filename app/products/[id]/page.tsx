'use client';
import { useState } from 'react';

const PRODUCT = {
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Cancelling Headphones',
    brand: 'Sony', sku: 'SNY-WH1000XM5-BLK',
    price: 279, originalPrice: 399, discount: 30,
    rating: 4.9, reviews: 5621,
    emoji: '🎧', isBestSeller: true, inStock: true, stockCount: 23,
    seller: { name: 'TechZone Store', rating: 4.8, totalSales: 12400, joined: 'Jan 2021', verified: true },
    images: ['🎧', '🔊', '📦', '🎵', '⚙️'],
    colors: ['Midnight Black', 'Platinum Silver', 'Midnight Blue'],
    colorHex: ['#1a1a2e', '#c0c0c0', '#1a3a5c'],
    description: `The Sony WH-1000XM5 redefines noise cancellation with 8 microphones and two processors working in tandem. Auto NC Optimizer automatically optimizes noise cancellation based on your conditions. With up to 30 hours of battery life and quick charging (3 hours from just 3 minutes), these headphones keep up with you wherever you go.`,
    specs: [
        ['Driver Size', '30mm'], ['Frequency Response', '4 Hz – 40,000 Hz'],
        ['Battery Life', 'Up to 30 hours'], ['Charging Time', '3.5 hours (full)'],
        ['Quick Charge', '3 min → 3 hours playback'], ['Bluetooth', 'Bluetooth 5.2'],
        ['Weight', '250g'], ['Microphones', '8 microphones'],
        ['Codecs', 'SBC, AAC, LDAC'], ['ANC', 'Industry-leading V1 processor'],
    ],
};

const REVIEWS = [
    { id: 1, author: 'Marcus T.', avatar: '👤', rating: 5, date: 'Mar 12, 2026', title: 'Absolute best headphones I\'ve ever owned', body: 'The noise cancellation is insane. I travel weekly for work and these have been game-changing. Battery life is incredible.', verified: true, helpful: 234 },
    { id: 2, author: 'Priya S.', avatar: '👩', rating: 5, date: 'Feb 28, 2026', title: 'Worth every penny', body: 'I was skeptical at first about the price but after two weeks I can safely say these are absolutely worth it.', verified: true, helpful: 187 },
    { id: 3, author: 'James K.', avatar: '👦', rating: 4, date: 'Feb 15, 2026', title: 'Great headphones with minor caveats', body: 'Sound and ANC are top notch. Ear cushions get warm after a few hours but nothing else comes close at this price.', verified: false, helpful: 92 },
    { id: 4, author: 'Layla M.', avatar: '👩', rating: 5, date: 'Jan 30, 2026', title: 'Perfect for WFH', body: 'Working from home with kids was a nightmare. These headphones fixed that completely.', verified: true, helpful: 145 },
];

const RELATED = [
    { name: 'Bose QuietComfort 45', price: 259, originalPrice: 329, discount: 21, emoji: '🎧', rating: 4.7 },
    { name: 'Apple AirPods Max', price: 479, originalPrice: 549, discount: 13, emoji: '🎵', rating: 4.6 },
    { name: 'Sennheiser Momentum 4', price: 249, originalPrice: 349, discount: 29, emoji: '🎧', rating: 4.8 },
    { name: 'JBL Tour One M2', price: 199, originalPrice: 249, discount: 20, emoji: '🔊', rating: 4.5 },
];

const ratingDist = [{ star: 5, count: 4320 }, { star: 4, count: 890 }, { star: 3, count: 265 }, { star: 2, count: 98 }, { star: 1, count: 48 }];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
    return <span style={{ display: 'inline-flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--secondary)' : '#e2e8f0' }}>★</span>)}</span>;
}

export default function ProductDetailPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    const tabs = [
        { key: 'description' as const, label: 'Description' },
        { key: 'specs' as const, label: 'Specifications' },
        { key: 'reviews' as const, label: `Reviews (${PRODUCT.reviews.toLocaleString()})` },
    ];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="container" style={{ padding: '24px var(--gutter)' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {['Home', 'Electronics', 'Headphones'].map((c, i, arr) => (
                        <span key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <a href="#" style={{ color: i === arr.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{c}</a>
                            {i < arr.length - 1 && <span>›</span>}
                        </span>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="detail-grid" style={{ marginBottom: '40px' }}>

                    {/* ── Images ── */}
                    <div>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', marginBottom: '12px', position: 'relative', overflow: 'hidden' }}>
                            <span style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.15))' }}>{PRODUCT.images[activeImage]}</span>
                            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>-{PRODUCT.discount}%</span>
                                <span style={{ background: 'var(--warning)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>BESTSELLER</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {PRODUCT.images.map((img, i) => (
                                <button key={i} onClick={() => setActiveImage(i)} style={{ flex: 1, aspectRatio: '1', background: 'var(--surface)', border: `2px solid ${i === activeImage ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius)', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>{img}</button>
                            ))}
                        </div>
                    </div>

                    {/* ── Info ── */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{PRODUCT.brand}</a>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SKU: {PRODUCT.sku}</span>
                        </div>

                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '14px', letterSpacing: '-0.3px' }}>{PRODUCT.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            <Stars rating={PRODUCT.rating} size={15} />
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>{PRODUCT.rating}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({PRODUCT.reviews.toLocaleString()})</span>
                            <span style={{ width: '1px', height: '12px', background: 'var(--border)' }} />
                            <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>✓ In Stock ({PRODUCT.stockCount} left)</span>
                        </div>

                        {/* Price */}
                        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', color: 'var(--primary)' }}>${PRODUCT.price}</span>
                            <div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${PRODUCT.originalPrice}</div>
                                <div style={{ background: 'var(--danger)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 7px', borderRadius: '3px', display: 'inline-block' }}>
                                    Save ${PRODUCT.originalPrice - PRODUCT.price} ({PRODUCT.discount}% OFF)
                                </div>
                            </div>
                        </div>

                        {/* Color */}
                        <div style={{ marginBottom: '18px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Color: <strong style={{ color: 'var(--text-primary)' }}>{PRODUCT.colors[selectedColor]}</strong></p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {PRODUCT.colors.map((c, i) => (
                                    <button key={c} title={c} onClick={() => setSelectedColor(i)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: PRODUCT.colorHex[i], border: `3px solid ${i === selectedColor ? 'var(--primary)' : 'transparent'}`, outline: `2px solid ${i === selectedColor ? 'var(--primary)' : 'transparent'}`, outlineOffset: '2px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }} />
                                ))}
                            </div>
                        </div>

                        {/* Qty + Actions */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', flexShrink: 0 }}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '9px 14px', fontSize: '17px', background: 'var(--surface-2)' }}>−</button>
                                <span style={{ padding: '9px 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                                <button onClick={() => setQty(q => q + 1)} style={{ padding: '9px 14px', fontSize: '17px', background: 'var(--surface-2)' }}>+</button>
                            </div>
                            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2500); }} style={{ flex: 1, minWidth: '140px', padding: '11px 20px', background: added ? 'var(--success)' : 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', transition: 'all 0.2s', boxShadow: added ? '0 4px 20px rgba(34,197,94,0.3)' : '0 4px 20px rgba(26,86,219,0.25)' }}>
                                {added ? '✓ Added to Cart!' : `Add to Cart — $${(PRODUCT.price * qty).toLocaleString()}`}
                            </button>
                            <button onClick={() => setWishlisted(!wishlisted)} style={{ width: '42px', height: '42px', border: `1.5px solid ${wishlisted ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', background: wishlisted ? '#fff5f5' : 'transparent', flexShrink: 0 }}>{wishlisted ? '❤️' : '🤍'}</button>
                        </div>

                        <button style={{ width: '100%', padding: '12px', border: '1.5px solid var(--primary)', color: 'var(--primary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', marginBottom: '20px' }} onClick={() => { window.location.href = '/checkout'; }}>⚡ Buy Now</button>

                        {/* Seller */}
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px', marginBottom: '14px' }}>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Sold By</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🏪</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px' }}>{PRODUCT.seller.name}</p>
                                        {PRODUCT.seller.verified && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>✓ VERIFIED</span>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '2px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                                        <span>⭐ {PRODUCT.seller.rating}</span>
                                        <span>🛒 {PRODUCT.seller.totalSales.toLocaleString()} sales</span>
                                        <span>📅 Since {PRODUCT.seller.joined}</span>
                                    </div>
                                </div>
                                <a href="#" style={{ padding: '6px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 600, color: 'var(--primary)', whiteSpace: 'nowrap', flexShrink: 0 }}>View Store →</a>
                            </div>
                        </div>

                        {/* Guarantees */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {[['↩️', '30-day returns'], ['🚚', 'Free delivery $50+'], ['🔒', 'Secure checkout']].map(([icon, text]) => (
                                <div key={text} style={{ flex: 1, minWidth: '100px', padding: '8px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    <span>{icon}</span>{text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '40px' }}>
                    <div className="detail-tabs-nav" style={{ display: 'flex', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
                        {tabs.map(tab => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '14px 24px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)', borderBottom: `2px solid ${activeTab === tab.key ? 'var(--primary)' : 'transparent'}`, background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>{tab.label}</button>
                        ))}
                    </div>
                    <div style={{ padding: '24px' }}>
                        {activeTab === 'description' && (
                            <div>
                                <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '20px' }}>{PRODUCT.description}</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                                    {[['🔇', 'Industry-Leading ANC', '8 mics + dual processor'], ['🔋', '30-Hour Battery', 'With quick charge'], ['🎵', 'LDAC Hi-Res Audio', '3× more data than standard BT']].map(([icon, title, desc]) => (
                                        <div key={title} style={{ padding: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                                            <p style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</p>
                                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>{title}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="specs-table" style={{ width: '100%', borderCollapse: 'collapse', maxWidth: '580px', fontSize: '13px' }}>
                                    <tbody>
                                        {PRODUCT.specs.map(([label, value], i) => (
                                            <tr key={label} style={{ background: i % 2 === 0 ? 'var(--surface-2)' : 'var(--surface)' }}>
                                                <td style={{ padding: '11px 14px', fontWeight: 600, color: 'var(--text-secondary)', width: '40%', borderBottom: '1px solid var(--border)' }}>{label}</td>
                                                <td style={{ padding: '11px 14px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div>
                                {/* Rating summary */}
                                <div style={{ display: 'flex', gap: '32px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
                                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '48px', lineHeight: 1, marginBottom: '6px' }}>{PRODUCT.rating}</p>
                                        <Stars rating={PRODUCT.rating} size={18} />
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{PRODUCT.reviews.toLocaleString()} reviews</p>
                                    </div>
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        {ratingDist.map(r => (
                                            <div key={r.star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '4px' }}>
                                                <span style={{ width: '10px', textAlign: 'right' }}>{r.star}</span>
                                                <span style={{ color: 'var(--secondary)' }}>★</span>
                                                <div style={{ flex: 1, height: '7px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${(r.count / PRODUCT.reviews) * 100}%`, height: '100%', background: 'var(--secondary)', borderRadius: '4px' }} />
                                                </div>
                                                <span style={{ color: 'var(--text-muted)', width: '28px' }}>{r.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Reviews */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {REVIEWS.map(r => (
                                        <div key={r.id} style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <div style={{ width: '38px', height: '38px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{r.avatar}</div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>{r.author}</p>
                                                        {r.verified && <span style={{ background: 'var(--success)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px' }}>✓ VERIFIED</span>}
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.date}</span>
                                                    </div>
                                                    <Stars rating={r.rating} size={13} />
                                                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginTop: '6px', marginBottom: '4px' }}>{r.title}</p>
                                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.body}</p>
                                                    <button style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>👍 Helpful ({r.helpful})</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related */}
                <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '16px' }}>You Might Also Like</h2>
                    <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
                        {RELATED.map(p => (
                            <div key={p.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                            >
                                <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: '12px' }}>{p.emoji}</div>
                                <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.35 }}>{p.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: '13px' }}>${p.price}</span>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${p.originalPrice}</span>
                                    <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginLeft: 'auto' }}>-{p.discount}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}