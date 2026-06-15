'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('jefedo_cookie_consent');
        if (!consent) {
            const t = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('jefedo_cookie_consent', 'accepted');
        setVisible(false);
    };

    const reject = () => {
        localStorage.setItem('jefedo_cookie_consent', 'rejected');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <>
            <style>{`
                @keyframes slideUpCookie {
                    from { transform: translateY(40px); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                .cookie-banner {
                    position: fixed;
                    bottom: 24px;
                    left: 24px;
                    z-index: 9999;
                    width: 340px;
                    animation: slideUpCookie 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                @media (max-width: 480px) {
                    .cookie-banner {
                        left: 12px;
                        right: 12px;
                        bottom: 12px;
                        width: auto;
                    }
                }
                .cookie-reject-btn:hover {
                    background: rgba(255,255,255,0.08) !important;
                    border-color: rgba(255,255,255,0.45) !important;
                    color: #fff !important;
                }
                .cookie-accept-btn:hover {
                    background: var(--primary-dark) !important;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(238,18,23,0.45) !important;
                }
            `}</style>

            <div className="cookie-banner">
                <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(238,18,23,0.15)',
                    padding: '28px 28px 24px',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>

                    {/* Subtle glow accent top */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                        borderRadius: '20px 20px 0 0',
                    }} />

                    {/* Cookie icon */}
                    <div style={{
                        width: '56px', height: '56px',
                        background: 'linear-gradient(135deg, rgba(238,18,23,0.15), rgba(238,18,23,0.05))',
                        border: '1.5px solid rgba(238,18,23,0.25)',
                        borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '28px',
                        margin: '0 auto 16px',
                        boxShadow: '0 4px 16px rgba(238,18,23,0.15)',
                    }}>
                        🍪
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '17px',
                        color: '#ffffff',
                        marginBottom: '10px',
                        letterSpacing: '-0.3px',
                    }}>
                        We Value Your Privacy
                    </h3>

                    {/* Body text */}
                    <p style={{
                        fontSize: '13px',
                        color: '#94a3b8',
                        lineHeight: 1.65,
                        marginBottom: '22px',
                        maxWidth: '400px',
                        margin: '0 auto 22px',
                    }}>
                        We use cookies to enhance your experience, personalise content, and analyse traffic.{' '}
                        <a
                            href="/privacy-policy"
                            style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(238,18,23,0.4)' }}
                        >
                            Learn more
                        </a>
                    </p>

                    {/* Buttons — centered */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            className="cookie-reject-btn"
                            onClick={reject}
                            style={{
                                padding: '11px 32px',
                                background: 'transparent',
                                border: '1.5px solid rgba(255,255,255,0.2)',
                                color: '#94a3b8',
                                borderRadius: '100px',
                                fontSize: '13px',
                                fontWeight: 600,
                                fontFamily: 'var(--font-body)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                letterSpacing: '0.2px',
                            }}
                        >
                            Reject All
                        </button>
                        <button
                            className="cookie-accept-btn"
                            onClick={accept}
                            style={{
                                padding: '11px 36px',
                                background: 'var(--primary)',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '100px',
                                fontSize: '13px',
                                fontWeight: 700,
                                fontFamily: 'var(--font-body)',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                boxShadow: '0 4px 16px rgba(238,18,23,0.35)',
                                letterSpacing: '0.2px',
                            }}
                        >
                            Accept All Cookies
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
