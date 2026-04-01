export default function FullWidthPromo() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 28px' }}>
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
                        href="/signup"
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
                            src="/images/goods4.PNG" // Replace with your transparent illustration
                            alt="Selling illustration"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}