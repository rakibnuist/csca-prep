import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-900">
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-auto print:p-0 print:overflow-visible print:bg-white">
                {children}
            </main>
        </div>
    )
}
