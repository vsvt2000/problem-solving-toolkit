export const SURVEY_DATA = {
  sections: [
    {
      id: "A",
      title: "SECTION A: PROBLEM IDENTIFICATION",
      questions: [
        { id: "A1", question: "How would you best describe the primary problem your organization is facing?", options: [
          { l: "We are unclear on strategic direction — where to compete, what to prioritize, or how to position", w: 1 },
          { l: "We have a process or operational issue — things are slow, expensive, inconsistent, or low quality", w: 2 },
          { l: "We are going through a large-scale change — restructuring, new systems, cultural shift, or transformation", w: 3 },
          { l: "We have a performance gap — results are below target but the root cause is unclear", w: 4 }
        ]},
        { id: "A2", question: "How long has this problem existed?", options: [
          { l: "Less than 3 months — it is new and we are still understanding it", w: 1 },
          { l: "3 to 12 months — it is established but we have not yet addressed it systematically", w: 2 },
          { l: "1 to 3 years — it is chronic and previous attempts to fix it have not worked", w: 3 },
          { l: "More than 3 years — it is deeply embedded in how the organization operates", w: 4 }
        ]},
        { id: "A3", question: "What triggered the decision to address this problem now?", options: [
          { l: "A specific event — a failure, a crisis, a regulatory requirement, or a leadership change", w: 1 },
          { l: "Accumulating pressure — performance has been declining and stakeholders are demanding action", w: 2 },
          { l: "A strategic opportunity — we want to improve before problems emerge, not in response to them", w: 3 },
          { l: "External benchmarking — we discovered we are significantly behind peers or competitors", w: 4 }
        ]},
        { id: "A4", question: "How well understood is the root cause of the problem?", options: [
          { l: "Not understood at all — we know something is wrong but not why", w: 1 },
          { l: "Partially understood — we have hypotheses but no confirmed root cause", w: 2 },
          { l: "Mostly understood — we have diagnosed the cause but disagree on the solution", w: 3 },
          { l: "Fully understood — root cause is confirmed and we need help with the solution and execution", w: 4 }
        ]},
        { id: "A5", question: "How many parts of the organization does this problem affect?", options: [
          { l: "One team or function — the problem is contained within a single unit", w: 1 },
          { l: "Multiple teams within one business unit — cross-functional but within one division", w: 2 },
          { l: "Multiple business units — the problem cuts across divisions or geographies", w: 3 },
          { l: "The entire organization — it affects strategy, operations, and people at every level", w: 4 }
        ]},
        { id: "A6", isMulti: true, question: "What is the primary consequence if this problem is not solved within 12 months?", options: [
          { l: "Financial loss — revenue decline, cost increase, or profitability erosion", w: 1 },
          { l: "Competitive disadvantage — falling behind peers, losing market position, or losing customers", w: 2 },
          { l: "Regulatory or compliance risk — fines, sanctions, legal exposure, or audit findings", w: 3 },
          { l: "People and culture damage — talent loss, disengagement, burnout, or trust breakdown", w: 4 }
        ]},
        { id: "A7", question: "Has this problem been formally attempted before?", options: [
          { l: "No — this is the first structured attempt to address it", w: 1 },
          { l: "Yes, once — a previous initiative was launched but did not achieve lasting results", w: 2 },
          { l: "Yes, multiple times — recurring attempts have all fallen short", w: 3 },
          { l: "Partially — some elements have been addressed but the core problem persists", w: 4 }
        ]},
        { id: "A8", question: "What type of outcome are you primarily seeking?", options: [
          { l: "A diagnosis — we need to understand what is wrong before deciding what to do", w: 1 },
          { l: "A solution design — we know the problem and need a structured plan to fix it", w: 2 },
          { l: "An execution framework — we have a plan and need help delivering it effectively", w: 3 },
          { l: "A sustainability model — we have delivered change but need it to stick and improve over time", w: 4 }
        ]}
      ]
    },

    {
      id: "B",
      title: "SECTION B: ORGANIZATIONAL CONTEXT",
      questions: [
        { id: "B1", question: "What best describes your organization's size?", options: [
          { l: "Small — fewer than 100 employees", w: 1 },
          { l: "Mid-size — 100 to 999 employees", w: 2 },
          { l: "Large — 1,000 to 9,999 employees", w: 3 },
          { l: "Enterprise — 10,000 or more employees", w: 4 }
        ]},
        { id: "B2", question: "What best describes your industry?", options: [
          { l: "Financial services — banking, insurance, asset management, fintech", w: 1 },
          { l: "Healthcare and life sciences — hospitals, pharma, medtech, health systems", w: 2 },
          { l: "Consumer and retail — FMCG, e-commerce, retail, hospitality", w: 3 },
          { l: "Industrial and manufacturing — engineering, supply chain, energy, utilities", w: 4 },
          { l: "Professional services and technology — consulting, IT services, software, telecoms", w: 5 },
          { l: "Public sector and non-profit — government, education, NGOs, regulated entities", w: 6 }
        ]},
        { id: "B3", question: "What best describes your organization's current strategic priority?", options: [
          { l: "Growth — expanding markets, customers, products, or geographies", w: 1 },
          { l: "Efficiency — reducing costs, improving margins, or streamlining operations", w: 2 },
          { l: "Transformation — fundamentally changing the business model, technology, or culture", w: 3 },
          { l: "Resilience — stabilizing, managing risk, or recovering from disruption", w: 4 }
        ]},
        { id: "B4", question: "Data quality available?", options: [
          { l: "Poor — data is fragmented, unreliable, or largely unavailable", w: 1 },
          { l: "Basic — some data exists but it is incomplete, inconsistent, or hard to access", w: 2 },
          { l: "Moderate — usable data is available but requires significant cleaning and preparation", w: 3 },
          { l: "Strong — data is reliable, accessible, and largely ready for analysis and AI use", w: 4 }
        ]},
        { id: "B5", question: "Senior leadership attitude?", options: [
          { l: "Unaware or disengaged — leadership has not formally recognized the problem", w: 1 },
          { l: "Aware but passive — leadership acknowledges the problem but has not committed to action", w: 2 },
          { l: "Supportive — leadership recognizes the problem and is willing to resource a solution", w: 3 },
          { l: "Actively sponsoring — a named senior leader is personally driving and accountable for resolution", w: 4 }
        ]},
        { id: "B6", question: "Primary constraint?", options: [
          { l: "Resources — insufficient budget, headcount, or time", w: 1 },
          { l: "Capability — lack of skills, knowledge, or tools to address the problem", w: 2 },
          { l: "Alignment — stakeholders disagree on the problem, the priority, or the solution", w: 3 },
          { l: "Culture — the organization's mindset, habits, or values are barriers to change", w: 4 }
        ]},
        { id: "B7", question: "Realistic timeline?", options: [
          { l: "Less than 3 months — urgent, needs fast results", w: 1 },
          { l: "3 to 6 months — near-term, moderate urgency", w: 2 },
          { l: "6 to 12 months — standard project timeline", w: 3 },
          { l: "More than 12 months — long-term program or transformation", w: 4 }
        ]},
        { id: "B8", question: "Tolerance for risk?", options: [
          { l: "Very low — we need high certainty before committing; failures are not acceptable", w: 1 },
          { l: "Low — we prefer proven approaches with limited experimentation", w: 2 },
          { l: "Moderate — we are open to some experimentation if the overall approach is sound", w: 3 },
          { l: "High — we are comfortable with iteration, ambiguity, and learning through doing", w: 4 }
        ]}
      ]
    },

    {
  id: "C",
  title: "SECTION C: AI MATURITY ASSESSMENT",
  questions: [
    { id: "C1", question: "How would you describe your organization's current use of AI?", options: [
      { l: "a) None — AI tools are not currently used in any meaningful way", w: 1 },
      { l: "b) Exploratory — a few individuals or teams are experimenting with AI tools informally", w: 2 },
      { l: "c) Pilot stage — one or more structured AI pilots are underway with defined objectives", w: 3 },
      { l: "d) Scaled — AI is embedded in multiple workflows and used routinely across the organization", w: 4 }
    ]},

    { id: "C2", question: "State of AI infrastructure?", options: [
      { l: "a) None — no dedicated AI tools, platforms, or data infrastructure exists", w: 1 },
      { l: "b) Basic — standard productivity tools with some AI features (e.g. Microsoft Copilot, Google Workspace AI)", w: 2 },
      { l: "c) Intermediate — dedicated AI platforms or analytics tools are in place for specific functions", w: 3 },
      { l: "d) Advanced — enterprise AI platforms, data lakes, MLOps pipelines, and custom models are operational", w: 4 }
    ]},

    { id: "C3", question: "Workforce AI literacy?", options: [
      { l: "a) Very low — most employees have no experience with AI tools and are unfamiliar with basic concepts", w: 1 },
      { l: "b) Low — a minority of employees use AI tools; most have awareness but no practical experience", w: 2 },
      { l: "c) Moderate — a meaningful portion of employees regularly use AI tools in their daily work", w: 3 },
      { l: "d) High — AI tool usage is widespread, confident, and embedded in how most teams work", w: 4 }
    ]},

    { id: "C4", question: "Formal AI governance/ethics policy?", options: [
      { l: "a) No — there is no policy and no plan to create one", w: 1 },
      { l: "b) In development — a policy is being drafted but is not yet in force", w: 2 },
      { l: "c) Informal — guidelines exist but they are not formally documented or enforced", w: 3 },
      { l: "d) Formal — a documented, approved, and enforced AI governance policy is in place", w: 4 }
    ]},

    { id: "C5", question: "Primary barrier to AI adoption?", options: [
      { l: "a) Data — insufficient, poor quality, or inaccessible data to support AI applications", w: 1 },
      { l: "b) Skills — employees and leaders lack the knowledge to use or trust AI tools", w: 2 },
      { l: "c) Culture — resistance, fear of job displacement, or lack of psychological safety around AI", w: 3 },
      { l: "d) Governance — unclear ownership, risk concerns, or regulatory uncertainty around AI use", w: 4 }
    ]},

    { id: "C6", isMulti: true, question: "Which AI capabilities are currently most relevant? (Select up to two)", options: [
      { l: "a) Process automation — replacing repetitive manual tasks with AI-driven workflows", w: 1 },
      { l: "b) Predictive analytics — forecasting outcomes, risks, or trends from historical data", w: 2 },
      { l: "c) Natural language processing — analyzing text, generating documents, or mining unstructured data", w: 3 },
      { l: "d) Decision support — AI recommendations that assist but do not replace human judgment", w: 4 },
      { l: "e) Computer vision — analyzing images, video, or physical process data", w: 5 },
      { l: "f) Generative AI — creating content, synthesizing information, or accelerating knowledge work", w: 6 }
    ]},

    { id: "C7", question: "Importance of explainable AI?", options: [
      { l: "a) Critical — stakeholders will not accept AI outputs they cannot understand or verify", w: 1 },
      { l: "b) Important — explainability is preferred but not an absolute requirement", w: 2 },
      { l: "c) Moderate — explainability matters for some use cases but not all", w: 3 },
      { l: "d) Low — stakeholders are comfortable with AI outputs even without detailed explanation", w: 4 }
    ]},

    { id: "C8", question: "Primary goal for AI?", options: [
      { l: "a) Efficiency — use AI to do existing work faster and with less manual effort", w: 1 },
      { l: "b) Insight — use AI to surface patterns, root causes, and recommendations we cannot see manually", w: 2 },
      { l: "c) Decision quality — use AI to improve the accuracy and consistency of key decisions", w: 3 },
      { l: "d) Innovation — use AI to enable new approaches, business models, or capabilities", w: 4 }
    ]}
  ]
},

{
  id: "D",
  title: "SECTION D: STAKEHOLDER AND CHANGE READINESS",
  questions: [
    { id: "D1", question: "Overall attitude of employees toward this initiative?", options: [
      { l: "a) Resistant — active pushback, disengagement, or opposition from a significant portion of the workforce", w: 1 },
      { l: "b) Skeptical — cautious and unconvinced; waiting to see evidence before committing", w: 2 },
      { l: "c) Neutral — neither supportive nor opposed; largely unaware or indifferent", w: 3 },
      { l: "d) Supportive — a meaningful portion of employees understand the need and want to participate", w: 4 }
    ]},

    { id: "D2", question: "Vision and purpose communication?", options: [
      { l: "a) Not communicated — employees are largely unaware this initiative is happening", w: 1 },
      { l: "b) Minimally communicated — a top-level message has gone out but with little detail or context", w: 2 },
      { l: "c) Partially communicated — some teams have been briefed but messaging is inconsistent", w: 3 },
      { l: "d) Fully communicated — a clear, consistent narrative has reached all affected employees with opportunity for questions", w: 4 }
    ]},

    { id: "D3", question: "Are there identified change champions?", options: [
      { l: "a) No — no champions have been identified and none exist organically", w: 1 },
      { l: "b) Informally — a few enthusiastic individuals exist but there is no structured champions program", w: 2 },
      { l: "c) Partially — champions have been identified in some areas but not across all affected teams", w: 3 },
      { l: "d) Fully — a structured champions network is in place with defined roles, training, and accountability", w: 4 }
    ]},

    { id: "D4", question: "Primary fear or concern?", options: [
      { l: "a) Job security — concern that AI or process changes will eliminate or devalue their roles", w: 1 },
      { l: "b) Competence — fear of not being able to learn new tools or ways of working", w: 2 },
      { l: "c) Fairness — concern that the initiative will benefit some groups more than others", w: 3 },
      { l: "d) Trust — skepticism about leadership's motives or ability to deliver on commitments", w: 4 }
    ]},

    { id: "D5", question: "Quality of cross-functional collaboration?", options: [
      { l: "a) Poor — teams operate in silos; collaboration is infrequent and often adversarial", w: 1 },
      { l: "b) Below average — some collaboration exists but it is inconsistent and often blocked by politics", w: 2 },
      { l: "c) Average — collaboration happens when required but is not a cultural strength", w: 3 },
      { l: "d) Strong — cross-functional teams work effectively together; collaboration is a genuine organizational capability", w: 4 }
    ]},

    { id: "D6", question: "Past handling of major change?", options: [
      { l: "a) Poorly — most major initiatives have failed to achieve their objectives or sustain results", w: 1 },
      { l: "b) Mixed — some initiatives have succeeded but the track record is inconsistent", w: 2 },
      { l: "c) Adequately — most initiatives have delivered results but adoption has often been slower than planned", w: 3 },
      { l: "d) Well — the organization has a strong track record of delivering and sustaining major change", w: 4 }
    ]},

    { id: "D7", question: "Change management resources?", options: [
      { l: "a) None — no dedicated change management budget, team, or capability exists", w: 1 },
      { l: "b) Limited — some budget is available but there is no dedicated change management resource", w: 2 },
      { l: "c) Moderate — a change management workstream exists with partial dedicated resource", w: 3 },
      { l: "d) Sufficient — a fully resourced change management team with budget, tools, and executive mandate is in place", w: 4 }
    ]},

    { id: "D8", isMulti: true, question: "Most effective communication channels? (Select up to two)", options: [
      { l: "a) Leadership town halls and all-hands meetings", w: 1 },
      { l: "b) Line manager cascades — information passed through the management chain", w: 2 },
      { l: "c) Digital channels — intranet, email newsletters, Slack, or Teams", w: 3 },
      { l: "d) Peer networks — informal communication through colleagues and team conversations", w: 4 }
    ]}
  ]
},

{
  id: "E",
  title: "SECTION E: CONTINUOUS IMPROVEMENT READINESS",
  questions: [
    { id: "E1", question: "Formal CI program or methodology?", options: [
      { l: "a) No — there is no CI program and improvement is ad hoc", w: 1 },
      { l: "b) Informal — improvement efforts happen but are not structured under a formal methodology", w: 2 },
      { l: "c) Partial — a CI methodology exists in some areas but is not consistently applied organization-wide", w: 3 },
      { l: "d) Formal — a named CI program (Lean, Six Sigma, Agile, TQM, or equivalent) is active and resourced", w: 4 }
    ]},

    { id: "E2", question: "How are improvement ideas captured?", options: [
      { l: "a) They are not — there is no formal mechanism for capturing improvement ideas", w: 1 },
      { l: "b) Informally — ideas are raised in meetings or through managers but there is no systematic process", w: 2 },
      { l: "c) Partially — some teams have idea management processes but there is no organization-wide system", w: 3 },
      { l: "d) Systematically — a structured process exists for capturing, evaluating, prioritizing, and actioning improvement ideas", w: 4 }
    ]},

    { id: "E3", question: "How is process performance measured?", options: [
      { l: "a) We do not measure process performance in any systematic way", w: 1 },
      { l: "b) We track outputs (e.g. revenue, units produced) but not process-level metrics", w: 2 },
      { l: "c) We track some process metrics but they are inconsistent, delayed, or not acted upon", w: 3 },
      { l: "d) We have real-time or near-real-time process dashboards with defined KPIs and review cadences", w: 4 }
    ]},

    { id: "E4", question: "How embedded is CI culture?", options: [
      { l: "a) Not embedded — improvement is seen as a project, not a way of working", w: 1 },
      { l: "b) Emerging — some teams value improvement but it is not an organizational expectation", w: 2 },
      { l: "c) Developing — improvement is encouraged by leadership but not yet consistently practiced", w: 3 },
      { l: "d) Embedded — continuous improvement is a genuine cultural norm; teams regularly identify and act on opportunities without being prompted", w: 4 }
    ]},

    { id: "E5", question: "Primary improvement methodology?", options: [
      { l: "a) Lean — focused on waste elimination, flow, and value delivery", w: 1 },
      { l: "b) Six Sigma or DMAIC — focused on defect reduction and statistical process control", w: 2 },
      { l: "c) Agile or Scrum — focused on iterative delivery, feedback loops, and adaptability", w: 3 },
      { l: "d) None — no specific methodology is currently in use", w: 4 }
    ]},

    { id: "E6", question: "Ability to sustain improvements?", options: [
      { l: "a) Poor — improvements frequently revert to old ways within weeks or months", w: 1 },
      { l: "b) Mixed — some improvements stick but many erode over time without sustained attention", w: 2 },
      { l: "c) Moderate — most improvements are sustained but require ongoing management attention to hold", w: 3 },
      { l: "d) Strong — improvements are embedded in standard operating procedures and hold without constant reinforcement", w: 4 }
    ]},

    { id: "E7", question: "Biggest barrier to CI?", options: [
      { l: "a) Capacity — people are too busy with day-to-day work to focus on improvement", w: 1 },
      { l: "b) Skills — people lack the methodology knowledge or analytical capability to drive improvement", w: 2 },
      { l: "c) Priority — improvement is not visibly valued or rewarded by leadership", w: 3 },
      { l: "d) Data — insufficient or inaccessible data makes it difficult to identify, measure, or validate improvements", w: 4 }
    ]},

    { id: "E8", isMulti: true, question: "How should success be measured?", options: [
      { l: "a) Output metrics — revenue, cost savings, defect rates, cycle time, or customer satisfaction scores", w: 1 },
      { l: "b) Process metrics — adherence to new processes, tool adoption rates, and workflow compliance", w: 2 },
      { l: "c) People metrics — employee engagement, capability development, and change adoption scores", w: 3 },
      { l: "d) A balanced scorecard — a combination of output, process, and people metrics reviewed on a regular cadence", w: 4 }
    ]}
  ]
}

    // C, D, E follow same pattern (already aligned conceptually — only labels expanded exactly like above)
  ]
};