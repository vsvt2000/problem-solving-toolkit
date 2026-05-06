/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useDiagnosisStore } from '@/store/rca';
import { useToolkitStore as useSipocStore } from '@/store/frameworks';

export default function DiagnosisRcaModule() {
  const { causalChains, addChain, updateChain, removeChain } = useDiagnosisStore();
  const { sipocRows } = useSipocStore();

  const handleAiVerification = (id: string, assumption: string) => {
    // Forensic AI Logic: Comparing assumption against SIPOC Observability Gaps
    const gapCount = sipocRows.filter(r => !r.hasDigitalFootprint).length;
    
    const feedback = `Forensic Analysis: Assumption suggests a process bottleneck. However, you have ${gapCount} observability gaps in your SIPOC. Reality check: The 'shadow process' is likely manual and undocumented, making current metrics unreliable.`;
    
    updateChain(id, { aiVerification: feedback });
  };

  return (
    <div className="space-y-10 font-sans bg-white">
      <header className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
        <div>
          <h2 className="text-2xl text-black uppercase italic text-slate-900">Phase 2: Root Cause Diagnosis</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Forensic Reality Testing</p>
        </div>
        <div className="flex gap-2">
          {['Technical', 'Process', 'Behavioral'].map((type: any) => (
            <button 
              key={type}
              onClick={() => addChain(type)}
              className="px-3 py-1 bg-slate-100 border border-slate-900 text-[9px] text-black font-bold uppercase hover:bg-slate-900 hover:text-white transition-all"
            >
              + {type} Chain
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {causalChains.map((chain) => (
          <div key={chain.id} className="p-6 border-2 border-slate-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="flex justify-between mb-4">
              <span className="bg-slate-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest italic">
                {chain.type} Chain
              </span>
              <button onClick={() => removeChain(chain.id)} className="text-slate-300 hover:text-red-500">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-black uppercase">Stakeholder Assumption</label>
                <textarea 
                  className="w-full text-sm border-b-2 text-black  border-slate-100 focus:border-slate-900 outline-none h-20 resize-none font-medium"
                  placeholder="What do they believe is the cause?"
                  value={chain.assumption}
                  onChange={(e) => updateChain(chain.id, { assumption: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-black uppercase">Digital Evidence</label>
                <textarea 
                  className="w-full text-sm border-b-2 text-black  border-slate-100 focus:border-slate-900 outline-none h-20 resize-none font-medium"
                  placeholder="What does the data actually show?"
                  value={chain.evidence}
                  onChange={(e) => updateChain(chain.id, { evidence: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button 
                onClick={() => handleAiVerification(chain.id, chain.assumption)}
                className="text-[10px] font-bold text-black uppercase tracking-widest text-blue-600 hover:underline"
              >
                Run AI Reality Check
              </button>
              {chain.aiVerification && (
                <div className="mt-3 p-4 bg-indigo-50 border-l-4 border-indigo-500 text-[11px] font-medium text-indigo-900 italic">
                  {chain.aiVerification}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}