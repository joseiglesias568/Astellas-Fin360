import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed KPIDefinition + KPIValue tables
// 9 Astellas Pharma Inc. (ALPMY) KPIs x 5 quarters x 3 data types (actual/forecast/budget)
//   = 135 values
//
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Annual Report (June 2026),
// Q4 FY2025 earnings release, and investor guidance materials.
//
// FY2025 key metrics: Revenue ¥2,139.2B (+11.9%) | Core OP ¥555.7B (26.0% margin)
//   Core EPS ¥237.01 (+49.8% YoY) | Net Income ¥291.6B | OpCF ¥560.2B
// Key products: XTANDI ¥960.8B (+5.3%) | PADCEV ¥221.2B (+34.8%)
// CEO: Naoki Okamura | CFO: Atsushi Kitamura | Ticker: ALPMY
// Fiscal year: April 1 – March 31.
// =============================================================================

interface KPITimeSeries {
  label: string;
  category: string;
  unit: string;
  description: string;
  formula?: string;
  dataSource?: string;
  sortOrder: number;
  // Values per quarter: [Q1_FY25, Q2_FY25, Q3_FY25, Q4_FY25, Q1_FY26]
  actuals: { value: string; target: string | null; trend: string; trendValue: string; status: string }[];
  forecasts: { value: string; target: string | null; trend: string; trendValue: string; status: string }[];
  budgets: { value: string; target: string | null; trend: string; trendValue: string; status: string }[];
}

const quarterLabels = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

const kpiTimeSeries: KPITimeSeries[] = [
  // ── PRIMARY KPIs ───────────────────────────────────────────────────────
  {
    label: 'Core EPS',
    category: 'primary',
    unit: '¥/share',
    description: 'Core earnings per share (¥/share). FY2025 full-year ¥237.01 (+49.8% YoY vs ¥158.22 FY2024). Quarterly profile: Q1 ¥54.88 / Q2 ¥59.14 / Q3 ¥71.18 (peak, lower R&D spend) / Q4 ¥51.81 (year-end accruals). FY2026 guidance: ¥256.77 (+8.3% YoY). Core EPS growth driven by revenue expansion, margin improvement from SMT savings program, and share count stability. Core EPS excludes amortization of acquired intangibles, restructuring charges, and impairments.',
    formula: 'Core Net Income / Weighted Average Diluted Shares Outstanding',
    dataSource: 'FY2025 Annual Report / Quarterly Earnings Releases',
    sortOrder: 1,
    actuals: [
      { value: '54.88',  target: '50.00',  trend: 'flat', trendValue: 'Q1 FY25 baseline; +44.4% vs Q1 FY24 ¥38.0',  status: 'good' },
      { value: '59.14',  target: '53.00',  trend: 'up',   trendValue: 'Q2 FY25; +47.9% YoY vs Q2 FY24 ¥40.0',        status: 'good' },
      { value: '71.18',  target: '62.00',  trend: 'up',   trendValue: 'Q3 FY25 peak; +69.5% YoY vs Q3 FY24 ¥42.0',   status: 'good' },
      { value: '51.81',  target: '50.00',  trend: 'down', trendValue: 'Q4 FY25; year-end accruals; +35.6% YoY',       status: 'good' },
      { value: '58.50',  target: '56.00',  trend: 'up',   trendValue: 'Q1 FY26 forecast; +6.6% vs Q1 FY25',           status: 'good' },
    ],
    forecasts: [
      { value: '54.20',  target: '50.00',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '58.50',  target: '53.00',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '70.50',  target: '62.00',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '51.20',  target: '50.00',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '57.80',  target: '56.00',  trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '50.00',  target: '50.00',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '53.00',  target: '53.00',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '62.00',  target: '62.00',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '50.00',  target: '50.00',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '56.00',  target: '56.00',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  {
    label: 'XTANDI Revenue',
    category: 'primary',
    unit: '¥B',
    description: 'Quarterly revenue from XTANDI (enzalutamide) — Astellas\'s largest product by revenue. FY2025 total: ¥960.8B (+5.3% YoY vs ¥912.4B FY2024). XTANDI is approved for mCSPC, nmCRPC, and mCRPC across major markets. Co-promoted with Pfizer in the US. US patent exclusivity extends to 2028; EU supplementary protection certificate to 2040+. Volume growth in MCRPC is maturing; growth now driven by earlier-stage indications (mCSPC expansion) and geographic markets. FY2026 target ¥910B reflects moderate plateau as PADCEV/newer assets take share of growth.',
    formula: 'Net product revenue from enzalutamide (XTANDI) across all markets and indications',
    dataSource: 'FY2025 Annual Report / Segment Revenue Disclosures',
    sortOrder: 2,
    actuals: [
      { value: '232.0',  target: '225.0',  trend: 'flat', trendValue: 'Q1 FY25; steady vs Q1 FY24 ¥225.8B',         status: 'good' },
      { value: '245.0',  target: '238.0',  trend: 'up',   trendValue: 'Q2 FY25; strong US + EU volume',              status: 'good' },
      { value: '248.0',  target: '240.0',  trend: 'up',   trendValue: 'Q3 FY25; seasonal US oncology strength',       status: 'good' },
      { value: '235.8',  target: '228.0',  trend: 'down', trendValue: 'Q4 FY25; year-end softness; FY25 total ¥960.8B', status: 'good' },
      { value: '240.0',  target: '235.0',  trend: 'up',   trendValue: 'Q1 FY26 forecast; modest growth continues',   status: 'good' },
    ],
    forecasts: [
      { value: '230.0',  target: '225.0',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '243.0',  target: '238.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '246.0',  target: '240.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '233.0',  target: '228.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '238.0',  target: '235.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '225.0',  target: '225.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '238.0',  target: '238.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '240.0',  target: '240.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '228.0',  target: '228.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '235.0',  target: '235.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  {
    label: 'Core Operating Margin',
    category: 'primary',
    unit: '%',
    description: 'Core operating income as a percentage of revenue. FY2025: 26.0% (+520bps YoY vs 20.8% FY2024) — significant improvement driven by SMT (Strategic Management Transformation) savings, operating leverage on revenue growth, and favorable product mix (higher-margin specialty oncology products). Q3 FY25 peak at 32.8% reflects lower seasonal R&D spend. FY2026 target: 27.9% (+190bps). Each +100bps core margin ≈ +¥21.4B core operating income / +¥9.2B net income.',
    formula: 'Core Operating Income / Total Revenue × 100',
    dataSource: 'FY2025 Annual Report / Quarterly Earnings Core Basis Reconciliation',
    sortOrder: 3,
    actuals: [
      { value: '24.3',   target: '23.0',   trend: 'flat', trendValue: 'Q1 FY25; +340bps vs Q1 FY24 20.8%',          status: 'good' },
      { value: '25.8',   target: '24.5',   trend: 'up',   trendValue: 'Q2 FY25; improving trajectory',               status: 'good' },
      { value: '32.8',   target: '29.0',   trend: 'up',   trendValue: 'Q3 FY25 peak; lower seasonal R&D spend',      status: 'good' },
      { value: '21.2',   target: '20.0',   trend: 'down', trendValue: 'Q4 FY25; year-end R&D + accruals; FY25: 26.0%', status: 'good' },
      { value: '25.4',   target: '24.0',   trend: 'up',   trendValue: 'Q1 FY26 forecast; continued SMT improvement', status: 'good' },
    ],
    forecasts: [
      { value: '24.0',   target: '23.0',   trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '25.5',   target: '24.5',   trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '32.5',   target: '29.0',   trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '21.0',   target: '20.0',   trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '25.1',   target: '24.0',   trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '23.0',   target: '23.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '24.5',   target: '24.5',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '29.0',   target: '29.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '20.0',   target: '20.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '24.0',   target: '24.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  {
    label: 'Strategic Brands Revenue',
    category: 'primary',
    unit: '¥B',
    description: 'Combined quarterly revenue from Astellas strategic growth products: PADCEV (enfortumab vedotin, urothelial cancer), IZERVAY (avacincaptad pegol, geographic atrophy), VEOZAH (fezolinetant, vasomotor symptoms). FY2025 total: ¥480.3B (+43.0% YoY vs ¥335.9B FY2024). PADCEV is the largest contributor (¥221.2B, +34.8%) following FDA approval for first-line mCSPC. IZERVAY launched Q3 FY2024; VEOZAH launched US Q2 FY2024. FY2026 target ¥610B driven by PADCEV global rollout and VEOZAH/IZERVAY prescription ramp.',
    formula: 'Net product revenue from PADCEV + IZERVAY + VEOZAH + other designated strategic brands',
    dataSource: 'FY2025 Annual Report / Strategic Brand Revenue Disclosures',
    sortOrder: 4,
    actuals: [
      { value: '112.0',  target: '100.0',  trend: 'flat', trendValue: 'Q1 FY25; +40.0% vs Q1 FY24 ¥80.0B',         status: 'good' },
      { value: '121.0',  target: '110.0',  trend: 'up',   trendValue: 'Q2 FY25; PADCEV 1L mCSPC driving growth',    status: 'good' },
      { value: '125.0',  target: '115.0',  trend: 'up',   trendValue: 'Q3 FY25; VEOZAH + IZERVAY momentum',          status: 'good' },
      { value: '122.3',  target: '118.0',  trend: 'down', trendValue: 'Q4 FY25; FY25 total ¥480.3B (+43.0% YoY)',   status: 'good' },
      { value: '135.0',  target: '130.0',  trend: 'up',   trendValue: 'Q1 FY26 forecast; continued strong growth',  status: 'good' },
    ],
    forecasts: [
      { value: '110.0',  target: '100.0',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '119.0',  target: '110.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '123.0',  target: '115.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '120.0',  target: '118.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '133.0',  target: '130.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '100.0',  target: '100.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '110.0',  target: '110.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '115.0',  target: '115.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '118.0',  target: '118.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '130.0',  target: '130.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  {
    label: 'Total Revenue',
    category: 'primary',
    unit: '¥B',
    description: 'Consolidated quarterly net revenue across all geographies and products. FY2025 total: ¥2,139.2B (+11.9% YoY vs ¥1,913.0B FY2024). Growth driven by US oncology strength (XTANDI, PADCEV) and strategic brand launches (VEOZAH, IZERVAY). China +29.6% on NRDL volume expansion. Q4 FY25 growth of +18.2% reflects favorable base effect (Q4 FY24 was ¥454.4B, seasonally weakest quarter). FY2026 guidance: ¥2,220B (+3.8%). FX headwinds (JPY appreciation vs USD/EUR) created reported headwind of ~4-5% in FY2025; revenue growth was ~16% in constant currency terms.',
    formula: 'Consolidated net sales/revenue per IFRS income statement',
    dataSource: 'FY2025 Annual Report / Quarterly Earnings Releases',
    sortOrder: 5,
    actuals: [
      { value: '537.9',  target: '525.0',  trend: 'flat', trendValue: 'Q1 FY25; +8.8% vs Q1 FY24 ¥494.2B',         status: 'good' },
      { value: '537.0',  target: '522.0',  trend: 'flat', trendValue: 'Q2 FY25; +10.9% vs Q2 FY24 ¥484.3B',         status: 'good' },
      { value: '527.1',  target: '510.0',  trend: 'down', trendValue: 'Q3 FY25; +9.8% vs Q3 FY24 ¥480.1B',          status: 'good' },
      { value: '537.2',  target: '520.0',  trend: 'up',   trendValue: 'Q4 FY25; +18.2% vs Q4 FY24 ¥454.4B',         status: 'good' },
      { value: '560.0',  target: '545.0',  trend: 'up',   trendValue: 'Q1 FY26 forecast; +4.1% vs Q1 FY25',          status: 'good' },
    ],
    forecasts: [
      { value: '535.0',  target: '525.0',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '534.0',  target: '522.0',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '525.0',  target: '510.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '535.0',  target: '520.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '557.0',  target: '545.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '525.0',  target: '525.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '522.0',  target: '522.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '510.0',  target: '510.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '520.0',  target: '520.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '545.0',  target: '545.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },

  // ── OPERATIONAL KPIs ──────────────────────────────────────────────────
  {
    label: 'SMT Savings (Cumulative)',
    category: 'operational',
    unit: '¥B cumulative',
    description: 'Cumulative cost savings achieved under the SMT (Strategic Management Transformation) program. FY2025 annual addition: ¥21B (vs ¥65B long-term cumulative target). SMT covers workforce optimization, procurement efficiency, manufacturing footprint rationalization, and process digitalization. Prior years cumulated ~¥23B through FY2024, reaching ~¥44B cumulative by FY2025 year-end. SMT savings flow primarily to SG&A and COGS line improvements. Each ¥10B in cumulative SMT savings contributes approximately +50bps to core operating margin. Target: ¥65B cumulative by end of FY2027.',
    formula: 'Running cumulative of verified cost savings under SMT program vs. FY2022 baseline',
    dataSource: 'SMT Program Management Office / Management Reporting',
    sortOrder: 6,
    actuals: [
      { value: '28.5',   target: '65.0',   trend: 'up', trendValue: 'Q1 FY25 cumulative; ¥5.3B added Q1',            status: 'warning' },
      { value: '33.8',   target: '65.0',   trend: 'up', trendValue: 'Q2 FY25 cumulative; ¥5.3B added Q2',            status: 'warning' },
      { value: '38.9',   target: '65.0',   trend: 'up', trendValue: 'Q3 FY25 cumulative; ¥5.1B added Q3',            status: 'warning' },
      { value: '44.2',   target: '65.0',   trend: 'up', trendValue: 'Q4 FY25 cumulative; FY25 total ¥21B added',     status: 'warning' },
      { value: '50.0',   target: '65.0',   trend: 'up', trendValue: 'Q1 FY26 forecast; ¥5.8B added; on track',       status: 'warning' },
    ],
    forecasts: [
      { value: '28.0',   target: '65.0',   trend: 'up', trendValue: 'projected', status: 'warning' },
      { value: '33.2',   target: '65.0',   trend: 'up', trendValue: 'projected', status: 'warning' },
      { value: '38.4',   target: '65.0',   trend: 'up', trendValue: 'projected', status: 'warning' },
      { value: '43.8',   target: '65.0',   trend: 'up', trendValue: 'projected', status: 'warning' },
      { value: '49.5',   target: '65.0',   trend: 'up', trendValue: 'projected', status: 'warning' },
    ],
    budgets: [
      { value: '27.0',   target: '65.0',   trend: 'up', trendValue: 'Budget baseline', status: 'warning' },
      { value: '33.0',   target: '65.0',   trend: 'up', trendValue: 'Budget baseline', status: 'warning' },
      { value: '39.0',   target: '65.0',   trend: 'up', trendValue: 'Budget baseline', status: 'warning' },
      { value: '44.5',   target: '65.0',   trend: 'up', trendValue: 'Budget baseline', status: 'warning' },
      { value: '50.5',   target: '65.0',   trend: 'up', trendValue: 'Budget baseline', status: 'warning' },
    ],
  },
  {
    label: 'PADCEV Revenue',
    category: 'operational',
    unit: '¥B',
    description: 'Quarterly revenue from PADCEV (enfortumab vedotin) — Astellas\'s fastest-growing oncology product. FY2025 total: ¥221.2B (+34.8% YoY vs ¥164.1B FY2024). PADCEV is a first-in-class antibody-drug conjugate (ADC) developed in collaboration with Seagen (acquired by Pfizer). FDA approved for first-line metastatic urothelial cancer (mUC) in combination with pembrolizumab (KEYNOTE-A39 data). EU approval received FY2025. Japan and China regulatory submissions in progress. Revenue acceleration expected as US first-line share grows and ex-US markets launch. FY2026 target: ¥280B (+26.6%).',
    formula: 'Net product revenue from enfortumab vedotin (PADCEV/PADCEF) across all markets',
    dataSource: 'FY2025 Annual Report / PADCEV Product Revenue Disclosures',
    sortOrder: 7,
    actuals: [
      { value: '52.0',   target: '50.0',   trend: 'flat', trendValue: 'Q1 FY25; +36.8% vs Q1 FY24 ¥38.0B',         status: 'good' },
      { value: '55.0',   target: '53.0',   trend: 'up',   trendValue: 'Q2 FY25; 1L mCSPC uptake accelerating',       status: 'good' },
      { value: '58.0',   target: '55.0',   trend: 'up',   trendValue: 'Q3 FY25; strong script momentum',             status: 'good' },
      { value: '56.2',   target: '54.0',   trend: 'down', trendValue: 'Q4 FY25; FY25 total ¥221.2B (+34.8% YoY)',   status: 'good' },
      { value: '62.0',   target: '60.0',   trend: 'up',   trendValue: 'Q1 FY26 forecast; EU launch contribution',    status: 'good' },
    ],
    forecasts: [
      { value: '51.0',   target: '50.0',   trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '54.0',   target: '53.0',   trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '57.0',   target: '55.0',   trend: 'up',   trendValue: 'projected', status: 'good' },
      { value: '55.0',   target: '54.0',   trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '61.0',   target: '60.0',   trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '50.0',   target: '50.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '53.0',   target: '53.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '55.0',   target: '55.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '54.0',   target: '54.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '60.0',   target: '60.0',   trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },

  // ── DIGITAL & R&D KPIs ────────────────────────────────────────────────
  {
    label: 'R&D POC Count (Cumulative FY)',
    category: 'operational',
    unit: 'programs',
    description: 'Cumulative count of pipeline programs achieving proof-of-concept (POC) in the current fiscal year. POC is defined as positive Phase 2 primary endpoint data or equivalent milestone enabling progression to Phase 3. FY2025 target: 3+ POC achievements — target met with 3 programs achieving POC by Q4 FY25. Pipeline focus: oncology (prostate, bladder, ovarian, lung), ophthalmology, and immunology/inflammation. R&D investment FY2025: ¥436.8B (20.4% of revenue). POC achievement rate is a leading indicator of future commercial pipeline value. FY2026 target: 3+ new POC programs (new fiscal year cycle resets to 0 in Q1).',
    formula: 'Count of pipeline programs reaching defined POC milestone within fiscal year (cumulative)',
    dataSource: 'R&D Pipeline Progress Reports / Science & Technology Committee',
    sortOrder: 8,
    actuals: [
      { value: '0',  target: '1',   trend: 'flat', trendValue: 'Q1 FY25; no new POC this quarter',                  status: 'warning' },
      { value: '1',  target: '2',   trend: 'up',   trendValue: 'Q2 FY25; first POC milestone achieved',             status: 'warning' },
      { value: '2',  target: '3',   trend: 'up',   trendValue: 'Q3 FY25; second POC milestone achieved',            status: 'warning' },
      { value: '3',  target: '3',   trend: 'up',   trendValue: 'Q4 FY25; FY2025 target met — 3 POC achieved',       status: 'good'    },
      { value: '0',  target: '1',   trend: 'flat', trendValue: 'Q1 FY26; FY26 new cycle; active Phase 2 reads',     status: 'warning' },
    ],
    forecasts: [
      { value: '0',  target: '1',   trend: 'flat', trendValue: 'projected', status: 'warning' },
      { value: '1',  target: '2',   trend: 'up',   trendValue: 'projected', status: 'warning' },
      { value: '2',  target: '3',   trend: 'up',   trendValue: 'projected', status: 'warning' },
      { value: '3',  target: '3',   trend: 'up',   trendValue: 'projected', status: 'good'    },
      { value: '0',  target: '1',   trend: 'flat', trendValue: 'projected', status: 'warning' },
    ],
    budgets: [
      { value: '0',  target: '1',   trend: 'flat', trendValue: 'Budget baseline', status: 'warning' },
      { value: '1',  target: '2',   trend: 'up',   trendValue: 'Budget baseline', status: 'warning' },
      { value: '2',  target: '3',   trend: 'up',   trendValue: 'Budget baseline', status: 'warning' },
      { value: '3',  target: '3',   trend: 'up',   trendValue: 'Budget baseline', status: 'good'    },
      { value: '1',  target: '1',   trend: 'flat', trendValue: 'Budget baseline', status: 'good'    },
    ],
  },

  // ── FINANCIAL KPIs ────────────────────────────────────────────────────
  {
    label: 'Operating Cash Flow',
    category: 'financial',
    unit: '¥B',
    description: 'Quarterly cash flow from operations (IFRS). FY2025 full-year: ¥560.2B — strong cash conversion reflecting high core operating income (¥555.7B) plus D&A add-back, partially offset by working capital build from revenue growth. Cash conversion ratio ~95% (OpCF / Core OP income). OCF is primary capital allocation resource: dividends (¥40/share annual), R&D investment, and balance sheet management. FY2026 guidance: OpCF ≥¥580B. Astellas maintains a net debt position of ~¥300B (leverage ratio ~0.44x) with a strong investment-grade balance sheet (A/A2 credit rating).',
    formula: 'Cash generated from operating activities per IFRS Statement of Cash Flows',
    dataSource: 'FY2025 Annual Report / Quarterly Cash Flow Statements',
    sortOrder: 9,
    actuals: [
      { value: '148.0',  target: '140.0',  trend: 'flat', trendValue: 'Q1 FY25; strong start; +28.7% vs Q1 FY24 ¥115B', status: 'good' },
      { value: '145.0',  target: '138.0',  trend: 'down', trendValue: 'Q2 FY25; steady; WC increase from sales growth',  status: 'good' },
      { value: '140.0',  target: '135.0',  trend: 'down', trendValue: 'Q3 FY25; R&D milestone payments in Q3',           status: 'good' },
      { value: '127.2',  target: '125.0',  trend: 'down', trendValue: 'Q4 FY25; FY25 total ¥560.2B; year-end payments', status: 'good' },
      { value: '155.0',  target: '148.0',  trend: 'up',   trendValue: 'Q1 FY26 forecast; continued strong conversion',  status: 'good' },
    ],
    forecasts: [
      { value: '145.0',  target: '140.0',  trend: 'flat', trendValue: 'projected', status: 'good' },
      { value: '142.0',  target: '138.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '138.0',  target: '135.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '125.0',  target: '125.0',  trend: 'down', trendValue: 'projected', status: 'good' },
      { value: '152.0',  target: '148.0',  trend: 'up',   trendValue: 'projected', status: 'good' },
    ],
    budgets: [
      { value: '140.0',  target: '140.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '138.0',  target: '138.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '135.0',  target: '135.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '125.0',  target: '125.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '148.0',  target: '148.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
];

export async function seedKPIs(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>
) {
  let definitionCount = 0;
  let valueCount = 0;

  for (const kpi of kpiTimeSeries) {
    const definition = await prisma.kPIDefinition.create({
      data: {
        companyId,
        category: kpi.category,
        label: kpi.label,
        unit: kpi.unit,
        description: kpi.description,
        formula: kpi.formula || '',
        dataSource: kpi.dataSource || '',
        sortOrder: kpi.sortOrder,
      },
    });
    definitionCount++;

    for (let qi = 0; qi < quarterLabels.length; qi++) {
      const periodId = periodMap[quarterLabels[qi]].id;

      await prisma.kPIValue.create({
        data: {
          kpiDefinitionId: definition.id,
          periodId,
          dataType: 'actual',
          value: kpi.actuals[qi].value,
          target: kpi.actuals[qi].target,
          trend: kpi.actuals[qi].trend,
          trendValue: kpi.actuals[qi].trendValue,
          status: kpi.actuals[qi].status,
        },
      });
      valueCount++;

      await prisma.kPIValue.create({
        data: {
          kpiDefinitionId: definition.id,
          periodId,
          dataType: 'forecast',
          value: kpi.forecasts[qi].value,
          target: kpi.forecasts[qi].target,
          trend: kpi.forecasts[qi].trend,
          trendValue: kpi.forecasts[qi].trendValue,
          status: kpi.forecasts[qi].status,
        },
      });
      valueCount++;

      await prisma.kPIValue.create({
        data: {
          kpiDefinitionId: definition.id,
          periodId,
          dataType: 'budget',
          value: kpi.budgets[qi].value,
          target: kpi.budgets[qi].target,
          trend: kpi.budgets[qi].trend,
          trendValue: kpi.budgets[qi].trendValue,
          status: kpi.budgets[qi].status,
        },
      });
      valueCount++;
    }
  }

  console.log(`Seeded ${definitionCount} KPI definitions and ${valueCount} KPI values across 5 quarters`);
}
