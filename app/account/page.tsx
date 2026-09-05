'use client';
import { useState, useEffect } from 'react';
import { getProfile, updateProfile, getAddresses, getMyOrders, createAddress, deleteAddress, setDefaultAddress, changeAccountPassword, getTwoFactorStatus, toggleTwoFactor, getNotifications, markNotificationRead, markAllNotificationsRead } from '@/services/accountService';
import { getWallet, getTransactions, initiateFunding, verifyFunding } from '@/services/walletService';
import { getMyCode, getReferralStats, getReferralHistory, claimReferral } from '@/services/referralService';
import { UserProfile, Address, Order, AppNotification, Wallet, Transaction, ReferralStats, ReferralHistory, ReferralCode } from '@/services/types';
import { useToast } from '@/components/ui/Toast';
import { tokenStorage } from '@/services/axiosInstance';

const NIGERIAN_STATES = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];

export default function AccountPage() {
    const { success, error: toastError } = useToast();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    
    // API Data State
    const [user, setUser] = useState<UserProfile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [togglingTwoFactor, setTogglingTwoFactor] = useState(false);

    // New API Data State
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
    const [referralHistory, setReferralHistory] = useState<ReferralHistory[]>([]);
    const [referralCode, setReferralCode] = useState<ReferralCode | null>(null);

    // New Form States
    const [fundAmount, setFundAmount] = useState('');
    const [claimCode, setClaimCode] = useState('');

    // Form states
    const [profileForm, setProfileForm] = useState<Partial<UserProfile>>({});
    const [addressForm, setAddressForm] = useState({ label: '', full_name: '', street_address: '', city: '', state: '', country: 'Nigeria', postal_code: '', phone: '', is_default: false });
    const [securityForm, setSecurityForm] = useState({ old_password: '', new_password: '', confirm_password: '' });

    // Sync with URL for direct links
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const section = params.get('section');
        if (section) setActiveSection(section);
        else setActiveSection('Overview'); // Default on desktop, or null on mobile to show list
        
        const fetchData = async () => {
            setLoading(true);
            try {
                if (tokenStorage.getAccessToken()) {
                    const [p, a, o, notifs, wal, txs, refStats, refHist, refCode, twoFa] = await Promise.all([
                        getProfile(),
                        getAddresses(),
                        getMyOrders(),
                        getNotifications(),
                        getWallet().catch(() => null), // If wallet doesn't exist yet
                        getTransactions().catch(() => []),
                        getReferralStats().catch(() => null),
                        getReferralHistory().catch(() => []),
                        getMyCode().catch(() => null),
                        getTwoFactorStatus().catch(() => ({ two_factor_enabled: false }))
                    ]);
                    setUser(p);
                    setProfileForm(p);
                    setAddresses(a);
                    setOrders(o.results || []);
                    setNotifications(notifs.results || []);
                    setWallet(wal);
                    setTransactions(txs);
                    setReferralStats(refStats);
                    setReferralHistory(refHist);
                    setReferralCode(refCode);
                    setTwoFactorEnabled(twoFa?.two_factor_enabled || false);
                } else {
                    window.location.href = '/login';
                }
            } catch (err) {
                console.error("Failed to fetch account data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Layout check (rudimentary for inline styling)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNavigate = (target: string) => {
        setActiveSection(target);
        setViewingOrder(null);
        setShowAddressForm(false);
        const url = new URL(window.location.href);
        url.searchParams.set('section', target);
        window.history.pushState({}, '', url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        if (viewingOrder) {
            setViewingOrder(null);
        } else {
            setActiveSection(null);
            const url = new URL(window.location.href);
            url.searchParams.delete('section');
            window.history.pushState({}, '', url);
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to log out?")) {
            tokenStorage.clearTokens();
            window.location.href = '/';
        }
    };

    // --- Action Handlers --- //
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

    const handleToggleTwoFactor = async () => {
        try {
            setTogglingTwoFactor(true);
            const newState = !twoFactorEnabled;
            const result = await toggleTwoFactor(newState);
            setTwoFactorEnabled(result.two_factor_enabled ?? newState);
            success(result.detail || (result.two_factor_enabled ? 'Two-factor authentication enabled!' : 'Two-factor authentication disabled.'));
        } catch (err: any) {
            toastError(err.detail || err.message || 'Failed to toggle two-factor authentication.');
        } finally {
            setTogglingTwoFactor(false);
        }
    };
    const handleFundWallet = async () => {
        if (!fundAmount || isNaN(Number(fundAmount)) || Number(fundAmount) <= 0) {
            toastError("Please enter a valid amount");
            return;
        }
        setSubmitting(true);
        try {
            const res = await initiateFunding(Number(fundAmount));
            if (res?.payment_url) {
                // Redirect immediately — don't setSubmitting(false) to avoid UI flash
                window.location.href = res.payment_url;
                return;
            }
            toastError("Failed to get payment URL.");
        } catch (err: any) {
            toastError(err.response?.data?.message || "Error initiating funding");
        }
        setSubmitting(false);
    };

    const handleClaimReferral = async () => {
        if (!claimCode) {
            toastError("Please enter a referral code");
            return;
        }
        try {
            setSubmitting(true);
            await claimReferral(claimCode);
            success("Referral claimed successfully!");
            setClaimCode('');
            // Refresh stats
            const stats = await getReferralStats();
            setReferralStats(stats);
        } catch (err: any) {
            toastError(err.response?.data?.message || "Failed to claim referral code");
        } finally {
            setSubmitting(false);
        }
    };

    const handleMarkNotificationRead = async (id: number) => {
        try {
            await markNotificationRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (err) {
            toastError("Failed to mark notification as read");
        }
    };

    const handleMarkAllNotificationsRead = async () => {
        try {
            await markAllNotificationsRead();
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
            success("All notifications marked as read");
        } catch (err) {
            toastError("Failed to mark all as read");
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F8F9FA' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    // Define menu items mapped to mobile style
    const menuGroups: { title: string; items: { id: string; icon: string; label: string; desc?: string; badge?: number }[] }[] = [
        {
            title: "My Activity",
            items: [
                { id: 'Overview', icon: '👤', label: 'Overview' },
                { id: 'Orders', icon: '📦', label: 'My Orders', badge: orders.length > 0 ? orders.length : undefined },
            ]
        },
        {
            title: "Financials",
            items: [
                { id: 'Wallet', icon: '💳', label: 'Wallet & Points', desc: 'Manage your balance' },
                { id: 'Referral', icon: '🎁', label: 'Refer & Earn', desc: 'Invite friends' },
            ]
        },
        {
            title: "Settings",
            items: [
                { id: 'Profile', icon: '⚙️', label: 'Personal Information' },
                { id: 'Addresses', icon: '📍', label: 'Saved Addresses', badge: addresses.length > 0 ? addresses.length : undefined },
                { id: 'Security', icon: '🔒', label: 'Security & Password' },
                { id: 'Notifications', icon: '🔔', label: 'Notifications', badge: notifications.filter(n => !n.is_read).length > 0 ? notifications.filter(n => !n.is_read).length : undefined },
            ]
        }
    ];


    const renderSidebarContent = () => (
        <div className="account-sidebar">
            <div className="profile-header">
                <div className="avatar">{user?.first_name?.[0] || 'U'}</div>
                <div className="profile-info">
                    <h3>{user?.first_name} {user?.last_name}</h3>
                    <p>{user?.email}</p>
                </div>
            </div>

            <div className="menu-groups">
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx} className="menu-group">
                        <div className="menu-group-title">{group.title}</div>
                        {group.items.map(item => (
                            <button 
                                key={item.id} 
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleNavigate(item.id)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <div className="menu-text">
                                    <span className="menu-label">{item.label}</span>
                                    {item.desc && <span className="menu-desc">{item.desc}</span>}
                                </div>
                                {item.badge ? <span className="menu-badge">{item.badge}</span> : null}
                                <span className="menu-arrow">›</span>
                            </button>
                        ))}
                    </div>
                ))}

                <div className="menu-group" style={{ marginTop: '30px' }}>
                    <button className="menu-item text-danger" onClick={handleLogout}>
                        <span className="menu-icon">🚪</span>
                        <div className="menu-text"><span className="menu-label">Log Out</span></div>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        return (
            <div className="content-area fade-in">
                {(isMobile || viewingOrder) && (
                    <div className="mobile-header">
                        <button className="back-btn" onClick={handleBack}>← Back</button>
                        <h2>{viewingOrder ? `Order ${viewingOrder.id}` : activeSection}</h2>
                    </div>
                )}
                {!isMobile && !viewingOrder && (
                    <div className="desktop-header">
                        <h2>{activeSection}</h2>
                    </div>
                )}

                {/* OVERVIEW SECTION */}
                {activeSection === 'Overview' && !viewingOrder && (
                    <div className="section-content">
                        <div className="card stat-card">
                            <div className="stat-row">
                                <div className="stat-col" onClick={() => handleNavigate('Orders')}>
                                    <span className="stat-icon">📦</span>
                                    <span className="stat-val">{orders.length}</span>
                                    <span className="stat-label">Total Orders</span>
                                </div>
                                <div className="stat-col" onClick={() => handleNavigate('Wallet')}>
                                    <span className="stat-icon">💳</span>
                                    <span className="stat-val">₦{wallet ? parseFloat(wallet.balance).toLocaleString() : '0.00'}</span>
                                    <span className="stat-label">Wallet Bal</span>
                                </div>
                                <div className="stat-col" onClick={() => handleNavigate('Referral')}>
                                    <span className="stat-icon">🎁</span>
                                    <span className="stat-val">{referralStats ? referralStats.total_referrals : 0}</span>
                                    <span className="stat-label">Referrals</span>
                                </div>
                            </div>
                        </div>

                        <div className="recent-orders-preview">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Recent Orders</h3>
                                <button onClick={() => handleNavigate('Orders')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>See All</button>
                            </div>
                            {orders.slice(0, 3).map(o => (
                                <div key={o.id} className="card small-order-card" onClick={() => setViewingOrder(o)}>
                                    <div className="soc-left">
                                        <div className="soc-icon">📦</div>
                                        <div>
                                            <p className="soc-title">ORD-{o.id}</p>
                                            <p className="soc-date">{new Date(o.order_date || o.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="soc-right">
                                        <p className="soc-price">₦{parseFloat(o.total_amount).toLocaleString()}</p>
                                        <span className={`status-badge ${o.status.toLowerCase()}`}>{o.status_display || o.status}</span>
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No recent orders.</p>}
                        </div>
                    </div>
                )}

                {/* ORDERS SECTION */}
                {activeSection === 'Orders' && !viewingOrder && (
                    <div className="section-content">
                        {orders.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No orders found.</p>}
                        {orders.map(o => (
                            <div key={o.id} className="card order-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <p style={{ fontWeight: 800, color: 'var(--primary)' }}>ORD-{o.id}</p>
                                    <span className={`status-badge ${o.status.toLowerCase()}`}>{o.status_display || o.status}</span>
                                </div>
                                <p style={{ fontSize: '14px', fontWeight: 600 }}>📦 {o.items?.[0]?.product_name || o.items?.[0]?.service_name || o.items?.[0]?.name || 'Item'} {o.items?.length > 1 ? `+ ${o.items.length - 1} other` : ''}</p>
                                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Placed on: {new Date(o.order_date || o.created_at).toLocaleDateString()}</p>
                                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontSize: '18px', fontWeight: 800 }}>₦{parseFloat(o.total_amount).toLocaleString()}</p>
                                    <button onClick={() => setViewingOrder(o)} className="btn-outline">Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ORDER DETAILS VIEW */}
                {viewingOrder && (
                    <div className="section-content">
                        <div className="card order-details-card">
                            <div style={{ borderBottom: '1px solid #eef1f4', paddingBottom: '16px', marginBottom: '16px' }}>
                                <p className="label-sm">ORDER STATUS</p>
                                <h3 style={{ margin: 0, color: 'var(--primary)' }}>{viewingOrder.status_display}</h3>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <p className="label-sm">DELIVERY ADDRESS</p>
                                <p style={{ fontSize: '14px', color: '#475569', margin: '4px 0 0' }}>{viewingOrder.address || 'No address provided'}</p>
                                {viewingOrder.city && <p style={{ fontSize: '14px', color: '#475569', margin: '2px 0 0' }}>{viewingOrder.city}, {viewingOrder.state}</p>}
                            </div>
                            <p className="label-sm" style={{ marginBottom: '12px' }}>ITEMS IN THIS ORDER</p>
                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
                                {viewingOrder.items?.map((item: any, idx: number) => (
                                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: idx < viewingOrder.items.length - 1 ? '12px' : 0 }}>
                                        <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>📦</div>
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Qty: {item.quantity} × ₦{parseFloat(item.price).toLocaleString()}</p>
                                        </div>
                                        <p style={{ marginLeft: 'auto', fontWeight: 800, flexShrink: 0 }}>₦{(parseFloat(item.price) * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eef1f4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 800 }}>Total Paid</p>
                                <p style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>₦{parseFloat(viewingOrder.total_amount).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* WALLET SECTION */}
                {activeSection === 'Wallet' && (
                    <div className="section-content">
                        <div className="card wallet-card" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a80000 100%)', color: 'white', border: 'none' }}>
                            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Available Balance</p>
                            <h2 style={{ fontSize: '36px', fontWeight: 800, margin: '10px 0' }}>₦{wallet ? parseFloat(wallet.balance).toLocaleString() : '0.00'}</h2>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' }}>
                                <input 
                                    type="number" 
                                    placeholder="Amount" 
                                    value={fundAmount} 
                                    onChange={e => setFundAmount(e.target.value)} 
                                    style={{ padding: '10px', borderRadius: '8px', border: 'none', width: '120px', outline: 'none' }} 
                                />
                                <button className="btn-light" onClick={handleFundWallet} disabled={submitting}>
                                    {submitting ? '...' : 'Fund Wallet'}
                                </button>
                                <button className="btn-outline-light">Withdraw</button>
                            </div>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '24px 0 16px' }}>Transaction History</h3>
                        <div className="card">
                            {transactions.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', margin: 0 }}>No transactions yet.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {transactions.map(tx => (
                                        <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #eef1f4' }}>
                                            <div>
                                                <p style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>{tx.description}</p>
                                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>{new Date(tx.created_at).toLocaleString()}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontWeight: 800, margin: '0 0 4px', fontSize: '15px', color: tx.direction === 'CREDIT' ? '#16a34a' : '#1e293b' }}>
                                                    {tx.direction === 'CREDIT' ? '+' : '-'}₦{Math.abs(parseFloat(tx.amount)).toLocaleString()}
                                                </p>
                                                <span className={`status-badge ${tx.status.toLowerCase()}`}>{tx.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* REFERRAL SECTION */}
                {activeSection === 'Referral' && (
                    <div className="section-content">
                        <div className="card text-center" style={{ padding: '40px 20px' }}>
                            <div style={{ fontSize: '60px', marginBottom: '16px' }}>🎁</div>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px' }}>Refer & Earn</h2>
                            <p style={{ color: '#475569', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>Invite your friends to Jefado and earn ₦{referralStats ? parseFloat(referralStats.reward_per_referral).toLocaleString() : '500'} wallet bonus for every successful referral.</p>
                            
                            <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '400px', margin: '0 auto' }}>
                                <span style={{ fontWeight: 800, letterSpacing: '1px' }}>{referralCode ? referralCode.code : 'Loading...'}</span>
                                <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { if(referralCode) { navigator.clipboard.writeText(referralCode.code); success('Code copied!'); } }}>Copy Code</button>
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                <input 
                                    type="text" 
                                    placeholder="Got a referral code?" 
                                    value={claimCode} 
                                    onChange={e => setClaimCode(e.target.value)} 
                                    className="form-input" 
                                    style={{ width: '200px' }} 
                                />
                                <button className="btn-primary" style={{ width: 'auto' }} onClick={handleClaimReferral} disabled={submitting}>
                                    {submitting ? '...' : 'Claim'}
                                </button>
                            </div>

                            {referralStats && (
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', borderTop: '1px solid #eef1f4', paddingTop: '20px' }}>
                                    <div>
                                        <p style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>{referralStats.total_referrals}</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Total Referrals</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>{referralStats.successful_referrals}</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Successful</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>₦{parseFloat(referralStats.total_earned).toLocaleString()}</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Total Earned</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {referralHistory.length > 0 && (
                            <div className="card" style={{ marginTop: '20px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px' }}>Referral History</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {referralHistory.map(history => (
                                        <div key={history.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #eef1f4' }}>
                                            <div>
                                                <p style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>{history.referrer_email}</p>
                                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>{new Date(history.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`status-badge ${history.status.toLowerCase()}`}>{history.status_display}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PROFILE SECTION */}
                {activeSection === 'Profile' && (
                    <div className="section-content">
                        <div className="card">
                            <div className="form-group">
                                <label className="form-label">FIRST NAME</label>
                                <input className="form-input" value={profileForm.first_name || ''} onChange={e => setProfileForm({ ...profileForm, first_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LAST NAME</label>
                                <input className="form-input" value={profileForm.last_name || ''} onChange={e => setProfileForm({ ...profileForm, last_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">EMAIL (READ-ONLY)</label>
                                <input className="form-input" value={profileForm.email || ''} readOnly style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">PHONE</label>
                                <input className="form-input" value={profileForm.phone || ''} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">GENDER</label>
                                <select className="form-input" value={profileForm.gender || ''} onChange={e => setProfileForm({ ...profileForm, gender: e.target.value as any })}>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="NON_BINARY">Non-binary</option>
                                    <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">DATE OF BIRTH</label>
                                <input type="date" className="form-input" value={profileForm.date_of_birth || ''} onChange={e => setProfileForm({ ...profileForm, date_of_birth: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">BIO</label>
                                <textarea className="form-input" style={{ minHeight: '100px' }} value={profileForm.bio || ''} onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })} />
                            </div>
                            <button className="btn-primary" onClick={handleUpdateProfile} disabled={submitting}>
                                {submitting ? 'Saving Profile...' : 'Update Profile'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ADDRESSES SECTION */}
                {activeSection === 'Addresses' && (
                    <div className="section-content">
                        {showAddressForm ? (
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Add New Address</h3>
                                    <button onClick={() => setShowAddressForm(false)} className="btn-close">✕</button>
                                </div>
                                <div className="form-group"><label className="form-label">Address Label</label><input className="form-input" placeholder="e.g. Office, Home" value={addressForm.label} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={addressForm.full_name} onChange={e => setAddressForm({ ...addressForm, full_name: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Street Address</label><input className="form-input" value={addressForm.street_address} onChange={e => setAddressForm({ ...addressForm, street_address: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label">City</label><input className="form-input" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} /></div>
                                <div className="form-group">
                                    <label className="form-label">State</label>
                                    <select className="form-input" value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}>
                                        <option value="">Select State</option>
                                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label className="form-label">Postal Code</label><input className="form-input" value={addressForm.postal_code} onChange={e => setAddressForm({ ...addressForm, postal_code: e.target.value })} /></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <input type="checkbox" id="is_default" checked={addressForm.is_default} onChange={e => setAddressForm({ ...addressForm, is_default: e.target.checked })} style={{ accentColor: 'var(--primary)' }}/>
                                    <label htmlFor="is_default" style={{ fontSize: '14px', fontWeight: 600 }}>Set as default address</label>
                                </div>
                                <button className="btn-primary" onClick={handleAddAddress} disabled={submitting}>
                                    {submitting ? 'Processing...' : 'Add Address'}
                                </button>
                            </div>
                        ) : (
                            <>
                                {addresses.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No addresses saved yet.</p>}
                                {addresses.map(a => (
                                    <div key={a.id} className="card" style={{ border: a.is_default ? '2px solid var(--primary)' : '1px solid #eef1f4', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>📍 {a.label}</h3>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {a.is_default && <span className="status-badge processing" style={{ background: 'var(--primary)', color: 'white' }}>DEFAULT</span>}
                                                <button onClick={() => handleDeleteAddress(a.id)} className="text-danger" style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569', margin: 0 }}>{a.full_name}<br/>{a.street_address}<br/>{a.city}, {a.state} {a.postal_code}<br/>{a.phone}</p>
                                        {!a.is_default && (
                                            <button onClick={() => handleSetDefaultAddress(a.id)} style={{ marginTop: '12px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                Set as Default
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => setShowAddressForm(true)} className="btn-dashed">+ Add Address</button>
                            </>
                        )}
                    </div>
                )}

                {/* SECURITY SECTION */}
                {activeSection === 'Security' && (
                    <div className="section-content">
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <button onClick={() => setShowPasswords(!showPasswords)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                                    {showPasswords ? '🙈 Hide' : '👁 Show'} Passwords
                                </button>
                            </div>
                            <div className="form-group"><label className="form-label">Current Password</label><input type={showPasswords ? "text" : "password"} className="form-input" value={securityForm.old_password} onChange={e => setSecurityForm({ ...securityForm, old_password: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">New Password</label><input type={showPasswords ? "text" : "password"} className="form-input" value={securityForm.new_password} onChange={e => setSecurityForm({ ...securityForm, new_password: e.target.value })} /></div>
                            <div className="form-group"><label className="form-label">Confirm New Password</label><input type={showPasswords ? "text" : "password"} className="form-input" value={securityForm.confirm_password} onChange={e => setSecurityForm({ ...securityForm, confirm_password: e.target.value })} /></div>
                            <button className="btn-primary" onClick={handleUpdatePassword} disabled={submitting}>{submitting ? 'Updating...' : 'Update Password'}</button>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="card" style={{ marginTop: '20px' }}>
                            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800 }}>🔐 Two-Factor Authentication</h3>
                            <p style={{ color: '#94a3b8', margin: '0 0 20px', fontSize: '13px', lineHeight: 1.6 }}>
                                Add an extra layer of security to your account. When enabled, you'll need to enter a verification code sent to your email each time you log in.
                            </p>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '16px 20px',
                                background: twoFactorEnabled ? 'rgba(22,163,74,0.04)' : '#f8fafc',
                                border: `1.5px solid ${twoFactorEnabled ? 'rgba(22,163,74,0.2)' : '#eef1f4'}`,
                                borderRadius: '12px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '10px',
                                        background: twoFactorEnabled ? 'rgba(22,163,74,0.1)' : '#eef1f4',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '20px', transition: 'all 0.3s ease'
                                    }}>
                                        {twoFactorEnabled ? '✅' : '🔒'}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 700, margin: '0 0 2px', fontSize: '14px', color: '#1e293b' }}>
                                            Email Verification Code
                                        </p>
                                        <p style={{ color: twoFactorEnabled ? '#16a34a' : '#94a3b8', margin: 0, fontSize: '12px', fontWeight: 600 }}>
                                            {twoFactorEnabled ? 'Enabled — your account is protected' : 'Disabled — turn on for extra security'}
                                        </p>
                                    </div>
                                </div>
                                <label className="switch" style={{ opacity: togglingTwoFactor ? 0.5 : 1, pointerEvents: togglingTwoFactor ? 'none' : 'auto' }}>
                                    <input type="checkbox" checked={twoFactorEnabled} onChange={handleToggleTwoFactor} disabled={togglingTwoFactor} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* NOTIFICATIONS SECTION */}
                {activeSection === 'Notifications' && (
                    <div className="section-content">
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Notifications</h3>
                                {notifications.length > 0 && notifications.some(n => !n.is_read) && (
                                    <button 
                                        onClick={handleMarkAllNotificationsRead} 
                                        disabled={submitting}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        {submitting ? 'Processing...' : 'Mark all as read'}
                                    </button>
                                )}
                            </div>
                            
                            {notifications.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', margin: 0 }}>No notifications yet.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {notifications.map(notification => (
                                        <div 
                                            key={notification.id} 
                                            style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'flex-start', 
                                                padding: '16px', 
                                                borderRadius: '12px',
                                                background: notification.is_read ? '#f8fafc' : 'rgba(238,18,23,0.04)',
                                                border: `1px solid ${notification.is_read ? '#eef1f4' : 'rgba(238,18,23,0.1)'}` 
                                            }}
                                            onClick={() => {
                                                if (!notification.is_read) {
                                                    handleMarkNotificationRead(notification.id);
                                                }
                                            }}
                                        >
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                    {!notification.is_read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>}
                                                    <p style={{ fontWeight: 800, margin: 0, fontSize: '15px', color: '#1e293b' }}>{notification.title}</p>
                                                </div>
                                                <p style={{ color: '#475569', margin: '0 0 8px', fontSize: '14px', lineHeight: 1.5 }}>{notification.message}</p>
                                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px', fontWeight: 600 }}>{new Date(notification.created_at).toLocaleString()}</p>
                                            </div>
                                            {!notification.is_read && (
                                                <button 
                                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 700, padding: '4px' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkNotificationRead(notification.id);
                                                    }}
                                                >
                                                    Mark Read
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
            <style>{`
                .account-layout { max-width: 1200px; margin: 0 auto; padding: 40px 16px 100px; display: grid; grid-template-columns: 300px 1fr; gap: 32px; }
                
                /* Cards & Globals */
                .card { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #eef1f4; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
                .label-sm { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px; }
                
                /* Sidebar Styling */
                .account-sidebar { background: #fff; border-radius: 16px; border: 1px solid #eef1f4; overflow: hidden; padding-bottom: 16px; }
                .profile-header { display: flex; align-items: center; gap: 16px; padding: 24px; border-bottom: 1px solid #eef1f4; }
                .avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; }
                .profile-info h3 { margin: 0 0 4px; font-size: 18px; font-weight: 800; }
                .profile-info p { margin: 0; font-size: 13px; color: #94a3b8; }
                
                .menu-groups { padding: 16px; }
                .menu-group-title { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin: 20px 0 10px 12px; }
                .menu-item { width: 100%; display: flex; align-items: center; padding: 14px 12px; background: transparent; border: none; border-radius: 12px; cursor: pointer; text-align: left; transition: 0.2s; }
                .menu-item:hover { background: #f8fafc; }
                .menu-item.active { background: #fef2f2; color: var(--primary); }
                .menu-icon { font-size: 20px; width: 32px; text-align: center; margin-right: 12px; }
                .menu-text { flex: 1; display: flex; flex-direction: column; }
                .menu-label { font-size: 14px; font-weight: 700; color: #1e293b; }
                .menu-item.active .menu-label { color: var(--primary); }
                .menu-desc { font-size: 12px; color: #94a3b8; margin-top: 2px; }
                .menu-badge { background: var(--primary); color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 20px; margin-right: 8px; }
                .menu-arrow { color: #cbd5e1; font-weight: 800; font-size: 18px; }
                .text-danger .menu-label { color: var(--danger); }
                
                /* Content Area */
                .content-area { min-width: 0; }
                .desktop-header h2 { font-size: 24px; font-weight: 800; margin: 0 0 24px; }
                
                /* Mobile Header */
                .mobile-header { display: flex; align-items: center; gap: 16px; padding: 16px; background: #fff; border-bottom: 1px solid #eef1f4; position: sticky; top: 0; z-index: 10; margin: -16px -16px 20px; }
                .mobile-header h2 { margin: 0; font-size: 18px; font-weight: 800; }
                .back-btn { background: none; border: none; font-size: 14px; font-weight: 700; color: var(--primary); cursor: pointer; padding: 0; }
                
                /* Animations */
                .fade-in { animation: fadeIn 0.3s ease both; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                
                /* Stats Row (Overview) */
                .stat-row { display: flex; gap: 12px; }
                .stat-col { flex: 1; text-align: center; padding: 16px 8px; background: #f8fafc; border-radius: 12px; cursor: pointer; transition: 0.2s; }
                .stat-col:hover { background: #f1f5f9; }
                .stat-icon { display: block; font-size: 24px; margin-bottom: 8px; }
                .stat-val { display: block; font-size: 18px; font-weight: 800; margin-bottom: 4px; }
                .stat-label { display: block; font-size: 12px; color: #64748b; font-weight: 600; }
                
                /* Small Order Card */
                .small-order-card { display: flex; justify-content: space-between; align-items: center; padding: 16px; margin-bottom: 12px; cursor: pointer; transition: 0.2s; }
                .small-order-card:hover { border-color: #cbd5e1; }
                .soc-left { display: flex; gap: 12px; align-items: center; }
                .soc-icon { width: 40px; height: 40px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
                .soc-title { font-weight: 800; font-size: 14px; margin: 0 0 4px; }
                .soc-date { font-size: 12px; color: #94a3b8; margin: 0; }
                .soc-right { text-align: right; }
                .soc-price { font-weight: 800; font-size: 15px; margin: 0 0 6px; }
                
                /* Order Details */
                .order-card { padding: 20px; margin-bottom: 16px; }
                .status-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
                .status-badge.pending { background: #fffbeb; color: #d97706; }
                .status-badge.processing { background: #eff6ff; color: #2563eb; }
                .status-badge.shipped { background: #f0fdf4; color: #16a34a; }
                .status-badge.completed { background: #f0fdf4; color: #16a34a; }
                .status-badge.cancelled { background: #fef2f2; color: #dc2626; }
                
                /* Forms & Buttons */
                .form-group { margin-bottom: 20px; }
                .form-label { display: block; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
                .form-input { width: 100%; padding: 14px; border-radius: 10px; border: 1px solid #eef1f4; font-family: inherit; font-size: 14px; background: #fff; transition: 0.2s; }
                .form-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(238,18,23,0.1); }
                
                .btn-primary { width: 100%; padding: 14px; background: var(--primary); color: #fff; border: none; border-radius: 10px; font-weight: 800; font-size: 15px; cursor: pointer; transition: 0.2s; }
                .btn-primary:hover:not(:disabled) { background: #d00f14; }
                .btn-primary:disabled { background: #cbd5e1; cursor: not-allowed; }
                
                .btn-outline { padding: 8px 16px; border: 1px solid #eef1f4; background: #fff; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; }
                .btn-outline:hover { background: #f8fafc; }
                
                .btn-dashed { width: 100%; padding: 20px; border: 2px dashed #cbd5e1; background: transparent; border-radius: 12px; color: #64748b; font-weight: 700; font-size: 15px; cursor: pointer; transition: 0.2s; }
                .btn-dashed:hover { border-color: var(--primary); color: var(--primary); }
                
                .btn-light { background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .btn-outline-light { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.4); padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }
                
                .btn-close { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; color: #64748b; font-weight: 700; cursor: pointer; }
                
                /* Switch */
                .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .4s; }
                .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
                input:checked + .slider { background-color: var(--primary); }
                input:checked + .slider:before { transform: translateX(20px); }
                .slider.round { border-radius: 24px; }
                .slider.round:before { border-radius: 50%; }

                /* Responsive */
                @media (max-width: 900px) {
                    .account-layout { grid-template-columns: 1fr; padding-top: 20px; gap: 0; }
                    .desktop-only { display: none !important; }
                    .mobile-only { display: block !important; }
                }
            `}</style>

            <div className="account-layout">
                {/* ── Sidebar (List View) ── */}
                {(!isMobile || !activeSection) && (
                    <div className="fade-in">
                        {renderSidebarContent()}
                    </div>
                )}

                {/* ── Content Area ── */}
                {(!isMobile || activeSection) && (
                    <div>
                        {renderContent()}
                    </div>
                )}
            </div>
        </div>
    );
}