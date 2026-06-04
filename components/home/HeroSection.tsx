'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    tag: 'Shop Smart, Sell Easy',
    headline: 'Sell, Shop, Succeed.\nEverything You Need in One Place',
    subline: ' Join our marketplace today: sell your products, shop the latest deals, and enjoy a seamless experience tailored just for you',
    cta1: { label: 'Shop Now', href: '/products' },
    cta2: { label: 'Sell Now', href: '/auth?type=seller' },
    badge: { top: 'Up To', main: '60%', sub: 'OFF' },
    bg: '#ffe4e6', /* Rose 100 - Dimmer than before */
    circle: 'rgba(238,18,23,0.15)',
    photo: '/images/g2.png',
    fallback: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=700&fit=crop&crop=top&q=80',
    floats: [
      { emoji: '💻', top: '6%', left: '64%', size: 54, d: 0 },
      { emoji: '👗', top: '36%', left: '52%', size: 46, d: 0.35 },
      { emoji: '👟', top: '66%', left: '56%', size: 42, d: 0.7 },
      { emoji: '❄️', top: '18%', right: '5%', size: 36, d: 1.0 },
      { emoji: '🌿', top: '62%', right: '4%', size: 34, d: 1.4 },
    ],
  },
  {
    tag: 'Shop Smart, Sell Easy',
    headline: 'Top Products,\nTrusted Sellers.\nYour Marketplace Awaits.',
    subline: 'From selling your first product to finding great deals, experience everything our marketplace has to offer.',
    cta1: { label: 'Shop Now', href: '/products' },
    cta2: { label: 'Sell Now', href: '/auth?type=seller' },
    badge: { top: 'Save', main: '40%', sub: 'TODAY' },
    bg: '#fee2e2', /* Red 100 */
    circle: 'rgba(238,18,23,0.15)',
    photo: '/images/goods2.png',
    fallback: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop&crop=top&q=80',
    floats: [
      { emoji: '📱', top: '6%', left: '64%', size: 56, d: 0 },
      { emoji: '💻', top: '38%', left: '52%', size: 48, d: 0.35 },
      { emoji: '🎮', top: '66%', left: '56%', size: 42, d: 0.7 },
      { emoji: '🔊', top: '18%', right: '5%', size: 38, d: 1.0 },
      { emoji: '⌨️', top: '62%', right: '4%', size: 34, d: 1.4 },
    ],
  },
  {
    tag: 'Shop Smart, Sell Easy',
    headline: 'Premium Deals,\nExciting Finds.\nStart Selling Today.',
    subline: 'Discover the latest trends in fashion. Reliable Delivery on all orders above $50.',
    cta1: { label: 'Shop Now', href: '/products' },
    cta2: { label: 'Sell Now', href: '/auth?type=seller' },
    badge: { top: 'Flat', main: '50%', sub: 'OFF' },
    bg: '#fce7f3', /* Pink 100 */
    circle: 'rgba(238,18,23,0.15)',
    photo: '/images/goods3.PNG',
    fallback: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=700&fit=crop&crop=top&q=80',
    floats: [
      { emoji: '👗', top: '6%', left: '64%', size: 54, d: 0 },
      { emoji: '👠', top: '36%', left: '52%', size: 46, d: 0.35 },
      { emoji: '👜', top: '64%', left: '56%', size: 42, d: 0.7 },
      { emoji: '💄', top: '18%', right: '5%', size: 36, d: 1.0 },
      { emoji: '🧣', top: '60%', right: '4%', size: 34, d: 1.4 },
    ],
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [imgSrc, setImgSrc] = useState<Record<number, string>>({});
  const slide = slides[active];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const getSrc = (idx: number) => imgSrc[idx] ?? slides[idx].photo;

  const handleError = (idx: number) => {
    setImgSrc(prev => ({ ...prev, [idx]: slides[idx].fallback }));
  };

  return (
    <>
      <style>{`
        @keyframes heroFloat  { 0%,100%{transform:translateY(0)}        50%{transform:translateY(-12px)} }
        @keyframes heroFloatR { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
        @keyframes heroPop    { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        .hero-section {
          width: 100%;
          position: relative;
          overflow: hidden;
          min-height: 630px;
          display: flex;
          align-items: stretch;
          margin-bottom: 40px;
        }
        .hero-row {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: stretch;
          position: relative;
          z-index: 3;
        }
        .hero-text {
          flex: 0 0 auto;
          width: 46%;
          max-width: 560px;
          padding: 56px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 4;
        }
        .hero-photo-col {
            flex: 0 0 48%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            overflow: visible;
            }
        .hero-img {
            position: relative; /*  change from absolute */
            height: auto;
            width: 100%;
            max-height: 580px;
            object-fit: contain;
            transform: translateX(40%);
            }
        .hero-h1 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 54px;
          color: #0f172a;
          line-height: 1.04;
          margin-bottom: 28px; /* Increased from 20px */
          letter-spacing: -2px;
          white-space: pre-line;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(238,18,23,0.08);
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 30px; /* Increased from 22px */
          border: 1px solid rgba(238,18,23,0.15);
          width: fit-content;
        }
        .hero-sub {
          color: #64748b;
          font-size: 15px;
          line-height: 1.75;
          margin-bottom: 42px; /* Increased from 36px */
          max-width: 400px;
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-cta-shop {
          display: inline-flex; align-items: center;
          background: linear-gradient(135deg, var(--primary) 0%, #ff4b50 100%); color: #fff;
          padding: 14px 34px; border-radius: 50px;
          font-family: var(--font-body); font-weight: 800; font-size: 15px;
          box-shadow: 0 4px 20px rgba(238,18,23,0.25);
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none;
        }
        .hero-cta-shop:hover  { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(238,18,23,0.4); }
        .hero-cta-shop:hover .cta-icon { transform: translateX(4px); }
        
        .hero-cta-sell {
          display: inline-flex; align-items: center;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #fff;
          padding: 14px 34px; border-radius: 50px;
          font-family: var(--font-body); font-weight: 800; font-size: 15px;
          box-shadow: 0 4px 20px rgba(15,23,42,0.15);
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none;
        }
        .hero-cta-sell:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(15,23,42,0.3); }
        .hero-cta-sell:hover .cta-icon { transform: rotate(90deg); }
        .hero-cta-create {
          display: inline-flex; align-items: center;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #fff;
          padding: 14px 34px; border-radius: 50px;
          font-family: var(--font-body); font-weight: 800; font-size: 15px;
          box-shadow: 0 4px 20px rgba(37,99,235,0.15);
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none;
        }
        .hero-cta-create:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(37,99,235,0.3); }
        .hero-cta-create:hover .cta-icon { transform: scale(1.1); }
        .hero-badge {
          position: absolute;
          top: 22px; right: 22px; z-index: 10;
          background: #FDFBD4;
          border-radius: 50%;
          width: 92px; height: 92px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: 0 6px 28px rgba(0,0,0,0.3);
          text-align: center;
          border: 3px solid rgba(255,255,255,0.65);
        }
        .hero-badge-top { font-size: 9px;  font-weight: 700; color: #1a1a2e; letter-spacing: 0.5px; line-height: 1.3; }
        .hero-badge-num { font-family: var(--font-display); font-size: 27px; font-weight: 800; line-height: 1; color: var(--primary); }
        .hero-badge-sub { font-size: 9px;  font-weight: 700; color: #1a1a2e; letter-spacing: 0.5px; line-height: 1.3; }
        .hero-dots {
          position: absolute;
          bottom: 18px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 10;
        }

        /* ── TABLET ≤ 1024px ── */
        @media (max-width: 1024px) {
          .hero-section { min-height: 420px; }
          .hero-row     { padding: 0 28px; }
          .hero-text    { width: 50%; padding: 44px 0; }
          .hero-h1      { font-size: 42px; }
          .hero-img     { max-height: 440px; }
        }

        /* ── MOBILE ≤ 768px ── */
        @media (max-width: 768px) {
          .hero-section  { min-height: 300px; }
          .hero-row      { padding: 0 16px; align-items: center; }

          /* text: left 54%, smaller */
          .hero-text     { width: 54%; max-width: none; padding: 28px 0; }
          .hero-h1       { font-size: 24px; letter-spacing: -0.5px; margin-bottom: 10px; white-space: normal; }
          .hero-tag      { font-size: 9px; padding: 4px 10px; margin-bottom: 10px; letter-spacing: 1px; }
          .hero-sub      { display: none !important; }
          .hero-cta-shop,
          .hero-cta-sell,
          .hero-cta-create { padding: 9px 18px; font-size: 13px; border-radius: 50px; }
          .hero-ctas     { gap: 8px; }

          /* badge: smaller */
          .hero-badge    { width: 60px; height: 60px; top: 10px; right: 10px; }
          .hero-badge-num { font-size: 17px; }
          .hero-badge-top,
          .hero-badge-sub { font-size: 7px; }

          /* photo: right 46% — ALWAYS VISIBLE on mobile */
          .hero-photo-col { flex: 0 0 64%; }
          .hero-img {
            height: 110%;
            max-height: 310px;
            left: 50%;
            transform: translateX(-60%);
          }

          /* hide floats on mobile — too cluttered */
          .hero-float-items { display: none !important; }
        }

        /* ── SMALL MOBILE ≤ 480px ── */
        @media (max-width: 480px) {
          .hero-section  { min-height: 240px; }
          .hero-text     { width: 52%; padding: 20px 0; }
          .hero-h1       { font-size: 19px; margin-bottom: 8px; }
          .hero-tag      { display: none; }
          .hero-sub      { display: none; }
          .hero-cta-shop,
          .hero-cta-sell,
          .hero-cta-create { padding: 8px 14px; font-size: 12px; }
          .hero-ctas     { gap: 6px; flex-direction: column; align-items: flex-start; }
          .hero-cta-row  { flex-direction: column; width: 100%; gap: 6px !important; }
          .hero-cta-bottom { width: 100%; }
          .hero-cta-shop, .hero-cta-sell, .hero-cta-create { width: 100%; text-align: center; justify-content: center; }

          /* photo stays visible */
          .hero-photo-col { flex: 0 0 64%; }
          .hero-img {
            max-height: 250px;
            height: 100%;
            transform: translateX(-60%);
          }

          .hero-badge    { width: 50px; height: 50px; top: 8px; right: 8px; }
          .hero-badge-num { font-size: 13px; }
          .hero-badge-top,
          .hero-badge-sub { font-size: 6px; }
        }

        /* ── TINY ≤ 360px ── */
        @media (max-width: 360px) {
          .hero-section  { min-height: 210px; }
          .hero-h1       { font-size: 17px; }
          .hero-img      { max-height: 220px; }
          .hero-ctas     { gap: 5px; }
          .hero-cta-shop,
          .hero-cta-sell,
          .hero-cta-create { padding: 7px 12px; font-size: 11px; }
        }
      `}</style>

      <section className="hero-section" style={{ background: slide.bg, transition: 'background 0.6s ease' }}>

        {/* Background circles */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', background: slide.circle,
          top: '50%', right: '22%', transform: 'translateY(-50%)',
          zIndex: 1, transition: 'background 0.6s', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '280px', height: '280px',
          borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          top: '50%', right: '24%', transform: 'translateY(-50%)',
          zIndex: 1, pointerEvents: 'none',
        }} />

        <div className="hero-row">

          {/* Left: text */}
          <div className="hero-text">
            <span className="hero-tag">🚀 {slide.tag}</span>
            <h1 className="hero-h1">{slide.headline}</h1>
            <p className="hero-sub">
              <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>🚚</span>
              {slide.subline}
            </p>
            <div className="hero-ctas" style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: 'fit-content' }}>
              <div className="hero-cta-row" style={{ display: 'flex', gap: '14px' }}>
                <Link href="/auth?mode=register&type=seller" className="hero-cta-sell">
                  Sale Now
                  <svg style={{ marginLeft: '8px', transition: 'transform 0.2s' }} className="cta-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </Link>
                <Link href="/products" className="hero-cta-shop">
                  Buy Now
                  <svg style={{ marginLeft: '8px', transition: 'transform 0.2s' }} className="cta-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </Link>
              </div>
              <div className="hero-cta-bottom" style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="/auth?mode=register&type=buyer" className="hero-cta-create" style={{ width: '100%', justifyContent: 'center' }}>
                  Create Account
                  <svg style={{ marginLeft: '8px', transition: 'transform 0.2s' }} className="cta-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: photo + floats */}
          <div className="hero-photo-col">

            {/* Floating emojis — hidden on mobile via CSS */}
            <div className="hero-float-items" style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
              {slide.floats.map((f, i) => (
                <div key={`${active}-${i}`} style={{
                  position: 'absolute',
                  top: f.top,
                  ...(f.left ? { left: f.left } : {}),
                  ...(f.right ? { right: f.right } : {}),
                  fontSize: `${f.size}px`,
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))',
                  animation: `${i % 2 === 0 ? 'heroFloat' : 'heroFloatR'} ${2.8 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${f.d}s`,
                  zIndex: 5,
                }}>{f.emoji}</div>
              ))}
            </div>

            {/* Hero photo — tries local first, falls back to Unsplash */}
            <img
              key={active}
              src={getSrc(active)}
              alt="Hero model"
              className="hero-img"
              onError={() => handleError(active)}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-top">{slide.badge.top}</span>
          <span className="hero-badge-num">{slide.badge.main}</span>
          <span className="hero-badge-sub">{slide.badge.sub}</span>
        </div>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? '28px' : '8px', height: '8px',
              borderRadius: '4px',
              background: i === active ? 'var(--primary)' : '#e2e8f0',
              transition: 'all 0.3s', border: 'none', cursor: 'pointer', padding: 0,
            }} />
          ))}
        </div>
      </section>
    </>
  );
}