"use client";
import React from 'react';
import { useKaizenStore } from '@/store/kaizen';
import { useVsmStore } from '@/store/vsm';

export default function KaizenPDCA() {
  const { optimizations, addObservation, updateOptimization, standardizeImprovement } = useKaizenStore();
  const { steps } = useVsmStore();

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl text-black font-bold uppercase italic tracking-tighter">Layer 5: Kaizen PDCA Loop</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Continuous Improvement & Standardization</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs text-black font-bold uppercase text-blue-600">Active Observations</h3>
          {steps.map(step => (
            <button 
              key={step.id}
              onClick={() => addObservation(step.id)}
              className="w-full text-left p-3 border border-slate-200 hover:border-slate-900 text-[10px] font-bold uppercase transition-all flex justify-between"
            >
              <span>Log Observation: {step.name}</span>
              <span className="text-slate-400">+</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {optimizations.map((opt) => (
            <div key={opt.id} className={`p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${opt.status === 'Standardized' ? 'opacity-60 border-dashed' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[9px] text-black font-bold uppercase px-2 py-0.5 ${opt.status === 'Standardized' ? 'bg-green-600' : 'bg-amber-500'} text-white`}>
                  {opt.status}
                </span>
                <span className="text-[9px] font-bold text-slate-400">ID: {opt.id.slice(0,8)}</span>
              </div>

              <div className="space-y-4">
                <textarea 
                  className="w-full text-xs font-bold border-none bg-slate-50 p-2 outline-none"
                  placeholder="What was observed in the live process?"
                  value={opt.observation}
                  onChange={(e) => updateOptimization(opt.id, { observation: e.target.value })}
                />
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-[8px] text-black font-bold uppercase text-slate-400">Measured Impact (%)</label>
                    <input 
                      type="number" 
                      className="w-full border-b border-slate-200 py-1 text-xs text-black font-bold outline-none"
                      value={opt.impactMeasured}
                      onChange={(e) => updateOptimization(opt.id, { impactMeasured: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  {opt.status !== 'Standardized' && opt.impactMeasured > 0 && (
                    <button 
                      onClick={() => standardizeImprovement(opt.id)}
                      className="mt-4 bg-slate-900 text-white text-[9px] text-black font-bold px-4 py-2 uppercase hover:bg-green-600 transition-colors"
                    >
                      Standardize
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="p-6 bg-slate-50 border-t-2 border-slate-900 italic">
        <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
          Kaizen is the antidote to Project Amnesia. By logging micro-observations, we ensure the AI system adapts to the shifting Digital Shadow identified in Phase 2.
        </p>
      </footer>
    </div>
  );
}