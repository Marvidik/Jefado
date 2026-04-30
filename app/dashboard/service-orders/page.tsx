'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, PageHeader, Btn, Pagination, Table, Select, Input } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';
import { getSellerServiceBookings, updateOrderStatus } from '@/services/sellerService';
import { Order } from '@/services/types';

export default function ServiceOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
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
            const data = await getSellerServiceBookings({ 
                page, 
                page_size: PER, 
                search: search || undefined 
            });
            
            if (Array.isArray(data)) {
                setOrders(data);
                setTotal(data.length);
            } else {
                setOrders((data as any).data || (data as any).results || []);
                setTotal((data as any).count || (Array.isArray((data as any).data) ? (data as any).data.length : 0));
            }
        } catch (err) {
            console.error('Failed to fetch service orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

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
            console.error('Failed to update booking status:', err);
            const mainMsg = err?.response?.data?.message || err?.message || 'Failed to update booking';
            const detail = err?.response?.data?.data?.detail;
            setUpdateError(detail ? `${mainMsg}: ${detail}` : mainMsg);
        } finally {
            setUpdatingId(null);
        }
    };

    const filtered = orders.filter(o => {
        const matchStatus = statusFilter === 'All Statuses' || o.status === statusFilter;
        return matchStatus;
    });

    const rows = filtered.map(o => [
        <span key="id" style={{ fontWeight: 700, color: '#2563eb' }}>#SB-{o.id}</span>,
        <div key="s" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🛠️</div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>{o.items?.[0]?.service_name || o.items?.[0]?.name || 'Service Booking'}</div>
        </div>,
        <span key="dt" style={{ fontWeight: 600, color: '#64748b' }}>{new Date(o.created_at).toLocaleDateString()}</span>,
        <span key="cust" style={{ fontWeight: 600, color: '#0f172a' }}>{o.buyer_name}</span>,
        <span key="val" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>₦{parseFloat(o.total_amount).toLocaleString()}</span>,
        <Badge key="stat" status={
            o.status === 'COMPLETED' || o.status === 'PAID' ? 'Completed' : 
            o.status === 'CANCELLED' ? 'Refunded' : 
            o.status === 'PROCESSING' ? 'Processing' : 'Pending'
        } label={o.status} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8', cursor: 'pointer' }} onClick={() => setSelected(o)}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.background = '#eff6ff';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
        </div>
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Service Bookings" subtitle="Manage your professional service appointments and automated booking terminal.">
                <Btn label="Refresh" variant="secondary" onClick={fetchData} />
            </PageHeader>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Card noPad>
                        <div style={{ padding: '28px 28px 0' }}>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <div style={{ flex: '1 1 300px' }}>
                                    <Input value={search} onChange={setSearch} placeholder="Search by Booking ID or Client..." suffix={Icons.search} />
                                </div>
                                <div style={{ flex: '1 1 200px' }}>
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
                            <Table cols={['Booking ID', 'Service', 'Timestamp', 'Client', 'Valuation', 'Status', 'Actions']} rows={rows} />
                            {!loading && orders.length === 0 && (
                                <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                                    No active service bookings found in the registry.
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
                    <div style={{ flex: '1 1 350px', width: '100%', maxWidth: '400px' }}>
                        <Card style={{ position: 'sticky', top: '80px', animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                            <style>{`
                                @keyframes slideInRight { from { transform: translateX(20px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }
                                @keyframes spin { to { transform: rotate(360deg); } }
                            `}</style>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <Badge status={
                                        selected.status === 'COMPLETED' || selected.status === 'PAID' ? 'Completed' : 
                                        selected.status === 'CANCELLED' ? 'Refunded' : 
                                        selected.status === 'PROCESSING' ? 'Processing' : 'Pending'
                                    } label={selected.status} />
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#0f172a', margin: '12px 0 4px' }}>Session #SB-{selected.id}</h4>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Logged on {new Date(selected.created_at).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ border: 'none', background: '#f8fafc', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Client</span>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Service</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.items?.[0]?.service_name || selected.items?.[0]?.name}</span>
                                </div>
                                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Location / Address</p>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: 0, lineHeight: 1.5 }}>
                                        {selected.address || 'Remote / Virtual Session'}<br />
                                        {selected.city && `${selected.city}, `}{selected.state} {selected.postal_code}
                                    </p>
                                </div>
                            </div>

                            <p style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Workflow State</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {['PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED'].map(s => (
                                    <button key={s}
                                        disabled={updatingId === selected.id}
                                        onClick={() => handleStatusUpdate(selected.id, s)}
                                        style={{ padding: '12px 16px', borderRadius: '10px', border: `1.5px solid ${selected.status === s ? '#2563eb' : '#e2e8f0'}`, background: selected.status === s ? '#eff6ff' : '#fff', color: selected.status === s ? '#2563eb' : '#475569', fontWeight: 600, fontSize: '13px', textAlign: 'left', cursor: updatingId === selected.id ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s', opacity: updatingId === selected.id && selected.status !== s ? 0.6 : 1 }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {s}
                                            {updatingId === selected.id && selected.status === s && (
                                                <div style={{ width: '12px', height: '12px', border: '2px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                            )}
                                        </div>
                                        {selected.status === s && updatingId !== selected.id && <span>✓</span>}
                                    </button>
                                ))}
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
