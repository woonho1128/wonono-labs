import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-pink-500/8 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="z-10 w-full max-w-2xl mx-auto"
      >
        {/* Main Card */}
        <div className="rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">

          {/* Top area */}
          <div className="relative px-6 md:px-14 pt-12 md:pt-16 pb-8 md:pb-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none" />

            {/* Brain icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10 flex justify-center mb-6 md:mb-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-4xl md:text-5xl">&#x1F9E0;</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative z-10 text-4xl md:text-6xl font-extrabold text-white mb-3 md:mb-4 tracking-tight"
            >
              &#xC6B0;&#xB178;&#xB178; &#xC5F0;&#xAD6C;&#xC18C;
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 text-gray-400 text-lg md:text-xl"
            >
              AI&#xAC00; &#xBD84;&#xC11D;&#xD558;&#xB294; &#xB098;&#xC758; &#xC2EC;&#xB9AC; &#xC720;&#xD615;
            </motion.p>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="px-6 md:px-14 pb-4"
          >
            <div className="flex justify-center items-end gap-4 md:gap-8 py-4 md:py-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center text-2xl md:text-4xl">
                  &#x1F9D1;&#x200D;&#x1F4BB;
                </div>
                <div className="mt-2 px-2.5 py-0.5 md:px-4 md:py-1 rounded-full bg-pink-500/15 border border-pink-500/20">
                  <span className="text-[10px] md:text-sm text-pink-300 font-semibold">ENFP</span>
                </div>
              </div>
              <div className="flex flex-col items-center -mt-3 md:-mt-5">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-3xl md:text-5xl">
                  &#x1F9E0;
                </div>
                <div className="mt-2 px-2.5 py-0.5 md:px-4 md:py-1 rounded-full bg-purple-500/15 border border-purple-500/20">
                  <span className="text-[10px] md:text-sm text-purple-300 font-semibold">IPC</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-2xl md:text-4xl">
                  &#x1F46B;
                </div>
                <div className="mt-2 px-2.5 py-0.5 md:px-4 md:py-1 rounded-full bg-blue-500/15 border border-blue-500/20">
                  <span className="text-[10px] md:text-sm text-blue-300 font-semibold">ISFJ</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <div className="px-6 md:px-14 pb-6 md:pb-8">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="w-full py-4 md:py-5 rounded-2xl text-white font-bold text-lg md:text-xl
                         bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600
                         shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
                         transition-all duration-300 cursor-pointer"
            >
              &#xB098;&#xC758; &#xC720;&#xD615; &#xC54C;&#xC544;&#xBCF4;&#xAE30;
            </motion.button>
          </div>

          {/* Bottom badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-6 md:px-14 pb-8 md:pb-10"
          >
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <span className="text-sm md:text-base">&#x23F1;</span>
                <span className="text-xs md:text-sm text-gray-400">5&#xBD84;&#xC774;&#xBA74; &#xC644;&#xB8CC;</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <span className="text-sm md:text-base">&#x1F916;</span>
                <span className="text-xs md:text-sm text-gray-400">&#xBB34;&#xB8CC; &#xBD84;&#xC11D;</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <span className="text-sm md:text-base">&#x1F512;</span>
                <span className="text-xs md:text-sm text-gray-400">&#xC775;&#xBA85; &#xBCF4;&#xC7A5;</span>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-gray-600 text-[10px] md:text-xs mt-4 tracking-wide">
          WONONO LABS &middot; Powered by AI
        </p>
      </motion.div>
    </div>
  );
}
