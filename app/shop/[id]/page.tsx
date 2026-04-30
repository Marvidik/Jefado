'use client';
import { useState, useMemo, useEffect, use } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ServiceCard from '@/components/ui/ServiceCard';
import { getShopDetail, getShopListings } from '@/services/publicService';
import { ShopDetail, Product, Service } from '@/services/types';

/* ── Types ──────────────────────────────── */
interface ShopInfo {
    name: string;
    handle: string;
    rating: number;
    reviews: number;
    joined: string;
    bio: string;
    location: string;
    positiveFeedbackPct: number;
    responseRatePct: number;
    shippingTime: string;
    isVerified: boolean;
}

export default function ShopPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: shopId } = use(params);
    const [info, setInfo] = useState<ShopDetail | null>(null);
    const [shopProducts, setShopProducts] = useState<Product[]>([]);
    const [shopServices, setShopServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState('All Products');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                setLoading(true);
                const [detail, listings] = await Promise.all([
                    getShopDetail(shopId),
                    getShopListings(shopId)
                ]);
                
                const shopData = (detail as any)?.data || detail;
                setInfo(shopData);
                
                // Handle complex listing responses (paginated results or direct arrays)
                // The provided JSON shows products are in .data.results
                const p = (listings as any)?.data?.results || (listings as any)?.results || (listings as any)?.data?.products || (listings as any)?.products;
                const s = (listings as any)?.data?.services || (listings as any)?.services;
                setShopProducts(Array.isArray(p) ? p : p?.results || []);
                setShopServices(Array.isArray(s) ? s : s?.results || []);
            } catch (err: any) {
                setError(err.detail || 'Could not fetch shop details.');
            } finally {
                setLoading(false);
            }
        };
        fetchShopData();
    }, [shopId]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error || !info) return (
        <div style={{ padding: '100px 0', textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px' }}>{error || 'Shop Not Found'}</h1>
            <a href="/" style={{ color: 'var(--primary)', fontWeight: 700 }}>Return to Hub</a>
        </div>
    );

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
                            {info.store_name[0]}
                        </div>
                        
                        {/* Shop Main Info */}
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                 <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>{info.store_name}</h1>
                                 <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>✓ VERIFIED SHOP</span>
                             </div>
                             <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px', fontWeight: 500 }}>@{info.slug}</p>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                                     <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{info.rating || 0}</span>
                                     <span>({(info.review_count || 0).toLocaleString()} reviews)</span>
                                </div>
                                <span>📍 {info.location || 'Global'}</span>
                                <span>🗓️ Joined {(info as any).joined_date ? new Date((info as any).joined_date).getFullYear() : (info.slug ? '2024' : 'Recently')}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                onClick={() => setIsContactModalOpen(true)}
                                style={{ background: 'var(--primary)', border: 'none', color: '#fff', padding: '10px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(238, 18, 23, 0.2)' }}
                            >
                                Contact Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container" style={{ marginTop: '120px', padding: '0 var(--gutter)' }}>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    
                    {/* Left Sidebar: About Shop */}
                    <div style={{ flex: '1 1 280px', maxWidth: '320px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border)' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About {info.store_name}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>{info.description}</p>
                        
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Store Performance</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Positive Feedback</span>
                                 <span style={{ fontWeight: 600, color: 'var(--success)' }}>{(info as any).positive_feedback?.split(' ').pop() || (info.positive_feedback_pct + '%')}</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                 <span>Response Rate</span>
                                 <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{(info as any).response_rate?.split(' ').pop() || (info.response_rate_pct + '%')}</span>
                             </div>
                         </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {((info as any).categories || []).length > 0 ? (
                                ((info as any).categories).map((c: any) => (
                                    <button key={c.slug} style={{ background: 'transparent', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s', textTransform: 'capitalize' }}>
                                        {c.name}
                                    </button>
                                ))
                            ) : (
                                [...new Set(shopProducts.filter(p => p && p.category).map(p => p.category))].map(c => (
                                    <button key={c} style={{ background: 'transparent', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 0', transition: 'color 0.2s', textTransform: 'capitalize' }}>
                                        {c}
                                    </button>
                                ))
                            )}
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
                                {shopServices.filter(s => s).map(s => (
                                    <ServiceCard key={s.id} {...s} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                                {shopProducts
                                    .filter(p => {
                                        if (!p) return false;
                                        if (tab === 'Best Sellers') return p?.is_best_seller || (p as any)?.isBestSeller;
                                        if (tab === 'New Arrivals') return p?.is_new || (p as any)?.isNew;
                                        return true;
                                    })
                                     .map(p => (
                                         <div key={p.id}>
                                             <ProductCard {...p as any} />
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

            {/* Contact Modal */}
            {isContactModalOpen && (
                <div 
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
                    onClick={() => setIsContactModalOpen(false)}
                >
                    <div 
                        style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '400px', padding: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', position: 'relative', animation: 'modalSlideUp 0.3s ease-out' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setIsContactModalOpen(false)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '18px' }}
                        >✕</button>

                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px' }}>📱</div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#0f172a', marginBottom: '8px' }}>Contact {info.store_name}</h2>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Choose your preferred communication channel to speak with the merchant.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Call Button */}
                            <a 
                                href={`tel:${info.phone_number || ''}`}
                                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'var(--primary)', color: '#fff', borderRadius: '16px', textDecoration: 'none', transition: 'transform 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <span style={{ fontSize: '24px' }}>📞</span>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Voice Terminal</p>
                                    <p style={{ fontSize: '16px', fontWeight: 700 }}>Call {info.phone_number || 'Merchant'}</p>
                                </div>
                            </a>

                            {/* WhatsApp Button */}
                            <a 
                                href={`https://wa.me/${(info.phone_number || '').replace(/\s+/g, '').startsWith('0') ? '234' + (info.phone_number || '').replace(/\s+/g, '').substring(1) : (info.phone_number || '').replace(/\s+/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: '#25D366', color: '#fff', borderRadius: '16px', textDecoration: 'none', transition: 'transform 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <span style={{ fontSize: '24px' }}>💬</span>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instant Messaging</p>
                                    <p style={{ fontSize: '16px', fontWeight: 700 }}>Chat on WhatsApp</p>
                                </div>
                            </a>
                        </div>

                        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#94a3b8' }}>Always stay safe by conducting transactions within the Jefado terminal.</p>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
