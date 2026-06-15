'use client';
import { useEffect } from 'react';

export default function SmartsuppChat() {
    useEffect(() => {
        // Push chat widget up if cookie banner is still showing
        const hasCookieConsent = !!localStorage.getItem('jefedo_cookie_consent');

        (window as any)._smartsupp = (window as any)._smartsupp || {};
        (window as any)._smartsupp.key = '48662d1c6814f3f9fdf8faba72c727f80c8cb709';
        // Move widget to bottom-left so it doesn't overlap the cookie banner buttons (bottom-right)
        (window as any)._smartsupp.widget_position = 'bl';
        (window as any)._smartsupp.offsetY = hasCookieConsent ? 16 : 80;

        const o: any = function () { o._.push(arguments); };
        o._ = [];
        (window as any).smartsupp = o;

        const s = document.getElementsByTagName('script')[0];
        const c = document.createElement('script');
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.async = true;
        c.src = 'https://www.smartsuppchat.com/loader.js?';
        s.parentNode?.insertBefore(c, s);
    }, []);

    return null;
}
