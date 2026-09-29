import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 – Page Not Found | Jefedo',
    description: 'The page you are looking for does not exist. Browse our marketplace to find amazing products.',
};

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body, system-ui, sans-serif)',
            padding: '40px 24px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative background blobs */}
            <div style={{
                position: 'absolute', top: '-120px', left: '-120px',
                width: '500px', height: '500px',
                background: 'var(--primary, #EE1217)',
                borderRadius: '50%',
                filter: 'blur(180px)',
                opacity: 0.12,
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '-120px', right: '-120px',
                width: '500px', height: '500px',
                background: '#f59e0b',
                borderRadius: '50%',
                filter: 'blur(180px)',
                opacity: 0.08,
                pointerEvents: 'none',
            }} />

            {/* Logo */}
            <Link href="/" style={{ marginBottom: '48px', display: 'block' }}>
                <img
                    src="/images/newlogo.png"
                    alt="JEFEDO"
                    style={{ height: '56px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
            </Link>

            {/* Giant 404 */}
            <div style={{
                fontFamily: 'var(--font-display, system-ui, sans-serif)',
                fontSize: 'clamp(100px, 20vw, 200px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-8px',
                background: 'linear-gradient(135deg, #EE1217 0%, #ff6b6b 50%, #EE1217 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
                userSelect: 'none',
            }}>
                404
            </div>

            {/* Emoji */}
            <div style={{ fontSize: '60px', marginBottom: '24px' }}>🔍</div>

            <h1 style={{
                fontFamily: 'var(--font-display, system-ui, sans-serif)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '16px',
                textAlign: 'center',
                letterSpacing: '-1px',
            }}>
                Page Not Found
            </h1>

            <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.55)',
                textAlign: 'center',
                maxWidth: '420px',
                lineHeight: 1.7,
                marginBottom: '48px',
            }}>
                Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}>
                <Link
                    href="/"
                    style={{
                        padding: '14px 32px',
                        background: 'linear-gradient(135deg, #EE1217 0%, #ff4b50 100%)',
                        color: '#fff',
                        borderRadius: '50px',
                        fontWeight: 800,
                        fontSize: '15px',
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(238,18,23,0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    🏠 Go Home
                </Link>
                <Link
                    href="/products"
                    style={{
                        padding: '14px 32px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#fff',
                        borderRadius: '50px',
                        fontWeight: 700,
                        fontSize: '15px',
                        textDecoration: 'none',
                        border: '1.5px solid rgba(255,255,255,0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    🛍️ Browse Shop
                </Link>
                <Link
                    href="/contact"
                    style={{
                        padding: '14px 32px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.7)',
                        borderRadius: '50px',
                        fontWeight: 700,
                        fontSize: '15px',
                        textDecoration: 'none',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    📞 Contact Support
                </Link>
            </div>

            {/* Popular categories */}
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
                    Popular Categories
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { icon: '🧥', label: 'Fashion', slug: 'fashion' },
                        { icon: '💻', label: 'Electronics', slug: 'electronics' },
                        { icon: '🏠', label: 'Home', slug: 'home' },
                        { icon: '✨', label: 'Beauty', slug: 'beauty' },
                        { icon: '⚽', label: 'Sports', slug: 'sports' },
                    ].map(cat => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            style={{
                                padding: '8px 18px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '20px',
                                color: 'rgba(255,255,255,0.75)',
                                fontSize: '13px',
                                fontWeight: 500,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            {cat.icon} {cat.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom brand tagline */}
            <p style={{
                position: 'absolute',
                bottom: '24px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'center',
            }}>
                © {new Date().getFullYear()} Jefedo — Global Multi-Vendor Marketplace
            </p>
        </div>
    );
}
