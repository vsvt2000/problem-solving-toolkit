/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useCharterStore } from '@/store/final-summary';
import { useBuildStore } from '@/store/cpmai';
import { useAdkarStore } from '@/store/adkar';
import { useVsmStore } from '@/store/vsm';

export default function ProjectCharterSignOff() {
  const { executiveSummary, isLocked, approverName, updateCharter } = useCharterStore();
  const { packages } = useBuildStore();
  const { profiles, getBarrierPoint } = useAdkarStore();
  const { getTotals } = useVsmStore();

  const { efficiency } = getTotals();
  const blockedPackages = packages.filter(p => p.status === 'Blocked').length;
  const humanBarriers = profiles.filter(p => getBarrierPoint(p.groupId) !== 'Clear').length;

  // Sign-Off Logic Gate
  const canSignOff = blockedPackages === 0 && humanBarriers === 0 && efficiency > 5;

  return (
    <div className="max-w-5xl mx-auto p-12 bg-white border-[6px] border-slate-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] space-y-10">
      <header className="border-b-4 border-slate-900 pb-6 text-center">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Phase 4 Project Charter</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">Final Operational Readiness Review</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusTile label="CPMAI Pipeline" value={blockedPackages === 0 ? "STABLE" : "BLOCKED"} color={blockedPackages === 0 ? "text-green-600" : "text-red-600"} />
        <StatusTile label="ADKAR Alignment" value={humanBarriers === 0 ? "READY" : "RESISTANT"} color={humanBarriers === 0 ? "text-green-600" : "text-red-600"} />
        <StatusTile label="Process PER" value={`${efficiency.toFixed(1)}%`} color={efficiency > 15 ? "text-green-600" : "text-amber-500"} />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase text-slate-400">Executive Summary</label>
        <textarea 
          className="w-full h-48 p-6 bg-slate-50 border-2 border-slate-200 text-sm font-medium leading-relaxed italic outline-none focus:border-slate-900"
          placeholder="Synthesize the business case, CPMAI status, and CM plan..."
          value={executiveSummary}
          onChange={(e) => updateCharter({ executiveSummary: e.target.value })}
          disabled={isLocked}
        />
      </div>

      {!canSignOff && (
        <div className="p-6 bg-red-50 border-2 border-red-900">
          <h4 className="text-xs font-black text-red-900 uppercase mb-2">Sign-Off Logic Violation</h4>
          <ul className="text-[10px] font-bold text-red-700 space-y-1 list-disc pl-5">
            {blockedPackages > 0 && <li>CPMAI: You have {blockedPackages} blocked data packages.</li>}
            {humanBarriers > 0 && <li>ADKAR: {humanBarriers} stakeholder groups have active barrier points.</li>}
            {efficiency <= 5 && <li>VSM: Process efficiency is too low for sustainable AI.</li>}
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-end border-t-4 border-slate-900 pt-8">
        <div className="flex-1 space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400">Authorized Approver</label>
          <input 
            className="w-full border-b-2 border-slate-900 py-2 font-black uppercase tracking-widest outline-none"
            value={approverName}
            onChange={(e) => updateCharter({ approverName: e.target.value })}
            disabled={isLocked}
          />
        </div>
        <button 
          disabled={!canSignOff || isLocked}
          onClick={() => updateCharter({ isLocked: true, signOffDate: new Date().toISOString() })}
          className={`px-10 py-4 font-black uppercase tracking-[0.4em] text-white transition-all ${
            canSignOff && !isLocked ? 'bg-slate-900 hover:bg-green-600 shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]' : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {isLocked ? "CHARTER LOCKED" : "AUTHORIZE DEPLOYMENT"}
        </button>
      </div>
    </div>
  );
}

function StatusTile({ label, value, color }: any) {
  return (
    <div className="p-4 bg-slate-50 border-2 border-slate-900 text-center">
      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{label}</p>
      <p className={`text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}