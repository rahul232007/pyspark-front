import { create } from 'zustand';
import { Lesson } from '../types/lesson';
import { Quiz, QuizResult } from '../types/quiz';
import { CodingProblem, CodeSubmissionResult } from '../types/coding';

interface GameCompletedSummary {
  lessonTitle: string;
  xpEarned: number;
  coinsEarned: number;
  stars: number;
  previousXp: number;
  newXp: number;
  previousRank: string;
  newRank: string;
  timeSpentSeconds: number;
}

interface GameState {
  // Current active interactive flows
  currentLesson: Lesson | null;
  currentLessonStepIndex: number;
  
  currentQuiz: Quiz | null;
  quizAnswers: Record<string, string>; // questionId -> selectedOptionId
  quizTimeRemaining: number;
  quizResult: QuizResult | null;

  currentChallenge: CodingProblem | null;
  challengeCode: string;
  challengeResult: CodeSubmissionResult | null;

  completedSummary: GameCompletedSummary | null;

  // Actions
  startLesson: (lesson: Lesson) => void;
  setLessonStep: (index: number) => void;
  
  startQuiz: (quiz: Quiz) => void;
  selectQuizOption: (questionId: string, optionId: string) => void;
  setQuizResult: (result: QuizResult) => void;
  
  startCodingChallenge: (challenge: CodingProblem) => void;
  setChallengeCode: (code: string) => void;
  setChallengeResult: (result: CodeSubmissionResult) => void;

  setCompletedSummary: (summary: GameCompletedSummary) => void;
  resetGameSession: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentLesson: null,
  currentLessonStepIndex: 0,

  currentQuiz: null,
  quizAnswers: {},
  quizTimeRemaining: 300,
  quizResult: null,

  currentChallenge: null,
  challengeCode: '',
  challengeResult: null,

  completedSummary: null,

  startLesson: (lesson) =>
    set({
      currentLesson: lesson,
      currentLessonStepIndex: 0,
    }),

  setLessonStep: (index) => set({ currentLessonStepIndex: index }),

  startQuiz: (quiz) =>
    set({
      currentQuiz: quiz,
      quizAnswers: {},
      quizTimeRemaining: quiz.timeLimitSeconds || 180,
      quizResult: null,
    }),

  selectQuizOption: (questionId, optionId) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: optionId },
    })),

  setQuizResult: (result) => set({ quizResult: result }),

  startCodingChallenge: (challenge) =>
    set({
      currentChallenge: challenge,
      challengeCode: challenge.initialCode,
      challengeResult: null,
    }),

  setChallengeCode: (code) => set({ challengeCode: code }),

  setChallengeResult: (result) => set({ challengeResult: result }),

  setCompletedSummary: (summary) => set({ completedSummary: summary }),

  resetGameSession: () =>
    set({
      currentLessonStepIndex: 0,
      quizAnswers: {},
      quizResult: null,
      challengeResult: null,
    }),
}));
