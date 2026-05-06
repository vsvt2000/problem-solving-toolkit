"use client";
import React from 'react';
import { useToolkitStore } from '../../store/frameworks';

export default function Sipoc40Module() {
  // Hooking directly into the store for modularity
  const rows = useToolkitStore((state) => state.sipocRows);
  const updateCell = useToolkitStore((state) => state.updateSipocCell);
  const addRow = useToolkitStore((state) => state.addSipocRow);
  const removeRow = useToolkitStore((state) => state.removeSipocRow);

  // Identify Observability Gaps: Steps lacking a digital footprint
  const hasGaps = rows.some(row => !row.hasDigitalFootprint && row.processStep !== "");

  return (
    <div className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 2: SIPOC 4.0</h2>
          <p className="text-xs text-slate-500 font-medium">Boundary Setting with Data & AI Overlay</p>
        </div>
        <button 
          onClick={addRow}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition"
        >
          + Add Step
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="px-6 py-4 text-left">Supplier</th>
              <th className="px-6 py-4 text-left">Inputs</th>
              <th className="px-6 py-4 text-left">Process (5-7 Steps)</th>
              <th className="px-6 py-4 text-left">Outputs</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-center bg-blue-50/50 text-blue-600">Digital Footprint?</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-black">
            {rows.map((row) => (
              <tr key={row.id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="px-4 py-2">
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm" 
                    placeholder="Source..." 
                    value={row.supplier}
                    onChange={(e) => updateCell(row.id, 'supplier', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm" 
                    placeholder="Resources..." 
                    value={row.input}
                    onChange={(e) => updateCell(row.id, 'input', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800" 
                    placeholder="Action step..." 
                    value={row.processStep}
                    onChange={(e) => updateCell(row.id, 'processStep', e.target.value)}
                  />
                  <button 
                    onClick={() => updateCell(row.id, 'isAutomated', !row.isAutomated)}
                    className={`mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      row.isAutomated ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {row.isAutomated ? 'Automated' : 'Manual'}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm" 
                    placeholder="Deliverable..." 
                    value={row.output}
                    onChange={(e) => updateCell(row.id, 'output', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm" 
                    placeholder="User..." 
                    value={row.customer}
                    onChange={(e) => updateCell(row.id, 'customer', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2 bg-blue-50/30 text-center">
                  <input 
                    type="checkbox" 
                    checked={row.hasDigitalFootprint}
                    onChange={(e) => updateCell(row.id, 'hasDigitalFootprint', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button 
                    onClick={() => removeRow(row.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Observability Gap Flag[cite: 1] */}
      {hasGaps && (
        <div className="m-6 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
          <span className="text-amber-500 text-lg">⚠️</span>
          <div>
            <p className="text-amber-900 text-xs font-black uppercase tracking-tight">Observability Gap Identified[cite: 1]</p>
            <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
              One or more steps lack a digital footprint. These Observability Gaps (e.g., verbal approvals) must be included as sub-problems in your Formal Problem Statement[cite: 1].
            </p>
          </div>
        </div>
      )}
    </div>
  );
}