import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import FlashSale from '@/components/home/FlashSale';
import CategoryStrip from '@/components/home/CategoryStrip';
import PromoBanners from '@/components/home/PromoBanners';
import ProductGrid from '@/components/home/ProductGrid';
import FullWidthPromo from '@/components/home/FullWidthPromo';
import BestSellers from '@/components/home/BestSellers';
import WelcomeModal from '@/components/home/WelcomeModal';

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <WelcomeModal />
      <HeroSection />
      <TrustBadges />
      <FlashSale />
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 0 28px' }} />
      <CategoryStrip />
      <PromoBanners />
      <ProductGrid />
      <FullWidthPromo />
      <BestSellers />
    </div>
  );
}