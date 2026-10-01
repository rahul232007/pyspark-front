export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isSecret?: boolean;
}

export interface CodingProblem {
  id: string;
  lessonId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialCode: string;
  solutionCode: string;
  hints: string[];
  testCases: TestCase[];
  xpReward: number;
  coinReward: number;
}

export interface TestResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
  executionTimeMs: number;
}

export interface CodeSubmissionResult {
  passed: boolean;
  results: TestResult[];
  consoleOutput: string;
  xpEarned: number;
  coinsEarned: number;
  stars: number; // 1-3 stars rating
}
