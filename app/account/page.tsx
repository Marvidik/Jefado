'use client';
import { useState, useEffect } from 'react';

/* 
   ══════════════════════════════════════════
   MARKETPLACE DATA DEPOT
   ══════════════════════════════════════════ 
*/
const USER = { name: 'James Okafor', email: 'james.okafor@email.com', wallet: '₦12,500', points: '2,840' };

const ORDERS = [
    { id: 'JFD-83421', date: 'Mar 24, 2026', status: 'Delivered', total: 457.00, emoji: '🎧', items: 'Sony WH-1000XM5 + 1 other' },
    { id: 'JFD-79103', date: 'Mar 15, 2026', status: 'Shipped', total: 1199.00, emoji: '📱', items: 'Samsung Galaxy S25' },
    { id: 'JFD-71882', date: 'Feb 28, 2026', status: 'Processing', total: 259.00, emoji: '🔌', items: 'Anker Power Port 100W' },
];

const ADDRESSES = [
    { id: 1, label: 'Home Address', name: 'James Okafor', line: '24 Adeola Odeku St, Victoria Island, Lagos state', phone: '+234 801 234 5678' },
];

/* 
   ══════════════════════════════════════════
   MARKETPLACE DASHBOARD
   ══════════════════════════════════════════ 
*/

export default function AccountPage() {
    const [tab, setTab] = useState('Overview');
    const [viewingOrder, setViewingOrder] = useState<any>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);

    // SYNC WITH URL (Feels like real navigation)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('tab');
        if (t) setTab(t);
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

    const is = (t: string) => tab === t;

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
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>J</div>
                            <div><p style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{USER.name}</p><p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>My Account</p></div>
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

                    {/* Compact Section Info */}
                    <div className="card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {(tab !== 'Overview' || viewingOrder) && <button onClick={() => viewingOrder ? setViewingOrder(null) : handleNavigate('Overview')} style={{ background: '#f8fafc', border: '1px solid #eef1f4', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>←</button>}
                            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{viewingOrder ? `Order ${viewingOrder.id}` : tab}</h2>
                        </div>
                        <div style={{ background: '#fef2f2', padding: '6px 14px', borderRadius: '30px', border: '1px solid #fee2e2' }}>
                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px', margin: 0 }}>{USER.wallet}</p>
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
                                        <p style={{ fontSize: '11px', color: '#94a3b8' }}>Manage your {m.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {is('Orders') && !viewingOrder && (
                        <div className="fade-in">
                            {ORDERS.map(o => (
                                <div key={o.id} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <p style={{ fontWeight: 800, color: 'var(--primary)' }}>{o.id}</p>
                                        <span style={{ fontSize: '10px', fontWeight: 800, background: '#f0fdf4', color: '#10b981', padding: '3px 10px', borderRadius: '20px' }}>{o.status}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{o.emoji} {o.items}</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Placed on: {o.date}</p>
                                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 800 }}>₦{o.total.toFixed(2)}</p>
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
                                    <h3 style={{ margin: 0, color: '#10b981' }}>{viewingOrder.status}</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>DELIVERY ADDRESS</p>
                                        <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{USER.name}</p>
                                        <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>{ADDRESSES[0].line}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '6px' }}>PAYMENT METHOD</p>
                                        <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Wallet Balance</p>
                                        <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>Transaction ID: TXN-{viewingOrder.id}</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '12px' }}>ITEMS IN THIS ORDER</p>
                                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{viewingOrder.emoji}</div>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{viewingOrder.items}</p>
                                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Qty: 1</p>
                                        </div>
                                        <p style={{ marginLeft: 'auto', fontWeight: 800 }}>₦{viewingOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eef1f4', display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontWeight: 800 }}>Total Paid</p>
                                    <p style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>₦{viewingOrder.total.toFixed(2)}</p>
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
                                        <input className="form-input" placeholder="e.g. Office, Home 2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input className="form-input" defaultValue={USER.name} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Street Address</label>
                                        <input className="form-input" placeholder="House number and street name" />
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div><label className="form-label">City</label><input className="form-input" /></div>
                                        <div><label className="form-label">State</label><input className="form-input" /></div>
                                    </div>
                                    <button style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, marginTop: '10px' }}>Add Address</button>
                                </div>
                            ) : (
                                <>
                                    {ADDRESSES.map(a => (
                                        <div key={a.id} className="card" style={{ padding: '20px', border: '2px solid var(--primary)', marginBottom: '12px' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '10px' }}>📍 {a.label}</h3>
                                            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569' }}>{a.name}<br/>{a.line}<br/>{a.phone}</p>
                                            <button style={{ marginTop: '12px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', background: 'none', border: 'none' }}>Edit Details</button>
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
                            <div className="form-group">
                                <label className="form-label">Current Password</label>
                                <input type="password" sx-type="password" className="form-input" placeholder="••••••••" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input type="password" sx-type="password" className="form-input" placeholder="••••••••" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input type="password" sx-type="password" className="form-input" placeholder="••••••••" />
                            </div>
                            <button style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, marginTop: '10px' }}>Update Password</button>
                        </div>
                    )}

                    {/* PROFILE TAB */}
                    {is('Profile') && (
                        <div className="fade-in card" style={{ padding: '24px', maxWidth: '500px' }}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div><label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>FULL NAME</label><input defaultValue={USER.name} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eef1f4' }} /></div>
                                <div><label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>EMAIL</label><input defaultValue={USER.email} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eef1f4' }} /></div>
                                <button style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: 800, marginTop: '10px' }}>Save Changes</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}