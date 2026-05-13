'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Show modal on launch
        const timer = setTimeout(() => setIsVisible(true), 100);

        // Auto-close after 15 seconds
        const autoClose = setTimeout(() => {
            handleClose();
        }, 3100);

        return () => {
            clearTimeout(timer);
            clearTimeout(autoClose);
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setIsVisible(false), 500);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            opacity: isClosing ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: isClosing ? 'none' : 'auto',
        }}>
            {/* Overlay */}
            <div
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    animation: 'fadeIn 0.5s ease both',
                }}
            />

            {/* Modal Card */}
            <div style={{
                position: 'relative',
                background: 'var(--surface)',
                width: '100%',
                maxWidth: '520px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animation: isClosing ? 'fadeOutDown 0.5s ease both' : 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}>
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                    @keyframes fadeOutDown { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(30px) scale(0.95); } }
                `}</style>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        zIndex: 2,
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                >✕</button>

                <div style={{ padding: '40px 32px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '28px',
                            color: 'var(--text-primary)',
                            marginBottom: '12px',
                            letterSpacing: '-1px'
                        }}>Welcome to Jefedo</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                            Your premium multi-vendor hub for global commerce.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Sell Option */}
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            padding: '20px',
                            background: 'var(--primary-light)',
                            borderRadius: '16px',
                            border: '1.5px solid rgba(238, 18, 23, 0.1)',
                            transition: 'transform 0.2s',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>🏪</div>
                            <div>
                                <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>Start Selling</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                    Launch your online store in minutes and reach thousands of buyers.
                                </p>
                            </div>
                        </div>

                        {/* Buy Option */}
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            padding: '20px',
                            background: 'var(--accent-light)',
                            borderRadius: '16px',
                            border: '1.5px solid rgba(60, 127, 178, 0.1)',
                            transition: 'transform 0.2s',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>🛍️</div>
                            <div>
                                <h4 style={{ fontWeight: 700, color: 'var(--accent)', marginBottom: '4px' }}>Expert Purchasing</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                    Shop premium products from verified vendors across the globe.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <button
                            onClick={handleClose}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '15px',
                                boxShadow: '0 10px 15px -3px rgba(238, 18, 23, 0.3)',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >Explore Jefedo Now</button>
                    </div>
                </div>

                {/* Progress Bar for auto-close */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '4px',
                    background: 'var(--primary)',
                    width: '100%',
                    transformOrigin: 'left',
                    animation: isClosing ? 'none' : 'timerBar 7s linear forwards'
                }} />
                <style>{`
                    @keyframes timerBar {
                        from { transform: scaleX(1); }
                        to { transform: scaleX(0); }
                    }
                `}</style>
            </div>
        </div>
    );
}
