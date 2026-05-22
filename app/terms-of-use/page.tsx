'use client';
import PolicyLayout from '@/components/ui/PolicyLayout';

export default function TermsOfUsePage() {
    const sections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            icon: '👋',
            content: (
                <div>
                    <p>
                        Welcome to JEFEDO, a multivendor e-commerce platform that connects buyers and independent vendors.
                    </p>
                    <p>
                        By accessing or using JEFEDO, you agree to be bound by these Terms of Use. If you do not agree to all of the terms, you must not use or access the platform.
                    </p>
                </div>
            )
        },
        {
            id: 'platform-role',
            title: '2. Platform Role (Important Legal Protection)',
            icon: '⚖️',
            content: (
                <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        🛡️ JEFEDO acts strictly as a marketplace intermediary.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ background: 'rgba(238, 18, 23, 0.03)', border: '1px solid rgba(238, 18, 23, 0.1)', borderRadius: '16px', padding: '20px' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '15px', fontWeight: 800 }}>🛡️ What JEFEDO Does NOT Do:</h4>
                            <ul style={{ margin: 0, paddingLeft: 0 }}>
                                <li>JEFEDO does NOT own, sell, or directly supply products listed by vendors.</li>
                                <li>All products listed are the exclusive responsibility of their respective individual vendors.</li>
                            </ul>
                        </div>
                        
                        <div style={{ background: 'rgba(60, 127, 178, 0.03)', border: '1px solid rgba(60, 127, 178, 0.1)', borderRadius: '16px', padding: '20px' }}>
                            <h4 style={{ color: 'var(--secondary)', marginBottom: '12px', fontSize: '15px', fontWeight: 800 }}>⚙️ What JEFEDO Does:</h4>
                            <ul style={{ margin: 0, paddingLeft: 0 }}>
                                <li>We facilitate vendor listings.</li>
                                <li>We process secure payments.</li>
                                <li>We provide order management support.</li>
                            </ul>
                        </div>
                    </div>

                    <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 800, marginBottom: '12px' }}>🏬 Each vendor is independently responsible for:</h4>
                    <ul>
                        <li>Product quality and authenticity.</li>
                        <li>Accuracy of listings and descriptions.</li>
                        <li>Fulfillment, packaging, and delivery.</li>
                        <li>Customer service directly related to their products.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'user-eligibility',
            title: '3. User Eligibility',
            icon: '👤',
            content: (
                <div>
                    <p>To access and use JEFEDO, you must meet the following eligibility criteria:</p>
                    <ul>
                        <li>Be at least <strong>18 years old</strong> or have explicit legal guardian consent.</li>
                        <li>Provide accurate, current, and complete personal details during registration.</li>
                        <li>Use the platform in strict compliance with all local and international applicable laws.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'account-responsibility',
            title: '4. Account Responsibility',
            icon: '🔒',
            content: (
                <div>
                    <p>When you create an account, you are solely responsible for:</p>
                    <ul>
                        <li>Maintaining the absolute confidentiality of your account login details and password.</li>
                        <li>All actions and transactions conducted under your account.</li>
                        <li>Immediately notifying JEFEDO support in case of suspected unauthorized access.</li>
                    </ul>
                    <div style={{
                        marginTop: '20px',
                        background: 'var(--border-light)',
                        borderLeft: '4px solid var(--text-muted)',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                            ⚠️ <strong>Liability disclaimer</strong>: JEFEDO is not liable for any losses or damages caused by unauthorized use of your account.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'orders-payments',
            title: '5. Orders and Payments',
            icon: '💳',
            content: (
                <div>
                    <p>Standard payment and order conditions on JEFEDO:</p>
                    <ul>
                        <li>All orders placed on the platform are subject to acceptance and final confirmation by the vendor.</li>
                        <li>Your initial payment covers product cost and estimated delivery fees.</li>
                        <li>Additional delivery or handling charges may be communicated after order confirmation as per platform policy (e.g. for heavy packaging or remote locations).</li>
                        <li>Orders are not guaranteed or locked until confirmed by the vendor or platform systems.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'pricing-availability',
            title: '6. Pricing and Availability',
            icon: '🏷️',
            content: (
                <div>
                    <p>Pricing and stock limits are governed directly by individual sellers:</p>
                    <ul>
                        <li>Product prices are set directly by the individual vendors, not by JEFEDO.</li>
                        <li>Prices and discount rates may change without prior notice.</li>
                        <li>JEFEDO is not responsible for pricing errors made by vendors.</li>
                        <li>Product availability is not guaranteed until final order confirmation.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'refunds-returns',
            title: '7. Refunds and Returns',
            icon: '💰',
            content: (
                <div>
                    <p>All refunds and dispute requests are handled strictly in accordance with JEFEDO&apos;s legal framework:</p>
                    <ul>
                        <li>All refunds are governed exclusively by the <a href="/refund-policy" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>JEFEDO Refund Policy</a>.</li>
                        <li><strong>Key rule</strong>: Refunds are only valid if requested within <strong>24 hours</strong> after order completion.</li>
                        <li>After this 24-hour window, all transactions on the platform are considered final and non-refundable.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'delivery-terms',
            title: '8. Delivery Terms',
            icon: '🚚',
            content: (
                <div>
                    <p>Shipments and logistics constraints:</p>
                    <ul>
                        <li>Delivery is handled by independent vendors or third-party logistics partners.</li>
                        <li>Delivery timelines are estimates only and do not constitute absolute guarantees.</li>
                        <li>Additional delivery fees may apply in certain cases and will be clearly communicated before parcel dispatch.</li>
                        <li>JEFEDO is not responsible for delays caused by logistics providers or external environmental factors.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'prohibited-activities',
            title: '9. Prohibited Activities',
            icon: '🚫',
            content: (
                <div>
                    <p>To preserve platform integrity, users must <strong>NOT</strong> under any circumstances:</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '16px' }}>
                        {[
                            "Use the platform for fraud, theft, or illegal activities.",
                            "Upload false product listings or misleading information.",
                            "Attempt to hack, disrupt, or damage the platform software.",
                            "Use bots, crawlers, or automated scraping systems without permission.",
                            "Harass vendors, buyers, or JEFEDO support staff.",
                            "Place fake, abusive, or spam orders."
                        ].map((activity, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'rgba(238, 18, 23, 0.02)',
                                border: '1px solid rgba(238, 18, 23, 0.05)',
                                borderRadius: '12px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center'
                            }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>⛔</span>
                                <span style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{activity}</span>
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: '20px', fontWeight: 700, color: 'var(--primary)' }}>
                        ⚠️ Violation of these prohibited activities will result in immediate account suspension or permanent ban.
                    </p>
                </div>
            )
        },
        {
            id: 'vendor-rules',
            title: '10. Vendor Rules',
            icon: '🏬',
            content: (
                <div>
                    <p>To maintain JEFEDO&apos;s elite standards, registered vendors must strictly comply with:</p>
                    <ul>
                        <li>Providing 100% accurate product descriptions and specifications.</li>
                        <li>Fulfilling orders promptly within the agreed dispatch timelines.</li>
                        <li>Avoiding misleading pricing schemas, placeholder items, or fake listings.</li>
                        <li>Handling customer disputes and return requests professionally and promptly.</li>
                    </ul>
                    <p>
                        JEFEDO reserves the absolute right to suspend, terminate, or remove vendors who violate platform rules or display poor performance metrics.
                    </p>
                </div>
            )
        },
        {
            id: 'limitation-liability',
            title: '11. Limitation of Liability',
            icon: '⚠️',
            content: (
                <div>
                    <p>Under the maximum extent permitted by law, JEFEDO is <strong>NOT</strong> liable for:</p>
                    <ul>
                        <li>Damaged, defective, or incorrect products supplied by independent vendors.</li>
                        <li>Delivery delays, transit losses, or errors caused by third-party logistics companies.</li>
                        <li>Losses resulting directly from incorrect user profiles, shipping addresses, or telephone inputs.</li>
                        <li>Interpersonal disputes between buyers and vendors.</li>
                    </ul>
                    <p>
                        Our legal liability is limited strictly to the facilitation of the digital marketplace platform.
                    </p>
                </div>
            )
        },
        {
            id: 'dispute-resolution',
            title: '12. Dispute Resolution',
            icon: '⚖️',
            content: (
                <div>
                    <p>In case of conflict between buyers and sellers:</p>
                    <ul>
                        <li>JEFEDO may, at its sole discretion, mediate disputes between users and vendors.</li>
                        <li>Final mediation resolutions and decisions will be based on available transaction records and proofs.</li>
                        <li>Users agree to cooperate and provide necessary details, photos, or billing screenshots during mediation.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'suspension-termination',
            title: '13. Account Suspension and Termination',
            icon: '🚫',
            content: (
                <div>
                    <p>JEFEDO reserves the right, at its sole discretion and without prior notice, to:</p>
                    <ul>
                        <li>Suspend or permanently terminate user accounts violating these Terms of Use.</li>
                        <li>Delete, flag, or remove product listings that breach platform rules.</li>
                        <li>Restrict or terminate access to the JEFEDO marketplace platform at any time.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'changes-terms',
            title: '14. Changes to Terms',
            icon: '📝',
            content: (
                <div>
                    <p>JEFEDO may update these Terms of Use at any time to adapt to new regulatory frameworks or site features:</p>
                    <ul>
                        <li>Updates will be posted directly on this policy page.</li>
                        <li>Your continued use of the platform following the publication of changes constitutes implicit acceptance of the updated terms.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'governing-law',
            title: '15. Governing Law',
            icon: '🌍',
            content: (
                <div>
                    <p>
                        These Terms of Use are governed by, and interpreted in accordance with, the applicable laws in the jurisdiction where JEFEDO operates.
                    </p>
                </div>
            )
        },
        {
            id: 'contact-info',
            title: '16. Contact Information',
            icon: '📧',
            content: (
                <div>
                    <p>For questions, legal compliance inquiries, or disputes:</p>
                    <ul>
                        <li>Contact JEFEDO support via the official support mail: <strong>support@jefedo.com</strong>.</li>
                        <li>Submit inquiries through official platform contact forms at `/contact`.</li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Terms of Use"
            subtitle="Terms & Conditions"
            description="Welcome to JEFEDO. By accessing or using our multivendor e-commerce platform, you agree to be bound by these Terms of Use."
            lastUpdated="May 2026"
            icon="⚖️"
            sections={sections}
        />
    );
}
