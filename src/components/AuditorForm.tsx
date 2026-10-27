import React, { useState, useEffect } from 'react';
import { PRESET_EXAMPLES } from '../data/presetExamples';
import { PresetExample } from '../types/trustcheck';
import { Sparkles, ArrowRight, RotateCcw, Layers, CheckCircle2, Search } from 'lucide-react';

interface AuditorFormProps {
  onAnalyze: (aiText: string, promptContext?: string, domain?: string) => void;
  isLoading: boolean;
  selectedPreset?: PresetExample | null;
  resetNonce?: number;
}

export const AuditorForm: React.FC<AuditorFormProps> = ({ onAnalyze, isLoading, selectedPreset, resetNonce }) => {
  const [aiText, setAiText] = useState(PRESET_EXAMPLES[0].aiResponse);
  const [promptContext, setPromptContext] = useState(PRESET_EXAMPLES[0].prompt);
  const [domain, setDomain] = useState(PRESET_EXAMPLES[0].domain);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_EXAMPLES[0].id);

  useEffect(() => {
    if (resetNonce && resetNonce > 0) {
      setSelectedPresetId('');
      setAiText('');
      setPromptContext('');
    }
  }, [resetNonce]);

  useEffect(() => {
    if (selectedPreset) {
      setSelectedPresetId(selectedPreset.id);
      setAiText(selectedPreset.aiResponse);
      setPromptContext(selectedPreset.prompt);
      setDomain(selectedPreset.domain);
    }
  }, [selectedPreset]);

  const handleSelectPreset = (preset: PresetExample) => {
    setSelectedPresetId(preset.id);
    setAiText(preset.aiResponse);
    setPromptContext(preset.prompt);
    setDomain(preset.domain);
  };

  const handleClear = () => {
    setSelectedPresetId('');
    setAiText('');
    setPromptContext('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiText.trim()) return;
    onAnalyze(aiText, promptContext, domain);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Analyze AI-Generated Answer
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Paste any text output from ChatGPT, Claude, Gemini, or Copilot to audit factual claims, detect hallucinations, and evaluate citations.
        </p>
      </div>

      {/* Benchmark Presets Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            1-Click Benchmark Test Cases
          </span>
          <span className="text-xs text-slate-400">Load realistic hallucination patterns</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRESET_EXAMPLES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3 rounded-xl border text-xs transition-all relative cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-slate-900'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 truncate pr-2">{preset.title}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      preset.trustProfile === 'high'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {preset.expectedIssue}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        
        {/* Controls: Domain and Prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Knowledge Domain
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors shadow-sm cursor-pointer"
            >
              <option value="Academic">Academic Research & Citations</option>
              <option value="Medical">Healthcare & Biological Medicine</option>
              <option value="Technical/Coding">Software Engineering & Tech</option>
              <option value="History">Historical Facts & Chronology</option>
              <option value="General">General Knowledge & News</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Original User Prompt (Optional Context)
              </label>
              <span className="text-[11px] text-slate-400">Identifies sycophantic hallucinations</span>
            </div>
            <input
              type="text"
              value={promptContext}
              onChange={(e) => setPromptContext(e.target.value)}
              placeholder="e.g., Prove that quantum entanglement transmits data faster than light..."
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>AI-Generated Answer Text</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono">{aiText.length} chars</span>
              <span>•</span>
              <span className="font-mono">{aiText.trim() ? aiText.trim().split(/\s+/).length : 0} words</span>
              {aiText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-slate-400 hover:text-slate-700 flex items-center gap-1 ml-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            rows={8}
            value={aiText}
            onChange={(e) => {
              setAiText(e.target.value);
              setSelectedPresetId('');
            }}
            placeholder="Paste text generated by any AI model here for verification..."
            required
            className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors font-sans leading-relaxed resize-y shadow-sm"
          />
        </div>

        {/* Submit & Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Audits claims, detects fake DOIs, verifies confidence calibration</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !aiText.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Auditing Claims with Gemini 3.8 Flash...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Run TrustCheck Audit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
