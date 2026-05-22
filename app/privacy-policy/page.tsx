'use client';
import PolicyLayout from '@/components/ui/PolicyLayout';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            icon: '👋',
            content: (
                <div>
                    <p>
                        Welcome to JEFEDO. We value your privacy and are committed to protecting your personal data while you use our multivendor marketplace platform.
                    </p>
                    <p>
                        This Privacy Policy outlines how JEFEDO collects, uses, shares, and protects your information when you access our website, mobile application, or any other services we offer. By using JEFEDO, you agree to the terms described in this policy.
                    </p>
                </div>
            )
        },
        {
            id: 'information-we-collect',
            title: '2. Information We Collect',
            icon: '📂',
            content: (
                <div>
                    <p>We collect various types of information to provide and improve our services to you:</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ background: 'var(--border-light)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '15px', fontWeight: 800 }}>a. Personal Information</h4>
                            <ul style={{ margin: 0, paddingLeft: 0 }}>
                                <li>Full name</li>
                                <li>Phone number</li>
                                <li>Email address</li>
                                <li>Delivery address</li>
                            </ul>
                        </div>

                        <div style={{ background: 'var(--border-light)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <h4 style={{ color: 'var(--secondary)', marginBottom: '10px', fontSize: '15px', fontWeight: 800 }}>b. Transaction Information</h4>
                            <ul style={{ margin: 0, paddingLeft: 0 }}>
                                <li>Orders placed</li>
                                <li>Payment details (processed securely via payment providers)</li>
                                <li>Purchase history</li>
                            </ul>
                        </div>

                        <div style={{ background: 'var(--border-light)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '15px', fontWeight: 800 }}>c. Technical Data</h4>
                            <ul style={{ margin: 0, paddingLeft: 0 }}>
                                <li>IP address</li>
                                <li>Device information</li>
                                <li>Browser type</li>
                                <li>Usage behavior on the platform</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'how-we-use-your-information',
            title: '3. How We Use Your Information',
            icon: '⚙️',
            content: (
                <div>
                    <p>Your data is used strictly to enhance your trading experience and keep the platform secure:</p>
                    <ul>
                        <li><strong>Process and fulfill orders</strong>: Managing your cart, checkout, payments, and shipments.</li>
                        <li><strong>Connect buyers with vendors</strong>: Allowing seamless communication and order fulfillment between vendors and buyers.</li>
                        <li><strong>Provide customer support</strong>: Assisting you with technical questions, order status inquiries, and resolving disputes.</li>
                        <li><strong>Improve platform performance</strong>: Analyzing platform usage to build faster, cleaner interfaces.</li>
                        <li><strong>Prevent fraud and unauthorized activities</strong>: Monitoring transactions to detect malicious behaviors and protect assets.</li>
                        <li><strong>Send order updates and notifications</strong>: Keeping you updated with real-time transactional logs.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'data-sharing',
            title: '4. Data Sharing',
            icon: '🤝',
            content: (
                <div>
                    <p>We do not sell personal data to third parties. We may share necessary information only with:</p>
                    <ul>
                        <li><strong>Verified vendors</strong>: Standard information required for order fulfillment and shipment.</li>
                        <li><strong>Payment processors</strong>: Secure transaction pipelines (e.g. Flutterwave, Paystack, Stripe) to process payments securely.</li>
                        <li><strong>Logistics/delivery partners</strong>: Addresses and phone numbers so courier partners can reach you.</li>
                        <li><strong>Legal authorities</strong>: If required by applicable laws, court orders, or regulations.</li>
                    </ul>
                    
                    <div style={{
                        marginTop: '20px',
                        background: 'rgba(60, 127, 178, 0.08)',
                        borderLeft: '4px solid var(--secondary)',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--secondary-dark)', fontWeight: 600 }}>
                            🔒 We implement strict non-disclosure agreements with all partner vendors and services to safeguard your personal details.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'data-security',
            title: '5. Data Security',
            icon: '🛡️',
            content: (
                <div>
                    <p>
                        We implement reasonable technical and organizational measures to protect your data from unauthorized access, loss, misuse, alteration, or disclosure.
                    </p>
                    <p>
                        Our platform uses advanced cryptographic protocols (SSL/TLS) for data in transit and high-level encryption for user databases.
                    </p>
                    <div style={{
                        marginTop: '20px',
                        background: 'rgba(238, 18, 23, 0.05)',
                        borderLeft: '4px solid var(--primary)',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                            ⚠️ While we do our utmost to secure your data, please be aware that no online system or electronic transmission is 100% secure.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'cookies-tracking',
            title: '6. Cookies & Tracking',
            icon: '🍪',
            content: (
                <div>
                    <p>JEFEDO may use cookies to optimize platform performance and improve your user experience:</p>
                    <ul>
                        <li><strong>Improve user experience</strong>: Remembering language preferences, theme states, and display filters.</li>
                        <li><strong>Remember login sessions</strong>: Letting you browse securely without entering your credentials on every page load.</li>
                        <li><strong>Analyze platform usage</strong>: Helping our developers understand feature hot-spots and improve general navigation speed.</li>
                    </ul>
                    <p>
                        Users may disable cookies in their web browser settings, but please note that some essential features of our multivendor marketplace may not function properly as a result.
                    </p>
                </div>
            )
        },
        {
            id: 'user-rights',
            title: '7. User Rights',
            icon: '👤',
            content: (
                <div>
                    <p>As a JEFEDO user, you possess full control over your personal data. You may request:</p>
                    <ul>
                        <li><strong>Access to your personal data</strong>: Requesting a full log of all personal information we hold on your account.</li>
                        <li><strong>Correction of incorrect data</strong>: Requesting instant rectifications to typos or outdated personal records.</li>
                        <li><strong>Deletion of account data</strong>: Subject to legal or transactional retention requirements (such as ongoing mediation or active order logs).</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact our administrative desk at <strong>support@jefedo.com</strong>.
                    </p>
                </div>
            )
        },
        {
            id: 'data-retention',
            title: '8. Data Retention',
            icon: '⏳',
            content: (
                <div>
                    <p>
                        We retain user data as long as necessary to fulfill orders, comply with legal obligations, and resolve outstanding disputes.
                    </p>
                    <p>
                        When data is no longer required for regulatory compliance or transactional transparency, we securely purge or anonymize the database records.
                    </p>
                </div>
            )
        },
        {
            id: 'updates-to-policy',
            title: '9. Updates to Policy',
            icon: '📣',
            content: (
                <div>
                    <p>
                        JEFEDO reserves the right to update this Privacy Policy periodically to reflect shifts in privacy laws or changes in our operational procedures.
                    </p>
                    <p>
                        Users will be notified of significant changes through banners on the platform or direct email announcements. We encourage you to review this policy page occasionally to stay informed.
                    </p>
                </div>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Privacy Policy"
            subtitle="Security & Privacy"
            description="At JEFEDO, we value your privacy and are committed to protecting your personal data while you use our multivendor marketplace platform."
            lastUpdated="May 2026"
            icon="🛡️"
            sections={sections}
        />
    );
}
