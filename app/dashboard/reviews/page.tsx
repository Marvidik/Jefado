'use client';
import { Card, PageHeader, SectionHead } from '@/components/dashboard/ui';
const REVIEWS = [
    { name: 'Alice Johnson', rating: 5, product: 'Sony WH-1000XM5', date: 'Apr 1', text: 'Absolutely amazing headphones! The noise cancellation is top-notch and the battery life is exceptional.', replied: false },
    { name: 'Bob Smith', rating: 4, product: 'MacBook Pro 14"', date: 'Mar 31', text: 'Great laptop, very fast. Battery life could be a bit better though, but overall very satisfied.', replied: true },
    { name: 'Carol White', rating: 5, product: 'Nike Air Max 90', date: 'Mar 30', text: 'Perfect fit and super comfortable. Will definitely order again!', replied: true },
    { name: 'David Brown', rating: 3, product: 'iPad Pro 12.9"', date: 'Mar 29', text: 'Good product but delivery was delayed by 3 days. Customer service was helpful though.', replied: false },
    { name: 'Eva Martinez', rating: 5, product: 'AirPods Pro 2', date: 'Mar 28', text: 'Sound quality is incredible and they fit perfectly. Best purchase I made this year!', replied: false },
];
export default function ReviewsPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Reviews" subtitle="Customer feedback management" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
                <Card>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Average Rating</p>
                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '42px', color: 'var(--dash-primary)', lineHeight: 1 }}>4.8</p>
                    <div style={{ display: 'flex', gap: '3px', margin: '10px 0' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ fontSize: '18px', color: 'var(--dash-primary)' }}>★</span>)}</div>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>From 1,247 reviews</p>
                </Card>
                <Card>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Rating Distribution</p>
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                            <span style={{ fontSize: '12px', color: '#94a3b8', width: '22px' }}>{star}★</span>
                            <div style={{ flex: 1, height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${[78, 14, 5, 2, 1][5 - star]}%`, height: '100%', background: 'var(--dash-primary)', borderRadius: '4px' }} />
                            </div>
                            <span style={{ fontSize: '11px', color: '#94a3b8', width: '28px', textAlign: 'right' }}>{[78, 14, 5, 2, 1][5 - star]}%</span>
                        </div>
                    ))}
                </Card>
                <Card>
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Review Stats</p>
                    {[['Total Reviews', '1,247'], ['Responded', '891 (71%)'], ['Pending Reply', '5'], ['Avg Response', '4h 22m']].map(([l, v]) => (
                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{l}</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{v}</span>
                        </div>
                    ))}
                </Card>
            </div>
            <Card>
                <SectionHead title="Recent Reviews" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {REVIEWS.map(r => (
                        <div key={r.name} style={{ padding: '16px', border: '1px solid #f1f5f9', borderRadius: '10px', transition: 'border-color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#f1f5f9'}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--dash-primary),var(--dash-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{r.name[0]}</div>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{r.name}</p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8' }}>{r.product} · {r.date}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= r.rating ? 'var(--dash-primary)' : '#e2e8f0', fontSize: '14px' }}>★</span>)}</div>
                            </div>
                            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, marginBottom: '12px' }}>{r.text}</p>
                            {!r.replied
                                ? <button style={{ padding: '7px 16px', background: 'var(--dash-primary-light)', color: 'var(--dash-primary)', borderRadius: '7px', fontWeight: 600, fontSize: '12px', fontFamily: 'DM Sans,sans-serif', border: 'none', cursor: 'pointer' }}>Reply →</button>
                                : <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>✓ Replied</span>
                            }
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}