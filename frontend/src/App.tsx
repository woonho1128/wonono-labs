import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { AppStep, UserInfo, Answer, AnalysisResult } from './types';
import LandingPage from './components/LandingPage';
import UserInfoForm from './components/UserInfoForm';
import TestQuestion from './components/TestQuestion';
import LoadingAnalysis from './components/LoadingAnalysis';
import ResultReport from './components/ResultReport';

function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [userInfo, setUserInfo] = useState<UserInfo>({ nickname: '', age: 0 });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => setStep('userinfo');

  const handleUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    setStep('test');
  };

  const handleTestComplete = async (answers: Answer[]) => {
    setStep('loading');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: userInfo.nickname,
          age: userInfo.age,
          answers,
          model: 'gemma4',
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data: AnalysisResult = await response.json();
      setResult(data);
      setStep('result');
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback: generate local result if backend is not available
      const fallbackResult = generateFallbackResult(answers);
      setResult(fallbackResult);
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('landing');
    setUserInfo({ nickname: '', age: 0 });
    setResult(null);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 'landing' && <LandingPage key="landing" onStart={handleStart} />}
      {step === 'userinfo' && (
        <UserInfoForm
          key="userinfo"
          onSubmit={handleUserInfo}
          onBack={() => setStep('landing')}
        />
      )}
      {step === 'test' && (
        <TestQuestion
          key="test"
          onComplete={handleTestComplete}
          onBack={() => setStep('userinfo')}
        />
      )}
      {step === 'loading' && <LoadingAnalysis key="loading" />}
      {step === 'result' && result && (
        <ResultReport
          key="result"
          result={result}
          userInfo={userInfo}
          onRestart={handleRestart}
        />
      )}
    </AnimatePresence>
  );
}

// Fallback result generator when backend is unavailable
function generateFallbackResult(answers: Answer[]): AnalysisResult {
  const dimensions = ['dominance', 'gregariousness', 'warmth', 'submissiveness', 'introversion', 'coldness', 'assertiveness', 'agreeableness'];
  const questionDimMap: Record<number, string> = {
    1: 'dominance', 2: 'dominance', 3: 'dominance',
    4: 'gregariousness', 5: 'gregariousness',
    6: 'warmth', 7: 'warmth', 8: 'warmth',
    9: 'submissiveness', 10: 'submissiveness',
    11: 'introversion', 12: 'introversion', 13: 'introversion',
    14: 'coldness', 15: 'coldness',
    16: 'assertiveness', 17: 'assertiveness',
    18: 'agreeableness', 19: 'agreeableness', 20: 'agreeableness',
  };

  const dimScores: Record<string, number[]> = {};
  dimensions.forEach(d => { dimScores[d] = []; });

  answers.forEach(a => {
    const dim = questionDimMap[a.question_id];
    if (dim) dimScores[dim].push(a.score);
  });

  const scores: Record<string, number> = {};
  dimensions.forEach(d => {
    const vals = dimScores[d];
    scores[d] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
  });

  // Determine dominant type
  const topDim = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const typeMap: Record<string, { name: string; emoji: string; code: string }> = {
    dominance: { name: '카리스마 리더', emoji: '\u{1F451}', code: 'DOM' },
    gregariousness: { name: '에너지 넘치는 소셜리스트', emoji: '\u{1F389}', code: 'GRG' },
    warmth: { name: '따뜻한 공감가', emoji: '\u{1F31F}', code: 'WRM' },
    submissiveness: { name: '조화로운 중재자', emoji: '\u{1F54A}', code: 'SUB' },
    introversion: { name: '깊은 사색가', emoji: '\u{1F30C}', code: 'INT' },
    coldness: { name: '냉철한 분석가', emoji: '\u{2744}', code: 'CLD' },
    assertiveness: { name: '당당한 행동가', emoji: '\u{26A1}', code: 'AST' },
    agreeableness: { name: '부드러운 화합가', emoji: '\u{1F338}', code: 'AGR' },
  };

  const type = typeMap[topDim] || typeMap.warmth;

  return {
    personality_type: type.name,
    type_code: type.code,
    type_emoji: type.emoji,
    scores: scores as any,
    personality_description: `당신은 "${type.name}" 유형입니다. 이 유형은 대인관계에서 ${topDim === 'dominance' ? '주도적이고 결단력 있는' : topDim === 'warmth' ? '따뜻하고 배려 깊은' : topDim === 'introversion' ? '깊이 있고 사려 깊은' : '균형 잡힌'} 모습을 보입니다. 주변 사람들에게 신뢰감을 주며, 자신만의 독특한 매력을 가지고 있습니다.`,
    dating_style: `연애에서 당신은 ${topDim === 'dominance' ? '리드하는 것을 좋아하며, 확실한 표현과 행동으로 상대방에게 안정감을 줍니다.' : topDim === 'warmth' ? '상대방의 감정을 잘 이해하고 세심하게 배려합니다. 깊은 정서적 교감을 중요하게 생각합니다.' : topDim === 'introversion' ? '깊고 의미 있는 관계를 선호합니다. 천천히 신뢰를 쌓아가며, 한 번 마음을 열면 깊은 유대감을 형성합니다.' : '파트너와의 균형 잡힌 관계를 추구하며, 서로 존중하는 연애를 합니다.'}`,
    ideal_type: `당신에게 잘 맞는 이상형은 ${topDim === 'dominance' ? '자신만의 세계가 확실하면서도 당신의 리더십을 인정해주는 사람' : topDim === 'warmth' ? '진정성 있고 솔직하며, 함께 성장할 수 있는 사람' : topDim === 'introversion' ? '당신의 내면 세계를 존중하고, 조용한 시간을 함께 즐길 수 있는 사람' : '서로의 차이를 이해하고 보완해줄 수 있는 사람'}입니다.`,
    strengths: getStrengths(topDim),
    weaknesses: getWeaknesses(topDim),
    advice: `${type.name} 유형으로서 당신의 장점을 살리면서, 가끔은 다른 관점에서도 상황을 바라보는 연습을 해보세요. 대인관계에서 더욱 풍요로운 경험을 할 수 있을 것입니다.`,
  };
}

function getStrengths(dim: string): string[] {
  const map: Record<string, string[]> = {
    dominance: ['결단력이 뛰어남', '목표 지향적', '책임감이 강함'],
    gregariousness: ['사교성이 좋음', '분위기 메이커', '새로운 인연에 열림'],
    warmth: ['공감 능력이 뛰어남', '배려심이 깊음', '정서적 유대 능력'],
    submissiveness: ['협조적이고 유연함', '갈등 해결 능력', '경청 능력'],
    introversion: ['깊은 사고력', '자기 성찰 능력', '집중력이 뛰어남'],
    coldness: ['객관적 판단력', '논리적 사고', '감정에 휘둘리지 않음'],
    assertiveness: ['자기 표현이 명확함', '불의에 맞서는 용기', '자존감이 높음'],
    agreeableness: ['조화를 이루는 능력', '타인을 칭찬하는 능력', '관계 유지력'],
  };
  return map[dim] || map.warmth;
}

function getWeaknesses(dim: string): string[] {
  const map: Record<string, string[]> = {
    dominance: ['때로 독단적일 수 있음', '타인의 의견 경시 가능', '완벽주의 경향'],
    gregariousness: ['깊은 관계 유지 어려움', '혼자 있는 시간 부족', '피상적 관계 가능성'],
    warmth: ['감정 소모가 큼', '거절을 어려워함', '자기 희생 경향'],
    submissiveness: ['자기 주장이 약할 수 있음', '스트레스를 안으로 쌓음', '결정을 미룸'],
    introversion: ['사교 활동에 에너지 소모', '감정 표현이 서툴 수 있음', '고립될 위험'],
    coldness: ['감정 표현이 부족함', '공감 능력 부족 가능', '관계가 표면적일 수 있음'],
    assertiveness: ['타협이 어려울 수 있음', '갈등을 유발할 수 있음', '고집이 셀 수 있음'],
    agreeableness: ['자기 의견을 숨길 수 있음', '갈등 회피 경향', '경계 설정이 어려움'],
  };
  return map[dim] || map.warmth;
}

export default App;
