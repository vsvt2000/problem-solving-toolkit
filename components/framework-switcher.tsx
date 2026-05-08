/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import Sipoc40Module from "./frameworks/sipoc";
import FiveWhysForensic from "./frameworks/five-whys";
import Vsm40Modeller from "./frameworks/vsm";
import AdkarDiagnostic from "./frameworks/adkar";
import CpmaiBuildTracker from "./frameworks/cpmai";
import KaizenPDCA from "./frameworks/kaizen";
import ProblemStatementConstructor from "./frameworks/problem-statement-constructor";
import StakeholderSentimentModule from "./frameworks/sentiment";
import DigitalShadowMapper from "./frameworks/shadow";
import SolutionPrioritizer from "./frameworks/ideation";
import HighLevelArchitecture from "./frameworks/architecture";
import PreMortemAudit from "./frameworks/pre-mortem";
import ThreePillarCMDesigner from "./frameworks/three-pillar";
import GovernanceWatchtower from "./frameworks/watchtower"; 
import ScenarioSimulator from "./frameworks/scenario-simulator";
import FmeaRiskAnalyst from "./frameworks/fmea";
import DataPipelineSentry from "./frameworks/data-pipeline-sentry";
import SocraticAuditLog from "./frameworks/audit-log";
import ProjectCharterSignOff from "./frameworks/final-summary";
import RaciAiMatrix from "./frameworks/raci";
import RoiRealizationTracker from "./frameworks/finance-roi";
import ValueCaseDraft from "./frameworks/value-case";

export const COMPONENT_REGISTRY: Record<string, React.ReactNode> = {

  'Problem Statement': <ProblemStatementConstructor />,

  '5-Whys Forensic': <FiveWhysForensic />,

  'SIPOC 4.0': <Sipoc40Module />,

  'Digital Shadow Mapper': <DigitalShadowMapper />,

  'Project Charter': <ProjectCharterSignOff />,

  // 'VOC Intake': <Voc />,

  'Stakeholder Power Grid': <StakeholderSentimentModule />,

  'Value Case Draft': <ValueCaseDraft />,

  'Value-Feasibility Matrix': <SolutionPrioritizer />,

  // 'Strategic Playbook': <Playbook />,

  'VSM 4.0': <Vsm40Modeller />,

  'AI Solution Design': <HighLevelArchitecture />,

  'RACI-AI Matrix': <RaciAiMatrix />,

  // 'Infrastructure Audit': <Infras />,

  'Pre-Mortem Audit': <PreMortemAudit />,

  'CPMAI Build Tracker': <CpmaiBuildTracker />,

  'ADKAR Diagnostic': <AdkarDiagnostic />,

  'Three-Pillar CM': <ThreePillarCMDesigner />,

  'Data Pipeline Sentry': <DataPipelineSentry />,

  'FMEA Risk Analyst': <FmeaRiskAnalyst />,

  'Governance Watchtower': <GovernanceWatchtower />,

  'Kaizen PDCA': <KaizenPDCA />,

  'Scenario Simulator': <ScenarioSimulator />,

  'Socratic Audit Log': <SocraticAuditLog />,

  'ROI Realization Tracker': <RoiRealizationTracker />,

};



export default function ImplementationOrchestrator({ sectionId, onBack }: { sectionId: string, onBack: () => void }) {
  
  const phaseMeta: Record<string, { title: string; subtitle: string }> = {
    'A': { title: 'Phase 1: Discovery', subtitle: 'Establishing the Problem Foundation' },
    'B': { title: 'Phase 2: Strategy', subtitle: 'Alignment & Prioritization' },
    'C': { title: 'Phase 3: Architecture', subtitle: 'Technical Design & Accountability' },
    'D': { title: 'Phase 4: Stabilization', subtitle: 'Technical Build & Change Management' },
    'E': { title: 'Phase 5: Governance', subtitle: 'Sustainment & ROI Tracking' }
  };

  const renderPhaseFrameworks = () => {
    switch (sectionId) {
      case 'A':
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="Problem Statement" status="Active"><ProblemStatementConstructor /></FrameworkWrapper>
            <FrameworkWrapper title="Root Cause Analysis" status="Ready"><FiveWhysForensic /></FrameworkWrapper>
            <FrameworkWrapper title="Digital Shadow Audit" status="Ready"><DigitalShadowMapper /></FrameworkWrapper>
            <FrameworkWrapper title="Project Charter" status="Ready"><ProjectCharterSignOff /></FrameworkWrapper>
          </div>
        );
      case 'B':
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="SIPOC 4.0" status="Active"><Sipoc40Module /></FrameworkWrapper>
            <FrameworkWrapper title="Stakeholder Sentiment" status="Ready"><StakeholderSentimentModule /></FrameworkWrapper>
            <FrameworkWrapper title="Value Case Definition" status="Ready"><ValueCaseDraft /></FrameworkWrapper>
            <FrameworkWrapper title="Solution Prioritization" status="Ready"><SolutionPrioritizer /></FrameworkWrapper>
          </div>
        );
      case 'C':
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="Value Stream Mapping" status="Active"><Vsm40Modeller /></FrameworkWrapper>
            <FrameworkWrapper title="High Level Architecture" status="Ready"><HighLevelArchitecture /></FrameworkWrapper>
            <FrameworkWrapper title="RACI-AI Matrix" status="Ready"><RaciAiMatrix /></FrameworkWrapper>
            <FrameworkWrapper title="Pre-Mortem Audit" status="Ready"><PreMortemAudit /></FrameworkWrapper>
          </div>
        );
      case 'D':
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="CPMAI Build Tracker" status="Active"><CpmaiBuildTracker /></FrameworkWrapper>
            <FrameworkWrapper title="ADKAR Change Diagnostic" status="Ready"><AdkarDiagnostic /></FrameworkWrapper>
            <FrameworkWrapper title="Three-Pillar CM" status="Ready"><ThreePillarCMDesigner /></FrameworkWrapper>
            <FrameworkWrapper title="Data Pipeline Sentry" status="Ready"><DataPipelineSentry /></FrameworkWrapper>
            <FrameworkWrapper title="FMEA Risk Analyst" status="Ready"><FmeaRiskAnalyst /></FrameworkWrapper>
          </div>
        );
      case 'E':
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="Governance Watchtower" status="Active"><GovernanceWatchtower /></FrameworkWrapper>
            <FrameworkWrapper title="Kaizen PDCA" status="Ready"><KaizenPDCA /></FrameworkWrapper>
            <FrameworkWrapper title="Scenario Simulator" status="Ready"><ScenarioSimulator /></FrameworkWrapper>
            <FrameworkWrapper title="Socratic Audit Log" status="Ready"><SocraticAuditLog /></FrameworkWrapper>
            <FrameworkWrapper title="ROI Realization Tracker" status="Ready"><RoiRealizationTracker /></FrameworkWrapper>
          </div>
        );
      default:
        return (
          <div className="p-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Select Roadmap Node to Launch Frameworks</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-12 font-sans text-gray-900 selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        {/* Header Terminal Style */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-all"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Roadmap
          </button>
          
          <div className="md:text-right space-y-1">
            <div className="flex items-center md:justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <h2 className="text-xl font-extrabold tracking-tight uppercase">
                    {phaseMeta[sectionId]?.title || `Phase ${sectionId}`}
                </h2>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                {phaseMeta[sectionId]?.subtitle || 'Active Execution Environment'}
            </p>
          </div>
        </header>

        {/* Phase Execution Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderPhaseFrameworks()}
        </div>

        {/* Global Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
            <span>Orchestrator v1.0.4</span>
            <div className="flex gap-4">
                <span>Secure Session</span>
                <span>Auto-Save Enabled</span>
            </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * WRAPPER COMPONENT
 * Clean Forensic Frame with Phase Gate status labels.
 */
function FrameworkWrapper({ title, status, children }: { title: string, status: string, children: React.ReactNode }) {
  const isActive = status === 'Active';
  
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-200 transition-all duration-500 shadow-sm">
      {/* Tool Header */}
      <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{title}</h3>
        </div>
        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter transition-colors ${
            isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'
        }`}>
            {status}
        </span>
      </div>
      
      {/* Tool Content Area */}
      <div className="p-6 md:p-12 animate-in fade-in duration-500">
        {children}
      </div>
    </div>
  );
}