export interface UserInfo {
  nickname: string;
  age: number;
}

export interface Answer {
  question_id: number;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  dimension: IPCDimension;
}

export type IPCDimension =
  | 'dominance'
  | 'gregariousness'
  | 'warmth'
  | 'submissiveness'
  | 'introversion'
  | 'coldness'
  | 'assertiveness'
  | 'agreeableness';

export interface IPCScores {
  dominance: number;
  gregariousness: number;
  warmth: number;
  submissiveness: number;
  introversion: number;
  coldness: number;
  assertiveness: number;
  agreeableness: number;
}

export interface AnalysisResult {
  personality_type: string;
  type_code: string;
  type_emoji: string;
  scores: IPCScores;
  personality_description: string;
  dating_style: string;
  ideal_type: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
}

export interface AnalysisRequest {
  nickname: string;
  age: number;
  answers: Answer[];
  model: string;
}

export type AppStep = 'landing' | 'userinfo' | 'test' | 'loading' | 'result';
