import { create } from 'zustand';

interface ExamState {
  currentQuestionIndex: number;
  answers: Record<string, number>; // { questionId: selectedIdx }
  timeLeft: number;
  isSubmitted: boolean;

  // Actions
  setAnswer: (qId: string, optionIdx: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  tickTimer: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  setTimeLeft: (time: number) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},
  timeLeft: 0,
  isSubmitted: false,

  setAnswer: (qId, idx) => set((state) => ({
    answers: { ...state.answers, [qId]: idx }
  })),
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),
  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
  })),
  tickTimer: () => set((state) => ({
    timeLeft: Math.max(0, state.timeLeft - 1)
  })),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
  resetExam: () => set({
    currentQuestionIndex: 0,
    answers: {},
    timeLeft: 0,
    isSubmitted: false
  }),
}));
