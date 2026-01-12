import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap, FlaskConical, Download, Lock } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "2026 CSCA Exam Syllabus & Topic Breakdown",
    description: "Detailed syllabus for Mathematics, Physics, Chemistry, and Chinese (Stem/Humanities) tracks. Download the official PDF guide.",
};

export default async function SyllabusPage() {
    const session = await getSession();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar isLoggedIn={!!session} />

            <main className="flex-grow pt-24 pb-16">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4">
                            Official 2026 Edition
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                            Exam Syllabus & Scope
                        </h1>
                        <p className="text-lg text-slate-600">
                            Complete topic breakdown for English & Chinese tracks.
                            Focus on these specific areas to maximize your score in the 60-minute science exams.
                        </p>
                    </div>
                </div>

                {/* SYLLABUS CONTENT */}
                <div className="max-w-5xl mx-auto px-4">
                    <Tabs defaultValue="math" className="w-full">

                        {/* SUBJECT TABS */}
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid w-full max-w-4xl grid-cols-5 h-12 bg-white shadow-sm border border-slate-200">
                                <TabsTrigger value="math" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Mathematics</TabsTrigger>
                                <TabsTrigger value="physics" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">Physics</TabsTrigger>
                                <TabsTrigger value="chem" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Chemistry</TabsTrigger>
                                <TabsTrigger value="chinese_humanities" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">Chinese (Humans)</TabsTrigger>
                                <TabsTrigger value="chinese_stem" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">Chinese (STEM)</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* 1. MATHEMATICS CONTENT */}
                        <TabsContent value="math">
                            <Card className="border-t-4 border-t-blue-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-lg"><Calculator className="h-6 w-6 text-blue-600" /></div>
                                            <div>
                                                <CardTitle>Mathematics</CardTitle>
                                                <CardDescription>Required for ALL majors (Engineering, Medicine, Arts).</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-blue-200 text-blue-700">100 Marks</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="math-overview">
                                            <AccordionTrigger className="font-bold text-blue-800">Examination Format & Purpose</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-4">
                                                <div>
                                                    <span className="font-semibold text-slate-800 block mb-1">Examination Purpose:</span>
                                                    <p>Assesses mastery of mathematical knowledge, logical thinking, and problem-solving competence. Ensures the academic foundation required for undergraduate studies in science and engineering.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Duration</span>
                                                        60 Minutes
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Questions</span>
                                                        48 Multiple Choice
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Total Score</span>
                                                        100 Points
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Language</span>
                                                        English / Chinese
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="sets">
                                            <AccordionTrigger>Sets and Inequalities</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Definition, operations, and representation of sets.</p>
                                                <p>• Basic properties and solution methods of inequalities (quadratic and rational inequalities).</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="functions">
                                            <AccordionTrigger>Functions</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Concepts: Domain, range, monotonicity, parity.</p>
                                                <p>• Elementary Functions: Power, exponential, logarithmic, and trigonometric functions.</p>
                                                <p>• Sequences: General term formulas and summation of arithmetic and geometric sequences.</p>
                                                <p>• Calculus: Basics of derivatives, geometric meaning, and simple applications.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="geo-alg">
                                            <AccordionTrigger>Geometry and Algebra</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Plane Analytic Geometry: Lines, circles, ellipses, hyperbolas, and parabolas.</p>
                                                <p>• Vectors and Complex Numbers: Basic operations.</p>
                                                <p>• Solid Geometry: Rectangular coordinate system in space, properties of simple solids.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="prob">
                                            <AccordionTrigger>Probability and Statistics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Classical probability model and calculation.</p>
                                                <p>• Numerical characteristics of data (mean, variance).</p>
                                                <p>• Basic concepts of normal distribution.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* 2. PHYSICS CONTENT */}
                        <TabsContent value="physics">
                            <Card className="border-t-4 border-t-indigo-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 p-2 rounded-lg"><Zap className="h-6 w-6 text-indigo-600" /></div>
                                            <div>
                                                <CardTitle>Physics</CardTitle>
                                                <CardDescription>Required for Engineering majors.</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-indigo-200 text-indigo-700">100 Marks</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="phys-overview">
                                            <AccordionTrigger className="font-bold text-indigo-800">Examination Format & Purpose</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-4">
                                                <div>
                                                    <span className="font-semibold text-slate-800 block mb-1">Examination Purpose:</span>
                                                    <p>Assesses core physics competencies required for engineering and science undergraduates. Focuses on mastery of fundamental knowledge, scientific thinking, and application across disciplines.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Duration</span>
                                                        60 Minutes
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Questions</span>
                                                        48 Multiple Choice
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Total Score</span>
                                                        100 Points
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Language</span>
                                                        English / Chinese
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="mechanics">
                                            <AccordionTrigger>Mechanics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Kinematics: Displacement, velocity, acceleration, uniform acceleration motion, free fall.</p>
                                                <p>• Newton’s laws of motion and their applications.</p>
                                                <p>• Momentum and impulse, law of conservation of momentum.</p>
                                                <p>• Work and energy, law of conservation of mechanical energy.</p>
                                                <p>• Circular motion and universal gravitation.</p>
                                                <p>• Simple harmonic motion and mechanical waves.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="electromag">
                                            <AccordionTrigger>Electromagnetism</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Electrostatics: Coulomb’s law, electric field strength, electric potential.</p>
                                                <p>• Direct current circuits: Ohm’s law, series and parallel circuits.</p>
                                                <p>• Magnetic field: Magnetic induction, Ampere’s force, Lorentz force.</p>
                                                <p>• Electromagnetic induction: Faraday’s law, Lenz’s law.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="thermo">
                                            <AccordionTrigger>Thermodynamics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Kinetic theory of gases.</p>
                                                <p>• Ideal gas equation of state.</p>
                                                <p>• First law of thermodynamics.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="optics">
                                            <AccordionTrigger>Optics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Geometrical optics: Laws of reflection and refraction.</p>
                                                <p>• Physical optics: Interference and diffraction.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="modern">
                                            <AccordionTrigger>Modern Physics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Photoelectric effect.</p>
                                                <p>• Atomic structure.</p>
                                                <p>• Fundamentals of nuclear physics.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* 3. CHEMISTRY CONTENT */}
                        <TabsContent value="chem">
                            <Card className="border-t-4 border-t-emerald-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-100 p-2 rounded-lg"><FlaskConical className="h-6 w-6 text-emerald-600" /></div>
                                            <div>
                                                <CardTitle>Chemistry</CardTitle>
                                                <CardDescription>Required for Medicine (MBBS), Pharmacy, Chemical Eng.</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-emerald-200 text-emerald-700">100 Marks</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="chem-overview">
                                            <AccordionTrigger className="font-bold text-emerald-800">Examination Format & Purpose</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-4">
                                                <div>
                                                    <span className="font-semibold text-slate-800 block mb-1">Examination Purpose:</span>
                                                    <p>Assesses core chemistry competencies required for science and engineering undergraduates. Focuses on fundamental knowledge, scientific thinking, and experimental inquiry.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Duration</span>
                                                        60 Minutes
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Questions</span>
                                                        48 Multiple Choice
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Total Score</span>
                                                        100 Points
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Language</span>
                                                        English / Chinese
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chem-basics">
                                            <AccordionTrigger>Basic Chemical Concepts and Calculations</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Classification and state changes of matter.</p>
                                                <p>• Chemical notation and equation writing.</p>
                                                <p>• Solution concentration and pH calculations.</p>
                                                <p>• Calculations involving the amount of substance.</p>
                                                <p>• Application of the ideal gas law.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chem-properties">
                                            <AccordionTrigger>Properties and Reactions of Substances</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Properties of common inorganic substances (elements, oxides, acids, bases, and salts).</p>
                                                <p>• Basic organic compounds (hydrocarbons and their derivatives).</p>
                                                <p>• Identification of redox reactions.</p>
                                                <p>• Ionic reactions and testing methods.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chem-theories">
                                            <AccordionTrigger>Chemical Theories and Laws</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Atomic structure and periodic law.</p>
                                                <p>• Chemical bonds and intermolecular forces.</p>
                                                <p>• Reaction rate and chemical equilibrium.</p>
                                                <p>• Theories of electrolyte solutions.</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chem-experiments">
                                            <AccordionTrigger>Chemical Experiments and Applications</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p>• Laboratory safety and use of apparatus.</p>
                                                <p>• Preparation and identification of common gases.</p>
                                                <p>• Methods for separation and purification of substances.</p>
                                                <p>• Analysis of industrial chemical processes (e.g., ammonia synthesis).</p>
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* 4. CHINESE (HUMANITIES) CONTENT */}
                        <TabsContent value="chinese_humanities">
                            <Card className="border-t-4 border-t-red-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-100 p-2 rounded-lg">
                                                <span className="text-2xl font-bold text-red-600 w-6 h-6 flex items-center justify-center">文</span>
                                            </div>
                                            <div>
                                                <CardTitle>Professional Chinese (Humanities)</CardTitle>
                                                <CardDescription>Required for Humanities, Law, Arts, and Education majors.</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-red-200 text-red-700">100 Marks</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="chinese-overview">
                                            <AccordionTrigger className="font-bold text-red-800">Examination Format & Purpose</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-4">
                                                <div>
                                                    <span className="font-semibold text-slate-800 block mb-1">Examination Purpose:</span>
                                                    <p>Evaluates the ability to study humanities in Chinese, understand freshman-level coursework, effectiveness in acquiring knowledge, and reading professional texts with basic strategies.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Duration</span>
                                                        90 Minutes
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Questions</span>
                                                        Multiple Choice & Terms
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Total Score</span>
                                                        100 Points
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Question Types</span>
                                                        Character recognition, Fill-in-the-blanks, Term distinction, Reading comprehension
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chinese-content">
                                            <AccordionTrigger>Content Scope & Topics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p className="font-semibold text-slate-700 mb-2">Subject Areas:</p>
                                                <p>• Literature, Philosophy, Law, Education, History, Arts.</p>
                                                <div className="mt-4">
                                                    <p className="font-semibold text-slate-700 mb-2">Specific Disciplines:</p>
                                                    <p className="leading-relaxed">Chinese language & literature, Politics, Sociology, Ethnology, Marxist theory, Public Security, Physical Education, Journalism, Music, Dance, Theater, Fine Arts, Design.</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* 5. CHINESE (STEM) CONTENT */}
                        <TabsContent value="chinese_stem">
                            <Card className="border-t-4 border-t-orange-600">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-orange-100 p-2 rounded-lg">
                                                <span className="text-2xl font-bold text-orange-600 w-6 h-6 flex items-center justify-center">理</span>
                                            </div>
                                            <div>
                                                <CardTitle>Professional Chinese (Science & Engineering)</CardTitle>
                                                <CardDescription>Required for Engineering, Medicine, and Science majors.</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-orange-200 text-orange-700">100 Marks</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="chin-stem-overview">
                                            <AccordionTrigger className="font-bold text-orange-800">Examination Format & Purpose</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-4">
                                                <div>
                                                    <span className="font-semibold text-slate-800 block mb-1">Examination Purpose:</span>
                                                    <p>Assesses the ability to use Chinese for science and engineering studies. Focuses on specialized vocabulary, reading textbooks (Math/Physics/Chem), and understanding academic papers.</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Duration</span>
                                                        90 Minutes
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Questions</span>
                                                        Multiple Choice & Terms
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Total Score</span>
                                                        100 Points
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded border">
                                                        <span className="font-semibold block text-slate-700">Question Types</span>
                                                        Term distinction, Sentence completion, Reading comprehension
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="chin-stem-scope">
                                            <AccordionTrigger>Content Scope & Topics</AccordionTrigger>
                                            <AccordionContent className="text-slate-600 space-y-2">
                                                <p className="font-semibold text-slate-700 mb-2">Basic Concepts:</p>
                                                <p>• Mathematical symbols, formulas, physical laws, and chemical equations.</p>
                                                <p>• Basic laboratory terminology and safety.</p>
                                                <div className="mt-4">
                                                    <p className="font-semibold text-slate-700 mb-2">Specialized Content:</p>
                                                    <p>• Higher Mathematics foundation.</p>
                                                    <p>• Fundamentals of University Physics and Chemistry.</p>
                                                    <p>• Computer Programming terminology.</p>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="font-semibold text-slate-700 mb-2">Academic Competencies:</p>
                                                    <p>• Describing experiments and interpreting data charts.</p>
                                                    <p>• Reading academic papers and participating in discussions.</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>

                    {/* LEAD MAGNET / DOWNLOAD SECTION */}
                    <div className="mt-12 grid md:grid-cols-2 gap-6">

                        {/* Download Card */}
                        <div className="bg-slate-900 text-white rounded-xl p-8 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Download className="h-24 w-24" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Download Full PDF</h3>
                            <p className="text-slate-300 mb-6">
                                Get the official 2026 CSCA Syllabus Guide with detailed weightage.
                            </p>
                            {session ? (
                                <a href="/syllabus-2026.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-white text-slate-900 hover:bg-slate-100 w-full md:w-auto">
                                        <Download className="mr-2 h-4 w-4" /> Download PDF
                                    </Button>
                                </a>
                            ) : (
                                <Link href="/sign-up">
                                    <Button className="bg-white text-slate-900 hover:bg-slate-100 w-full md:w-auto">
                                        <Lock className="mr-2 h-4 w-4" /> Login to Download
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Practice CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold mb-2">Ready to test yourself?</h3>
                            <p className="text-blue-100 mb-6">
                                We have prepared 15 Mock Tests based exactly on these topics.
                            </p>
                            {session ? (
                                <Link href="/tests">
                                    <Button className="bg-blue-400/20 hover:bg-blue-400/30 text-white border border-blue-400/50 w-full md:w-auto">
                                        Start Practice Tests
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/sign-up">
                                    <Button className="bg-blue-400/20 hover:bg-blue-400/30 text-white border border-blue-400/50 w-full md:w-auto">
                                        Start Free Topic Test
                                    </Button>
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
