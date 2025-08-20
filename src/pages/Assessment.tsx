import { useState, useEffect } from 'react';
import { AssessmentIntro } from '@/components/AssessmentIntro';
import { QuestionCard } from '@/components/QuestionCard';
import { AssessmentResults } from '@/components/AssessmentResults';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';
import { calculateAssessmentResult } from '@/utils/scoring';
import { useToast } from '@/hooks/use-toast';

export default function Assessment() {
  const { toast } = useToast();
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    responses: [],
    startTime: new Date(),
    sectionStartTime: new Date()
  });

  const getCurrentQuestions = () => {
    switch (state.currentSection) {
      case 'psychometric': return psychometricQuestions;
      case 'technical': return technicalQuestions;
      case 'wiscar': return wiscarQuestions;
      default: return [];
    }
  };

  const getSectionTitle = () => {
    switch (state.currentSection) {
      case 'psychometric': return 'Psychometric Analysis';
      case 'technical': return 'Technical Assessment';
      case 'wiscar': return 'WISCAR Framework';
      default: return '';
    }
  };

  const handleStartAssessment = () => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      sectionStartTime: new Date()
    }));
    
    toast({
      title: "Assessment Started",
      description: "Good luck! Take your time with each question.",
    });
  };

  const handleAnswer = (value: number | string) => {
    const currentQuestions = getCurrentQuestions();
    const currentQuestion = currentQuestions[state.currentQuestionIndex];
    
    if (!currentQuestion) return;

    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      responses: [...prev.responses.filter(r => r.questionId !== currentQuestion.id), response]
    }));
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    const isLastQuestion = state.currentQuestionIndex === currentQuestions.length - 1;

    if (isLastQuestion) {
      // Move to next section or results
      if (state.currentSection === 'psychometric') {
        setState(prev => ({
          ...prev,
          currentSection: 'technical',
          currentQuestionIndex: 0,
          sectionStartTime: new Date()
        }));
        toast({
          title: "Section Complete",
          description: "Moving to Technical Assessment...",
        });
      } else if (state.currentSection === 'technical') {
        setState(prev => ({
          ...prev,
          currentSection: 'wiscar',
          currentQuestionIndex: 0,
          sectionStartTime: new Date()
        }));
        toast({
          title: "Section Complete", 
          description: "Moving to WISCAR Framework...",
        });
      } else if (state.currentSection === 'wiscar') {
        setState(prev => ({
          ...prev,
          currentSection: 'results'
        }));
        toast({
          title: "Assessment Complete",
          description: "Calculating your results...",
        });
      }
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handleRestart = () => {
    setState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      responses: [],
      startTime: new Date(),
      sectionStartTime: new Date()
    });
  };

  // Auto-save responses to localStorage
  useEffect(() => {
    if (state.responses.length > 0) {
      localStorage.setItem('assessmentResponses', JSON.stringify(state.responses));
    }
  }, [state.responses]);

  // Load responses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('assessmentResponses');
    if (saved) {
      try {
        const responses = JSON.parse(saved);
        setState(prev => ({ ...prev, responses }));
      } catch (error) {
        console.error('Failed to load saved responses:', error);
      }
    }
  }, []);

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (state.currentSection === 'results') {
    const result = calculateAssessmentResult(state.responses);
    return <AssessmentResults result={result} onRestart={handleRestart} />;
  }

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[state.currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-muted-foreground">Preparing your assessment</p>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      currentIndex={state.currentQuestionIndex}
      totalQuestions={currentQuestions.length}
      onAnswer={handleAnswer}
      onNext={handleNext}
      sectionTitle={getSectionTitle()}
    />
  );
}