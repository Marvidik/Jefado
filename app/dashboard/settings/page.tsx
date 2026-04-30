'use client';
import { useState, useEffect } from 'react';
import { Card, PageHeader, Btn, Input, Select, Drawer, Badge, Table } from '@/components/dashboard/ui';
import { useToast } from '@/components/ui/Toast';
import { Icons } from '@/components/dashboard/icons';
import { 
    getSellerProfile, 
    patchSellerProfile, 
    getBankAccounts, 
    createBankAccount, 
    deleteBankAccount, 
    getPayoutRequests, 
    createPayoutRequest,
    changeSellerPassword
} from '@/services/sellerService';
import { SellerProfile, BankAccount, PayoutRequest } from '@/services/types';

export default function SettingsPage() {
    const { success, error: toastError } = useToast();
    const [tab, setTab] = useState('Profile');
    const TABS = ['Profile', 'Store', 'Payouts', 'Security'];

    // Profile & Store Data
    const [profile, setProfile] = useState<SellerProfile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);

    // Payouts Data
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
    const [loadingPayouts, setLoadingPayouts] = useState(false);

    // Form states
    const [profileForm, setProfileForm] = useState({ store_name: '', description: '', location: '', rc_number: '', business_type: '', business_address: '' });
    const [passForm, setPassForm] = useState({ old_password: '', new_password: '', confirm_password: '' });
    const [bankDrawer, setBankDrawer] = useState(false);
    const [bankForm, setBankForm] = useState({ bank_name: '', account_name: '', account_number: '', is_default: true });
    
    const [payoutDrawer, setPayoutDrawer] = useState(false);
    const [payoutForm, setPayoutForm] = useState({ amount: '', bank_account: '' });

    const fetchData = async () => {
        setLoadingProfile(true);
        try {
            const data = await getSellerProfile();
            setProfile(data);
            setProfileForm({
                store_name: data.store_name || '',
                description: data.description || '',
                location: data.location || '',
                rc_number: data.rc_number || '',
                business_type: data.business_type || '',
                business_address: data.business_address || ''
            });
        } catch (err) {
            console.error('Failed to load profile:', err);
        } finally {
            setLoadingProfile(false);
        }
    };

    const fetchPayouts = async () => {
        setLoadingPayouts(true);
        try {
            const [banks, reqs] = await Promise.all([getBankAccounts(), getPayoutRequests()]);
            setBankAccounts(banks);
            setPayoutRequests(reqs);
        } catch (err) {
            console.error('Failed to load payouts:', err);
        } finally {
            setLoadingPayouts(false);
        }
    };

    useEffect(() => {
        fetchData();
        if (tab === 'Payouts') fetchPayouts();
    }, [tab]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await patchSellerProfile(profileForm);
            success('Profile updated successfully.');
            fetchData();
        } catch (err) {
            toastError('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passForm.new_password.length < 8) return toastError('New password must be at least 8 characters long');
        if (passForm.new_password !== passForm.confirm_password) return toastError('Passwords do not match');
        setSaving(true);
        try {
            await changeSellerPassword({
                old_password: passForm.old_password,
                new_password: passForm.new_password,
                confirm_password: passForm.confirm_password
            });
            success('Password updated successfully.');
            setPassForm({ old_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            toastError('Failed to update password.');
        } finally {
            setSaving(false);
        }
    };

    const handleAddBank = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createBankAccount(bankForm);
            setBankDrawer(false);
            fetchPayouts();
            success('Bank account added successfully.');
        } catch (err) {
            toastError('Failed to add bank account.');
        } finally {
            setSaving(false);
        }
    };

    const handleRequestPayout = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createPayoutRequest(payoutForm);
            setPayoutDrawer(false);
            fetchPayouts();
            success('Payout request sent successfully.');
        } catch (err) {
            toastError('Failed to request payout.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <style>{`
                .settings-layout { display: flex; gap: 24px; align-items: flex-start; }
                .settings-sidebar { width: 220px; flex-shrink: 0; position: sticky; top: 0; }
                .tab-btn { width: 100%; padding: 12px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; color: #64748b; background: transparent; border: none; cursor: pointer; text-align: left; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
                .tab-btn:hover { background: #f8fafc; color: #0f172a; }
                .tab-btn.active { background: #eff6ff; color: #2563eb; font-weight: 700; }
                .responsive-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                @media (max-width: 900px) {
                    .settings-layout { flex-direction: column; }
                    .settings-sidebar { width: 100%; position: static; }
                    .settings-sidebar-inner { display: flex; overflow-x: auto; padding-bottom: 8px; gap: 8px; }
                    .tab-btn { white-space: nowrap; width: auto; }
                }
            `}</style>

            <PageHeader title="Account Settings" subtitle="Manage your profile, store information, and security preferences." />
            
            <div className="settings-layout">
                <div className="settings-sidebar">
                    <Card style={{ padding: '8px' }} className="settings-sidebar-inner">
                        {TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? 'active' : ''}`}>
                                {t}
                            </button>
                        ))}
                    </Card>
                </div>

                <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
                    {tab === 'Profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <Card style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '28px', flexShrink: 0, boxShadow: '0 8px 16px rgba(37,99,235,0.2)' }}>
                                        {profile?.store_name?.[0] || 'M'}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>{profile?.store_name}</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px' }}>Verified Merchant Terminal · {profile?.location}</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div className="responsive-grid">
                                        <Input label="Business Location" value={profileForm.location} onChange={v => setProfileForm({...profileForm, location: v})} placeholder="City, Country" />
                                        <Input label="RC Registration Number" value={profileForm.rc_number} onChange={v => setProfileForm({...profileForm, rc_number: v})} placeholder="e.g. RC-000000" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Operational Bio</label>
                                        <textarea rows={4} value={profileForm.description} onChange={e => setProfileForm({...profileForm, description: e.target.value})} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: '14px', resize: 'vertical' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Btn label={saving ? "Saving Changes..." : "Commit Profile Changes"} submit disabled={saving} />
                                    </div>
                                </form>
                            </Card>
                        </div>
                    )}

                    {tab === 'Store' && (
                        <Card style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Store Front Configuration</h3>
                            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <Input label="Public Store Name" value={profileForm.store_name} onChange={v => setProfileForm({...profileForm, store_name: v})} required />
                                <div className="responsive-grid">
                                    <Select label="Entity Type" value={profileForm.business_type} onChange={v => setProfileForm({...profileForm, business_type: v})} options={['Individual', 'Registered Business', 'Limited Liability']} />
                                    <Input label="Registered Address" value={profileForm.business_address} onChange={v => setProfileForm({...profileForm, business_address: v})} placeholder="Official company address" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                                    <Btn label={saving ? "Serialising..." : "Update Storefront"} submit disabled={saving} />
                                </div>
                            </form>
                        </Card>
                    )}

                    {tab === 'Payouts' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <Card style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Payout Protocols</h3>
                                        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Manage your linked financial accounts.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <Btn label="Request Withdrawal" variant="secondary" onClick={() => setPayoutDrawer(true)} />
                                        <Btn label="Link Bank Account" onClick={() => setBankDrawer(true)} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {bankAccounts.map(acc => (
                                        <div key={acc.id} style={{ padding: '20px', border: '1.5px solid #e2e8f0', borderRadius: '16px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏦</div>
                                                <div>
                                                    <p style={{ fontWeight: 700, margin: 0 }}>{acc.bank_name}</p>
                                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{acc.account_name} · •••• {acc.account_number.slice(-4)}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                {acc.is_default && <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>Primary</span>}
                                                <button onClick={() => deleteBankAccount(acc.id).then(fetchPayouts)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '20px' }}>{Icons.trash}</button>
                                            </div>
                                        </div>
                                    ))}
                                    {bankAccounts.length === 0 && <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '16px' }}>No financial sources linked.</div>}
                                </div>

                                <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '40px', marginBottom: '20px' }}>Recent Payout Requests</h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <Table 
                                        cols={['Request ID', 'Amount', 'Status', 'Timestamp']} 
                                        rows={payoutRequests.map(r => [
                                            <span key="id" style={{ fontWeight: 600 }}>#{r.id}</span>,
                                            <span key="amt" style={{ fontWeight: 800, color: '#059669' }}>₦{(parseFloat(r.amount) || 0).toLocaleString()}</span>,
                                            <Badge key="st" status={r.status === 'SUCCESS' ? 'Completed' : r.status === 'PENDING' ? 'Processing' : 'Refunded'} label={r.status} />,
                                            <span key="ts" style={{ color: '#94a3b8', fontSize: '12px' }}>{r.created_at ? new Date(r.created_at).toLocaleDateString() : 'N/A'}</span>
                                        ])}
                                    />
                                </div>
                            </Card>
                        </div>
                    )}

                    {tab === 'Security' && (
                        <Card style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Password & Security</h3>
                            <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
                                <Input label="Current Password" type="password" required value={passForm.old_password} onChange={v => setPassForm({...passForm, old_password: v})} />
                                <Input label="New Password" type="password" required value={passForm.new_password} onChange={v => setPassForm({...passForm, new_password: v})} />
                                <Input label="Confirm New Password" type="password" required value={passForm.confirm_password} onChange={v => setPassForm({...passForm, confirm_password: v})} />
                                <div style={{ paddingTop: '8px' }}>
                                    <Btn label={saving ? "Updating..." : "Change Password"} submit disabled={saving || passForm.new_password.length < 8} />
                                    {passForm.new_password && passForm.new_password.length < 8 && (
                                        <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>Password must be at least 8 characters</p>
                                    )}
                                </div>
                            </form>
                        </Card>
                    )}
                </div>
            </div>

            {/* Link Bank Drawer */}
            <Drawer open={bankDrawer} onClose={() => setBankDrawer(false)} title="Link Financial Source">
                <form onSubmit={handleAddBank} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Authorise a secure terminal for your marketplace earnings disbursement.</p>
                    <Input label="Universal Bank Name" required value={bankForm.bank_name} onChange={v => setBankForm({...bankForm, bank_name: v})} placeholder="e.g. Zenith Bank" />
                    <Input label="Account Identity (Full Name)" required value={bankForm.account_name} onChange={v => setBankForm({...bankForm, account_name: v})} placeholder="e.g. James Okafor" />
                    <Input label="Account Number" required value={bankForm.account_number} onChange={v => setBankForm({...bankForm, account_number: v})} placeholder="10 Digits" />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={bankForm.is_default} onChange={e => setBankForm({...bankForm, is_default: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>Set as Primary Payout Protocol</span>
                    </label>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Btn label="Abort" variant="secondary" onClick={() => setBankDrawer(false)} />
                        <Btn label={saving ? "Syncing..." : "Link Account"} submit disabled={saving} />
                    </div>
                </form>
            </Drawer>

            {/* Payout Request Drawer */}
            <Drawer open={payoutDrawer} onClose={() => setPayoutDrawer(false)} title="Initiate Payout">
                <form onSubmit={handleRequestPayout} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Transfer accumulated terminal revenue to your primary bank account.</p>
                    <Select label="Destination Protocol" required value={payoutForm.bank_account} onChange={v => setPayoutForm({...payoutForm, bank_account: v})} options={bankAccounts.map(a => ({ label: `${a.bank_name} (••${a.account_number.slice(-4)})`, value: a.id.toString() }))} />
                    <Input label="Valuation to Withdraw (₦)" required type="text" value={payoutForm.amount} onChange={v => setPayoutForm({...payoutForm, amount: v})} placeholder="0.00" />
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Btn label="Abort" variant="secondary" onClick={() => setPayoutDrawer(false)} />
                        <Btn label={saving ? "Processing..." : "Initiate Withdrawal"} submit disabled={saving || !payoutForm.bank_account} />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}