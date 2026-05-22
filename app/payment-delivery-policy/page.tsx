'use client';
import PolicyLayout from '@/components/ui/PolicyLayout';

export default function PaymentDeliveryPolicyPage() {
    const sections = [
        {
            id: 'initial-payment',
            title: '1. Initial Payment Structure',
            icon: '💳',
            content: (
                <div>
                    <p>When placing an order on JEFEDO, the initial payment made by the customer covers:</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '20px 0', background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
                        <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', fontSize: '15px' }}>📦 Order Payment Structure</h4>
                        <div style={{ width: '100%', height: '1px', background: 'var(--border)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span>1. Cost of Goods</span>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Included</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <span>2. Estimated Shipping / Logistics Fee</span>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Not Included</span>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: 'var(--border)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--secondary-dark)', fontWeight: 700 }}>
                            <span>🛒 Order Status</span>
                            <span>PENDING VENDOR CONFIRMATION</span>
                        </div>
                    </div>

                    <p style={{ fontWeight: 600 }}>
                        This initial payment confirms the order and allows the processing and dispatch cycle to begin.
                    </p>
                </div>
            )
        },
        {
            id: 'additional-charges',
            title: '2. Additional Delivery Charges',
            icon: '🚚',
            content: (
                <div>
                    <p>In some specific cases, additional delivery-related costs may arise due to the following variables:</p>
                    <ul>
                        <li><strong>Distance or location constraints</strong>: Highly remote locations requiring extra transport miles.</li>
                        <li><strong>Logistics partner pricing adjustments</strong>: Instant changes in carrier rates.</li>
                        <li><strong>Special handling requirements</strong>: Fragile or temperature-sensitive goods.</li>
                        <li><strong>Large or bulky items</strong>: Heavyweight products requiring dedicated delivery vehicles.</li>
                    </ul>

                    <div style={{
                        marginTop: '20px',
                        background: 'rgba(60, 127, 178, 0.05)',
                        borderLeft: '4px solid var(--secondary)',
                        padding: '18px 24px',
                        borderRadius: '0 12px 12px 0'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                            📢 <strong>Communication</strong>: If such additional costs occur, they will be clearly communicated to the customer after order confirmation but before final dispatch.
                        </p>
                        <p style={{ margin: '8px 0 0', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Orders will only proceed once the customer approves and completes any additional required payment.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'confirmation-process',
            title: '3. Order Confirmation Process',
            icon: '✅',
            content: (
                <div>
                    <p>The standard timeline of an order processing sequence on JEFEDO follows these milestones:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px', marginTop: '20px' }}>
                        {/* Timeline vertical bar */}
                        <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border)' }}></div>

                        {[
                            { step: "01", title: "Initial Payment", desc: "Orders are only considered confirmed after successful initial payment through our checkout gateway." },
                            { step: "02", title: "Assignment", desc: "Verified vendors and appropriate logistics/courier partners are assigned to package your parcel." },
                            { step: "03", title: "Updates", desc: "Customers receive real-time notifications on order status, tracking metrics, or additional logistical requirements." }
                        ].map((milestone, idx) => (
                            <div key={idx} style={{ position: 'relative', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                {/* Timeline Bullet dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-24px',
                                    top: '4px',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    border: '3px solid var(--primary)',
                                    zIndex: 2
                                }}></div>

                                <div>
                                    <h5 style={{ margin: 0, fontWeight: 800, color: 'var(--text-primary)', fontSize: '14px' }}>
                                        {milestone.title} ({milestone.step})
                                    </h5>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        {milestone.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'delivery-timeline',
            title: '4. Delivery Timeline',
            icon: '📅',
            content: (
                <div>
                    <p>Delivery timelines vary and depend closely on multiple parameters:</p>
                    <ul>
                        <li><strong>Vendor processing time</strong>: The duration a seller needs to package and secure the goods.</li>
                        <li><strong>Customer location</strong>: Regional transit times from vendor storefronts to destination points.</li>
                        <li><strong>Logistics availability</strong>: Third-party carrier schedules and route availability.</li>
                    </ul>
                    <p>
                        Estimated delivery times will always be clearly displayed at checkout or detailed in post-confirmation correspondence.
                    </p>
                </div>
            )
        },
        {
            id: 'failed-delivery',
            title: '5. Failed Delivery or Re-delivery',
            icon: '⚠️',
            content: (
                <div>
                    <p>To avoid delivery complications, please ensure your details are complete and precise. Additional re-delivery charges may apply if delivery fails due to:</p>
                    <ul>
                        <li><strong>Incorrect address details</strong> provided by the customer at checkout.</li>
                        <li><strong>Customer unavailability</strong> during scheduled delivery attempts.</li>
                        <li><strong>Refusal to receive goods</strong> at the shipping point without a valid, documented reason.</li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <PolicyLayout
            title="Payment & Delivery Policy"
            subtitle="Logistics & Payments"
            description="Understand how payments, shipping fees, additional bulky item charges, and shipping timelines are handled on the JEFEDO marketplace."
            lastUpdated="May 2026"
            icon="🚚"
            sections={sections}
        />
    );
}
