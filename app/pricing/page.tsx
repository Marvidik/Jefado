'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance, { tokenStorage } from '@/services/axiosInstance';
import { useToast } from '@/components/ui/Toast';

const TIERS = [
    {
        name: 'Basic',
        slug: 'basic',
        price: '0',
        period: '/mo',
        description: 'Perfect for individual sellers just starting their journey.',
        features: ['Up to 10 product listings', 'Standard support', 'Basic analytics', 'Verified shop badge', 'Secure payments'],
        buttonText: 'Get Started',
        highlight: false,
    },
    {
        name: 'Pro',
        slug: 'pro',
        price: '15000',
        period: '/mo',
        description: 'Advanced features for growing businesses and power sellers.',
        features: ['Unlimited listings', 'Priority 24/7 support', 'Advanced sales analytics', 'Custom store URL', 'Promotion tools', 'Bulk import/export'],
        buttonText: 'Try Pro Now',
        highlight: true,
    },
    {
        name: 'Enterprise',
        slug: 'enterprise',
        price: 'Custom',
        period: '',
        description: 'Tailored solutions for large-scale vendors and agencies.',
        features: ['Everything in Pro', 'Dedicated account manager', 'API access & integrations', 'Custom contract terms', 'White-labeling options'],
        buttonText: 'Contact Sales',
        highlight: false,
    }
];

export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
    const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
    const router = useRouter();
    const { success, error: toastError } = useToast();

    const handleBuyPlan = async (slug: string) => {
        if (slug === 'enterprise') {
            router.push('/contact');
            return;
        }

        const token = tokenStorage.getAccessToken();
        if (!token) {
            toastError("Please sign in to your seller account to purchase a plan.");
            setTimeout(() => router.push('/auth'), 2000);
            return;
        }

        try {
            setLoadingSlug(slug);
            const response = await axiosInstance.post('/api/v1/transactions/plans/initialize/', {
                plan_slug: slug
            });

            // Handle standard Jefedo response wrapper if present
            const data = (response.data as any).data || response.data;
            
            if (data.authorization_url) {
                success("Redirecting to secure payment...");
                window.location.href = data.authorization_url;
            } else {
                toastError("Could not initialize payment. Please try again.");
            }
        } catch (err: any) {
            console.error("Plan initialization error:", err);
            const msg = err.response?.data?.message || err.message || "An error occurred during checkout.";
            toastError(msg);
        } finally {
            setLoadingSlug(null);
        }
    };

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                padding: '100px 0 160px', 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.15 }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.15 }}></div>

                <div className="container animate-in">
                    <h1 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 800, 
                        fontSize: '52px', 
                        color: '#fff', 
                        marginBottom: '20px',
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1
                    }}>
                        Simple, Transparent <span style={{ color: 'var(--primary)' }}>Pricing</span>
                    </h1>
                    <p style={{ 
                        fontSize: '18px', 
                        color: 'rgba(255,255,255,0.7)', 
                        maxWidth: '600px', 
                        margin: '0 auto 40px',
                        lineHeight: 1.6
                    }}>
                        Choose the perfect plan for your business. Whether you're a local artisan or a global brand, Jefedo scales with you.
                    </p>

                    {/* Billing Toggle */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '16px',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        padding: '6px',
                        borderRadius: '100px',
                        width: 'fit-content',
                        margin: '0 auto',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <button 
                            onClick={() => setBilling('monthly')}
                            style={{ 
                                padding: '10px 24px', 
                                borderRadius: '100px', 
                                background: billing === 'monthly' ? 'var(--primary)' : 'transparent',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '14px',
                                transition: 'all 0.3s'
                            }}
                        >Monthly</button>
                        <button 
                            onClick={() => setBilling('yearly')}
                            style={{ 
                                padding: '10px 24px', 
                                borderRadius: '100px', 
                                background: billing === 'yearly' ? 'var(--primary)' : 'transparent',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '14px',
                                transition: 'all 0.3s'
                            }}
                        >Yearly <span style={{ fontSize: '10px', opacity: 0.8, marginLeft: '4px' }}>Save 20%</span></button>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container" style={{ marginTop: '-100px', paddingBottom: '100px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    {TIERS.map((tier, idx) => (
                        <div key={tier.name} className="animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div style={{ 
                                background: 'var(--surface)', 
                                borderRadius: 'var(--radius-2xl)', 
                                padding: '48px 40px', 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                border: `2px solid ${tier.highlight ? 'var(--primary)' : 'var(--border)'}`,
                                position: 'relative',
                                boxShadow: tier.highlight ? 'var(--shadow-lg)' : 'var(--shadow)',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {tier.highlight && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '0', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)',
                                        background: 'var(--primary)',
                                        color: '#fff',
                                        padding: '6px 20px',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>Most Popular</div>
                                )}

                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>{tier.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)' }}>₦</span>
                                    <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                                        {tier.price === 'Custom' ? 'Custom' : (billing === 'yearly' && tier.price !== '0' ? Math.floor(parseInt(tier.price) * 0.8).toLocaleString() : parseInt(tier.price).toLocaleString())}
                                    </span>
                                    <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>{tier.period}</span>
                                </div>
                                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>{tier.description}</p>

                                <button 
                                    onClick={() => handleBuyPlan(tier.slug)}
                                    disabled={loadingSlug === tier.slug}
                                    style={{ 
                                        width: '100%', 
                                        padding: '16px', 
                                        background: tier.highlight ? 'var(--primary)' : 'var(--surface-2)',
                                        color: tier.highlight ? '#fff' : 'var(--text-primary)',
                                        borderRadius: 'var(--radius-xl)',
                                        fontSize: '15px',
                                        fontWeight: 800,
                                        marginBottom: '40px',
                                        border: tier.highlight ? 'none' : '1.5px solid var(--border)',
                                        transition: 'all 0.2s',
                                        cursor: loadingSlug ? 'wait' : 'pointer',
                                        opacity: loadingSlug && loadingSlug !== tier.slug ? 0.6 : 1
                                    }}
                                >
                                    {loadingSlug === tier.slug ? 'Initializing...' : tier.buttonText}
                                </button>

                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What's Included</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {tier.features.map(f => (
                                            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                                <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ / Support Section */}
            <div style={{ background: 'var(--surface)', padding: '100px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', marginBottom: '24px', letterSpacing: '-1px' }}>Frequently Asked Questions</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Have more questions? Our dedicated support team is here to help you choose the right path for your business.</p>
                            <a href="/contact" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700 }}>Contact Support</a>
                        </div>
                        <div style={{ flex: '1 1 500px', display: 'grid', gap: '24px' }}>
                            {[
                                { q: 'Can I change plans at any time?', a: 'Yes! You can upgrade or downgrade your plan whenever you need from your store dashboard.' },
                                { q: 'Are there any hidden transaction fees?', a: 'No hidden fees. We maintain a transparent 2.5% platform fee on all successful sales for Basic accounts.' },
                                { q: 'How do payouts work?', a: 'Payouts are processed every Friday for balance settled 7 days prior, directly to your linked bank account.' }
                            ].map(faq => (
                                <div key={faq.q} style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>{faq.q}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-in {
                    animation: fadeInUp 0.5s ease backwards;
                }
            `}</style>
        </div>
    );
}
