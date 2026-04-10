'use client';
import { useState } from 'react';
import { Card, PageHeader, Btn, Input, Select, Drawer, Badge } from '@/components/dashboard/ui';

export default function SettingsPage() {
    const [tab, setTab] = useState('Payouts');
    const TABS = ['Profile', 'Store', 'Payouts', 'Billing', 'Security', 'Notifications'];

    // Payment Form state
    const [cardDrawer, setCardDrawer] = useState(false);
    const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvv: '' });

    // Payout Form state
    const [payoutDrawer, setPayoutDrawer] = useState(false);
    const [payoutForm, setPayoutForm] = useState({ type: 'Bank Account (US)', bankName: '', accountNumber: '', routingNumber: '', accountName: '' });

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit the payload.
        setCardDrawer(false);
        setCardForm({ name: '', number: '', expiry: '', cvv: '' });
    };

    const handleAddPayout = (e: React.FormEvent) => {
        e.preventDefault();
        setPayoutDrawer(false);
        setPayoutForm({ type: 'Bank Account (US)', bankName: '', accountNumber: '', routingNumber: '', accountName: '' });
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
                            <button key={t} onClick={() => setTab(t)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: tab === t ? 700 : 400, color: tab === t ? '#2563eb' : '#64748b', background: tab === t ? '#eff6ff' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'left', transition: 'all 0.15s' }}>{t}</button>
                        ))}
                    </Card>
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                    {tab === 'Profile' && (
                        <Card>
                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>Profile Information</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '18px', background: '#f8fafc', borderRadius: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
                                <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '26px', flexShrink: 0 }}>J</div>
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
                                <textarea rows={3} defaultValue="Pro seller specializing in electronics and gadgets." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e8edf2', borderRadius: '8px', fontSize: '13px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} onFocus={e => (e.currentTarget.style.borderColor = '#2563eb')} onBlur={e => (e.currentTarget.style.borderColor = '#e8edf2')} />
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
                                <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb', width: '15px', height: '15px' }} />
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
                            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e8edf2' }}>
                                <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>Two-Factor Authentication</p>
                                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>Add extra security to your seller account.</p>
                                <Btn label="Enable 2FA" variant="success" />
                            </div>
                        </Card>
                    )}
                    {tab === 'Notifications' && (
                        <Card><p style={{ fontSize: '14px', color: '#94a3b8' }}>{tab} settings — coming soon.</p></Card>
                    )}
                    {tab === 'Payouts' && (
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', color: '#0f172a', margin: 0 }}>Payout Methods</h3>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Where we'll send your marketplace earnings.</p>
                                </div>
                                <Btn label="Add Payout Method" onClick={() => setPayoutDrawer(true)} small />
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
                    {tab === 'Billing' && (
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                                <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px' }}>Payment Methods</h3>
                                <Btn label="Add New Card" onClick={() => setCardDrawer(true)} small />
                            </div>
                            <div className="responsive-grid" style={{ gap: '20px' }}>
                                {/* Mock Card 1 */}
                                <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '16px', padding: '24px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '16px' }}>Mastercard</span>
                                        <div style={{ display: 'flex', position: 'relative', zIndex: 10 }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#eb001b', opacity: 0.8, zIndex: 2 }}></div>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f79e1b', opacity: 0.8, marginLeft: '-12px', zIndex: 1 }}></div>
                                        </div>
                                    </div>
                                    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '18px', letterSpacing: '4px', marginBottom: '8px' }}>**** **** **** 4242</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                                        <span>James Okafor</span>
                                        <span>12/28</span>
                                    </div>
                                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', color: '#34d399' }}>Primary</div>
                                </div>
                                {/* Mock Card 2 */}
                                <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '16px', padding: '24px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '16px', fontStyle: 'italic' }}>VISA</span>
                                    </div>
                                    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '18px', letterSpacing: '4px', marginBottom: '8px' }}>**** **** **** 5591</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#bfdbfe' }}>
                                        <span>James Okafor</span>
                                        <span>08/25</span>
                                    </div>
                                </div>
                            </div>
                            
                            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '15px', marginTop: '32px', marginBottom: '16px' }}>Billing History</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '400px' }}>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 16px 12px 0', color: '#0f172a', fontWeight: 600 }}>Pro Seller Plan - Monthly</td>
                                            <td style={{ padding: '12px 16px', color: '#64748b' }}>Apr 1, 2026</td>
                                            <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 700 }}>$29.00</td>
                                            <td style={{ padding: '12px 0', textAlign: 'right' }}><a href="#" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Download</a></td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 16px 12px 0', color: '#0f172a', fontWeight: 600 }}>Pro Seller Plan - Monthly</td>
                                            <td style={{ padding: '12px 16px', color: '#64748b' }}>Mar 1, 2026</td>
                                            <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 700 }}>$29.00</td>
                                            <td style={{ padding: '12px 0', textAlign: 'right' }}><a href="#" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Download</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Add Payment Method Drawer */}
            <Drawer open={cardDrawer} onClose={() => setCardDrawer(false)} title="Add Payment Method" maxWidth="480px">
                <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
                        Securely add a new credit or debit card for billing defaults and subscription renewals.
                    </div>

                    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', right: '16px', top: '42px', display: 'flex', gap: '6px' }}>
                                <div style={{ width: '32px', height: '20px', borderRadius: '4px', background: '#f1f5f9', border: '1px solid #cbd5e1' }}></div>
                                <div style={{ width: '32px', height: '20px', borderRadius: '4px', background: '#f1f5f9', border: '1px solid #cbd5e1' }}></div>
                            </div>
                            <Input label="Card Number" type="text" placeholder="0000 0000 0000 0000" required value={cardForm.number} onChange={v => setCardForm({ ...cardForm, number: v })} />
                        </div>
                        <Input label="Name on Card" type="text" placeholder="e.g. James Okafor" required value={cardForm.name} onChange={v => setCardForm({ ...cardForm, name: v })} />
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <Input label="Expiry Date" type="text" placeholder="MM/YY" required value={cardForm.expiry} onChange={v => setCardForm({ ...cardForm, expiry: v })} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Input label="CVV" type="password" placeholder="123" required value={cardForm.cvv} onChange={v => setCardForm({ ...cardForm, cvv: v })} />
                            </div>
                        </div>
                    </Card>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0 4px' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb', width: '16px', height: '16px' }} />
                        <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Set as default payment method</span>
                    </label>

                    <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0' }}>
                        <Btn label="Cancel" variant="ghost" onClick={() => setCardDrawer(false)} />
                        <Btn label="Save Card" submit />
                    </div>
                </form>
            </Drawer>
            {/* Add Payout Method Drawer */}
            <Drawer open={payoutDrawer} onClose={() => setPayoutDrawer(false)} title="Add Payout Method" maxWidth="480px">
                <form onSubmit={handleAddPayout} style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
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
                        <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb', width: '16px', height: '16px' }} />
                        <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Set as default for incoming transfers</span>
                    </label>

                    <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0' }}>
                        <Btn label="Cancel" variant="ghost" onClick={() => setPayoutDrawer(false)} />
                        <Btn label="Save Bank Details" submit />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}