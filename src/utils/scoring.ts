import { AssessmentResponse, AssessmentResult, WISCARScore } from '@/types/assessment';
import { allQuestions } from '@/data/questions';

export function calculateAssessmentResult(responses: AssessmentResponse[]): AssessmentResult {
  const psychometricScore = calculatePsychometricFit(responses);
  const technicalScore = calculateTechnicalReadiness(responses);
  const wiscarScores = calculateWISCARScores(responses);
  
  const overallScore = (psychometricScore * 0.4 + technicalScore * 0.3 + getWISCARAverage(wiscarScores) * 0.3);
  
  const recommendation = getRecommendation(psychometricScore, technicalScore, overallScore);
  const reasoning = generateReasoning(psychometricScore, technicalScore, wiscarScores, recommendation);
  const nextSteps = generateNextSteps(recommendation, psychometricScore, technicalScore);
  const skillGaps = generateSkillGaps(responses);
  const confidenceScore = calculateConfidenceScore(psychometricScore, technicalScore, wiscarScores);

  return {
    psychometricFit: Math.round(psychometricScore),
    technicalReadiness: Math.round(technicalScore),
    wiscarScores,
    overallScore: Math.round(overallScore),
    recommendation,
    reasoning,
    nextSteps,
    skillGaps,
    confidenceScore: Math.round(confidenceScore)
  };
}

function calculatePsychometricFit(responses: AssessmentResponse[]): number {
  const psychometricResponses = responses.filter(r => {
    const question = allQuestions.find(q => q.id === r.questionId);
    return question?.category === 'psychometric';
  });

  if (psychometricResponses.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  psychometricResponses.forEach(response => {
    const question = allQuestions.find(q => q.id === response.questionId);
    if (question && typeof response.value === 'number') {
      const normalizedScore = ((response.value - 1) / 4) * 100; // Convert 1-5 scale to 0-100
      totalScore += normalizedScore * (question.weight || 1);
      totalWeight += (question.weight || 1);
    }
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

function calculateTechnicalReadiness(responses: AssessmentResponse[]): number {
  const technicalResponses = responses.filter(r => {
    const question = allQuestions.find(q => q.id === r.questionId);
    return question?.category === 'technical';
  });

  if (technicalResponses.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  technicalResponses.forEach(response => {
    const question = allQuestions.find(q => q.id === response.questionId);
    if (question) {
      let score = 0;
      
      if (question.type === 'multiple-choice') {
        // Correct answers get full points
        const correctAnswers = ['Vendor contract and security questionnaire', 'Regulatory fines and reputational damage', 
                               'Data collection → Analysis → Documentation → Review → Submission', 'Data protection and privacy rights',
                               'Document the incident and assess severity'];
        score = correctAnswers.includes(response.value as string) ? 100 : 0;
      } else if (question.type === 'likert' && typeof response.value === 'number') {
        score = ((response.value - 1) / 4) * 100;
      }

      totalScore += score * (question.weight || 1);
      totalWeight += (question.weight || 1);
    }
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

function calculateWISCARScores(responses: AssessmentResponse[]): WISCARScore {
  const wiscarResponses = responses.filter(r => {
    const question = allQuestions.find(q => q.id === r.questionId);
    return question?.category === 'wiscar';
  });

  const scores: WISCARScore = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };

  const subcategoryScores: { [key: string]: number[] } = {};

  wiscarResponses.forEach(response => {
    const question = allQuestions.find(q => q.id === response.questionId);
    if (question?.subcategory) {
      let score = 0;
      
      if (question.type === 'likert' && typeof response.value === 'number') {
        score = ((response.value - 1) / 4) * 100;
      } else if (question.type === 'scenario') {
        // Correct scenario answers
        const correctAnswers = ['Cross-reference with source documents to verify accuracy', 
                               'Explain the importance of compliance and suggest alternative solutions'];
        score = correctAnswers.includes(response.value as string) ? 100 : 0;
      }

      if (!subcategoryScores[question.subcategory]) {
        subcategoryScores[question.subcategory] = [];
      }
      subcategoryScores[question.subcategory].push(score);
    }
  });

  // Average scores by subcategory
  Object.keys(subcategoryScores).forEach(subcategory => {
    const avg = subcategoryScores[subcategory].reduce((a, b) => a + b, 0) / subcategoryScores[subcategory].length;
    
    switch (subcategory) {
      case 'will':
        scores.will = Math.round(avg);
        break;
      case 'interest':
        scores.interest = Math.round(avg);
        break;
      case 'skill':
        scores.skill = Math.round(avg);
        break;
      case 'cognitive':
        scores.cognitive = Math.round(avg);
        break;
      case 'ability':
        scores.ability = Math.round(avg);
        break;
      case 'realWorld':
        scores.realWorld = Math.round(avg);
        break;
    }
  });

  return scores;
}

function getWISCARAverage(scores: WISCARScore): number {
  const values = Object.values(scores);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function getRecommendation(psychometric: number, technical: number, overall: number): 'yes' | 'maybe' | 'no' {
  if (psychometric >= 70 && technical >= 70 && overall >= 75) return 'yes';
  if (psychometric >= 50 && technical >= 50 && overall >= 60) return 'maybe';
  return 'no';
}

function generateReasoning(psychometric: number, technical: number, wiscar: WISCARScore, recommendation: string): string {
  if (recommendation === 'yes') {
    return `You demonstrate strong alignment with compliance tracking work. Your high psychological fit (${Math.round(psychometric)}%) and technical readiness (${Math.round(technical)}%) indicate excellent potential for success in this field.`;
  } else if (recommendation === 'maybe') {
    return `You show moderate potential for compliance tracking. While you have some strong areas, there are opportunities for improvement in ${psychometric < 60 ? 'psychological fit' : 'technical skills'} that would enhance your success.`;
  } else {
    return `Based on your assessment results, compliance tracking may not be the optimal career path for you. Consider exploring alternative roles that better match your strengths and interests.`;
  }
}

function generateNextSteps(recommendation: string, psychometric: number, technical: number): string[] {
  if (recommendation === 'yes') {
    return [
      'Apply for entry-level compliance positions',
      'Pursue compliance certifications (CISA, CAMS)',
      'Gain hands-on experience with compliance software',
      'Network with compliance professionals'
    ];
  } else if (recommendation === 'maybe') {
    const steps = ['Strengthen foundational knowledge in regulatory frameworks'];
    if (psychometric < 60) {
      steps.push('Develop attention to detail through structured practice');
      steps.push('Consider personality development coaching');
    }
    if (technical < 60) {
      steps.push('Complete compliance training courses');
      steps.push('Practice with compliance management tools');
    }
    return steps;
  } else {
    return [
      'Explore alternative careers: Audit Assistant, Quality Analyst',
      'Consider project management or business analysis roles',
      'Assess other career options through additional testing',
      'Speak with a career counselor'
    ];
  }
}

function generateSkillGaps(responses: AssessmentResponse[]): { skill: string; required: number; current: number }[] {
  return [
    { skill: 'Document Control', required: 90, current: 65 },
    { skill: 'Compliance Systems', required: 80, current: 45 },
    { skill: 'Analytical Reasoning', required: 85, current: 75 },
    { skill: 'Policy Interpretation', required: 75, current: 50 }
  ];
}

function calculateConfidenceScore(psychometric: number, technical: number, wiscar: WISCARScore): number {
  const wiscarAvg = getWISCARAverage(wiscar);
  const variance = Math.abs(psychometric - technical) + Math.abs(psychometric - wiscarAvg) + Math.abs(technical - wiscarAvg);
  
  // Higher variance means lower confidence
  const baseConfidence = (psychometric + technical + wiscarAvg) / 3;
  const confidenceAdjustment = Math.max(0, 100 - variance);
  
  return (baseConfidence + confidenceAdjustment) / 2;
}