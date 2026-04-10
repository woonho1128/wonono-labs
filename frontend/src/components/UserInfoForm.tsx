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
    <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-300 mb-6 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>&#x2190;</span> 뒤로가기
        </button>

        <div className="bg-gradient-card rounded-3xl p-8 glow-box">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-button flex items-center justify-center">
            <span className="text-2xl">&#x270D;&#xFE0F;</span>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">기본 정보 입력</h2>
          <p className="text-gray-400 text-center mb-8">분석을 위해 간단한 정보를 입력해주세요</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500
                           focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">나이</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="나이를 입력하세요"
                min={1}
                max={100}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500
                           focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all cursor-pointer
                ${isValid
                  ? 'bg-gradient-button text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              테스트 시작 &#x2192;
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
