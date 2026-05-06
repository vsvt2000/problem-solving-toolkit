"use client";
import React from 'react';
import { useArchitectureStore } from '@/store/architecture';
import { useDiagnosticStore } from '@/store/diagnostic';

export default function HighLevelArchitecture() {
  const { components, addComponent, updateComponent, removeComponent } = useArchitectureStore();
  const { scores } = useDiagnosticStore();

  const layers: ('Interface' | 'Logic/AI' | 'Data/Infrastructure')[] = ['Interface', 'Logic/AI', 'Data/Infrastructure'];

  return (
    <div className="space-y-12 font-sans bg-white">
      <header className="border-b-4 border-slate-900 pb-4">
        <h2 className="text-2xl text-black font-bold uppercase italic tracking-tighter text-slate-900">Step 3.2: Solution Architecture</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Bridging the Observability Gap</p>
      </header>

      <div className="space-y-8">
        {layers.map(layer => (
          <div key={layer} className="space-y-4">
            <div className="flex justify-between items-center bg-slate-100 p-2 border border-slate-900">
              <span className="text-[10px] text-black font-bold uppercase tracking-[0.2em]">{layer} Layer</span>
              <button 
                onClick={() => addComponent(layer)}
                className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 hover:bg-blue-600 transition-colors"
              >
                + Add Component
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {components.filter(c => c.layer === layer).map(comp => (
                <div key={comp.id} className="p-6 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <label className="text-[9px] text-black font-bold uppercase text-slate-400">Description</label>
                    <textarea 
                      className="w-full text-xs text-black font-bold border-none bg-slate-50 p-2 h-16 resize-none outline-none focus:ring-1 focus:ring-slate-900"
                      value={comp.description}
                      onChange={(e) => updateComponent(comp.id, { description: e.target.value })}
                      placeholder="What does this part do?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] text-black font-bold uppercase text-slate-400">Input Source</label>
                    <input 
                      className="w-full text-xs text-black font-bold border-b border-slate-200 py-1 outline-none focus:border-slate-900"
                      value={comp.inputSource}
                      onChange={(e) => updateComponent(comp.id, { inputSource: e.target.value })}
                      placeholder="e.g., CRM API"
                    />
                    {scores.E < 15 && layer === 'Data/Infrastructure' && (
                      <p className="text-[8px] text-red-600 text-black font-bold uppercase mt-1">⚠️ Low Data Readiness detected in Section E</p>
                    )}
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <label className="text-[9px] text-black font-bold uppercase text-slate-400">Output Destination</label>
                      <input 
                        className="w-full text-xs text-black font-bold border-b border-slate-200 py-1 outline-none focus:border-slate-900"
                        value={comp.outputDestination}
                        onChange={(e) => updateComponent(comp.id, { outputDestination: e.target.value })}
                        placeholder="e.g., Prediction Dashboard"
                      />
                    </div>
                    <button onClick={() => removeComponent(comp.id)} className="ml-4 text-slate-300 hover:text-red-600 font-bold">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}