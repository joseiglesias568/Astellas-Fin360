// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/reports.ts
//
// Report metadata (frequency, department, audience, rating, views) is
// illustrative for demonstration. Department names map to Astellas Pharma
// segment structure (US, Established Markets, Japan, International, China, Corporate).
// ─────────────────────────────────────────────────────────────────────
import { ReportsConfig } from '../../types';

export const reports: ReportsConfig = {
  totalReports: 42,
  categories: [
    'XTANDI & Oncology Portfolio',
    'Strategic Brands Performance',
    'Japan Business',
    'International Markets & China',
    'Enterprise Finance & Core EPS',
    'R&D Pipeline & Approvals',
    'Capital Structure & Treasury',
  ],
  reports: [
    // ──────────────────────────────────────────
    // XTANDI & Oncology Portfolio — 8 reports
    // ──────────────────────────────────────────
    {
      id: 'xt-1', name: 'XTANDI IRA Price Impact Tracker', category: 'XTANDI & Oncology Portfolio', frequency: 'Weekly',
      description: 'XTANDI US net sales tracker vs IRA-negotiated Medicare price (effective January 2026). Volume vs price decomposition. US TRx trend vs market. Medicare vs commercial segment revenue split. Each ¥10B quarterly shortfall ≈ −¥38B annual Core OP at ~70% incremental margin.',
      format: 'PowerBI', department: 'Finance', owner: 'US FP&A / Revenue Accounting', rating: 4.9, views: 3800, isNew: false, isTrending: true,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'US Revenue System / IQVIA TRx Data', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'US President', 'CEO', 'IR'], tags: ['xtandi', 'ira', 'medicare', 'revenue'], nextUpdate: 'Every Monday 6:00 AM',
    },
    {
      id: 'xt-2', name: 'US Oncology Market Share Dashboard', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI US prescription market share by indication: mCRPC, nmCRPC, ECS. Competitive landscape: abiraterone, darolutamide, apalutamide positioning. Pfizer co-promotion performance KPIs. Market share trend vs new entrants.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial Analytics', rating: 4.8, views: 2700, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'IQVIA Symphony Health / Commercial Analytics', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'US President', 'Commercial VP'], tags: ['market-share', 'xtandi', 'oncology', 'competitive'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'xt-3', name: 'XTANDI Global Revenue by Geography', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI quarterly revenue by region: US, Japan, EU, Rest of World. FX-adjusted growth rates. US IRA impact isolated. Ex-US growth trajectory and market expansion opportunity. ¥960.8B FY2025 baseline tracking.',
      format: 'PowerBI', department: 'Finance', owner: 'Global Revenue Accounting', rating: 4.8, views: 2400, isNew: false, isTrending: true,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'Global Revenue System / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Regional Presidents'], tags: ['xtandi', 'global', 'geography', 'revenue'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'xt-4', name: 'Pfizer Collaboration Revenue Monitor', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'Astellas–Pfizer XTANDI collaboration: US co-promotion revenue split; royalty income from ex-US Pfizer-led territories. Collaboration agreement terms and revenue recognition per ASC 808. Quarterly settlement reconciliation.',
      format: 'PowerBI', department: 'Finance', owner: 'Business Development Finance', rating: 4.7, views: 1800, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'Collaboration Accounting System', accessLevel: 'Finance + Legal',
      audience: ['CFO', 'Business Development VP', 'Controller'], tags: ['pfizer', 'collaboration', 'royalty', 'xtandi'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'xt-5', name: 'Prostate Cancer Competitive Intelligence Report', category: 'XTANDI & Oncology Portfolio', frequency: 'Quarterly',
      description: 'Full prostate cancer treatment landscape: AR pathway inhibitors, taxanes, PARP inhibitors, radioligand therapies. XTANDI competitive positioning across mCRPC, nmCRPC, ECS. Clinical trial landscape for next-generation competition.',
      format: 'PowerBI', department: 'Strategy', owner: 'Oncology Market Intelligence', rating: 4.7, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'Clinical Trials / Market Intelligence', accessLevel: 'Finance + Strategy',
      audience: ['CFO', 'US President', 'CEO', 'R&D Leadership'], tags: ['competitive', 'prostate-cancer', 'pipeline', 'market-intel'], nextUpdate: 'Quarterly Day 15',
    },
    {
      id: 'xt-6', name: 'XTANDI New Indication Pipeline Tracker', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI lifecycle extension pipeline: earlier-stage prostate cancer, combination therapy readouts, international label expansion filings. PMDA and FDA submission timelines. Each new indication ≈ ¥50–150B peak sales potential.',
      format: 'PowerBI', department: 'Finance', owner: 'R&D Finance / Commercial', rating: 4.6, views: 1500, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'R&D Pipeline System / Regulatory Tracker', accessLevel: 'Finance + R&D',
      audience: ['CFO', 'CSO', 'US President', 'CEO'], tags: ['xtandi', 'pipeline', 'lifecycle', 'indication'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'xt-7', name: 'XTANDI Core OP Contribution Bridge', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI revenue-to-Core OP waterfall: net sales, royalty costs, allocated COGS, direct SG&A, R&D support costs. Incremental margin analysis. IRA price change impact isolated from volume trend. Q-over-Q bridge.',
      format: 'PowerBI', department: 'Finance', owner: 'US FP&A', rating: 4.8, views: 2200, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'US Segment P&L / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'US President', 'IR'], tags: ['xtandi', 'core-op', 'bridge', 'margin'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'xt-8', name: 'Patient Access & Oncology Support Programs', category: 'XTANDI & Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI patient assistance program metrics: co-pay card utilization, free drug programs, reimbursement support. Impact on gross-to-net adjustments. Medicare Part D out-of-pocket redesign implications for XTANDI patient economics.',
      format: 'PowerBI', department: 'Commercial', owner: 'Market Access Finance', rating: 4.5, views: 1200, isNew: false, isTrending: false,
      relatedConsoleId: 'xtandi-oncology', dataSource: 'Patient Access Programs System', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'US President', 'Market Access VP'], tags: ['patient-access', 'gross-to-net', 'medicare', 'xtandi'], nextUpdate: 'Monthly Day 11',
    },

    // ──────────────────────────────────────────
    // Strategic Brands Performance — 7 reports
    // ──────────────────────────────────────────
    {
      id: 'sb-1', name: 'PADCEV Revenue & Market Penetration Dashboard', category: 'Strategic Brands Performance', frequency: 'Weekly',
      description: 'PADCEV (enfortumab vedotin) weekly revenue vs ¥221.2B FY2025 baseline. EV+pembro combination penetration in 1L urothelial cancer. Seagen collaboration revenue tracking. US market share vs new competitive entrants.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial Finance', rating: 4.9, views: 3200, isNew: false, isTrending: true,
      relatedConsoleId: 'strategic-brands', dataSource: 'Commercial Analytics / Revenue System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'US President', 'CEO', 'IR'], tags: ['padcev', 'urothelial', 'revenue', 'market-share'], nextUpdate: 'Every Monday 7:00 AM',
    },
    {
      id: 'sb-2', name: 'IZERVAY US Launch Performance Tracker', category: 'Strategic Brands Performance', frequency: 'Weekly',
      description: 'IZERVAY (avacincaptad pegol) US launch KPIs for geographic atrophy: new prescriptions, payer coverage wins, patient starts. ¥77.6B FY2025 revenue baseline. Competitive positioning vs Apellis Syfovre. Label expansion discussions.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial Finance', rating: 4.9, views: 3500, isNew: true, isTrending: true,
      relatedConsoleId: 'strategic-brands', dataSource: 'Commercial Analytics / IQVIA', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'US President', 'CEO', 'IR'], tags: ['izervay', 'geographic-atrophy', 'launch', 'ophthalmology'], nextUpdate: 'Every Tuesday 7:00 AM',
    },
    {
      id: 'sb-3', name: 'VYLOY Gastric Cancer Launch Monitor', category: 'Strategic Brands Performance', frequency: 'Weekly',
      description: 'VYLOY (zolbetuximab) launch in gastric/gastroesophageal junction (GEJ) cancer: physician adoption, hospital formulary wins, first-line treatment uptake. ¥63.1B FY2025 baseline. Global launch execution across US, EU, Japan, and international markets.',
      format: 'PowerBI', department: 'Finance', owner: 'Global Commercial Finance', rating: 4.8, views: 2900, isNew: true, isTrending: true,
      relatedConsoleId: 'strategic-brands', dataSource: 'Global Commercial Analytics / Revenue System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Regional Presidents', 'IR'], tags: ['vyloy', 'gastric-cancer', 'launch', 'global'], nextUpdate: 'Every Wednesday 7:00 AM',
    },
    {
      id: 'sb-4', name: 'VEOZAH Vasomotor Symptoms Market Report', category: 'Strategic Brands Performance', frequency: 'Monthly',
      description: 'VEOZAH (fezolinetant) US performance in vasomotor symptoms (VMS): prescriber base expansion, payer formulary coverage, patient persistence rates. ¥46.6B FY2025 revenue. Women\'s health market competitive dynamics vs hormone therapy.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial Finance', rating: 4.7, views: 1900, isNew: false, isTrending: false,
      relatedConsoleId: 'strategic-brands', dataSource: 'Commercial Analytics / IQVIA Rx Data', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'US President', 'Commercial VP'], tags: ['veozah', 'vms', 'womens-health', 'revenue'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'sb-5', name: 'XOSPATA AML Market Performance Dashboard', category: 'Strategic Brands Performance', frequency: 'Monthly',
      description: 'XOSPATA (gilteritinib) global AML market: ¥71.8B FY2025 revenue. FLT3+ patient identification and testing rates. Combination therapy clinical development readouts. Competitive positioning vs Daiichi-Sankyo quizartinib.',
      format: 'PowerBI', department: 'Finance', owner: 'Global Commercial Finance', rating: 4.7, views: 1700, isNew: false, isTrending: false,
      relatedConsoleId: 'strategic-brands', dataSource: 'Global Commercial Analytics / ERP', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'Commercial VP', 'R&D Leadership'], tags: ['xospata', 'aml', 'flt3', 'revenue'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'sb-6', name: 'Strategic Brands Combined Revenue Bridge', category: 'Strategic Brands Performance', frequency: 'Monthly',
      description: 'Strategic Brands (PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA) combined revenue waterfall. +43% FY2025 growth trajectory. Individual brand contribution. FX-adjusted growth rates. Guidance tracking vs portfolio growth ambitions.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial FP&A', rating: 4.8, views: 2500, isNew: false, isTrending: true,
      relatedConsoleId: 'strategic-brands', dataSource: 'Global Revenue Consolidation System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'IR', 'Regional Presidents'], tags: ['strategic-brands', 'revenue', 'bridge', 'growth'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'sb-7', name: 'Strategic Brands Pipeline Expansion Outlook', category: 'Strategic Brands Performance', frequency: 'Quarterly',
      description: 'Next wave of Strategic Brands: pipeline compounds approaching POC or regulatory filing. Label expansion opportunities for existing brands. Peak sales model updates. Portfolio NPV analysis. "Focused Innovator" strategy milestones and tracking.',
      format: 'PowerBI', department: 'Strategy', owner: 'R&D Finance / Strategy', rating: 4.7, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'strategic-brands', dataSource: 'R&D Pipeline System / Commercial Planning', accessLevel: 'Finance + Strategy',
      audience: ['CFO', 'CEO', 'CSO', 'Board'], tags: ['pipeline', 'strategic-brands', 'npv', 'expansion'], nextUpdate: 'Quarterly Day 15',
    },

    // ──────────────────────────────────────────
    // Japan Business — 5 reports
    // ──────────────────────────────────────────
    {
      id: 'jp-1', name: 'Japan Product Portfolio Revenue Dashboard', category: 'Japan Business', frequency: 'Monthly',
      description: 'Astellas Japan domestic revenue by product: XTANDI, BETANIS/Myrbetriq, PROGRAF, CRESTOR, and newer launches. NHI reimbursement price trends. Biennial pricing revision impact tracking. Japan contributes ~13-14% of total group revenue.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Finance', rating: 4.7, views: 2100, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-business', dataSource: 'Japan Revenue System / JMIRI', accessLevel: 'Finance + Japan',
      audience: ['CFO', 'Japan President', 'IR'], tags: ['japan', 'revenue', 'nhi', 'domestic'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'jp-2', name: 'PMDA Regulatory Submission Tracker', category: 'Japan Business', frequency: 'Monthly',
      description: 'Pharmaceuticals and Medical Devices Agency (PMDA) submission pipeline: new molecular entity filings, label expansion applications, priority review designations. Approval timeline tracking. Japan-first and simultaneous global development programs.',
      format: 'PowerBI', department: 'Regulatory Affairs', owner: 'Japan Regulatory Finance', rating: 4.6, views: 1400, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-business', dataSource: 'Regulatory Affairs System / PMDA Data', accessLevel: 'Finance + Regulatory',
      audience: ['CFO', 'Japan President', 'CSO', 'Regulatory VP'], tags: ['pmda', 'regulatory', 'japan', 'submission'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'jp-3', name: 'Japan NHI Pricing & Reimbursement Monitor', category: 'Japan Business', frequency: 'Monthly',
      description: 'Japan National Health Insurance (NHI) pricing surveillance: annual drug price revisions, biennial drug price revisions, re-examination outcomes. New product pricing negotiations. Economic impact modeling for upcoming revision cycles.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Market Access Finance', rating: 4.6, views: 1500, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-business', dataSource: 'Japan Pricing System / MHLW Data', accessLevel: 'Finance + Market Access',
      audience: ['CFO', 'Japan President', 'Market Access VP'], tags: ['japan', 'nhi', 'pricing', 'reimbursement'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'jp-4', name: 'Japan Commercial Execution KPI Dashboard', category: 'Japan Business', frequency: 'Monthly',
      description: 'Japan MR (medical representative) productivity, call volume, prescriber coverage, and hospital access metrics. Key account management effectiveness. In-hospital formulary positioning for oncology and urology portfolio.',
      format: 'PowerBI', department: 'Commercial', owner: 'Japan Commercial Finance', rating: 4.5, views: 1200, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-business', dataSource: 'Japan CRM / Commercial Operations', accessLevel: 'All Finance',
      audience: ['Japan President', 'Commercial VP', 'CFO'], tags: ['japan', 'commercial', 'kpi', 'mr-productivity'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'jp-5', name: 'Japan Segment AOI vs Plan Bridge', category: 'Japan Business', frequency: 'Monthly',
      description: 'Japan segment adjusted operating income waterfall vs FY2026 plan. Revenue contribution by product line, COGS, local SG&A, R&D allocation. NHI price revision headwinds isolated from volume growth. FX (USD/JPY) impact on export-related royalties.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan FP&A', rating: 4.7, views: 1800, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-business', dataSource: 'Japan Segment P&L / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Japan President', 'IR'], tags: ['japan', 'aoi', 'bridge', 'guidance'], nextUpdate: 'Monthly Day 9',
    },

    // ──────────────────────────────────────────
    // International Markets & China — 5 reports
    // ──────────────────────────────────────────
    {
      id: 'intl-1', name: 'Established Markets Revenue Dashboard', category: 'International Markets & China', frequency: 'Monthly',
      description: 'Established Markets (EU, Canada, Australia, other developed markets) revenue: ~¥391B FY2025. XTANDI, XOSPATA, PADCEV product mix. Pricing environment: EU parallel imports, reference pricing, HTA decisions. +3–5% underlying growth target.',
      format: 'PowerBI', department: 'Finance', owner: 'Established Markets Finance', rating: 4.6, views: 1900, isNew: false, isTrending: false,
      relatedConsoleId: 'international-china', dataSource: 'EM Revenue System / ERP', accessLevel: 'Finance + Regional',
      audience: ['CFO', 'Established Markets President', 'IR'], tags: ['established-markets', 'eu', 'revenue', 'pricing'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'intl-2', name: 'China VBP Pricing Impact Analysis', category: 'International Markets & China', frequency: 'Monthly',
      description: 'China Volume-Based Procurement (VBP) impact on Astellas product portfolio. XTANDI and other oncology products subject to VBP rounds. Volume uplift modeling vs price reduction impact. Net revenue trajectory. ~¥93B FY2025 China revenue.',
      format: 'PowerBI', department: 'Finance', owner: 'China Finance', rating: 4.7, views: 2100, isNew: false, isTrending: true,
      relatedConsoleId: 'international-china', dataSource: 'China Revenue System / NHSA VBP Data', accessLevel: 'Finance + China',
      audience: ['CFO', 'China President', 'IR'], tags: ['china', 'vbp', 'pricing', 'oncology'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'intl-3', name: 'VYLOY China Gastric Cancer Launch Tracker', category: 'International Markets & China', frequency: 'Monthly',
      description: 'VYLOY launch in China gastric cancer: key indication given China\'s high gastric cancer incidence. Hospital formulary inclusion progress. National Drug Assessment (NDA) and reimbursement listing timeline. HER2-negative CLDN18.2+ patient identification.',
      format: 'PowerBI', department: 'Finance', owner: 'China Commercial Finance', rating: 4.8, views: 2400, isNew: true, isTrending: true,
      relatedConsoleId: 'international-china', dataSource: 'China Commercial Analytics / Revenue System', accessLevel: 'Finance + China',
      audience: ['CFO', 'China President', 'CEO', 'IR'], tags: ['vyloy', 'china', 'gastric-cancer', 'launch'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'intl-4', name: 'Emerging Markets Growth Report', category: 'International Markets & China', frequency: 'Quarterly',
      description: 'International Markets segment (Southeast Asia, Middle East, Latin America, Africa) revenue and growth. Product access programs. Local partnership and distribution models. Long-term market development investment vs near-term revenue contribution.',
      format: 'PowerBI', department: 'Finance', owner: 'International Markets Finance', rating: 4.4, views: 1100, isNew: false, isTrending: false,
      relatedConsoleId: 'international-china', dataSource: 'International Revenue System / ERP', accessLevel: 'Finance + Strategy',
      audience: ['CFO', 'International Markets President', 'Strategy VP'], tags: ['emerging-markets', 'growth', 'access', 'global'], nextUpdate: 'Quarterly Day 12',
    },
    {
      id: 'intl-5', name: 'International Market Access Dashboard', category: 'International Markets & China', frequency: 'Monthly',
      description: 'HTA (Health Technology Assessment) decisions tracker: EMA, NICE, G-BA, HAS, and other agency outcomes for Astellas products. Reimbursement listing timelines. Pricing negotiation status. Market access success rates vs industry benchmark.',
      format: 'PowerBI', department: 'Market Access', owner: 'Global Market Access Finance', rating: 4.6, views: 1400, isNew: false, isTrending: false,
      relatedConsoleId: 'international-china', dataSource: 'Market Access System / HTA Database', accessLevel: 'Finance + Market Access',
      audience: ['CFO', 'Regional Presidents', 'Market Access VP'], tags: ['hta', 'reimbursement', 'market-access', 'pricing'], nextUpdate: 'Monthly Day 11',
    },

    // ──────────────────────────────────────────
    // Enterprise Finance & Core EPS — 7 reports
    // ──────────────────────────────────────────
    {
      id: 'ent-1', name: 'Enterprise Core EPS vs FY2026 Guidance Dashboard', category: 'Enterprise Finance & Core EPS', frequency: 'Weekly',
      description: 'Annualized run-rate Core EPS vs FY2026 guidance (~¥265 implied by Core OP ¥620B). FY2025 Core EPS: ¥237.01. XTANDI IRA impact, SMT savings delivery, and USD/JPY FX rate as primary levers. Guidance raise/maintain/lower scenario tracking.',
      format: 'PowerBI', department: 'Finance', owner: 'Corporate FP&A / IR', rating: 4.9, views: 4200, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-finance', dataSource: 'Consolidated P&L System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'IR', 'Board'], tags: ['core-eps', 'guidance', 'run-rate', 'xtandi'], nextUpdate: 'Every Monday 6:00 AM',
    },
    {
      id: 'ent-2', name: 'Five-Region Consolidated P&L', category: 'Enterprise Finance & Core EPS', frequency: 'Monthly',
      description: 'US + Established Markets + Japan + International Markets + China + Corporate consolidated P&L. Revenue ¥2,137B FY2025 (+estimated from Core OP margin). Core OP ¥555.7B (26.0% margin). Inter-regional transfer pricing elimination reconciliation.',
      format: 'PowerBI', department: 'Finance', owner: 'Corporate Accounting / FP&A', rating: 4.8, views: 3100, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-finance', dataSource: 'Enterprise Consolidation System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Regional Presidents', 'IR'], tags: ['consolidated', 'pl', 'regions', 'core-op'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'ent-3', name: 'J-GAAP to Core Basis Reconciliation', category: 'Enterprise Finance & Core EPS', frequency: 'Monthly',
      description: 'J-GAAP reported to Core basis reconciliation: amortization of acquired intangibles, impairment losses, restructuring charges, non-cash equity compensation, one-time items. Core vs reported EPS delta. Investor-facing Core metrics definition and consistency.',
      format: 'PowerBI', department: 'Finance', owner: 'External Reporting / Tax', rating: 4.6, views: 1500, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-finance', dataSource: 'Consolidation System / GAAP Reporting', accessLevel: 'Finance + Legal',
      audience: ['CFO', 'Controller', 'Tax VP', 'IR'], tags: ['j-gaap', 'core-basis', 'reconciliation', 'amortization'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'ent-4', name: 'Earnings Call Preparation Package', category: 'Enterprise Finance & Core EPS', frequency: 'Quarterly',
      description: 'CFO Atsushi Kitamura and CEO Naoki Okamura earnings call talking points, slide deck, and Q&A preparation. Segment performance vs guidance, guidance reaffirmation or raise analysis, analyst consensus vs actuals, key messaging framework for XTANDI IRA and Strategic Brands.',
      format: 'PowerBI', department: 'Finance', owner: 'IR / FP&A', rating: 4.8, views: 2800, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-finance', dataSource: 'Consolidated P&L / Guidance Model', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'IR', 'Board'], tags: ['earnings', 'ir', 'guidance', 'analyst'], nextUpdate: 'Quarterly Day 11',
    },
    {
      id: 'ent-5', name: 'FY2026 Guidance Sensitivity Analysis', category: 'Enterprise Finance & Core EPS', frequency: 'Monthly',
      description: 'Monte Carlo and point-estimate sensitivity of FY2026 Core OP (¥620B) and Core EPS to key levers: XTANDI IRA price reduction, USD/JPY rate, SMT savings, Strategic Brands growth, R&D POC success. Confidence interval modeling for investor disclosure.',
      format: 'PowerBI', department: 'Finance', owner: 'Corporate FP&A', rating: 4.8, views: 2600, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-finance', dataSource: 'Planning Model / Scenario Engine', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'FP&A Leadership'], tags: ['sensitivity', 'guidance', 'scenario', 'core-eps'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'ent-6', name: 'SMT Savings Delivery Dashboard', category: 'Enterprise Finance & Core EPS', frequency: 'Monthly',
      description: 'Sustainable Margin Transformation (SMT) ¥40B FY2026 savings target tracking. Savings by workstream: R&D portfolio rationalization, SG&A efficiency, manufacturing footprint, procurement. Bridge from FY2025 26.0% Core OP margin to FY2026 ~27.9% target.',
      format: 'PowerBI', department: 'Finance', owner: 'SMT Program Office / Corporate FP&A', rating: 4.8, views: 2400, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-finance', dataSource: 'SMT Program Tracking System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'FP&A Leadership'], tags: ['smt', 'savings', 'margin', 'efficiency'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'ent-7', name: 'FY2026 vs FY2025 Annual Operating Plan Tracker', category: 'Enterprise Finance & Core EPS', frequency: 'Monthly',
      description: 'Full-year AOP vs actuals tracking across all five regions. Revenue, Core OP, and Core EPS bridges. Region-level beat/miss decomposition. FX-adjusted vs reported growth analysis. XTANDI IRA vs Strategic Brands growth offset tracking.',
      format: 'PowerBI', department: 'Finance', owner: 'Corporate FP&A', rating: 4.7, views: 2200, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-finance', dataSource: 'AOP Planning System / Actuals', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Regional Presidents', 'FP&A Leadership'], tags: ['aop', 'plan', 'actuals', 'bridge'], nextUpdate: 'Monthly Day 11',
    },

    // ──────────────────────────────────────────
    // R&D Pipeline & Approvals — 6 reports
    // ──────────────────────────────────────────
    {
      id: 'rd-1', name: 'Pipeline POC Readout Calendar', category: 'R&D Pipeline & Approvals', frequency: 'Weekly',
      description: 'Astellas pipeline proof-of-concept (POC) readout calendar: Phase 2 results, interim analyses, and data cut timelines. Probability-weighted NPV by program. "Focused Innovator" strategy: 3–4 POC readouts per year target. GO/NO-GO decision tracker.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'R&D Finance / Pipeline Analytics', rating: 4.9, views: 3600, isNew: false, isTrending: true,
      relatedConsoleId: 'rd-pipeline', dataSource: 'R&D Pipeline System / Clinical Operations', accessLevel: 'Finance + R&D + Executive',
      audience: ['CFO', 'CSO', 'CEO', 'IR', 'Board'], tags: ['pipeline', 'poc', 'r&d', 'readout'], nextUpdate: 'Every Monday 8:00 AM',
    },
    {
      id: 'rd-2', name: 'FDA and PMDA Regulatory Filing Tracker', category: 'R&D Pipeline & Approvals', frequency: 'Monthly',
      description: 'Active NDA/BLA/sNDA filings with FDA; NDA filings with PMDA; MAA filings with EMA. PDUFA dates, response due dates, advisory committee schedule. Approval probability modeling and commercial launch readiness timeline.',
      format: 'PowerBI', department: 'Regulatory Affairs', owner: 'Regulatory Affairs / Finance', rating: 4.8, views: 2800, isNew: false, isTrending: true,
      relatedConsoleId: 'rd-pipeline', dataSource: 'Regulatory Affairs System / FDA/PMDA Tracker', accessLevel: 'Finance + Regulatory + Executive',
      audience: ['CFO', 'CSO', 'CEO', 'Regulatory VP', 'IR'], tags: ['fda', 'pmda', 'regulatory', 'approval'], nextUpdate: 'Monthly Day 5',
    },
    {
      id: 'rd-3', name: 'R&D Investment vs Revenue Ratio Dashboard', category: 'R&D Pipeline & Approvals', frequency: 'Monthly',
      description: 'R&D expense as % of revenue trend: ~22% FY2025 (above industry average ~18%). R&D spend by therapeutic area: oncology, urology, ophthalmology. Phase-level investment allocation. SMT impact on R&D portfolio rationalization and cost per program.',
      format: 'PowerBI', department: 'Finance', owner: 'R&D Finance', rating: 4.7, views: 2100, isNew: false, isTrending: false,
      relatedConsoleId: 'rd-pipeline', dataSource: 'R&D Finance System / Planning Model', accessLevel: 'Finance + R&D',
      audience: ['CFO', 'CSO', 'CEO', 'FP&A Leadership'], tags: ['r&d', 'investment', 'ratio', 'spend'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'rd-4', name: 'Clinical Trial Portfolio Status Report', category: 'R&D Pipeline & Approvals', frequency: 'Monthly',
      description: 'Active Phase 1/2/3 clinical trial portfolio: enrollment status, primary endpoint readout timelines, safety signals, protocol amendments. CRO spend vs budget. Geographic enrollment balance for global registration trials.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'R&D Finance / Clinical Operations', rating: 4.6, views: 1800, isNew: false, isTrending: false,
      relatedConsoleId: 'rd-pipeline', dataSource: 'Clinical Trial Management System / ERP', accessLevel: 'Finance + Clinical',
      audience: ['CFO', 'CSO', 'Clinical Development VP'], tags: ['clinical-trials', 'pipeline', 'enrollment', 'phase'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'rd-5', name: 'Pipeline NPV Sensitivity Analysis', category: 'R&D Pipeline & Approvals', frequency: 'Quarterly',
      description: 'Probability-weighted NPV of Astellas R&D pipeline. Sensitivity to: peak sales assumptions, probability of technical success, regulatory timelines, competitive entry. Portfolio value accretion from successful POC readouts. Comparison to BD&L opportunity cost.',
      format: 'PowerBI', department: 'Strategy', owner: 'Business Development / R&D Finance', rating: 4.7, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'rd-pipeline', dataSource: 'Pipeline Valuation Model / R&D System', accessLevel: 'Finance + Strategy + Executive',
      audience: ['CFO', 'CEO', 'CSO', 'Board', 'BD&L VP'], tags: ['npv', 'pipeline', 'valuation', 'sensitivity'], nextUpdate: 'Quarterly Day 15',
    },
    {
      id: 'rd-6', name: 'R&D Portfolio Optimization & SMT Impact', category: 'R&D Pipeline & Approvals', frequency: 'Quarterly',
      description: 'R&D portfolio prioritization decisions under SMT: programs accelerated, paused, or terminated. NPV impact of portfolio rationalization. Resource reallocation to high-priority oncology and ophthalmology programs. External partnership vs internal investment trade-offs.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'R&D Finance / SMT Program Office', rating: 4.6, views: 1300, isNew: false, isTrending: false,
      relatedConsoleId: 'rd-pipeline', dataSource: 'R&D Portfolio System / SMT Tracker', accessLevel: 'Finance + R&D + Strategy',
      audience: ['CFO', 'CSO', 'CEO', 'SMT Steering Committee'], tags: ['r&d', 'portfolio', 'smt', 'rationalization'], nextUpdate: 'Quarterly Day 10',
    },

    // ──────────────────────────────────────────
    // Capital Structure & Treasury — 4 reports
    // ──────────────────────────────────────────
    {
      id: 'tsy-1', name: 'FX Sensitivity & Hedging Dashboard', category: 'Capital Structure & Treasury', frequency: 'Weekly',
      description: 'USD/JPY and EUR/JPY spot rate vs ¥151 planning assumption. FX hedging coverage ratio (~55% of USD exposure). Mark-to-market of hedging instruments. Revenue and Core OP sensitivity: each ¥10 JPY depreciation ≈ +¥70–80B revenue, +¥28–32B Core OP.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / FP&A', rating: 4.9, views: 3200, isNew: false, isTrending: true,
      relatedConsoleId: 'capital-structure', dataSource: 'Treasury Management System / Bloomberg', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Treasurer', 'IR', 'Board'], tags: ['fx', 'hedging', 'usd-jpy', 'sensitivity'], nextUpdate: 'Every Friday 7:00 AM',
    },
    {
      id: 'tsy-2', name: 'Cash Flow & Dividend Coverage Analysis', category: 'Capital Structure & Treasury', frequency: 'Monthly',
      description: 'Free cash flow generation vs dividend commitment (~¥28B/quarter). Cash conversion from Core OP: working capital, capex, tax payments. Net cash position (~¥52B favorable). Capital allocation framework: R&D investment, BD&L, shareholder returns.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / Corporate FP&A', rating: 4.7, views: 2100, isNew: false, isTrending: false,
      relatedConsoleId: 'capital-structure', dataSource: 'Treasury Cash Management / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Treasurer', 'IR'], tags: ['cash-flow', 'dividend', 'free-cash-flow', 'capital'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'tsy-3', name: 'Balance Sheet & Credit Rating Tracker', category: 'Capital Structure & Treasury', frequency: 'Monthly',
      description: 'Balance sheet health metrics: cash ¥385B, net cash position ¥52B, debt maturity schedule. Credit ratings from Moody\'s and S&P. Leverage metrics: net debt/EBITDA (favorable — net cash). Capital structure optimization for BD&L and M&A capacity.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / Corporate Finance', rating: 4.6, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'capital-structure', dataSource: 'Treasury / Debt Register / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Treasurer', 'Controller', 'Board'], tags: ['balance-sheet', 'credit-rating', 'leverage', 'cash'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'tsy-4', name: 'Capital Allocation & Shareholder Return Analysis', category: 'Capital Structure & Treasury', frequency: 'Quarterly',
      description: 'Capital allocation priorities: R&D investment (~22% of revenue), BD&L transaction capacity, capex, and shareholder returns (¥28B/quarter dividend). Share buyback analysis vs acquisition pipeline. Total shareholder return vs pharma sector benchmark.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / IR', rating: 4.7, views: 1900, isNew: false, isTrending: false,
      relatedConsoleId: 'capital-structure', dataSource: 'Treasury / Dividend System / BD&L Pipeline', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Board', 'IR'], tags: ['capital-allocation', 'dividend', 'buyback', 'bdl'], nextUpdate: 'Quarterly Day 12',
    },
  ],
};
