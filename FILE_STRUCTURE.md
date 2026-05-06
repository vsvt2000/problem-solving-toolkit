# AI Operational Playbook — File Inventory

A structured overview of all files, their responsibilities, and system-level interactions.

---

## 1. System Overview

This application is a **diagnostic-driven AI implementation playbook** built using:

- Next.js 14 + React 19  
- Zustand (with persistent state)  
- Tailwind CSS (UI system)  

### Core Flow

1. User completes diagnostic questionnaire  
2. Scores determine AI maturity and readiness  
3. System generates a dynamic **25-framework execution roadmap**  
4. User executes frameworks phase-by-phase with governance controls  

---

## 2. Project Structure

### 2.1 Core Configuration

| File | Purpose |
|------|--------|
| package.json | Dependencies and scripts |
| tsconfig.json | TypeScript configuration with path aliases |
| next.config.ts | Next.js runtime and build configuration |
| postcss.config.mjs | Tailwind CSS processing |
| eslint.config.mjs | Linting and code quality |

---

### 2.2 Layout & Styling

| File | Purpose |
|------|--------|
| app/layout.tsx | Root layout (fonts, metadata, wrappers) |
| app/globals.css | Global styles and Tailwind imports |
| app/page.tsx | Landing page (entry placeholder) |

---

### 2.3 Routing & Entry Point

| File | Purpose |
|------|--------|
| app/form/page.tsx | Diagnostic questionnaire UI and entry point |

---

## 3. Core Application Layers

### 3.1 Orchestration Layer

| Component | Role |
|----------|------|
| framework-switcher.tsx | Routes between phases and frameworks |
| results-dashboard.tsx | Displays diagnostic results and recommendations |
| sequence-flow.tsx | Visualizes full execution roadmap |

---

## 4. Framework Modules

### Phase 1 — Discovery

| Component | Purpose |
|----------|--------|
| problem-statement-constructor.tsx | Defines problem (current, ideal, gap, impact) |
| five-whys.tsx | Root cause analysis |
| shadow.tsx | Digital vs. actual process comparison |
| final-summary.tsx | Charter consolidation and sign-off |

---

### Phase 2 — Strategy

| Component | Purpose |
|----------|--------|
| sipoc.tsx | Process boundary mapping |
| sentiment.tsx | Stakeholder sentiment analysis |
| ideation.tsx | Solution prioritization |
| rca.tsx | Evidence-based diagnosis |

---

### Phase 3 — Architecture

| Component | Purpose |
|----------|--------|
| vsm.tsx | Value Stream Mapping with efficiency calculation |
| architecture.tsx | System design (Interface / Logic / Data layers) |
| raci.tsx | Responsibility assignment matrix |
| pre-mortem.tsx | Failure anticipation and mitigation |
| value-feasibility.tsx | Solution prioritization matrix |

---

### Phase 4 — Build & Stabilization

| Component | Purpose |
|----------|--------|
| cpmai.tsx | Data pipeline build tracking |
| adkar.tsx | Change readiness assessment |
| three-pillar.tsx | Change execution tracking |
| data-pipeline-sentry.tsx | Pipeline monitoring |
| fmea.tsx | Risk assessment (RPN calculation) |

---

### Phase 5 — Governance

| Component | Purpose |
|----------|--------|
| watchtower.tsx | Governance alerts and system monitoring |
| kaizen.tsx | Continuous improvement tracking |
| scenario-simulator.tsx | Stress testing scenarios |
| audit-log.tsx | Decision audit and verification |
| finance-roi.tsx | ROI tracking and financial validation |

---

## 5. Secondary Frameworks

| Component | Purpose |
|----------|--------|
| smart.tsx | Goal definition and validation |
| lss.tsx | Lean Six Sigma (DMAIC) |
| power-grid.tsx | Stakeholder mapping |
| phase2-report.tsx | Diagnostic synthesis report |
| signoff-gate.tsx | Phase 1 approval logic |
| value-case.tsx | Business case creation |

---

## 6. State Management (Zustand)

### Key Stores

| Store | Responsibility |
|------|---------------|
| diagnostic.ts | Diagnostic scores and AI maturity |
| orchestrator.ts | Framework sequencing logic |
| frameworks.ts | SIPOC and base toolkit data |
| vsm.ts | Process efficiency calculations |
| fmea.ts | Risk scoring (RPN) |
| cpmai.ts | Data pipeline tracking |
| adkar.ts | Change readiness |
| finance.ts | Financial tracking |
| audit.ts | Governance logs |
| watchtower.ts | Alert monitoring |

---

## 7. Data Flow

### Diagnostic Flow

1. User completes questionnaire (`app/form/page.tsx`)  
2. Data stored in `diagnostic.ts`  
3. Results displayed in dashboard  

---

### Execution Flow

1. Dashboard triggers orchestration  
2. `orchestrator.ts` maps scores → frameworks  
3. User executes frameworks sequentially  

---

### Example: SIPOC → VSM

1. SIPOC captures process steps  
2. Data stored in `frameworks.ts`  
3. VSM imports steps  
4. Efficiency calculated (Value Add vs Lead Time)  
5. System flags inefficiencies  

---

## 8. Risk & Governance Flow

1. FMEA identifies risks (RPN scoring)  
2. Pre-Mortem surfaces failure scenarios  
3. Watchtower monitors system health  
4. Audit Log records decisions and validations  

---

## 9. Persistence

- Zustand stores use `localStorage`
- Data persists across sessions
- Reset via DevTools or store methods

---

## 10. Critical Logic Gates

| Gate | Condition | Action |
|------|----------|--------|
| Sign-Off | No blockers + efficiency met | Enable deployment |
| Discovery Trigger | Low Section A score | Force discovery sprint |
| AI Feasibility | Low maturity + GenAI | Reduce feasibility |
| FMEA Risk | RPN > 125 | Flag high risk |
| Efficiency Warning | PER < threshold | Highlight waste |
| Governance Breach | Critical alert active | Block system |
| Data Risk | Low reliability + adoption | High failure probability |

---

## 11. Installation & Setup

```bash
npm install
npm run dev
# http://localhost:3000/form

npm run build
npm start
npm run lint