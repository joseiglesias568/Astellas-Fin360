// =============================================================================
// Fiscal Year Plan Data — Astellas Pharma Inc.
// Annual plan targets + YTD actuals + full-year projections
// All values in ¥B unless otherwise noted (Core EPS in ¥)
// Astellas fiscal year: April–March (Q1 FY26 = Apr–Jun 2025)
// FY25: Revenue ¥2,139.2B, Core OP ¥555.7B (26% margin), Core EPS ¥237
// FY26 guidance: Revenue ¥2,210B, Core OP ¥580B, Core EPS ¥250
// FX baseline: ¥151/USD; ¥2.1B Core OP per ¥1 move
// =============================================================================

export interface FiscalYearMetric {
  metric: string;
  plan: number;
  ytdActual: number;
  fullYearForecast: number;
  priorYear: number;
  unit: '¥B' | '%' | '¥/share' | 'count';
  isCost: boolean;       // true = lower is favorable
}

export interface QuarterlyBreakdown {
  quarter: string;       // "Q1 FY26"
  plan: number;
  actual: number | null; // null for forecast quarters
  forecast: number | null;
  priorYear: number;
}

export interface FiscalYearPlanData {
  fiscalYear: string;
  currentQuarter: string;
  quartersComplete: number;
  totalQuarters: number;
  daysThroughYear: number;
  totalDaysInYear: 365;
  metrics: FiscalYearMetric[];
  revenueByQuarter: QuarterlyBreakdown[];
  operatingIncomeByQuarter: QuarterlyBreakdown[];
  marginByQuarter: QuarterlyBreakdown[];
}

function generateFiscalYearPlan(): FiscalYearPlanData {
  return {
    fiscalYear: 'FY26',
    currentQuarter: 'Q1 FY26',
    quartersComplete: 1, // Q1 FY26 reported (first quarter Apr–Jun 2025)
    totalQuarters: 4,
    daysThroughYear: 91, // ~91 days through FY26 (end of Q1 = June 30)
    totalDaysInYear: 365,

    metrics: [
      {
        // FY26 guidance ¥2,210B; Q1 FY26 actual ¥558B
        metric: 'Total Revenue',
        plan: 2180, ytdActual: 558.0, fullYearForecast: 2210,
        priorYear: 2139, unit: '¥B', isCost: false,
      },
      {
        // XTANDI franchise ¥960.8B FY25 → ~¥950B FY26 (IRA price headwind)
        metric: 'XTANDI Net Sales',
        plan: 962, ytdActual: 246.0, fullYearForecast: 950,
        priorYear: 960.8, unit: '¥B', isCost: false,
      },
      {
        // PADCEV franchise ¥221.2B FY25 → ¥266B FY26 (label expansion)
        metric: 'PADCEV Net Sales',
        plan: 255, ytdActual: 65.0, fullYearForecast: 266,
        priorYear: 221.2, unit: '¥B', isCost: false,
      },
      {
        // Cost of Sales ~20-21% of revenue
        metric: 'Cost of Sales',
        plan: 452, ytdActual: 119.0, fullYearForecast: 456,
        priorYear: 442, unit: '¥B', isCost: true,
      },
      {
        // Gross Margin ~79% of revenue
        metric: 'Gross Profit',
        plan: 1728, ytdActual: 439.0, fullYearForecast: 1754,
        priorYear: 1697, unit: '¥B', isCost: false,
      },
      {
        // R&D ~20.7% of revenue; growing with pipeline
        metric: 'R&D Expense',
        plan: 453, ytdActual: 113.0, fullYearForecast: 457,
        priorYear: 443, unit: '¥B', isCost: true,
      },
      {
        // SG&A declining with SMT savings ¥40B run-rate FY26
        metric: 'SG&A Expense',
        plan: 460, ytdActual: 114.0, fullYearForecast: 451,
        priorYear: 467, unit: '¥B', isCost: true,
      },
      {
        // SMT transformation savings ¥21B FY25 → ¥40B FY26 run-rate
        metric: 'SMT Savings (Run-Rate)',
        plan: 38, ytdActual: 9.5, fullYearForecast: 40,
        priorYear: 21, unit: '¥B', isCost: false,
      },
      {
        // Core OP: Q1 FY26 actual ¥148.5B; FY26 guidance ¥580B
        metric: 'Core Operating Profit',
        plan: 568, ytdActual: 148.5, fullYearForecast: 580,
        priorYear: 555.7, unit: '¥B', isCost: false,
      },
      {
        // Core OP margin: FY26 ~26.2%
        metric: 'Core Operating Margin',
        plan: 26.0, ytdActual: 26.6, fullYearForecast: 26.2,
        priorYear: 26.0, unit: '%', isCost: false,
      },
      {
        // Core NI: Core OP × (1 – 25% effective tax rate)
        metric: 'Core Net Income',
        plan: 426, ytdActual: 111.4, fullYearForecast: 435,
        priorYear: 416.8, unit: '¥B', isCost: false,
      },
      {
        // Core EPS (¥): FY25 ¥237; FY26 guidance ¥250
        metric: 'Core EPS',
        plan: 245, ytdActual: 60.0, fullYearForecast: 250,
        priorYear: 237, unit: '¥/share', isCost: false,
      },
      {
        // CapEx: manufacturing capacity for biologics scale-up
        metric: 'Capital Expenditures',
        plan: 115, ytdActual: 28.5, fullYearForecast: 118,
        priorYear: 108, unit: '¥B', isCost: true,
      },
      {
        // R&D intensity ratio (R&D / Revenue)
        metric: 'R&D Intensity (%)',
        plan: 20.8, ytdActual: 20.3, fullYearForecast: 20.7,
        priorYear: 20.7, unit: '%', isCost: false,
      },
      {
        // Japan segment: stable; subject to biennial NHI pricing
        metric: 'Japan Segment Revenue',
        plan: 592, ytdActual: 147.5, fullYearForecast: 591,
        priorYear: 582, unit: '¥B', isCost: false,
      },
    ],

    revenueByQuarter: [
      // Q1 FY26: actual ¥558B vs plan ¥552B; prior year Q1 FY25 ¥542B
      { quarter: 'Q1 FY26', plan: 552.0, actual: 558.0, forecast: 558.0, priorYear: 542.0 },
      // Q2 FY26: seasonally softer (Jul–Sep); forecast ¥540B
      { quarter: 'Q2 FY26', plan: 538.0, actual: null, forecast: 540.0, priorYear: 520.5 },
      // Q3 FY26: picking up (Oct–Dec); forecast ¥549.5B
      { quarter: 'Q3 FY26', plan: 545.0, actual: null, forecast: 549.5, priorYear: 530.2 },
      // Q4 FY26: Japan year-end surge; forecast ¥562.5B
      { quarter: 'Q4 FY26', plan: 545.0, actual: null, forecast: 562.5, priorYear: 546.5 },
    ],

    operatingIncomeByQuarter: [
      // Q1 FY26: actual ¥148.5B vs plan ¥146B; prior year Q1 FY25 ¥142B
      { quarter: 'Q1 FY26', plan: 146.0, actual: 148.5, forecast: 148.5, priorYear: 142.0 },
      // Q2 FY26: slightly softer; R&D spend picks up
      { quarter: 'Q2 FY26', plan: 138.5, actual: null, forecast: 140.0, priorYear: 134.5 },
      // Q3 FY26: steady; pipeline trials at peak expense
      { quarter: 'Q3 FY26', plan: 135.0, actual: null, forecast: 138.0, priorYear: 130.2 },
      // Q4 FY26: Japan year-end + SMT full contribution
      { quarter: 'Q4 FY26', plan: 148.5, actual: null, forecast: 153.5, priorYear: 149.0 },
    ],

    marginByQuarter: [
      // Q1 FY26: actual Core OP margin 26.6% vs plan 26.4%
      { quarter: 'Q1 FY26', plan: 26.4, actual: 26.6, forecast: 26.6, priorYear: 26.2 },
      // Q2 FY26: margin softer seasonally
      { quarter: 'Q2 FY26', plan: 25.7, actual: null, forecast: 25.9, priorYear: 25.8 },
      // Q3 FY26: stable margin
      { quarter: 'Q3 FY26', plan: 24.8, actual: null, forecast: 25.1, priorYear: 24.6 },
      // Q4 FY26: Japan seasonal lift to margin
      { quarter: 'Q4 FY26', plan: 27.2, actual: null, forecast: 27.3, priorYear: 27.3 },
    ],
  };
}

// =============================================================================
// FY24 / FY25 HISTORICAL DATA — Astellas Pharma Inc.
// =============================================================================

export interface HistoricalFiscalYear {
  fiscalYear: string;
  revenue: number;       // ¥B
  operatingIncome: number; // ¥B (Core OP)
  netIncome: number;     // ¥B (Core NI)
  eps: number;           // Core EPS (¥)
  capex: number;         // ¥B
  rateBase: number;      // ¥B (total assets proxy — for compatibility)
  quarters: {
    quarter: string;
    revenue: number;
    operatingIncome: number;
    eps: number;
  }[];
}

export const HISTORICAL_FISCAL_YEARS: HistoricalFiscalYear[] = [
  {
    // FY24: Revenue ¥1,983.2B, Core OP ¥479.8B, Core EPS ¥206
    fiscalYear: 'FY24',
    revenue: 1983.2,
    operatingIncome: 479.8,
    netIncome: 359.9,
    eps: 206,
    capex: 98.5,
    rateBase: 2850.0, // total assets proxy
    quarters: [
      { quarter: 'Q1 FY24', revenue: 498.5, operatingIncome: 120.5, eps: 49.5 },
      { quarter: 'Q2 FY24', revenue: 481.2, operatingIncome: 111.8, eps: 46.0 },
      { quarter: 'Q3 FY24', revenue: 492.0, operatingIncome: 116.5, eps: 48.5 },
      { quarter: 'Q4 FY24', revenue: 511.5, operatingIncome: 131.0, eps: 62.0 },
    ],
  },
  {
    // FY25: Revenue ¥2,139.2B, Core OP ¥555.7B, Core EPS ¥237
    fiscalYear: 'FY25',
    revenue: 2139.2,
    operatingIncome: 555.7,
    netIncome: 416.8,
    eps: 237,
    capex: 108.0,
    rateBase: 3120.0,
    quarters: [
      { quarter: 'Q1 FY25', revenue: 542.0, operatingIncome: 142.0, eps: 57.5 },
      { quarter: 'Q2 FY25', revenue: 520.5, operatingIncome: 134.5, eps: 54.5 },
      { quarter: 'Q3 FY25', revenue: 530.2, operatingIncome: 130.2, eps: 52.5 },
      { quarter: 'Q4 FY25', revenue: 546.5, operatingIncome: 149.0, eps: 72.5 },
    ],
  },
  {
    // FY26: Q1 actual + Q2–Q4 forecast; Core EPS guidance ¥250
    fiscalYear: 'FY26',
    revenue: 2210.0,
    operatingIncome: 580.0,
    netIncome: 435.0,
    eps: 250,
    capex: 118.0,
    rateBase: 3310.0,
    quarters: [
      { quarter: 'Q1 FY26', revenue: 558.0, operatingIncome: 148.5, eps: 60.0 },
      { quarter: 'Q2 FY26', revenue: 540.0, operatingIncome: 140.0, eps: 56.5 },
      { quarter: 'Q3 FY26', revenue: 549.5, operatingIncome: 138.0, eps: 55.5 },
      { quarter: 'Q4 FY26', revenue: 562.5, operatingIncome: 153.5, eps: 78.0 },
    ],
  },
];

let _cached: FiscalYearPlanData | null = null;

export function getFiscalYearPlanData(): FiscalYearPlanData {
  if (_cached) return _cached;
  _cached = generateFiscalYearPlan();
  return _cached;
}

export function getHistoricalFiscalYear(fy: string): HistoricalFiscalYear | undefined {
  return HISTORICAL_FISCAL_YEARS.find(h => h.fiscalYear === fy);
}
