import type { Question } from '../types';

export const questions: Question[] = [
  // 주도성 (Dominance)
  { id: 1, text: "모임에서 자연스럽게 리더 역할을 맡게 된다.", dimension: "dominance" },
  { id: 2, text: "다른 사람에게 지시하거나 방향을 제시하는 것이 편하다.", dimension: "dominance" },
  { id: 3, text: "중요한 결정을 내릴 때 주저하지 않는다.", dimension: "dominance" },

  // 사교성 (Gregariousness)
  { id: 4, text: "새로운 사람을 만나는 것이 즐겁고 에너지를 얻는다.", dimension: "gregariousness" },
  { id: 5, text: "파티나 모임에서 적극적으로 대화에 참여한다.", dimension: "gregariousness" },

  // 따뜻함 (Warmth)
  { id: 6, text: "다른 사람의 감정에 쉽게 공감하고 위로할 수 있다.", dimension: "warmth" },
  { id: 7, text: "주변 사람들에게 먼저 다가가서 안부를 묻는다.", dimension: "warmth" },
  { id: 8, text: "누군가 어려움에 처하면 즉시 도와주고 싶은 마음이 든다.", dimension: "warmth" },

  // 겸손함 (Submissiveness)
  { id: 9, text: "갈등 상황에서 양보하는 편이다.", dimension: "submissiveness" },
  { id: 10, text: "다른 사람의 의견을 내 의견보다 우선시할 때가 많다.", dimension: "submissiveness" },

  // 내향성 (Introversion)
  { id: 11, text: "혼자만의 시간이 반드시 필요하다.", dimension: "introversion" },
  { id: 12, text: "소규모 모임이나 1:1 만남을 선호한다.", dimension: "introversion" },
  { id: 13, text: "깊은 생각에 빠지는 시간을 즐긴다.", dimension: "introversion" },

  // 냉담함 (Coldness)
  { id: 14, text: "감정보다 논리와 이성으로 판단하는 편이다.", dimension: "coldness" },
  { id: 15, text: "불필요한 사교적 관계에 에너지를 쓰고 싶지 않다.", dimension: "coldness" },

  // 자기주장 (Assertiveness)
  { id: 16, text: "내 권리나 의견이 무시당하면 반드시 말한다.", dimension: "assertiveness" },
  { id: 17, text: "부당한 상황에서 목소리를 높이는 것을 두려워하지 않는다.", dimension: "assertiveness" },

  // 배려심 (Agreeableness)
  { id: 18, text: "상대방의 기분을 상하게 하지 않으려고 항상 노력한다.", dimension: "agreeableness" },
  { id: 19, text: "팀 프로젝트에서 협력과 조화를 가장 중요하게 생각한다.", dimension: "agreeableness" },
  { id: 20, text: "다른 사람의 장점을 쉽게 발견하고 칭찬한다.", dimension: "agreeableness" },
];

export const dimensionLabels: Record<string, string> = {
  dominance: "주도성",
  gregariousness: "사교성",
  warmth: "따뜻함",
  submissiveness: "겸손함",
  introversion: "내향성",
  coldness: "냉담함",
  assertiveness: "자기주장",
  agreeableness: "배려심",
};

export const scoreLabels = [
  "",
  "전혀 아니다",
  "아니다",
  "보통이다",
  "그렇다",
  "매우 그렇다",
];
