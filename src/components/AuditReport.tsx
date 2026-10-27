import React, { useState } from 'react';
import { AnalysisResult, SentenceClaim, ClaimStatus } from '../types/trustcheck';
import { SentenceInspectorModal } from './SentenceInspectorModal';
import { AuditCertificateModal } from './AuditCertificateModal';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Award,
  CheckCircle,
  Copy,
  ExternalLink,
  Filter,
  Check,
  Sparkles,
  Info,
  Scale,
  RotateCcw,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Cpu
} from 'lucide-react';

interface AuditReportProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AuditReport: React.FC<AuditReportProps> = ({ result, onReset }) => {
  const [selectedSentence, setSelectedSentence] = useState<SentenceClaim | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string>(
    result.sentences.length > 0 ? result.sentences[0].id : ''
  );
  const [statusFilter, setStatusFilter] = useState<'all' | ClaimStatus>('all');
  const [viewTab, setViewTab] = useState<'heatmap' | 'repaired' | 'sources' | 'critical' | 'formula'>('heatmap');
  const [showCertificate, setShowCertificate] = useState(false);
  const [copiedRepaired, setCopiedRepaired] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const activeSentence = result.sentences.find(s => s.id === activeSentenceId) || result.sentences[0];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 border-emerald-200 bg-emerald-50';
    if (score >= 60) return 'text-amber-700 border-amber-200 bg-amber-50';
    return 'text-rose-700 border-rose-200 bg-rose-50';
  };

  const getSentenceStyle = (status: ClaimStatus, isSelected: boolean, isDimmed: boolean) => {
    let base = 'transition-all duration-150 cursor-pointer rounded px-1.5 py-0.5 mx-0.5 inline leading-relaxed ';
    if (isDimmed) {
      base += 'opacity-25 grayscale hover:opacity-80 hover:grayscale-0 ';
    }
    if (isSelected) {
      base += 'ring-2 ring-blue-600 font-semibold shadow-xs ';
    }
    switch (status) {
      case 'hallucination':
        return base + 'bg-rose-50 text-rose-950 border-b-2 border-rose-500 hover:bg-rose-100';
      case 'questionable':
        return base + 'bg-amber-50 text-amber-950 border-b-2 border-amber-500 hover:bg-amber-100';
      case 'unverified':
        return base + 'bg-yellow-50 text-yellow-950 border-b-2 border-yellow-400 border-dashed hover:bg-yellow-100';
      case 'opinion':
        return base + 'bg-blue-50 text-blue-950 border-b-2 border-blue-400 hover:bg-blue-100';
      case 'verified':
      default:
        return base + 'bg-emerald-50 text-emerald-950 border-b-2 border-emerald-500/70 hover:bg-emerald-100';
    }
  };

  const filteredSentences = statusFilter === 'all'
    ? result.sentences
    : result.sentences.filter(s => s.status === statusFilter);

  const hallucinationCount = result.sentences.filter(s => s.status === 'hallucination').length;
  const questionableCount = result.sentences.filter(s => s.status === 'questionable' || s.status === 'unverified').length;
  const verifiedCount = result.sentences.filter(s => s.status === 'verified').length;

  const handleFilterChange = (filter: 'all' | ClaimStatus) => {
    setStatusFilter(filter);
    if (filter !== 'all') {
      const match = result.sentences.find(s => s.status === filter);
      if (match) {
        setActiveSentenceId(match.id);
      }
    }
  };

  const handleCopyRepaired = () => {
    navigator.clipboard.writeText(result.improvedVersion);
    setCopiedRepaired(true);
    setTimeout(() => setCopiedRepaired(false), 2000);
  };

  const handleCopySummary = () => {
    const text = `AI TrustCheck Audit Summary\nTrust Score: ${result.trustScore}/100 (${result.verdict})\nFactual Accuracy: ${result.metrics.factualAccuracy}%\nCitation Validity: ${result.metrics.citationIntegrity}%\n${result.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner: Composite Score & Executive Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Trust Score Radial Display */}
          <div className="flex items-center gap-5">
            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-3 text-center shadow-sm ${getScoreColor(result.trustScore)}`}>
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight tabular-nums">
                {result.trustScore}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                Trust Index
              </span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                {result.trustScore >= 80 ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                ) : result.trustScore >= 60 ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {result.verdict}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono border border-slate-200 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-600" />
                  <span>{result.engine || 'Gemini 3.8 Flash'}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {result.summary}
              </p>
              
              {result.verificationMethod && (
                <p className="text-[11px] text-slate-500 italic">
                  Methodology: {result.verificationMethod}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  {verifiedCount} Verified Facts
                </span>
                {questionableCount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                    {questionableCount} Questionable Claims
                  </span>
                )}
                {hallucinationCount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                    {hallucinationCount} Severe Hallucinations
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-auto">
            <button
              onClick={() => setShowCertificate(true)}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-blue-100" />
              <span>Academic Certificate</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copiedSummary ? 'Copied Summary' : 'Copy Report Summary'}</span>
            </button>

            <button
              onClick={onReset}
              className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Audit Another Text</span>
            </button>
          </div>

        </div>

        {/* 5 Epistemic Vectors Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">Factual Accuracy</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{result.metrics.factualAccuracy}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${result.metrics.factualAccuracy}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">Citation Integrity</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{result.metrics.citationIntegrity}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${result.metrics.citationIntegrity}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">Calibration</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{result.metrics.confidenceCalibration}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${result.metrics.confidenceCalibration}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">Reasoning Logic</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{result.metrics.reasoningValidity}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full transition-all duration-500"
                style={{ width: `${result.metrics.reasoningValidity}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500 text-[11px]">Neutrality/Bias</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{result.metrics.biasAndNeutrality}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-700 rounded-full transition-all duration-500"
                style={{ width: `${result.metrics.biasAndNeutrality}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Flagged Critical Issues */}
      {result.flaggedIssues && result.flaggedIssues.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Detected Epistemic Vulnerabilities ({result.flaggedIssues.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.flaggedIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  issue.severity === 'danger'
                    ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                    : issue.severity === 'warning'
                    ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                    : 'bg-blue-50/60 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    {issue.severity === 'danger' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                    {issue.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-white border border-current">
                    {issue.severity}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{issue.description}</p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <strong className="text-slate-800">Action:</strong> {issue.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Analysis Workspace with Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        
        {/* Navigation Tabs for View */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewTab('heatmap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewTab === 'heatmap'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Interactive Sentence Heatmap
            </button>
            <button
              onClick={() => setViewTab('repaired')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'repaired'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Trust-Repaired Answer</span>
            </button>
            <button
              onClick={() => setViewTab('sources')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'sources'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Grounding Sources</span>
            </button>
            <button
              onClick={() => setViewTab('critical')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'critical'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Critical Thinking Guide</span>
            </button>
            <button
              onClick={() => setViewTab('formula')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'formula'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Scoring Formula</span>
            </button>
          </div>

          {/* Filter badges (visible on heatmap view) */}
          {viewTab === 'heatmap' && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] hidden sm:inline flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
              >
                All ({result.sentences.length})
              </button>
              {hallucinationCount > 0 && (
                <button
                  onClick={() => handleFilterChange('hallucination')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    statusFilter === 'hallucination' ? 'bg-rose-600 text-white font-bold' : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                  }`}
                >
                  Hallucinations ({hallucinationCount})
                </button>
              )}
              {questionableCount > 0 && (
                <button
                  onClick={() => handleFilterChange('questionable')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    statusFilter === 'questionable' ? 'bg-amber-600 text-white font-bold' : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  Questionable ({questionableCount})
                </button>
              )}
              {verifiedCount > 0 && (
                <button
                  onClick={() => handleFilterChange('verified')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    statusFilter === 'verified' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  Verified ({verifiedCount})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab 1: Heatmap & Claim Inspector */}
        {viewTab === 'heatmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Annotated Passage (Clickable sentences) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Audited Passage (Click any sentence to inspect):</span>
                {statusFilter !== 'all' ? (
                  <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1">
                    Showing {filteredSentences.length} of {result.sentences.length} {statusFilter} claims
                    <button
                      onClick={() => handleFilterChange('all')}
                      className="underline text-slate-500 hover:text-slate-800 ml-1 cursor-pointer"
                    >
                      (Clear Filter)
                    </button>
                  </span>
                ) : (
                  <span className="text-[11px]">Hover or tap for instant diagnosis</span>
                )}
              </div>

              <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 text-sm leading-relaxed text-slate-900 font-sans tracking-wide">
                {result.sentences.map((sentence) => {
                  const isSelected = sentence.id === activeSentenceId;
                  const isDimmed = statusFilter !== 'all' && sentence.status !== statusFilter;
                  return (
                    <span
                      key={sentence.id}
                      onClick={() => {
                        setActiveSentenceId(sentence.id);
                      }}
                      className={getSentenceStyle(sentence.status, isSelected, isDimmed)}
                      title={`[${sentence.status.toUpperCase()}] Click to inspect claim`}
                    >
                      {sentence.text}{' '}
                    </span>
                  );
                })}
              </div>

              {/* Status Color Legend */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Verified Fact</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                  <span>Unverified Claim</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>Questionable / Overconfident</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span>Hallucination / False</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>Subjective Opinion</span>
                </div>
              </div>
            </div>

            {/* Right: Active Sentence Claim Inspector Card */}
            <div className="lg:col-span-5">
              {activeSentence ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 sticky top-24 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Selected Assertion
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        activeSentence.status === 'hallucination'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : activeSentence.status === 'questionable'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : activeSentence.status === 'opinion'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {activeSentence.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs italic text-slate-800 leading-relaxed">
                    "{activeSentence.text}"
                  </div>

                  {/* Factuality Explanation */}
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-700 block">Epistemic Analysis:</span>
                    <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                      {activeSentence.explanation}
                    </p>
                  </div>

                  {/* Explicit Uncertainty Explanation */}
                  {activeSentence.uncertaintyExplanation && (
                    <div className="space-y-1 text-xs bg-amber-50/70 border border-amber-200 p-2.5 rounded-lg">
                      <span className="font-semibold text-amber-900 flex items-center gap-1">
                        <Scale className="w-3 h-3 text-amber-700" />
                        Uncertainty & Calibration:
                      </span>
                      <p className="text-amber-950 leading-relaxed text-[11px]">
                        {activeSentence.uncertaintyExplanation}
                      </p>
                    </div>
                  )}

                  {/* Grounded Correction */}
                  {activeSentence.suggestedCorrection && (
                    <div className="space-y-1 text-xs bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
                      <span className="font-semibold text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Grounded Correction:
                      </span>
                      <p className="text-emerald-900 leading-relaxed text-[11px] font-medium">
                        {activeSentence.suggestedCorrection}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                    <span>Epistemic Risk: <strong className="uppercase text-slate-900">{activeSentence.riskLevel}</strong></span>
                    <span>Confidence: <strong className="text-slate-900 tabular-nums">{activeSentence.confidence}%</strong></span>
                  </div>

                  <button
                    onClick={() => setSelectedSentence(activeSentence)}
                    className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open Full Deep Inspector</span>
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-400">
                  Select any sentence on the left to inspect its truthfulness claims.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Trust-Repaired Answer */}
        {viewTab === 'repaired' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Fact-Checked & Calibrated Replacement
                </h4>
                <p className="text-xs text-slate-500">
                  Synthesized by replacing hallucinations with empirical citations and properly calibrated hedging.
                </p>
              </div>

              <button
                onClick={handleCopyRepaired}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedRepaired ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRepaired ? 'Copied' : 'Copy Clean Text'}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-emerald-200 text-sm text-slate-800 leading-relaxed font-sans shadow-inner whitespace-pre-wrap">
              {result.improvedVersion}
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Impact:</strong> By contrasting the original hallucination against this repaired version, students learn how to formulate scientifically cautious claims that pass peer review.
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Grounding Sources & References */}
        {viewTab === 'sources' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Verified Grounding References & Authoritative Repositories
              </h4>
              <p className="text-xs text-slate-500">
                Zero-Fabrication Policy: Sources listed are real standards, registries, and established scientific bodies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(result.verifiedSources || []).map((source, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{source.title}</span>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{source.relevance}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Critical Thinking Checklist */}
        {viewTab === 'critical' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Critical-Thinking Suggestions & Epistemic Verification Prompts
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-blue-700 block">1. Resolve DOIs on Primary Registries</span>
                <p className="text-slate-600 leading-relaxed">
                  Never assume a cited DOI is real. Test it directly on <code className="text-blue-700 bg-white px-1 rounded border border-slate-200">doi.org</code>. Synthetic models often fabricate plausible volume and author strings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-blue-700 block">2. Inquire About Counter-Evidence</span>
                <p className="text-slate-600 leading-relaxed">
                  Prompt the AI: <em>"What are the leading counter-arguments to this assertion?"</em> LLMs are susceptible to sycophancy when given leading questions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-blue-700 block">3. Separate Consensus from Single Studies</span>
                <p className="text-slate-600 leading-relaxed">
                  Distinguish Cochrane systematic reviews or meta-analyses from small exploratory papers, preliminary trials, or non-peer-reviewed preprints.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-blue-700 block">4. Demand Code Explanations with Edge Cases</span>
                <p className="text-slate-600 leading-relaxed">
                  When evaluating AI-written code, verify against SQL injection, null references, concurrency limits, and memory overflow hazards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: College Scoring Formula */}
        {viewTab === 'formula' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Epistemic Trust Index (ETI) Scoring Algorithm
            </h4>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-xs text-blue-900">
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold overflow-x-auto">
                TrustScore = 0.35 × FactualAccuracy + 0.20 × CitationValidity + 0.15 × ConfidenceCalibration + 0.15 × ReasoningValidity + 0.15 × Neutrality - HallucinationPenalties
              </div>
              <div className="space-y-1.5 text-slate-600 text-[11px] font-sans">
                <p>• <strong>Factual Accuracy (35% weight):</strong> Evaluates empirical truth against verified facts.</p>
                <p>• <strong>Citation Validity (20% weight):</strong> Audits author validity and real journal DOI existence.</p>
                <p>• <strong>Confidence Calibration (15% weight):</strong> Penalizes false certainty on uncertain hypotheses.</p>
                <p>• <strong>Reasoning Validity (15% weight):</strong> Detects non-sequiturs and code security vulnerabilities.</p>
                <p>• <strong>Neutrality & Objectivity (15% weight):</strong> Distinguishes verifiable facts from subjective value judgments.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Responsible AI Disclaimer Banner on Report */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-600 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-800 block">Responsible AI Usage Notice:</span>
          <p className="leading-relaxed">
            AI TrustCheck is an epistemic assistance tool designed to cultivate critical thinking. It is not an infallible oracle. Always cross-reference high-stakes medical, legal, or technical code advice with primary peer-reviewed literature and certified domain experts.
          </p>
        </div>
      </div>

      {/* Modals */}
      <SentenceInspectorModal
        sentence={selectedSentence}
        onClose={() => setSelectedSentence(null)}
      />

      <AuditCertificateModal
        result={showCertificate ? result : null}
        onClose={() => setShowCertificate(false)}
      />

    </div>
  );
};
