import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Book, Target, Users } from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function AssessmentResults({ result, onRestart }: AssessmentResultsProps) {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="w-6 h-6 text-accent" />;
      case 'maybe': return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no': return <XCircle className="w-6 h-6 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'text-accent';
      case 'maybe': return 'text-warning';
      case 'no': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Your Assessment Results</h1>
        <p className="text-xl text-muted-foreground">
          Complete analysis of your fit for compliance tracking careers
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            {getRecommendationIcon(result.recommendation)}
            <span className={getRecommendationColor(result.recommendation)}>
              {result.recommendation === 'yes' ? 'Highly Recommended' : 
               result.recommendation === 'maybe' ? 'Conditionally Recommended' : 
               'Not Recommended'}
            </span>
          </CardTitle>
          <CardDescription className="text-base">
            Overall Score: <span className={`font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}%
            </span>
            {' '}• Confidence: <span className="font-bold">{result.confidenceScore}%</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{result.reasoning}</p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{result.psychometricFit}%</span>
                <Badge variant={result.psychometricFit >= 70 ? 'default' : result.psychometricFit >= 50 ? 'secondary' : 'destructive'}>
                  {result.psychometricFit >= 70 ? 'Strong' : result.psychometricFit >= 50 ? 'Moderate' : 'Weak'}
                </Badge>
              </div>
              <Progress value={result.psychometricFit} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Personality and behavioral alignment with compliance roles
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{result.technicalReadiness}%</span>
                <Badge variant={result.technicalReadiness >= 70 ? 'default' : result.technicalReadiness >= 50 ? 'secondary' : 'destructive'}>
                  {result.technicalReadiness >= 70 ? 'Ready' : result.technicalReadiness >= 50 ? 'Learning' : 'Developing'}
                </Badge>
              </div>
              <Progress value={result.technicalReadiness} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Knowledge and aptitude for compliance work
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Overall Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{result.overallScore}%</span>
                <Badge variant={result.overallScore >= 75 ? 'default' : result.overallScore >= 60 ? 'secondary' : 'destructive'}>
                  {result.overallScore >= 75 ? 'Excellent' : result.overallScore >= 60 ? 'Good' : 'Poor'}
                </Badge>
              </div>
              <Progress value={result.overallScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Combined assessment across all dimensions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
          <CardDescription>
            Comprehensive readiness evaluation across six key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(result.wiscarScores).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {key === 'realWorld' ? 'Real-World Alignment' : key}
                  </span>
                  <span className="text-sm font-bold">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Skill Gap Analysis
          </CardTitle>
          <CardDescription>
            Areas for development to enhance your compliance readiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.skillGaps.map((gap, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{gap.skill}</span>
                  <div className="text-sm text-muted-foreground">
                    Current: {gap.current}% | Required: {gap.required}%
                  </div>
                </div>
                <div className="relative">
                  <Progress value={gap.required} className="h-2 bg-muted" />
                  <Progress 
                    value={gap.current} 
                    className="h-2 absolute top-0 left-0" 
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Gap: {gap.required - gap.current} points
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>
            Personalized action plan based on your assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button onClick={onRestart} variant="outline">
          Retake Assessment
        </Button>
        <Button onClick={() => window.print()}>
          Save Results (Print)
        </Button>
      </div>
    </div>
  );
}