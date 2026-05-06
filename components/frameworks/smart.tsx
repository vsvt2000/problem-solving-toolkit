"use client";
import { useToolkitStore } from '@/store/smart';

export default function LightSmartPlusModule() {
  const { goals, updateGoalText, addGoal, setAiFeedback,removeGoal } = useToolkitStore();

  const handleGeminiCheck = (id: string, text: string) => {
    // Socratic Consultant Logic: Check if the AI Role (+) is realistic
    const feedback = "Socratic Check: You defined the AI role as 'Automation'. Ensure Section C (AI Maturity) isn't at 'Beginner' level, or this will fail.";
    setAiFeedback(id, feedback);
  };

  return (
    <div className="max-w-2xl bg-white border border-slate-200 mx-auto space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">SMART+ Goals</h2>
        <button onClick={addGoal} className="text-blue-600 text-xs font-bold hover:underline">+ New Goal</button>
      </div>

      {goals.map((goal) => (
        <div key={goal.id} className="p-6  rounded-2xl shadow-sm space-y-4">
          <textarea
            className="w-full h-24 p-0 border-none focus:ring-0 text-sm leading-relaxed text-slate-600 resize-none"
            value={goal.text}
            onChange={(e) => updateGoalText(goal.id, e.target.value)}
            placeholder="By [Date], [Department] will..."
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <button 
              onClick={() => handleGeminiCheck(goal.id, goal.text)}
              className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors"
            >
              Verify with Gemini
            </button>
            <span className="text-[10px] text-slate-300 italic font-medium">Auto-saved to storage</span>

            <button 
              onClick={() => removeGoal(goal.id)}
              className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
            >
              Remove Goal
            </button>
          </div>
          {goal.aiFeedback && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-[11px] text-blue-700 leading-tight italic border-l-2 border-blue-400">
              <span className="font-bold uppercase not-italic block mb-1">AI Scrutinizer:</span>
              {goal.aiFeedback}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}