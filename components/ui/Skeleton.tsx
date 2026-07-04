import React from 'react';

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                background: 'linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-loading 1.5s infinite',
                borderRadius: 'var(--radius)',
                ...style
            }}
        >
            <style>{`
                @keyframes skeleton-loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}

export function ProductSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <Skeleton style={{ width: '100%', aspectRatio: '1', borderRadius: 'var(--radius)' }} />
            <Skeleton style={{ width: '60%', height: '24px' }} />
            <Skeleton style={{ width: '80%', height: '16px' }} />
            <Skeleton style={{ width: '40%', height: '24px' }} />
        </div>
    );
}
