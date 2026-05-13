'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, PageHeader, Pagination, Table, Input, Btn, SectionHead } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';
import { getSellerOrders } from '@/services/sellerService';
import { Order } from '@/services/types';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
    const PER = 10;
    
    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const orders: Order[] = await getSellerOrders({ page_size: 100 });
            
            const customerMap = new Map();
            orders.forEach(o => {
                const email = o.buyer_email;
                if (!customerMap.has(email)) {
                    customerMap.set(email, {
                        name: o.buyer_name,
                        email: email,
                        phone: o.buyer_phone || 'N/A',
                        orders: 0,
                        spent: 0,
                        last_order: o,
                        status: 'Active'
                    });
                }
                const c = customerMap.get(email);
                c.orders += 1;
                c.spent += parseFloat(o.total_amount);
            });
            
            setCustomers(Array.from(customerMap.values()));
        } catch (err) {
            console.error('Failed to derive customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    
    const filtered = customers.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });
    
    const paged = filtered.slice((page - 1) * PER, page * PER);

    const rows = paged.map(c => [
        <div key="c" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}>{c.name[0]}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{c.name}</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{c.email}</span>
            </div>
        </div>,
        <span key="o" style={{ fontWeight: 600, color: '#334155' }}>{c.orders}</span>,
        <span key="sp" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: '#059669' }}>₦{c.spent.toLocaleString()}</span>,
        <Badge key="s" status="Active" label="Verified" />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button 
                onClick={() => setSelectedCustomer(c)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'all 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} 
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >
                {Icons.search}
            </button>
        </div>
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Customers" subtitle="View and manage your verified customer list derived from transaction data.">
                <Btn label="Refresh" variant="secondary" onClick={fetchCustomers} />
            </PageHeader>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Card style={{ padding: '24px', marginBottom: '24px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search customers by name or email..." suffix={Icons.search} />
                    </Card>
                    
                    <Card noPad>
                        <div style={{ padding: '28px 28px 0' }}>
                            <SectionHead title="Customer Directory" />
                        </div>
                        <div style={{ padding: '0 8px 8px', minHeight: loading ? '300px' : 'auto', position: 'relative' }}>
                            {loading && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                     <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Refreshing Customer Data...</div>
                                </div>
                            )}
                            <Table cols={['Customer', 'Total Orders', 'Total Spent', 'Status', 'Actions']} rows={rows} />
                            {!loading && customers.length === 0 && (
                                <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                                    No customers found.
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '0 28px 28px' }}>
                            <Pagination total={filtered.length} page={page} perPage={PER} onPage={setPage} />
                        </div>
                    </Card>
                </div>

                {selectedCustomer && (
                    <div style={{ flex: '1 1 350px', width: '100%', maxWidth: '400px' }}>
                        <Card style={{ position: 'sticky', top: '80px', animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                            <style>{`@keyframes slideInRight { from { transform: translateX(20px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }`}</style>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#0f172a', margin: '0 0 4px' }}>Customer Profile</h4>
                                    <p style={{ fontSize: '13px', color: '#64748b' }}>Verified Jefedo Buyer</p>
                                </div>
                                <button onClick={() => setSelectedCustomer(null)} style={{ border: 'none', background: '#f8fafc', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Identity</p>
                                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{selectedCustomer.name}</p>
                                    <p style={{ fontSize: '13px', color: '#64748b' }}>{selectedCustomer.email}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Phone Number</p>
                                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{selectedCustomer.phone}</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Orders</p>
                                        <p style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb' }}>{selectedCustomer.orders}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Total Spent</p>
                                        <p style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>₦{selectedCustomer.spent.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px' }}>Latest Delivery Info</p>
                                <div style={{ padding: '16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                                        {selectedCustomer.last_order.address || 'No address provided'}<br />
                                        {selectedCustomer.last_order.city && `${selectedCustomer.last_order.city}, `}
                                        {selectedCustomer.last_order.state} {selectedCustomer.last_order.postal_code}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}