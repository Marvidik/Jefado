export const CATEGORIES = [
    { icon: '🧥', label: 'Fashion', slug: 'fashion' },
    { icon: '💻', label: 'Electronics', slug: 'electronics' },
    { icon: '🏠', label: 'Home & Living', slug: 'home' },
    { icon: '✨', label: 'Health & Beauty', slug: 'beauty' },
    { icon: '⚽', label: 'Sports', slug: 'sports' },
    { icon: '🧸', label: 'Toys', slug: 'toys' },
    { icon: '🛒', label: 'Groceries', slug: 'groceries' },
    { icon: '🚗', label: 'Automotive', slug: 'automotive' },
];

export const ALL_PRODUCTS = [
    { 
        id: 1, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 279, originalPrice: 399, discount: 30, rating: 4.9, reviews: 5621, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 
        emoji: '🎧', isBestSeller: true, brand: 'Sony', category: 'electronics', inStock: true, seller: 'Sony Official',
        description: 'Industry-leading noise cancellation with 8 microphones and two processors. Premium sound quality and clear calls.',
        specs: [['Battery', '30 Hours'], ['Connection', 'Bluetooth 5.2'], ['Weight', '250g']]
    },
    { 
        id: 2, name: 'iPhone 15 Pro Max 256GB Titanium', price: 1199, originalPrice: 1299, discount: 8, rating: 4.8, reviews: 8920, 
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', 
        emoji: '📱', brand: 'Apple', category: 'electronics', inStock: true, seller: 'Apple Direct',
        description: 'Titanium design with A17 Pro chip. Pro camera system with 5x Telephoto lens and Action button.',
        specs: [['Display', '6.7" OLED'], ['Chip', 'A17 Pro'], ['Camera', '48MP Pro']]
    },
    { 
        id: 3, name: 'Apple AirPods Pro 2nd Gen with MagSafe Case', price: 199, originalPrice: 249, discount: 20, rating: 4.8, reviews: 12450, 
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80', 
        emoji: '🎵', isNew: true, brand: 'Apple', category: 'electronics', inStock: true, seller: 'Apple Direct',
        description: 'Active Noise Cancellation and Adaptive Transparency. Personalized Spatial Audio with dynamic head tracking.',
        specs: [['Chip', 'H2'], ['Battery', '6 Hours (per charge)'], ['Resistance', 'IPX4']]
    },
    { 
        id: 4, name: 'Men\'s Vintage Leather Biker Jacket', price: 180, originalPrice: 250, discount: 28, rating: 4.7, reviews: 850, 
        image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80', 
        emoji: '🧥', brand: 'Jefado Fashion', category: 'fashion', inStock: true, seller: 'Authentic Leather Co.',
        description: 'Premium cowhide leather with distressed finish. Classic biker silhouette with asymmetrical zip.',
        specs: [['Material', '100% Cowhide'], ['Lining', 'Viscose'], ['Style', 'Slim Fit']]
    },
    { 
        id: 5, name: 'Nike Air Max 270 React Sneakers', price: 120, originalPrice: 160, discount: 25, rating: 4.6, reviews: 2100, 
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 
        emoji: '👟', isBestSeller: true, brand: 'Nike', category: 'fashion', inStock: true, seller: 'Nike Official',
        description: 'Nike Air Max 270 React uses lightweight, layered, no-sew materials to create a modern look that feels as good as it looks.',
        specs: [['Cushioning', 'Max Air 270'], ['Upper', 'Synthetic/Textile'], ['Closure', 'Laces']]
    },
    { 
        id: 6, name: 'Floral Print Summer Midi Dress', price: 45, originalPrice: 75, discount: 40, rating: 4.5, reviews: 340, 
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', 
        emoji: '👗', isNew: true, brand: 'Mila', category: 'fashion', inStock: true, seller: 'Mila Fashion House',
        description: 'Elegant floral midi dress perfect for summer outings. Soft breathable fabric with adjustable straps.',
        specs: [['Fabric', 'Polyester'], ['Length', 'Midi'], ['Pattern', 'Floral']]
    },
    { 
        id: 7, name: 'Rolex Submariner Date Blue Dial', price: 14500, originalPrice: 16000, discount: 9, rating: 4.9, reviews: 156, 
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', 
        emoji: '⌚', brand: 'Rolex', category: 'fashion', inStock: true, seller: 'LuxWatch',
        description: 'Iconic divers\' watch. Corrosion-resistant Cerachrom bezel and Chromalight display for visibility.',
        specs: [['Movement', 'automatic'], ['Waterproof', '300m'], ['Case', '41mm Oystersteel']]
    },
    { 
        id: 8, name: 'Modern Velvet 3-Seater Sofa', price: 899, originalPrice: 1200, discount: 25, rating: 4.8, reviews: 420, 
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 
        emoji: '🛋️', isBestSeller: true, brand: 'HomeSense', category: 'home', inStock: true, seller: 'Modern Home',
        description: 'Luxurious velvet sofa with gold-finish metal legs. High-density foam cushions for maximum comfort.',
        specs: [['Material', 'Velvet'], ['Frame', 'Kiln-dried hardwood'], ['Seats', '3 People']]
    },
    { 
        id: 9, name: 'Minimalist Oak Wood Coffee Table', price: 250, originalPrice: 350, discount: 28, rating: 4.7, reviews: 650, 
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80', 
        emoji: '☕', brand: 'OakStyle', category: 'home', inStock: true, seller: 'OakStyle Furnishings',
        description: 'Solid oak wood coffee table with a clean, Scandinavian design. Durable matte finish.',
        specs: [['Material', 'Solid Oak'], ['Dimensions', '110x60x45cm'], ['Weight', '18kg']]
    },
    { 
        id: 10, name: 'Samsung 65" QLED 4K Smart TV', price: 1200, originalPrice: 1800, discount: 33, rating: 4.9, reviews: 2450, 
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 
        emoji: '📺', isBestSeller: true, brand: 'Samsung', category: 'electronics', inStock: true, seller: 'Samsung Store',
        description: '100% Color Volume with Quantum Dot. Quantum Processor Lite with 4K Upscaling.',
        specs: [['Screen Size', '65"'], ['Resolution', '4K (3840 x 2160)'], ['HDR', 'Quantum HDR']]
    },
    { 
        id: 11, name: 'Vitamin C Brightening Serum', price: 35, originalPrice: 55, discount: 36, rating: 4.8, reviews: 3200, 
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', 
        emoji: '🧴', isBestSeller: true, brand: 'GlowUP', category: 'beauty', inStock: true, seller: 'GlowUP Beauty',
        description: 'Potent Vitamin C formula to brighten skin tone and reduce dark spots. Infused with Hyaluronic Acid.',
        specs: [['Volume', '30ml'], ['Key Ingredient', '20% Vitamin C'], ['Skin Type', 'All']]
    },
    { 
        id: 12, name: 'Mountain Trail Bike 29"', price: 850, originalPrice: 1100, discount: 22, rating: 4.7, reviews: 180, 
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80', 
        emoji: '🚲', brand: 'TrailMaster', category: 'sports', inStock: true, seller: 'BikeHub',
        description: 'Performance MTB with 29-inch wheels. Aluminum alloy frame with adjustable front suspension.',
        specs: [['Frame', 'Aluminum Alloy'], ['Gears', '21 Speed'], ['Brakes', 'Dual Disc']]
    },
    { 
        id: 13, name: 'Adjustable Dumbbell Set 5-50lb', price: 299, originalPrice: 450, discount: 33, rating: 4.6, reviews: 540, 
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?w=800&q=80', 
        emoji: '🏋️', brand: 'FitGear', category: 'sports', inStock: true, seller: 'FitGear Direct',
        description: 'Compact adjustable dumbbells replace 15 sets of weights. Dial system for easy weight changes.',
        specs: [['Weight Range', '5 - 50 lbs'], ['Increments', '2.5 lbs'], ['Includes', 'Tray Stand']]
    },
    { 
        id: 14, name: 'Organic Green Tea - 100 Bags', price: 15, originalPrice: 25, discount: 40, rating: 4.9, reviews: 1240, 
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80', 
        emoji: '🍵', isBestSeller: true, brand: 'Ethos', category: 'groceries', inStock: true, seller: 'Ethos Organic',
        description: 'Certified organic green tea leaves sourced from high-altitude gardens. Rich in antioxidants.',
        specs: [['Quantity', '100 Bags'], ['Certified', 'Organic'], ['Origin', 'Japan']]
    },
    { 
        id: 15, name: 'Matte Lipstick Set - 12 Long Lasting Colors', price: 29, originalPrice: 49, discount: 40, rating: 4.7, reviews: 2314, 
        image: 'https://images.unsplash.com/photo-1596462502278-27bfaf410911?w=800&q=80', 
        emoji: '💄', isNew: true, brand: 'MAC', category: 'beauty', inStock: true, seller: 'Glow Beauty',
        description: 'High-pigmented matte finish. Smudge-proof and lightweight for all-day wear.',
        specs: [['Colors', '12 Shades'], ['Finish', 'Matte'], ['Size', 'Travel Set']]
    },
];
