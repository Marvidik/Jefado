'use client';
import PolicyLayout from '@/components/ui/PolicyLayout';

export default function RefundPolicyPage() {
    const sections = [
        {
            id: 'overview',
            title: '1. Overview',
            icon: '📋',
            content: (
                <div>
                    <p>
                        At JEFEDO, we aim to ensure smooth transactions between buyers and vendors on our platform.
                    </p>
                    <p>
                        Due to the nature of a multivendor marketplace, refund requests are handled under clearly defined conditions to protect both customers and vendors. We mediate disputes fairly to establish an elite standard of commerce.
                    </p>
                </div>
            )
        },
        {
            id: 'refund-eligibility',
            title: '2. Refund Eligibility',
            icon: '⏱️',
            content: (
                <div>
                    <p>Refunds are strictly bound by a time-sensitive window to maintain operational clarity for vendors:</p>
                    
                    <div style={{
                        background: 'rgba(238, 18, 23, 0.05)',
                        border: '1px dashed var(--primary)',
                        padding: '24px',
                        borderRadius: '16px',
                        marginBottom: '16px',
                        position: 'relative'
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '20px',
                            background: 'var(--primary)',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 12px',
                            borderRadius: '100px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>Time Limit</span>
                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)', fontSize: '16px', lineHeight: 1.6 }}>
                            ⏱️ A refund may only be requested within 24 hours after order completion.
                        </p>
                        <p style={{ margin: '10px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            An order is marked complete after the customer confirms receipt or when our logistics partners mark the delivery as completed in the system.
                        </p>
                    </div>
                    
                    <p style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: '20px' }}>
                        🚫 After this 24-hour window, all transactions are considered final and non-refundable.
                    </p>
                </div>
            )
        },
        {
            id: 'conditions-approval',
            title: '3. Conditions for Refund Approval',
            icon: '✔️',
            content: (
                <div>
                    <p>Refunds may only be approved under the following specific conditions:</p>
                    <ul style={{ marginBottom: '24px' }}>
                        <li><strong>Item delivered is significantly different</strong> from what was ordered (e.g. incorrect color, incorrect size, or incorrect model).</li>
                        <li><strong>Item is damaged upon delivery</strong> (must be proven with clear, unedited photographic or video evidence).</li>
                        <li><strong>Item was not delivered at all</strong> (verified through tracking anomalies or shipping vendor feedback).</li>
                        <li><strong>Duplicate payment or system billing error</strong> that led to double-charging.</li>
                    </ul>

                    <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>📝 All refund requests MUST include:</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                            <span style={{ fontSize: '24px' }}>🆔</span>
                            <h5 style={{ margin: '8px 0 4px', fontWeight: 800, color: 'var(--text-primary)' }}>Order ID</h5>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Unique transaction tag</p>
                        </div>
                        <div style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                            <span style={{ fontSize: '24px' }}>📸</span>
                            <h5 style={{ margin: '8px 0 4px', fontWeight: 800, color: 'var(--text-primary)' }}>Evidence Proof</h5>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Photos/videos showing issues</p>
                        </div>
                        <div style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                            <span style={{ fontSize: '24px' }}>✍️</span>
                            <h5 style={{ margin: '8px 0 4px', fontWeight: 800, color: 'var(--text-primary)' }}>Issue Description</h5>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Detailed explanation of case</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'non-refundable-cases',
            title: '4. Non-Refundable Cases',
            icon: '❌',
            content: (
                <div>
                    <p>Refunds will <strong>NOT</strong> be granted in the following situations:</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                        {[
                            { title: "Change of mind", desc: "Customer changes mind after order dispatch or delivery." },
                            { title: "Logistics delay", desc: "Delays caused by third-party courier services after item dispatch." },
                            { title: "Incorrect product reading", desc: "Failure to read product listings or specifications properly before purchase." },
                            { title: "Out of window", desc: "Requests made more than 24 hours after the order is marked completed." },
                            { title: "Non-refundable items", desc: "Items specifically marked as final sale or non-refundable by the vendor." }
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(238, 18, 23, 0.02)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px' }}>0{idx + 1}</span>
                                <div>
                                    <h5 style={{ margin: '0 0 4px', fontWeight: 800, color: 'var(--text-primary)', fontSize: '14px' }}>{item.title}</h5>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'refund-processing',
            title: '5. Refund Processing',
            icon: '💳',
            content: (
                <div>
                    <p>Once approved, the refund will be processed back via our standard pipelines:</p>
                    <ul>
                        <li><strong>Payment channel</strong>: Approved refunds will be processed back to the original payment method or wallet balance (depending on system availability).</li>
                        <li><strong>Processing time</strong>: Processing time typically takes <strong>3–10 business days</strong> depending on financial institutions and credit card issuers.</li>
                        <li><strong>Dispute mediation</strong>: JEFEDO reserves the right to mediate disputes between buyers and vendors to ensure fairness.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'vendor-responsibility',
            title: '6. Vendor Responsibility',
            icon: '🏬',
            content: (
                <div>
                    <p>Each registered vendor on JEFEDO is responsible for ensuring:</p>
                    <ul>
                        <li><strong>Accuracy</strong> of product listings, sizes, colors, and stock descriptions.</li>
                        <li><strong>Proper packaging</strong> and secure dispatching of products to prevent transit damage.</li>
                        <li><strong>Fulfillment</strong> of orders exactly as described in the platform listings.</li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Refund Policy"
            subtitle="Disputes & Refunds"
            description="At JEFEDO, we aim to ensure smooth transactions between buyers and vendors on our platform. Read our structured policy regarding refund eligibility."
            lastUpdated="May 2026"
            icon="💰"
            sections={sections}
        />
    );
}
