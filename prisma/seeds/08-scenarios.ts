import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Scenario Baseline, Levers, and Pre-Built Scenarios
//
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Full-Year Results (May 2026),
// FY2025 Annual Report, and investor guidance materials.
//
// Baseline anchored to FY2025 actuals:
//   Revenue ¥2,139.245B | Core OP Margin ~26.0% | Core EPS ¥115.26
//   Strategic Brands ¥480.3B (+43.0%) | SMT ¥21B delivered
//
// CRITICAL: externalId values below ARE the FALLBACK_DEFAULTS keys used in
// lib/scenario-engine.ts. These must match exactly — any mismatch silently
// returns $0 impact without an error.
// =============================================================================

export async function seedScenarios(prisma: PrismaClient, companyId: number) {
  // Scenario Baseline (FY2025 actuals)
  await prisma.scenarioBaseline.create({
    data: {
      companyId,
      baselineRevenue: 2139.245,  // FY2025 group revenue (¥B)
      baselineMargin: 26.0,       // FY2025 Core Operating Profit margin (%)
      detailedBaseline: {
        revenue: {
          segments: {
            'United States':        940200,   // ¥M — FY2025 US revenue
            'Established Markets':  563600,   // ¥M — FY2025 EU/Canada/ANZ revenue
            'Japan':                289000,   // ¥M — FY2025 Japan revenue
            'International Markets':230700,   // ¥M — FY2025 ROW revenue
            'China':                101500,   // ¥M — FY2025 China revenue
          },
        },
        cogs: {
          costOfSales:        408410,   // ¥M — FY2025 cost of goods sold
          personnelCosts:     172000,   // ¥M — SG&A labour component
          subcontractorCosts:  85000,   // ¥M — contract services / CRO costs
          facilityCosts:      151410,   // ¥M — other COGS (manufacturing overhead, logistics)
        },
        opex: {
          sgaTotal:           860300,   // ¥M — total SG&A expense
          rdTotal:            314800,   // ¥M — total R&D expense
          technologyCosts:     45000,   // ¥M — IT and digital systems
          marketing:          120000,   // ¥M — promotional and launch spend
          professionalDev:     95000,   // ¥M — medical affairs and training
          sga:                600300,   // ¥M — SG&A ex-marketing and professional dev
          otherOpEx:               0,   // ¥M — other operating expense line
        },
        interestExpense:  45000,   // ¥M — net interest expense
        otherIncome:      12000,   // ¥M — other income (JV income, royalties received)
        taxRate:           0.24,   // effective tax rate FY2025
        dAndA:            95000,   // ¥M — depreciation and amortisation
        monteCarlo: {
          volatilityFactor:       0.12,   // revenue volatility for Monte Carlo simulation
          baseOperatingMargin:   0.260,   // Core OP margin for stochastic base
          netIncomeConversion:   0.525,   // Core OP to Core EPS conversion factor
        },
      },
    },
  });

  console.log('Seeded scenario baseline');

  // Scenario Levers
  // CRITICAL: externalId must EXACTLY match FALLBACK_DEFAULTS keys in lib/scenario-engine.ts
  await prisma.scenarioLever.createMany({
    data: [
      // ── XTANDI / IRA ──────────────────────────────────────────────────
      {
        companyId,
        externalId: 'xtandi-ira-price-reduction',
        name: 'XTANDI IRA Net Price Reduction (%)',
        category: 'XTANDI / IRA',
        min: 0,
        max: 25,
        defaultVal: 0,
        step: 1,
        unit: '%',
        description:
          'Net price reduction applied to XTANDI US Medicare Part D volume under the IRA Maximum Fair Price (MFP). FY2025 XTANDI US revenue approximately ¥400B. Each 5% net price reduction on the Medicare-eligible portion of XTANDI volume ≈ -¥20B Core OP. IRA MFP effective January 2028; FY2026–27 baseline assumption is 0% as MFP is not yet in effect. Scenarios model 10% (base IRA), 15% (moderate), and 20% (bear) reductions for sensitivity planning. The lever is the primary single-asset earnings risk in the Astellas group model.',
      },
      {
        companyId,
        externalId: 'xtandi-volume-growth',
        name: 'XTANDI Global Volume Growth (% YoY)',
        category: 'XTANDI / IRA',
        min: 0,
        max: 15,
        defaultVal: 5.3,
        step: 0.5,
        unit: '% YoY',
        description:
          'XTANDI (enzalutamide) global volume growth year-over-year. FY2025 XTANDI combined revenue (US + ex-US) approximately ¥750B. Volume growth is driven by market penetration in prostate cancer (mCRPC, nmCRPC, mCSPC), geographic expansion in emerging markets, and indication extensions. ARSi three-way competition (Erleada, Nubeqa) caps upside; IRA does not reduce volume, only net price. FY2026 base case: +5.3% volume growth (consistent with FY2025 trajectory). Each +1pp volume growth ≈ +¥7.5B XTANDI revenue / +¥4B Core OP at current margin.',
      },
      // ── Strategic Brands ─────────────────────────────────────────────
      {
        companyId,
        externalId: 'strategic-brands-growth',
        name: 'Strategic Brands Combined Growth (% YoY)',
        category: 'Strategic Brands',
        min: 10,
        max: 70,
        defaultVal: 43.0,
        step: 1,
        unit: '% YoY',
        description:
          'Combined revenue growth of Astellas\' Strategic Brands portfolio (VYLOY, PADCEV, IZERVAY, and emerging oncology assets). FY2025 Strategic Brands revenue ¥480.3B (+43.0% YoY). FY2026 target: ¥610B (~+27% YoY) — a deceleration from the FY2025 high-growth period as VYLOY and PADCEV mature toward peak sales. Each +1pp Strategic Brands growth above the 43% default ≈ +¥4.8B incremental revenue. Above-plan VYLOY launch in gastric cancer (particularly China) and PADCEV earlier-line label expansion are the primary upside levers. This lever represents the primary offset to XTANDI IRA earnings erosion.',
      },
      // ── SMT Savings ──────────────────────────────────────────────────
      {
        companyId,
        externalId: 'smt-savings-fy26',
        name: 'SMT Savings FY2026 (¥B)',
        category: 'Cost / SMT',
        min: 15,
        max: 65,
        defaultVal: 40,
        step: 2.5,
        unit: '¥B',
        description:
          'Sustainable Margin Transformation (SMT) programme savings delivered in FY2026 (¥B, incremental to FY2025 ¥21B base). FY2025 delivered ¥21B; FY2026 target is ¥40B incremental, bringing cumulative savings to ¥61B. SMT savings have ~100% Core OP flow-through given the fixed-cost nature. Each ¥10B SMT overdelivery vs plan ≈ +0.5pp Core OP margin. Delivery above ¥40B requires acceleration of manufacturing rationalisation or SG&A reductions beyond plan. Delivery below ¥40B reduces the IRA offset buffer and constrains margin expansion trajectory.',
      },
      // ── FX ───────────────────────────────────────────────────────────
      {
        companyId,
        externalId: 'fx-usd-jpy',
        name: 'USD/JPY Exchange Rate (¥/USD)',
        category: 'FX',
        min: 130,
        max: 170,
        defaultVal: 151,
        step: 1,
        unit: '¥/USD',
        description:
          'USD/JPY exchange rate applied to translation of US dollar revenues and costs into Japanese Yen reporting currency. FY2025 average rate approximately ¥153/USD. FY2026 planning assumption ¥151/USD. Astellas generates ~44% of group revenue in USD. Each ¥1 Yen weakening (higher USD/JPY) ≈ +¥8–10B group revenue and +¥4–5B Core OP on an annualised basis. Each ¥1 Yen strengthening (lower USD/JPY) has the symmetric adverse impact. The lever captures the primary FX translation exposure in the Astellas group P&L. EUR/JPY and other currency pairs are secondary but not independently modelled in this lever.',
      },
      // ── China ─────────────────────────────────────────────────────────
      {
        companyId,
        externalId: 'china-revenue-growth',
        name: 'China Revenue Growth (% YoY)',
        category: 'China',
        min: 10,
        max: 60,
        defaultVal: 29.6,
        step: 1,
        unit: '% YoY',
        description:
          'China region revenue growth year-over-year. FY2025 China revenue ¥101.5B (+29.6% YoY). China is Astellas\' fastest-growing market driven by XTANDI NRDL volume deepening and early VYLOY launch preparations. FY2026 base case: +29.6% (consistent with FY2025 pace). VYLOY NRDL inclusion in FY2026 would be a step-change upside (+¥25–30B incremental China revenue). XTANDI NRDL renegotiation price cuts at each renewal cycle (typically 10–15% per round) are the primary downside risk to China revenue growth. Each +5pp China growth above 29.6% base ≈ +¥5B incremental group revenue.',
      },
      // ── Pipeline / R&D ───────────────────────────────────────────────
      {
        companyId,
        externalId: 'rd-poc-success',
        name: 'R&D POC Successes (count)',
        category: 'Pipeline',
        min: 0,
        max: 6,
        defaultVal: 3,
        step: 1,
        unit: 'POCs',
        description:
          'Number of R&D Proof of Concept (POC) successes in the modelling period. FY2025 achieved 3 POC successes — the highest in Astellas\' focused areas R&D history. Each POC success represents a validated asset advancing to Phase 3 investment. The pipeline multiple (P/E premium attributable to pipeline NPV) responds positively to above-consensus POC delivery. Each POC success above plan ≈ +¥100–150B pipeline NPV addition (estimated, risk-adjusted, 5-year horizon). POC failures reduce pipeline confidence and can trigger R&D restructuring discussions. This lever primarily affects the long-term valuation multiple rather than near-term Core OP.',
      },
    ],
  });

  console.log('Seeded 7 scenario levers');

  // Pre-Built Scenarios
  await prisma.preBuiltScenario.createMany({
    data: [
      {
        companyId,
        externalId: 'base-case',
        name: 'Base Case FY2026',
        description:
          'FY2026 base case: XTANDI IRA impact 0% (MFP not yet effective), XTANDI volume +5.3% YoY, Strategic Brands +43% to ¥610B target, SMT ¥40B incremental savings, USD/JPY ¥151 planning rate. Core OP margin guidance ~26%+. Revenue ¥2,178B. China +29.6% to ¥130B+. 3 POC successes in line with FY2025 run rate.',
        leverSettings: {
          'xtandi-ira-price-reduction': 0,
          'xtandi-volume-growth': 5.3,
          'strategic-brands-growth': 43.0,
          'smt-savings-fy26': 40,
          'fx-usd-jpy': 151,
          'china-revenue-growth': 29.6,
          'rd-poc-success': 3,
        },
        revenueImpact: 0,
        marginImpact: 0,
        confidence: 65,
        keyAssumptions: [
          'XTANDI IRA MFP not effective before FY2028; FY2026 = 0% net price reduction',
          'XTANDI global volume +5.3% — consistent with FY2025 trajectory despite ARSi competition',
          'Strategic Brands ¥610B: VYLOY launch ramp, PADCEV label expansion, IZERVAY GA penetration',
          'SMT ¥40B: SG&A rationalisation, manufacturing network, procurement savings',
          'USD/JPY ¥151 planning rate — modest Yen strengthening vs FY2025 ¥153 average',
        ],
      },
      {
        companyId,
        externalId: 'bull-ira-resolved-strategic-acceleration',
        name: 'Bull — IRA Resolved + Strategic Brands Acceleration',
        description:
          'Optimistic scenario: IRA negotiation results in 0% effective net price reduction (legal resolution or CMS agreement on minimal MFP), XTANDI volume +8% above trend, Strategic Brands accelerate to +55% YoY driven by VYLOY China NRDL inclusion and PADCEV perioperative approval, SMT overdelivers at ¥48B, Yen weakens to ¥157 providing FX tailwind, China +40% on VYLOY NRDL launch. Core OP margin 28%+.',
        leverSettings: {
          'xtandi-ira-price-reduction': 0,
          'xtandi-volume-growth': 8,
          'strategic-brands-growth': 55,
          'smt-savings-fy26': 48,
          'fx-usd-jpy': 157,
          'china-revenue-growth': 40,
          'rd-poc-success': 4,
        },
        revenueImpact: 185000,
        marginImpact: 220,
        confidence: 20,
        keyAssumptions: [
          'IRA MFP negotiation result immaterial to XTANDI net price — legal or commercial resolution',
          'XTANDI volume +8%: above-plan prostate cancer market growth in US and EU',
          'VYLOY China NRDL FY2026 inclusion — gastric cancer incidence driving step-change volume',
          'PADCEV EV-302 perioperative data positive — earlier-line label drives US revenue acceleration',
          'SMT ¥48B: manufacturing rationalisation ahead of schedule',
          'USD/JPY ¥157: Yen depreciation vs plan provides +¥55B revenue translation tailwind',
        ],
      },
      {
        companyId,
        externalId: 'bear-ira-cut-yen-strength',
        name: 'Bear — IRA 20% Cut + Yen Strength',
        description:
          'Adverse scenario: XTANDI IRA 20% net price reduction announced for FY2028 (signalling embedded in FY2026 guidance), XTANDI volume growth limited to +3% from ARSi competition, Strategic Brands grow only +35% (VYLOY launch slower than plan), SMT delivers only ¥32B, Yen strengthens to ¥142 (FX headwind), China growth +15% (NRDL renegotiation price cuts), R&D delivers only 2 POC successes. Core OP margin contracts toward 23%.',
        leverSettings: {
          'xtandi-ira-price-reduction': 20,
          'xtandi-volume-growth': 3,
          'strategic-brands-growth': 35,
          'smt-savings-fy26': 32,
          'fx-usd-jpy': 142,
          'china-revenue-growth': 15,
          'rd-poc-success': 2,
        },
        revenueImpact: -145000,
        marginImpact: -310,
        confidence: 10,
        keyAssumptions: [
          'IRA 20% MFP: CMS announces aggressive net price reduction for XTANDI; market models FY2028 impact now',
          'XTANDI volume +3%: ARSi market share pressure from Erleada/Nubeqa formulary wins',
          'VYLOY launch slower than plan: biomarker testing adoption delays in US and EU',
          'SMT ¥32B: manufacturing rationalisation facing regulatory and union delays',
          'USD/JPY ¥142: Yen strengthens on risk-off / BoJ rate hike; -¥85B revenue translation headwind',
          'China +15%: NRDL price renegotiation cuts compress per-unit economics',
        ],
      },
      {
        companyId,
        externalId: 'vyloy-launch-excellence',
        name: 'VYLOY Launch Excellence',
        description:
          'VYLOY scenario: Strategic Brands accelerate to +58% YoY driven by VYLOY outperformance across US, EU, Japan, and China (NRDL inclusion FY2026). China revenue growth +45%. IRA impact minimal (5% assumed for planning). SMT ¥44B. PADCEV expanding into earlier UC lines. Core OP margin ~27.5%. This scenario demonstrates Astellas\' ability to generate strong earnings growth even with moderate XTANDI IRA headwind, if the strategic brand portfolio executes to the high end of launch projections.',
        leverSettings: {
          'xtandi-ira-price-reduction': 5,
          'xtandi-volume-growth': 5.3,
          'strategic-brands-growth': 58,
          'smt-savings-fy26': 44,
          'fx-usd-jpy': 151,
          'china-revenue-growth': 45,
          'rd-poc-success': 3,
        },
        revenueImpact: 110000,
        marginImpact: 150,
        confidence: 25,
        keyAssumptions: [
          'VYLOY US reaching peak quarterly run-rate by end FY2026 — CLDN18.2 testing widely adopted',
          'VYLOY China NRDL inclusion H2 FY2026 — gastric cancer volume step-change',
          'VYLOY EU reimbursement secured in Germany, France, UK by H1 FY2026',
          'PADCEV EV-302 perioperative data published; label expansion filing H2 FY2026',
          'IRA 5% modest impact already priced in; does not alter FY2026 reported revenue',
        ],
      },
      {
        companyId,
        externalId: 'smt-outperformance',
        name: 'SMT Outperformance',
        description:
          'Cost leadership scenario: SMT delivers ¥55B in FY2026 vs ¥40B target, driven by accelerated manufacturing network rationalisation and SG&A reductions beyond plan. IRA 0% (pre-effective). Strategic Brands +47%. FX neutral (¥152). Core OP margin expands to ~28%, demonstrating that Astellas can reach its target margin range even before Strategic Brands fully scale. This scenario highlights SMT as the near-term earnings protection mechanism against any IRA uncertainty.',
        leverSettings: {
          'xtandi-ira-price-reduction': 0,
          'xtandi-volume-growth': 5.3,
          'strategic-brands-growth': 47,
          'smt-savings-fy26': 55,
          'fx-usd-jpy': 152,
          'china-revenue-growth': 29.6,
          'rd-poc-success': 3,
        },
        revenueImpact: 35000,
        marginImpact: 175,
        confidence: 30,
        keyAssumptions: [
          'SMT ¥55B: manufacturing plant closures and CMO contract renegotiations deliver ahead of FY2027 plan',
          'SG&A rationalisation beyond plan: additional headcount reductions in ex-growth markets',
          'Procurement savings: API supply chain consolidation and API cost renegotiation',
          'No material commercial disruption from cost reduction actions in growth markets (VYLOY, PADCEV)',
          'Core OP margin 28%+: structural improvement establishes new floor ahead of IRA impact window',
        ],
      },
    ],
  });

  console.log('Seeded 5 pre-built scenarios');
}
