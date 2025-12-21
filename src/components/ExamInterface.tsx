"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useExamStore } from "@/store/useExamStore";
import { MathRender } from "@/components/MathRender";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, ChevronLeft, ChevronRight, Flag, Loader2, AlertCircle, CheckCircle2, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

interface Question {
    id: string;
    content: string;
    options: string[];
}

interface ExamProps {
    testId: string;
    title: string;
    durationMin: number;
    questions: Question[];
}

export default function ExamInterface({ testId, title, durationMin, questions }: ExamProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showTerminateModal, setShowTerminateModal] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{ score: number, total: number, attemptId: string } | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
    const router = useRouter();

    // Selectors for optimized re-rendering
    const currentQuestionIndex = useExamStore(state => state.currentQuestionIndex);
    const answers = useExamStore(state => state.answers);
    const timeLeft = useExamStore(state => state.timeLeft);
    const isSubmitted = useExamStore(state => state.isSubmitted);

    const setAnswer = useExamStore(state => state.setAnswer);
    const nextQuestion = useExamStore(state => state.nextQuestion);
    const prevQuestion = useExamStore(state => state.prevQuestion);
    const setCurrentQuestionIndex = useExamStore(state => state.setCurrentQuestionIndex);
    const setTimeLeft = useExamStore(state => state.setTimeLeft);
    const tickTimer = useExamStore(state => state.tickTimer);
    const resetExam = useExamStore(state => state.resetExam);
    const setIsSubmitted = useExamStore(state => state.setIsSubmitted);

    const toggleMark = (questionId: string) => {
        setMarkedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };


    // Initial state setup - only once on mount or testId change
    useEffect(() => {
        resetExam();
        setTimeLeft(durationMin * 60);
    }, [testId, durationMin, resetExam, setTimeLeft]);

    // Timer logic - stops when submitting or when a modal is open to ensure stable UI
    useEffect(() => {
        if (isSubmitted || isSubmitting || showConfirmModal || showTerminateModal || submissionResult) return;
        const timer = setInterval(() => {
            tickTimer();
        }, 1000);
        return () => clearInterval(timer);
    }, [tickTimer, isSubmitted, isSubmitting, showConfirmModal, showTerminateModal, submissionResult]);

    const currentQ = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Don't handle if modals are open or exam is submitted
            if (showConfirmModal || showTerminateModal || submissionResult || isSubmitted) return;

            switch (e.key) {
                case 'ArrowLeft':
                    if (currentQuestionIndex > 0) {
                        prevQuestion();
                    }
                    break;
                case 'ArrowRight':
                    if (currentQuestionIndex < questions.length - 1) {
                        nextQuestion();
                    }
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    const optionIndex = parseInt(e.key) - 1;
                    if (optionIndex < currentQ.options.length) {
                        setAnswer(currentQ.id, optionIndex);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentQuestionIndex, questions.length, prevQuestion, nextQuestion, currentQ, setAnswer, showConfirmModal, showTerminateModal, submissionResult, isSubmitted]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSubmit = async () => {
        setShowConfirmModal(false);
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const timeTaken = (durationMin * 60) - timeLeft;
            const res = await fetch('/api/submit-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testId, answers, timeTaken })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to submit test');
            }

            const data = await res.json();
            setIsSubmitted(true);
            setSubmissionResult({
                score: data.score,
                total: data.totalMarks,
                attemptId: data.attemptId
            });
        } catch (error: any) {
            console.error('Submission error:', error);
            setSubmitError(error.message || "An error occurred while submitting your test. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (!currentQ) return <div className="p-8 text-center">Loading exam questions...</div>;

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <header className="h-14 sm:h-16 border-b px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-zinc-950 sticky top-0 z-10">
                <h1 className="font-bold text-sm sm:text-lg truncate max-w-[150px] sm:max-w-md">{title}</h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className={cn("flex items-center font-mono text-base sm:text-xl font-bold", timeLeft < 300 ? "text-red-500" : "text-slate-700 dark:text-slate-200")}>
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        {formatTime(timeLeft)}
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setShowTerminateModal(true)}
                        disabled={isSubmitting || isSubmitted}
                        className="hidden lg:flex"
                    >
                        Terminate Exam
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setShowConfirmModal(true)}
                        disabled={isSubmitting || isSubmitted}
                        size="sm"
                        className="text-xs sm:text-sm"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                <span className="hidden sm:inline">Submitting...</span>
                                <span className="sm:hidden">...</span>
                            </>
                        ) : (
                            <>
                                <span className="hidden sm:inline">Submit Test</span>
                                <span className="sm:hidden">Submit</span>
                            </>
                        )}
                    </Button>
                </div>
            </header>

            {/* Custom Modals (Replacement for flaky browser native calls) */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md p-8 shadow-2xl border-none animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Ready to submit?</h2>
                            <p className="text-slate-500 mb-8">
                                You have answered {Object.keys(answers).length} out of {questions.length} questions. You cannot change your answers after submission.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    onClick={handleSubmit}
                                >
                                    Submit Now
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {showTerminateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md p-8 shadow-2xl border-none animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-red-600">Terminate Exam?</h2>
                            <p className="text-slate-500 mb-8">
                                Are you sure you want to quit? Your progress will not be saved.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowTerminateModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => router.push('/dashboard')}
                                >
                                    Terminate
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {submissionResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md p-8 shadow-2xl border-none animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
                            <p className="text-slate-500 mb-2">Your test result has been calculated.</p>
                            <div className="text-5xl font-black text-slate-900 dark:text-white my-8">
                                {submissionResult.score} <span className="text-xl font-normal text-slate-400 font-sans">/ {submissionResult.total}</span>
                            </div>
                            <Button
                                className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg"
                                onClick={() => router.push(`/results/${submissionResult.attemptId}`)}
                            >
                                View Results
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {submitError && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md p-8 shadow-2xl border-none animate-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-red-600">Submission Error</h2>
                            <p className="text-slate-500 mb-8">{submitError}</p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setSubmitError(null)}
                            >
                                Try Again
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Question Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50/50 dark:bg-zinc-900/30">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-4 sm:mb-6 flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Question {currentQuestionIndex + 1} of {questions.length}</span>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs sm:text-sm lg:hidden"
                                    onClick={() => setShowMobileNav(true)}
                                >
                                    <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Navigator
                                </Button>
                                <Button
                                    variant={markedQuestions.has(currentQ.id) ? "default" : "ghost"}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                    onClick={() => toggleMark(currentQ.id)}
                                >
                                    <Flag className={cn("w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2", markedQuestions.has(currentQ.id) && "fill-current")} />
                                    {markedQuestions.has(currentQ.id) ? "Marked" : "Mark"}
                                </Button>
                            </div>
                        </div>

                        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 border-none shadow-sm bg-white dark:bg-zinc-900">
                            <MathRender content={currentQ.content} />
                        </Card>

                        <div className="space-y-2 sm:space-y-3">
                            {currentQ.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setAnswer(currentQ.id, idx)}
                                    className={cn(
                                        "p-3 sm:p-4 rounded-lg border cursor-pointer transition-all flex items-center",
                                        answers[currentQ.id] === idx
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                                            : "border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    <div className={cn(
                                        "w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center mr-3 sm:mr-4 text-xs sm:text-sm font-medium",
                                        answers[currentQ.id] === idx ? "bg-blue-500 text-white border-blue-500" : "text-slate-500 border-slate-300"
                                    )}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200"><MathRender content={opt} /></span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 sm:mt-12 flex justify-between gap-3">
                            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestionIndex === 0} className="flex-1 sm:flex-none">
                                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
                            </Button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <Button
                                    onClick={() => setShowConfirmModal(true)}
                                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                                    disabled={isSubmitting || isSubmitted}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-1 sm:mr-2" /> Submit Test
                                </Button>
                            ) : (
                                <Button onClick={nextQuestion} className="flex-1 sm:flex-none">
                                    <span className="hidden sm:inline">Next</span><span className="sm:hidden">Next</span> <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Navigation Grid - Hidden on mobile */}
                <div className="hidden lg:flex w-80 bg-white dark:bg-zinc-950 flex-col border-l">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-1">Question Navigator</h3>
                        <div className="flex gap-4 text-xs text-slate-500">
                            <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div> Answered</div>
                            <div className="flex items-center"><div className="w-3 h-3 border border-slate-300 rounded-full mr-1"></div> Not Visited</div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((q, idx) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestionIndex(idx)}
                                    className={cn(
                                        "h-10 w-10 rounded-md text-sm font-medium transition-colors border",
                                        currentQuestionIndex === idx ? "ring-2 ring-black dark:ring-white ring-offset-2" : "",
                                        answers[q.id] !== undefined
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800 hover:bg-slate-100"
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t bg-slate-50 dark:bg-zinc-900/50">
                        <p className="text-xs text-center text-slate-500">CSCA Official Exam Protocol</p>
                    </div>
                </div>
            </div>

            {/* Mobile Question Navigator Modal */}
            {showMobileNav && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileNav(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 rounded-t-2xl max-h-[70vh] flex flex-col animate-in slide-in-from-bottom duration-300">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold">Question Navigator</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowMobileNav(false)}>Close</Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-5 gap-2 mb-4">
                                {questions.map((q, idx) => (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            setCurrentQuestionIndex(idx);
                                            setShowMobileNav(false);
                                        }}
                                        className={cn(
                                            "h-12 w-full rounded-md text-sm font-medium transition-colors border relative",
                                            currentQuestionIndex === idx ? "ring-2 ring-blue-500 ring-offset-2" : "",
                                            answers[q.id] !== undefined
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800"
                                        )}
                                    >
                                        {idx + 1}
                                        {markedQuestions.has(q.id) && (
                                            <Flag className="absolute top-0.5 right-0.5 w-3 h-3 fill-amber-500 text-amber-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 text-xs text-slate-500 justify-center">
                                <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div> Answered</div>
                                <div className="flex items-center"><div className="w-3 h-3 border border-slate-300 rounded-full mr-1"></div> Not Visited</div>
                                <div className="flex items-center"><Flag className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" /> Marked</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
