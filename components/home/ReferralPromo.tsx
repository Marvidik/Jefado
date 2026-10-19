'use client';

import Link from 'next/link';

export default function ReferralPromo() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 48px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    alignItems: 'stretch',
                }}
            >
                {/* ── Card 1: Refer & Earn (Shoppers & Community) ── */}
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderTop: '3px solid var(--primary)',
                        borderRadius: '16px',
                        padding: 'clamp(28px, 4vw, 36px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                            <span
                                style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    display: 'inline-block',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: 'var(--primary)',
                                }}
                            >
                                Community Rewards
                            </span>
                        </div>

                        <h3
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(22px, 3vw, 26px)',
                                lineHeight: 1.25,
                                color: 'var(--text-primary)',
                                margin: '0 0 12px',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            Earn Cash Every Time You Refer
                        </h3>

                        <p
                            style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                margin: '0 0 24px',
                            }}
                        >
                            Share your personal invite link with friends. When they register on Jefedo, you earn cash deposited straight into your wallet balance.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                            {[
                                'Instant wallet bonus for every verified sign-up',
                                'Withdrawable to any Nigerian bank account',
                                'No referral limits — earn as much as you share',
                            ].map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ flexShrink: 0 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                        <Link
                            href="/referral"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'var(--primary)',
                                color: '#ffffff',
                                padding: '12px 22px',
                                borderRadius: '8px',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '14px',
                                textDecoration: 'none',
                                transition: 'opacity 0.15s ease',
                            }}
                        >
                            <span>Get Referral Link</span>
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
                        </Link>

                        <Link
                            href="/referral#claim"
                            style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                            }}
                        >
                            Have a friend&apos;s code?
                        </Link>
                    </div>
                </div>

                {/* ── Card 2: Partner With Jefedo (Commercial & Logistics) ── */}
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderTop: '3px solid var(--secondary)',
                        borderRadius: '16px',
                        padding: 'clamp(28px, 4vw, 36px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                            <span
                                style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: 'var(--secondary)',
                                    display: 'inline-block',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: 'var(--secondary)',
                                }}
                            >
                                Commercial Partnerships
                            </span>
                        </div>

                        <h3
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(22px, 3vw, 26px)',
                                lineHeight: 1.25,
                                color: 'var(--text-primary)',
                                margin: '0 0 12px',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            Grow Your Business with Jefedo
                        </h3>

                        <p
                            style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                margin: '0 0 24px',
                            }}
                        >
                            Are you a brand, supplier, or logistics provider? Partner with our marketplace to connect with verified buyers nationwide with automated disbursements.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                            {[
                                'Direct access to verified buyers across Nigeria',
                                'Automated payment processing and escrow protection',
                                'Dedicated merchant onboarding and vendor support',
                            ].map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--secondary)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ flexShrink: 0 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'var(--secondary)',
                                color: '#ffffff',
                                padding: '12px 22px',
                                borderRadius: '8px',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '14px',
                                textDecoration: 'none',
                                transition: 'opacity 0.15s ease',
                            }}
                        >
                            <span>Partner With Us</span>
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
                        </Link>

                        <Link
                            href="/auth?type=seller"
                            style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                textDecoration: 'none',
                            }}
                        >
                            Become a Seller
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
