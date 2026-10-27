import React, { useState } from 'react';
import { BrainCircuit, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizItem {
  id: number;
  domain: string;
  statement: string;
  isHallucination: boolean;
  trapExplanation: string;
  heuristicHint: string;
}

const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    domain: 'Medicine / Biology',
    statement: 'A 2023 Harvard study published in Nature Medicine proved that drinking alkaline water neutralizes lactic acid in muscular tissue and cures muscular dystrophy.',
    isHallucination: true,
    trapExplanation: 'Fabricated paper & pseudoscientific claim. Alkaline water cannot alter cellular pH, and muscular dystrophy is a genetic dystrophin deficiency, not a lactic acid accumulation.',
    heuristicHint: 'Look for "cures" combined with prestigious names like "Harvard" and "Nature" without named authors.'
  },
  {
    id: 2,
    domain: 'Computer Science',
    statement: 'Python dictionaries preserve key insertion order starting from Python version 3.7 as an official language specification.',
    isHallucination: false,
    trapExplanation: 'Factually verified! Python 3.6 introduced this as an internal CPython implementation detail, and Python 3.7 officially standardized it in the Language Reference.',
    heuristicHint: 'Notice specific version numbers that can be cross-referenced against official PEP language documentation.'
  },
  {
    id: 3,
    domain: 'History & Technology',
    statement: 'During the 1969 Apollo 11 moon landing, Neil Armstrong was guided by an IBM mainframe powered by the Intel 8086 microprocessor.',
    isHallucination: true,
    trapExplanation: 'Chronological impossibility! The Intel 8086 microprocessor was not released until 1978. The Apollo Guidance Computer (AGC) was developed using custom discrete silicon NOR gates in the 1960s.',
    heuristicHint: 'Verify the release dates of microchips against historical aerospace missions.'
  },
  {
    id: 4,
    domain: 'Quantum Physics',
    statement: 'Quantum entanglement violates Einstein\'s Special Relativity by transmitting encrypted information at 1.4 gigabytes per second across macroscopic distances.',
    isHallucination: true,
    trapExplanation: 'Fundamental physical hallucination. The No-Communication Theorem in quantum mechanics strictly proves that quantum entanglement cannot be used to transmit classical bits of information faster than light.',
    heuristicHint: 'Watch out for claims asserting that a foundational physical law was overturned without Nobel-level global consensus.'
  }
];

export const HallucinationQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = revealed[question.id];

  const handleAnswer = (choiceIsHallucination: boolean) => {
    if (isAnswered) return;

    const isCorrect = choiceIsHallucination === question.isHallucination;
    if (isCorrect) setScore(prev => prev + 1);

    setUserAnswers(prev => ({ ...prev, [question.id]: choiceIsHallucination }));
    setRevealed(prev => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setRevealed({});
    setScore(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Hallucination Spotter Lab</h3>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Question <span className="font-bold text-slate-900">{currentIdx + 1}</span> of {QUIZ_QUESTIONS.length} • Score: <span className="text-emerald-700 font-bold">{score}</span>
          </div>
        </div>

        {/* Question Domain */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100">
            {question.domain}
          </span>
          <span className="text-xs text-slate-500">Is this AI assertion Grounded Truth or a Hallucination?</span>
        </div>

        {/* Statement Box */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm sm:text-base text-slate-900 font-serif italic leading-relaxed">
          "{question.statement}"
        </div>

        {/* Choice Buttons */}
        {!isAnswered ? (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleAnswer(false)}
              className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Grounded Truth</span>
            </button>

            <button
              onClick={() => handleAnswer(true)}
              className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-rose-50 hover:border-rose-300 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Synthetic Hallucination</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Feedback Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                userAnswers[question.id] === question.isHallucination
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {userAnswers[question.id] === question.isHallucination ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sm block">
                  {userAnswers[question.id] === question.isHallucination ? 'Correct Spotting!' : 'Fooled by Fluent Prose!'}
                </span>
                <p className="leading-relaxed">{question.trapExplanation}</p>
                <p className="text-[11px] opacity-80 pt-1">
                  <strong>Heuristic Tip:</strong> {question.heuristicHint}
                </p>
              </div>
            </div>

            {/* Next or Finish Button */}
            <div className="flex justify-end pt-2">
              {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Practice Lab</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
