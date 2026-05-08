/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { useRoadmapBuilderStore } from '@/store/roadmap-builder';
import { COMPONENT_REGISTRY } from './framework-switcher';

// --- MAIN UNIFIED COMPONENT ---
export default function CustomRoadmapCreator() {
  const { selections, isLocked, lockRoadmap, resetRoadmap, setPhaseSelection } = useRoadmapBuilderStore();
  const [executingPhase, setExecutingPhase] = useState<string | null>(null);

  const COMPONENT_LIBRARY = {
    phase1: ['Problem Statement', 'VOC Intake', '5-Whys Forensic', 'Digital Shadow Mapper', 'Project Charter'],
    phase2: ['SIPOC 4.0', 'Stakeholder Power Grid', 'Value Case Draft', 'Value-Feasibility Matrix', 'Strategic Playbook'],
    phase3: ['VSM 4.0', 'AI Solution Design', 'RACI-AI Matrix', 'Infrastructure Audit', 'Pre-Mortem Audit'],
    phase4: ['CPMAI Build Tracker', 'ADKAR Diagnostic', 'Three-Pillar CM', 'Data Pipeline Sentry', 'FMEA Risk Analyst'],
    phase5: ['Governance Watchtower', 'Kaizen PDCA', 'Scenario Simulator', 'Socratic Audit Log', 'ROI Realization Tracker']
  };

  // 1. NESTED VIEW: IMPLEMENTATION ORCHESTRATOR
  if (executingPhase) {
    const phaseMap: Record<string, keyof typeof selections> = {
      'A': 'phase1', 'B': 'phase2', 'C': 'phase3', 'D': 'phase4', 'E': 'phase5'
    };
    const activePhaseKey = phaseMap[executingPhase];
    const userSelectedTools = selections[activePhaseKey] || [];

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 flex justify-between items-center border-b-4 border-slate-900 pb-6">
            <button 
              onClick={() => setExecutingPhase(null)} 
              className="bg-white border-2 border-slate-900 px-4 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ← Return to Roadmap
            </button>
            <div className="text-right">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Phase {executingPhase} Execution</h2>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{userSelectedTools.length} Tools Loaded</p>
            </div>
          </header>

          <div className="space-y-12">
            {userSelectedTools.map((toolName: string) => (
              <div key={toolName} className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-slate-900 p-3 flex justify-between items-center">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{toolName}</h3>
                  <span className="text-[8px] font-black bg-blue-500 text-white px-2 py-0.5 uppercase">Forensic Active</span>
                </div>
                <div className="p-8">
                  {COMPONENT_REGISTRY[toolName] || <div className="italic text-slate-400">Registry entry for {toolName} missing.</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. NESTED VIEW: LOCKED FINAL ROADMAP
  if (isLocked) {
    const phaseToId: Record<string, string> = {
      phase1: 'A', phase2: 'B', phase3: 'C', phase4: 'D', phase5: 'E'
    };

    return (
      <div className="p-10 bg-slate-900 text-white min-h-screen font-sans">
        <div className="flex justify-between items-center mb-12 border-b-2 border-slate-700 pb-6">
          <h2 className="text-4xl font-bold uppercase italic tracking-tighter">Locked Implementation Path</h2>
          <button onClick={resetRoadmap} className="text-[10px] px-4 py-2 bg-white text-black font-bold uppercase shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:shadow-none transition-all">
            Re-Architect
          </button>
        </div>

        <div className="space-y-12">
          {Object.entries(selections).map(([phase, tools]: any, idx) => (
            <div key={phase} className="flex gap-8 group">
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white font-bold text-xl italic shrink-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                {idx + 1}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                  <h4 className="text-xs text-blue-400 font-bold uppercase tracking-widest">{phase.toUpperCase()}</h4>
                  <button 
                    onClick={() => setExecutingPhase(phaseToId[phase])}
                    className="text-[9px] font-black uppercase text-white underline hover:text-blue-400 transition-colors"
                  >
                    Execute Phase {phaseToId[phase]} →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.length > 0 ? tools.map((t: string) => (
                    <div key={t} className="p-4 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tight group-hover:border-blue-500/50 transition-colors">
                      {t}
                    </div>
                  )) : <p className="text-[10px] italic text-slate-500">No components selected for this stage.</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. DEFAULT VIEW: THE SELECTION ARCHITECT
  return (
    <div className="p-10 bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] font-sans">
      <header className="mb-10 border-b-8 border-slate-900 pb-6">
        <h2 className="text-3xl text-black font-bold uppercase italic tracking-tighter">Roadmap Architect v1.0</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Manual Forensic Sequence Configuration</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(COMPONENT_LIBRARY).map(([phase, tools]) => (
          <div key={phase} className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-blue-600 border-b-2 border-blue-600 pb-1">{phase.replace('phase', 'PHASE ')}</h3>
            {tools.map((tool) => {
              const isSelected = (selections as any)[phase].includes(tool);
              return (
                <label key={tool} className={`flex items-center gap-2 p-3 border-2 cursor-pointer transition-all min-h-[60px] ${isSelected ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <input 
                    type="checkbox" className="hidden"
                    checked={isSelected}
                    onChange={() => {
                      const current = (selections as any)[phase];
                      const next = isSelected ? current.filter((t: string) => t !== tool) : [...current, tool];
                      setPhaseSelection(phase as any, next);
                    }}
                  />
                  <span className={`text-[10px] font-bold uppercase leading-tight ${isSelected ? 'text-white' : 'text-black'}`}>{tool}</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={lockRoadmap} className="w-full mt-12 py-4 bg-blue-600 text-white font-bold uppercase tracking-[0.3em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Lock & Generate Forensic Sequence
      </button>
    </div>
  );
}