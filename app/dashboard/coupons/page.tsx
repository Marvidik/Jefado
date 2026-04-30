'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, PageHeader, Btn, Input, Select, Drawer } from '@/components/dashboard/ui';
import { useToast } from '@/components/ui/Toast';
import { Icons } from '@/components/dashboard/icons';
import { getCoupons, createCoupon, patchCoupon, deleteCoupon } from '@/services/sellerService';
import { Coupon } from '@/services/types';

export default function CouponsPage() {
    const { success, error: toastError } = useToast();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        code: '',
        discount_type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED',
        discount_value: '',
        usage_limit: '100',
        expiry_date: '',
    });

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const data = await getCoupons();
            setCoupons(data);
        } catch (err) {
            console.error('Failed to fetch coupons:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setForm({
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            usage_limit: coupon.usage_limit.toString(),
            expiry_date: coupon.expiry_date ? coupon.expiry_date.split('T')[0] : '',
        });
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingCoupon(null);
        setForm({
            code: '',
            discount_type: 'PERCENTAGE',
            discount_value: '',
            usage_limit: '100',
            expiry_date: '',
        });
        setDrawerOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        try {
            await deleteCoupon(id);
            fetchCoupons();
            success('Coupon deleted successfully.');
        } catch (err) {
            toastError('Failed to delete coupon');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...form,
                usage_limit: parseInt(form.usage_limit) || 0,
            };

            if (editingCoupon) {
                await patchCoupon(editingCoupon.id, payload);
            } else {
                await createCoupon(payload);
            }
            setDrawerOpen(false);
            fetchCoupons();
            success(`Coupon ${editingCoupon ? 'updated' : 'created'} successfully.`);
        } catch (err) {
            toastError('Failed to save coupon');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Coupon Management" subtitle="Manage and create discount coupons for your customers.">
                <Btn label="Refresh" variant="secondary" onClick={fetchCoupons} />
                <Btn label="Create Coupon" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>

            <Card noPad>
                <div style={{ padding: '8px', minHeight: loading ? '300px' : 'auto', position: 'relative' }}>
                    {loading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Refreshing Coupons...</div>
                        </div>
                    )}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8edf2' }}>
                                    {['Code', 'Type', 'Value', 'Used / Limit', 'Expires', 'Status', 'Actions'].map(h => (
                                        <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(c => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.12s' }}>
                                        <td style={{ padding: '13px 16px', fontWeight: 800, color: '#2563eb', letterSpacing: '0.5px' }}>{c.code}</td>
                                        <td style={{ padding: '13px 16px', color: '#64748b' }}>{c.discount_type}</td>
                                        <td style={{ padding: '13px 16px', fontWeight: 700, color: '#0f172a' }}>{c.discount_type === 'PERCENTAGE' ? `${c.discount_value}%` : `₦${parseFloat(c.discount_value).toLocaleString()}`}</td>
                                        <td style={{ padding: '13px 16px', color: '#64748b' }}>{c.used_count} / {c.usage_limit}</td>
                                        <td style={{ padding: '13px 16px', color: '#94a3b8', fontSize: '12px' }}>{new Date(c.expiry_date).toLocaleDateString()}</td>
                                        <td style={{ padding: '13px 16px' }}><Badge status={c.status === 'Active' ? 'Active' : 'Completed'} label={c.status} /></td>
                                        <td style={{ padding: '13px 16px' }}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={() => handleEdit(c)} style={{ color: '#2563eb', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                                                <button onClick={() => handleDelete(c.id)} style={{ color: '#dc2626', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!loading && coupons.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>No coupons found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} title={editingCoupon ? "Edit Coupon" : "Add New Coupon"} maxWidth="600px">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Coupon Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Input label="Coupon Code" value={form.code} onChange={v => setForm({ ...form, code: v.toUpperCase() })} placeholder="e.g. SUMMER2026" required />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <Select label="Discount Type" value={form.discount_type} onChange={v => setForm({ ...form, discount_type: v as any })} options={['PERCENTAGE', 'FIXED']} />
                                <Input label="Value" type="text" value={form.discount_value} onChange={v => setForm({ ...form, discount_value: v })} placeholder={form.discount_type === 'PERCENTAGE' ? "e.g. 20 (for 20%)" : "e.g. 1500 (for ₦1,500)"} required />
                            </div>
                        </div>
                    </Card>

                    <Card style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Usage & Expiry</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <Input label="Usage Limit" value={form.usage_limit} onChange={v => setForm({ ...form, usage_limit: v })} placeholder="e.g. 100" type="number" />
                            <Input label="Expiry Date" value={form.expiry_date} onChange={v => setForm({ ...form, expiry_date: v })} type="date" required />
                        </div>
                    </Card>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
                        <Btn label="Cancel" variant="secondary" onClick={() => setDrawerOpen(false)} />
                        <Btn label={submitting ? "Saving..." : editingCoupon ? "Save Changes" : "Create Coupon"} submit disabled={submitting || !form.code || !form.discount_value} />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}