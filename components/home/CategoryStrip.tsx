'use client';
import { useState } from 'react';

const categories = [
    { icon: '💻', label: 'Computers', href: '/products?category=computers' },
    { icon: '📱', label: 'Phones', href: '/products?category=smartphones' },
    { icon: '🎧', label: 'Headphones', href: '/products?category=headphones' },
    { icon: '⌨️', label: 'Accessories', href: '/products?category=accessories' },
    { icon: '📷', label: 'Cameras', href: '/products?category=cameras' },
    { icon: '📺', label: 'TV & Home', href: '/products?category=tvs' },
    { icon: '⌚', label: 'SmartWatch', href: '/products?category=smartwatch' },
    { icon: '🎮', label: 'Gaming', href: '/products?category=gaming' },
    { icon: '🖨️', label: 'Printers', href: '/products?category=printers' },
    { icon: '🔊', label: 'Audio', href: '/products?category=audio' },
];

export default function CategoryStrip() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Categories</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Browse By Category</h2>
                    <a href="/products" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', border: '1.5px solid var(--primary)', padding: '6px 14px', borderRadius: 'var(--radius)' }}>View All →</a>
                </div>
            </div>
            <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: '10px' }}>
                {categories.map((cat) => (
                    <a key={cat.label} href={cat.href} onClick={() => setActive(cat.label)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 8px', background: active === cat.label ? 'var(--primary)' : 'var(--surface)', color: active === cat.label ? '#fff' : 'var(--text-primary)', border: `1.5px solid ${active === cat.label ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                    >
                        <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}