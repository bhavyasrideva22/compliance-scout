import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'p1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'conscientiousness',
    question: 'I prefer roles where processes must be followed precisely.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.2
  },
  {
    id: 'p2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'detail_orientation',
    question: 'I enjoy organizing and double-checking detailed records.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.3
  },
  {
    id: 'p3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'assertiveness',
    question: 'I feel confident confronting colleagues who are non-compliant.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.1
  },
  {
    id: 'p4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'stress_tolerance',
    question: 'I stay calm and focused when I have to verify large amounts of data.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.2
  },
  {
    id: 'p5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'persistence',
    question: 'I complete tasks even when they become repetitive or difficult.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.4
  },
  {
    id: 'p6',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'ethical_reasoning',
    question: 'I believe following rules and regulations is essential even when inconvenient.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.5
  },
  {
    id: 'p7',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'structure_preference',
    question: 'I prefer structured environments with clear guidelines over creative freedom.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.1
  },
  {
    id: 'p8',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'analytical_thinking',
    question: 'I enjoy analyzing patterns and inconsistencies in data or processes.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.3
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 't1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'documentation',
    question: 'Which document should be reviewed during a compliance audit for vendor onboarding?',
    options: [
      'Vendor contract and security questionnaire',
      'Marketing materials only',
      'Employee handbook',
      'Financial statements only'
    ],
    weight: 1.0
  },
  {
    id: 't2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'data_security',
    question: 'What does non-compliance in data security usually result in?',
    options: [
      'Regulatory fines and reputational damage',
      'Increased productivity',
      'Better customer relationships',
      'Lower operational costs'
    ],
    weight: 1.2
  },
  {
    id: 't3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'reporting',
    question: 'Choose the correct order of compliance reporting steps:',
    options: [
      'Data collection → Analysis → Documentation → Review → Submission',
      'Submission → Data collection → Analysis → Documentation',
      'Review → Submission → Data collection → Analysis',
      'Documentation → Data collection → Submission → Analysis'
    ],
    weight: 1.1
  },
  {
    id: 't4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'regulations',
    question: 'GDPR primarily focuses on:',
    options: [
      'Data protection and privacy rights',
      'Financial reporting standards',
      'Environmental compliance',
      'Workplace safety regulations'
    ],
    weight: 1.3
  },
  {
    id: 't5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'risk_assessment',
    question: 'In compliance tracking, what is the first step when a potential violation is identified?',
    options: [
      'Document the incident and assess severity',
      'Immediately report to authorities',
      'Ignore if minor',
      'Wait for additional incidents'
    ],
    weight: 1.2
  },
  {
    id: 't6',
    type: 'likert',
    category: 'technical',
    subcategory: 'systems_familiarity',
    question: 'Rate your comfort level with compliance management software and database systems.',
    scale: { min: 1, max: 5, labels: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'] },
    weight: 1.0
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'w1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am determined to succeed in compliance-related work, even if it requires extra effort.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.0
  },
  {
    id: 'i1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I am interested in jobs involving documentation and quality control.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.0
  },
  {
    id: 's1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'Rate your comfort with working inside structured systems and following detailed procedures.',
    scale: { min: 1, max: 5, labels: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'] },
    weight: 1.0
  },
  {
    id: 'c1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'You notice inconsistencies in a compliance report. What would you do first?',
    options: [
      'Cross-reference with source documents to verify accuracy',
      'Report the inconsistencies immediately without investigation',
      'Assume it\'s a minor error and ignore it',
      'Ask someone else to handle it'
    ],
    weight: 1.0
  },
  {
    id: 'a1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I see mistakes as opportunities to improve processes and prevent future issues.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.0
  },
  {
    id: 'r1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'realWorld',
    question: 'A department head asks you to overlook a minor compliance issue to meet a deadline. How do you respond?',
    options: [
      'Explain the importance of compliance and suggest alternative solutions',
      'Immediately agree to avoid conflict',
      'Report the request to higher management without discussion',
      'Compromise by partially overlooking the issue'
    ],
    weight: 1.0
  }
];

export const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];