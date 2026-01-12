import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import {
    Search,
    MapPin,
    Calendar,
    DollarSign,
    GraduationCap,
    ArrowRight,
    BellRing,
    CheckCircle2,
    Globe,
    BookOpen,
    School,
    ExternalLink,
    Landmark
} from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";

// Mock Data - In production, this comes from your database
const scholarshipData = [
    // --- NATIONAL / CSC PROGRAMS ---
    {
        id: 1,
        title: "Chinese Government Scholarship (CSC) - Type A",
        university: "Bilateral Program (Embassy Track)",
        deadline: "2026-03-31",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "2500-3500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["High Competition", "Govt. Authenticated"],
        link: "https://campuschina.org/scholarships/index.html?k=Chinese%20Government%20Scholarships"
    },
    {
        id: 2,
        title: "Great Wall Program (UNESCO)",
        university: "Various Chinese Universities",
        deadline: "2026-04-10",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000 RMB/month",
        level: ["Master", "PhD"],
        tags: ["UNESCO", "Developing Countries"],
        link: "https://campuschina.org/scholarships/index.html?k=Great%20Wall%20Program"
    },
    {
        id: 3,
        title: "EU Window Program",
        university: "Designated Universities",
        deadline: "2026-04-01",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000-3500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["EU Citizens", "Exchange"],
        link: "https://campuschina.org/scholarships/index.html?k=EU%20Window"
    },
    {
        id: 4,
        title: "AUN Program (ASEAN)",
        university: "Various Chinese Universities",
        deadline: "2026-04-30",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000-3500 RMB/month",
        level: ["Master", "PhD"],
        tags: ["ASEAN Members", "Review Needed"],
        link: "https://campuschina.org/scholarships/index.html?k=AUN%20Program"
    },
    {
        id: 5,
        title: "PIF Program (Pacific Islands)",
        university: "Various Chinese Universities",
        deadline: "2026-04-01",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000-3500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Pacific Islands", "Exchange"],
        link: "https://campuschina.org/scholarships/index.html?k=PIF%20Program"
    },
    {
        id: 6,
        title: "WMO Program (Meteorology)",
        university: "NUIST & Hohai University",
        deadline: "2026-03-31",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "Varies",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Meteorology", "Water Resources"],
        link: "https://campuschina.org/scholarships/index.html?k=WMO%20Program"
    },
    {
        id: 7,
        title: "MOFCOM Scholarship",
        university: "Review MOFCOM List",
        deadline: "2026-05-31",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "36000 RMB/year",
        level: ["Master", "PhD"],
        tags: ["Commerce Ministry", "Government Officials"],
        link: "https://www.china-aibo.cn/en/info/1005/1283.htm"
    },
    {
        id: 8,
        title: "Marine Scholarship of China",
        university: "Ocean University of China & others",
        deadline: "2026-04-30",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000-3500 RMB/month",
        level: ["Master", "PhD"],
        tags: ["Oceanography", "Marine Science"],
        link: "https://campuschina.org/scholarships/index.html?k=Marine%20Scholarship"
    },
    {
        id: 9,
        title: "CAS-TWAS President's Fellowship",
        university: "UCAS & USTC",
        deadline: "2026-03-31",
        status: "Closing Soon",
        coverage: "Fully Funded",
        allowance: "7000-8000 RMB/month",
        level: ["PhD"],
        tags: ["Highest Allowance", "Research"],
        link: "https://twas.org/opportunity/cas-twas-presidents-phd-fellowship-programme"
    },

    // --- PROVINCIAL GOVERNMENT SCHOLARSHIPS ---
    {
        id: 10,
        title: "Zhejiang Provincial Admin Scholarship",
        university: "Zhejiang University & others",
        deadline: "2026-05-20",
        status: "Open",
        coverage: "Partial/Full",
        allowance: "20k-30k RMB/Year",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Hangzhou", "High Quota"],
        link: "https://campuschina.org/content/details3_74776.html"
    },
    {
        id: 11,
        title: "Shanghai Government Scholarship (SGS)",
        university: "Fudan, SJTU, Tongji, ECNU",
        deadline: "2026-05-15",
        status: "Open",
        coverage: "Fully Funded (Type A)",
        allowance: "3000-3500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Top Tier City", "Competitive"],
        link: "http://study.edu.sh.gov.cn/en/ise.html"
    },
    {
        id: 12,
        title: "Beijing Government Scholarship",
        university: "Universities in Beijing",
        deadline: "2026-04-15",
        status: "Open",
        coverage: "Tuition Only",
        allowance: "None",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Tuition Waiver", "Capital City"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 13,
        title: "Jiangsu Government Scholarship",
        university: "Nanjing U, Southeast U",
        deadline: "2026-05-30",
        status: "Open",
        coverage: "Full & Partial",
        allowance: "1500-2500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Rich Province", "Educ Hub"],
        link: "http://www.studyinjiangsu.org/"
    },
    {
        id: 14,
        title: "Hubei Provincial Scholarship",
        university: "Wuhan U, HUST",
        deadline: "2026-06-15",
        status: "Upcoming",
        coverage: "Tuition + Allowance",
        allowance: "10k-20k RMB/year",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Central China", "Low Living Cost"],
        link: "http://studyinhubei.hubeiguoji.cn/"
    },
    {
        id: 15,
        title: "Sichuan Government Scholarship",
        university: "Sichuan U, UESTC",
        deadline: "2026-06-01",
        status: "Open",
        coverage: "Tuition + Living",
        allowance: "1500 RMB/month",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Chengdu", "Panda Base"],
        link: "http://www.studyinsichuan.com/"
    },
    {
        id: 16,
        title: "Guangdong Government Scholarship",
        university: "Sun Yat-sen U, SCUT",
        deadline: "2026-05-30",
        status: "Open",
        coverage: "Partial Lump Sum",
        allowance: "10k-30k RMB/One-off",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Tech Hub", "Near HK"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 17,
        title: "Shandong Government Scholarship",
        university: "Shandong U, Ocean U",
        deadline: "2026-05-01",
        status: "Open",
        coverage: "Full Tuition",
        allowance: "None",
        level: ["Bachelor", "Master"],
        tags: ["Coastal", "Confucius Hometown"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 18,
        title: "Fujian Government Scholarship",
        university: "Xiamen U, Fuzhou U",
        deadline: "2026-05-10",
        status: "Open",
        coverage: "Tuition + Accommodation",
        allowance: "Varies",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Maritime Silk Road", "Xiamen"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 19,
        title: "Tianjin Government Scholarship",
        university: "Tianjin U, Nankai U",
        deadline: "2026-06-15",
        status: "Upcoming",
        coverage: "Full/Partial",
        allowance: "30k-40k RMB/Year",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Near Beijing", "Port City"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 20,
        title: "Chongqing Mayor Scholarship",
        university: "Chongqing U, Southwest U",
        deadline: "2026-05-30",
        status: "Open",
        coverage: "Full Scholarship",
        allowance: "3000 RMB/month",
        level: ["Master", "PhD"],
        tags: ["Silk Road", "Mountain City"],
        link: "http://www.studyinchongqing.org/"
    },
    {
        id: 21,
        title: "Heilongjiang Government Scholarship",
        university: "HIT, Harbin Eng. U",
        deadline: "2026-04-30",
        status: "Open",
        coverage: "Full Tuition",
        allowance: "None",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Ice City", "Engineering"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },
    {
        id: 22,
        title: "Yunnan Government Scholarship",
        university: "Yunnan U, KMUST",
        deadline: "2026-04-30",
        status: "Open",
        coverage: "Full Scholarship",
        allowance: "1500 RMB/month",
        level: ["Bachelor", "Master"],
        tags: ["Belt & Road", "ASEAN Focus"],
        link: "https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships"
    },

    // --- UNIVERSITY SPECIFIC / INDEPENDENT PROGRAMS ---
    {
        id: 23,
        title: "Silk Road Scholarship (XJTU)",
        university: "Xian Jiaotong University",
        deadline: "2026-04-15",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000 RMB/month",
        level: ["Master", "PhD"],
        tags: ["Top Engineer", "Belt & Road"],
        link: "http://sie.xjtu.edu.cn/en/Scholarships1/Silk_Road_Scholarship.htm"
    },
    {
        id: 24,
        title: "Yenching Academy Fellowship",
        university: "Peking University",
        deadline: "2026-04-05",
        status: "Closing Soon",
        coverage: "Fully Funded + flight",
        allowance: "High Stipend",
        level: ["Master"],
        tags: ["Elite", "China Studies"],
        link: "https://yenchingacademy.pku.edu.cn/"
    },
    {
        id: 25,
        title: "Schwarzman Scholars",
        university: "Tsinghua University",
        deadline: "2026-09-20",
        status: "Upcoming",
        coverage: "Fully Funded + Travel",
        allowance: "Generous",
        level: ["Master"],
        tags: ["Leadership", "Global"],
        link: "https://www.schwarzmanscholars.org/"
    },
    {
        id: 26,
        title: "Presidential Scholarship (Tongji)",
        university: "Tongji University",
        deadline: "2026-06-01",
        status: "Open",
        coverage: "Tuition Waiver",
        allowance: "None",
        level: ["Bachelor"],
        tags: ["Architecture", "Freshmen"],
        link: "https://study.tongji.edu.cn/lxsq/xxjzs/Presidential_Scholarship.htm"
    },
    {
        id: 27,
        title: "Nanjing University CSC",
        university: "Nanjing University",
        deadline: "2026-03-31",
        status: "Closing Soon",
        coverage: "Fully Funded",
        allowance: "CSC Standard",
        level: ["Master", "PhD"],
        tags: ["C9 League", "Research"],
        link: "https://hwxy.nju.edu.cn/English/StudyatNJU/Scholarships/ChineseGovernmentScholarship/"
    },
    {
        id: 28,
        title: "Tan Kah Kee Scholarship",
        university: "Xiamen University",
        deadline: "2026-04-10",
        status: "Open",
        coverage: "Full Scholarship",
        allowance: "Monthly Stipend",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Southeast Asia", "Chinese Descent"],
        link: "https://admissions.xmu.edu.cn/Scholarships/Tan_Kah_Kee_Scholarships.htm"
    },
    {
        id: 29,
        title: "USTC Fellowship (Type A)",
        university: "Univ of Science & Tech China",
        deadline: "2026-03-31",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "3000-7000 RMB/month",
        level: ["Master", "PhD"],
        tags: ["Science", "Top Research"],
        link: "https://ic.ustc.edu.cn/en/v7info.php?Nav_x=16"
    },
    {
        id: 30,
        title: "Beihang University Postgrad Scholarship",
        university: "Beihang University (BUAA)",
        deadline: "2026-05-30",
        status: "Open",
        coverage: "Full Tuition + Living",
        allowance: "Varies",
        level: ["Master", "PhD"],
        tags: ["Aerospace", "Engineering"],
        link: "http://is.buaa.edu.cn/"
    },
    {
        id: 31,
        title: "ECNU Outstanding Student Scholarship",
        university: "East China Normal University",
        deadline: "2026-05-15",
        status: "Open",
        coverage: "Tuition Waiver",
        allowance: "Partial",
        level: ["Bachelor", "Master", "PhD"],
        tags: ["Shanghai", "Teacher Training"],
        link: "http://lxs.ecnu.edu.cn/EN/"
    },
    {
        id: 32,
        title: "HIT - CSC Scholarship",
        university: "Harbin Institute of Technology",
        deadline: "2026-03-15",
        status: "Closing Soon",
        coverage: "Fully Funded",
        allowance: "Standard CSC",
        level: ["Master", "PhD"],
        tags: ["C9 League", "Engineering"],
        link: "http://www.hit.edu.cn/"
    },
    {
        id: 33,
        title: "Wuhan University CSC",
        university: "Wuhan University",
        deadline: "2026-03-31",
        status: "Open",
        coverage: "Fully Funded",
        allowance: "Standard CSC",
        level: ["Master", "PhD"],
        tags: ["Top 10", "General"],
        link: "https://admission.whu.edu.cn/en/?c=content&a=list&catid=189"
    }
];

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search 300+ China Scholarships (2026) | CSC, Provincial & University Grants",
    description: "Find fully funded scholarships for Bachelor, Master, and PhD in China. Browse official CSC, Provincial Government, and University-specific scholarship opportunities.",
};

export default async function ScholarshipsPage() {
    const session = await getSession();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar isLoggedIn={!!session} />

            <main className="flex-grow pt-24 pb-16">

                {/* HERO SECTION */}
                <div className="bg-slate-900 text-white py-12 mb-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 text-blue-400 font-bold mb-2">
                                    <BellRing className="h-4 w-4" />
                                    <span>2026 Admissions are Active</span>
                                </div>
                                <h1 className="text-4xl font-extrabold mb-4">China Scholarship Database</h1>
                                <p className="text-slate-300 text-lg">
                                    Access curated opportunities for international students. <br />
                                    <span className="text-white font-semibold">Verified by CSCA Master Team.</span>
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="w-full md:w-auto bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20 flex gap-2">
                                <Input
                                    placeholder="Search university or major..."
                                    className="bg-transparent border-none text-white placeholder:text-slate-400 focus-visible:ring-0 min-w-[280px]"
                                />
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* OFFICIAL SOURCES GRID */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Official Directories</h2>
                        <span className="text-sm text-slate-500 hidden sm:inline-block">Direct links to CampusChina.org</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* 1. Universities */}
                        <a href="https://campuschina.org/universities/index.html" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="h-full border-slate-200 hover:border-blue-500 hover:shadow-md transition-all">
                                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-600 transition-colors">
                                        <School className="h-6 w-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">Universities List</h3>
                                        <p className="text-xs text-slate-500 mt-1">Browse 279+ CSC Universities</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </a>

                        {/* 2. CSC Scholarships */}
                        <a href="https://campuschina.org/scholarships/index.html?k=Chinese%20Government%20Scholarships" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="h-full border-slate-200 hover:border-red-500 hover:shadow-md transition-all">
                                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                                    <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-600 transition-colors">
                                        <Globe className="h-6 w-6 text-red-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">CSC Scholarships</h3>
                                        <p className="text-xs text-slate-500 mt-1">Type A & B Full Grants</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </a>

                        {/* 3. Local Gov */}
                        <a href="https://campuschina.org/scholarships/index.html?k=Local%20Government%20Scholarships" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="h-full border-slate-200 hover:border-amber-500 hover:shadow-md transition-all">
                                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                                    <div className="bg-amber-100 p-3 rounded-full group-hover:bg-amber-600 transition-colors">
                                        <Landmark className="h-6 w-6 text-amber-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">Local Gov Grants</h3>
                                        <p className="text-xs text-slate-500 mt-1">Provincial & City Awards</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </a>

                        {/* 4. Confucius */}
                        <a href="https://campuschina.org/scholarships/index.html?k=Confucius%20Institute%20Scholarships" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="h-full border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
                                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                                    <div className="bg-emerald-100 p-3 rounded-full group-hover:bg-emerald-600 transition-colors">
                                        <BookOpen className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">Confucius Institute</h3>
                                        <p className="text-xs text-slate-500 mt-1">For Language Learners</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </a>

                        {/* 5. University */}
                        <a href="https://campuschina.org/scholarships/index.html?k=School%20Scholarships" target="_blank" rel="noopener noreferrer" className="group">
                            <Card className="h-full border-slate-200 hover:border-violet-500 hover:shadow-md transition-all">
                                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                                    <div className="bg-violet-100 p-3 rounded-full group-hover:bg-violet-600 transition-colors">
                                        <GraduationCap className="h-6 w-6 text-violet-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">School Scholarships</h3>
                                        <p className="text-xs text-slate-500 mt-1">Direct University Programs</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </CardContent>
                            </Card>
                        </a>
                    </div>
                </div>

                {/* LISTINGS */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Filters Sidebar (Desktop) */}
                        <div className="hidden lg:block space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                                <h3 className="font-bold text-slate-900 mb-4">Filter Opportunities</h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Coverage</label>
                                        <div className="space-y-2">
                                            {['Fully Funded', 'Partial Funding', 'Tuition Waiver'].map((item) => (
                                                <label key={item} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                                    <span className="text-sm">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 mb-2 block">Degree Level</label>
                                        <div className="space-y-2">
                                            {['Bachelor', 'Master', 'PhD'].map((item) => (
                                                <label key={item} className="flex items-center gap-2 text-slate-600 cursor-pointer">
                                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                                    <span className="text-sm">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full border-slate-300">Reset Filters</Button>
                                </div>
                            </div>

                            {/* Scholarship Cards Grid */}
                        </div>

                        {/* Scholarship Cards Grid */}
                        <div className="lg:col-span-2 space-y-6">
                            {scholarshipData.map((item) => (
                                <Card key={item.id} className="hover:shadow-md transition-shadow duration-300 border-slate-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {item.status === "Open" && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Accepting Applications</Badge>}
                                                    {item.status === "Closing Soon" && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Deadline Approaching</Badge>}
                                                    {item.status === "Upcoming" && <Badge variant="outline">Opens Soon</Badge>}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 leading-tight">{item.title}</h3>
                                                <div className="flex items-center text-slate-500 text-sm mt-1">
                                                    <MapPin className="h-4 w-4 mr-1" /> {item.university}
                                                </div>
                                            </div>
                                            <div className="text-right hidden sm:block">
                                                <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Deadline</span>
                                                <span className="block font-semibold text-slate-900">{item.deadline}</span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pb-4">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-slate-50 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase mb-1">
                                                    <DollarSign className="h-3 w-3" /> Coverage
                                                </div>
                                                <p className="font-semibold text-blue-700">{item.coverage}</p>
                                                <p className="text-xs text-slate-500">{item.allowance}</p>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase mb-1">
                                                    <GraduationCap className="h-3 w-3" /> Degree Level
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.level.map(l => (
                                                        <span key={l} className="text-xs font-medium bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                                                            {l}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-0 flex gap-3">
                                        {/* The Detail View would be a separate page or modal */}
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                            <Button variant="outline" className="w-full border-slate-300">
                                                View Requirements
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}

                            {/* Empty State / More Loader */}
                            <div className="text-center py-8">
                                <p className="text-slate-500 text-sm mb-4">Showing {scholarshipData.length} of {scholarshipData.length} active scholarships</p>
                                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">Load More Opportunities</Button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM CTA: NEWSLETTER LEAD CAPTURE */}
                <div className="max-w-4xl mx-auto px-4 mt-16">
                    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Don't miss the CSC Deadline!
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                Get instant WhatsApp alerts when new English-taught scholarships are announced for 2026 intake.
                            </p>

                            <div className="flex justify-center">
                                <a href="https://chat.whatsapp.com/ExAMPLELinkPlaceholder" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-700 h-14 px-8 text-lg font-bold shadow-xl flex items-center gap-3">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        Join WhatsApp Group
                                    </Button>
                                </a>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
