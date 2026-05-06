"use client";
import React from 'react';
import { useFinanceStore } from '@/store/finance';
import { useLssStore } from '@/store/lss';

export default function RoiRealizationTracker() {
  const { projectedAnnualSavings, capitalExpenditure, updateFinance } = useFinanceStore();
  const { lssData } = useLssStore();

  const roi = capitalExpenditure > 0 
    ? ((projectedAnnualSavings - capitalExpenditure) / capitalExpenditure) * 100 
    : 0;

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">ROI Realization Tracker</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Financial Impact of Operational Change</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 border-2 border-slate-900">
          <p className="text-[9px] font-black uppercase text-slate-400">Projected ROI</p>
          <p className={`text-3xl font-black ${roi > 20 ? 'text-green-600' : 'text-slate-900'}`}>
            {roi.toFixed(1)}%
          </p>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">Total CAPEX ($)</label>
              <input 
                type="number" 
                className="w-full border-b-2 border-slate-200 py-1 font-bold outline-none focus:border-slate-900"
                value={capitalExpenditure}
                onChange={(e) => updateFinance({ capitalExpenditure: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400">Annual Savings ($)</label>
              <input 
                type="number" 
                className="w-full border-b-2 border-slate-200 py-1 font-bold outline-none focus:border-slate-900"
                value={projectedAnnualSavings}
                onChange={(e) => updateFinance({ projectedAnnualSavings: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 italic text-[11px] text-amber-900">
        Note: This ROI includes the defect reduction targets (DPMO: {lssData?.dpmoTarget || 'N/A'}) established in the Lean Six Sigma module.
      </div>
    </div>
  );
}