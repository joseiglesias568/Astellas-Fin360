// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/scenarios.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26] [CITED:MR-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Inc. public disclosures: FY2025 Annual Report; Q1 FY2026
// IR materials; FY2026 guidance (Revenue ¥2,220B; Core OP ¥620B).
// Scenario levers cover key Astellas drivers: XTANDI IRA price negotiation,
// Strategic Brands growth rate, SMT savings delivery, USD/JPY FX rate,
// China VBP impact, R&D POC achievements, PADCEV competition, and VYLOY launch.
// Baseline = FY2026 management guidance (Revenue ¥2,220B; Core OP margin ~27.9%).
// ─────────────────────────────────────────────────────────────────────
import { ScenarioConfig } from '../../types';

export const scenarios: ScenarioConfig = {
  // FY2026 full-year baseline based on management guidance
  baselineRevenue: 2220.0,             // FY2026 guidance ¥2,220B revenue [CITED:MR-FY26]
  baselineMargin: 27.9,                // FY2026 Core OP margin % (Core OP ¥620B / Revenue ¥2,220B) [DERIVED]

  levers: [
    // ─── XTANDI & US Oncology ───
    {
      id: 'xtandi-ira-price-reduction',
      name: 'XTANDI IRA Medicare Price Reduction (%)',
      category: 'XTANDI & US Oncology',
      min: 0,
      max: 45,
      default: 25,                     // est. ~25% IRA discount on Medicare XTANDI price [ASSUMED]
      step: 5,
      unit: '% IRA Medicare discount',
      description: 'IRA-negotiated Medicare price reduction on XTANDI, effective January 2026. XTANDI Medicare sales ~40% of US revenue (~¥200B est. out of ¥960.8B FY2025 total). Each additional 10pp discount ≈ −¥20B revenue and −¥14B Core OP (at ~70% incremental margin). Bull: 15% discount if litigation or CMS methodology limits reduction. Bear: 40%+ if CMS applies maximum statutory discount.',
      impact: 'high',
    },
    {
      id: 'xtandi-global-volume-growth',
      name: 'XTANDI Global Volume Growth Rate (%)',
      category: 'XTANDI & US Oncology',
      min: -8.0,
      max: 12.0,
      default: 3.0,                    // est. modest TRx growth as IRA offsets volume gains [ASSUMED]
      step: 1.0,
      unit: '% global TRx volume growth',
      description: 'XTANDI global prescription volume growth YoY. Driven by nmCRPC and ECS indication penetration in US, PMDA-approved earlier-stage use in Japan, and EU market access gains. Partially offset by competitive entrants (apalutamide, darolutamide) and IRA commercial spillover. Each +1pp volume growth on ¥960.8B revenue base ≈ +¥9.6B annual revenue net of mix.',
      impact: 'high',
    },
    {
      id: 'strategic-brands-growth-rate',
      name: 'Strategic Brands Combined Growth Rate (%)',
      category: 'Strategic Brands',
      min: 10.0,
      max: 75.0,
      default: 43.0,                   // FY2025 actual: +43% YoY to ¥480.3B [CITED:AR-FY25]
      step: 5.0,
      unit: '% YoY combined growth',
      description: 'PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA combined revenue YoY growth. FY2025: +43% to ¥480.3B. This is the primary revenue offset to XTANDI IRA headwind. Each +10pp Strategic Brands growth on ¥480.3B base ≈ +¥48B additional revenue. Key drivers: PADCEV 1L urothelial penetration, IZERVAY geographic atrophy launch, VYLOY gastric cancer global rollout.',
      impact: 'high',
    },
    {
      id: 'padcev-competitive-impact',
      name: 'PADCEV Competitive Pressure (¥B annual revenue impact)',
      category: 'Strategic Brands',
      min: -80,
      max: 0,
      default: -10,                    // est. modest competitive headwind in urothelial cancer [ASSUMED]
      step: 10,
      unit: '¥B annual revenue impact',
      description: 'Revenue impact from competitive entrants in urothelial cancer (PADCEV\'s primary indication). PADCEV ¥221.2B FY2025. New ADCs, IO combinations, or biosimilar-like entrants could erode market share. Bear case: −¥80B if a well-funded competitor launches an equivalent or superior EV-based combination therapy. Each −¥20B PADCEV revenue ≈ −¥14B Core OP at ~70% incremental margin.',
      impact: 'high',
    },

    // ─── SMT & Operational Efficiency ───
    {
      id: 'smt-savings-delivery',
      name: 'SMT Annual Savings Delivery (¥B)',
      category: 'SMT & Efficiency',
      min: 10,
      max: 70,
      default: 40,                     // FY2026 SMT target ¥40B [CITED:MR-FY26]
      step: 5,
      unit: '¥B annual savings',
      description: 'Sustainable Margin Transformation (SMT) savings delivered in FY2026. Target ¥40B from SG&A headcount reduction (~¥15B), procurement (~¥10B), manufacturing footprint (~¥10B), and R&D portfolio rationalization (~¥5B). Each ¥10B savings ≈ +0.5pp Core OP margin on ¥2,220B revenue. Full SMT delivery is required to reach 27.9% Core OP margin from 26.0% FY2025 base.',
      impact: 'high',
    },
    {
      id: 'rd-poc-achievements',
      name: 'R&D Proof-of-Concept Readouts (Number of Positive POCs)',
      category: 'R&D Pipeline',
      min: 0,
      max: 8,
      default: 3,                      // est. ~3 POC readouts planned per year under Focused Innovator strategy [ASSUMED]
      step: 1,
      unit: 'positive POC readouts',
      description: 'Number of positive Phase 2 proof-of-concept readouts in FY2026. Astellas targets 3–4 POC readouts annually under "Focused Innovator" strategy. Each positive POC readout ≈ +¥150–300B probability-weighted pipeline NPV uplift. Negative readouts require portfolio GO/NO-GO decisions and may trigger R&D restructuring charges (CONFIG-ONLY: NPV impact not yet in revenue model).',
      impact: 'medium',
    },
    {
      id: 'vyloy-launch-trajectory',
      name: 'VYLOY Launch Revenue Trajectory (% of Peak Sales Model)',
      category: 'R&D Pipeline',
      min: 20.0,
      max: 120.0,
      default: 65.0,                   // est. FY2026 year-2 launch trajectory vs internal model [ASSUMED]
      step: 5.0,
      unit: '% of peak sales model',
      description: 'VYLOY (zolbetuximab) annual revenue as % of Astellas internal peak sales model. FY2025: ¥63.1B launch baseline. FY2026 trajectory: 65% of model on global rollout expansion. Key variables: CLDN18.2+ patient testing rates, hospital formulary penetration in US/EU/Japan/China, payer coverage. 100% = on-model; above 100% = upside scenario.',
      impact: 'medium',
    },

    // ─── FX & Macro ───
    {
      id: 'usd-jpy-exchange-rate',
      name: 'USD/JPY Exchange Rate (Planning Rate)',
      category: 'FX & Macro',
      min: 130,
      max: 175,
      default: 151,                    // FY2026 planning assumption ~¥151/USD [CITED:MR-FY26]
      step: 1,
      unit: '¥/USD',
      description: 'USD/JPY exchange rate. ~65–70% of Astellas revenue is USD-denominated (XTANDI, PADCEV, US Strategic Brands). FY2026 planning assumption: ¥151/USD. Each ¥10 JPY depreciation (higher rate) ≈ +¥70–80B revenue and +¥28–32B Core OP. Each ¥10 JPY appreciation ≈ equivalent headwind. FX hedging covers ~55% of USD exposure rolling 12 months, so rate moves beyond hedge tenor flow directly to P&L.',
      impact: 'high',
    },
    {
      id: 'china-revenue-growth',
      name: 'China Revenue Growth (Net of VBP, %)',
      category: 'FX & Macro',
      min: -20,
      max: 25,
      default: 5,                      // est. modest China growth net of VBP pricing [ASSUMED]
      step: 5,
      unit: '% China revenue growth',
      description: 'China segment net revenue growth, incorporating Volume-Based Procurement (VBP) pricing reductions offset by volume access gains and VYLOY launch. ~¥93B FY2025 China revenue. VBP rounds create step-down pricing but expand market access. Each +5% China growth ≈ +¥4.6B revenue. VYLOY gastric cancer in China is a key growth catalyst given high gastric cancer incidence.',
      impact: 'low',
    },
  ],

  preBuiltScenarios: [
    {
      id: 'base-case',
      name: 'Base Case — FY2026 Guidance (Revenue ¥2,220B, Core OP ¥620B)',
      description: 'FY2026 guidance: Revenue ¥2,220B, Core OP ¥620B (27.9% margin). XTANDI IRA ~25% Medicare discount. Strategic Brands +43% growth. SMT ¥40B delivered. USD/JPY ¥151. China +5% net of VBP. 3 positive POC readouts. VYLOY at 65% of peak sales model. PADCEV minimal competitive impact.',
      icon: 'target',
      confidence: 60,
      revenueImpact: 0,
      marginImpact: 0,
      keyAssumptions: [
        'Revenue ¥2,220B; Core OP ¥620B (27.9% margin) — management FY2026 guidance',
        'XTANDI IRA Medicare discount ~25% — guidance already incorporates this headwind',
        'Strategic Brands +43% YoY: PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA on-plan',
        'SMT ¥40B savings delivered — SG&A, procurement, manufacturing, R&D rationalization',
        'USD/JPY ¥151 planning assumption; ~55% USD hedge coverage',
        'VYLOY launch 65% of peak sales model on FY2026 global rollout',
        'China net revenue +5% with VYLOY partially offsetting VBP legacy pricing',
        '3 positive R&D POC readouts sustaining pipeline optionality',
      ],
      leverSettings: {
        'xtandi-ira-price-reduction': 25,
        'xtandi-global-volume-growth': 3.0,
        'strategic-brands-growth-rate': 43.0,
        'padcev-competitive-impact': -10,
        'smt-savings-delivery': 40,
        'rd-poc-achievements': 3,
        'vyloy-launch-trajectory': 65.0,
        'usd-jpy-exchange-rate': 151,
        'china-revenue-growth': 5,
      },
    },
    {
      id: 'bull-strategic-brands-acceleration',
      name: 'Bull — Strategic Brands Acceleration + IRA Minimum Impact',
      description: 'IRA discount at low end (15%); Strategic Brands achieve +60% YoY growth; SMT delivers ¥52B; VYLOY exceeds model; JPY weakens to ¥158. Core OP approaches ¥700B and Core EPS meaningfully above guidance. XTANDI volume growth strong on earlier-stage penetration.',
      icon: 'trending-up',
      confidence: 20,
      revenueImpact: 320,
      marginImpact: 285,
      keyAssumptions: [
        'XTANDI IRA discount 15% — court challenge limits CMS reduction; Vol +6%',
        'Strategic Brands +60% YoY: IZERVAY hits 28% GA penetration; VYLOY 90% of model',
        'PADCEV competition minimal — competitor development program fails or delays',
        'SMT delivers ¥52B — SG&A and manufacturing savings front-loaded',
        'USD/JPY weakens to ¥158 — BOJ holds; Fed delays cuts; ¥+¥50B revenue tailwind',
        'China +15% net of VBP as VYLOY gastric cancer achieves national formulary listing',
        '5 positive R&D POC readouts enhance pipeline confidence and multiple expansion',
        'VYLOY 90% of peak sales model on accelerated physician adoption',
      ],
      leverSettings: {
        'xtandi-ira-price-reduction': 15,
        'xtandi-global-volume-growth': 6.0,
        'strategic-brands-growth-rate': 60.0,
        'padcev-competitive-impact': 0,
        'smt-savings-delivery': 52,
        'rd-poc-achievements': 5,
        'vyloy-launch-trajectory': 90.0,
        'usd-jpy-exchange-rate': 158,
        'china-revenue-growth': 15,
      },
    },
    {
      id: 'bear-ira-severe-yen-strong',
      name: 'Bear — Severe IRA Discount + JPY Appreciation + PADCEV Competition',
      description: 'IRA Medicare discount at 38%; JPY strengthens to ¥140 creating ¥150B+ revenue headwind; PADCEV faces new competitive entrant; SMT delivers only ¥25B. Core OP misses guidance by ¥80–120B. Guidance revision required. XTANDI volume also under pressure.',
      icon: 'trending-down',
      confidence: 15,
      revenueImpact: -520,
      marginImpact: -480,
      keyAssumptions: [
        'XTANDI IRA Medicare discount 38% — above management base case; Vol −3% from competition',
        'USD/JPY strengthens to ¥140 — BOJ aggressively hikes; ¥160B+ revenue headwind',
        'PADCEV −¥50B from well-funded competitor launching in 1L urothelial cancer',
        'Strategic Brands growth decelerates to +20% — IZERVAY and VEOZAH payer restrictions',
        'SMT delivers only ¥25B — organizational friction slows headcount and procurement savings',
        'China revenue −10% net of VBP on accelerated pricing cuts in oncology',
        'VYLOY only 40% of peak sales model — CLDN18.2+ testing below expectations',
        'Guidance revision required in Q2 or Q3 FY2026; management credibility risk',
      ],
      leverSettings: {
        'xtandi-ira-price-reduction': 38,
        'xtandi-global-volume-growth': -3.0,
        'strategic-brands-growth-rate': 20.0,
        'padcev-competitive-impact': -50,
        'smt-savings-delivery': 25,
        'rd-poc-achievements': 1,
        'vyloy-launch-trajectory': 40.0,
        'usd-jpy-exchange-rate': 140,
        'china-revenue-growth': -10,
      },
    },
    {
      id: 'vyloy-launch-excellence',
      name: 'VYLOY Launch Excellence — Gastric Cancer Blockbuster',
      description: 'VYLOY exceeds 100% of peak sales model in FY2026 on rapid CLDN18.2+ testing adoption, strong physician demand, and successful China national formulary listing. All other levers at base case. Represents execution of gastric cancer franchise strategy without incremental headwinds.',
      icon: 'zap',
      confidence: 30,
      revenueImpact: 85,
      marginImpact: 60,
      keyAssumptions: [
        'VYLOY 100% of peak sales model by Q4 FY2026 — CLDN18.2+ testing rate >40%',
        'China national NRDL listing in FY2026 — significant volume uplift for gastric cancer indication',
        'Japan approval and early access program drives ¥15B+ incremental revenue in Japan alone',
        'Physician adoption above plan in EU and US — CLDN18.2+ data presentation resonates',
        'All other levers at FY2026 guidance base case',
        'VYLOY partnership economics and manufacturing supply chain operating at scale',
      ],
      leverSettings: {
        'xtandi-ira-price-reduction': 25,
        'xtandi-global-volume-growth': 3.0,
        'strategic-brands-growth-rate': 52.0,
        'padcev-competitive-impact': -10,
        'smt-savings-delivery': 40,
        'rd-poc-achievements': 3,
        'vyloy-launch-trajectory': 105.0,
        'usd-jpy-exchange-rate': 151,
        'china-revenue-growth': 18,
      },
    },
    {
      id: 'smt-outperformance',
      name: 'SMT Outperformance — Margin Expansion to 29%+',
      description: 'SMT delivers ¥55B vs ¥40B target; R&D portfolio rationalization accelerates; manufacturing consolidation ahead of schedule. Core OP margin expands to 29%+ on ¥2,220B revenue. All revenue levers at base case. Demonstrates operational excellence execution above plan.',
      icon: 'building-2',
      confidence: 25,
      revenueImpact: 0,
      marginImpact: 165,
      keyAssumptions: [
        'SMT ¥55B — SG&A and procurement savings front-loaded, Q1-Q2 execution strong',
        'R&D portfolio rationalization ¥20B — low-probability early-stage programs terminated',
        'Manufacturing footprint ¥15B — site consolidation completes ahead of schedule',
        'Core OP margin 29.1% on ¥2,220B revenue — above guidance, drives EPS upgrade',
        'All revenue levers at FY2026 guidance base case',
        'No incremental R&D one-time charges from program terminations exceeding savings',
      ],
      leverSettings: {
        'xtandi-ira-price-reduction': 25,
        'xtandi-global-volume-growth': 3.0,
        'strategic-brands-growth-rate': 43.0,
        'padcev-competitive-impact': -10,
        'smt-savings-delivery': 55,
        'rd-poc-achievements': 3,
        'vyloy-launch-trajectory': 65.0,
        'usd-jpy-exchange-rate': 151,
        'china-revenue-growth': 5,
      },
    },
  ],
};
