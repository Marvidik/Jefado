'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';

const MENU_GROUPS = [
    {
        name: 'Main menu',
        items: [
            { icon: Icons.dashboard, href: '/dashboard', label: 'Dashboard' },
            { icon: Icons.orders, href: '/dashboard/orders', label: 'Order Management' },
            { icon: Icons.customers, href: '/dashboard/customers', label: 'Customers' },
            { icon: Icons.coupons, href: '/dashboard/coupons', label: 'Coupon Code' },
        ]
    },
    {
        name: 'Product',
        items: [
            { icon: Icons.products, href: '/dashboard/products', label: 'Products Master' },
        ]
    },
    {
        name: 'Admin',
        items: [
            { icon: Icons.settings, href: '/dashboard/settings', label: 'Settings & Admin' },
        ]
    }
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth < 900;
            setIsMobile(mobile);
            if (mobile) setExpanded(true);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ds-shell {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #f1f5f9;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ds-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 300;
          position: relative;
          border-right: 1px solid #e2e8f0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ds-sidebar:not(.expanded) {
          width: 80px;
        }

        @media (max-width: 900px) {
          .ds-sidebar {
            position: fixed;
            left: ${mobileOpen ? '0' : '-260px'};
            top: 0;
            height: 100vh;
            width: 260px !important;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: ${mobileOpen ? '4px 0 32px rgba(0,0,0,0.15)' : 'none'};
          }
        }

        .ds-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          background: transparent;
        }

        /* ── Nav items ── */
        .ds-nav-group {
          margin-bottom: 24px;
        }
        .ds-nav-group-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #94a3b8;
          font-weight: 700;
          padding: 0 24px;
          margin-bottom: 12px;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .ds-sidebar:not(.expanded) .ds-nav-group-title {
          opacity: 0;
          pointer-events: none;
        }

        .ds-nav-link {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          border-left: 3px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .ds-nav-link:hover {
          color: #0f172a;
          background: #f8fafc;
        }

        .ds-nav-link.active {
          color: #2563eb;
          background: #eff6ff;
          border-left-color: #2563eb;
          font-weight: 600;
        }

        .ds-nav-icon {
          width: 20px;
          height: 20px;
          margin-right: 16px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        
        .ds-sidebar:not(.expanded) .ds-nav-link {
            padding: 12px 0;
            justify-content: center;
            border-left-color: transparent !important;
            margin: 0 16px;
            border-radius: 8px;
        }
        
        .ds-sidebar:not(.expanded) .ds-nav-icon {
            margin-right: 0;
        }
        
        .ds-sidebar:not(.expanded) .ds-nav-link.active {
            background: #eff6ff;
            color: #2563eb;
        }

        .ds-nav-label {
          transition: opacity 0.2s, transform 0.2s;
        }

        .ds-sidebar:not(.expanded) .ds-nav-label {
          opacity: 0;
          transform: translateX(-10px);
          position: absolute;
          pointer-events: none;
        }

        .ds-body {
          flex: 1;
          overflow-y: auto;
          padding: 32px 40px;
        }

        .ds-nav-scroll::-webkit-scrollbar { display: none; }
        .ds-body::-webkit-scrollbar { width: 6px; }
        .ds-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        @media (max-width: 900px) {
          .ds-body { padding: 20px 16px; }
        }
      `}</style>

            <div className="ds-shell">
                {mobileOpen && isMobile && (
                    <div onClick={() => setMobileOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 299 }}
                    />
                )}

                <aside className={`ds-sidebar ${expanded ? 'expanded' : ''}`}>
                    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: expanded ? '0 24px' : '0', width: '100%', flexShrink: 0 }}>
                        {expanded ? (
                            <Link href="/dashboard" style={{ fontWeight: 800, fontSize: '22px', color: '#2563eb', textDecoration: 'none', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                DEALPORT
                            </Link>
                        ) : (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ color: '#2563eb', fontWeight: 800, fontSize: '22px' }}>D</span>
                            </div>
                        )}
                        {!isMobile && (
                            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', position: expanded ? 'static' : 'absolute', top: '28px', right: '0', width: expanded ? 'auto' : '100%' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <nav className="ds-nav-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '16px 0', width: '100%' }}>
                        {MENU_GROUPS.map((group, gIdx) => (
                            <div key={gIdx} className="ds-nav-group">
                                <div className="ds-nav-group-title">{group.name}</div>
                                {group.items.map((item, iIdx) => {
                                    const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '#';
                                    return (
                                        <Link key={iIdx} href={item.href} className={`ds-nav-link ${isActive ? 'active' : ''}`} title={item.label}>
                                            <span className="ds-nav-icon">{item.icon}</span>
                                            <span className="ds-nav-label">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    <div style={{ padding: '24px', flexShrink: 0, borderTop: '1px solid #e2e8f0' }}>
                         <Link href="/" title="Your Shop" className="ds-nav-link" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', justifyContent: expanded ? 'flex-start' : 'center', color: '#0f172a', fontWeight: 600 }}>
                            <span className="ds-nav-icon" style={{ margin: expanded ? '0 12px 0 0' : 0 }}>{Icons.store}</span>
                            {expanded && <span className="ds-nav-label" style={{ flex: 1 }}>Your Shop</span>}
                            {expanded && <span style={{ color: '#94a3b8' }}>↗</span>}
                        </Link>
                    </div>
                </aside>

                <div className="ds-main">
                    <header style={{ height: '80px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {isMobile && (
                                <button onClick={() => setMobileOpen(true)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', cursor: 'pointer' }}>
                                    {Icons.menu}
                                </button>
                            )}
                            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '20px', color: '#0f172a', margin: 0, display: isMobile ? 'none' : 'block' }}>
                                {pathname === '/dashboard' ? 'Dashboard' : pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase() || '')}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ position: 'relative' }}>
                                <input type="text" placeholder="Search data, users, or reports" style={{ padding: '10px 16px 10px 40px', borderRadius: '24px', border: 'none', background: '#f8fafc', fontSize: '13px', width: '280px', outline: 'none' }} />
                                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>{Icons.search}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b' }}>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>🔔</button>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>A</div>
                            </div>
                        </div>
                    </header>
                    <main className="ds-body">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}