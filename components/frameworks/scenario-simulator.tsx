/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useSimulatorStore } from '@/store/scenario-simulator';
import { useDiagnosticStore } from '@/store/diagnostic';
import { useVsmStore } from '@/store/vsm';

export default function ScenarioSimulator() {
  const { adoptionRate, dataReliability, results, runSimulation } = useSimulatorStore();
  const { scores } = useDiagnosticStore();
  const { steps } = useVsmStore();

  return (
    <div className="space-y-10 font-sans p-8 bg-slate-900 text-white border-[6px] border-slate-900 shadow-[12px_12px_0px_0px_rgba(59,130,246,1)]">
      <header className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">AI Scenario Simulator</h2>
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Stress-Testing the Operational Hypothesis</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Input Sliders */}
        <div className="space-y-8">
          <SimSlider 
            label="Human Adoption (ADKAR %)" 
            value={adoptionRate} 
            onChange={(v:any) => useSimulatorStore.setState({ adoptionRate: v })} 
          />
          <SimSlider 
            label="Data Reliability (CPMAI %)" 
            value={dataReliability} 
            onChange={(v:any) => useSimulatorStore.setState({ dataReliability: v })} 
          />
          <button 
            onClick={() => runSimulation(steps, scores)}
            className="w-full py-4 bg-blue-600 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all"
          >
            Execute Simulation Run
          </button>
        </div>

        {/* Output Gauges */}
        <div className="bg-slate-800 p-8 border-l-4 border-blue-500 space-y-6">
          {results ? (
            <>
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black uppercase text-slate-400">Risk of Failure</p>
                <p className={`text-3xl font-black ${results.riskOfFailure > 50 ? 'text-red-500' : 'text-green-400'}`}>
                  {results.riskOfFailure}%
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black uppercase text-slate-400">Projected Efficiency</p>
                <p className="text-3xl font-black text-blue-400">{results.efficiencyGain.toFixed(1)}%</p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-[9px] font-black uppercase text-slate-500">Critical Bottleneck</p>
                <p className="text-xs font-bold uppercase text-white truncate">{results.bottleneckStep}</p>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 italic text-xs">
              Waiting for simulation parameters...
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-900/30 rounded border border-blue-800 text-[10px] italic text-blue-200">
        Brutal Reality Check: This simulation is limited by your Section C (AI Maturity). High technology goals with Low Maturity scores will force a Failure Cascade in the logic engine.
      </div>
    </div>
  );
}

function SimSlider({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase">
        <span className="text-slate-400">{label}</span>
        <span>{value}%</span>
      </div>
      <input 
        type="range" 
        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
}