'use client';
import { useState } from 'react';
import { Service } from '@/services/types';
import { Heart, Star, Wrench } from 'lucide-react';

export default function ServiceCard({ id, slug, name, price, rating, review_count, provider, emoji, image, category }: any) {
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <a href={`/services/${slug || id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-lg)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
                <div style={{ position: 'relative', background: 'var(--surface-2)', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {image ? (
                        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                            <Wrench size={32} />
                        </div>
                    )}
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{category}</span>
                    </div>
                    <button onClick={e => { e.preventDefault(); setWishlisted(!wishlisted); }} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', border: 'none', cursor: 'pointer', color: wishlisted ? 'var(--danger)' : 'var(--text-muted)' }}>
                        <Heart size={15} fill={wishlisted ? 'var(--danger)' : 'none'} />
                    </button>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <Star size={14} fill="var(--secondary)" color="var(--secondary)" />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{rating}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({review_count || 0})</span>
                    </div>
                    
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.3 }}>{name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>by {typeof provider === 'object' ? provider.store_name : provider}</p>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Starting from</span>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--primary)' }}>₦{parseFloat(price as any).toLocaleString()}</span>
                        </div>
                        <span style={{ padding: '6px 14px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 700 }}>Book Now →</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
