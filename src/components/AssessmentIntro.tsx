import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Users, CheckCircle } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export function AssessmentIntro({ onStartAssessment }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Compliance Tracker Career Assessment
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover if a career in compliance tracking is right for you with our comprehensive assessment tool
        </p>
      </div>

      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Assessment Overview
          </CardTitle>
          <CardDescription>
            This comprehensive evaluation determines your psychological, cognitive, and skill-based fit for compliance tracking roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What is Compliance Tracking?</h3>
              <p className="text-muted-foreground">
                Compliance tracking involves monitoring, managing, and ensuring that organizations follow industry regulations, 
                legal standards, and internal policies. It combines administrative rigor, data monitoring, risk management, 
                and procedural audits.
              </p>
              
              <h4 className="font-medium">Typical Career Paths:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Compliance Analyst</Badge>
                <Badge variant="secondary">Risk Management Associate</Badge>
                <Badge variant="secondary">Regulatory Affairs Coordinator</Badge>
                <Badge variant="secondary">Governance Officer</Badge>
                <Badge variant="secondary">Audit Assistant</Badge>
                <Badge variant="secondary">Legal Operations Specialist</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Success Predictors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">High attention to detail</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Persistence and patience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Comfort with structure and rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Strong ethical reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Analytical and documentation skills</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Structure */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Psychometric Analysis</CardTitle>
            <CardDescription>Personality and behavioral fit assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              ~8 minutes
            </div>
            <p className="text-sm mt-2">
              Evaluates conscientiousness, attention to detail, stress tolerance, and ethical reasoning
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Technical Readiness</CardTitle>
            <CardDescription>Knowledge and aptitude evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              ~10 minutes
            </div>
            <p className="text-sm mt-2">
              Tests compliance knowledge, analytical reasoning, and familiarity with regulatory frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">WISCAR Framework</CardTitle>
            <CardDescription>Comprehensive readiness analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              ~7 minutes
            </div>
            <p className="text-sm mt-2">
              Measures Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What You'll Receive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            What You'll Receive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Personalized Results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Comprehensive fit analysis (0-100 scale)</li>
                <li>• WISCAR radar chart visualization</li>
                <li>• Specific skill gap identification</li>
                <li>• Confidence score in recommendations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Career Guidance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clear Yes/Maybe/No recommendation</li>
                <li>• Personalized next steps and learning path</li>
                <li>• Alternative career suggestions if needed</li>
                <li>• Skill development roadmap</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Total time: 20-30 minutes
        </div>
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="px-8"
        >
          Start Assessment
        </Button>
        <p className="text-xs text-muted-foreground">
          Your responses are confidential and used only for generating your personalized assessment
        </p>
      </div>
    </div>
  );
}