'use client';
import { useState } from 'react';

const categories = [
    { icon: '👗', label: "Women's Fashion" }, { icon: '👔', label: "Men's Fashion" },
    { icon: '💻', label: 'Electronics' }, { icon: '🏠', label: 'Home & Lifestyle' },
    { icon: '💊', label: 'Medicine' }, { icon: '⚽', label: 'Sports & Outdoor' },
    { icon: '🧸', label: "Baby's & Toys" }, { icon: '🛒', label: 'Groceries & Pets' },
    { icon: '✨', label: 'Health & Beauty' },
];

const slides = [
    { tag: 'Best Deal of the Week', headline: 'Smart Wearables', subline: 'Up to 80% OFF on Top Brands', cta: 'Shop Now', emoji: '⌚', bg: 'linear-gradient(135deg, #38240D 0%, #713600 100%)', accent: '#FDFBD4' },
    { tag: 'New Arrivals', headline: 'iPhone 14 Series', subline: 'Up to 10% Off Voucher — Today Only', cta: 'Explore Deals', emoji: '📱', bg: 'linear-gradient(135deg, #713600 0%, #C05800 100%)', accent: '#FDFBD4' },
    { tag: 'Gaming Week', headline: 'Xbox Consoles', subline: 'Save 50% on Select Xbox Games', cta: 'Shop Gaming', emoji: '🎮', bg: 'linear-gradient(135deg, #38240D 0%, #C05800 100%)', accent: '#FDFBD4' },
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
                    <div key={cat.label} onMouseEnter={() => setHoveredCat(cat.label)} onMouseLeave={() => setHoveredCat(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', cursor: 'pointer', background: hoveredCat === cat.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === cat.label ? 'var(--primary)' : 'var(--text-primary)', transition: 'all 0.15s', borderLeft: hoveredCat === cat.label ? '3px solid var(--primary)' : '3px solid transparent', fontSize: '13px', fontWeight: hoveredCat === cat.label ? 600 : 400, borderBottom: '1px solid var(--border-light)' }}
                    >
                        <span>{cat.icon}</span><span style={{ flex: 1 }}>{cat.label}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>›</span>
                    </div>
                ))}
            </div>

            {/* Slider */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="hero-slider" style={{ background: slide.bg, borderRadius: 'var(--radius-xl)', padding: '40px 48px', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative', transition: 'background 0.4s ease' }}>
                    <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(253,251,212,0.05)' }} />
                    <div style={{ position: 'absolute', right: '80px', bottom: '-60px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(253,251,212,0.04)' }} />
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '380px' }}>
                        <span style={{ display: 'inline-block', background: 'rgba(253,251,212,0.15)', color: slide.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', marginBottom: '14px', border: '1px solid rgba(253,251,212,0.25)' }}>{slide.tag}</span>
                        <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '38px', color: '#fff', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-1px' }}>{slide.headline}</h1>
                        <p className="hero-subline" style={{ color: 'rgba(253,251,212,0.75)', fontSize: '15px', marginBottom: '24px' }}>{slide.subline}</p>
                        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: '#fff', padding: '11px 26px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 20px rgba(192,88,0,0.4)', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                        >{slide.cta} →</button>
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
                    { tag: 'Introducing New', name: 'Apple HomePod Mini', desc: 'Jam-packed with innovation', emoji: '🔊', bg: 'var(--cream)', accent: 'var(--dark)' },
                    { tag: 'Summer Sale', name: 'Xiaomi Mi 11 Ultra', desc: '12GB + 256GB — $580', emoji: '📱', bg: 'var(--dark)', accent: 'var(--cream)' },
                ].map((banner) => (
                    <div key={banner.name} style={{ background: banner.bg, borderRadius: 'var(--radius-lg)', padding: '18px 14px', border: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{banner.tag}</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: banner.accent, marginBottom: '4px', lineHeight: 1.2 }}>{banner.name}</p>
                            <p style={{ fontSize: '11px', color: banner.bg === 'var(--dark)' ? 'rgba(253,251,212,0.6)' : 'var(--text-muted)', marginBottom: '10px' }}>{banner.desc}</p>
                            <button style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', background: 'transparent' }}>Shop Now →</button>
                        </div>
                        <div style={{ fontSize: '44px', textAlign: 'right', marginTop: '8px' }}>{banner.emoji}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}