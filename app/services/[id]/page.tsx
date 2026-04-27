'use client';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { ALL_SERVICES } from '@/lib/data';
import ReviewsSection from '@/components/ui/ReviewsSection';

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceId = parseInt(params.id as string);
    const service = useMemo(() => ALL_SERVICES.find(s => s.id === serviceId), [serviceId]);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
    const [booking, setBooking] = useState(false);

    if (!service) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>Service Not Found</h1>
                <a href="/services" style={{ color: 'var(--primary)', fontWeight: 700 }}>Back to Services</a>
            </div>
        );
    }

    const handleBookNow = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time for your booking.');
            return;
        }
        setBooking(true);
        // Simulate redirecting to checkout with booking info
        setTimeout(() => {
            window.location.href = `/checkout?type=service&id=${service.id}&date=${selectedDate}&time=${selectedTime}`;
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

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', marginBottom: '48px' }}>
                    {/* Visual Section */}
                    <div>
                        <div style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', background: 'var(--surface-2)', aspectRatio: '16/10', marginBottom: '24px', border: '1px solid var(--border)' }}>
                            {service.image ? (
                                <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px' }}>{service.emoji}</div>
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
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Provider</p>
                                    <p style={{ fontWeight: 700, fontSize: '15px' }}>{service.provider}</p>
                                </div>
                                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Rating</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ color: 'var(--secondary)' }}>★</span>
                                        <p style={{ fontWeight: 700, fontSize: '15px' }}>{service.rating} ({service.reviewsCount} reviews)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <div style={{ background: 'var(--surface)', border: '2px solid var(--primary)', borderRadius: 'var(--radius-2xl)', padding: '32px', boxShadow: 'var(--shadow-xl)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Starting Price</span>
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: 'var(--primary)' }}>₦{service.price}</span>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 24px' }} />

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>1. Select Date</label>
                                <input 
                                    type="date" 
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
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
                                            onClick={() => setSelectedTime(time)}
                                            style={{ 
                                                padding: '10px', 
                                                borderRadius: 'var(--radius)', 
                                                border: `1.5px solid ${selectedTime === time ? 'var(--primary)' : 'var(--border)'}`, 
                                                background: selectedTime === time ? 'var(--primary-light)' : 'var(--surface)', 
                                                color: selectedTime === time ? 'var(--primary)' : 'var(--text-secondary)',
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
                                disabled={booking}
                                style={{ 
                                    width: '100%', 
                                    padding: '16px', 
                                    background: 'var(--primary)', 
                                    color: '#fff', 
                                    borderRadius: 'var(--radius-xl)', 
                                    fontSize: '16px', 
                                    fontWeight: 800, 
                                    cursor: booking ? 'wait' : 'pointer',
                                    boxShadow: '0 8px 25px rgba(238, 18, 23, 0.25)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {booking ? 'Processing...' : 'Reserve Service Now'}
                            </button>
                            
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>No payment charged until you confirm on the next step.</p>
                        </div>

                        {/* Provider Stats */}
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '20px', marginTop: '24px', display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>98%</p>
                                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Response Rate</p>
                            </div>
                            <div style={{ width: '1px', background: 'var(--border)' }} />
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>2.4k</p>
                                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jobs Done</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-2xl)', padding: '48px' }}>
                    <ReviewsSection reviews={service.reviewsList} initialRating={service.rating} />
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
