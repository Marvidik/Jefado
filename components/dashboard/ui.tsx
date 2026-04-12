'use client';
import { Icons } from './icons';

/* ── Badge ── */
const BADGE_CFG: Record<string, { color: string; bg: string }> = {
    Delivered: { color: '#059669', bg: '#ecfdf5' },
    Shipped: { color: 'var(--dash-primary)', bg: 'var(--dash-primary-light)' },
    Processing: { color: 'var(--dash-primary)', bg: 'var(--dash-primary-light)' },
    Pending: { color: 'var(--dash-primary)', bg: 'var(--dash-primary-light)' },
    Cancelled: { color: '#dc2626', bg: '#fef2f2' },
    Refunded: { color: '#7c3aed', bg: '#f5f3ff' },
    Completed: { color: '#059669', bg: '#ecfdf5' },
    Active: { color: '#059669', bg: '#ecfdf5' },
    Draft: { color: '#64748b', bg: '#f1f5f9' },
    'In Stock': { color: '#059669', bg: '#ecfdf5' },
    'Low Stock': { color: '#d97706', bg: '#fffbeb' },
    'Out of Stock': { color: '#dc2626', bg: '#fef2f2' },
    Paid: { color: '#059669', bg: '#ecfdf5' },
    Failed: { color: '#dc2626', bg: '#fef2f2' },
    Credit: { color: '#059669', bg: '#ecfdf5' },
    Debit: { color: '#dc2626', bg: '#fef2f2' },
    Fee: { color: '#d97706', bg: '#fffbeb' },
    Payout: { color: 'var(--dash-primary)', bg: 'var(--dash-primary-light)' },
};
export function Badge({ status }: { status: string }) {
    const s = BADGE_CFG[status] ?? { color: '#64748b', bg: '#f1f5f9' };
    return (
        <span style={{ background: s.bg, color: s.color, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '24px', whiteSpace: 'nowrap', letterSpacing: '0.2px' }}>
            {status}
        </span>
    );
}

/* ── Card ── */
export function Card({ children, style, noPad }: { children: React.ReactNode; style?: React.CSSProperties; noPad?: boolean }) {
    return (
        <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(15, 23, 42, 0.03)', padding: noPad ? 0 : '28px', transition: 'box-shadow 0.3s ease', ...style }}
             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 48px rgba(15, 23, 42, 0.06)'}
             onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(15, 23, 42, 0.04)'}
        >
            {children}
        </div>
    );
}

/* ── Page Header ── */
export function PageHeader({ title, subtitle, children }: { title: React.ReactNode; subtitle?: string; children?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
                <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '28px', color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>{title}</h1>
                {subtitle && <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>{subtitle}</p>}
            </div>
            {children && <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>{children}</div>}
        </div>
    );
}

/* ── Section Head ── */
export function SectionHead({ title, action, actionLabel }: { title: string; action?: () => void; actionLabel?: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>{title}</h3>
            {action && <button onClick={action} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dash-primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: '"Plus Jakarta Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>{actionLabel ?? 'View All'} {Icons.chevronRight}</button>}
        </div>
    );
}

/* ── Button ── */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export function Btn({ label, icon, variant = 'primary', onClick, small, disabled, submit }: { label: string; icon?: React.ReactNode; variant?: BtnVariant; onClick?: () => void; small?: boolean; disabled?: boolean; submit?: boolean }) {
    const cfg: Record<BtnVariant, React.CSSProperties> = {
        primary: { background: 'var(--dash-primary)', color: '#fff', border: '1px solid var(--dash-primary-dark)', boxShadow: 'var(--shadow-hover)' },
        secondary: { background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(15,23,42,0.02)' },
        ghost: { background: 'transparent', color: '#475569', border: '1px solid transparent' },
        danger: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
        success: { background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' },
    };
    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick} disabled={disabled} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: small ? '8px 16px' : '12px 24px', borderRadius: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: small ? '13px' : '14px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap', ...cfg[variant] }}
            onMouseEnter={e => { if(!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = variant === 'primary' ? 'var(--shadow-hover)' : '0 6px 16px rgba(15,23,42,0.06)'; } }}
            onMouseLeave={e => { if(!disabled) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = cfg[variant].boxShadow || 'none'; } }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {label && <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}</label>}
            <div style={{ position: 'relative' }}>
                <input type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} required={required}
                    style={{ width: '100%', padding: suffix ? '12px 40px 12px 16px' : '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', color: '#0f172a', transition: 'all 0.25s' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--dash-primary)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                {suffix && <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>{suffix}</span>}
            </div>
        </div>
    );
}

/* ── Select ── */
export function Select({ label, value, onChange, options, required }: { label?: string; value?: string; onChange?: (v: string) => void; options: string[]; required?: boolean }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {label && <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}</label>}
            <select value={value} onChange={e => onChange?.(e.target.value)} required={required}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', color: '#0f172a', cursor: 'pointer', transition: 'all 0.25s', appearance: 'none' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--dash-primary)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
            >
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        </div>
    );
}

/* ── Stat Card ── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data); const min = Math.min(...data);
    const w = 80; const h = 40;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(' ');
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', height: '100%' }}>
           <svg width={w} height={h} style={{ overflow: 'visible', marginBottom: '8px' }}>
               <polyline points={pts} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
               <circle cx={parseFloat(pts.split(' ').pop()!.split(',')[0])} cy={parseFloat(pts.split(' ').pop()!.split(',')[1])} r="4" fill={color} />
           </svg>
        </div>
    );
}

export function StatCard({ label, value, change, up, sparkData, color = 'var(--dash-primary)' }: {
    label: string; value: string; change: string; up: boolean; sparkData: number[]; color?: string; icon?: React.ReactNode;
}) {
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', height: '160px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: up ? '#059669' : '#dc2626', background: up ? '#ecfdf5' : '#fef2f2', padding: '4px 10px', borderRadius: '16px' }}>
                   {up ? '+' : ''}{change}
                </span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '32px', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>{value}</p>
                <Sparkline data={sparkData} color={color} />
            </div>
        </Card>
    );
}

/* ── Line Chart ── */
export function LineChart({ data, color = 'var(--dash-primary)', height = 220, labels }: { data: number[]; color?: string; height?: number; labels?: string[] }) {
    const max = Math.max(...data) * 1.05;
    const min = Math.min(...data) * 0.92;
    const w = 100; const h = height;
    const xs = data.map((_, i) => (i / (data.length - 1)) * w);
    const ys = data.map(v => h - ((v - min) / (max - min || 1)) * (h - 16) - 8);
    const pts = data.map((_, i) => `${xs[i]},${ys[i]}`).join(' ');
    const area = `${xs[0]},${h} ${pts} ${xs[xs.length - 1]},${h}`;
    return (
        <div>
            <svg viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: `${h}px`, display: 'block' }}>
                <defs>
                    <linearGradient id={`lg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={area} fill={`url(#lg-${color.replace('#', '')})`} />
                <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {labels && (
                <div style={{ display: 'flex', marginTop: '12px', gap: '4px' }}>
                    {labels.map(l => <span key={l} style={{ flex: 1, textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>{l}</span>)}
                </div>
            )}
        </div>
    );
}

/* ── Donut Chart ── */
export function DonutChart({ segments, size = 120 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <svg viewBox="0 0 100 100" style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
                <circle cx={cx} cy={cy} r="20" fill="#fff" />
                {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
                <circle cx={cx} cy={cy} r="22" fill="#fff" />
                <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" fontFamily="Outfit">{Math.round(slices[0].pct * 100)}%</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {segments.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color, flexShrink: 0 }} />
                        <span style={{ color: '#475569', flex: 1, fontWeight: 500 }}>{s.label}</span>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{s.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Table ── */
export function Table({ cols, rows }: { cols: string[]; rows: React.ReactNode[][] }) {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', fontSize: '14px', minWidth: '700px' }}>
                <thead>
                    <tr>
                        {cols.map((c, idx) => (
                            <th key={c} style={{ padding: '0 16px 12px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.02)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.002)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(15,23,42,0.06)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,23,42,0.02)'; }}
                        >
                            {row.map((cell, j) => (
                                <td key={j} style={{ padding: '20px 16px', color: '#334155', verticalAlign: 'middle', fontWeight: 500, borderTopLeftRadius: j === 0 ? '16px' : 0, borderBottomLeftRadius: j === 0 ? '16px' : 0, borderTopRightRadius: j === row.length - 1 ? '16px' : 0, borderBottomRightRadius: j === row.length - 1 ? '16px' : 0 }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {rows.length === 0 && (
                <div style={{ padding: '60px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>No records found.</div>
            )}
        </div>
    );
}

/* ── Pagination ── */
export function Pagination({ total, page, perPage, onPage }: { total: number; page: number; perPage: number; onPage: (n: number) => void }) {
    const pages = Math.ceil(total / perPage);
    if (pages <= 1) return null;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0 8px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Showing {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: page === 1 ? '#cbd5e1' : '#334155', fontSize: '13px', fontWeight: 600, cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                    {Icons.chevronLeft} Prev
                </button>
                {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(n => (
                    <button key={n} onClick={() => onPage(n)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: `1px solid ${n === page ? 'var(--dash-primary)' : '#e2e8f0'}`, background: n === page ? 'var(--dash-primary)' : '#fff', color: n === page ? '#fff' : '#334155', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>{n}</button>
                ))}
                {pages > 5 && <span style={{ padding: '8px 4px', color: '#94a3b8', fontSize: '14px' }}>…</span>}
                <button onClick={() => onPage(Math.min(pages, page + 1))} disabled={page === pages} style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: page === pages ? '#cbd5e1' : '#334155', fontSize: '13px', fontWeight: 600, cursor: page === pages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                    Next {Icons.chevronRight}
                </button>
            </div>
        </div>
    );
}

/* ── Empty State ── */
export function Empty({ icon, title, desc, action }: { icon: string; title: string; desc: string; action?: React.ReactNode }) {
    return (
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '24px' }}>{icon}</div>
            <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '20px', color: '#0f172a', marginBottom: '12px' }}>{title}</p>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>{desc}</p>
            {action}
        </div>
    );
}

/* ── Drawer ── */
export function Drawer({ open, onClose, title, children, maxWidth = '480px' }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; maxWidth?: string }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.3s ease' }} onClick={onClose} />
            <div style={{ position: 'relative', width: '100%', maxWidth, background: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.1)', animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <style>{`
                    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                `}</style>
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: '22px', color: '#0f172a', margin: 0 }}>{title}</h2>
                    <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
                    >
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>✕</span>
                    </button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}