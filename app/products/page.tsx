'use client';
import { useState, useMemo } from 'react';
import { ALL_PRODUCTS, CATEGORIES as GLOBAL_CATEGORIES, Product } from '@/lib/data';

const ALL_PRODS = ALL_PRODUCTS;

const BRANDS = [...new Set(ALL_PRODS.map(p => p.brand))].sort();
const CATEGORY_NAMES = [...new Set(ALL_PRODS.map(p => p.category))].sort();

const BRANDS_LIST = BRANDS;
const CATEGORIES_LIST = CATEGORY_NAMES;
const PRICE_RANGES = [
    { label: 'Under ₦100', min: 0, max: 100 },
    { label: '₦100 – ₦500', min: 100, max: 500 },
    { label: '₦500 – ₦1000', min: 500, max: 1000 },
    { label: 'Over ₦1000', min: 1000, max: Infinity },
];
const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'discount', label: 'Biggest Discount' },
];

interface Filters {
    brands: string[]; categories: string[];
    priceRange: { min: number; max: number } | null;
    minRating: number | null; inStockOnly: boolean;
}

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
    return <span style={{ display: 'inline-flex', gap: '1px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--secondary)' : '#e2e8f0' }}>★</span>)}</span>;
}

function MiniProductCard({ p }: { p: Product }) {
    const [added, setAdded] = useState(false);
    const [wish, setWish] = useState(false);
    return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-hover)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
        >
            <div style={{ position: 'relative', background: 'var(--surface-2)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="product-card-img" />
                <div style={{ position: 'absolute', top: '6px', left: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {p.discount && <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '3px' }}>-{p.discount}%</span>}
                    {p.isNew && <span style={{ background: 'var(--success)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '3px' }}>NEW</span>}
                    {p.isBestSeller && <span style={{ background: 'var(--warning)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '3px' }}>HOT</span>}
                </div>
                <button onClick={() => setWish(!wish)} style={{ position: 'absolute', top: '6px', right: '6px', width: '28px', height: '28px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: 'var(--shadow-sm)' }}>{wish ? '❤️' : '🤍'}</button>
                {!p.inStock && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>OUT OF STOCK</div>}
            </div>
            <div style={{ padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}><Stars rating={p.rating} /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({p.reviews.toLocaleString()})</span></div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--primary)' }}>₦{p.price}</span>
                        {p.originalPrice && <span style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₦{p.originalPrice}</span>}
                    </div>
                    {p.stockQuantity !== undefined && p.inStock && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: p.stockQuantity < 10 ? 'var(--danger)' : 'var(--success)' }}>
                            {p.stockQuantity} left
                        </span>
                    )}
                </div>
                <button disabled={!p.inStock} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }} style={{ width: '100%', padding: '7px', background: added ? 'var(--success)' : p.inStock ? 'var(--primary)' : 'var(--border)', color: p.inStock ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.2s', cursor: p.inStock ? 'pointer' : 'not-allowed' }}>
                    {added ? '✓ Added!' : '+ Add to Cart'}
                </button>
            </div>
        </div>
    );
}

function FilterSidebar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
    const toggle = (key: 'brands' | 'categories', val: string) => {
        const arr = filters[key];
        onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] });
    };
    const SectionHead = ({ title }: { title: string }) => (
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>{title}</h4>
    );
    return (
        <aside className="filter-sidebar" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '18px', alignSelf: 'flex-start', position: 'sticky', top: '80px', width: '220px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>Filters</h3>
                <button onClick={() => onChange({ brands: [], categories: [], priceRange: null, minRating: null, inStockOnly: false })} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Clear All</button>
            </div>

            {/* In Stock */}
            <div style={{ marginBottom: '20px' }}><SectionHead title="Availability" />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <input type="checkbox" checked={filters.inStockOnly} onChange={e => onChange({ ...filters, inStockOnly: e.target.checked })} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />In Stock Only
                </label>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '20px' }}><SectionHead title="Price Range" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {PRICE_RANGES.map(r => {
                        const active = filters.priceRange?.min === r.min && filters.priceRange?.max === r.max;
                        return (
                            <label key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: active ? 'var(--primary)' : 'var(--text-primary)' }}>
                                <input type="radio" name="price" checked={active} onChange={() => onChange({ ...filters, priceRange: active ? null : { min: r.min, max: r.max } })} style={{ accentColor: 'var(--primary)', width: '14px', height: '14px' }} />{r.label}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: '20px' }}><SectionHead title="Category" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {CATEGORIES_LIST.map(cat => (
                        <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
                            <input type="checkbox" checked={filters.categories.includes(cat)} onChange={() => toggle('categories', cat)} style={{ accentColor: 'var(--primary)', width: '14px', height: '14px' }} />
                            <span style={{ color: filters.categories.includes(cat) ? 'var(--primary)' : 'var(--text-primary)', fontWeight: filters.categories.includes(cat) ? 600 : 400, textTransform: 'capitalize' }}>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Brand */}
            <div style={{ marginBottom: '20px' }}><SectionHead title="Brand" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {BRANDS_LIST.map(b => (
                        <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
                            <input type="checkbox" checked={filters.brands.includes(b)} onChange={() => toggle('brands', b)} style={{ accentColor: 'var(--primary)', width: '14px', height: '14px' }} />
                            <span style={{ color: filters.brands.includes(b) ? 'var(--primary)' : 'var(--text-primary)', fontWeight: filters.brands.includes(b) ? 600 : 400 }}>{b}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div><SectionHead title="Rating" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[4, 3, 2].map(r => (
                        <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
                            <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => onChange({ ...filters, minRating: filters.minRating === r ? null : r })} style={{ accentColor: 'var(--primary)', width: '14px', height: '14px' }} />
                            <Stars rating={r} /> <span style={{ color: 'var(--text-muted)' }}>& up</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default function ProductsPage() {
    const [filters, setFilters] = useState<Filters>({ brands: [], categories: [], priceRange: null, minRating: null, inStockOnly: false });
    const [sort, setSort] = useState('popular');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 12;

    const activeCategoryLabel = useMemo(() => {
        if (filters.categories.length === 1) {
            const cat = GLOBAL_CATEGORIES.find(c => c.slug === filters.categories[0]);
            return cat ? cat.label : filters.categories[0];
        }
        return 'All Products';
    }, [filters.categories]);

    const filtered = useMemo(() => {
        let list = [...ALL_PRODS];
        if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
        if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand));
        if (filters.categories.length) list = list.filter(p => filters.categories.includes(p.category));
        if (filters.priceRange) list = list.filter(p => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max);
        if (filters.minRating) list = list.filter(p => p.rating >= filters.minRating!);
        if (filters.inStockOnly) list = list.filter(p => p.inStock);
        if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
        else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
        else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
        else if (sort === 'discount') list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
        else if (sort === 'newest') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        else list.sort((a, b) => b.reviews - a.reviews);
        return list;
    }, [filters, sort, search]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const activeCount = filters.brands.length + filters.categories.length + (filters.priceRange ? 1 : 0) + (filters.minRating ? 1 : 0) + (filters.inStockOnly ? 1 : 0);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <div className="container" style={{ padding: '24px var(--gutter)' }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <a href="/">Home</a><span>›</span><span style={{ color: 'var(--text-primary)', fontWeight: 500, textTransform: 'capitalize' }}>{activeCategoryLabel}</span>
                </div>

                <div style={{ marginBottom: '18px' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '4px', textTransform: 'capitalize' }}>{activeCategoryLabel}</h1>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filtered.length} products found</p>
                </div>

                <div className="products-layout">
                    <FilterSidebar filters={filters} onChange={f => { setFilters(f); setPage(1); }} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Toolbar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '10px 14px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search within results…"
                                style={{ flex: 1, minWidth: '140px', padding: '7px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--surface-2)' }}
                            />
                            {activeCount > 0 && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px' }}>{activeCount} filter{activeCount !== 1 ? 's' : ''}</span>}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '7px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '12px', fontFamily: 'var(--font-body)', background: 'var(--surface)', outline: 'none', cursor: 'pointer' }}>
                                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>

                        {paginated.length === 0 ? (
                            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px', textAlign: 'center' }}>
                                <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', marginBottom: '6px' }}>No products found</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Try adjusting your filters.</p>
                                <button onClick={() => { setFilters({ brands: [], categories: [], priceRange: null, minRating: null, inStockOnly: false }); setSearch(''); }} style={{ padding: '9px 22px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '13px' }}>Clear Filters</button>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {paginated.map(p => <MiniProductCard key={p.id} p={p} />)}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '24px', flexWrap: 'wrap' }}>
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 14px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--surface)', color: page === 1 ? 'var(--text-muted)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>‹ Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button key={n} onClick={() => setPage(n)} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius)', border: `1.5px solid ${n === page ? 'var(--primary)' : 'var(--border)'}`, background: n === page ? 'var(--primary)' : 'var(--surface)', color: n === page ? '#fff' : 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>{n}</button>
                                ))}
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '8px 14px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', background: 'var(--surface)', color: page === totalPages ? 'var(--text-muted)' : 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next ›</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}