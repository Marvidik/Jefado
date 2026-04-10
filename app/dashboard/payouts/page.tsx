'use client';
import { useState } from 'react';
import { Badge, Card, PageHeader, Btn, Input } from '@/components/dashboard/ui';

export default function PayoutsPage() {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('Bank Transfer');
    const [requested, setRequested] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Payouts" subtitle="Withdraw your earnings to your preferred account" />

            {/* Balance cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                {[
                    { label: 'Available Balance', value: '$3,200', sub: 'Ready to withdraw', color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
                    { label: 'Pending Balance', value: '$1,850', sub: 'Processing (2-3 days)', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                    { label: 'Total Paid Out', value: '$44,200', sub: 'All time', color: '#1a56db', bg: '#eff6ff', border: '#bfdbfe' },
                ].map(c => (
                    <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '20px 22px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{c.label}</p>
                        <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '28px', color: c.color, marginBottom: '4px' }}>{c.value}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8' }}>{c.sub}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '18px', alignItems: 'flex-start' }}>
                {/* Request form */}
                <Card>
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '18px' }}>Request Payout</h3>
                    {requested ? (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div style={{ width: '60px', height: '60px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '28px' }}>✅</div>
                            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Request Submitted!</p>
                            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '18px' }}>You'll receive it within 2-3 business days.</p>
                            <Btn label="Request Another" onClick={() => setRequested(false)} />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Input label="Amount ($)" value={amount} onChange={setAmount} placeholder={`Max $3,200`} type="number" required />
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Payout Method</p>
                                {[['Bank Transfer', '🏦'], ['PayPal', '🅿️'], ['Mobile Money', '📱']].map(([m, icon]) => (
                                    <label key={m} onClick={() => setMethod(m)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px', border: `1.5px solid ${method === m ? '#1a56db' : '#e8edf2'}`, borderRadius: '8px', background: method === m ? '#eff6ff' : '#f8fafc', cursor: 'pointer', marginBottom: '7px', transition: 'all 0.15s' }}>
                                        <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} style={{ accentColor: '#1a56db', width: '14px', height: '14px' }} />
                                        <span style={{ fontSize: '13px', fontWeight: method === m ? 700 : 400, color: method === m ? '#1a56db' : '#475569' }}>{icon} {m}</span>
                                    </label>
                                ))}
                            </div>
                            <Btn label="Request Payout →" onClick={() => { if (amount) setRequested(true); }} disabled={!amount} />
                        </div>
                    )}
                </Card>

                {/* History */}
                <Card noPad>
                    <div style={{ padding: '20px 20px 0' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Payout History</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf2' }}>
                                    {['Date', 'Amount', 'Method', 'Reference', 'Status'].map(h => (
                                        <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { date: 'Mar 28, 2026', amount: '$3,200', method: 'Bank Transfer', ref: 'PAY-9821', status: 'Completed' },
                                    { date: 'Mar 14, 2026', amount: '$4,500', method: 'PayPal', ref: 'PAY-9734', status: 'Completed' },
                                    { date: 'Feb 28, 2026', amount: '$2,800', method: 'Bank Transfer', ref: 'PAY-9612', status: 'Completed' },
                                    { date: 'Feb 14, 2026', amount: '$5,100', method: 'Bank Transfer', ref: 'PAY-9501', status: 'Completed' },
                                    { date: 'Jan 31, 2026', amount: '$3,600', method: 'Mobile Money', ref: 'PAY-9389', status: 'Completed' },
                                ].map(p => (
                                    <tr key={p.ref} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.12s' }}
                                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#f8fafc'}
                                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '13px 16px', color: '#94a3b8', fontSize: '12px' }}>{p.date}</td>
                                        <td style={{ padding: '13px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#22c55e' }}>{p.amount}</td>
                                        <td style={{ padding: '13px 16px', color: '#64748b' }}>{p.method}</td>
                                        <td style={{ padding: '13px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#1a56db' }}>{p.ref}</td>
                                        <td style={{ padding: '13px 16px' }}><Badge status={p.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}