import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor, { Monaco } from '@monaco-editor/react';
import {
  Code,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Terminal,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { lessonService } from '../../services/lesson';
import { CodingProblem, CodeSubmissionResult } from '../../types/coding';
import { runPythonCode } from '../../utils/pythonRunner';
import { useAuthStore } from '../../store/useAuthStore';
import { useGameStore } from '../../store/useGameStore';
import { soundEffects } from '../../utils/sound';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { Loader } from '../../components/common/Loader/Loader';
import { Badge } from '../../components/common/Badge/Badge';

export const CodingPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const soundEnabled = useAuthStore((s) => s.settings.soundEnabled);
  const markChallengeComplete = useAuthStore((s) => s.markChallengeComplete);
  const addXpAndCoins = useAuthStore((s) => s.addXpAndCoins);
  const user = useAuthStore((s) => s.user);
  const setCompletedSummary = useGameStore((s) => s.setCompletedSummary);

  const [problem, setProblem] = useState<CodingProblem | null>(null);
  const [code, setCode] = useState('');
  const [submissionResult, setSubmissionResult] = useState<CodeSubmissionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lessonService.getCodingProblemById(challengeId || 'code_variables_1').then((res) => {
      setProblem(res);
      if (res) setCode(res.initialCode);
      setLoading(false);
    });
  }, [challengeId]);

  const handleEditorBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('py-spark-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00F0FF', fontStyle: 'bold' },
        { token: 'string', foreground: 'FBBF24' },
        { token: 'number', foreground: '8B5CF6' },
        { token: 'identifier', foreground: 'F8FAFC' },
      ],
      colors: {
        'editor.background': '#0B0F19',
        'editor.lineHighlightBackground': '#131B2E',
        'editorCursor.foreground': '#00F0FF',
        'editorLineNumber.foreground': '#334155',
        'editorLineNumber.activeForeground': '#00F0FF',
        'editor.selectionBackground': '#1E293B',
        'editorWidget.background': '#0B0F19',
      },
    });
  };

  if (loading || !problem) return <Loader text="Initializing Monaco Code Arena..." />;

  const handleRunCode = () => {
    setIsRunning(true);
    soundEffects.playClick(soundEnabled);
    setTimeout(() => {
      const result = runPythonCode(code, problem.testCases);
      setSubmissionResult(result);
      setIsRunning(false);
      if (result.passed) {
        soundEffects.playSuccess(soundEnabled);
      } else {
        soundEffects.playError(soundEnabled);
      }
    }, 400);
  };

  const handleSubmitCode = () => {
    const result = runPythonCode(code, problem.testCases);
    setSubmissionResult(result);

    if (result.passed) {
      soundEffects.playSuccess(soundEnabled);
      markChallengeComplete(problem.id);

      const previousXp = user?.stats.xp || 850;
      const xpEarned = problem.xpReward;
      const coinsEarned = problem.coinReward;
      addXpAndCoins(xpEarned, coinsEarned);

      // Set summary payload for celebratory Level Complete Screen!
      setCompletedSummary({
        lessonTitle: problem.title,
        xpEarned,
        coinsEarned,
        stars: 3,
        previousXp,
        newXp: previousXp + xpEarned,
        previousRank: user?.rank || 'Bronze',
        newRank: user?.rank || 'Bronze',
        timeSpentSeconds: 120,
      });

      setTimeout(() => navigate('/level-complete'), 500);
    } else {
      soundEffects.playError(soundEnabled);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
      {/* Left Column: Problem Description & Test Cases */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <Card variant="glass" className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge text={problem.difficulty} variant="difficulty" size="sm" />
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                +{problem.xpReward} XP
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-100">{problem.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{problem.description}</p>

            {/* Hint Button & Hint Display */}
            <div className="pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
              {showHint && (
                <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  {problem.hints[0]}
                </div>
              )}
            </div>
          </div>

          {/* Test Case Breakdown */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
              Test Cases
            </span>
            {problem.testCases.map((tc, idx) => (
              <div
                key={tc.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between"
              >
                <span className="font-mono text-slate-300">Case #{idx + 1}</span>
                <span className="font-mono text-cyan-300">Expected: "{tc.expectedOutput}"</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column: Monaco Editor & Console Output */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        {/* Monaco Editor Container */}
        <Card variant="glass" className="p-0 overflow-hidden border-slate-700/60 flex-1 flex flex-col">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-200">main.py</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Python 3.11</span>
          </div>

          <div className="h-72 sm:h-80 w-full">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="py-spark-dark"
              beforeMount={handleEditorBeforeMount}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12 },
              }}
            />
          </div>

          {/* Editor Action Buttons */}
          <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              isLoading={isRunning}
              onClick={handleRunCode}
              leftIcon={<Play className="w-4 h-4" />}
            >
              Run Code
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitCode}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Solution
            </Button>
          </div>
        </Card>

        {/* Console Output Log */}
        <Card variant="solid" className="p-4 font-mono text-xs text-slate-200 min-h-[120px]">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-slate-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Console Execution Log</span>
          </div>
          {submissionResult ? (
            <div className="space-y-1">
              <pre className="text-cyan-300 font-mono whitespace-pre-wrap">
                {submissionResult.consoleOutput}
              </pre>
              {submissionResult.passed ? (
                <p className="text-emerald-400 font-bold flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-4 h-4" /> Passed all test cases!
                </p>
              ) : (
                <p className="text-rose-400 font-bold flex items-center gap-1 mt-2">
                  <XCircle className="w-4 h-4" /> Tests failed. Check output above.
                </p>
              )}
            </div>
          ) : (
            <p className="text-slate-500 italic">Click "Run Code" or "Submit Solution" to inspect console logs.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
