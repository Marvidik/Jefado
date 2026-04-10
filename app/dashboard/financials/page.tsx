'use client';
import { StatCard, Card, SectionHead, LineChart, DonutChart, Badge, PageHeader, Btn } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

export default function FinancialsPage() {
    const monthly = [18, 22, 19, 28, 25, 32, 30, 35, 38, 42, 39, 48];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Financials" subtitle="Revenue, profit and transaction history">
                <Btn label="Export Report" variant="ghost" small icon={Icons.download} />
            </PageHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
                <StatCard icon={Icons.financials} label="Total Revenue" value="$48,250" change="+22%" up sparkData={[30, 35, 32, 40, 38, 44, 42, 48]} color="#1a56db" />
                <StatCard icon={Icons.analytics} label="Net Profit" value="$28,940" change="+18%" up sparkData={[20, 24, 22, 28, 26, 32, 30, 35]} color="#22c55e" />
                <StatCard icon={Icons.payouts} label="Pending Payout" value="$3,200" change="-5%" up={false} sparkData={[40, 36, 38, 32, 30, 28, 26, 24]} color="#f97316" />
                <StatCard icon={Icons.orders} label="Refunds" value="$890" change="+2%" up={false} sparkData={[10, 12, 11, 14, 13, 15, 14, 16]} color="#dc2626" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
                <Card>
                    <SectionHead title="Monthly Revenue" />
                    <LineChart data={monthly} labels={MONTHS} height={200} />
                </Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <Card>
                        <SectionHead title="Revenue Breakdown" />
                        <DonutChart segments={[
                            { label: 'Products', value: 68, color: '#1a56db' },
                            { label: 'Shipping', value: 18, color: '#f97316' },
                            { label: 'Fees', value: 14, color: '#e8edf2' },
                        ]} />
                    </Card>
                    <Card>
                        {[['Gross Sales', '$52,100', '#22c55e'], ['Platform Fees', '-$2,605', '#dc2626'], ['Payment Fees', '-$1,245', '#dc2626'], ['Net Revenue', '$48,250', '#1a56db']].map(([l, v, c]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>{l}</span>
                                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '13px', color: c }}>{v}</span>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
            <Card noPad>
                <div style={{ padding: '20px 20px 0' }}><SectionHead title="Transaction History" /></div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf2' }}>
                                {['ID', 'Date', 'Description', 'Type', 'Amount', 'Status'].map(h => (
                                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 'TXN-001', date: 'Apr 1', desc: 'Order #JFD-83421', type: 'Credit', amount: '+$279', status: 'Completed' },
                                { id: 'TXN-002', date: 'Mar 31', desc: 'Order #JFD-83401', type: 'Credit', amount: '+$1999', status: 'Completed' },
                                { id: 'TXN-003', date: 'Mar 30', desc: 'Refund #JFD-83330', type: 'Debit', amount: '-$1296', status: 'Completed' },
                                { id: 'TXN-004', date: 'Mar 29', desc: 'Platform Fee', type: 'Fee', amount: '-$89', status: 'Completed' },
                                { id: 'TXN-005', date: 'Mar 28', desc: 'Payout to Bank', type: 'Payout', amount: '-$3200', status: 'Pending' },
                            ].map(t => (
                                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.12s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#f8fafc'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#1a56db' }}>{t.id}</td>
                                    <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '12px' }}>{t.date}</td>
                                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#0f172a' }}>{t.desc}</td>
                                    <td style={{ padding: '12px 16px' }}><Badge status={t.type} /></td>
                                    <td style={{ padding: '12px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 800, color: t.amount.startsWith('+') ? '#22c55e' : '#dc2626' }}>{t.amount}</td>
                                    <td style={{ padding: '12px 16px' }}><Badge status={t.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}