import React, { useState } from 'react';
import { HallucinationQuiz } from './HallucinationQuiz';
import { Lightbulb, BookOpen, BrainCircuit, CheckCircle2, ShieldCheck, Search, HelpCircle, ExternalLink } from 'lucide-react';

export const LearnVerifySection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'heuristics' | 'quiz' | 'guide'>('heuristics');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Epistemic Literacy & Verification Education</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learn How to Spot AI Hallucinations
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Large Language Models do not store indexed facts; they generate probabilistic sequences of tokens. Use these heuristics and interactive challenges to build sharp critical-thinking reflexes.
          </p>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveSubTab('heuristics')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'heuristics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Core Heuristics</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Hallucination Spotter Lab</span>
        </button>

        <button
          onClick={() => setActiveSubTab('guide')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'guide'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Manual Verification Guide</span>
        </button>
      </div>

      {/* Subtab 1: Core Heuristics */}
      {activeSubTab === 'heuristics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs font-bold">1</span>
              The "Weasel Words" Diagnostic
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              When an AI writes <em>"numerous studies have confirmed"</em> or <em>"experts widely believe"</em> without explicitly naming authors, publication titles, and years, it is masking lack of attribution with authority bias.
            </p>
            <div className="pt-2 text-[11px] text-blue-700 font-medium">
              Rule: Always ask the AI for exact author names and DOI links.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs font-bold">2</span>
              The False Certainty Multiplier
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real scientific consensus uses calibrated probabilities (e.g., <em>"Evidence strongly suggests..."</em> or <em>"Observed under controlled parameters..."</em>). If an AI claims something is <em>"100% guaranteed"</em> or <em>"impossible to fail"</em>, red-flag it immediately.
            </p>
            <div className="pt-2 text-[11px] text-blue-700 font-medium">
              Rule: Dogmatic language in uncertain fields is an indicator of synthetic hallucination.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs font-bold">3</span>
              The Synthesized Citation Trap
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Models often generate real journal names (e.g., <em>Nature</em>, <em>IEEE Transactions</em>) combined with plausible academic surnames (e.g., <em>Dr. Rostova</em>, <em>Smith et al.</em>), but the paper itself never existed.
            </p>
            <div className="pt-2 text-[11px] text-blue-700 font-medium">
              Rule: Always test DOIs directly in doi.org or CrossRef.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs font-bold">4</span>
              Sycophantic Prompt Confirmation
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your prompt includes a presupposition (e.g., <em>"Explain why lemons cure diabetes"</em>), models will often fabricate supporting rationales rather than correcting your flawed premise.
            </p>
            <div className="pt-2 text-[11px] text-blue-700 font-medium">
              Rule: Ask neutral, open-ended questions like "What does clinical literature say regarding...?"
            </div>
          </div>

        </div>
      )}

      {/* Subtab 2: Spotter Lab Quiz */}
      {activeSubTab === 'quiz' && (
        <HallucinationQuiz />
      )}

      {/* Subtab 3: Manual Verification Guide */}
      {activeSubTab === 'guide' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            Step-by-Step Protocol to Fact-Check AI Output in 3 Minutes
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block text-sm">Step 1: Isolate Atomic Claims</strong>
              <p>
                Break the response into individual sentences. Underline every statement that asserts an empirical fact, statistic, historical date, or named individual.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block text-sm">Step 2: Check Attribution Registries</strong>
              <p>
                If the text mentions a paper or study, search the DOI at <code className="text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">https://doi.org</code>. If it redirects to 404 or a completely different topic, the citation was hallucinated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-bold block text-sm">Step 3: Test against Authoritative Source Repositories</strong>
              <p>
                Verify claims in primary literature databases:
                <br />• Medical: <strong>PubMed</strong> or <strong>Cochrane Library</strong>
                <br />• Computer Science: <strong>Official Language Documentation (PEP, MDN)</strong>
                <br />• Physics & Math: <strong>arXiv</strong> or <strong>NIST Standards</strong>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
