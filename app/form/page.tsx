/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { SURVEY_DATA } from '../../utils/questions';
import ResultsDashboard from '../../components/results-dashboard';

export default function DiagnosticTool() {
  const [answers, setAnswers] = useState({} as any);
  const [finished, setFinished] = useState(false);

  const toggleSelection = (qId: any, weight: any, isMulti: any) => {
    if (!isMulti) {
      setAnswers({ ...answers, [qId]: weight });
      return;
    }
    const current = answers[qId] || [];
    const updated = current.includes(weight)
      ? current.filter((w: any) => w !== weight)
      : [...current, weight];
    
    // Constraint: Limit multi-select to 2 as per manual
    if (isMulti && updated.length > 2) return;
    
    setAnswers({ ...answers, [qId]: updated });
  };

  const getQuestionScore = (val: any) => {
    if (Array.isArray(val)) return val.length ? val.reduce((a: number, b: number) => a + b, 0) / val.length : 0;
    return val || 0;
  };

  const sectionScores = SURVEY_DATA.sections.map(s => ({
    id: s.id,
    title: s.title,
    score: s.questions.reduce((acc, q) => acc + getQuestionScore(answers[q.id]), 0)
  }));

  if (finished) return <ResultsDashboard scores={sectionScores} onRestart={() => setFinished(false)} />;

  return (
    <div className="w-screen mx-auto p-6 md:p-12 space-y-16 bg-white min-h-screen font-sans text-gray-900">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
            A
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
            Diagnostic Questionnaire
          </h1>
        </div>
        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed border-l-2 border-blue-600 pl-4">
          Complete the 40-question forensic diagnostic across 5 strategic sections. Answer as your organization 
          actually operates today to ensure an accurate implementation roadmap.
        </p>
      </header>

      {SURVEY_DATA.sections.map(section => (
        <section key={section.id} className="space-y-8 animate-in fade-in duration-500">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black bg-gray-900 text-white px-3 py-1 rounded uppercase tracking-widest">
              Section {section.id}
            </span>
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">{section.title}</h2>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </div>

          <div className="space-y-6">
            {section.questions.map(q => (
              <div key={q.id} className="group p-8 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all duration-300">
                <div className="flex gap-4 mb-6">
                   <span className="text-xs font-bold text-blue-600 bg-blue-50 w-6 h-6 flex items-center justify-center rounded-lg">
                     {q.id}
                   </span>
                   <p className="font-bold text-gray-800 text-md leading-snug">
                     {q.question}
                     {q.isMulti && <span className="block text-[10px] text-amber-600 uppercase mt-1 tracking-widest">Select up to 2</span>}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map(opt => {
                    const active = Array.isArray(answers[q.id]) 
                      ? answers[q.id].includes(opt.w) 
                      : answers[q.id] === opt.w;
                    
                    return (
                      <button
                        key={opt.l}
                        onClick={() => toggleSelection(q.id, opt.w, q.isMulti)}
                        className={`text-left p-4 border rounded-xl text-xs font-medium transition-all duration-200 flex justify-between items-center ${
                          active 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md translate-x-1' 
                            : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-white hover:border-gray-300'
                        }`}
                      >
                        {opt.l}
                        {active && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer Submission Gate */}
      <footer className="pt-12 border-t border-gray-100">
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Final Validation</h3>
            <p className="text-xs text-gray-500">
              Unanswered questions will default to 0, signaling critical risk in those organizational dimensions.
            </p>
          </div>
          
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setFinished(true);
            }}
            className="group relative w-full md:w-auto px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-100 transition-all active:scale-95"
          >
            <span className="flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
              Generate Final Report
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}