import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 19: Extended Fiscal Periods — Astellas Pharma Inc. (TSE: 4503 / ALPMY)
// Adds Q1-Q4 FY24, FY24 annual, Q2 FY25, Q3 FY25
// Creates QuarterlyResult, FinancialStatement, SegmentResult, RevenueBridgeItem,
// and KPIValue records for each new period.
//
// Astellas fiscal year: April-March (FY24 = April 2024 – March 2025)
//   Q1 = Apr-Jun | Q2 = Jul-Sep | Q3 = Oct-Dec | Q4 = Jan-Mar
// FY24 total revenue: ¥1,913.0B (Q1 ¥494.2B, Q2 ¥484.3B, Q3 ¥480.1B, Q4 ¥454.4B)
// Q2 FY25 actual: ¥537.0B (+10.9% YoY), Core EPS ¥59.14, Core OP ¥138.5B (25.8%)
// Q3 FY25 actual: ¥527.1B (+9.8% YoY), Core EPS ¥71.18, Core OP ¥172.8B (32.8%)
// Segments (geographic): United States, Established Markets, Japan, International Markets, China
// Revenue in ¥B; financial statements in ¥M.
// compStoreSales repurposed → XTANDI YoY growth %
// netNewStores repurposed → Strategic Brands quarterly revenue (¥B)
// =============================================================================

const NEW_QUARTER_LABELS = [
  'Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24',
  'Q2 FY25', 'Q3 FY25',
];

const NEW_ANNUAL_LABELS = ['FY24'];

// ── Period Definitions ────────────────────────────────────────────────────────
const newPeriods = [
  // Astellas fiscal year: April-March
  { label: 'Q1 FY24', year: 2024, quarter: 1, type: 'quarter' }, // Apr-Jun 2024
  { label: 'Q2 FY24', year: 2024, quarter: 2, type: 'quarter' }, // Jul-Sep 2024
  { label: 'Q3 FY24', year: 2024, quarter: 3, type: 'quarter' }, // Oct-Dec 2024
  { label: 'Q4 FY24', year: 2024, quarter: 4, type: 'quarter' }, // Jan-Mar 2025
  { label: 'FY24',    year: 2024, quarter: null, type: 'annual' },
  // FY25 additional quarters (actual)
  { label: 'Q2 FY25', year: 2025, quarter: 2, type: 'quarter' }, // Jul-Sep 2025
  { label: 'Q3 FY25', year: 2025, quarter: 3, type: 'quarter' }, // Oct-Dec 2025
];

// ── Quarterly Results ─────────────────────────────────────────────────────────
// FY24: Astellas actual results — revenue ¥454–¥494B per quarter, ¥1,913B annual.
// Q2-Q3 FY25: actual results.
// compStoreSales repurposed → XTANDI YoY revenue growth %
// netNewStores repurposed → Strategic Brands combined quarterly revenue (¥B)
const quarterlyResults = [
  {
    period: 'Q1 FY24', // Apr-Jun 2024 — XTANDI leads; Japan NHI April repricing headwind
    revenue: 494.2,         // ¥494.2B
    revenueYoY: 8.8,
    operatingIncome: 111.2, // Core OP ¥111.2B (22.5% margin)
    operatingMargin: 22.5,
    eps: 47.2,              // Core EPS ¥47.20
    compStoreSales: 3.2,    // XTANDI YoY growth % Q1 FY24
    netNewStores: 82,       // Strategic Brands quarterly revenue (¥B): ¥82B Q1 FY24
  },
  {
    period: 'Q2 FY24', // Jul-Sep 2024 — steady commercial execution
    revenue: 484.3,
    revenueYoY: 7.5,
    operatingIncome: 115.3, // Core OP ¥115.3B (23.8% margin)
    operatingMargin: 23.8,
    eps: 46.1,
    compStoreSales: 4.1,    // XTANDI YoY growth %
    netNewStores: 89,       // Strategic Brands ¥B
  },
  {
    period: 'Q3 FY24', // Oct-Dec 2024 — Q3 highest-margin quarter; US year-end stocking
    revenue: 480.1,
    revenueYoY: 7.2,
    operatingIncome: 130.6, // Core OP ¥130.6B (27.2% margin)
    operatingMargin: 27.2,
    eps: 58.5,
    compStoreSales: 4.8,    // XTANDI YoY growth %
    netNewStores: 96,       // Strategic Brands ¥B
  },
  {
    period: 'Q4 FY24', // Jan-Mar 2025 — weakest quarter; China Lunar New Year destocking
    revenue: 454.4,
    revenueYoY: 7.8,
    operatingIncome: 88.6,  // Core OP ¥88.6B (19.5% margin)
    operatingMargin: 19.5,
    eps: 36.2,
    compStoreSales: 3.9,    // XTANDI YoY growth %
    netNewStores: 88,       // Strategic Brands ¥B
  },
  {
    period: 'Q2 FY25', // Jul-Sep 2025 — Strategic Brands acceleration
    revenue: 537.0,
    revenueYoY: 10.9,
    operatingIncome: 138.5, // Core OP ¥138.5B (25.8% margin)
    operatingMargin: 25.8,
    eps: 59.14,
    compStoreSales: 5.3,    // XTANDI YoY growth % Q2 FY25
    netNewStores: 118,      // Strategic Brands ¥B Q2 FY25
  },
  {
    period: 'Q3 FY25', // Oct-Dec 2025 — seasonally strongest quarter; highest Core OP margin
    revenue: 527.1,
    revenueYoY: 9.8,
    operatingIncome: 172.8, // Core OP ¥172.8B (32.8% margin)
    operatingMargin: 32.8,
    eps: 71.18,
    compStoreSales: 5.5,    // XTANDI YoY growth %
    netNewStores: 131,      // Strategic Brands ¥B
  },
];

// ── Segment Results (geographic) ──────────────────────────────────────────────
// Astellas geographic segments (exact names from 03-financials.ts):
//   'United States'         — ~44% of revenue; XTANDI/PADCEV/IZERVAY/VEOZAH
//   'Established Markets'   — ~26% of revenue; EU + Canada; XTANDI/PADCEV/VYLOY
//   'Japan'                 — ~14% of revenue; home market; NHI pricing
//   'International Markets' — ~11% of revenue; 40+ countries; expansion
//   'China'                 — ~5% of revenue; +29.6% YoY; VYLOY catalyst
// Revenue in ¥B.
const segmentData = [
  {
    period: 'Q1 FY24',
    us:    { rev: 217.4, yoy: 7.5, margin: 29.5 },
    em:    { rev: 130.5, yoy: 8.0, margin: 25.2 },
    japan: { rev: 68.5,  yoy: 5.0, margin: 21.8 }, // NHI April repricing
    intl:  { rev: 53.0,  yoy: 9.0, margin: 19.5 },
    china: { rev: 20.2,  yoy: 22.0, margin: 14.2 },
  },
  {
    period: 'Q2 FY24',
    us:    { rev: 212.6, yoy: 7.2, margin: 28.8 },
    em:    { rev: 129.6, yoy: 7.8, margin: 24.8 },
    japan: { rev: 66.4,  yoy: 4.5, margin: 22.5 },
    intl:  { rev: 53.0,  yoy: 8.5, margin: 19.8 },
    china: { rev: 19.8,  yoy: 24.0, margin: 13.8 },
  },
  {
    period: 'Q3 FY24',
    us:    { rev: 210.8, yoy: 7.0, margin: 31.2 }, // Q3 seasonal peak — year-end stocking
    em:    { rev: 128.5, yoy: 7.5, margin: 26.5 },
    japan: { rev: 65.9,  yoy: 4.2, margin: 24.8 }, // Q3 highest Japan margin
    intl:  { rev: 52.5,  yoy: 8.0, margin: 20.2 },
    china: { rev: 19.7,  yoy: 26.0, margin: 14.5 },
  },
  {
    period: 'Q4 FY24',
    us:    { rev: 199.4, yoy: 7.8, margin: 28.2 }, // Q4 softer (destocking)
    em:    { rev: 121.6, yoy: 8.2, margin: 23.5 },
    japan: { rev: 62.3,  yoy: 5.5, margin: 19.8 }, // Q4 weakest Japan (year-end)
    intl:  { rev: 49.7,  yoy: 9.5, margin: 18.5 },
    china: { rev: 18.6,  yoy: 28.0, margin: 12.8 }, // China pre-Lunar New Year stocking
  },
  {
    period: 'Q2 FY25',
    us:    { rev: 234.7, yoy: 10.4, margin: 30.5 }, // PADCEV/IZERVAY scaling
    em:    { rev: 143.2, yoy: 10.5, margin: 26.2 },
    japan: { rev: 72.1,  yoy: 8.6, margin: 23.0 },
    intl:  { rev: 58.3,  yoy: 10.0, margin: 20.5 },
    china: { rev: 26.3,  yoy: 32.8, margin: 15.2 }, // China fastest growing
  },
  {
    period: 'Q3 FY25',
    us:    { rev: 228.4, yoy: 8.3, margin: 36.2 }, // Q3 seasonally highest US margin
    em:    { rev: 141.3, yoy: 10.0, margin: 29.8 },
    japan: { rev: 71.6,  yoy: 8.6, margin: 26.5 },
    intl:  { rev: 57.8,  yoy: 10.1, margin: 22.0 },
    china: { rev: 26.9,  yoy: 36.5, margin: 16.8 },
  },
];

// ── Financial Statements (P&L lines in ¥M) — Astellas scale ──────────────────
// Revenue in ¥M. Cost structure (Core Operating basis):
//   COGS (manufacturing + royalties): ~22% of revenue
//   Operating Expenses (R&D ~19% + SG&A ~30% + amortization ~5%): ~54–57%
//   Core Operating Income: ~19.5–32.8%
//   Net Income: ~13–17% (effective tax rate ~28%)
const plData = [
  {
    period: 'Q1 FY24',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 494200, plan: 482000, priorYear: 454400, variance: 12200,  variancePercent: 2.5 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 108730, plan: 106000, priorYear: 100000, variance: -2730,  variancePercent: -2.6 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 385470, plan: 376000, priorYear: 354400, variance: 9470,   variancePercent: 2.5 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 274270, plan: 278000, priorYear: 261400, variance: 3730,   variancePercent: 1.3 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 111200, plan: 98000,  priorYear: 93000,  variance: 13200,  variancePercent: 13.5 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 77840,  plan: 68600,  priorYear: 65100,  variance: 9240,   variancePercent: 13.5 },
    ],
  },
  {
    period: 'Q2 FY24',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 484300, plan: 471000, priorYear: 450400, variance: 13300,  variancePercent: 2.8 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 106550, plan: 103600, priorYear: 99100,  variance: -2950,  variancePercent: -2.8 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 377750, plan: 367400, priorYear: 351300, variance: 10350,  variancePercent: 2.8 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 262450, plan: 267400, priorYear: 258200, variance: 4950,   variancePercent: 1.9 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 115300, plan: 100000, priorYear: 93100,  variance: 15300,  variancePercent: 15.3 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 76100,  plan: 70000,  priorYear: 65200,  variance: 6100,   variancePercent: 8.7 },
    ],
  },
  {
    period: 'Q3 FY24',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 480100, plan: 468000, priorYear: 447600, variance: 12100,  variancePercent: 2.6 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 105620, plan: 102960, priorYear: 98500,  variance: -2660,  variancePercent: -2.6 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 374480, plan: 365040, priorYear: 349100, variance: 9440,   variancePercent: 2.6 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 243880, plan: 249040, priorYear: 238000, variance: 5160,   variancePercent: 2.1 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 130600, plan: 116000, priorYear: 111100, variance: 14600,  variancePercent: 12.6 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 96500,  plan: 81200,  priorYear: 77800,  variance: 15300,  variancePercent: 18.8 },
    ],
  },
  {
    period: 'Q4 FY24',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 454400, plan: 443000, priorYear: 421300, variance: 11400,  variancePercent: 2.6 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 99970,  plan: 97460,  priorYear: 92700,  variance: -2510,  variancePercent: -2.6 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 354430, plan: 345540, priorYear: 328600, variance: 8890,   variancePercent: 2.6 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 265830, plan: 268540, priorYear: 254200, variance: 2710,   variancePercent: 1.0 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 88600,  plan: 77000,  priorYear: 74400,  variance: 11600,  variancePercent: 15.1 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 62020,  plan: 53900,  priorYear: 52100,  variance: 8120,   variancePercent: 15.1 },
    ],
  },
  {
    period: 'FY24',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 1913000, plan: 1864000, priorYear: 1773700, variance: 49000,  variancePercent: 2.6 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 420870,  plan: 410000,  priorYear: 390200,  variance: -10870, variancePercent: -2.6 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 1492130, plan: 1454000, priorYear: 1383500, variance: 38130,  variancePercent: 2.6 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 1046430, plan: 1063000, priorYear: 1009800, variance: 16570,  variancePercent: 1.6 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 445700,  plan: 391000,  priorYear: 373700,  variance: 54700,  variancePercent: 14.0 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 310000,  plan: 274000,  priorYear: 261500,  variance: 36000,  variancePercent: 13.1 },
    ],
  },
  {
    // Q2 FY25: actual period
    period: 'Q2 FY25',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 537000, plan: 522000, priorYear: 484300, variance: 15000,  variancePercent: 2.9 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 118140, plan: 114840, priorYear: 106550, variance: -3300,  variancePercent: -2.9 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 418860, plan: 407160, priorYear: 377750, variance: 11700,  variancePercent: 2.9 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 280360, plan: 287160, priorYear: 262450, variance: 6800,   variancePercent: 2.4 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 138500, plan: 120000, priorYear: 115300, variance: 18500,  variancePercent: 15.4 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 97600,  plan: 84000,  priorYear: 76100,  variance: 13600,  variancePercent: 16.2 },
    ],
  },
  {
    // Q3 FY25: actual period — seasonally highest Core OP margin quarter
    period: 'Q3 FY25',
    lines: [
      { lineItem: 'revenue',           label: 'Total Net Revenue',                        actual: 527100, plan: 512000, priorYear: 480100, variance: 15100,  variancePercent: 2.9 },
      { lineItem: 'cogs',              label: 'Cost of Sales (Manufacturing + Royalties)', actual: 115960, plan: 112640, priorYear: 105620, variance: -3320,  variancePercent: -2.9 },
      { lineItem: 'grossProfit',       label: 'Gross Profit',                             actual: 411140, plan: 399360, priorYear: 374480, variance: 11780,  variancePercent: 2.9 },
      { lineItem: 'operatingExpenses', label: 'R&D + SG&A + Amortization',                actual: 238340, plan: 264360, priorYear: 243880, variance: 26020,  variancePercent: 9.8 },
      { lineItem: 'operatingIncome',   label: 'Core Operating Profit',                    actual: 172800, plan: 135000, priorYear: 130600, variance: 37800,  variancePercent: 28.0 },
      { lineItem: 'netIncome',         label: 'Net Income (attributable to Astellas)',    actual: 117400, plan: 94500,  priorYear: 96500,  variance: 22900,  variancePercent: 24.2 },
    ],
  },
];

// ── Revenue Bridge Items (Astellas context) ───────────────────────────────────
// Bridge from prior-year same period to current period (in ¥M).
// Categories: volume (organic growth), pricing (FX / price actions), mix (product mix shift)
const bridgeData = [
  {
    period: 'Q1 FY24',
    items: [
      { label: 'XTANDI volume growth (+3.2% YoY; prostate cancer market share expansion)',        impact: 13200,  category: 'volume' },
      { label: 'PADCEV/Strategic Brands revenue growth (pre-EV+P 1L approval ramp)',             impact: 12800,  category: 'volume' },
      { label: 'FX translation (¥152/$1 vs ¥145/$1 prior year; yen weakness positive)',          impact: 18300,  category: 'pricing' },
      { label: 'New product launches (IZERVAY first quarter US; VEOZAH initial uptake)',          impact: 8500,   category: 'volume' },
      { label: 'Japan NHI April 2024 biennial repricing (avg -6.8% across NHI-listed products)', impact: -4800,  category: 'pricing' },
      { label: 'Legacy portfolio erosion (Japan mature brands, Taiho LOE, other)',                impact: -8500,  category: 'mix' },
      { label: 'Other / geographic mix',                                                          impact: 700,    category: 'mix' },
    ],
  },
  {
    period: 'Q2 FY24',
    items: [
      { label: 'XTANDI volume growth (+4.1% YoY; nmCRPC/mCSPC label breadth)',                   impact: 14100,  category: 'volume' },
      { label: 'PADCEV US/EU commercial growth (2L+ UC; pre-1L approval uptake)',                 impact: 14200,  category: 'volume' },
      { label: 'FX translation (yen weakness; USD/EUR favorable)',                                impact: 16800,  category: 'pricing' },
      { label: 'IZERVAY US launch ramp (second month prescription growth)',                       impact: 7800,   category: 'volume' },
      { label: 'Japan NHI pricing headwind (full quarter effect of April repricing)',             impact: -5200,  category: 'pricing' },
      { label: 'Legacy portfolio erosion',                                                        impact: -8100,  category: 'mix' },
      { label: 'China volume growth (XTANDI NRDL expansion)',                                     impact: 4100,   category: 'volume' },
    ],
  },
  {
    period: 'Q3 FY24',
    items: [
      { label: 'XTANDI volume growth (+4.8% YoY; Q3 seasonal US strength)',                      impact: 15600,  category: 'volume' },
      { label: 'PADCEV revenue growth (label expansion momentum; US hospital pull)',              impact: 17500,  category: 'volume' },
      { label: 'FX translation (yen weakness peak; ¥153/$1 vs ¥147/$1 Q3 FY23)',                 impact: 17200,  category: 'pricing' },
      { label: 'IZERVAY/VEOZAH new launches contribution (growing penetration)',                  impact: 9800,   category: 'volume' },
      { label: 'Japan NHI pricing headwind (full quarter)',                                       impact: -4800,  category: 'pricing' },
      { label: 'Legacy portfolio erosion',                                                        impact: -7800,  category: 'mix' },
      { label: 'China XTANDI volume (+26% YoY in quarter)',                                       impact: 5000,   category: 'volume' },
    ],
  },
  {
    period: 'Q4 FY24',
    items: [
      { label: 'XTANDI volume growth (+3.9% YoY; Q4 seasonal US slightly lower)',                impact: 12500,  category: 'volume' },
      { label: 'PADCEV revenue growth (sustained momentum into year-end)',                        impact: 16800,  category: 'volume' },
      { label: 'FX translation (yen weakness; favorable YoY)',                                   impact: 14200,  category: 'pricing' },
      { label: 'IZERVAY/VYLOY (Japan NHI listed January 2025)/VEOZAH contribution',              impact: 11400,  category: 'volume' },
      { label: 'Japan NHI pricing headwind (full quarter)',                                       impact: -4500,  category: 'pricing' },
      { label: 'Legacy portfolio erosion',                                                        impact: -8200,  category: 'mix' },
      { label: 'China Lunar New Year pre-stocking (+28% YoY China)',                             impact: 4800,   category: 'volume' },
    ],
  },
  {
    period: 'Q2 FY25',
    items: [
      { label: 'XTANDI volume growth (+5.3% YoY; EV+P 1L UC approval driving XTANDI share)',    impact: 16800,  category: 'volume' },
      { label: 'PADCEV 1L UC EV+P approval US/EU (+34.8% YoY Strategic Brands)',                impact: 28500,  category: 'volume' },
      { label: 'FX translation (¥152/$1 vs ¥150/$1 Q2 FY24; modest yen weakness)',              impact: 9800,   category: 'pricing' },
      { label: 'IZERVAY continued US growth (formulary wins; retinal specialist adoption)',      impact: 12500,  category: 'volume' },
      { label: 'VYLOY Japan NHI + EU early access (first full quarter post-NHI listing)',        impact: 8900,   category: 'volume' },
      { label: 'Japan NHI pricing (April 2024 repricing, full run-rate)',                        impact: -5200,  category: 'pricing' },
      { label: 'Legacy portfolio erosion',                                                        impact: -8500,  category: 'mix' },
      { label: 'China XTANDI/VYLOY early access (+32.8% YoY China)',                            impact: 6500,   category: 'volume' },
    ],
  },
  {
    period: 'Q3 FY25',
    items: [
      { label: 'XTANDI volume growth (+5.5% YoY; Q3 US seasonal peak)',                          impact: 17800,  category: 'volume' },
      { label: 'PADCEV EV+P 1L UC US/EU full-quarter effect (largest contributor)',              impact: 32500,  category: 'volume' },
      { label: 'IZERVAY US continued penetration (Q3 new formulary wins)',                       impact: 14200,  category: 'volume' },
      { label: 'FX translation (¥155/$1 Q3 FY25 vs ¥148/$1 Q3 FY24)',                           impact: 21200,  category: 'pricing' },
      { label: 'VYLOY Japan + EU + US initial launch contribution',                              impact: 10500,  category: 'volume' },
      { label: 'SMT savings flowing through Core OP (cost reduction, not revenue bridge)',       impact: 0,      category: 'mix' },
      { label: 'Japan NHI pricing headwind (full run-rate)',                                     impact: -4800,  category: 'pricing' },
      { label: 'Legacy portfolio erosion',                                                        impact: -8400,  category: 'mix' },
      { label: 'China revenue growth (+36.5% YoY; VYLOY + XTANDI)',                             impact: 7200,   category: 'volume' },
    ],
  },
];

// ── KPI Values for Extended Periods ───────────────────────────────────────────
// KPI labels EXACTLY match what was seeded in 04-kpis.ts for Astellas.
// Map indices [0..5] = Q1 FY24, Q2 FY24, Q3 FY24, Q4 FY24, Q2 FY25, Q3 FY25
interface ExtKPIEntry {
  value: string;
  target: string | null;
  trend: string;
  trendValue: string;
  status: string;
}

const extendedKPIData: Record<string, {
  actuals: (ExtKPIEntry | null)[];    // null for forecast-only periods (Q2/Q3 FY25 here are actuals)
  forecasts: ExtKPIEntry[];
  budgets: ExtKPIEntry[];
}> = {
  'Core EPS': {
    actuals: [
      { value: '47.20', target: '43.50', trend: 'up',   trendValue: '¥47.20 Q1 FY24; ahead of plan', status: 'good' },
      { value: '46.10', target: '44.00', trend: 'up',   trendValue: '¥46.10 Q2 FY24; solid execution', status: 'good' },
      { value: '58.50', target: '52.00', trend: 'up',   trendValue: '¥58.50 Q3 FY24; highest Q3 on record', status: 'good' },
      { value: '36.20', target: '34.00', trend: 'up',   trendValue: '¥36.20 Q4 FY24; Q4 seasonally weak', status: 'good' },
      { value: '59.14', target: '54.00', trend: 'up',   trendValue: '¥59.14 Q2 FY25; +28.3% YoY', status: 'good' },
      { value: '71.18', target: '62.00', trend: 'up',   trendValue: '¥71.18 Q3 FY25; record high', status: 'good' },
    ],
    forecasts: [
      { value: '46.50', target: '43.50', trend: 'up',   trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '45.80', target: '44.00', trend: 'up',   trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '57.20', target: '52.00', trend: 'up',   trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '35.50', target: '34.00', trend: 'up',   trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '58.50', target: '54.00', trend: 'up',   trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '70.50', target: '62.00', trend: 'up',   trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '43.50', target: '43.50', trend: 'flat', trendValue: 'Budget baseline Q1 FY24', status: 'good' },
      { value: '44.00', target: '44.00', trend: 'flat', trendValue: 'Budget baseline Q2 FY24', status: 'good' },
      { value: '52.00', target: '52.00', trend: 'flat', trendValue: 'Budget baseline Q3 FY24', status: 'good' },
      { value: '34.00', target: '34.00', trend: 'flat', trendValue: 'Budget baseline Q4 FY24', status: 'good' },
      { value: '54.00', target: '54.00', trend: 'flat', trendValue: 'Budget baseline Q2 FY25', status: 'good' },
      { value: '62.00', target: '62.00', trend: 'flat', trendValue: 'Budget baseline Q3 FY25', status: 'good' },
    ],
  },
  'Core Operating Profit': {
    actuals: [
      { value: '111.2', target: '98.0',  trend: 'up',  trendValue: '¥111.2B Q1 FY24 (22.5% margin); plan beat', status: 'good' },
      { value: '115.3', target: '100.0', trend: 'up',  trendValue: '¥115.3B Q2 FY24 (23.8% margin)', status: 'good' },
      { value: '130.6', target: '116.0', trend: 'up',  trendValue: '¥130.6B Q3 FY24 (27.2% margin); Q3 seasonal peak', status: 'good' },
      { value: '88.6',  target: '77.0',  trend: 'up',  trendValue: '¥88.6B Q4 FY24 (19.5% margin); Q4 weakest', status: 'good' },
      { value: '138.5', target: '120.0', trend: 'up',  trendValue: '¥138.5B Q2 FY25 (25.8% margin); Strategic Brands lift', status: 'good' },
      { value: '172.8', target: '135.0', trend: 'up',  trendValue: '¥172.8B Q3 FY25 (32.8% margin); record margin', status: 'good' },
    ],
    forecasts: [
      { value: '109.0', target: '98.0',  trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '113.5', target: '100.0', trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '128.2', target: '116.0', trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '87.0',  target: '77.0',  trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '137.0', target: '120.0', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '171.0', target: '135.0', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '98.0',  target: '98.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '100.0', target: '100.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '116.0', target: '116.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '77.0',  target: '77.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '120.0', target: '120.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '135.0', target: '135.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'XTANDI Revenue YoY Growth': {
    actuals: [
      { value: '3.2', target: '3.0', trend: 'up',  trendValue: '+3.2% XTANDI YoY Q1 FY24; IRA pre-monitoring', status: 'good' },
      { value: '4.1', target: '3.5', trend: 'up',  trendValue: '+4.1% XTANDI YoY Q2 FY24; US volume strong', status: 'good' },
      { value: '4.8', target: '4.0', trend: 'up',  trendValue: '+4.8% XTANDI YoY Q3 FY24; Q3 US seasonal peak', status: 'good' },
      { value: '3.9', target: '3.5', trend: 'up',  trendValue: '+3.9% XTANDI YoY Q4 FY24; softer Q4 typical', status: 'good' },
      { value: '5.3', target: '4.5', trend: 'up',  trendValue: '+5.3% XTANDI YoY Q2 FY25; EV+P pull-through', status: 'good' },
      { value: '5.5', target: '4.5', trend: 'up',  trendValue: '+5.5% XTANDI YoY Q3 FY25; sustained momentum', status: 'good' },
    ],
    forecasts: [
      { value: '3.0', target: '3.0', trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '4.0', target: '3.5', trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '4.6', target: '4.0', trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '3.8', target: '3.5', trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '5.2', target: '4.5', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '5.4', target: '4.5', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '3.0', target: '3.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '3.5', target: '3.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '4.0', target: '4.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '3.5', target: '3.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '4.5', target: '4.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '4.5', target: '4.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'Strategic Brands Revenue': {
    actuals: [
      { value: '82',  target: '75',  trend: 'up', trendValue: '¥82B Q1 FY24 Strategic Brands; pre-1L PADCEV approval', status: 'good' },
      { value: '89',  target: '82',  trend: 'up', trendValue: '¥89B Q2 FY24; PADCEV/IZERVAY acceleration', status: 'good' },
      { value: '96',  target: '89',  trend: 'up', trendValue: '¥96B Q3 FY24; IZERVAY expanding formularies', status: 'good' },
      { value: '88',  target: '82',  trend: 'up', trendValue: '¥88B Q4 FY24; VYLOY Japan approaching NHI listing', status: 'good' },
      { value: '118', target: '105', trend: 'up', trendValue: '¥118B Q2 FY25; EV+P 1L approval driving PADCEV surge', status: 'good' },
      { value: '131', target: '115', trend: 'up', trendValue: '¥131B Q3 FY25; PADCEV + VYLOY + IZERVAY all growing', status: 'good' },
    ],
    forecasts: [
      { value: '80',  target: '75',  trend: 'up', trendValue: '¥80B projected Q1 FY24', status: 'good' },
      { value: '88',  target: '82',  trend: 'up', trendValue: '¥88B projected Q2 FY24', status: 'good' },
      { value: '94',  target: '89',  trend: 'up', trendValue: '¥94B projected Q3 FY24', status: 'good' },
      { value: '86',  target: '82',  trend: 'up', trendValue: '¥86B projected Q4 FY24', status: 'good' },
      { value: '116', target: '105', trend: 'up', trendValue: '¥116B projected Q2 FY25', status: 'good' },
      { value: '129', target: '115', trend: 'up', trendValue: '¥129B projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '75',  target: '75',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '82',  target: '82',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '89',  target: '89',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '82',  target: '82',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '105', target: '105', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '115', target: '115', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'Total Revenue': {
    actuals: [
      { value: '494.2',  target: '482.0',  trend: 'up', trendValue: '¥494.2B Q1 FY24 +8.8% YoY', status: 'good' },
      { value: '484.3',  target: '471.0',  trend: 'up', trendValue: '¥484.3B Q2 FY24 +7.5% YoY', status: 'good' },
      { value: '480.1',  target: '468.0',  trend: 'up', trendValue: '¥480.1B Q3 FY24 +7.2% YoY', status: 'good' },
      { value: '454.4',  target: '443.0',  trend: 'up', trendValue: '¥454.4B Q4 FY24 +7.8% YoY', status: 'good' },
      { value: '537.0',  target: '522.0',  trend: 'up', trendValue: '¥537.0B Q2 FY25 +10.9% YoY', status: 'good' },
      { value: '527.1',  target: '512.0',  trend: 'up', trendValue: '¥527.1B Q3 FY25 +9.8% YoY', status: 'good' },
    ],
    forecasts: [
      { value: '492.0',  target: '482.0',  trend: 'up', trendValue: '¥492.0B projected Q1 FY24', status: 'good' },
      { value: '483.0',  target: '471.0',  trend: 'up', trendValue: '¥483.0B projected Q2 FY24', status: 'good' },
      { value: '479.0',  target: '468.0',  trend: 'up', trendValue: '¥479.0B projected Q3 FY24', status: 'good' },
      { value: '453.0',  target: '443.0',  trend: 'up', trendValue: '¥453.0B projected Q4 FY24', status: 'good' },
      { value: '536.0',  target: '522.0',  trend: 'up', trendValue: '¥536.0B projected Q2 FY25', status: 'good' },
      { value: '526.0',  target: '512.0',  trend: 'up', trendValue: '¥526.0B projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '482.0',  target: '482.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '471.0',  target: '471.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '468.0',  target: '468.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '443.0',  target: '443.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '522.0',  target: '522.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '512.0',  target: '512.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'FY2026 Core EPS Guidance': {
    actuals: [
      { value: '225.00', target: '220-230', trend: 'flat', trendValue: 'FY26 prelim EPS guidance at Q1 FY24 earnings', status: 'good' },
      { value: '225.00', target: '220-230', trend: 'flat', trendValue: 'FY26 guidance maintained Q2 FY24', status: 'good' },
      { value: '232.00', target: '228-240', trend: 'up',   trendValue: 'FY26 guidance raised Q3 FY24', status: 'good' },
      { value: '237.01', target: '235-260', trend: 'up',   trendValue: 'FY25 guidance issued; FY26 outlook ¥250+', status: 'good' },
      { value: '250.00', target: '245-260', trend: 'up',   trendValue: 'FY26 guidance raised Q2 FY25 on strategic brands', status: 'good' },
      { value: '256.77', target: '253-260', trend: 'up',   trendValue: 'FY26 guidance ¥256.77 reaffirmed Q3 FY25', status: 'good' },
    ],
    forecasts: [
      { value: '224.00', target: '220-230', trend: 'flat', trendValue: 'Projected FY26 prelim', status: 'good' },
      { value: '224.00', target: '220-230', trend: 'flat', trendValue: 'Projected FY26 maintained', status: 'good' },
      { value: '231.00', target: '228-240', trend: 'up',   trendValue: 'Projected FY26 raised', status: 'good' },
      { value: '236.00', target: '235-260', trend: 'up',   trendValue: 'Projected FY25 guidance', status: 'good' },
      { value: '249.00', target: '245-260', trend: 'up',   trendValue: 'Projected Q2 FY25', status: 'good' },
      { value: '256.00', target: '253-260', trend: 'up',   trendValue: 'Projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '220.00', target: '220-230', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '222.00', target: '220-230', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '228.00', target: '228-240', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '235.00', target: '235-260', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '245.00', target: '245-260', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '253.00', target: '253-260', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'XTANDI Revenue': {
    actuals: [
      { value: '228.0', target: '220.0', trend: 'up', trendValue: '¥228.0B XTANDI Q1 FY24; quarterly run rate', status: 'good' },
      { value: '229.5', target: '221.0', trend: 'up', trendValue: '¥229.5B XTANDI Q2 FY24; US + EM stable', status: 'good' },
      { value: '230.8', target: '223.0', trend: 'up', trendValue: '¥230.8B XTANDI Q3 FY24; Q3 US seasonal strength', status: 'good' },
      { value: '224.1', target: '217.0', trend: 'up', trendValue: '¥224.1B XTANDI Q4 FY24; softer Q4 seasonal', status: 'good' },
      { value: '241.0', target: '232.0', trend: 'up', trendValue: '¥241.0B XTANDI Q2 FY25 +5.0% YoY', status: 'good' },
      { value: '240.5', target: '232.0', trend: 'up', trendValue: '¥240.5B XTANDI Q3 FY25 +4.2% YoY', status: 'good' },
    ],
    forecasts: [
      { value: '227.0', target: '220.0', trend: 'up', trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '228.5', target: '221.0', trend: 'up', trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '229.8', target: '223.0', trend: 'up', trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '223.0', target: '217.0', trend: 'up', trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '240.0', target: '232.0', trend: 'up', trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '239.5', target: '232.0', trend: 'up', trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '220.0', target: '220.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '221.0', target: '221.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '223.0', target: '223.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '217.0', target: '217.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '232.0', target: '232.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '232.0', target: '232.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'PADCEV Revenue': {
    actuals: [
      { value: '38.5', target: '35.0', trend: 'up',  trendValue: '¥38.5B PADCEV Q1 FY24; 2L+ UC still primary indication', status: 'good' },
      { value: '42.8', target: '38.0', trend: 'up',  trendValue: '¥42.8B PADCEV Q2 FY24; US/EU label expansion', status: 'good' },
      { value: '47.2', target: '42.0', trend: 'up',  trendValue: '¥47.2B PADCEV Q3 FY24; 1L UC pre-approval ramp', status: 'good' },
      { value: '45.1', target: '41.0', trend: 'up',  trendValue: '¥45.1B PADCEV Q4 FY24; approaching 1L approval', status: 'good' },
      { value: '54.8', target: '50.0', trend: 'up',  trendValue: '¥54.8B PADCEV Q2 FY25; EV+P 1L fully launched', status: 'good' },
      { value: '58.2', target: '53.0', trend: 'up',  trendValue: '¥58.2B PADCEV Q3 FY25; market share gaining', status: 'good' },
    ],
    forecasts: [
      { value: '38.0', target: '35.0', trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '42.2', target: '38.0', trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '46.8', target: '42.0', trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '44.5', target: '41.0', trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '54.2', target: '50.0', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '57.5', target: '53.0', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '35.0', target: '35.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '38.0', target: '38.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '42.0', target: '42.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '41.0', target: '41.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '50.0', target: '50.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '53.0', target: '53.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'Core Operating Margin': {
    actuals: [
      { value: '22.5', target: '20.0', trend: 'up',  trendValue: '22.5% Core OP margin Q1 FY24; above plan', status: 'good' },
      { value: '23.8', target: '21.0', trend: 'up',  trendValue: '23.8% Core OP margin Q2 FY24; SMT benefit', status: 'good' },
      { value: '27.2', target: '24.0', trend: 'up',  trendValue: '27.2% Core OP margin Q3 FY24; Q3 seasonal high', status: 'good' },
      { value: '19.5', target: '17.5', trend: 'up',  trendValue: '19.5% Core OP margin Q4 FY24; Q4 weakest', status: 'good' },
      { value: '25.8', target: '23.0', trend: 'up',  trendValue: '25.8% Core OP margin Q2 FY25; YoY +200bps', status: 'good' },
      { value: '32.8', target: '27.0', trend: 'up',  trendValue: '32.8% Core OP margin Q3 FY25; record high', status: 'good' },
    ],
    forecasts: [
      { value: '22.0', target: '20.0', trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '23.5', target: '21.0', trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '26.5', target: '24.0', trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '19.0', target: '17.5', trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '25.5', target: '23.0', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '32.0', target: '27.0', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '20.0', target: '20.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '21.0', target: '21.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '24.0', target: '24.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '17.5', target: '17.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '23.0', target: '23.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '27.0', target: '27.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'US Revenue': {
    actuals: [
      { value: '217.4', target: '210.0', trend: 'up', trendValue: '¥217.4B US revenue Q1 FY24 +7.5% YoY', status: 'good' },
      { value: '212.6', target: '205.0', trend: 'up', trendValue: '¥212.6B US revenue Q2 FY24', status: 'good' },
      { value: '210.8', target: '204.0', trend: 'up', trendValue: '¥210.8B US revenue Q3 FY24; Q3 seasonal strength', status: 'good' },
      { value: '199.4', target: '194.0', trend: 'up', trendValue: '¥199.4B US revenue Q4 FY24; softer Q4', status: 'good' },
      { value: '234.7', target: '226.0', trend: 'up', trendValue: '¥234.7B US revenue Q2 FY25 +10.4% YoY', status: 'good' },
      { value: '228.4', target: '220.0', trend: 'up', trendValue: '¥228.4B US revenue Q3 FY25 +8.3% YoY', status: 'good' },
    ],
    forecasts: [
      { value: '216.0', target: '210.0', trend: 'up', trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '211.5', target: '205.0', trend: 'up', trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '209.8', target: '204.0', trend: 'up', trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '198.5', target: '194.0', trend: 'up', trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '233.5', target: '226.0', trend: 'up', trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '227.0', target: '220.0', trend: 'up', trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '210.0', target: '210.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '205.0', target: '205.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '204.0', target: '204.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '194.0', target: '194.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '226.0', target: '226.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '220.0', target: '220.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'China Revenue': {
    actuals: [
      { value: '20.2', target: '18.0', trend: 'up',  trendValue: '¥20.2B China revenue Q1 FY24 +22% YoY', status: 'good' },
      { value: '19.8', target: '18.5', trend: 'up',  trendValue: '¥19.8B China revenue Q2 FY24 +24% YoY', status: 'good' },
      { value: '19.7', target: '19.0', trend: 'up',  trendValue: '¥19.7B China revenue Q3 FY24 +26% YoY', status: 'good' },
      { value: '18.6', target: '18.0', trend: 'up',  trendValue: '¥18.6B China revenue Q4 FY24 +28% YoY; Lunar New Year', status: 'good' },
      { value: '26.3', target: '22.0', trend: 'up',  trendValue: '¥26.3B China revenue Q2 FY25 +32.8% YoY; VYLOY access', status: 'good' },
      { value: '26.9', target: '23.0', trend: 'up',  trendValue: '¥26.9B China revenue Q3 FY25 +36.5% YoY; fastest segment', status: 'good' },
    ],
    forecasts: [
      { value: '20.0', target: '18.0', trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '19.5', target: '18.5', trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '19.5', target: '19.0', trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '18.3', target: '18.0', trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '26.0', target: '22.0', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '26.5', target: '23.0', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '18.0', target: '18.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '18.5', target: '18.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '19.0', target: '19.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '18.0', target: '18.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '22.0', target: '22.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '23.0', target: '23.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'SMT Savings': {
    actuals: [
      { value: '3.2',  target: '3.0',  trend: 'up',  trendValue: '¥3.2B SMT savings Q1 FY24 (early program deliveries)', status: 'good' },
      { value: '4.5',  target: '4.0',  trend: 'up',  trendValue: '¥4.5B SMT cumulative Q2 FY24', status: 'good' },
      { value: '7.8',  target: '6.5',  trend: 'up',  trendValue: '¥7.8B SMT cumulative Q3 FY24; SG&A reductions accelerating', status: 'good' },
      { value: '10.2', target: '9.0',  trend: 'up',  trendValue: '¥10.2B SMT cumulative Q4 FY24 (FY24 year-end base)', status: 'good' },
      { value: '15.8', target: '14.0', trend: 'up',  trendValue: '¥15.8B SMT cumulative Q2 FY25; on track for ¥21B FY25', status: 'good' },
      { value: '19.5', target: '17.5', trend: 'up',  trendValue: '¥19.5B SMT cumulative Q3 FY25; Q3 largest savings quarter', status: 'good' },
    ],
    forecasts: [
      { value: '3.0',  target: '3.0',  trend: 'up',  trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '4.2',  target: '4.0',  trend: 'up',  trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '7.5',  target: '6.5',  trend: 'up',  trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '10.0', target: '9.0',  trend: 'up',  trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '15.5', target: '14.0', trend: 'up',  trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '19.2', target: '17.5', trend: 'up',  trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '3.0',  target: '3.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '4.0',  target: '4.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '6.5',  target: '6.5',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '9.0',  target: '9.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '14.0', target: '14.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '17.5', target: '17.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'PADCEV Revenue Growth': {
    actuals: [
      { value: '28.5', target: '25.0', trend: 'up', trendValue: '+28.5% PADCEV YoY Q1 FY24; 2L+ UC expansion', status: 'good' },
      { value: '31.2', target: '27.0', trend: 'up', trendValue: '+31.2% PADCEV YoY Q2 FY24; label breadth growing', status: 'good' },
      { value: '33.8', target: '29.0', trend: 'up', trendValue: '+33.8% PADCEV YoY Q3 FY24; 1L UC nearing approval', status: 'good' },
      { value: '32.5', target: '28.0', trend: 'up', trendValue: '+32.5% PADCEV YoY Q4 FY24; pre-launch demand build', status: 'good' },
      { value: '42.3', target: '38.0', trend: 'up', trendValue: '+42.3% PADCEV YoY Q2 FY25; EV+P 1L fully active', status: 'good' },
      { value: '23.3', target: '20.0', trend: 'up', trendValue: '+23.3% PADCEV YoY Q3 FY25; normalizing from hypergrowth', status: 'good' },
    ],
    forecasts: [
      { value: '28.0', target: '25.0', trend: 'up', trendValue: 'Q1 FY24 projected', status: 'good' },
      { value: '30.8', target: '27.0', trend: 'up', trendValue: 'Q2 FY24 projected', status: 'good' },
      { value: '33.5', target: '29.0', trend: 'up', trendValue: 'Q3 FY24 projected', status: 'good' },
      { value: '32.0', target: '28.0', trend: 'up', trendValue: 'Q4 FY24 projected', status: 'good' },
      { value: '42.0', target: '38.0', trend: 'up', trendValue: 'Q2 FY25 projected', status: 'good' },
      { value: '23.0', target: '20.0', trend: 'up', trendValue: 'Q3 FY25 projected', status: 'good' },
    ],
    budgets: [
      { value: '25.0', target: '25.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '27.0', target: '27.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '29.0', target: '29.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '28.0', target: '28.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '38.0', target: '38.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '20.0', target: '20.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'VYLOY Revenue': {
    actuals: [
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'VYLOY: Q1 FY24 pre-launch; Japan NHI listing pending', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'VYLOY: Q2 FY24 regulatory submissions underway', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'VYLOY: Q3 FY24 EU EMA submission under review', status: 'good' },
      { value: '8.5',  target: '6.0',  trend: 'up',   trendValue: '¥8.5B VYLOY Q4 FY24; Japan NHI Jan 2025 + EU EMA approved', status: 'good' },
      { value: '14.8', target: '12.0', trend: 'up',   trendValue: '¥14.8B VYLOY Q2 FY25; Japan ramp + EU early access + US launch', status: 'good' },
      { value: '18.2', target: '16.0', trend: 'up',   trendValue: '¥18.2B VYLOY Q3 FY25; multi-region scaling', status: 'good' },
    ],
    forecasts: [
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: '0 projected Q1 FY24', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: '0 projected Q2 FY24', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: '0 projected Q3 FY24', status: 'good' },
      { value: '7.0',  target: '6.0',  trend: 'up',   trendValue: '¥7.0B projected Q4 FY24', status: 'good' },
      { value: '14.2', target: '12.0', trend: 'up',   trendValue: '¥14.2B projected Q2 FY25', status: 'good' },
      { value: '17.8', target: '16.0', trend: 'up',   trendValue: '¥17.8B projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '0.0',  target: '0.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '6.0',  target: '6.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '12.0', target: '12.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '16.0', target: '16.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'Free Cash Flow': {
    actuals: [
      { value: '102.5', target: '95.0',  trend: 'up', trendValue: '¥102.5B FCF Q1 FY24; strong cash conversion', status: 'good' },
      { value: '108.2', target: '100.0', trend: 'up', trendValue: '¥108.2B FCF Q2 FY24; working capital timing', status: 'good' },
      { value: '138.5', target: '120.0', trend: 'up', trendValue: '¥138.5B FCF Q3 FY24; Q3 highest cash quarter', status: 'good' },
      { value: '95.8',  target: '88.0',  trend: 'up', trendValue: '¥95.8B FCF Q4 FY24; Q4 lower cash (year-end tax)', status: 'good' },
      { value: '140.2', target: '125.0', trend: 'up', trendValue: '¥140.2B FCF Q1 FY25; strong FY25 start', status: 'good' },
      { value: '168.5', target: '148.0', trend: 'up', trendValue: '¥168.5B FCF Q3 FY25; record quarterly FCF', status: 'good' },
    ],
    forecasts: [
      { value: '101.0', target: '95.0',  trend: 'up', trendValue: '¥101.0B projected Q1 FY24', status: 'good' },
      { value: '106.5', target: '100.0', trend: 'up', trendValue: '¥106.5B projected Q2 FY24', status: 'good' },
      { value: '136.8', target: '120.0', trend: 'up', trendValue: '¥136.8B projected Q3 FY24', status: 'good' },
      { value: '94.5',  target: '88.0',  trend: 'up', trendValue: '¥94.5B projected Q4 FY24', status: 'good' },
      { value: '138.5', target: '125.0', trend: 'up', trendValue: '¥138.5B projected Q1 FY25', status: 'good' },
      { value: '166.5', target: '148.0', trend: 'up', trendValue: '¥166.5B projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '95.0',  target: '95.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '100.0', target: '100.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '120.0', target: '120.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '88.0',  target: '88.0',  trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '125.0', target: '125.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '148.0', target: '148.0', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
  'Net Debt / Equity': {
    actuals: [
      { value: '-0.12', target: '<0.5', trend: 'down', trendValue: 'Net cash position -0.12x Q1 FY24; conservative balance sheet', status: 'good' },
      { value: '-0.10', target: '<0.5', trend: 'down', trendValue: '-0.10x Q2 FY24; net cash improving', status: 'good' },
      { value: '-0.08', target: '<0.5', trend: 'down', trendValue: '-0.08x Q3 FY24; FCF accumulation', status: 'good' },
      { value: '-0.06', target: '<0.5', trend: 'down', trendValue: '-0.06x Q4 FY24; dividend payment Q4', status: 'good' },
      { value: '-0.14', target: '<0.5', trend: 'down', trendValue: '-0.14x Q2 FY25; stronger FCF building net cash', status: 'good' },
      { value: '-0.18', target: '<0.5', trend: 'down', trendValue: '-0.18x Q3 FY25; record net cash position', status: 'good' },
    ],
    forecasts: [
      { value: '-0.11', target: '<0.5', trend: 'down', trendValue: '-0.11x projected Q1 FY24', status: 'good' },
      { value: '-0.10', target: '<0.5', trend: 'down', trendValue: '-0.10x projected Q2 FY24', status: 'good' },
      { value: '-0.08', target: '<0.5', trend: 'down', trendValue: '-0.08x projected Q3 FY24', status: 'good' },
      { value: '-0.06', target: '<0.5', trend: 'down', trendValue: '-0.06x projected Q4 FY24', status: 'good' },
      { value: '-0.13', target: '<0.5', trend: 'down', trendValue: '-0.13x projected Q2 FY25', status: 'good' },
      { value: '-0.17', target: '<0.5', trend: 'down', trendValue: '-0.17x projected Q3 FY25', status: 'good' },
    ],
    budgets: [
      { value: '-0.10', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '-0.09', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '-0.07', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '-0.05', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '-0.12', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
      { value: '-0.16', target: '<0.5', trend: 'flat', trendValue: 'Budget baseline', status: 'good' },
    ],
  },
};

// =============================================================================
// Main seed function
// =============================================================================

export async function seedExtendedPeriods(
  prisma: PrismaClient,
  companyId: number,
): Promise<Record<string, { id: number }>> {
  // ── Look up existing segments and KPI definitions ──────────────────────────
  const segments = await prisma.businessSegment.findMany({ where: { companyId } });
  const kpiDefs = await prisma.kPIDefinition.findMany({ where: { companyId } });

  const segmentMap: Record<string, number> = {};
  for (const seg of segments) {
    segmentMap[seg.name] = seg.id;
  }

  const kpiDefMap: Record<string, number> = {};
  for (const kpi of kpiDefs) {
    kpiDefMap[kpi.label] = kpi.id;
  }

  // ── 1. Create FiscalPeriod records ─────────────────────────────────────────
  const periodMap: Record<string, { id: number }> = {};

  for (const period of newPeriods) {
    const created = await prisma.fiscalPeriod.create({
      data: {
        companyId,
        label: period.label,
        year: period.year,
        quarter: period.quarter,
        type: period.type,
      },
    });
    periodMap[period.label] = { id: created.id };
  }

  console.log(`Seeded ${newPeriods.length} extended fiscal periods (Q1-Q4 FY24, FY24, Q2-Q3 FY25)`);

  // ── 2. Create QuarterlyResult records ──────────────────────────────────────
  for (const qr of quarterlyResults) {
    await prisma.quarterlyResult.create({
      data: {
        periodId: periodMap[qr.period].id,
        revenue: qr.revenue,
        revenueYoY: qr.revenueYoY,
        operatingIncome: qr.operatingIncome,
        operatingMargin: qr.operatingMargin,
        eps: qr.eps,
        compStoreSales: qr.compStoreSales,
        netNewStores: qr.netNewStores,
      },
    });
  }

  console.log(`Seeded ${quarterlyResults.length} quarterly results for extended periods`);

  // ── 3. Create FinancialStatement records ───────────────────────────────────
  let financialStatementCount = 0;
  for (const q of plData) {
    const periodId = periodMap[q.period].id;
    await prisma.financialStatement.createMany({
      data: q.lines.map((l) => ({
        companyId,
        periodId,
        lineItem: l.lineItem,
        label: l.label,
        actual: l.actual,
        plan: l.plan,
        priorYear: l.priorYear,
        variance: l.variance,
        variancePercent: l.variancePercent,
      })),
    });
    financialStatementCount += q.lines.length;
  }

  console.log(`Seeded ${financialStatementCount} financial statement lines for extended periods`);

  // ── 4. Create SegmentResult records ────────────────────────────────────────
  let segmentResultCount = 0;
  for (const q of segmentData) {
    const periodId = periodMap[q.period].id;
    const segResults = [];

    if (segmentMap['United States']) {
      segResults.push({
        segmentId: segmentMap['United States'],
        periodId,
        revenue: q.us.rev,
        yoyChange: q.us.yoy,
        operatingMargin: q.us.margin,
      });
    }
    if (segmentMap['Established Markets']) {
      segResults.push({
        segmentId: segmentMap['Established Markets'],
        periodId,
        revenue: q.em.rev,
        yoyChange: q.em.yoy,
        operatingMargin: q.em.margin,
      });
    }
    if (segmentMap['Japan']) {
      segResults.push({
        segmentId: segmentMap['Japan'],
        periodId,
        revenue: q.japan.rev,
        yoyChange: q.japan.yoy,
        operatingMargin: q.japan.margin,
      });
    }
    if (segmentMap['International Markets']) {
      segResults.push({
        segmentId: segmentMap['International Markets'],
        periodId,
        revenue: q.intl.rev,
        yoyChange: q.intl.yoy,
        operatingMargin: q.intl.margin,
      });
    }
    if (segmentMap['China']) {
      segResults.push({
        segmentId: segmentMap['China'],
        periodId,
        revenue: q.china.rev,
        yoyChange: q.china.yoy,
        operatingMargin: q.china.margin,
      });
    }

    if (segResults.length > 0) {
      await prisma.segmentResult.createMany({ data: segResults });
      segmentResultCount += segResults.length;
    }
  }

  console.log(`Seeded ${segmentResultCount} segment results for extended periods`);

  // ── 5. Create RevenueBridgeItem records ────────────────────────────────────
  let bridgeItemCount = 0;
  for (const q of bridgeData) {
    const periodId = periodMap[q.period].id;
    await prisma.revenueBridgeItem.createMany({
      data: q.items.map((item, idx) => ({
        companyId,
        periodId,
        label: item.label,
        impact: item.impact,
        category: item.category,
        sortOrder: idx,
      })),
    });
    bridgeItemCount += q.items.length;
  }

  console.log(`Seeded ${bridgeItemCount} revenue bridge items for extended periods`);

  // ── 6. Create KPIValue records ─────────────────────────────────────────────
  // Quarter labels indexed [0..5] map to: Q1 FY24, Q2 FY24, Q3 FY24, Q4 FY24, Q2 FY25, Q3 FY25
  const extQuarterLabels = ['Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24', 'Q2 FY25', 'Q3 FY25'];
  let kpiValueCount = 0;

  for (const [kpiLabel, kpiData] of Object.entries(extendedKPIData)) {
    const definitionId = kpiDefMap[kpiLabel];
    if (!definitionId) {
      console.warn(`  KPI definition not found for label: ${kpiLabel} — skipping`);
      continue;
    }

    for (let qi = 0; qi < extQuarterLabels.length; qi++) {
      const periodId = periodMap[extQuarterLabels[qi]].id;

      // Actual (all periods have actuals for Astellas)
      const actualEntry = kpiData.actuals[qi];
      if (actualEntry !== null) {
        await prisma.kPIValue.create({
          data: {
            kpiDefinitionId: definitionId,
            periodId,
            dataType: 'actual',
            value: actualEntry.value,
            target: actualEntry.target,
            trend: actualEntry.trend,
            trendValue: actualEntry.trendValue,
            status: actualEntry.status,
          },
        });
        kpiValueCount++;
      }

      // Forecast (all periods)
      const forecastEntry = kpiData.forecasts[qi];
      await prisma.kPIValue.create({
        data: {
          kpiDefinitionId: definitionId,
          periodId,
          dataType: 'forecast',
          value: forecastEntry.value,
          target: forecastEntry.target,
          trend: forecastEntry.trend,
          trendValue: forecastEntry.trendValue,
          status: forecastEntry.status,
        },
      });
      kpiValueCount++;

      // Budget (all periods)
      const budgetEntry = kpiData.budgets[qi];
      await prisma.kPIValue.create({
        data: {
          kpiDefinitionId: definitionId,
          periodId,
          dataType: 'budget',
          value: budgetEntry.value,
          target: budgetEntry.target,
          trend: budgetEntry.trend,
          trendValue: budgetEntry.trendValue,
          status: budgetEntry.status,
        },
      });
      kpiValueCount++;
    }
  }

  console.log(`Seeded ${kpiValueCount} KPI values for extended periods (16 KPIs x 6 quarters x 3 data types)`);

  console.log('Astellas Pharma extended periods seed complete');

  return periodMap;
}
