'use client';
import { useState } from 'react';

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
type Tab = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'password' | 'notifications';

interface Order {
    id: string; date: string; status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
    total: number; items: { name: string; emoji: string; qty: number; price: number }[];
    tracking?: string;
}

interface Address {
    id: number; label: string; name: string; line1: string;
    city: string; state: string; zip: string; country: string;
    phone: string; isDefault: boolean;
}

interface WishItem {
    id: number; name: string; emoji: string; price: number;
    originalPrice: number; inStock: boolean; rating: number;
}

/* ══════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════ */
const ORDERS: Order[] = [
    { id: 'JFD-83421', date: 'Mar 24, 2026', status: 'delivered', total: 457, tracking: 'TRK9821834', items: [{ name: 'Sony WH-1000XM5 Headphones', emoji: '🎧', qty: 1, price: 279 }, { name: 'Anker 737 Power Bank', emoji: '🔋', qty: 1, price: 89 }, { name: 'USB-C Cable 6ft', emoji: '🔌', qty: 3, price: 29 }] },
    { id: 'JFD-79103', date: 'Mar 15, 2026', status: 'shipped', total: 1199, tracking: 'TRK7654201', items: [{ name: 'Samsung Galaxy S25 Ultra', emoji: '📱', qty: 1, price: 1199 }] },
    { id: 'JFD-71882', date: 'Feb 28, 2026', status: 'processing', total: 259, items: [{ name: 'Bose QuietComfort 45', emoji: '🎧', qty: 1, price: 259 }] },
    { id: 'JFD-65540', date: 'Feb 10, 2026', status: 'delivered', total: 218, tracking: 'TRK5502198', items: [{ name: 'Logitech MX Master 3S', emoji: '🖱️', qty: 2, price: 89 }, { name: 'Mousepad XL', emoji: '🖥️', qty: 1, price: 40 }] },
    { id: 'JFD-59201', date: 'Jan 22, 2026', status: 'cancelled', total: 1099, items: [{ name: 'iPhone 15 Pro Max', emoji: '📱', qty: 1, price: 1099 }] },
];

const ADDRESSES: Address[] = [
    { id: 1, label: 'Home', name: 'James Okafor', line1: '24 Adeola Odeku St', city: 'Lagos', state: 'Lagos', zip: '101001', country: 'Nigeria', phone: '+234 801 234 5678', isDefault: true },
    { id: 2, label: 'Office', name: 'James Okafor', line1: '15 Herbert Macaulay', city: 'Abuja', state: 'FCT', zip: '900001', country: 'Nigeria', phone: '+234 802 345 6789', isDefault: false },
];

const WISHLIST: WishItem[] = [
    { id: 1, name: 'MacBook Pro 14" M3 Pro', emoji: '💻', price: 1999, originalPrice: 2199, inStock: true, rating: 4.9 },
    { id: 2, name: 'LG C3 55" OLED 4K TV', emoji: '📺', price: 1296, originalPrice: 1799, inStock: true, rating: 4.8 },
    { id: 3, name: 'Canon EOS R6 Mark II Camera', emoji: '📷', price: 2499, originalPrice: 2799, inStock: true, rating: 4.8 },
    { id: 4, name: 'iPad Pro 12.9" M2', emoji: '📟', price: 1099, originalPrice: 1299, inStock: false, rating: 4.8 },
    { id: 5, name: 'NVIDIA RTX 4080 Super Graphics Card', emoji: '🖥️', price: 999, originalPrice: 1199, inStock: true, rating: 4.8 },
    { id: 6, name: 'JBL Charge 5 Bluetooth Speaker', emoji: '🔊', price: 129, originalPrice: 179, inStock: true, rating: 4.7 },
];

const USER = { name: 'James Okafor', email: 'james.okafor@email.com', phone: '+234 801 234 5678', avatar: '👤', joined: 'January 2025', totalOrders: 12, totalSpent: 8430, points: 2840 };

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const STATUS_CONFIG = {
    delivered: { label: 'Delivered', color: 'var(--success)', bg: '#f0fdf4', icon: '✓' },
    shipped: { label: 'Shipped', color: '#2563eb', bg: '#eff6ff', icon: '🚚' },
    processing: { label: 'Processing', color: 'var(--warning)', bg: '#fffbeb', icon: '⏳' },
    cancelled: { label: 'Cancelled', color: 'var(--danger)', bg: '#fef2f2', icon: '✕' },
};

function Stars({ rating }: { rating: number }) {
    return (
        <span style={{ display: 'inline-flex', gap: '1px' }}>
            {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: 12, color: i <= Math.round(rating) ? 'var(--primary)' : 'var(--border)' }}>★</span>)}
        </span>
    );
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{title}</h3>
                {action}
            </div>
            <div style={{ padding: '24px' }}>{children}</div>
        </div>
    );
}

function Btn({ label, variant = 'primary', onClick, small }: { label: string; variant?: 'primary' | 'outline' | 'ghost'; onClick?: () => void; small?: boolean }) {
    const styles = {
        primary: { background: 'var(--primary)', color: '#fff', border: 'none' },
        outline: { background: 'transparent', color: 'var(--primary)', border: '1.5px solid var(--primary)' },
        ghost: { background: 'transparent', color: 'var(--text-muted)', border: '1.5px solid var(--border)' },
    };
    return (
        <button onClick={onClick} style={{ ...styles[variant], padding: small ? '6px 14px' : '9px 20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: small ? '12px' : '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
            {label}
        </button>
    );
}

/* ══════════════════════════════════════════
   TAB: PROFILE
══════════════════════════════════════════ */
function ProfileTab() {
    const [form, setForm] = useState({ firstName: 'James', lastName: 'Okafor', email: USER.email, phone: USER.phone, bio: 'Tech enthusiast and avid online shopper.', gender: 'Male', dob: '1990-06-15' });
    const [saved, setSaved] = useState(false);
    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '14px', fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none' };
    const label = (text: string) => <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>{text}</label>;

    return (
        <>
            <SectionCard title="Personal Information">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>{label('First Name')}<input value={form.firstName} onChange={set('firstName')} style={inputStyle} /></div>
                    <div>{label('Last Name')} <input value={form.lastName} onChange={set('lastName')} style={inputStyle} /></div>
                    <div>{label('Email Address')}<input value={form.email} onChange={set('email')} type="email" style={inputStyle} /></div>
                    <div>{label('Phone Number')} <input value={form.phone} onChange={set('phone')} type="tel" style={inputStyle} /></div>
                    <div>
                        {label('Gender')}
                        <select value={form.gender} onChange={set('gender')} style={inputStyle}>
                            {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                        </select>
                    </div>
                    <div>{label('Date of Birth')}<input value={form.dob} onChange={set('dob')} type="date" style={inputStyle} /></div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    {label('Bio')}
                    <textarea value={form.bio} onChange={set('bio')} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Btn label={saved ? '✓ Saved!' : 'Save Changes'} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} />
                    <Btn label="Cancel" variant="ghost" />
                </div>
            </SectionCard>

            <SectionCard title="Profile Picture">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: '3px solid var(--primary)', flexShrink: 0 }}>👤</div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Profile Photo</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>JPG, PNG or GIF. Max 5MB.</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Btn label="Upload Photo" />
                            <Btn label="Remove" variant="ghost" />
                        </div>
                    </div>
                </div>
            </SectionCard>
        </>
    );
}

/* ══════════════════════════════════════════
   TAB: ORDERS
══════════════════════════════════════════ */
function OrdersTab() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | Order['status']>('all');

    const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);
    const filters: Array<{ key: 'all' | Order['status']; label: string }> = [
        { key: 'all', label: 'All Orders' }, { key: 'delivered', label: 'Delivered' },
        { key: 'shipped', label: 'Shipped' }, { key: 'processing', label: 'Processing' },
        { key: 'cancelled', label: 'Cancelled' },
    ];

    return (
        <div>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {filters.map(f => (
                    <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', background: filter === f.key ? 'var(--primary)' : 'var(--surface)', color: filter === f.key ? '#fff' : 'var(--text-secondary)', border: `1.5px solid ${filter === f.key ? 'var(--primary)' : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>{f.label}</button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '40px', marginBottom: '12px' }}>📦</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>No orders found</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No orders with this status yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filtered.map(order => {
                        const st = STATUS_CONFIG[order.status];
                        const open = expanded === order.id;
                        return (
                            <div key={order.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                                {/* Order header */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', flexWrap: 'wrap', gap: '10px', cursor: 'pointer' }} onClick={() => setExpanded(open ? null : order.id)}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--primary)', marginBottom: '2px' }}>{order.id}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Placed {order.date}</p>
                                        </div>
                                        <span style={{ background: st.bg, color: st.color, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            {st.icon} {st.label}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--primary)' }}>${order.total}</p>
                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                                        </div>
                                        <span style={{ fontSize: '18px', color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                                    </div>
                                </div>

                                {/* Expanded details */}
                                {open && (
                                    <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--surface-2)' }}>
                                        {/* Items */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                                            {order.items.map(item => (
                                                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '44px', height: '44px', background: 'var(--cream)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, border: '1px solid var(--border)' }}>{item.emoji}</div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</p>
                                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Qty: {item.qty}</p>
                                                    </div>
                                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>${item.price}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tracking + Actions */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                                            <div>
                                                {order.tracking && (
                                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tracking: <strong style={{ color: 'var(--primary)' }}>{order.tracking}</strong></p>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {order.status === 'delivered' && <Btn label="Reorder" small />}
                                                {order.status === 'delivered' && <Btn label="Write Review" small variant="outline" />}
                                                {order.status === 'shipped' && <Btn label="Track Order" small />}
                                                {order.status === 'processing' && <Btn label="Cancel Order" small variant="ghost" />}
                                                {order.status === 'cancelled' && <Btn label="Reorder" small variant="outline" />}
                                                <Btn label="View Receipt" small variant="ghost" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════
   TAB: ADDRESSES
══════════════════════════════════════════ */
function AddressesTab() {
    const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);
    const [adding, setAdding] = useState(false);

    const setDefault = (id: number) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    const remove = (id: number) => setAddresses(prev => prev.filter(a => a.id !== id));

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {addresses.map(addr => (
                    <div key={addr.id} style={{ background: 'var(--surface)', border: `2px solid ${addr.isDefault ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: '18px', position: 'relative' }}>
                        {addr.isDefault && (
                            <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>DEFAULT</span>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '20px' }}>{addr.label === 'Home' ? '🏠' : '🏢'}</span>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px' }}>{addr.label}</span>
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{addr.name}</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '4px' }}>{addr.line1}</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '4px' }}>{addr.city}, {addr.state} {addr.zip}</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{addr.country}</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{addr.phone}</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Btn label="Edit" small variant="outline" />
                            {!addr.isDefault && <Btn label="Set Default" small onClick={() => setDefault(addr.id)} />}
                            {!addr.isDefault && <Btn label="Remove" small variant="ghost" onClick={() => remove(addr.id)} />}
                        </div>
                    </div>
                ))}

                {/* Add new */}
                <button onClick={() => setAdding(true)} style={{ background: 'var(--surface-2)', border: `2px dashed var(--border)`, borderRadius: 'var(--radius-lg)', padding: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', minHeight: '160px', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-light)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-2)'; }}
                >
                    <span style={{ fontSize: '28px', color: 'var(--primary)' }}>＋</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Add New Address</span>
                </button>
            </div>

            {adding && (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>New Address</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        {['Full Name', 'Phone', 'Street Address', 'City', 'State', 'ZIP Code', 'Country'].map(f => (
                            <div key={f} style={{ gridColumn: f === 'Street Address' ? 'span 2' : 'span 1' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>{f}</label>
                                <input placeholder={f} style={{ width: '100%', padding: '9px 13px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--surface)' }} />
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Btn label="Save Address" onClick={() => setAdding(false)} />
                        <Btn label="Cancel" variant="ghost" onClick={() => setAdding(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════
   TAB: WISHLIST
══════════════════════════════════════════ */
function WishlistTab() {
    const [items, setItems] = useState<WishItem[]>(WISHLIST);
    const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                {items.map(item => (
                    <div key={item.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.2s', position: 'relative' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                    >
                        <button onClick={() => remove(item.id)} style={{ position: 'absolute', top: '8px', right: '8px', width: '26px', height: '26px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--danger)', boxShadow: 'var(--shadow-sm)', zIndex: 2 }}>✕</button>
                        <div style={{ background: 'var(--cream)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px' }}>{item.emoji}</div>
                        <div style={{ padding: '12px' }}>
                            <Stars rating={item.rating} />
                            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', margin: '6px 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--primary)' }}>${item.price}</span>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${item.originalPrice}</span>
                            </div>
                            {!item.inStock
                                ? <div style={{ width: '100%', padding: '7px', background: 'var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>Out of Stock</div>
                                : <button style={{ width: '100%', padding: '7px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Add to Cart</button>
                            }
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '40px', marginBottom: '12px' }}>💛</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>Your wishlist is empty</p>
                        <a href="/products" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}>Browse products →</a>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════
   TAB: PASSWORD
══════════════════════════════════════════ */
function PasswordTab() {
    const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
    const [saved, setSaved] = useState(false);
    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));
    const valid = form.current && form.newPass.length >= 8 && form.newPass === form.confirm;

    const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '14px', fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none' };

    return (
        <SectionCard title="Change Password">
            <div style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                    { label: 'Current Password', key: 'current' as const },
                    { label: 'New Password', key: 'newPass' as const },
                    { label: 'Confirm Password', key: 'confirm' as const },
                ].map(({ label, key }) => (
                    <div key={key}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>{label}</label>
                        <input type="password" value={form[key]} onChange={e => set(key)(e.target.value)} style={inputStyle} placeholder="••••••••" />
                    </div>
                ))}

                {form.newPass.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: form.newPass.length >= i * 3 ? (form.newPass.length >= 10 ? 'var(--success)' : form.newPass.length >= 6 ? 'var(--warning)' : 'var(--danger)') : 'var(--border)', transition: 'background 0.3s' }} />
                            ))}
                        </div>
                        <p style={{ fontSize: '11px', color: form.newPass.length >= 10 ? 'var(--success)' : form.newPass.length >= 6 ? 'var(--warning)' : 'var(--danger)' }}>
                            {form.newPass.length >= 10 ? 'Strong' : form.newPass.length >= 6 ? 'Fair' : 'Weak'} password
                        </p>
                    </div>
                )}

                {form.confirm && form.newPass !== form.confirm && (
                    <p style={{ fontSize: '12px', color: 'var(--danger)' }}>⚠ Passwords do not match</p>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <Btn label={saved ? '✓ Updated!' : 'Update Password'} onClick={() => { if (valid) { setSaved(true); setTimeout(() => setSaved(false), 2000); } }} />
                    <Btn label="Cancel" variant="ghost" />
                </div>
            </div>
        </SectionCard>
    );
}

/* ══════════════════════════════════════════
   TAB: NOTIFICATIONS
══════════════════════════════════════════ */
function NotificationsTab() {
    const [prefs, setPrefs] = useState({
        orderUpdates: true, promotions: true, newArrivals: false,
        priceDrops: true, reviews: false, newsletter: true,
        sms: false, push: true,
    });
    const toggle = (k: keyof typeof prefs) => () => setPrefs(p => ({ ...p, [k]: !p[k] }));

    const Toggle = ({ label, desc, k }: { label: string; desc: string; k: keyof typeof prefs }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-light)' }}>
            <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</p>
            </div>
            <button onClick={toggle(k)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: prefs[k] ? 'var(--primary)' : 'var(--border)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: '2px', left: prefs[k] ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
        </div>
    );

    return (
        <SectionCard title="Notification Preferences">
            <Toggle label="Order Updates" desc="Shipping, delivery and order status changes" k="orderUpdates" />
            <Toggle label="Promotions" desc="Sales, discounts and special offers" k="promotions" />
            <Toggle label="New Arrivals" desc="Be first to know about new products" k="newArrivals" />
            <Toggle label="Price Drops" desc="When items in your wishlist go on sale" k="priceDrops" />
            <Toggle label="Review Reminders" desc="Prompts to review your purchased products" k="reviews" />
            <Toggle label="Newsletter" desc="Weekly deals and curated recommendations" k="newsletter" />
            <Toggle label="SMS Notifications" desc="Receive updates via text message" k="sms" />
            <Toggle label="Push Notifications" desc="Browser and mobile push notifications" k="push" />
            <div style={{ marginTop: '16px' }}>
                <Btn label="Save Preferences" />
            </div>
        </SectionCard>
    );
}

/* ══════════════════════════════════════════
   SIDEBAR NAV
══════════════════════════════════════════ */
const NAV_ITEMS: { key: Tab; icon: string; label: string }[] = [
    { key: 'profile', icon: '👤', label: 'My Profile' },
    { key: 'orders', icon: '📦', label: 'My Orders' },
    { key: 'addresses', icon: '📍', label: 'Addresses' },
    { key: 'wishlist', icon: '💛', label: 'Wishlist' },
    { key: 'password', icon: '🔒', label: 'Password' },
    { key: 'notifications', icon: '🔔', label: 'Notifications' },
];

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function AccountPage() {
    const [tab, setTab] = useState<Tab>('profile');

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="container" style={{ padding: '28px var(--gutter)' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    <a href="/">Home</a><span>›</span><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>My Account</span>
                </div>

                <div className="account-layout" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

                    {/* ── Sidebar ── */}
                    <aside className="account-sidebar" style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* User Card */}
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', textAlign: 'center' }}>
                            <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '36px', boxShadow: '0 4px 20px rgba(192,88,0,0.3)' }}>👤</div>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '2px' }}>{USER.name}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>{USER.email}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {[{ label: 'Orders', value: USER.totalOrders }, { label: 'Points', value: USER.points.toLocaleString() }].map(({ label, value }) => (
                                    <div key={label} style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius)', padding: '10px 6px', textAlign: 'center' }}>
                                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--primary)' }}>{value}</p>
                                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nav */}
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                            {NAV_ITEMS.map((item, idx) => (
                                <button key={item.key} onClick={() => setTab(item.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 18px', background: tab === item.key ? 'var(--primary-light)' : 'transparent', color: tab === item.key ? 'var(--primary)' : 'var(--text-secondary)', borderLeft: `3px solid ${tab === item.key ? 'var(--primary)' : 'transparent'}`, borderBottom: idx < NAV_ITEMS.length - 1 ? '1px solid var(--border-light)' : 'none', fontFamily: 'var(--font-body)', fontWeight: tab === item.key ? 700 : 500, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
                                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                    {item.label}
                                    {tab === item.key && <span style={{ marginLeft: 'auto', fontSize: '12px' }}>›</span>}
                                </button>
                            ))}
                        </div>

                        {/* Logout */}
                        <button style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)', color: 'var(--danger)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fef2f2'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--danger)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
                            onClick={() => { window.location.href = '/auth'; }}>🚪 Sign Out</button>
                        {/* navigate to auth on sign out */}
                    </aside>

                    {/* ── Main Content ── */}
                    <main style={{ flex: 1, minWidth: 0 }}>
                        {tab === 'profile' && <ProfileTab />}
                        {tab === 'orders' && <OrdersTab />}
                        {tab === 'addresses' && <AddressesTab />}
                        {tab === 'wishlist' && <WishlistTab />}
                        {tab === 'password' && <PasswordTab />}
                        {tab === 'notifications' && <NotificationsTab />}
                    </main>
                </div>
            </div>
        </div>
    );
}