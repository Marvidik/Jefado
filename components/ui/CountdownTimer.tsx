'use client';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetHours?: number;
    targetMinutes?: number;
    targetSeconds?: number;
}

export default function CountdownTimer({
    targetHours = 3,
    targetMinutes = 23,
    targetSeconds = 19,
}: CountdownTimerProps) {
    const [time, setTime] = useState({
        hours: targetHours,
        minutes: targetMinutes,
        seconds: targetSeconds,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) { seconds = 59; minutes--; }
                if (minutes < 0) { minutes = 59; hours--; }
                if (hours < 0) { hours = 23; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => String(n).padStart(2, '0');

    const segments = [
        { label: 'Hours', value: time.hours },
        { label: 'Mins', value: time.minutes },
        { label: 'Secs', value: time.seconds },
    ];

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {segments.map(({ label, value }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '20px',
                            width: '52px',
                            height: '48px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            letterSpacing: '1px',
                        }}>
                            {pad(value)}
                        </div>
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            marginTop: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}>{label}</div>
                    </div>
                    {i < segments.length - 1 && (
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '22px',
                            color: 'var(--primary)',
                            marginBottom: '14px',
                        }}>:</span>
                    )}
                </div>
            ))}
        </div>
    );
}