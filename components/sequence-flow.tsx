/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useOrchestratorStore } from '@/store/orchestrator';
import { useDiagnosticStore } from '@/store/diagnostic';
import { getInferredLogic } from '@/store/orchestrator';

export default function AllCasesProjectedSequence() {
  const { mappings } = useOrchestratorStore();
  const { scores } = useDiagnosticStore();

  return (
    <div className="p-8 bg-white border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <header className="mb-10 border-b-4 border-slate-900 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Full Orchestration Path</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-2">
            25-Point Framework Library Analysis Complete
          </p>
        </div>
        <div className="flex gap-2">
          {Object.entries(scores).map(([key, val]: any) => (
            <div key={key} className="p-2 border-2 border-slate-900 text-[10px] font-black uppercase">
              {key}: {val}
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        {mappings.map((m, idx) => (
          <div key={m.phaseId} className="flex border-2 border-slate-900 group">
            {/* Phase Number */}
            <div className="w-16 bg-slate-900 text-white flex items-center justify-center font-black text-xl italic">
              {idx + 1}
            </div>

            {/* Framework Details */}
            <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-center gap-6 group-hover:bg-slate-50 transition-colors">
              <div className="max-w-xl">
                <span className="text-[9px] font-black uppercase text-blue-600">{m.phaseName}</span>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">{m.assignedFramework}</h3>
                <p className="text-[11px] font-medium italic text-slate-500 leading-relaxed">
                  {getInferredLogic(m.assignedFramework, scores)}
                </p>
              </div>

              {/* Forensic Metric Badge */}
              <div className="flex flex-col items-end shrink-0">
                <div className="text-[9px] font-black uppercase mb-1">Trigger Metric</div>
                <div className={`px-4 py-1 border-2 border-slate-900 text-xs font-black uppercase ${
                  getSeverityColor(m.assignedFramework, scores)
                }`}>
                  {getTargetMetric(m.assignedFramework)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 p-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest text-center">
        ✓ Sequence Locked. Total of 25 Methodology Cases Evaluated for Best-Fit.
      </footer>
    </div>
  );
}

// Internal Helper for Dynamic Styling
function getSeverityColor(fw: string, scores: any) {
  if (scores.E < 12 && fw === 'CPMAI-Build-Tracker') return 'bg-red-500 text-white';
  if (scores.C < 12 && fw === 'Lean-Six-Sigma') return 'bg-amber-400 text-slate-900';
  return 'bg-green-500 text-white';
}

function getTargetMetric(fw: string) {
  const metrics: any = {
    'SIPOC': 'Boundary Health',
    'Lean-Six-Sigma': 'Process Variation',
    'CPMAI-Build-Tracker': 'Pipeline Hygiene',
    'FMEA': 'Risk RPN',
    'ADKAR-Diagnostic': 'Culture Buy-in',
    'Socratic-Audit-Log': 'Logic Integrity'
  };
  return metrics[fw] || 'Operational Stability';
}