import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-lg"
      >
        {/* Logo / Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-button flex items-center justify-center glow-box"
        >
          <span className="text-4xl">&#x1F9E0;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4"
        >
          WONONO LABS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold mb-4 glow-text leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            우노노 연구소
          </span>
          <br />
          <span className="text-2xl md:text-3xl text-white">심리 유형 AI 분석</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg mb-10 leading-relaxed"
        >
          IPC 대인관계 심리 모델 기반으로
          <br />
          AI가 당신의 성격과 연애 스타일을 분석합니다
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-gradient-button text-white font-semibold py-4 px-12 rounded-2xl text-lg
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer"
        >
          분석 시작하기
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-sm"
        >
          <span className="flex items-center gap-1">
            <span className="text-base">&#x23F1;</span> 약 3분 소요
          </span>
          <span className="flex items-center gap-1">
            <span className="text-base">&#x1F4CA;</span> 20문항
          </span>
          <span className="flex items-center gap-1">
            <span className="text-base">&#x1F916;</span> AI 분석
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
