// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/reports.ts
//
// Report metadata (frequency, department, audience, rating, views) is
// illustrative for demonstration. Department names map to Astellas Pharma's
// segment structure (U.S., Japan, Established Markets, International Markets, China).
// ─────────────────────────────────────────────────────────────────────
import { ReportsConfig } from '../../types';

export const reports: ReportsConfig = {
  totalReports: 42,
  categories: [
    'Oncology Portfolio',
    'Japan Segment',
    'United States Segment',
    'Enterprise Finance & EPS',
    'Pipeline & R&D',
    'SMT & Cost Transformation',
    'Treasury & Capital Allocation',
  ],
  reports: [
    // ──────────────────────────────────────────
    // Oncology Portfolio — 8 reports
    // ──────────────────────────────────────────
    {
      id: 'onc-1', name: 'XTANDI Global Revenue & IRA Impact Dashboard', category: 'Oncology Portfolio', frequency: 'Weekly',
      description: 'XTANDI weekly net revenue tracker across U.S., EU, Japan, and emerging markets. IRA Medicare price negotiation: CMS price effective Sept 2026 — ¥9.6B Core OP impact per 1pp cut. Volume by indication (mCRPC, nmCRPC, mCSPC) and payer channel (Medicare Part D vs commercial vs VA). Q1 FY2026: ¥146.5B.',
      format: 'PowerBI', department: 'Finance', owner: 'U.S. Commercial Finance / Global Oncology Finance', rating: 4.9, views: 3800, isNew: false, isTrending: true,
      relatedConsoleId: 'oncology', dataSource: 'IQVIA/Symphony + Internal Sales Data', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Global Oncology President', 'IR'], tags: ['xtandi', 'ira', 'prostate-cancer', 'guidance'], nextUpdate: 'Every Monday 6:00 AM',
    },
    {
      id: 'onc-2', name: 'PADCEV Bladder Cancer Market Share & Revenue Tracker', category: 'Oncology Portfolio', frequency: 'Weekly',
      description: 'PADCEV (enfortumab vedotin) global revenue and U.S. market share in urothelial carcinoma — 1L, 2L+. KEYNOTE-869 (PADCEV+pembro) vs competing regimens market uptake. Q1 FY2026: ¥65.2B (+22.1% YoY). Primary growth engine — tracking toward ¥268B FY2026 guidance.',
      format: 'PowerBI', department: 'Finance', owner: 'U.S. Commercial Finance / Alliance Finance', rating: 4.9, views: 3600, isNew: false, isTrending: true,
      relatedConsoleId: 'oncology', dataSource: 'Flatiron Health / IQVIA + Internal Data', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Global Oncology President', 'IR'], tags: ['padcev', 'bladder-cancer', 'market-share', 'ev-pembro'], nextUpdate: 'Every Tuesday 6:00 AM',
    },
    {
      id: 'onc-3', name: 'XTANDI vs Competitors — Prostate Cancer Market Intelligence', category: 'Oncology Portfolio', frequency: 'Monthly',
      description: 'XTANDI vs Erleada (J&J), Nubeqa (Bayer/J&J), and Zytiga (abiraterone) across mCRPC, nmCRPC, and mCSPC indications. New prescription share, total prescription share, and days on therapy by indication. Market share defense strategy vs darolutamide mCSPC expansion.',
      format: 'PowerBI', department: 'Strategy', owner: 'U.S. Market Intelligence', rating: 4.8, views: 2900, isNew: false, isTrending: true,
      relatedConsoleId: 'oncology', dataSource: 'IQVIA National Sales Perspective / Symphony', accessLevel: 'Finance + Commercial + Executive',
      audience: ['CFO', 'CEO', 'Global Oncology President', 'Commercial VP'], tags: ['xtandi', 'competition', 'prostate-cancer', 'market-share'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'onc-4', name: 'VEOZAH U.S. Launch Performance Dashboard', category: 'Oncology Portfolio', frequency: 'Weekly',
      description: 'VEOZAH (fezolinetant) weekly net revenue, new prescriptions, payer coverage rates, and prescriber base expansion. Non-hormonal VMS treatment market share vs HRT alternatives. Q1 FY2026: ¥26.8B (+38.1% YoY). FY2026 guidance ¥110B — tracking ahead of plan.',
      format: 'PowerBI', department: 'Finance', owner: "Women's Health Commercial Finance", rating: 4.8, views: 2700, isNew: false, isTrending: true,
      relatedConsoleId: 'womens-health', dataSource: 'IQVIA / Specialty Pharmacy Data', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'CEO', "Women's Health President", 'IR'], tags: ['veozah', 'vms', 'menopause', 'launch-tracking'], nextUpdate: 'Every Wednesday 7:00 AM',
    },
    {
      id: 'onc-5', name: 'VYLOY Gastric Cancer Launch Tracker', category: 'Oncology Portfolio', frequency: 'Monthly',
      description: 'VYLOY (zolbetuximab) gastric/GEJ cancer launch KPIs post-FDA approval. New patient starts, payer coverage, key oncology center uptake. SPOTLIGHT/GLOW trial data supporting 1L regimen adoption. Launch trajectory vs VEOZAH and PADCEV launch curves as benchmarks.',
      format: 'PowerBI', department: 'Finance', owner: 'Oncology Launch Finance', rating: 4.6, views: 1800, isNew: true, isTrending: true,
      relatedConsoleId: 'oncology', dataSource: 'Oncology EMR Data / Specialty Pharmacy', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'Global Oncology President', 'Commercial VP'], tags: ['vyloy', 'gastric-cancer', 'launch', 'zolbetuximab'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'onc-6', name: 'IZERVAY Ophthalmology Revenue Monitor', category: 'Oncology Portfolio', frequency: 'Monthly',
      description: 'IZERVAY (avacincaptad pegol) geographic atrophy quarterly revenue and Rx trends. Complement pathway market position vs Apellis Syfovre (pegcetacoplan). Patient adherence and re-injection rates as leading revenue indicators. FY2026 growth trajectory.',
      format: 'PowerBI', department: 'Finance', owner: 'Ophthalmology Commercial Finance', rating: 4.5, views: 1400, isNew: false, isTrending: false,
      relatedConsoleId: 'ophthalmology', dataSource: 'IQVIA / Retinal Specialist Data', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'Ophthalmology President', 'Commercial VP'], tags: ['izervay', 'geographic-atrophy', 'ophthalmology', 'complement'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'onc-7', name: 'IRA Negotiation Scenario Modeling — XTANDI Price Impact', category: 'Oncology Portfolio', frequency: 'Monthly',
      description: 'Monte Carlo and point-estimate modeling of XTANDI IRA CMS negotiated price scenarios. ¥9.6B Core OP per 1pp cut. Volume offset analysis by payer channel. FY2026/FY2027 revenue bridge under 5%, 10%, 15%, and 20% price cut scenarios. Pfizer profit-share allocation.',
      format: 'PowerBI', department: 'Finance', owner: 'Enterprise FP&A / U.S. Commercial Finance', rating: 4.9, views: 3400, isNew: true, isTrending: true,
      relatedConsoleId: 'oncology', dataSource: 'CMS Data / Internal Planning Model', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Board', 'IR'], tags: ['ira', 'xtandi', 'medicare', 'scenario-modeling'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'onc-8', name: 'Oncology Portfolio Core OP Contribution Bridge', category: 'Oncology Portfolio', frequency: 'Monthly',
      description: 'Segment-level Core OP bridge across oncology products: XTANDI, PADCEV, VEOZAH, VYLOY, IZERVAY. Gross margin by product, collaboration royalty splits, SG&A allocation, and R&D allocated costs. Core OP margin by product and trend.',
      format: 'PowerBI', department: 'Finance', owner: 'Oncology Finance / FP&A', rating: 4.7, views: 2200, isNew: false, isTrending: false,
      relatedConsoleId: 'oncology', dataSource: 'Product P&L System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Oncology Presidents', 'IR'], tags: ['core-op', 'bridge', 'margin', 'oncology'], nextUpdate: 'Monthly Day 9',
    },

    // ──────────────────────────────────────────
    // Japan Segment — 7 reports
    // ──────────────────────────────────────────
    {
      id: 'jp-1', name: 'Japan NHI Price Revision Impact Tracker', category: 'Japan Segment', frequency: 'Monthly',
      description: 'April 2026 NHI biennial price revision: avg −3.5% across Astellas Japan portfolio. Monthly revenue bridge: price effect vs volume response. XTANDI Japan new indication volume offsetting price cut. ¥8–12B annual revenue headwind tracker vs mitigation plan.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Finance / Revenue Analytics', rating: 4.8, views: 2500, isNew: false, isTrending: true,
      relatedConsoleId: 'japan-segment', dataSource: 'Japan Revenue System / MHLW NHI Database', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Japan President', 'CEO', 'IR'], tags: ['nhi', 'japan', 'price-revision', 'volume-mitigation'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'jp-2', name: 'XTANDI Japan Market Performance Dashboard', category: 'Japan Segment', frequency: 'Monthly',
      description: 'XTANDI Japan Rx volume by indication (mCRPC, nmCRPC, mCSPC post-new label). Market share vs domestic competitors. NHI price-adjusted net revenue trend. New patient starts as leading revenue indicator. Japan prostate cancer market dynamics.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Commercial Finance', rating: 4.7, views: 2100, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-segment', dataSource: 'DDD (Drug Distribution Data) / Hospital Claims', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'Japan President', 'Commercial VP Japan'], tags: ['xtandi', 'japan', 'market-share', 'prostate-cancer'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'jp-3', name: 'VEOZAH Japan Regulatory & Pre-Launch Dashboard', category: 'Japan Segment', frequency: 'Monthly',
      description: 'VEOZAH Japan NDA (PMDA review): filing status, review milestones, approval timeline projection. Pre-launch market preparation: payer landscape, OB/GYN prescriber mapping, HTA assessment. Addressable VMS patient population in Japan ~2M women.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Launch Finance / Regulatory Affairs', rating: 4.7, views: 1900, isNew: true, isTrending: true,
      relatedConsoleId: 'japan-segment', dataSource: 'PMDA Review Tracker / Market Research', accessLevel: 'Finance + Medical Affairs',
      audience: ['CFO', 'Japan President', "Women's Health VP"], tags: ['veozah', 'japan', 'pmda', 'launch-prep'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'jp-4', name: 'Japan Transplantation Franchise Revenue Monitor', category: 'Japan Segment', frequency: 'Monthly',
      description: 'Prograf (tacrolimus), Astagraf XL, and related transplantation products in Japan. Generic competition status: Prograf generic volume erosion trend. Hospital formulary retention strategy. Stable ¥85B annual revenue base — critical cash flow contributor.',
      format: 'PowerBI', department: 'Finance', owner: 'Japan Finance', rating: 4.4, views: 1100, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-segment', dataSource: 'DDD / Hospital Procurement System', accessLevel: 'Finance',
      audience: ['CFO', 'Japan President', 'Transplantation VP'], tags: ['transplantation', 'prograf', 'generic', 'japan'], nextUpdate: 'Monthly Day 11',
    },
    {
      id: 'jp-5', name: 'Japan Manufacturing Efficiency & SMT Tracker', category: 'Japan Segment', frequency: 'Monthly',
      description: 'Astellas Japan manufacturing operations (6 sites including Toyama, Yamagata). SMT manufacturing workstream savings: batch optimization, API yield, CMO renegotiation. FY2026 Japan manufacturing SMT target ¥8B vs actual. Capex by site.',
      format: 'PowerBI', department: 'Operations / Finance', owner: 'Japan Manufacturing Finance', rating: 4.5, views: 1300, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-segment', dataSource: 'Manufacturing ERP / SAP', accessLevel: 'Finance + Operations',
      audience: ['CFO', 'Japan President', 'Manufacturing VP'], tags: ['manufacturing', 'smt', 'efficiency', 'japan'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'jp-6', name: 'Japan Segment Core OP Bridge vs Plan', category: 'Japan Segment', frequency: 'Monthly',
      description: 'Japan Core Operating Income waterfall vs ¥355B FY2026 revenue guidance. Bridge: NHI price impact, XTANDI volume growth, new product launches (VEOZAH), transplantation generic headwind, SG&A, SMT savings. Q1 FY2026: ¥86.5B (−2.1% YoY from NHI revision).',
      format: 'PowerBI', department: 'Finance', owner: 'Japan FP&A', rating: 4.7, views: 2000, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-segment', dataSource: 'Japan Segment P&L', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Japan President', 'IR'], tags: ['core-op', 'bridge', 'japan', 'nhi'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'jp-7', name: 'Next NHI Revision Planning — FY2028 Scenario Analysis', category: 'Japan Segment', frequency: 'Quarterly',
      description: 'Forward planning for April 2028 NHI biennial price revision. MHLW drug price reform trend analysis. Products at risk: XTANDI next pricing round, new products entering second revision cycle. Scenario analysis: 3%, 5%, 7% cut scenarios and volume/pipeline offsets.',
      format: 'PowerBI', department: 'Strategy', owner: 'Japan Market Access / FP&A', rating: 4.6, views: 1400, isNew: false, isTrending: false,
      relatedConsoleId: 'japan-segment', dataSource: 'MHLW Price Database / Planning Model', accessLevel: 'Finance + Strategy + Executive',
      audience: ['CFO', 'Japan President', 'CEO', 'Board'], tags: ['nhi', 'japan', 'pricing', 'future-planning'], nextUpdate: 'Quarterly Day 20',
    },

    // ──────────────────────────────────────────
    // United States Segment — 7 reports
    // ──────────────────────────────────────────
    {
      id: 'us-1', name: 'U.S. Commercial Weekly Revenue Dashboard', category: 'United States Segment', frequency: 'Weekly',
      description: 'Weekly U.S. net revenue by product: XTANDI, PADCEV, VEOZAH, IZERVAY, VYLOY. Gross-to-net deductions tracker (chargebacks, rebates, returns). IRA price adjustment YTD. Q1 FY2026 U.S. total: ¥196.0B (+3.8% YoY).',
      format: 'PowerBI', department: 'Finance', owner: 'U.S. Commercial Finance', rating: 4.8, views: 3200, isNew: false, isTrending: true,
      relatedConsoleId: 'us-segment', dataSource: 'Specialty Distributor / Wholesaler Data Feeds', accessLevel: 'All Finance',
      audience: ['CFO', 'U.S. President', 'IR', 'CEO'], tags: ['us-revenue', 'net-revenue', 'weekly', 'gtn'], nextUpdate: 'Every Monday 7:00 AM',
    },
    {
      id: 'us-2', name: 'XTANDI IRA Medicare Part D Analysis', category: 'United States Segment', frequency: 'Weekly',
      description: 'XTANDI Medicare Part D utilization vs commercial vs VA channel split. IRA negotiated price effective Sept 2026 — impact modeling. Post-IRA Part D volume trajectory. Non-Part D prescription migration opportunity analysis. ¥9.6B per 1pp sensitivity dashboard.',
      format: 'PowerBI', department: 'Finance', owner: 'U.S. Commercial Finance / Market Access', rating: 4.9, views: 3900, isNew: true, isTrending: true,
      relatedConsoleId: 'us-segment', dataSource: 'CMS Part D Data / IMS Rx Analytics', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'U.S. President', 'Board'], tags: ['ira', 'medicare', 'part-d', 'xtandi-pricing'], nextUpdate: 'Every Tuesday 6:00 AM',
    },
    {
      id: 'us-3', name: 'VEOZAH Payer Coverage & Access Tracker', category: 'United States Segment', frequency: 'Monthly',
      description: 'VEOZAH commercial and Medicare Part D payer coverage rate. Formulary tier placement by plan. Prior authorization requirements and approval rates. Patient out-of-pocket cost trends. Co-pay assistance program utilization. Coverage expansion trajectory toward 90%+ commercial lives.',
      format: 'PowerBI', department: 'Market Access', owner: 'Market Access Finance / HEOR', rating: 4.8, views: 2400, isNew: false, isTrending: true,
      relatedConsoleId: 'us-segment', dataSource: 'Managed Markets Data / Formulary Monitor', accessLevel: 'Finance + Market Access',
      audience: ['CFO', 'U.S. President', 'Market Access VP', 'Women\'s Health VP'], tags: ['veozah', 'payer-coverage', 'formulary', 'access'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'us-4', name: 'Pfizer Collaboration P&L Reconciliation', category: 'United States Segment', frequency: 'Monthly',
      description: 'Astellas-Pfizer XTANDI and PADCEV collaboration financial reconciliation. Shared profit/loss for U.S. co-promotion (PADCEV collaboration structure). Royalties from Pfizer for ex-U.S. XTANDI. Collaboration cost allocations and milestone payments. Alliance accounting transparency.',
      format: 'PowerBI', department: 'Finance', owner: 'Alliance Finance', rating: 4.7, views: 1900, isNew: false, isTrending: false,
      relatedConsoleId: 'us-segment', dataSource: 'Alliance Accounting System / Pfizer Submissions', accessLevel: 'Finance + Legal',
      audience: ['CFO', 'Alliance VP', 'Controller', 'Legal'], tags: ['pfizer', 'collaboration', 'alliance', 'royalties'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'us-5', name: 'U.S. Oncology Market Access Report', category: 'United States Segment', frequency: 'Monthly',
      description: 'U.S. pharmacy and medical benefit coverage across XTANDI, PADCEV, IZERVAY, VYLOY. NCCN guideline inclusion status. Competitive formulary positioning. PBM preferred drug list dynamics. Patient assistance program enrollment and impact on net revenue.',
      format: 'PowerBI', department: 'Market Access', owner: 'U.S. Market Access Finance', rating: 4.6, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'us-segment', dataSource: 'Formulary Monitor / PBM Data', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'U.S. President', 'Market Access VP'], tags: ['market-access', 'formulary', 'pbm', 'nccn'], nextUpdate: 'Monthly Day 11',
    },
    {
      id: 'us-6', name: 'U.S. Field Force Productivity Dashboard', category: 'United States Segment', frequency: 'Monthly',
      description: 'Astellas U.S. commercial field force productivity: calls per rep, new account openings, NPS with oncologists/urologists/OB-GYN. PADCEV urology-oncology co-promotion with Pfizer ROI tracking. VEOZAH OB/GYN call productivity and prescriber conversion rates.',
      format: 'PowerBI', department: 'Commercial Operations', owner: 'U.S. Commercial Operations Finance', rating: 4.5, views: 1400, isNew: false, isTrending: false,
      relatedConsoleId: 'us-segment', dataSource: 'Veeva CRM / Commercial Operations System', accessLevel: 'Finance + Commercial',
      audience: ['U.S. President', 'Commercial VP', 'CFO'], tags: ['field-force', 'productivity', 'crm', 'commercial'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'us-7', name: 'U.S. Segment Core OP Bridge vs Plan', category: 'United States Segment', frequency: 'Monthly',
      description: 'U.S. Core OP waterfall vs ¥800B FY2026 revenue plan. Bridge: XTANDI IRA impact, PADCEV/VEOZAH growth, gross-to-net movements, SG&A, SMT savings allocated to U.S. Q1 FY2026: ¥196.0B (+3.8% YoY). Margin expansion from SMT and product mix shift toward higher-margin newer products.',
      format: 'PowerBI', department: 'Finance', owner: 'U.S. FP&A', rating: 4.8, views: 2300, isNew: false, isTrending: false,
      relatedConsoleId: 'us-segment', dataSource: 'U.S. Segment P&L', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'U.S. President', 'IR'], tags: ['core-op', 'bridge', 'us', 'guidance'], nextUpdate: 'Monthly Day 9',
    },

    // ──────────────────────────────────────────
    // Enterprise Finance & EPS — 7 reports
    // ──────────────────────────────────────────
    {
      id: 'ent-1', name: 'Enterprise Core EPS vs FY2026 Guidance Dashboard', category: 'Enterprise Finance & EPS', frequency: 'Weekly',
      description: 'Annualized run-rate Core EPS vs ¥250+ FY2026 guidance. Q1 FY2026: ¥67 (+6.3% YoY). FX sensitivity layer (¥2.1B/¥1 USD/JPY). IRA XTANDI price impact scenario toggle. PADCEV/VEOZAH upside tracking. SMT savings contribution to Core OP margin.',
      format: 'PowerBI', department: 'Finance', owner: 'Enterprise FP&A / IR', rating: 4.9, views: 4300, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-performance', dataSource: 'Consolidated P&L System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'IR', 'Board'], tags: ['core-eps', 'guidance', 'fy2026', 'run-rate'], nextUpdate: 'Every Monday 6:00 AM',
    },
    {
      id: 'ent-2', name: 'Five-Segment Consolidated Revenue & Core OP P&L', category: 'Enterprise Finance & EPS', frequency: 'Monthly',
      description: 'Consolidated Core P&L across all five geographic segments. Q1 FY2026: Revenue ¥552.8B, Core OP ¥153.0B, Core OP margin 27.7%. FX impact bridge: USD/JPY and EUR/JPY move vs plan. Segment contribution to Core OP margin improvement.',
      format: 'PowerBI', department: 'Finance', owner: 'Corporate Accounting / FP&A', rating: 4.8, views: 3100, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-performance', dataSource: 'Enterprise Consolidation System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Segment Presidents', 'IR'], tags: ['consolidated', 'pl', 'segments', 'core-op'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'ent-3', name: 'Core vs GAAP EPS Reconciliation', category: 'Enterprise Finance & EPS', frequency: 'Quarterly',
      description: 'Core to GAAP EPS bridge: amortization of collaboration rights (PADCEV/XTANDI), impairment charges, restructuring costs, and non-Core tax rate. Q1 FY2026: Core EPS ¥67 vs GAAP EPS ¥52. Intangible amortization is largest recurring non-Core item.',
      format: 'PowerBI', department: 'Finance', owner: 'External Reporting / Tax', rating: 4.7, views: 1800, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-performance', dataSource: 'GAAP Reporting System / Tax', accessLevel: 'Finance + Legal',
      audience: ['CFO', 'Controller', 'Tax VP', 'IR'], tags: ['gaap', 'core', 'reconciliation', 'amortization'], nextUpdate: 'Quarterly Day 8',
    },
    {
      id: 'ent-4', name: 'FX Impact Dashboard — USD/JPY and EUR/JPY', category: 'Enterprise Finance & EPS', frequency: 'Weekly',
      description: 'Real-time FX dashboard: USD/JPY and EUR/JPY spot vs Astellas planning rate. Core OP sensitivity: ¥2.1B per ¥1 USD/JPY move. Hedging book coverage ratio and horizon. YTD FX impact vs plan. Planning rate assumption review trigger thresholds.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / FP&A', rating: 4.9, views: 3700, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-performance', dataSource: 'Bloomberg / Treasury Management System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Treasury VP', 'IR'], tags: ['fx', 'usd-jpy', 'hedging', 'sensitivity'], nextUpdate: 'Every Friday 7:00 AM',
    },
    {
      id: 'ent-5', name: 'Earnings Call Preparation Package', category: 'Enterprise Finance & EPS', frequency: 'Quarterly',
      description: 'CFO and CEO earnings call talking points (English + Japanese bilingual), IR slide deck, and Q&A preparation. Segment performance vs guidance, XTANDI IRA update, SMT savings progress, PADCEV/VEOZAH launch KPIs, FY2026 guidance reaffirmation or raise analysis.',
      format: 'PowerBI', department: 'Finance', owner: 'IR / FP&A', rating: 4.8, views: 2800, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-performance', dataSource: 'Consolidated P&L / Guidance Model', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'IR', 'Board'], tags: ['earnings', 'ir', 'guidance', 'analyst'], nextUpdate: 'Quarterly Day 11',
    },
    {
      id: 'ent-6', name: 'FY2026 Guidance Sensitivity Analysis', category: 'Enterprise Finance & EPS', frequency: 'Monthly',
      description: 'Monte Carlo and point-estimate sensitivity of FY2026 Core EPS (¥250+) to key levers: XTANDI IRA price cut (¥9.6B/1pp), FX USD/JPY (¥2.1B/¥1), PADCEV 1L uptake, Japan NHI revision, SMT savings pace. Confidence interval modeling for guidance range.',
      format: 'PowerBI', department: 'Finance', owner: 'Enterprise FP&A', rating: 4.9, views: 2900, isNew: false, isTrending: true,
      relatedConsoleId: 'enterprise-performance', dataSource: 'Planning Model / Scenario Engine', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'FP&A Leadership'], tags: ['sensitivity', 'eps', 'guidance', 'scenario'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'ent-7', name: 'FY2026 vs FY2025 Annual Operating Plan Tracker', category: 'Enterprise Finance & EPS', frequency: 'Monthly',
      description: 'Full-year AOP vs actuals tracking across all five geographic segments. Revenue, Core OP, and Core EPS bridges. Segment-level beat/miss decomposition. SMT savings YTD vs ¥40B plan. IRA timing impact vs plan assumption.',
      format: 'PowerBI', department: 'Finance', owner: 'Enterprise FP&A', rating: 4.7, views: 2200, isNew: false, isTrending: false,
      relatedConsoleId: 'enterprise-performance', dataSource: 'AOP Planning System / Actuals', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'Segment Presidents', 'FP&A Leadership'], tags: ['aop', 'plan', 'actuals', 'bridge'], nextUpdate: 'Monthly Day 11',
    },

    // ──────────────────────────────────────────
    // Pipeline & R&D — 4 reports
    // ──────────────────────────────────────────
    {
      id: 'rd-1', name: 'R&D Pipeline Progress Dashboard', category: 'Pipeline & R&D', frequency: 'Monthly',
      description: 'Astellas pipeline: Phase 1–3 assets across oncology, urology, and women\'s health. Clinical trial enrollment, milestone dates, and probability of success (POS) updates. R&D investment ¥360B FY2026 plan tracking. Key read-outs and regulatory submissions calendar.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'R&D Finance / Clinical Operations', rating: 4.7, views: 1900, isNew: false, isTrending: true,
      relatedConsoleId: 'pipeline', dataSource: 'Clinical Trial Management System / Portfolio Tool', accessLevel: 'Finance + R&D',
      audience: ['CFO', 'Chief Scientific Officer', 'CEO', 'Board'], tags: ['pipeline', 'r&d', 'clinical-trials', 'milestones'], nextUpdate: 'Monthly Day 15',
    },
    {
      id: 'rd-2', name: 'PADCEV Combination Therapy Clinical Data Tracker', category: 'Pipeline & R&D', frequency: 'Monthly',
      description: 'PADCEV+pembrolizumab (KEYNOTE-869) data and label expansion monitoring. Combination with IO agents: new data read-outs in cisplatin-ineligible, MIBC, upper tract urothelial. Competitive landscape: BMS CheckMate, Roche IMvigor combination trials.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'Medical Affairs / R&D Finance', rating: 4.8, views: 2100, isNew: false, isTrending: true,
      relatedConsoleId: 'pipeline', dataSource: 'Clinical Data Repository / ClinicalTrials.gov', accessLevel: 'Finance + Medical Affairs',
      audience: ['CFO', 'Chief Medical Officer', 'Oncology President'], tags: ['padcev', 'clinical-data', 'bladder-cancer', 'keynote-869'], nextUpdate: 'Monthly Day 12',
    },
    {
      id: 'rd-3', name: 'XTANDI Follow-On Programs & Next-Gen Oncology', category: 'Pipeline & R&D', frequency: 'Quarterly',
      description: 'XTANDI label expansion programs (earlier lines, combination with PADCEV, ADT combinations). Next-generation androgen receptor agents in Phase 1/2. Pipeline diversification strategy post-XTANDI IRA risk. Lifecycle management investment vs new asset BD.',
      format: 'PowerBI', department: 'Strategy / R&D Finance', owner: 'Portfolio Strategy / R&D Finance', rating: 4.6, views: 1500, isNew: false, isTrending: false,
      relatedConsoleId: 'pipeline', dataSource: 'Portfolio Planning Tool / External Intelligence', accessLevel: 'Finance + Strategy',
      audience: ['CEO', 'CFO', 'Chief Scientific Officer', 'Board'], tags: ['xtandi', 'lifecycle', 'pipeline', 'next-gen'], nextUpdate: 'Quarterly Day 15',
    },
    {
      id: 'rd-4', name: 'R&D Expense vs Budget Tracker', category: 'Pipeline & R&D', frequency: 'Monthly',
      description: 'R&D expense YTD vs ¥360B FY2026 plan. By therapy area (oncology, urology, women\'s health, ophthalmology) and by stage (Phase 1, 2, 3, regulatory). CRO spend vs in-house spend. SMT R&D efficiency component tracking. Phase transitions and discontinuations impacting budget.',
      format: 'PowerBI', department: 'R&D Finance', owner: 'R&D Finance', rating: 4.6, views: 1600, isNew: false, isTrending: false,
      relatedConsoleId: 'pipeline', dataSource: 'R&D Finance System / SAP', accessLevel: 'Finance + R&D Leadership',
      audience: ['CFO', 'Chief Scientific Officer', 'R&D Finance VP'], tags: ['r&d-expense', 'budget', 'cro', 'efficiency'], nextUpdate: 'Monthly Day 8',
    },

    // ──────────────────────────────────────────
    // SMT & Cost Transformation — 4 reports
    // ──────────────────────────────────────────
    {
      id: 'smt-1', name: 'SMT Savings Scorecard — FY2026 ¥40B Target', category: 'SMT & Cost Transformation', frequency: 'Monthly',
      description: 'Sustainable Margin Transformation savings by workstream: (1) procurement/external spend, (2) manufacturing efficiency, (3) commercial SG&A, (4) G&A/shared services. YTD vs ¥40B FY2026 target. FY2025: ¥21B achieved. Cumulative ¥65B target tracking. Core OP margin improvement attribution.',
      format: 'PowerBI', department: 'Finance', owner: 'SMT Program Office / FP&A', rating: 4.9, views: 3200, isNew: false, isTrending: true,
      relatedConsoleId: 'smt', dataSource: 'SMT Tracking System / SAP Cost Centers', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'SMT Steering Committee', 'Board'], tags: ['smt', 'cost-savings', 'margin', 'transformation'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'smt-2', name: 'Procurement Savings & External Spend Analytics', category: 'SMT & Cost Transformation', frequency: 'Monthly',
      description: 'Procurement SMT workstream: API and raw material renegotiations, CMO contract renewals, MRO optimization. Spend under management ratio. Category-level savings vs target. Vendor concentration risk. Savings validated by Finance vs claimed by procurement.',
      format: 'PowerBI', department: 'Finance', owner: 'Procurement Finance / SMT', rating: 4.7, views: 1800, isNew: false, isTrending: false,
      relatedConsoleId: 'smt', dataSource: 'Procurement System / SAP Ariba', accessLevel: 'Finance + Operations',
      audience: ['CFO', 'Chief Procurement Officer', 'SMT Lead'], tags: ['procurement', 'savings', 'api', 'external-spend'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'smt-3', name: 'Commercial SG&A Efficiency Report', category: 'SMT & Cost Transformation', frequency: 'Monthly',
      description: 'SG&A spend vs plan by market (U.S., Europe, Japan, International). Revenue-to-SG&A ratio trend. Field force size and cost per call vs industry benchmark. Marketing mix optimization: digital vs personal promotion ROI. SG&A SMT target ¥12B FY2026.',
      format: 'PowerBI', department: 'Finance', owner: 'Commercial Finance / SMT', rating: 4.6, views: 1500, isNew: false, isTrending: false,
      relatedConsoleId: 'smt', dataSource: 'Commercial Finance System / HR Data', accessLevel: 'Finance + Commercial',
      audience: ['CFO', 'Regional Presidents', 'Commercial VP'], tags: ['sga', 'commercial', 'efficiency', 'field-force'], nextUpdate: 'Monthly Day 9',
    },
    {
      id: 'smt-4', name: 'Manufacturing Footprint Rationalization Tracker', category: 'SMT & Cost Transformation', frequency: 'Monthly',
      description: 'Astellas manufacturing site consolidation progress under SMT. Japan sites: Toyama, Yamagata, and other facilities undergoing batch-size optimization and output consolidation. CMO contract transitions: move from owned-manufacturing to CMO for select lower-volume products. Site-level savings vs ¥15B FY2026 manufacturing SMT target. Capex vs savings ROI.',
      format: 'PowerBI', department: 'Operations / Finance', owner: 'Manufacturing Finance / SMT', rating: 4.5, views: 1200, isNew: false, isTrending: false,
      relatedConsoleId: 'smt', dataSource: 'Manufacturing ERP / SAP Cost Centers', accessLevel: 'Finance + Operations',
      audience: ['CFO', 'Chief Operations Officer', 'Japan President', 'SMT Lead'], tags: ['manufacturing', 'smt', 'footprint', 'cmo'], nextUpdate: 'Monthly Day 11',
    },
    {
      id: 'smt-5', name: 'Core OP Margin Walk — SMT Attribution to Guidance', category: 'SMT & Cost Transformation', frequency: 'Quarterly',
      description: 'Quarterly Core OP margin bridge from FY2025 26.0% to FY2026 26.4%+ guidance: SMT savings contribution, operating leverage (revenue growth), IRA headwind, Japan NHI headwind, FX, and R&D mix. Management confirmation that SMT is primary margin expansion driver.',
      format: 'PowerBI', department: 'Finance', owner: 'Enterprise FP&A / SMT', rating: 4.8, views: 2400, isNew: false, isTrending: true,
      relatedConsoleId: 'smt', dataSource: 'SMT System / Consolidated P&L', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Board', 'IR'], tags: ['core-op', 'margin', 'smt', 'attribution'], nextUpdate: 'Quarterly Day 12',
    },

    // ──────────────────────────────────────────
    // Treasury & Capital Allocation — 4 reports
    // ──────────────────────────────────────────
    {
      id: 'tsy-1', name: 'Free Cash Flow Tracker vs ¥400B FY2026 Guidance', category: 'Treasury & Capital Allocation', frequency: 'Monthly',
      description: 'YTD FCF vs ¥400B FY2026 guidance. Q1 FY2026: ¥98.5B (+8.2% YoY). Bridge: Core OP, working capital, capex, taxes, collaboration payments. FCF supports dividend (¥70/share), share buyback (¥100B authorized), and BD/licensing investment. Quarterly seasonality profile.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / Corporate FP&A', rating: 4.8, views: 2400, isNew: false, isTrending: true,
      relatedConsoleId: 'treasury', dataSource: 'Treasury Cash Management / ERP', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Treasury VP', 'IR'], tags: ['fcf', 'cash-flow', 'guidance', 'treasury'], nextUpdate: 'Monthly Day 10',
    },
    {
      id: 'tsy-2', name: 'Capital Allocation Framework Dashboard', category: 'Treasury & Capital Allocation', frequency: 'Quarterly',
      description: 'Astellas capital allocation priorities: (1) dividend ¥70/share annual, (2) share buyback ¥100B FY2026 authorization, (3) BD/licensing pipeline investment, (4) capex. Capital deployment vs FCF generation. BD pipeline: what assets are being evaluated at what deal size.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / Strategy Finance', rating: 4.8, views: 2100, isNew: false, isTrending: false,
      relatedConsoleId: 'treasury', dataSource: 'Treasury / M&A / Strategy System', accessLevel: 'Finance + Executive',
      audience: ['CFO', 'CEO', 'Board', 'IR'], tags: ['capital-allocation', 'dividend', 'buyback', 'bd'], nextUpdate: 'Quarterly Day 12',
    },
    {
      id: 'tsy-3', name: 'Share Buyback Execution Tracker', category: 'Treasury & Capital Allocation', frequency: 'Monthly',
      description: '¥100B FY2026 share buyback program execution: shares repurchased, average price, remaining authorization. EPS accretion from buyback. TSE Rule 2 and Japanese buyback mechanics. ADR (ALPMY OTC) and underlying Tokyo Stock Exchange (4503) share count reconciliation.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury / Investor Relations', rating: 4.6, views: 1700, isNew: false, isTrending: false,
      relatedConsoleId: 'treasury', dataSource: 'TSE Buyback Register / Treasury System', accessLevel: 'Finance + IR',
      audience: ['CFO', 'Treasury VP', 'Controller', 'IR'], tags: ['buyback', 'share-count', 'tse', 'capital-return'], nextUpdate: 'Monthly Day 8',
    },
    {
      id: 'tsy-4', name: 'FX Hedging Program Report', category: 'Treasury & Capital Allocation', frequency: 'Monthly',
      description: 'Astellas FX hedging program: USD/JPY and EUR/JPY forward and option contracts. Hedge ratio vs total USD/EUR revenue exposure. Mark-to-market gain/loss on hedging book. Hedging tenor (6–18 months typical). Planning rate sensitivity table for investor guidance.',
      format: 'PowerBI', department: 'Finance', owner: 'Treasury', rating: 4.7, views: 1900, isNew: false, isTrending: false,
      relatedConsoleId: 'treasury', dataSource: 'Bloomberg / Treasury Management System', accessLevel: 'Finance + Treasury',
      audience: ['CFO', 'CEO', 'Treasury VP', 'IR'], tags: ['fx-hedging', 'usd-jpy', 'eur-jpy', 'treasury'], nextUpdate: 'Monthly Day 8',
    },
  ],
};
