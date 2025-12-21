import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TestCardProps {
    id: string;
    title: string;
    subject: string; // "Mathematics", "Physics", "Chemistry" from database
    duration: number; // minutes
    questionCount: number;
    difficulty: "Easy" | "Medium" | "Hard";
    status?: "start" | "resume" | "completed";
    score?: number;
}

export function TestCard({
    id,
    title,
    subject,
    duration,
    questionCount,
    difficulty,
    status = "start",
    score
}: TestCardProps) {

    const getSubjectColor = (subj: string) => {
        switch (subj) {
            case "Math":
            case "Mathematics": return "bg-blue-100 text-blue-700 hover:bg-blue-200";
            case "Physics": return "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";
            case "Chemistry": return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <Badge className={`border-none ${getSubjectColor(subject)}`}>
                        {subject}
                    </Badge>
                    {status === "completed" && (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Score: {score}%
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-lg font-medium leading-tight mt-2">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {duration}m
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-300">•</span> {questionCount} Qs
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-300">•</span> {difficulty}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Link href={`/exam/${id}`} className="w-full">
                    {status === "completed" ? (
                        <Button variant="outline" className="w-full">
                            Retake Test
                        </Button>
                    ) : (
                        <Button className="w-full bg-slate-900 hover:bg-slate-800">
                            {status === "resume" ? "Resume Attempt" : "Start Test"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </Link>
            </CardFooter>
        </Card>
    );
}
