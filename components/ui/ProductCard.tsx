'use client';
import { useState } from 'react';
interface ProductCardProps {
    id?: number; name: string; price: number; originalPrice?: number; discount?: number;
    rating?: number; reviews?: number; badgeColor?: string;
    emoji?: string; image?: string; isNew?: boolean; isBestSeller?: boolean;
}
export default function ProductCard({ id = 1, name, price, originalPrice, discount, rating = 4.5, reviews = 128, emoji, image, isNew, isBestSeller }: ProductCardProps) {
    const [wishlisted, setWishlisted] = useState(false);
    const [added, setAdded] = useState(false);
    return (
        <a href={`/products/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.25s', cursor: 'pointer', position: 'relative', height: '100%' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-hover)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
                <div style={{ position: 'relative', background: 'var(--surface-2)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {image ? (
                        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: '60px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{emoji}</span>
                    )}
                    <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {discount && <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>-{discount}%</span>}
                        {isNew && <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>NEW</span>}
                        {isBestSeller && <span style={{ background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>HOT</span>}
                    </div>
                    <button onClick={e => { e.preventDefault(); setWishlisted(!wishlisted); }} style={{ position: 'absolute', top: '8px', right: '8px', width: '30px', height: '30px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', boxShadow: 'var(--shadow-sm)' }}>
                        {wishlisted ? '❤️' : '🤍'}
                    </button>
                </div>
                <div style={{ padding: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                        <span style={{ display: 'inline-flex', gap: '1px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: 12, color: i <= Math.round(rating) ? 'var(--accent)' : 'var(--border)' }}>★</span>)}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({reviews})</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '7px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '9px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--primary)' }}>${price}</span>
                        {originalPrice && <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${originalPrice}</span>}
                    </div>
                    <button onClick={e => { e.preventDefault(); setAdded(true); setTimeout(() => setAdded(false), 2000); }} style={{ width: '100%', padding: '8px', background: added ? 'var(--success)' : 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}>
                        {added ? '✓ Added!' : '+ Add to Cart'}
                    </button>
                </div>
            </div>
        </a>
    );
}