import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { lessonService } from '../../services/lesson';
import { Lesson, LessonStep } from '../../types/lesson';
import { useGameStore } from '../../store/useGameStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Loader } from '../../components/common/Loader/Loader';
import { Badge } from '../../components/common/Badge/Badge';

export const LessonPage: React.FC = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const navigate = useNavigate();
  const markLessonComplete = useAuthStore((s) => s.markLessonComplete);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topicId && lessonId) {
      lessonService.getLessonById(topicId, lessonId).then((res) => {
        setLesson(res);
        setLoading(false);
      });
    }
  }, [topicId, lessonId]);

  if (loading || !lesson) return <Loader text="Loading Lesson Scroll..." />;

  const currentStep: LessonStep = lesson.steps[currentStepIdx] || lesson.steps[0];
  const isLastStep = currentStepIdx === lesson.steps.length - 1;

  const handleNextStep = () => {
    if (isLastStep) {
      markLessonComplete(lesson.id);
      navigate(`/quiz/${lesson.quizId}`);
    } else {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Lesson Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge text={lesson.difficulty} variant="difficulty" size="sm" />
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              +{lesson.xpReward} XP Reward
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{lesson.title}</h1>
          <p className="text-xs text-slate-400">{lesson.subtitle}</p>
        </div>

        {/* Step Progress Counter */}
        <div className="w-full sm:w-48">
          <ProgressBar
            value={currentStepIdx + 1}
            max={lesson.steps.length}
            label={`Step ${currentStepIdx + 1} of ${lesson.steps.length}`}
            color="purple"
            size="sm"
          />
        </div>
      </div>

      {/* Main Interactive Step Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="glass" className="p-6 sm:p-8 space-y-6 border-slate-700/60">
            <h2 className="text-xl font-extrabold text-cyan-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{currentStep.title}</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {currentStep.content}
            </p>

            {/* Code Example View */}
            {currentStep.codeExample && (
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {currentStep.codeExample.title}
                </span>
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-sm text-cyan-300 overflow-x-auto shadow-inner">
                  <pre>{currentStep.codeExample.code}</pre>
                </div>
                <p className="text-xs text-slate-400 italic">
                  💡 {currentStep.codeExample.explanation}
                </p>
              </div>
            )}

            {/* Tip Box */}
            {currentStep.tip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 font-medium">{currentStep.tip}</p>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          disabled={currentStepIdx === 0}
          onClick={handlePrevStep}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <Button
          variant={isLastStep ? 'gold' : 'primary'}
          onClick={handleNextStep}
          rightIcon={isLastStep ? <HelpCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        >
          {isLastStep ? 'Start 5-MCQ Quiz' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};
