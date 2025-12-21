"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Loader2, Phone, BookOpen, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        whatsapp: "",
        major: "",
        password: ""
    });
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Success! Session is set via cookie in the API
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left: Form Section */}
            <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md space-y-8 my-8">

                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-slate-900">CSCA<span className="text-blue-600">Master</span></span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">Create Student Profile</h1>
                        <p className="text-slate-600 mt-2">
                            Join 500+ students preparing for the 2026 intake.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="student@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        {/* CRITICAL LEAD GEN FIELD: WhatsApp */}
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="flex items-center gap-2">
                                WhatsApp Number <span className="text-xs text-slate-500 font-normal">(For scholarship alerts)</span>
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    id="whatsapp"
                                    type="tel"
                                    placeholder="+880 1XXX..."
                                    className="pl-10"
                                    required
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* CRITICAL LEAD GEN FIELD: Major */}
                        <div className="space-y-2">
                            <Label htmlFor="major">Intended Degree</Label>
                            <Select
                                value={formData.major}
                                onValueChange={(val) => setFormData({ ...formData, major: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your target field" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Engineering">Engineering (Civil/Mech/CS)</SelectItem>
                                    <SelectItem value="Medicine">Medicine (MBBS)</SelectItem>
                                    <SelectItem value="Business">Business / Economics</SelectItem>
                                    <SelectItem value="Arts">Arts & Chinese Language</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="flex items-start space-x-2">
                            <Checkbox id="terms" required />
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I agree to the Terms of Service and Privacy Policy.
                                </label>
                            </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base shadow-lg shadow-blue-500/20" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Start Free Preparation
                        </Button>
                    </form>

                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:underline font-semibold">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Visual Side (Consultancy Branding) */}
            <div className="hidden lg:flex bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

                <div className="relative z-10 text-white max-w-lg">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-xl">
                                98%
                            </div>
                            <div>
                                <p className="font-bold text-lg">Success Rate</p>
                                <p className="text-slate-300 text-sm"></p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-200">
                                <div className="bg-blue-500/20 p-2 rounded"><BookOpen className="h-4 w-4 text-blue-300" /></div>
                                <span>Access to 15+ Premium Mock Tests</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-200">
                                <div className="bg-blue-500/20 p-2 rounded"><Phone className="h-4 w-4 text-blue-300" /></div>
                                <span>Join our Exclusive WhatsApp Community</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">Why register?</h2>
                    <p className="text-slate-400 leading-relaxed">
                        "We provide the verified tools you need to ace the exam. Registering unlocks our complete mock test engine and progress tracking systems."
                    </p>
                </div>
            </div>
        </div>
    );
}
