"use client";
import React from 'react';
import { useFmeaStore } from '@/store/fmea';

export default function FmeaRiskAnalyst() {
  const { failures, addFailure, updateFailure, removeFailure } = useFmeaStore();

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">FMEA Risk Analyst</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Failure Mode & Effects Analysis</p>
        </div>
        <button 
          onClick={() => addFailure(prompt("Enter Process Step Name:") || "New Step")}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-red-600 transition-colors"
        >
          + Add Failure Mode
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-slate-900">
          <thead>
            <tr className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
              <th className="p-3 text-left border-r border-slate-700">Process Step</th>
              <th className="p-3 text-left border-r border-slate-700">Failure Mode</th>
              <th className="p-3 border-r border-slate-700">Sev</th>
              <th className="p-3 border-r border-slate-700">Occ</th>
              <th className="p-3 border-r border-slate-700">Det</th>
              <th className="p-3 bg-red-800">RPN</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-xs font-bold">
            {failures.map((f) => (
              <tr key={f.id} className="border-b-2 border-slate-900 hover:bg-slate-50">
                <td className="p-3 border-r-2 border-slate-900 uppercase italic">{f.processStep}</td>
                <td className="p-3 border-r-2 border-slate-900">
                  <input 
                    className="w-full bg-transparent outline-none"
                    value={f.potentialFailure}
                    onChange={(e) => updateFailure(f.id, { potentialFailure: e.target.value })}
                    placeholder="Describe failure..."
                  />
                </td>
                <ScoreInput value={f.severity} onChange={(v) => updateFailure(f.id, { severity: v })} />
                <ScoreInput value={f.occurrence} onChange={(v) => updateFailure(f.id, { occurrence: v })} />
                <ScoreInput value={f.detection} onChange={(v) => updateFailure(f.id, { detection: v })} />
                <td className={`p-3 text-center text-sm font-black ${f.rpn > 100 ? 'text-red-600' : 'text-slate-900'}`}>
                  {f.rpn}
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => removeFailure(f.id)} className="text-slate-300 hover:text-red-600">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="p-4 bg-red-50 border-2 border-red-900">
        <p className="text-[10px] font-black uppercase text-red-900">Governance Gate:</p>
        <p className="text-[11px] font-medium text-red-800 italic">
          High RPN items (&gt;125) must be mitigated in the Improve stage of Lean Six Sigma before CPMAI stabilization begins.
        </p>
      </footer>
    </div>
  );
}

function ScoreInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <td className="p-3 border-r-2 border-slate-900 text-center">
      <input 
        type="number" min="1" max="10"
        className="w-8 text-center bg-transparent font-black"
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
      />
    </td>
  );
}