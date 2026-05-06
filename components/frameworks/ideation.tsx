/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useIdeationStore } from '@/store/ideation';
import { useDiagnosticStore } from '@/store/diagnostic'; // Pulls Diagnostic Scores

export default function SolutionPrioritizer() {
  const { solutions, addSolution, updateSolution, removeSolution } = useIdeationStore();
  const { scores:diagnosticScores } = useDiagnosticStore();

  const handleFeasibilityCheck = (id: string, solution: any) => {
    // Brutally honest logic: If AI Maturity is low, complex GenAI is "Low" feasibility
    const maturity = diagnosticScores.C;
    const feasibility = solution.feasibility;

    if (maturity < 10 && solution.aiType === 'Generative') {
      alert("CRITICAL LOGIC ERROR: Your AI Maturity (Section C) is too low for Generative solutions. Feasibility downgraded to LOW.");
      updateSolution(id, { feasibility: 'Low' });
    }
  };

  return (
    <div className="space-y-10 font-sans bg-white">
      <header className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
        <div>
          <h2 className="text-2xl text-black font-bold uppercase italic text-slate-900">Phase 3: Ideation Sprint</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Designing AI-Ready Solutions</p>
        </div>
        <button 
          onClick={addSolution}
          className="bg-slate-900 text-white px-6 py-2 text-[10px] text-black font-bold uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]"
        >
          + New Idea
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.map((s) => (
          <div key={s.id} className="p-6 border-2 border-slate-900 bg-white relative group">
            <button 
              onClick={() => removeSolution(s.id)}
              className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
            
            <div className="space-y-4">
              <input 
                className="w-full text-lg text-black font-bold uppercase tracking-tighter outline-none placeholder-slate-200"
                placeholder="Solution Title..."
                value={s.title}
                onChange={(e) => updateSolution(s.id, { title: e.target.value })}
              />
              
              <textarea 
                className="w-full text-xs font-medium text-slate-600 bg-slate-50 p-3 h-20 border-none outline-none resize-none"
                placeholder="How does this solve the Delusion Gap?"
                value={s.description}
                onChange={(e) => updateSolution(s.id, { description: e.target.value })}
              />

              <div className="grid grid-cols-3 gap-2">
                <SelectBox 
                  label="Type" 
                  value={s.aiType} 
                  options={['Predictive', 'Generative', 'Automation']} 
                  onChange={(v:any) => {
                    updateSolution(s.id, { aiType: v });
                    handleFeasibilityCheck(s.id, { ...s, aiType: v });
                  }}
                />
                <SelectBox 
                  label="Impact" 
                  value={s.impact} 
                  options={['High', 'Medium', 'Low']} 
                  onChange={(v:any) => updateSolution(s.id, { impact: v })}
                />
                <SelectBox 
                  label="Feasibility" 
                  value={s.feasibility} 
                  options={['High', 'Medium', 'Low']} 
                  onChange={(v:any) => updateSolution(s.id, { feasibility: v })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectBox({ label, value, options, onChange }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[8px] text-black font-bold uppercase  tracking-widest">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-[10px] text-black font-bold border border-slate-200 rounded p-1 outline-none bg-white"
      >
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}