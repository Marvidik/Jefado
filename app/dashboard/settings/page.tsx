'use client';
import { useState } from 'react';
import { Card, PageHeader, Btn, Input, Select, Drawer, Badge } from '@/components/dashboard/ui';

export default function SettingsPage() {
    const [tab, setTab] = useState('Payouts');
    const TABS = ['Profile', 'Store', 'Payouts', 'Security'];


    // Payout Form state
    const [payoutDrawer, setPayoutDrawer] = useState(false);
    const [payoutForm, setPayoutForm] = useState({ type: 'Bank Account (NG)', bankName: '', accountNumber: '', routingNumber: '', accountName: '' });

    // Request Payout state
    const [requestPayoutDrawer, setRequestPayoutDrawer] = useState(false);
    const [requestForm, setRequestForm] = useState({ accountId: '', amount: '' });

    const MOCK_ACCOUNTS = [
        { id: 'acc_8821', type: 'USD Balance', amount: '$5,420.50' },
        { id: 'acc_3392', type: 'NGN Balance', amount: '₦210,000.00' },
        { id: 'acc_1102', type: 'EUR Balance', amount: '€1,200.00' }
    ];


    const handleAddPayout = (e: React.FormEvent) => {
        e.preventDefault();
        setPayoutDrawer(false);
        setPayoutForm({ type: 'Bank Account (US)', bankName: '', accountNumber: '', routingNumber: '', accountName: '' });
    };
    const handleRequestPayout = (e: React.FormEvent) => {
        e.preventDefault();
        setRequestPayoutDrawer(false);
        setRequestForm({ accountId: '', amount: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <style>{`
                .settings-layout { display: flex; gap: 20px; align-items: flex-start; }
                .settings-sidebar { width: 200px; flex-shrink: 0; }
                .responsive-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
                @media (max-width: 768px) {
                    .settings-layout { flex-direction: column; }
                    .settings-sidebar { width: 100%; display: flex; overflow-x: auto; padding-bottom: 8px; }
                    .settings-sidebar button { white-space: nowrap; flex-shrink: 0; }
                }
            `}</style>

            <PageHeader title="Settings" subtitle="Account and store preferences" />
            <div className="settings-layout">
                <div className="settings-sidebar">
                    <Card style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', ...{ flexWrap: 'nowrap' } as any }}>
                        {TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: tab === t ? 700 : 400, color: tab === t ? 'var(--dash-primary)' : '#64748b', background: tab === t ? 'var(--dash-primary-light)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'left', transition: 'all 0.15s' }}>{t}</button>
                        ))}
                    </Card>
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                    {tab === 'Profile' && (
                        <Card>
                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>Profile Information</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '18px', background: '#f8fafc', borderRadius: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
                                <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--dash-primary),var(--dash-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '26px', flexShrink: 0 }}>J</div>
                                <div>
                                    <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '3px' }}>James Okafor</p>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '10px' }}>james@jefado.com · Pro Seller</p>
                                    <Btn label="Upload Photo" small />
                                </div>
                            </div>
                            <div className="responsive-grid" style={{ marginBottom: '14px' }}>
                                <Input label="First Name" value="James" onChange={() => { }} placeholder="First name" />
                                <Input label="Last Name" value="Okafor" onChange={() => { }} placeholder="Last name" />
                                <Input label="Email" value="james@jefado.com" onChange={() => { }} type="email" placeholder="Email" />
                                <Input label="Phone" value="+234 801 234 5678" onChange={() => { }} type="tel" placeholder="Phone" />
                            </div>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '5px' }}>Bio</label>
                                <textarea rows={3} defaultValue="Pro seller specializing in electronics and gadgets." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e8edf2', borderRadius: '8px', fontSize: '13px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} onFocus={e => (e.currentTarget.style.borderColor = 'var(--dash-primary)')} onBlur={e => (e.currentTarget.style.borderColor = '#e8edf2')} />
                            </div>
                            <Btn label="Save Changes" />
                        </Card>
                    )}
                    {tab === 'Store' && (
                        <Card>
                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>Store Settings</h3>
                            <div className="responsive-grid" style={{ marginBottom: '14px' }}>
                                <div style={{ gridColumn: '1 / -1' }}><Input label="Store Name" value="TechZone Store" onChange={() => { }} /></div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '5px' }}>Store Description</label>
                                    <textarea rows={3} defaultValue="Premium electronics and gadgets at the best prices." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e8edf2', borderRadius: '8px', fontSize: '13px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} />
                                </div>
                                <Select label="Category" value="Electronics" onChange={() => { }} options={['Electronics', 'Fashion', 'Home', 'Sports']} />
                                <Select label="Currency" value="USD ($)" onChange={() => { }} options={['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)']} />
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--dash-primary)', width: '15px', height: '15px' }} />
                                <span style={{ fontSize: '13px', color: '#475569' }}>Show store in marketplace directory</span>
                            </label>
                            <Btn label="Save Settings" />
                        </Card>
                    )}
                    {tab === 'Security' && (
                        <Card>
                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>Security Settings</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px', marginBottom: '24px' }}>
                                <Input label="Current Password" type="password" value="••••••••" onChange={() => { }} />
                                <Input label="New Password" type="password" value="" onChange={() => { }} placeholder="Min. 8 characters" />
                                <Input label="Confirm Password" type="password" value="" onChange={() => { }} placeholder="Repeat new password" />
                                <Btn label="Update Password" />
                            </div>

                        </Card>
                    )}
                    {tab === 'Payouts' && (
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', color: '#0f172a', margin: 0 }}>Payout Methods</h3>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Where we'll send your marketplace earnings.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <Btn label="Request for Payout" onClick={() => setRequestPayoutDrawer(true)} variant="secondary" small />
                                    <Btn label="Add Payout Method" onClick={() => setPayoutDrawer(true)} small />
                                </div>
                            </div>

                            <div style={{ padding: '20px', border: '1.5px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏦</div>
                                    <div>
                                        <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', color: '#0f172a', margin: '0 0 2px' }}>JPMorgan Chase Bank</p>
                                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Checking •••• 9821</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '8px' }}>Active Default</span>
                                    <button style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '14px', padding: '8px', display: 'flex', alignItems: 'center' }}>🗑️</button>
                                </div>
                            </div>

                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginTop: '32px', marginBottom: '16px' }}>Recent Payouts</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '400px' }}>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 16px 12px 0', color: '#0f172a', fontWeight: 600 }}>Withdrawal to Chase Bank</td>
                                            <td style={{ padding: '12px 16px', color: '#64748b' }}>Apr 4, 2026</td>
                                            <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 700 }}>+$1,245.50</td>
                                            <td style={{ padding: '12px 0', textAlign: 'right' }}><Badge status="Completed" /></td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 16px 12px 0', color: '#0f172a', fontWeight: 600 }}>Withdrawal to Chase Bank</td>
                                            <td style={{ padding: '12px 16px', color: '#64748b' }}>Mar 20, 2026</td>
                                            <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 700 }}>+$860.00</td>
                                            <td style={{ padding: '12px 0', textAlign: 'right' }}><Badge status="Completed" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
            {/* Add Payout Method Drawer */}
            <Drawer open={payoutDrawer} onClose={() => setPayoutDrawer(false)} title="Add Payout Method" maxWidth="480px">
                <form onSubmit={handleAddPayout} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
                        Connect a bank account to receive automated payouts from your store sales.
                    </div>

                    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Select label="Account Type" value={payoutForm.type} onChange={v => setPayoutForm({ ...payoutForm, type: v })} options={['Bank Account (US)', 'Bank Account (International)', 'PayPal']} />
                        <Input label="Bank Name" type="text" placeholder="e.g. Bank of America" required value={payoutForm.bankName} onChange={v => setPayoutForm({ ...payoutForm, bankName: v })} />
                        <Input label="Account Holder Name" type="text" placeholder="e.g. James Okafor" required value={payoutForm.accountName} onChange={v => setPayoutForm({ ...payoutForm, accountName: v })} />
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 150px' }}>
                                <Input label="Routing Number" type="text" placeholder="9 digits" required value={payoutForm.routingNumber} onChange={v => setPayoutForm({ ...payoutForm, routingNumber: v })} />
                            </div>
                            <div style={{ flex: '1 1 150px' }}>
                                <Input label="Account Number" type="text" placeholder="••••••••" required value={payoutForm.accountNumber} onChange={v => setPayoutForm({ ...payoutForm, accountNumber: v })} />
                            </div>
                        </div>
                    </Card>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0 4px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--dash-primary)', width: '16px', height: '16px' }} />
                        <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Set as default for incoming transfers</span>
                    </label>

                    <div style={{ padding: '24px 0 8px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', background: '#fff', position: 'sticky', bottom: '-32px', zIndex: 10 }}>
                        <Btn label="Cancel" variant="ghost" onClick={() => setPayoutDrawer(false)} />
                        <Btn label="Save Bank Details" submit />
                    </div>
                </form>
            </Drawer>

            {/* Request Payout Drawer */}
            <Drawer open={requestPayoutDrawer} onClose={() => setRequestPayoutDrawer(false)} title="Request for Payout" maxWidth="480px">
                <form onSubmit={handleRequestPayout} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
                        Select common account to withdraw funds from. Processing usually takes 1-3 business days.
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Your Accounts & Balances</label>
                        {MOCK_ACCOUNTS.map(acc => (
                            <div key={acc.id} style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: requestForm.accountId === acc.id ? 'var(--dash-primary-light)' : '#f8fafc', borderColor: requestForm.accountId === acc.id ? 'var(--dash-primary)' : '#e2e8f0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }} onClick={() => setRequestForm({ ...requestForm, accountId: acc.id })}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{acc.type}</p>
                                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>ID: {acc.id}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--dash-primary)', margin: 0 }}>{acc.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Input label="Account ID" placeholder="Choose an account above or enter ID" required value={requestForm.accountId} onChange={v => setRequestForm({ ...requestForm, accountId: v })} />
                        <Input label="Amount to Withdraw" type="text" placeholder="e.g. 500.00" required value={requestForm.amount} onChange={v => setRequestForm({ ...requestForm, amount: v })} />
                    </Card>

                    <div style={{ padding: '24px 0 8px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', background: '#fff', position: 'sticky', bottom: '-32px', zIndex: 10 }}>
                        <Btn label="Cancel" variant="ghost" onClick={() => setRequestPayoutDrawer(false)} />
                        <Btn label="Process Payout" submit />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}