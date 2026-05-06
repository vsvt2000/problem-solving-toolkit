"use client";
import React, { useEffect } from 'react';
import { useIdeationStore } from '@/store/ideation';
import { useMatrixStore } from '@/store/value-feasibility';

export default function ValueFeasibilityMatrix() {
  const { solutions } = useIdeationStore();
  const { points, syncWithIdeation, updatePointPosition } = useMatrixStore();

  useEffect(() => {
    if (solutions.length > 0) syncWithIdeation(solutions);
  }, [solutions]);

  return (
    <div className="space-y-8 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Step 3.4: Prioritization Matrix</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Value vs. Feasibility Analysis</p>
      </header>

      <div className="relative w-full aspect-square bg-white border-4 border-slate-900 max-w-2xl mx-auto overflow-hidden">
        {/* Quadrant Labels */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-amber-50/50 border-r-2 border-b-2 border-slate-200 flex items-center justify-center">
          <span className="text-[10px] font-black uppercase text-amber-600 opacity-30">Strategic Spikes</span>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-50/50 border-b-2 border-slate-200 flex items-center justify-center">
          <span className="text-[10px] font-black uppercase text-green-600 opacity-30">Quick Wins</span>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-slate-50 flex items-center justify-center border-r-2 border-slate-200">
          <span className="text-[10px] font-black uppercase text-slate-400 opacity-30">Major Projects</span>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-50/50 flex items-center justify-center">
          <span className="text-[10px] font-black uppercase text-blue-600 opacity-30">Fill-ins</span>
        </div>

        {/* Axis Labels */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-slate-900">Feasibility →</div>
        <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-black uppercase text-slate-900">Value/Impact →</div>

        {/* Data Points */}
        {points.map((p) => (
          <div 
            key={p.id}
            className="absolute group"
            style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
          >
            <div className="w-4 h-4 bg-slate-900 rounded-full cursor-pointer hover:scale-150 transition-transform shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white border border-slate-900 px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <p className="text-[9px] font-black uppercase">{p.title}</p>
              <p className="text-[8px] font-bold text-blue-600 uppercase">{p.quadrant}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map(p => (
          <div key={p.id} className="p-4 border-2 border-slate-900 bg-white flex justify-between items-center">
            <div>
              <p className="text-xs font-black uppercase">{p.title}</p>
              <p className={`text-[9px] font-black uppercase ${p.quadrant === 'Strategic Spike' ? 'text-red-600' : 'text-slate-400'}`}>
                Result: {p.quadrant}
              </p>
            </div>
            <div className="flex gap-4">
               <div className="space-y-1 text-center">
                 <p className="text-[8px] font-black uppercase text-slate-400">Value</p>
                 <input type="range" className="w-16" value={p.y} onChange={(e) => updatePointPosition(p.id, p.x, parseInt(e.target.value))} />
               </div>
               <div className="space-y-1 text-center">
                 <p className="text-[8px] font-black uppercase text-slate-400">Feasibility</p>
                 <input type="range" className="w-16" value={p.x} onChange={(e) => updatePointPosition(p.id, parseInt(e.target.value), p.y)} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}