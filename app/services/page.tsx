'use client';
import { useState, useMemo } from 'react';
import { ALL_SERVICES, SERVICE_CATEGORIES } from '@/lib/data';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredServices = useMemo(() => {
        return ALL_SERVICES.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Hero Section */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 0 40px' }}>
                <div className="container">
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '42px', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '16px', letterSpacing: '-1px' }}>Find Professional Services</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px' }}>Book top-rated professionals for your personal and business needs. From haircuts to deep cleaning, we have you covered.</p>
                    
                    {/* Search Bar */}
                    <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search for services or providers..." 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '16px 16px 16px 48px', 
                                borderRadius: '100px', 
                                border: '1.5px solid var(--border)', 
                                background: 'var(--surface-2)', 
                                outline: 'none', 
                                fontSize: '16px',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'all 0.3s'
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '40px' }}>
                {/* Categories */}
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }} className="no-scrollbar">
                    <button 
                        onClick={() => setActiveCategory('all')}
                        style={{ 
                            padding: '10px 24px', 
                            borderRadius: '100px', 
                            background: activeCategory === 'all' ? 'var(--primary)' : 'var(--surface)', 
                            color: activeCategory === 'all' ? '#fff' : 'var(--text-secondary)',
                            fontWeight: 700,
                            border: '1.5px solid var(--border)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}
                    >
                        All Services
                    </button>
                    {SERVICE_CATEGORIES.map(cat => (
                        <button 
                            key={cat.slug} 
                            onClick={() => setActiveCategory(cat.slug)}
                            style={{ 
                                padding: '10px 24px', 
                                borderRadius: '100px', 
                                background: activeCategory === cat.slug ? 'var(--primary)' : 'var(--surface)', 
                                color: activeCategory === cat.slug ? '#fff' : 'var(--text-secondary)',
                                fontWeight: 700,
                                border: '1.5px solid var(--border)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <ServiceCard key={service.id} {...service} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}>
                            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🤷‍♂️</p>
                            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>No services found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
