/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { SURVEY_DATA } from '../../utils/questions';
import ResultsDashboard from '../../components/results-dashboard';

export default function DiagnosticTool() {
  const [answers, setAnswers] = useState({} as any);
  const [finished, setFinished] = useState(false);

  const toggleSelection = (qId:any, weight:any, isMulti:any) => {
    if (!isMulti) {
      setAnswers({ ...answers, [qId]: weight });
      return;
    }
    const current = answers[qId] || [];
    const updated = current.includes(weight) 
      ? current.filter((w:any) => w !== weight) 
      : [...current, weight];
    setAnswers({ ...answers, [qId]: updated });
  };

  const getQuestionScore = (val:any) => {
    if (Array.isArray(val)) return val.length ? val.reduce((a, b) => a + b, 0) / val.length : 0;
    return val || 0;
  };

  const sectionScores = SURVEY_DATA.sections.map(s => ({
    id: s.id,
    title: s.title,
    score: s.questions.reduce((acc, q) => acc + getQuestionScore(answers[q.id]), 0)
  }));

  if (finished) return <ResultsDashboard scores={sectionScores} onRestart={() => setFinished(false)} />;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12  min-h-screen">
      <h1 className="text-3xl font-black border-b-4 border-blue-600 pb-4">DIAGNOSTIC QUESTIONNAIRE</h1>
      {SURVEY_DATA.sections.map(section => (
        <section key={section.id} className="space-y-6">
          <h2 className="text-xl font-bold bg-blue-900 text-white p-3 rounded">{section.title}</h2>
          {section.questions.map(q => (
            <div key={q.id} className="p-6 shadow rounded-lg border border-gray-200">
              <p className="font-bold text-gray-100 mb-4">{q.id}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map(opt => {
                  const active = Array.isArray(answers[q.id]) ? answers[q.id].includes(opt.w) : answers[q.id] === opt.w;
                  return (
                    <button 
                      key={opt.l}
                      onClick={() => toggleSelection(q.id, opt.w, q.isMulti)}
                      className={`text-left p-3 border rounded-md transition ${active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 hover:text-black'}`}
                    >
                      {opt.l}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
      <button 
        onClick={() => setFinished(true)}
        className="w-full bg-green-700 text-white py-4 font-black rounded hover:bg-green-800"
      >
        GENERATE FINAL REPORT
      </button>
    </div>
  );
}