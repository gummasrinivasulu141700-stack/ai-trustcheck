export interface RequirementItem {
  id: string;
  name: string;
  priority: 'P0 - Must Have (MVP)' | 'P1 - Should Have' | 'P2 - Could Have';
  description: string;
  acceptanceCriteria: string[];
}

export interface NFRItem {
  id: string;
  category: string;
  standard: string;
  metric: string;
  implementation: string;
}

export const SRS_SPECIFICATION = {
  documentTitle: "Software Requirements Specification (SRS)",
  projectTitle: "AI TrustCheck Portal",
  version: "1.0.0 (Student Prototype Release)",
  status: "Approved for Implementation & Final Year Defense",
  author: "Software Requirements Engineer & Problem Analyst",
  date: "October 2026",

  executiveOverview: `This document defines the functional and non-functional requirements for the AI TrustCheck Portal prototype. The system serves as an epistemic verification tool designed to mitigate Automation Bias by ingesting AI-generated text, decomposing assertions into atomic claims, auditing them against verified sources, computing a multidimensional Trust Score, providing critical-thinking suggestions, and enforcing responsible AI usage.`,

  // Functional Requirements
  functionalRequirements: [
    {
      id: "FR-01",
      name: "Home Page & Educational Onboarding",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall provide an intuitive landing interface outlining the problem of Automation Bias, the verification pipeline, and immediate access to the audit workflow.",
      acceptanceCriteria: [
        "Displays concise explanation of epistemic hazards in generative AI.",
        "Provides immediate entry points to the Auditor Tool, SRS Documentation, and Hallucination Lab.",
        "Contains system health and operational engine status indicators."
      ]
    },
    {
      id: "FR-02",
      name: "AI-Generated Answer Input Module",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall accept arbitrary AI-generated text, optional original user prompt context, and domain categorization for evaluation.",
      acceptanceCriteria: [
        "Textarea accepting up to 5,000 characters with real-time character and word count.",
        "Domain selector supporting Academic, Medical, Technical/Coding, History, and General.",
        "One-click loading of realistic benchmark test cases (Fake DOI, Medical Myth, Insecure Code).",
        "Clear and reset capabilities."
      ]
    },
    {
      id: "FR-03",
      name: "Atomic Claim Extraction & Proposition Analysis",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall segment continuous AI output into individual atomic propositions and classify each sentence by epistemic type.",
      acceptanceCriteria: [
        "Decomposes text using regex boundary and NLP proposition tokenization.",
        "Classifies claims into: Verified Fact, Questionable/Overconfident, Hallucination/Fabrication, Subjective Opinion, or Unverified Claim.",
        "Assigns a confidence percentage (0–100%) and risk rating (low, medium, high, critical) per proposition."
      ]
    },
    {
      id: "FR-04",
      name: "Epistemic Trust Score & Dashboard Metrics",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall compute and render a composite Trust Index (0–100) alongside five dimensional performance sub-metrics.",
      acceptanceCriteria: [
        "Calculates score via weighted formula: 35% Fact, 20% Citations, 15% Calibration, 15% Logic, 15% Neutrality minus severe hallucination penalties.",
        "Renders radial trust gauge with qualitative verdicts: High Trust, Moderate Caution, or High Risk.",
        "Displays sub-score progress bars for each of the five epistemic dimensions."
      ]
    },
    {
      id: "FR-05",
      name: "Evidence Verification & Hallucination Flagging",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall cross-examine assertions against ground-truth facts, detect fake DOIs/papers, identify dangerous medical myths, and flag security anti-patterns in code.",
      acceptanceCriteria: [
        "Identifies fabricated citations, non-existent authors, and synthetic DOIs.",
        "Flags uncalibrated dogmatic language (e.g., '100% scientifically proven').",
        "Detects hazardous code practices (e.g., SQL string concatenation) claimed to be secure."
      ]
    },
    {
      id: "FR-06",
      name: "Interactive Sentence Heatmap & Claim Inspector",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall render an annotated heatmap of the audited text, allowing users to hover or click individual sentences for deep diagnostic insights.",
      acceptanceCriteria: [
        "Color-coded highlights: Green (Verified), Yellow (Unverified), Amber (Questionable), Red (Hallucination), Blue (Opinion).",
        "Clicking an assertion reveals why it was flagged, the confidence score, and recommended corrections.",
        "Filter toggle allowing students to isolate only Hallucinations or Verified claims."
      ]
    },
    {
      id: "FR-07",
      name: "Authoritative Source Links & Grounding References",
      priority: "P1 - Should Have",
      description: "The system shall provide verified literature links and knowledge base citations relevant to the audited assertions.",
      acceptanceCriteria: [
        "Presents curated reference cards (e.g., PubMed, Nature, Stanford Encyclopedia of Philosophy, PEP Python Docs).",
        "Includes relevance explanation describing why the source refutes or substantiates the claim."
      ]
    },
    {
      id: "FR-08",
      name: "Critical-Thinking Suggestions & Epistemic Prompts",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall provide pedagogical prompts and heuristic checklists guiding students to critically evaluate synthetic text.",
      acceptanceCriteria: [
        "Includes 'Epistemic Self-Check Questions' for students before trusting AI answers.",
        "Highlights the distinction between stylistic fluency and factual truth.",
        "Provides actionable questions for user cross-examination (e.g., 'Can this DOI be resolved on doi.org?')."
      ]
    },
    {
      id: "FR-09",
      name: "Fact-Repaired Answer (Before vs. After)",
      priority: "P1 - Should Have",
      description: "The system shall synthesize an improved, calibrated version of the response with hallucinations removed and proper academic hedging applied.",
      acceptanceCriteria: [
        "Displays the corrected version in a dedicated comparison view.",
        "One-click copy to clipboard functionality."
      ]
    },
    {
      id: "FR-10",
      name: "Standardized Academic Audit Certificate",
      priority: "P1 - Should Have",
      description: "The system shall generate a printable, formatted certificate of epistemic audit suitable for attaching to student project submissions.",
      acceptanceCriteria: [
        "Generates unique audit hash ID (e.g., TC-XXXX-XXXX) and timestamp.",
        "Includes letter grades (A+, B, C, F) and dimensional scorecard.",
        "Browser print/save PDF optimization with printer-friendly styling."
      ]
    },
    {
      id: "FR-11",
      name: "Robust Dual-Engine Error Handling",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall handle network failures, missing API keys, or timeout errors gracefully without crashing the UI.",
      acceptanceCriteria: [
        "Implements server-side fallback to deterministic heuristic rules if LLM API is unavailable.",
        "Validates input payloads and returns clear, user-friendly error banners.",
        "Prevents unhandled promise rejections on the client or server."
      ]
    },
    {
      id: "FR-12",
      name: "Responsible AI Disclaimer & Ethical Notice",
      priority: "P0 - Must Have (MVP)",
      description: "The system shall prominently present an ethical AI usage disclaimer clarifying the limitations of automated auditing and the primacy of human judgment.",
      acceptanceCriteria: [
        "Persistent ethical disclaimer displayed in the footer and audit certificate.",
        "States explicitly: 'AI TrustCheck is an epistemic assistance tool and does not replace peer-reviewed literature or expert professional advice.'",
        "Reinforces human-in-the-loop responsibility."
      ]
    }
  ],

  // Non-Functional Requirements
  nonFunctionalRequirements: [
    {
      id: "NFR-01",
      category: "Performance & Latency",
      standard: "Response Time",
      metric: "< 4.0 seconds for LLM audit, < 500ms for heuristic audit.",
      implementation: "Optimized prompt token size on Gemini 3.8 Flash; lightweight local regex parsing for fallback engine."
    },
    {
      id: "NFR-02",
      category: "Reliability & Availability",
      standard: "Fault Tolerance",
      metric: "99.9% uptime for local prototype via Dual-Engine Architecture.",
      implementation: "Automatic fallback to rule-based engine when external API keys or connections are absent."
    },
    {
      id: "NFR-03",
      category: "Usability & Accessibility",
      standard: "Cognitive Load Reduction",
      metric: "System Usability Scale (SUS) target >= 85; 1-click test benchmarks.",
      implementation: "Clean color-coded legend, mobile-responsive layout, and high-contrast typography (Inter / Plus Jakarta Sans)."
    },
    {
      id: "NFR-04",
      category: "Security & Privacy",
      standard: "Data Confidentiality",
      metric: "Zero persistence of sensitive input text to external third-party storage.",
      implementation: "In-memory processing only; no telemetry or user tracking; Gemini API keys strictly server-side."
    },
    {
      id: "NFR-05",
      category: "Maintainability & Code Quality",
      standard: "Modular Architecture",
      metric: "TypeScript strict type safety with 100% lint pass (tsc --noEmit).",
      implementation: "Decoupled component architecture separating input, state management, scoring algorithms, and presentation."
    },
    {
      id: "NFR-06",
      category: "Portability & Standards",
      standard: "Cross-Platform Execution",
      metric: "Full responsiveness across Chrome, Firefox, Safari, Edge, and mobile viewports.",
      implementation: "Vite + Tailwind CSS responsive grid with print stylesheets."
    }
  ],

  // Prioritization Matrix (MoSCoW)
  moscowMatrix: {
    mustHave: [
      "AI text input with character/word count and preset loaders (FR-02)",
      "Sentence claim segmentation and status categorization (FR-03)",
      "Composite Trust Score algorithm and 5-vector dashboard (FR-04)",
      "Evidence verification & hallucination flagging (FR-05)",
      "Interactive sentence heatmap and claim inspector (FR-06)",
      "Critical-thinking heuristic suggestions (FR-08)",
      "Dual-engine fallback error handling (FR-11)",
      "Responsible AI disclaimer (FR-12)"
    ],
    shouldHave: [
      "Authoritative knowledge base source links (FR-07)",
      "Fact-repaired answer comparison (FR-09)",
      "Printable Academic Audit Certificate with verification hash (FR-10)",
      "Interactive Hallucination Spotter Lab quiz module"
    ],
    couldHave: [
      "Automated DOI resolver querying CrossRef API in real-time",
      "Export to BibTeX citation format",
      "Batch auditing of multiple essays concurrently"
    ],
    wontHaveForPrototype: [
      "User authentication / database accounts (out of scope for single-session prototype)",
      "Commercial paywalls or subscription billing",
      "Browser extension integration (deferred to post-college roadmap)"
    ]
  }
};
