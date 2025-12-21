"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Menu,
    X,
    PhoneCall,
    Lock,
    Zap
} from "lucide-react";
import { useState } from "react";

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* 1. BRANDING */}
                    <Link href="/" className="flex flex-col justify-center group">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1 rounded-md group-hover:bg-blue-700 transition-colors">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">
                                CSCA<span className="text-blue-600">Master</span>
                            </span>
                        </div>
                    </Link>

                    {/* 2. DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/scholarships"
                            className="text-slate-600 hover:text-blue-600 font-semibold transition-colors flex items-center gap-2 group"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Scholarships
                            <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 group-hover:bg-red-200">
                                NEW
                            </span>
                        </Link>

                        <Link href="/guidelines" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            Guidelines
                        </Link>
                        <Link href="/syllabus" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            Syllabus
                        </Link>
                    </div>

                    {/* 3. ACTION BUTTONS (Lead Gen + Auth) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Consultancy Hook */}




                        {/* Auth Buttons */}
                        {isLoggedIn ? (
                            <Link href="/dashboard">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 border border-emerald-600">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/sign-in" className="text-slate-700 font-medium hover:text-blue-600 text-sm px-2">
                                    Log in
                                </Link>

                                <Link href="/sign-up">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 border border-blue-600">
                                        <Lock className="mr-2 h-3 w-3 opacity-70" /> Start Practice
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* 4. MOBILE MENU TOGGLE */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 p-2 hover:bg-slate-100 rounded-md">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top-2">
                    <div className="px-4 py-4 space-y-4">
                        <Link href="/scholarships" className="flex items-center justify-between text-slate-700 font-semibold p-2 rounded-lg hover:bg-slate-50">
                            <span>Scholarships</span>
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">2026 Live</span>
                        </Link>
                        <Link href="/guidelines" className="block text-slate-600 font-medium p-2 rounded-lg hover:bg-slate-50">
                            Exam Guidelines
                        </Link>
                        <Link href="/syllabus" className="block text-slate-600 font-medium p-2 rounded-lg hover:bg-slate-50">
                            Syllabus Topics
                        </Link>

                        <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-3">
                            {isLoggedIn ? (
                                <Link href="/dashboard" className="col-span-2">
                                    <Button className="w-full bg-emerald-600 justify-center">Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/sign-in">
                                        <Button variant="outline" className="w-full justify-center">Log in</Button>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button className="w-full bg-blue-600 justify-center">Sign Up Free</Button>
                                    </Link>
                                </>
                            )}
                        </div>


                    </div>
                </div>
            )}
        </nav>
    );
}
