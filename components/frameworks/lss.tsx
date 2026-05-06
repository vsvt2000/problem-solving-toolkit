"use client";
import React from 'react';
import { useLssStore } from '@/store/lss';

export default function LeanSixSigmaModule() {
  const { lssData, updateLss, calculateSigmaLevel } = useLssStore();
  const wastes = ['Transport', 'Inventory', 'Motion', 'Waiting', 'Overproduction', 'Over-processing', 'Defects'];

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Lean Six Sigma: DMAIC</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Process Variation & Waste Reduction</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-slate-400">Current Sigma Level</p>
          <p className="text-2xl font-black text-blue-600">ζ {calculateSigmaLevel()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Waste Identification (Lean) */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600">TIMWOOD Waste Analysis</h4>
          <div className="grid grid-cols-1 gap-2">
            {wastes.map(w => (
              <label key={w} className="flex items-center gap-3 p-3 border-2 border-slate-900 bg-white hover:bg-slate-50 cursor-pointer transition-all">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-slate-900"
                  checked={lssData?.wasteIdentified.includes(w)}
                  onChange={(e) => {
                    const current = lssData?.wasteIdentified || [];
                    const next = e.target.checked ? [...current, w] : current.filter(x => x !== w);
                    updateLss({ wasteIdentified: next });
                  }}
                />
                <span className="text-xs font-bold uppercase">{w}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Statistical Stabilization (Six Sigma) */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Variation Control (DPMO)</h4>
          <div className="p-6 bg-slate-900 text-white space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400">Baseline DPMO (Defects per Million)</label>
              <input 
                type="number"
                className="w-full bg-transparent border-b-2 border-slate-700 py-2 text-xl font-black outline-none focus:border-blue-500"
                value={lssData?.dpmoBase || 0}
                onChange={(e) => updateLss({ dpmoBase: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400">Target Post-AI DPMO</label>
              <input 
                type="number"
                className="w-full bg-transparent border-b-2 border-slate-700 py-2 text-xl font-black outline-none focus:border-green-500"
                value={lssData?.dpmoTarget || 0}
                onChange={(e) => updateLss({ dpmoTarget: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}