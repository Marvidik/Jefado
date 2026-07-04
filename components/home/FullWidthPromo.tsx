export default function FullWidthPromo() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 48px' }}>
            <style>{`
                .video-promo-wrap {
                    margin-top: 48px;
                    border-radius: var(--radius-xl);
                    padding: 0;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .video-promo-header {
                    margin-bottom: 32px;
                }
                .video-promo-title {
                    font-family: var(--font-display);
                    font-weight: 800;
                    font-size: 36px;
                    color: var(--text-primary);
                    margin-bottom: 12px;
                    position: relative;
                    z-index: 1;
                }
                .video-promo-desc {
                    font-size: 18px;
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .video-container {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    border-radius: var(--radius-xl);
                    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.15);
                    border: 1px solid var(--border);
                    z-index: 1;
                    background: #000;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .video-bg-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    height: 80%;
                    background: var(--primary);
                    filter: blur(140px);
                    opacity: 0.15;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                }
                @media (max-width: 768px) {
                    .video-promo-wrap {
                        margin-top: 32px;
                    }
                    .video-promo-title {
                        font-size: 28px;
                    }
                    .video-promo-desc {
                        font-size: 15px;
                    }
                }
            `}</style>
            <div
                className="promo-full"
                style={{
                    background: 'linear-gradient(120deg, #f8fafc 0%, var(--primary-light) 100%)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px 48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    position: 'relative',
                    gap: '24px',
                }}
            >
                {/* Circular background highlight */}
                <div
                    style={{
                        position: 'absolute',
                        right: '200px',
                        top: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(26,86,219,0.05)',
                        zIndex: 0,
                    }}
                />

                {/* Text content */}
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            background: 'var(--accent)',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            padding: '4px 14px',
                            borderRadius: '20px',
                            marginBottom: '16px',
                        }}
                    >
                        Start Selling Today
                    </span>
                    <h2
                        className="section-title"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '38px',
                            color: 'var(--text-primary)',
                            letterSpacing: '-1px',
                            marginBottom: '14px',
                        }}
                    >
                        Turn Your Products into Profit
                    </h2>
                    <p
                        style={{
                            fontSize: '16px',
                            color: 'var(--text-muted)',
                            marginBottom: '28px',
                            lineHeight: 1.6,
                        }}
                    >
                        Join thousands of sellers using our platform. Create your account, list your products, and reach buyers instantly with a simple, fast, and secure process.
                    </p>
                    <a
                        href="/auth"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'var(--primary)',
                            color: '#fff',
                            padding: '14px 32px',
                            borderRadius: 'var(--radius)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '15px',
                            boxShadow: '0 6px 24px rgba(26,86,219,0.3)',
                            textDecoration: 'none',
                        }}
                    >
                        Create Account →
                    </a>
                </div>

                {/* Illustration / Image */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                        width: '400px',
                        height: '400px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            background: 'rgba(26,86,219,0.05)',
                        }}
                    >
                        <img
                            src="/images/goods4.PNG"
                            alt="Selling illustration"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>

            {/* Platform Guide Video Section */}
            <div className="video-promo-wrap">
                <div className="video-promo-header">
                    <h3 className="video-promo-title">
                        Master the Platform
                    </h3>
                    <p className="video-promo-desc">
                        Watch our comprehensive quick-start guide to see exactly how you can maximize your sales and manage your products effortlessly.
                    </p>
                </div>
                
                <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
                    <div className="video-bg-glow"></div>
                    <div className="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/97h-ISpDlus?si=ThTDjsDRHkk4WLAH" 
                            title="Platform Guide"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}