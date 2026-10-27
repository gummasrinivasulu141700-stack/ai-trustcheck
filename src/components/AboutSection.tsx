import React, { useState } from 'react';
import { COLLEGE_PROJECT_DOSSIER } from '../data/projectAnalysis';
import { SRS_SPECIFICATION } from '../data/srsDocument';
import {
  BookOpen,
  Target,
  Users,
  Cpu,
  Layers,
  FileCode2,
  HelpCircle,
  ShieldAlert,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'srs' | 'ethics' | 'viva'>('blueprint');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopySynopsis = () => {
    const text = `
PROJECT SYNOPSIS: ${COLLEGE_PROJECT_DOSSIER.projectTitle}
${COLLEGE_PROJECT_DOSSIER.tagline}
Level: ${COLLEGE_PROJECT_DOSSIER.academicLevel}

PROBLEM STATEMENT:
${COLLEGE_PROJECT_DOSSIER.problemStatement.summary}

OBJECTIVES:
${COLLEGE_PROJECT_DOSSIER.projectObjectives.objectives.map(o => `• [${o.id}] ${o.name}: ${o.description}`).join('\n')}

SYSTEM ARCHITECTURE:
Pipeline: ${COLLEGE_PROJECT_DOSSIER.proposedSolution.architectureSteps.map(s => s.step).join(' -> ')}
Scoring Formula: ${COLLEGE_PROJECT_DOSSIER.proposedSolution.formula}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Project Blueprint & Software Requirements Specification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              About AI TrustCheck Portal
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              An Academic Capstone & Epistemic Audit Engineering Project designed to evaluate factual attribution and mitigate Automation Bias in Generative Artificial Intelligence.
            </p>
          </div>

          <button
            onClick={handleCopySynopsis}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm shrink-0"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Copied Synopsis' : 'Copy Project Synopsis'}</span>
          </button>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'blueprint'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Project Blueprint</span>
        </button>

        <button
          onClick={() => setActiveTab('srs')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'srs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>SRS Document (IEEE 830)</span>
        </button>

        <button
          onClick={() => setActiveTab('ethics')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'ethics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Responsible AI Governance</span>
        </button>

        <button
          onClick={() => setActiveTab('viva')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'viva'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Viva Defense Guide</span>
        </button>
      </div>

      {/* Tab 1: Blueprint */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          
          {/* Problem Statement Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              1. Problem Statement & The "Automation Bias" Crisis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {COLLEGE_PROJECT_DOSSIER.problemStatement.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {COLLEGE_PROJECT_DOSSIER.problemStatement.coreIssues.map((issue, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    {issue.title}
                  </span>
                  <p className="text-slate-600 leading-relaxed">{issue.desc}</p>
                  <p className="text-[11px] text-amber-700 font-medium pt-1">
                    Impact: {issue.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              2. SMART Project Objectives
            </h3>

            <div className="space-y-3">
              {COLLEGE_PROJECT_DOSSIER.projectObjectives.objectives.map((obj) => (
                <div
                  key={obj.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px]">
                        {obj.id}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{obj.name}</span>
                    </div>
                    <p className="text-slate-600">{obj.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                    {obj.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Target User Personas */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              3. Target User Personas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COLLEGE_PROJECT_DOSSIER.targetUsers.personas.map((persona, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <strong className="text-slate-900 text-sm">{persona.role}</strong>
                  </div>
                  <p className="text-slate-600"><strong>Scenario:</strong> {persona.scenario}</p>
                  <p className="text-rose-700"><strong>Pain Point:</strong> {persona.painPoint}</p>
                  <p className="text-emerald-800 font-medium"><strong>Solution:</strong> {persona.benefit}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Software Requirements Specification */}
      {activeTab === 'srs' && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Functional Requirements (FR-01 to FR-12)</h3>
                <p className="text-xs text-slate-500">Separating user interactions and verifiable acceptance criteria</p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-100">
                12 Modules
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {SRS_SPECIFICATION.functionalRequirements.map((fr) => (
                <div key={fr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-mono font-bold text-blue-700">{fr.id}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                      {fr.priority}
                    </span>
                  </div>
                  <strong className="text-slate-900 text-sm block">{fr.name}</strong>
                  <p className="text-slate-600 leading-relaxed">{fr.description}</p>
                  <ul className="space-y-1 text-[11px] text-slate-500 pt-1">
                    {fr.acceptanceCriteria.map((ac, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Functional Requirements */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Non-Functional Requirements (NFR-01 to NFR-06)</h3>
            <div className="space-y-2">
              {SRS_SPECIFICATION.nonFunctionalRequirements.map((nfr) => (
                <div key={nfr.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-blue-700 mr-2">{nfr.id}</span>
                    <strong className="text-slate-900">{nfr.category}</strong>
                    <span className="text-slate-500 ml-1">({nfr.standard})</span>
                    <p className="text-slate-600 pt-0.5">{nfr.implementation}</p>
                  </div>
                  <div className="shrink-0 font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    {nfr.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Responsible AI Governance */}
      {activeTab === 'ethics' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Responsible AI Governance & Ethical Disclosure
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Guidelines aligning the AI TrustCheck Portal with IEEE Ethically Aligned Design and ACM Code of Ethics.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Mandatory Disclosure for Student Submissions</span>
            </div>
            
            <p>
              <strong>1. Assistive, Not Autonomous:</strong> Automated verification algorithms are advisory systems. Students and evaluators must apply domain knowledge to cross-examine output rather than treating the Trust Score as definitive proof.
            </p>

            <p>
              <strong>2. High-Stakes Disclaimer:</strong> In healthcare, legal matters, or critical infrastructure software, outputs from generative AI must never replace certified human practitioners or formal security vulnerability scanning suites.
            </p>

            <p>
              <strong>3. Privacy-Preserving Architecture:</strong> The portal processes assertions in-memory without saving personal user text or queries into third-party tracking databases.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Viva Guide */}
      {activeTab === 'viva' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Viva Examiner Defense Q&A Guide
            </h3>
            <p className="text-xs text-slate-500">
              Anticipated questions from university examiners and faculty committees.
            </p>
          </div>

          <div className="space-y-3">
            {COLLEGE_PROJECT_DOSSIER.vivaDefenseGuide.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <strong className="text-slate-900 font-bold text-sm block">{item.question}</strong>
                <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
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
