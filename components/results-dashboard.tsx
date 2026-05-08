/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import ImplementationOrchestrator from './framework-switcher';
import CustomRoadmapCreator from './roadmap-builder';

const ResultsDashboard = ({ scores, onRestart }: { scores: any, onRestart: any }) => {
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

  if (['A', 'B', 'C', 'D', 'E'].includes(activeView)) {
    return <ImplementationOrchestrator sectionId={activeView} onBack={() => setActiveView('forensicPath')} />;
  }

  if (activeView === 'forensicPath') {
    return (
      <div className="min-h-screen max-w-screen overflow-hidden bg-white p-6 md:p-12 font-sans text-gray-900">
        <div className="max-w-full mx-auto space-y-12">
          <header className="flex justify-between items-center border-b border-gray-100 pb-8">
            <button 
              onClick={() => setActiveView('dashboard')} 
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all"
            >
              ← Return to Analysis Dashboard
            </button>
            <h2 className="text-xl font-extrabold tracking-tight uppercase">Roadmap Architect</h2>
          </header>
          <CustomRoadmapCreator />
        </div>
      </div>
    );
  }

  return (
    <div className={`${activeView==='forensicPath'?"max-w-6xl":"w-screen"} mx-auto p-4 md:p-12 space-y-12 bg-white min-h-screen font-sans text-gray-900`}>
      
      {/* COMPOSITE READINESS HEADER */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Composite Readiness Level</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight italic">{overall?.level || "CALCULATING..."}</h1>
          <p className="text-gray-400 text-sm max-w-md">
            Recommended Deployment: <span className="text-white font-bold">{overall?.mode}</span>
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 text-center min-w-[180px]">
          <p className="text-6xl font-black text-blue-500">{Math.round(totalScore)}</p>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">Aggregate / 160</p>
        </div>
      </div>

      {/* NAVIGATION TOGGLE */}
      <div className="flex bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-100">
        <button 
          onClick={() => setActiveView('dashboard')}
          className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'dashboard' ? 'bg-white shadow-sm text-blue-600 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Analysis Summary
        </button>
        <button 
          onClick={() => setActiveView('forensicPath')}
          className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'forensicPath' ? 'bg-white shadow-sm text-blue-600 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Create Roadmap
        </button>
      </div>

      {activeView === 'dashboard' ? (
        <div className="space-y-12 animate-in fade-in duration-700">
          {/* PRIORITY OVERRIDES */}
          {activeOverrides.length > 0 && (
            <div className="space-y-3">
              {activeOverrides.map((msg, idx) => (
                <div key={idx} className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center gap-4">
                  <span className="text-amber-600 font-bold">⚠️</span>
                  <p className="text-amber-900 font-bold text-xs uppercase tracking-tight">{msg}</p>
                </div>
              ))}
            </div>
          )}

          {/* SECTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scores.map((s: any) => {
              const result = INTERPRETATIONS[s.id].find((i: any) => s.score >= i.min && s.score <= i.max);
              return (
                <div key={s.id} className="group border border-gray-100 rounded-3xl p-8 bg-white hover:border-blue-200 transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">Section {s.id}</span>
                      <span className="text-gray-900 font-black text-xl">{Math.round(s.score)}/32</span>
                    </div>
                    <h3 className="text-gray-900 font-extrabold text-lg mb-1 uppercase tracking-tight leading-tight">{result?.label}</h3>
                    <p className="text-blue-600 text-[10px] font-black uppercase mb-4 tracking-[0.15em]">{result?.level || result?.risk || result?.approach}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 italic border-l-2 border-gray-100 pl-4">{result?.interpretation}</p>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-gray-50">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Immediate Next Steps</p>
                    {result?.steps.map((step: any, i: any) => (
                      <div key={i} className="flex items-start gap-3 text-xs text-gray-700 leading-snug">
                        <span className="text-blue-500 font-bold">0{i+1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* FOOTER ACTIONS */}
      <footer className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-50 gap-6">
        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">Forensic Toolkit | v1.0.4 | 2026 Governance</p>
        <button 
            onClick={onRestart} 
            className="px-10 py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all"
        >
          Restart Diagnostic
        </button>
      </footer>
    </div>
  );
};

export default ResultsDashboard;