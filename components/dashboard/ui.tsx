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
        <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(15, 23, 42, 0.03)', padding: noPad ? 0 : '28px', transition: 'all 0.3s ease', ...style }}
        >
            {children}
        </div>
    );
}

/* ── Page Header ── */
export function PageHeader({ title, subtitle, children }: { title: React.ReactNode; subtitle?: string; children?: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ minWidth: '280px' }}>
                <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '28px', color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>{title}</h1>
                {subtitle && <p style={{ fontSize: '15px', color: '#64748b', margin: '6px 0 0 0' }}>{subtitle}</p>}
            </div>
            {children && <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>}
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
        primary: { background: 'var(--dash-primary)', color: '#fff', border: '1px solid var(--dash-primary-dark)' },
        secondary: { background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0' },
        ghost: { background: 'transparent', color: '#475569', border: '1px solid transparent' },
        danger: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
        success: { background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' },
    };
    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick} disabled={disabled} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: small ? '8px 16px' : '12px 24px', borderRadius: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: small ? '13px' : '14px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, transition: 'all 0.2s', whiteSpace: 'nowrap', ...cfg[variant] }}
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
                    style={{ width: '100%', padding: suffix ? '12px 40px 12px 16px' : '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
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
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', outline: 'none', background: '#f8fafc', color: '#0f172a', cursor: 'pointer', appearance: 'none' }}
            >
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        </div>
    );
}

/* ── Stat Card ── */
export function StatCard({ label, value, change, up, sparkData, color = 'var(--dash-primary)', icon }: {
    label: string; value: string; change: string; up: boolean; sparkData: number[]; color?: string; icon?: React.ReactNode;
}) {
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '140px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {icon && <div style={{ color: color, display: 'flex', opacity: 0.8 }}>{icon}</div>}
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{label}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: up ? '#059669' : '#dc2626', background: up ? '#ecfdf5' : '#fef2f2', padding: '4px 8px', borderRadius: '12px' }}>
                   {up ? '↑' : '↓'} {change}
                </span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: '28px', color: '#0f172a', margin: 0 }}>{value}</p>
            </div>
        </Card>
    );
}

/* ── Table ── */
export function Table({ cols, rows }: { cols: string[]; rows: React.ReactNode[][] }) {
    return (
        <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', fontSize: '14px', minWidth: '800px' }}>
                <thead>
                    <tr>
                        {cols.map((c) => (
                            <th key={c} style={{ padding: '0 16px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ background: '#fff' }}>
                            {row.map((cell, j) => (
                                <td key={j} style={{ padding: '16px', color: '#334155', borderTopLeftRadius: j === 0 ? '12px' : 0, borderBottomLeftRadius: j === 0 ? '12px' : 0, borderTopRightRadius: j === row.length - 1 ? '12px' : 0, borderBottomRightRadius: j === row.length - 1 ? '12px' : 0, border: '1px solid #f1f5f9', borderRight: j === row.length - 1 ? '1px solid #f1f5f9' : 'none', borderLeft: j === 0 ? '1px solid #f1f5f9' : 'none' }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {rows.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No data found.</div>}
        </div>
    );
}

/* ── Drawer ── */
export function Drawer({ open, onClose, title, children, maxWidth = '480px' }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; maxWidth?: string }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
            <div className="ds-drawer" style={{ position: 'relative', width: '100%', maxWidth, background: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 50px rgba(0,0,0,0.1)' }}>
                <style>{`
                    .ds-drawer { animation: dsSlideIn 0.3s ease-out; }
                    @keyframes dsSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                    @media (max-width: 640px) { .ds-drawer { max-width: 100% !important; } }
                `}</style>
                <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>{title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>✕</button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {children}
                </div>
            </div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
                {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
                <circle cx={cx} cy={cy} r="24" fill="#fff" />
                <text x="50" y="55" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="Outfit">{Math.round(slices[0].pct * 100)}%</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '120px' }}>
                {segments.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: s.color, flexShrink: 0 }} />
                        <span style={{ color: '#64748b', flex: 1, fontWeight: 500 }}>{s.label}</span>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{Math.round(s.value)}%</span>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => onPage(n)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', background: n === page ? 'var(--dash-primary)' : '#fff', color: n === page ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer' }}>{n}</button>
            ))}
        </div>
    );
}

export function LineChart({ data, color, height, labels }: any) { return <div style={{ height: height + 'px', background: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px' }}>Chart Placeholder</div> }