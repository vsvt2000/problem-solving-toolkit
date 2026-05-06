"use client"
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
// import ValueFeasibilityMatrix from "./frameworks/value-feasiblity";
import ThreePillarCMDesigner from "./frameworks/three-pillar";
import GovernanceWatchtower from "./frameworks/watchtower"; 
import ScenarioSimulator from "./frameworks/scenario-simulator";
import FmeaRiskAnalyst from "./frameworks/fmea";
import DataPipelineSentry from "./frameworks/data-pipeline-sentry";
import SocraticAuditLog from "./frameworks/audit-log";
import ProjectCharterSignOff from "./frameworks/final-summary";
import RaciAiMatrix from "./frameworks/raci";
import RoiRealizationTracker from "./frameworks/finance-roi";

export default function ImplementationOrchestrator({ sectionId, onBack }: { sectionId: string, onBack: () => void }) {
  
  const renderPhaseFrameworks = () => {
    switch (sectionId) {
      case 'A': // PHASE 1: DISCOVERY
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="Problem Statement" status="Active"><ProblemStatementConstructor /></FrameworkWrapper>
            {/* <FrameworkWrapper title="Voice of Customer" status="Ready"><VocIntake /></FrameworkWrapper> */}
            <FrameworkWrapper title="Root Cause Analysis" status="Ready"><FiveWhysForensic /></FrameworkWrapper>
            <FrameworkWrapper title="Digital Shadow Audit" status="Ready"><DigitalShadowMapper /></FrameworkWrapper>
            <FrameworkWrapper title="Project Charter" status="Ready"><ProjectCharterSignOff /></FrameworkWrapper>
          </div>
        );

      case 'B': // PHASE 2: STRATEGY
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="SIPOC 4.0" status="Active"><Sipoc40Module /></FrameworkWrapper>
            <FrameworkWrapper title="Stakeholder Sentiment" status="Ready"><StakeholderSentimentModule /></FrameworkWrapper>
            <FrameworkWrapper title="Value Case Definition" status="Ready"><div className="p-8 italic text-slate-400">Value Case Module Loading...</div></FrameworkWrapper>
            <FrameworkWrapper title="Solution Prioritization" status="Ready"><SolutionPrioritizer /></FrameworkWrapper>
            <FrameworkWrapper title="Strategic Playbook" status="Ready"><div className="p-8 italic text-slate-400">Playbook Selector Loading...</div></FrameworkWrapper>
          </div>
        );

      case 'C': // PHASE 3: ARCHITECTURAL
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="Value Stream Mapping" status="Active"><Vsm40Modeller /></FrameworkWrapper>
            <FrameworkWrapper title="High Level Architecture" status="Ready"><HighLevelArchitecture /></FrameworkWrapper>
            <FrameworkWrapper title="RACI-AI Matrix" status="Ready"><RaciAiMatrix /></FrameworkWrapper>
            {/* <FrameworkWrapper title="Infrastructure Audit" status="Ready"><InfrastructureAudit /></FrameworkWrapper> */}
            <FrameworkWrapper title="Pre-Mortem Audit" status="Ready"><PreMortemAudit /></FrameworkWrapper>
          </div>
        );

      case 'D': // PHASE 4: STABILIZATION
        return (
          <div className="space-y-12">
            <FrameworkWrapper title="CPMAI Build Tracker" status="Active"><CpmaiBuildTracker /></FrameworkWrapper>
            <FrameworkWrapper title="ADKAR Change Diagnostic" status="Ready"><AdkarDiagnostic /></FrameworkWrapper>
            <FrameworkWrapper title="Three-Pillar CM" status="Ready"><ThreePillarCMDesigner /></FrameworkWrapper>
            <FrameworkWrapper title="Data Pipeline Sentry" status="Ready"><DataPipelineSentry /></FrameworkWrapper>
            <FrameworkWrapper title="FMEA Risk Analyst" status="Ready"><FmeaRiskAnalyst /></FrameworkWrapper>
          </div>
        );

      case 'E': // PHASE 5: GOVERNANCE
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
          <div className="p-20 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase italic">Select Roadmap Node to Launch Frameworks</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-center border-b-4 border-slate-900 pb-6">
          <button 
            onClick={onBack} 
            className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-white border-2 border-slate-900 px-4 py-2 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
          >
            ← Back to Roadmap
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Implementation Phase {sectionId}</h2>
            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Active Execution Environment</p>
          </div>
        </header>

        <div className="animate-in slide-in-from-bottom-6 duration-700">
          {renderPhaseFrameworks()}
        </div>
      </div>
    </div>
  );
}

/**
 * WRAPPER COMPONENT
 * Provides a consistent forensic "Frame" for every methodology tool.
 */
function FrameworkWrapper({ title, status, children }: { title: string, status: string, children: React.ReactNode }) {
  return (
    <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-slate-900 p-3 flex justify-between items-center">
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{title}</h3>
        <span className="text-[8px] font-black bg-blue-500 text-white px-2 py-0.5 uppercase tracking-widest">{status}</span>
      </div>
      <div className="p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}