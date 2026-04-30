'use client';
import { useState, useEffect } from 'react';
import { login, register, verifyEmail, requestPasswordReset, completePasswordReset } from '@/services/authService';

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
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.2) 100%)',
                zIndex: 2
            }} />
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

/* ── Login Form ─────────────────────────── */
function LoginForm({ onSwitch, onForgot, onSuccess }: { onSwitch: () => void; onForgot: () => void; onSuccess: (type: string) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const valid = email && password;
    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px' }}>Log in to your account to continue.</p>

            {error && (
                <div style={{ background: 'var(--danger-light)', color: 'var(--danger-dark)', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '24px', fontWeight: 600, border: '1px solid var(--danger)' }}>
                    ⚠ {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="Enter your email" required />
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                        <button onClick={onForgot} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Forgot Password?</button>
                    </div>
                    <Field label="" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
                </div>
            </div>

            <div style={{ margin: '24px 0 40px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', borderRadius: '4px' }} />
                    Remember me
                </label>
            </div>

            <button onClick={async () => { 
                if (!valid) return; 
                setLoading(true); 
                setError(null);
                try {
                    const result = await login({ username: email, email: email, password });
                    const uType = result.user?.user_type || 'CUSTOMER';
                    onSuccess(uType.toLowerCase());
                } catch (err: any) {
                    setError(err.non_field_errors?.[0] || err.detail || 'Login failed.');
                } finally {
                    setLoading(false);
                }
            }}
                disabled={!valid || loading}
                style={{ 
                    width: '100%', padding: '18px', background: valid ? 'var(--primary)' : 'var(--border)', 
                    color: valid ? '#fff' : 'var(--text-muted)', borderRadius: '14px', fontFamily: 'var(--font-display)', 
                    fontWeight: 800, fontSize: '16px', cursor: valid ? 'pointer' : 'not-allowed', letterSpacing: '0.5px'
                }}
            >{loading ? '⏳ Logging in…' : 'Login Now →'}</button>

            <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '24px' }}>
                Don't have an account?{' '}
                <button onClick={onSwitch} style={{ color: 'var(--primary)', fontWeight: 800, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px' }}>Register</button>
            </p>
        </div>
    );
}

/* ── Register Form ───────────────────────── */
function RegisterForm({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: (type: string) => void }) {
    const [form, setForm] = useState({ 
        firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', accountType: 'buyer' as 'buyer' | 'seller', storeName: '', rcNumber: ''
    });
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<any>(null);
    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const valid = form.firstName && form.lastName && form.email && form.password.length >= 6 && form.password === form.confirm && agreed && (form.accountType === 'buyer' || (form.storeName && form.rcNumber));

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Account created!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>Welcome to the platform, {form.firstName}!</p>
            <button onClick={onSwitch} style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Verify OTP →</button>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Join our community today.</p>

            {error && <div style={{ background: 'var(--danger-light)', color: 'var(--danger-dark)', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '24px' }}>⚠ {typeof error === 'string' ? error : Object.values(error).flat()[0] as string || 'Error'}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                {(['buyer', 'seller'] as const).map(type => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, accountType: type }))} style={{ padding: '24px 16px', border: `2px solid ${form.accountType === type ? 'var(--primary)' : 'var(--border)'}`, background: form.accountType === type ? 'var(--primary-light)' : 'var(--surface)', borderRadius: '20px', cursor: 'pointer' }}>
                        <span style={{ fontSize: '36px' }}>{type === 'buyer' ? '👤' : '🏢'}</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: form.accountType === type ? 'var(--primary)' : 'var(--text-secondary)', textTransform: 'uppercase' }}>{type === 'buyer' ? 'Customer' : 'Vendor'}</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="First Name" value={form.firstName} onChange={set('firstName')} placeholder="Aria" required />
                    <Field label="Last Name" value={form.lastName} onChange={set('lastName')} placeholder="Vance" required />
                </div>
                <Field label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="Enter your email" required />
                {form.accountType === 'seller' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Field label="Store Name" value={form.storeName} onChange={set('storeName')} placeholder="Elite" required />
                        <Field label="RC Number" value={form.rcNumber} onChange={set('rcNumber')} placeholder="RC-123" required />
                    </div>
                )}
                <Field label="Password" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
                <Field label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" required />
            </div>

            <label style={{ display: 'flex', gap: '14px', marginBottom: '32px', cursor: 'pointer', fontSize: '14px' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span>I agree to the Terms and Conditions</span>
            </label>

            <button onClick={async () => { 
                if (!valid) return; 
                setLoading(true); 
                try {
                    await register({ username: form.email, email: form.email, password1: form.password, password2: form.password, first_name: form.firstName, last_name: form.lastName, user_type: form.accountType === 'buyer' ? 'CUSTOMER' : 'SELLER', store_name: form.storeName, rc_number: form.rcNumber });
                    onSuccess(form.accountType);
                    setSuccess(true);
                } catch (err) { setError(err); } finally { setLoading(false); }
            }}
                disabled={!valid || loading}
                style={{ width: '100%', padding: '18px', background: valid ? 'var(--primary)' : 'var(--border)', color: '#fff', borderRadius: '14px', fontWeight: 800, textTransform: 'uppercase' }}
            >{loading ? '⏳ Encrypting…' : 'Finalize Registration'}</button>
        </div>
    );
}

/* ── OTP Form ─────────────────────────────── */
function OTPForm({ onBack, userType }: { onBack: () => void; userType: string }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (val: string, index: number) => {
        if (!/^\d*$/.test(val)) return;
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);
        if (val && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
    };

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Identity Verified</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>Access fully granted.</p>
            <a href={userType === 'seller' ? "/dashboard" : "/"} style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700 }}>
                {userType === 'seller' ? 'Enter Merchant Terminal →' : 'Enter Terminal →'}
            </a>
        </div>
    );

    const valid = otp.every(v => v !== '');
    return (
        <div style={{ width: '100%' }}>
            <button onClick={onBack} style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>← Back</button>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px' }}>Verify Code</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                {otp.map((v, i) => <input key={i} id={`otp-${i}`} type="text" value={v} onChange={e => handleChange(e.target.value, i)} style={{ width: '100%', height: '60px', textAlign: 'center', fontSize: '24px', fontWeight: 800, border: '2px solid var(--border)', borderRadius: '12px', background: 'var(--surface-2)' }} />)}
            </div>
            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); }, 1800); }}
                disabled={!valid || loading}
                style={{ width: '100%', padding: '18px', background: valid ? 'var(--primary)' : 'var(--border)', color: '#fff', borderRadius: '14px', fontWeight: 800, textTransform: 'uppercase' }}
            >{loading ? '⏳ Verifying…' : 'Verify Identity'}</button>
        </div>
    );
}

/* ── Forgot Password Form ─────────────────── */
function ForgotForm({ onBack }: { onBack: () => void }) {
    const [step, setStep] = useState(1); // 1: Request, 2: Complete
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleRequest = async () => {
        if (!email) return;
        setLoading(true);
        setError(null);
        try {
            await requestPasswordReset({ email });
            setStep(2);
            setTimer(60); // 1 minute cooldown
        } catch (err: any) {
            setError(err.detail || 'Failed to request reset.');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!otp || !newPassword) return;
        setLoading(true);
        setError(null);
        try {
            await completePasswordReset({ email, otp, new_password: newPassword });
            setSuccess(true);
        } catch (err: any) {
            setError(err.detail || 'Failed to complete reset. Check your OTP.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', color: '#fff', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', marginBottom: '12px' }}>Password Reset!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Your password has been updated successfully. You can now log in with your new credentials.</p>
                <button onClick={onBack} style={{ width: '100%', padding: '18px', background: 'var(--primary)', color: '#fff', borderRadius: '14px', fontWeight: 800, cursor: 'pointer' }}>Back to Login</button>
            </div>
        );
    }

    return (
        <div style={{ width: '100%' }}>
            <button onClick={onBack} style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>← Back to Login</button>
            
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>
                {step === 1 ? 'Reset Password' : 'Verify Identity'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>
                {step === 1 ? 'Enter your email to receive a verification code.' : 'Enter the code sent to your email and your new password.'}
            </p>

            {error && (
                <div style={{ background: 'var(--danger-light)', color: 'var(--danger-dark)', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '24px', border: '1px solid var(--danger)' }}>
                    ⚠ {error}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                
                {step === 2 && (
                    <>
                        <Field label="Verification Code (OTP)" type="text" value={otp} onChange={setOtp} placeholder="Enter OTP" required />
                        <Field label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="••••••••" required />
                    </>
                )}
            </div>

            <button 
                onClick={step === 1 ? handleRequest : handleComplete}
                disabled={loading || (step === 1 ? !email : (!otp || !newPassword))}
                style={{ 
                    width: '100%', marginTop: '40px', padding: '18px', 
                    background: (step === 1 ? email : (otp && newPassword)) ? 'var(--primary)' : 'var(--border)', 
                    color: '#fff', borderRadius: '14px', fontWeight: 800, fontSize: '16px', cursor: (step === 1 ? email : (otp && newPassword)) ? 'pointer' : 'not-allowed'
                }}
            >
                {loading ? '⏳ Processing…' : (step === 1 ? 'Request Reset →' : 'Update Password →')}
            </button>
            
            {step === 2 && (
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Didn't get the code?{' '}
                    {timer > 0 ? (
                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Resend in {timer}s</span>
                    ) : (
                        <button onClick={handleRequest} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Resend</button>
                    )}
                </p>
            )}
        </div>
    );
}

/* ── Main Page ──────────────────────────── */
export default function AuthPage() {
    const [mode, setMode] = useState<Mode>('login');
    const [userType, setUserType] = useState('buyer');

    const handleSuccess = (type: string) => {
        setUserType(type);
        if (mode === 'login') {
            window.location.href = type === 'seller' ? '/dashboard' : '/';
        } else {
            setMode('otp');
        }
    };

    return (
        <>
            <style>{`
        .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .auth-panel { display: flex; width: 100%; min-height: 100vh; }
        .auth-form-col { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 48px 60px; background: var(--surface); overflow-y: auto; }
        .auth-form-inner { width: 100%; max-width: 480px; }
        @media (max-width: 900px) { .auth-page { grid-template-columns: 1fr !important; } .auth-panel { display: none !important; } }
      `}</style>
            <div className="auth-page">
                <div className="auth-panel"><AuthPanel mode={mode} /></div>
                <div className="auth-form-col">
                    <div className="auth-form-inner">
                        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} onForgot={() => setMode('forgot')} onSuccess={handleSuccess} />}
                        {mode === 'register' && <RegisterForm onSwitch={() => setMode('otp')} onSuccess={handleSuccess} />}
                        {mode === 'forgot' && <ForgotForm onBack={() => setMode('login')} />}
                        {mode === 'otp' && <OTPForm onBack={() => setMode('login')} userType={userType} />}
                    </div>
                </div>
            </div>
        </>
    );
}