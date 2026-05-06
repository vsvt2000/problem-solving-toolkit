"use client";
import React from 'react';
import { useCMStore } from '@/store/cm-store';
import { useDiagnosticStore } from '@/store/diagnostic';

export default function ThreePillarCMDesigner() {
  const { actions, addAction, updateAction, removeAction } = useCMStore();
  const { scores } = useDiagnosticStore();

  const pillars: ('Communication' | 'Education' | 'Incentive')[] = ['Communication', 'Education', 'Incentive'];

  // Brutal Logic: If Section D (Buy-in) < 15, CM is non-negotiable
  const highRiskAdoption = scores.D < 15;

  return (
    <div className="space-y-12 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl text-black font-bold uppercase italic tracking-tighter text-slate-900">Step 4.2: Change Management Design</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Pillars: Transparency, Capability, & Alignment
          </p>
        </div>
        {highRiskAdoption && (
          <div className="bg-red-600 text-white px-3 py-1 text-[9px] text-black font-bold uppercase animate-pulse">
            High Adoption Risk: Intensive CM Required
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div key={pillar} className="flex flex-col border-2 border-slate-900 bg-white">
            <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">{pillar}</span>
              <button 
                onClick={() => addAction(pillar)}
                className="text-[10px] font-bold bg-blue-600 px-2 py-0.5 hover:bg-blue-500 transition-colors"
              >
                +
              </button>
            </div>
            
            <div className="p-4 flex-1 space-y-4 min-h-[300px]">
              {actions.filter(a => a.pillar === pillar).map(action => (
                <div key={action.id} className="p-4 border border-slate-200 bg-slate-50 relative group">
                  <button 
                    onClick={() => removeAction(action.id)}
                    className="absolute top-1 right-2 text-slate-300 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                  <div className="space-y-3">
                    <textarea 
                      className="w-full text-xs text-black font-bold bg-transparent border-none p-0 resize-none outline-none placeholder-slate-300"
                      placeholder={`Draft ${pillar} action...`}
                      value={action.task}
                      onChange={(e) => updateAction(action.id, { task: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        className="text-[9px] text-black font-bold uppercase border-b border-slate-200 bg-transparent outline-none focus:border-slate-900"
                        placeholder="Owner"
                        value={action.owner}
                        onChange={(e) => updateAction(action.id, { owner: e.target.value })}
                      />
                      <input 
                        className="text-[9px] text-black font-bold uppercase border-b border-slate-200 bg-transparent outline-none focus:border-slate-900"
                        placeholder="Timeline"
                        value={action.timeline}
                        onChange={(e) => updateAction(action.id, { timeline: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {actions.filter(a => a.pillar === pillar).length === 0 && (
                <p className="text-[10px] text-slate-300 italic text-center mt-10">No actions defined for this pillar.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 border-2 border-blue-900">
        <h4 className="text-[10px] text-black font-bold uppercase text-blue-900 mb-2">Strategy Reality Check</h4>
        <p className="text-xs font-medium text-blue-800 leading-relaxed italic">
          The Education pillar must address the specific Technical Inadequacy fears identified in Phase 2. Training is not just about How to use it but Why it doesn&apos;t replace you.
        </p>
      </div>
    </div>
  );
}