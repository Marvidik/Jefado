'use client';
import { useState, useEffect } from 'react';
import { getProfile, updateProfile, getAddresses, getMyOrders, createAddress, deleteAddress, setDefaultAddress, changeAccountPassword } from '@/services/accountService';
import { UserProfile, Address, Order } from '@/services/types';
import { useToast } from '@/components/ui/Toast';

const NIGERIAN_STATES = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];

/* 
   ══════════════════════════════════════════
   MARKETPLACE DATA DEPOT
   ══════════════════════════════════════════ 
*/
const USER_MOCK = { 
    first_name: 'James', 
    last_name: 'Okafor', 
    email: 'james.okafor@email.com', 
    phone: '+234 801 234 5678',
    gender: 'MALE',
    date_of_birth: '1992-05-15',
    bio: 'Professional shopper and tech enthusiast based in Lagos.',
    wallet: '₦12,500', 
    points: '2,840',
    notifications: {
        order_updates: true,
        promotions: false,
        new_arrivals: true,
        newsletter: true
    }
};

/* 
   ══════════════════════════════════════════
   MARKETPLACE DASHBOARD
   ══════════════════════════════════════════ 
*/

export default function AccountPage() {
    const { success, error: toastError } = useToast();
    const [tab, setTab] = useState('Overview');
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    
    // API Data State
    const [user, setUser] = useState<UserProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);

    // Form states
    const [profileForm, setProfileForm] = useState<Partial<UserProfile>>({});
    const [addressForm, setAddressForm] = useState({ label: '', full_name: '', street_address: '', city: '', state: '', country: 'Nigeria', postal_code: '', phone: '', is_default: false });
    const [securityForm, setSecurityForm] = useState({ old_password: '', new_password: '', confirm_password: '' });

    // SYNC WITH URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('tab');
        if (t) setTab(t);
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const [p, a, o] = await Promise.all([
                    getProfile(),
                    getAddresses(),
                    getMyOrders()
                ]);
                setUser(p);
                setProfileForm(p);
                setAddresses(a);
                setOrders(o.results || []);
            } catch (err) {
                console.error("Failed to fetch account data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleNavigate = (target: string) => {
        setTab(target);
        setViewingOrder(null);
        setShowAddressForm(false);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', target);
        window.history.pushState({}, '', url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateProfile = async () => {
        try {
            setSubmitting(true);
            const updated = await updateProfile(profileForm);
            setUser(updated);
            success("Profile updated successfully!");
        } catch (err) {
            toastError("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddAddress = async () => {
        try {
            setSubmitting(true);
            await createAddress(addressForm as any);
            const a = await getAddresses();
            setAddresses(a);
            setShowAddressForm(false);
            success("Address added successfully!");
        } catch (err) {
            toastError("Failed to add address.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSetDefaultAddress = async (id: number) => {
        try {
            setSubmitting(true);
            await setDefaultAddress(id);
            const a = await getAddresses();
            setAddresses(a);
            success("Default address updated!");
        } catch (err) {
            toastError("Failed to update default address.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteAddress = async (id: number) => {
        if (!confirm("Are you sure you want to delete this address?")) return;
        try {
            setSubmitting(true);
            await deleteAddress(id);
            setAddresses(addresses.filter(ad => ad.id !== id));
            success("Address deleted.");
        } catch (err) {
            toastError("Failed to delete address.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (securityForm.new_password !== securityForm.confirm_password) {
            toastError("New passwords do not match.");
            return;
        }
        try {
            setSubmitting(true);
            await changeAccountPassword({
                old_password: securityForm.old_password,
                new_password: securityForm.new_password,
                confirm_password: securityForm.confirm_password
            });
            success("Password updated successfully!");
            setSecurityForm({ old_password: '', new_password: '', confirm_password: '' });
        } catch (err: any) {
            toastError(err.response?.data?.detail || "Failed to update password. Please check your current password.");
        } finally {
            setSubmitting(false);
        }
    };

    const is = (t: string) => tab === t;

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f7f9' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return (
        <div style={{ background: '#f5f7f9', minHeight: '100vh', padding: '20px 0 100px', fontFamily: 'var(--font-body)' }}>
            <style>{`
                .account-container { max-width: 1200px; margin: 0 auto; padding: 0 16px; display: grid; grid-template-columns: 260px 1fr; gap: 24px; }
                .card { background: #fff; border-radius: 12px; border: 1px solid #eef1f4; box-shadow: 0 2px 8px rgba(0,0,0,0.03); overflow: hidden; }
                .nav-btn { width: 100%; display: flex; alignItems: center; gap: 12px; padding: 12px 16px; border: none; background: transparent; cursor: pointer; text-align: left; transition: 0.2s; border-radius: 8px; font-size: 14px; fontWeight: 500; color: #475569; position: relative; }
                .nav-btn:hover { background: #f8fafc; }
                .nav-btn.active { background: #fef2f2; color: var(--primary); fontWeight: 700; }
                .nav-btn.active::after { content: ''; position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px; background: var(--primary); border-radius: 0 4px 4px 0; }
                .mobile-nav { display: none; overflow-x: auto; white-space: nowrap; padding: 10px 16px; background: #fff; border-bottom: 1px solid #eef1f4; margin-bottom: 20px; -webkit-overflow-scrolling: touch; }
                .mobile-nav::-webkit-scrollbar { display: none; }
                .m-nav-btn { display: inline-flex; flex-direction: column; align-items: center; padding: 8px 16px; color: #475569; font-size: 11px; font-weight: 700; gap: 4px; border: none; background: transparent; }
                .m-nav-btn.active { color: var(--primary); }
                @media (max-width: 900px) { 
                    .account-container { grid-template-columns: 1fr; padding-top: 10px; } 
                    .desktop-sb { display: none; } 
                    .mobile-nav { display: flex; position: sticky; top: 0; z-index: 10; margin: -20px 0 20px; }
                }
                .fade-in { animation: fadeIn 0.3s ease both; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .form-group { margin-bottom: 16px; }
                .form-label { font-size: 11px; font-weight: 800; color: #94a3b8; display: block; marginBottom: 6px; text-transform: uppercase; }
                .form-input { width: 100%; padding: 12px; borderRadius: 8px; border: 1px solid #eef1f4; font-family: inherit; font-size: 14px; }
            `}</style>

            <div className="account-container">
                
                {/* ── Sidebar (Desktop) ── */}
                <aside className="desktop-sb">
                    <div className="card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                {user?.first_name?.[0] || 'U'}
                            </div>
                            <div><p style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{user?.first_name} {user?.last_name}</p><p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>My Account</p></div>
                        </div>
                        
                        <p style={{ fontSize: '10px', fontWeight: 800, color: '#b1bbc9', textTransform: 'uppercase', marginBottom: '10px' }}>Menu</p>
                        {['Overview', 'Orders'].map(t => (
                            <button key={t} className={`nav-btn ${is(t) ? 'active' : ''}`} onClick={() => handleNavigate(t)}>
                                <span>{t === 'Orders' ? '📦' : '👤'}</span> {t}
                            </button>
                        ))}
                        
                        <p style={{ fontSize: '10px', fontWeight: 800, color: '#b1bbc9', textTransform: 'uppercase', margin: '20px 0 10px' }}>Settings</p>
                        {['Profile', 'Addresses', 'Security'].map(t => (
                            <button key={t} className={`nav-btn ${is(t) ? 'active' : ''}`} onClick={() => handleNavigate(t)}>
                                <span>{t === 'Profile' ? '⚙️' : t === 'Addresses' ? '📍' : '🔒'}</span> {t}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ── Main Panel ── */}
                <main>
                    {/* Mobile Nav */}
                    <nav className="mobile-nav">
                        {[
                            { id: 'Overview', i: '👤' },
                            { id: 'Orders', i: '📦' },
                            { id: 'Addresses', i: '📍' },
                            { id: 'Profile', i: '⚙️' },
                            { id: 'Security', i: '🔒' }
                        ].map(m => (
                            <button key={m.id} className={`m-nav-btn ${is(m.id) ? 'active' : ''}`} onClick={() => handleNavigate(m.id)}>
                                <span style={{ fontSize: '18px' }}>{m.i}</span>
                                <span>{m.id}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Section Header */}
                    <div className="card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {(tab !== 'Overview' || viewingOrder) && <button onClick={() => viewingOrder ? setViewingOrder(null) : handleNavigate('Overview')} style={{ background: '#f8fafc', border: '1px solid #eef1f4', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>←</button>}
                            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{viewingOrder ? `Order ${viewingOrder.id}` : tab}</h2>
                        </div>
                        <div style={{ background: '#fef2f2', padding: '6px 14px', borderRadius: '30px', border: '1px solid #fee2e2' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px', margin: 0 }}>{orders.length} Orders</p>
                        </div>
                    </div>

                    {/* OVERVIEW TAB */}
                    {is('Overview') && !viewingOrder && (
                        <div className="fade-in">
                            <div className="card" style={{ display: 'flex', padding: '24px 0', marginBottom: '20px', textAlign: 'center' }}>
                                {[
                                    { i: '⏳', l: 'Processing', t: 'Orders' },
                                    { i: '🚚', l: 'Shipped', t: 'Orders' },
                                    { i: '⭐', l: 'Reviews', t: 'Orders' }
                                ].map(s => (
                                    <div key={s.l} style={{ flex: 1, cursor: 'pointer' }} onClick={() => handleNavigate(s.t)}>
                                        <p style={{ fontSize: '24px', margin: '0 0 4px' }}>{s.i}</p>
                                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{s.l}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { l: 'Orders', i: '📦', sub: 'History' },
                                    { l: 'Addresses', i: '📍', sub: 'Shipping' },
                                    { l: 'Profile', i: '⚙️', sub: 'Account' },
                                    { l: 'Security', i: '🔒', sub: 'Privacy' }
                                ].map(m => (
                                    <div key={m.l} className="card" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => handleNavigate(m.l)}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>{m.i}</div>
                                        <p style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>{m.l}</p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Manage {m.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {is('Orders') && !viewingOrder && (
                        <div className="fade-in">
                            {orders.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No orders found.</p>}
                            {orders.map(o => (
                                <div key={o.id} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <p style={{ fontWeight: 800, color: 'var(--primary)' }}>ORD-{o.id}</p>
                                        <span style={{ fontSize: '10px', fontWeight: 800, background: '#f0fdf4', color: '#10b981', padding: '3px 10px', borderRadius: '20px' }}>{o.status_display}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', fontWeight: 600 }}>📦 {o.items?.[0]?.name || 'Service Booking'} {o.items?.length > 1 ? `+ ${o.items.length - 1} other` : ''}</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Placed on: {o.order_date ? new Date(o.order_date).toLocaleDateString() : 'Date N/A'}</p>
                                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 800 }}>₦{parseFloat(o.total_amount).toLocaleString()}</p>
                                        <button onClick={() => setViewingOrder(o)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #eef1f4', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ORDER DETAILS VIEW */}
                    {viewingOrder && (
                        <div className="fade-in">
                            <div className="card" style={{ padding: '24px' }}>
                                <div style={{ borderBottom: '1px solid #eef1f4', paddingBottom: '16px', marginBottom: '16px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '4px' }}>ORDER STATUS</p>
                                    <h3 style={{ margin: 0, color: '#10b981' }}>{viewingOrder.status_display}</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '24px' }}>
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>DELIVERY ADDRESS</p>
                                        <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>{viewingOrder.address || 'No address provided'}</p>
                                        {viewingOrder.city && <p style={{ fontSize: '13px', color: '#475569', margin: '2px 0 0' }}>{viewingOrder.city}, {viewingOrder.state}</p>}
                                    </div>
                                </div>
                                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '12px' }}>ITEMS IN THIS ORDER</p>
                                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                                    {viewingOrder.items?.map((item: any, idx: number) => (
                                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: idx < viewingOrder.items.length - 1 ? '12px' : 0 }}>
                                            <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📦</div>
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{item.name}</p>
                                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Qty: {item.quantity} × ₦{parseFloat(item.price).toLocaleString()}</p>
                                            </div>
                                            <p style={{ marginLeft: 'auto', fontWeight: 800 }}>₦{(parseFloat(item.price) * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eef1f4', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 800 }}>Total Paid</p>
                                    <p style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>₦{parseFloat(viewingOrder.total_amount).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* ADDRESSES TAB */}
                    {is('Addresses') && (
                        <div className="fade-in">
                            {showAddressForm ? (
                                <div className="card" style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Add New Address</h3>
                                        <button onClick={() => setShowAddressForm(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Address Label</label>
                                        <input className="form-input" placeholder="e.g. Office, Home 2" value={addressForm.label} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input className="form-input" value={addressForm.full_name} onChange={e => setAddressForm({ ...addressForm, full_name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Street Address</label>
                                        <input className="form-input" placeholder="House number and street name" value={addressForm.street_address} onChange={e => setAddressForm({ ...addressForm, street_address: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input className="form-input" value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} />
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div><label className="form-label">City</label><input className="form-input" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} /></div>
                                        <div>
                                            <label className="form-label">State</label>
                                            <select 
                                                className="form-input" 
                                                value={addressForm.state} 
                                                onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                                                style={{ appearance: 'auto' }}
                                            >
                                                <option value="">Select State</option>
                                                {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div><label className="form-label">Country</label><input className="form-input" value={addressForm.country} onChange={e => setAddressForm({ ...addressForm, country: e.target.value })} /></div>
                                        <div><label className="form-label">Postal Code</label><input className="form-input" value={addressForm.postal_code} onChange={e => setAddressForm({ ...addressForm, postal_code: e.target.value })} /></div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                        <input type="checkbox" id="is_default" checked={addressForm.is_default} onChange={e => setAddressForm({ ...addressForm, is_default: e.target.checked })} />
                                        <label htmlFor="is_default" style={{ fontSize: '13px', fontWeight: 600 }}>Set as default address</label>
                                    </div>
                                    <button 
                                        disabled={submitting}
                                        onClick={handleAddAddress} 
                                        style={{ width: '100%', padding: '14px', background: submitting ? '#94a3b8' : 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, marginTop: '10px', cursor: submitting ? 'not-allowed' : 'pointer' }}
                                    >
                                        {submitting ? 'Processing...' : 'Add Address'}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {addresses.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No addresses saved yet.</p>}
                                    {addresses.map(a => (
                                        <div key={a.id} className="card" style={{ padding: '20px', border: a.is_default ? '2px solid var(--primary)' : '1px solid #eef1f4', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>📍 {a.label}</h3>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    {a.is_default && <span style={{ fontSize: '10px', fontWeight: 800, background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>DEFAULT</span>}
                                                    <button 
                                                        disabled={submitting}
                                                        onClick={() => handleDeleteAddress(a.id)} 
                                                        style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '12px', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1 }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569', margin: 0 }}>{a.full_name}<br/>{a.street_address}<br/>{a.city}, {a.state} {a.postal_code}<br/>{a.phone}</p>
                                            {!a.is_default && (
                                                <button 
                                                    disabled={submitting}
                                                    onClick={() => handleSetDefaultAddress(a.id)} 
                                                    style={{ marginTop: '12px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', background: 'none', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1 }}
                                                >
                                                    {submitting ? 'Setting...' : 'Set as Default'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={() => setShowAddressForm(true)} style={{ width: '100%', padding: '24px', border: '2px dashed #eef1f4', borderRadius: '12px', background: 'transparent', color: '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>+ Add Address</button>
                                </>
                            )}
                        </div>
                    )}

                    {/* SECURITY TAB */}
                    {is('Security') && (
                        <div className="fade-in card" style={{ padding: '24px', maxWidth: '500px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <button 
                                    onClick={() => setShowPasswords(!showPasswords)} 
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    {showPasswords ? '🙈 Hide Passwords' : '👁 Show Passwords'}
                                </button>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Current Password</label>
                                <input 
                                    type={showPasswords ? "text" : "password"} 
                                    className="form-input" 
                                    placeholder="••••••••" 
                                    value={securityForm.old_password}
                                    onChange={e => setSecurityForm({ ...securityForm, old_password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input 
                                    type={showPasswords ? "text" : "password"} 
                                    className="form-input" 
                                    placeholder="••••••••" 
                                    value={securityForm.new_password}
                                    onChange={e => setSecurityForm({ ...securityForm, new_password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input 
                                    type={showPasswords ? "text" : "password"} 
                                    className="form-input" 
                                    placeholder="••••••••" 
                                    value={securityForm.confirm_password}
                                    onChange={e => setSecurityForm({ ...securityForm, confirm_password: e.target.value })}
                                />
                            </div>
                            <button 
                                onClick={handleUpdatePassword}
                                disabled={submitting}
                                style={{ width: '100%', padding: '14px', background: submitting ? '#94a3b8' : 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, marginTop: '10px', cursor: submitting ? 'not-allowed' : 'pointer' }}
                            >
                                {submitting ? 'Syncing Secure Terminal...' : 'Update Password'}
                            </button>
                        </div>
                    )}

                    {/* PROFILE TAB */}
                    {is('Profile') && (
                        <div className="fade-in">
                            <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px' }}>Personal Information</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div><label className="form-label">FIRST NAME</label><input className="form-input" value={profileForm.first_name || ''} onChange={e => setProfileForm({ ...profileForm, first_name: e.target.value })} /></div>
                                    <div><label className="form-label">LAST NAME</label><input className="form-input" value={profileForm.last_name || ''} onChange={e => setProfileForm({ ...profileForm, last_name: e.target.value })} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div><label className="form-label">EMAIL (READ-ONLY)</label><input className="form-input" value={profileForm.email || ''} readOnly style={{ background: '#f8fafc' }} /></div>
                                    <div><label className="form-label">PHONE</label><input className="form-input" value={profileForm.phone || ''} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <label className="form-label">GENDER</label>
                                        <select className="form-input" value={profileForm.gender || ''} onChange={e => setProfileForm({ ...profileForm, gender: e.target.value as any })}>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="NON_BINARY">Non-binary</option>
                                            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                                        </select>
                                    </div>
                                    <div><label className="form-label">DATE OF BIRTH</label><input type="date" className="form-input" value={profileForm.date_of_birth || ''} onChange={e => setProfileForm({ ...profileForm, date_of_birth: e.target.value })} /></div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">BIO</label>
                                    <textarea className="form-input" style={{ minHeight: '100px' }} value={profileForm.bio || ''} onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })} />
                                </div>
                                <button 
                                    onClick={handleUpdateProfile} 
                                    disabled={submitting}
                                    style={{ padding: '14px 30px', background: submitting ? '#94a3b8' : 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, width: '100%', cursor: submitting ? 'not-allowed' : 'pointer' }}
                                >
                                    {submitting ? 'Saving Profile...' : 'Update Profile'}
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}