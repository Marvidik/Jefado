'use client';
import { useState } from 'react';
const msgs = [
    '🛍️ Buy & Sell Anything — Products, Services, Fashion, Gadgets, Tickets & More',

    '🚀 Grow Your Business on Qavtix Marketplace — Reach Thousands of Buyers Daily',

    '⚡ Flash Deals Happening Now — Discover Amazing Offers From Trusted Sellers',

    '💼 Need a Service? Find Designers, Developers, Event Planners, DJs, MCs & More',

    '📦 Start Selling Today — Upload Your Products or Services in Minutes',

    '🔒 Safe & Secure Payments for Buyers and Sellers Across Nigeria',

    '🎟️ Discover Events, Marketplace Deals & Professional Services All in One Place',

    '🌍 Shop From Local Vendors & Independent Businesses Near You',

    '💰 Turn Your Skills Into Income — Sell Services, Digital Products & Experiences',

    '⭐ Trusted Marketplace for Events, Services, Fashion, Electronics & Lifestyle',

    '📱 New Arrivals Daily — Explore Trending Products and Exclusive Marketplace Offers',
];
export default function AnnouncementBar() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
        <div style={{ background: 'var(--announce-bg)', color: 'var(--announce-text)', fontSize: '13px', fontFamily: 'var(--font-body)', padding: '9px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'inline-block', animation: 'ticker 68s linear infinite', paddingLeft: '100%' }}>
                    {[...msgs, ...msgs].map((m, i) => <span key={i} style={{ marginRight: '80px', opacity: 0.9 }}>{m}</span>)}
                </div>
            </div>
            <button onClick={() => setVisible(false)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '18px' }} aria-label="Close">×</button>
        </div>
    );
}