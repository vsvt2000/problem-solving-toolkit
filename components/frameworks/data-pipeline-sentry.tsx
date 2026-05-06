"use client";
import React from 'react';
import { useSentryStore } from '@/store/data-pipeline-sentry';

export default function DataPipelineSentry() {
  const { metrics, getGlobalHealth } = useSentryStore();
  const health = getGlobalHealth();

  return (
    <div className="space-y-8 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Data Pipeline Sentry</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">CPMAI Phase 6: Operational Monitoring</p>
        </div>
        <div className={`px-4 py-1 border-2 border-slate-900 font-black text-[10px] uppercase ${
          health === 'Healthy' ? 'bg-green-500 text-white' : 
          health === 'Warning' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white animate-pulse'
        }`}>
          Status: {health}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.length === 0 ? (
          <div className="md:col-span-2 p-12 border-2 border-dashed border-slate-200 text-center italic text-slate-400 text-xs">
            No active pipelines registered for monitoring.
          </div>
        ) : (
          metrics.map((m) => (
            <div key={m.id} className="p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-black uppercase">{m.pipelineName}</h3>
                <span className="text-[8px] font-bold text-slate-400">{m.lastUpdate.split('T')[1].slice(0,5)} UTC</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <MetricBox label="Latency" value={`${m.latencyMs}ms`} alert={m.latencyMs > 1000} />
                <MetricBox label="Throughput" value={`${m.throughput}/s`} />
                <MetricBox label="Drift" value={`${(m.driftScore * 100).toFixed(0)}%`} alert={m.driftScore > 0.2} />
              </div>

              {m.driftScore > 0.3 && (
                <div className="mt-4 p-2 bg-red-50 text-[9px] font-black text-red-700 uppercase border border-red-200">
                  ⚠️ Critical Schema Drift Detected
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest italic">Technical Governance Feed</p>
        <button className="text-[9px] font-black uppercase underline hover:text-blue-400">View Logs</button>
      </div>
    </div>
  );
}

function MetricBox({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className={`p-2 border border-slate-200 ${alert ? 'bg-red-50 border-red-200' : 'bg-slate-50'}`}>
      <p className="text-[8px] font-black uppercase text-slate-400">{label}</p>
      <p className={`text-xs font-black ${alert ? 'text-red-600' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}