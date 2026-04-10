import { useState } from 'react';
import { motion } from 'framer-motion';
import type { UserInfo } from '../types';

interface Props {
  onSubmit: (info: UserInfo) => void;
  onBack: () => void;
}

export default function UserInfoForm({ onSubmit, onBack }: Props) {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && age) {
      onSubmit({ nickname: nickname.trim(), age: parseInt(age) });
    }
  };

  const isValid = nickname.trim().length > 0 && parseInt(age) > 0;

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto z-10"
      >
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-300 mb-4 flex items-center gap-2 transition-colors cursor-pointer text-sm md:text-base"
        >
          &#x2190; &#xB4A4;&#xB85C;&#xAC00;&#xAE30;
        </button>

        <div className="rounded-3xl p-8 md:p-10 bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/30">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-2xl md:text-3xl">&#x270D;&#xFE0F;</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">&#xAE30;&#xBCF8; &#xC815;&#xBCF4; &#xC785;&#xB825;</h2>
          <p className="text-gray-400 text-center mb-8 text-sm md:text-base">&#xBD84;&#xC11D;&#xC744; &#xC704;&#xD574; &#xAC04;&#xB2E8;&#xD55C; &#xC815;&#xBCF4;&#xB97C; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">&#xB2C9;&#xB124;&#xC784;</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="&#xB2C9;&#xB124;&#xC784;&#xC744; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;"
                maxLength={20}
                className="w-full px-5 py-4 rounded-xl bg-[#0d0d20] border border-purple-500/20 text-white placeholder-gray-600
                           text-base focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">&#xB098;&#xC774;</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="&#xB098;&#xC774;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;"
                min={1}
                max={100}
                className="w-full px-5 py-4 rounded-xl bg-[#0d0d20] border border-purple-500/20 text-white placeholder-gray-600
                           text-base focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all"
              />
            </div>

            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-semibold text-base md:text-lg transition-all cursor-pointer mt-2
                ${isValid
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
            >
              &#xD14C;&#xC2A4;&#xD2B8; &#xC2DC;&#xC791; &#x2192;
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
