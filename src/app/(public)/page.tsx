import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Trophy,
  LineChart,
  Target,
  Users,
  Clock,
  Star,
  GraduationCap,
  FileText,
  Zap
} from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | The #1 Free CSCA Exam Prep Platform",
  description: "Prepare for the 2026 CSCA Exam with free mock tests, syllabus guides, and scholarship information. Join thousands of students securing full scholarships in China.",
};

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900" suppressHydrationWarning>
      <Navbar isLoggedIn={!!session} />

      <main className="flex-grow pt-16">

        {/* 1. HERO SECTION */}
        <section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold mb-6 sm:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Updated for 2026 Admissions
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight">
                Crack the CSCA Exam.<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Secure Your Future.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
                The only 100% Free preparation platform for English & Chinese tracks. Access 15+ Mock Tests, "Whiteboard-Mode" practice, and verified scholarship leads.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                {session ? (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 w-full rounded-xl">
                      <Target className="mr-2 h-5 w-5" /> Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/sign-up" className="w-full sm:w-auto">
                    <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 w-full rounded-xl">
                      Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link href="/syllabus" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 border-slate-300 hover:bg-slate-50 w-full rounded-xl">
                    <FileText className="mr-2 h-5 w-5" /> View Syllabus
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto px-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">64+</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Practice Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">100%</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Free Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600">24/7</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">Available</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. QUICK ACCESS CARDS */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Quick Access</h2>
              <p className="text-base sm:text-lg text-slate-600">Everything you need in one click</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Practice Tests */}
              <Link href={session ? "/tests" : "/sign-up"}>
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Target className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Practice Tests</h3>
                  <p className="text-sm text-slate-600">64+ mock exams for Math, Physics & Chemistry</p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                    Start Now <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              {/* Syllabus */}
              <Link href="/syllabus">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-500 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <BookOpen className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Exam Syllabus</h3>
                  <p className="text-sm text-slate-600">Complete 2026 CSCA syllabus & guidelines</p>
                  <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              {/* Scholarships */}
              <Link href="/scholarships">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-emerald-500 group">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                    <Trophy className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Scholarships</h3>
                  <p className="text-sm text-slate-600">CSC Type A & B scholarship information</p>
                  <div className="mt-4 flex items-center text-emerald-600 font-semibold text-sm">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Card>
              </Link>

              {/* Guidelines */}
              <Link href="/guidelines">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-amber-500 group">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                    <GraduationCap className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Guidelines</h3>
                  <p className="text-sm text-slate-600">Application process & exam procedures</p>
                  <div className="mt-4 flex items-center text-amber-600 font-semibold text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. FEATURES */}
        <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Why Choose CSCA Master?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Professional exam preparation platform trusted by students
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Get immediate results and detailed explanations after each test. Know your score instantly.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <LineChart className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Performance Analytics</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Track your progress with detailed analytics. Identify weak topics and improve strategically.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Timed Practice</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Realistic 60-minute exam simulations. Build time management skills before the real test.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Complete Syllabus</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Access the full 2026 CSCA syllabus with topic-wise breakdown and weightage information.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Expert Support</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Get guidance on application process, scholarship opportunities, and university selection.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">100% Free</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  All features completely free. No hidden charges, no premium plans. Quality education for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA SECTION */}
        {/* 4. CTA SECTION */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#0F172A] relative overflow-hidden">
          {/* Trophy Background Effect */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Trophy className="w-96 h-96 text-white" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

            {/* Badge */}
            <div className="inline-block bg-amber-400 text-amber-950 px-4 py-1.5 rounded-full font-bold text-sm mb-6 sm:mb-8 shadow-lg shadow-amber-400/20">
              Limited Opportunity
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 sm:mb-8 leading-tight">
              Get the CSCA required Universities List <br className="hidden sm:block" />
              (2026)
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
              We have curated the exclusive list of universities that mandate the CSCA exam for 2026.
              Apply to these elite full-scholarship programs.
            </p>

            {session ? (
              <Link href="/dashboard/universities">
                <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 rounded-xl font-bold transition-all hover:scale-105">
                  View University List
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 rounded-xl font-bold transition-all hover:scale-105">
                  Sign Up to Get List
                </Button>
              </Link>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
