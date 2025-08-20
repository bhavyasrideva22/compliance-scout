export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricFit: number;
  technicalReadiness: number;
  wiscarScores: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  reasoning: string;
  nextSteps: string[];
  skillGaps: { skill: string; required: number; current: number }[];
  confidenceScore: number;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  startTime: Date;
  sectionStartTime: Date;
}