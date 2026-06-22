'use client';
import { useState, useEffect, useRef } from 'react';
import { Card, PageHeader, Pagination, Table, Input, Select, Btn, Drawer, Badge } from '@/components/dashboard/ui';
import { useToast } from '@/components/ui/Toast';
import { Icons } from '@/components/dashboard/icons';
import { getSellerProducts, createSellerProduct, updateSellerProduct, deleteSellerProduct, getPublicCategories } from '@/services/sellerService';
import { Product, Category } from '@/services/types';

export default function ProductsPage() {
    const { success, error: toastError } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    
    // Filters & Pagination State
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const PER = 10;

    // Drawer State
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const [formData, setFormData] = useState({ 
        name: '', 
        description: '',
        price: '', 
        original: '',
        stock_qty: '0', 
        status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED',
        category: '',
        image: '',
        image2: '',
        image3: '',
        image4: ''
    });

    const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([]);

    const addSpecification = () => {
        setSpecifications(prev => [...prev, { key: '', value: '' }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(prev => prev.filter((_, i) => i !== index));
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
        setSpecifications(prev => prev.map((spec, i) => i === index ? { ...spec, [field]: val } : spec));
    };

    const fetchCategories = async () => {
        try {
            const data = await getPublicCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = { 
                page, 
                page_size: PER,
                search: search || undefined,
                status: statusFilter === 'All Statuses' ? undefined : statusFilter
            };
            const response = await getSellerProducts(params);
            const actualData = (response as any).data || response;
            setProducts(actualData.results || []);
            setTotalCount(actualData.count || 0);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [page, search, statusFilter]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
    const [imagePreview2, setImagePreview2] = useState<string>('');
    const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
    const [imagePreview3, setImagePreview3] = useState<string>('');
    const [selectedFile4, setSelectedFile4] = useState<File | null>(null);
    const [imagePreview4, setImagePreview4] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, num: number = 1) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (num === 1) {
            setSelectedFile(file);
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(file));
        } else if (num === 2) {
            setSelectedFile2(file);
            if (imagePreview2) URL.revokeObjectURL(imagePreview2);
            setImagePreview2(URL.createObjectURL(file));
        } else if (num === 3) {
            setSelectedFile3(file);
            if (imagePreview3) URL.revokeObjectURL(imagePreview3);
            setImagePreview3(URL.createObjectURL(file));
        } else if (num === 4) {
            setSelectedFile4(file);
            if (imagePreview4) URL.revokeObjectURL(imagePreview4);
            setImagePreview4(URL.createObjectURL(file));
        }
    };

    const uploadFileToCloudinary = async (file: File): Promise<string> => {
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
            return result.secure_url;
        } else {
            throw new Error(result.error?.message || 'Upload failed');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({ 
            name: product.name, 
            description: product.description || '',
            price: product.price, 
            original: product.original || product.price,
            stock_qty: product.stock_qty.toString(), 
            status: product.status as any,
            category: product.category?.toString() || '',
            image: product.image || '',
            image2: product.image2 || '',
            image3: product.image3 || '',
            image4: product.image4 || ''
        });
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        if (imagePreview2) URL.revokeObjectURL(imagePreview2);
        if (imagePreview3) URL.revokeObjectURL(imagePreview3);
        if (imagePreview4) URL.revokeObjectURL(imagePreview4);
        setImagePreview('');
        setImagePreview2('');
        setImagePreview3('');
        setImagePreview4('');
        setSelectedFile(null);
        setSelectedFile2(null);
        setSelectedFile3(null);
        setSelectedFile4(null);
        if (product.specifications && typeof product.specifications === 'object') {
            setSpecifications(
                Object.entries(product.specifications).map(([key, value]) => ({ key, value: String(value) }))
            );
        } else {
            setSpecifications([]);
        }
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setFormData({ 
            name: '', 
            description: '',
            price: '', 
            original: '',
            stock_qty: '0', 
            status: 'PUBLISHED',
            category: '',
            image: '',
            image2: '',
            image3: '',
            image4: ''
        });
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        if (imagePreview2) URL.revokeObjectURL(imagePreview2);
        if (imagePreview3) URL.revokeObjectURL(imagePreview3);
        if (imagePreview4) URL.revokeObjectURL(imagePreview4);
        setImagePreview('');
        setImagePreview2('');
        setImagePreview3('');
        setImagePreview4('');
        setSelectedFile(null);
        setSelectedFile2(null);
        setSelectedFile3(null);
        setSelectedFile4(null);
        setSpecifications([]);
        setDrawerOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteSellerProduct(id);
            fetchProducts();
            success('Product deleted successfully.');
        } catch (err) {
            toastError('Failed to delete product');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const previewUrl = imagePreview || formData.image;
        if (!previewUrl) {
            toastError('Please select a product image first.');
            return;
        }
        if (!formData.category) {
            toastError('Please select a category.');
            return;
        }
        setSubmitting(true);
        try {
            let imageUrl = formData.image;
            let imageUrl2 = formData.image2;
            let imageUrl3 = formData.image3;
            let imageUrl4 = formData.image4;
            
            setUploading(true);
            try {
                if (selectedFile) imageUrl = await uploadFileToCloudinary(selectedFile);
                if (selectedFile2) imageUrl2 = await uploadFileToCloudinary(selectedFile2);
                if (selectedFile3) imageUrl3 = await uploadFileToCloudinary(selectedFile3);
                if (selectedFile4) imageUrl4 = await uploadFileToCloudinary(selectedFile4);
            } finally {
                setUploading(false);
            }

            const specsObj: Record<string, string> = {};
            specifications.forEach(spec => {
                if (spec.key.trim() && spec.value.trim()) {
                    specsObj[spec.key.trim()] = spec.value.trim();
                }
            });

            const payload = {
                ...formData,
                image: imageUrl,
                image2: imageUrl2,
                image3: imageUrl3,
                image4: imageUrl4,
                price: formData.price,
                original: formData.original || formData.price,
                stock_qty: parseInt(formData.stock_qty) || 0,
                category: parseInt(formData.category),
                specifications: Object.keys(specsObj).length > 0 ? specsObj : null
            };

            if (editingProduct) {
                await updateSellerProduct(editingProduct.id, payload);
            } else {
                await createSellerProduct(payload);
            }

            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (imagePreview2) URL.revokeObjectURL(imagePreview2);
            if (imagePreview3) URL.revokeObjectURL(imagePreview3);
            if (imagePreview4) URL.revokeObjectURL(imagePreview4);
            setImagePreview('');
            setImagePreview2('');
            setImagePreview3('');
            setImagePreview4('');
            setSelectedFile(null);
            setSelectedFile2(null);
            setSelectedFile3(null);
            setSelectedFile4(null);

            setDrawerOpen(false);
            fetchProducts();
            success(`Product ${editingProduct ? 'updated' : 'published'} successfully.`);
        } catch (err: any) {
            console.error('Save error:', err);
            toastError(err.message || 'Failed to save product');
        } finally {
            setSubmitting(false);
        }
    };

    const rows = products.map(p => {
        const catName = categories.find(c => c.id === Number(p.category))?.name || (p.category ? `ID: ${p.category}` : 'General');
        return [
            <div key="p" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : Icons.products}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{p.name}</span>
                    <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>ID: #{p.id}</span>
                </div>
            </div>,
            <span key="cat" style={{ color: '#475569', fontWeight: 500 }}>{catName}</span>,
            <span key="st" style={{ fontWeight: 700, color: p.stock_qty > 10 ? '#059669' : p.stock_qty > 0 ? '#d97706' : '#dc2626' }}>
                {p.stock_qty}
            </span>,
            <span key="pr" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>₦{parseFloat(p.price).toLocaleString()}</span>,
            <Badge key="stat" status={p.status === 'PUBLISHED' ? 'Active' : 'Draft'} label={p.status === 'PUBLISHED' ? 'Published' : 'Draft'} />,
            <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                <button onClick={() => handleEdit(p)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.background = '#eff6ff';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
                <button onClick={() => handleDelete(p.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = '#fef2f2';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.trash}</button>
            </div>
        ];
    });

    const categoryOptions = categories.map(c => ({
        value: c.id.toString(),
        label: c.name
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Product Catalog" subtitle="Manage your marketplace inventory and product listings for the Jefedo network.">
                <Btn label="Refresh" variant="secondary" onClick={fetchProducts} />
                <Btn label="Add Product" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>
            
            <Card style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search products by identity..." suffix={Icons.search} />
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
                    <Table cols={['Product', 'Category', 'Stock', 'Price', 'Status', 'Actions']} rows={rows} />
                    {!loading && products.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📦</div>
                            <h3 style={{ fontWeight: 700, color: '#0f172a' }}>Catalog Empty</h3>
                            <p style={{ fontSize: '14px' }}>You haven't added any products to your catalog yet.</p>
                        </div>
                    )}
                </div>
                <Pagination total={totalCount} page={page} perPage={PER} onPage={setPage} />
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                if (imagePreview2) URL.revokeObjectURL(imagePreview2);
                if (imagePreview3) URL.revokeObjectURL(imagePreview3);
                if (imagePreview4) URL.revokeObjectURL(imagePreview4);
                setImagePreview('');
                setImagePreview2('');
                setImagePreview3('');
                setImagePreview4('');
                setSelectedFile(null);
                setSelectedFile2(null);
                setSelectedFile3(null);
                setSelectedFile4(null);
                setDrawerOpen(false);
            }} title={editingProduct ? "Update Product" : "Publish New Product"} maxWidth="860px">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', paddingBottom: '40px' }}>
                    <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>General Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input label="Product Name" required value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Premium Leather Shoe" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Product Description</label>
                                    <textarea rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your product in detail..." style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} />
                                </div>
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Pricing & Inventory</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <Input type="text" label="Selling Price (₦)" required value={formData.price} onChange={v => setFormData({ ...formData, price: v })} placeholder="0.00" />
                                <Input type="number" label="Stock Quantity" required value={formData.stock_qty} onChange={v => setFormData({ ...formData, stock_qty: v })} placeholder="0" />
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Product Specifications</h3>
                                <button
                                    type="button"
                                    onClick={addSpecification}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--secondary)',
                                        fontWeight: 700,
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    + Add Item
                                </button>
                            </div>
                            
                            {specifications.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 500 }}>No specifications added yet.</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>Add key-value details like Color, Size, Material, etc.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {specifications.map((spec, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <Input
                                                    placeholder="Property (e.g. Color)"
                                                    value={spec.key}
                                                    onChange={v => handleSpecChange(idx, 'key', v)}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <Input
                                                    placeholder="Value (e.g. Matte Black)"
                                                    value={spec.value}
                                                    onChange={v => handleSpecChange(idx, 'value', v)}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeSpecification(idx)}
                                                style={{
                                                    background: '#fee2e2',
                                                    color: '#ef4444',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    width: '44px',
                                                    height: '44px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    fontSize: '16px',
                                                    flexShrink: 0,
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fca5a5'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                    
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
                        <Card style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Product Images</h3>
                                {editingProduct && <Badge status="Completed" label="Locked" />}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={e => handleFileChange(e, 1)} style={{ display: 'none' }} accept="image/*" />
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                style={{ 
                                    width: '100%', 
                                    height: '200px', 
                                    background: '#f8fafc', 
                                    border: '2px dashed #cbd5e1', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#64748b', 
                                    cursor: 'pointer', 
                                    transition: 'all 0.2s', 
                                    overflow: 'hidden',
                                    position: 'relative',
                                    marginBottom: '16px'
                                }}
                            >
                                {uploading && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>Uploading to Cloudinary...</div>
                                    </div>
                                )}
                                {imagePreview || formData.image ? (
                                    <>
                                        <img src={imagePreview || formData.image} alt="Preview 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button 
                                            type="button" 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                if (imagePreview) URL.revokeObjectURL(imagePreview); 
                                                setImagePreview(''); 
                                                setFormData({ ...formData, image: '' }); 
                                                setSelectedFile(null); 
                                            }}
                                            style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', zIndex: 10 }}
                                        >✕</button>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '32px', marginBottom: '8px' }}>📸</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700 }}>{uploading ? 'Uploading...' : 'Main Image'}</span>
                                        <span style={{ fontSize: '11px' }}>Primary product image</span>
                                    </>
                                )}
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {[2, 3, 4].map(num => {
                                    const imgPreview = num === 2 ? imagePreview2 : num === 3 ? imagePreview3 : imagePreview4;
                                    const imgData = num === 2 ? formData.image2 : num === 3 ? formData.image3 : formData.image4;
                                    return (
                                        <div key={num}>
                                            <input type="file" id={`file-input-${num}`} onChange={e => handleFileChange(e, num)} style={{ display: 'none' }} accept="image/*" />
                                            <div 
                                                onClick={() => document.getElementById(`file-input-${num}`)?.click()}
                                                style={{ 
                                                    width: '100%', 
                                                    aspectRatio: '1', 
                                                    background: '#f8fafc', 
                                                    border: '1.5px dashed #cbd5e1', 
                                                    borderRadius: '12px', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    color: '#94a3b8', 
                                                    cursor: 'pointer', 
                                                    overflow: 'hidden',
                                                    position: 'relative'
                                                }}
                                            >
                                                {imgPreview || imgData ? (
                                                    <>
                                                        <img src={imgPreview || imgData} alt={`Preview ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        <button 
                                                            type="button" 
                                                            onClick={(e) => {
                                                                e.stopPropagation(); 
                                                                if (imgPreview) URL.revokeObjectURL(imgPreview);
                                                                if (num === 2) { setImagePreview2(''); setFormData({ ...formData, image2: '' }); setSelectedFile2(null); }
                                                                else if (num === 3) { setImagePreview3(''); setFormData({ ...formData, image3: '' }); setSelectedFile3(null); }
                                                                else if (num === 4) { setImagePreview4(''); setFormData({ ...formData, image4: '' }); setSelectedFile4(null); }
                                                            }}
                                                            style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', zIndex: 10 }}
                                                        >✕</button>
                                                    </>
                                                ) : (
                                                    <span style={{ fontSize: '18px' }}>+</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '16px' }} />
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Status & Classification</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Select label="Listing Status" required value={formData.status} onChange={v => setFormData({ ...formData, status: v as any })} options={['PUBLISHED', 'DRAFT']} />
                                <Select label="Product Category" required value={formData.category} onChange={v => setFormData({ ...formData, category: v })} options={categoryOptions} />
                            </div>
                        </Card>
                    </div>

                    <div style={{ width: '100%', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '24px', borderTop: '1px solid #e2e8f0', marginTop: 'auto', background: '#fff', position: 'sticky', bottom: '-40px', paddingBottom: '40px', zIndex: 10 }}>
                        <Btn label="Cancel" variant="secondary" onClick={() => {
                            if (imagePreview) URL.revokeObjectURL(imagePreview);
                            if (imagePreview2) URL.revokeObjectURL(imagePreview2);
                            if (imagePreview3) URL.revokeObjectURL(imagePreview3);
                            if (imagePreview4) URL.revokeObjectURL(imagePreview4);
                            setImagePreview('');
                            setImagePreview2('');
                            setImagePreview3('');
                            setImagePreview4('');
                            setSelectedFile(null);
                            setSelectedFile2(null);
                            setSelectedFile3(null);
                            setSelectedFile4(null);
                            setDrawerOpen(false);
                        }} />
                        <Btn label={submitting ? "Saving..." : editingProduct ? "Save Changes" : "Publish Product"} submit disabled={submitting || uploading} />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}