// =============================================================================
// Astellas Pharma Inc. P&L Scenario Calculation Engine
//
// Levers: XTANDI IRA, Strategic Brands, SMT, FX, China growth, R&D
// Lever vocabulary matches the seeded ScenarioLever table
// (prisma/seeds/08-scenarios.ts). All impacts are computed as the delta
// between the user-selected slider value and the lever's seeded default.
//
// Segments match config/clients/astellas/financials.ts scenarioBaseline.segments:
//   United States (¥940,200M), Established Markets (¥563,600M),
//   Japan (¥289,000M), International Markets (¥230,700M), China (¥101,500M)
// Sensitivities anchored to Astellas FY2025 investor disclosures and annual report.
//
// CRITICAL: sharedSegmentRevenue() arg strings must EXACTLY match
// config/clients/astellas/financials.ts → scenarioBaseline.segments[].name
// A mismatch silently returns ¥0 with no runtime error.
// =============================================================================

import type { ScenarioBaselinePL } from '@/config/types';
import { financials } from '../config/clients/astellas/financials';
import { computeSimulationStats, normalRandom } from '@/lib/engines/statistical-engine';

const SHARED_BASELINE = financials.scenarioBaseline;

// Hardcoded fallback defaults mirroring prisma/seeds/08-scenarios.ts Astellas levers.
// Used only when callers don't pass leverDefs (e.g. tests).
// CRITICAL: keys must EXACTLY match externalId values in 08-scenarios.ts
const FALLBACK_DEFAULTS: Record<string, number> = {
  'xtandi-ira-price-reduction': 0,           // % IRA net price reduction (0=no cut, risk ≤ 20%)
  'xtandi-volume-growth':       5.3,          // % XTANDI global volume growth (FY2025 actual)
  'strategic-brands-growth':   43.0,          // % Strategic Brands combined growth rate
  'smt-savings-fy26':          40,            // ¥B SMT savings FY2026 (target ¥40B)
  'fx-usd-jpy':               151,            // USD/JPY exchange rate (FY2025 avg)
  'china-revenue-growth':      29.6,          // % China revenue growth
  'rd-poc-success':             3,            // Number of POC achievements in period (FY2025 actual: 3)
};

// Astellas P&L sensitivity constants anchored to FY2025 investor disclosures and annual report
const ASTELLAS_SENSITIVITY = {
  xtandiIRAPerPp:        9608,   // ¥M revenue per 1pp IRA price reduction (¥960.8B × 1%)
  xtandiVolumePerPp:     9608,   // ¥M revenue per 1pp XTANDI volume growth
  strategicBrandsPerPp:  4803,   // ¥M revenue per 1pp Strategic Brands growth (¥480.3B × 1%)
  smtSavingsPerBn:       1000,   // ¥M Core OP impact per ¥1B SMT savings (1:1)
  fxPerYen:              2139,   // ¥M revenue per ¥1/USD movement (~¥2.1B per ¥1 FX)
  chinaRevenuePerPp:     1015,   // ¥M per 1pp China revenue growth (¥101.5B × 1%)
  rdSavingsPerPoc:      15000,   // ¥M R&D savings per POC failure averted (cost avoidance)
} as const;

export interface ScenarioImpactResult {
  revenueImpact: number;        // ¥M delta vs baseline
  ebitdaImpact: number;         // ¥M delta
  epsImpact: number;            // ¥/share delta
  rateBaseImpact: number;       // leverage ratio delta (x)
  ffoDebtImpact: number;        // bps proxy for leverage ratio change
  capexImpact: number;          // ¥M delta (CFO proxy)
  segments: {
    hcb: { revenue: number; aoi: number };
    hss: { revenue: number; aoi: number };
    pcw: { revenue: number; aoi: number };
    corp: { aoi: number };
  };
  scenarios: { name: string; probability: number; epsOutcome: number }[];
  summary: string;
}

export interface PLImpactResult {
  // Revenue impacts (¥M deltas from baseline)
  // Field names preserved for frontend compatibility; Astellas product mapping in comments
  revenue: number;
  advisoryServices: number;       // XTANDI revenue impact (IRA + volume levers)
  buildingOperations: number;     // Strategic Brands revenue impact (PADCEV, XOSPATA, IZERVAY, VYLOY, VEOZAH)
  projectManagement: number;      // China + geographic diversification revenue impact
  realEstateInvestments: number;  // FX revenue impact (USD/JPY movement)

  // COGS impacts
  personnelCosts: number;
  subcontractorCosts: number;
  facilityCosts: number;
  cogs: number;
  grossProfit: number;

  // Operating expense impacts
  technologyCosts: number;
  marketing: number;
  professionalDev: number;
  sga: number;
  otherOpEx: number;
  opEx: number;

  // Bottom-line impacts
  operatingIncome: number;
  interest: number;
  ebt: number;
  tax: number;
  netIncome: number;
  operatingMargin: number;

  // Base values for display
  baseRevenue: number;
  baseAdvisoryServices: number;
  baseBuildingOperations: number;
  baseProjectManagement: number;
  baseRealEstateInvestments: number;
  basePersonnelCosts: number;
  baseSubcontractorCosts: number;
  baseFacilityCosts: number;
  baseCOGS: number;
  baseGrossProfit: number;
  baseTechnologyCosts: number;
  baseMarketing: number;
  baseProfessionalDev: number;
  baseSGandA: number;
  baseOtherOpEx: number;
  baseOpEx: number;
  baseOperatingIncome: number;
  baseInterest: number;
  baseOtherIncome: number;
  baseEBT: number;
  baseTax: number;
  baseNetIncome: number;
}

export interface SimulationResult {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  mean: number;
  stdDev: number;
  confidence95Lower: number;
  confidence95Upper: number;
}

export type MonteCarloResults = Record<string, SimulationResult>;

export interface LeverDef {
  id: string;
  min: number;
  max: number;
  default: number;
}

function segmentRevenue(
  baselinePL: ScenarioBaselinePL | undefined,
  name: string,
  fallback: number,
): number {
  return baselinePL?.segments?.find(s => s.name === name)?.revenue ?? fallback;
}

function sharedSegmentRevenue(segmentName: string): number {
  const hit = SHARED_BASELINE.segments.find((s) => s.name === segmentName);
  if (!hit) {
    throw new Error(`scenario-engine: missing segment "${segmentName}" in scenarioBaseline`);
  }
  return hit.revenue;
}

// =============================================================================
// P&L IMPACT CALCULATION
//
// Sign convention (must stay aligned with ScenarioModelingClient.tsx):
// - Revenue, gross profit, operating income, net income: delta >= 0 -> green.
// - COGS & OpEx breakdown rows: delta > 0 -> higher expense vs baseline -> red.
// - Interest expense row: delta > 0 -> higher interest vs baseline -> red.
// - Tax row: delta <= 0 -> green (lower incremental tax vs scenario delta).
// =============================================================================

export function calculateImpact(
  leverValues: Record<string, number>,
  baselineRevenueB: number,
  baselinePL?: ScenarioBaselinePL,
  leverDefs?: LeverDef[],
): PLImpactResult {
  const baseRevenue = baselineRevenueB * 1000;
  const bl = baselinePL ?? SHARED_BASELINE;

  // ─── Resolve segment baselines ───────────────────────────────────────────
  // United States: XTANDI-dominant US segment (¥940,200M FY2025)
  const baseAdvisoryServices = segmentRevenue(
    bl, 'United States', sharedSegmentRevenue('United States'),
  );
  // Established Markets: key geography for Strategic Brands (¥563,600M FY2025)
  const baseBuildingOperations = segmentRevenue(
    bl, 'Established Markets', sharedSegmentRevenue('Established Markets'),
  );
  // China + International Markets: geographic growth opportunity (¥332,200M combined FY2025)
  const baseProjectManagement =
    segmentRevenue(bl, 'China', sharedSegmentRevenue('China')) +
    segmentRevenue(bl, 'International Markets', sharedSegmentRevenue('International Markets'));
  // FX impact: not a separate segment; driven by USD/JPY rate movement
  const baseRealEstateInvestments = 0;

  // ─── Resolve cost baselines ──────────────────────────────────────────────
  // SG&A (subject to SMT savings programme, FY2025 ¥860,300M)
  const basePersonnelCosts = bl.cogs?.personnelCosts ?? SHARED_BASELINE.cogs.personnelCosts;
  // R&D investment (FY2025 ¥314,800M)
  const baseSubcontractorCosts = bl.cogs?.subcontractorCosts ?? SHARED_BASELINE.cogs.subcontractorCosts;
  // Cost of Sales (dominant cost item, FY2025 ¥408,410M, ~19.1% of revenue)
  const baseFacilityCosts = bl.cogs?.facilityCosts ?? SHARED_BASELINE.cogs.facilityCosts;
  const baseCOGS = basePersonnelCosts + baseSubcontractorCosts + baseFacilityCosts;
  const baseGrossProfit = baseRevenue - baseCOGS;

  // Technology / digital investment
  const baseTechnologyCosts = bl.opex?.technologyCosts ?? SHARED_BASELINE.opex.technologyCosts;
  // Marketing and promotional spend (PADCEV, VYLOY, VEOZAH launches)
  const baseMarketing = bl.opex?.marketing ?? SHARED_BASELINE.opex.marketing;
  const baseProfessionalDev = bl.opex?.professionalDev ?? SHARED_BASELINE.opex.professionalDev;
  const baseSGandA = bl.opex?.sga ?? SHARED_BASELINE.opex.sga;
  // Intangible amortisation + other operating expenses
  const baseOtherOpEx = bl.opex?.otherOpEx ?? SHARED_BASELINE.opex.otherOpEx;
  const baseOpEx = baseTechnologyCosts + baseMarketing + baseProfessionalDev + baseSGandA + baseOtherOpEx;

  const baseOperatingIncome = baseGrossProfit - baseOpEx;
  const baseInterest = bl.interestExpense ?? SHARED_BASELINE.interestExpense;
  const baseOtherIncome = bl.otherIncome ?? SHARED_BASELINE.otherIncome;
  const baseEBT = baseOperatingIncome - baseInterest + baseOtherIncome;
  const taxRate = bl.taxRate ?? SHARED_BASELINE.taxRate;
  const baseTax = Math.round(baseEBT * taxRate);
  const baseNetIncome = baseEBT - baseTax;

  // ─── Build defaults map for delta-from-default math ──────────────────────
  const defaults: Record<string, number> = { ...FALLBACK_DEFAULTS };
  if (leverDefs) {
    leverDefs.forEach(l => { defaults[l.id] = l.default; });
  }

  // delta() returns (current - default) in the lever's native unit
  const delta = (id: string): number => {
    const d = defaults[id] ?? 0;
    const v = leverValues[id];
    return (v ?? d) - d;
  };

  // ─── XTANDI REVENUE IMPACT (advisoryServices / US segment) ───────────────
  // IRA price reduction: each +1pp reduction = −¥9,608M XTANDI revenue
  const iraDelta = delta('xtandi-ira-price-reduction');    // positive = larger IRA price cut
  const iraRevenueImpact = -iraDelta * ASTELLAS_SENSITIVITY.xtandiIRAPerPp;

  // XTANDI volume growth: each +1pp above default = +¥9,608M revenue
  const xtandiVolumeDelta = delta('xtandi-volume-growth');
  const xtandiVolumeImpact = xtandiVolumeDelta * ASTELLAS_SENSITIVITY.xtandiVolumePerPp;

  const xtandiRevenueImpact = iraRevenueImpact + xtandiVolumeImpact;

  // ─── STRATEGIC BRANDS REVENUE IMPACT (buildingOperations) ────────────────
  // PADCEV, XOSPATA, IZERVAY, VYLOY, VEOZAH: each +1pp growth = +¥4,803M
  const strategicBrandsDelta = delta('strategic-brands-growth');
  const strategicBrandsImpact = strategicBrandsDelta * ASTELLAS_SENSITIVITY.strategicBrandsPerPp;

  // ─── CHINA / GEOGRAPHIC REVENUE IMPACT (projectManagement) ───────────────
  // China revenue growth: each +1pp = +¥1,015M
  const chinaGrowthDelta = delta('china-revenue-growth');
  const chinaImpact = chinaGrowthDelta * ASTELLAS_SENSITIVITY.chinaRevenuePerPp;

  const geographicRevenueImpact = chinaImpact;

  // ─── FX IMPACT (realEstateInvestments) ───────────────────────────────────
  // Weaker yen (USD/JPY rises) boosts yen-reported revenue on USD/EUR-denominated sales
  // Each +¥1/USD = +¥2,139M revenue (~¥2.1B per ¥1 USD/JPY move)
  const fxDelta = delta('fx-usd-jpy');                     // positive = yen weakens (favourable)
  const fxRevenueImpact = fxDelta * ASTELLAS_SENSITIVITY.fxPerYen;

  // ─── TOTAL REVENUE IMPACT ────────────────────────────────────────────────
  const totalRevenueImpact = xtandiRevenueImpact + strategicBrandsImpact + geographicRevenueImpact + fxRevenueImpact;

  // ─── COGS IMPACT ─────────────────────────────────────────────────────────
  // Cost of Sales scales approximately with revenue (~19.1% incremental COGS ratio)
  const facilityImpact = totalRevenueImpact * 0.191;

  // SG&A: SMT savings programme reduces cost base
  // Each +¥1B additional SMT savings target (positive delta) = −¥1,000M cost (negative = favourable)
  const smtDelta = delta('smt-savings-fy26');
  const personnelImpact = -(smtDelta * ASTELLAS_SENSITIVITY.smtSavingsPerBn);

  // R&D: POC success reduces future development spend (cost avoidance)
  // Each additional POC achievement (positive delta) = −¥15,000M R&D cost avoidance
  const rdPocDelta = delta('rd-poc-success');
  const subcontractorImpact = -(rdPocDelta * ASTELLAS_SENSITIVITY.rdSavingsPerPoc);

  const cogsImpact = personnelImpact + subcontractorImpact + facilityImpact;
  const grossProfitImpact = totalRevenueImpact - cogsImpact;

  // ─── OPERATING EXPENSES IMPACT ───────────────────────────────────────────
  // Technology: incremental digital investment for new product launch platforms
  const technologyImpact = strategicBrandsDelta * 500;   // ¥M per pp Strategic Brands growth
  // Marketing: launch spend for VYLOY, VEOZAH, PADCEV geographic expansion
  const marketingImpact = strategicBrandsDelta * 200;    // ¥M per pp Strategic Brands growth
  const profDevImpact = 0;                               // Training / talent: relatively fixed
  const sgaImpact = 0;                                   // Corporate G&A: relatively fixed
  const otherOpExImpact = 0;                             // D&A on intangibles; not lever-sensitive

  const opExImpact = technologyImpact + marketingImpact + profDevImpact + sgaImpact + otherOpExImpact;

  const operatingIncomeImpact = grossProfitImpact - opExImpact;

  // ─── BELOW THE LINE ──────────────────────────────────────────────────────
  // FX impact on yen cost of foreign-currency-denominated debt (net debt ~¥566B)
  // Weaker yen marginally increases yen-equivalent interest on any USD-denominated liabilities
  const interestImpactValue = fxDelta * 50;              // ¥M per ¥1/USD on debt service
  const ebtImpact = operatingIncomeImpact - interestImpactValue;
  const taxImpact = ebtImpact * taxRate;
  const netIncomeImpact = ebtImpact - taxImpact;

  const newRevenue = baseRevenue + totalRevenueImpact;
  const newOperatingIncome = baseOperatingIncome + operatingIncomeImpact;

  return {
    revenue: totalRevenueImpact,
    advisoryServices: xtandiRevenueImpact,           // XTANDI revenue (US segment)
    buildingOperations: strategicBrandsImpact,       // Strategic Brands revenue
    projectManagement: geographicRevenueImpact,      // China / geographic revenue
    realEstateInvestments: fxRevenueImpact,          // FX revenue impact
    personnelCosts: personnelImpact,
    subcontractorCosts: subcontractorImpact,
    facilityCosts: facilityImpact,
    cogs: cogsImpact,
    grossProfit: grossProfitImpact,
    technologyCosts: technologyImpact,
    marketing: marketingImpact,
    professionalDev: profDevImpact,
    sga: sgaImpact,
    otherOpEx: otherOpExImpact,
    opEx: opExImpact,
    operatingIncome: operatingIncomeImpact,
    interest: interestImpactValue,
    ebt: ebtImpact,
    tax: taxImpact,
    netIncome: netIncomeImpact,
    operatingMargin: newRevenue > 0 ? (newOperatingIncome / newRevenue) * 100 : 26.0,
    baseRevenue,
    baseAdvisoryServices,
    baseBuildingOperations,
    baseProjectManagement,
    baseRealEstateInvestments,
    basePersonnelCosts,
    baseSubcontractorCosts,
    baseFacilityCosts,
    baseCOGS,
    baseGrossProfit,
    baseTechnologyCosts,
    baseMarketing,
    baseProfessionalDev,
    baseSGandA,
    baseOtherOpEx,
    baseOpEx,
    baseOperatingIncome,
    baseInterest,
    baseOtherIncome,
    baseEBT,
    baseTax,
    baseNetIncome,
  };
}

// =============================================================================
// SCENARIO IMPACT RESULT (Astellas Pharma-specific)
// =============================================================================

export function computeScenarioImpact(
  leverValues: Record<string, number>,
  leverDefs?: LeverDef[],
  baselinePL?: ScenarioBaselinePL,
): ScenarioImpactResult {
  // FY2025 actuals: Revenue ¥2,139.245B, Core OP ¥555.7B, NI ¥291.6B, Core EPS ¥237.01
  const baselineRevenueB = 2139.245; // ¥B FY2025 actuals
  const baselinePLResult = calculateImpact(leverValues, baselineRevenueB, baselinePL, leverDefs);

  const defaults: Record<string, number> = { ...FALLBACK_DEFAULTS };
  if (leverDefs) leverDefs.forEach(l => { defaults[l.id] = l.default; });

  const delta = (id: string): number => {
    const d = defaults[id] ?? 0;
    const v = leverValues[id];
    return (v ?? d) - d;
  };

  // EPS impact: NI delta ÷ ~1,793M diluted shares
  const sharesM = 1793;
  const epsImpact = baselinePLResult.netIncome / sharesM;

  // Leverage ratio impact: Net debt ~¥566B
  // Each ¥100B NI improvement → −0.18x leverage ratio
  // In bps representation (1x = 100bps): −18bps per ¥100B NI improvement
  const leverageImpact_x = (baselinePLResult.netIncome / 100000) * (-0.18);
  const leverageImpact_bps = leverageImpact_x * 100; // bps representation (1x = 100bps)

  // CFO impact proxy: NI delta × ~1.9x (D&A add-back ~¥116B; aligns with FY2025 CFO/NI ratio)
  const cfoImpact = baselinePLResult.netIncome * 1.9;

  // Segment breakdown (field names hcb/hss/pcw/corp preserved for frontend compatibility)
  // hcb  → XTANDI revenue/core OP impact
  // hss  → Strategic Brands revenue/core OP impact
  // pcw  → Geographic + FX revenue/core OP impact
  // corp → Corporate/SMT savings impact
  const segments = {
    hcb: {
      revenue: baselinePLResult.advisoryServices,                      // XTANDI revenue impact
      aoi: baselinePLResult.advisoryServices * 0.60,                   // ~60% Core OP margin on XTANDI
    },
    hss: {
      revenue: baselinePLResult.buildingOperations,                    // Strategic Brands revenue impact
      aoi: baselinePLResult.buildingOperations * 0.35,                 // ~35% Core OP margin on Strategic Brands
    },
    pcw: {
      revenue: baselinePLResult.projectManagement + baselinePLResult.realEstateInvestments,
      aoi: (baselinePLResult.projectManagement + baselinePLResult.realEstateInvestments) * 0.26,
    },
    corp: {
      aoi: delta('smt-savings-fy26') * ASTELLAS_SENSITIVITY.smtSavingsPerBn, // ¥M net SMT savings vs plan
    },
  };

  // Bull / Base / Bear EPS outcomes
  const baseEPS = 237.01; // FY2025 Core EPS (¥/share)
  const scenarios = [
    {
      name: 'Bull — XTANDI volume outperforms, no IRA cut, yen weakness',
      probability: 20,
      epsOutcome: baseEPS + epsImpact + 20,
    },
    {
      name: 'Base — FY2026 guidance (Core EPS ¥256.77)',
      probability: 55,
      epsOutcome: 256.77 + epsImpact,
    },
    {
      name: 'Bear — IRA price cut + yen strengthening headwinds',
      probability: 25,
      epsOutcome: baseEPS + epsImpact - 30,
    },
  ];

  const epsSign = epsImpact >= 0 ? '+' : '';
  const leverageSign = leverageImpact_x <= 0 ? '' : '+';
  const summary = `Scenario levers imply ${epsSign}¥${epsImpact.toFixed(2)} EPS delta vs ¥${baseEPS.toFixed(2)} FY2025 Core EPS baseline, with ${leverageSign}${leverageImpact_x.toFixed(2)}x leverage ratio impact (net debt ¥566B baseline).`;

  return {
    revenueImpact: baselinePLResult.revenue,
    ebitdaImpact: baselinePLResult.operatingIncome + (baselinePLResult.baseOtherOpEx * 0.20),
    epsImpact,
    rateBaseImpact: leverageImpact_x,     // leverage ratio delta (x)
    ffoDebtImpact: leverageImpact_bps,    // bps proxy for leverage ratio change
    capexImpact: cfoImpact,               // repurposed: CFO impact proxy
    segments,
    scenarios,
    summary,
  };
}

// =============================================================================
// MONTE CARLO SIMULATION
// =============================================================================

export function runMonteCarloSimulation(
  leverValues: Record<string, number>,
  levers: LeverDef[],
  baselinePL?: ScenarioBaselinePL,
  baselineRevenueM?: number,
  iterations = 3500,
): MonteCarloResults {
  const results: Record<string, number[]> = {
    revenue: [],
    operatingIncome: [],
    netIncome: [],
    operatingMargin: [],
    cashFlow: [],
  };

  const bl = baselinePL ?? SHARED_BASELINE;
  const volatilityFactor = bl.monteCarlo?.volatilityFactor ?? SHARED_BASELINE.monteCarlo.volatilityFactor;
  const dAndA = bl.dAndA ?? SHARED_BASELINE.dAndA;
  // Astellas FY2025 revenue ¥2,139,245M (sum of five geographic segments)
  const baseRevM = baselineRevenueM ?? (bl.segments?.reduce((s, seg) => s + seg.revenue, 0) ?? 2139245);
  const baseOIMargin = bl.monteCarlo?.baseOperatingMargin ?? SHARED_BASELINE.monteCarlo.baseOperatingMargin;
  const niConversion = bl.monteCarlo?.netIncomeConversion ?? SHARED_BASELINE.monteCarlo.netIncomeConversion;

  // Build defaults
  const defaults: Record<string, number> = { ...FALLBACK_DEFAULTS };
  levers.forEach(l => { defaults[l.id] = l.default; });

  for (let i = 0; i < iterations; i++) {
    // Perturb lever values with normally distributed noise scaled by volatility
    // Pharma: moderate-to-high volatility — XTANDI IRA risk and FX are primary uncertainty sources
    const perturbedValues: Record<string, number> = {};
    levers.forEach(lever => {
      const range = lever.max - lever.min;
      const noise = normalRandom(range * volatilityFactor * 0.10);
      const base = leverValues[lever.id] ?? defaults[lever.id] ?? (lever.min + lever.max) / 2;
      perturbedValues[lever.id] = Math.max(lever.min, Math.min(lever.max, base + noise));
    });

    const impact = calculateImpact(perturbedValues, baseRevM / 1000, baselinePL, levers);
    const simRevenue = baseRevM + impact.revenue;
    const simOI = baseRevM * baseOIMargin + impact.operatingIncome;
    const simNI = simOI * niConversion;
    const simMargin = simRevenue > 0 ? (simOI / simRevenue) * 100 : 0;
    // Astellas FCF = NI + D&A − capex (pharma reinvests primarily in R&D and pipeline acquisitions)
    const capexM = 180000; // Astellas annual capex estimate (¥M)
    const simFCF = simNI + dAndA - capexM;

    results.revenue.push(simRevenue);
    results.operatingIncome.push(simOI);
    results.netIncome.push(simNI);
    results.operatingMargin.push(simMargin);
    results.cashFlow.push(simFCF);
  }

  const output: MonteCarloResults = {};
  for (const [key, arr] of Object.entries(results)) {
    output[key] = computeSimulationStats(arr);
  }
  return output;
}
