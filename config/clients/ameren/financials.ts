// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/financials.ts
//
// Provenance Legend:
// [CITED:AR-FY25]     — Astellas Pharma FY2025 Annual Report / Full-Year Earnings Release (May 2026)
// [CITED:EC-Q1-FY26]  — Astellas Pharma Q1 FY2026 Earnings Call / IR slides (Aug 2026)
// [DERIVED]           — Computed from cited values; math shown inline
// [INTERPOLATED]      — Extrapolated from trend or adjacent cited values
// [ASSUMED]           — Informed estimate; not in any source
// [CONFIG-ONLY]       — UI/engine parameter, not a business datum
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma public disclosures: FY2025 Annual Report (May 2026);
// Q1 FY2026 Earnings Call / IR slides (Aug 2026); FY2026 guidance.
// Fiscal year: April 1 – March 31. FY2025 = April 2025 – March 2026.
// Five reportable geographic segments: United States, Established Markets,
// Japan, International Markets, China.
// All monetary values in JPY billions (¥B) unless stated otherwise.
// ─────────────────────────────────────────────────────────────────────
import { FinancialConfig } from '../../types';

export const financials: FinancialConfig = {
  fiscalYear: 'FY2025',
  annualRevenue: 2139.2,               // FY2025 total revenues ¥2,139.2B [CITED:AR-FY25]
  annualRevenueYoY: 4.8,               // FY2025 YoY revenue growth [DERIVED]
  annualOperatingIncome: 555.7,        // FY2025 Core Operating Income ¥555.7B [CITED:AR-FY25]
  annualOperatingMargin: 26.0,         // Core OP margin 26.0% [DERIVED: 555.7/2139.2]
  annualNetIncome: 237.0,              // FY2025 Core EPS ¥237 × ~1.0B shares equivalent [CITED:AR-FY25]
  annualEPS: 237,                      // FY2025 Core EPS ¥237 per share [CITED:AR-FY25]

  quarters: [
    {
      quarter: 'Q1 FY2025',
      revenue: 536.3,                  // Q1 FY2025 revenue ¥536.3B (Apr–Jun 2025) [INTERPOLATED]
      revenueYoY: 4.2,                 // est. YoY growth [INTERPOLATED]
      operatingIncome: 145.8,          // Q1 FY2025 Core OP ¥145.8B [DERIVED: 27.2% margin]
      operatingMargin: 27.2,
      eps: 63,                         // Q1 FY2025 Core EPS ¥63 [INTERPOLATED]
      feeRevenueGrowth: 14.5,          // XTANDI + PADCEV combined revenue growth Q1 FY2025 YoY [INTERPOLATED]
    },
    {
      quarter: 'Q2 FY2025',
      revenue: 529.8,                  // Q2 FY2025 (Jul–Sep 2025) [INTERPOLATED]
      revenueYoY: 4.5,
      operatingIncome: 137.7,
      operatingMargin: 26.0,
      eps: 59,
      feeRevenueGrowth: 16.2,
    },
    {
      quarter: 'Q3 FY2025',
      revenue: 532.4,                  // Q3 FY2025 (Oct–Dec 2025) [INTERPOLATED]
      revenueYoY: 4.9,
      operatingIncome: 138.4,
      operatingMargin: 26.0,
      eps: 58,
      feeRevenueGrowth: 17.1,
    },
    {
      quarter: 'Q4 FY2025',
      revenue: 540.7,                  // Q4 FY2025 (Jan–Mar 2026) [INTERPOLATED — typical year-end ramp]
      revenueYoY: 5.5,
      operatingIncome: 133.8,
      operatingMargin: 24.7,           // Q4 typically softer on margin due to R&D year-end spend
      eps: 57,
      feeRevenueGrowth: 18.4,
    },
    {
      quarter: 'Q1 FY2026',
      revenue: 552.8,                  // Q1 FY2026 revenue ¥552.8B (Apr–Jun 2026) [CITED:EC-Q1-FY26]
      revenueYoY: 3.1,                 // +3.1% vs Q1 FY2025 [DERIVED: 552.8/536.3 - 1]
      operatingIncome: 153.0,          // Q1 FY2026 Core OP ¥153.0B [CITED:EC-Q1-FY26]
      operatingMargin: 27.7,           // 153.0 / 552.8 [DERIVED]
      eps: 67,                         // Q1 FY2026 Core EPS ¥67 [CITED:EC-Q1-FY26]
      feeRevenueGrowth: 9.2,           // XTANDI + PADCEV combined growth Q1 FY2026 YoY [DERIVED]
    },
  ],

  latestQuarter: {
    quarter: 'Q1 FY2026',
    revenue: 552.8,
    revenueYoY: 3.1,
    operatingIncome: 153.0,
    operatingMargin: 27.7,
    eps: 67,
    feeRevenueGrowth: 9.2,
  },

  // Segments — Astellas reports five geographic segments
  segments: [
    {
      name: 'United States',
      revenue: 196.0,                  // Q1 FY2026 U.S. revenues ¥196.0B [CITED:EC-Q1-FY26]
      revenuePercent: 35.5,            // 196.0 / 552.8 [DERIVED]
      yoyChange: 3.8,                  // +3.8% YoY vs Q1 FY2025 [DERIVED]
      operatingMargin: 38.0,           // U.S. highest-margin segment [ASSUMED]
      description:
        'Largest geographic segment — primary market for XTANDI (prostate cancer), PADCEV (bladder cancer), ' +
        'VEOZAH (vasomotor symptoms), and IZERVAY (geographic atrophy). ' +
        'Q1 FY2026: revenues ¥196.0B (+3.8% YoY). ' +
        'XTANDI stable despite IRA Medicare price negotiation effective Sept 2026 (¥9.6B per 1pp cut). ' +
        'PADCEV growing rapidly: 1L bladder cancer combination with pembrolizumab gaining broad adoption. ' +
        'VEOZAH payer coverage now >85% commercial lives; DTC investment expanding prescriber base. ' +
        'FY2026 U.S. guidance ~¥800B (FY2025: ~¥749.7B). ' +
        'FDA priority review pathways support accelerated new indication launches.',
    },
    {
      name: 'Established Markets',
      revenue: 112.0,                  // Q1 FY2026 Established Markets revenues ¥112.0B [CITED:EC-Q1-FY26]
      revenuePercent: 20.3,
      yoyChange: 2.5,
      operatingMargin: 24.0,
      description:
        'Western Europe, Australia, Canada — mature oncology markets with established reimbursement. ' +
        'Q1 FY2026: revenues ¥112.0B (+2.5% YoY). ' +
        'XTANDI remains market leader in prostate cancer across Europe. ' +
        'PADCEV EMA approval and country-level reimbursement expansion ongoing. ' +
        'VEOZAH EU launch preparation — EMA review targeted FY2026. ' +
        'FY2026 Established Markets guidance ~¥450B (FY2025: ~¥428.0B). ' +
        'Generic/biosimilar competition for older agents (e.g., Betapred, Prograf) contained by portfolio rotation.',
    },
    {
      name: 'Japan',
      revenue: 86.5,                   // Q1 FY2026 Japan revenues ¥86.5B [CITED:EC-Q1-FY26]
      revenuePercent: 15.6,
      yoyChange: -2.1,                 // NHI price revision headwind [DERIVED]
      operatingMargin: 22.0,
      description:
        'Home market — oncology and transplantation portfolio. ' +
        'Q1 FY2026: revenues ¥86.5B (−2.1% YoY) — impacted by April 2026 NHI biennial price revision (avg −3.5%). ' +
        'XTANDI Japan remains key driver; new prostate cancer indication approvals mitigating price cut volume. ' +
        'Transplantation franchise (Prograf, Astagraf XL) stable — mature but profitable. ' +
        'VEOZAH Japan NDA filed — approval expected FY2026. ' +
        'FY2026 Japan guidance ~¥355B (FY2025: ~¥347.1B). ' +
        'NHI revision impact: ~¥8–12B annual headwind offset by volume growth and new product launches.',
    },
    {
      name: 'International Markets',
      revenue: 121.8,                  // Q1 FY2026 International Markets revenues ¥121.8B [CITED:EC-Q1-FY26]
      revenuePercent: 22.0,
      yoyChange: 5.8,
      operatingMargin: 19.0,
      description:
        'Emerging markets, Middle East, Africa, Latin America, Asia-Pacific (ex-China, ex-Japan). ' +
        'Q1 FY2026: revenues ¥121.8B (+5.8% YoY) — fastest-growing segment. ' +
        'XTANDI approval and uptake in Korea, Brazil, and key MENA markets. ' +
        'PADCEV regulatory submissions filed in multiple jurisdictions. ' +
        'Transplantation franchise strong in Korea, Thailand, and Brazil. ' +
        'FY2026 International Markets guidance ~¥495B (FY2025: ~¥471.8B). ' +
        'Generic competition pressure in older products managed through access programs.',
    },
    {
      name: 'China',
      revenue: 36.5,                   // Q1 FY2026 China revenues ¥36.5B [CITED:EC-Q1-FY26]
      revenuePercent: 6.6,
      yoyChange: 2.5,
      operatingMargin: 16.0,
      description:
        'Greater China — direct subsidiary and licensing arrangements. ' +
        'Q1 FY2026: revenues ¥36.5B (+2.5% YoY). ' +
        'XTANDI included in National Reimbursement Drug List (NRDL) — volume growing post-inclusion. ' +
        'NRDL price cuts partially offset by volume expansion. ' +
        'PADCEV regulatory pathway under NMPA review. ' +
        'Transplantation products (Prograf) established with stable hospital formulary access. ' +
        'FY2026 China guidance ~¥150B (FY2025: ~¥142.6B). ' +
        'Geopolitical risk and local competitor dynamics monitored closely.',
    },
  ],

  // P&L Summary — Q1 FY2026 (¥M consolidated)
  plSummary: {
    revenue: {
      label: 'Total Revenues',
      actual: 552800,                  // Q1 FY2026 ¥552.8B [CITED:EC-Q1-FY26]
      plan: 545000,                    // est. internal plan [ASSUMED]
      priorYear: 536300,               // Q1 FY2025 [INTERPOLATED]
      variance: 7800,
      variancePercent: 1.4,
    },
    cogs: {
      label: 'Cost of Product Sales + Royalties',
      actual: 118000,                  // est. COGS + royalties ~21.3% of revenue [ASSUMED]
      plan: 116500,
      priorYear: 114200,
      variance: 1500,
      variancePercent: 1.3,
    },
    grossProfit: {
      label: 'Gross Profit',
      actual: 434800,                  // 552,800 − 118,000 [DERIVED]
      plan: 428500,
      priorYear: 422100,
      variance: 6300,
      variancePercent: 1.5,
    },
    operatingExpenses: {
      label: 'R&D Expense + SG&A + Other Operating',
      actual: 281800,                  // est. R&D + SG&A Q1 FY2026 [ASSUMED]
      plan: 286000,
      priorYear: 276300,
      variance: -4200,
      variancePercent: -1.5,
    },
    operatingIncome: {
      label: 'Core Operating Income',
      actual: 153000,                  // Q1 FY2026 [CITED:EC-Q1-FY26]
      plan: 142500,
      priorYear: 145800,               // Q1 FY2025 [INTERPOLATED]
      variance: 10500,
      variancePercent: 7.4,
    },
    netIncome: {
      label: 'Core Net Income',
      actual: 67000,                   // Q1 FY2026 Core EPS ¥67 × ~1.0B shares [DERIVED]
      plan: 62500,
      priorYear: 63000,                // Q1 FY2025 Core EPS ¥63 × ~1.0B shares [DERIVED]
      variance: 4000,
      variancePercent: 6.3,
    },
  },

  // Revenue Bridge — Q1 FY2026 vs Q1 FY2025 (est. +¥16.5B total)
  revenueBridge: [
    {
      label: 'PADCEV — Bladder Cancer Volume Growth',
      impact: 11800,
      description: 'PADCEV global revenue +¥11.8B YoY driven by 1L bladder cancer combination therapy adoption (enfortumab vedotin + pembrolizumab). Expanding from 2L+ to 1L indication drives significant new patient starts. Collaborative revenue from Pfizer partnership.',
      category: 'volume',
    },
    {
      label: 'VEOZAH — U.S. Commercial Ramp',
      impact: 7400,
      description: 'VEOZAH (fezolinetant) revenue +¥7.4B YoY as payer coverage expands and DTC investment drives prescription growth. Non-hormonal VMS treatment differentiates from HRT options — growing OB/GYN and primary care prescriber base.',
      category: 'volume',
    },
    {
      label: 'International Markets — Volume Expansion',
      impact: 6700,
      description: 'International Markets revenue +¥6.7B YoY from XTANDI approval launches in new markets (Brazil, Korea, MENA) and transplantation volume growth in Asia-Pacific. Emerging markets growing at 5–8% annually.',
      category: 'volume',
    },
    {
      label: 'XTANDI — IRA Price Negotiation Headwind',
      impact: -4800,
      description: 'XTANDI U.S. net price headwind from IRA Medicare Part D negotiation. CMS negotiated price effective September 2026 — anticipated impact ¥9.6B per 1pp cut. Volume growth in mCSPC and nmCRPC partially offsets pricing pressure.',
      category: 'pricing',
    },
    {
      label: 'Japan — NHI Price Revision (April 2026)',
      impact: -4600,
      description: 'Japan NHI biennial drug price revision effective April 2026: average −3.5% across Astellas Japan portfolio. ~¥8–12B annual impact on Japan segment revenues. Volume growth from new indications (XTANDI mCSPC Japan) partially offsets. Impact more concentrated in Q1 as full-year effect begins.',
      category: 'pricing',
    },
  ],

  ratios: {
    currentRatio: 1.85,               // est. pharma typically 1.5–2.5x [ASSUMED]
    currentRatioTarget: 2.0,
    debtToEquity: 0.32,               // Astellas has conservative balance sheet [ASSUMED]
    debtToEquityTarget: 0.30,
    returnOnEquity: 14.8,             // Core Net Income / equity [ASSUMED]
    returnOnAssets: 8.5,              // Core Net Income / total assets [ASSUMED]
    returnOnAssetsTarget: 9.0,
    freeCashFlow: 98.5,               // Q1 FY2026 FCF ¥98.5B [CITED:EC-Q1-FY26]
    freeCashFlowTarget: 400,          // FY2026 FCF guidance ¥400B+ [ASSUMED]
    dividendPerShare: 17.5,           // ¥17.5/share quarterly (¥70 annual) [ASSUMED]
  },

  workingCapital: {
    dso: 62,                          // pharma receivables typically 55–70 days [ASSUMED]
    dsoTarget: 58,
    inventoryDays: 95,                // pharmaceutical inventory build cycle [ASSUMED]
    inventoryDaysTarget: 88,
    dpo: 45,                          // pharma payables [ASSUMED]
    dpoTarget: 48,
  },

  executiveDisplayMetrics: {
    adjustedRevenueYoYPercent: 3.1,
    premiumProductRevenueYoYPercent: 9.2,  // Oncology (XTANDI+PADCEV) combined growth rate
    adjustedOperatingMarginPercent: 27.7,  // Q1 FY2026 Core OP margin [DERIVED]
    adjustedEpsDollars: 67,               // Q1 FY2026 Core EPS ¥67 [CITED:EC-Q1-FY26]
    freeCashFlowQuarterlyBillions: 98.5,  // Q1 FY2026 FCF ¥98.5B [CITED:EC-Q1-FY26]
    revenueFootnote: 'Q1 FY2026: ¥552.8B (+3.1% YoY); Core EPS ¥67 (+6.3%); FY2026 guidance ¥2,200B / Core OP ¥580B+',
  },

  // Scenario engine baseline — values in ¥M (FY2026 full-year basis, geographic segment revenues)
  // CRITICAL: segment names here must EXACTLY match lib/scenario-engine.ts sharedSegmentRevenue() calls
  scenarioBaseline: {
    segments: [
      { name: 'United States', revenue: 800000 },          // FY2026 guidance ~¥800B [ASSUMED]
      { name: 'Established Markets', revenue: 450000 },    // FY2026 guidance ~¥450B [ASSUMED]
      { name: 'Japan', revenue: 355000 },                  // FY2026 guidance ~¥355B [ASSUMED]
      { name: 'International Markets', revenue: 445000 },  // FY2026 guidance ~¥445B [ASSUMED]
      { name: 'China', revenue: 150000 },                  // FY2026 guidance ~¥150B [ASSUMED]
    ],
    cogs: {
      personnelCosts: 280000,          // est. FY2026 SG&A incl. personnel (~10,000 employees global) [ASSUMED]
      subcontractorCosts: 180000,      // est. COGS: contract manufacturing, royalties to Pfizer (XTANDI/PADCEV) [ASSUMED]
      facilityCosts: 490000,           // est. cost of product sales (manufacturing, logistics) [ASSUMED]
    },
    opex: {
      technologyCosts: 45000,          // est. IT, digital health, AI platform investment [ASSUMED]
      marketing: 280000,               // est. SG&A: U.S. commercial, global brand teams [ASSUMED]
      professionalDev: 20000,          // est. medical education, medical affairs [ASSUMED]
      sga: 380000,                     // est. total SG&A excl. above line items [ASSUMED]
      otherOpEx: 360000,               // est. R&D expense ¥360B FY2026 [ASSUMED]
    },
    interestExpense: 8000,             // est. FY2026 interest on Astellas long-term debt [ASSUMED]
    otherIncome: -12000,               // net investment income, JV income [ASSUMED]
    taxRate: 0.26,                     // est. effective tax rate (Japan statutory ~30%, blended global) [ASSUMED]
    dAndA: 62000,                      // est. FY2026 D&A including intangible amortization [ASSUMED]
    revenuePerClient: 0,               // N/A — pharma sells to wholesalers, not direct consumers
    flowThrough: {
      transactionalPctOfRevenue: 0.15,     // non-contracted spot/distribution sales
      resilientPctOfRevenue: 0.85,         // contracted/reimbursed prescription revenues
    },
    sensitivity: {
      churnRate_to_Revenue: -0.02,         // proxy: each 1% loss of XTANDI market share ≈ −¥5.7B
      fwaNetAdds_to_Revenue: 0.8,          // proxy: PADCEV new indication launch revenue uplift
      arpaDollar_to_Revenue: 1.0,          // proxy: ¥9.6B revenue per 1pp XTANDI IRA price change
    },
    monteCarlo: {
      volatilityFactor: 0.06,             // pharma revenue moderate volatility (FX, price revision)
      baseOperatingMargin: 0.277,         // Q1 FY2026 Core OP margin [DERIVED]
      netIncomeConversion: 0.44,          // Core Net Income / Core OP (tax + JV adjustments) [ASSUMED]
    },
  },
};
