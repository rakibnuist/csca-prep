"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDisplayTopicName } from "@/lib/topicMapping";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TopicData {
    topic: string;
    score: number;
    correct: number;
    total: number;
    attempted: number;
}

interface SubjectTopicData {
    subject: string;
    topics: TopicData[];
}

interface TopicAnalysisProps {
    data: SubjectTopicData[];
    testsCompleted: number;
}

export function TopicAnalysis({ data, testsCompleted }: TopicAnalysisProps) {
    const [selectedSubject, setSelectedSubject] = useState<string>(data[0]?.subject || "");

    const currentSubjectData = data.find(d => d.subject === selectedSubject);

    if (data.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Topic-Wise Analysis</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                        Based on {testsCompleted} test{testsCompleted !== 1 ? 's' : ''}
                    </span>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {data.map((subjectData) => (
                                <SelectItem key={subjectData.subject} value={subjectData.subject}>
                                    {subjectData.subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardContent className="p-4 sm:p-6">
                    {currentSubjectData && currentSubjectData.topics.length > 0 ? (
                        <div className="space-y-4">
                            {currentSubjectData.topics.map((topic) => (
                                <div key={topic.topic} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded whitespace-nowrap ${topic.score >= 80 ? 'bg-green-100 text-green-700' :
                                                topic.score >= 60 ? 'bg-blue-100 text-blue-700' :
                                                    topic.score >= 40 ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {topic.score}%
                                            </span>
                                            <span className="text-sm sm:text-base font-medium text-slate-700 truncate">
                                                {getDisplayTopicName(topic.topic)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">
                                            {topic.attempted} Q's
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${topic.score >= 80 ? 'bg-green-500' :
                                                topic.score >= 60 ? 'bg-blue-500' :
                                                    topic.score >= 40 ? 'bg-amber-500' :
                                                        'bg-red-500'
                                                }`}
                                            style={{ width: `${topic.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <p className="text-sm">No topics found for {selectedSubject}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
