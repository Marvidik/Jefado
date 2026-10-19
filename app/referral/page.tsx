'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getMyCode, getReferralStats, getReferralHistory, claimReferral } from '@/services/referralService';
import { ReferralCode, ReferralStats, ReferralHistory } from '@/services/types';
import { useToast } from '@/components/ui/Toast';
import { tokenStorage } from '@/services/axiosInstance';

export default function ReferralPage() {
    const router = useRouter();
    const { success, error: toastError } = useToast();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [claimCode, setClaimCode] = useState('');
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [historyFilter, setHistoryFilter] = useState<'all' | 'successful' | 'pending'>('all');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
    const [referralHistory, setReferralHistory] = useState<ReferralHistory[]>([]);
    const [referralCode, setReferralCode] = useState<ReferralCode | null>(null);

    useEffect(() => {
        if (!tokenStorage.getAccessToken()) {
            router.replace('/auth?next=/referral');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [stats, history, code] = await Promise.all([
                    getReferralStats().catch(() => null),
                    getReferralHistory().catch(() => []),
                    getMyCode().catch(() => null),
                ]);
                setReferralStats(stats);
                setReferralHistory(history);
                setReferralCode(code);
            } catch {
                // Handled in individual catches
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleClaimReferral = async () => {
        if (!claimCode.trim()) {
            toastError('Please enter a referral code');
            return;
        }
        try {
            setSubmitting(true);
            await claimReferral(claimCode.trim());
            success('Referral code claimed successfully! Welcome bonus credited.');
            setClaimCode('');
            const stats = await getReferralStats().catch(() => null);
            setReferralStats(stats);
            const history = await getReferralHistory().catch(() => []);
            setReferralHistory(history);
        } catch (err: any) {
            toastError(err.response?.data?.message || err.detail || 'Failed to claim referral code');
        } finally {
            setSubmitting(false);
        }
    };

    const copyCode = () => {
        if (referralCode?.code) {
            navigator.clipboard.writeText(referralCode.code);
            setCopiedCode(true);
            success('Referral code copied to clipboard!');
            setTimeout(() => setCopiedCode(false), 2200);
        }
    };

    const shareLink = referralCode
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/auth?ref=${referralCode.code}`
        : '';

    const copyLink = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopiedLink(true);
            success('Share link copied!');
            setTimeout(() => setCopiedLink(false), 2200);
        }
    };

    const shareOnWhatsApp = () => {
        if (!referralCode?.code) return;
        const text = encodeURIComponent(
            `Hey! Join me on Jefedo — Nigeria's best marketplace. Use my invite code *${referralCode.code}* to register and we both earn rewards!\n${shareLink}`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnTwitter = () => {
        if (!referralCode?.code) return;
        const text = encodeURIComponent(
            `Join me on Jefedo — Nigeria's premium marketplace! Use my invite code ${referralCode.code} and we both earn bonus credits 🛍️ ${shareLink}`
        );
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const shareOnTelegram = () => {
        if (!referralCode?.code) return;
        const text = encodeURIComponent(`Shop on Jefedo with my referral code ${referralCode.code} and earn wallet rewards!`);
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${text}`, '_blank');
    };

    const shareNative = () => {
        if (navigator.share && referralCode) {
            navigator
                .share({
                    title: 'Join Jefedo Marketplace',
                    text: `Use my invite code ${referralCode.code} to sign up and get rewards on Jefedo!`,
                    url: shareLink,
                })
                .catch(() => {});
        } else {
            copyLink();
        }
    };

    const rewardAmount = referralStats?.reward_per_referral
        ? parseFloat(referralStats.reward_per_referral).toLocaleString()
        : '100';
    const totalEarnedFormatted = referralStats?.total_earned
        ? parseFloat(referralStats.total_earned).toLocaleString()
        : '0';

    // Filtered History
    const filteredHistory = referralHistory.filter((item) => {
        if (historyFilter === 'successful') return item.status?.toLowerCase() === 'successful' || item.status?.toLowerCase() === 'completed';
        if (historyFilter === 'pending') return item.status?.toLowerCase() === 'pending';
        return true;
    });

    const faqs = [
        {
            q: 'How and when do I get paid?',
            a: `You receive ₦${rewardAmount} credited straight to your Jefedo wallet as soon as your invited friend creates their account and completes verification. You can spend it directly on orders or withdraw to any Nigerian commercial bank account.`,
        },
        {
            q: 'Is there any limit on how many friends I can refer?',
            a: 'None! There is no cap or limit on the number of people you can invite. If you refer 100 friends, you earn wallet credits for each one.',
        },
        {
            q: 'What do my friends receive when using my link?',
            a: 'When your friends sign up through your referral link, they receive welcome shopping privileges, access to exclusive buyer discounts, and instant eligibility for our rewards program.',
        },
        {
            q: 'Can existing users claim my code?',
            a: 'Referral codes are designed for newly registered users or users claiming their initial welcome bonus on their first order.',
        },
    ];

    if (loading) {
        return (
            <main style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            border: '3px solid rgba(238, 18, 23, 0.2)',
                            borderTopColor: 'var(--primary)',
                            animation: 'spin 0.8s linear infinite',
                            margin: '0 auto 20px',
                        }}
                    />
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 6px' }}>
                        Loading Referral Dashboard
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>Syncing your earnings and referral statistics…</p>
                </div>
            </main>
        );
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '32px 0 80px' }}>
            <main className="container" style={{ padding: '0 var(--gutter)' }}>
                
                {/* ── Breadcrumb & Top Indicator ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                        <span>/</span>
                        <Link href="/account" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Account</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Referral Rewards</span>
                    </div>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '100px', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                        Active Referral Bonus • ₦{rewardAmount} / Qualified Sign-up
                    </div>
                </div>

                {/* ── Clean Unified Invite Card ── */}
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderTop: '3px solid var(--primary)',
                        borderRadius: '16px',
                        padding: 'clamp(24px, 4vw, 36px)',
                        marginBottom: '32px',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '18px', marginBottom: '24px' }}>
                        <div>
                            <h1
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 800,
                                    fontSize: 'clamp(24px, 3.5vw, 32px)',
                                    lineHeight: 1.2,
                                    letterSpacing: '-0.8px',
                                    margin: '0 0 8px',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                Invite Friends, Earn ₦{rewardAmount}
                            </h1>
                            <p
                                style={{
                                    fontSize: '15px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5,
                                    margin: 0,
                                    maxWidth: '620px',
                                }}
                            >
                                Share your personal link with friends. When they register on Jefedo, you earn ₦{rewardAmount} cash deposited straight to your wallet balance.
                            </p>
                        </div>

                        {/* Referral Code Badge */}
                        {referralCode && (
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '10px',
                                    padding: '8px 14px',
                                }}
                            >
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>
                                    Your Code:
                                </span>
                                <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px', color: 'var(--primary)', letterSpacing: '1px' }}>
                                    {referralCode.code}
                                </span>
                                <button
                                    id="copy-referral-code-btn"
                                    type="button"
                                    onClick={copyCode}
                                    style={{
                                        background: copiedCode ? '#16a34a' : 'transparent',
                                        color: copiedCode ? '#ffffff' : 'var(--text-primary)',
                                        border: copiedCode ? 'none' : '1px solid var(--border)',
                                        borderRadius: '6px',
                                        padding: '4px 10px',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    {copiedCode ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Single Unified Share Link Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'var(--surface-2)',
                                border: '1.5px solid var(--border)',
                                borderRadius: '10px',
                                padding: '6px 8px 6px 16px',
                                gap: '12px',
                            }}
                        >
                            <span
                                style={{
                                    flex: 1,
                                    fontSize: '13px',
                                    fontFamily: 'monospace',
                                    color: 'var(--text-primary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {shareLink}
                            </span>
                            <button
                                id="copy-referral-link-btn"
                                onClick={copyLink}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: copiedLink ? '#16a34a' : 'var(--primary)',
                                    color: '#ffffff',
                                    padding: '9px 18px',
                                    borderRadius: '6px',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    flexShrink: 0,
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {copiedLink ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        <span>Copy Link</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Clean Share Buttons Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Quick share:</span>

                            <button
                                id="share-whatsapp-btn"
                                type="button"
                                onClick={shareOnWhatsApp}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    borderRadius: '6px',
                                    background: '#25D366',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: 'none',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.18-.553-1.616-.669-2.628-2.316-2.709-2.423-.081-.107-.653-.867-.653-1.654 0-.787.414-1.177.562-1.336.148-.159.324-.199.432-.199.108 0 .216.002.31.006.103.004.24-.04.375.285.14.338.477 1.162.518 1.247.041.085.069.185.012.298-.057.113-.087.185-.172.285-.086.1-.18.223-.257.3-.086.086-.176.18-.076.353.1.173.444.733.953 1.186.656.584 1.21.765 1.383.852.173.086.275.076.377-.04.103-.116.44-.513.558-.689.117-.176.235-.147.393-.088.158.059 1.006.474 1.178.56.173.086.288.13.33.203.042.072.042.421-.102.826z" />
                                </svg>
                                <span>WhatsApp</span>
                            </button>

                            <button
                                id="share-twitter-btn"
                                type="button"
                                onClick={shareOnTwitter}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    borderRadius: '6px',
                                    background: '#0f172a',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: 'none',
                                }}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>X (Twitter)</span>
                            </button>

                            <button
                                type="button"
                                onClick={shareNative}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    borderRadius: '6px',
                                    background: 'var(--surface-2)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-primary)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                                <span>More Options</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Real Metrics from Backend ── */}
                {referralStats && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '16px',
                            marginBottom: '32px',
                        }}
                    >
                        {referralStats.total_referrals !== undefined && (
                            <div
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    padding: '22px 24px',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    Total Referrals
                                </span>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', color: 'var(--text-primary)', margin: '6px 0 0' }}>
                                    {referralStats.total_referrals}
                                </div>
                            </div>
                        )}

                        {referralStats.successful_referrals !== undefined && (
                            <div
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    padding: '22px 24px',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    Successful Referrals
                                </span>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', color: '#16a34a', margin: '6px 0 0' }}>
                                    {referralStats.successful_referrals}
                                </div>
                            </div>
                        )}

                        {referralStats.total_earned !== undefined && (
                            <div
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '16px',
                                    padding: '22px 24px',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    Total Cash Earned
                                </span>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', color: 'var(--primary)', margin: '6px 0 0' }}>
                                    ₦{totalEarnedFormatted}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Two Column Command Center: How It Works & Claim Code ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '24px',
                        marginBottom: '36px',
                    }}
                >
                    {/* Left: How Economics Work */}
                    <div
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '20px',
                            padding: '32px',
                            boxShadow: 'var(--shadow-sm)',
                        }}
                    >
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 8px', color: 'var(--text-primary)' }}>
                            How the Referral Engine Works
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 28px', lineHeight: 1.5 }}>
                            Three transparent steps from sharing your link to seeing cash in your wallet.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            {[
                                {
                                    num: '1',
                                    title: 'Invite Friends or Audience',
                                    text: 'Send your personalized code or share link via social media, chat, or WhatsApp status.',
                                },
                                {
                                    num: '2',
                                    title: 'Friends Register & Shop',
                                    text: 'Your referral code automatically applies to their new account with welcome privileges.',
                                },
                                {
                                    num: '3',
                                    title: 'Instant Cash Credited',
                                    text: `₦${rewardAmount} arrives in your Jefedo wallet. Cash it out to your bank or buy anything you want.`,
                                },
                            ].map((s) => (
                                <div key={s.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'var(--primary-light)',
                                            color: 'var(--primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 800,
                                            fontSize: '13px',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {s.num}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 3px', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                            {s.title}
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                            {s.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Claim a Friend's Code */}
                    <div
                        id="claim"
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '20px',
                            padding: '32px',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: 0, color: 'var(--text-primary)' }}>
                                    Claim an Invite Code
                                </h2>
                                <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(238, 18, 23, 0.08)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '6px' }}>
                                    One-Time Bonus
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>
                                Were you referred by a friend or colleague? Paste their code below to unlock your welcome perks.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                                <input
                                    id="claim-code-input"
                                    type="text"
                                    placeholder="Enter invite code (e.g. J8LJID7X)"
                                    value={claimCode}
                                    onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
                                    onKeyDown={(e) => e.key === 'Enter' && handleClaimReferral()}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        fontSize: '15px',
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '1.5px',
                                        border: '1.5px solid var(--border)',
                                        borderRadius: '12px',
                                        background: 'var(--surface-2)',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                    }}
                                />

                                <button
                                    id="claim-referral-btn"
                                    onClick={handleClaimReferral}
                                    disabled={submitting || !claimCode.trim()}
                                    style={{
                                        padding: '14px 20px',
                                        background: submitting || !claimCode.trim() ? 'var(--border)' : 'var(--primary)',
                                        color: submitting || !claimCode.trim() ? 'var(--text-muted)' : '#ffffff',
                                        borderRadius: '12px',
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        cursor: submitting || !claimCode.trim() ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        border: 'none',
                                    }}
                                >
                                    {submitting ? 'Verifying & Claiming…' : 'Activate Welcome Reward'}
                                </button>
                            </div>
                        </div>

                        {/* Security & Terms reassurance */}
                        <div
                            style={{
                                padding: '14px',
                                background: 'var(--surface-2)',
                                borderRadius: '12px',
                                border: '1px solid var(--border-light)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                Valid on verified active accounts. Both you and your referrer will be notified instantly upon claim.
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Referral History & Activity Feed ── */}
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '32px',
                        marginBottom: '36px',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                                Referral Activity Log
                            </h2>
                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                                Live updates on friends who joined via your personal link
                            </p>
                        </div>

                        {/* Status Filter Tabs */}
                        {referralHistory.length > 0 && (
                            <div style={{ display: 'flex', background: 'var(--surface-2)', padding: '3px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                                {(['all', 'successful', 'pending'] as const).map((filter) => {
                                    const isActive = historyFilter === filter;
                                    return (
                                        <button
                                            key={filter}
                                            type="button"
                                            onClick={() => setHistoryFilter(filter)}
                                            style={{
                                                padding: '6px 14px',
                                                borderRadius: '8px',
                                                background: isActive ? 'var(--surface)' : 'transparent',
                                                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                                                fontWeight: isActive ? 700 : 500,
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {filter}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Table / List */}
                    {filteredHistory.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        <th style={{ padding: '12px 16px', fontWeight: 700 }}>Invited User</th>
                                        <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date Joined</th>
                                        <th style={{ padding: '12px 16px', fontWeight: 700 }}>Reward</th>
                                        <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistory.map((item) => {
                                        const isDone = item.status?.toLowerCase() === 'successful' || item.status?.toLowerCase() === 'completed';
                                        return (
                                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '14px' }}>
                                                <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    {item.referrer_email}
                                                </td>
                                                <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                                    {new Date(item.created_at).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td style={{ padding: '16px', fontWeight: 700, color: '#16a34a' }}>
                                                    +₦{rewardAmount}
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <span
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px',
                                                            padding: '4px 10px',
                                                            borderRadius: '20px',
                                                            fontSize: '12px',
                                                            fontWeight: 700,
                                                            background: isDone ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                            color: isDone ? '#15803d' : '#a16207',
                                                        }}
                                                    >
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isDone ? '#22c55e' : '#eab308' }} />
                                                        {item.status_display || item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : referralHistory.length > 0 ? (
                        <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
                            <p style={{ margin: 0, fontSize: '14px' }}>No entries match the selected filter.</p>
                        </div>
                    ) : (
                        /* Modern, polished empty state */
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '48px 24px',
                                background: 'var(--surface-2)',
                                borderRadius: '16px',
                                border: '1px dashed var(--border)',
                            }}
                        >
                            <div
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'var(--surface)',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    color: 'var(--primary)',
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <line x1="19" y1="8" x2="19" y2="14" />
                                    <line x1="22" y1="11" x2="16" y2="11" />
                                </svg>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 8px' }}>
                                Ready to make your first ₦500?
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                                Share your personal link on WhatsApp or your social feeds. As soon as someone signs up, their record will appear here.
                            </p>
                            <button
                                type="button"
                                onClick={copyLink}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--primary)',
                                    color: '#ffffff',
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                <span>Copy Link & Share Now</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Frequently Asked Questions ── */}
                <div
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '32px',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                >
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 6px', color: 'var(--text-primary)' }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '0 0 24px' }}>
                        Everything you need to know about payouts, limits, and bonus eligibility
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`,
                                        borderRadius: '12px',
                                        background: isOpen ? 'var(--surface-2)' : 'var(--surface)',
                                        overflow: 'hidden',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        style={{
                                            width: '100%',
                                            padding: '18px 20px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            color: 'var(--text-primary)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span>{faq.q}</span>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease',
                                                flexShrink: 0,
                                                color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
                                            }}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <div style={{ padding: '0 20px 18px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>
        </div>
    );
}
