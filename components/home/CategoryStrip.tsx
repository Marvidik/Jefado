'use client';
import { useState } from 'react';

const categories = [
    { icon: '💻', label: 'Computers' },
    { icon: '📱', label: 'Phones' },
    { icon: '🎧', label: 'Headphones' },
    { icon: '⌨️', label: 'Accessories' },
    { icon: '📷', label: 'Cameras' },
    { icon: '📺', label: 'TV & Home' },
    { icon: '⌚', label: 'SmartWatch' },
    { icon: '🎮', label: 'Gaming' },
    { icon: '🖨️', label: 'Printers' },
    { icon: '🔊', label: 'Audio' },
];

export default function CategoryStrip() {
    const [active, setActive] = useState(null);
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
            <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Categories</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Browse By Category</h2>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {['‹', '›'].map(a => (
                            <button key={a} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>{a}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
                {categories.map((cat) => (
                    <button key={cat.label} onClick={() => setActive(active === cat.label ? null : cat.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 8px', background: active === cat.label ? 'var(--primary)' : 'var(--surface)', color: active === cat.label ? '#fff' : 'var(--text-primary)', border: `1.5px solid ${active === cat.label ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)' }}>
                        <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}