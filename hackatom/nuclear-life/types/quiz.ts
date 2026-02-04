export interface Isotope {
  symbol: string;
  name: string;
  elementSymbol: string;
  atomicNumber: number;
  massNumber: number;
  neutrons: number;
  protons: number;
  electrons: number;
  halfLife?: string;
  decayType?: string;
  applications?: string[];
  category: 'actinide' | 'transition-metal' | 'nonmetal' | 'metalloid';
  color: string;
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'identification' | 'properties';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isotope: Isotope;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: (number | null)[];
  timeRemaining: number;
  isComplete: boolean;
  showExplanation: boolean;
}
