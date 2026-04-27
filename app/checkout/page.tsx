'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ALL_PRODUCTS, ALL_SERVICES } from '@/lib/data';

/* ── Types ──────────────────────────────── */
interface FormData {
    firstName: string; lastName: string; email: string; phone: string;
    address: string; city: string; state: string; zip: string; country: string;
    saveAddress: boolean;
    cardNumber: string; cardName: string; expiry: string; cvv: string;
    paymentMethod: 'card' | 'paypal' | 'bank' | 'mobile';
}

interface OrderItem {
    id: number;
    name: string;
    emoji: string;
    price: number;
    qty: number;
    color?: string;
    seller: string;
    date?: string;
    time?: string;
}

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Nigeria', 'South Africa', 'India', 'Singapore'];
const US_STATES = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington'];

/* ── Step indicator ─────────────────────── */
function StepBar({ step, isService }: { step: number; isService: boolean }) {
    const steps = [isService ? 'Service Location' : 'Shipping', 'Payment', 'Review'];
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', gap: '0' }}>
            {steps.map((label, i) => {
                const num = i + 1;
                const done = step > num;
                const active = step === num;
                return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: done ? 'var(--success)' : active ? 'var(--primary)' : 'var(--border)',
                                color: done || active ? '#fff' : 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px',
                                transition: 'all 0.3s',
                            }}>
                                {done ? '✓' : num}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: active ? 700 : 400, color: active ? 'var(--primary)' : done ? 'var(--success)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div style={{ width: '80px', height: '2px', background: step > num ? 'var(--success)' : 'var(--border)', margin: '0 8px', marginBottom: '22px', transition: 'background 0.3s' }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ── Input field ────────────────────────── */
function Field({ label, value, onChange, placeholder, type = 'text', required = false, maxLength }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; required?: boolean; maxLength?: number;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {label}{required && <span style={{ color: 'var(--danger)', marginLeft: '2px' }}>*</span>}
            </label>
            <input
                type={type} value={value} maxLength={maxLength}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                style={{
                    padding: '10px 14px', fontSize: '14px',
                    border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)', outline: 'none',
                    fontFamily: 'var(--font-body)', background: 'var(--surface)',
                    color: 'var(--text-primary)', transition: 'border-color 0.2s', width: '100%',
                }}
            />
        </div>
    );
}

/* ── Select field ───────────────────────── */
function SelectField({ label, value, onChange, options, required }: {
    label: string; value: string; onChange: (v: string) => void;
    options: string[]; required?: boolean;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {label}{required && <span style={{ color: 'var(--danger)', marginLeft: '2px' }}>*</span>}
            </label>
            <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '10px 14px', fontSize: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', outline: 'none', fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--text-primary)', cursor: 'pointer', width: '100%' }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

/* ── Order summary sidebar ──────────────── */
function OrderSidebar({ items, coupon, setCoupon }: { items: OrderItem[]; coupon: number; setCoupon: (n: number) => void }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [applied, setApplied] = useState('');

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 0;
    const couponSave = (subtotal * coupon) / 100;
    const total = subtotal + shipping - couponSave;

    const VALID: Record<string, number> = { SAVE10: 10, JEFADO20: 20, WELCOME15: 15 };

    const apply = () => {
        const k = code.toUpperCase().trim();
        if (VALID[k]) { setCoupon(VALID[k]); setApplied(k); setError(''); }
        else { setError('Invalid code'); setCoupon(0); setApplied(''); }
    };

    return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '24px', position: 'sticky', top: '80px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '18px' }}>Your Order</h3>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, position: 'relative', border: '1px solid var(--border)' }}>
                            {item.emoji}
                            <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--primary)', color: '#fff', fontSize: '9px', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '2px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                {item.date ? `📅 ${item.date} @ ${item.time}` : `${item.color || ""} · ${item.seller}`}
                            </p>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--primary)', flexShrink: 0 }}>₦{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '14px', marginBottom: '14px' }}>
                {/* Coupon */}
                <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input value={code} onChange={e => { setCode(e.target.value); setError(''); }} placeholder="Coupon code"
                            style={{ flex: 1, padding: '8px 11px', border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border)'}`, borderRadius: 'var(--radius)', fontSize: '12px', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--surface-2)', minWidth: 0 }}
                        />
                        <button onClick={apply} style={{ padding: '8px 12px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)', flexShrink: 0 }}>Apply</button>
                    </div>
                    {error && <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '3px' }}>{error}</p>}
                    {applied && <p style={{ fontSize: '11px', color: 'var(--success)', marginTop: '3px', fontWeight: 600 }}>✓ {VALID[applied]}% off applied!</p>}
                </div>

                {/* Totals */}
                {[
                    { label: 'Subtotal', value: `₦${subtotal.toFixed(2)}` },
                    { label: 'Shipping/Service Fee', value: 'FREE', green: true },
                    ...(applied ? [{ label: `Coupon (${applied})`, value: `-₦${couponSave.toFixed(2)}`, green: true }] : []),
                ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                        <span style={{ fontWeight: 600, color: row.green ? 'var(--success)' : 'var(--text-primary)' }}>{row.value}</span>
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '2px solid var(--border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--primary)' }}>₦{total.toFixed(2)}</span>
            </div>

            {/* Trust */}
            <div style={{ marginTop: '16px', padding: '12px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '8px' }}>🔒 Secured by SSL encryption</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '20px' }}>
                    {['💳', '🏦', '📱', '🅿️'].map((ic, i) => <span key={i}>{ic}</span>)}
                </div>
            </div>
        </div>
    );
}

/* ── Step 1: Shipping form ──────────────── */
function ShippingStep({ form, setForm, onNext, isService }: {
    form: FormData; setForm: (f: FormData) => void; onNext: () => void; isService: boolean;
}) {
    const set = (k: keyof FormData) => (v: string | boolean) => setForm({ ...form, [k]: v });

    const valid = form.firstName && form.lastName && form.email && form.phone && form.address && form.city && form.zip && form.country;

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>
                {isService ? 'Service Location' : 'Shipping Information'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                {isService ? "Please provide the address where you want our professional to meet you." : "Provide your delivery address below."}
            </p>

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <Field label="First Name" value={form.firstName} onChange={set('firstName') as (v: string) => void} placeholder="John" required />
                <Field label="Last Name" value={form.lastName} onChange={set('lastName') as (v: string) => void} placeholder="Doe" required />
            </div>

            {/* Email + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <Field label="Email Address" value={form.email} onChange={set('email') as (v: string) => void} placeholder="john@example.com" type="email" required />
                <Field label="Phone Number" value={form.phone} onChange={set('phone') as (v: string) => void} placeholder="+1 234 567 8900" type="tel" required />
            </div>

            {/* Address */}
            <div style={{ marginBottom: '14px' }}>
                <Field label="Street Address" value={form.address} onChange={set('address') as (v: string) => void} placeholder="123 Main Street, Apt 4B" required />
            </div>

            {/* City + State + Zip */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <Field label="City" value={form.city} onChange={set('city') as (v: string) => void} placeholder="New York" required />
                <SelectField label="State" value={form.state} onChange={set('state') as (v: string) => void} options={US_STATES} />
                <Field label="ZIP / Postal Code" value={form.zip} onChange={set('zip') as (v: string) => void} placeholder="10001" required maxLength={10} />
            </div>

            {/* Country */}
            <div style={{ marginBottom: '20px' }}>
                <SelectField label="Country" value={form.country} onChange={set('country') as (v: string) => void} options={COUNTRIES} required />
            </div>

            {/* Save address */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.saveAddress} onChange={e => set('saveAddress')(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                Save this {isService ? 'location' : 'address'} for future orders
            </label>

            <button onClick={() => valid && onNext()} style={{ width: '100%', padding: '14px', background: valid ? 'var(--primary)' : 'var(--border)', color: valid ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: valid ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: valid ? '0 4px 20px rgba(26,86,219,0.25)' : 'none' }}>
                Continue to Payment →
            </button>
        </div>
    );
}

/* ── Step 2: Payment form ───────────────── */
function PaymentStep({ form, setForm, onNext, onBack }: {
    form: FormData; setForm: (f: FormData) => void; onNext: () => void; onBack: () => void;
}) {
    const set = (k: keyof FormData) => (v: string) => setForm({ ...form, [k]: v });

    const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const formatExpiry = (v: string) => {
        const digits = v.replace(/\D/g, '').slice(0, 4);
        return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    };

    const payMethods = [
        { id: 'card' as const, label: 'Credit / Debit Card', icon: '💳' },
        { id: 'paypal' as const, label: 'PayPal', icon: '🅿️' },
        { id: 'bank' as const, label: 'Bank Transfer', icon: '🏦' },
        { id: 'mobile' as const, label: 'Mobile Money', icon: '📱' },
    ];

    const cardValid = form.paymentMethod !== 'card' || (form.cardNumber.length >= 19 && form.cardName && form.expiry.length === 5 && form.cvv.length >= 3);

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>Payment Method</h2>

            {/* Payment method tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {payMethods.map(m => (
                    <button key={m.id} onClick={() => setForm({ ...form, paymentMethod: m.id })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '14px 8px', background: form.paymentMethod === m.id ? 'var(--primary-light)' : 'var(--surface)', border: `2px solid ${form.paymentMethod === m.id ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <span style={{ fontSize: '24px' }}>{m.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: form.paymentMethod === m.id ? 'var(--primary)' : 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>{m.label}</span>
                    </button>
                ))}
            </div>

            {/* Card form */}
            {form.paymentMethod === 'card' && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' }}>
                    {/* Visual card preview */}
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '20px', color: '#fff', minHeight: '120px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ position: 'absolute', bottom: '-30px', right: '40px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                        <div style={{ marginBottom: '16px', fontSize: '13px', letterSpacing: '2px', opacity: 0.7 }}>JEFADO BANK</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '3px', marginBottom: '16px' }}>
                            {form.cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <div><div style={{ opacity: 0.6, marginBottom: '2px', fontSize: '10px' }}>CARD HOLDER</div>{form.cardName || 'YOUR NAME'}</div>
                            <div><div style={{ opacity: 0.6, marginBottom: '2px', fontSize: '10px' }}>EXPIRES</div>{form.expiry || 'MM/YY'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <Field label="Card Number" value={form.cardNumber} onChange={v => set('cardNumber')(formatCard(v))} placeholder="1234 5678 9012 3456" required />
                        <Field label="Cardholder Name" value={form.cardName} onChange={set('cardName') as (v: string) => void} placeholder="John Doe" required />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <Field label="Expiry Date" value={form.expiry} onChange={v => set('expiry')(formatExpiry(v))} placeholder="MM/YY" required maxLength={5} />
                            <Field label="CVV" value={form.cvv} onChange={v => set('cvv')(v.replace(/\D/g, '').slice(0, 4))} placeholder="•••" type="password" required maxLength={4} />
                        </div>
                    </div>
                </div>
            )}

            {/* PayPal */}
            {form.paymentMethod === 'paypal' && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '48px', marginBottom: '12px' }}>🅿️</p>
                    <p style={{ fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>Pay with PayPal</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>You'll be redirected to PayPal to complete your payment securely.</p>
                </div>
            )}

            {/* Bank */}
            {form.paymentMethod === 'bank' && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Bank Transfer Details</p>
                    {[['Bank Name', 'Jefado National Bank'], ['Account Name', 'Jefado Retail Ltd'], ['Account Number', '0123456789'], ['Routing Number', '021000021'], ['Reference', 'Your Order Number']].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                            <span style={{ fontWeight: 600 }}>{v}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Mobile money */}
            {form.paymentMethod === 'mobile' && (
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '14px' }}>Mobile Money</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                        {['M-Pesa', 'Airtel Money', 'MTN Momo', 'Flutterwave'].map(p => (
                            <button key={p} style={{ padding: '12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>{p}</button>
                        ))}
                    </div>
                    <Field label="Mobile Number" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="+234 801 234 5678" type="tel" required />
                </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={onBack} style={{ flex: 1, padding: '13px', border: '1.5px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'var(--surface)' }}>← Back</button>
                <button onClick={() => cardValid && onNext()} style={{ flex: 2, padding: '13px', background: cardValid ? 'var(--primary)' : 'var(--border)', color: cardValid ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '14px', cursor: cardValid ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: cardValid ? '0 4px 20px rgba(26,86,219,0.25)' : 'none' }}>
                    Review Order →
                </button>
            </div>
        </div>
    );
}

/* ── Step 3: Review & confirm ───────────── */
function ReviewStep({ items, form, onBack, onPlace }: { items: OrderItem[]; form: FormData; onBack: () => void; onPlace: () => void; }) {
    const [agreed, setAgreed] = useState(false);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    const payLabel: Record<FormData['paymentMethod'], string> = {
        card: `Card ending in ${form.cardNumber.slice(-4)}`,
        paypal: 'PayPal', bank: 'Bank Transfer', mobile: 'Mobile Money',
    };

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '20px' }}>Review Your Order</h2>

            {/* Shipping summary */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>📍 Service / Delivery Location</p>
                    <button onClick={onBack} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Edit</button>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{form.firstName} {form.lastName}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{form.address}, {form.city}, {form.state} {form.zip}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{form.country} · {form.phone}</p>
            </div>

            {/* Payment summary */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>💳 Payment</p>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{payLabel[form.paymentMethod]}</p>
            </div>

            {/* Items */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>🛍 Summary ({items.reduce((s, i) => s + i.qty, 0)})</p>
                {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '22px' }}>{item.emoji}</span>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 500 }}>{item.name}</p>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {item.date ? `📅 ${item.date} @ ${item.time}` : `Qty: ${item.qty} · ${item.color || ""}`}
                                </p>
                            </div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>₦{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>₦{subtotal.toFixed(2)}</span>
                </div>
            </div>

            {/* T&C */}
            <label style={{ display: 'flex', gap: '10px', marginBottom: '20px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px', marginTop: '2px', flexShrink: 0 }} />
                <span>I agree to the <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>. I confirm this order is correct.</span>
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={onBack} style={{ flex: 1, padding: '13px', border: '1.5px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'var(--surface)' }}>← Back</button>
                <button onClick={() => agreed && onPlace()} style={{ flex: 2, padding: '13px', background: agreed ? 'var(--success)' : 'var(--border)', color: agreed ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '14px', cursor: agreed ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: agreed ? '0 4px 20px rgba(34,197,94,0.3)' : 'none' }}>
                    ✓ Place Order
                </button>
            </div>
        </div>
    );
}

/* ── Order Success ───────────────────────── */
function OrderSuccess({ form, items }: { form: FormData; items: OrderItem[] }) {
    const orderId = `JFD-${Math.floor(Math.random() * 90000 + 10000)}`;
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const isService = items.some(i => i.date);

    return (
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '40px 32px', animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px', boxShadow: '0 8px 30px rgba(34,197,94,0.3)' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '8px', color: 'var(--text-primary)' }}>{isService ? 'Booking Confirmed!' : 'Order Placed!'}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '14px' }}>Thank you, <strong>{form.firstName}</strong>! Your {isService ? 'booking' : 'order'} is confirmed.</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '13px' }}>A confirmation has been sent to <strong>{form.email}</strong></p>

                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                    {[['Order Number', orderId], ['Total', `₦${subtotal.toFixed(2)}`], [isService ? 'Service Location' : 'Shipping To', `${form.city}, ${form.country}`], [isService ? 'Appointment' : 'Estimated Delivery', isService ? `${items[0].date} @ ${items[0].time}` : '3–5 business days']].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                            <span style={{ fontWeight: 600, color: k === 'Order Number' ? 'var(--primary)' : 'var(--text-primary)' }}>{v}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a href="/account" style={{ flex: 1, minWidth: '120px', padding: '11px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>Track {isService ? 'Booking' : 'Order'} →</a>
                    <a href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px' }}>Continue Shopping</a>
                </div>
            </div>
        </div>
    );
}

/* ── Checkout Content with Params ────────── */
function CheckoutContent() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [coupon, setCoupon] = useState(0);
    const [placed, setPlaced] = useState(false);

    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    const items = useMemo<OrderItem[]>(() => {
        if (type === 'service' && id) {
            const service = ALL_SERVICES.find(s => s.id === parseInt(id));
            if (service) {
                return [{
                    id: service.id,
                    name: service.name,
                    emoji: service.emoji,
                    price: service.price,
                    qty: 1,
                    seller: service.provider,
                    date: date || undefined,
                    time: time || undefined,
                }];
            }
        }
        return DEFAULT_ITEMS;
    }, [type, id, date, time]);

    const isService = type === 'service';

    if (placed) return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '48px', paddingBottom: '60px' }}>
            <OrderSuccess form={form} items={items} />
        </div>
    );

    return (
        <div className="container" style={{ padding: '28px var(--gutter)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--primary)' }}>Jefado<span style={{ color: 'var(--accent)' }}>.</span></a>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Secure Checkout</p>
            </div>

            <StepBar step={step} isService={isService} />

            {/* Responsive two-column layout */}
            <div className="checkout-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'flex-start', maxWidth: '1000px', margin: '0 auto' }}>

                {/* Left: form steps */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px', minWidth: 0 }}>
                    {step === 1 && <ShippingStep form={form} setForm={setForm} onNext={() => setStep(2)} isService={isService} />}
                    {step === 2 && <PaymentStep form={form} setForm={setForm} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                    {step === 3 && <ReviewStep items={items} form={form} onBack={() => setStep(2)} onPlace={() => setPlaced(true)} />}
                </div>

                {/* Right: order summary */}
                <div style={{ minWidth: 0 }}>
                    <OrderSidebar items={items} coupon={coupon} setCoupon={setCoupon} />
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 900px) {
                    .checkout-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}

/* ── Main Checkout Page ──────────────────── */
const EMPTY_FORM: FormData = {
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    saveAddress: false,
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    paymentMethod: 'card',
};

const DEFAULT_ITEMS: OrderItem[] = [
    { id: 1, name: 'Sony WH-1000XM5 Noise Cancelling Headphones', emoji: '🎧', price: 279, qty: 1, color: 'Midnight Black', seller: 'TechZone Store' },
];

export default function CheckoutPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Loading Checkout...</div>}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}