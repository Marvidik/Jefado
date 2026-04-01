'use client';
import { useState } from 'react';

const categories = [
    { icon: '👗', label: "Women's Fashion", href: '/products?category=womens-fashion' },
    { icon: '👔', label: "Men's Fashion", href: '/products?category=mens-fashion' },
    { icon: '💻', label: 'Electronics', href: '/products?category=electronics' },
    { icon: '🏠', label: 'Home & Lifestyle', href: '/products?category=home' },
    { icon: '💊', label: 'Medicine', href: '/products?category=medicine' },
    { icon: '⚽', label: 'Sports & Outdoor', href: '/products?category=sports' },
    { icon: '🧸', label: "Baby's & Toys", href: '/products?category=baby' },
    { icon: '🛒', label: 'Groceries & Pets', href: '/products?category=groceries' },
    { icon: '✨', label: 'Health & Beauty', href: '/products?category=beauty' },
];

const slides = [
    { tag: 'Best Deal of the Week', headline: 'Smart Wearables', subline: 'Up to 80% OFF on Top Brands', cta: 'Shop Now', ctaHref: '/products?category=electronics', emoji: '⌚', bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', accent: '#60a5fa' },
    { tag: 'New Arrivals', headline: 'iPhone 14 Series', subline: 'Up to 10% Off Voucher — Today Only', cta: 'Explore Deals', ctaHref: '/products?category=smartphones', emoji: '📱', bg: 'linear-gradient(135deg, #1a1a2e 0%, #1a56db 100%)', accent: '#93c5fd' },
    { tag: 'Gaming Week', headline: 'Xbox Consoles', subline: 'Save 50% on Select Xbox Games', cta: 'Shop Gaming', ctaHref: '/products?category=gaming', emoji: '🎮', bg: 'linear-gradient(135deg, #0f172a 0%, #f97316 80%)', accent: '#fed7aa' },
];

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);
    const slide = slides[activeSlide];

    return (
        <section className="container hero-layout" style={{ padding: '16px var(--gutter)', display: 'flex', gap: '14px' }}>
            {/* Category Sidebar */}
            <div className="hero-sidebar" style={{ width: '200px', flexShrink: 0, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', alignSelf: 'stretch' }}>
                {categories.map((cat) => (
                    <a key={cat.label} href={cat.href}
                        onMouseEnter={() => setHoveredCat(cat.label)}
                        onMouseLeave={() => setHoveredCat(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', cursor: 'pointer', background: hoveredCat === cat.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === cat.label ? 'var(--primary)' : 'var(--text-primary)', transition: 'all 0.15s', borderLeft: `3px solid ${hoveredCat === cat.label ? 'var(--primary)' : 'transparent'}`, fontSize: '13px', fontWeight: hoveredCat === cat.label ? 600 : 400, borderBottom: '1px solid var(--border-light)', textDecoration: 'none' }}
                    >
                        <span>{cat.icon}</span><span style={{ flex: 1 }}>{cat.label}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>›</span>
                    </a>
                ))}
            </div>

            {/* Slider */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="hero-slider" style={{ background: slide.bg, borderRadius: 'var(--radius-xl)', padding: '40px 48px', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative', transition: 'background 0.4s ease' }}>
                    <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                    <div style={{ position: 'absolute', right: '80px', bottom: '-60px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '380px' }}>
                        <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: slide.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', marginBottom: '14px', border: `1px solid ${slide.accent}40` }}>{slide.tag}</span>
                        <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '38px', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>{slide.headline}</h1>
                        <p className="hero-subline" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', marginBottom: '24px' }}>{slide.subline}</p>
                        <a href={slide.ctaHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: '#fff', padding: '11px 26px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>{slide.cta} →</a>
                    </div>
                    <div className="hero-emoji" style={{ fontSize: '130px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))', position: 'relative', zIndex: 2 }}>{slide.emoji}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setActiveSlide(i)} style={{ width: i === activeSlide ? '24px' : '7px', height: '7px', borderRadius: '4px', background: i === activeSlide ? 'var(--primary)' : 'var(--border)', transition: 'all 0.3s' }} />
                    ))}
                </div>
            </div>

            {/* Right Mini Banners */}
            <div className="hero-right-banners" style={{ width: '190px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                    { tag: 'Introducing', name: 'Apple HomePod Mini', desc: 'Jam-packed with innovation', emoji: '🔊', bg: 'var(--surface-2)', accent: 'var(--text-primary)', href: '/products' },
                    { tag: 'Summer Sale', name: 'Xiaomi Mi 11 Ultra', desc: '12GB + 256GB — $580', emoji: '📱', bg: 'var(--announce-bg)', accent: '#fff', href: '/products' },
                ].map((banner) => (
                    <a key={banner.name} href={banner.href} style={{ background: banner.bg, borderRadius: 'var(--radius-lg)', padding: '18px 14px', border: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', textDecoration: 'none' }}>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{banner.tag}</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: banner.accent, marginBottom: '4px', lineHeight: 1.2 }}>{banner.name}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>{banner.desc}</p>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Shop Now →</span>
                        </div>
                        <div style={{ fontSize: '44px', textAlign: 'right', marginTop: '8px' }}>{banner.emoji}</div>
                    </a>
                ))}
            </div>
        </section>
    );
}