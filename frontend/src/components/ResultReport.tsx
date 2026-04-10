import { motion } from 'framer-motion';
import type { AnalysisResult, UserInfo } from '../types';
import { dimensionLabels } from '../data/questions';
import PersonalityChart from './PersonalityChart';

interface Props {
  result: AnalysisResult;
  userInfo: UserInfo;
  onRestart: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ResultReport({ result, userInfo, onRestart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-main px-4 py-12 relative flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent" />

      <div className="w-full max-w-md mx-auto z-10 relative">
        {/* Header */}
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="text-center mb-10">
          <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-2">Analysis Complete</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
            {userInfo.nickname}님의 심리 분석
          </h1>
          <p className="text-gray-400">{userInfo.age}세</p>
        </motion.div>

        {/* Type Card */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-8 mb-6 glow-box text-center"
        >
          <div className="text-6xl mb-4">{result.type_emoji}</div>
          <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-3">
            {result.type_code}
          </div>
          <h2 className="text-2xl font-bold mb-4">{result.personality_type}</h2>
          <p className="text-gray-300 leading-relaxed">{result.personality_description}</p>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-6 mb-6 glow-box"
        >
          <h3 className="text-lg font-bold mb-4 text-center">&#x1F4CA; 심리 프로필</h3>
          <PersonalityChart scores={result.scores} />
        </motion.div>

        {/* Score Details */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-6 mb-6 glow-box"
        >
          <h3 className="text-lg font-bold mb-5">&#x1F3AF; 차원별 상세</h3>
          <div className="space-y-4">
            {Object.entries(result.scores).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300 text-sm">{dimensionLabels[key] || key}</span>
                  <span className="text-purple-400 text-sm font-medium">{value.toFixed(1)}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 5) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-5 glow-box">
            <h3 className="text-base font-bold mb-3 text-green-400">&#x2728; 강점</h3>
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 shrink-0">&#x2713;</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-5 glow-box">
            <h3 className="text-base font-bold mb-3 text-orange-400">&#x26A0; 약점</h3>
            <ul className="space-y-2">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5 shrink-0">&#x25CF;</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Dating Style */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-6 mb-6 glow-box"
        >
          <h3 className="text-lg font-bold mb-3">&#x1F495; 연애 스타일</h3>
          <p className="text-gray-300 leading-relaxed">{result.dating_style}</p>
        </motion.div>

        {/* Ideal Type */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.7 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-6 mb-6 glow-box"
        >
          <h3 className="text-lg font-bold mb-3">&#x1F49C; 이상형 분석</h3>
          <p className="text-gray-300 leading-relaxed">{result.ideal_type}</p>
        </motion.div>

        {/* Advice */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="rounded-2xl bg-[#161630]/80 border border-purple-500/15 backdrop-blur-sm shadow-xl shadow-black/20 p-6 mb-8 glow-box border-purple-500/30"
        >
          <h3 className="text-lg font-bold mb-3">&#x1F4AC; AI 조언</h3>
          <p className="text-gray-300 leading-relaxed italic">{result.advice}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() => {
              const shareText = `나의 심리 유형: ${result.personality_type} ${result.type_emoji}\n${window.location.href}`;
              if (navigator.share) {
                navigator.share({
                  title: `${userInfo.nickname}님의 심리 분석 결과`,
                  text: shareText,
                  url: window.location.href,
                }).catch(() => {});
              } else if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(shareText).then(() => {
                  alert('결과가 클립보드에 복사되었습니다!');
                });
              } else {
                // HTTP fallback
                const ta = document.createElement('textarea');
                ta.value = shareText;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                alert('결과가 클립보드에 복사되었습니다!');
              }
            }}
            className="w-full py-4 rounded-xl bg-gradient-button text-white font-semibold text-lg
                       shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer"
          >
            결과 공유하기
          </button>
          <button
            onClick={onRestart}
            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium
                       hover:bg-white/10 transition-all cursor-pointer"
          >
            다시 테스트하기
          </button>
        </motion.div>

        <p className="text-center text-gray-600 text-xs mt-8">
          우노노 연구소 | Powered by Ollama AI
        </p>
      </div>
    </div>
  );
}
