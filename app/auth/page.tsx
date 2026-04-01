'use client';
import { useState } from 'react';

type Mode = 'login' | 'register' | 'forgot';

function InputField({ label, type = 'text', value, onChange, placeholder, required }: {
    label: string; type?: string; value: string;
    onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const [shown, setShown] = useState(false);
    const isPassword = type === 'password';
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {label}{required && <span style={{ color: 'var(--danger)', marginLeft: '2px' }}>*</span>}
            </label>
            <div style={{ position: 'relative' }}>
                <input
                    type={isPassword && shown ? 'text' : type}
                    value={value} onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: isPassword ? '10px 40px 10px 14px' : '10px 14px', fontSize: '14px', border: `1.5px solid ${focused ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius)', outline: 'none', fontFamily: 'var(--font-body)', background: 'var(--surface)', color: 'var(--text-primary)', transition: 'border-color 0.2s' }}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShown(!shown)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: 'var(--text-muted)', background: 'transparent' }}>
                        {shown ? '🙈' : '👁️'}
                    </button>
                )}
            </div>
        </div>
    );
}

/* ── Social Button ── */
function SocialBtn({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
    const [hov, setHov] = useState(false);
    return (
        <button onClick={onClick}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '10px', border: `1.5px solid ${hov ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius)', background: hov ? 'var(--primary-light)' : 'var(--surface)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }}
        >
            <span style={{ fontSize: '18px' }}>{icon}</span>{label}
        </button>
    );
}

/* ── Divider ── */
function Divider({ label }: { label: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>
    );
}

/* ── Login Form ── */
function LoginForm({ onSwitch, onForgot }: { onSwitch: () => void; onForgot: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        if (!email || !password) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
    };

    if (success) return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '30px' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>Welcome back!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>You've been logged in successfully.</p>
            <a href="/account" style={{ display: 'inline-block', padding: '11px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '14px' }}>Go to Home →</a>
        </div>
    );

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', marginBottom: '6px' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Sign in to your Jefado account</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '4px' }}>
                <SocialBtn icon="🔵" label="Continue with Google" />
                <SocialBtn icon="⬛" label="Continue with Apple" />
            </div>

            <Divider label="or sign in with email" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }} />
                    Remember me
                </label>
                <button onClick={onForgot} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-body)', background: 'transparent' }}>Forgot password?</button>
            </div>

            <button onClick={handleSubmit} disabled={loading || !email || !password} style={{ width: '100%', padding: '13px', background: (!email || !password) ? 'var(--border)' : 'var(--primary)', color: (!email || !password) ? 'var(--text-muted)' : '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: (!email || !password) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginBottom: '16px', boxShadow: email && password ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}>
                {loading ? '⏳ Signing in…' : 'Sign In →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                Don&apos;t have an account?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-body)', background: 'transparent', fontSize: '13px' }}>Create account</button>
            </p>
        </div>
    );
}

/* ── Register Form ── */
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', accountType: 'buyer' as 'buyer' | 'seller' });
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));
    const valid = form.firstName && form.lastName && form.email && form.password && form.password === form.confirm && agreed;

    const handleSubmit = () => {
        if (!valid) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1600);
    };

    if (success) return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '30px' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>Account created!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>Welcome to Jefado, {form.firstName}! Check your email to verify.</p>
            <a href="/" style={{ display: 'inline-block', padding: '11px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '14px' }}>Start Shopping →</a>
        </div>
    );

    return (
        <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--text-primary)', marginBottom: '6px' }}>Create account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Join thousands of shoppers on Jefado</p>

            {/* Account type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {(['buyer', 'seller'] as const).map(type => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, accountType: type }))} style={{ padding: '12px', border: `2px solid ${form.accountType === type ? 'var(--primary)' : 'var(--border)'}`, background: form.accountType === type ? 'var(--primary-light)' : 'var(--surface)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '24px' }}>{type === 'buyer' ? '🛍️' : '🏪'}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: form.accountType === type ? 'var(--primary)' : 'var(--text-secondary)', textTransform: 'capitalize' }}>{type === 'buyer' ? 'Shop as Buyer' : 'Sell as Vendor'}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <InputField label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="John" required />
                    <InputField label="Last Name" value={form.lastName} onChange={set('lastName')} placeholder="Doe" required />
                </div>
                <InputField label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
                <InputField label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" />
                <InputField label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters" required />
                <InputField label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat your password" required />
                {form.confirm && form.password !== form.confirm && (
                    <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '-6px' }}>⚠ Passwords do not match</p>
                )}
            </div>

            {/* Password strength */}
            {form.password.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: form.password.length >= i * 3 ? (form.password.length >= 10 ? 'var(--success)' : form.password.length >= 6 ? 'var(--warning)' : 'var(--danger)') : 'var(--border)', transition: 'background 0.3s' }} />
                        ))}
                    </div>
                    <p style={{ fontSize: '11px', color: form.password.length >= 10 ? 'var(--success)' : form.password.length >= 6 ? 'var(--warning)' : 'var(--danger)' }}>
                        {form.password.length >= 10 ? 'Strong password' : form.password.length >= 6 ? 'Fair password' : 'Weak password'}
                    </p>
                </div>
            )}

            <label style={{ display: 'flex', gap: '10px', marginBottom: '20px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '15px', height: '15px', marginTop: '2px', flexShrink: 0 }} />
                <span>I agree to the <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a></span>
            </label>

            <button onClick={handleSubmit} disabled={!valid || loading} style={{ width: '100%', padding: '13px', background: !valid ? 'var(--border)' : 'var(--primary)', color: !valid ? 'var(--text-muted)' : '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: !valid ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginBottom: '16px', boxShadow: valid ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}>
                {loading ? '⏳ Creating account…' : 'Create Account →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                Already have an account?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'var(--font-body)', background: 'transparent', fontSize: '13px' }}>Sign in</button>
            </p>
        </div>
    );
}

/* ── Forgot Password ── */
function ForgotForm({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (!email) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1400);
    };

    return (
        <div>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', background: 'transparent', marginBottom: '20px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >← Back to login</button>

            {sent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '56px', marginBottom: '16px' }}>📧</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>Check your email</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>We sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. Check your inbox and follow the instructions.</p>
                    <button onClick={onBack} style={{ marginTop: '24px', padding: '11px 28px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, fontFamily: 'var(--font-body)', fontSize: '14px' }}>Back to Login</button>
                </div>
            ) : (
                <>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '6px' }}>Reset password</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Enter your email and we&apos;ll send you a reset link.</p>
                    <div style={{ marginBottom: '20px' }}>
                        <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                    </div>
                    <button onClick={handleSend} disabled={!email || loading} style={{ width: '100%', padding: '13px', background: !email ? 'var(--border)' : 'var(--primary)', color: !email ? 'var(--text-muted)' : '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '15px', cursor: !email ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: email ? '0 4px 20px rgba(26,86,219,0.3)' : 'none' }}>
                        {loading ? '⏳ Sending…' : 'Send Reset Link →'}
                    </button>
                </>
            )}
        </div>
    );
}

/* ── Hero Panel ── */
function AuthHero({ mode }: { mode: Mode }) {
    const content = {
        login: { emoji: '👋', title: 'Welcome back!', desc: 'Sign in to access your orders, wishlist, and personalized recommendations.', bullets: ['Track your orders in real time', 'Earn loyalty points on every purchase', 'Get exclusive member deals'] },
        register: { emoji: '🎉', title: 'Join Jefado today', desc: 'Create your account and start shopping or selling on Africa\'s fastest growing marketplace.', bullets: ['Shop from 10,000+ verified vendors', 'Sell your products to millions of buyers', 'Fast delivery across 30+ countries'] },
        forgot: { emoji: '🔑', title: 'Account recovery', desc: 'We\'ll help you get back into your account safely and quickly.', bullets: ['Secure password reset via email', 'Your account stays protected', 'Contact support if you need more help'] },
    };
    const c = content[mode];

    return (
        <div className="auth-hero" style={{ background: 'linear-gradient(160deg, var(--primary-dark) 0%, var(--primary) 60%, #C05800 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(253,251,212,0.06)' }} />
            <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(253,251,212,0.05)' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '56px', marginBottom: '24px' }}>{c.emoji}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: '#fff', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>{c.title}</h2>
                <p style={{ fontSize: '15px', color: 'rgba(253,251,212,0.75)', marginBottom: '32px', lineHeight: 1.7 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {c.bullets.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(253,251,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--cream)', flexShrink: 0, marginTop: '1px' }}>✓</div>
                            <span style={{ fontSize: '14px', color: 'rgba(253,251,212,0.85)', lineHeight: 1.5 }}>{b}</span>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '28px', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(253,251,212,0.15)' }}>
                    {[['10k+', 'Vendors'], ['2M+', 'Customers'], ['30+', 'Countries']].map(([num, label]) => (
                        <div key={label}>
                            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--cream)' }}>{num}</p>
                            <p style={{ fontSize: '12px', color: 'rgba(253,251,212,0.6)' }}>{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Main Auth Page ── */
export default function AuthPage() {
    const [mode, setMode] = useState<Mode>('login');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="auth-layout" style={{ minHeight: '100vh' }}>
                {/* Left: Hero */}
                <AuthHero mode={mode} />

                {/* Right: Form */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 48px', background: 'var(--surface)', overflowY: 'auto' }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '36px' }}>
                        <a href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--primary)' }}>
                            Jefado<span style={{ color: 'var(--primary-dark)' }}>.</span>
                        </a>
                    </div>

                    <div style={{ maxWidth: '420px', width: '100%' }}>
                        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} onForgot={() => setMode('forgot')} />}
                        {mode === 'register' && <RegisterForm onSwitch={() => setMode('login')} />}
                        {mode === 'forgot' && <ForgotForm onBack={() => setMode('login')} />}
                    </div>
                </div>
            </div>
        </div>
    );
}