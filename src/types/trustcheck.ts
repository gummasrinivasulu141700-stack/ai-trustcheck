export type ClaimStatus = 'verified' | 'questionable' | 'hallucination' | 'opinion' | 'unverified';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type IssueSeverity = 'info' | 'warning' | 'danger';

export interface SentenceClaim {
  id: string;
  text: string;
  status: ClaimStatus;
  confidence: number;
  riskLevel: RiskLevel;
  explanation: string;
  uncertaintyExplanation?: string;
  suggestedCorrection?: string;
  sourcesOrEvidence?: string[];
}

export interface FlaggedIssue {
  type: string;
  severity: IssueSeverity;
  description: string;
  recommendation: string;
}

export interface MetricBreakdown {
  factualAccuracy: number;
  citationIntegrity: number;
  confidenceCalibration: number;
  biasAndNeutrality: number;
  reasoningValidity: number;
}

export interface VerifiedSource {
  title: string;
  url?: string;
  relevance: string;
}

export interface AnalysisResult {
  trustScore: number;
  verdict: string;
  summary: string;
  metrics: MetricBreakdown;
  sentences: SentenceClaim[];
  flaggedIssues: FlaggedIssue[];
  verifiedSources?: VerifiedSource[];
  improvedVersion: string;
  engine?: string;
  isLiveAiModel?: boolean;
  verificationMethod?: string;
  auditedAt?: string;
  note?: string;
}

export interface PresetExample {
  id: string;
  title: string;
  category: string;
  domain: string;
  prompt: string;
  aiResponse: string;
  expectedIssue: string;
  trustProfile: 'high' | 'medium' | 'low';
}
