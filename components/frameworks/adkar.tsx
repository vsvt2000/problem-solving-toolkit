"use client";
import React from 'react';
import { AdkarProfile, useAdkarStore } from '@/store/adkar';
import { useDiagnosticStore } from '@/store/diagnostic';

export default function AdkarDiagnostic() {
  const { profiles, addProfile, updateScore, getBarrierPoint } = useAdkarStore();
  const { scores } = useDiagnosticStore();

  const stages: (keyof Omit<AdkarProfile, 'groupId' | 'groupName'>)[] = 
    ['awareness', 'desire', 'knowledge', 'ability', 'reinforcement'];

  return (
    <div className="space-y-10 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl  font-bold uppercase italic tracking-tighter text-slate-900">ADKAR Change Readiness</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Individual Logic Gate Audit</p>
        </div>
        <button 
          onClick={() => addProfile(prompt("Enter Stakeholder Group (e.g. 'End Users')") || "")}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] text-black font-bold uppercase"
        >
          + Track Group
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {profiles.map((p) => {
          const barrier = getBarrierPoint(p.groupId);
          return (
            <div key={p.groupId} className="p-6 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm text-black font-bold uppercase tracking-widest">{p.groupName}</h3>
                {barrier !== 'Clear' && (
                  <span className="bg-red-600 text-white px-2 py-1 text-[9px] text-black font-bold uppercase italic">
                    Barrier Point: {barrier}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-4">
                {stages.map((stage) => (
                  <div key={stage} className="space-y-2 text-center">
                    <p className="text-[8px] text-black font-bold uppercase text-slate-400">{stage}</p>
                    <div className="flex flex-col gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => updateScore(p.groupId, stage, num)}
                          className={`h-4 border border-slate-900 transition-all ${
                            p[stage] >= num ? 'bg-slate-900 shadow-[1px_1px_0px_0px_rgba(59,130,246,1)]' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {barrier === 'Desire' && scores.D < 15 && (
                <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-600 text-[10px] font-bold text-red-900 italic">
                  Critical Alignment: Low Desire matches your low Section D score. Focus on Incentive Pillar.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}