/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import ImplementationOrchestrator from './framework-switcher';
import CustomRoadmapCreator from './roadmap-builder';

/**
 * FULL INTERPRETATION DATA
 * Mapped exactly to the provided Results Interpretation Guide.
 */
const ResultsDashboard = ({ scores, onRestart }: { scores: any, onRestart: any }) => {
  // NEW: State for toggling between Dashboard View and Framework Execution
  const [activeView, setActiveView] = useState('dashboard'); 
  const INTERPRETATIONS: { [x: string]: any } = {
    A: [
      { min: 8, max: 14, label: "UNDEFINED PROBLEM", interpretation: "The problem is poorly understood, likely new, and may be misdiagnosed.", steps: ["Conduct a structured discovery sprint (2–3 weeks).", "Use GenAI-Augmented Root Cause Analysis framework.", "Rerun Section A after discovery."] },
      { min: 15, max: 21, label: "EMERGING PROBLEM", interpretation: "Problem is recognized but lacks clear scope or confirmed root cause.", steps: ["Run a Problem Definition Workshop to align stakeholders.", "Apply AI-Driven Kaizen diagnostic to map current-state.", "Select a playbook provisionally and validate."] },
      { min: 22, max: 27, label: "DEFINED PROBLEM", interpretation: "Well-understood with clear root cause and defined scope.", steps: ["Proceed directly to Solution Design phase.", "Match problem type to Strategic, Operational, or Transformation playbook.", "Initiate stakeholder alignment on success metrics."] },
      { min: 28, max: 32, label: "EXECUTION-READY", interpretation: "Full clarity on direction. Needs structured execution support.", steps: ["Skip diagnosis phase; move to Execution Planning.", "Activate the Change Management workstream immediately.", "Set up a CI measurement baseline on day one."] }
    ],
    B: [
      { min: 8, max: 14, label: "HIGH-CONSTRAINT ENVIRONMENT", interpretation: "Significant barriers exist. Risk of initiative failure is elevated.", steps: ["Start with a scoped Proof of Value (4–6 weeks).", "Secure explicit executive sponsorship before deployment.", "Address the single biggest constraint in Question B6 first."] },
      { min: 15, max: 21, label: "CONSTRAINED ENVIRONMENT", interpretation: "Meaningful barriers exist but the org has capacity for a scoped initiative.", steps: ["Scope the initiative tightly (define In/Out scope).", "Build a resource and constraint map with mitigations.", "Add 30% buffer to any delivery estimate."] },
      { min: 22, max: 27, label: "CAPABLE ENVIRONMENT", interpretation: "Org has capacity, alignment, and structural readiness.", steps: ["Proceed with standard toolkit deployment.", "Conduct stakeholder mapping to identify hidden resistance.", "Establish a weekly delivery and monthly steering rhythm."] },
      { min: 28, max: 32, label: "HIGH-READINESS ENVIRONMENT", interpretation: "Conditions favorable for ambitious scope and accelerated delivery.", steps: ["Consider an accelerated delivery timeline.", "Embed CI and AI practices more deeply than immediately required.", "Set stretch targets to avoid underdelivering potential."] }
    ],
    C: [
      { min: 8, max: 14, label: "AI BEGINNER", level: "Foundation: Automate and Assist only", steps: ["Start with AI literacy training before tool deployment.", "Deploy low-risk use cases (summarization, transcription).", "Establish formal AI governance (ISO 42001) before scaling."] },
      { min: 15, max: 21, label: "AI DEVELOPING", level: "Intermediate: Recommend and Support", steps: ["Identify 2-3 highest-value use cases from Section C6.", "Implement AI decision-support (Human-in-the-loop).", "Run a structured 4-6 week AI pilot with success metrics."] },
      { min: 22, max: 27, label: "AI CAPABLE", level: "Advanced: Predict and Recommend", steps: ["Integrate AI recommendations into workflows (AI-Augmented DMAIC).", "Deploy process mining tools (Celonis/UiPath).", "Establish monthly AI performance monitoring for drift/bias."] },
      { min: 28, max: 32, label: "AI ADVANCED", level: "Full Integration: Predict, Automate, Optimize", steps: ["Deploy full AI layer: predictive analytics & intelligent agents.", "Implement real-time dashboards with AI anomaly detection.", "Monthly model audits and annual ISO 42001 review."] }
    ],
    D: [
      { min: 8, max: 14, label: "CHANGE-HOSTILE ENVIRONMENT", risk: "CRITICAL RISK", steps: ["Stop. Do not deploy tools until a CM plan is in place.", "Run a Change Readiness Workshop with leadership.", "Apply Bridges Transition Model; appoint a senior Sponsor."] },
      { min: 15, max: 21, label: "CHANGE-SKEPTICAL ENVIRONMENT", risk: "HIGH RISK", steps: ["Quantify the cost of inaction to build the case for change.", "Activate change champions in every affected team.", "Implement ADKAR: Focus on Awareness and Desire phases."] },
      { min: 22, max: 27, label: "CHANGE-RECEPTIVE ENVIRONMENT", risk: "MODERATE RISK", steps: ["Implement standard Three-Pillar Change Model.", "Design targeted interventions for low-scoring pockets.", "Set up a monthly change adoption pulse survey."] },
      { min: 28, max: 32, label: "CHANGE-READY ENVIRONMENT", risk: "LOW RISK", steps: ["Leverage champions as co-designers.", "Set aggressive adoption targets.", "Use Prosci Agile Change Management inside delivery sprints."] }
    ],
    E: [
      { min: 8, max: 14, label: "CI FOUNDATION ABSENT", approach: "Build foundations first", steps: ["Build a simple CI operating rhythm alongside the initiative.", "Train 5-10 people in foundational DMAIC/Lean basics.", "Establish baseline measurements on day one."] },
      { min: 15, max: 21, label: "CI EMERGING", approach: "Strengthen and structure", steps: ["Formalize informal CI activity; assign ownership.", "Introduce AI-Driven Kaizen as the operating model.", "Identify one CI metric for monthly leadership review."] },
      { min: 22, max: 27, label: "CI CAPABLE", approach: "Integrate and enhance", steps: ["Map toolkit onto existing CI methodology (LSS 4.0).", "Position AI as an upgrade to current practice.", "Add leading indicators to the measurement framework."] },
      { min: 28, max: 32, label: "CI ADVANCED", approach: "Optimize and scale", steps: ["Deploy full AI CI layer (Process mining, GenAI RCA).", "Use this engagement to scale CI to adjacent teams.", "Implement a Hyperautomation roadmap for improvement cycles."] }
    ],
    TOTAL: [
      { min: 40, max: 64, level: "FOUNDATIONAL", mode: "Phased Light Deployment" },
      { min: 65, max: 96, level: "DEVELOPING", mode: "Selective Deployment" },
      { min: 97, max: 128, level: "CAPABLE", mode: "Standard Full Deployment" },
      { min: 129, max: 160, level: "ADVANCED", mode: "Accelerated Full Deployment" }
    ]
  };

  const totalScore = scores.reduce((acc: any, s: any) => acc + s.score, 0);
  const overall = INTERPRETATIONS.TOTAL.find((i: any) => totalScore >= i.min && totalScore <= i.max);

  // Priority Matrix Logic
  const getOverrides = () => {
    const overrides = [];
    const secA = scores.find((s: any) => s.id === "A");
    const secD = scores.find((s: any) => s.id === "D");
    const secB = scores.find((s: any) => s.id === "B");

    if (secA?.score < 15) overrides.push("PRIORITY 1: Section A (Problem ID) too low. Define problem before investment.");
    if (secD?.score < 15) overrides.push("PRIORITY 2: Section D (Change Readiness) critical. Cultural barriers detected.");
    if (secB?.score < 15) overrides.push("PRIORITY 3: Section B (Org Context) constrained. Capacity issues must be addressed.");

    return overrides;
  };

  const activeOverrides = getOverrides();

  /**
 * DYNAMIC ROUTING ENGINE
 * Handles the transition between:
 * 1. Executive Summary (dashboard)
 * 2. Custom Roadmap Architect (roadmap)
 * 3. Framework Execution (Section IDs: A, B, C, D, E)
 */

/**
 * FORENSIC ROUTING ENGINE
 */

// CASE 1: Component Execution (Launch the 25 Frameworks)
// Checks if activeView is one of the Section IDs
if (['A', 'B', 'C', 'D', 'E'].includes(activeView)) {
  return (
    <ImplementationOrchestrator 
      sectionId={activeView} 
      onBack={() => setActiveView('roadMap')} 
    />
  );
}

// CASE 2: The Architect (Custom Roadmap Creator)
if (activeView === 'forensicPath') {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
       <button 
          onClick={() => setActiveView('dashboard')} 
          className="mb-6 px-4 py-2 bg-white border-2 border-slate-900 text-[10px] text-black font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          ← Return to Analysis Dashboard
        </button>
        
        {/* Your Roadmap Architect component */}
        <CustomRoadmapCreator /> </div>
  );
}

// CASE 3: Main Dashboard (Default)
// (Your existing return block for the dashboard goes here...)

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-white min-h-screen font-sans">
      
      {/* HEADER EXACTLY AS IT WAS */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">Composite Readiness Level</h2>
          <h1 className="text-4xl md:text-5xl text-white font-bold">{overall?.level || "CALCULATING..."}</h1>
          <p className="text-slate-400 mt-4 text-lg">
            Recommended Mode: <span className="text-white font-semibold">{overall?.mode}</span>
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center min-w-45">
          <p className="text-6xl font-bold text-blue-500">{Math.round(totalScore)}</p>
          <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">Aggregate / 160</p>
        </div>
      </div>

      {/* VIEW TOGGLE (The "Additional Thing") */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveView('dashboard')}
          className={`px-6 py-2 rounded-lg text-xs text-black font-bold uppercase transition-all ${activeView === 'dashboard' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
        >
          Analysis Summary
        </button>
        {/* <button 
          onClick={() => setActiveView('roadmap')}
          className={`px-6 py-2 rounded-lg text-xs text-black font-bold uppercase transition-all ${activeView === 'roadmap' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
        >
          Implementation Roadmap
        </button> */}
        <button 
          onClick={() => setActiveView('forensicPath')}
          className={`px-6 py-2 rounded-lg text-xs text-black font-bold uppercase transition-all ${activeView === 'forensicPath' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
        >
          Create Roadmap
        </button>
      </div>

      {activeView === 'dashboard' ? (
        <>
          {/* DASHBOARD VIEW: EXACTLY AS IT WAS */}
          {activeOverrides.length > 0 && (
            <div className="space-y-4">
              {activeOverrides.map((msg, idx) => (
                <div key={idx} className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
                  <span className="text-amber-600 text-xl font-bold">⚠️</span>
                  <p className="text-amber-900 font-medium text-sm">{msg}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scores.map((s: any) => {
              const result = INTERPRETATIONS[s.id].find((i: any) => s.score >= i.min && s.score <= i.max);
              return (
                <div key={s.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-500">Section {s.id}</span>
                      <span className="text-slate-900 font-bold text-xl">{Math.round(s.score)}/32</span>
                    </div>
                    <h3 className="text-black font-bold text-lg mb-1 leading-tight">{result?.label}</h3>
                    <p className="text-slate-500 text-xs font-medium uppercase mb-4 tracking-wide">{result?.level || result?.risk || result?.approach}</p>
                    <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">{result?.interpretation}</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Immediate Next Steps</p>
                    {result?.steps.map((step: any, i: any) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-800">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* ROADMAP VIEW: THE NEW LOGICAL FLOW */
        <div className="space-y-12">
            <RoadmapSection 
                number="01" 
                title="Discovery & Foundation" 
                ids={['A', 'B']} 
                onSelect={(id:string) => setActiveView(id)} 
            />
            <RoadmapSection 
                number="02" 
                title="Intelligence & Data" 
                ids={['C', 'E']} 
                onSelect={(id:string) => setActiveView(id)} 
            />
            <RoadmapSection 
                number="03" 
                title="Change & Sustainment" 
                ids={['D']} 
                onSelect={(id:string) => setActiveView(id)} 
            />
        </div>
      )}

      {/* FOOTER ACTIONS EXACTLY AS THEY WERE */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-4">
        <p className="text-slate-400 text-xs italic">Version 1.0 | AI Problem-Solving Toolkit Governance</p>
        <button onClick={onRestart} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm">
          Restart Diagnostic
        </button>
      </div>
    </div>
  );
};

// HELPER COMPONENT FOR THE ROADMAP TILES
const RoadmapSection = ({ number, title, ids, onSelect }: any) => (
  <div className="flex gap-8 relative">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full z-10 border-4 border-white shadow-lg">{number}</div>
      <div className="w-1 h-full bg-slate-100 absolute top-0 z-0"></div>
    </div>
    <div className="flex-1 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 hover:border-slate-900 transition-all">
      <h3 className="text-xl text-black font-bold uppercase italic tracking-tighter mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ids.map((id:string) => (
            <button key={id} onClick={() => onSelect(id)} className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:shadow-md transition-shadow group">
                <span className="text-[10px]  font-bold text-blue-600 block mb-1">EXECUTE SECTION {id}</span>
                <span className="text-xs font-bold text-slate-800">Launch Component →</span>
            </button>
        ))}
      </div>
    </div>
  </div>
);

export default ResultsDashboard;