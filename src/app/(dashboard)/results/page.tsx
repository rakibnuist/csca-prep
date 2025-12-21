import AnalyticsCharts from "@/components/AnalyticsCharts";
import AttemptHistory from "@/components/AttemptHistory";
import { Suspense } from "react";

export default function AnalysisPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analysis</h1>
                <p className="text-slate-500 mt-1">
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
    )
}
