"use client";
import React from 'react';
import { useDiagnosisStore } from '@/store/rca';
import { useShadowStore } from '@/store/shadow';
import { useSentimentStore } from '@/store/sentiment';
import { useReportStore } from '@/store/phase2-report';

export default function FinalDiagnosticReport() {
  const { causalChains } = useDiagnosisStore();
  const { gaps } = useShadowStore();
  const { sentiments } = useSentimentStore();
  const { systemicDiagnosis, confidenceScore, readinessLevel, updateReport } = useReportStore();

  const generateSynthesis = () => {
    // Forensic Logic Synthesis
    const highVarianceGaps = gaps.filter(g => g.varianceLevel === 'High').length;
    const resistantStakeholders = sentiments.filter(s => s.primarySentiment === 'Resistant').length;
    
    let score = 100 - (highVarianceGaps * 15) - (resistantStakeholders * 20);
    score = Math.max(0, score);

    let level: 'Green' | 'Amber' | 'Red' = 'Green';
    if (score < 70) level = 'Amber';
    if (score < 40 || highVarianceGaps > 2) level = 'Red';

    const narrative = `Diagnosis complete. Found ${highVarianceGaps} critical Delusion Gaps between perception and digital traces. ${resistantStakeholders} key stakeholders exhibit hidden fears regarding agency. Recommendation: ${level === 'Red' ? 'STOP - Re-instrument process' : 'PROCEED with targeted change management'}.`;

    updateReport({ systemicDiagnosis: narrative, confidenceScore: score, readinessLevel: level });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">Phase 2: Final Synthesis</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Cross-Store Forensic Analysis</p>
        </div>
        <div className={`px-4 py-2 font-black text-white uppercase italic ${
          readinessLevel === 'Red' ? 'bg-red-600' : readinessLevel === 'Amber' ? 'bg-amber-500' : 'bg-green-600'
        }`}>
          {readinessLevel} Readiness
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <StatCard label="Causal Chains" value={causalChains.length} />
        <StatCard label="Delusion Gaps" value={gaps.filter(g => g.varianceLevel === 'High').length} />
        <StatCard label="Confidence" value={`${confidenceScore}%`} />
      </div>

      <div className="space-y-4">
        <button 
          onClick={generateSynthesis}
          className="w-full bg-slate-900 text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all"
        >
          Synthesize Final Diagnosis
        </button>

        {systemicDiagnosis && (
          <div className="p-8 bg-slate-50 border-2 border-slate-900">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest text-center">Diagnostic Narrative</h4>
            <p className="text-sm font-bold text-slate-800 leading-relaxed italic text-center">
              {systemicDiagnosis}
            </p>
          </div>
        )}
      </div>

      <footer className="pt-6 border-t border-slate-100 flex justify-between items-center">
        <p className="text-[9px] font-bold text-slate-400 uppercase">Phase 2 Gate: Forensic Validation</p>
        <button className="text-[10px] font-black text-slate-900 uppercase underline decoration-2 underline-offset-4">
          Lock Diagnosis & Move to Phase 3
        </button>
      </footer>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="p-4 bg-slate-50 border-2 border-slate-900">
      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}