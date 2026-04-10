import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-md mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
        >
          <span className="text-3xl">&#x1F9E0;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3"
        >
          WONONO LABS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-2"
        >
          <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-snug">
            &#xC6B0;&#xB178;&#xB178; &#xC5F0;&#xAD6C;&#xC18C;
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-bold text-white mb-4"
        >
          &#xC2EC;&#xB9AC; &#xC720;&#xD615; AI &#xBD84;&#xC11D;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed"
        >
          IPC &#xB300;&#xC778;&#xAD00;&#xACC4; &#xC2EC;&#xB9AC; &#xBAA8;&#xB378; &#xAE30;&#xBC18;&#xC73C;&#xB85C;
          <br />
          AI&#xAC00; &#xB2F9;&#xC2E0;&#xC758; &#xC131;&#xACA9;&#xACFC; &#xC5F0;&#xC560; &#xC2A4;&#xD0C0;&#xC77C;&#xC744; &#xBD84;&#xC11D;&#xD569;&#xB2C8;&#xB2E4;
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full max-w-xs mx-auto block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold
                     py-3.5 px-8 rounded-xl text-base
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                     transition-all duration-300 cursor-pointer"
        >
          &#xBD84;&#xC11D; &#xC2DC;&#xC791;&#xD558;&#xAE30;
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-6 flex items-center justify-center gap-5 text-gray-500 text-xs"
        >
          <span className="flex items-center gap-1">
            &#x23F1; &#xC57D; 3&#xBD84;
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span className="flex items-center gap-1">
            &#x1F4CA; 20&#xBB38;&#xD56D;
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span className="flex items-center gap-1">
            &#x1F916; AI &#xBD84;&#xC11D;
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
