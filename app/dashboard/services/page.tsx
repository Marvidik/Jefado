'use client';
import { useState } from 'react';
import { Card, PageHeader, Pagination, Table, Input, Select, Btn, Drawer, Badge } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const INITIAL_SERVICES = [
    { id: '1', name: 'Professional Mobile Barbering', category: 'Personal Care', price: 35.00, status: 'Active', emoji: '✂️' },
    { id: '2', name: 'Full House Deep Cleaning', category: 'Cleaning', price: 120.00, status: 'Active', emoji: '🧹' },
    { id: '3', name: 'Personal Fitness Training', category: 'Health', price: 50.00, status: 'Inactive', emoji: '🏋️' },
    { id: '4', name: 'PC Repair & Diagnostic', category: 'Tech Support', price: 75.00, status: 'Active', emoji: '💻' },
    { id: '5', name: 'Custom Brand Identity', category: 'Design', price: 450.00, status: 'Active', emoji: '🎨' },
];

export default function ServicesManagementPage() {
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const PER = 6;

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', category: 'Personal Care', price: '0', status: 'Active', emoji: '✨' });

    const handleEdit = (service: any) => {
        setEditingId(service.id);
        setFormData({ name: service.name, category: service.category, price: service.price.toString(), status: service.status, emoji: service.emoji });
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ name: '', category: 'Personal Care', price: '0', status: 'Active', emoji: '✨' });
        setDrawerOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setServices(services.map(s => s.id === editingId ? { ...s, name: formData.name, category: formData.category, price: parseFloat(formData.price) || 0, status: formData.status, emoji: formData.emoji } : s));
        } else {
            const newService = {
                id: Date.now().toString(),
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price) || 0,
                status: formData.status,
                emoji: formData.emoji
            };
            setServices([newService, ...services]);
        }
        setDrawerOpen(false);
    };

    const filtered = services.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
        const matchesCat = catFilter === 'All Categories' || s.category === catFilter;
        const matchesStatus = statusFilter === 'All Statuses' || s.status === statusFilter;
        return matchesSearch && matchesCat && matchesStatus;
    });

    const paged = filtered.slice((page - 1) * PER, page * PER);

    const rows = paged.map(s => [
        <div key="s" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #e2e8f0' }}>
               {s.emoji}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{s.name}</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>ID: #{s.id.slice(0,6)}</span>
            </div>
        </div>,
        <span key="cat" style={{ color: '#475569', fontWeight: 500 }}>{s.category}</span>,
        <span key="pr" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>${s.price.toFixed(2)}</span>,
        <Badge key="stat" status={s.status === 'Active' ? 'In Stock' : 'Out of Stock'} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button onClick={() => handleEdit(s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#10b981'; e.currentTarget.style.background = '#ecfdf5';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
            <button onClick={() => setServices(services.filter(srv => srv.id !== s.id))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = '#fef2f2';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.trash}</button>
        </div>
    ]);

    const categories = ['All Categories', ...Array.from(new Set(services.map(s => s.category)))];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Services Master" subtitle="Manage your professional service offerings and bookings.">
                <Btn label="Add Service" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>
            
            <Card style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search services..." suffix={Icons.search} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={catFilter} onChange={v => { setCatFilter(v); setPage(1); }} options={categories} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} options={['All Statuses', 'Active', 'Inactive']} />
                    </div>
                </div>
            </Card>
            
            <Card noPad>
                <div style={{ padding: '8px' }}>
                    <Table cols={['Service', 'Category', 'Base Price', 'Status', 'Actions']} rows={rows} />
                </div>
                <Pagination total={filtered.length} page={page} perPage={PER} onPage={setPage} />
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} title={editingId ? "Edit Service" : "Add New Service"} maxWidth="600px">
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Service Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Input label="Service Name" required value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Professional Barbering" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <Select label="Category" value={formData.category} onChange={v => setFormData({ ...formData, category: v })} options={['Personal Care', 'Cleaning', 'Health', 'Tech Support', 'Design']} />
                                <Input label="Icon/Emoji" value={formData.emoji} onChange={v => setFormData({ ...formData, emoji: v })} placeholder="✂️" />
                            </div>
                        </div>
                    </Card>

                    <Card style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Pricing & Visibility</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <Input type="number" label="Base Price ($)" required value={formData.price} onChange={v => setFormData({ ...formData, price: v })} placeholder="0.00" />
                            <Select label="Status" value={formData.status} onChange={v => setFormData({ ...formData, status: v })} options={['Active', 'Inactive']} />
                        </div>
                    </Card>

                    <div style={{ width: '100%', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                        <Btn label="Cancel" variant="secondary" onClick={() => setDrawerOpen(false)} />
                        <Btn label={editingId ? "Update Service" : "Add Service"} submit />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}
