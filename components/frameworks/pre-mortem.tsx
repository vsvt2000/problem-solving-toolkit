/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { usePreMortemStore } from '@/store/pre-mortem';
import { useDiagnosticStore } from '@/store/diagnostic';

export default function PreMortemAudit() {
  const { risks, addRisk, updateRisk, removeRisk } = usePreMortemStore();
  const { scores } = useDiagnosticStore();
  const [aiScrutiny, setAiScrutiny] = useState<{ [key: string]: string }>({});

  const runDevilAdvocate = (id: string, risk: any) => {
    // Brutal Logic: If Section D is low, Cultural risks are amplified
    let feedback = "Socratic Scrutiny: Your mitigation assumes user training is enough. ";
    if (scores.D < 15 && risk.category === 'Cultural') {
      feedback += "CRITICAL: Your Buy-in score (Section D) is dangerously low. Training won't fix deep-seated professional agency fears found in Phase 2.";
    } else {
      feedback += "Plan is structurally sound, but ensure observability is maintained.";
    }
    setAiScrutiny(prev => ({ ...prev, [id]: feedback }));
  };

  return (
    <div className="space-y-10 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-red-600">Step 3.3: Pre-Mortem Audit</h2>
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1 italic">Phase 3 Final Gate: Why will we fail?</p>
        </div>
        <div className="flex gap-2">
          {['Technical', 'Cultural', 'Operational'].map((cat: any) => (
            <button key={cat} onClick={() => addRisk(cat)} className="px-3 py-1 bg-red-50 border border-red-900 text-[9px] font-black uppercase text-red-900 hover:bg-red-900 hover:text-white transition-all">
              + {cat} Failure
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {risks.map((risk) => (
          <div key={risk.id} className="p-6 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest bg-red-900 text-white px-2 py-0.5 italic">{risk.category} Failure Scenario</span>
              <button onClick={() => removeRisk(risk.id)} className="text-slate-300 hover:text-red-600">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] text-black font-bold uppercase text-slate-400">Failure Scenario (1 Year from now)</label>
                <textarea 
                  className="w-full text-xs text-black font-bold bg-slate-50 border-none p-3 h-20 outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="e.g., 'The AI model was accurate, but users bypassed it entirely because it added 3 clicks to their workflow.'"
                  value={risk.scenario}
                  onChange={(e) => updateRisk(risk.id, { scenario: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] text-black font-bold uppercase text-slate-400">Mitigation Strategy</label>
                <textarea 
                  className="w-full text-xs text-black font-bold bg-slate-50 border-none p-3 h-20 outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="How do we prevent this TODAY?"
                  value={risk.mitigationPlan}
                  onChange={(e) => updateRisk(risk.id, { mitigationPlan: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button 
                onClick={() => runDevilAdvocate(risk.id, risk)}
                className="text-[9px] font-black uppercase tracking-widest text-red-600 underline decoration-2 underline-offset-4"
              >
                Run Gemini Devil&apos;s Advocate
              </button>
              {aiScrutiny[risk.id] && (
                <div className="mt-4 p-4 bg-slate-900 text-slate-100 text-[11px] leading-relaxed italic font-medium border-l-4 border-red-500">
                  {aiScrutiny[risk.id]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}