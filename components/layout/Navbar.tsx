'use client';
import { useState } from 'react';

const categories = [
    { icon: '👗', label: "Women's Fashion" },
    { icon: '👔', label: "Men's Fashion" },
    { icon: '💻', label: 'Electronics' },
    { icon: '🏠', label: 'Home & Lifestyle' },
    { icon: '💊', label: 'Medicine' },
    { icon: '⚽', label: 'Sports & Outdoor' },
    { icon: '🧸', label: "Baby's & Toys" },
    { icon: '🛒', label: 'Groceries & Pets' },
    { icon: '✨', label: 'Health & Beauty' },
];

const navLinks = ['Home', 'Contact', 'About', 'Sign Up'];

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);

    return (
        <>
            <header style={{ background: 'var(--surface)', borderBottom: '2px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
                <div className="container nav-inner" style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '62px' }}>

                    {/* Logo */}
                    <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--primary)', letterSpacing: '-0.5px', flexShrink: 0 }}>
                        Jefado<span style={{ color: 'var(--primary-dark)' }}>.</span>
                    </a>

                    {/* Category Button */}
                    <button onClick={() => setSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', flexShrink: 0, transition: 'background 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                    >
                        <span style={{ fontSize: '16px' }}>☰</span>
                        <span className="nav-category-text">All Categories</span>
                    </button>

                    {/* Search */}
                    <div className="nav-search" style={{ flex: 1, display: 'flex', border: '2px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', maxWidth: '520px', transition: 'border-color 0.2s' }}
                        onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                        onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                        <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                            placeholder="Search products, brands, categories…"
                            style={{ flex: 1, padding: '9px 14px', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'transparent', color: 'var(--text-primary)' }}
                        />
                        <button style={{ padding: '9px 18px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '13px', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                        >Search</button>
                    </div>

                    {/* Nav Links */}
                    <nav className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginLeft: 'auto' }}>
                        {navLinks.map(link => (
                            <a key={link} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >{link}</a>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0, marginLeft: 'auto' }}>
                        {[{ icon: '♡', label: 'Wishlist', count: 3 }, { icon: '🛒', label: 'Cart', count: 5 }].map(({ icon, label, count }) => (
                            <button key={label} title={label} style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '19px', color: 'var(--text-secondary)', transition: 'color 0.2s, background 0.2s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-light)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                            >
                                {icon}
                                {count && <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--primary)', color: '#fff', fontSize: '9px', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Category Drawer */}
            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
                    <div onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(56,36,13,0.5)', backdropFilter: 'blur(2px)' }} />
                    <div style={{ position: 'relative', width: '260px', background: 'var(--surface)', height: '100%', overflowY: 'auto', boxShadow: 'var(--shadow-lg)', animation: 'fadeInUp 0.2s ease' }}>
                        <div style={{ padding: '18px', borderBottom: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--primary)' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff' }}>All Categories</span>
                            <button onClick={() => setSidebarOpen(false)} style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)' }}>×</button>
                        </div>
                        {categories.map((cat) => (
                            <div key={cat.label}
                                onMouseEnter={() => setHoveredCat(cat.label)}
                                onMouseLeave={() => setHoveredCat(null)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', cursor: 'pointer', background: hoveredCat === cat.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === cat.label ? 'var(--primary)' : 'var(--text-primary)', transition: 'all 0.15s', borderLeft: hoveredCat === cat.label ? '3px solid var(--primary)' : '3px solid transparent', fontSize: '14px', fontWeight: hoveredCat === cat.label ? 600 : 400, borderBottom: '1px solid var(--border-light)' }}
                            >
                                <span>{cat.icon}</span>
                                <span style={{ flex: 1 }}>{cat.label}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>›</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}