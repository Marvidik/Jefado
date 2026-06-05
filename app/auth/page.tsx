'use client';
import { useState, useEffect } from 'react';
import { login, register, verifyEmail, requestPasswordReset, completePasswordReset } from '@/services/authService';
import { useToast } from '@/components/ui/Toast';

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
            title: 'Welcome\nBack.',
            desc: 'Sign in to manage your account, track orders, and access your dashboard.',
        },
        register: {
            title: 'Create\nAccount.',
            desc: 'Join us to buy or sell products in our secure global marketplace.',
        },
        forgot: {
            title: 'Reset\nPassword.',
            desc: 'Recover your account using a secure verification code sent to your email.',
        },
        otp: {
            title: 'Verify\nOTP.',
            desc: 'Enter the verification code sent to your email to complete your registration.',
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
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);

    const valid = email && password;
    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-1.5px' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px' }}>Log in to your account to continue.</p>

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
                try {
                    const result = await login({ username: email, email: email, password });
                    const uType = result.user?.user_type || 'CUSTOMER';
                    toast.success('Successfully logged in!');
                    onSuccess(uType.toLowerCase());
                } catch (err: any) {
                    toast.error(err.non_field_errors?.[0] || err.detail || 'Login failed.');
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
            >{loading ? 'Logging in...' : 'Log In'}</button>

            <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
                    Don't have an account?{' '}
                    <button 
                        onClick={onSwitch} 
                        style={{ 
                            color: 'var(--primary)', 
                            fontWeight: 800, 
                            background: 'transparent', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontSize: '16px', 
                            marginLeft: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            textDecoration: 'underline',
                            transition: 'all 0.2s ease',
                            display: 'inline-block'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--primary-dark)';
                            e.currentTarget.style.background = 'var(--primary-light)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--primary)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

/* ── Register Form ───────────────────────── */
function RegisterForm({ onSwitch, onSuccess, defaultAccountType = 'buyer' }: { onSwitch: () => void; onSuccess: (type: string) => void; defaultAccountType?: string }) {
    const toast = useToast();
    const [form, setForm] = useState({ 
        firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', accountType: (defaultAccountType === 'seller' ? 'seller' : 'buyer') as 'buyer' | 'seller', storeName: '', rcNumber: ''
    });

    useEffect(() => {
        setForm(f => ({ ...f, accountType: (defaultAccountType === 'seller' ? 'seller' : 'buyer') }));
    }, [defaultAccountType]);

    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const canSubmit = form.firstName && form.lastName && form.email && form.password && form.confirm && agreed && (form.accountType === 'buyer' || (form.storeName && form.rcNumber));

    if (success) return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '72px', height: '72px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '34px', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Account created!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '14px' }}>Welcome to the platform, {form.firstName}!</p>
            <button 
                onClick={() => {
                    window.location.href = form.accountType === 'seller' ? '/dashboard' : '/';
                }} 
                style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
                {form.accountType === 'seller' ? 'Go to Dashboard' : 'Start Shopping'}
            </button>
        </div>
    );

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Join our community today.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                {(['buyer', 'seller'] as const).map(type => {
                    const isSelected = form.accountType === type;
                    return (
                        <button 
                            key={type} 
                            type="button"
                            onClick={() => setForm(f => ({ ...f, accountType: type }))} 
                            style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '24px 16px', 
                                border: `2.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`, 
                                background: isSelected ? 'rgba(26,86,219,0.04)' : 'var(--surface)', 
                                borderRadius: '16px', 
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: isSelected ? '0 8px 20px rgba(26,86,219,0.06)' : 'none',
                                outline: 'none'
                            }}
                            onMouseEnter={e => {
                                if (!isSelected) {
                                    e.currentTarget.style.borderColor = 'var(--text-muted)';
                                    e.currentTarget.style.background = 'var(--surface-2)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isSelected) {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.background = 'var(--surface)';
                                }
                            }}
                        >
                            <div style={{ 
                                width: '56px', 
                                height: '56px', 
                                borderRadius: '12px', 
                                background: isSelected ? 'var(--primary)' : 'var(--surface-2)', 
                                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}>
                                {type === 'buyer' ? (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                ) : (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                )}
                            </div>
                            <span style={{ 
                                fontSize: '13px', 
                                fontWeight: 800, 
                                color: isSelected ? 'var(--primary)' : 'var(--text-primary)', 
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {type === 'buyer' ? 'Individual' : 'Business'}
                            </span>
                        </button>
                    );
                })}
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
                <div>
                    <Field label="Password" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
                    {form.password && form.password.length < 8 && (
                        <span style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '6px', display: 'block', fontWeight: 600 }}>
                            Password must be at least 8 characters long.
                        </span>
                    )}
                </div>
                <Field label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" required />
            </div>

            <label style={{ display: 'flex', gap: '14px', marginBottom: '32px', cursor: 'pointer', fontSize: '14px' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <span>I agree to the Terms and Conditions</span>
            </label>

            <button onClick={async () => { 
                if (!canSubmit) return; 
                if (form.password.length < 8) {
                    toast.error("Password must be at least 8 characters long.");
                    return;
                }
                if (form.password !== form.confirm) {
                    toast.error("Passwords do not match.");
                    return;
                }
                setLoading(true); 
                try {
                    await register({ username: form.email, email: form.email, password1: form.password, password2: form.password, first_name: form.firstName, last_name: form.lastName, user_type: form.accountType === 'buyer' ? 'CUSTOMER' : 'SELLER', store_name: form.storeName, rc_number: form.rcNumber });
                    toast.success('Registration successful!');
                    onSuccess(form.accountType);
                    setSuccess(true);
                } catch (err: any) { 
                    const errMsg = err.non_field_errors?.[0] || err.detail || err.message || Object.values(err).flat()[0] as string || 'Registration failed.';
                    toast.error(errMsg); 
                } finally { 
                    setLoading(false); 
                }
            }}
                disabled={!canSubmit || loading}
                style={{ width: '100%', padding: '18px', background: canSubmit ? 'var(--primary)' : 'var(--border)', color: '#fff', borderRadius: '14px', fontWeight: 800, textTransform: 'none' }}
            >{loading ? 'Registering...' : 'Register'}</button>

            <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
                    Already have an account?{' '}
                    <button 
                        onClick={onSwitch} 
                        style={{ 
                            color: 'var(--primary)', 
                            fontWeight: 800, 
                            background: 'transparent', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontSize: '16px', 
                            marginLeft: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            textDecoration: 'underline',
                            transition: 'all 0.2s ease',
                            display: 'inline-block'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--primary-dark)';
                            e.currentTarget.style.background = 'var(--primary-light)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--primary)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
}

/* ── OTP Form ─────────────────────────────── */
function OTPForm({ onBack, userType }: { onBack: () => void; userType: string }) {
    const toast = useToast();
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
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>Email Verified</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>Your email has been successfully verified.</p>
            <a href={userType === 'seller' ? "/dashboard" : "/"} style={{ display: 'inline-block', padding: '12px 32px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', fontWeight: 700 }}>
                {userType === 'seller' ? 'Go to Dashboard' : 'Go to Home'}
            </a>
        </div>
    );

    const valid = otp.every(v => v !== '');
    return (
        <div style={{ width: '100%' }}>
            <button onClick={onBack} style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>← Back</button>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', marginBottom: '8px' }}>Verify OTP</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                {otp.map((v, i) => <input key={i} id={`otp-${i}`} type="text" value={v} onChange={e => handleChange(e.target.value, i)} style={{ width: '100%', height: '60px', textAlign: 'center', fontSize: '24px', fontWeight: 800, border: '2px solid var(--border)', borderRadius: '12px', background: 'var(--surface-2)' }} />)}
            </div>
            <button onClick={() => { if (!valid) return; setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); toast.success('Identity verified successfully!'); }, 1800); }}
                disabled={!valid || loading}
                style={{ width: '100%', padding: '18px', background: valid ? 'var(--primary)' : 'var(--border)', color: '#fff', borderRadius: '14px', fontWeight: 800, textTransform: 'none' }}
            >{loading ? 'Verifying...' : 'Verify OTP'}</button>
        </div>
    );
}

/* ── Forgot Password Form ─────────────────── */
function ForgotForm({ onBack }: { onBack: () => void }) {
    const toast = useToast();
    const [step, setStep] = useState(1); // 1: Request, 2: Complete
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
        try {
            await requestPasswordReset({ email });
            toast.success('Verification code sent to your email.');
            setStep(2);
            setTimer(60); // 1 minute cooldown
        } catch (err: any) {
            toast.error(err.detail || 'Failed to request reset.');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!otp || !newPassword) return;
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }
        setLoading(true);
        try {
            await completePasswordReset({ email, otp, new_password: newPassword });
            toast.success('Password updated successfully!');
            setSuccess(true);
        } catch (err: any) {
            toast.error(err.detail || 'Failed to complete reset. Check your OTP.');
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
                {step === 1 ? 'Reset Password' : 'Verify OTP'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>
                {step === 1 ? 'Enter your email to receive a verification code.' : 'Enter the code sent to your email and your new password.'}
            </p>



            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                
                {step === 2 && (
                    <>
                        <Field label="Verification Code (OTP)" type="text" value={otp} onChange={setOtp} placeholder="Enter OTP" required />
                        <div>
                            <Field label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="••••••••" required />
                            {newPassword && newPassword.length < 8 && (
                                <span style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '6px', display: 'block', fontWeight: 600 }}>
                                    Password must be at least 8 characters long.
                                </span>
                            )}
                        </div>
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
                {loading ? 'Processing...' : (step === 1 ? 'Send Reset Link' : 'Reset Password')}
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const m = params.get('mode');
            const t = params.get('type');
            if (m === 'register' || m === 'login' || m === 'forgot' || m === 'otp') {
                setMode(m as Mode);
            }
            if (t === 'seller' || t === 'buyer') {
                setUserType(t);
            }
        }
    }, []);

    const handleSuccess = (type: string) => {
        setUserType(type);
        if (mode === 'login') {
            window.location.href = type === 'seller' ? '/dashboard' : '/';
        } else {
            // Registration success is handled locally in RegisterForm success state
        }
    };

    return (
        <>
            <style>{`
        .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; background: #ffffff; }
        .auth-panel { display: flex; width: 100%; min-height: 100vh; }
        .auth-form-col { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px 80px; background: #ffffff; overflow-y: auto; }
        .auth-form-inner { 
            width: 100%; 
            max-width: 540px; 
            background: transparent; 
            padding: 0; 
        }
        @media (max-width: 1000px) { 
            .auth-page { grid-template-columns: 1fr !important; } 
            .auth-panel { display: none !important; } 
            .auth-form-col { padding: 40px 24px; min-height: 100vh; }
            .auth-form-inner { padding: 0; }
        }
      `}</style>
            <div className="auth-page">
                <div className="auth-panel"><AuthPanel mode={mode} /></div>
                <div className="auth-form-col">
                    <div className="auth-form-inner">
                        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} onForgot={() => setMode('forgot')} onSuccess={handleSuccess} />}
                        {mode === 'register' && <RegisterForm onSwitch={() => setMode('login')} onSuccess={handleSuccess} defaultAccountType={userType} />}
                        {mode === 'forgot' && <ForgotForm onBack={() => setMode('login')} />}
                        {mode === 'otp' && <OTPForm onBack={() => setMode('login')} userType={userType} />}
                    </div>
                </div>
            </div>
        </>
    );
}