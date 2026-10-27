import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { DashboardSection } from './components/DashboardSection';
import { AuditorForm } from './components/AuditorForm';
import { AuditReport } from './components/AuditReport';
import { LearnVerifySection } from './components/LearnVerifySection';
import { AboutSection } from './components/AboutSection';
import { AnalysisResult, PresetExample } from './types/trustcheck';
import { AlertCircle, ShieldAlert, BookOpen, Search, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<PresetExample | null>(null);
  const [formResetNonce, setFormResetNonce] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (aiText: string, promptContext?: string, domain?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trustcheck/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiText, promptContext, domain }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
      // Automatically navigate to Verification Results upon successful audit
      setActiveTab('results');
    } catch (err: any) {
      console.error('Audit failed:', err);
      setError(err.message || 'An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAnalysisWithPreset = (preset?: PresetExample) => {
    if (preset) {
      setSelectedPreset(preset);
    }
    setActiveTab('analyze');
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setSelectedPreset(null);
    setError(null);
    setFormResetNonce(prev => prev + 1);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600/20 selection:text-blue-950">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAuditedResult={!!analysisResult}
        onNewAuditClick={() => {
          setSelectedPreset(null);
          setFormResetNonce(prev => prev + 1);
          setActiveTab('analyze');
        }}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Global Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Verification Notice</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* 1. Home Section */}
        {activeTab === 'home' && (
          <HomeSection
            onStartAnalysis={handleStartAnalysisWithPreset}
            onGoToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* 2. Dashboard Section */}
        {activeTab === 'dashboard' && (
          <DashboardSection
            onLoadPreset={(preset) => handleStartAnalysisWithPreset(preset)}
            onGoToAnalyze={() => setActiveTab('analyze')}
          />
        )}

        {/* 3. Analyze Answer Section */}
        {activeTab === 'analyze' && (
          <AuditorForm
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            selectedPreset={selectedPreset}
            resetNonce={formResetNonce}
          />
        )}

        {/* 4. Verification Results Section */}
        {activeTab === 'results' && (
          <div>
            {analysisResult ? (
              <AuditReport result={analysisResult} onReset={handleReset} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-sm max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Active Audit Result</h3>
                  <p className="text-xs text-slate-500">
                    Input an AI answer to evaluate its factual claims, citations, and trust index.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Go to Analyze Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. Learn and Verify Section */}
        {activeTab === 'learn' && (
          <LearnVerifySection />
        )}

        {/* 6. About Section */}
        {activeTab === 'about' && (
          <AboutSection />
        )}

      </main>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-bold text-slate-900">AI TrustCheck Portal</span>
              <span>·</span>
              <span>Academic Fact & Epistemic Audit System</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-500">
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('analyze')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Analyze
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Learn & Verify
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                About & SRS
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong>Responsible AI Disclaimer:</strong> AI TrustCheck is an epistemic assistance tool designed to cultivate critical thinking. It is not an infallible oracle. Always cross-reference high-stakes medical, legal, or technical code advice with primary peer-reviewed literature and certified domain experts.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
