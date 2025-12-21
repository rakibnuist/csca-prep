import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import {
    Monitor,
    Smartphone,
    Wifi,
    ShieldAlert,
    Clock,
    FileX,
    CheckCircle2,
    HelpCircle,
    AlertTriangle,
    XCircle,
    CalendarDays,
    Download,
    Eye,
    Book,
    CreditCard,
    Calendar,
    UserCircle2,
    Image,
    Camera
} from "lucide-react";
import Link from "next/link";
import { ReadinessChecklist } from "@/components/guidelines/ReadinessChecklist";

export default async function GuidelinesPage() {
    const session = await getSession();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar isLoggedIn={!!session} />

            <main className="flex-grow pt-24 pb-16">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">2025 Edition</Badge>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            Home-Based Examination Guidelines
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Complete your CSCA exam from the comfort of your home using our secure <strong>Remote-Proctored Home-Based Testing (RHT)</strong> system. Two devices, real-time monitoring, zero geographical limits.
                        </p>
                    </div>
                </div>

                {/* MAIN CONTENT TABS */}
                <div className="max-w-5xl mx-auto px-4">
                    <Tabs defaultValue="registration" className="w-full">

                        {/* TAB NAVIGATION */}
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid w-full max-w-4xl grid-cols-5 h-12 bg-white shadow-sm border border-slate-200 p-1">
                                <TabsTrigger value="registration">Registration</TabsTrigger>
                                <TabsTrigger value="requirements">Setup & Gear</TabsTrigger>
                                <TabsTrigger value="process">Exam Day</TabsTrigger>
                                <TabsTrigger value="rules">Rules</TabsTrigger>
                                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* TAB 0: REGISTRATION */}
                        <TabsContent value="registration" className="space-y-8 animate-in fade-in-50 duration-500">

                            <div className="grid gap-6">
                                {/* 1. PREPARE DOCUMENTS */}
                                <Card className="border-t-4 border-t-purple-600 shadow-sm">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-purple-100 p-2 rounded-lg"><Book className="h-6 w-6 text-purple-600" /></div>
                                            <CardTitle>1. Prepare Documents</CardTitle>
                                        </div>
                                        <CardDescription>Strict verification requirements.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">

                                        {/* Passport */}
                                        <div>
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                                <Badge variant="outline">Document</Badge> Original Passport
                                            </h3>
                                            <Alert className="bg-amber-50 border-amber-200 mb-4 pl-11">
                                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                                <AlertTitle className="text-amber-800 font-bold">Strictly Enforced</AlertTitle>
                                                <AlertDescription className="text-amber-900 font-medium text-sm">
                                                    Original booklet passports ONLY. No photocopies, scans, screenshots, or other IDs (Driver's License/National ID are REJECTED).
                                                </AlertDescription>
                                            </Alert>
                                        </div>

                                        <div className="h-px bg-slate-100"></div>

                                        {/* Photo */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                                    <Badge variant="outline">Photo</Badge> Digital ID Photo
                                                </h3>
                                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                                                    <li>JPG/JPEG, 40KB-200KB.</li>
                                                    <li>Pure White Background.</li>
                                                    <li>Taken within last 6 months.</li>
                                                    <li><strong>No hats, no sunglasses.</strong></li>
                                                </ul>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4 border border-slate-100">
                                                <Camera className="h-8 w-8 text-slate-400" />
                                                <div className="text-xs text-slate-500">
                                                    <p className="font-bold text-slate-700">AI Facial Recognition</p>
                                                    <p>Your photo determines login success on exam day.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100"></div>

                                        {/* Payment */}
                                        <div>
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                                <Badge variant="outline">Payment</Badge> Accepted Methods
                                            </h3>
                                            <div className="flex gap-3 flex-wrap">
                                                <div className="bg-slate-50 border px-3 py-1 rounded flex items-center gap-2 text-sm font-medium"><CreditCard className="h-4 w-4 text-blue-600" /> Visa/Mastercard</div>
                                                <div className="bg-slate-50 border px-3 py-1 rounded flex items-center gap-2 text-sm font-medium"><span className="text-green-600 font-bold">WeChat</span> Pay</div>
                                                <div className="bg-slate-50 border px-3 py-1 rounded flex items-center gap-2 text-sm font-medium"><span className="text-blue-400 font-bold">Alipay</span></div>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>

                                {/* 2. CHECK SCHEDULES */}
                                <Card className="border-t-4 border-t-indigo-600 shadow-sm">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-indigo-100 p-2 rounded-lg"><Calendar className="h-6 w-6 text-indigo-600" /></div>
                                            <CardTitle>2. Test Schedules</CardTitle>
                                        </div>
                                        <CardDescription>CSCA is held 5 times annually.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                                            {['January', 'March', 'May', 'June', 'December'].map(month => (
                                                <div key={month} className="bg-indigo-50 border border-indigo-100 rounded text-center py-2 text-sm font-semibold text-indigo-700">
                                                    {month}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-sm bg-slate-50 p-3 rounded flex items-start gap-2 text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                                            <p><strong>Home-Based Testing</strong> is available for all sessions, allowing you to take the exam from anywhere with the required setup.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex justify-center pt-4">
                                <Link href="https://csca.cn/home">
                                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 shadow-lg shadow-purple-100">
                                        Create Account & Register Now
                                    </Button>
                                </Link>
                            </div>

                        </TabsContent>

                        {/* TAB 1: REQUIREMENTS (Gear & Env) */}
                        <TabsContent value="requirements" className="space-y-8 animate-in fade-in-50 duration-500">

                            {/* Alert for Mac Users */}
                            <Alert className="bg-red-50 border-red-300 [&>svg]:text-red-600 pl-11">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="text-red-900 font-bold text-base">Critical Device Requirement</AlertTitle>
                                <AlertDescription className="text-red-900 font-medium mt-1">
                                    MacOS (MacBook/iMac) is <span className="underline decoration-2 underline-offset-2 decoration-red-500 font-bold">NOT supported</span>. You must use a Windows 10/11 PC.
                                </AlertDescription>
                            </Alert>

                            {/* Readiness Checklist Component */}
                            <ReadinessChecklist />

                            {/* 2-Device System */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Primary Device */}
                                <Card className="border-t-4 border-t-blue-600 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-blue-100 p-2 rounded-lg"><Monitor className="h-6 w-6 text-blue-600" /></div>
                                            <CardTitle>1. Primary Device (PC)</CardTitle>
                                        </div>
                                        <CardDescription>Used for taking the test & front monitoring.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm text-slate-700">
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>OS:</strong> Windows 10/11 (64-bit). <span className="text-red-600 text-xs font-bold uppercase ml-1">No MacOS</span></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>Hardware:</strong> Single monitor only. Webcam (720p+), Mic, Speaker.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>Software:</strong> Must install <strong>CSCA Test Client</strong>. No VMs/Remote Desktops.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>Position:</strong> Camera above screen, facing you. Laptop plugged in.</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Secondary Device */}
                                <Card className="border-t-4 border-t-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-indigo-100 p-2 rounded-lg"><Smartphone className="h-6 w-6 text-indigo-600" /></div>
                                            <CardTitle>2. Secondary Device</CardTitle>
                                        </div>
                                        <CardDescription>Smartphone/Tablet for rear-view monitoring.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm text-slate-700">
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>Placement:</strong> 45° angle behind you to the side.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>View:</strong> Must show your screen, hands, and upper body.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>Setup:</strong> Use a stand/tripod. Keep plugged in. Airplane Mode + WiFi.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span><strong>App:</strong> Runs "CSCA Secondary Camera Portal" (Browser/App).</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Environment & Network */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="bg-slate-50 border-slate-200 md:col-span-2">
                                    <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Eye className="h-5 w-5" /> Room & Environment</CardTitle></CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-semibold mb-2 text-slate-900">Allowed ✅</h4>
                                            <ul className="space-y-1 text-slate-600">
                                                <li>• Private, enclosed room.</li>
                                                <li>• Well-lit, quiet.</li>
                                                <li>• Desk against proper background.</li>
                                                <li>• Hands visible at all times.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 text-slate-900">Prohibited ❌</h4>
                                            <ul className="space-y-1 text-red-600/80">
                                                <li>• Parks, Cafes, Open Offices.</li>
                                                <li>• Beds, Sofas, Laps.</li>
                                                <li>• Other people entering.</li>
                                                <li>• Background noise/talking.</li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900 text-white border-none">
                                    <CardHeader><CardTitle className="text-lg flex items-center gap-2 text-emerald-400"><Wifi className="h-5 w-5" /> Network</CardTitle></CardHeader>
                                    <CardContent className="space-y-4 text-sm">
                                        <div>
                                            <p className="font-bold text-lg">≥ 20 Mbps</p>
                                            <p className="text-slate-400">Upload/Download Speed</p>
                                        </div>
                                        <hr className="border-slate-700" />
                                        <ul className="space-y-2 text-slate-300">
                                            <li>• Wired connection preferred.</li>
                                            <li>• Have a 4G Hotspot backup.</li>
                                            <li>• Close background apps.</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* TAB 2: EXAM PROCESS */}
                        <TabsContent value="process" className="space-y-8 animate-in fade-in-50 duration-500">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Exam Day Timeline</CardTitle>
                                    <CardDescription>Follow these steps strictly to avoid disqualification.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 pl-8 py-2">

                                        {/* Step 1 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ring-4 ring-white">1</span>
                                            <h3 className="font-bold text-lg text-slate-900">Pre-Test Prep (-60 mins)</h3>
                                            <p className="text-slate-600 mt-1 mb-2">Login window opens 60 mins before start. <span className="text-red-500 font-medium">Late entry is NOT allowed.</span></p>
                                            <ul className="text-sm text-slate-600 list-disc list-inside bg-slate-50 p-3 rounded-lg">
                                                <li>Close antivirus & background apps.</li>
                                                <li>Connect Primary PC to power & internet.</li>
                                                <li>Setup Secondary Device (Airplane Mode + Wifi, Do Not Disturb).</li>
                                                <li>Place ID & Admission Ticket on desk.</li>
                                            </ul>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ring-4 ring-white">2</span>
                                            <h3 className="font-bold text-lg text-slate-900">Login & Verification</h3>
                                            <p className="text-slate-600 mt-1 mb-2">Complete these steps in the software:</p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="bg-slate-50 p-2 rounded border border-slate-100">1. System Check</div>
                                                <div className="bg-slate-50 p-2 rounded border border-slate-100">2. Face Recognition</div>
                                                <div className="bg-slate-50 p-2 rounded border border-slate-100">3. Connect 2nd Cam</div>
                                                <div className="bg-slate-50 p-2 rounded border border-slate-100">4. 360° Room Scan</div>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ring-4 ring-white">3</span>
                                            <h3 className="font-bold text-lg text-slate-900">Taking the Test</h3>
                                            <p className="text-slate-600 mt-1">
                                                <strong>Science/Math:</strong> 60 mins | <strong>Chinese:</strong> 90 mins
                                            </p>
                                            <p className="text-sm text-slate-500 mt-2">
                                                Stay visible. Do not leave seat. Do not talk.
                                                If network fails, reconnect immediately (answers are saved).
                                            </p>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="relative">
                                            <span className="absolute -left-[41px] bg-slate-100 text-slate-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ring-4 ring-white">4</span>
                                            <h3 className="font-bold text-lg text-slate-900">Finish & Submit</h3>
                                            <p className="text-slate-600 mt-1">
                                                System auto-submits when time is up.
                                                <strong> Erase your whiteboard</strong> in front of the camera before leaving.
                                            </p>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* TAB 3: RULES */}
                        <TabsContent value="rules" className="space-y-6 animate-in fade-in-50 duration-500">

                            {/* Scratch Paper Rule */}
                            <Alert className="bg-amber-50 border-amber-200 pl-11">
                                <FileX className="h-4 w-4 text-amber-600" />
                                <AlertTitle className="text-amber-800 font-bold">Standard Scratch Paper is PROHIBITED</AlertTitle>
                                <AlertDescription className="text-amber-700">
                                    You cannot use notebooks, sticky notes, or regular paper. You must use:
                                    <ul className="list-disc list-inside mt-2 font-medium text-amber-900">
                                        <li>Small Whiteboard + Erasable Marker</li>
                                        <li>OR Blank paper inside a transparent sheet protector (write on the plastic)</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader><CardTitle className="text-red-600 flex items-center gap-2"><XCircle className="h-5 w-5" /> Zero Tolerance</CardTitle></CardHeader>
                                    <CardContent className="space-y-2 text-sm text-slate-700">
                                        <p>• <strong>No Headphones:</strong> Wireless or wired headsets are banned.</p>
                                        <p>• <strong>No Smart Devices:</strong> Watches, other phones, etc.</p>
                                        <p>• <strong>No Leaving:</strong> You must stay in frame.</p>
                                        <p>• <strong>No Talk:</strong> Do not speak to anyone.</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader><CardTitle className="text-slate-800 flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Violation Penalties</CardTitle></CardHeader>
                                    <CardContent className="space-y-2 text-sm text-slate-700">
                                        <p>• <strong>Minor:</strong> Cancelled single test score.</p>
                                        <p>• <strong>Serious:</strong> 2-Year Suspension from CSCA.</p>
                                        <p>• <strong>Severe:</strong> Permanent Ban + Legal Action.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* TAB 4: FAQs */}
                        <TabsContent value="faqs" className="animate-in fade-in-50 duration-500">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                    <CardDescription>Common questions about eligibility and setup.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">

                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Who is eligible to take the CSCA?</AccordionTrigger>
                                            <AccordionContent>
                                                Non-Chinese citizens applying for undergraduate programs in China. Not for HK/Macao/Taiwan residents. No age limit (under 14 needs parental consent).
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>Can I use a Mac or iPad for the primary device?</AccordionTrigger>
                                            <AccordionContent className="font-bold text-red-600">
                                                No. MacOS and iOS are strictly not supported for the Primary Device. You must use a Windows Computer.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>What if my internet disconnects?</AccordionTrigger>
                                            <AccordionContent>
                                                Log back in immediately. The system saves your progress. We recommend a wired connection and a 4G hotspot backup.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-4">
                                            <AccordionTrigger>When are scores released?</AccordionTrigger>
                                            <AccordionContent>
                                                Typically within 7 business days. Scores are valid for 2 years.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-5">
                                            <AccordionTrigger>Can I apply for Home-Based Test if my city has a center?</AccordionTrigger>
                                            <AccordionContent>
                                                No. RHT is only for regions where centralized testing is not accessible.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="item-6">
                                            <AccordionTrigger>What are the subjects?</AccordionTrigger>
                                            <AccordionContent>
                                                <strong>Science/Eng/Med:</strong> Math + Physics/Chem.<br />
                                                <strong>Liberal Arts:</strong> Math + Prof. Chinese.<br />
                                                You can choose English or Chinese language for Math/Physics/Chem.
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
}
