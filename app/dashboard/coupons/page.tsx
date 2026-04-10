'use client';
import { useState } from 'react';
import { Badge, Card, PageHeader, Btn, Input, Select, Drawer } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const COUPONS = [
    { id: 'c1', code: 'SAVE10', type: 'Percentage', value: '10', used: 42, limit: 100, expires: '2026-05-01', status: 'Active' },
    { id: 'c2', code: 'JEFADO20', type: 'Percentage', value: '20', used: 18, limit: 50, expires: '2026-04-15', status: 'Active' },
    { id: 'c3', code: 'WELCOME15', type: 'Percentage', value: '15', used: 89, limit: 200, expires: '2026-06-01', status: 'Active' },
    { id: 'c4', code: 'FLAT50', type: 'Fixed Amount', value: '50', used: 5, limit: 20, expires: '2026-04-10', status: 'Active' },
    { id: 'c5', code: 'SUMMER30', type: 'Percentage', value: '30', used: 200, limit: 200, expires: '2026-03-31', status: 'Completed' },
];

export default function CouponsPage() {
    const [coupons, setCoupons] = useState(COUPONS);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ code: '', type: 'Percentage', value: '', limit: '', expires: '', status: 'Active' });

    const handleEdit = (coupon: any) => {
        setEditingId(coupon.id);
        setForm({ code: coupon.code, type: coupon.type, value: coupon.value, limit: coupon.limit.toString(), expires: coupon.expires, status: coupon.status });
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setForm({ code: '', type: 'Percentage', value: '', limit: '', expires: '', status: 'Active' });
        setDrawerOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setCoupons(coupons.map(c => c.id === editingId ? { ...c, ...form, limit: parseInt(form.limit) || 0, used: c.used } : c));
        } else {
            const newCoupon = {
                id: Date.now().toString(),
                ...form,
                used: 0,
                limit: parseInt(form.limit) || 0,
            };
            setCoupons([newCoupon, ...coupons]);
        }
        setDrawerOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Coupons" subtitle="Create and manage discount codes">
                <Btn label="Create Coupon" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>
            
            <Card noPad>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf2' }}>
                                {['Code', 'Type', 'Value', 'Used / Limit', 'Expires', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(c => (
                                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.12s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#f8fafc'}
                                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                                >
                                    <td style={{ padding: '13px 16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#2563eb', letterSpacing: '0.5px' }}>{c.code}</td>
                                    <td style={{ padding: '13px 16px', color: '#64748b' }}>{c.type}</td>
                                    <td style={{ padding: '13px 16px', fontWeight: 700, color: '#0f172a' }}>{c.type === 'Percentage' ? `${c.value}%` : `$${c.value}`}</td>
                                    <td style={{ padding: '13px 16px', color: '#64748b' }}>{c.used} / {c.limit}</td>
                                    <td style={{ padding: '13px 16px', color: '#94a3b8', fontSize: '12px' }}>{c.expires}</td>
                                    <td style={{ padding: '13px 16px' }}><Badge status={c.status} /></td>
                                    <td style={{ padding: '13px 16px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => handleEdit(c)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: '#2563eb', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{Icons.edit} Edit</button>
                                            <button onClick={() => setCoupons(coupons.filter(pr => pr.id !== c.id))} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: '#dc2626', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{Icons.trash} Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} title={editingId ? "Edit Coupon" : "Create New Coupon"} maxWidth="600px">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card style={{ padding: '24px' }}>
                         <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Coupon Intelligence</h3>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                             <Input label="Coupon Code" value={form.code} onChange={v => setForm({ ...form, code: v })} placeholder="e.g. SUMMER20" required />
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                 <Select label="Discount Type" value={form.type} onChange={v => setForm({ ...form, type: v })} options={['Percentage', 'Fixed Amount']} />
                                 <Input label="Discount Value" type="number" value={form.value} onChange={v => setForm({ ...form, value: v })} placeholder={form.type === 'Percentage' ? "e.g. 20 (for 20%)" : "e.g. 50 (for $50)"} required />
                             </div>
                         </div>
                    </Card>

                    <Card style={{ padding: '24px' }}>
                         <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Usage & Expiration</h3>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                             <Input label="Usage Limit" value={form.limit} onChange={v => setForm({ ...form, limit: v })} placeholder="e.g. 100" type="number" />
                             <Input label="Expiry Date" value={form.expires} onChange={v => setForm({ ...form, expires: v })} type="date" required />
                         </div>
                    </Card>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e2e8f0', background: '#fff', position: 'sticky', bottom: '-32px', paddingBottom: '32px', zIndex: 10 }}>
                        <Btn label="Cancel" variant="secondary" onClick={() => setDrawerOpen(false)} />
                        <Btn label={editingId ? "Update Coupon" : "Create Coupon"} submit disabled={!form.code || !form.value} />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}