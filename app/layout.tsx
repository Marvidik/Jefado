import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: "Jefedo — Multi-Vendor Marketplace",
  description: "Your one-stop shop for everything. Shop from thousands of vendors.",
  icons: {
    icon: "/images/fav.jpg?v=2",
    apple: "/images/fav.jpg?v=2",
  }
};

import { ToastProvider } from "@/components/ui/Toast";
import { CartProvider } from "@/context/CartContext";
import SmartsuppChat from "@/components/ui/SmartsuppChat";
import CookieBanner from "@/components/ui/CookieBanner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </CartProvider>
        <SmartsuppChat />
        <CookieBanner />
      </body>
    </html>
  );
}