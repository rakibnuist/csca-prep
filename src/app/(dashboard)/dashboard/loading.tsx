import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
    );
}
