import { PrismaClient } from '@prisma/client';

// =============================================================================
// 8 Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY) business consoles, each
// with 3 key drivers and 3 sub-drivers per driver. Each sub-driver has one
// DriverMetric.
//
// SOURCE: Astellas Pharma Inc.
//   - FY2025 Annual Results (May 2025), FY2026 Full-Year Guidance,
//     Q1 FY25 Quarterly Earnings, SMT Programme Reports,
//     IRA Section 1192 CMS Negotiation Filings.
//
// Consoles map to the Astellas semantic layer with segments:
//   hcb, hss, pcw, finance, corporate, strategy
// Title→slug mapping lives in app/business-consoles/BusinessConsolesClient.tsx.
// =============================================================================

interface MetricDef {
  name: string;
  unit: 'currency' | 'percent' | 'count' | 'time' | 'score' | 'ratio' | 'index';
  currentValue: string;
  target: string;
  frequency: 'quarterly' | 'monthly' | 'daily' | 'weekly';
  direction: 'higher' | 'lower' | 'on_target';
}

interface SubDriverDef {
  name: string;
  description: string;
  metric: MetricDef;
}

interface KeyDriverDef {
  name: string;
  description: string;
  subDrivers: SubDriverDef[];
}

interface ConsoleDef {
  slug: string;
  title: string;
  category: string;
  segment: string;
  objective: string;
  keyDrivers: KeyDriverDef[];
}

const consoleDefinitions: ConsoleDef[] = [
  // =========================================================================
  // 1. ONCOLOGY & XTANDI PERFORMANCE
  // =========================================================================
  {
    slug: 'oncology-xtandi-performance',
    title: 'Oncology & XTANDI Performance',
    category: 'Revenue & Market',
    segment: 'hcb',
    objective:
      'Protect the XTANDI ¥960.8B global franchise through disciplined IRA negotiation strategy and ex-US volume acceleration; deliver PADCEV ¥221.2B growth momentum toward ¥300B+ through EV+P first-line mUC penetration.',
    keyDrivers: [
      {
        name: 'XTANDI Revenue & IRA Risk',
        description: 'XTANDI global revenue trajectory, CMS IRA Section 1192 Medicare price negotiation impact, and US vs ex-US volume mix management',
        subDrivers: [
          { name: 'XTANDI Global Revenue (¥B)', description: 'Total XTANDI (enzalutamide) global revenue — primary revenue driver representing 45% of total Astellas revenue', metric: { name: 'XTANDI Global Revenue', unit: 'currency', currentValue: '¥240.2B Q1 FY25', target: '≥¥960B FY25 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'IRA Negotiated Price Impact (¥B)', description: 'Estimated revenue headwind from CMS Medicare Part D IRA negotiated price vs current ASP — ¥9.6B sensitivity per 1pp price reduction', metric: { name: 'IRA Revenue Headwind', unit: 'currency', currentValue: 'Negotiation in progress', target: 'Minimise below ¥50B FY2026', frequency: 'quarterly', direction: 'lower' } },
          { name: 'XTANDI ex-US Revenue Growth (% YoY)', description: 'XTANDI revenue growth outside the US — Established Markets, Japan, and China — as offset to IRA US price headwind', metric: { name: 'XTANDI ex-US Growth', unit: 'percent', currentValue: '+8% YoY (ex-US)', target: '>+10% YoY ex-US FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'PADCEV Growth & Pfizer Co-Promotion',
        description: 'PADCEV (enfortumab vedotin) global revenue acceleration, EV+pembrolizumab first-line mUC penetration, and US field force co-promotion effectiveness with Pfizer',
        subDrivers: [
          { name: 'PADCEV Global Revenue (¥B)', description: 'Total PADCEV global revenue — second-largest Astellas brand growing +34.8% YoY toward ¥300B+', metric: { name: 'PADCEV Global Revenue', unit: 'currency', currentValue: '¥55.3B Q1 FY25', target: '≥¥280B FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'EV+P First-Line mUC Penetration (%)', description: 'EV+pembrolizumab (EV+P) market share in first-line metastatic urothelial carcinoma (mUC) vs platinum-based chemotherapy', metric: { name: 'EV+P First-Line Penetration', unit: 'percent', currentValue: '~22% of 1L mUC patients', target: '>35% of 1L mUC patients FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'US PADCEV Payer Coverage Rate (%)', description: 'Commercial and Medicare Part B payer coverage rate for PADCEV — broad access drives prescription velocity', metric: { name: 'PADCEV Payer Coverage', unit: 'percent', currentValue: '~92% commercial coverage', target: '>95% commercial, >90% Medicare Part B', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'ARSi Competitive Position',
        description: 'XTANDI ARSi class market share retention versus darolutamide (Nubeqa) and apalutamide (Erleada); China XTANDI NHSA volume; label expansion lifecycle management',
        subDrivers: [
          { name: 'ARSi Global Market Share (%)', description: 'XTANDI share of the global androgen receptor signalling inhibitor (ARSi) class across all prostate cancer indications', metric: { name: 'ARSi Global Market Share', unit: 'percent', currentValue: '>50%', target: '>48% retained FY2026 (post-IRA)', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI China Revenue (¥B)', description: 'XTANDI revenue in China — NHSA reimbursement list inclusion driving Tier 2–3 hospital volume expansion', metric: { name: 'XTANDI China Revenue', unit: 'currency', currentValue: '~¥12.5B Q1 FY25', target: '≥¥50B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI Japan Revenue (¥B)', description: 'XTANDI NHI reimbursement revenue in Japan including nmHSPC indication expansion', metric: { name: 'XTANDI Japan Revenue', unit: 'currency', currentValue: '~¥18B Q1 FY25', target: '≥¥75B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. STRATEGIC BRANDS GROWTH
  // =========================================================================
  {
    slug: 'strategic-brands-growth',
    title: 'Strategic Brands Growth',
    category: 'Revenue & Market',
    segment: 'hss',
    objective:
      'Deliver Strategic Brands portfolio revenue of ¥610B in FY2026 (+27% vs FY2025 ¥480.3B) through disciplined VYLOY gastric cancer global launch execution, IZERVAY geographic atrophy market penetration, and continued PADCEV EV+P first-line expansion.',
    keyDrivers: [
      {
        name: 'New Product Launch Execution',
        description: 'VYLOY, IZERVAY, and VEOZAH launch ramp velocity; market access and reimbursement attainment; prescriber education and uptake',
        subDrivers: [
          { name: 'VYLOY Global Revenue (¥B)', description: 'VYLOY (zolbetuximab) global revenue — first-in-class CLDN18.2-targeted therapy for gastric/GEJ cancer, approved FY2024', metric: { name: 'VYLOY Global Revenue', unit: 'currency', currentValue: '¥15.8B Q1 FY25', target: '≥¥100B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'IZERVAY Revenue Growth (% YoY)', description: 'IZERVAY (avacincaptad pegol) year-over-year revenue growth for geographic atrophy — +226% FY2025, decelerating as base expands', metric: { name: 'IZERVAY Revenue Growth', unit: 'percent', currentValue: '+180% YoY Q1 FY25', target: '>+50% YoY FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'VEOZAH Revenue (¥B)', description: 'VEOZAH (fezolinetant) cumulative revenue for vasomotor symptoms (menopause) — novel NK3 receptor antagonist mechanism', metric: { name: 'VEOZAH Revenue', unit: 'currency', currentValue: '¥11.7B Q1 FY25', target: '≥¥60B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Portfolio Revenue Growth',
        description: 'Strategic Brands aggregate revenue versus ¥610B FY2026 target; portfolio contribution mix; XOSPATA AML revenue maintenance',
        subDrivers: [
          { name: 'Strategic Brands Total Revenue (¥B)', description: 'Aggregate Strategic Brands (PADCEV, VYLOY, IZERVAY, VEOZAH, XOSPATA) revenue vs FY2026 ¥610B guidance', metric: { name: 'Strategic Brands Revenue', unit: 'currency', currentValue: '¥120.1B Q1 FY25', target: '¥610B FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XOSPATA Revenue (¥B)', description: 'XOSPATA (gilteritinib) revenue for AML FLT3-mutation — stable mature product contributing to portfolio base', metric: { name: 'XOSPATA Revenue', unit: 'currency', currentValue: '~¥17.9B Q1 FY25', target: '≥¥72B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Strategic Brands Share of Total Revenue (%)', description: 'Strategic Brands as percentage of Astellas total revenue — mix shift indicator toward portfolio diversification', metric: { name: 'Strategic Brands Revenue Share', unit: 'percent', currentValue: '~22% Q1 FY25', target: '>27% of revenue FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Market Penetration & Share',
        description: 'VYLOY CLDN18.2-positive gastric cancer market share, IZERVAY geographic atrophy share versus Apellis Syfovre, and VEOZAH menopausal VMS market penetration',
        subDrivers: [
          { name: 'VYLOY CLDN18.2+ Gastric Cancer Market Share (%)', description: 'VYLOY prescription market share among CLDN18.2-positive gastric and GEJ adenocarcinoma patients — first-in-class advantage', metric: { name: 'VYLOY Gastric Cancer Share', unit: 'percent', currentValue: '~35% CLDN18.2+ segment', target: '>45% CLDN18.2+ segment FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'IZERVAY Geographic Atrophy Market Share (%)', description: 'IZERVAY share of geographic atrophy (GA) treatment market versus Apellis Syfovre — two-player market', metric: { name: 'IZERVAY GA Market Share', unit: 'percent', currentValue: '~42% of GA market', target: '>40% sustained FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'VEOZAH Managed Care Coverage (%)', description: 'VEOZAH commercial payer formulary coverage rate for menopausal vasomotor symptoms — access is the primary uptake gate', metric: { name: 'VEOZAH Managed Care Coverage', unit: 'percent', currentValue: '~68% commercial coverage', target: '>80% commercial coverage FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. AMERICAS PERFORMANCE
  // =========================================================================
  {
    slug: 'americas-performance',
    title: 'Americas Performance',
    category: 'Revenue & Market',
    segment: 'pcw',
    objective:
      'Maximise US revenue from ¥940.2B FY2025 toward ¥1,050B+ in FY2026 by managing IRA XTANDI headwinds through ex-indication volume growth, expanding PADCEV EV+P first-line penetration, and executing IZERVAY and VEOZAH launch ramps in the world\'s largest pharmaceutical market.',
    keyDrivers: [
      {
        name: 'US Revenue & Market Share',
        description: 'Total US pharmaceutical revenue growth, XTANDI US franchise revenue, and new product (PADCEV, IZERVAY, VEOZAH) US contribution',
        subDrivers: [
          { name: 'US Total Revenue (¥B)', description: 'Total Astellas US market revenue — 44% of global revenue, primary growth driver and IRA exposure region', metric: { name: 'US Total Revenue', unit: 'currency', currentValue: '¥235.1B Q1 FY25', target: '≥¥1,050B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'US XTANDI Revenue (¥B)', description: 'XTANDI US revenue — approximately 75% of global XTANDI franchise, subject to CMS IRA Part D negotiated pricing from FY2026', metric: { name: 'US XTANDI Revenue', unit: 'currency', currentValue: '~¥180.2B Q1 FY25', target: '≥¥700B FY2026 (post-IRA adjusted)', frequency: 'quarterly', direction: 'higher' } },
          { name: 'US New Product Revenue (¥B)', description: 'Combined PADCEV, IZERVAY, and VEOZAH US revenue — Strategic Brands contribution offsetting XTANDI IRA headwind', metric: { name: 'US New Product Revenue', unit: 'currency', currentValue: '~¥48.2B Q1 FY25', target: '≥¥220B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Managed Care & Payer Strategy',
        description: 'Medicare Part D formulary position post-IRA negotiation, commercial payer coverage breadth for new products, and net price realisation management',
        subDrivers: [
          { name: 'XTANDI Medicare Part D Coverage Rate (%)', description: 'XTANDI Medicare Part D formulary coverage rate — impacts volume access post-IRA negotiated pricing effective date', metric: { name: 'XTANDI Medicare Coverage', unit: 'percent', currentValue: '>95% Medicare Part D', target: 'Maintain >90% post-IRA negotiation', frequency: 'quarterly', direction: 'higher' } },
          { name: 'PADCEV/IZERVAY Commercial Coverage (%)', description: 'Combined commercial payer formulary coverage rate for PADCEV and IZERVAY across US commercial health plans', metric: { name: 'PADCEV/IZERVAY Coverage', unit: 'percent', currentValue: '~91% commercial PADCEV, ~72% IZERVAY', target: '>95% PADCEV, >82% IZERVAY FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'US Net Price Realization (% of list)', description: 'Average net price as percentage of list price across US portfolio after gross-to-net adjustments (rebates, chargebacks, copay support)', metric: { name: 'US Net Price Realization', unit: 'percent', currentValue: '~68% of WAC', target: 'Maintain ≥65% post-IRA', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Launch Execution US',
        description: 'IZERVAY geographic atrophy retinal specialist penetration, VEOZAH menopausal OB/GYN prescriber uptake, and PADCEV oncology field force execution with Pfizer',
        subDrivers: [
          { name: 'IZERVAY US Retinal Specialist Uptake (%)', description: 'Percentage of US retinal specialists who have prescribed IZERVAY at least once — leading indicator for geographic atrophy revenue growth', metric: { name: 'IZERVAY Retinal Specialist Uptake', unit: 'percent', currentValue: '~58% of retinal specialists', target: '>72% by YE FY2025', frequency: 'monthly', direction: 'higher' } },
          { name: 'VEOZAH US OB/GYN Prescriber Reach (%)', description: 'Percentage of US OB/GYN prescribers reached by Astellas field force for VEOZAH menopausal vasomotor symptoms', metric: { name: 'VEOZAH Prescriber Reach', unit: 'percent', currentValue: '~62% of target OB/GYNs', target: '>78% of target OB/GYNs FY2025', frequency: 'monthly', direction: 'higher' } },
          { name: 'PADCEV US Oncology Market Share (%)', description: 'PADCEV share of US urothelial cancer therapy prescriptions — growing with EV+P 1L approval expanding the total addressable market', metric: { name: 'PADCEV US Oncology Share', unit: 'percent', currentValue: '~38% of all UC lines', target: '>42% of UC prescriptions FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 4. INTERNATIONAL & ASIA PERFORMANCE
  // =========================================================================
  {
    slug: 'international-asia-performance',
    title: 'International & Asia Performance',
    category: 'Revenue & Market',
    segment: 'strategy',
    objective:
      'Drive China revenue from ¥101.5B FY2025 to ¥150B+ FY2026 through VYLOY NMPA approval and XTANDI NHSA volume expansion; sustain Established Markets (EU+Canada) at ¥563.6B with VYLOY/XTANDI growth; maintain Japan home market at ¥289.0B with NHI label expansions.',
    keyDrivers: [
      {
        name: 'China Market Performance',
        description: 'China total revenue growth toward ¥150B+ target, XTANDI NHSA national reimbursement volume, and VYLOY NMPA regulatory pathway for gastric cancer approval',
        subDrivers: [
          { name: 'China Total Revenue (¥B)', description: 'Total Astellas China revenue — fastest-growing geography at +29.6% FY2025, targeting ¥150B+ FY2026', metric: { name: 'China Total Revenue', unit: 'currency', currentValue: '~¥25.4B Q1 FY25', target: '≥¥150B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI China Revenue (¥B)', description: 'XTANDI China NHSA reimbursement revenue — primary China revenue driver with broad Tier 1–3 hospital coverage', metric: { name: 'XTANDI China Revenue', unit: 'currency', currentValue: '~¥12.5B Q1 FY25', target: '≥¥55B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'VYLOY China Regulatory Milestone', description: 'VYLOY NMPA approval status for CLDN18.2-positive gastric/GEJ cancer in China — NMPA submission filed, approval targeted H1 FY25', metric: { name: 'VYLOY China Approval', unit: 'score', currentValue: 'NMPA review in progress', target: 'Approval by H1 FY2025', frequency: 'quarterly', direction: 'on_target' } },
        ],
      },
      {
        name: 'Established Markets Europe & Canada',
        description: 'EU and Canada revenue sustainability at ¥563.6B, XTANDI European market share, PADCEV EU launch execution, and VYLOY EU approval pathway',
        subDrivers: [
          { name: 'Established Markets Revenue (¥B)', description: 'Total Established Markets (EU countries + Canada) revenue — ¥563.6B FY2025, 26% of Astellas global revenue', metric: { name: 'Established Markets Revenue', unit: 'currency', currentValue: '~¥140.9B Q1 FY25', target: '≥¥580B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI EU Market Share (%)', description: 'XTANDI prescription market share across EMA-approved EU markets for all prostate cancer indications', metric: { name: 'XTANDI EU Share', unit: 'percent', currentValue: '~48% of EU ARSi prescriptions', target: '>48% retained FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'PADCEV EU Launch Revenue (¥B)', description: 'PADCEV (EV+P) EU launch revenue following EMA approval — first-line urothelial cancer EU commercial ramp', metric: { name: 'PADCEV EU Revenue', unit: 'currency', currentValue: '~¥8.2B Q1 FY25', target: '≥¥42B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Japan Home Market',
        description: 'Japan revenue at ¥289.0B FY2025, XTANDI NHI reimbursement label expansions, VYLOY and IZERVAY Japan launches, and NHSA drug price revision impact management',
        subDrivers: [
          { name: 'Japan Total Revenue (¥B)', description: 'Total Astellas Japan domestic revenue — home market at ¥289.0B FY2025, 14% of global revenue', metric: { name: 'Japan Total Revenue', unit: 'currency', currentValue: '~¥72.3B Q1 FY25', target: '≥¥290B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI Japan NHI Revenue (¥B)', description: 'XTANDI Japan NHI reimbursement revenue including nmHSPC indication expansion driving new patient access', metric: { name: 'XTANDI Japan Revenue', unit: 'currency', currentValue: '~¥18.0B Q1 FY25', target: '≥¥75B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
          { name: 'VYLOY Japan Revenue (¥B)', description: 'VYLOY gastric cancer Japan launch revenue — PMDA approval obtained, reimbursement NHI listing driving access', metric: { name: 'VYLOY Japan Revenue', unit: 'currency', currentValue: '~¥3.8B Q1 FY25', target: '≥¥20B FY2026 annualised', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 5. SMT COST TRANSFORMATION
  // =========================================================================
  {
    slug: 'smt-cost-transformation',
    title: 'SMT Cost Transformation',
    category: 'Cost Structure',
    segment: 'finance',
    objective:
      'Deliver SMT (Sustainable Margin Transformation) savings of ¥40B in FY2026 (cumulative ¥65B) and expand Core OP margin to 27.9% from 26.0% FY2025, with ¥19B incremental savings across SG&A rationalisation, manufacturing efficiency, and R&D portfolio prioritisation workstreams.',
    keyDrivers: [
      {
        name: 'SMT Savings Delivery',
        description: 'Annual SMT programme savings vs ¥40B FY2026 target; workstream execution by SG&A, manufacturing, and R&D categories; cumulative ¥65B pathway',
        subDrivers: [
          { name: 'SMT Annual Savings vs Target (¥B)', description: 'Year-to-date SMT programme savings versus full-year ¥40B FY2026 target — primary Core OP bridge lever', metric: { name: 'SMT Annual Savings', unit: 'currency', currentValue: '¥21B FY2025 base; YTD FY25 on track', target: '¥40B FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
          { name: 'SG&A Reduction (¥B YoY)', description: 'Year-over-year SG&A reduction driven by SMT headcount and procurement efficiency workstreams', metric: { name: 'SG&A Reduction YoY', unit: 'currency', currentValue: '~¥10B–¥12B contribution FY2026 target', target: '≥¥12B SG&A savings FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Manufacturing Efficiency Savings (¥B)', description: 'Manufacturing network rationalisation and process efficiency savings — approximately 30% of SMT programme contribution', metric: { name: 'Manufacturing Savings', unit: 'currency', currentValue: '~¥6B FY2025 base', target: '≥¥12B FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Core OP Margin Expansion',
        description: 'Core OP margin trajectory from 26.0% FY2025 toward 27.9% FY2026; Core OP ¥620B guidance delivery; gross margin improvement from Strategic Brands mix',
        subDrivers: [
          { name: 'Core OP Margin (%)', description: 'Core Operating Profit as percentage of revenue — 26.0% FY2025 expanding to 27.9% FY2026 target through SMT and revenue quality', metric: { name: 'Core OP Margin', unit: 'percent', currentValue: '~24.3% Q1 FY25', target: '27.9% FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Core OP (¥B)', description: 'Total Core Operating Profit — ¥555.7B FY2025, targeting ¥620B FY2026 (+11.6% YoY)', metric: { name: 'Core OP', unit: 'currency', currentValue: '¥130.8B Q1 FY25', target: '¥620B FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Gross Profit Margin (%)', description: 'Astellas consolidated gross profit margin — improving with Strategic Brands mix-up reducing legacy product erosion impact', metric: { name: 'Gross Profit Margin', unit: 'percent', currentValue: '~72% Q1 FY25', target: '>73% FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'SG&A Efficiency',
        description: 'SG&A as percentage of revenue declining toward <25% FY2027; revenue per employee; R&D prioritisation savings from pipeline focus',
        subDrivers: [
          { name: 'SG&A as % of Revenue (%)', description: 'SG&A expenses as percentage of total revenue — SMT target <25% by FY2027 from ~27–28% FY2025 baseline', metric: { name: 'SG&A % Revenue', unit: 'percent', currentValue: '~27–28% FY2025', target: '<26% FY2026, <25% FY2027', frequency: 'quarterly', direction: 'lower' } },
          { name: 'Revenue per Employee (¥M)', description: 'Total Astellas revenue per full-time equivalent employee — productivity efficiency indicator across commercial and R&D functions', metric: { name: 'Revenue per Employee', unit: 'currency', currentValue: '~¥68M per employee', target: '>¥75M per employee FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'R&D Portfolio Prioritisation Savings (¥B)', description: 'Savings from R&D pipeline focus and deprioritisation of lower-probability assets — approximately 20% of SMT programme', metric: { name: 'R&D Priority Savings', unit: 'currency', currentValue: '~¥4B FY2025 base', target: '≥¥8B FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 6. ENTERPRISE PIPELINE
  // =========================================================================
  {
    slug: 'enterprise-pipeline',
    title: 'Enterprise Pipeline',
    category: 'Strategic',
    segment: 'corporate',
    objective:
      'Execute 3+ annual R&D POC achievements and initiate Phase 3 programmes from FY2025 POC successes; manage XTANDI lifecycle to extend franchise value; advance BD strategy targeting 1–2 in-licensing transactions to supplement organic pipeline depth ahead of the XTANDI patent cliff horizon.',
    keyDrivers: [
      {
        name: 'R&D POC Programme',
        description: 'Annual proof-of-concept achievement rate, Phase 2 success rate, and R&D investment efficiency measured by POC cost-per-programme',
        subDrivers: [
          { name: 'Annual POC Achievements (count)', description: 'Number of R&D pipeline assets achieving proof-of-concept annually — the primary Astellas R&D productivity KPI; 3 achieved FY2025', metric: { name: 'Annual POC Achievements', unit: 'count', currentValue: '3 achieved FY2025', target: '≥3 annually FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Phase 2 Clinical Success Rate (%)', description: 'Percentage of Phase 2 programmes achieving POC milestone — measures Astellas R&D quality in asset selection and trial design', metric: { name: 'Phase 2 Success Rate', unit: 'percent', currentValue: '~38% Phase 2→POC', target: '>40%', frequency: 'quarterly', direction: 'higher' } },
          { name: 'R&D Investment Efficiency (¥B per POC)', description: 'Average R&D spend required to achieve one POC milestone — efficiency improving with portfolio prioritisation under SMT', metric: { name: 'R&D Investment per POC', unit: 'currency', currentValue: '~¥75B per POC', target: '<¥70B per POC FY2026', frequency: 'quarterly', direction: 'lower' } },
        ],
      },
      {
        name: 'Phase 3 Pipeline',
        description: 'Phase 3 initiation rate from FY2025 POCs, total late-stage pipeline assets, and regulatory submission milestones tracking toward FY2028–FY2030 commercial launches',
        subDrivers: [
          { name: 'Phase 3 Initiations (count, FY2026)', description: 'Number of Phase 3 programmes initiated in FY2026 from FY2025 POC successes — target 3 initiations to sustain long-term pipeline depth', metric: { name: 'Phase 3 Initiations FY2026', unit: 'count', currentValue: 'In planning (from 3 FY2025 POCs)', target: '3+ Phase 3 starts FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Late-Stage Pipeline Assets (count)', description: 'Total pipeline assets in Phase 2b or Phase 3 — portfolio depth indicator for commercial launch potential FY2028–FY2032', metric: { name: 'Late-Stage Pipeline Assets', unit: 'count', currentValue: '~9 Phase 2b/3 assets', target: '≥12 Phase 2b/3 assets FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Regulatory Submission Milestones (count)', description: 'Annual regulatory submissions (NDA, BLA, MAA) across Astellas global portfolio — pipeline to commercial conversion rate', metric: { name: 'Regulatory Submissions', unit: 'count', currentValue: '2 NDA/BLA submissions FY25 YTD', target: '≥3 submissions FY2025 full-year', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Business Development',
        description: 'BD in-licensing deal activity, partnership revenue contribution, and strategic fit assessment pipeline targeting oncology and rare disease assets for post-XTANDI diversification',
        subDrivers: [
          { name: 'BD Deal Value Closed (¥B, YTD)', description: 'Cumulative value of business development in-licensing and collaboration transactions closed — builds post-XTANDI pipeline diversification', metric: { name: 'BD Deal Value YTD', unit: 'currency', currentValue: 'Active pipeline being evaluated', target: '1–2 deals ¥50B–¥200B FY2025', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Partnership Revenue (¥B)', description: 'Revenue from collaboration and co-promotion agreements with partners — Pfizer (PADCEV) and other strategic alliances', metric: { name: 'Partnership Revenue', unit: 'currency', currentValue: '~¥55B Q1 FY25 (Pfizer-related)', target: '≥¥220B FY2026 (Pfizer PADCEV scale)', frequency: 'quarterly', direction: 'higher' } },
          { name: 'BD Pipeline Assets Under Evaluation (count)', description: 'Number of external assets under active BD evaluation for in-licensing or acquisition — measures deal sourcing pipeline activity', metric: { name: 'BD Pipeline Assets', unit: 'count', currentValue: '~15 assets under evaluation', target: '>15 high-quality assets in pipeline', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 7. FINANCIAL PERFORMANCE
  // =========================================================================
  {
    slug: 'financial-performance',
    title: 'Financial Performance',
    category: 'Financial',
    segment: 'finance',
    objective:
      'Deliver Core EPS ¥256.77 and Revenue ¥2,220B for FY2026; sustain Free Cash Flow ¥560B+ to fund dividend ¥78/share and share buyback programme; maintain net cash positive balance sheet with ROE above 15% medium-term target and A- credit rating.',
    keyDrivers: [
      {
        name: 'EPS & Guidance Delivery',
        description: 'Core EPS progression from ¥237.01 FY2025 to ¥256.77 FY2026 guidance; consensus beat cadence each quarter; revenue vs guidance tracking',
        subDrivers: [
          { name: 'Core EPS (Quarterly)', description: 'Astellas quarterly Core EPS — Q1 FY25 ¥54.88, tracking toward ¥256.77 FY2026 full-year guidance', metric: { name: 'Core EPS', unit: 'currency', currentValue: '¥54.88 Q1 FY25', target: '¥256.77 FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Core EPS vs Consensus (¥)', description: 'Quarterly Core EPS beat or miss versus Bloomberg consensus — investor confidence and guidance credibility metric', metric: { name: 'Core EPS vs Consensus', unit: 'currency', currentValue: '~¥54.88 (+beat consensus)', target: 'Beat consensus each quarter', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Revenue (¥B)', description: 'Total Astellas consolidated revenue — Q1 FY25 ¥537.9B (+8.8% YoY), tracking toward ¥2,220B FY2026 guidance', metric: { name: 'Total Revenue', unit: 'currency', currentValue: '¥537.9B Q1 FY25', target: '¥2,220B FY2026 full-year', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Cash Flow & Capital Allocation',
        description: 'Free Cash Flow generation ¥560B+ FY2025; dividend ¥78/share progressive commitment; share buyback programme execution; capital return discipline',
        subDrivers: [
          { name: 'Free Cash Flow (¥B)', description: 'Astellas annual Free Cash Flow — ¥560.2B FY2025, expected ¥580B–¥620B FY2026 supporting capital return programme', metric: { name: 'Free Cash Flow', unit: 'currency', currentValue: '¥560.2B FY2025', target: '≥¥560B FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Dividend per Share (¥)', description: 'Annual dividend per share — ¥78 FY2025, maintained with progressive dividend commitment as FCF grows', metric: { name: 'Dividend per Share', unit: 'currency', currentValue: '¥78/share FY2025', target: '≥¥78/share FY2026 (progressive)', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Share Buyback Execution (¥B YTD)', description: 'Year-to-date share repurchase programme execution — supplementing dividend as capital return mechanism', metric: { name: 'Share Buyback YTD', unit: 'currency', currentValue: 'Programme active FY25', target: 'Guided buyback envelope FY2025', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Balance Sheet & Credit',
        description: 'Net cash position maintenance; ROE above 15% medium-term target; A- S&P credit rating; total equity and book value per share trajectory',
        subDrivers: [
          { name: 'Net Cash Position (¥B)', description: 'Astellas net cash position (cash and equivalents minus financial debt) — positive balance provides BD and capital return flexibility', metric: { name: 'Net Cash Position', unit: 'currency', currentValue: '>¥300B net cash', target: 'Maintain net cash positive', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Return on Equity (%)', description: 'ROE — 17.4% FY2025, above the 15% medium-term target; driven by net income growth from Core OP expansion', metric: { name: 'Return on Equity', unit: 'percent', currentValue: '17.4% FY2025', target: '>15% medium-term', frequency: 'quarterly', direction: 'higher' } },
          { name: 'S&P Credit Rating', description: 'Astellas Pharma S&P credit rating — A- reflects conservative balance sheet management, net cash position, and strong FCF generation', metric: { name: 'S&P Credit Rating', unit: 'score', currentValue: 'A- (S&P)', target: 'Maintain A- or above', frequency: 'quarterly', direction: 'on_target' } },
        ],
      },
    ],
  },

  // =========================================================================
  // 8. ENTERPRISE RISK
  // =========================================================================
  {
    slug: 'enterprise-risk',
    title: 'Enterprise Risk',
    category: 'Risk & Compliance',
    segment: 'strategy',
    objective:
      'Manage XTANDI IRA policy and pricing risk (¥9.6B per 1pp sensitivity), defend ARSi class leadership against competitive entry, monitor FX translation risk at ¥151 USD/JPY guidance baseline, and protect against R&D pipeline binary outcomes through diversified portfolio management and BD activity.',
    keyDrivers: [
      {
        name: 'IRA Policy & Pricing Risk',
        description: 'CMS Medicare IRA Section 1192 XTANDI negotiated price outcome; revenue headwind modelling; mitigation through ex-US volume and Strategic Brands growth',
        subDrivers: [
          { name: 'XTANDI IRA Negotiated Price (% reduction)', description: 'CMS negotiated price reduction for XTANDI from current WAC — ¥9.6B revenue impact per 1pp; FY2026 guidance assumes ¥50B+ headwind', metric: { name: 'IRA Price Reduction', unit: 'percent', currentValue: 'Negotiation in progress', target: 'Minimise below 30pp reduction', frequency: 'quarterly', direction: 'lower' } },
          { name: 'IRA Revenue Headwind (¥B)', description: 'Total FY2026 XTANDI revenue reduction attributable to CMS IRA negotiated pricing vs FY2025 baseline', metric: { name: 'IRA Revenue Headwind', unit: 'currency', currentValue: '¥50B+ estimated FY2026', target: 'Offset via ex-US volume and new products', frequency: 'quarterly', direction: 'lower' } },
          { name: 'IRA Mitigation Coverage (% of headwind)', description: 'Percentage of IRA revenue headwind offset by ex-US XTANDI volume growth and Strategic Brands acceleration above plan', metric: { name: 'IRA Mitigation Coverage', unit: 'percent', currentValue: '~65% coverage estimated', target: '>80% headwind covered by offsets', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
      {
        name: 'Competitive & Market Risk',
        description: 'ARSi class competitive dynamics versus darolutamide and apalutamide; geographic atrophy two-player market share; XTANDI patent cliff generic entry timeline monitoring',
        subDrivers: [
          { name: 'ARSi Market Share Retention (%)', description: 'XTANDI share of global ARSi class prescriptions — competitive pressure from Bayer/Janssen darolutamide and Janssen apalutamide', metric: { name: 'ARSi Share Retention', unit: 'percent', currentValue: '>50% ARSi class', target: '>47% post-IRA market dynamics', frequency: 'quarterly', direction: 'higher' } },
          { name: 'IZERVAY Geographic Atrophy Share (%)', description: 'IZERVAY vs Apellis Syfovre geographic atrophy market share — two-player market with competitive pricing dynamics', metric: { name: 'IZERVAY GA Share', unit: 'percent', currentValue: '~42% of GA market', target: '>40% share maintained FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'XTANDI Generic Entry Risk Assessment', description: 'Assessment of generic enzalutamide entry risk — patent expiry timeline FY2028–FY2030 by jurisdiction; lifecycle extension initiatives', metric: { name: 'XTANDI Generic Risk', unit: 'score', currentValue: 'Low FY2025 (patent protected)', target: 'Monitor; lifecycle extend by FY2028', frequency: 'quarterly', direction: 'on_target' } },
        ],
      },
      {
        name: 'FX & Macro Risk',
        description: 'USD/JPY versus ¥151 guidance baseline; total FX translation impact on reported JPY revenue; natural hedging coverage ratio and BOJ rate normalisation impact',
        subDrivers: [
          { name: 'USD/JPY vs Guidance Baseline (¥)', description: 'Average USD/JPY spot rate versus ¥151 FY2026 guidance assumption — deviations translate directly to revenue upside/downside', metric: { name: 'USD/JPY vs Guidance', unit: 'index', currentValue: '¥151.8 Q1 FY25 avg', target: 'Within ¥148–¥155 range', frequency: 'monthly', direction: 'on_target' } },
          { name: 'FX Translation Revenue Impact (¥B)', description: 'Total FX translation impact on reported JPY revenue from USD, EUR, GBP movements versus guidance baseline', metric: { name: 'FX Translation Impact', unit: 'currency', currentValue: '~+¥1.7B Q1 FY25 vs guidance', target: 'Neutral to +¥5B FY2026', frequency: 'quarterly', direction: 'higher' } },
          { name: 'Natural Hedging Coverage Ratio (%)', description: 'Percentage of USD revenue exposure naturally hedged by USD-denominated operating costs (R&D, manufacturing, COGS)', metric: { name: 'Natural Hedge Coverage', unit: 'percent', currentValue: '~33% natural USD hedge', target: '>35% natural hedge FY2026', frequency: 'quarterly', direction: 'higher' } },
        ],
      },
    ],
  },
];

// =============================================================================
// Seed function: Creates consoles with their full driver trees
// =============================================================================

export async function seedBusinessConsoles(prisma: PrismaClient, companyId: number) {
  for (const def of consoleDefinitions) {
    // 1) Create the console
    const console_record = await prisma.businessConsole.create({
      data: {
        companyId,
        title: def.title,
        category: def.category,
        segment: def.segment,
        objective: def.objective,
      },
    });

    // 2) For each key driver
    for (const kd of def.keyDrivers) {
      const driver = await prisma.consoleDriver.create({
        data: {
          consoleId: console_record.id,
          name: kd.name,
          description: kd.description,
          parentDriverId: null,
        },
      });

      // 3) Sub-drivers + their metric
      for (const sd of kd.subDrivers) {
        const subDriver = await prisma.consoleDriver.create({
          data: {
            consoleId: console_record.id,
            name: sd.name,
            description: sd.description,
            parentDriverId: driver.id,
          },
        });

        await prisma.driverMetric.create({
          data: {
            driverId: subDriver.id,
            name: sd.metric.name,
            unit: sd.metric.unit,
            currentValue: sd.metric.currentValue,
            target: sd.metric.target,
            frequency: sd.metric.frequency,
            direction: sd.metric.direction,
          },
        });
      }
    }
  }

  console.log(`Seeded ${consoleDefinitions.length} business consoles with full driver trees`);
}
