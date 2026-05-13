'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getServiceDetail } from '@/services/publicService';
import { ServiceDetail as IServiceDetail } from '@/services/types';
import { useToast } from '@/components/ui/Toast';
import ReviewsSection from '@/components/ui/ReviewsSection';

export default function ServiceDetailPage() {
    const params = useParams();
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [added, setAdded] = useState(false);

    const [service, setService] = useState<IServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const response = await getServiceDetail(params.id as string);
                const actualData = (response as any).data || response;
                setService(actualData);
            } catch (err: any) {
                setError(err.detail || 'Could not fetch service details.');
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [params.id]);

    if (loading) return (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Syncing Service Provider Terminal...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error || !service) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>{error || 'Service Not Found'}</h1>
                <a href="/services" style={{ color: 'var(--primary)', fontWeight: 700 }}>Back to Services</a>
            </div>
        );
    }

    const { success, error: toastError } = useToast();
    const handleBookNow = () => {
        if (!bookingDate || !bookingTime) {
            toastError('Please select a date and time for your booking.');
            return;
        }
        setAdded(true);
        setTimeout(() => {
            window.location.href = `/checkout?type=service&id=${service.slug}&date=${bookingDate}&time=${bookingTime}`;
        }, 500);
    };

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '80px' }}>
            <div className="container" style={{ padding: '24px var(--gutter)' }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', textTransform: 'capitalize' }}>
                    <a href="/" style={{ color: 'var(--text-muted)' }}>Home</a>
                    <span>›</span>
                    <a href="/services" style={{ color: 'var(--text-muted)' }}>Services</a>
                    <span>›</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{service.name}</span>
                </div>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr', gap: '48px', marginBottom: '48px' }}>
                    {/* Visual Section */}
                    <div>
                        <div style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', background: 'var(--surface-2)', aspectRatio: '16/10', marginBottom: '24px', border: '1px solid var(--border)' }}>
                            {service.image ? (
                                <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px' }}>{service.emoji || '🛠️'}</div>
                            )}
                            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                                <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '6px 16px', borderRadius: '30px' }}>{service.category}</span>
                            </div>
                        </div>

                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '32px' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', marginBottom: '16px' }}>Service Overview</h2>
                            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{service.description}</p>
                            
                            <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                     <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>{(service.seller || (service as any).provider)?.store_name || 'Unknown Provider'}</p>
                                     <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                                         <p style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 700 }}>{(service.seller || (service as any).provider)?.response_rate_pct || 0}% Response Rate</p>
                                         <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Verified Provider</p>
                                     </div>
                                     <a href={`/shop/${(service.seller || (service as any).provider)?.slug || '#'}`} style={{ display: 'inline-block', marginTop: '12px', padding: '10px 20px', border: '1.5px solid var(--primary)', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>View Store Profile →</a>
                                 </div>
                                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Rating</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ color: 'var(--secondary)' }}>★</span>
                                        <p style={{ fontWeight: 700, fontSize: '15px' }}>{service.rating} ({service.review_count} reviews)</p>
                                    </div>
                                </div>
                                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Location</p>
                                    <p style={{ fontWeight: 700, fontSize: '15px' }}>{(service.seller || (service as any).provider)?.location || 'Unknown'}</p>
                                </div>
                                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Availability</p>
                                    <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--success)' }}>Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <div style={{ background: 'var(--surface)', border: '2px solid var(--primary)', borderRadius: 'var(--radius-2xl)', padding: '32px', boxShadow: 'var(--shadow-xl)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Service Fee</span>
                                <div style={{ textAlign: 'right' }}>
                                     <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: 'var(--primary)' }}>₦{parseFloat(service.price).toLocaleString()}</span>
                                     {service.original && <span style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₦{parseFloat(service.original).toLocaleString()}</span>}
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 24px' }} />

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>1. Select Date</label>
                                <input 
                                    type="date" 
                                    value={bookingDate}
                                    onChange={e => setBookingDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 16px', 
                                        borderRadius: 'var(--radius-lg)', 
                                        border: '1.5px solid var(--border)', 
                                        background: 'var(--surface-2)', 
                                        fontSize: '14px',
                                        outline: 'none',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>2. Select Time</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                    {timeSlots.map(time => (
                                        <button 
                                            key={time}
                                            onClick={() => setBookingTime(time)}
                                            style={{ 
                                                padding: '10px', 
                                                borderRadius: 'var(--radius)', 
                                                border: `1.5px solid ${bookingTime === time ? 'var(--primary)' : 'var(--border)'}`, 
                                                background: bookingTime === time ? 'var(--primary-light)' : 'var(--surface)', 
                                                color: bookingTime === time ? 'var(--primary)' : 'var(--text-secondary)',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={handleBookNow}
                                disabled={added}
                                style={{ 
                                    width: '100%', 
                                    padding: '16px', 
                                    background: 'var(--primary)', 
                                    color: '#fff', 
                                    borderRadius: 'var(--radius-xl)', 
                                    fontSize: '16px', 
                                    fontWeight: 800, 
                                    cursor: added ? 'wait' : 'pointer',
                                    boxShadow: '0 8px 25px rgba(238, 18, 23, 0.25)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {added ? 'Processing...' : 'Reserve Service Now'}
                            </button>
                            
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>No payment charged until you confirm on the next step.</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '48px' }}>
                    <ReviewsSection reviews={service.reviews as any} initialRating={service.rating} serviceId={service.id} ratingStats={service.rating_stats} />
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 992px) {
                    .detail-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
