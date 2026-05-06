/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from 'react';
import { useToolkitStore as useSipocStore } from '@/store/frameworks';
import { useShadowStore } from '@/store/shadow';

export default function DigitalShadowMapper() {
  const { sipocRows } = useSipocStore();
  const { gaps, syncSipocData, updateGap } = useShadowStore();

  // Sync SIPOC steps into the mapper on mount
  useEffect(() => {
    if (gaps.length === 0 && sipocRows.length > 0) syncSipocData(sipocRows);
  }, [sipocRows]);

  return (
    <div className="space-y-8 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl text-black font-bold uppercase italic text-slate-900">Step 2.3: Digital Shadow Mapper</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Reality vs. Perception Audit</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {gaps.map((gap) => (
          <div key={gap.stepId} className="grid grid-cols-1 md:grid-cols-4 border-2 border-slate-900 bg-white">
            <div className="p-4 bg-slate-900 text-white flex flex-col justify-center">
              <span className="text-[9px] text-black font-bold uppercase text-slate-400">Process Step</span>
              <span className="text-xs font-bold truncate">{gap.processName || "Unnamed Step"}</span>
            </div>
            
            <div className="p-4 border-r border-slate-900">
              <label className="text-[9px] text-black font-bold uppercase text-slate-400 block mb-1">Stakeholder Claim</label>
              <input 
                className="w-full text-xs text-black font-bold outline-none border-b border-transparent focus:border-blue-600"
                placeholder="e.g. 'Takes 5 minutes'"
                value={gap.reportedEffort}
                onChange={(e) => updateGap(gap.stepId, { reportedEffort: e.target.value })}
              />
            </div>

            <div className={`p-4 border-r border-slate-900 ${gap.actualTrace === 'Missing' ? 'bg-red-50' : 'bg-green-50'}`}>
              <span className="text-[9px] text-black font-bold uppercase text-slate-400 block mb-1">Digital Shadow</span>
              <span className={`text-xs text-black font-bold uppercase ${gap.actualTrace === 'Missing' ? 'text-red-600' : 'text-green-600'}`}>
                {gap.actualTrace}
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-black font-bold uppercase text-slate-400 mb-1">Variance</span>
                <select 
                  className="text-xs text-black font-bold uppercase outline-none bg-transparent"
                  value={gap.varianceLevel}
                  onChange={(e) => updateGap(gap.stepId, { varianceLevel: e.target.value as any })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (Delusion)</option>
                </select>
              </div>
              {gap.varianceLevel === 'High' && <span className="text-xl animate-pulse">🚩</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Forensic Summary Logic */}
      <div className="p-6 bg-slate-900 text-white space-y-2">
        <h4 className="text-[10px] text-black font-bold uppercase text-blue-400 tracking-widest">Forensic Conclusion</h4>
        <p className="text-xs leading-relaxed italic">
          Significant variance in steps with Missing digital shadows indicates a high probability of **Maverick Processes**. AI implementation in these areas will require manual instrumentation before automation.
        </p>
      </div>
    </div>
  );
}