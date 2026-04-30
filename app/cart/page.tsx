'use client';
import { useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';

const VALID_COUPONS: Record<string, number> = { SAVE10: 10, JEFADO20: 20, WELCOME15: 15 };

/* ── Order Summary ───────────────────────── */
function OrderSummary({ items, onCheckout }: {
    items: CartItem[];
    onCheckout: () => void;
}) {
    const shippingPrice = 0;
    const [coupon, setCoupon] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [couponError, setCouponError] = useState('');

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const savings = items.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0);
    const couponSave = appliedCoupon ? (subtotal * VALID_COUPONS[appliedCoupon]) / 100 : 0;
    const total = subtotal + shippingPrice - couponSave;

    const applyCoupon = () => {
        const key = coupon.toUpperCase().trim();
        if (VALID_COUPONS[key] !== undefined) { setAppliedCoupon(key); setCouponError(''); }
        else { setAppliedCoupon(''); setCouponError('Invalid coupon code'); }
    };

    return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', position: 'sticky', top: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', marginBottom: '20px' }}>Order Summary</h2>

            {/* Line items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                    { label: `Subtotal (${items.reduce((s, i) => s + i.qty, 0)} items)`, value: `₦${subtotal.toLocaleString()}`, color: 'var(--text-primary)' },
                    { label: 'You save', value: `-₦${savings.toLocaleString()}`, color: 'var(--success)' },
                    { label: 'Shipping', value: 'FREE', color: 'var(--success)' },
                    ...(appliedCoupon ? [{ label: `Coupon (${appliedCoupon})`, value: `-₦${couponSave.toLocaleString()}`, color: 'var(--success)' }] : []),
                ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                        <span style={{ fontWeight: 600, color: row.color }}>{row.value}</span>
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '2px dashed var(--border)', margin: '14px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>₦{total.toLocaleString()}</span>
            </div>

            {/* Coupon */}
            <div style={{ marginBottom: '18px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '7px', color: 'var(--text-secondary)' }}>🏷️ Have a coupon?</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponError(''); }}
                        placeholder="Enter code"
                        style={{ flex: 1, padding: '9px 12px', border: `1.5px solid ${couponError ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 'var(--radius)', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--surface-2)', color: 'var(--text-primary)', minWidth: 0 }}
                    />
                    <button onClick={applyCoupon} style={{ padding: '9px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)', flexShrink: 0 }}>Apply</button>
                </div>
                {couponError && <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px' }}>{couponError}</p>}
                {appliedCoupon && <p style={{ fontSize: '11px', color: 'var(--success)', marginTop: '4px', fontWeight: 600 }}>✓ {VALID_COUPONS[appliedCoupon]}% off applied!</p>}
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>Try: SAVE10 · JEFADO20 · WELCOME15</p>
            </div>

            <button onClick={onCheckout} style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', boxShadow: '0 4px 20px rgba(26,86,219,0.3)', marginBottom: '10px' }}>
                Proceed to Checkout →
            </button>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>🔒 Secure SSL checkout</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px', fontSize: '18px' }}>
                {['💳', '🏦', '📱', '🅿️'].map((ic, i) => <span key={i}>{ic}</span>)}
            </div>
        </div>
    );
}

/* ── Cart Item Row ────────────────────────── */
function CartItemRow({ item, onQtyChange, onRemove, onSaveForLater }: {
    item: CartItem;
    onQtyChange: (id: number, qty: number) => void;
    onRemove: (id: number) => void;
    onSaveForLater: (id: number) => void;
}) {
    return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
            <div className="cart-item-inner">
                {/* Image */}
                <div className="cart-item-img" style={{ width: '100px', height: '100px', flexShrink: 0, background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span>{item.emoji}</span>
                    )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, marginBottom: '3px' }}>{item.seller}</p>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '4px' }}>{item.name}</p>
                    {item.category && <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>Category: <strong>{item.category}</strong></p>}

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Qty */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <button onClick={() => item.qty > 1 && onQtyChange(item.id, item.qty - 1)} style={{ padding: '6px 12px', fontSize: '16px', background: 'var(--surface-2)', color: item.qty <= 1 ? 'var(--text-muted)' : 'var(--text-primary)' }}>−</button>
                            <span style={{ padding: '6px 12px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', minWidth: '32px', textAlign: 'center' }}>{item.qty}</span>
                            <button onClick={() => onQtyChange(item.id, item.qty + 1)} style={{ padding: '6px 12px', fontSize: '16px', background: 'var(--surface-2)' }}>+</button>
                        </div>
                        <button onClick={() => onSaveForLater(item.id)} style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-body)' }}>🔖 Save</button>
                        <button onClick={() => onRemove(item.id)} style={{ fontSize: '12px', fontWeight: 600, color: 'var(--danger)', fontFamily: 'var(--font-body)' }}>🗑 Remove</button>
                    </div>
                </div>

                {/* Price */}
                <div className="cart-item-price" style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--primary)' }}>₦{(item.price * item.qty).toLocaleString()}</div>
                    {item.qty > 1 && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>₦{item.price.toLocaleString()} each</div>}
                    {item.originalPrice && item.originalPrice > item.price && (
                        <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>Save ₦{((item.originalPrice - item.price) * item.qty).toLocaleString()}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Main Cart Page ───────────────────────── */
export default function CartPage() {
    const { cartItems, updateQty, removeFromCart, addToCart } = useCart();
    const [savedItems, setSavedItems] = useState<CartItem[]>([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const saveForLater = (id: number) => { 
        const it = cartItems.find(i => i.id === id); 
        if (it) { 
            setSavedItems(p => [...p, it]); 
            removeFromCart(id); 
        } 
    };
    const moveToCart = (id: number) => { 
        const it = savedItems.find(i => i.id === id); 
        if (it) { 
            addToCart(it);
            setSavedItems(p => p.filter(i => i.id !== id)); 
        } 
    };

    if (orderPlaced) return (
        <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px 40px', textAlign: 'center', maxWidth: '480px', width: '100%', animation: 'fadeInUp 0.5s ease' }}>
                <p style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '10px' }}>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '6px', fontSize: '14px' }}>Your order #JFD-{Math.floor(Math.random() * 90000 + 10000)} has been placed.</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '13px' }}>You'll receive a confirmation email shortly.</p>
                <a href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px' }}>Continue Shopping →</a>
            </div>
        </div>
    );

    if (cartItems.length === 0 && savedItems.length === 0) return (
        <div style={{ background: 'var(--bg)', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '72px', marginBottom: '16px' }}>🛒</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', marginBottom: '10px' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
                <a href="/products" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px' }}>Start Shopping →</a>
            </div>
        </div>
    );

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="container" style={{ padding: '28px var(--gutter)' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.5px', marginBottom: '4px' }}>Shopping Cart</h1>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{cartItems.reduce((s, i) => s + i.qty, 0)} item(s) in your cart</p>
                </div>

                {/* Responsive grid: items left, summary right */}
                <div className="cart-layout">

                    {/* Left column */}
                    <div style={{ minWidth: 0 }}>
                        {/* Cart items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                            {cartItems.map(item => (
                                <CartItemRow key={item.id} item={item} onQtyChange={updateQty} onRemove={removeFromCart} onSaveForLater={saveForLater} />
                            ))}
                        </div>

                        {/* Saved for Later */}
                        {savedItems.length > 0 && (
                            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', marginBottom: '14px' }}>🔖 Saved for Later ({savedItems.length})</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {savedItems.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface-2)' }}>
                                            <div style={{ fontSize: '28px', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: 'var(--radius)', flexShrink: 0 }}>{item.emoji}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                                                <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>₦{item.price}</p>
                                            </div>
                                            <button onClick={() => moveToCart(item.id)} style={{ padding: '7px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', flexShrink: 0 }}>Move to Cart</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div style={{ minWidth: 0 }}>
                        <OrderSummary items={cartItems} onCheckout={() => { window.location.href = '/checkout'; }} />
                    </div>
                </div>
            </div>
        </div>
    );
}