import DashboardShell from '@/components/dashboard/DashboardShell';

// All dashboard pages require authentication and live API data — skip static prerendering
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>;
}