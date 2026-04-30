'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, PageHeader, Btn, Input, Table, Select } from '@/components/dashboard/ui';
import { useToast } from '@/components/ui/Toast';
import { getPayoutRequests, getBankAccounts, createPayoutRequest, getPayoutCards } from '@/services/sellerService';
import { PayoutRequest, BankAccount } from '@/services/types';

export default function PayoutsPage() {
    const { success, error: toastError } = useToast();
    const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
    const [banks, setBanks] = useState<BankAccount[]>([]);
    const [cardData, setCardData] = useState({ total_earned: 0, payouts: 0, available_balance: 0 });
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ amount: '', bank_account: '' });
    const [submitting, setSubmitting] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [pData, bData, cData] = await Promise.all([
                getPayoutRequests(), 
                getBankAccounts(),
                getPayoutCards()
            ]);
            setPayouts(pData);
            setBanks(bData);
            setCardData(cData || { total_earned: 0, payouts: 0, available_balance: 0 });
            if (bData.length > 0) setForm(curr => ({ ...curr, bank_account: bData[0].id.toString() }));
        } catch (err) {
            console.error('Failed to load payouts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.amount || !form.bank_account) return;
        setSubmitting(true);
        try {
            await createPayoutRequest(form);
            setForm({ ...form, amount: '' });
            success('Payout request sent successfully.');
            fetchData();
        } catch (err) {
            toastError('Payout request failed.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Payout Registry" subtitle="Advanced financial terminal for cross-border revenue disbursement." />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <Card style={{ background: 'var(--secondary)', color: '#fff', border: 'none' }}>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '8px' }}>Total Earned</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', margin: 0 }}>₦{(cardData.total_earned || 0).toLocaleString()}</p>
                    <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>All-time gross terminal volume</p>
                </Card>
                <Card>
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Available Revenue</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: '#0f172a', margin: 0 }}>₦{(cardData.available_balance || 0).toLocaleString()}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Verified for disbursement</p>
                </Card>
                <Card>
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Total Disbursed</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: '#0f172a', margin: 0 }}>₦{(cardData.payouts || 0).toLocaleString()}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Successfully processed payouts</p>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', alignItems: 'flex-start' }}>
                <Card style={{ padding: '32px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Initiate Withdrawal</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Input label="Disbursement Amount (₦)" value={form.amount} onChange={v => setForm({ ...form, amount: v })} placeholder="0.00" type="number" required />
                        <Select label="Destination Protocol" value={form.bank_account} onChange={v => setForm({ ...form, bank_account: v })} options={banks.map(b => ({ label: `${b.bank_name} (••${b.account_number.slice(-4)})`, value: b.id.toString() }))} />
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>Network Fee</span>
                                <span style={{ fontSize: '13px', fontWeight: 700 }}>₦100.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '12px' }}>
                                <span style={{ fontWeight: 700, fontSize: '14px' }}>Net Disbursement</span>
                                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--secondary)' }}>₦{(Math.max(0, parseFloat(form.amount || '0') - 100)).toLocaleString()}</span>
                            </div>
                        </div>
                        <Btn label={submitting ? "Processing..." : "Authorize Payout →"} submit disabled={submitting || !form.amount || !form.bank_account} />
                    </form>
                </Card>

                <Card noPad>
                    <div style={{ padding: '32px 32px 0' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Disbursement History</h3>
                    </div>
                    <div style={{ padding: '0 8px 8px', minHeight: loading ? '300px' : 'auto', position: 'relative' }}>
                        {loading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>Syncing...</div>}
                        <Table 
                            cols={['Timestamp', 'Valuation', 'Protocol', 'Registry ID', 'Status']} 
                            rows={payouts.map(p => [
                                <span key="dt" style={{ color: '#94a3b8', fontSize: '12px' }}>{new Date(p.created_at).toLocaleDateString()}</span>,
                                <span key="amt" style={{ fontWeight: 800, color: '#0f172a' }}>₦{parseFloat(p.amount).toLocaleString()}</span>,
                                <span key="meth" style={{ color: '#64748b' }}>Bank Transfer</span>,
                                <span key="ref" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--secondary)' }}>#PR-{p.id}</span>,
                                <Badge key="st" status={p.status === 'SUCCESS' ? 'Completed' : p.status === 'PENDING' ? 'Processing' : 'Failed'} label={p.status} />
                            ])}
                        />
                        {!loading && payouts.length === 0 && (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>No disbursement history found.</div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}