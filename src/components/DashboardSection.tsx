import React from 'react';
import { BarChart3, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Layers, Clock, TrendingUp } from 'lucide-react';
import { PRESET_EXAMPLES } from '../data/presetExamples';
import { PresetExample } from '../types/trustcheck';

interface DashboardSectionProps {
  onLoadPreset: (preset: PresetExample) => void;
  onGoToAnalyze: () => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ onLoadPreset, onGoToAnalyze }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Epistemic Trust Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time analytics and hallucination frequency metrics across generative AI evaluations.
          </p>
        </div>

        <button
          onClick={onGoToAnalyze}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          Run New Audit
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Assertions Audited</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">1,482</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+142 propositions today</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Average Trust Score</span>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            68<span className="text-sm font-normal text-slate-500">/100</span>
          </div>
          <div className="text-[11px] text-amber-600">
            <span>Moderate Caution (Avg. Baseline)</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Hallucinations Flagged</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 font-mono tabular-nums">218</div>
          <div className="text-[11px] text-slate-500">
            <span>14.7% of all extracted claims</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Verified Grounded Facts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">984</div>
          <div className="text-[11px] text-slate-500">
            <span>66.4% empirical alignment</span>
          </div>
        </div>

      </div>

      {/* Grid: Domain Risk Breakdown & Benchmark Audit Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Domain Risk Distribution */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Hallucination Frequency by Domain</h3>
          
          <div className="space-y-3 pt-1">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Academic & Medical Research</span>
                <span className="font-mono font-bold text-rose-600">38% Risk</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '38%' }} />
              </div>
              <span className="text-[10px] text-slate-400">High frequency of phantom citations and fake DOIs</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Software Engineering & Security</span>
                <span className="font-mono font-bold text-amber-600">29% Risk</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '29%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Unescaped queries, subtle logic bugs, deprecated APIs</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Historical & Humanities</span>
                <span className="font-mono font-bold text-amber-600">22% Risk</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '22%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Chronological anachronisms and misattributed quotes</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">General Concepts & Math Definitions</span>
                <span className="font-mono font-bold text-emerald-600">9% Risk</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '9%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Standard textbook knowledge exhibits highest accuracy</span>
            </div>
          </div>
        </div>

        {/* Benchmark Test Queue (Clickable) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Preset Failure Benchmark Audits</h3>
            <span className="text-xs text-slate-400">Click to load & inspect</span>
          </div>

          <div className="divide-y divide-slate-100">
            {PRESET_EXAMPLES.map((preset) => (
              <div
                key={preset.id}
                onClick={() => onLoadPreset(preset)}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {preset.domain}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {preset.expectedIssue}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs">
                  <span
                    className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                      preset.trustProfile === 'high'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {preset.trustProfile === 'high' ? 'High Trust' : 'High Risk'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
