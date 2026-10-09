'use client';
import { useState, useEffect } from 'react';
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
                // handled per-call above
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
            success('Referral code claimed successfully!');
            setClaimCode('');
            const stats = await getReferralStats().catch(() => null);
            setReferralStats(stats);
        } catch (err: any) {
            toastError(err.response?.data?.message || 'Failed to claim referral code');
        } finally {
            setSubmitting(false);
        }
    };

    const copyCode = () => {
        if (referralCode) {
            navigator.clipboard.writeText(referralCode.code);
            success('Code copied!');
        }
    };

    if (loading) {
        return (
            <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Loading your referral dashboard…</p>
                </div>
            </main>
        );
    }

    const shareLink = referralCode
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/auth?ref=${referralCode.code}`
        : '';

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent(
            `Hey! Join me on Jefedo — Nigeria's best marketplace. Use my referral code *${referralCode?.code}* to sign up and we both earn rewards!\n${shareLink}`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent(
            `Join me on Jefedo — Nigeria's premium marketplace! Use my code ${referralCode?.code} and we both earn rewards 🎁 ${shareLink}`
        );
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const rewardAmount = referralStats ? parseFloat(referralStats.reward_per_referral).toLocaleString() : '500';

    return (
        <>
            <style>{`
                .referral-page {
                    min-height: 80vh;
                    padding: 48px 0 80px;
                }
                .referral-hero {
                    background: linear-gradient(135deg, var(--primary) 0%, #ff4b50 60%, #ff6b35 100%);
                    border-radius: var(--radius-2xl);
                    padding: 56px 48px;
                    text-align: center;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 40px;
                }
                .referral-hero::before {
                    content: '';
                    position: absolute;
                    top: -80px; right: -80px;
                    width: 300px; height: 300px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 50%;
                }
                .referral-hero::after {
                    content: '';
                    position: absolute;
                    bottom: -60px; left: -60px;
                    width: 220px; height: 220px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 50%;
                }
                .referral-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 32px;
                }
                .referral-stat-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    padding: 28px 20px;
                    text-align: center;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .referral-stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 28px rgba(0,0,0,0.07);
                }
                .referral-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin-bottom: 32px;
                }
                .referral-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    padding: 32px;
                }
                .code-box {
                    background: var(--surface-2);
                    border: 2px dashed var(--primary);
                    border-radius: var(--radius-lg);
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin: 20px 0;
                }
                .share-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 13px;
                    font-family: var(--font-body);
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                }
                .referral-history-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    border-bottom: 1px solid var(--border-light);
                }
                .referral-history-row:last-child { border-bottom: none; }
                @media (max-width: 768px) {
                    .referral-hero { padding: 36px 24px; }
                    .referral-stats-grid { grid-template-columns: 1fr; gap: 12px; }
                    .referral-main-grid { grid-template-columns: 1fr; }
                    .referral-card { padding: 24px; }
                }
                @media (max-width: 480px) {
                    .referral-hero { padding: 28px 16px; }
                    .code-box { flex-direction: column; align-items: flex-start; }
                }
            `}</style>

            <main className="container referral-page" style={{ padding: '48px var(--gutter) 80px' }}>

                {/* ── Hero Banner ── */}
                <div className="referral-hero">
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎁</div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,5vw,46px)', margin: '0 0 14px', letterSpacing: '-1.5px' }}>
                            Refer Friends. Earn Rewards.
                        </h1>
                        <p style={{ fontSize: '17px', opacity: 0.9, maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.65 }}>
                            Share your unique referral code and earn <strong>₦{rewardAmount}</strong> wallet bonus for every friend who joins Jefedo. No limits — the more you share, the more you earn!
                        </p>

                        {/* Steps */}
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {[
                                { num: '1', label: 'Copy your code' },
                                { num: '2', label: 'Share with friends' },
                                { num: '3', label: 'Earn ₦' + rewardAmount + ' each' },
                            ].map(step => (
                                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '50px', padding: '10px 20px' }}>
                                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{step.num}</span>
                                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Stats ── */}
                {referralStats && (
                    <div className="referral-stats-grid">
                        {[
                            { icon: '👥', label: 'Total Referrals', value: referralStats.total_referrals },
                            { icon: '✅', label: 'Successful', value: referralStats.successful_referrals },
                            { icon: '💰', label: 'Total Earned', value: '₦' + parseFloat(referralStats.total_earned).toLocaleString() },
                        ].map(stat => (
                            <div key={stat.label} className="referral-stat-card">
                                <div style={{ fontSize: '36px', marginBottom: '10px' }}>{stat.icon}</div>
                                <p style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Your Code & Share + Claim ── */}
                <div className="referral-main-grid">
                    {/* Your Referral Code */}
                    <div className="referral-card">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 6px' }}>Your Referral Code</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 4px' }}>Share this code with friends to earn rewards.</p>

                        <div className="code-box">
                            <span style={{ fontFamily: 'monospace', fontSize: '22px', fontWeight: 800, letterSpacing: '3px', color: 'var(--primary)' }}>
                                {referralCode ? referralCode.code : '—'}
                            </span>
                            <button
                                id="copy-referral-code-btn"
                                onClick={copyCode}
                                disabled={!referralCode}
                                style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)', cursor: referralCode ? 'pointer' : 'not-allowed', opacity: referralCode ? 1 : 0.5, transition: 'all 0.2s' }}
                            >
                                Copy Code
                            </button>
                        </div>

                        {/* Share link */}
                        {referralCode && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Share Link</p>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: '10px 14px', border: '1px solid var(--border)' }}>
                                    <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shareLink}</span>
                                    <button
                                        id="copy-referral-link-btn"
                                        onClick={() => { navigator.clipboard.writeText(shareLink); success('Link copied!'); }}
                                        style={{ padding: '5px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', color: 'var(--text-primary)', flexShrink: 0 }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Social Share */}
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Share via</p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button id="share-whatsapp-btn" className="share-btn" onClick={shareOnWhatsApp} disabled={!referralCode} style={{ background: '#25D366', color: '#fff', opacity: referralCode ? 1 : 0.5 }}>
                                    📱 WhatsApp
                                </button>
                                <button id="share-twitter-btn" className="share-btn" onClick={shareOnTwitter} disabled={!referralCode} style={{ background: '#1DA1F2', color: '#fff', opacity: referralCode ? 1 : 0.5 }}>
                                    🐦 Twitter / X
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Claim a Code */}
                    <div className="referral-card">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 6px' }}>{"Claim a Friend's Code"}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 24px' }}>Enter a referral code from a friend to activate your welcome bonus.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                id="claim-code-input"
                                type="text"
                                placeholder="e.g. JFD-ABCD1234"
                                value={claimCode}
                                onChange={e => setClaimCode(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleClaimReferral()}
                                className="form-input"
                                style={{ width: '100%', fontSize: '15px', letterSpacing: '1px' }}
                            />
                            <button
                                id="claim-referral-btn"
                                onClick={handleClaimReferral}
                                disabled={submitting || !claimCode.trim()}
                                style={{ padding: '13px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: '14px', fontFamily: 'var(--font-body)', cursor: submitting || !claimCode.trim() ? 'not-allowed' : 'pointer', opacity: submitting || !claimCode.trim() ? 0.6 : 1, transition: 'all 0.2s' }}
                            >
                                {submitting ? 'Claiming…' : '🎁 Claim Code'}
                            </button>
                        </div>

                        {/* How it works */}
                        <div style={{ marginTop: '28px', padding: '20px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <p style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 12px' }}>How it works</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    'Share your unique code with friends',
                                    'They register using your code',
                                    'You both earn a wallet bonus',
                                    'Bonuses credited instantly on success',
                                ].map((item, i) => (
                                    <p key={i} style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{'✅ ' + item}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Referral History ── */}
                {referralHistory.length > 0 && (
                    <div className="referral-card">
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', margin: '0 0 20px' }}>Referral History</h2>
                        <div>
                            {referralHistory.map(history => (
                                <div key={history.id} className="referral-history-row">
                                    <div>
                                        <p style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>{history.referrer_email}</p>
                                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '12px' }}>
                                            {new Date(history.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={'status-badge ' + history.status.toLowerCase()}>
                                        {history.status_display}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {referralHistory.length === 0 && !loading && (
                    <div className="referral-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
                        <h3 style={{ fontWeight: 700, margin: '0 0 8px' }}>No referrals yet</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                            Start sharing your code to see your referral history here.
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}
