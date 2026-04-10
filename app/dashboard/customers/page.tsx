'use client';
import { useState } from 'react';
import { Badge, Card, PageHeader, Pagination, Table, Input, Select, Btn, SectionHead } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const DATA = [
    { name: 'Alice Johnson', email: 'alice@email.com', orders: 8, spent: 2450, last: 'Apr 1', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@email.com', orders: 5, spent: 4210, last: 'Mar 31', status: 'Active' },
    { name: 'Carol White', email: 'carol@email.com', orders: 12, spent: 1890, last: 'Mar 30', status: 'Active' },
    { name: 'David Brown', email: 'david@email.com', orders: 3, spent: 3150, last: 'Mar 29', status: 'Active' },
    { name: 'Eva Martinez', email: 'eva@email.com', orders: 1, spent: 899, last: 'Mar 28', status: 'Pending' },
    { name: 'Frank Lee', email: 'frank@email.com', orders: 7, spent: 5420, last: 'Mar 27', status: 'Active' },
    { name: 'Grace Kim', email: 'grace@email.com', orders: 4, spent: 1260, last: 'Mar 26', status: 'Active' },
    { name: 'Henry Adams', email: 'henry@email.com', orders: 2, spent: 680, last: 'Mar 25', status: 'Active' },
];

export default function CustomersPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const PER = 6;
    
    const filtered = DATA.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All Statuses' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });
    
    const paged = filtered.slice((page - 1) * PER, page * PER);

    const rows = paged.map(c => [
        <div key="c" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>{c.name[0]}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{c.name}</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{c.email}</span>
            </div>
        </div>,
        <span key="o" style={{ fontWeight: 600, color: '#334155' }}>{c.orders}</span>,
        <span key="sp" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px', color: '#059669' }}>${c.spent.toLocaleString()}</span>,
        <span key="l" style={{ color: '#64748b', fontWeight: 500 }}>{c.last}</span>,
        <Badge key="s" status={c.status} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.search}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.trash}</button>
        </div>
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Customers" subtitle="Manage your audience and understand their spending habits.">
                <Btn label="Export List" variant="secondary" />
                <Btn label="Add Customer" icon={Icons.plus} />
            </PageHeader>
            
            <Card style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search customers by name or email..." suffix={Icons.search} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} options={['All Statuses', 'Active', 'Pending']} />
                    </div>
                </div>
            </Card>
            
            <Card noPad>
                <div style={{ padding: '28px 28px 0' }}>
                    <SectionHead title="Customer Directory" />
                </div>
                <div style={{ padding: '0 8px 8px' }}>
                    <Table cols={['Customer', 'Orders', 'Total Spent', 'Last Order', 'Status', 'Actions']} rows={rows} />
                </div>
                <Pagination total={filtered.length} page={page} perPage={PER} onPage={setPage} />
            </Card>

            <div style={{ textAlign: 'center', padding: '24px 0', fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                eCommerce Platform © 2026. All rights reserved. Designed to look futuristic.
            </div>
        </div>
    );
}