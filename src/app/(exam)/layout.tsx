import React from 'react';

export default function ExamLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Header if needed */}
            <main>
                {children}
            </main>
        </div>
    );
}
