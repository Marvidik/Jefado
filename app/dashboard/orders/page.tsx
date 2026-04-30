'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, PageHeader, Btn, Pagination, StatCard, LineChart, Table, Select, Input } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';
import { getSellerOrders, getOrderAnalytics, updateOrderStatus } from '@/services/sellerService';
import { Order } from '@/services/types';

function SectionTitle({ title, action }: { title: string, action?: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
            {action && <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>{action} {Icons.arrowUp}</button>}
        </div>
    );
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<any>(null);
    const [selected, setSelected] = useState<Order | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const PER = 10;

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ordersData, analyticsData] = await Promise.all([
                getSellerOrders({ page, page_size: PER, search: search || undefined }),
                getOrderAnalytics().catch(() => null)
            ]);
            
            if (Array.isArray(ordersData)) {
                setOrders(ordersData);
                setTotal(ordersData.length);
            } else {
                setOrders((ordersData as any).results || []);
                setTotal((ordersData as any).count || 0);
            }
            setAnalytics(analyticsData);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const filtered = orders.filter(o => {
        const matchStatus = statusFilter === 'All Statuses' || o.status === statusFilter;
        return matchStatus;
    });

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        setUpdatingId(id);
        setUpdateError(null);
        try {
            await updateOrderStatus(id, newStatus);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
            if (selected && selected.id === id) {
                setSelected({ ...selected, status: newStatus as any });
            }
        } catch (err: any) {
            console.error('Failed to update order status:', err);
            const mainMsg = err?.response?.data?.message || err?.message || 'Failed to update order status';
            const detail = err?.response?.data?.data?.detail;
            setUpdateError(detail ? `${mainMsg}: ${detail}` : mainMsg);
        } finally {
            setUpdatingId(null);
        }
    };

    const rows = filtered.map(o => {
        const firstItemName = o.items?.[0]?.product_name || o.items?.[0]?.name || 'Unknown Item';
        
        return [
            <span key="id" style={{ fontWeight: 700, color: '#2563eb' }}>#{o.id}</span>,
            <div key="c" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📦</div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>{firstItemName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{o.items?.length || 0} Items</div>
                </div>
            </div>,
            <span key="d" style={{ color: '#64748b' }}>{new Date(o.created_at).toLocaleDateString()}</span>,
            <span key="cust" style={{ fontWeight: 600, color: '#0f172a' }}>{o.buyer_name}</span>,
            <span key="amt" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>₦{parseFloat(o.total_amount).toLocaleString()}</span>,
            <Badge key="s" status={
                o.status === 'COMPLETED' || o.status === 'PAID' ? 'Completed' :
                    o.status === 'CANCELLED' ? 'Refunded' :
                        o.status === 'PROCESSING' ? 'Processing' : 'Pending'
            } label={o.status} />,
            <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8', cursor: 'pointer' }} onClick={() => setSelected(o)}>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.background = '#eff6ff';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
            </div>
        ];
    });

    const kpi = analytics?.cards || {};
    const chartData = analytics?.chart || [];
    const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullChartData = ALL_MONTHS.map(m => {
        const entry = chartData.find((c: any) => c.month === m);
        return { month: m, orders: entry ? (entry.orders || 0) : 0 };
    });
    const maxOrders = Math.max(...fullChartData.map(x => x.orders), 5);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Order Management" subtitle="Monitor and optimize your fulfillment pipeline across the global network.">
                <Btn label="Refresh" variant="secondary" onClick={fetchData} />
            </PageHeader>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <StatCard label="Total Revenue" value={`₦${parseFloat(kpi.revenue?.value || '0').toLocaleString()}`} change={`${kpi.revenue?.change_pct || 0}%`} up={(kpi.revenue?.change_pct || 0) >= 0} color="#2563eb" />
                <StatCard label="Total Orders" value={kpi.orders?.value?.toString() || '0'} change={`${kpi.orders?.change_pct || 0}%`} up={(kpi.orders?.change_pct || 0) >= 0} color="#2563eb" />
                <StatCard label="Total Visitors" value={kpi.visitors?.value?.toLocaleString() || '0'} change={`${kpi.visitors?.change_pct || 0}%`} up={(kpi.visitors?.change_pct || 0) >= 0} color="#059669" />
                <StatCard label="Conversion Rate" value={`${((kpi.conversion?.value || 0) * 100).toFixed(2)}%`} change={`${kpi.conversion?.change_pct || 0}%`} up={(kpi.conversion?.change_pct || 0) >= 0} color="#2563eb" />
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Card style={{ marginBottom: '24px' }}>
                        <SectionTitle title="Order Volume Trend" />
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', padding: '20px 0 0', gap: '4px' }}>
                            {fullChartData.map((c: any, i: number) => {
                                const height = (c.orders / maxOrders) * 150;
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '100%', height: `${Math.max(height, 4)}px`, background: c.orders > 0 ? '#2563eb' : '#f1f5f9', borderRadius: '4px', opacity: c.orders > 0 ? 1 : 0.4, transition: 'all 0.3s' }} />
                                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8' }}>{c.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    <Card noPad>
                        <div style={{ padding: '28px 28px 0' }}>
                            <SectionTitle title="Deployment Registry (Orders)" />
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <div style={{ flex: '1 1 300px' }}>
                                    <Input value={search} onChange={setSearch} placeholder="Search by Order ID or Buyer Name..." suffix={Icons.search} />
                                </div>
                                <div style={{ flex: '1 1 150px' }}>
                                    <Select value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED']} />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 8px 8px', minHeight: loading ? '300px' : 'auto', position: 'relative' }}>
                            {loading && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Refreshing Data…</div>
                                </div>
                            )}
                            <Table cols={['Order ID', 'Payload', 'Timestamp', 'Customer', 'Valuation', 'Status', 'Terminal']} rows={rows} />
                            {!loading && orders.length === 0 && (
                                <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                                    No active orders found in the registry.
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '0 28px 28px' }}>
                            <Pagination 
                                page={page} 
                                total={total} 
                                perPage={PER} 
                                onPage={setPage} 
                            />
                        </div>
                    </Card>
                </div>

                {selected && (
                    <div style={{ flex: '1 1 300px', width: '100%', maxWidth: '400px' }}>
                        <Card style={{ position: 'sticky', top: '80px', animation: 'slideInRight 0.3s ease' }}>
                            <style>{`@keyframes slideInRight { from { transform: translateX(20px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }`}</style>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <Badge status={
                                        selected.status === 'COMPLETED' || selected.status === 'PAID' ? 'Completed' :
                                            selected.status === 'CANCELLED' ? 'Refunded' :
                                                selected.status === 'PROCESSING' ? 'Processing' : 'Pending'
                                    } label={selected.status} />
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#0f172a', margin: '12px 0 4px' }}>#{selected.id}</h4>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Ordered on {new Date(selected.created_at).toLocaleString()}</p>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%' }}>✕</button>
                            </div>

                            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Customer</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.buyer_name}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Contact</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.buyer_email}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Phone</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.buyer_phone || 'N/A'}</span>
                                </div>

                                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Delivery Address</p>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: 0, lineHeight: 1.5 }}>
                                        {selected.address}<br />
                                        {selected.city}, {selected.state} {selected.postal_code}<br />
                                        {selected.country}
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>Items</p>
                                    {selected.items?.map((it, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '13px' }}>{it.product_name || it.service_name || it.name} x {it.quantity}</span>
                                            <span style={{ fontWeight: 600 }}>₦{parseFloat(it.price).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 700 }}>Total Value</span>
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#059669' }}>₦{parseFloat(selected.total_amount).toLocaleString()}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Update Status</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {['PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED'].map((s) => (
                                    <button key={s}
                                        disabled={updatingId === selected.id}
                                        onClick={() => handleStatusUpdate(selected.id, s)}
                                        style={{ padding: '12px 16px', borderRadius: '10px', border: `1.5px solid ${selected.status === s ? '#2563eb' : '#e2e8f0'}`, background: selected.status === s ? '#eff6ff' : '#fff', color: selected.status === s ? '#2563eb' : '#475569', fontWeight: 600, fontSize: '13px', cursor: updatingId === selected.id ? 'not-allowed' : 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s', opacity: updatingId === selected.id && selected.status !== s ? 0.6 : 1 }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {s}
                                            {updatingId === selected.id && selected.status === s && (
                                                <div className="spinner-small" style={{ width: '12px', height: '12px', border: '2px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                            )}
                                        </div>
                                        {selected.status === s && updatingId !== selected.id && <span>✓</span>}
                                    </button>
                                ))}
                                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            </div>
                            
                            {updateError && (
                                <div style={{ marginTop: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '10px', color: '#b91c1c', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '16px' }}>⚠️</span>
                                    {updateError}
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}