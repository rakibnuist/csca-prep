import { UniversityList } from "@/components/dashboard/UniversityList";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "CSCA Required Universities List | CSCA Prep",
    description: "Complete list of 306 universities accepting CSCA exam results for 2026.",
};

export default async function UniversitiesPage() {
    const session = await getSession();

    if (!session || !session.userId) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 pt-20 sm:pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">University Library</h1>
                    <p className="text-slate-500 mt-2">
                        Browse the complete list of 306 elite Chinese universities accepting CSCA scores.
                    </p>
                </div>

                <UniversityList />
            </div>
        </div>
    );
}
