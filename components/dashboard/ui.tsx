'use client';
import { Icons } from './icons';

/* ── Badge ── */
const BADGE_CFG: Record<string, { color: string; bg: string }> = {
    Delivered: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Shipped: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Processing: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Pending: { color: '#94a3b8', bg: '#f1f5f9' },
    Cancelled: { color: 'var(--primary)', bg: 'var(--primary-light)' },
    Refunded: { color: '#7c3aed', bg: '#f5f3ff' },
    Completed: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Active: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Draft: { color: '#64748b', bg: '#f1f5f9' },
    'In Stock': { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    'Low Stock': { color: '#d97706', bg: '#fffbeb' },
    'Out of Stock': { color: 'var(--primary)', bg: 'var(--primary-light)' },
    Paid: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Failed: { color: 'var(--primary)', bg: 'var(--primary-light)' },
    Credit: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
    Debit: { color: 'var(--primary)', bg: 'var(--primary-light)' },
    Fee: { color: '#d97706', bg: '#fffbeb' },
    Payout: { color: 'var(--secondary)', bg: 'var(--secondary-light)' },
};

export function Badge({ status, label }: { status: string; label?: string }) {
    const s = BADGE_CFG[status] ?? BADGE_CFG[label ?? status] ?? { color: '#64748b', bg: '#f1f5f9' };
    return (
        <span style={{ background: s.bg, color: s.color, fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '24px', whiteSpace: 'nowrap', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {label ?? status}
        </span>
    );
}

/* ── Card ── */
export function Card({ children, style, noPad, className }: { children: React.ReactNode; style?: React.CSSProperties; noPad?: boolean; className?: string }) {
    return (
        <div className={className} style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 24px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(15, 23, 42, 0.03)', padding: noPad ? 0 : '28px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', ...style }}>
            {children}
        </div>
    );
}

/* ── Page Header ── */
export function PageHeader({ title, subtitle, children }: { title: React.ReactNode; subtitle?: string; children?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ minWidth: '280px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>{title}</h1>
                {subtitle && <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>{subtitle}</p>}
            </div>
            {children && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>}
        </div>
    );
}

/* ── Section Head ── */
export function SectionHead({ title, action, actionLabel }: { title: string; action?: () => void; actionLabel?: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: '#0f172a' }}>{title}</h3>
            {action && <button onClick={action} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{actionLabel ?? 'Expand View'} {Icons.chevronRight}</button>}
        </div>
    );
}

/* ── Button ── */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export function Btn({ label, icon, variant = 'primary', onClick, small, disabled, submit }: { label: string; icon?: React.ReactNode; variant?: BtnVariant; onClick?: () => void; small?: boolean; disabled?: boolean; submit?: boolean }) {
    const cfg: Record<BtnVariant, React.CSSProperties> = {
        primary: { background: 'var(--primary)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(238, 18, 23, 0.25)' },
        secondary: { background: 'var(--secondary)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(60, 127, 178, 0.25)' },
        ghost: { background: 'transparent', color: '#64748b', border: '1.5px solid #e2e8f0' },
        danger: { background: 'var(--primary-light)', color: 'var(--primary)', border: '1.5px solid var(--primary)' },
        success: { background: 'var(--secondary-light)', color: 'var(--secondary)', border: '1.5px solid var(--secondary)' },
    };
    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick} disabled={disabled} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: small ? '8px 20px' : '14px 32px', borderRadius: '14px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: small ? '12px' : '14px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, transition: 'all 0.2s', whiteSpace: 'nowrap', ...cfg[variant] }}
            onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)'; } }}
            onMouseLeave={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; } }}
        >
            {icon && <span style={{ display: 'flex', lineHeight: 1 }}>{icon}</span>}
            {label}
        </button>
    );
}

/* ── Input ── */
export function Input({ label, value, onChange, placeholder, type = 'text', required, suffix }: {
    label?: string; value?: string; onChange?: (v: string) => void; placeholder?: string; type?: string; required?: boolean; suffix?: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {label && <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>{label}{required && <span style={{ color: 'var(--primary)', marginLeft: '3px' }}>*</span>}</label>}
            <div style={{ position: 'relative' }}>
                <input type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} required={required}
                    style={{ width: '100%', padding: suffix ? '14px 44px 14px 18px' : '14px 18px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', background: '#f8fafc', color: '#0f172a', transition: 'all 0.2s' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                />
                {suffix && <span style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>{suffix}</span>}
            </div>
        </div>
    );
}

/* ── Select ── */
export function Select({ label, value, onChange, options, required }: { label?: string; value?: string; onChange?: (v: string) => void; options: (string | { label: string; value: string })[]; required?: boolean }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {label && <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>{label}{required && <span style={{ color: 'var(--primary)', marginLeft: '3px' }}>*</span>}</label>}
            <div style={{ position: 'relative' }}>
                <select value={value} onChange={e => onChange?.(e.target.value)} required={required}
                    style={{ width: '100%', padding: '14px 18px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', background: '#f8fafc', color: '#0f172a', cursor: 'pointer', appearance: 'none' }}
                >
                    {options.map(o => (
                        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
                            {typeof o === 'string' ? o : o.label}
                        </option>
                    ))}
                </select>
                <span style={{ position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }}>▼</span>
            </div>
        </div>
    );
}

/* ── Stat Card ── */
export function StatCard({ label, value, change, up, sparkData, color = 'var(--secondary)', icon }: {
    label: string; value: string; change: string; up: boolean; sparkData?: number[]; color?: string; icon?: React.ReactNode;
}) {
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '140px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {icon && <div style={{ color: color }}>{icon}</div>}
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: up ? 'var(--secondary)' : 'var(--primary)', background: up ? 'var(--secondary-light)' : 'var(--primary-light)', padding: '4px 10px', borderRadius: '20px' }}>
                   {up ? '↑' : '↓'} {change}
                </span>
            </div>
            <div style={{ marginTop: 'auto', zIndex: 2 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: '#0f172a', margin: 0 }}>{value}</p>
            </div>
            <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '80px', opacity: 0.03, pointerEvents: 'none' }}>
                {icon}
            </div>
        </Card>
    );
}

/* ── Table ── */
export function Table({ cols, rows }: { cols: string[]; rows: React.ReactNode[][] }) {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px', fontSize: '14px', minWidth: '800px' }}>
                <thead>
                    <tr>
                        {cols.map((c) => (
                            <th key={c} style={{ padding: '0 20px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} style={{ padding: '20px', color: '#1e293b', background: '#fff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', borderLeft: j === 0 ? '1px solid #f1f5f9' : 'none', borderRight: j === row.length - 1 ? '1px solid #f1f5f9' : 'none', borderTopLeftRadius: j === 0 ? '16px' : 0, borderBottomLeftRadius: j === 0 ? '16px' : 0, borderTopRightRadius: j === row.length - 1 ? '16px' : 0, borderBottomRightRadius: j === row.length - 1 ? '16px' : 0, fontWeight: 500 }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {rows.length === 0 && <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: 500 }}>No terminal data record found.</div>}
        </div>
    );
}

export function Drawer({ open, onClose, title, children, maxWidth = '560px' }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; maxWidth?: string }) {
    if (!open) return null;
    return (
        <div className="ds-drawer-overlay" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex' }}>
            <style>{`
                .ds-drawer-overlay {
                    justify-content: flex-end;
                    align-items: stretch;
                }
                .ds-drawer {
                    position: relative;
                    width: 100%;
                    max-width: ${maxWidth};
                    background: #fff;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: -20px 0 60px rgba(0,0,0,0.15);
                    animation: dsSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .ds-drawer-header {
                    padding: 32px;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .ds-drawer-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 32px;
                    padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
                }

                @keyframes dsSlideIn { 
                    from { transform: translateX(100%); } 
                    to { transform: translateX(0); } 
                }
                @keyframes dsSlideUp { 
                    from { transform: translateY(100%); } 
                    to { transform: translateY(0); } 
                }

                @media (max-width: 768px) {
                    .ds-drawer-overlay {
                        justify-content: center;
                        align-items: flex-end;
                    }
                    .ds-drawer {
                        height: auto;
                        max-height: 85vh;
                        border-radius: 24px 24px 0 0;
                        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
                        animation: dsSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .ds-drawer-header {
                        padding: 20px 24px;
                    }
                    .ds-drawer-content {
                        padding: 20px 24px;
                    }
                }
            `}</style>
            
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }} onClick={onClose} />
            
            <div className="ds-drawer">
                <div className="ds-drawer-header">
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, margin: 0, color: '#0f172a' }}>{title}</h2>
                    <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
                <div className="ds-drawer-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ── Donut Chart ── */
export function DonutChart({ segments, size = 140 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
    const total = segments.reduce((s, x) => s + x.value, 0);
    let cum = 0;
    const r = 36; const cx = 50; const cy = 50;
    const slices = segments.map(seg => {
        const pct = seg.value / total;
        const start = cum * 360; const end = (cum + pct) * 360; cum += pct;
        const toR = (d: number) => (d - 90) * Math.PI / 180;
        const x1 = cx + r * Math.cos(toR(start)), y1 = cy + r * Math.sin(toR(start));
        const x2 = cx + r * Math.cos(toR(end)), y2 = cy + r * Math.sin(toR(end));
        return { ...seg, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${pct > 0.5 ? 1 : 0},1 ${x2},${y2} Z`, pct };
    });
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
                {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
                <circle cx={cx} cy={cy} r="25" fill="#fff" />
                <text x="50" y="55" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0f172a" fontFamily="var(--font-display)">{Math.round(slices[0].pct * 100)}%</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '140px' }}>
                {segments.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color, flexShrink: 0 }} />
                        <span style={{ color: '#64748b', flex: 1, fontWeight: 600 }}>{s.label}</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>{Math.round(s.value)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Pagination({ total, page, perPage, onPage }: { total: number; page: number; perPage: number; onPage: (n: number) => void }) {
    const pages = Math.ceil(total / perPage);
    if (pages <= 1) return null;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '32px', flexWrap: 'wrap' }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => onPage(n)} style={{ width: '40px', height: '40px', borderRadius: '12px', border: n === page ? 'none' : '1px solid #e2e8f0', background: n === page ? 'var(--secondary)' : '#fff', color: n === page ? '#fff' : '#475569', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: n === page ? '0 4px 12px rgba(60, 127, 178, 0.2)' : 'none' }}>{n}</button>
            ))}
        </div>
    );
}

export function LineChart({ data, color, height, labels }: any) { return <div style={{ height: height + 'px', background: '#f8fafc', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px', border: '1px dashed #e2e8f0', fontWeight: 600 }}>[ Real-time Analytical Visualisation Terminal ]</div> }