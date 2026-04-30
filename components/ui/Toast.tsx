'use client';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    title?: string;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, title?: string) => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = 'info', title?: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, title }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    };

    const success = (message: string, title: string = 'Success') => showToast(message, 'success', title);
    const error = (message: string, title: string = 'Error') => showToast(message, 'error', title);

    return (
        <ToastContext.Provider value={{ showToast, success, error }}>
            {children}
            <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'none' }}>
                {toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

function ToastItem({ toast, onClose }: { toast: Toast, onClose: () => void }) {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };

    const bgColors = {
        success: '#f0fdf4',
        error: '#fef2f2',
        info: '#eff6ff',
        warning: '#fffbeb'
    };

    return (
        <div 
            style={{ 
                background: bgColors[toast.type], 
                border: `1px solid ${colors[toast.type]}20`,
                borderLeft: `4px solid ${colors[toast.type]}`,
                padding: '16px 20px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                width: '320px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                pointerEvents: 'auto',
                animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)'
            }}
        >
            <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: colors[toast.type], 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '14px', 
                fontWeight: 800,
                flexShrink: 0
            }}>
                {icons[toast.type]}
            </div>
            <div style={{ flex: 1 }}>
                {toast.title && <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>{toast.title}</p>}
                <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.4 }}>{toast.message}</p>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px', padding: 0 }}>✕</button>
            <style>{`
                @keyframes toastSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
