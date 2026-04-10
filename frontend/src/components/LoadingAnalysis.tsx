import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const loadingMessages = [
  "AI가 응답 패턴을 분석하고 있습니다...",
  "대인관계 유형을 파악하고 있습니다...",
  "성격 특성을 매핑하고 있습니다...",
  "연애 스타일을 분석하고 있습니다...",
  "맞춤형 리포트를 생성하고 있습니다...",
];

export default function LoadingAnalysis() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 8;
      });
    }, 500);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 max-w-md"
      >
        {/* Animated rings */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse-ring" />
          <div className="absolute inset-2 rounded-full border-2 border-blue-500/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-4 rounded-full border-2 border-cyan-500/20 animate-pulse-ring" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-button flex items-center justify-center animate-spin-slow">
              <span className="text-3xl" style={{ animation: 'none' }}>&#x1F9E0;</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 glow-text">AI 심리 분석 중</h2>

        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-400 mb-8 h-6"
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-fill rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 90)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-3">
            {Math.round(Math.min(progress, 90))}%
          </p>
        </div>
      </motion.div>
    </div>
  );
}
