/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useProblemStore } from '@/store/problemStatement';

export default function ProblemStatementBuilder() {
  const { problem, updateProblem } = useProblemStore();

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Problem Statement Builder</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Defining the Operational North Star</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Section 
            label="Current State" 
            placeholder="Describe the current manual/inefficient process (e.g., 'Currently, data is manually reconciled over 14 hours...')"
            value={problem.currentState}
            onChange={(v:any) => updateProblem({ currentState: v })}
          />
          <Section 
            label="Ideal State" 
            placeholder="What does success look like? (e.g., 'Reconciliation occurs in < 5 minutes with 99.9% accuracy...')"
            value={problem.idealState}
            onChange={(v:any) => updateProblem({ idealState: v })}
          />
        </div>

        <div className="space-y-8">
          <Section 
            label="The Gap" 
            placeholder="What is the specific hurdle the AI must clear? (e.g., 'Lack of real-time schema validation prevents automation...')"
            value={problem.gapDescription}
            onChange={(v:any) => updateProblem({ gapDescription: v })}
          />
          <Section 
            label="Impact of Failure" 
            placeholder="What happens if we do nothing? (e.g., '$50k per month in lost labor and 5% error rate...')"
            value={problem.impactOfFailure}
            onChange={(v:any) => updateProblem({ impactOfFailure: v })}
          />
        </div>
      </div>

      <div className="p-6 bg-slate-900 text-white border-l-8 border-blue-600">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Executive Summary Generator</h3>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold uppercase">Urgency: {problem.urgencyScore}/10</span>
            <input 
              type="range" min="1" max="10" 
              className="w-24 accent-blue-500"
              value={problem.urgencyScore}
              onChange={(e) => updateProblem({ urgencyScore: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <p className="text-sm font-medium italic leading-relaxed text-slate-300">
          Currently, <span className="text-white font-bold">{problem.currentState || "[...]"}</span>. 
          Our goal is <span className="text-white font-bold">{problem.idealState || "[...]"}</span>, 
          but we are blocked by <span className="text-white font-bold">{problem.gapDescription || "[...]"}</span>. 
          Failure to resolve this leads to <span className="text-white font-bold">{problem.impactOfFailure || "[...]"}</span>.
        </p>
      </div>
    </div>
  );
}

function Section({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</label>
      <textarea 
        className="w-full h-28 p-4 bg-white border-2 border-slate-100 outline-none focus:border-slate-900 text-xs font-medium transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}