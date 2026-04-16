'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/data';

const categories = CATEGORIES;

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
            <style>{`
        @media (max-width: 768px) {
          .nav-desktop-icons { display: none !important; }
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cat   { display: none !important; }
          .nav-mobile-menu-btn { display: flex !important; }
          .nav-search-wrap { max-width: 100% !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu-btn { display: none !important; }
        }
      `}</style>

            <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '62px' }}>

                    {/* Logo */}
                    <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--primary)', letterSpacing: '-0.5px', flexShrink: 0 }}>
                        Jefado<span style={{ color: 'var(--secondary)' }}>.</span>
                    </Link>

                    {/* Category button — desktop only */}
                    <button className="nav-desktop-cat" onClick={() => setSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', flexShrink: 0, whiteSpace: 'nowrap' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                    >
                        <span>☰</span> All Categories
                    </button>

                    {/* Search — takes all remaining width on mobile */}
                    <div className="nav-search-wrap" style={{ flex: 1, display: 'flex', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', maxWidth: '520px', transition: 'border-color 0.2s' }}
                        onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                        onBlurCapture={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                        <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            placeholder="Search products, brands…"
                            style={{ flex: 1, padding: '9px 14px', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'transparent', color: 'var(--text-primary)', minWidth: 0 }}
                        />
                        <button onClick={handleSearch} style={{ padding: '9px 16px', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0, whiteSpace: 'nowrap' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                        >Search</button>
                    </div>

                    {/* Desktop nav links */}
                    <nav className="nav-desktop-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexShrink: 0 }}>
                        {[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/products' }, { label: 'Services', href: '/services' }, { label: 'Pricing', href: '/pricing' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map(link => (
                            <Link key={link.label} href={link.href} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >{link.label}</Link>
                        ))}
                    </nav>

                    {/* Desktop icons */}
                    <div className="nav-desktop-icons" style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0 }}>
                        <Link href="/account" title="Account" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '18px', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--primary-light)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >👤</Link>
                        <Link href="/account?tab=wishlist" title="Wishlist" style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '18px', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--primary-light)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            ♡
                            <span style={{ position: 'absolute', top: '1px', right: '1px', background: 'var(--secondary)', color: '#fff', fontSize: '8px', fontWeight: 700, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        </Link>
                        <Link href="/cart" title="Cart" style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', fontSize: '18px', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--primary-light)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            🛒
                            <span style={{ position: 'absolute', top: '1px', right: '1px', background: 'var(--primary)', color: '#fff', fontSize: '8px', fontWeight: 700, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
                        </Link>
                        <Link href="/auth" style={{ padding: '7px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                        >Sign In</Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="nav-mobile-menu-btn" onClick={() => setSidebarOpen(true)}
                        style={{ display: 'none', flexShrink: 0, width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', fontSize: '18px', color: 'var(--text-primary)' }}
                    >☰</button>
                </div>


            </header>

            {/* Category Drawer */}
            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
                    <div onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(2px)' }} />
                    <div style={{ position: 'relative', width: '40%', minWidth: '280px', background: 'var(--surface)', height: '100%', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ padding: '18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--primary)' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: '#fff' }}>Menu & Categories</span>
                            <button onClick={() => setSidebarOpen(false)} style={{ fontSize: '22px', color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>×</button>
                        </div>

                        {/* Main Navigation Section */}
                        <div style={{ padding: '20px 0 10px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', padding: '0 18px' }}>Navigation</p>
                            {[
                                { icon: '🏠', label: 'Home', href: '/' },
                                { icon: '🛍', label: 'Shop', href: '/products' },
                                { icon: '⚒️', label: 'Services', href: '/services' },
                                { icon: '🏷️', label: 'Pricing', href: '/pricing' },
                                { icon: 'ℹ', label: 'About', href: '/about' },
                                { icon: '📞', label: 'Contact', href: '/contact' },
                                { icon: '👤', label: 'Account', href: '/account' },
                                { icon: '🛒', label: 'Cart', href: '/cart' },
                                { icon: '♡', label: 'Wishlist', href: '/account?tab=wishlist' },
                                { icon: '🔑', label: 'Sign In', href: '/auth' },
                            ].map(item => (
                                <Link key={item.label} href={item.href} onClick={() => setSidebarOpen(false)}
                                    onMouseEnter={() => setHoveredCat(item.label)} onMouseLeave={() => setHoveredCat(null)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 18px', background: hoveredCat === item.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === item.label ? 'var(--primary)' : 'var(--text-primary)', borderLeft: `3px solid ${hoveredCat === item.label ? 'var(--primary)' : 'transparent'}`, fontSize: '14px', fontWeight: 500, borderBottom: '1px solid var(--border-light)', transition: 'all 0.15s' }}
                                >
                                    <span>{item.icon}</span><span style={{ flex: 1 }}>{item.label}</span><span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>›</span>
                                </Link>
                            ))}
                        </div>

                        {/* Categories Section */}
                        <div style={{ padding: '10px 0' }}>
                            <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', padding: '0 18px' }}>Shop Categories</p>
                            {categories.map(cat => (
                                <Link key={cat.label} href={`/products?category=${cat.slug}`} onClick={() => setSidebarOpen(false)}
                                    onMouseEnter={() => setHoveredCat(cat.label)} onMouseLeave={() => setHoveredCat(null)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 18px', background: hoveredCat === cat.label ? 'var(--primary-light)' : 'transparent', color: hoveredCat === cat.label ? 'var(--primary)' : 'var(--text-primary)', borderLeft: `3px solid ${hoveredCat === cat.label ? 'var(--primary)' : 'transparent'}`, fontSize: '14px', fontWeight: 500, borderBottom: '1px solid var(--border-light)', transition: 'all 0.15s' }}
                                >
                                    <span>{cat.icon}</span><span style={{ flex: 1 }}>{cat.label}</span><span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>›</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}