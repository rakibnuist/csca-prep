import AnalyticsCharts from "@/components/AnalyticsCharts";
import AttemptHistory from "@/components/AttemptHistory";
import { Suspense } from "react";

export default function AnalysisPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 pt-20 sm:pt-24">
            <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Performance Analysis</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">
                        Your real-time examination history and subject-wise accuracy tracks.
                    </p>
                </div>

                <section>
                    <AnalyticsCharts />
                </section>

                <section className="pt-8">
                    <Suspense fallback={<div className="h-40 bg-slate-50 animate-pulse rounded-2xl" />}>
                        <AttemptHistory />
                    </Suspense>
                </section>
            </div>
        </div>
    )
}
