import React from 'react';
import { AnalysisResult } from '../types/trustcheck';
import { X, Printer, ShieldCheck, Award, CheckCircle } from 'lucide-react';

interface AuditCertificateModalProps {
  result: AnalysisResult | null;
  onClose: () => void;
}

export const AuditCertificateModal: React.FC<AuditCertificateModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', label: 'Pristine Grounded Truth', color: 'text-emerald-700 border-emerald-300 bg-emerald-50' };
    if (score >= 75) return { grade: 'B', label: 'Satisfactory / Minor Issues', color: 'text-blue-700 border-blue-300 bg-blue-50' };
    if (score >= 55) return { grade: 'C', label: 'Moderate Caution / Weasel Claims', color: 'text-amber-700 border-amber-300 bg-amber-50' };
    return { grade: 'F', label: 'High Risk / Hallucinations Detected', color: 'text-rose-700 border-rose-300 bg-rose-50' };
  };

  const gradeInfo = getGrade(result.trustScore);
  const auditHash = `TC-${Math.abs(result.trustScore * 104729 + 17).toString(16).toUpperCase()}-${Date.now().toString(16).slice(-4).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white print:backdrop-blur-none">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative text-slate-900 print:text-black print:bg-white print:border-none print:shadow-none print:max-h-none print:overflow-visible">
        
        {/* Actions bar (hidden in print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold tracking-tight text-slate-900">Academic Fact-Check Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-blue-200 rounded-xl p-6 relative bg-gradient-to-b from-blue-50/20 via-white to-blue-50/20 print:bg-none print:border-black">
          
          {/* Header */}
          <div className="text-center space-y-1 pb-6 border-b border-slate-200 print:border-black">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 mb-2 print:border-black print:text-black">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 print:text-black font-sans">
              AI TrustCheck Verification Certificate
            </h2>
            <p className="text-xs text-slate-500 print:text-gray-600 uppercase tracking-widest font-mono">
              Academic Epistemic Integrity & Attributable Fact Audit
            </p>
          </div>

          {/* Audit Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 text-xs border-b border-slate-200 font-mono print:border-black">
            <div>
              <span className="text-slate-400 print:text-gray-500 block text-[10px] uppercase">Audit ID</span>
              <span className="font-semibold text-blue-700 print:text-black">{auditHash}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block text-[10px] uppercase">Timestamp</span>
              <span className="text-slate-800 print:text-black">
                {result.auditedAt ? new Date(result.auditedAt).toLocaleDateString() : new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 print:text-gray-500 block text-[10px] uppercase">Standard</span>
              <span className="text-slate-800 print:text-black">Epistemic Matrix v3.8</span>
            </div>
          </div>

          {/* Core Score Banner */}
          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 print:border-black print:bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 print:text-gray-600 font-semibold uppercase tracking-wider block mb-1">
                Composite Trust Evaluation
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 print:text-black font-mono">
                  {result.trustScore}
                </span>
                <span className="text-slate-500 print:text-gray-600 font-mono">/ 100</span>
                <span className="text-sm font-semibold text-slate-700 print:text-black ml-2">
                  ({result.verdict})
                </span>
              </div>
            </div>

            <div className={`px-4 py-2 rounded-xl border-2 text-center ${gradeInfo.color} print:border-black print:text-black`}>
              <span className="text-2xl font-black block font-mono">{gradeInfo.grade}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">{gradeInfo.label}</span>
            </div>
          </div>

          {/* Metrics breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Factual Accuracy</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.metrics.factualAccuracy}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Citation Validity</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.metrics.citationIntegrity}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Confidence Calibration</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.metrics.confidenceCalibration}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Reasoning Logic</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.metrics.reasoningValidity}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Neutrality & Bias</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.metrics.biasAndNeutrality}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs print:border-black">
              <span className="text-slate-500 print:text-gray-600 text-[10px] uppercase block">Sentences Audited</span>
              <span className="font-bold text-slate-900 print:text-black font-mono">{result.sentences.length} assertions</span>
            </div>
          </div>

          {/* Audit Summary */}
          <div className="my-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 print:bg-white print:border-black print:text-black leading-relaxed">
            <span className="font-semibold text-slate-900 print:text-black block mb-1">Auditor Statement:</span>
            {result.summary}
          </div>

          {/* Official Verification Seal */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 print:border-black print:text-black">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 print:text-black" />
              <span>Certified by AI TrustCheck Portal Validation Framework</span>
            </div>
            <div className="font-mono text-slate-400 print:text-black">
              VERIFIED_EPISTEMIC_RECORD
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
