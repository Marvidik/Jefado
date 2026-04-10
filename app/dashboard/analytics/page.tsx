'use client';
import { StatCard, Card, SectionHead, LineChart, DonutChart, PageHeader, Btn } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';
export default function AnalyticsPage() {
    const weekly = [42, 58, 52, 70, 65, 80, 75];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <PageHeader title="Analytics" subtitle="Traffic and performance insights">
                <Btn label="Export" variant="ghost" small icon={Icons.download} />
            </PageHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
                <StatCard icon={Icons.analytics} label="Page Views" value="48.5K" change="+32%" up sparkData={[20, 28, 24, 35, 30, 38, 35, 42]} color="#1a56db" />
                <StatCard icon={Icons.customers} label="Unique Visitors" value="15.5K" change="+18%" up sparkData={[15, 20, 18, 25, 22, 28, 26, 30]} color="#22c55e" />
                <StatCard icon={Icons.orders} label="Avg. Session" value="3m 24s" change="+8%" up sparkData={[2.8, 3, 2.9, 3.2, 3.1, 3.3, 3.2, 3.4]} color="#f97316" />
                <StatCard icon={Icons.reviews} label="Bounce Rate" value="38%" change="-4%" up sparkData={[44, 42, 43, 40, 41, 39, 38, 38]} color="#7c3aed" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Card>
                    <SectionHead title="Weekly Visitors" />
                    <LineChart data={weekly} height={180} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
                </Card>
                <Card>
                    <SectionHead title="Traffic Sources" />
                    <DonutChart segments={[
                        { label: 'Organic Search', value: 45, color: '#1a56db' },
                        { label: 'Direct', value: 28, color: '#f97316' },
                        { label: 'Social Media', value: 18, color: '#22c55e' },
                        { label: 'Referral', value: 9, color: '#e2e8f0' },
                    ]} />
                </Card>
            </div>
            <Card>
                <SectionHead title="Top Products by Views" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { name: 'Sony WH-1000XM5', views: 4820, conv: '8.2%' },
                        { name: 'MacBook Pro 14"', views: 3940, conv: '5.6%' },
                        { name: 'iPhone 15 Pro', views: 3210, conv: '6.8%' },
                        { name: 'AirPods Pro 2', views: 2890, conv: '9.4%' },
                        { name: 'Nike Air Max 90', views: 2340, conv: '4.2%' },
                    ].map((p, i) => (
                        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 13px', background: '#f8fafc', borderRadius: '9px' }}>
                            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '13px', color: '#94a3b8', width: '18px', textAlign: 'center' }}>{i + 1}</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '5px' }}>{p.name}</p>
                                <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(p.views / 4820) * 100}%`, height: '100%', background: '#1a56db', borderRadius: '3px' }} />
                                </div>
                            </div>
                            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '13px', color: '#0f172a', width: '44px', textAlign: 'right' }}>{p.views.toLocaleString()}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', width: '40px', textAlign: 'right' }}>{p.conv}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}