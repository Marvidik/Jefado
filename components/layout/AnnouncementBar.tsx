'use client';
import { useState } from 'react';

const announcements = [
    '🔥 Summer Sale — Up to 70% OFF on Electronics. Free Delivery on Orders $50+',
    '⚡ Flash Deal: Apple AirPods Pro — $199 (Was $249). Today Only!',
    '🚀 New Arrivals: Samsung Galaxy S25 Series — Shop Now & Get Free Case',
];

export default function AnnouncementBar() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div style={{
            background: 'var(--announce-bg)',
            color: 'var(--announce-text)',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            padding: '9px 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <div style={{
                    display: 'inline-block',
                    animation: 'ticker 28s linear infinite',
                    paddingLeft: '100%',
                }}>
                    {[...announcements, ...announcements].map((msg, i) => (
                        <span key={i} style={{ marginRight: '80px', opacity: 0.9 }}>{msg}</span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setVisible(false)}
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '0 4px',
                }}
                aria-label="Close"
            >
                ×
            </button>
        </div>
    );
}