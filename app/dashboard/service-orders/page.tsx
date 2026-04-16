'use client';
import { useState } from 'react';
import { Badge, Card, PageHeader, Btn, Pagination, StatCard, Table, Select, Input } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const BOOKINGS = [
    { id: '#SB-10024', customer: 'Sarah Miller', service: 'Professional Mobile Barbering', date: 'Oct 20, 2026', time: '14:30', amount: 35.00, location: 'High Street, Node 05', status: 'Confirmed', email: 's.miller@example.com' },
    { id: '#SB-10025', customer: 'James Thompson', service: 'Full House Deep Cleaning', date: 'Oct 21, 2026', time: '09:00', amount: 120.00, location: 'Oak Avenue, Node 02', status: 'Pending', email: 'j.thompson@abc.net' },
    { id: '#SB-10026', customer: 'Elena Rodriguez', service: 'PC Repair & Diagnostic', date: 'Oct 22, 2026', time: '11:00', amount: 75.00, location: 'Cyber Plaza, Office 404', status: 'In Progress', email: 'elena.r@techmail.io' },
    { id: '#SB-10027', customer: 'Mark Stevens', service: 'Personal Fitness Training', date: 'Oct 15, 2026', time: '17:00', amount: 50.00, location: 'Central Gym, Area 51', status: 'Completed', email: 'm.stevens@fitness.fit' },
    { id: '#SB-10028', customer: 'Chloe Davis', service: 'Professional Mobile Barbering', date: 'Oct 25, 2026', time: '10:00', amount: 35.00, location: 'Sunset Blvd, Apt 12', status: 'Pending', email: 'chloe.d@hub.com' },
];

export default function ServiceOrdersPage() {
    const [selected, setSelected] = useState<typeof BOOKINGS[0] | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');

    const filtered = BOOKINGS.filter(b => {
        const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All Statuses' || b.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const rows = filtered.map(b => [
        <span key="id" style={{ fontWeight: 700, color: '#2563eb' }}>{b.id}</span>,
        <div key="s" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🛠️</div>
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.service}</div>
        </div>,
        <div key="dt" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>{b.date}</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{b.time}</span>
        </div>,
        <span key="cust" style={{ fontWeight: 600, color: '#0f172a' }}>{b.customer}</span>,
        <span key="loc" style={{ color: '#4b5563', fontSize: '13px' }}>{b.location}</span>,
        <Badge key="stat" status={b.status === 'Confirmed' ? 'Processing' : b.status === 'Completed' ? 'Completed' : b.status === 'Pending' ? 'Pending' : 'Shipping'} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#9ca3af', cursor: 'pointer' }} onClick={() => setSelected(b)}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{Icons.eye}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{Icons.trash}</button>
        </div>
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Service Bookings" subtitle="Manage your service appointments and delivery status.">
                <Btn label="Calendar View" variant="secondary" />
                <Btn label="New Booking" icon={Icons.plus} />
            </PageHeader>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <StatCard label="Total Bookings" value="156" change="12%" up sparkData={[20, 25, 22, 30, 28, 35, 32, 40]} color="#2563eb" />
                <StatCard label="Active Sessions" value="12" change="8%" up sparkData={[10, 12, 11, 14, 13, 15, 14, 16]} color="#059669" />
                <StatCard label="Revenue" value="$4,280" change="18%" up sparkData={[15, 18, 16, 22, 20, 25, 23, 30]} color="#2563eb" />
                <StatCard label="Completion Rate" value="94%" change="2%" up sparkData={[90, 92, 91, 93, 92, 94, 93, 95]} color="#2563eb" />
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Card noPad>
                        <div style={{ padding: '28px 28px 0' }}>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <div style={{ flex: '1 1 300px' }}>
                                    <Input value={search} onChange={setSearch} placeholder="Search by Booking ID, Service, or Customer..." suffix={Icons.search} />
                                </div>
                                <div style={{ flex: '1 1 200px' }}>
                                    <Select value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled']} />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 8px 8px' }}>
                            <Table cols={['Booking ID', 'Service', 'Date/Time', 'Customer', 'Location', 'Status', 'Actions']} rows={rows} />
                        </div>
                        <Pagination total={filtered.length} page={1} perPage={10} onPage={() => {}} />
                    </Card>
                </div>

                {selected && (
                    <div style={{ flex: '1 1 350px', width: '100%', maxWidth: '400px' }}>
                        <Card style={{ position: 'sticky', top: '80px', animation: 'slideInRight 0.3s cubic' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <h4 style={{ fontWeight: 800, fontSize: '20px', color: '#0f172a', margin: '0 0 4px' }}>Booking {selected.id}</h4>
                                    <p style={{ fontSize: '13px', color: '#64748b' }}>Submitted on Oct 12, 2026</p>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ border: 'none', background: '#f8fafc', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Customer</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.customer}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Service</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.service}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Date</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.date}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Time</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selected.time}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                                    <span style={{ fontSize: '13px', color: '#64748b' }}>Location Address</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{selected.location}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Workflow State</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map(s => (
                                    <button key={s} style={{ padding: '12px 16px', borderRadius: '10px', border: `1px solid ${selected.status === s ? '#2563eb' : '#e2e8f0'}`, background: selected.status === s ? '#eff6ff' : '#fff', color: selected.status === s ? '#2563eb' : '#475569', fontWeight: 600, fontSize: '14px', textAlign: 'left', cursor: 'pointer' }}>
                                        {s}
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
