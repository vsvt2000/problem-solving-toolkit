# Framework Definitions: AI Operational Playbook

A comprehensive glossary of frameworks integrated into the Forensic Governance Engine.

---

## Core Governance Frameworks

### 1. CPMAI (Contextualized Product Management AI Initiative)
**Definition**: A 6-stage AI model lifecycle framework that contextualizes AI development within organizational constraints and business outcomes. It ensures AI projects are managed as products, not experiments, with defined handoff points and accountability at each stage.

**Key Stages**: 
- Problem Contextualization
- Data Preparation & Validation
- Model Architecture & Development
- Integration & Testing
- Deployment & Monitoring
- Continuous Refinement

**Purpose**: Prevents "Black Box" AI failures by enforcing structured development with forensic oversight at each transition.

---

### 2. Lean Six Sigma 4.0 (LSS 4.0)
**Definition**: An evolution of the DMAIC (Define-Measure-Analyze-Improve-Control) methodology adapted for AI and digital transformation. It combines statistical rigor with process optimization to reduce waste and variability in AI initiatives.

**Core Phases**:
- **Define**: Problem statement and project scope
- **Measure**: Current state quantification and baseline metrics
- **Analyze**: Root cause identification and gap analysis
- **Improve**: Solution design and optimization
- **Control**: Governance and sustained performance monitoring

**Purpose**: Provides statistical discipline to AI projects, ensuring decisions are data-driven and improvements are measurable.

---

### 3. ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement)
**Definition**: A structured change management model that tracks individual and organizational transitions through five sequential stages. It addresses the human side of AI deployment by ensuring stakeholders move through adoption at the same pace.

**Five Stages**:
- **Awareness**: Understanding why change is needed and the urgency
- **Desire**: Building motivation to participate and succeed with the change
- **Knowledge**: Providing training and skill development
- **Ability**: Building competence through practice and support
- **Reinforcement**: Sustaining change through feedback and recognition

**Purpose**: Bridges the gap between technical deployment and successful adoption by managing people, not just systems.

---

## Diagnostic & Assessment Frameworks

### 4. 5-Factor Assessment (Readiness Profile)
**Definition**: A diagnostic scoring system (8–32 scale per factor) that evaluates AI project readiness across five critical dimensions. The combined score (40–160) dynamically shapes the implementation roadmap and deployment intensity.

**Five Factors**:
- **Section A: Problem Definition** – Clarity of the problem vs. vague symptom identification
- **Section B: Organizational Context** – Resource availability and structural constraints
- **Section C: AI Capability** – Data maturity and AI/ML literacy in the organization
- **Section D: Change Readiness** – Stakeholder buy-in and cultural openness to AI
- **Section E: CI Maturity** – History of continuous improvement and Lean discipline

**Purpose**: Prevents one-size-fits-all implementations by tailoring project intensity to organizational capacity.

---

### 5. Pre-Mortem Audit
**Definition**: A "Future-Back" analysis conducted before implementation in which the team imagines the AI deployment has failed in production. The team then works backward to identify the root causes and design mitigation strategies.

**Process**:
1. Assume the AI project failed post-deployment
2. Identify all possible failure modes (technical, organizational, data-related)
3. Document root causes
4. Design preventive controls before build begins

**Purpose**: Surfaces hidden risks early and embeds risk mitigation into the design phase rather than firefighting after failure.

---

## Process Mapping & Value Frameworks

### 6. SIPOC 4.0 (Suppliers-Inputs-Process-Outputs-Customers)
**Definition**: A process mapping framework enhanced with AI observability considerations. It captures the end-to-end flow of inputs through a process to outputs, while identifying where AI-specific monitoring (data quality, model drift) must be embedded.

**Components**:
- **Suppliers**: Data sources and systems feeding the AI
- **Inputs**: Data, parameters, and external factors
- **Process**: The AI workflow and decision-making steps
- **Outputs**: Model predictions, recommendations, or actions
- **Customers**: End users consuming the AI outputs

**AI Extension**: Adds "Observability Gaps" – points where data quality or model performance cannot be monitored in real time.

**Purpose**: Provides a holistic view of the AI system and identifies monitoring blind spots before production.

---

### 7. Value Stream Map 4.0 (VSM 4.0)
**Definition**: A visual representation of all steps (value-added and non-value-added) required to transform inputs into outputs. Version 4.0 includes AI-specific metrics: inference latency, model retraining cycles, and human handoff delays.

**Key Metrics**:
- **Value-Added Time**: Steps that directly contribute to the desired outcome
- **Non-Value-Added Time**: Delays, approvals, rework, and waiting
- **Cycle Time**: Total time from input to output
- **Process Efficiency**: Ratio of value-added to total time

**Purpose**: Quantifies where AI can reduce waste and identifies bottlenecks that AI alone cannot solve.

---

### 8. Value-Feasibility Matrix
**Definition**: A 2x2 prioritization tool that maps potential AI features against two dimensions: Business Impact (High/Low) and Technical Feasibility (Easy/Hard). It surfaces which features to build first.

**Quadrants**:
- **High Impact + Easy**: "Quick Wins" – build immediately
- **High Impact + Hard**: "Strategic Bets" – build with more resources
- **Low Impact + Easy**: "Nice to Have" – consider for Phase 2
- **Low Impact + Hard**: "Avoid" – not worth the effort

**Purpose**: Prevents wasted engineering effort on technically impressive but business-irrelevant features.

---

## Stakeholder & Governance Frameworks

### 9. Stakeholder Power Grid
**Definition**: A 2x2 matrix that visualizes stakeholders by their Influence (High/Low) and Interest (High/Low) in the AI project. It identifies who must be managed closely, kept informed, or monitored.

**Quadrants**:
- **High Influence + High Interest**: "Manage Closely" – executive sponsors, end users
- **High Influence + Low Interest**: "Keep Satisfied" – IT security, compliance officers
- **Low Influence + High Interest**: "Keep Informed" – power users, domain experts
- **Low Influence + Low Interest**: "Monitor" – peripheral stakeholders

**Purpose**: Prevents project sabotage by identifying resistance early and tailoring engagement strategies.

---

### 10. RACI-AI Matrix (Responsible-Accountable-Consulted-Informed)
**Definition**: A role clarity framework specifically adapted for AI projects. It defines who owns model outputs, who approves data usage, who monitors drift, and who is informed of decisions.

**Roles**:
- **Responsible**: Executes the work (e.g., data engineer prepares training data)
- **Accountable**: Makes final decisions and owns outcomes (e.g., data science lead owns model accuracy)
- **Consulted**: Provides input and expertise (e.g., domain expert reviews training data)
- **Informed**: Receives updates but does not make decisions (e.g., stakeholders receive model performance reports)

**AI-Specific Accountabilities**:
- Model output quality and fairness
- Data governance and lineage
- Drift detection and retraining triggers
- Bias audits and regulatory compliance

**Purpose**: Eliminates ambiguity about who owns AI decisions and prevents accountability gaps.

---

### 11. Governance Watchtower
**Definition**: A centralized master interface for compliance, regulatory alignment, and ongoing governance of deployed AI. It tracks adherence to ISO 42001 (AI Management Systems) and organizational policies.

**Functions**:
- Real-time compliance dashboards
- Audit trail of all model changes
- Bias and fairness monitoring
- Regulatory documentation automation
- Escalation workflows for policy violations

**Purpose**: Ensures AI systems remain compliant and auditable throughout their operational life.

---

## Analytical & Quality Frameworks

### 12. 5-Whys Forensic Analysis
**Definition**: An iterative root-cause analysis technique that asks "Why?" five times to move beyond surface symptoms to underlying causes. Each answer becomes the subject of the next "Why?" question.

**Process**:
1. **Why 1**: Identify immediate cause
2. **Why 2**: Drill into the cause of the cause
3. **Why 3**: Go deeper into systemic factors
4. **Why 4**: Identify organizational or process-level issues
5. **Why 5**: Reach the root cause (often a policy, skill gap, or misalignment)

**Purpose**: Prevents AI projects from solving symptoms (e.g., "Our data quality is poor") instead of root causes (e.g., "We lack a data governance policy").

---

### 13. FMEA Risk Analyst (Failure Modes and Effects Analysis)
**Definition**: A systematic risk assessment framework that identifies potential failure modes in the AI system, calculates their severity, assigns occurrence probability, and detects ability to catch failures. The Risk Priority Number (RPN) ranks risks by impact.

**Key Metrics**:
- **Severity (S)**: Impact if the failure occurs (1-10 scale)
- **Occurrence (O)**: Likelihood of failure (1-10 scale)
- **Detection (D)**: Ability to catch the failure before harm (1-10 scale)
- **RPN**: Risk Priority Number = S × O × D

**Failure Mode Examples**:
- Data drift causes model accuracy to drop 20%+
- Model outputs biased against minority groups
- Integration latency exceeds tolerance
- Unauthorized data access via model API

**Purpose**: Quantifies AI risks and prioritizes mitigation investments based on actual impact potential.

---

### 14. Socratic Audit Log
**Definition**: A persistent, immutable record of logic verification conducted at every phase transition. It documents the questions asked, evidence examined, and decisions made to move forward.

**Structure**:
- **Phase Transition**: Which phase is being exited/entered
- **Questions Posed**: Verification steps taken (e.g., "Is root cause evidence sufficient?")
- **Evidence Examined**: What data/artifacts were reviewed
- **Decision & Rationale**: Who approved advancement and why
- **Timestamp & Approver**: Forensic accountability

**Purpose**: Creates a defensible audit trail for regulatory compliance and post-deployment forensics if issues arise.

---

## Monitoring & Continuous Improvement Frameworks

### 15. Data Pipeline Sentry
**Definition**: A real-time telemetry and monitoring system that tracks data quality, model performance, and operational health throughout the AI system's lifecycle. It detects drift, anomalies, and degradation automatically.

**Monitored Dimensions**:
- **Data Quality**: Missing values, outliers, schema changes
- **Model Drift**: Prediction distribution changes, accuracy degradation
- **Feature Drift**: Input data distribution changes
- **Latency**: Inference and pipeline response times
- **Fairness Metrics**: Bias detection across demographic groups

**Alerting Logic**:
- Threshold breaches (e.g., accuracy drops below 85%)
- Statistical anomalies (e.g., 3σ deviations)
- Trend degradation (e.g., 5% accuracy loss over 30 days)

**Purpose**: Enables proactive intervention before AI system failures impact business outcomes.

---

### 16. Kaizen-PDCA (Plan-Do-Check-Act)
**Definition**: A continuous improvement cycle adapted for AI systems. It embeds structured experimentation and refinement into the operational model, preventing stagnation.

**Cycle Stages**:
- **Plan**: Define the improvement hypothesis (e.g., "Retraining weekly will reduce drift")
- **Do**: Implement the change in a controlled environment
- **Check**: Measure impact against baseline metrics
- **Act**: Standardize if successful, refine if not

**AI Applications**:
- Model retraining frequency optimization
- Feature engineering experiments
- Data augmentation strategies
- Bias mitigation techniques

**Purpose**: Embeds a culture of continuous improvement and prevents the AI system from becoming static and outdated.

---

### 17. Scenario Simulator
**Definition**: A testing framework that models the AI system's behavior under "Black Swan" operational scenarios—rare but high-impact events outside normal operating conditions.

**Scenario Types**:
- **Data Scenarios**: Extreme values, missing data, poisoned data
- **Operational Scenarios**: Traffic spikes, latency degradation, system outages
- **Market Scenarios**: Economic downturns, regulatory changes, competitive disruption
- **Adversarial Scenarios**: Intentional attempts to manipulate model outputs

**Testing Approach**:
1. Define scenario parameters
2. Inject conditions into a shadow environment
3. Observe model behavior and system resilience
4. Document failure points and recovery time

**Purpose**: Surfaces hidden fragility in AI systems and ensures preparedness for crisis scenarios.

---

### 18. ROI Realization Tracker
**Definition**: A financial audit framework that compares projected AI benefits (from the initial Value Case) against actual realized savings post-deployment. It tracks both tangible (cost savings) and intangible (quality, compliance) benefits.

**Key Metrics**:
- **Projected ROI**: Initial benefit estimate
- **Actual ROI**: Real-world realized value
- **Variance Analysis**: Difference and root causes
- **Payback Period**: Months to full cost recovery
- **NPV (Net Present Value)**: Total present value of future benefits minus costs

**Tracking Timeline**:
- **Month 0**: Deployment (establish baseline)
- **Month 3–6**: Early gains (quick wins)
- **Month 12**: Full realization (steady state)
- **Month 24+**: Optimization plateau (mature state)

**Purpose**: Ensures AI projects deliver on business promises and identifies where value capture has fallen short.

---

## Operational Frameworks

### 19. Three-Pillar Change Management (CM)
**Definition**: A framework that integrates three simultaneous change streams to ensure AI deployment succeeds: Technical Delivery, Process Redesign, and People Adoption.

**Three Pillars**:
- **Technical Delivery**: Model development, infrastructure build, integration testing
- **Process Redesign**: Reengineering workflows to leverage AI capabilities
- **People Adoption**: Training, communication, and individual readiness (ADKAR)

**Synchronization Rules**:
- All three pillars must reach deployment readiness simultaneously
- If one pillar lags, the entire deployment is delayed (not selectively skipped)
- Communication cadence ties all three together (weekly standups, monthly reviews)

**Purpose**: Prevents the common failure of "Tech Done, Process Unchanged, People Unprepared."

---

### 20. Strategic Playbook Selector
**Definition**: A decision framework that determines the optimal deployment intensity based on readiness assessment scores. It selects one of three playbooks: Light, Selective, or Accelerated.

**Three Playbooks**:

**Light Playbook** (Readiness Score: 40–80)
- Pilot with limited user group
- Extended stabilization period (6–12 months)
- High touch training and support
- Risk-averse; focuses on safety over speed

**Selective Playbook** (Readiness Score: 81–120)
- Phased rollout by department or region
- Parallel operation with legacy system (3–6 months)
- Self-service training with expert support
- Balanced approach; moderate speed and risk

**Accelerated Playbook** (Readiness Score: 121–160)
- Rapid organization-wide deployment
- Full switchover within 1–3 months
- Minimal parallel run; heavy automation
- Fast-paced; assumes strong readiness and change capacity

**Purpose**: Matches deployment intensity to organizational capacity, preventing both reckless over-acceleration and excessive over-caution.

---

### 21. Problem Statement Builder
**Definition**: A structured 4-part formula for defining AI problems with forensic precision. It forces clarity on current state, ideal state, the gap, and business impact.

**Four Components**:
1. **Current State**: What is happening today (quantified with metrics)
   - Example: "Currently, loan approval takes 7 days; 60% require manual review"

2. **Ideal State**: What should happen (defined outcome)
   - Example: "Approvals should complete within 24 hours; 95% auto-approved with confidence >90%"

3. **Gap**: Quantified difference between current and ideal
   - Example: "Gap: 6 days reduction + 35% reduction in manual review"

4. **Impact**: Business consequences of the gap
   - Example: "Impact: $2M annual delay cost; customer churn 5% due to slow approvals"

**Purpose**: Creates an unambiguous problem definition that guides all downstream technical and organizational decisions.

---

### 22. VOC Intake (Voice of Customer)
**Definition**: A systematic capture process that translates raw stakeholder verbatims and complaints into Critical-to-Quality (CTQ) requirements. It bridges customer language and technical specifications.

**Process**:
1. **Verbatim Capture**: Collect customer/stakeholder statements (interviews, surveys, complaints)
2. **Grouping**: Cluster similar statements into themes
3. **Translation to CTQ**: Convert each theme into measurable quality requirements
   - Example: Verbatim "This is too slow" → CTQ "Response time < 2 seconds"
4. **Prioritization**: Rank CTQs by business importance
5. **Handoff to Technical**: CTQs become system requirements

**Purpose**: Ensures AI systems address real customer needs, not assumed needs.

---

### 23. Digital Shadow Mapper
**Definition**: A data flow audit that compares the "True" flow of data (actual, as traced through systems) against "Assumed" documentation flow (as documented in diagrams and policies). It identifies hidden data flows, undocumented transformations, and governance gaps.

**Process**:
1. **Map Assumed Flow**: Document all documented data flows
2. **Trace True Flow**: Follow data through systems via logs, code, and interviews
3. **Identify Gaps**: Highlight discrepancies between assumed and true
4. **Audit Governance**: Check if undocumented flows comply with policy
5. **Remediate**: Update documentation or implement controls

**Common Findings**:
- Data flowing to unmonitored systems
- Transformations not in documented ETL pipelines
- Shadow databases or spreadsheets
- Uncontrolled data sharing between teams

**Purpose**: Prevents AI projects from inheriting hidden data risks and governance liabilities.

---

### 24. Infrastructure Audit
**Definition**: A technical assessment that verifies the existing IT infrastructure can support the AI system's performance requirements (latency, throughput, storage, compute).

**Assessment Dimensions**:
- **Compute**: GPU/TPU availability for inference and retraining
- **Latency**: Network delay acceptable for use case (e.g., <100ms for real-time, <60s for batch)
- **Throughput**: Transactions per second the system must handle
- **Storage**: Data retention and model artifact storage capacity
- **Integration**: API availability and compatibility with existing systems
- **Disaster Recovery**: Backup and failover capabilities

**Output**: Go/No-Go decision for technical feasibility.

**Purpose**: Prevents infrastructure surprises post-deployment and identifies upfront investment needs.

---

### 25. CPMAI Build Tracker
**Definition**: A project management interface that monitors progress through the 6-stage AI model development lifecycle (Contextualization → Data → Architecture → Integration → Deployment → Refinement). It enforces phase gates and prevents premature advancement.

**Stage Gates**:
1. **Contextualization**: Problem and requirements locked in; data plan approved
2. **Data Preparation**: Training/validation data ready; quality metrics confirmed
3. **Architecture & Development**: Model trained; performance targets met
4. **Integration & Testing**: Integrated with production systems; UAT completed
5. **Deployment**: Live in production; monitoring active
6. **Continuous Refinement**: Kaizen loop active; retraining scheduled

**Each Gate Requires**:
- Sign-off from RACI-designated accountable party
- Evidence checklist completion
- Socratic Audit Log entry

**Purpose**: Prevents scope creep and project timeline overruns by enforcing structured progression.

---

## Summary Table

| Framework | Type | Primary Use |
|-----------|------|-------------|
| CPMAI | Core Governance | 6-stage AI development lifecycle |
| LSS 4.0 | Core Governance | Statistical discipline and process optimization |
| ADKAR | Core Governance | Individual and organizational change management |
| 5-Factor Assessment | Diagnostic | AI readiness scoring and playbook selection |
| Pre-Mortem Audit | Risk | Early failure mode identification |
| SIPOC 4.0 | Process Mapping | End-to-end process and observability gaps |
| VSM 4.0 | Value Analysis | Non-value-added time quantification |
| Value-Feasibility Matrix | Prioritization | Feature prioritization |
| Stakeholder Power Grid | Engagement | Stakeholder management strategy |
| RACI-AI Matrix | Governance | Role and accountability clarity |
| Governance Watchtower | Compliance | Regulatory and policy compliance |
| 5-Whys Forensic | Analysis | Root cause identification |
| FMEA Risk Analyst | Risk | Risk quantification and prioritization |
| Socratic Audit Log | Audit | Phase transition verification |
| Data Pipeline Sentry | Monitoring | Real-time system health tracking |
| Kaizen-PDCA | Improvement | Continuous refinement cycles |
| Scenario Simulator | Testing | Black Swan resilience testing |
| ROI Realization Tracker | Financial | Benefit realization audit |
| Three-Pillar CM | Operational | Technical + Process + People coordination |
| Strategic Playbook Selector | Deployment | Intensity matching and risk calibration |
| Problem Statement Builder | Definition | Forensic problem definition |
| VOC Intake | Requirements | Customer-centric requirement translation |
| Digital Shadow Mapper | Audit | Hidden data flow identification |
| Infrastructure Audit | Technical | System capacity verification |
| CPMAI Build Tracker | Tracking | Development phase management |

---

**Last Updated**: May 2026  
**Classification**: Internal Framework Reference  
**Intended Use**: AI Operational Playbook implementation teams