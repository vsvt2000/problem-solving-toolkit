"use client";
import React from 'react';
import { usePhase1Store } from '@/store/problemStatement';

export default function SignOffGate() {
  const { sectionAScore, isSignedOff, updateMetadata } = usePhase1Store();

  // Logic: Section A 8-14 triggers Discovery Sprint
  const needsDiscoverySprint = sectionAScore >= 8 && sectionAScore <= 14;
  const canProceed = sectionAScore >= 15;

  return (
    <div className="max-w-4xl mx-auto p-10 border-4 border-slate-900 bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] space-y-8">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Phase 1: Definition Sign-Off</h2>
        <div className="flex items-center gap-4 mt-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Section A Score:</label>
          <input 
            type="number"
            className="w-16 border-2 border-slate-900 px-2 py-1 font-bold text-sm text-black"
            value={sectionAScore}
            onChange={(e) => updateMetadata('sectionAScore', parseInt(e.target.value) || 0)}
          />
        </div>
      </header>

      {needsDiscoverySprint && (
        <div className="p-8 bg-amber-50 border-4 border-amber-500 space-y-4">
          <h3 className="text-xl font-black text-amber-900 uppercase italic">⚠️ Emergency Brake: Discovery Sprint Required</h3>
          <p className="text-sm text-amber-800 font-medium leading-relaxed">
            Your Problem Definition score is insufficient for automated diagnosis. You must pause for a **5-day Discovery Sprint** to shadow users and conduct 1:1 interviews before proceeding.
          </p>
          <ul className="text-xs text-amber-900 font-bold space-y-2 list-disc pl-5">
            <li>Day 1-2: Shoulder-to-shoulder shadowing</li>
            <li>Day 3-4: Direct stakeholder interviews</li>
            <li>Day 5: Problem Statement re-calibration</li>
          </ul>
        </div>
      )}

      {canProceed && !isSignedOff && (
        <div className="p-8 bg-green-50 border-4 border-green-500 space-y-6">
          <h3 className="text-xl font-black text-green-900 uppercase italic">✓ Definition Validated</h3>
          <p className="text-sm text-green-800 font-medium">
            The problem is quantified, scoped, and realistic. You are ready for Phase 2: Diagnosis.
          </p>
          <button 
            onClick={() => updateMetadata('isSignedOff', true)}
            className="w-full bg-slate-900 text-white py-4 font-black uppercase tracking-[0.3em] hover:bg-green-600 transition-all"
          >
            Confirm Phase 1 Sign-Off
          </button>
        </div>
      )}

      {isSignedOff && (
        <div className="text-center py-10 space-y-4">
          <div className="text-5xl">🚀</div>
          <h3 className="text-2xl font-black uppercase tracking-widest text-slate-900">Phase 2 Unlocked</h3>
          <p className="text-sm font-bold text-slate-500 italic uppercase">Forensic Reality-Testing Mode Active</p>
        </div>
      )}
    </div>
  );
}