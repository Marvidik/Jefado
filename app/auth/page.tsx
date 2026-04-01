'use client';
import { useState } from 'react';

type Mode = 'login' | 'register' | 'forgot';

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
            title: 'Welcome\nback!',
            desc: 'Sign in and pick up right where you left off. Your cart, wishlist and orders are all waiting.',
            bullets: ['Access your orders & tracking', 'Earn loyalty points on every purchase', 'Exclusive member-only deals'],
            topEmoji: '🛍️',
            floats: ['📦', '⭐', '🔔', '💳', '🚚'],
        },
        register: {
            title: 'Join\nJefado!',
            desc: 'Create your free account and start shopping from thousands of verified vendors today.',
            bullets: ['Shop from 10,000+ verified vendors', 'Sell your products as a vendor', 'Fast delivery across 30+ countries'],
            topEmoji: '🎉',
            floats: ['🛒', '💝', '🎁', '✨', '🌟'],
        },
        forgot: {
            title: 'Account\nRecovery',
            desc: 'No worries — we\'ll help you get back into your account securely in just a few steps.',
            bullets: ['Secure link sent to your email', 'Your data stays fully protected', 'Contact support if you need help'],
            topEmoji: '🔑',
            floats: ['🔒', '📧', '✅', '🛡️', '💬'],
        },
    };
    const c = content[mode];

    return (
        <div style={{
            background: 'linear-gradient(160deg, var(--primary-dark) 0%, var(--primary) 55%, #2563eb 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '60px 48px', position: 'relative', overflow: 'hidden', width: '100%',
            minHeight: '100vh',
        }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(249,115,22,0.12)' }} />
            <div style={{ position: 'absolute', top: '40%', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Big emoji */}
                <div style={{ fontSize: '64px', marginBottom: '28px', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}>{c.topEmoji}</div>

                {/* Title */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '40px', color: '#fff', marginBottom: '18px', lineHeight: 1.1, letterSpacing: '-1px', whiteSpace: 'pre-line' }}>{c.title}</h2>

                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '36px', lineHeight: 1.75, maxWidth: '340px' }}>{c.desc}</p>

                {/* Bullet points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '44px' }}>
                    {c.bullets.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(249,115,22,0.3)', border: '1px solid rgba(249,115,22,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fbbf24', flexShrink: 0 }}>✓</div>
                            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>{b}</span>
                        </div>
                    ))}
                </div>

                {/* Floating emoji row */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {c.floats.map((em, i) => (
                        <div key={i} style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: '1px solid rgba(255,255,255,0.2)' }}>{em}</div>
                    ))}
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '32px', marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    {[['10k+', 'Vendors'], ['2M+', 'Shoppers'], ['30+', 'Countries']].map(([n, l]) => (
                        <div key={l}>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#fff', lineHeight: 1 }}>{n}</p>
                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>{l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

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
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--text-primary)', marginBottom: '6px' }}>Sign In</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>Enter your credentials to access your account</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />
                    Remember me
                </label>
                <button onClick={onForgot} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-body)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
            </div>

            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1500); }}
                disabled={!valid || loading}
                style={{ width: '100%', padding: '14px', background: valid ? 'var(--primary)' : 'var(--border)', color: valid ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: valid ? 'pointer' : 'not-allowed', border: 'none', transition: 'all 0.2s', marginBottom: '20px', boxShadow: valid ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}
            >{loading ? '⏳ Signing in…' : 'Sign In →'}</button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                Don&apos;t have an account?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Create account</button>
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
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>Welcome to Jefado, {form.firstName}! Check your email to verify.</p>
            <a href="/" style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '15px' }}>Start Shopping →</a>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--text-primary)', marginBottom: '6px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Join thousands of shoppers and vendors on Jefado</p>

            {/* Account type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
                {(['buyer', 'seller'] as const).map(type => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, accountType: type }))} style={{ padding: '14px', border: `2px solid ${form.accountType === type ? 'var(--primary)' : 'var(--border)'}`, background: form.accountType === type ? 'var(--primary-light)' : 'var(--surface)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '26px' }}>{type === 'buyer' ? '🛍️' : '🏪'}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: form.accountType === type ? 'var(--primary)' : 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{type === 'buyer' ? 'Shop as Buyer' : 'Sell as Vendor'}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Field label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="John" required />
                    <Field label="Last Name" value={form.lastName} onChange={set('lastName')} placeholder="Doe" required />
                </div>
                <Field label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
                <Field label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" />
                <Field label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters" required />

                {/* Strength bar */}
                {form.password.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                            {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= strength ? strengthColor : 'var(--border)', transition: 'background 0.3s' }} />)}
                        </div>
                        <p style={{ fontSize: '11px', color: strengthColor, fontWeight: 600 }}>{strengthLabel} password</p>
                    </div>
                )}

                <Field label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" required />
                {form.confirm && form.password !== form.confirm && (
                    <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '-8px' }}>⚠ Passwords do not match</p>
                )}
            </div>

            <label style={{ display: 'flex', gap: '10px', marginBottom: '22px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', alignItems: 'flex-start', width: '100%' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px', marginTop: '2px', flexShrink: 0 }} />
                <span>I agree to the <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a></span>
            </label>

            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1600); }}
                disabled={!valid || loading}
                style={{ width: '100%', padding: '14px', background: valid ? 'var(--primary)' : 'var(--border)', color: valid ? '#fff' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: valid ? 'pointer' : 'not-allowed', border: 'none', transition: 'all 0.2s', marginBottom: '20px', boxShadow: valid ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}
            >{loading ? '⏳ Creating account…' : 'Create Account →'}</button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                Already have an account?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Sign in</button>
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
                        {/* Logo */}
                        <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--primary)', display: 'block', marginBottom: '36px', letterSpacing: '-0.5px' }}>
                            Jefado<span style={{ color: 'var(--secondary)' }}>.</span>
                        </a>

                        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} onForgot={() => setMode('forgot')} />}
                        {mode === 'register' && <RegisterForm onSwitch={() => setMode('login')} />}
                        {mode === 'forgot' && <ForgotForm onBack={() => setMode('login')} />}
                    </div>
                </div>
            </div>
        </>
    );
}