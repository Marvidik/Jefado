'use client';
import { useState, useEffect, useRef } from 'react';
import { Card, PageHeader, Pagination, Table, Input, Select, Btn, Drawer, Badge } from '@/components/dashboard/ui';
import { useToast } from '@/components/ui/Toast';
import { Icons } from '@/components/dashboard/icons';
import { getSellerServices, createSellerService, updateSellerService, deleteSellerService, getPublicCategories } from '@/services/sellerService';
import { Service, Category } from '@/services/types';

export default function ServicesManagementPage() {
    const { success, error: toastError } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const PER = 10;

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({ 
        name: '', 
        description: '',
        price: '', 
        original: '',
        status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED', 
        emoji: '✨',
        category: '',
        image: ''
    });

    const fetchCategories = async () => {
        try {
            const data = await getPublicCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const fetchServices = async () => {
        setLoading(true);
        try {
            const params: any = { 
                page, 
                page_size: PER, 
                search: search || undefined,
                status: statusFilter === 'All Statuses' ? undefined : statusFilter
            };
            const response = await getSellerServices(params);
            const actualData = (response as any).data || response;
            setServices(actualData.results || []);
            setTotalCount(actualData.count || 0);
        } catch (err) {
            console.error('Failed to fetch services:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchServices();
    }, [page, search, statusFilter]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            
            if (!cloudName || !preset) {
                throw new Error('Cloudinary configuration missing in environment variables.');
            }

            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', preset);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            
            const result = await res.json();
            if (result.secure_url) {
                setFormData(prev => ({ ...prev, image: result.secure_url }));
                success('Service image uploaded successfully.');
            } else {
                throw new Error(result.error?.message || 'Upload failed');
            }
        } catch (err: any) {
            console.error('Cloudinary upload error:', err);
            toastError(err.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({ 
            name: service.name, 
            description: service.description || '',
            price: service.price, 
            original: service.original || service.price,
            status: service.status as any, 
            emoji: service.emoji || '✨',
            category: service.category?.toString() || '',
            image: service.image || ''
        });
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingService(null);
        setFormData({ 
            name: '', 
            description: '',
            price: '', 
            original: '',
            status: 'PUBLISHED', 
            emoji: '✨',
            category: '',
            image: ''
        });
        setDrawerOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await deleteSellerService(id);
            fetchServices();
            success('Service deleted successfully.');
        } catch (err) {
            toastError('Failed to delete service');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.category) {
            toastError('Please select a category.');
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                original: "0", // Default original price to zero as requested
                duration: 0,
                review_count: 0,
                category: parseInt(formData.category),
            };

            if (editingService) {
                await updateSellerService(editingService.id, payload);
            } else {
                await createSellerService(payload);
            }
            setDrawerOpen(false);
            fetchServices();
            success(`Service ${editingService ? 'updated' : 'published'} successfully.`);
        } catch (err) {
            toastError('Failed to save service');
        } finally {
            setSubmitting(false);
        }
    };

    const rows = services.map(s => {
        const catName = categories.find(c => c.id === Number(s.category))?.name || (s.category ? `ID: ${s.category}` : 'General');
        return [
            <div key="s" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {s.image ? <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : s.emoji || '🛠️'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{s.name}</span>
                    <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>ID: #{s.id}</span>
                </div>
            </div>,
            <span key="cat" style={{ color: '#475569', fontWeight: 500 }}>{catName}</span>,
            <span key="pr" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>₦{parseFloat(s.price).toLocaleString()}</span>,
            <Badge key="stat" status={s.status === 'PUBLISHED' ? 'Active' : 'Draft'} label={s.status === 'PUBLISHED' ? 'Published' : 'Draft'} />,
            <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                <button onClick={() => handleEdit(s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.background = '#eff6ff';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
            </div>
        ];
    });

    const categoryOptions = categories.map(c => ({
        value: c.id.toString(),
        label: c.name
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Services Catalog" subtitle="Manage your professional service offerings and appointment bookings.">
                <Btn label="Refresh" variant="secondary" onClick={fetchServices} />
                <Btn label="Add Service" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>
            
            <Card style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search services by identity..." suffix={Icons.search} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} options={['All Statuses', 'PUBLISHED', 'DRAFT']} />
                    </div>
                </div>
            </Card>
            
            <Card noPad>
                <div style={{ padding: '8px', minHeight: loading ? '400px' : 'auto', position: 'relative' }}>
                    {loading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Updating Catalog...</div>
                        </div>
                    )}
                    <Table cols={['Service', 'Category', 'Base Price', 'Status', 'Actions']} rows={rows} />
                    {!loading && services.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🛠️</div>
                            <h3 style={{ fontWeight: 700, color: '#0f172a' }}>No Services Listed</h3>
                            <p style={{ fontSize: '14px' }}>Begin by listing your professional services for Jefedo clients.</p>
                        </div>
                    )}
                </div>
                <Pagination total={totalCount} page={page} perPage={PER} onPage={setPage} />
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} title={editingService ? "Update Service" : "Publish New Service"} maxWidth="640px">
                <div style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: '4px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Service Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input label="Service Name" required value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Master Class Consulting" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Description</label>
                                    <textarea rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the service in detail..." style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} />
                                </div>
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Visual Media</h3>
                                {editingService && <Badge status="Completed" label="Locked" />}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleUpload} style={{ display: 'none' }} accept="image/*" />
                            <div 
                                onClick={() => !editingService && fileInputRef.current?.click()}
                                style={{ 
                                    width: '100%', 
                                    height: '180px', 
                                    background: '#f8fafc', 
                                    border: '2px dashed #cbd5e1', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#64748b', 
                                    cursor: editingService ? 'not-allowed' : 'pointer', 
                                    transition: 'all 0.2s', 
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                {uploading && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>Uploading to Cloudinary...</div>
                                    </div>
                                )}
                                {formData.image ? (
                                    <>
                                        <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        {!editingService && (
                                            <button 
                                                type="button" 
                                                onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: '' }); }}
                                                style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', zIndex: 10 }}
                                            >✕</button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700 }}>Upload Cover Image</span>
                                        <span style={{ fontSize: '11px' }}>Standard PNG/JPG formats</span>
                                    </>
                                )}
                            </div>
                            {editingService && (
                                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', fontStyle: 'italic' }}>
                                    Images are managed via Cloudinary and cannot be updated after publication.
                                </p>
                            )}
                            <div style={{ marginTop: '16px' }}>
                                <Input label="Secondary Visual (Emoji)" value={formData.emoji} onChange={v => setFormData({ ...formData, emoji: v })} placeholder="✂️" />
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Valuation & Classification</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <Input type="text" label="Base Price (₦)" required value={formData.price} onChange={v => setFormData({ ...formData, price: v })} placeholder="0.00" />
                                <Select label="Listing Status" required value={formData.status} onChange={v => setFormData({ ...formData, status: v as any })} options={['PUBLISHED', 'DRAFT']} />
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <Select label="Service Category" required value={formData.category} onChange={v => setFormData({ ...formData, category: v })} options={categoryOptions} />
                            </div>
                        </Card>

                        <div style={{ width: '100%', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '24px', borderTop: '1px solid #e2e8f0', background: '#fff', position: 'sticky', bottom: '-40px', paddingBottom: '40px', zIndex: 10 }}>
                            <Btn label="Cancel" variant="secondary" onClick={() => setDrawerOpen(false)} />
                            <Btn label={submitting ? "Saving..." : editingService ? "Save Changes" : "Publish Service"} submit disabled={submitting || uploading} />
                        </div>
                    </form>
                </div>
            </Drawer>
        </div>
    );
}
