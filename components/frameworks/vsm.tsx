/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from 'react';
import { useVsmStore } from '@/store/vsm';
import { useToolkitStore as useSipocStore } from '@/store/frameworks';

export default function Vsm40Modeller() {
  const { sipocRows } = useSipocStore();
  const { steps, syncWithSipoc, updateStep, getTotals } = useVsmStore();
  const { totalVAT, totalLT, efficiency } = getTotals();

  useEffect(() => {
    if (steps.length === 0 && sipocRows.length > 0) syncWithSipoc(sipocRows);
  }, [sipocRows]);

  return (
    <div className="space-y-10 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl text-slate-900 font-bold uppercase italic tracking-tighter">Step 4.3: VSM 4.0 Modeller</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Efficiency & Data Observability Audit</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-black font-bold uppercase text-slate-400">Process Efficiency Ratio (PER)</p>
          <p className={`text-2xl text-black font-bold ${efficiency < 15 ? 'text-red-600' : 'text-green-600'}`}>
            {efficiency.toFixed(1)}%
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-4 overflow-x-auto pb-6">
        <div className="flex min-w-max gap-8">
          {steps.map((step, idx) => (
            <div key={step.id} className="w-64 space-y-4">
              {/* Process Box */}
              <div className="p-4 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <span className="absolute -top-3 left-2 bg-slate-900 text-white text-[8px] px-2 py-0.5 text-black font-bold uppercase">
                  Step {idx + 1}
                </span>
                <p className="text-xs text-black font-bold uppercase mb-3 truncate">{step.name || "Undefined"}</p>
                
                <div className="space-y-2">
                  <VsmInput 
                    label="Value-Add (Min)" 
                    value={step.valueAddTime} 
                    onChange={(v:any) => updateStep(step.id, { valueAddTime: parseInt(v) || 0 })} 
                  />
                  <VsmInput 
                    label="Wait Time (Min)" 
                    value={step.waitTime} 
                    onChange={(v:any) => updateStep(step.id, { waitTime: parseInt(v) || 0 })} 
                  />
                </div>
              </div>

              {/* Data Quality Indicator */}
              <div className={`p-2 border-2 border-slate-900 text-center ${step.isDigital ? 'bg-blue-50' : 'bg-red-50'}`}>
                <p className="text-[8px] text-black font-bold uppercase text-slate-500 mb-1">Data Quality (1-10)</p>
                <input 
                  type="range" min="1" max="10" 
                  value={step.dataQualityScore} 
                  onChange={(e) => updateStep(step.id, { dataQualityScore: parseInt(e.target.value) })}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-900 text-white">
        <div className="space-y-1">
          <p className="text-[10px] text-black font-bold uppercase text-blue-400">VSM Logic Audit</p>
          <p className="text-xs font-medium italic leading-relaxed">
            {efficiency < 10 
              ? "Brutal Reality: This process is 90% waste. Automation will only accelerate the production of waste. Redesign the value stream before implementing AI." 
              : "Efficiency is acceptable. Focus AI insertion on the longest Wait Time steps."}
          </p>
        </div>
        <div className="flex justify-around items-center border-l border-slate-700 pl-8">
          <SummaryStat label="Total VAT" value={`${totalVAT}m`} />
          <SummaryStat label="Total Lead Time" value={`${totalLT}m`} />
        </div>
      </div>
    </div>
  );
}

function VsmInput({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center">
      <label className="text-[9px] text-black font-bold uppercase text-slate-400">{label}</label>
      <input 
        type="number"
        className="w-12 text-right text-xs text-black font-bold border-b border-slate-200 outline-none focus:border-slate-900"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SummaryStat({ label, value }: any) {
  return (
    <div className="text-center">
      <p className="text-[8px] text-white font-bold uppercase text-slate-400">{label}</p>
      <p className="text-xl text-white font-bold">{value}</p>
    </div>
  );
}