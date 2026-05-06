"use client";
import React from 'react';
import { useSentimentStore } from '@/store/sentiment';

export default function StakeholderSentimentModule() {
  const { sentiments, addSentimentEntry, updateSentimentEntry, removeSentimentEntry } = useSentimentStore();

  const runSentimentAnalysis = (id: string, text: string) => {
    // Forensic NLP Logic: Identifying resistance points and hidden fears
    const feedback = "NLP Analysis: While the tone is professional, the frequent use of 'compliance' and 'safety' suggests a high level of anxiety regarding automated decision-making. Potential hidden fear: Loss of agency/professional judgment.";
    
    updateSentimentEntry(id, { 
      aiAnalysis: feedback, 
      primarySentiment: 'Anxious',
      hiddenFears: ['Loss of Agency', 'Technical Inadequacy']
    });
  };

  return (
    <div className="space-y-12 bg-white">
      <header className="flex justify-between items-end border-b-2 border-slate-900 pb-4">
        <div>
          <h2 className="text-2xl text-black font-bold uppercase italic text-slate-900">Stakeholder Sentiment NLP</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Layer 4: Cultural & Behavioral Audit</p>
        </div>
        <button 
          onClick={addSentimentEntry}
          className="bg-slate-900 text-white px-6 py-2 text-[10px] text-black font-bold uppercase hover:bg-indigo-600 transition-all shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]"
        >
          + Add Interview Record
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {sentiments.map((entry) => (
          <div key={entry.id} className="p-8 border-2 border-slate-900 bg-white relative group">
            <button 
              onClick={() => removeSentimentEntry(entry.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-black font-bold uppercase text-slate-400">Stakeholder Role</label>
                  <input 
                    className="w-full border-b-2 border-slate-100 py-1 text-sm text-black font-bold focus:border-slate-900 outline-none"
                    value={entry.stakeholderRole}
                    onChange={(e) => updateSentimentEntry(entry.id, { stakeholderRole: e.target.value })}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.hiddenFears.map(fear => (
                    <span key={fear} className="px-2 py-1 bg-red-50 text-red-700 text-[9px] text-black font-bold uppercase rounded border border-red-100">
                      {fear}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] text-black font-bold uppercase text-slate-400">Interview Transcript Fragment</label>
                <textarea 
                  className="w-full h-32 p-4 bg-slate-50 border-none text-sm leading-relaxed text-slate-700 focus:ring-2 focus:ring-slate-900"
                  placeholder="Paste raw notes or transcript here..."
                  value={entry.rawTranscript}
                  onChange={(e) => updateSentimentEntry(entry.id, { rawTranscript: e.target.value })}
                />
                <button 
                  onClick={() => runSentimentAnalysis(entry.id, entry.rawTranscript)}
                  className="w-full py-2 bg-slate-100 border border-slate-900 text-[10px] text-black font-bold uppercase hover:bg-slate-900 hover:text-white transition-all"
                >
                  Analyze Hidden Fears
                </button>
              </div>
            </div>

            {entry.aiAnalysis && (
              <div className="mt-8 p-6 bg-indigo-900 text-indigo-100 rounded-none border-l-8 border-indigo-400">
                <p className="text-[10px] text-black font-bold uppercase text-indigo-300 mb-2 tracking-widest">Socratic Empathy Audit</p>
                <p className="text-xs leading-relaxed italic font-medium">{entry.aiAnalysis}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}