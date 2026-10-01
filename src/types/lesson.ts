export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
}

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  codeExample?: CodeExample;
  tip?: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  xpReward: number;
  coinReward: number;
  estimatedMinutes: number;
  steps: LessonStep[];
  quizId: string;
  codingChallengeId: string;
  isCompleted?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon
  badgeColor: string;
  difficulty: DifficultyLevel;
  totalLessons: number;
  completedLessons: number;
  xpReward: number;
  thumbnail: string;
  lessons: Lesson[];
}
