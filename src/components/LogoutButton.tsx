"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed", error);
            // Fallback: clear cookies via client side if API fails (if possible)
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
        >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="group-hover:text-red-600 transition-colors">Sign Out</span>
        </button>
    );
}
