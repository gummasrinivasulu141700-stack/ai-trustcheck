import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Search, BookOpen, Layers, Sparkles, Scale, ExternalLink } from 'lucide-react';
import { PRESET_EXAMPLES } from '../data/presetExamples';
import { PresetExample } from '../types/trustcheck';

interface HomeSectionProps {
  onStartAnalysis: (preset?: PresetExample) => void;
  onGoToDashboard: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onStartAnalysis, onGoToDashboard }) => {
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Epistemic Verification & Hallucination Auditor</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Verify AI-Generated Answers Before You Blindly Trust Them.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Generative AI articulates completely fabricated facts with the exact same linguistic confidence as proven truths. The AI TrustCheck Portal audits claims, exposes phantom citations, and computes an objective Trust Score.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartAnalysis()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Analyze an AI Answer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToDashboard}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View System Dashboard</span>
            </button>
          </div>

          {/* Quick proof stats */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-500">
            <div>
              <span className="font-bold text-lg text-slate-900 font-mono block">100%</span>
              <span>Phantom Citation Detection</span>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 font-mono block">80%</span>
              <span>Verification Time Saved</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-bold text-lg text-slate-900 font-mono block">5-Vector</span>
              <span>Multidimensional Trust Metric</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Verification Pipeline */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">How It Works</span>
          <h2 className="text-2xl font-bold text-slate-900">Three-Stage Epistemic Verification Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Turning unstructured AI responses into verifiable, attributed propositions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-base text-slate-900">Atomic Claim Extraction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous AI paragraphs are parsed into standalone empirical assertions, stripping filler phrases and separating factual claims from subjective opinions.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-base text-slate-900">Grounding Cross-Examination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Each statement is cross-examined against domain knowledge bases (PubMed, Nature, standard library specs). Detects phantom DOIs, fake authors, and code bugs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-base text-slate-900">Trust Score & Repair</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Computes a weighted 0–100 Trust Index, highlights sentences in an interactive color-coded heatmap, and generates a fact-checked repaired version.
            </p>
          </div>

        </div>
      </section>

      {/* Preset Test Cases Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Try Real-World Failure Benchmarks</h3>
            <p className="text-xs text-slate-500">
              Select a pre-configured test case to see how AI TrustCheck detects hallucinations.
            </p>
          </div>
          <button
            onClick={() => onStartAnalysis()}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Custom Text Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_EXAMPLES.slice(0, 3).map((preset) => (
            <div
              key={preset.id}
              onClick={() => onStartAnalysis(preset)}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm bg-slate-50/50 hover:bg-blue-50/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 group-hover:text-blue-700">{preset.title}</span>
                <span className="text-[10px] font-mono text-slate-500">{preset.category}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {preset.expectedIssue}
              </p>
              <div className="pt-2 text-xs font-semibold text-blue-600 flex items-center gap-1">
                <span>Load & Test Benchmark</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
