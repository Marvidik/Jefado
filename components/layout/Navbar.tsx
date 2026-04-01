'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
    { icon: '👗', label: "Women's Fashion", href: '/products?category=womens-fashion' },
    { icon: '👔', label: "Men's Fashion", href: '/products?category=mens-fashion' },
    { icon: '💻', label: 'Electronics', href: '/products?category=electronics' },
    { icon: '🏠', label: 'Home & Lifestyle', href: '/products?category=home' },
    { icon: '💊', label: 'Medicine', href: '/products?category=medicine' },
    { icon: '⚽', label: 'Sports & Outdoor', href: '/products?category=sports' },
    { icon: '🧸', label: "Baby's & Toys", href: '/products?category=baby' },
    { icon: '🛒', label: 'Groceries & Pets', href: '/products?category=groceries' },
    { icon: '✨', label: 'Health & Beauty', href: '/products?category=beauty' },
];

export default function Navbar() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);

    const handleSearch = () => {
        if (searchVal.trim()) router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
    };

    return (
        <>
            <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
                <div className="container nav-inner" style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '62px' }}>

                    {/* Logo */}
                    <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--primary)', letterSpacing: '-0.5px', flexShrink: 0 }}>
                        Jefado<span style={{ color: 'var(--accent)' }}>.</span>
                    </a>

                    {/* Category Button */}
                    <button onClick={() => setSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', flexShrink: 0 }}>
                        <span style={{ fontSize: '16px' }}>☰</span>
                        <span className="nav-category-text">All Categories</span>
                    </button>

                    {/* Search */}
                    <div className="nav-search" style={{ flex: 1, display: 'flex', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', maxWidth: '520px' }}>
                        <input
                            value={searchVal}
                            onChange={e => setSearchVal(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            placeholder="Search products, brands, categories…"
                            style={{ flex: 1, padding: '9px 14px', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'transparent', color: 'var(--text-primary)' }}
                        />
                        <button onClick={handleSearch} style={{ padding: '9px 18px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '13px' }}>Search</button>
                    </div>

                    {/* Nav Links */}
                    <nav className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: 'auto' }}>
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Shop', href: '/products' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map(link => (
                            <a key={link.label} href={link.href} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{link.label}</a>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0, marginLeft: 'auto' }}>
                        <a href="/account" title="Account" style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '19px', color: 'var(--text-secondary)' }}>👤</a>
                        <a href="/account?tab=wishlist" title="Wishlist" style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '19px', color: 'var(--text-secondary)' }}>
                            ♡
                            <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--accent)', color: '#fff', fontSize: '9px', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        </a>
                        <a href="/cart" title="Cart" style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '19px', color: 'var(--text-secondary)' }}>
                            🛒
                            <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--primary)', color: '#fff', fontSize: '9px', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
                        </a>
                        <a href="/auth" style={{ padding: '7px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Sign In</a>
                    </div>
                </div>
            </header>

            {/* Category Drawer */}
            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
                    <div onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }} />
                    <div style={{ position: 'relative', width: '260px', background: 'var(--surface)', height: '100%', overflowY: 'auto', boxShadow: 'var(--shadow-lg)', animation: 'fadeInUp 0.2s ease' }}>
                        <div style={{ padding: '18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--primary)' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff' }}>All Categories</span>
                            <button onClick={() => setSidebarOpen(false)} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)' }}>×</button>
                        </div>
                        {categories.map((cat) => (
                            <a key={cat.label} href={cat.href} onClick={() => setSidebarOpen(false)}
                                onMouseEnter={() => setHoveredCat(cat.label)}
                                onMouseLeave={() => setHoveredCat(null)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', cursor: 'pointer', background: hoveredCat === cat.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === cat.label ? 'var(--primary)' : 'var(--text-primary)', transition: 'all 0.15s', borderLeft: `3px solid ${hoveredCat === cat.label ? 'var(--primary)' : 'transparent'}`, fontSize: '14px', fontWeight: hoveredCat === cat.label ? 600 : 400, borderBottom: '1px solid var(--border-light)', textDecoration: 'none' }}
                            >
                                <span>{cat.icon}</span>
                                <span style={{ flex: 1 }}>{cat.label}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>›</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}