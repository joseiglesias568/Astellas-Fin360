// Meeting configuration for the Presentation Hub
// Defines standard recurring financial meetings with metadata and slide definitions
//
// Dynamic values use {{placeholder}} syntax and are resolved at runtime
// by lib/meetings-data.ts using live database values. If a placeholder cannot
// be resolved, the raw {{token}} is left in place as a fallback indicator.

export type MeetingCadence = 'Monthly' | 'Quarterly' | 'Annual';
export type MeetingStatus = 'Ready' | 'In Prep' | 'Upcoming';

export interface SlideDefinition {
  id: string;
  title: string;
  subtitle?: string;
  memo: string;
  checked: boolean;
}

export interface MeetingConfig {
  slug: string;
  name: string;
  shortName: string;
  cadence: MeetingCadence;
  description: string;
  nextDate: string;
  status: MeetingStatus;
  icon: string; // lucide icon name
  audienceLabel: string;
  slides: SlideDefinition[];
}

export const meetings: MeetingConfig[] = [
  {
    slug: 'monthly-operating-review',
    name: 'Monthly Operating Review (MOR)',
    shortName: 'MOR',
    cadence: 'Monthly',
    description: 'CFO review of P&L performance, product net sales, and key operating metrics across Astellas geographic segments: United States, Established Markets, Japan, International Markets, and China.',
    nextDate: 'Mar 18, 2026',
    status: 'Ready',
    icon: 'BarChart3',
    audienceLabel: 'Executive · CFO Review',
    slides: [
      { id: 'mor-title', title: 'Title Slide', subtitle: 'Monthly Operating Review', memo: 'Opening title slide with meeting metadata, attendees, and agenda overview.', checked: true },
      { id: 'mor-exec', title: 'Executive Summary', subtitle: 'Q1 FY2026 — Tracking Ahead of Plan', memo: '{{fiscal_quarter}} consolidated revenue of <strong>{{consolidated_revenue}}</strong> (<span class="memo-positive">{{consolidated_revenue_yoy}} YoY</span>), driven by PADCEV label expansion and XTANDI volume resilience. Core Operating Profit at <strong>{{operating_income}}</strong>, margin at <strong>{{operating_margin}}</strong> (<span class="memo-positive">{{operating_margin_bps_yoy}} YoY</span>). Core EPS <strong>{{annual_eps}}</strong>. SMT savings ¥9.5B Q1 run-rate. Astellas Finance360 initiatives tracking ahead of plan.', checked: true },
      { id: 'mor-revenue', title: 'Revenue Overview', subtitle: 'Quarterly revenue trend and P&L summary', memo: 'Consolidated revenue ¥558.0B Q1 FY26 (<span class="memo-positive">+2.9% vs Q1 FY25 ¥542.0B</span>). P&L summary shows improving gross margin and Core OP operating leverage. Revenue mix shifting toward higher-margin oncology portfolio (PADCEV, VYLOY) and women\'s health (VEOZAH).', checked: true },
      { id: 'mor-segments', title: 'Revenue by Geography', subtitle: 'US leads growth; Established Markets expanding on PADCEV EU approval', memo: 'United States revenue of <strong>{{na_revenue}}</strong> (<span class="memo-positive">{{na_revenue_yoy}} YoY</span>), Established Markets at <strong>{{intl_revenue}}</strong> (<span class="memo-positive">{{intl_revenue_yoy}}</span>), Japan at <strong>{{channel_revenue}}</strong> (<span class="memo-negative">{{channel_revenue_yoy}}</span>). China and International Markets accelerating on VYLOY gastric cancer ramp.', checked: true },
      { id: 'mor-comps', title: 'Product Net Sales Growth', subtitle: 'PADCEV and VYLOY volume-driven; XTANDI resilient vs IRA headwind', memo: 'Strategic Brands portfolio growth of <strong>{{organic_growth}}</strong> — led by <strong>PADCEV +34.8% volume</strong> and <strong>VYLOY +415.6% launch ramp</strong>. XTANDI ¥960.8B (+5.3%). VEOZAH and IZERVAY continue US launch uptake trajectory above plan.', checked: true },
      { id: 'mor-margin', title: 'Core OP Margin Analysis', subtitle: 'Margin walk — Strategic Brands mix and SMT savings driving expansion', memo: 'Core Operating Margin at <strong>{{operating_margin}}</strong> (<span class="memo-positive">{{operating_margin_bps_yoy}} YoY</span>). Strategic Brands portfolio gross margin >80% provides mix tailwind. SMT program ¥21B FY25 achieved; FY26 ¥40B incremental target on track. Finance360 analytics supporting SMT delivery tracking.', checked: true },
      { id: 'mor-digital', title: 'Pipeline & R&D Progress', subtitle: '12 active oncology programs; 3 POC milestones FY25; CDx adoption advancing', memo: '3 Proof-of-Concept milestones achieved FY25 — meeting annual guidance. 4 Phase 3 study initiations in FY25. VYLOY CDx (Claudin 18.2) penetration at 38% vs. 55% FY26 target. PADCEV MIBC neoadjuvant Phase 3 enrollment on track. IZERVAY geographic atrophy patient reach +85% YoY.', checked: true },
      { id: 'mor-stores', title: 'Product Launch Tracker', subtitle: 'VEOZAH, IZERVAY, VYLOY — launch curve vs. internal plan', memo: 'VEOZAH (fezolinetant) US launch: ¥46.6B FY25, tracking to ¥65B FY26 (+40%). IZERVAY (avacincaptad pegol) GA: ~22,000 patients treated FY25, +85% YoY. VYLOY (zolbetuximab) gastric cancer: ¥63.1B FY25 vs ¥12.2B FY24; FY26 target ¥120B.', checked: true },
      { id: 'mor-menu', title: 'Therapy Area Performance', subtitle: 'Oncology, Urology/Nephrology, Immunology, Ophthalmology', memo: 'Oncology (>60% R&D spend) led by PADCEV ADC platform and XTANDI franchise. Urology/Nephrology: VEOZAH women\'s health expanding prescriber base. Immunology: transplant and autoimmune pipeline progressing. Ophthalmology: IZERVAY building retinal specialist adoption vs. Syfovre competition.', checked: true },
      { id: 'mor-supply', title: 'Cost Structure & SMT Progress', subtitle: 'SMT walk — ¥21B FY25 achieved; ¥40B FY26 incremental on track', memo: 'R&D expense ¥443B (20.7% intensity) FY25; SG&A ¥467B declining with SMT savings. Cost of Sales ~20.7% of revenue (biologics/small molecule manufacturing). SMT program: ¥11B SG&A efficiency + ¥10B R&D portfolio pruning = ¥21B FY25. FY26 ¥40B incremental on structural trajectory.', checked: true },
      { id: 'mor-cx', title: 'Commercial Excellence', subtitle: 'HCP engagement, patient support programs, and market access', memo: 'XTANDI: ~8,000 target urologic/medical oncologists; Pfizer co-promotion synergies. PADCEV: EV-302 data-driven formulary access improving. VEOZAH patient adherence program enrollment tracking above plan. VYLOY CDx companion diagnostic education driving eligible patient identification.', checked: true },
      { id: 'mor-people', title: 'People & Organizational Health', subtitle: 'SMT restructuring progress, R&D talent, and culture metrics', memo: 'SMT workforce optimization on track — commercial model restructuring in mature markets. R&D talent: key oncology scientists retained through competitive compensation. Internal promotion rate and employee engagement scores maintained during SMT program. Regulatory affairs headcount growing to support pipeline submissions.', checked: true },
      { id: 'mor-compete', title: 'Competitive & Regulatory Landscape', subtitle: 'XTANDI IRA defense; PADCEV vs. Trodelvy; VEOZAH market development', memo: 'XTANDI competitive position vs. Erleada (J&J) and Nubeqa (Bayer) in mHSPC/nmCRPC — market share stable. PADCEV vs. Trodelvy (Gilead) in urothelial carcinoma — EV-302 first-line data is key differentiator. VEOZAH vs. off-label gabapentin/escitalopram — physician education program progressing. IRA negotiation: Pfizer/Astellas joint defense strategy active.', checked: true },
      { id: 'mor-intl', title: 'Geographic Performance Deep-Dive', subtitle: '5 segments — US, Established Markets, Japan, International, China', memo: 'US ¥940.2B (+8.1% FY25): PADCEV first-line ramp and XTANDI resilience. Established Markets ¥563.6B: PADCEV EU approval driving EU uptake. Japan ¥289.0B: stable with biennial NHI revision (April 2026) risk. China ¥101.5B: VYLOY gastric cancer ramp with high incidence advantage. International Markets ¥230.7B: oncology access improving.', checked: true },
      { id: 'mor-risks', title: 'Risk Assessment', subtitle: 'XTANDI IRA –¥36B EV; FX adverse –¥23.1B EV; PADCEV upside +¥38.5B EV', memo: 'Key risks: XTANDI IRA price negotiation (<span class="memo-negative">–¥36B probability-weighted EV</span>), FX yen appreciation vs ¥151 baseline (<span class="memo-negative">–¥23.1B EV</span>), Japan NHI revision severity (<span class="memo-negative">–¥14.4B EV</span>). Key opportunities: PADCEV label expansion (<span class="memo-positive">+¥38.5B EV</span>), FX tailwind (<span class="memo-positive">+¥18.9B EV</span>), VEOZAH outperformance (<span class="memo-positive">+¥16.8B EV</span>).', checked: true },
      { id: 'mor-strategy', title: 'Strategic Initiatives Tracker', subtitle: 'SMT, PADCEV label expansion, VYLOY CDx, IZERVAY geographic', memo: 'Four strategic initiatives tracked against budget and milestones: (1) SMT ¥40B FY26 — on track, ¥9.5B Q1 run-rate; (2) PADCEV MIBC neoadjuvant Phase 3 — enrollment per plan; (3) VYLOY CDx penetration — 38% vs 55% target, accelerating; (4) IZERVAY geographic expansion — EU reimbursement submission filed.', checked: true },
      { id: 'mor-outlook', title: 'Forward Outlook & Guidance', subtitle: 'FY26 guidance: Revenue ¥2,210B; Core OP ¥580B; Core EPS ¥250', memo: 'FY26 guidance: Revenue <strong>¥2,210B (+3.3%)</strong>; Core Operating Profit <strong>¥580B (+4.4%)</strong>; Core EPS <strong>¥250 (+5.5%)</strong>. Key swing factors: XTANDI IRA final negotiated price, yen/USD rate vs ¥151 baseline (¥2.1B Core OP per ¥1 move), and PADCEV label expansion timing.', checked: true },
      { id: 'mor-actions', title: 'Decisions & Next Steps', subtitle: '3 decisions required — 5 active action items', memo: '5 active action items. <strong>Near-term priorities:</strong> IRA defense strategy briefing with Pfizer (Mar 25), Japan NHI revision scenario planning sign-off (Apr 1), and PADCEV MIBC Phase 3 enrollment review with Chief Medical Officer (Apr 5).', checked: true },
      { id: 'mor-appendix', title: 'Appendix & Q&A', subtitle: 'Additional data, platform links, and open discussion', memo: 'Supplementary materials and deep-dive links to Astellas Finance360 platform modules. Open floor for questions and discussion.', checked: true },
    ],
  },
  {
    slug: 'earnings-call-prep',
    name: 'Earnings Call Prep',
    shortName: 'Earnings Prep',
    cadence: 'Quarterly',
    description: 'Pre-earnings analysis with guidance vs. consensus comparison, talking points, and Q&A preparation for the quarterly earnings call.',
    nextDate: 'Apr 22, 2026',
    status: 'In Prep',
    icon: 'Mic',
    audienceLabel: 'Executive · Investor Relations',
    slides: [
      { id: 'ec-0', title: 'Earnings Overview', memo: 'Quarterly earnings summary and key highlights.', checked: true },
      { id: 'ec-1', title: 'Revenue Walk', memo: 'Revenue bridge from prior year to current quarter.', checked: true },
      { id: 'ec-2', title: 'EPS Bridge', memo: 'Earnings per share walk with key drivers.', checked: true },
      { id: 'ec-3', title: 'Guidance Update', memo: 'Updated full-year guidance and assumptions.', checked: true },
      { id: 'ec-4', title: 'Analyst Q&A Prep', memo: 'Anticipated questions and recommended responses.', checked: true },
    ],
  },
  {
    slug: 'board-of-directors-update',
    name: 'Board of Directors Update',
    shortName: 'Board Update',
    cadence: 'Quarterly',
    description: 'Board-ready financial summary, strategic progress update, and key governance items for the quarterly board meeting.',
    nextDate: 'May 12, 2026',
    status: 'Upcoming',
    icon: 'Users',
    audienceLabel: 'Board · Governance',
    slides: [
      { id: 'bd-0', title: 'CEO Strategic Update', memo: 'Finance360 strategy progress and milestones.', checked: true },
      { id: 'bd-1', title: 'Financial Performance', memo: 'Consolidated P&L and segment highlights.', checked: true },
      { id: 'bd-2', title: 'Capital Returns', memo: 'Dividend and share repurchase program update.', checked: true },
      { id: 'bd-3', title: 'Risk Dashboard', memo: 'Enterprise risk register and key mitigation actions.', checked: true },
      { id: 'bd-4', title: 'ESG & Sustainability', memo: 'ESG framework, sustainability targets, and progress.', checked: true },
    ],
  },
  {
    slug: 'capital-allocation-review',
    name: 'Capital Allocation Review',
    shortName: 'CapEx Review',
    cadence: 'Quarterly',
    description: 'CapEx tracking, acquisition pipeline ROI analysis, technology investments, and capital deployment priorities.',
    nextDate: 'Apr 8, 2026',
    status: 'Upcoming',
    icon: 'PiggyBank',
    audienceLabel: 'Finance · Capital Planning',
    slides: [
      { id: 'ca-0', title: 'CapEx Summary', memo: 'Year-to-date capital expenditure vs. budget.', checked: true },
      { id: 'ca-1', title: 'Acquisition Pipeline ROI', memo: 'Acquisition and integration return metrics.', checked: true },
      { id: 'ca-2', title: 'Technology Investments', memo: 'Digital platform, operations analytics, and AI investments.', checked: true },
      { id: 'ca-3', title: 'Free Cash Flow', memo: 'FCF generation and allocation priorities.', checked: true },
    ],
  },
  {
    slug: 'annual-budget-planning',
    name: 'Annual Budget Planning (AOP)',
    shortName: 'AOP',
    cadence: 'Annual',
    description: 'Next fiscal year budget build, assumptions, segment targets, and investment priorities for the annual operating plan.',
    nextDate: 'Jul 2026',
    status: 'Upcoming',
    icon: 'Calculator',
    audienceLabel: 'Finance · FP&A',
    slides: [
      { id: 'aop-0', title: 'Planning Assumptions', memo: 'Macro and pharmaceutical market assumptions for FY2027: FX baseline (¥/USD), IRA pricing outcomes, Japan NHI revision rates, pipeline approval timelines, SMT savings trajectory, and R&D investment envelope.', checked: true },
      { id: 'aop-1', title: 'Revenue Targets', memo: 'Segment revenue builds and growth assumptions.', checked: true },
      { id: 'aop-2', title: 'Cost Structure', memo: 'Compensation, cost of services, G&A, and investment targets.', checked: true },
      { id: 'aop-3', title: 'Margin Targets', memo: 'Operating margin walk and improvement levers.', checked: true },
    ],
  },
  {
    slug: 'investor-day-prep',
    name: 'Investor Day Prep',
    shortName: 'Investor Day',
    cadence: 'Annual',
    description: 'Long-range strategic plan, three-year financial framework, and segment deep-dives for the annual investor conference.',
    nextDate: 'Sep 2026',
    status: 'Upcoming',
    icon: 'TrendingUp',
    audienceLabel: 'Executive · Investor Relations',
    slides: [
      { id: 'inv-0', title: 'Strategic Vision', memo: 'CEO long-range vision and strategic pillars.', checked: true },
      { id: 'inv-1', title: 'Three-Year Financial Framework', memo: 'Revenue, margin, and EPS targets through FY2029.', checked: true },
      { id: 'inv-2', title: 'Growth Algorithm', memo: 'Organic growth, M&A pipeline, and margin expansion drivers.', checked: true },
      { id: 'inv-3', title: 'Digital & Innovation', memo: 'Digital roadmap and innovation pipeline.', checked: true },
    ],
  },
];

export function getMeetingBySlug(slug: string): MeetingConfig | undefined {
  return meetings.find(m => m.slug === slug);
}
