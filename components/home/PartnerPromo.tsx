import Link from 'next/link';

export default function PartnerPromo() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 48px' }}>
            <div className="partner-promo-wrap" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: 'var(--radius-xl)',
                padding: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
                gap: '32px'
            }}>
                <div style={{
                    position: 'absolute', top: '-100px', right: '-100px',
                    width: '300px', height: '300px',
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    filter: 'blur(120px)',
                    opacity: 0.15,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(238,18,23,0.15)',
                        color: 'var(--primary)',
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        marginBottom: '16px',
                        border: '1px solid rgba(238,18,23,0.3)'
                    }}>
                        Partnerships
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        color: '#fff',
                        lineHeight: 1.1,
                        letterSpacing: '-1px',
                        marginBottom: '16px'
                    }}>
                        Want to Partner with <span style={{ color: 'var(--primary)' }}>Jefedo?</span>
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '500px',
                        marginBottom: '32px',
                        lineHeight: 1.6
                    }}>
                        Are you a brand, logistics company, service provider, or investor? We want to hear from you. Join us in building the ultimate global marketplace.
                    </p>
                    <Link href="/contact" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #ff4b50 100%)',
                        color: '#fff',
                        padding: '14px 32px',
                        borderRadius: '50px',
                        fontWeight: 800,
                        fontSize: '15px',
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(238,18,23,0.3)',
                        transition: 'transform 0.3s ease'
                    }}>
                        Get in Touch →
                    </Link>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    maxWidth: '400px',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: '100%',
                        position: 'relative',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '100px' }}>
                            🤝
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .partner-promo-wrap {
                        flex-direction: column !important;
                        text-align: center !important;
                        padding: 32px !important;
                    }
                    .partner-promo-wrap > div:nth-child(2) > p {
                        margin: 0 auto 32px !important;
                    }
                }
            `}</style>
        </section>
    );
}
