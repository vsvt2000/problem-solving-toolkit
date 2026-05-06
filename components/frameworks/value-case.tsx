"use client";
import React from 'react';
import { useValueCaseStore } from '@/store/value-case';

export default function ValueCaseDraft() {
  const { cases, addValueCase, updateValueCase, removeValueCase } = useValueCaseStore();

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Value Case Draft</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Foundational Strategic Justification</p>
        </div>
        <button 
          onClick={addValueCase}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-green-600 transition-all"
        >
          + Add Value Driver
        </button>
      </header>

      <div className="space-y-6">
        {cases.map((vc) => {
          const delta = vc.targetValue - vc.baselineValue;
          const totalImpact = delta * vc.monetaryImpactPerUnit;

          return (
            <div key={vc.id} className="p-8 border-2 border-slate-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
              <button 
                onClick={() => removeValueCase(vc.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-600"
              >✕</button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Strategic Objective</label>
                    <input 
                      className="w-full border-b-2 border-slate-100 py-1 font-bold text-sm outline-none focus:border-slate-900"
                      placeholder="e.g. Optimize Inventory Turnover"
                      value={vc.strategicObjective}
                      onChange={(e) => updateValueCase(vc.id, { strategicObjective: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Primary KPI Metric</label>
                    <input 
                      className="w-full border-b-2 border-slate-100 py-1 font-bold text-sm outline-none focus:border-slate-900"
                      placeholder="e.g. Monthly Stockouts"
                      value={vc.primaryMetric}
                      onChange={(e) => updateValueCase(vc.id, { primaryMetric: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200">
                  <ValField label="Baseline" value={vc.baselineValue} onChange={(v) => updateValueCase(vc.id, { baselineValue: v })} />
                  <ValField label="Target" value={vc.targetValue} onChange={(v) => updateValueCase(vc.id, { targetValue: v })} />
                  <ValField label="Impact / Unit ($)" value={vc.monetaryImpactPerUnit} onChange={(v) => updateValueCase(vc.id, { monetaryImpactPerUnit: v })} />
                  
                  <div className="flex flex-col justify-end">
                    <p className="text-[8px] font-black uppercase text-blue-600">Total Projected Impact</p>
                    <p className="text-lg font-black">${totalImpact.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-[8px] font-black uppercase text-slate-400">Calculation Confidence: {vc.confidenceScore}%</label>
                  <input 
                    type="range" className="w-full h-1 bg-slate-200 appearance-none accent-slate-900"
                    value={vc.confidenceScore}
                    onChange={(e) => updateValueCase(vc.id, { confidenceScore: parseInt(e.target.value) })}
                  />
                </div>
                {vc.confidenceScore < 60 && (
                  <span className="text-[9px] font-black text-red-600 uppercase italic">⚠️ Low Confidence Data</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ValField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-[8px] font-black uppercase text-slate-400">{label}</label>
      <input 
        type="number"
        className="w-full bg-transparent border-b border-slate-300 font-bold text-xs outline-none"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}