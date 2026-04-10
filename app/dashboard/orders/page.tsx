'use client';
import { useState } from 'react';
import { Badge, Card, PageHeader, Btn, Pagination, StatCard, LineChart, Table, Select, Input } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const ORDERS = [
    { id: '#53200002', customer: 'Alice Johnson', product: 'Sony WH-1000XM5', items: 1, date: 'Jan 10, 2026', amount: 253.82, profit: 60.76, status: 'Completed', payment: 'Card' },
    { id: '#53200003', customer: 'Bob Smith', product: 'MacBook Pro 14"', items: 5, date: 'Sep 4, 2026', amount: 556.24, profit: 66.41, status: 'Processing', payment: 'PayPal' },
    { id: '#53200004', customer: 'Carol White', product: 'Nike Air Max 90', items: 7, date: 'Aug 30, 2026', amount: 115.26, profit: 85.66, status: 'Refunded', payment: 'Card' },
    { id: '#53200005', customer: 'David Brown', product: 'iPhone 15 Pro Max', items: 3, date: 'Aug 29, 2026', amount: 675.51, profit: 84.80, status: 'Completed', payment: 'Bank' },
    { id: '#53200006', customer: 'Eva Martinez', product: 'Samsung Galaxy S25', items: 4, date: 'Dec 26, 2026', amount: 810.71, profit: 46.52, status: 'Processing', payment: 'Card' },
    { id: '#53200007', customer: 'Frank Lee', product: 'iPad Pro 12.9"', items: 5, date: 'Apr 27, 2026', amount: 897.90, profit: 81.54, status: 'Completed', payment: 'Card' },
    { id: '#53200008', customer: 'Grace Kim', product: 'Bose QC45', items: 3, date: 'May 5, 2026', amount: 563.43, profit: 17.46, status: 'Pending', payment: 'PayPal' },
    { id: '#53200009', customer: 'Henry Adams', product: 'AirPods Pro', items: 5, date: 'Oct 15, 2026', amount: 883.96, profit: 43.08, status: 'Refunded', payment: 'Card' },
    { id: '#53200010', customer: 'Iris Chen', product: 'LG OLED 55"', items: 4, date: 'Jul 12, 2026', amount: 163.15, profit: 66.65, status: 'Completed', payment: 'Bank' },
    { id: '#53200012', customer: 'Jack Wilson', product: 'Anker Power Bank', items: 2, date: 'Jun 28, 2026', amount: 376.34, profit: 49.08, status: 'Completed', payment: 'Card' },
];

function SectionTitle({ title, action }: { title: string, action?: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
            {action && <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>{action} {Icons.arrowUp}</button>}
        </div>
    );
}

export default function OrdersPage() {
    const revenueData = [45, 52, 48, 60, 55, 65, 80, 75, 85, 95, 90, 100];
    const MONTHS = ['16', '18', '20', '22', '24', '26', '28', '30', '02', '04', '06', '08', '10'];

    const [selected, setSelected] = useState<typeof ORDERS[0] | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [dateFilter, setDateFilter] = useState('All Time');

    const filtered = ORDERS.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All Statuses' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const rows = filtered.map(o => [
        <span key="id" style={{ fontWeight: 700, color: '#2563eb' }}>{o.id}</span>,
        <div key="c" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📦</div>
            <div>
               <div style={{ fontWeight: 600, color: '#334155' }}>{o.items} items</div>
            </div>
        </div>,
        <span key="d" style={{ color: '#64748b' }}>{o.date}</span>,
        <span key="cust" style={{ fontWeight: 600, color: '#0f172a' }}>{o.customer}</span>,
        <span key="amt" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>${o.amount.toFixed(2)}</span>,
        `$${o.profit.toFixed(2)}`,
        <Badge key="s" status={o.status} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#9ca3af', cursor: 'pointer' }} onClick={() => setSelected(o)}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{Icons.edit}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{Icons.trash}</button>
        </div>
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Orders" subtitle="Track and manage your order pipeline.">
                <Btn label="Export CSV" variant="secondary" />
                <Btn label="Create Order" icon={Icons.plus} />
            </PageHeader>

            {/* ── KPI Cards ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <StatCard label="Revenue" value="$7,825" change="22%" up sparkData={[30, 35, 28, 40, 38, 44, 42, 48]} color="#2563eb" />
                <StatCard label="Orders" value="920" change="25%" up={false} sparkData={[50, 45, 42, 40, 38, 34, 30, 28]} color="#dc2626" />
                <StatCard label="Visitors" value="15.5K" change="49%" up sparkData={[20, 28, 25, 35, 32, 40, 38, 48]} color="#059669" />
                <StatCard label="Conversion" value="28%" change="1.8%" up sparkData={[22, 24, 23, 26, 25, 27, 26, 28]} color="#2563eb" />
            </div>

            {/* ── Orders Update Chart ── */}
            <Card>
                <SectionTitle title="Orders Update" action="View Details" />
                <LineChart data={revenueData} color="#2563eb" height={260} labels={MONTHS} />
            </Card>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* ── Latest Orders Table ── */}
                    <Card noPad>
                        <div style={{ padding: '28px 28px 0' }}>
                            <SectionTitle title="Latest Orders" />
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <div style={{ flex: '1 1 250px' }}>
                                    <Input value={search} onChange={setSearch} placeholder="Search by Order ID or Customer..." suffix={Icons.search} />
                                </div>
                                <div style={{ flex: '1 1 150px' }}>
                                    <Select value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Pending', 'Processing', 'Shipping', 'Completed', 'Refunded']} />
                                </div>
                                <div style={{ flex: '1 1 150px' }}>
                                    <Select value={dateFilter} onChange={setDateFilter} options={['All Time', 'Today', 'This Week', 'This Month']} />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 8px 8px' }}>
                            <Table cols={['Order ID', 'Items', 'Date', 'Customer', 'Revenue', 'Net Profit', 'Status', 'Actions']} rows={rows} />
                        </div>
                    </Card>
                </div>

                {/* Highly Modernized Side panel */}
                {selected && (
                    <div style={{ flex: '1 1 300px', width: '100%', maxWidth: '380px' }}>
                        <Card style={{ position: 'sticky', top: '80px', animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                            <style>{`@keyframes slideInRight { from { transform: translateX(20px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }`}</style>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <Badge status={selected.status} />
                                    <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '24px', color: '#0f172a', margin: '12px 0 4px' }}>{selected.id}</h4>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>{selected.date}</p>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ color: '#64748b', background: '#f8fafc', border: 'none', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
                                >✕</button>
                            </div>
                            
                            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Customer</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{selected.customer}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Product</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{selected.product}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Items</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{selected.items}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '16px', marginTop: '4px' }}>
                                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#334155' }}>Total Amount</span>
                                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '20px', color: '#059669' }}>${selected.amount.toFixed(2)}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Update Order Status</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Pending', 'Processing', 'Shipping', 'Completed', 'Refunded'].map((s) => (
                                    <button key={s} 
                                        style={{ padding: '14px 16px', borderRadius: '12px', border: `1.5px solid ${selected.status === s ? '#2563eb' : '#e2e8f0'}`, background: selected.status === s ? '#eff6ff' : '#fff', color: selected.status === s ? '#2563eb' : '#475569', fontWeight: selected.status === s ? 700 : 600, fontSize: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onMouseEnter={e => { if (selected.status !== s) { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.background = '#f8fafc'; } }}
                                        onMouseLeave={e => { if (selected.status !== s) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; } }}
                                    >
                                        {s}
                                        {selected.status === s && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}