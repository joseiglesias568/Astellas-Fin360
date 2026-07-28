// =============================================================================
// Planning Engine
// Calculates P&L impact from planning lever adjustments (short-term & long-term)
// Astellas Pharma Inc. — XTANDI, PADCEV, VEOZAH, IZERVAY, VYLOY franchises
// Five geographic segments: United States, Established Markets, Japan, International Markets, China
// Pattern based on lib/scenario-engine.ts
// =============================================================================

export interface PlanningLever {
  id: string;
  label: string;
  category: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  description: string;
}

export interface PLResult {
  revenue: number;       // ¥B
  costOfSales: number;   // ¥B
  grossProfit: number;   // ¥B
  operatingExpenses: number; // ¥B (R&D + SG&A)
  operatingIncome: number;   // ¥B (Core OP)
  operatingMargin: number;   // %
  netIncome: number;         // ¥B (Core NI)
  eps: number;               // Core EPS (¥)
}

export interface PlanningImpact {
  baseline: PLResult;
  adjusted: PLResult;
  waterfall: { label: string; impact: number }[];
}

// =============================================================================
// SHORT-TERM LEVERS (0-6 months)
// =============================================================================

export const SHORT_TERM_LEVERS: PlanningLever[] = [
  // XTANDI (Prostate Cancer Franchise — ¥960.8B FY25)
  { id: 'xtandi-volume-change', label: 'XTANDI Volume Growth (YoY)', category: 'XTANDI Franchise', min: -10, max: 15, default: 0.0, step: 1.0, unit: '%', description: 'XTANDI net sales volume growth YoY across mCRPC, nmCRPC, mHSPC. IRA negotiated price effective 2026: ¥9.6B Core OP risk per 1pp price cut. Each +1% volume ≈ +¥9.6B revenue / +¥6.2B Core OP.' },
  { id: 'xtandi-ira-price-cut', label: 'XTANDI IRA Price Cut (pp)', category: 'XTANDI Franchise', min: 0, max: 20, default: 0, step: 1, unit: 'pp price reduction', description: 'IRA Medicare price negotiation discount on XTANDI effective 2026. Each 1pp price cut ≈ –¥9.6B Core OP. Scenario range: 0pp (no cut) to 20pp (maximum negotiated reduction).' },

  // PADCEV (Bladder Cancer Franchise — ¥221.2B FY25, growing)
  { id: 'padcev-uptake-rate', label: 'PADCEV New Patient Starts (vs plan)', category: 'PADCEV Franchise', min: -15, max: 30, default: 0.0, step: 2.5, unit: '% vs plan', description: 'PADCEV new patient start rate vs quarterly plan. EV+pembro is first-line SOC for urothelial carcinoma. Each +10% ≈ +¥11B annual revenue / +¥7.5B Core OP at launch-phase margins.' },

  // FX & Market Conditions
  { id: 'fx-yen-usd', label: 'Yen/USD Rate vs ¥151 Baseline', category: 'FX Sensitivity', min: -20, max: 20, default: 0, step: 1, unit: '¥ move (+ = yen weaker)', description: 'Change in ¥/USD rate vs ¥151/USD baseline. Each ¥1 yen depreciation ≈ +¥2.1B Core OP (USD revenue > USD costs). Positive = yen weaker than plan = favorable.' },

  // Cost Drivers
  { id: 'smt-savings-realization', label: 'SMT Savings Realization vs Plan', category: 'Cost Transformation', min: -30, max: 30, default: 0, step: 5, unit: '% vs ¥40B plan', description: 'SMT (Strategic Management Transformation) savings realization vs ¥40B FY26 run-rate plan. Each 10% shortfall ≈ –¥4B Core OP. SMT saves SG&A through headcount optimization and procurement.' },
  { id: 'rd-spend-timing', label: 'R&D Spend Timing (Phase Shift)', category: 'Cost Transformation', min: -10, max: 10, default: 0.0, step: 1.0, unit: '% of quarterly R&D', description: 'Phase trial enrollment timing shift vs plan. Positive = spend deferred to later quarters (favorable short-term); negative = accelerated spend. ¥1B R&D shift ≈ ¥0.75B Core OP impact.' },

  // Market Conditions
  { id: 'china-vbp-impact', label: 'China VBP Price Pressure', category: 'Market Conditions', min: 0, max: 40, default: 15, step: 5, unit: '% price reduction (VBP)', description: 'China volume-based procurement price reduction on key products. XTANDI China VBP already implemented. Each additional 5pp VBP price cut across portfolio ≈ –¥3.5B revenue / –¥1.8B Core OP.' },
];

// =============================================================================
// LONG-TERM LEVERS (12-36 months)
// =============================================================================

export const LONG_TERM_LEVERS: PlanningLever[] = [
  // Growth Drivers
  { id: 'organic-growth-rate', label: 'Organic Revenue Growth Rate', category: 'Growth', min: 1, max: 10, default: 3.3, step: 0.5, unit: '%', description: 'Annual organic revenue growth. FY26 guidance: +3.3% (¥2,139B → ¥2,210B). PADCEV label expansion and VEOZAH launch are primary FY26-27 growth drivers above portfolio organic baseline.' },
  { id: 'padcev-peak-sales', label: 'PADCEV Peak Sales Estimate', category: 'Growth', min: 200, max: 600, default: 320, step: 20, unit: '¥B annual', description: 'PADCEV peak annual sales estimate across US/EU/Japan. FY25: ¥221.2B. FY26 plan: ¥266B. Peak sales consensus ¥320-500B depending on label expansion into additional bladder/urothelial indications.' },

  // Profitability
  { id: 'rd-intensity-target', label: 'R&D Intensity Target', category: 'Profitability', min: 18, max: 26, default: 20.7, step: 0.5, unit: '% of revenue', description: 'R&D spend as % of revenue (R&D intensity ratio). FY25: ~20.7%. Each 1pp reduction ≈ +¥22B Core OP at FY26 revenue scale. Managed through portfolio prioritization and Phase 2/3 investment gating.' },
  { id: 'smt-savings-target', label: 'SMT Cumulative Savings Target', category: 'Profitability', min: 20, max: 60, default: 40, step: 5, unit: '¥B annual run-rate', description: 'SMT (Strategic Management Transformation) annual savings run-rate target. FY25: ¥21B. FY26 plan: ¥40B. Savings from headcount optimization (~3,000 roles), procurement consolidation, and G&A efficiency.' },

  // Investment
  { id: 'capex-and-bd', label: 'CapEx & BD Investment', category: 'Investment', min: 50, max: 300, default: 120, step: 10, unit: '¥B annual', description: 'Annual capital expenditure plus business development / licensing spend. Includes manufacturing expansion for biologics (PADCEV scale-up), R&D facility investment, and in-licensing/partnership costs.' },
  { id: 'pipeline-launches', label: 'Late-Stage Pipeline Launch Count', category: 'Investment', min: 0, max: 5, default: 2, step: 1, unit: 'new launches (3yr)', description: 'Number of new product launches from the late-stage pipeline over 3 years beyond VEOZAH. Each successful launch generates estimated ¥15-50B peak annual sales. Key assets: zolbetuximab follow-on, IZERVAY label expansion, new oncology NME.' },

  // Digital & Technology
  { id: 'digital-health-adoption', label: 'Digital Health & Patient Support Adoption', category: 'Digital & Analytics', min: 5, max: 40, default: 15, step: 5, unit: '% patient engagement rate', description: 'Patient support program and digital health platform engagement rate for XTANDI and PADCEV patients. Higher engagement → improved adherence → longer treatment duration → higher net sales per patient.' },
  { id: 'ai-productivity', label: 'AI & Analytics Productivity Gain', category: 'Digital & Analytics', min: 0, max: 12, default: 4, step: 1, unit: '%', description: 'Productivity improvement from AI/automation across clinical development, regulatory operations, and commercial analytics. Primarily SG&A savings through automation of repetitive FP&A and medical affairs workflows.' },
];

// =============================================================================
// BASELINE P&L (next 2 quarters combined for short-term — Q3 + Q4 FY26)
// All values in ¥B
// =============================================================================

const SHORT_TERM_BASELINE: PLResult = {
  revenue: 1112.0,       // Q3 + Q4 FY26 combined (¥549.5B + ¥562.5B)
  costOfSales: 230.5,    // COGS Q3+Q4 combined (~20.7% of revenue)
  grossProfit: 881.5,    // Gross Profit Q3+Q4 (Core OP ¥291.5B + OpEx ¥590B)
  operatingExpenses: 590.0, // R&D + SG&A Q3+Q4 combined (¥229.5B + ¥223.0B × Q4 components)
  operatingIncome: 291.5, // Core OP Q3+Q4 combined (¥138.0B + ¥153.5B)
  operatingMargin: 26.2,  // Core OP margin
  netIncome: 218.6,       // Core NI Q3+Q4 (Core OP × (1 – 25%))
  eps: 49.7,              // Core EPS Q3+Q4 combined
};

const ANNUAL_BASELINE: PLResult = {
  revenue: 2210.0,       // FY26 full year guidance (¥2,210B)
  costOfSales: 456.5,    // COGS FY26 full year (~20.7%)
  grossProfit: 1753.5,   // FY26 Gross Profit
  operatingExpenses: 1173.5, // FY26 R&D + SG&A total
  operatingIncome: 580.0, // FY26 Core OP guidance
  operatingMargin: 26.2,  // FY26 Core OP margin
  netIncome: 435.0,       // FY26 Core NI (¥580B × 75%)
  eps: 99.0,              // FY26 Core EPS (¥435B × 1000 ÷ 4,400M shares ≈ ¥99)
};

// =============================================================================
// SHORT-TERM IMPACT CALCULATION
// =============================================================================

export function calculateShortTermImpact(leverValues: Record<string, number>): PlanningImpact {
  const b = { ...SHORT_TERM_BASELINE };
  const waterfall: { label: string; impact: number }[] = [];

  // XTANDI volume change: each +1% ≈ +¥4.8B revenue and +¥3.1B Core OP (2-quarter)
  const xtandiVolumeChange = leverValues['xtandi-volume-change'] ?? 0;
  const xtandiRevImpact = xtandiVolumeChange * 4.8;    // ¥B revenue per 1% volume
  const xtandiAoiImpact = xtandiVolumeChange * 3.1;    // ¥B Core OP per 1% volume
  if (Math.abs(xtandiRevImpact) > 1) waterfall.push({ label: 'XTANDI Volume Impact', impact: parseFloat(xtandiAoiImpact.toFixed(1)) });

  // XTANDI IRA price cut: each 1pp ≈ –¥4.8B Core OP (half of annualized ¥9.6B, 2-quarter)
  const xIraCut = leverValues['xtandi-ira-price-cut'] ?? 0;
  const xIraAoiImpact = -xIraCut * 4.8;
  if (Math.abs(xIraAoiImpact) > 1) waterfall.push({ label: 'XTANDI IRA Price Cut', impact: parseFloat(xIraAoiImpact.toFixed(1)) });

  // PADCEV uptake: each +10% vs plan ≈ +¥5.5B revenue / +¥3.7B Core OP (2-quarter)
  const padcevUptake = leverValues['padcev-uptake-rate'] ?? 0;
  const padcevRevImpact = padcevUptake * 0.55;    // ¥B per 1% vs plan
  const padcevAoiImpact = padcevUptake * 0.37;
  if (Math.abs(padcevAoiImpact) > 1) waterfall.push({ label: 'PADCEV Uptake vs Plan', impact: parseFloat(padcevAoiImpact.toFixed(1)) });

  // FX: ¥1 yen depreciation (positive) = +¥2.1B Core OP (annualized) → ×0.5 for 2 quarters
  const fxMove = leverValues['fx-yen-usd'] ?? 0;
  const fxAoiImpact = fxMove * 2.1 * 0.5;
  if (Math.abs(fxAoiImpact) > 0.5) waterfall.push({ label: 'FX Impact (¥/USD)', impact: parseFloat(fxAoiImpact.toFixed(1)) });

  // SMT savings: each 10% deviation from ¥40B plan = ±¥2B Core OP (2-quarter ×0.5)
  const smtDeviation = leverValues['smt-savings-realization'] ?? 0; // % above/below plan
  const smtAoiImpact = (smtDeviation / 10) * 2.0;
  if (Math.abs(smtAoiImpact) > 0.5) waterfall.push({ label: 'SMT Savings Realization', impact: parseFloat(smtAoiImpact.toFixed(1)) });

  // R&D timing: positive % = deferred (favorable short-term); each 1% of quarterly R&D ≈ ¥1.2B
  const rdTiming = leverValues['rd-spend-timing'] ?? 0;
  const rdAoiImpact = rdTiming * 1.2;
  if (Math.abs(rdAoiImpact) > 0.5) waterfall.push({ label: 'R&D Spend Timing', impact: parseFloat(rdAoiImpact.toFixed(1)) });

  // China VBP: additional price reduction beyond 15% default; each 5pp ≈ –¥1.8B Core OP (2-quarter)
  const chinaVbp = (leverValues['china-vbp-impact'] ?? 15) - 15; // delta beyond baseline
  const chinaAoiImpact = -(chinaVbp / 5) * 1.8;
  if (Math.abs(chinaAoiImpact) > 0.5) waterfall.push({ label: 'China VBP Pressure', impact: parseFloat(chinaAoiImpact.toFixed(1)) });

  // Aggregate impacts
  const totalAoiImpact = xtandiAoiImpact + xIraAoiImpact + padcevAoiImpact + fxAoiImpact + smtAoiImpact + rdAoiImpact + chinaAoiImpact;
  const totalRevenueImpact = xtandiRevImpact + padcevRevImpact;

  const adjRevenue = parseFloat((b.revenue + totalRevenueImpact).toFixed(1));
  const adjCOGS = parseFloat((b.costOfSales * (adjRevenue / b.revenue)).toFixed(1)); // COGS scales with revenue
  const adjGrossProfit = parseFloat((adjRevenue - adjCOGS).toFixed(1));
  const adjOpEx = b.operatingExpenses; // R&D+SG&A doesn't scale linearly short-term
  const adjOI = parseFloat((b.operatingIncome + totalAoiImpact).toFixed(1));
  const adjMargin = adjRevenue > 0 ? parseFloat(((adjOI / adjRevenue) * 100).toFixed(1)) : 0;
  const adjNI = parseFloat((adjOI * (1 - 0.25)).toFixed(1));
  const adjEPS = parseFloat(((adjNI * 1000) / (4400 * 2)).toFixed(1)); // 2 quarters of shares

  return {
    baseline: b,
    adjusted: {
      revenue: adjRevenue,
      costOfSales: adjCOGS,
      grossProfit: adjGrossProfit,
      operatingExpenses: adjOpEx,
      operatingIncome: adjOI,
      operatingMargin: adjMargin,
      netIncome: adjNI,
      eps: adjEPS,
    },
    waterfall,
  };
}

// =============================================================================
// LONG-TERM PROJECTION
// =============================================================================

export interface LongTermProjection {
  years: { year: string; conservative: PLResult; base: PLResult; optimistic: PLResult }[];
  cagr: { metric: string; value: number }[];
}

export function calculateLongTermProjection(leverValues: Record<string, number>): LongTermProjection {
  const organicGrowthRate = (leverValues['organic-growth-rate'] ?? 3.3) / 100;
  const padcevPeakSales   = leverValues['padcev-peak-sales'] ?? 320;       // ¥B
  const rdIntensityTarget = (leverValues['rd-intensity-target'] ?? 20.7) / 100;
  const smtSavingsTarget  = leverValues['smt-savings-target'] ?? 40;       // ¥B annual run-rate
  const pipelineLaunches  = leverValues['pipeline-launches'] ?? 2;

  const baseRevenue = 2210.0;  // FY26 guidance (¥B)
  const baseSGA     = 451.0;   // FY26 annual SG&A baseline (¥B)
  const baseCoreOp  = 580.0;   // FY26 annual Core OP baseline (¥B)
  const dilutedShares = 4400;  // FY26 diluted shares (M)

  const years: LongTermProjection['years'] = [];

  for (let y = 0; y < 3; y++) {
    const yearLabel = `FY${26 + y}`;

    const buildPL = (revMultiplier: number): PLResult => {
      // Revenue: organic growth + PADCEV ramp contribution
      const organicRev = baseRevenue * Math.pow(1 + organicGrowthRate, y);
      // PADCEV ramp: growing from ¥266B FY26 toward peak sales
      const padcevLift = Math.max(0, (padcevPeakSales - 266) * Math.min(y / 2, 1));
      // Pipeline launches add ¥15-25B per launch by year 3
      const launchLift = pipelineLaunches * 15 * Math.min(y / 2, 1);
      const rev = parseFloat(((organicRev + padcevLift + launchLift) * revMultiplier).toFixed(1));

      // COGS: ~20-21% of revenue; biologics mix gradually increasing
      const cogsRate = 0.207 + (y * 0.003); // slight biologic mix increase
      const cos = parseFloat((rev * cogsRate).toFixed(1));
      const gp = parseFloat((rev - cos).toFixed(1));

      // R&D: intensity target declining toward rdIntensityTarget
      const rdRate = 0.207 - (y * (0.207 - rdIntensityTarget) / 2);
      const rdExp = parseFloat((rev * rdRate).toFixed(1));

      // SG&A: declining with SMT savings
      const annualSmtSavings = Math.min(smtSavingsTarget * (y / 1.5 + 1), smtSavingsTarget);
      const sga = parseFloat(Math.max(baseSGA - annualSmtSavings + rev * 0.002, baseSGA * 0.85).toFixed(1));
      const opex = parseFloat((rdExp + sga).toFixed(1));
      const oi = parseFloat((gp - opex).toFixed(1));
      const margin = rev > 0 ? parseFloat(((oi / rev) * 100).toFixed(1)) : 0;

      const ni = parseFloat((oi * (1 - 0.25)).toFixed(1));
      const sharesAdj = dilutedShares - y * 15; // buyback program ~¥50B/yr ≈ 15M shares
      const eps = parseFloat(((ni * 1000) / sharesAdj).toFixed(1));

      return { revenue: rev, costOfSales: cos, grossProfit: gp, operatingExpenses: opex, operatingIncome: oi, operatingMargin: margin, netIncome: ni, eps };
    };

    years.push({
      year: yearLabel,
      conservative: buildPL(0.96),
      base: buildPL(1.0),
      optimistic: buildPL(1.05),
    });
  }

  // Calculate CAGRs
  const fy26Rev = years[0].base.revenue;
  const fy28Rev = years[2].base.revenue;
  const revCAGR = fy26Rev > 0 ? (Math.pow(fy28Rev / fy26Rev, 1 / 2) - 1) * 100 : 0;

  const fy26OI = years[0].base.operatingIncome;
  const fy28OI = years[2].base.operatingIncome;
  const oiCAGR = fy26OI > 0 ? (Math.pow(fy28OI / fy26OI, 1 / 2) - 1) * 100 : 0;

  const fy26EPS = years[0].base.eps;
  const fy28EPS = years[2].base.eps;
  const epsCAGR = fy26EPS > 0 ? (Math.pow(fy28EPS / fy26EPS, 1 / 2) - 1) * 100 : 0;

  return {
    years,
    cagr: [
      { metric: 'Revenue',               value: parseFloat(revCAGR.toFixed(1)) },
      { metric: 'Core Operating Profit',  value: parseFloat(oiCAGR.toFixed(1)) },
      { metric: 'Core EPS',               value: parseFloat(epsCAGR.toFixed(1)) },
    ],
  };
}
