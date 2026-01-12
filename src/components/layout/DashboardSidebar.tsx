"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Library, Home, Menu, X, Building2 } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", icon: Home, label: "Back to Home" },
        { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
        { href: "/results", icon: BookOpen, label: "Results" },
        { href: "/tests", icon: Library, label: "Test Library" },
        { href: "/dashboard/universities", icon: Building2, label: "Universities" },
    ];

    return (
        <>
            {/* Mobile Hamburger Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static inset-y-0 left-0 z-40
                    w-64 flex flex-col bg-white dark:bg-zinc-950 
                    border-r border-gray-200 dark:border-zinc-800 
                    print:hidden
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        CSCA Prep
                    </h1>
                </div>
                <nav className="flex-1 mt-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <link.icon className="mr-3 h-5 w-5" />
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="pb-6 border-t border-gray-100 dark:border-zinc-800">
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}
