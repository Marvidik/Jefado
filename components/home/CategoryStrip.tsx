'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

const categories = CATEGORIES;

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
            <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
                {categories.map((cat) => (
                    <Link key={cat.label} href={`/products?category=${cat.slug}`} onClick={() => setActive(cat.label)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 8px', background: active === cat.label ? 'var(--primary)' : 'var(--surface)', color: active === cat.label ? '#fff' : 'var(--text-primary)', border: `1.5px solid ${active === cat.label ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: active === cat.label ? 'rgba(255,255,255,0.2)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: active === cat.label ? '#fff' : 'var(--primary)' }}>
                            <CategoryIcon slug={cat.slug} size={22} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}