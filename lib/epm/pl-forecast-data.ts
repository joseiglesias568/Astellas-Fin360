// =============================================================================
// 18-Month P&L Forecast Data Generator
// Generates realistic Astellas Pharma Inc. quarterly P&L forecasts with driver decomposition
// All values in ¥B unless otherwise noted
// Fiscal year: April–March (Q1 FY25 = Apr–Jun 2025). Five geographic segments.
//
// Astellas consolidated P&L anchored to:
// FY25 actuals: Revenue ¥2,139.2B, Core OP ¥555.7B (26% margin), Core EPS ¥237
// FY26 guidance: Revenue ¥2,210B (+3.3%), Core OP ¥580B (+4.4%), Core EPS ¥250
// FY27 targets: PADCEV ramp (+¥45B), SMT savings ¥40B; XTANDI IRA price risk –¥9.6B/1pp cut
// FX baseline: ¥151/USD; ¥2.1B Core OP per ¥1 move
// =============================================================================

// Canonical P&L line item order — Astellas Pharma Inc.
export const PL_LINE_ITEMS = [
  'Revenue',
  'Cost of Sales',
  'Gross Profit',
  'R&D Expense',
  'SG&A Expense',
  'Total Operating Expenses',
  'Core Operating Profit',
  'Core Net Income',
  'Core EPS',
] as const;

export type PLLineItem = (typeof PL_LINE_ITEMS)[number];

// Computed lines (derived from other lines, not directly forecasted)
export const COMPUTED_LINES: PLLineItem[] = [
  'Gross Profit',
  'Total Operating Expenses',
  'Core Operating Profit',
  'Core Net Income',
];

export const INDENT_LINES: PLLineItem[] = [
  'Cost of Sales',
  'R&D Expense',
  'SG&A Expense',
];

export const BOLD_LINES: PLLineItem[] = [
  'Revenue',
  'Gross Profit',
  'Total Operating Expenses',
  'Core Operating Profit',
  'Core Net Income',
  'Core EPS',
];

// Driver definitions per P&L line — Astellas Pharma Inc.
export const REVENUE_DRIVERS = [
  'XTANDI Revenue (Prostate Cancer Franchise)',
  'PADCEV Revenue (Bladder Cancer Franchise)',
  'VEOZAH Revenue (Women\'s Health)',
  'IZERVAY Revenue (Retinal Disease)',
  'VYLOY Revenue (Gastric Cancer)',
  'Japan Segment Revenue',
  'FX Impact on Revenue (¥/USD)',
] as const;

export const COGS_DRIVERS = [
  'Manufacturing COGS (Biologics & Small Molecule)',
  'Product Mix Shift (Higher-Cost Biologics Weight)',
  'Supply Chain & Distribution Cost',
] as const;

export const OPEX_DRIVERS = [
  'R&D Investment (Pipeline & Phase Programs)',
  'SG&A Net of SMT Savings',
  'Medical Affairs & Market Access Spend',
  'SMT Transformation Program Savings',
] as const;

export type DriverName = (typeof REVENUE_DRIVERS)[number] | (typeof COGS_DRIVERS)[number] | (typeof OPEX_DRIVERS)[number];

export function getDriversForLine(lineItem: PLLineItem): readonly string[] {
  switch (lineItem) {
    case 'Revenue': return REVENUE_DRIVERS;
    case 'Cost of Sales': return COGS_DRIVERS;
    case 'R&D Expense':
    case 'SG&A Expense':
    case 'Total Operating Expenses': return OPEX_DRIVERS;
    default: return [];
  }
}

// Period types — Astellas fiscal year April–March
export interface PLPeriod {
  label: string;       // "Q1 FY25"
  fiscalYear: string;  // "FY25"
  quarter: number;     // 1-4
  isHistorical: boolean;
  isCurrent: boolean;
  isForecast: boolean;
}

export interface PLForecastRow {
  lineItem: PLLineItem;
  values: Record<string, number>;           // periodLabel -> value (¥B)
  confidence: Record<string, number>;       // periodLabel -> 0-100 confidence
  lowerBound: Record<string, number>;       // periodLabel -> lower CI
  upperBound: Record<string, number>;       // periodLabel -> upper CI
}

export interface DriverForecastRow {
  driverName: string;
  parentLine: PLLineItem;
  unit: string;                             // "%", "¥B", "count", "bps"
  values: Record<string, number>;           // periodLabel -> value
  impactOnParent: Record<string, number>;   // periodLabel -> ¥B contribution
}

export interface PLForecastData {
  periods: PLPeriod[];
  rows: PLForecastRow[];
  drivers: DriverForecastRow[];
  modelAccuracy: {
    lineItem: PLLineItem;
    mape: number;
    bestModel: string;
    confidence: number;
  }[];
}

// =============================================================================
// DATA GENERATION — Astellas Pharma Inc.
// All quarterly values in ¥B. Revenue scale: ~¥500–580B/quarter.
// Q1 (Apr–Jun) and Q4 (Jan–Mar) are seasonally stronger due to Japan fiscal timing.
// FX baseline ¥151/USD; ¥2.1B Core OP per ¥1 move.
// =============================================================================

function generatePeriods(): PLPeriod[] {
  return [
    { label: 'Q1 FY25', fiscalYear: 'FY25', quarter: 1, isHistorical: true,  isCurrent: false, isForecast: false },
    { label: 'Q2 FY25', fiscalYear: 'FY25', quarter: 2, isHistorical: true,  isCurrent: false, isForecast: false },
    { label: 'Q3 FY25', fiscalYear: 'FY25', quarter: 3, isHistorical: true,  isCurrent: false, isForecast: false },
    { label: 'Q4 FY25', fiscalYear: 'FY25', quarter: 4, isHistorical: true,  isCurrent: false, isForecast: false },
    { label: 'Q1 FY26', fiscalYear: 'FY26', quarter: 1, isHistorical: false, isCurrent: true,  isForecast: false },
    { label: 'Q2 FY26', fiscalYear: 'FY26', quarter: 2, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q3 FY26', fiscalYear: 'FY26', quarter: 3, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q4 FY26', fiscalYear: 'FY26', quarter: 4, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q1 FY27', fiscalYear: 'FY27', quarter: 1, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q2 FY27', fiscalYear: 'FY27', quarter: 2, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q3 FY27', fiscalYear: 'FY27', quarter: 3, isHistorical: false, isCurrent: false, isForecast: true  },
    { label: 'Q4 FY27', fiscalYear: 'FY27', quarter: 4, isHistorical: false, isCurrent: false, isForecast: true  },
  ];
}

// Quarterly Revenue (¥B) — FY25 total ¥2,139.2B; FY26 guidance ¥2,210B; FY27 projected ¥2,310B
// Q1/Q4 seasonally higher (Japan fiscal year-end buying & US January plan resets)
const QUARTERLY_REVENUE = [
  542.0, 520.5, 530.2, 546.5,   // FY25 (~¥2,139.2B; XTANDI ¥960.8B full-year cornerstone)
  558.0, 540.0, 549.5, 562.5,   // FY26 (~¥2,210B; PADCEV ramp +¥45B YoY; SMT savings +¥19B)
  582.0, 560.5, 571.0, 596.5,   // FY27 (~¥2,310B; VEOZAH launch inflection; PADCEV ¥320B+ run-rate)
];

// Core Operating Profit (¥B) — FY25 ¥555.7B; FY26 guidance ¥580B; FY27 ~¥620B
// Q1 strongest (lower R&D spend timing); Q3 softest (peak clinical trial expense)
const QUARTERLY_CORE_OP = [
  142.0, 134.5, 130.2, 149.0,   // FY25 (~¥555.7B; 26% margin; XTANDI IRA risk begins FY26)
  148.5, 140.0, 138.0, 153.5,   // FY26 (~¥580B; PADCEV lift +¥11B; FX headwind –¥28B; SMT +¥19B)
  158.0, 150.5, 147.0, 164.5,   // FY27 (~¥620B; full SMT ¥40B; PADCEV ¥320B; VEOZAH ¥45B)
];

// R&D Expense (¥B) — ~20-21% of revenue; peak in Q3 (phase trial readouts)
const RD_BASE = [
  109.5, 111.2, 115.0, 108.3,   // FY25 (~¥444B annual; ~20.7% R&D intensity)
  113.0, 114.5, 118.0, 111.5,   // FY26 (~¥457B; PADCEV additional studies + VEOZAH label expansion)
  116.0, 117.8, 121.5, 115.2,   // FY27 (~¥470.5B; new molecular entity Phase 3 + IZERVAY studies)
];

// SG&A Expense (¥B) — declining with SMT savings ¥21B FY25 → ¥40B FY26 run-rate
const SGA_BASE = [
  118.5, 116.0, 117.2, 115.3,   // FY25 (~¥467B annual; pre-full SMT benefit)
  114.0, 112.5, 113.0, 111.5,   // FY26 (~¥451B; SMT ¥40B run-rate savings partially realized)
  109.8, 108.2, 108.8, 107.2,   // FY27 (~¥434B; full ¥40B SMT benefit + commercialization efficiency)
];

// Effective tax rate — ~25% (Astellas Japan corporate tax + international blend)
const EFFECTIVE_TAX_RATE = 0.25;

// Diluted shares (M) — ~4,400M ADS equivalent; modest buybacks
const SHARES_OUTSTANDING = [
  4420, 4415, 4410, 4405,   // FY25
  4400, 4398, 4396, 4394,   // FY26 (buyback program ~¥50B/yr)
  4385, 4380, 4375, 4370,   // FY27 (continued ¥50B buyback)
];

function generatePLRows(periods: PLPeriod[]): PLForecastRow[] {
  const makeRow = (lineItem: PLLineItem): PLForecastRow => ({
    lineItem,
    values: {},
    confidence: {},
    lowerBound: {},
    upperBound: {},
  });

  const revenue    = makeRow('Revenue');
  const cogs       = makeRow('Cost of Sales');
  const grossProfit = makeRow('Gross Profit');
  const rd         = makeRow('R&D Expense');
  const sga        = makeRow('SG&A Expense');
  const totalOpex  = makeRow('Total Operating Expenses');
  const coreOp     = makeRow('Core Operating Profit');
  const coreNI     = makeRow('Core Net Income');
  const coreEps    = makeRow('Core EPS');

  periods.forEach((p, i) => {
    const k = p.label;
    const forecastDist = p.isForecast ? Math.min(i - 4, 7) : 0;
    const conf = p.isHistorical ? 100 : p.isCurrent ? 97 : Math.max(60, 95 - forecastDist * 5);
    // Pharma: moderate variability driven by FX and XTANDI IRA risk
    const bandWidth = p.isHistorical ? 0 : p.isCurrent ? 0.003 : 0.015 + forecastDist * 0.008;

    // Revenue
    const rev = QUARTERLY_REVENUE[i];
    revenue.values[k] = rev;
    revenue.confidence[k] = conf;
    revenue.lowerBound[k] = parseFloat((rev * (1 - bandWidth)).toFixed(1));
    revenue.upperBound[k] = parseFloat((rev * (1 + bandWidth)).toFixed(1));

    // Core Operating Profit
    const coOp = QUARTERLY_CORE_OP[i];
    coreOp.values[k] = coOp;
    coreOp.confidence[k] = Math.max(conf - 5, 55); // FX + XTANDI IRA risk wider
    coreOp.lowerBound[k] = parseFloat((coOp * (1 - bandWidth * 2.0)).toFixed(1));
    coreOp.upperBound[k] = parseFloat((coOp * (1 + bandWidth * 1.4)).toFixed(1));

    // R&D Expense
    const rdVal = RD_BASE[i];
    rd.values[k] = rdVal;
    rd.confidence[k] = Math.max(conf - 3, 62);
    rd.lowerBound[k] = parseFloat((rdVal * (1 - bandWidth * 0.8)).toFixed(1));
    rd.upperBound[k] = parseFloat((rdVal * (1 + bandWidth * 0.8)).toFixed(1));

    // SG&A Expense
    const sgaVal = SGA_BASE[i];
    sga.values[k] = sgaVal;
    sga.confidence[k] = Math.max(conf - 2, 64);
    sga.lowerBound[k] = parseFloat((sgaVal * (1 - bandWidth * 0.6)).toFixed(1));
    sga.upperBound[k] = parseFloat((sgaVal * (1 + bandWidth * 0.6)).toFixed(1));

    // Cost of Sales = Revenue – Gross Profit (Gross Profit = Core OP + R&D + SG&A)
    const gpVal = coOp + rdVal + sgaVal;
    grossProfit.values[k] = parseFloat(gpVal.toFixed(1));
    grossProfit.confidence[k] = conf;
    grossProfit.lowerBound[k] = parseFloat((coreOp.lowerBound[k] + rd.lowerBound[k] + sga.lowerBound[k]).toFixed(1));
    grossProfit.upperBound[k] = parseFloat((coreOp.upperBound[k] + rd.upperBound[k] + sga.upperBound[k]).toFixed(1));

    const cogsVal = parseFloat((rev - gpVal).toFixed(1));
    cogs.values[k] = cogsVal;
    cogs.confidence[k] = Math.max(conf - 4, 58);
    cogs.lowerBound[k] = parseFloat((revenue.lowerBound[k] - grossProfit.upperBound[k]).toFixed(1));
    cogs.upperBound[k] = parseFloat((revenue.upperBound[k] - grossProfit.lowerBound[k]).toFixed(1));

    // Total Operating Expenses = R&D + SG&A + COGS
    const opexVal = parseFloat((rdVal + sgaVal + cogsVal).toFixed(1));
    totalOpex.values[k] = opexVal;
    totalOpex.confidence[k] = conf;
    totalOpex.lowerBound[k] = parseFloat((rd.lowerBound[k] + sga.lowerBound[k] + cogs.lowerBound[k]).toFixed(1));
    totalOpex.upperBound[k] = parseFloat((rd.upperBound[k] + sga.upperBound[k] + cogs.upperBound[k]).toFixed(1));

    // Core Net Income = Core OP × (1 – tax rate)
    const cni = parseFloat((coOp * (1 - EFFECTIVE_TAX_RATE)).toFixed(1));
    coreNI.values[k] = cni;
    coreNI.confidence[k] = Math.max(conf - 5, 53);
    coreNI.lowerBound[k] = parseFloat((coreOp.lowerBound[k] * (1 - EFFECTIVE_TAX_RATE)).toFixed(1));
    coreNI.upperBound[k] = parseFloat((coreOp.upperBound[k] * (1 - EFFECTIVE_TAX_RATE)).toFixed(1));

    // Core EPS (¥) = Core NI (¥B) × 1000 ÷ Shares (M)  → individual share value in ¥
    const shares = SHARES_OUTSTANDING[i] ?? 4400;
    const epsVal = parseFloat(((cni * 1000) / shares).toFixed(1));
    coreEps.values[k] = epsVal;
    coreEps.confidence[k] = coreNI.confidence[k];
    coreEps.lowerBound[k] = parseFloat(((coreNI.lowerBound[k] * 1000) / shares).toFixed(1));
    coreEps.upperBound[k] = parseFloat(((coreNI.upperBound[k] * 1000) / shares).toFixed(1));
  });

  return [revenue, cogs, grossProfit, rd, sga, totalOpex, coreOp, coreNI, coreEps];
}

function generateDrivers(periods: PLPeriod[]): DriverForecastRow[] {
  const drivers: DriverForecastRow[] = [];

  // Revenue drivers — Astellas product franchise decomposition
  // XTANDI: ¥960.8B FY25 (~45% of product revenue); IRA price negotiation risk effective 2026
  const xtandiRev: DriverForecastRow = { driverName: 'XTANDI Revenue (Prostate Cancer Franchise)', parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const padcevRev: DriverForecastRow = { driverName: 'PADCEV Revenue (Bladder Cancer Franchise)',   parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const veozahRev: DriverForecastRow = { driverName: 'VEOZAH Revenue (Women\'s Health)',            parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const izervayRev: DriverForecastRow = { driverName: 'IZERVAY Revenue (Retinal Disease)',          parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const vyloyRev: DriverForecastRow = { driverName: 'VYLOY Revenue (Gastric Cancer)',               parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const japanRev: DriverForecastRow = { driverName: 'Japan Segment Revenue',                        parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };
  const fxImpact: DriverForecastRow = { driverName: 'FX Impact on Revenue (¥/USD)',                 parentLine: 'Revenue', unit: '¥B', values: {}, impactOnParent: {} };

  // XTANDI: ¥960.8B FY25 → ¥950B FY26 (–¥9.6B IRA 1pp price cut) → ¥940B FY27 (further IRA step-down)
  const xtandi = [238.0, 241.5, 240.0, 241.3,  246.0, 238.5, 232.0, 233.5,  230.0, 226.5, 225.0, 258.5];
  // PADCEV: ¥221.2B FY25 → ¥266B FY26 (+¥45B from label expansion + market share) → ¥320B FY27
  const padcev  = [52.0, 54.5, 56.3, 58.4,    65.0, 66.5, 67.0, 67.5,    77.0, 79.5, 80.5, 83.0];
  // VEOZAH: pre-launch FY25 → launch ¥18B FY26 → ¥45B FY27 ramp
  const veozah  = [1.5,  2.0,  2.5,  3.0,     3.5,  4.0,  5.0,  5.5,     8.0,  10.5, 12.5, 14.0];
  // IZERVAY: ¥12B FY25 → ¥22B FY26 (US market ramp) → ¥38B FY27
  const izervay = [2.5,  2.8,  3.2,  3.5,     4.5,  5.2,  6.0,  6.3,     8.5,  9.5,  9.8,  10.2];
  // VYLOY: Japan approval FY25 → ¥15B FY26 → ¥28B FY27 (ex-Japan approval)
  const vyloy   = [2.0,  2.5,  3.0,  4.0,     3.5,  3.8,  3.9,  3.8,     6.5,  6.8,  7.2,  7.5];
  // Japan segment: stable ¥580–600B/yr; Astellas domestic franchise + distribution
  const japan   = [146.0, 140.5, 143.5, 152.0,  147.5, 143.0, 146.5, 154.0,  149.5, 145.5, 148.5, 157.5];
  // FX impact (quarterly YoY): sensitive to ¥/USD moves; ¥2.1B Core OP per ¥1 (scaled 4× for revenue)
  const fx = [8.0, -4.0, -6.5, -10.0,  -12.0, -8.5, -5.0, -3.0,  2.0, -1.5, -2.5, -4.5];

  periods.forEach((p, i) => {
    const k = p.label;
    xtandiRev.values[k]  = xtandi[i];  xtandiRev.impactOnParent[k]  = xtandi[i]  - (xtandi[i-1]  || xtandi[0]);
    padcevRev.values[k]  = padcev[i];  padcevRev.impactOnParent[k]  = padcev[i]  - (padcev[i-1]  || padcev[0]);
    veozahRev.values[k]  = veozah[i];  veozahRev.impactOnParent[k]  = veozah[i]  - (veozah[i-1]  || veozah[0]);
    izervayRev.values[k] = izervay[i]; izervayRev.impactOnParent[k] = izervay[i] - (izervay[i-1] || izervay[0]);
    vyloyRev.values[k]   = vyloy[i];   vyloyRev.impactOnParent[k]   = vyloy[i]   - (vyloy[i-1]   || vyloy[0]);
    japanRev.values[k]   = japan[i];   japanRev.impactOnParent[k]   = japan[i]   - (japan[i-1]   || japan[0]);
    fxImpact.values[k]   = fx[i];      fxImpact.impactOnParent[k]   = fx[i];
  });

  drivers.push(xtandiRev, padcevRev, veozahRev, izervayRev, vyloyRev, japanRev, fxImpact);

  // Cost of Sales drivers — pharma manufacturing decomposition
  const cogsDriverDefs = [
    { name: 'Manufacturing COGS (Biologics & Small Molecule)', unit: '¥B', base: [76.0, 73.5, 75.5, 74.0, 78.5, 76.0, 78.0, 77.5, 81.5, 79.0, 81.0, 80.5] },
    { name: 'Product Mix Shift (Higher-Cost Biologics Weight)', unit: '¥B', base: [28.5, 29.0, 30.0, 31.0, 33.0, 34.0, 35.5, 36.5, 37.5, 38.5, 39.5, 40.5] },
    { name: 'Supply Chain & Distribution Cost', unit: '¥B', base: [14.5, 13.8, 14.2, 14.5, 14.8, 14.3, 14.5, 14.8, 15.0, 14.8, 15.0, 15.2] },
  ];

  for (const def of cogsDriverDefs) {
    const d: DriverForecastRow = { driverName: def.name, parentLine: 'Cost of Sales', unit: def.unit, values: {}, impactOnParent: {} };
    periods.forEach((p, i) => {
      d.values[p.label] = def.base[i];
      d.impactOnParent[p.label] = def.base[i] - (def.base[i - 1] || def.base[0]);
    });
    drivers.push(d);
  }

  // OpEx drivers — Astellas pharma cost decomposition
  const opexDriverDefs = [
    { name: 'R&D Investment (Pipeline & Phase Programs)', unit: '¥B', base: [109.5, 111.2, 115.0, 108.3, 113.0, 114.5, 118.0, 111.5, 116.0, 117.8, 121.5, 115.2] },
    { name: 'SG&A Net of SMT Savings', unit: '¥B', base: [118.5, 116.0, 117.2, 115.3, 114.0, 112.5, 113.0, 111.5, 109.8, 108.2, 108.8, 107.2] },
    { name: 'Medical Affairs & Market Access Spend', unit: '¥B', base: [18.5, 17.8, 18.2, 17.5, 18.0, 17.5, 17.8, 17.2, 17.5, 17.0, 17.3, 16.8] },
    { name: 'SMT Transformation Program Savings', unit: '¥B', base: [-5.0, -5.2, -5.3, -5.5, -9.5, -10.0, -10.2, -10.3, -9.8, -10.0, -10.2, -10.0] },
  ];

  for (const def of opexDriverDefs) {
    const d: DriverForecastRow = { driverName: def.name, parentLine: 'Total Operating Expenses', unit: def.unit, values: {}, impactOnParent: {} };
    periods.forEach((p, i) => {
      d.values[p.label] = def.base[i];
      d.impactOnParent[p.label] = def.base[i] - (def.base[i - 1] || def.base[0]);
    });
    drivers.push(d);
  }

  return drivers;
}

function generateModelAccuracy(): PLForecastData['modelAccuracy'] {
  return [
    { lineItem: 'Revenue',               mape: 1.4, bestModel: 'XGBoost Ensemble',              confidence: 95 },
    { lineItem: 'Cost of Sales',          mape: 2.1, bestModel: 'ARIMA + Manufacturing Cost Curve', confidence: 91 },
    { lineItem: 'Gross Profit',           mape: 1.8, bestModel: 'XGBoost Ensemble',              confidence: 93 },
    { lineItem: 'R&D Expense',            mape: 2.5, bestModel: 'Phase-Weighted ARIMA',          confidence: 89 },
    { lineItem: 'SG&A Expense',           mape: 1.3, bestModel: 'ARIMA + SMT Tracker',           confidence: 94 },
    { lineItem: 'Total Operating Expenses', mape: 1.9, bestModel: 'XGBoost Ensemble',            confidence: 92 },
    { lineItem: 'Core Operating Profit',  mape: 3.5, bestModel: 'XGBoost + FX Sensitivity Model', confidence: 87 },
    { lineItem: 'Core Net Income',        mape: 3.8, bestModel: 'XGBoost Ensemble',              confidence: 85 },
    { lineItem: 'Core EPS',               mape: 3.9, bestModel: 'XGBoost Ensemble',              confidence: 84 },
  ];
}

// =============================================================================
// PUBLIC API
// =============================================================================

let _cached: PLForecastData | null = null;

export function getPLForecastData(): PLForecastData {
  if (_cached) return _cached;
  const periods = generatePeriods();
  _cached = {
    periods,
    rows: generatePLRows(periods),
    drivers: generateDrivers(periods),
    modelAccuracy: generateModelAccuracy(),
  };
  return _cached;
}

export function getAnnualRollup(data: PLForecastData, fiscalYear: string): Record<PLLineItem, number> {
  const result = {} as Record<PLLineItem, number>;
  const fyPeriods = data.periods.filter(p => p.fiscalYear === fiscalYear).map(p => p.label);

  for (const row of data.rows) {
    result[row.lineItem] = parseFloat(fyPeriods.reduce((sum, k) => sum + (row.values[k] || 0), 0).toFixed(1));
  }
  return result;
}

export function getTimeSeriesForLine(
  data: PLForecastData,
  lineItem: PLLineItem,
): { period: string; forecast: number; actual: number | null; lower: number; upper: number; confidence: number }[] {
  const row = data.rows.find(r => r.lineItem === lineItem);
  if (!row) return [];

  return data.periods.map(p => ({
    period: p.label,
    forecast: row.values[p.label],
    actual: (p.isHistorical || p.isCurrent) ? row.values[p.label] : null,
    lower: row.lowerBound[p.label],
    upper: row.upperBound[p.label],
    confidence: row.confidence[p.label],
  }));
}
