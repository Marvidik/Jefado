'use client';
import { useState, useEffect, useRef } from 'react';

interface PolicySection {
    id: string;
    title: string;
    icon?: string;
    content: React.ReactNode;
}

interface PolicyLayoutProps {
    title: string;
    subtitle?: string;
    description: string;
    lastUpdated: string;
    icon: string;
    sections: PolicySection[];
}

export default function PolicyLayout({
    title,
    subtitle = "Official Platform Policy",
    description,
    lastUpdated,
    icon,
    sections
}: PolicyLayoutProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            const visibleEntry = entries.find(entry => entry.isIntersecting);
            if (visibleEntry) {
                setActiveSection(visibleEntry.target.id);
            }
        };

        observer.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle of viewport
            threshold: 0.1
        });

        sections.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (el && observer.current) {
                observer.current.observe(el);
            }
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -90; // Header spacing
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font-body)', paddingBottom: '80px' }}>
            {/* Ambient Hero Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0b0f19 0%, #111827 100%)',
                padding: '100px 0 140px',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Glow Spheres */}
                <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '350px', height: '350px', background: 'var(--primary)', filter: 'blur(160px)', opacity: 0.12, borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-120px', right: '-120px', width: '350px', height: '350px', background: 'var(--secondary)', filter: 'blur(160px)', opacity: 0.15, borderRadius: '50%' }}></div>

                <div className="container animate-in">
                    {/* Breadcrumbs */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>
                        <a href="/" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>Home</a>
                        <span>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Legal & Policies</span>
                    </div>

                    {/* Meta Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', color: 'var(--secondary)', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--secondary)', borderRadius: '50%' }}></span>
                        {subtitle}
                    </div>

                    {/* Title & Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <span style={{ fontSize: '48px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.15))' }}>{icon}</span>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 900,
                            fontSize: 'clamp(36px, 6vw, 56px)',
                            color: '#fff',
                            letterSpacing: '-2px',
                            lineHeight: 1.1,
                            margin: 0
                        }}>
                            {title}
                        </h1>
                    </div>

                    <p style={{
                        fontSize: '17px',
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '650px',
                        margin: '20px auto 0',
                        lineHeight: 1.6,
                        textAlign: 'center'
                    }}>
                        {description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                        <span>Last Updated: May 2026</span>
                    </div>
                </div>
            </div>

            {/* Overlapping Content Container */}
            <div className="container" style={{ marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                <div className="policy-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', alignItems: 'flex-start' }}>
                    
                    {/* Left Sticky Navigation */}
                    <aside className="policy-sidebar" style={{
                        position: 'sticky',
                        top: '100px',
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border)',
                        borderRadius: '24px',
                        padding: '24px 18px',
                        boxShadow: 'var(--shadow)',
                        maxHeight: 'calc(100vh - 140px)',
                        overflowY: 'auto'
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            color: 'var(--text-muted)',
                            marginBottom: '16px',
                            paddingLeft: '12px'
                        }}>Table of Contents</p>
                        
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {sections.map(sec => {
                                const isActive = activeSection === sec.id;
                                return (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollToSection(sec.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 14px',
                                            borderRadius: '12px',
                                            width: '100%',
                                            textAlign: 'left',
                                            fontSize: '13px',
                                            fontWeight: isActive ? 800 : 500,
                                            color: isActive ? '#fff' : 'var(--text-secondary)',
                                            background: isActive ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' : 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: isActive ? '0 4px 12px rgba(238,18,23,0.2)' : 'none'
                                        }}
                                    >
                                        <span style={{ fontSize: '15px' }}>{sec.icon || '📄'}</span>
                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sec.title}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Right Policy Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {sections.map((sec, idx) => (
                            <section
                                key={sec.id}
                                id={sec.id}
                                className="premium-card scroll-mt"
                                style={{
                                    scrollMarginTop: '100px',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                                    <span style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'var(--primary-light)',
                                        color: 'var(--primary)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        fontWeight: 800
                                    }}>
                                        {idx + 1}
                                    </span>
                                    <h2 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '22px',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        margin: 0
                                    }}>
                                        {sec.title}
                                    </h2>
                                </div>

                                <div className="policy-content" style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                                    {sec.content}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Interactive CSS */}
            <style jsx global>{`
                .scroll-mt {
                    scroll-margin-top: 100px;
                }
                .policy-content p {
                    margin-bottom: 16px;
                }
                .policy-content ul {
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 20px;
                }
                .policy-content ul li {
                    position: relative;
                    padding-left: 28px;
                    margin-bottom: 12px;
                }
                .policy-content ul li::before {
                    content: "•";
                    position: absolute;
                    left: 10px;
                    color: var(--primary);
                    font-weight: 800;
                    font-size: 18px;
                    top: -1px;
                }
                .policy-content ol {
                    padding-left: 20px;
                    margin-bottom: 20px;
                }
                .policy-content ol li {
                    margin-bottom: 12px;
                    padding-left: 8px;
                }
                .policy-content strong {
                    color: var(--text-primary);
                    font-weight: 700;
                }
                
                @media (max-width: 1024px) {
                    .policy-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    .policy-sidebar {
                        position: static !important;
                        max-height: none !important;
                        display: flex !important;
                        flex-direction: column;
                    }
                    .policy-sidebar nav {
                        flex-direction: row !important;
                        overflow-x: auto;
                        padding-bottom: 8px;
                        gap: 8px !important;
                    }
                    .policy-sidebar nav button {
                        white-space: nowrap;
                        width: auto !important;
                    }
                }
            `}</style>
        </div>
    );
}
