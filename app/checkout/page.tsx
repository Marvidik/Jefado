'use client';
import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { useToast } from '@/components/ui/Toast';
import { getProductDetail, getServiceDetail } from '@/services/publicService';
import { checkoutProduct, checkoutService, verifyPayment } from '@/services/checkoutService';
import { getAddresses, getProfile } from '@/services/accountService';
import { tokenStorage } from '@/services/axiosInstance';
import { ProductDetail, ServiceDetail, Address } from '@/services/types';
import Loader from '@/components/ui/Loader';

/* ── Types ──────────────────────────────── */
interface FormData {
    firstName: string; lastName: string; email: string; phone: string;
    address: string; city: string; state: string; zip: string; country: string;
    saveAddress: boolean;
    bookingNotes: string;
    paymentMethod: string;
}

interface OrderItem {
    id: number;
    name: string;
    emoji: string;
    price: number;
    qty: number;
    color?: string;
    image?: string;
    seller: string;
    date?: string;
    time?: string;
}

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || '';

/* ── Step indicator ─────────────────────── */
function StepBar({ step, isService }: { step: number; isService: boolean }) {
    const steps = [isService ? 'Service Details' : 'Shipping Details', 'Review order'];
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
function SelectField({ label, value, onChange, options = [], required }: {
    label: string; value: string; onChange: (v: string) => void;
    options?: string[]; required?: boolean;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {label}{required && <span style={{ color: 'var(--danger)', marginLeft: '2px' }}>*</span>}
            </label>
            <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '10px 14px', fontSize: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', outline: 'none', fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--text-primary)', cursor: 'pointer', width: '100%' }}>
                <option value="">Select {label}</option>
                {options.map((o, idx) => <option key={`${o || ""}-${idx}`} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

/* ── Order summary sidebar ──────────────── */
function OrderSidebar({ items, coupon, setCoupon, couponCode, setCouponCode }: { items: OrderItem[]; coupon: number; setCoupon: (n: number) => void; couponCode: string; setCouponCode: (s: string) => void }) {
    const [error, setError] = useState('');
    const [applied, setApplied] = useState('');

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 0;
    const couponSave = (subtotal * coupon) / 100;
    const total = subtotal + shipping - couponSave;

    const VALID: Record<string, number> = { SAVE10: 10, JEFEDO20: 20, WELCOME15: 15 };

    const apply = () => {
        const k = couponCode.toUpperCase().trim();
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
                        <div style={{ width: '48px', height: '48px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            {item.image ? (
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                            )}
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
                        <input value={couponCode} onChange={e => { setCouponCode(e.target.value); setError(''); }} placeholder="Coupon code"
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
                    { label: 'Shipping/Service Fee', value: 'Calculated by seller', green: false },
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '18px' }}>💳</span> Cards</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '18px' }}>🏦</span> Bank Transfer</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '18px' }}>📱</span> Mobile Money</span>
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

    const [countryList, setCountryList] = useState<string[]>([]);
    const [allCountryData, setAllCountryData] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/states')
            .then(res => res.json())
            .then(data => {
                if (data && data.data && Array.isArray(data.data)) {
                    setAllCountryData(data.data);
                    const names = data.data.map((d: any) => d.name).sort((a: string, b: string) => a.localeCompare(b));
                    setCountryList(Array.from(new Set(names)));
                }
            })
            .catch(err => console.error("Could not fetch countries", err));
    }, []);

    const stateList = useMemo<string[]>(() => {
        const countryData = allCountryData.find(d => d.name === form.country);
        if (countryData && countryData.states && Array.isArray(countryData.states)) {
            const names = countryData.states.map((s: any) => s.name).sort((a: string, b: string) => a.localeCompare(b));
            return Array.from(new Set(names)) as string[];
        }
        return [];
    }, [form.country, allCountryData]);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const valid = form.firstName && form.lastName && isEmailValid && form.phone && form.address && form.city && form.zip && form.country;

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
                <Field label="Phone Number" value={form.phone} onChange={set('phone') as (v: string) => void} placeholder="08123456789" type="tel" required />
            </div>

            {/* Address */}
            <div style={{ marginBottom: '14px' }}>
                <Field label="Street Address" value={form.address} onChange={set('address') as (v: string) => void} placeholder="123 Main Street, Apt 4B" required />
            </div>

            {/* City + State + Zip */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <Field label="City" value={form.city} onChange={set('city') as (v: string) => void} placeholder="New York" required />
                {stateList.length > 0 ? (
                    <SelectField label="State" value={form.state} onChange={set('state') as (v: string) => void} options={stateList} />
                ) : (
                    <Field label="State / Province" value={form.state} onChange={set('state') as (v: string) => void} placeholder="Your State" required />
                )}
                <Field label="ZIP / Postal Code" value={form.zip} onChange={set('zip') as (v: string) => void} placeholder="10001" required maxLength={10} />
            </div>

            {/* Country */}
            <div style={{ marginBottom: '14px' }}>
                <SelectField label="Country" value={form.country} onChange={set('country') as (v: string) => void} options={countryList} required />
            </div>

            {/* Booking Notes (Service Only) */}
            {isService && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Booking Notes</label>
                        <textarea
                            value={form.bookingNotes}
                            onChange={e => set('bookingNotes')(e.target.value)}
                            placeholder="Any specific requests or instructions for the service provider?"
                            style={{
                                padding: '10px 14px', fontSize: '14px', border: '1.5px solid var(--border)',
                                borderRadius: 'var(--radius)', outline: 'none', fontFamily: 'var(--font-body)',
                                background: 'var(--surface)', color: 'var(--text-primary)', minHeight: '80px', width: '100%'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Save address */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.saveAddress} onChange={e => set('saveAddress')(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                Save this {isService ? 'location' : 'address'} for future orders
            </label>

            <button onClick={() => valid && onNext()} style={{ width: '100%', padding: '14px', background: valid ? 'var(--primary)' : 'var(--border)', color: valid ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: valid ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: valid ? '0 4px 20px rgba(238,18,23,0.25)' : 'none' }}>
                Review Order →
            </button>
        </div>
    );
}


/* ── Step 3: Review & confirm ───────────── */
function ReviewStep({ items, form, setForm, onBack, onPlace, loading, isLoggedIn }: { items: OrderItem[]; form: FormData; setForm: (f: FormData) => void; onBack: () => void; onPlace: () => void; loading: boolean; isLoggedIn: boolean; }) {
    const [agreed, setAgreed] = useState(false);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '20px' }}>Review Your Order</h2>

            {/* Payment Method Selection */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: '14px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>💳 Payment Method</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', border: form.paymentMethod === 'paystack' ? '1.5px solid var(--primary)' : '1px solid var(--border)', borderRadius: 'var(--radius)', background: form.paymentMethod === 'paystack' ? 'var(--primary-light, rgba(238,18,23,0.05))' : 'transparent' }}>
                        <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="paystack" 
                            checked={form.paymentMethod === 'paystack'} 
                            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} 
                            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Paystack (Cards / Bank / USSD)</span>
                    </label>
                    {isLoggedIn && (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', border: form.paymentMethod === 'wallet' ? '1.5px solid var(--primary)' : '1px solid var(--border)', borderRadius: 'var(--radius)', background: form.paymentMethod === 'wallet' ? 'var(--primary-light, rgba(238,18,23,0.05))' : 'transparent' }}>
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="wallet" 
                                checked={form.paymentMethod === 'wallet'} 
                                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                                style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                            />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Jefedo Wallet Balance</span>
                        </label>
                    )}
                </div>
            </div>

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

            {/* Items */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', marginBottom: '12px' }}>🛍 Summary ({items.reduce((s, i) => s + i.qty, 0)})</p>
                {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--surface-2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                                )}
                            </div>
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
                <span>I agree to the <a href="/refund-policy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Refund Policy</a> and <a href="/privacy-policy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>. I confirm this order is correct.</span>
            </label>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={onBack} style={{ flex: 1, padding: '13px', border: '1.5px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', background: 'var(--surface)' }}>← Back</button>
                <button
                    disabled={!agreed || loading}
                    onClick={() => agreed && !loading && onPlace()}
                    style={{
                        flex: 2,
                        padding: '13px',
                        background: (agreed && !loading) ? 'var(--success)' : 'var(--border)',
                        color: (agreed && !loading) ? '#fff' : 'var(--text-muted)',
                        borderRadius: 'var(--radius)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: (agreed && !loading) ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        boxShadow: (agreed && !loading) ? '0 4px 20px rgba(34,197,94,0.3)' : 'none'
                    }}
                >
                    {loading ? 'Processing Transaction...' : '✓ Place Order'}
                </button>
            </div>
        </div>
    );
}

/* ── Order Success ───────────────────────── */
function OrderSuccess({ form, items, verifiedOrder, reference }: { form: FormData; items: OrderItem[]; verifiedOrder?: any; reference?: string | null }) {
    const orderId = reference || verifiedOrder?.reference || verifiedOrder?.order_id || verifiedOrder?.id || `JFD-${Math.floor(Math.random() * 90000 + 10000)}`;

    const subtotal = verifiedOrder
        ? parseFloat(verifiedOrder.total_amount || 0)
        : items.reduce((s, i) => s + i.price * i.qty, 0);

    const isService = verifiedOrder
        ? (verifiedOrder.order_type === 'SERVICE' || !!verifiedOrder.booking_date)
        : items.some(i => i.date);

    const buyerName = verifiedOrder?.buyer_name || `${form.firstName} ${form.lastName}`.trim() || 'Customer';
    const buyerEmail = verifiedOrder?.buyer_email || form.email || 'your email';
    const city = verifiedOrder?.city || form.city || '';
    const country = verifiedOrder?.country || form.country || 'Nigeria';

    const appointmentDate = verifiedOrder?.booking_date || (items[0]?.date || '');
    const appointmentTime = verifiedOrder?.booking_time || (items[0]?.time || '');
    const appointmentText = appointmentDate ? `${appointmentDate} @ ${appointmentTime}` : '3–5 business days';

    return (
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '40px 32px', animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px', boxShadow: '0 8px 30px rgba(34,197,94,0.3)' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '8px', color: 'var(--text-primary)' }}>{isService ? 'Booking Confirmed!' : 'Order Placed!'}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '14px' }}>Thank you, <strong>{buyerName}</strong>! Your {isService ? 'booking' : 'order'} has been received.</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '13px' }}>Once your payment is confirmed by our system, your order will be processed and you'll receive a confirmation at <strong>{buyerEmail}</strong></p>

                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                    {[['Reference', orderId], ['Total', `₦${subtotal.toFixed(2)}`], [isService ? 'Service Location' : 'Shipping To', `${city}, ${country}`.replace(/^,\s*/, '')], [isService ? 'Appointment' : 'Estimated Delivery', appointmentText]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                            <span style={{ fontWeight: 600, color: k === 'Reference' ? 'var(--primary)' : 'var(--text-primary)' }}>{v}</span>
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

/* ── Order Failure ───────────────────────── */
function OrderFailure({ message }: { message: string }) {
    return (
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '40px 32px', animation: 'fadeInUp 0.5s ease' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--danger)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px', boxShadow: '0 8px 30px rgba(239,68,68,0.3)' }}>✗</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '8px', color: 'var(--text-primary)' }}>Payment Verification Failed</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>{message}</p>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="/cart" style={{ padding: '12px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px' }}>Return to Cart</a>
                </div>
            </div>
        </div>
    );
}


import { useCart } from '@/context/CartContext';

/* ── Checkout Content with Params ────────── */
function CheckoutContent() {
    const { success, error: toastError } = useToast();
    const { cartItems, clearCart, isInitialized } = useCart();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [coupon, setCoupon] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [placed, setPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [verifiedOrder, setVerifiedOrder] = useState<any>(null);
    const [verificationError, setVerificationError] = useState<string>('');

    const type = searchParams.get('type') || (searchParams.get('id') ? 'product' : 'cart');
    const id = searchParams.get('id');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const qtyParam = searchParams.get('qty');
    const reference = searchParams.get('reference');

    const [item, setItem] = useState<ProductDetail | ServiceDetail | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                if (reference) {
                    setLoadingData(true);
                    try {
                        const res = await verifyPayment(reference);
                        const orderData = res?.data || res?.order || res;
                        setVerifiedOrder(orderData);
                        setPlaced(true);
                        clearCart();
                        success("Payment verified successfully!");
                    } catch (e: any) {
                        console.error("Payment verification failed:", e);
                        setVerificationError(e?.detail || e?.message || "Failed to verify payment status.");
                        toastError(e?.detail || e?.message || "Failed to verify payment status.");
                    } finally {
                        setLoadingData(false);
                    }
                    return;
                }

                const fetchAddress = async () => {
                    try {
                        if (!tokenStorage.getAccessToken()) return;

                        try {
                            const profile = await getProfile();
                            if (profile) {
                                setForm(prev => ({
                                    ...prev,
                                    firstName: profile.first_name || prev.firstName,
                                    lastName: profile.last_name || prev.lastName,
                                    email: profile.email || prev.email,
                                    phone: profile.phone || prev.phone,
                                }));
                            }
                        } catch (e) {
                            console.error("Failed to fetch profile info:", e);
                        }

                        const response = await getAddresses();
                        const addresses = (response as any).data || response;
                        if (Array.isArray(addresses)) {
                            const def = addresses.find(a => a.is_default) || addresses[0];
                            if (def) {
                                setForm(prev => ({
                                    ...prev,
                                    firstName: def.full_name?.split(' ')[0] || prev.firstName,
                                    lastName: def.full_name?.split(' ').slice(1).join(' ') || prev.lastName,
                                    address: def.street_address || prev.address,
                                    city: def.city || prev.city,
                                    state: def.state || prev.state,
                                    zip: def.postal_code || prev.zip,
                                    country: def.country || prev.country || 'Nigeria',
                                    phone: def.phone || prev.phone,
                                    email: def.email || prev.email,
                                }));
                            }
                        }
                    } catch (e) { }
                };

                if (id) {
                    const fetchItem = async () => {
                        try {
                            const response = type === 'service' ? await getServiceDetail(id) : await getProductDetail(id);
                            const data = (response as any).data || response;
                            if (data) {
                                setItem(data);
                            } else {
                                toastError("Could not find the requested item.");
                            }
                        } catch (e) {
                            toastError("Failed to load item details. Please try again.");
                        }
                    };
                    await Promise.all([fetchItem(), fetchAddress()]);
                } else if (type === 'cart') {
                    if (isInitialized && cartItems.length === 0 && !reference) {
                        router.push('/cart');
                        return;
                    }
                    if (isInitialized) await fetchAddress();
                } else if (!reference) {
                    router.push('/');
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isInitialized) setLoadingData(false);
                setLoading(false);
            }
        };
        load();
    }, [id, type, searchParams, router, toastError, success, reference, cartItems.length, clearCart, isInitialized]);

    const items = useMemo<OrderItem[]>(() => {
        if (type === 'cart') {
            return cartItems.map(i => ({
                id: i.id,
                name: i.name,
                emoji: i.emoji || '📦',
                image: i.image,
                price: i.price,
                qty: i.qty,
                seller: i.seller,
            }));
        }
        if (!item) return [];
        return [{
            id: item.id,
            name: item.name,
            emoji: (item as any).emoji || '📦',
            image: item.image || undefined,
            price: parseFloat(item.price as any),
            qty: qtyParam ? parseInt(qtyParam) : 1,
            seller: (item as any).seller?.store_name || (item as any).provider?.store_name || 'Jefedo',
            date: date || undefined,
            time: time || undefined,
        }];
    }, [item, type, cartItems, date, time, qtyParam]);

    const handlePlaceOrder = async () => {
        if (loading || (type !== 'cart' && !item) || (type === 'cart' && items.length === 0)) return;
        setLoading(true);
        try {
            if (type === 'service') {
                const normalizeTime = (t: string) => {
                    if (!t) return '';
                    const parts = t.split(' ');
                    if (parts.length !== 2) return t;
                    const [time, modifier] = parts;
                    let [hours, minutes] = time.split(':');
                    let h = parseInt(hours, 10);
                    if (modifier === 'PM' && h < 12) h += 12;
                    if (modifier === 'AM' && h === 12) h = 0;
                    return `${h.toString().padStart(2, '0')}:${minutes}:00`;
                };

                const response = await checkoutService({
                    buyer_name: `${form.firstName} ${form.lastName}`,
                    buyer_email: form.email,
                    buyer_phone: form.phone,
                    booking_date: date!,
                    booking_time: normalizeTime(time!),
                    booking_notes: `Address: ${form.address}, ${form.city}, ${form.state}. ${form.bookingNotes}`,
                    coupon_code: couponCode || undefined,
                    payment_method: form.paymentMethod,
                    items: [{ item_id: item!.id, quantity: qtyParam ? parseInt(qtyParam) : 1 }]
                });

                const actualData = (response as any).data || response;
                if (actualData.payment_url) {
                    window.location.href = actualData.payment_url;
                } else {
                    setPlaced(true);
                    clearCart();
                }
            } else {
                // Products (single or cart)
                const payloadItems = items.map(i => ({ item_id: i.id, quantity: i.qty }));
                const response = await checkoutProduct({
                    buyer_name: `${form.firstName} ${form.lastName}`,
                    buyer_email: form.email,
                    buyer_phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    country: form.country,
                    postal_code: form.zip,
                    coupon_code: couponCode || undefined,
                    payment_method: form.paymentMethod,
                    items: payloadItems
                });

                const actualData = (response as any).data || response;
                if (actualData.payment_url) {
                    window.location.href = actualData.payment_url;
                } else {
                    setPlaced(true);
                    clearCart();
                }
            }
        } catch (err: any) {
            toastError(err.detail || err.message || 'Order placement failed. Please verify your details.');
        } finally {
            setLoading(false);
        }
    };

    const isService = type === 'service';

    if (loadingData) return <Loader text="Syncing Secure Terminal..." />;

    if (verificationError) return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '48px', paddingBottom: '60px' }}>
            <OrderFailure message={verificationError} />
        </div>
    );

    if (placed) return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '48px', paddingBottom: '60px' }}>
            <OrderSuccess form={form} items={items} verifiedOrder={verifiedOrder} reference={reference} />
        </div>
    );

    return (
        <div className="container" style={{ padding: '28px var(--gutter)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--primary)' }}>Jefedo<span style={{ color: 'var(--accent)' }}>.</span></a>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Secure Checkout</p>
            </div>

            <StepBar step={step} isService={isService} />

            {/* Responsive two-column layout */}
            <div className="checkout-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'flex-start', maxWidth: '1000px', margin: '0 auto' }}>

                {/* Left: Forms */}
                <div style={{ flex: '1 1 65%', minWidth: 0 }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px', minWidth: 0 }}>
                        {step === 1 && <ShippingStep form={form} setForm={setForm} onNext={() => setStep(2)} isService={isService} />}
                        {step === 2 && <ReviewStep items={items} form={form} setForm={setForm} onBack={() => setStep(1)} onPlace={handlePlaceOrder} loading={loading} isLoggedIn={!!tokenStorage.getAccessToken()} />}
                    </div>

                </div>

                {/* Right: order summary */}
                <div style={{ minWidth: 0 }}>
                    <OrderSidebar items={items} coupon={coupon} setCoupon={setCoupon} couponCode={couponCode} setCouponCode={setCouponCode} />
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
    address: '', city: '', state: '', zip: '', country: 'Nigeria',
    saveAddress: true,
    bookingNotes: '',
    paymentMethod: 'paystack',
};


export default function CheckoutPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '60px' }}>
            <Suspense fallback={<Loader text="Loading Checkout..." />}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}