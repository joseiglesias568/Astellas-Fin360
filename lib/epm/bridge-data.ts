// =============================================================================
// Quarterly Bridge Walk Data — Astellas Pharma Inc.
// Per-P&L-line waterfall bridge items showing forecast-to-actual variance drivers
// All values in ¥B. Fiscal year: April–March (Q1 FY25 = Apr–Jun 2025).
// FX baseline: ¥151/USD; ¥2.1B Core OP per ¥1 move.
// Key bridge items: XTANDI volume, PADCEV ramp, price erosion, FX, SMT savings.
// =============================================================================

export const BRIDGE_PL_LINES = [
  'Revenue',
  'Cost of Sales',
  'Operating Expenses',
  'Core Operating Profit',
  'Core EPS',
] as const;

export type BridgePLLine = (typeof BRIDGE_PL_LINES)[number];

export interface BridgeItem {
  driverLabel: string;
  impact: number;          // ¥B (positive = favorable for Revenue/Core OP, negative = unfavorable)
  category: string;        // volume, pricing, cost, fx, mix, other
  description: string;
}

export interface BridgeQuarter {
  periodLabel: string;     // "Q1 FY26"
  plLine: BridgePLLine;
  forecastValue: number;   // Starting point (¥B)
  actualValue: number;     // Ending point (¥B)
  items: BridgeItem[];
}

// Available quarters for the bridge walk
export const BRIDGE_QUARTERS = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'] as const;

function generateBridgeData(): BridgeQuarter[] {
  const data: BridgeQuarter[] = [];

  // ---------------------------------------------------------------------------
  // Q1 FY26 Bridges (Apr–Jun 2025 — strong PADCEV ramp, IRA headwind begins)
  // ---------------------------------------------------------------------------

  // Revenue Bridge: Forecast ¥552B → Actual ¥558B (+¥6B beat)
  data.push({
    periodLabel: 'Q1 FY26', plLine: 'Revenue', forecastValue: 552.0, actualValue: 558.0,
    items: [
      { driverLabel: 'PADCEV Volume Beat (Bladder Cancer)', impact: 14.5, category: 'volume', description: 'PADCEV Q1 FY26 net sales above plan — US bladder cancer market share expanding following EV+pembro label as first-line standard of care. New patient starts above quarterly forecast.' },
      { driverLabel: 'XTANDI Volume Growth', impact: 8.0, category: 'volume', description: 'XTANDI Q1 FY26 volume above plan across mHSPC and nmCRPC indications. US net sales benefited from strong new patient funnel despite IRA negotiated price timeline.' },
      { driverLabel: 'VEOZAH Launch Uptake', impact: 2.5, category: 'volume', description: 'VEOZAH (fezolinetant) vasomotor symptom launch trajectory above Q1 plan — prescriber adoption accelerating in key gynecology accounts.' },
      { driverLabel: 'Japan Segment Softer', impact: -5.8, category: 'volume', description: 'Japan domestic revenue below plan — government NHI price revision effective April 2025 created one-time headwind; XTANDI Japan volume in line but pricing impacted.' },
      { driverLabel: 'FX Headwind (¥/USD weakening)', impact: -8.2, category: 'fx', description: 'Yen weaker than ¥151/USD plan — each ¥1 move ≈ ¥2.1B Core OP impact. Q1 average rate ¥155/USD drove revenue FX headwind vs budget.' },
      { driverLabel: 'Price Erosion (Portfolio)', impact: -5.0, category: 'pricing', description: 'Quarterly price erosion across established markets and Japan — NHI revisions and tender dynamics in EU markets contributed to below-plan pricing.' },
    ],
  });

  // Cost of Sales Bridge: Forecast ¥120B → Actual ¥119B (favorable)
  data.push({
    periodLabel: 'Q1 FY26', plLine: 'Cost of Sales', forecastValue: 120.0, actualValue: 119.0,
    items: [
      { driverLabel: 'Manufacturing Efficiency Gains', impact: 2.5, category: 'cost', description: 'Small molecule manufacturing efficiency above plan — process optimization at key API manufacturing sites driving lower unit cost.' },
      { driverLabel: 'Product Mix (PADCEV Biologic Weight)', impact: -1.5, category: 'mix', description: 'Higher PADCEV/biologic mix increases blended COGS rate — biologic manufacturing costs higher than small molecule portfolio average.' },
    ],
  });

  // Operating Expenses Bridge: Forecast ¥229B → Actual ¥227B (favorable)
  data.push({
    periodLabel: 'Q1 FY26', plLine: 'Operating Expenses', forecastValue: 229.0, actualValue: 227.0,
    items: [
      { driverLabel: 'SMT Savings Above Plan', impact: 4.5, category: 'cost', description: 'SMT transformation program delivering above-plan savings in Q1 — workforce optimization and procurement consolidation ahead of phased target.' },
      { driverLabel: 'R&D Phase Timing Favorable', impact: 3.0, category: 'cost', description: 'Phase 3 clinical trial expense below Q1 plan — two trials had enrollment milestones shifted to Q2; spending deferred not cancelled.' },
      { driverLabel: 'Commercial Spend (VEOZAH Launch)', impact: -5.5, category: 'cost', description: 'VEOZAH commercial launch spend above plan — DTC advertising and physician education campaigns accelerated in response to strong early uptake.' },
    ],
  });

  // Core Operating Profit Bridge: Forecast ¥146B → Actual ¥148.5B (+¥2.5B beat)
  data.push({
    periodLabel: 'Q1 FY26', plLine: 'Core Operating Profit', forecastValue: 146.0, actualValue: 148.5,
    items: [
      { driverLabel: 'PADCEV Volume Upside', impact: 7.5, category: 'volume', description: 'PADCEV incremental net sales flow through at high contribution margin — biologic launch economics favorable as fixed costs absorbed.' },
      { driverLabel: 'XTANDI Volume & Mix', impact: 4.0, category: 'volume', description: 'XTANDI US volume above plan and favorable channel mix (specialty pharmacy vs. direct) drives margin above budget.' },
      { driverLabel: 'SMT Savings', impact: 4.5, category: 'cost', description: 'SMT transformation savings ¥4.5B above quarterly plan — primarily SG&A reductions across headquarters and regional functions.' },
      { driverLabel: 'FX Headwind', impact: -8.2, category: 'fx', description: 'Yen depreciation vs ¥151/USD plan — ¥2.1B Core OP per ¥1 move × ~4¥ adverse = ¥8.2B headwind.' },
      { driverLabel: 'Japan Price Revision', impact: -3.5, category: 'pricing', description: 'Japan NHI price revision effective April 2025 reduced Japan segment Core OP vs plan — biennial pricing impact.' },
      { driverLabel: 'VEOZAH Launch Investment', impact: -2.8, category: 'cost', description: 'Incremental VEOZAH commercial spend above plan partially offsets revenue beat.' },
      { driverLabel: 'Price Erosion (Portfolio)', impact: -1.0, category: 'pricing', description: 'EU tender pricing and established-market erosion below plan — net after FX.' },
    ],
  });

  // Core EPS Bridge: Forecast ¥59.0 → Actual ¥60.0 (+¥1.0)
  data.push({
    periodLabel: 'Q1 FY26', plLine: 'Core EPS', forecastValue: 59.0, actualValue: 60.0,
    items: [
      { driverLabel: 'Core OP Beat', impact: 1.5, category: 'volume', description: 'Core OP ¥2.5B above plan flows through to Core EPS at ~60% tax-and-share efficiency.' },
      { driverLabel: 'Below-the-Line Timing', impact: -0.3, category: 'other', description: 'Financing costs and non-operating items slightly worse than plan — minor timing impact.' },
      { driverLabel: 'Share Count (Buyback)', impact: 0.2, category: 'other', description: 'Share repurchase program slightly ahead of plan — modest EPS accretion from lower diluted count.' },
      { driverLabel: 'Tax Rate Favorable', impact: 0.3, category: 'other', description: 'Effective tax rate marginally below plan — R&D tax credits recognized slightly earlier than budgeted.' },
      { driverLabel: 'Other', impact: -0.7, category: 'other', description: 'Rounding, FX on non-operating items, and miscellaneous below-the-line items.' },
    ],
  });

  // ---------------------------------------------------------------------------
  // Q4 FY25 Bridges (Jan–Mar 2025 — fiscal year-end, strong Japan seasonal)
  // ---------------------------------------------------------------------------

  // Revenue Bridge: Forecast ¥540B → Actual ¥546.5B
  data.push({
    periodLabel: 'Q4 FY25', plLine: 'Revenue', forecastValue: 540.0, actualValue: 546.5,
    items: [
      { driverLabel: 'Japan Year-End Buying Surge', impact: 18.0, category: 'volume', description: 'Japan fiscal year-end (March) hospital and pharmacy buying above plan — seasonal inventory build ahead of April NHI revision.' },
      { driverLabel: 'XTANDI US Q4 Acceleration', impact: 12.5, category: 'volume', description: 'XTANDI US Q4 FY25 volume above plan — new patient starts strong; specialty pharmacy inventory normalizing after Q3 drawdown.' },
      { driverLabel: 'PADCEV EU Label Expansion', impact: 8.0, category: 'volume', description: 'PADCEV EU approval for additional bladder cancer indication drove incremental net sales above Q4 plan.' },
      { driverLabel: 'FX Tailwind', impact: 5.5, category: 'fx', description: 'Yen slightly stronger than Q4 plan — marginal FX tailwind on USD-denominated XTANDI/PADCEV revenue conversion.' },
      { driverLabel: 'Price Erosion (Japan & EU)', impact: -14.5, category: 'pricing', description: 'Japan NHI price revision pre-announcement and EU established-market tender pricing below plan.' },
      { driverLabel: 'Other Revenue Timing', impact: -3.0, category: 'other', description: 'Royalty and contract revenue timing below Q4 plan.' },
    ],
  });

  // Q4 FY25 Core OP Bridge
  data.push({
    periodLabel: 'Q4 FY25', plLine: 'Core Operating Profit', forecastValue: 143.0, actualValue: 149.0,
    items: [
      { driverLabel: 'Japan Seasonal Revenue Upside', impact: 12.0, category: 'volume', description: 'Japan year-end buying at high domestic margin — Japan segment Core OP contribution above plan.' },
      { driverLabel: 'XTANDI US Volume Beat', impact: 8.5, category: 'volume', description: 'XTANDI incremental US net sales at ~65% contribution margin drive Core OP above plan.' },
      { driverLabel: 'PADCEV EU Contribution', impact: 4.5, category: 'volume', description: 'EU PADCEV label expansion incremental contribution at launch-phase margin.' },
      { driverLabel: 'Japan Price Revision Impact', impact: -8.0, category: 'pricing', description: 'Japan NHI biennial price cut flowing into Q4 net pricing below plan.' },
      { driverLabel: 'R&D Year-End True-Up', impact: -6.5, category: 'cost', description: 'Year-end R&D accrual true-up above plan — milestone payments and trial completion costs recognized in Q4.' },
      { driverLabel: 'SMT Savings', impact: 5.0, category: 'cost', description: 'FY25 SMT savings ¥21B annual target achieved — Q4 contribution in line.' },
      { driverLabel: 'Other', impact: -6.5, category: 'other', description: 'Various below-the-line timing and FX items.' },
    ],
  });

  // ---------------------------------------------------------------------------
  // Q3 FY25 Bridges (Oct–Dec 2024 — peak XTANDI US, strong specialty)
  // ---------------------------------------------------------------------------

  // Revenue Bridge: Forecast ¥524B → Actual ¥530.2B
  data.push({
    periodLabel: 'Q3 FY25', plLine: 'Revenue', forecastValue: 524.0, actualValue: 530.2,
    items: [
      { driverLabel: 'XTANDI US Q3 Volume Beat', impact: 16.5, category: 'volume', description: 'XTANDI US Q3 net sales above plan — mCRPC and nmCRPC market share gains ahead of IRA price negotiation announcement impact.' },
      { driverLabel: 'PADCEV US Ramp Ahead of Plan', impact: 10.8, category: 'volume', description: 'PADCEV Q3 US net sales ahead of launch curve plan — first-line bladder cancer uptake in academic centers accelerating.' },
      { driverLabel: 'Established Markets Beat', impact: 5.0, category: 'volume', description: 'Established Markets segment above plan — EU tender wins in Germany and France for XTANDI.' },
      { driverLabel: 'FX Headwind', impact: -12.5, category: 'fx', description: 'USD/JPY Q3 rate adverse vs plan — revenue FX headwind as yen depreciated beyond ¥151 baseline.' },
      { driverLabel: 'China Slower-Than-Plan', impact: -6.5, category: 'volume', description: 'China segment below plan — volume-based procurement (VBP) impact on XTANDI greater than forecast.' },
      { driverLabel: 'Other', impact: -3.1, category: 'other', description: 'Royalty timing and miscellaneous.' },
    ],
  });

  // Q3 FY25 Core OP Bridge
  data.push({
    periodLabel: 'Q3 FY25', plLine: 'Core Operating Profit', forecastValue: 126.0, actualValue: 130.2,
    items: [
      { driverLabel: 'XTANDI US Volume Upside', impact: 10.8, category: 'volume', description: 'Incremental XTANDI US net sales at ~65% contribution margin; most R&D fixed cost already committed.' },
      { driverLabel: 'PADCEV Launch Momentum', impact: 6.5, category: 'volume', description: 'PADCEV contribution above plan; launch investment partially absorbed, incremental margin improving.' },
      { driverLabel: 'R&D Spend Timing', impact: 5.5, category: 'cost', description: 'Q3 R&D spend below plan — Phase 3 enrollment milestone delays shifted costs to Q4; not structural.' },
      { driverLabel: 'FX Headwind', impact: -12.5, category: 'fx', description: 'Yen depreciation vs ¥151 plan — ¥2.1B per ¥1 move × adverse Q3 average rate.' },
      { driverLabel: 'China VBP Impact', impact: -4.0, category: 'pricing', description: 'China XTANDI volume-based procurement pricing below plan — margin compressed vs plan.' },
      { driverLabel: 'Other', impact: 5.9, category: 'other', description: 'Tax timing, miscellaneous below-the-line items.' },
    ],
  });

  // ---------------------------------------------------------------------------
  // Q2 FY25 Bridges (Jul–Sep 2024 — seasonally softer, R&D peak spend)
  // ---------------------------------------------------------------------------

  // Revenue Bridge: Forecast ¥514B → Actual ¥520.5B
  data.push({
    periodLabel: 'Q2 FY25', plLine: 'Revenue', forecastValue: 514.0, actualValue: 520.5,
    items: [
      { driverLabel: 'XTANDI US July Seasonality Beat', impact: 10.0, category: 'volume', description: 'XTANDI US Q2 volume above plan — new patient starts in urology outpatient setting accelerated after Q1 oncology congress presentations.' },
      { driverLabel: 'PADCEV US Q2 Ramp', impact: 8.5, category: 'volume', description: 'PADCEV US Q2 net sales above plan — EV+pembro combo expanding share in first-line urothelial carcinoma ahead of schedule.' },
      { driverLabel: 'Japan Softer (Off-Season)', impact: -8.0, category: 'volume', description: 'Japan Q2 (Jul–Sep) seasonally soft — hospital procurement lower post April buying season; below plan.' },
      { driverLabel: 'FX Impact', impact: -4.0, category: 'fx', description: 'Yen/USD rate adverse in Q2 vs plan — FX headwind on USD-denominated revenue conversion.' },
      { driverLabel: 'Established Markets In-Line', impact: 2.5, category: 'volume', description: 'EU established markets in line with plan — tender dynamics stable; XTANDI EU volume on track.' },
      { driverLabel: 'Other Revenue', impact: -2.5, category: 'other', description: 'Royalty and contract revenue timing below plan.' },
    ],
  });

  // Q2 FY25 Core OP Bridge
  data.push({
    periodLabel: 'Q2 FY25', plLine: 'Core Operating Profit', forecastValue: 130.0, actualValue: 134.5,
    items: [
      { driverLabel: 'XTANDI & PADCEV Volume', impact: 12.0, category: 'volume', description: 'Combined US product volume above plan drives Core OP above budget at high contribution margins.' },
      { driverLabel: 'R&D Phase Timing', impact: 6.0, category: 'cost', description: 'Q2 R&D spend favorable vs plan — Phase 3 enrollment milestones in two oncology studies delayed by one quarter.' },
      { driverLabel: 'FX Headwind', impact: -4.0, category: 'fx', description: 'Yen depreciation headwind on Core OP vs plan.' },
      { driverLabel: 'Japan Seasonal Miss', impact: -5.0, category: 'volume', description: 'Japan Q2 below plan partially flows through to Core OP at Japan segment margins.' },
      { driverLabel: 'SMT Savings', impact: 5.5, category: 'cost', description: 'SMT savings tracking toward full-year ¥21B target; Q2 contribution above plan.' },
      { driverLabel: 'Other', impact: -10.0, category: 'other', description: 'Miscellaneous opex timing and below-the-line items.' },
    ],
  });

  // ---------------------------------------------------------------------------
  // Q1 FY25 Bridges (Apr–Jun 2024 — fiscal year start, launch planning)
  // ---------------------------------------------------------------------------

  // Revenue Bridge: Forecast ¥534B → Actual ¥542B (+¥8B beat)
  data.push({
    periodLabel: 'Q1 FY25', plLine: 'Revenue', forecastValue: 534.0, actualValue: 542.0,
    items: [
      { driverLabel: 'XTANDI Global Volume Beat', impact: 18.0, category: 'volume', description: 'XTANDI Q1 FY25 net sales above plan across US, EU, and Japan — mHSPC + nmCRPC share gains outpaced forecast in all geographies.' },
      { driverLabel: 'PADCEV Launch Acceleration (US)', impact: 7.5, category: 'volume', description: 'PADCEV Q1 US net sales ahead of plan — bladder cancer prescriber uptake faster than launch model assumptions.' },
      { driverLabel: 'Japan Fiscal Year Open (Seasonal)', impact: 8.0, category: 'volume', description: 'Japan Q1 FY25 (Apr–Jun) benefited from post-NHI-revision hospital restocking above plan.' },
      { driverLabel: 'FX Tailwind (Yen Weak)', impact: 6.5, category: 'fx', description: 'Q1 FY25 yen significantly weaker than initial ¥151 budget — FX revenue tailwind on USD-denominated US revenue.' },
      { driverLabel: 'Price Erosion (Japan & EU)', impact: -12.0, category: 'pricing', description: 'NHI revised pricing effective April 2024 and EU tender dynamics drove below-plan pricing.' },
      { driverLabel: 'China VBP Headwind', impact: -14.0, category: 'volume', description: 'China volume-based procurement (VBP) for XTANDI implemented in Q1 FY25 — large volume but steep price cut below plan assumptions.' },
      { driverLabel: 'Other Revenue', impact: -6.0, category: 'other', description: 'Royalty and milestone revenue timing below Q1 plan.' },
    ],
  });

  // Q1 FY25 Core OP Bridge
  data.push({
    periodLabel: 'Q1 FY25', plLine: 'Core Operating Profit', forecastValue: 137.0, actualValue: 142.0,
    items: [
      { driverLabel: 'XTANDI Volume Upside', impact: 12.0, category: 'volume', description: 'XTANDI global volume above plan at ~65% incremental contribution margin — most R&D fixed costs already planned.' },
      { driverLabel: 'Japan Seasonal & Restocking', impact: 5.0, category: 'volume', description: 'Japan Q1 hospital restocking above plan at domestic segment margins.' },
      { driverLabel: 'FX Tailwind', impact: 6.5, category: 'fx', description: 'Yen weaker than ¥151 plan — favorable FX on Core OP from USD product revenue.' },
      { driverLabel: 'China VBP Margin Compression', impact: -9.0, category: 'pricing', description: 'China VBP pricing cut flows through to Core OP — high volume but steep margin compression vs plan.' },
      { driverLabel: 'Japan Price Revision', impact: -5.5, category: 'pricing', description: 'Japan NHI biennial price revision April 2024 — planned but magnitude at high end of range.' },
      { driverLabel: 'R&D Spend Timing', impact: 4.0, category: 'cost', description: 'Q1 FY25 R&D below plan — two Phase 3 trial start-ups delayed from Q1 into Q2.' },
      { driverLabel: 'Other', impact: -8.0, category: 'other', description: 'SMT savings ramp-up timing and miscellaneous items.' },
    ],
  });

  // Q1 FY25 Core EPS Bridge: Forecast ¥55.0 → Actual ¥57.5
  data.push({
    periodLabel: 'Q1 FY25', plLine: 'Core EPS', forecastValue: 55.0, actualValue: 57.5,
    items: [
      { driverLabel: 'Core OP Beat', impact: 2.2, category: 'volume', description: 'Core OP ¥5B above plan flows to Core EPS at ~60% after-tax efficiency.' },
      { driverLabel: 'Share Buyback (Q1 Progress)', impact: 0.3, category: 'other', description: 'Share repurchase program ahead of Q1 plan — lower diluted share count adds to EPS.' },
      { driverLabel: 'Tax Rate Timing', impact: 0.2, category: 'other', description: 'Effective tax rate marginally below plan in Q1 — R&D credit recognition timing favorable.' },
      { driverLabel: 'Non-Operating Items', impact: -0.2, category: 'other', description: 'Financing costs and FX on non-operating items slightly adverse vs plan.' },
    ],
  });

  return data;
}

export const BRIDGE_DATA = generateBridgeData();

/** Named export for the repository fallback */
export function getBridgeData(): BridgeQuarter[] {
  return BRIDGE_DATA;
}
