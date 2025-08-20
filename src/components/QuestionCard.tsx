import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/assessment';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  sectionTitle: string;
}

export function QuestionCard({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer, 
  onNext,
  sectionTitle 
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedValue(value);
    
    if (question.type === 'likert') {
      onAnswer(parseInt(value));
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      onAnswer(question.options?.[parseInt(value)] || '');
    }
  };

  const handleNext = () => {
    if (selectedValue) {
      onNext();
      setSelectedValue(''); // Reset for next question
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{sectionTitle}</span>
          <span>{currentIndex + 1} of {totalQuestions}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-wider">
            Question {currentIndex + 1}
          </CardDescription>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.type === 'likert' && question.scale && (
            <RadioGroup value={selectedValue} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {question.scale.labels.map((label, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={String(index + 1)} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-sm cursor-pointer flex-1">
                      <span className="font-medium">{index + 1}.</span> {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {(question.type === 'multiple-choice' || question.type === 'scenario') && question.options && (
            <RadioGroup value={selectedValue} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <RadioGroupItem value={String(index)} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="text-sm cursor-pointer flex-1 leading-relaxed">
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext} 
              disabled={!selectedValue}
              className="px-8"
            >
              {currentIndex + 1 === totalQuestions ? 'Complete Section' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Context */}
      {question.subcategory && (
        <div className="text-center">
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Evaluating: {question.subcategory.replace('_', ' ')}
          </span>
        </div>
      )}
    </div>
  );
}