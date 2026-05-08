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
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm selection:bg-blue-100 font-sans text-gray-900">
      {/* Forensic Telemetry Header */}
      <header className="p-8 md:p-12 bg-gray-50/50 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <h2 className="text-2xl font-extrabold tracking-tight uppercase">Full Orchestration Path</h2>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              25-Point Framework Library Analysis Complete
            </p>
          </div>
          
          {/* Section Score Badges */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(scores).map(([key, val]: any) => (
              <div key={key} className="px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center min-w-[48px]">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{key}</span>
                <span className="text-xs font-black text-blue-600">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Sequence List */}
      <div className="divide-y divide-gray-50">
        {mappings.map((m, idx) => (
          <div key={m.phaseId} className="group flex flex-col md:flex-row transition-all duration-300 hover:bg-gray-50/50">
            {/* Phase Step Indicator */}
            <div className="w-full md:w-20 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-50">
              <span className="text-2xl font-black italic text-gray-200 group-hover:text-blue-600 transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Framework Content Area */}
            <div className="flex-1 p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="max-w-2xl space-y-2">
                <span className="text-[9px] font-black uppercase text-blue-600 tracking-[0.2em]">{m.phaseName}</span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-gray-900">{m.assignedFramework}</h3>
                <p className="text-xs leading-relaxed text-gray-500 italic border-l-2 border-gray-100 pl-4">
                  {getInferredLogic(m.assignedFramework, scores)}
                </p>
              </div>

              {/* Forensic Status Badge */}
              <div className="flex flex-col items-start lg:items-end shrink-0 space-y-2">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest">Trigger Metric</span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  getSeverityColor(m.assignedFramework, scores)
                }`}>
                  {getTargetMetric(m.assignedFramework)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Audit Confirmation */}
      <footer className="p-6 bg-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Sequence Locked & Validated</p>
        </div>
        <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
            Total of 25 Methodology Cases Evaluated for Best-Fit.
        </p>
      </footer>
    </div>
  );
}

// Internal Helper for Dynamic Styling
function getSeverityColor(fw: string, scores: any) {
  // Logic from manual: Low scores in E or C trigger high-alert stabilization
  if (scores.E < 15 && fw === 'CPMAI-Build-Tracker') return 'bg-red-50 text-red-600 border border-red-100';
  if (scores.C < 15 && fw === 'Lean-Six-Sigma') return 'bg-amber-50 text-amber-600 border border-amber-100';
  return 'bg-blue-50 text-blue-600 border border-blue-100';
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