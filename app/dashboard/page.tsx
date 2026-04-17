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

            {/* ── Row 4: Bestsellers + Forecast ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <Card noPad style={{ border: '2px solid #2563eb', overflow: 'hidden' }}>
                    <div style={{ padding: '28px 28px 0', background: '#eff6ff', borderBottom: '1px solid #bfdbfe' }}>
                        <SectionHead title="Bestselling Products" action={() => { }} actionLabel="View Catalog" />
                    </div>
                    <div style={{ padding: '8px' }}>
                        <Table cols={['Product', 'Price', 'Units Sold', 'Net Profit']} rows={BESTSELLERS_ROWS} />
                    </div>
                </Card>
                <Card>
                    <SectionHead title="Store Analytics" action={() => { }} actionLabel="Advanced Report" />
                    <BarChartMock />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
                        <span>20</span><span>22</span><span>24</span><span>26</span><span>28</span><span>30</span><span>02</span><span>04</span><span>06</span><span>08</span><span>10</span><span>12</span><span>14</span><span>16</span>
                    </div>
                </Card>
            </div>

            {/* ── Latest Orders ── */}
            <Card noPad>
                <div style={{ padding: '28px 28px 0' }}>
                    <SectionHead title="Latest Orders" action={() => { }} actionLabel="All Orders" />
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