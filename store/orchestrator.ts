/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Framework = 
  // Phase 1: Boundary & Definition
  'SIPOC' | 'VOC-Customer-Voice' | 'Problem-Statement-Builder' | 'Stakeholder-Map' | 'Value-Case-Draft' |
  // Phase 2: Forensic Diagnosis
  '5-Whys' | 'VSM-4.0' | 'Digital-Shadow-Mapper' | 'Process-Mining-Simulator' | 'FMEA-Failure-Mode' |
  // Phase 3: Ideation & Architecture
  'AI-Solution-Design' | 'High-Level-Architecture' | 'Pre-Mortem-Audit' | 'Value-Feasibility-Matrix' | 'RACI-Matrix' |
  // Phase 4: Implementation & Stabilization
  'CPMAI-Build-Tracker' | 'ADKAR-Diagnostic' | 'Three-Pillar-CM' | 'Data-Pipeline-Sentry' | 'UAT-Feedback-Loop' |
  // Layer 5: Sustainment & Governance
  'Kaizen-PDCA' | 'Governance-Watchtower' | 'Scenario-Simulator' | 'ROI-Realization-Tracker' | 'Socratic-Audit-Log';

interface OrchestratorState {
  mappings: { phaseId: string; phaseName: string; assignedFramework: Framework }[];
  generateDynamicFlow: (scores: any) => void;
}

export const useOrchestratorStore = create<OrchestratorState>()(
  persist(
    (set) => ({
      mappings: [],
      generateDynamicFlow: (scores) => {
        const flow:{ phaseId: string; phaseName: string; assignedFramework: Framework }[]=[];

        // PHASE 1: STARTING LINE
        // If Problem Definition (A) is low, force a deep Problem Statement Builder.
        const p1Fw = scores.A < 15 ? 'Problem-Statement-Builder' : 'SIPOC';
        flow.push({ phaseId: 'p1', phaseName: 'Boundary & Definition', assignedFramework: p1Fw });

        // PHASE 2: THE DEEP DIVE
        // If Data Readiness (E) is low, we need a Digital Shadow Map. 
        // If Strategic Alignment (B) is low, we need 5-Whys.
        let p2Fw: Framework = 'VSM-4.0'; 
        if (scores.E < 12) p2Fw = 'Digital-Shadow-Mapper';
        else if (scores.B < 12) p2Fw = '5-Whys';
        flow.push({ phaseId: 'p2', phaseName: 'Forensic Diagnosis', assignedFramework: p2Fw });

        // PHASE 3: THE DESIGN
        // If Technical Maturity (C) is low, force a High-Level Architecture review.
        const p3Fw = scores.C < 15 ? 'High-Level-Architecture' : 'AI-Solution-Design';
        flow.push({ phaseId: 'p3', phaseName: 'Solution Design', assignedFramework: p3Fw });

        // PHASE 4: THE BUILD
        // CPMAI is the core for technical project board data pipeline stabilization.
        // If Stakeholder Buy-in (D) is the primary risk, force ADKAR.
        const p4Fw = scores.D < scores.E ? 'ADKAR-Diagnostic' : 'CPMAI-Build-Tracker';
        flow.push({ phaseId: 'p4', phaseName: 'Implementation Gate', assignedFramework: p4Fw });

        // PHASE 5: THE SENTRY
        // If the project is high-impact, use the Watchtower.
        flow.push({ phaseId: 'p5', phaseName: 'Governance & ROI', assignedFramework: 'Governance-Watchtower' });

        set({ mappings: flow });
      }
    }),
    { name: 'orchestrator-storage' }
  )
);

export const FRAMEWORK_LIBRARY = {
  // PHASE 1: FOUNDATIONAL
  P1_DEF: ['SIPOC', 'VOC-Intake', 'Problem-Statement-Builder', 'Stakeholder-Map', 'Value-Case-Draft'],
  // PHASE 2: FORENSIC
  P2_FOR: ['5-Whys', 'VSM-4.0', 'Digital-Shadow-Mapper', 'Process-Mining-Simulator', 'Lean-Six-Sigma'],
  // PHASE 3: ARCHITECTURAL
  P3_ARC: ['AI-Solution-Design', 'High-Level-Architecture', 'Pre-Mortem-Audit', 'Value-Feasibility-Matrix', 'RACI-AI'],
  // PHASE 4: TECHNICAL/BUILD
  P4_TEC: ['CPMAI-Build-Tracker', 'ADKAR-Diagnostic', 'Three-Pillar-CM', 'Data-Pipeline-Sentry', 'FMEA'],
  // PHASE 5: GOVERNANCE
  P5_GOV: ['Kaizen-PDCA', 'Governance-Watchtower', 'Scenario-Simulator', 'ROI-Realization-Tracker', 'Socratic-Audit-Log']
};

export const getInferredLogic = (framework: string, scores: any) => {
  const logicMap: Record<string, string> = {
    'Lean-Six-Sigma': "Triggered by low Process Maturity. Waste must be removed before AI training.",
    'FMEA': "Triggered by high complexity. Failure modes must be quantified.",
    'Digital-Shadow-Mapper': "Triggered by Data Readiness gaps. Identifying the 'True' data flow.",
    'ADKAR-Diagnostic': "Triggered by low Stakeholder Buy-in. Managing the human transition.",
    'CPMAI-Build-Tracker': "Mandatory technical stabilization for AI model lifecycle.",
    'Socratic-Audit-Log': "Final logic gate to ensure ethical and operational alignment.",
    'Scenario-Simulator': "Triggered by high strategic impact. Simulating 'What-If' failures.",
    'RACI-AI': "Defining human-in-the-loop accountability for model outputs."
  };
  return logicMap[framework] || "Standard operational requirement for this project phase.";
};