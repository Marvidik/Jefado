'use client';
import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) {
        // Dashboard gets no main nav/footer — DashboardShell handles its own layout
        return <>{children}</>;
    }

    return (
        <>
            <AnnouncementBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}