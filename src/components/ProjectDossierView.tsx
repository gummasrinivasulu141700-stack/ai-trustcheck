import React, { useState } from 'react';
import { COLLEGE_PROJECT_DOSSIER } from '../data/projectAnalysis';
import {
  BookOpen,
  Target,
  Users,
  Cpu,
  TrendingUp,
  HelpCircle,
  Copy,
  Check,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const ProjectDossierView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'objectives' | 'users' | 'solution' | 'benefits' | 'viva'>('problem');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyProjectSummary = () => {
    const text = `
PROJECT REPORT: ${COLLEGE_PROJECT_DOSSIER.projectTitle}
${COLLEGE_PROJECT_DOSSIER.tagline}
Level: ${COLLEGE_PROJECT_DOSSIER.academicLevel}

1. PROBLEM STATEMENT:
${COLLEGE_PROJECT_DOSSIER.problemStatement.summary}
Formal Statement: ${COLLEGE_PROJECT_DOSSIER.problemStatement.formalStatement}

2. OBJECTIVES:
${COLLEGE_PROJECT_DOSSIER.projectObjectives.objectives.map(o => `• [${o.id}] ${o.name}: ${o.description}`).join('\n')}

3. TARGET USERS:
${COLLEGE_PROJECT_DOSSIER.targetUsers.personas.map(p => `• ${p.role}: ${p.scenario} (Solves: ${p.painPoint})`).join('\n')}

4. PROPOSED SOLUTION & ARCHITECTURE:
Pipeline:
${COLLEGE_PROJECT_DOSSIER.proposedSolution.architectureSteps.map(s => `• ${s.step}: ${s.detail}`).join('\n')}
Mathematical Trust Formula: ${COLLEGE_PROJECT_DOSSIER.proposedSolution.formula}

5. EXPECTED BENEFITS:
${COLLEGE_PROJECT_DOSSIER.expectedBenefits.benefits.map(b => `• ${b.title}: ${b.desc}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              College Project Analysis & Viva Dossier
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800">
              Academic Project Blueprint
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {COLLEGE_PROJECT_DOSSIER.projectTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {COLLEGE_PROJECT_DOSSIER.tagline}
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {COLLEGE_PROJECT_DOSSIER.academicLevel}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleCopyProjectSummary}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-slate-300" />}
            <span>{copiedAll ? 'Copied Full Report to Clipboard' : 'Copy Full Project Report'}</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('problem')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'problem'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>1. Problem Statement</span>
        </button>

        <button
          onClick={() => setActiveTab('objectives')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'objectives'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>2. Project Objectives</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>3. Target Users</span>
        </button>

        <button
          onClick={() => setActiveTab('solution')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'solution'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>4. Proposed Solution</span>
        </button>

        <button
          onClick={() => setActiveTab('benefits')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'benefits'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>5. Expected Benefits</span>
        </button>

        <button
          onClick={() => setActiveTab('viva')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'viva'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Viva Q&A Guide</span>
        </button>
      </div>

      {/* Tab 1: Problem Statement */}
      {activeTab === 'problem' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              {COLLEGE_PROJECT_DOSSIER.problemStatement.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {COLLEGE_PROJECT_DOSSIER.problemStatement.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLLEGE_PROJECT_DOSSIER.problemStatement.coreIssues.map((issue, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  {issue.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{issue.desc}</p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-300/90 font-medium">
                  <strong>Consequence:</strong> {issue.impact}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
            <strong className="text-indigo-300 uppercase tracking-wider block font-mono text-[10px]">
              Formal Problem Formulation (For Synopsis / Dissertation)
            </strong>
            <p className="leading-relaxed italic">
              "{COLLEGE_PROJECT_DOSSIER.problemStatement.formalStatement}"
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Objectives */}
      {activeTab === 'objectives' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            {COLLEGE_PROJECT_DOSSIER.projectObjectives.title}
          </h3>

          <div className="space-y-3">
            {COLLEGE_PROJECT_DOSSIER.projectObjectives.objectives.map((obj) => (
              <div
                key={obj.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {obj.id}
                    </span>
                    <span className="font-bold text-sm text-slate-100">{obj.name}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{obj.description}</p>
                </div>
                <div className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  {obj.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Target Users */}
      {activeTab === 'users' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            {COLLEGE_PROJECT_DOSSIER.targetUsers.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLLEGE_PROJECT_DOSSIER.targetUsers.personas.map((persona, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100">{persona.role}</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Real-world Scenario:</span>
                    <span className="text-slate-200">{persona.scenario}</span>
                  </div>
                  <div>
                    <span className="text-rose-400 text-[11px] block font-semibold">Pain Point:</span>
                    <span className="text-slate-300">{persona.painPoint}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-emerald-300 font-medium">
                    <span className="text-emerald-400 text-[11px] block font-semibold">AI TrustCheck Solution:</span>
                    {persona.benefit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Proposed Solution & Architecture */}
      {activeTab === 'solution' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            {COLLEGE_PROJECT_DOSSIER.proposedSolution.title}
          </h3>

          {/* Architecture Pipeline */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Multi-Stage Epistemic Verification Pipeline:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {COLLEGE_PROJECT_DOSSIER.proposedSolution.architectureSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 relative">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase block">
                    Phase 0{idx + 1}
                  </span>
                  <span className="font-bold text-xs text-slate-200 block">{step.step.replace(/Phase \d+: /, '')}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Formula */}
          <div className="bg-slate-950 p-5 rounded-xl border border-indigo-500/30 space-y-3 font-mono">
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider block">
              Core Epistemic Trust Index (ETI) Formulation
            </span>
            <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 text-xs sm:text-sm font-bold overflow-x-auto">
              {COLLEGE_PROJECT_DOSSIER.proposedSolution.formula}
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Where <code className="text-indigo-300">FactualAccuracy</code> weights 35%, <code className="text-indigo-300">CitationIntegrity</code> weights 20%, <code className="text-indigo-300">ConfidenceCalibration</code> weights 15%, <code className="text-indigo-300">ReasoningValidity</code> weights 15%, and <code className="text-indigo-300">Neutrality</code> weights 15%. Any fabricated citations or pseudoscientific health advice trigger harsh multiplier deductions.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Benefits */}
      {activeTab === 'benefits' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            {COLLEGE_PROJECT_DOSSIER.expectedBenefits.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLLEGE_PROJECT_DOSSIER.expectedBenefits.benefits.map((b, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {b.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Viva Defense Guide */}
      {activeTab === 'viva' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              College Viva Examiner Q&A Guide
            </h3>
            <p className="text-xs text-slate-400">
              Anticipated technical questions that external evaluators and professors typically ask during capstone defenses.
            </p>
          </div>

          <div className="space-y-4">
            {COLLEGE_PROJECT_DOSSIER.vivaDefenseGuide.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-indigo-300">{item.question}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
