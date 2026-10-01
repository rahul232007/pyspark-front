import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, CheckCircle, XCircle, Zap, ArrowRight, HelpCircle } from 'lucide-react';
import { lessonService } from '../../services/lesson';
import { Quiz, QuizQuestion, QuizOption } from '../../types/quiz';
import { useAuthStore } from '../../store/useAuthStore';
import { soundEffects } from '../../utils/sound';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Loader } from '../../components/common/Loader/Loader';

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const soundEnabled = useAuthStore((s) => s.settings.soundEnabled);
  const markQuizComplete = useAuthStore((s) => s.markQuizComplete);
  const addXpAndCoins = useAuthStore((s) => s.addXpAndCoins);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizId) {
      lessonService.getQuizById(quizId).then((res) => {
        setQuiz(res);
        setTimeLeft(res?.timeLimitSeconds || 180);
        setLoading(false);
      });
    }
  }, [quizId]);

  // Countdown timer effect
  useEffect(() => {
    if (!quiz || isAnswerSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz, isAnswerSubmitted]);

  if (loading || !quiz) return <Loader text="Preparing 5-MCQ Quiz Trial..." />;

  const currentQ: QuizQuestion = quiz.questions[currentQIdx] || quiz.questions[0];
  const isLastQuestion = currentQIdx === quiz.questions.length - 1;

  const handleSelectOption = (option: QuizOption) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(option.id);

    // Immediately evaluate answer on choice click for instant feedback
    const isCorrect = option.isCorrect ?? false;
    if (isCorrect) {
      soundEffects.playSuccess(soundEnabled);
      setScore((prev) => prev + 1);
    } else {
      soundEffects.playError(soundEnabled);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      if (quiz?.id) {
        markQuizComplete(quiz.id);
      }
      
      const xpEarned = quiz?.totalXpReward || 100;
      const coinsEarned = quiz?.coinReward || 20;
      const previousXp = user?.stats.xp || 850;
      
      addXpAndCoins(xpEarned, coinsEarned);

      // Set summary payload for celebratory Level Complete Screen!
      useGameStore.getState().setCompletedSummary({
        lessonTitle: quiz?.title || 'Python Level Complete',
        xpEarned,
        coinsEarned,
        stars: score >= 4 ? 3 : score >= 2 ? 2 : 1,
        previousXp,
        newXp: previousXp + xpEarned,
        previousRank: user?.rank || 'Bronze',
        newRank: user?.rank || 'Bronze',
        timeSpentSeconds: 180 - timeLeft,
      });

      navigate('/level-complete');
    } else {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setCurrentQIdx((prev) => prev + 1);
    }
  };

  const handleButtonClick = () => {
    soundEffects.playClick(soundEnabled);
    if (!isAnswerSubmitted) {
      const optToSelect = currentQ.options.find((o) => o.id === selectedOptionId) || currentQ.options[0];
      const isCorrect = optToSelect.isCorrect ?? false;
      if (isCorrect) {
        soundEffects.playSuccess(soundEnabled);
        setScore((prev) => prev + 1);
      } else {
        soundEffects.playError(soundEnabled);
      }
      setSelectedOptionId(optToSelect.id);
      setIsAnswerSubmitted(true);
      return;
    }
    handleNextQuestion();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header & Timer */}
      <div className="flex items-center justify-between glass-card p-4 sm:p-6 rounded-3xl">
        <div>
          <h1 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span>{quiz.title}</span>
          </h1>
          <p className="text-xs text-slate-400">
            Question {currentQIdx + 1} of {quiz.questions.length}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-sm font-bold">
          <Timer className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <ProgressBar
        value={currentQIdx + 1}
        max={quiz.questions.length}
        color="purple"
        size="sm"
      />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card variant="glass" className="p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h3>

            {/* Code Snippet if applicable */}
            {currentQ.codeSnippet && (
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* MCQ Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optStyle = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200';

                if (isAnswerSubmitted) {
                  if (opt.isCorrect) {
                    optStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'bg-rose-500/20 border-rose-400 text-rose-200';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.3)]';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                  >
                    <span className="text-sm font-semibold">{opt.text}</span>
                    {isAnswerSubmitted && opt.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    )}
                    {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submitting */}
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-slate-300 space-y-1"
              >
                <span className="font-bold text-cyan-300 block">Explanation:</span>
                <p>{currentQ.options.find((o) => o.id === selectedOptionId)?.explanation}</p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex justify-end pt-2">
        <Button
          variant={isLastQuestion ? 'gold' : 'purple'}
          size="lg"
          onClick={handleButtonClick}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isLastQuestion ? 'Complete Level & Claim Rewards' : isAnswerSubmitted ? 'Next Question' : 'Submit & Next'}
        </Button>
      </div>
    </div>
  );
};
