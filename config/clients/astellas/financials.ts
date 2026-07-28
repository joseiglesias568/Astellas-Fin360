// v1 — Astellas Pharma Inc.
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/financials.ts
//
// Provenance Legend:
// [CITED:4Q-FY25]      — Astellas FY2025 Full Year Financial Results (April 27, 2026)
// [CITED:3Q-FY25]      — Astellas 9M FY2025 Financial Results (February 4, 2026)
// [CITED:2Q-FY25]      — Astellas H1 FY2025 Financial Results (October 30, 2025)
// [CITED:1Q-FY25]      — Astellas Q1 FY2025 Financial Results (July 30, 2025)
// [DERIVED]            — Computed from cited values; math shown inline
// [INTERPOLATED]       — Extrapolated from trend or adjacent cited values
// [ASSUMED]            — Informed estimate; not in any source
// [CONFIG-ONLY]        — UI/engine parameter, not a business datum
//
// ─────────────────────────────────────────────────────────────────────
// CURRENCY NOTE: All monetary values are in billions of JPY (annual/quarterly)
// or millions of JPY (plSummary). Exchange rate reference: FY2025 avg ¥151/USD.
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Inc. public disclosures:
//   FY2025 Full Year Financial Results (April 27, 2026)
//   9M FY2025 Financial Results (February 4, 2026)
//   H1 FY2025 Financial Results (October 30, 2025)
//   Q1 FY2025 Financial Results (July 30, 2025)
// Fiscal year: April 1 – March 31 (FY2025 = April 2025 – March 2026)
// Single reportable segment: "Pharmaceutical"
// Geographic breakdown: United States, Japan, Established Markets, China, International Markets
// ─────────────────────────────────────────────────────────────────────
import { FinancialConfig } from '../../types';

export const financials: FinancialConfig = {
  fiscalYear: 'FY2025',
  annualRevenue: 2139.2,               // FY2025 consolidated revenue ¥2,139.2B [CITED:4Q-FY25]
  annualRevenueYoY: 11.9,              // +11.9% vs FY2024 ¥1,912.3B [CITED:4Q-FY25]
  annualOperatingIncome: 555.7,        // FY2025 core operating profit ¥555.7B [CITED:4Q-FY25]
  annualOperatingMargin: 26.0,         // 555.7 / 2139.2 [DERIVED]
  annualNetIncome: 291.6,              // FY2025 profit attributable to owners ¥291.6B (full basis) [CITED:4Q-FY25]
  annualEPS: 237.01,                   // FY2025 basic core EPS ¥237.01 [CITED:4Q-FY25]

  quarters: [
    // FY2024 (April 2024 – March 2025) — for trend context
    {
      quarter: 'Q1 FY24',
      revenue: 473.1,                  // Q1 FY2024 revenue ¥473.1B [CITED:1Q-FY25 — prior period shown]
      revenueYoY: 17.5,                // estimate vs Q1 FY2023 [INTERPOLATED based on FY24 +19.2% full year]
      operatingIncome: 88.3,           // Q1 FY2024 core OP ¥88.3B [CITED:1Q-FY25 — prior period shown]
      operatingMargin: 18.7,           // 88.3 / 473.1 [DERIVED]
      eps: 37.50,                      // Q1 FY2024 basic core EPS ¥37.50 [CITED:1Q-FY25 — prior period]
      feeRevenueGrowth: 38.0,          // Strategic Brands growth estimate Q1 FY24 [INTERPOLATED]
    },
    {
      quarter: 'Q2 FY24',
      revenue: 462.5,                  // Q2 FY2024: H1 FY24 ¥935.6B – Q1 FY24 ¥473.1B [DERIVED]
      revenueYoY: 18.5,                // estimate [INTERPOLATED]
      operatingIncome: 94.8,           // Q2 FY2024: H1 FY24 ¥183.1B – Q1 FY24 ¥88.3B [DERIVED]
      operatingMargin: 20.5,           // 94.8 / 462.5 [DERIVED]
      eps: 41.12,                      // Q2 FY2024: H1 EPS ¥78.62 – Q1 ¥37.50 [DERIVED]
      feeRevenueGrowth: 40.0,          // Strategic Brands growth estimate Q2 FY24 [INTERPOLATED]
    },
    {
      quarter: 'Q3 FY24',
      revenue: 517.4,                  // Q3 FY2024: 9M FY24 ¥1,453.0B – H1 FY24 ¥935.6B [DERIVED]
      revenueYoY: 20.5,                // estimate [INTERPOLATED]
      operatingIncome: 114.4,          // Q3 FY2024: 9M FY24 ¥297.5B – H1 FY24 ¥183.1B [DERIVED]
      operatingMargin: 22.1,           // 114.4 / 517.4 [DERIVED]
      eps: 45.98,                      // Q3 FY2024: 9M EPS ¥124.60 – H1 ¥78.62 [DERIVED]
      feeRevenueGrowth: 42.0,          // Strategic Brands growth estimate Q3 FY24 [INTERPOLATED]
    },
    {
      quarter: 'Q4 FY24',
      revenue: 459.3,                  // Q4 FY2024: FY24 ¥1,912.3B – 9M ¥1,453.0B [DERIVED]
      revenueYoY: 20.2,                // estimate [INTERPOLATED]
      operatingIncome: 94.9,           // Q4 FY2024: FY24 ¥392.4B – 9M ¥297.5B [DERIVED]
      operatingMargin: 20.7,           // 94.9 / 459.3 [DERIVED]
      eps: 40.57,                      // Q4 FY2024: FY24 EPS ¥165.17 – 9M ¥124.60 [DERIVED]
      feeRevenueGrowth: 45.0,          // Strategic Brands growth estimate Q4 FY24 [INTERPOLATED]
    },
    // FY2025 (April 2025 – March 2026) — most recent full fiscal year
    {
      quarter: 'Q1 FY25',
      revenue: 505.8,                  // Q1 FY2025 revenue ¥505.8B [CITED:1Q-FY25]
      revenueYoY: 6.9,                 // +6.9% vs Q1 FY2024 ¥473.1B [CITED:1Q-FY25]
      operatingIncome: 142.3,          // Q1 FY2025 core OP ¥142.3B [CITED:1Q-FY25]
      operatingMargin: 28.1,           // 142.3 / 505.8 [DERIVED]
      eps: 58.49,                      // Q1 FY2025 basic core EPS ¥58.49 [CITED:1Q-FY25]
      feeRevenueGrowth: 52.0,          // Strategic Brands growth Q1 FY25 (PADCEV +39%, VYLOY launch) [CITED:1Q-FY25]
    },
    {
      quarter: 'Q2 FY25',
      revenue: 524.3,                  // Q2 FY2025: H1 FY25 ¥1,030.1B – Q1 FY25 ¥505.8B [DERIVED]
      revenueYoY: 13.4,                // 524.3 / 462.5 – 1 [DERIVED]
      operatingIncome: 140.3,          // Q2 FY2025: H1 FY25 ¥282.6B – Q1 FY25 ¥142.3B [DERIVED]
      operatingMargin: 26.8,           // 140.3 / 524.3 [DERIVED]
      eps: 59.59,                      // Q2 FY2025: H1 EPS ¥118.08 – Q1 ¥58.49 [DERIVED]
      feeRevenueGrowth: 47.0,          // Strategic Brands growth Q2 FY25 [INTERPOLATED]
    },
    {
      quarter: 'Q3 FY25',
      revenue: 571.2,                  // Q3 FY2025: 9M FY25 ¥1,601.3B – H1 FY25 ¥1,030.1B [DERIVED]
      revenueYoY: 10.4,                // 571.2 / 517.4 – 1 [DERIVED]
      operatingIncome: 159.5,          // Q3 FY2025: 9M FY25 ¥442.1B – H1 FY25 ¥282.6B [DERIVED]
      operatingMargin: 27.9,           // 159.5 / 571.2 [DERIVED]
      eps: 67.12,                      // Q3 FY2025: 9M EPS ¥185.20 – H1 ¥118.08 [DERIVED]
      feeRevenueGrowth: 41.0,          // Strategic Brands growth Q3 FY25 [CITED:3Q-FY25]
    },
    {
      quarter: 'Q4 FY25',
      revenue: 537.9,                  // Q4 FY2025: FY25 ¥2,139.2B – 9M ¥1,601.3B [DERIVED]
      revenueYoY: 17.1,                // 537.9 / 459.3 – 1 [DERIVED]
      operatingIncome: 113.6,          // Q4 FY2025: FY25 ¥555.7B – 9M ¥442.1B [DERIVED]
      operatingMargin: 21.1,           // 113.6 / 537.9 [DERIVED — lower Q4 due to SG&A timing]
      eps: 51.81,                      // Q4 FY2025: FY25 EPS ¥237.01 – 9M ¥185.20 [DERIVED]
      feeRevenueGrowth: 35.0,          // Strategic Brands growth Q4 FY25 (VYLOY +415% full year) [CITED:4Q-FY25]
    },
    // FY2026 Q1 forecast (Astellas guidance issued April 27, 2026)
    {
      quarter: 'Q1 FY26',
      revenue: 555.0,                  // est. Q1 FY2026 based on FY2026 guidance ¥2,220B / 4 [INTERPOLATED]
      revenueYoY: 9.7,                 // est. vs Q1 FY25 ¥505.8B [INTERPOLATED]
      operatingIncome: 165.0,          // est. based on FY2026 core OP guidance ¥620B / 4 [INTERPOLATED]
      operatingMargin: 29.7,           // 165.0 / 555.0 [DERIVED]
      eps: 64.2,                       // est. based on FY2026 core EPS guidance ¥256.77 / 4 [INTERPOLATED]
      feeRevenueGrowth: 27.0,          // est. Strategic Brands growth FY2026 guidance +27% [CITED:4Q-FY25]
    },
  ],

  latestQuarter: {
    quarter: 'Q4 FY25',
    revenue: 537.9,
    revenueYoY: 17.1,
    operatingIncome: 113.6,
    operatingMargin: 21.1,
    eps: 51.81,
    feeRevenueGrowth: 35.0,
  },

  // Geographic segments — FY2025 annual revenue by region [CITED:4Q-FY25]
  segments: [
    {
      name: 'United States',
      revenue: 940.2,                  // FY2025 US revenue ¥940.2B [CITED:4Q-FY25]
      revenuePercent: 44.0,            // 940.2 / 2139.2 [DERIVED]
      yoyChange: 8.5,                  // +8.5% vs FY2024 ¥866.4B [CITED:4Q-FY25]
      operatingMargin: 30.0,           // estimated US operating margin [ASSUMED — US is highest-margin region]
      description:
        'Largest revenue region, driven primarily by XTANDI (prostate cancer) and PADCEV (urothelial cancer). ' +
        'FY2025: ¥940.2B (+8.5% YoY). XTANDI US co-promotion with Pfizer; PADCEV US co-promotion with Seagen (Pfizer). ' +
        'PADCEV first-line mUC approval (EV+pembro) driving strong uptake. ' +
        'IZERVAY (geographic atrophy) and VEOZAH (vasomotor symptoms) recently launched, showing steady growth. ' +
        'Key risk: US IRA drug price negotiation may pressure XTANDI pricing from FY2026. ' +
        'XTANDI US patent exclusivity through ~2027. FY2026 guidance expects XTANDI US decline of ~¥50B.',
    },
    {
      name: 'Established Markets',
      revenue: 563.6,                  // FY2025 Established Markets revenue ¥563.6B [CITED:4Q-FY25]
      revenuePercent: 26.4,            // 563.6 / 2139.2 [DERIVED]
      yoyChange: 16.1,                 // +16.1% vs FY2024 ¥485.4B [CITED:4Q-FY25]
      operatingMargin: 27.0,           // estimated [ASSUMED]
      description:
        'Europe, Canada, and other mature markets. Fastest-growing major region in FY2025. ' +
        'XTANDI patent exclusivity in Europe extends ~28 years (longer than US). ' +
        'PADCEV and VYLOY expansion across EU markets driving outperformance vs US. ' +
        'FY2025: ¥563.6B (+16.1% YoY). VYLOY (gastric cancer) approved and launched in EU, Japan. ' +
        'VEOZAH approved as "VEOZA" in EU markets. Strong uptake across oncology portfolio. ' +
        'Strategic Brands driving above-market growth vs peers in European pharma.',
    },
    {
      name: 'Japan',
      revenue: 289.0,                  // FY2025 Japan revenue ¥289.0B [CITED:4Q-FY25]
      revenuePercent: 13.5,            // 289.0 / 2139.2 [DERIVED]
      yoyChange: 8.2,                  // +8.2% vs FY2024 ¥267.0B [CITED:4Q-FY25]
      operatingMargin: 24.0,           // estimated Japan operating margin [ASSUMED]
      description:
        'Domestic Japan market. Headquarters-based operations with Astellas founding market roots. ' +
        'FY2025: ¥289.0B (+8.2% YoY). XTANDI and PADCEV leading growth in oncology. ' +
        'VYLOY (zolbetuximab) launched in Japan for gastric adenocarcinoma. ' +
        'Japanese market subject to biennial National Health Insurance (NHI) drug price revisions. ' +
        'XOSPATA (gilteritinib, AML) strong continued uptake. Prograf (tacrolimus) stable. ' +
        'Strong pipeline of Japanese submissions from Astellas and partnership collaborations.',
    },
    {
      name: 'International Markets',
      revenue: 230.7,                  // FY2025 International Markets revenue ¥230.7B [CITED:4Q-FY25]
      revenuePercent: 10.8,            // 230.7 / 2139.2 [DERIVED]
      yoyChange: 13.4,                 // +13.4% vs FY2024 ¥203.5B [CITED:4Q-FY25]
      operatingMargin: 18.0,           // estimated [ASSUMED — emerging markets have lower margins]
      description:
        'Latin America, Middle East, Africa, South East Asia, South Asia, Russia, Korea, Taiwan, Australia, Export. ' +
        'FY2025: ¥230.7B (+13.4% YoY). Broad geographic diversification across 40+ countries. ' +
        'XTANDI and PADCEV expanding to emerging markets. ' +
        'High growth driven by market access gains in South East Asia and Korea.',
    },
    {
      name: 'China',
      revenue: 101.5,                  // FY2025 China revenue ¥101.5B [CITED:4Q-FY25]
      revenuePercent: 4.7,             // 101.5 / 2139.2 [DERIVED]
      yoyChange: 29.6,                 // +29.6% vs FY2024 ¥78.3B [CITED:4Q-FY25] — fastest growing region
      operatingMargin: 15.0,           // estimated [ASSUMED — China NHI pricing pressure]
      description:
        'China and Hong Kong. Fastest-growing revenue region in FY2025. ' +
        'FY2025: ¥101.5B (+29.6% YoY). ' +
        'VYLOY filing planned for China; high Claudin 18 testing penetration supporting VYLOY uptake. ' +
        'XTANDI and PADCEV continuing market expansion. Strong demand for oncology portfolio. ' +
        'NHI national reimbursement pricing pressure is key risk for Chinese market margins.',
    },
  ],

  // P&L Summary — FY2025 full year (millions of JPY, core basis)
  plSummary: {
    revenue: {
      label: 'Revenue',
      actual: 2139245,                 // FY2025 actual ¥2,139.245B [CITED:4Q-FY25]
      plan: 2060000,                   // FY2025 original plan est. [ASSUMED — beat guidance by ~¥79B]
      priorYear: 1912323,              // FY2024 actual ¥1,912.323B [CITED:4Q-FY25]
      variance: 79245,                 // +¥79.2B vs plan [DERIVED]
      variancePercent: 3.8,            // 79245 / 2060000 [DERIVED]
    },
    cogs: {
      label: 'Cost of Sales',
      actual: 408426,                  // FY2025 cost of sales ¥408.4B [CITED:4Q-FY25]
      plan: 395000,                    // est. plan [ASSUMED]
      priorYear: 349206,               // FY2024 ¥349.2B [CITED:4Q-FY25]
      variance: 13426,
      variancePercent: 3.4,
    },
    grossProfit: {
      label: 'Gross Profit',
      actual: 1730820,                 // FY2025 gross profit ¥1,730.8B [CITED:4Q-FY25]
      plan: 1665000,                   // est. [DERIVED]
      priorYear: 1563117,              // FY2024 ¥1,563.1B [CITED:4Q-FY25]
      variance: 65820,                 // +¥65.8B vs plan [DERIVED]
      variancePercent: 3.9,
    },
    operatingExpenses: {
      label: 'SG&A + R&D Expenses',
      actual: 1175139,                 // FY2025 SG&A ¥860.3B + R&D ¥314.8B [CITED:4Q-FY25]
      plan: 1200000,                   // est. plan — costs came in below target [ASSUMED]
      priorYear: 1170683,              // FY2024 SG&A ¥843.0B + R&D ¥327.7B [CITED:4Q-FY25]
      variance: -24861,                // favorable: -¥24.9B vs plan [DERIVED]
      variancePercent: -2.1,
    },
    operatingIncome: {
      label: 'Core Operating Profit',
      actual: 555681,                  // FY2025 core OP ¥555.7B [CITED:4Q-FY25]
      plan: 465000,                    // est. original plan — significant outperformance [ASSUMED]
      priorYear: 392435,               // FY2024 core OP ¥392.4B [CITED:4Q-FY25]
      variance: 90681,                 // +¥90.7B vs plan [DERIVED]
      variancePercent: 19.5,
    },
    netIncome: {
      label: 'Core Profit',
      actual: 424413,                  // FY2025 core profit ¥424.4B [CITED:4Q-FY25]
      plan: 360000,                    // est. plan [ASSUMED]
      priorYear: 295682,               // FY2024 core profit ¥295.7B [CITED:4Q-FY25]
      variance: 64413,
      variancePercent: 17.9,
    },
  },

  // Revenue Bridge — FY2025 vs FY2024 (+¥226.9B)
  revenueBridge: [
    {
      label: 'XTANDI — Volume & Market Penetration',
      impact: 48500,                   // +5.3% × ¥912.3B base ≈ ¥48.5B [DERIVED from CITED:4Q-FY25]
      description: 'XTANDI (enzalutamide) prostate cancer market expansion. Steadily increasing sales across all regions outside the US, particularly Established Markets. EU patent protection through ~2028+. Global sales ¥960.8B in FY2025.',
      category: 'volume',
    },
    {
      label: 'PADCEV — First-Line mUC Approval Uptake',
      impact: 57100,                   // +¥57.1B = +34.8% × ¥164.1B base [CITED:4Q-FY25]
      description: 'PADCEV (enfortumab vedotin) urothelial cancer, including new first-line metastatic urothelial cancer approval. Early momentum for cisplatin-ineligible MIBC. Combined with pembrolizumab (EV+pembro).',
      category: 'volume',
    },
    {
      label: 'VYLOY — New Product Launch',
      impact: 50900,                   // +¥50.9B = +415.6% from ¥12.2B base [CITED:4Q-FY25]
      description: 'VYLOY (zolbetuximab) gastric/GEJ adenocarcinoma. Launched in FY2024; high Claudin 18 testing penetration driving significant global sales growth. Fastest-growing product by absolute contribution.',
      category: 'volume',
    },
    {
      label: 'IZERVAY / VEOZAH — Strategic Brand Momentum',
      impact: 32100,                   // IZERVAY +¥19.3B + VEOZAH +¥12.8B [CITED:4Q-FY25]
      description: 'IZERVAY (avacincaptad pegol) geographic atrophy: steady US expansion. VEOZAH (fezolinetant) vasomotor symptoms due to menopause: global steady expansion, primarily US. Both recently launched specialty products.',
      category: 'volume',
    },
    {
      label: 'Exchange Rate Impact',
      impact: 30100,                   // FY2025 FX favorable ¥30.1B vs FY2024 rates [CITED:4Q-FY25]
      description: 'Foreign exchange impact: ¥30.1B revenue increase vs FY2024 exchange rates applied. EUR/JPY weakened (¥164 → ¥175/€), partially offset by USD/JPY slight strengthening (¥152 → ¥151/$).',
      category: 'fx',
    },
    {
      label: 'Base Erosion — Older Products',
      impact: -8700,                   // net decline in non-strategic brands [DERIVED/ASSUMED]
      description: 'Prograf (tacrolimus), Lexiscan, Myrbetriq (mirabegron) and other mature products experiencing generic competition and volume decline. Partially offset by XOSPATA (+¥3.8B, AML market growth).',
      category: 'mix',
    },
  ],

  ratios: {
    currentRatio: 1.17,               // Current assets ¥1,421.9B / Current liabilities ¥1,218.4B [DERIVED:CITED:4Q-FY25]
    currentRatioTarget: 1.30,
    debtToEquity: 0.95,               // Total debt ¥566B / Total equity ¥1,830.9B [DERIVED:CITED:4Q-FY25]
    debtToEquityTarget: 0.80,         // Target leverage ratio 1.0–1.5x EBIT [CITED:4Q-FY25]
    returnOnEquity: 17.4,             // FY2025 ROE 17.4% [CITED:4Q-FY25]
    returnOnAssets: 10.9,             // Profit before tax / Total assets [CITED:4Q-FY25]
    returnOnAssetsTarget: 12.0,
    freeCashFlow: 560.2,              // FY2025 cash flows from operating activities ¥560.2B [CITED:4Q-FY25]
    freeCashFlowTarget: 550.0,        // Target operational cash generation [ASSUMED]
    dividendPerShare: 78.0,           // FY2025 annual dividend ¥78/share [CITED:4Q-FY25]
  },

  workingCapital: {
    dso: 45,                          // pharmaceutical trade receivables typically 40–50 days [ASSUMED]
    dsoTarget: 42,
    inventoryDays: 90,                // pharmaceutical inventory 80–100 days typical [ASSUMED]
    inventoryDaysTarget: 85,
    dpo: 60,                          // pharmaceutical payables 55–65 days [ASSUMED]
    dpoTarget: 60,
  },

  executiveDisplayMetrics: {
    adjustedRevenueYoYPercent: 11.9,
    premiumProductRevenueYoYPercent: 43.0,       // Strategic Brands combined growth rate [CITED:4Q-FY25]
    adjustedOperatingMarginPercent: 26.0,        // FY2025 core operating margin [CITED:4Q-FY25]
    adjustedEpsDollars: 237.01,                  // FY2025 basic core EPS ¥237.01 [CITED:4Q-FY25]
    freeCashFlowQuarterlyBillions: 560.2,        // FY2025 operating cash flow ¥560.2B [CITED:4Q-FY25]
    revenueFootnote: 'FY2025: ¥2,139.2B (+11.9% YoY); core OP ¥555.7B (+41.6%); FY2026 guidance ¥2,220B revenue, ¥620B core OP',
  },

  // Scenario engine baseline — values in millions of JPY (FY2026 guidance basis)
  // CRITICAL: segment names here must EXACTLY match lib/scenario-engine.ts sharedSegmentRevenue() calls
  scenarioBaseline: {
    segments: [
      { name: 'United States', revenue: 985000 },          // FY2026 est. US ~¥985B (XTANDI -¥50B, Strategic Brands +¥75B) [DERIVED]
      { name: 'Established Markets', revenue: 630000 },    // FY2026 est. EM +12% [INTERPOLATED]
      { name: 'Japan', revenue: 310000 },                  // FY2026 est. Japan +7% [INTERPOLATED]
      { name: 'International Markets', revenue: 255000 },  // FY2026 est. +10% [INTERPOLATED]
      { name: 'China', revenue: 125000 },                  // FY2026 est. China +23% [INTERPOLATED]
    ],
    cogs: {
      personnelCosts: 38000,           // est. FY2026 R&D personnel + lab costs [ASSUMED]
      subcontractorCosts: 12000,       // est. contract research, CROs, CMOs [ASSUMED]
      facilityCosts: 380000,           // est. manufacturing, supply chain, distribution [ASSUMED]
    },
    opex: {
      technologyCosts: 25000,          // est. IT, digital health, data science [ASSUMED]
      marketing: 120000,               // est. commercial / promotional spend [ASSUMED]
      professionalDev: 8000,           // est. training, medical affairs [ASSUMED]
      sga: 135000,                     // est. corporate G&A [ASSUMED]
    },
  },
};
