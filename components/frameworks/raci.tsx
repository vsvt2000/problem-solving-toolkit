"use client";
import React, { useEffect } from 'react';
import { useRaciStore, RaciValue } from '@/store/raci';

export default function RaciAiMatrix() {
  const { assignments, roles, addTask, updateAssignment } = useRaciStore();

  // Initialize with AI-specific tasks if empty
  useEffect(() => {
    if (assignments.length === 0) {
      ["Model Tuning", "Pipeline Monitoring", "Ethical Audit", "Final Sign-off"].forEach(addTask);
    }
  }, [assignments.length, addTask]);

  const raciOptions: RaciValue[] = ['R', 'A', 'C', 'I', ''];

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">RACI-AI Matrix</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Lifecycle Accountability Mapping</p>
        </div>
        <button 
          onClick={() => addTask(prompt("Enter AI Lifecycle Task:") || "New Task")}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-blue-600 transition-all"
        >
          + Add Task
        </button>
      </header>

      <div className="overflow-x-auto border-2 border-slate-900">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-[9px] font-black uppercase">
              <th className="p-4 text-left border-r border-slate-700">AI Lifecycle Task</th>
              {roles.map(role => (
                <th key={role} className="p-4 text-center border-r border-slate-700">{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4 text-xs font-black uppercase italic border-r-2 border-slate-900 bg-white">
                  {row.task}
                </td>
                {roles.map(role => (
                  <td key={role} className="p-2 border-r border-slate-200">
                    <select 
                      className={`w-full p-2 text-center font-black text-xs appearance-none outline-none rounded ${
                        row.assignments[role] === 'A' ? 'bg-blue-600 text-white' : 
                        row.assignments[role] === 'R' ? 'bg-slate-200 text-slate-900' : 'bg-transparent'
                      }`}
                      value={row.assignments[role] || ''}
                      onChange={(e) => updateAssignment(row.id, role, e.target.value as RaciValue)}
                    >
                      {raciOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">{opt || '-'}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-blue-50 border-2 border-blue-900">
        <h4 className="text-[9px] font-black uppercase text-blue-900 mb-1">RACI-AI Rule:</h4>
        <p className="text-[10px] font-medium text-blue-800 italic">
          Every AI Lifecycle task must have exactly one A (Accountable). If Model Tuning has no accountability, the Governance Watchtower will flag a critical breach.
        </p>
      </div>
    </div>
  );
}