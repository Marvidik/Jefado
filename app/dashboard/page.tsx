'use client';
import { useState } from 'react';
import { StatCard, Card, LineChart, DonutChart, Badge, Table, PageHeader, SectionHead, Btn, Select } from '@/components/dashboard/ui';
import { Icons } from '@/components/dashboard/icons';

const ORDERS_ROWS = [
    [
        <div key="2" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🕒</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>Analog Table Clock</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>#53200002</span>
            </div>
        </div>,
        <span key="q1" style={{ fontWeight: 600, color: '#334155' }}>x2</span>,
        <span key="d1" style={{ color: '#64748b' }}>Feb 5, 2026</span>,
        <span key="r1" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>$253.82</span>,
        `$60.76`, <Badge key="s1" status="Pending" />,
        <div key="a1" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.edit}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.trash}</button>
        </div>
    ],
    [
        <div key="3" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧺</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>Basket with handles</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>#53200003</span>
            </div>
        </div>,
        <span key="q2" style={{ fontWeight: 600, color: '#334155' }}>x3</span>,
        <span key="d2" style={{ color: '#64748b' }}>Sep 4, 2026</span>,
        <span key="r2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>$556.24</span>,
        `$66.41`, <Badge key="s2" status="Processing" />,
        <div key="a2" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.edit}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.trash}</button>
        </div>
    ],
    [
        <div key="4" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏺</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>Flower vase</span>
                <span style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>#53200004</span>
            </div>
        </div>,
        <span key="q3" style={{ fontWeight: 600, color: '#334155' }}>x2</span>,
        <span key="d3" style={{ color: '#64748b' }}>Dec 21, 2026</span>,
        <span key="r3" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px' }}>$115.26</span>,
        `$85.66`, <Badge key="s3" status="Refunded" />,
        <div key="a3" style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#2563eb'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.edit}</button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#dc2626'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{Icons.trash}</button>
        </div>
    ]
];

const BESTSELLERS_ROWS = [
    [<span key="1" style={{ fontWeight: 700, color: '#0f172a' }}>Deco accessory</span>, <span key="p1" style={{ fontFamily: 'Outfit, sans-serif' }}>$21.16</span>, '400', <span key="pr1" style={{ color: '#059669', fontWeight: 700 }}>+$1,822.87</span>],
    [<span key="2" style={{ fontWeight: 700, color: '#0f172a' }}>Pottery Vase</span>, <span key="p2" style={{ fontFamily: 'Outfit, sans-serif' }}>$14.16</span>, '386', <span key="pr2" style={{ color: '#059669', fontWeight: 700 }}>+$8,543.24</span>],
    [<span key="3" style={{ fontWeight: 700, color: '#0f172a' }}>Rose Holdback</span>, <span key="p3" style={{ fontFamily: 'Outfit, sans-serif' }}>$18.15</span>, '243', <span key="pr3" style={{ color: '#059669', fontWeight: 700 }}>+$7,237.01</span>],
    [<span key="4" style={{ fontWeight: 700, color: '#0f172a' }}>Flowering Cactus</span>, <span key="p4" style={{ fontFamily: 'Outfit, sans-serif' }}>$24.16</span>, '826', <span key="pr4" style={{ color: '#059669', fontWeight: 700 }}>+$19,225.17</span>],
];

function BarChartMock() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '240px', padding: '20px 0 0' }}>
            {[4, 6, 3, 5, 4, 3, 4, 8, 3, 4, 3, 5, 6, 7].map((h, i) => (
                <div key={i} style={{ width: '12px', height: `${h * 24}px`, background: i === 7 ? '#059669' : '#3b82f6', borderRadius: '6px', transition: 'height 0.3s' }} />
            ))}
        </div>
    );
}

export default function DashboardHome() {
    const revenueData = [45, 52, 48, 60, 55, 65, 80, 75, 85, 95, 90, 100];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [range, setRange] = useState('Jan 01 - Jan 28');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PageHeader title="Dashboard" subtitle="Overview of your store's performance.">
                <div style={{ width: '200px' }}>
                    <Select value={range} onChange={setRange} options={['Jan 01 - Jan 28', 'Last 30 Days', 'This Year']} />
                </div>
                <Btn label="Export Report" variant="primary" icon={Icons.plus} />
            </PageHeader>

            {/* ── KPI Cards ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                <StatCard label="Total Revenue" value="$7,825" change="22%" up sparkData={[30, 35, 28, 40, 38, 44, 42, 48]} color="#2563eb" />
                <StatCard label="Total Orders" value="920" change="25%" up={false} sparkData={[50, 45, 42, 40, 38, 34, 30, 28]} color="#dc2626" />
                <StatCard label="Total Visitors" value="15.5K" change="49%" up sparkData={[20, 28, 25, 35, 32, 40, 38, 48]} color="#059669" />
                <StatCard label="Conversion Rate" value="28%" change="1.8%" up sparkData={[22, 24, 23, 26, 25, 27, 26, 28]} color="#2563eb" />
            </div>

            {/* ── Row 2: Bar + Donut ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <Card>
                    <SectionHead title="Store Analytics" action={() => {}} actionLabel="Advanced Report" />
                    <BarChartMock />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
                        <span>20</span><span>22</span><span>24</span><span>26</span><span>28</span><span>30</span><span>02</span><span>04</span><span>06</span><span>08</span><span>10</span><span>12</span><span>14</span><span>16</span>
                    </div>
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                    <SectionHead title="Cart Analysis" />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                            <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="38, 100" />
                            </svg>
                            <span style={{ position: 'absolute', fontSize: '32px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>38%</span>
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '14px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                            <div style={{ color: '#64748b' }}>Abandoned Cart<br/><span style={{ color: '#334155', fontWeight: 700 }}>Lost Revenue</span></div>
                            <div style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>720<br/><span style={{ color: '#dc2626' }}>$5,900</span></div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* ── Row 3: Revenue Device + Traffic ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <Card>
                    <SectionHead title="Revenue by Device" action={() => {}} actionLabel="Full Breakdown" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', margin: '40px 0 60px', justifyContent: 'center' }}>
                        <DonutChart segments={[{ label: 'Desktop', value: 64, color: '#2563eb' }, { label: 'Tablet', value: 15.3, color: '#93c5fd' }, { label: 'Mobile', value: 11.1, color: '#1e3a8a' }, { label: 'Unknown', value: 9.6, color: '#cbd5e1' }]} size={180} />
                    </div>
                </Card>
                <Card>
                    <SectionHead title="Traffic Sources" action={() => {}} actionLabel="Performance" />
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ flex: 1, padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Store Visits</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: 800, margin: 0, color: '#0f172a' }}>8,950</p>
                            <span style={{ fontSize: '13px', color: '#059669', background: '#ecfdf5', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, display: 'inline-block', marginTop: '8px' }}>+22% this week</span>
                        </div>
                        <div style={{ flex: 1, padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Unique Visitors</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: 800, margin: 0, color: '#0f172a' }}>1,520</p>
                            <span style={{ fontSize: '13px', color: '#dc2626', background: '#fef2f2', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, display: 'inline-block', marginTop: '8px' }}>-24% this week</span>
                        </div>
                    </div>
                    <LineChart data={revenueData} color="#2563eb" height={160} labels={MONTHS} />
                </Card>
            </div>

            {/* ── Row 4: Bestsellers + Forecast ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <Card noPad style={{ border: '2px solid #2563eb', overflow: 'hidden' }}>
                    <div style={{ padding: '28px 28px 0', background: '#eff6ff', borderBottom: '1px solid #bfdbfe' }}>
                        <SectionHead title="Bestselling Products" action={() => {}} actionLabel="View Catalog" />
                    </div>
                    <div style={{ padding: '8px' }}>
                        <Table cols={['Product', 'Price', 'Units Sold', 'Net Profit']} rows={BESTSELLERS_ROWS} />
                    </div>
                </Card>
                <Card>
                    <SectionHead title="Sales Forecast" action={() => {}} actionLabel="Prediction" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginTop: '16px' }}>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Revenue</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, margin: 0, color: '#059669' }}>+24.2%</p>
                        </div>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Net Profit</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, margin: 0, color: '#dc2626' }}>-2.5%</p>
                        </div>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Orders</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, margin: 0, color: '#059669' }}>+32.8%</p>
                        </div>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px' }}>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Visitors</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, margin: 0, color: '#059669' }}>+60.0%</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* ── Latest Orders ── */}
            <Card noPad>
                <div style={{ padding: '28px 28px 0' }}>
                    <SectionHead title="Latest Orders" action={() => {}} actionLabel="All Orders" />
                </div>
                <div style={{ padding: '0 8px 8px' }}>
                    <Table cols={['Product Info', 'QTY', 'Date', 'Revenue', 'Net Profit', 'Status', 'Actions']} rows={ORDERS_ROWS} />
                </div>
            </Card>

            <div style={{ textAlign: 'center', padding: '32px 0 24px', fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
                eCommerce Platform © 2026. All rights reserved. Designed to look futuristic.
            </div>
        </div>
    );
}