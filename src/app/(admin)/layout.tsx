import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-8">Admin</div>
                <nav>
                    <ul>
                        <li className="mb-2"><a href="/leads" className="block p-2 hover:bg-gray-700 rounded">Leads</a></li>
                        <li className="mb-2"><a href="/content" className="block p-2 hover:bg-gray-700 rounded">Content</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
