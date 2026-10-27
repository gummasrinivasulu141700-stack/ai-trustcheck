import React, { useState } from 'react';
import { SRS_SPECIFICATION } from '../data/srsDocument';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

export const SrsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'fr' | 'nfr' | 'priorities' | 'critical-thinking' | 'disclaimer'>('fr');
  const [copiedSRS, setCopiedSRS] = useState(false);

  const handleCopyFullSRS = () => {
    const markdown = `
# ${SRS_SPECIFICATION.documentTitle}
## Project: ${SRS_SPECIFICATION.projectTitle} (Version: ${SRS_SPECIFICATION.version})
**Status:** ${SRS_SPECIFICATION.status} | **Author:** ${SRS_SPECIFICATION.author}

---
### 1. Executive Overview
${SRS_SPECIFICATION.executiveOverview}

---
### 2. Functional Requirements (FR)
${SRS_SPECIFICATION.functionalRequirements.map(fr => `
#### [${fr.id}] ${fr.name}
- **Priority:** ${fr.priority}
- **Description:** ${fr.description}
- **Acceptance Criteria:**
${fr.acceptanceCriteria.map(ac => `  - ${ac}`).join('\n')}
`).join('')}

---
### 3. Non-Functional Requirements (NFR)
${SRS_SPECIFICATION.nonFunctionalRequirements.map(nfr => `
#### [${nfr.id}] ${nfr.category}
- **Standard:** ${nfr.standard}
- **Metric/Target:** ${nfr.metric}
- **Implementation Strategy:** ${nfr.implementation}
`).join('')}

---
### 4. MoSCoW Feature Prioritization Matrix (Working Prototype)
- **Must Have (P0 - MVP):**
${SRS_SPECIFICATION.moscowMatrix.mustHave.map(m => `  - ${m}`).join('\n')}
- **Should Have (P1):**
${SRS_SPECIFICATION.moscowMatrix.shouldHave.map(s => `  - ${s}`).join('\n')}
- **Could Have (P2):**
${SRS_SPECIFICATION.moscowMatrix.couldHave.map(c => `  - ${c}`).join('\n')}
- **Won't Have (Out of Prototype Scope):**
${SRS_SPECIFICATION.moscowMatrix.wontHaveForPrototype.map(w => `  - ${w}`).join('\n')}

---
### 5. Responsible AI Disclaimer
AI TrustCheck is an epistemic assistance tool and educational auditing framework. It does not replace primary peer-reviewed literature, professional medical diagnosis, or expert legal/security audits. Critical human evaluation remains indispensable.
    `.trim();

    navigator.clipboard.writeText(markdown);
    setCopiedSRS(true);
    setTimeout(() => setCopiedSRS(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Document Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Software Engineering Document (SRS)
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              IEEE 830-Inspired Standard
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {SRS_SPECIFICATION.documentTitle}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {SRS_SPECIFICATION.executiveOverview}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span>Project: <strong className="text-slate-200">{SRS_SPECIFICATION.projectTitle}</strong></span>
            <span>•</span>
            <span>Version: <strong className="text-indigo-300">{SRS_SPECIFICATION.version}</strong></span>
            <span>•</span>
            <span>Status: <strong className="text-emerald-400">{SRS_SPECIFICATION.status}</strong></span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={handleCopyFullSRS}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            {copiedSRS ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-slate-300" />}
            <span>{copiedSRS ? 'Copied SRS Markdown to Clipboard' : 'Copy Full SRS Document'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('fr')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'fr'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Functional Requirements ({SRS_SPECIFICATION.functionalRequirements.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nfr')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'nfr'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Non-Functional ({SRS_SPECIFICATION.nonFunctionalRequirements.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('priorities')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'priorities'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>MoSCoW Prioritization</span>
        </button>

        <button
          onClick={() => setActiveSubTab('critical-thinking')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'critical-thinking'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Critical-Thinking Guide</span>
        </button>

        <button
          onClick={() => setActiveSubTab('disclaimer')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'disclaimer'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Responsible AI Notice</span>
        </button>
      </div>

      {/* Tab: Functional Requirements */}
      {activeSubTab === 'fr' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Functional Requirements Specification (FR-01 to FR-12)
            </h3>
            <p className="text-xs text-slate-400">
              Each requirement specifies system behavior, user interaction expectations, and verifiable acceptance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SRS_SPECIFICATION.functionalRequirements.map((fr) => (
              <div
                key={fr.id}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {fr.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded border ${
                      fr.priority.includes('Must')
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}
                  >
                    {fr.priority}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100">{fr.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{fr.description}</p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Acceptance Criteria:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-400">
                    {fr.acceptanceCriteria.map((ac, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Non-Functional Requirements */}
      {activeSubTab === 'nfr' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Non-Functional Requirements Specification (NFR-01 to NFR-06)
            </h3>
            <p className="text-xs text-slate-400">
              Architectural quality attributes ensuring real-world performance, usability, fault tolerance, and security.
            </p>
          </div>

          <div className="space-y-3">
            {SRS_SPECIFICATION.nonFunctionalRequirements.map((nfr) => (
              <div
                key={nfr.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {nfr.id}
                    </span>
                    <span className="font-bold text-sm text-slate-100">{nfr.category}</span>
                    <span className="text-xs text-slate-400 font-mono">({nfr.standard})</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{nfr.implementation}</p>
                </div>

                <div className="shrink-0 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 max-w-xs">
                  <span className="text-[10px] text-slate-500 uppercase block">Metric Target</span>
                  {nfr.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: MoSCoW Prioritization Matrix */}
      {activeSubTab === 'priorities' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              MoSCoW Feature Prioritization Matrix (Student Prototype MVP)
            </h3>
            <p className="text-xs text-slate-400">
              Structured triage ensuring core verification works robustly within the timeframe of a college semester.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Must Have */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Must Have (P0 — Essential for MVP)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  Implemented
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {SRS_SPECIFICATION.moscowMatrix.mustHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Should Have */}
            <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Should Have (P1 — High Value)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                  Implemented
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {SRS_SPECIFICATION.moscowMatrix.shouldHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Could Have */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-300">Could Have (P2 — Future Expansion)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">
                  Post-MVP
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {SRS_SPECIFICATION.moscowMatrix.couldHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Won't Have */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-400">Won't Have (Excluded From Prototype Scope)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 font-mono">
                  Out of Scope
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                {SRS_SPECIFICATION.moscowMatrix.wontHaveForPrototype.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Tab: Critical-Thinking Guide */}
      {activeSubTab === 'critical-thinking' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Critical-Thinking Heuristics & Epistemic Self-Check
            </h3>
            <p className="text-xs text-slate-400">
              Students and evaluators should ask these questions before accepting any generative AI output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                1. The "Weasel Words" Check
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Does the AI state phrases like <em>"studies show"</em> or <em>"scientists agree"</em> without naming authors, publication years, or explicit journal volumes? If so, treat the claim as ungrounded speculation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                2. The "Overconfident Absolute" Trap
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Does the text use universal absolutes such as <em>"always"</em>, <em>"never"</em>, or <em>"100% scientifically proven"</em>? Real science operates on confidence intervals and statistical probabilities.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                3. The DOI & Bibliography Resolver Test
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attempt to resolve the DOI at <code className="text-amber-300">doi.org</code> or search the author's publication list on Google Scholar. LLMs often hallucinate syntactically valid DOIs that point to 404 errors or completely different papers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                4. Code Security & Deprecation Audit
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Never deploy AI code recommendations blindly. Check whether raw strings are concatenated into database queries or whether deprecated cryptographic hashes (e.g. MD5) are recommended as "secure".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Responsible AI Disclaimer */}
      {activeSubTab === 'disclaimer' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Responsible AI Disclaimer & Ethical Governance
            </h3>
            <p className="text-xs text-slate-400">
              Mandatory ethical disclosure governing automated fact-auditing tools.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-rose-500/30 space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Academic Integrity & Epistemic Boundaries Notice</span>
            </div>
            
            <p>
              <strong>1. Epistemic Assistance, Not Infallibility:</strong> The AI TrustCheck Portal is an assistive diagnostic framework designed to alert users to potential fabrications, uncalibrated claims, and phantom citations. No algorithmic tool is 100% infallible; human-in-the-loop cross-examination remains indispensable.
            </p>

            <p>
              <strong>2. High-Stakes Domain Limitations:</strong> In critical domains (clinical healthcare, legal proceedings, structural engineering, or production financial software), the outputs of this portal must never supersede consultations with licensed physicians, certified attorneys, or qualified professional practitioners.
            </p>

            <p>
              <strong>3. Human Agency & Academic Responsibility:</strong> Authors and students remain solely responsible for any work submitted under their name. Citing an unverified AI generation—even if scanned by an automated auditor—does not absolve an author of academic dishonesty or professional negligence.
            </p>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Complies with IEEE Guidelines on Ethically Aligned Design and ACM Code of Ethics and Professional Conduct.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
