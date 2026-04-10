import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question, Answer } from '../types';
import { questions, scoreLabels } from '../data/questions';
import TestProgress from './TestProgress';

interface Props {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

const scoreColors = ['', 'from-red-500 to-orange-500', 'from-orange-400 to-yellow-400', 'from-yellow-400 to-green-400', 'from-green-400 to-emerald-500', 'from-emerald-500 to-cyan-500'];

export default function TestQuestion({ onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const safeIndex = Math.min(currentIndex, questions.length - 1);
  const currentQuestion: Question = questions[safeIndex];
  const isLastQuestion = safeIndex === questions.length - 1;

  const handleSelectScore = (score: number) => {
    if (selectedScore !== null) return;
    setSelectedScore(score);

    setTimeout(() => {
      const newAnswer: Answer = {
        question_id: currentQuestion.id,
        score,
      };

      const updatedAnswers = [...answers, newAnswer];

      if (isLastQuestion) {
        onComplete(updatedAnswers);
      } else {
        setAnswers(updatedAnswers);
        setCurrentIndex((prev) => {
          const next = prev + 1;
          return next < questions.length ? next : prev;
        });
        setSelectedScore(null);
      }
    }, 300);
  };

  const handleGoBack = () => {
    if (currentIndex === 0) {
      onBack();
    } else {
      setCurrentIndex((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
      setSelectedScore(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />

      <div className="w-full max-w-lg mx-auto z-10">
        <button
          onClick={handleGoBack}
          className="text-gray-500 hover:text-gray-300 mb-3 flex items-center gap-2 transition-colors cursor-pointer text-sm md:text-base"
        >
          &#x2190; {currentIndex === 0 ? '\uB4A4\uB85C\uAC00\uAE30' : '\uC774\uC804 \uC9C8\uBB38'}
        </button>

        <TestProgress current={currentIndex + 1} total={questions.length} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-6 md:p-10 bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/30"
          >
            <div className="text-center mb-6 md:mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs md:text-sm font-medium mb-4">
                Q{currentIndex + 1}
              </span>
              <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-white">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleSelectScore(score)}
                  className={`w-full py-4 md:py-5 px-5 md:px-6 rounded-xl text-left flex items-center gap-4 transition-all duration-200 cursor-pointer
                    ${selectedScore === score
                      ? `bg-gradient-to-r ${scoreColors[score]} text-white shadow-lg`
                      : 'bg-[#0d0d20] border border-purple-500/10 hover:border-purple-500/30 hover:bg-[#1a1a3a] text-gray-300'
                    }`}
                >
                  <span className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-sm md:text-base font-bold shrink-0
                    ${selectedScore === score
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-500/10 text-purple-400'
                    }`}>
                    {score}
                  </span>
                  <span className="text-sm md:text-base font-medium">{scoreLabels[score]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
