/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useBuildStore } from '@/store/cpmai';

export default function CpmaiBuildTracker() {
  const { packages, addPackage, updatePackage, removePackage } = useBuildStore();
  const stages: ('Ingestion' | 'Cleaning' | 'Validation' | 'Stabilization')[] = 
    ['Ingestion', 'Cleaning', 'Validation', 'Stabilization'];

  return (
    <div className="space-y-8 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl  font-bold uppercase italic tracking-tighter text-slate-900">Step 4.4: CPMAI Build Tracker</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Data Pipeline Stabilization Board</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map(stage => (
          <div key={stage} className="flex flex-col bg-slate-50 border-2 border-slate-900 min-h-100">
            <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
              <span className="text-[9px] text-white font-bold uppercase tracking-widest">{stage}</span>
              <button 
                onClick={() => addPackage(stage)}
                className="text-xs bg-blue-600 px-2 py-0.5 font-bold hover:bg-blue-500 transition-colors"
              >
                +
              </button>
            </div>

            <div className="p-3 space-y-3">
              {packages.filter(p => p.stage === stage).map(pkg => (
                <div key={pkg.id} className="p-4 bg-white border border-slate-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative group">
                  <button 
                    onClick={() => removePackage(pkg.id)}
                    className="absolute top-1 right-2 text-slate-300 hover:text-red-500 text-[10px] opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                  
                  <textarea 
                    className="w-full text-[11px] text-black font-bold bg-transparent border-none p-0 resize-none outline-none mb-2"
                    placeholder="Describe technical task..."
                    value={pkg.task}
                    onChange={(e) => updatePackage(pkg.id, { task: e.target.value })}
                  />

                  <div className="flex flex-col gap-2">
                    <select 
                      className="text-[9px] text-black font-bold uppercase border border-slate-200 p-1 outline-none"
                      value={pkg.status}
                      onChange={(e) => updatePackage(pkg.id, { status: e.target.value as any })}
                    >
                      <option value="Backlog">Backlog</option>
                      <option value="Blocked">Blocked</option>
                      <option value="In-Testing">In-Testing</option>
                      <option value="Stable">Stable</option>
                    </select>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] text-black font-bold uppercase">
                        <span>Health</span>
                        <span>{pkg.dataHealthScore}%</span>
                      </div>
                      <input 
                        type="range"
                        className="w-full h-1 bg-slate-100 accent-slate-900 appearance-none cursor-pointer"
                        value={pkg.dataHealthScore}
                        onChange={(e) => updatePackage(pkg.id, { dataHealthScore: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  {pkg.stage === 'Stabilization' && pkg.dataHealthScore < 80 && pkg.status === 'Stable' && (
                    <div className="mt-2 text-[8px] font-bold text-red-600 uppercase animate-pulse">
                      Stability Error: Health &lt; 80%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-100 border-2 border-slate-900 border-dashed">
        <h4 className="text-[10px]  font-bold uppercase text-slate-900 mb-2">Technical Governance</h4>
        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">
          According to CPMAI standards, no pipeline can be marked Stable unless the Data Health Score reflects the data readiness improvements defined in Section E.
        </p>
      </div>
    </div>
  );
}