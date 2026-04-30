'use client';
import { useState } from 'react';
import { Review } from '@/services/types';
import { useToast } from './Toast';
import { createReview } from '@/services/publicService';

function Stars({ rating, size = 16, interactive = false, onRating }: { rating: number; size?: number; interactive?: boolean; onRating?: (r: number) => void }) {
    return (
        <span style={{ display: 'inline-flex', gap: '3px' }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span 
                    key={i} 
                    onClick={() => interactive && onRating?.(i)}
                    style={{ 
                        fontSize: size, 
                        color: i <= Math.round(rating) ? 'var(--secondary)' : '#e2e8f0',
                        cursor: interactive ? 'pointer' : 'default',
                        transition: 'transform 0.1s'
                    }}
                    onMouseEnter={e => interactive && (e.currentTarget.style.transform = 'scale(1.2)')}
                    onMouseLeave={e => interactive && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    ★
                </span>
            ))}
        </span>
    );
}

export default function ReviewsSection({ reviews = [], initialRating = 0, productId, serviceId, ratingStats }: { reviews?: Review[]; initialRating?: number; productId?: number; serviceId?: number; ratingStats?: any }) {
    const { success, error: toastError } = useToast();
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userRating === 0) return toastError('Please select a rating');
        setSubmitting(true);
        
        try {
            const payload: any = {
                rating: userRating,
                comment: comment,
            };
            if (productId) payload.product = productId;
            if (serviceId) payload.service = serviceId;

            const newReview = await createReview(payload);
            setLocalReviews([newReview, ...localReviews]);
            setUserRating(0);
            setComment('');
            success('Review posted successfully!');
        } catch (err) {
            console.error("Failed to post review:", err);
            toastError('Failed to post review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const ratingCounts = [5, 4, 3, 2, 1].map(stars => {
        if (ratingStats) {
            const count = ratingStats[`stars_${stars}`] || 0;
            const total = ratingStats.total_reviews || 1;
            return { stars, count, percent: (count / total) * 100 };
        }
        return {
            stars,
            count: localReviews.filter(r => Math.round(r.rating) === stars).length,
            percent: localReviews.length ? (localReviews.filter(r => Math.round(r.rating) === stars).length / localReviews.length) * 100 : 0
        };
    });

    const avgRating = ratingStats?.average_rating !== undefined 
        ? parseFloat(ratingStats.average_rating).toFixed(1) 
        : (localReviews.length 
            ? (localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length).toFixed(1)
            : initialRating.toFixed(1));

    const totalReviewsCount = ratingStats?.total_reviews ?? localReviews.length;

    return (
        <div style={{ color: 'var(--text-primary)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 300px) 1fr', gap: '48px', marginBottom: '48px' }} className="reviews-grid">
                {/* Summary */}
                <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', marginBottom: '16px' }}>Customer Reviews</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--primary)' }}>{avgRating}</span>
                        <div>
                            <Stars rating={parseFloat(avgRating)} size={20} />
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Based on {totalReviewsCount} reviews</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {ratingCounts.map(r => (
                            <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, width: '50px' }}>{r.stars} Stars</span>
                                <div style={{ flex: 1, height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${r.percent}%`, height: '100%', background: 'var(--secondary)', borderRadius: '4px' }} />
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '30px', textAlign: 'right' }}>{r.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div style={{ background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>Write a Review</h4>
                    <form onSubmit={handleSubmitReview}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Your Rating</label>
                            <Stars rating={userRating} size={24} interactive onRating={setUserRating} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Your Review</label>
                            <textarea 
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Share your experience..."
                                required
                                style={{ 
                                    width: '100%', 
                                    minHeight: '100px', 
                                    padding: '12px 14px', 
                                    borderRadius: 'var(--radius-lg)', 
                                    border: '1.5px solid var(--border)', 
                                    outline: 'none', 
                                    fontFamily: 'inherit',
                                    fontSize: '14px',
                                    background: 'var(--surface)',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            style={{ 
                                padding: '12px 24px', 
                                background: 'var(--primary)', 
                                color: '#fff', 
                                borderRadius: 'var(--radius-lg)', 
                                fontWeight: 700, 
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.2s',
                                opacity: submitting ? 0.7 : 1,
                                border: 'none'
                            }}
                        >
                            {submitting ? 'Submitting...' : 'Post Review'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {localReviews.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No reviews yet. Be the first to review!</div>
                ) : (
                    localReviews.map(review => (
                        <div key={review.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary)', fontSize: '14px' }}>
                                        {review.user_name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: '15px' }}>{review.user_name}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Stars rating={review.rating} size={12} />
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                {review.is_verified_purchase && <div style={{ color: 'var(--success)', fontSize: '12px', fontWeight: 600 }}>✓ Verified Purchase</div>}
                            </div>
                            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .reviews-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                }
            `}</style>
        </div>
    );
}
