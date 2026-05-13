'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    id?: number; slug?: string; name: string; price: number | string; 
    original?: number | string; original_price?: number | string;
    discount?: number;
    rating?: number; review_count?: number; reviews?: number; 
    emoji?: string; image?: string; 
    is_new?: boolean; isNew?: boolean; 
    is_best_seller?: boolean; isBestSeller?: boolean;
    stock_qty?: number; stockQuantity?: number;
    seller?: string;
}

export default function ProductCard({ 
    id, slug, name, price, original, original_price, discount, 
    rating = 4.5, review_count, reviews, 
    emoji, image, is_new, isNew, is_best_seller, isBestSeller, 
    stock_qty, stockQuantity, seller = 'Jefedo'
}: ProductCardProps) {
    const { addToCart } = useCart();
    const [wishlisted, setWishlisted] = useState(false);
    const [added, setAdded] = useState(false);
    
    // Normalize data
    const itemPrice = typeof price === 'string' ? (parseFloat(price) || 0) : (price || 0);
    const itemOriginal = typeof (original || original_price) === 'string' 
        ? (parseFloat((original || original_price) as string) || 0) 
        : ((original || original_price) as number || 0);
    const itemReviews = review_count ?? (Array.isArray(reviews) ? reviews.length : reviews) ?? 0;
    const itemIsNew = is_new || isNew;
    const itemIsHot = is_best_seller || isBestSeller;
    const itemStock = stock_qty ?? stockQuantity;
    const itemLink = `/products/${slug || id}`;
    return (
        <a href={itemLink} style={{ display: 'block', textDecoration: 'none' }}>
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
                        {itemIsNew && <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>NEW</span>}
                        {itemIsHot && <span style={{ background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>HOT</span>}
                    </div>
                    <button onClick={e => { e.preventDefault(); setWishlisted(!wishlisted); }} style={{ position: 'absolute', top: '8px', right: '8px', width: '30px', height: '30px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', boxShadow: 'var(--shadow-sm)' }}>
                        {wishlisted ? '❤️' : '🤍'}
                    </button>
                </div>
                <div style={{ padding: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                        <span style={{ display: 'inline-flex', gap: '1px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: 12, color: i <= Math.round(rating) ? 'var(--accent)' : 'var(--border)' }}>★</span>)}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({itemReviews})</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '7px', lineHeight: 1.4, height: '2.8em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '9px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--primary)' }}>₦{itemPrice.toLocaleString()}</span>
                            {itemOriginal && <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₦{itemOriginal.toLocaleString()}</span>}
                        </div>
                        {itemStock !== undefined && (
                            <span style={{ fontSize: '10px', fontWeight: 700, color: itemStock < 10 ? 'var(--danger)' : 'var(--success)' }}>
                                {itemStock} left
                            </span>
                        )}
                    </div>
                <button 
                    disabled={!id || added || itemStock === 0}
                    onClick={(e) => {
                        e.preventDefault();
                        if (id) {
                            addToCart({
                                id, slug: slug || id.toString(), name, 
                                price: itemPrice, 
                                originalPrice: itemOriginal,
                                image, emoji,
                                qty: 1,
                                seller: seller || 'Jefedo'
                            });
                            setAdded(true);
                            setTimeout(() => setAdded(false), 2000);
                        }
                    }} 
                    style={{ 
                        width: '100%', padding: '8px', 
                        background: (added || itemStock === 0) ? (added ? 'var(--success)' : 'var(--border)') : 'var(--primary)', 
                        color: (added || (itemStock !== undefined && itemStock > 0)) ? '#fff' : 'var(--text-muted)', 
                        borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', 
                        transition: 'all 0.2s',
                        cursor: (added || itemStock === 0) ? 'not-allowed' : 'pointer',
                        border: 'none'
                    }}
                >
                    {itemStock === 0 ? 'Out of Stock' : (added ? '✓ Added!' : '+ Add to Cart')}
                </button>
                </div>
            </div>
        </a>
    );
}