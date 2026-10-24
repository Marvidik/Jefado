'use client';
import React from 'react';
import { 
    Shirt, Laptop, Home, Sparkles, Trophy, Gamepad2, 
    ShoppingBag, Car, Scissors, Wrench, Palette, Cpu, Package 
} from 'lucide-react';

export function CategoryIcon({ slug, size = 20, color = 'currentColor' }: { slug?: string; size?: number; color?: string }) {
    const s = (slug || '').toLowerCase();
    switch (s) {
        case 'fashion':
            return <Shirt size={size} color={color} />;
        case 'electronics':
            return <Laptop size={size} color={color} />;
        case 'home':
        case 'home & living':
            return <Home size={size} color={color} />;
        case 'beauty':
        case 'health & beauty':
        case 'health':
            return <Sparkles size={size} color={color} />;
        case 'sports':
            return <Trophy size={size} color={color} />;
        case 'toys':
            return <Gamepad2 size={size} color={color} />;
        case 'groceries':
        case 'grocery':
            return <ShoppingBag size={size} color={color} />;
        case 'automotive':
            return <Car size={size} color={color} />;
        case 'personal':
        case 'personal care':
            return <Scissors size={size} color={color} />;
        case 'cleaning':
            return <Sparkles size={size} color={color} />;
        case 'repairs':
            return <Wrench size={size} color={color} />;
        case 'design':
            return <Palette size={size} color={color} />;
        case 'tech':
        case 'tech support':
            return <Cpu size={size} color={color} />;
        default:
            return <Package size={size} color={color} />;
    }
}
