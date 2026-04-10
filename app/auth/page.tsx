'use client';
import { useState } from 'react';

type Mode = 'login' | 'register' | 'forgot' | 'otp';

/* ── Reusable input ─────────────────────── */
function Field({ label, type = 'text', value, onChange, placeholder, required }: {
    label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const [shown, setShown] = useState(false);
    const isPwd = type === 'password';
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {label}{required && <span style={{ color: 'var(--danger)', marginLeft: '3px' }}>*</span>}
            </label>
            <div style={{ position: 'relative' }}>
                <input
                    type={isPwd && shown ? 'text' : type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: isPwd ? '11px 44px 11px 14px' : '11px 14px',
                        fontSize: '14px',
                        border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius)',
                        outline: 'none',
                        fontFamily: 'var(--font-body)',
                        background: focused ? '#fff' : 'var(--surface-2)',
                        color: 'var(--text-primary)',
                        transition: 'border-color 0.2s, background 0.2s',
                        boxShadow: focused ? '0 0 0 3px rgba(26,86,219,0.08)' : 'none',
                    }}
                />
                {isPwd && (
                    <button type="button" onClick={() => setShown(!shown)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '17px', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
                        {shown ? '🙈' : '👁️'}
                    </button>
                )}
            </div>
        </div>
    );
}

/* ── Illustrated side panel ─────────────── */
function AuthPanel({ mode }: { mode: Mode }) {
    const content = {
        login: {
            title: 'Experience\nthe Future.',
            desc: 'Sign in to access your premium dashboard, track orders, and experience the next generation of global commerce.',
        },
        register: {
            title: 'Join the\nElite.',
            desc: 'Create your account and connect with thousands of verified vendors in a secure, high-performance ecosystem.',
        },
        forgot: {
            title: 'Secure\nRecovery.',
            desc: 'Quickly regain access to your account through our encrypted recovery protocol.',
        },
        otp: {
            title: 'Finalize\nAccess.',
            desc: 'A verification token has been dispatched to your digital mail. Enter it below to unlock your terminal.',
        },
    };
    const c = content[mode];

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px',
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/images/auth_bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 10s ease-in-out',
                transform: 'scale(1.1)',
                zIndex: 1
            }} />
            
            {/* Animated Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.2) 100%)',
                zIndex: 2
            }} />

            {/* Content Over the Image */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px', animation: 'fadeInUp 0.8s ease' }}>
                <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                    ✨ Global Marketplace 2026
                </div>
                <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: '48px', 
                    color: '#fff', 
                    marginBottom: '20px', 
                    lineHeight: 1.1, 
                    letterSpacing: '-1.5px',
                    whiteSpace: 'pre-line' 
                }}>{c.title}</h2>
                <p style={{ 
                    fontSize: '17px', 
                    color: 'rgba(255,255,255,0.8)', 
                    lineHeight: 1.6,
                    marginBottom: '32px'
                }}>{c.desc}</p>
                
                {/* Micro-stats */}
                <div style={{ display: 'flex', gap: '32px' }}>
                    {[
                        { label: 'Verified Vendors', val: '10k+' },
                        { label: 'Active Users', val: '2.4M' },
                        { label: 'Safe Delivery', val: '100%' }
                    ].map(s => (
                        <div key={s.label}>
                            <p style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{s.val}</p>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SocialBtn = ({ icon, label }: { icon: string, label: string }) => null;

/* ── Login Form ─────────────────────────── */
function LoginForm({ onSwitch, onForgot }: { onSwitch: () => void; onForgot: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Welcome back!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>You&apos;ve been signed in successfully.</p>
            <a href="/" style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '15px' }}>Go to Home →</a>
        </div>
    );

    const valid = email && password;
    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>Sign In</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px' }}>Enter your credentials to access the hub.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                <Field label="Identity (Email)" type="email" value={email} onChange={setEmail} placeholder="ID-000@jefado.com" required />
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Access Key</label>
                        <button onClick={onForgot} style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Forgot Access Key?</button>
                    </div>
                    <Field label="" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
                </div>
            </div>

            <div style={{ margin: '24px 0 40px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', borderRadius: '4px' }} />
                    Maintain session on this device
                </label>
            </div>

            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1500); }}
                disabled={!valid || loading}
                style={{ 
                    width: '100%', 
                    padding: '18px', 
                    background: valid ? 'var(--primary)' : 'var(--border)', 
                    color: valid ? '#fff' : 'var(--text-muted)', 
                    borderRadius: '14px', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: '16px', 
                    cursor: valid ? 'pointer' : 'not-allowed', 
                    border: 'none', 
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                    marginBottom: '32px', 
                    boxShadow: valid ? '0 15px 35px -5px rgba(26,86,219,0.5), inset 0 0 10px rgba(255,255,255,0.2)' : 'none',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                }}
            >{loading ? '⏳ Synchronizing…' : 'Initialize Access →'}</button>

            <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
                New to the platform?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 800, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Create identity</button>
            </p>
        </div>
    );
}

/* ── Register Form ───────────────────────── */
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', accountType: 'buyer' as 'buyer' | 'seller' });
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const strength = form.password.length >= 10 ? 4 : form.password.length >= 8 ? 3 : form.password.length >= 6 ? 2 : form.password.length > 0 ? 1 : 0;
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColor = ['', 'var(--danger)', 'var(--warning)', '#3b82f6', 'var(--success)'][strength];
    const valid = form.firstName && form.lastName && form.email && form.password.length >= 6 && form.password === form.confirm && agreed;

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Account created!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>Welcome to the platform, {form.firstName}! Synchronizing identity...</p>
            <button onClick={onSwitch} style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '15px', border: 'none', cursor: 'pointer' }}>Verify OTP →</button>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>Join the Platform</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px' }}>Establish your digital identity within the hub.</p>

            {/* Account type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                {(['buyer', 'seller'] as const).map(type => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, accountType: type }))} style={{ 
                        padding: '24px 16px', 
                        border: `2px solid ${form.accountType === type ? 'var(--primary)' : 'var(--border)'}`, 
                        background: form.accountType === type ? 'var(--primary-light)' : 'var(--surface)', 
                        borderRadius: '20px', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '12px',
                        boxShadow: form.accountType === type ? '0 10px 20px rgba(26,86,219,0.1)' : 'none',
                        transform: form.accountType === type ? 'translateY(-4px)' : 'none'
                    }}>
                        <span style={{ fontSize: '36px', filter: form.accountType === type ? 'drop-shadow(0 4px 8px rgba(26,86,219,0.2))' : 'none' }}>{type === 'buyer' ? '👤' : '🏢'}</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: form.accountType === type ? 'var(--primary)' : 'var(--text-secondary)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '1px' }}>{type === 'buyer' ? 'Consumer' : 'Merchant'}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', marginBottom: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="Aria" required />
                    <Field label="Last Name" value={form.lastName} onChange={set('lastName')} placeholder="Vance" required />
                </div>
                <Field label="Digital Mail" type="email" value={form.email} onChange={set('email')} placeholder="aria@vance.io" required />
                <Field label="Security Key" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />

                {form.password.length > 0 && (
                    <div style={{ marginTop: '-12px' }}>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                            {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= strength ? strengthColor : 'var(--border)', transition: 'background 0.3s' }} />)}
                        </div>
                        <p style={{ fontSize: '11px', color: strengthColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Entropy: {strengthLabel}</p>
                    </div>
                )}

                <Field label="Confirm Key" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" required />
                {form.confirm && form.password !== form.confirm && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '-16px', fontWeight: 600 }}>⚠ Key mismatch detected</p>}
            </div>

            <label style={{ display: 'flex', gap: '14px', marginBottom: '40px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '20px', height: '20px', marginTop: '2px', flexShrink: 0 }} />
                <span>I acknowledge the <a href="#" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'underline' }}>Digital Protocols</a> and <a href="#" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'underline' }}>Privacy Stack</a></span>
            </label>

            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1600); }}
                disabled={!valid || loading}
                style={{ 
                    width: '100%', 
                    padding: '18px', 
                    background: valid ? 'var(--primary)' : 'var(--border)', 
                    color: valid ? '#fff' : 'var(--text-muted)', 
                    borderRadius: '14px', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: '16px', 
                    cursor: valid ? 'pointer' : 'not-allowed', 
                    border: 'none', 
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                    marginBottom: '32px', 
                    boxShadow: valid ? '0 15px 35px -5px rgba(26,86,219,0.5)' : 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}
            >{loading ? '⏳ Encrypting…' : 'Finalize Registration'}</button>

            <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
                Already registered?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 800, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Initialize Login</button>
            </p>
        </div>
    );
}

/* ── OTP Form ─────────────────────────────── */
function OTPForm({ onBack }: { onBack: () => void }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (val: string, index: number) => {
        if (!/^\d*$/.test(val)) return;
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);
        if (val && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            prev?.focus();
        }
    };

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Identity Verified</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>Access to the platform has been fully granted.</p>
            <a href="/" style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '15px' }}>Enter Terminal →</a>
        </div>
    );

    const valid = otp.every(v => v !== '');

    return (
        <div style={{ width: '100%' }}>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>← Back to login</button>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>Enter Token</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px' }}>Enter the 6-digit sync code sent to your mail.</p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                {otp.map((v, i) => (
                    <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        value={v}
                        onChange={e => handleChange(e.target.value, i)}
                        onKeyDown={e => handleKeyDown(e, i)}
                        style={{
                            width: '100%',
                            height: '60px',
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 800,
                            border: '2px solid var(--border)',
                            borderRadius: '12px',
                            background: 'var(--surface-2)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    />
                ))}
            </div>

            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1800); }}
                disabled={!valid || loading}
                style={{ 
                    width: '100%', 
                    padding: '18px', 
                    background: valid ? 'var(--primary)' : 'var(--border)', 
                    color: valid ? '#fff' : 'var(--text-muted)', 
                    borderRadius: '14px', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 800, 
                    fontSize: '16px', 
                    cursor: valid ? 'pointer' : 'not-allowed', 
                    border: 'none', 
                    transition: 'all 0.3s', 
                    marginBottom: '24px', 
                    boxShadow: valid ? '0 15px 35px -5px rgba(26,86,219,0.5)' : 'none',
                    textTransform: 'uppercase'
                }}
            >{loading ? '⏳ Validating Token…' : 'Sync Identity'}</button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Didn&apos;t receive the code?{' '}
                <button style={{ color: 'var(--primary)', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer' }}>Request new token</button>
            </p>
        </div>
    );
}

/* ── Forgot Password Form ─────────────────── */
function ForgotForm({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    return (
        <div style={{ width: '100%' }}>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: '24px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >← Back to login</button>

            {sent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>📧</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Check your inbox</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>We sent a reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. Check your inbox.</p>
                    <button onClick={onBack} style={{ padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '14px', border: 'none', cursor: 'pointer' }}>Back to Login</button>
                </div>
            ) : (
                <>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', marginBottom: '6px' }}>Reset Password</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>Enter your email and we&apos;ll send you a reset link.</p>
                    <div style={{ marginBottom: '24px' }}>
                        <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                    </div>
                    <button onClick={() => { if (!email) return; setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 1400); }}
                        disabled={!email || loading}
                        style={{ width: '100%', padding: '14px', background: email ? 'var(--primary)' : 'var(--border)', color: email ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: email ? 'pointer' : 'not-allowed', border: 'none', transition: 'all 0.2s', boxShadow: email ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}
                    >{loading ? '⏳ Sending…' : 'Send Reset Link →'}</button>
                </>
            )}
        </div>
    );
}

/* ── Main Page ──────────────────────────── */
export default function AuthPage() {
    const [mode, setMode] = useState<Mode>('login');

    return (
        <>
            <style>{`
        .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .auth-panel { display: flex; width: 100%; min-height: 100vh; }
        .auth-form-col {
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 48px 60px; background: var(--surface);
          overflow-y: auto;
        }
        .auth-form-inner { width: 100%; max-width: 480px; }
        @media (max-width: 900px) {
          .auth-page  { grid-template-columns: 1fr !important; }
          .auth-panel { display: none !important; }
          .auth-form-col { padding: 40px 28px !important; }
        }
        @media (max-width: 480px) {
          .auth-form-col { padding: 32px 18px !important; }
        }
      `}</style>

            <div className="auth-page">
                {/* Left: illustrated panel */}
                <div className="auth-panel">
                    <AuthPanel mode={mode} />
                </div>

                {/* Right: form */}
                <div className="auth-form-col">
                    <div className="auth-form-inner">
                        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} onForgot={() => setMode('forgot')} />}
                        {mode === 'register' && <RegisterForm onSwitch={() => setMode('otp')} />}
                        {mode === 'forgot' && <ForgotForm onBack={() => setMode('login')} />}
                        {mode === 'otp' && <OTPForm onBack={() => setMode('login')} />}
                    </div>
                </div>
            </div>
        </>
    );
}