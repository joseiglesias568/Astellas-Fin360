import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed EPM Configuration: Planning Milestones, Platform Config, Driver Forecasts
// Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY) FY2025 planning calendar;
// driver-based planning aligned to the capital allocation framework:
// Revenue ¥2,220B, Core OP ¥620B (27.9%), Core EPS ¥256.77 FY2026 guidance.
// SMT programme: ¥21B FY2025 actual, ¥40B FY2026 target, ¥65B cumulative.
// Key products: XTANDI ¥960.8B, Strategic Brands ¥480.3B (+43%), IRA monitoring.
// =============================================================================

export async function seedEpmConfig(prisma: PrismaClient, companyId: number) {
  console.log('  Seeding Astellas Pharma EPM configuration...');

  // ─── Planning Milestones (FY25 calendar) ──────────────────────────────────

  const milestones = [
    {
      fiscalYear: 'FY25',
      label: 'FY24 Close & Annual Review',
      description: 'FY2024 full-year results close and review; FY2025 guidance issued (Revenue ¥1,912.5B, Core OP ¥465B, Core EPS ¥198.06 FY2024 base). XTANDI ¥912B FY2024 baseline established. Strategic Brands portfolio defined: PADCEV, IZERVAY (GA launch), XOSPATA, emerging VYLOY and VEOZAH. SMT programme launched with ¥18B FY2025 savings target. FX planning basis set at ¥151 USD/JPY for FY2025. FY2025 R&D guidance issued including EV-302 PADCEV Phase 3 readout expected timing.',
      month: 'Apr',
      status: 'complete',
      sortOrder: 1,
      category: 'close',
    },
    {
      fiscalYear: 'FY25',
      label: 'Q1 FY25 Close',
      description: 'Q1 FY25 (April–June 2025) results: Revenue ¥537.9B (+8.8% YoY), Core OP ¥130.8B (24.3% margin), Core EPS ¥54.88. XTANDI Q1 ¥249.3B. Strategic Brands ¥109.0B — strong PADCEV and IZERVAY Q1 ramp. SMT savings ¥4.5B YTD ahead of ¥4.5B plan. USD/JPY Q1 average ¥152 (¥1 above planning basis). FY2025 annual guidance reaffirmed. IRA monitoring: CMS MPCP second round announcement included XTANDI on the list; IRA risk quantification initiated. Guidance: Revenue ¥2,139B, Core EPS ¥237.01 FY2025 range confirmed.',
      month: 'Jul',
      status: 'complete',
      sortOrder: 2,
      category: 'close',
    },
    {
      fiscalYear: 'FY25',
      label: 'H1 FY25 Mid-Year Reforecast',
      description: 'H1 FY25 actuals integration: H1 Revenue ¥1,074.9B (Q1 ¥537.9B + Q2 ¥537.0B). Q2 Core EPS ¥59.14, Core OP Margin 25.8%. SMT YTD ¥10.5B (vs ¥10.0B H1 plan — ahead). VYLOY launch tracking above model: Q2 ¥15.7B vs ¥10.0B plan. China +33% growth trajectory confirmed. FX Q2 average ¥150 (slightly below Q1 ¥152; net YTD ¥151 average). Full-year reforecast: Revenue ¥2,139B confirmed; Core EPS ¥237.01 annual guidance. FY2026 planning cycle formally initiated. Strategic Brands FY2025 trajectory raised to ¥480B+ (vs ¥440B original plan). IRA XTANDI negotiation calendar monitoring updates to Board.',
      month: 'Oct',
      status: 'complete',
      sortOrder: 3,
      category: 'planning',
    },
    {
      fiscalYear: 'FY25',
      label: 'Q3 FY25 Close',
      description: 'Q3 FY25 (October–December 2025) results: Revenue ¥527.1B, Core OP ¥172.9B (32.8% margin — Q3 seasonal peak), Core EPS ¥71.18. XTANDI Q3 ¥253.5B — strong Q3 performance. Strategic Brands Q3 ¥130.7B (+ongoing ramp). SMT savings ¥15B YTD (vs ¥14B plan — ¥1B ahead). VYLOY and IZERVAY ramp sustaining above-plan trajectory. IRA XTANDI negotiation process ongoing per CMS timeline. Q4 FY25 guidance: Revenue ¥537B, Core EPS ¥51.81 (Q4 seasonally lowest, year-end costs and R&D milestone payments). FY2026 budget finalised for Board approval.',
      month: 'Jan',
      status: 'complete',
      sortOrder: 4,
      category: 'close',
    },
    {
      fiscalYear: 'FY25',
      label: 'XTANDI IRA Negotiation Monitor',
      description: 'Ongoing CMS Medicare Drug Price Negotiation Program (MPCP) monitoring for XTANDI (enzalutamide). CMS negotiation timetable: initial offer expected mid-2026; Maximum Fair Price (MFP) announcement targeted for Q3 2026; MFP implementation effective 2027. Key monitoring parameters: XTANDI Part D utilisation (approximately 40% of US net sales); IRA sensitivity -¥9.6B revenue per +1pp price reduction; bear case scenario (-15% negotiated discount) = -¥57.6B annual revenue. Astellas government affairs team engaging CMS MPCP process. Board briefings quarterly. Finance360 IRA risk dashboard tracking negotiation timeline milestones and scenario modelling for FY2026 and FY2027 LRP.',
      month: 'Feb',
      status: 'in-progress',
      sortOrder: 5,
      category: 'planning',
    },
    {
      fiscalYear: 'FY25',
      label: 'SMT FY2026 Target Setting',
      description: 'SMT (Sustainable Margin Transformation) FY2026 target confirmation and programme extension. FY2025 achievement: ¥21B (vs ¥18B original plan — ¥3B or +16.7% above target). FY2026 target confirmed at ¥40B savings. Cumulative FY2025–FY2030 target: ¥65B+. Workstream targets for FY2026: Procurement and COGS ¥16B, SG&A optimisation ¥14B, R&D operational efficiency ¥7B, manufacturing rationalisation ¥3B. FY2026 target requires acceleration of run-rate savings across all workstreams. Core OP bridge: SMT contribution to FY2026 Core OP expansion from ¥555.7B (26.0%) to ¥620B (27.9%) guidance is approximately ¥19B incremental SMT savings (¥40B FY2026 minus ¥21B FY2025). Programme cadence: quarterly PMO review with CFO sponsorship.',
      month: 'Mar',
      status: 'in-progress',
      sortOrder: 6,
      category: 'planning',
    },
    {
      fiscalYear: 'FY25',
      label: 'FY25 Close & FY2026 Guidance Issuance',
      description: 'FY2025 full-year close (April 2025–March 2026) results announcement and FY2026 guidance issuance. FY2025 actuals: Revenue ¥2,139.2B (+11.9%), Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01. XTANDI FY2025 ¥960.8B (+5.3%). Strategic Brands ¥480.3B (+43%). SMT savings ¥21B (¥3B above ¥18B plan). FY2026 guidance issued: Revenue ¥2,220B (+3.8%), Core OP ¥620B (27.9% margin), Core EPS ¥256.77 (+8.3%). FX planning basis: ¥151 USD/JPY. Dividend guidance maintained. SMT FY2026 ¥40B target confirmed. XTANDI IRA risk quantified and disclosed in guidance commentary. Strategic Brands ¥600B+ FY2026 target set (PADCEV, IZERVAY, VYLOY, VEOZAH combined). R&D guidance: pipeline milestones for EV-302 follow-on, IZERVAY GA expansion, VYLOY G/GEJ indication extension.',
      month: 'May',
      status: 'upcoming',
      sortOrder: 7,
      category: 'close',
    },
    {
      fiscalYear: 'FY25',
      label: 'FY2026 Long-Range Plan',
      description: 'FY2026–FY2030 Long-Range Plan (LRP) development and Board approval. Strategic targets: FY2027 Revenue ¥2,500B+ (Strategic Brands ¥800B+); FY2028 Revenue ¥2,700B+ assuming no material IRA headwind. XTANDI post-IRA trajectory modelled under base/bear/bull IRA scenarios. SMT cumulative ¥65B savings through FY2030 providing Core OP margin expansion toward 30%+. R&D pipeline: 3 potential new molecular entities (NMEs) with Phase 3 data readouts by FY2028. Strategic Brands growth driven by PADCEV pan-cancer expansion (lung, bladder, breast indications), IZERVAY retinal disease expansion, and VYLOY global gastric market capture. Geographic mix shift: China targeted at ¥300B+ by FY2028 (+¥100B contribution from FY2025). FX sensitivity analysis: ¥5 range of USD/JPY modelled for LRP revenue variance (±¥10.5B revenue per ¥5 USD/JPY move).',
      month: 'Jun',
      status: 'upcoming',
      sortOrder: 8,
      category: 'board',
    },
  ];

  await prisma.planningMilestone.createMany({
    data: milestones.map((m) => ({ companyId, ...m })),
  });
  console.log(`  Created ${milestones.length} planning milestones`);

  // ─── Platform Config (all EPM module thresholds & parameters) ─────────────

  const configs = [
    // Forecasting module
    { module: 'forecasting', key: 'mape_threshold_good', value: '2', type: 'number' },
    { module: 'forecasting', key: 'mape_threshold_warn', value: '5', type: 'number' },
    { module: 'forecasting', key: 'confidence_threshold_high', value: '90', type: 'number' },
    { module: 'forecasting', key: 'confidence_threshold_medium', value: '75', type: 'number' },

    // In-cycle reporting module
    { module: 'in-cycle', key: 'status_favorable_threshold', value: '0', type: 'number' },
    { module: 'in-cycle', key: 'status_at_risk_threshold', value: '-1', type: 'number' },
    { module: 'in-cycle', key: 'chart_metrics', value: '["Revenue","Core EPS","Core OP Margin","XTANDI Revenue"]', type: 'json' },

    // Bridge walks module
    { module: 'bridge', key: 'default_base_revenue', value: '537.9', type: 'number' },
    { module: 'bridge', key: 'categories', value: '["xtandi-revenue","strategic-brands-revenue","established-markets-revenue","japan-revenue","china-revenue","fx-translation","r-and-d-investment","smt-savings","other"]', type: 'json' },

    // Forecast simulations module
    { module: 'simulation', key: 'monte_carlo_points', value: '50', type: 'number' },
    { module: 'simulation', key: 'sensitivity_impact_factor', value: '0.10', type: 'number' },

    // Planning & budgeting module (Astellas — values in ¥B)
    { module: 'planning', key: 'dollar_metrics', value: '["Revenue","XTANDI Revenue","PADCEV Revenue","IZERVAY Revenue","Strategic Brands Revenue","Core Operating Income","R&D Expense","SMT Savings"]', type: 'json' },
    { module: 'planning', key: 'cost_metric_keywords', value: '["r-and-d","sg-and-a","cost-of-sales","amortisation","impairment","smt-savings","manufacturing"]', type: 'json' },
    { module: 'planning', key: 'variance_on_track_threshold', value: '0.5', type: 'number' },
    { module: 'planning', key: 'chart_metrics', value: '["Revenue","Core EPS","Core OP Margin","XTANDI Revenue"]', type: 'json' },

    // Capital & returns module (Astellas capital allocation and returns)
    { module: 'capital', key: 'capex_guidance_annual', value: '90', type: 'number' },
    { module: 'capital', key: 'eps_cagr_target', value: '8', type: 'number' },
    { module: 'capital', key: 'equity_atm_target_shares_m', value: '0', type: 'number' },
  ];

  await prisma.platformConfig.createMany({
    data: configs.map((c) => ({ companyId, ...c })),
  });
  console.log(`  Created ${configs.length} platform config entries`);

  // ─── Update causalityWeight on existing ConsoleDriver records ─────────────

  // Drivers from 12-business-consoles.ts (Astellas Pharma business consoles)
  const causalityUpdates: { name: string; weight: number }[] = [
    // Oncology Commercial — XTANDI and IRA risk
    { name: 'XTANDI Revenue & IRA Risk Management', weight: 0.45 },
    { name: 'Strategic Brands Revenue Acceleration', weight: 0.35 },
    { name: 'PADCEV Co-Promotion Partnership', weight: 0.25 },

    // SMT and cost efficiency
    { name: 'SMT Savings Programme Execution', weight: 0.40 },
    { name: 'R&D Pipeline & POC Programme Execution', weight: 0.30 },
    { name: 'Core OP Margin & Cost Efficiency', weight: 0.25 },

    // Geographic and FX
    { name: 'Geographic Revenue Mix & FX Translation', weight: 0.30 },

    // Enterprise financial
    { name: 'Core EPS Growth & Capital Allocation', weight: 0.35 },
    { name: 'China Market Development & VYLOY Launch', weight: 0.25 },
  ];

  let weightUpdates = 0;
  for (const update of causalityUpdates) {
    const result = await prisma.consoleDriver.updateMany({
      where: { name: update.name, console: { companyId } },
      data: { causalityWeight: update.weight },
    });
    weightUpdates += result.count;
  }
  console.log(`  Updated causalityWeight on ${weightUpdates} drivers`);

  // ─── Driver Forecasts with Elasticity ─────────────────────────────────────

  // Build a cross-console driver map for elasticity forecasts
  const allDrivers = await prisma.consoleDriver.findMany({
    where: { console: { companyId } },
    select: { id: true, name: true },
  });
  const driverMap = new Map(allDrivers.map((d) => [d.name, d.id]));

  const driverForecasts: {
    driverName: string;
    metricName: string;
    forecastValue: number;
    actualValue: number | null;
    budgetValue: number | null;
    priorYearValue: number | null;
    elasticity: number;
    elasticityUnit: string;
  }[] = [
    {
      driverName: 'XTANDI Revenue & IRA Risk Management',
      metricName: 'XTANDI Quarterly Revenue (¥B)',
      forecastValue: 245.0, actualValue: 249.3, budgetValue: 245.0, priorYearValue: 228.0,
      elasticity: -9.6,
      elasticityUnit: '¥B annual revenue impact per +1pp CMS IRA-negotiated price reduction on XTANDI (from MPCP base)',
    },
    {
      driverName: 'Strategic Brands Revenue Acceleration',
      metricName: 'Strategic Brands Quarterly Revenue (¥B)',
      forecastValue: 100.0, actualValue: 109.0, budgetValue: 100.0, priorYearValue: 76.0,
      elasticity: 4.8,
      elasticityUnit: '¥B annual revenue impact per +1pp Strategic Brands portfolio growth rate acceleration',
    },
    {
      driverName: 'SMT Savings Programme Execution',
      metricName: 'SMT Cumulative Savings YTD Q1 FY25 (¥B)',
      forecastValue: 4.5, actualValue: 4.5, budgetValue: 4.5, priorYearValue: 0.5,
      elasticity: 1.0,
      elasticityUnit: '¥B Core OP impact per ¥1B additional SMT savings delivered (direct flow-through, net of reinvestment)',
    },
    {
      driverName: 'Geographic Revenue Mix & FX Translation',
      metricName: 'USD/JPY Average Rate (Q1 FY25)',
      forecastValue: 150.0, actualValue: 152.0, budgetValue: 151.0, priorYearValue: 135.0,
      elasticity: 2.1,
      elasticityUnit: '¥B revenue translation impact per ¥1 weakening of JPY vs USD at current US revenue base',
    },
    {
      driverName: 'China Market Development & VYLOY Launch',
      metricName: 'China Revenue Growth YoY (%)',
      forecastValue: 22.0, actualValue: 28.0, budgetValue: 22.0, priorYearValue: 18.0,
      elasticity: 1.0,
      elasticityUnit: '¥B annual revenue impact per +1pp additional China revenue growth rate',
    },
    {
      driverName: 'R&D Pipeline & POC Programme Execution',
      metricName: 'R&D Expense as % of Revenue (%)',
      forecastValue: 18.0, actualValue: 17.5, budgetValue: 18.0, priorYearValue: 19.2,
      elasticity: -21.4,
      elasticityUnit: '¥B Core OP improvement per -1pp R&D-to-Revenue ratio (at Q1 FY25 ¥537.9B quarterly revenue base)',
    },
    {
      driverName: 'Core OP Margin & Cost Efficiency',
      metricName: 'Core OP Margin Actual Q1 FY25 (%)',
      forecastValue: 23.5, actualValue: 24.3, budgetValue: 23.5, priorYearValue: 22.0,
      elasticity: 5.4,
      elasticityUnit: '¥B quarterly Core OP impact per +1pp Core OP margin improvement (at ¥537.9B Q1 FY25 revenue)',
    },
    {
      driverName: 'Core EPS Growth & Capital Allocation',
      metricName: 'Core EPS Q1 FY25 (¥)',
      forecastValue: 47.0, actualValue: 54.88, budgetValue: 48.0, priorYearValue: 40.2,
      elasticity: 0.43,
      elasticityUnit: '¥ Core EPS impact per ¥1B incremental Core OP at current effective tax rate and diluted share count',
    },
  ];

  const forecastRecords = driverForecasts
    .filter((df) => driverMap.has(df.driverName))
    .map((df) => ({
      companyId,
      driverId: driverMap.get(df.driverName)!,
      metricName: df.metricName,
      periodLabel: 'Q1 FY25',
      forecastValue: df.forecastValue,
      actualValue: df.actualValue,
      budgetValue: df.budgetValue,
      priorYearValue: df.priorYearValue,
      elasticity: df.elasticity,
      elasticityUnit: df.elasticityUnit,
    }));

  if (forecastRecords.length > 0) {
    await prisma.driverForecast.createMany({ data: forecastRecords });
  }
  console.log(`  Created ${forecastRecords.length} driver forecasts with elasticity`);

  console.log('Astellas Pharma EPM Configuration seed complete');
}
