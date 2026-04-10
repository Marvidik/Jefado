'use client';
import { useState } from 'react';
import { Card, PageHeader, Pagination, Table, Input, Select, Btn, Drawer, Badge } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const INITIAL_PRODUCTS = [
    { id: '1', name: 'Analog Table Clock', category: 'Decor', stock: 42, price: 126.91, status: 'In Stock' },
    { id: '2', name: 'Basket with handles', category: 'Storage', stock: 15, price: 185.41, status: 'Low Stock' },
    { id: '3', name: 'Flower vase', category: 'Decor', stock: 85, price: 57.63, status: 'In Stock' },
    { id: '4', name: 'Deco accessory', category: 'Accessories', stock: 0, price: 337.75, status: 'Out of Stock' },
    { id: '5', name: 'Sony WH-1000XM5', category: 'Audio', stock: 124, price: 279.00, status: 'In Stock' },
    { id: '6', name: 'MacBook Pro 14"', category: 'Laptops', stock: 8, price: 1999.00, status: 'Low Stock' },
    { id: '7', name: 'Nike Air Max 90', category: 'Footwear', stock: 34, price: 120.00, status: 'In Stock' },
    { id: '8', name: 'iPhone 15 Pro Max', category: 'Smartphones', stock: 56, price: 1099.00, status: 'In Stock' },
];

export default function ProductsPage() {
    // Data State
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    
    // Filters & Pagination State
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [page, setPage] = useState(1);
    const PER = 6;

    // Drawer State
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', category: 'Decor', stock: '0', price: '0', status: 'In Stock' });

    const handleEdit = (product: any) => {
        setEditingId(product.id);
        setFormData({ name: product.name, category: product.category, stock: product.stock.toString(), price: product.price.toString(), status: product.status });
        setDrawerOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ name: '', category: 'Decor', stock: '0', price: '0', status: 'In Stock' });
        setDrawerOpen(true);
    };

    // Handle Form Submission
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setProducts(products.map(p => p.id === editingId ? { ...p, name: formData.name, category: formData.category, stock: parseInt(formData.stock) || 0, price: parseFloat(formData.price) || 0, status: formData.status } : p));
        } else {
            const newProduct = {
                id: Date.now().toString(),
                name: formData.name,
                category: formData.category,
                stock: parseInt(formData.stock) || 0,
                price: parseFloat(formData.price) || 0,
                status: formData.status
            };
            setProducts([newProduct, ...products]);
        }
        setDrawerOpen(false);
    };

    // Derived State
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
        const matchesCat = catFilter === 'All Categories' || p.category === catFilter;
        const matchesStatus = statusFilter === 'All Statuses' || p.status === statusFilter;
        return matchesSearch && matchesCat && matchesStatus;
    });
    
    const paged = filtered.slice((page - 1) * PER, page * PER);

    const rows = paged.map(p => [
        <div key="p" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
               {Icons.products}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{p.name}</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>ID: #{p.id.slice(0,6)}</span>
            </div>
        </div>,
        <span key="cat" style={{ color: '#475569', fontWeight: 500 }}>{p.category}</span>,
        <span key="st" style={{ fontWeight: 700, color: p.stock > 10 ? '#059669' : p.stock > 0 ? '#d97706' : '#dc2626' }}>
            {p.stock}
        </span>,
        <span key="pr" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>${p.price.toFixed(2)}</span>,
        <Badge key="stat" status={p.status} />,
        <div key="a" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button onClick={() => handleEdit(p)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#10b981'; e.currentTarget.style.background = '#ecfdf5';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.edit}</button>
            <button onClick={() => setProducts(products.filter(pr => pr.id !== p.id))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px' }} onMouseEnter={e => {e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = '#fef2f2';}} onMouseLeave={e => {e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent';}}>{Icons.trash}</button>
        </div>
    ]);

    const categories = ['All Categories', ...Array.from(new Set(products.map(p => p.category)))];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Products" subtitle="Manage your inventory, pricing, and visibility.">
                <Btn label="Export" icon={Icons.search} variant="secondary" />
                <Btn label="Add Product" icon={Icons.plus} onClick={handleOpenAdd} />
            </PageHeader>
            
            <Card style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <Input value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search products by name or category..." suffix={Icons.search} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={catFilter} onChange={v => { setCatFilter(v); setPage(1); }} options={categories} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <Select value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} options={['All Statuses', 'In Stock', 'Low Stock', 'Out of Stock']} />
                    </div>
                </div>
            </Card>
            
            <Card noPad>
                <div style={{ padding: '8px' }}>
                    <Table cols={['Product', 'Category', 'Stock', 'Price', 'Status', 'Actions']} rows={rows} />
                </div>
                <Pagination total={filtered.length} page={page} perPage={PER} onPage={setPage} />
            </Card>

            <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} title={editingId ? "Edit Product" : "Add New Product"} maxWidth="860px">
                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                    <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Basic Details</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input label="Product Name" required value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="e.g. Wireless Headphones" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Product Description</label>
                                    <textarea rows={5} placeholder="The product description delivers..." style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', background: '#f8fafc', resize: 'vertical' }} />
                                </div>
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Pricing</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <Input type="number" label="Product Price" required value={formData.price} onChange={v => setFormData({ ...formData, price: v })} placeholder="0.00" />
                                <Input type="number" label="Discounted Price (Optional)" placeholder="0.00" />
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Inventory</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <Input type="number" label="Stock Quantity" required value={formData.stock} onChange={v => setFormData({ ...formData, stock: v })} placeholder="0" />
                                <Select label="Stock Status" required value={formData.status} onChange={v => setFormData({ ...formData, status: v })} options={['In Stock', 'Low Stock', 'Out of Stock']} />
                            </div>
                        </Card>
                    </div>
                    
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Upload Product Image</h3>
                            <div style={{ width: '100%', height: '180px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', transition: 'border 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#10b981'} onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                                <span style={{ fontSize: '32px', marginBottom: '8px' }}>📸</span>
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>Click to upload image</span>
                                <span style={{ fontSize: '12px' }}>PNG, JPG up to 5MB</span>
                            </div>
                        </Card>

                        <Card style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Categories</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Select label="Product Categories" required value={formData.category} onChange={v => setFormData({ ...formData, category: v })} options={['Decor', 'Storage', 'Accessories', 'Audio', 'Laptops', 'Footwear', 'Smartphones']} />
                                <Select label="Product Tag" options={['Select your tag', 'New Arrival', 'Featured', 'Sale']} />
                            </div>
                        </Card>
                    </div>

                    <div style={{ width: '100%', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '24px', borderTop: '1px solid #e2e8f0', marginTop: 'auto', background: '#fff', position: 'sticky', bottom: '-32px', paddingBottom: '32px', zIndex: 10 }}>
                        <Btn label="Cancel" variant="secondary" onClick={() => setDrawerOpen(false)} />
                        <Btn label={editingId ? "Update Product" : "Publish Product"} submit />
                    </div>
                </form>
            </Drawer>
        </div>
    );
}