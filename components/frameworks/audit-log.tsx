"use client";
import React, { useEffect } from 'react';
import { useAuditStore } from '@/store/audit';

export default function SocraticAuditLog() {
  const { entries, addDefaultQuestions, updateAnswer, toggleVerification } = useAuditStore();

  useEffect(() => {
    addDefaultQuestions();
  }, [addDefaultQuestions]);

  const completionPercentage = (entries.filter(e => e.answer.length > 20 && e.isVerified).length / entries.length) * 100;

  return (
    <div className="space-y-10 font-sans">
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Socratic Audit Log</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Logic & Ethics Integrity Gate</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-slate-400">Audit Completion</p>
          <p className="text-2xl font-black text-slate-900">{completionPercentage.toFixed(0)}%</p>
        </div>
      </header>

      <div className="space-y-8">
        {entries.map((entry, idx) => (
          <div key={entry.id} className="relative p-8 border-2 border-slate-900 bg-white group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-black text-xs italic">
              Q{idx + 1}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-700 leading-tight">
                {entry.question}
              </h3>
              
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 outline-none focus:border-slate-900 text-xs font-medium leading-relaxed italic transition-colors"
                placeholder="Type your justification here (Minimum 20 characters)..."
                value={entry.answer}
                onChange={(e) => updateAnswer(entry.id, e.target.value)}
              />

              <div className="flex justify-between items-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  Last Updated: {new Date(entry.timestamp).toLocaleString()}
                </p>
                <button 
                  onClick={() => toggleVerification(entry.id)}
                  disabled={entry.answer.length < 20}
                  className={`px-4 py-2 text-[9px] font-black uppercase transition-all border-2 ${
                    entry.isVerified 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-white text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900'
                  }`}
                >
                  {entry.isVerified ? '✓ Verified' : 'Verify Logic'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-900 text-white flex items-start gap-4">
        <div className="text-2xl">⚖️</div>
        <div>
          <h4 className="text-xs font-black uppercase text-blue-400 mb-1">Audit Governance Notice</h4>
          <p className="text-[10px] font-medium leading-relaxed text-slate-300 italic">
            An audit log is not a formality. According to Layer 5 Governance standards, deployment is prohibited if any Socratic inquiry remains unverified or answered with boilerplate text.
          </p>
        </div>
      </div>
    </div>
  );
}