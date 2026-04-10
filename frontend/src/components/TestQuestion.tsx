import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question, Answer } from '../types';
import { questions, scoreLabels } from '../data/questions';
import TestProgress from './TestProgress';

interface Props {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

export default function TestQuestion({ onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const safeIndex = Math.min(currentIndex, questions.length - 1);
  const currentQuestion: Question = questions[safeIndex];
  const isLastQuestion = safeIndex === questions.length - 1;

  const handleSelectScore = (score: number) => {
    if (selectedScore !== null) return; // prevent double-click
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
    <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        <button
          onClick={handleGoBack}
          className="text-gray-500 hover:text-gray-300 mb-4 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>&#x2190;</span> {currentIndex === 0 ? '뒤로가기' : '이전 질문'}
        </button>

        <TestProgress current={currentIndex + 1} total={questions.length} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-card rounded-3xl p-8 glow-box"
          >
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium mb-4">
                Q{currentIndex + 1}
              </span>
              <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleSelectScore(score)}
                  className={`score-btn w-full py-4 px-6 rounded-xl text-left flex items-center gap-4
                    border border-white/5 cursor-pointer
                    ${selectedScore === score
                      ? 'active text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                >
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                    ${selectedScore === score
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-gray-500'
                    }`}>
                    {score}
                  </span>
                  <span className="font-medium">{scoreLabels[score]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
