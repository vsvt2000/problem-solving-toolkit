/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useStakeholderStore } from '@/store/power-grid';

export default function StakeholderPowerGrid() {
  const { stakeholders, addStakeholder, updateStakeholder, removeStakeholder } = useStakeholderStore();

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Stakeholder Power Grid</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Foundational Influence Mapping</p>
        </div>
        <button 
          onClick={() => addStakeholder(prompt("Stakeholder Group Name:") || "New Group")}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-blue-600 transition-all"
        >
          + Add Stakeholder
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* The Matrix Visualization */}
        <div className="relative aspect-square border-4 border-slate-900 bg-slate-50 overflow-hidden">
          {/* Axis Labels */}
          <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[9px] font-black uppercase text-slate-400">High Interest</div>
          <div className="absolute left-2 top-1/2 -rotate-90 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400">High Power</div>
          
          {/* Quadrant Dividers */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 border-r-2 border-slate-200" />
            <div className="w-1/2" />
          </div>
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/2 border-b-2 border-slate-200" />
            <div className="h-1/2" />
          </div>

          {/* Stakeholder Points */}
          {stakeholders.map((s) => (
            <div 
              key={s.id}
              className="absolute w-4 h-4 rounded-full border-2 border-slate-900 transition-all cursor-pointer group"
              style={{ 
                left: `${(s.interest / 10) * 100}%`, 
                bottom: `${(s.power / 10) * 100}%`,
                backgroundColor: s.sentiment === 'Supporter' ? '#22c55e' : s.sentiment === 'Resistant' ? '#ef4444' : '#94a3b8'
              }}
            >
              <div className="invisible group-hover:visible absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black uppercase py-1 px-2 whitespace-nowrap z-10">
                {s.name} (P:{s.power} I:{s.interest})
              </div>
            </div>
          ))}
        </div>

        {/* The Input List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
          {stakeholders.map((s) => (
            <div key={s.id} className="p-4 border-2 border-slate-900 bg-white space-y-3 relative">
              <button onClick={() => removeStakeholder(s.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-600 text-xs">✕</button>
              
              <div className="flex justify-between items-center">
                <input 
                  className="font-black uppercase text-xs outline-none bg-transparent"
                  value={s.name}
                  onChange={(e) => updateStakeholder(s.id, { name: e.target.value })}
                />
                <select 
                  className="text-[9px] font-black uppercase bg-slate-100 p-1 border border-slate-900"
                  value={s.sentiment}
                  onChange={(e) => updateStakeholder(s.id, { sentiment: e.target.value as any })}
                >
                  <option value="Supporter">Supporter</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Resistant">Resistant</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400">Power (1-10)</label>
                  <input 
                    type="range" min="1" max="10" className="w-full h-1 bg-slate-200 appearance-none accent-slate-900"
                    value={s.power}
                    onChange={(e) => updateStakeholder(s.id, { power: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400">Interest (1-10)</label>
                  <input 
                    type="range" min="1" max="10" className="w-full h-1 bg-slate-200 appearance-none accent-slate-900"
                    value={s.interest}
                    onChange={(e) => updateStakeholder(s.id, { interest: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}