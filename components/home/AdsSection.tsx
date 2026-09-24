export default function AdsSection() {
    return (
        <section className="container" style={{ padding: '0 var(--gutter) 48px' }}>
            <style>{`
                .ads-promo-wrap {
                    background: linear-gradient(135deg, var(--bg-alt) 0%, #ffffff 100%);
                    border-radius: var(--radius-xl);
                    padding: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid var(--border);
                    position: relative;
                    overflow: hidden;
                    gap: 32px;
                    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
                }
                .ads-content {
                    position: relative;
                    z-index: 2;
                    flex: 1;
                    max-width: 550px;
                }
                .ads-tag {
                    display: inline-block;
                    background: rgba(26,86,219,0.1);
                    color: var(--primary);
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    padding: 6px 16px;
                    border-radius: 20px;
                    margin-bottom: 16px;
                }
                .ads-title {
                    font-family: var(--font-display);
                    font-weight: 800;
                    font-size: 42px;
                    color: var(--text-primary);
                    line-height: 1.1;
                    letter-spacing: -1.5px;
                    margin-bottom: 16px;
                }
                .ads-desc {
                    font-size: 18px;
                    color: var(--text-muted);
                    margin-bottom: 24px;
                    line-height: 1.6;
                }
                .ads-highlight {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--accent);
                    margin-bottom: 32px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .ads-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: var(--text-primary);
                    color: #fff;
                    padding: 16px 36px;
                    border-radius: var(--radius);
                    font-family: var(--font-body);
                    font-weight: 700;
                    font-size: 16px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }
                .ads-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px rgba(0,0,0,0.2);
                    background: var(--primary);
                }
                .ads-image-container {
                    flex: 1;
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    max-width: 500px;
                }
                .ads-image {
                    flex: 1;
                    min-width: 0;
                    max-width: 50%;
                    height: 280px;
                    object-fit: contain;
                    border-radius: var(--radius-lg);
                    box-shadow: 0 24px 48px -12px rgba(0,0,0,0.15);
                    transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
                    transition: transform 0.5s ease;
                }
                .ads-promo-wrap:hover .ads-image {
                    transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
                }
                .ads-bg-glow {
                    position: absolute;
                    top: -20%;
                    right: -10%;
                    width: 50%;
                    height: 140%;
                    background: linear-gradient(135deg, var(--primary-light) 0%, rgba(255,255,255,0) 100%);
                    opacity: 0.6;
                    border-radius: 50%;
                    filter: blur(80px);
                    z-index: 1;
                    pointer-events: none;
                }
                
                @media (max-width: 900px) {
                    .ads-promo-wrap {
                        flex-direction: column;
                        padding: 32px;
                        text-align: center;
                    }
                    .ads-content {
                        max-width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .ads-title {
                        font-size: 32px;
                    }
                    .ads-image-container {
                        max-width: 100%;
                        width: 100%;
                    }
                    .ads-image {
                        transform: none;
                        height: 180px;
                    }
                }
            `}</style>

            <div className="ads-promo-wrap">
                <div className="ads-bg-glow"></div>

                <div className="ads-content">
                    <span className="ads-tag">🎧 Shop JEFEDO core products</span>
                    <h2 className="ads-title">Escape the noise. It&apos;s time to shop the magic.</h2>

                    <div className="ads-highlight">
                        <span>Only for:</span>
                        <span style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: '12px', fontSize: '16px' }}>The Best Prices</span>
                    </div>

                    <a href="/shop" className="ads-button">
                        Shop Now <span style={{ fontSize: '20px' }}>→</span>
                    </a>
                </div>

                <div className="ads-image-container">
                    <img src="/images/ads.jpg" alt="JEFEDO Core Products" className="ads-image" />
                    <img src="/images/ads2.jpg" alt="JEFEDO Core Products 2" className="ads-image" />
                </div>
            </div>
        </section>
    );
}
