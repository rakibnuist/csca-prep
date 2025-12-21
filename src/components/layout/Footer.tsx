import { GraduationCap, Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* COLUMN 1: BRAND & MISSION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-blue-500" />
                            <span className="font-bold text-lg text-white">CSCA Master</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            The premier free preparation platform for <strong>English & Chinese CSCA Tracks</strong>.
                            We bridge the gap between international students and top Chinese universities.
                        </p>
                        <div className="pt-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Powered By</p>
                            <p className="text-white font-semibold">CSCA Master Team</p>
                        </div>
                    </div>

                    {/* COLUMN 2: STUDENT TOOLS */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Exam Prep</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/syllabus" className="hover:text-blue-400 transition-colors">2026 Syllabus Scope</Link></li>
                            <li><Link href="/guidelines" className="hover:text-blue-400 transition-colors">Home-Based Testing Rules</Link></li>
                            <li><Link href="/sign-up" className="hover:text-blue-400 transition-colors">Take Free Mock Test</Link></li>
                            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 3: OPPORTUNITIES (LEAD GEN) */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Scholarships</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/scholarships" className="hover:text-blue-400 transition-colors">CSC Type A (Full)</Link></li>
                            <li><Link href="/scholarships" className="hover:text-blue-400 transition-colors">Silk Road Scholarship</Link></li>
                            <li><Link href="/scholarships" className="hover:text-blue-400 transition-colors">Provincial Grants</Link></li>

                        </ul>
                    </div>

                    {/* COLUMN 4: CONTACT (CONSULTANCY) */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-sm">

                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                                <a href="tel:+880123456789" className="hover:text-white">+880 1XXX-XXXXXX</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                                <a href="mailto:support@cscamaster.com" className="hover:text-white">support@cscamaster.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM BAR: SOCIALS & DISCLAIMER */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="text-xs text-slate-500 text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} CSCA Master. All rights reserved.</p>
                        <p className="mt-1 opacity-70">
                            <strong>Disclaimer:</strong> This is a preparation tool. We are not affiliated with the official China Scholarship Council (CSC) or CUECC.
                            Official registrations must be done at <a href="https://csca.cn" target="_blank" className="underline hover:text-blue-400">csca.cn</a>.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
