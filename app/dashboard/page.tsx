'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StatCard, Card, LineChart, DonutChart, Badge, Table, PageHeader, SectionHead, Btn, Select } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';
import { getSellerDashboard, getSellerOrders, updateOrderStatus } from '@/services/sellerService';
import { Order } from '@/services/types';

export default function DashboardHome() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const handleStatusUpdate = async (id: number, currentStatus: string) => {
        const statuses = ['PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
        const nextIndex = (statuses.indexOf(currentStatus) + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        
        try {
            await updateOrderStatus(id, nextStatus);
            setStats((prev: any) => ({
                ...prev,
                orders: prev.orders.map((o: any) => o.id === id ? { ...o, status: nextStatus } : o)
            }));
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    useEffect(() => {
        async function loadData() {
            try {
                const dashData = await getSellerDashboard();
                setStats(dashData);
            } catch (err: any) {
                console.error("❌ Dashboard Load Error:", err?.message || err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const cards = stats?.cards || {};
    const chart = stats?.chart || [];
    const bestsellers = stats?.bestsellers || [];
    const orders = stats?.orders || [];

    // Format orders for the table component
    const orderRows = orders.slice(0, 10).map((order: any) => [
        <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📦</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>{order.buyer_name || order.buyer || 'Direct Customer'}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>Order ID: #{order.id}</span>
            </div>
        </div>,
        <span key="qty" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{order.items?.length || 1} Items</span>,
        <span key="date" style={{ color: 'var(--text-secondary)' }}>{new Date(order.created_at || (order as any).order_date).toLocaleDateString()}</span>,
        <span key="rev" style={{ fontWeight: 700, fontSize: '15px' }}>₦{parseFloat(order.revenue || order.total_amount).toLocaleString()}</span>,
        `₦${parseFloat(order.net_profit || (order.revenue * 0.85)).toLocaleString()}`,
        <Badge key="status" status={
            order.status === 'COMPLETED' || order.status === 'PAID' ? 'Completed' : 
            order.status === 'CANCELLED' ? 'Refunded' : 
            order.status === 'PROCESSING' ? 'Processing' : 'Pending'
        } label={order.status} />,
        <div key="actions" style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
            <button 
                onClick={() => handleStatusUpdate(order.id, order.status)}
                title="Quick Status Update"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
            >
                {Icons.edit}
            </button>
        </div>
    ]);

    const bestSellersRows = bestsellers.map((p: any, idx: number) => [
        <span key={idx} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.product}</span>,
        <span key="p" style={{ fontWeight: 600 }}>₦{parseFloat(p.price).toLocaleString()}</span>,
        p.units_sold.toString(),
        <span key="prof" style={{ color: '#059669', fontWeight: 700 }}>+₦{parseFloat(p.net_profit).toLocaleString()}</span>
    ]);

    const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullChartData = ALL_MONTHS.map(m => {
        const entry = chart.find((c: any) => c.month === m);
        return { month: m, earnings: entry ? entry.earnings : 0 };
    });

    const maxEarnings = Math.max(...fullChartData.map(x => x.earnings), 1);

    if (loading) return (
        <div style={{ height: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column', gap: '16px' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Synchronizing Terminal Data...</div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Merchant Terminal" subtitle="Advanced overview of your store's performance.">
                <Btn label="Generate Report" variant="primary" icon={Icons.plus} />
            </PageHeader>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <StatCard label="Total Revenue" value={`₦${parseFloat(cards.total_revenue?.value || 0).toLocaleString()}`} change={`${cards.total_revenue?.change_pct}%`} up={cards.total_revenue?.change_pct >= 0} color="var(--primary)" />
                <StatCard label="Total Orders" value={cards.total_orders?.value?.toString() || '0'} change={`${cards.total_orders?.change_pct}%`} up={cards.total_orders?.change_pct >= 0} color="var(--secondary)" />
                <StatCard label="Total Visitors" value={cards.total_visitors?.value?.toLocaleString() || '0'} change={`${cards.total_visitors?.change_pct}%`} up={cards.total_visitors?.change_pct >= 0} color="#059669" />
                <StatCard label="Conversion Rate" value={`${(cards.conversion_rate?.value || 0).toFixed(2)}%`} change={`${cards.conversion_rate?.change_pct}%`} up={cards.conversion_rate?.change_pct >= 0} color="#eab308" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <Card noPad style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <div style={{ padding: '24px 24px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
                        <SectionHead title="Best Selling Products" action={() => router.push('/dashboard/products')} actionLabel="View Products" />
                    </div>
                    <div style={{ padding: '8px' }}>
                        <Table cols={['Product', 'Price', 'Sold', 'Net Profit']} rows={bestSellersRows} />
                    </div>
                </Card>
                <Card>
                    <SectionHead title="Earnings Overview" />
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '240px', padding: '20px 0 0', gap: '4px' }}>
                        {fullChartData.map((c: any, i: number) => {
                            const height = (c.earnings / maxEarnings) * 200;
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '100%', height: `${Math.max(height, 4)}px`, background: c.earnings > 0 ? 'var(--primary)' : 'var(--surface-2)', borderRadius: '4px', opacity: c.earnings > 0 ? 1 : 0.4, transition: 'all 0.3s' }} />
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', transform: 'rotate(-45deg)', marginTop: '4px' }}>{c.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            <Card noPad>
                <div style={{ padding: '24px 24px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
                    <SectionHead title="Recent Orders" action={() => router.push('/dashboard/orders')} actionLabel="Order Management" />
                </div>
                <div style={{ padding: '0 8px 8px' }}>
                    <Table cols={['Order Details', 'QTY', 'Date', 'Amount', 'Net Profit', 'Status', 'Actions']} rows={orderRows} />
                </div>
                {orders.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No recent orders found.</div>}
            </Card>

            <div style={{ textAlign: 'center', padding: '32px 0 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
                JEFEDO MULTIVENDOR TERMINAL © 2026. DATA SYNCHRONIZED.
            </div>
        </div>
    );
}