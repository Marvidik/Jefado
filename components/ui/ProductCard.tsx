'use client';
import { useState } from 'react';

interface ProductCardProps {
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviews?: number;
    badge?: string;
    badgeColor?: string;
    emoji: string;
    isNew?: boolean;
    isBestSeller?: boolean;
}

export default function ProductCard({
    name, price, originalPrice, discount, rating = 4.5,
    reviews = 128, badge, badgeColor = '#ef4444', emoji, isNew, isBestSeller,
}: ProductCardProps) {
    const [wishlisted, setWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const stars = Math.round(rating * 2) / 2;

    return (
        <div style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            transition: 'all 0.25s',
            cursor: 'pointer',
            position: 'relative',
        }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-hover)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
            }}
        >
            {/* Image Area */}
            <div style={{
                position: 'relative',
                background: 'var(--surface-2)',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px',
                overflow: 'hidden',
            }}>
                <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{emoji}</span>

                {/* Badges */}
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {discount && (
                        <span style={{
                            background: badgeColor,
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                        }}>-{discount}%</span>
                    )}
                    {isNew && (
                        <span style={{
                            background: 'var(--success)',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                        }}>NEW</span>
                    )}
                    {isBestSeller && (
                        <span style={{
                            background: 'var(--warning)',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                        }}>HOT</span>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    onClick={() => setWishlisted(!wishlisted)}
                    style={{
                        position: 'absolute', top: '8px', right: '8px',
                        width: '32px', height: '32px',
                        background: 'var(--surface)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.2s',
                    }}
                >
                    {wishlisted ? '❤️' : '🤍'}
                </button>
            </div>

            {/* Info */}
            <div style={{ padding: '12px' }}>
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <span key={i} style={{
                                fontSize: '12px',
                                color: i <= Math.floor(stars) ? '#f59e0b' : i - 0.5 === stars ? '#f59e0b' : '#e2e8f0',
                            }}>★</span>
                        ))}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({reviews})</span>
                </div>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>{name}</p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '16px',
                        color: 'var(--primary)',
                    }}>${price}</span>
                    {originalPrice && (
                        <span style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            textDecoration: 'line-through',
                        }}>${originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    style={{
                        width: '100%',
                        padding: '8px',
                        background: addedToCart ? 'var(--success)' : 'var(--primary)',
                        color: '#fff',
                        borderRadius: 'var(--radius)',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s',
                        letterSpacing: '0.3px',
                    }}
                >
                    {addedToCart ? '✓ Added!' : '+ Add to Cart'}
                </button>
            </div>
        </div>
    );
}