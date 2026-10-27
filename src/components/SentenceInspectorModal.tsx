import React from 'react';
import { SentenceClaim } from '../types/trustcheck';
import { X, CheckCircle, AlertTriangle, AlertOctagon, HelpCircle, BookOpen, ShieldAlert, Scale } from 'lucide-react';

interface SentenceInspectorModalProps {
  sentence: SentenceClaim | null;
  onClose: () => void;
}

export const SentenceInspectorModal: React.FC<SentenceInspectorModalProps> = ({ sentence, onClose }) => {
  if (!sentence) return null;

  const getStatusBadge = (status: SentenceClaim['status']) => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
          label: 'Verified Fact',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'hallucination':
        return {
          icon: <AlertOctagon className="w-4 h-4 text-rose-600" />,
          label: 'Fabricated / Hallucination',
          color: 'bg-rose-50 text-rose-800 border-rose-200'
        };
      case 'questionable':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          label: 'Questionable / False Certainty',
          color: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'opinion':
        return {
          icon: <HelpCircle className="w-4 h-4 text-blue-600" />,
          label: 'Subjective Opinion',
          color: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'unverified':
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-amber-600" />,
          label: 'Unverified Claim',
          color: 'bg-amber-50 text-amber-800 border-amber-200'
        };
    }
  };

  const badge = getStatusBadge(sentence.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-xl relative space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${badge.color}`}>
              {badge.icon}
              {badge.label}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Risk: <span className="uppercase font-semibold text-slate-800">{sentence.riskLevel}</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Confidence: <span className="text-slate-800 font-bold">{sentence.confidence}%</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Claim Text */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Examined Proposition:
          </span>
          <p className="text-sm text-slate-900 font-medium italic leading-relaxed">
            "{sentence.text}"
          </p>
        </div>

        {/* Diagnostic Explanation */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            Claim Factuality Assessment:
          </span>
          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
            {sentence.explanation}
          </p>
        </div>

        {/* Uncertainty Explanation */}
        {sentence.uncertaintyExplanation && (
          <div className="space-y-1.5 bg-amber-50/70 border border-amber-200 p-3 rounded-xl">
            <span className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-700" />
              Uncertainty & Calibration Analysis:
            </span>
            <p className="text-xs text-amber-950 leading-relaxed">
              {sentence.uncertaintyExplanation}
            </p>
          </div>
        )}

        {/* Suggested Grounded Correction */}
        {sentence.suggestedCorrection && (
          <div className="space-y-1.5 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Fact-Grounded Correction:
            </span>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              {sentence.suggestedCorrection}
            </p>
          </div>
        )}

        {/* Verification sources */}
        {sentence.sourcesOrEvidence && sentence.sourcesOrEvidence.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              Grounding References / Fact Bases:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sentence.sourcesOrEvidence.map((src, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
