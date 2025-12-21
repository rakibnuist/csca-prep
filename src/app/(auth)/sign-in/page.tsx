"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Redirect based on role
            if (data.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-slate-900">CSCA<span className="text-blue-600">Master</span></span>
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                        <p className="text-slate-500 mt-2 text-sm">
                            Enter your credentials to access your dashboard.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <Link href="/" className="text-blue-600 font-semibold hover:underline">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
