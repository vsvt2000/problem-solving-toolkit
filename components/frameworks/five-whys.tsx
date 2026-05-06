/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useWhyStore } from '@/store/why-store';

export default function FiveWhysForensic() {
  const { chains, addChain, updateWhy, setMetadata, removeChain } = useWhyStore();

  return (
    <div className="space-y-12 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl text-slate-900 font-bold uppercase italic tracking-tighter">Root Cause: 5 Whys Drill-Down</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Forensic Causal Mapping</p>
        </div>
        <button 
          onClick={() => addChain(prompt("What is the initial symptom?") || "")}
          className="bg-slate-900 text-white px-4 py-2 text-[10px] text-black font-bold uppercase shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
        >
          + Start Logic Chain
        </button>
      </header>

      <div className="space-y-10">
        {chains.map((chain) => (
          <div key={chain.id} className="p-8 border-2 border-slate-900 bg-white relative">
            <button 
              onClick={() => removeChain(chain.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-600"
            >
              ✕
            </button>
            
            <div className="mb-8">
              <span className="text-[9px] text-black font-bold uppercase text-orange-600 bg-orange-50 px-2 py-1">Initial Symptom</span>
              <h3 className="text-lg text-black font-bold uppercase mt-1">{chain.problemStatement}</h3>
            </div>

            <div className="space-y-6 relative">
              {/* Connecting Line Decor */}
              <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-slate-100 -z-10" />
              
              {chain.whys.map((why, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-none w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] text-black font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <label className="text-[8px] text-black font-bold uppercase text-slate-400">Why does this happen?</label>
                    <input 
                      className="w-full border-b-2 border-slate-100 py-1 text-sm text-black font-bold focus:border-orange-500 outline-none transition-colors"
                      value={why}
                      placeholder={index === 0 ? "Because..." : `Because ${chain.whys[index-1].slice(0, 20)}...`}
                      onChange={(e) => updateWhy(chain.id, index, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t-2 border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] text-black font-bold uppercase text-slate-400">Final Root Cause Category</label>
                <select 
                  className="w-full text-xs text-black font-bold uppercase border-2 border-slate-900 p-2"
                  value={chain.rootCauseType}
                  onChange={(e) => setMetadata(chain.id, { rootCauseType: e.target.value as any })}
                >
                  <option value="Process">Process (The Way)</option>
                  <option value="Technical">Technical (The Tool)</option>
                  <option value="Data">Data (The Fuel)</option>
                  <option value="Human">Human (The Will)</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-slate-900"
                  checked={chain.isVerifiedByData}
                  onChange={(e) => setMetadata(chain.id, { isVerifiedByData: e.target.checked })}
                />
                <label className="text-[10px] text-black font-bold uppercase leading-tight">
                  Verified by Digital Shadow / VSM Data?
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}