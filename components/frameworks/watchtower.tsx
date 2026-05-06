"use client";
import React from 'react';
import { useWatchtowerStore } from '@/store/watchtower';
import { useCharterStore } from '@/store/final-summary';

export default function GovernanceWatchtower() {
  const { alerts, isSystemHealthy, mitigateAlert } = useWatchtowerStore();
  const { isLocked, signOffDate } = useCharterStore();

  return (
    <div className="space-y-8 font-sans">
      {/* System Status Header */}
      <div className={`p-6 border-4 flex justify-between items-center ${
        isSystemHealthy ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'
      }`}>
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Governance Watchtower</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1">
            Status: {isSystemHealthy ? 'System Operating Within Bounds' : 'CRITICAL GOVERNANCE BREACH'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black uppercase text-slate-400">Deployment Authorized</p>
          <p className="text-xs font-bold">{signOffDate ? new Date(signOffDate).toLocaleDateString() : 'PENDING'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Real-time Alert Feed */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Alert Feed</h3>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="p-10 border-2 border-dashed border-slate-200 text-center text-slate-400 text-xs italic">
                No active governance breaches detected.
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`p-4 border-l-8 bg-white shadow-sm border-2 ${
                  alert.severity === 'Critical' ? 'border-red-600' : 'border-amber-500'
                } ${alert.status === 'Mitigated' ? 'opacity-40' : 'opacity-100'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400">{alert.category}</p>
                      <p className="text-xs font-bold text-slate-900">{alert.message}</p>
                    </div>
                    {alert.status === 'Active' && (
                      <button 
                        onClick={() => mitigateAlert(alert.id)}
                        className="text-[9px] font-black uppercase underline hover:text-blue-600"
                      >
                        Mitigate
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log Controls */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 text-white space-y-4">
            <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Socratic Audit Log</h4>
            <p className="text-[11px] font-medium leading-relaxed italic text-slate-300">
              Is the AI still solving the problem defined in Phase 1, or has it created a new process bottleneck?
            </p>
            <button className="w-full py-2 border border-white text-[9px] font-black uppercase hover:bg-white hover:text-slate-900 transition-all">
              Request Full Audit
            </button>
          </div>
          
          <div className="p-4 border-2 border-slate-900">
             <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Gatekeeper Status</p>
             <div className="flex items-center gap-2">
               <div className={`w-3 h-3 rounded-full ${isLocked ? 'bg-green-500' : 'bg-red-500'}`} />
               <span className="text-[10px] font-bold uppercase">{isLocked ? 'Charter Locked' : 'Unlocked/Vulnerable'}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}