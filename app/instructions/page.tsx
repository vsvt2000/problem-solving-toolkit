/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';

const ToolkitDocumentation = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [activePhase, setActivePhase] = useState('p1');
  const [expandedTool, setExpandedTool] = useState(null);

  // DATA REPOSITORY [cite: 1-481]
  const PHASES: { [x: string]: any } = {
    p1: {
      name: "Phase 1 — Discovery & Foundation",
      tools: [
        {
          name: "1. Problem Statement Builder",
          purpose: "Forces articulation in four precise dimensions before solutioning. [cite: 3-4]",
          steps: [
            "Fill Current State: Describe manual steps, time, and error rates with numbers. [cite: 7-8]",
            "Fill Ideal State: Write a concrete, time-bounded target (e.g., 99.9% accuracy). [cite: 9]",
            "Fill The Gap: Identify the single specific barrier blocking progress. [cite: 10]",
            "Fill Impact of Failure: Quantify the cost of doing nothing in dollars or risk. [cite: 11-12]",
            "Adjust Urgency: Set slider (1-10) to calibrate downstream prioritization. [cite: 14]"
          ],
          tip: "Do not move to any other framework until the executive summary is perfect. [cite: 16]",
          dep: "Mandatory starting point. [cite: 19]"
        },
        {
          name: "2. 5-Whys Forensic",
          purpose: "Prevents solving symptoms by drilling to systemic roots. [cite: 21-22]",
          steps: [
            "Start Logic Chain: Type the initial symptom (e.g., 'Reports are wrong'). [cite: 25]",
            "Fill Why 1-5: Answer each previous level with confirmed facts, not speculation. [cite: 26]",
            "Select Category: Process, Technical, Data, or Human. [cite: 29]",
            "Verify: Only tick 'Verified' if VSM or Digital Shadow data confirms the chain. [cite: 30]"
          ],
          tip: "If every 'Why' is 'nobody did X', you have a Human root cause, not a Process one. [cite: 33]",
          dep: "Best completed after Problem Statement Builder. [cite: 35]"
        },
        {
          name: "3. SIPOC 4.0",
          purpose: "Establishes boundaries and identifies where data trails break down. [cite: 37-38]",
          steps: [
            "Add Steps: Aim for 5-7 major steps; merge minor actions into parents. [cite: 40-42]",
            "Fill SIPOC: Identify Supplier, Input, Process, Output, and Customer. [cite: 43]",
            "Toggle Automation: Mark steps as Manual or Automated. [cite: 44]",
            "Digital Footprint: Check ONLY for traceable records (system logs, DB entries). [cite: 45]"
          ],
          tip: "Verbal approvals and email chains do NOT qualify as Digital Footprints. [cite: 46]",
          dep: "Complete before Digital Shadow Mapper and VSM 4.0. [cite: 51]"
        },
        {
          name: "4. Digital Shadow Mapper",
          purpose: "Exposes the 'Delusion Gap' between management claims and data reality. [cite: 53-54]",
          steps: [
            "Sync Steps: Rows auto-populate from SIPOC 4.0 process steps. [cite: 56]",
            "Stakeholder Claim: Interview frontline operators (not managers) on task duration. [cite: 58-65]",
            "Review Shadow: Column shows 'Detectable' based on SIPOC footprint status. [cite: 59]",
            "Set Variance: Mark Low, Medium, or High (Delusion) based on claim vs. evidence. [cite: 61]"
          ],
          tip: "Managers describe the process as designed; operators describe it as lived. [cite: 65-66]",
          dep: "Requires SIPOC 4.0. [cite: 67]"
        },
        {
          name: "5. Project Charter",
          purpose: "Sign-off document that gates deployment based on live readiness data. [cite: 69]",
          steps: [
            "Review Status: CPMAI must be 'Stable', ADKAR 'Ready', and PER > 5%. [cite: 74]",
            "Synthesize Case: Write summary of the business case and adoption risk mitigation. [cite: 77]",
            "Enter Approver: Name the senior individual accountable for the decision. [cite: 79]",
            "Authorize: Clicking locks the charter permanently with a timestamp. [cite: 80]"
          ],
          tip: "The charter lock cannot be undone; use Pre-Mortem Audit before clicking. [cite: 82-83]",
          dep: "Requires CPMAI, ADKAR, and VSM 4.0 completion. [cite: 84]"
        }
      ]
    },
    p2: {
      name: "Phase 2 — Strategy & Alignment",
      tools: [
        {
          name: "6. Stakeholder Sentiment",
          purpose: "Surfaces hidden fears and resistance patterns through NLP analysis. [cite: 88-89]",
          steps: [
            "Add Record: Create separate records per stakeholder category. [cite: 91-92]",
            "Enter Role: Use titles (e.g., 'Operations Manager'), not individual names. [cite: 93]",
            "Paste Raw Notes: Use actual transcripts; do not clean or summarize. [cite: 95-96]",
            "Analyze: Click 'Analyze Hidden Fears' for logic-based diagnosis. [cite: 97]"
          ],
          tip: "If 'Loss of Agency' is found, CM plans must explain what decisions humans retain. [cite: 101]",
          dep: "Feeds Three-Pillar CM Designer and Phase 2 Synthesis. [cite: 102]"
        },
        {
          name: "7. Value Case Draft",
          purpose: "Translates operational improvement into monetary terms. [cite: 104]",
          steps: [
            "Add Driver: Use one card per metric; do not combine unrelated benefits. [cite: 107-108]",
            "Define Baseline: Use actual data; low confidence triggers warnings. [cite: 110-111]",
            "Set Target: Base on root cause analysis, not wishful thinking. [cite: 112]",
            "Calculate Impact: Enter monetary value per unit of improvement. [cite: 114]"
          ],
          tip: "Build cases conservatively; a CFO will block initiatives after undelivered promises. [cite: 118-119]",
          dep: "Informs ROI Realization Tracker in Phase 5. [cite: 120]"
        },
        {
          name: "8. Solution Prioritizer",
          purpose: "Scores solutions and enforces AI maturity constraints. [cite: 122-124]",
          steps: [
            "New Idea: Describe how it closes the 'Delusion Gap' from Phase 1. [cite: 128]",
            "Set AI Type: Predictive, Generative, or Automation. [cite: 129]",
            "Impact Score: High/Med/Low based on 5-Whys root cause directness. [cite: 130]",
            "Feasibility: Scored based on Section C (AI Maturity). [cite: 131]"
          ],
          tip: "Low AI Maturity + Generative AI = auto-downgrade to Low Feasibility. [cite: 132]",
          dep: "Feeds Value-Feasibility Matrix. [cite: 137]"
        },
        {
          name: "9. Stakeholder Power Grid",
          purpose: "Maps who can accelerate or block based on power/interest. [cite: 139-140]",
          steps: [
            "Add Stakeholder: Use groups unless an individual has unique power. [cite: 142-143]",
            "Set Power: Ability to stop, resource, or accelerate (1-10). [cite: 144-145]",
            "Set Interest: How much the change affects daily work (1-10). [cite: 146-147]",
            "Set Sentiment: Supporter, Neutral, or Resistant. [cite: 148-149]"
          ],
          tip: "The most dangerous group is top-left Resistants (High Power, Low Interest). [cite: 154]",
          dep: "Informs CM Designer and ADKAR. [cite: 158]"
        },
        {
          name: "10. Value-Feasibility Matrix",
          purpose: "Converts ideation cards into a visual quadrant for decision-making. [cite: 160]",
          steps: [
            "Sync Data: Framework syncs automatically from Solution Prioritizer. [cite: 163]",
            "Adjust Sliders: Refine Value and Feasibility based on real assessment. [cite: 165]",
            "Identify Quick Wins: Top-right quadrant are Phase 1 deliverables. [cite: 167]",
            "Identify Strategic Spikes: Top-left belong in Phase 3 or 4. [cite: 169-170]"
          ],
          tip: "If everything is bottom-left, the problem is too ambitious or maturity is too low. [cite: 174-175]",
          dep: "Requires Solution Prioritizer. [cite: 176]"
        }
      ]
    },
    p3: {
      name: "Phase 3 — Architecture & Design",
      tools: [
        {
          name: "11. VSM 4.0",
          purpose: "Quantifies value-add vs. wait time waste. [cite: 179-180]",
          steps: [
            "Sync SIPOC: Framework syncs steps automatically. [cite: 183]",
            "Enter Time: Estimate Value-Add Time and Wait Time in minutes per step. [cite: 184-186]",
            "Data Quality: Score 1-10; 7+ only for machine-readable data. [cite: 187-189]",
            "Check PER: Ratio below 15% triggers a redesign warning. [cite: 190-191]"
          ],
          tip: "Redesign the process before applying AI if PER is below 10%. [cite: 193]",
          dep: "Requires SIPOC 4.0. [cite: 196]"
        },
        {
          name: "12. AI Solution Design",
          purpose: "Translates solution into Interface, Logic, and Data layers. [cite: 198]",
          steps: [
            "Add Component: Start with Data layer to see what is available. [cite: 201]",
            "Describe Function: Describe what it does, not the vendor name. [cite: 202-203]",
            "Source/Dest: Specify exact input systems and output destinations. [cite: 204-208]",
            "Readiness Alert: Fires if Section E is below 15 (needs stabilization). [cite: 209]"
          ],
          tip: "Integration risk exists in any layer gap without defined input/output. [cite: 212-214]",
          dep: "Best after Solution Prioritizer and VSM 4.0. [cite: 215]"
        },
        {
          name: "13. RACI-AI Matrix",
          purpose: "Assigns explicit human ownership to AI lifecycle tasks. [cite: 217-219]",
          steps: [
            "Review Tasks: Mandatory: Tuning, Monitoring, Ethical Audit, Sign-off. [cite: 221-222]",
            "Add Tasks: Add specific activities like 'Bias monitoring'. [cite: 223-224]",
            "Assign RACI: R (Responsible), A (Accountable), C (Consulted), I (Informed). [cite: 225]",
            "Rule of One: Every task must have exactly one Accountable (A) role. [cite: 219, 226]"
          ],
          tip: "Self-assigning accountability (R and A to same role) removes independent checks. [cite: 227-228]",
          dep: "Informs Governance Watchtower. [cite: 231]"
        },
        {
          name: "14. Pre-Mortem Audit",
          purpose: "Forces teams to imagine failure before it happens. [cite: 233-234]",
          steps: [
            "Scenario Types: Create Technical, Cultural, and Operational stories. [cite: 237, 239, 241]",
            "Write Stories: Imagine detailed narratives of failure 12 months out. [cite: 238, 240, 242]",
            "Mitigation: Write what you will do TODAY to prevent the scenario. [cite: 243-244]",
            "Risk Gate: Low Section D + Cultural failure = critical warning. [cite: 245-246]"
          ],
          tip: "Team members who raise objections here are identifying real risks. [cite: 248-250]",
          dep: "Complete before Project Charter sign-off. [cite: 251]"
        },
        {
          name: "15. Root Cause Analysis (RCA)",
          purpose: "Tests stakeholder assumptions against digital evidence. [cite: 253-254]",
          steps: [
            "Select Chain: Technical, Process, or Behavioral. [cite: 256]",
            "Assumption: Write exactly what the stakeholder believes is the cause. [cite: 258-259]",
            "Evidence: Write what the data actually shows (or note its absence). [cite: 260-261]",
            "Reality Check: Compares assumption against SIPOC observability gaps. [cite: 262-263]"
          ],
          tip: "If Digital Evidence is empty, SIPOC Footprint coverage is too low. [cite: 269-270]",
          dep: "Effective after SIPOC 4.0 and Digital Shadow Mapper. [cite: 271]"
        }
      ]
    },
    p4: {
      name: "Phase 4 — Build & Stabilization",
      tools: [
        {
          name: "16. CPMAI Build Tracker",
          purpose: "Tracks technical packages from ingestion to stable production. [cite: 274-276]",
          steps: [
            "Add Package: One per distinct data source (e.g., 'ERP feed'). [cite: 278-280]",
            "Describe: Be specific enough for a data engineer to execute. [cite: 281-282]",
            "Status: Backlog, Blocked, In-Testing, or Stable. [cite: 283-285]",
            "Health Score: Must be >80% for a package to be marked 'Stable'. [cite: 288]"
          ],
          tip: "Zero blocked packages is a prerequisite for deployment authorization. [cite: 290]",
          dep: "Output is read by Project Charter and Scenario Simulator. [cite: 294]"
        },
        {
          name: "17. ADKAR Diagnostic",
          purpose: "Measures where stakeholders are in the adoption journey. [cite: 296-297]",
          steps: [
            "Track Group: Create one profile per group experiencing change. [cite: 299-300]",
            "Score Stages: Rate Awareness, Desire, Knowledge, Ability, Reinforcement. [cite: 301-307]",
            "Identify Barrier: The first stage scoring 3 or below is the Barrier Point. [cite: 308]",
            "Risk Gate: Desire barrier + Low Section D = Alignment warning. [cite: 310]"
          ],
          tip: "Supporters can develop Barrier Points at the Reinforcement stage after launch. [cite: 314]",
          dep: "Output read by Project Charter. [cite: 315]"
        },
        {
          name: "18. Three-Pillar CM Designer",
          purpose: "Designs adoption plans across Comm, Edu, and Incentives. [cite: 317-318]",
          steps: [
            "Education Pillar: Add actions for each 'Hidden Fear' from Sentiment tool. [cite: 320-321]",
            "Comm Pillar: Define message, channel, and timing per segment. [cite: 323-324]",
            "Incentive Pillar: Make new behavior the path of least resistance. [cite: 325]",
            "Risk Gate: Low Section D requires at least two actions per pillar. [cite: 328]"
          ],
          tip: "The most under-resourced pillar is usually Incentive. [cite: 332-333]",
          dep: "Stakeholder Sentiment and ADKAR Diagnostic. [cite: 335]"
        },
        {
          name: "19. Data Pipeline Sentry",
          purpose: "Real-time observability into deployed pipeline health. [cite: 337-338]",
          steps: [
            "Read Health: Healthy, Warning (Drift >20%), or Critical (Drift >40%). [cite: 342]",
            "Metrics: Review Latency (ms), Throughput, and Drift Score. [cite: 343-347]",
            "Drift Rule: Above 30% triggers a critical alert—outputs are unreliable. [cite: 348]",
            "Governance: Log response to Critical alerts in Watchtower. [cite: 349-350]"
          ],
          tip: "Schema drift >40% is a retraining signal, not a pipeline fix. [cite: 351]",
          dep: "Feeds status into Governance Watchtower. [cite: 353]"
        },
        {
          name: "20. FMEA Risk Analyst",
          purpose: "Quantifies failure modes with a Risk Priority Number (RPN). [cite: 355-356]",
          steps: [
            "Add Failure: One per distinct way a step can fail. [cite: 358-359]",
            "Score SOD: Rate Severity, Occurrence, and Detection (1-10). [cite: 361-366]",
            "Calculate RPN: RPN = Sev x Occ x Det. Items >100 are red flags. [cite: 367]",
            "Hard Gate: RPN >125 must be mitigated before stabilization. [cite: 368]"
          ],
          tip: "Prioritize high-Detection failures; they cause harm silently. [cite: 369]",
          dep: "High-RPN items block CPMAI stabilization. [cite: 373]"
        }
      ]
    },
    p5: {
      name: "Phase 5 — Governance & Sustainment",
      tools: [
        {
          name: "21. Governance Watchtower",
          purpose: "Permanent oversight hub for deployed AI systems. [cite: 377-379]",
          steps: [
            "Status Check: Red header means a Critical alert is unmitigated. [cite: 381-382]",
            "Live Feed: Review alerts by severity (Critical takes precedence). [cite: 383-384]",
            "Mitigation: Mitigate only AFTER issue resolution, not assignment. [cite: 386-387]",
            "Gatekeeper: Check if Project Charter sign-off is Unlocked/Vulnerable. [cite: 388]"
          ],
          tip: "Regularly test by logging a Warning to confirm the feed is live. [cite: 396]",
          dep: "Reads from Charter, RACI, and Pipeline Sentry. [cite: 397]"
        },
        {
          name: "22. Kaizen PDCA",
          purpose: "Disciplined post-go-live loop for standardization. [cite: 399-401]",
          steps: [
            "Observe: Log observations against specific VSM steps. [cite: 403-404]",
            "Plan-Do: Design a small change and test with one team for one week. [cite: 406-407]",
            "Measure: Enter Measured Impact (%) based on real data. [cite: 408]",
            "Standardize: Click to lock positive changes as institutional record. [cite: 409-410]"
          ],
          tip: "PDCA requires the discipline to discard ideas that do not work. [cite: 413]",
          dep: "Reads VSM steps from VSM 4.0. [cite: 416]"
        },
        {
          name: "23. Scenario Simulator",
          purpose: "Tests project survival under adverse conditions. [cite: 419-420]",
          steps: [
            "Set Sliders: Use realistic Adoption and Data Health scores. [cite: 423-426]",
            "Run engine: Calculates Risk of Failure and Efficiency Gain. [cite: 427]",
            "Risk Rule: Above 50% means conditions make failure likely. [cite: 428-429]",
            "Bottleneck: Identifies the VSM step with longest wait time. [cite: 433]"
          ],
          tip: "Run with pessimistic inputs first (50% adoption, 70% reliability). [cite: 435-436]",
          dep: "Reads VSM 4.0 steps and diagnostic scores. [cite: 438]"
        },
        {
          name: "24. Socratic Audit Log",
          purpose: "Explicit justification for five core ethical questions. [cite: 440-441]",
          steps: [
            "Answer Q1-5: Root cause, bias, readiness, sustainability, fallback. [cite: 444-451]",
            "Data linkage: Reference 5-Whys categories and ADKAR barrier points. [cite: 446-449]",
            "Logic Gate: Button unlocks only after 20+ substantive characters. [cite: 452]",
            "Audit End: Must reach 100% for ethical audit closure. [cite: 455]"
          ],
          tip: "Go-live is premature if you cannot answer the Manual Fallback (Q5). [cite: 456]",
          dep: "Must reach 100% for Watchtower completion. [cite: 458]"
        },
        {
          name: "25. ROI Realization Tracker",
          purpose: "Closes loop between financial case and actual costs. [cite: 460-461]",
          steps: [
            "Enter CAPEX: Include internal staff time at fully-loaded cost. [cite: 463-464]",
            "Annual Savings: Use figures directly from Value Case Draft. [cite: 465-468]",
            "ROI Result: ((Annual Savings - CAPEX) / CAPEX) * 100. [cite: 469]",
            "Monitoring: Revisit actuals at 3, 6, and 12 months post-go-live. [cite: 474-476]"
          ],
          tip: "Track outcomes (cost/time saved), not outputs (features deployed). [cite: 479-480]",
          dep: "References Value Case Draft. [cite: 481]"
        }
      ]
    }
  };

  const nav = [
    { id: 'getting-started', label: '1. Getting Started' },
    { id: 'survey', label: '2. Diagnostic Survey' },
    { id: 'dashboard', label: '3. Results & Risk' },
    { id: 'frameworks', label: '4. Framework Library' }
  ];

  const PhaseButton = ({ id }: { id: any }) => (
    <button
      onClick={() => { setActivePhase(id); setExpandedTool(null); }}
      className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded-full transition-all ${activePhase === id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}
    >
      Phase {id.replace('p', '')}
    </button>
  );

  return (
  <div className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-blue-50">
    {/* Forensic Header: Spans Full Width */}
    <header className="w-full bg-gray-50 p-8 md:p-12 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            AI Problem-Solving Toolkit Manual
          </h1>
        </div>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
          Forensic Diagnostic System v1.0.4 — Documentation
        </p>
      </div>
    </header>

    {/* Full-Width Navigation Bar */}
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-350 mx-auto flex overflow-x-auto no-scrollbar">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveTab(n.id)}
            className={`flex-1 min-w-40 px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
              activeTab === n.id
                ? "border-blue-600 text-blue-600 bg-blue-50/30"
                : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>
    </nav>

    {/* Main Content Area: Max-Width Scaled for Large Displays */}
    <main className="w-full max-w-[1400px] mx-auto p-8 md:p-16">
      {/* 1. Getting Started Section */}
      {activeTab === "getting-started" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="space-y-2">
            <h2 className="text-[12px] font-black uppercase text-gray-300 tracking-[0.3em]">
              Systemic Implementation Path
            </h2>
            <div className="h-1 w-20 bg-blue-600"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { s: 1, t: "Go to /form", d: "Initiate the 40-question forensic diagnostic survey." },
              { s: 2, t: "Generate Report", d: "Extract readiness scores and risk band interpretations." },
              { s: 3, t: "Build Roadmap", d: "Architect a custom framework sequence in the Creator." },
              { s: 4, t: "Run Frameworks", d: "Execute the 25 methodology cases within the Orchestrator." },
            ].map((item) => (
              <div
                key={item.s}
                className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-500"
              >
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-4">
                  Step 0{item.s}
                </span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight mb-3 text-gray-900">
                  {item.t}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shrink-0 shadow-lg shadow-blue-200">
              !
            </div>
            <p className="text-xs font-bold text-blue-800 uppercase tracking-widest leading-relaxed">
              Note: Root <code>/</code> is intentionally empty. The diagnostic sequence MUST 
              initiate at <code>/form</code> for data persistence.
            </p>
          </div>
        </div>
      )}

      {/* 2. Diagnostic Survey */}
      {activeTab === "survey" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <h2 className="text-[12px] font-black uppercase text-gray-300 tracking-[0.3em]">
            Organizational Dimensions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { l: "A", t: "Problem Identification", d: "Clarifies nature, scope, and urgency." },
              { l: "B", t: "Organizational Context", d: "Measures executive support and constraints." },
              { l: "C", t: "AI Maturity", d: "Assesses literacy and current infrastructure." },
              { l: "D", t: "Stakeholder Readiness", d: "Evaluates resistance patterns and capacity." },
              { l: "E", t: "Improvement Readiness", d: "Determines if gains will be sustained post-go-live." },
            ].map((sec) => (
              <div
                key={sec.l}
                className="flex items-center gap-8 p-8 border border-gray-50 rounded-[2rem] bg-white hover:border-blue-100 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-lg group-hover:bg-blue-600 transition-colors shrink-0">
                  {sec.l}
                </div>
                <div>
                  <h3 className="text-md font-extrabold uppercase tracking-tight text-gray-900">
                    {sec.t}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {sec.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Results & Risk Bands */}
      {activeTab === "dashboard" && (
        <div className="space-y-16 animate-in fade-in duration-500">
          <h2 className="text-[12px] font-black uppercase text-gray-300 tracking-[0.3em] text-center">
            Score & Risk Interpretation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { s: "8-14", l: "Critical", c: "text-red-600 bg-red-50 border-red-100" },
              { s: "15-21", l: "Constrained", c: "text-amber-600 bg-amber-50 border-amber-100" },
              { s: "22-27", l: "Capable", c: "text-blue-600 bg-blue-50 border-blue-100" },
              { s: "28-32", l: "Advanced", c: "text-green-600 bg-green-50 border-green-100" },
            ].map((band) => (
              <div
                key={band.l}
                className={`p-10 rounded-[2.5rem] border text-center transition-all duration-500 hover:scale-105 ${band.c}`}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  {band.l}
                </div>
                <div className="text-3xl font-black italic tracking-tighter">
                  {band.s}
                </div>
              </div>
            ))}
          </div>
          <div className="p-10 bg-amber-50 border border-amber-100 rounded-[3rem] text-center max-w-4xl mx-auto">
            <p className="text-xs font-bold text-amber-900 uppercase tracking-[0.2em] italic leading-relaxed">
              Priority Overrides: Sections A, B, or D scoring below 15 trigger a hard stop. 
              Address root constraints before solution deployment.
            </p>
          </div>
        </div>
      )}

      {/* 4. 25 Framework Library */}
      {activeTab === "frameworks" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar border-b border-gray-50">
            {Object.keys(PHASES).map((p) => (
              <PhaseButton key={p} id={p} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-[12px] font-black uppercase text-gray-300 tracking-[0.3em]">
                {PHASES[activePhase].name}
              </h2>
              <div className="flex-1 h-px bg-gray-50"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {PHASES[activePhase].tools.map((tool: any, idx: any) => (
                <div
                  key={idx}
                  className={`border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                    expandedTool === idx
                      ? "border-blue-200 shadow-2xl ring-1 ring-blue-50"
                      : "border-gray-50 bg-white hover:border-gray-200 hover:shadow-lg shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setExpandedTool(expandedTool === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left bg-white transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold uppercase tracking-tight text-gray-900">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 italic">{tool.purpose}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        expandedTool === idx ? "bg-blue-600 text-white rotate-45" : "bg-gray-50 text-gray-300"
                    }`}>
                      <span className="text-2xl font-light">+</span>
                    </div>
                  </button>

                  {expandedTool === idx && (
                    <div className="p-10 md:p-16 border-t border-gray-50 bg-gray-50/30 space-y-12 animate-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                        <div className="space-y-6">
                          <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span> 
                            Implementation Steps [cite: 1-481]
                          </h4>
                          <ul className="space-y-5">
                            {tool.steps.map((step: any, sIdx: any) => (
                              <li key={sIdx} className="flex gap-6 text-sm text-gray-700 leading-relaxed font-medium">
                                <span className="text-blue-300 font-black italic text-lg leading-none">0{sIdx + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-10">
                          <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm relative">
                            <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                              Forensic Insight
                            </div>
                            <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest mb-4">Pro-Tip [cite: 1-481]</h4>
                            <p className="text-[13px] text-gray-600 italic leading-relaxed">
                              {tool.tip}
                            </p>
                          </div>
                          <div className="px-6">
                            <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest mb-3">Technical Dependency [cite: 1-481]</h4>
                            <p className="text-xs font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-4 py-1">
                              {tool.dep}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>

    {/* Full-Width Forensic Footer */}
    <footer className="w-full bg-gray-900 py-12 px-8 mt-12 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
          <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">
            Deployment Gated: Manual Fallback Active
          </p>
        </div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center md:text-right max-w-xl leading-relaxed">
          Project Charter Sign-Off is required to transition from forensic assessment 
          to active Governance Watchtower. [cite: 81, 388]
        </p>
      </div>
    </footer>
  </div>
);
};

export default ToolkitDocumentation;