export default function Loader({ text = "Loading...", icon = "⏳", subtext = "Please wait..." }: { text?: string, icon?: string, subtext?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 0', gap: '24px' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(238,18,23,0.1)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', animation: 'pulse 1.5s ease-in-out infinite' }}>{icon}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>{text}</p>
                {subtext && <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{subtext}</p>}
            </div>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.85); opacity: 0.7; } }
            `}</style>
        </div>
    );
}
