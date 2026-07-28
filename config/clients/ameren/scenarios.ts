// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/scenarios.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma public disclosures: FY2025 Annual Report (May 2026);
// Q1 FY2026 Earnings Call / IR slides (Aug 2026); FY2026 guidance.
// Scenario levers cover the key Astellas drivers: XTANDI IRA price negotiation,
// FX USD/JPY sensitivity, Japan NHI price revision, PADCEV bladder cancer uptake,
// VEOZAH launch trajectory, SMT savings, and R&D pipeline productivity.
// Baseline = FY2026 management guidance midpoint (Core EPS ¥250+, Core OP ¥580B+).
// All monetary values in JPY billions (¥B) unless stated otherwise.
// ─────────────────────────────────────────────────────────────────────
import { ScenarioConfig } from '../../types';

export const scenarios: ScenarioConfig = {
  // FY2026 full-year baseline based on management guidance
  baselineRevenue: 2200.0,             // FY2026 guidance ¥2,200B revenue [ASSUMED]
  baselineMargin: 6.8,                 // FY2026 Core net margin % (Core EPS ¥250 × ~1.0B shares / ¥2,200B) [DERIVED]

  levers: [
    // ─── XTANDI / IRA ───
    {
      id: 'xtandi-ira-price-cut',
      name: 'XTANDI IRA CMS Negotiated Price Reduction (percentage points)',
      category: 'Oncology Portfolio',
      min: 0,
      max: 30,
      default: 15,                     // base case ~15pp IRA price cut [ASSUMED]
      step: 1,
      unit: '% price reduction vs gross price',
      description: 'CMS negotiated price for XTANDI under IRA Medicare price negotiation. Effective September 2026. Astellas sensitivity: ¥9.6B Core OP impact per 1 percentage-point reduction. Base case 15pp cut → ¥144B headwind. XTANDI FY2025 revenues ~¥565B (of which ~60% is U.S. Medicare Part D exposed). Pfizer co-commercialization agreement means Astellas bears ~50% of U.S. profit impact. Volume growth in non-Part D channels (commercial, VA, international) partially offsets. Bull case: 10pp cut if CMS negotiations less severe. Bear case: 25pp cut.',
      impact: 'high',
    },
    {
      id: 'xtandi-global-volume-growth',
      name: 'XTANDI Global Volume Growth vs Prior Year (%)',
      category: 'Oncology Portfolio',
      min: -5.0,
      max: 10.0,
      default: 2.0,                    // est. FY2026 XTANDI volume growth [ASSUMED]
      step: 0.5,
      unit: '% volume YoY',
      description: 'XTANDI annual prescription volume growth across all markets. Q1 FY2026: +0.5% YoY (stable). New indications (mCSPC, nmCRPC) continue to expand prostate cancer patient pool. U.S. commercial and VA channel post-IRA volumes growing as Medicare patients are treated differently. International expansion (Korea, Brazil, MENA) contributes ~2ppt. Each +1% volume growth ≈ +¥5.7B annual XTANDI revenue (at current mix). Bear: −2–3% if Medicare volume declines faster than commercial uptake.',
      impact: 'high',
    },
    {
      id: 'padcev-market-share-1l',
      name: 'PADCEV 1L Urothelial Carcinoma Market Share (%)',
      category: 'Oncology Portfolio',
      min: 25,
      max: 70,
      default: 50,                     // est. PADCEV current 1L share [ASSUMED]
      step: 5,
      unit: '% 1L bladder cancer market share',
      description: 'PADCEV (enfortumab vedotin) + pembrolizumab (KEYNOTE-869) market share in first-line urothelial carcinoma. Q1 FY2026: estimated ~50% in eligible patients. KEYNOTE-869 OS benefit HR~0.47 vs chemo — strong clinical differentiation. Key competition: BMS nivolumab combinations. Each +5% market share ≈ +¥6.5B annual PADCEV revenue. FY2026 PADCEV guidance ¥268B (+15.7% vs FY2025). Peak sales potential ¥400B+ as more indication expansions complete (MIBC, adjuvant, upper-tract).',
      impact: 'high',
    },
    {
      id: 'veozah-annual-revenue',
      name: 'VEOZAH FY2026 Annual Net Revenue (¥B)',
      category: 'Oncology Portfolio',
      min: 60,
      max: 200,
      default: 110,                    // FY2026 VEOZAH guidance ¥110B [ASSUMED]
      step: 10,
      unit: '¥B annual net revenue',
      description: 'VEOZAH (fezolinetant) full-year FY2026 U.S. net revenue. Q1 FY2026: ¥26.8B (+38.1% YoY). Guidance ¥110B. Payer coverage >85% commercial; Part D coverage expanding. Non-hormonal VMS treatment — ~38M U.S. women aged 45–60 with moderate-to-severe VMS. Annual gross-to-net deductions ~30% (rebates, co-pay). DTC investment driving prescriber awareness — OB/GYN and primary care key channels. Bull: ¥140–160B if payer coverage expands faster and DTC resonates. Bear: ¥70–80B if competitive entry or access barriers.',
      impact: 'medium',
    },

    // ─── Japan & FX ───
    {
      id: 'japan-nhi-revision',
      name: 'Japan NHI Biennial Price Revision Severity (%)',
      category: 'Japan Segment',
      min: 1.0,
      max: 8.0,
      default: 3.5,                    // April 2026 actual NHI avg cut ~3.5% [ASSUMED]
      step: 0.5,
      unit: '% average NHI price reduction',
      description: 'Japan NHI biennial drug price revision (April 2026). Base: average −3.5% across Astellas Japan portfolio. Annual revenue impact: ~¥8–12B. Key products affected: XTANDI Japan, transplantation products, older oncology agents. Each additional 1% cut ≈ −¥2.5B Japan annual revenue. Volume growth in new indications (XTANDI mCSPC Japan) and VEOZAH Japan launch (upon approval) are primary mitigation levers. Next revision: April 2028. Historical revisions: 2022 ~3%, 2024 ~3.5% — trend toward slightly larger cuts with drug pricing reform.',
      impact: 'medium',
    },
    {
      id: 'usd-jpy-rate',
      name: 'USD/JPY Exchange Rate (Annual Average)',
      category: 'FX & Treasury',
      min: 140,
      max: 170,
      default: 155,                    // FY2026 planning rate ~¥155 [ASSUMED]
      step: 1,
      unit: '¥ per USD (annual avg)',
      description: 'Annual average USD/JPY exchange rate. Planning rate: ¥155. Astellas Core OP sensitivity: ¥2.1B per ¥1 move (positive when yen weakens). ~70% of revenues are USD/EUR-denominated but reported in JPY. Natural hedges through USD procurement and manufacturing offset ~30%. Hedging program covers ~40% of residual exposure at 6–18 month horizon. EUR/JPY sensitivity: ~¥0.9B per ¥1. BoJ policy normalization creates uncertainty — yen appreciation to ¥145 would create ¥21B Core OP headwind vs plan.',
      impact: 'high',
    },

    // ─── SMT & Cost Structure ───
    {
      id: 'smt-savings-fy2026',
      name: 'SMT FY2026 In-Year Savings (¥B)',
      category: 'SMT & Cost Transformation',
      min: 20,
      max: 55,
      default: 40,                     // FY2026 SMT target ¥40B [CITED:AR-FY25]
      step: 2,
      unit: '¥B annual savings',
      description: 'Sustainable Margin Transformation FY2026 in-year savings target ¥40B (cumulative ¥65B by FY2027). FY2025 achieved ¥21B. Workstreams: (1) procurement/external spend ¥15B, (2) manufacturing efficiency ¥15B, (3) commercial SG&A ¥7B, (4) G&A/shared services ¥3B. Each additional ¥10B savings ≈ +0.45ppt Core OP margin ≈ +¥4.4/share Core EPS. Bear risk: procurement savings delayed by supplier negotiations, manufacturing timeline slippage.',
      impact: 'high',
    },
    {
      id: 'rd-spend-percent',
      name: 'R&D Spend as % of Revenue (%)',
      category: 'SMT & Cost Transformation',
      min: 14.0,
      max: 20.0,
      default: 16.4,                   // FY2026 plan: ¥360B R&D / ¥2,200B revenue [ASSUMED]
      step: 0.5,
      unit: '% of total revenue',
      description: 'Annual R&D investment as percentage of revenue. FY2026 plan 16.4% (¥360B). Reducing R&D below 14% would risk pipeline value given current Phase 3 commitments. Each 1ppt reduction ≈ +¥22B Core OP improvement (but reduces pipeline NPV). Astellas R&D portfolio focus: PADCEV combination studies, XTANDI label expansions, VEOZAH international studies, VYLOY combination programs, and next-generation oncology assets.',
      impact: 'medium',
    },

    // ─── Geographic Growth ───
    {
      id: 'international-growth-rate',
      name: 'International Markets Annual Revenue Growth (%)',
      category: 'Geographic Expansion',
      min: 0.0,
      max: 15.0,
      default: 5.8,                    // Q1 FY2026 run-rate +5.8% [CITED:EC-Q1-FY26]
      step: 0.5,
      unit: '% YoY revenue growth',
      description: 'International Markets segment (ex-China, ex-Japan) annual revenue growth. Q1 FY2026: +5.8%. Driven by XTANDI launch in Korea, Brazil, and MENA; transplantation growth in Asia-Pacific; PADCEV regulatory approvals in multiple markets. Each +1% growth ≈ +¥4.7B annual revenue (on ~¥471.8B FY2025 base). Bull: 8–10% from accelerated XTANDI market entries. Bear: 2–3% if regulatory delays or access barriers in key emerging markets.',
      impact: 'medium',
    },
    {
      id: 'china-revenue-growth',
      name: 'China Annual Revenue Growth (%)',
      category: 'Geographic Expansion',
      min: -5.0,
      max: 15.0,
      default: 2.5,                    // est. FY2026 China growth [ASSUMED]
      step: 0.5,
      unit: '% YoY China revenue growth',
      description: 'China segment annual revenue growth. FY2025: ~¥142.6B. Growth driven by XTANDI NRDL volume expansion post-price cut. PADCEV NMPA approval expected FY2027 — future major China catalyst. Transplantation products stable. Geopolitical risk (tariffs, technology restrictions, China-first procurement) monitored as scenario risk. Each +1% China growth ≈ +¥1.4B annual revenue.',
      impact: 'low',
    },

    // ─── Enterprise / Capital ───
    {
      id: 'vyloy-launch-revenue',
      name: 'VYLOY FY2026 Launch Revenue (¥B)',
      category: 'New Product Launches',
      min: 5,
      max: 80,
      default: 35,                     // est. FY2026 VYLOY launch revenue [ASSUMED]
      step: 5,
      unit: '¥B annual revenue',
      description: 'VYLOY (zolbetuximab) FY2026 launch revenue. VYLOY is a first-in-class anti-CLDN18.2 monoclonal antibody for gastric/GEJ cancer (HER2-negative, CLDN18.2-positive). SPOTLIGHT and GLOW Phase 3 trials data supports 1L use. Large addressable market in Japan (~40% gastric cancers CLDN18.2+) and globally. Competition from existing chemotherapy regimens — VYLOY adds ~2 months median OS in 1L. Base: ¥35B FY2026 (first full launch year). Peak sales potential ¥100–150B.',
      impact: 'medium',
    },
    {
      id: 'share-buyback-eps-accretion',
      name: 'Share Buyback Program (¥B annual)',
      category: 'Capital Allocation',
      min: 0,
      max: 200,
      default: 100,                    // FY2026 authorized buyback ¥100B [ASSUMED]
      step: 10,
      unit: '¥B annual buyback',
      description: 'Astellas share buyback program. FY2026 authorization: ¥100B. At current ~¥1,000 share price and ~1.0B shares outstanding, ¥100B buyback reduces share count by ~3%. EPS accretion: +¥7/share from ¥100B buyback. Funded from FCF (¥400B+ FY2026 guidance). Capital allocation framework: dividend first (¥70/share), then buyback, then strategic BD/licensing.',
      impact: 'low',
    },
  ],

  preBuiltScenarios: [
    {
      id: 'base-case',
      name: 'Base Case — FY2026 Guidance Midpoint (Core EPS ¥250+)',
      description: 'FY2026 Core EPS ¥250+. XTANDI IRA 15pp price cut effective Sept 2026. PADCEV 50% 1L market share. VEOZAH ¥110B. SMT ¥40B savings. USD/JPY ¥155. Japan NHI −3.5%. International growth +5.8%. VYLOY ¥35B launch. ¥100B share buyback.',
      icon: 'target',
      confidence: 60,
      revenueImpact: 0,
      marginImpact: 0,
      keyAssumptions: [
        'FY2026 Core EPS ¥250+ (guidance floor)',
        'XTANDI IRA CMS price −15pp effective September 2026',
        'PADCEV 1L bladder cancer standard of care maintained — 50% share',
        'VEOZAH payer coverage expanding — ¥110B FY2026 on plan',
        'SMT ¥40B in-year savings on all workstream tracks',
        'USD/JPY ¥155 planning rate — hedging covers 40% of exposure',
        'Japan NHI revision −3.5% — volume growth in new indications offsets',
        'VYLOY FY2026 launch ¥35B; IZERVAY ophthalmology growing steadily',
        '¥100B share buyback authorized; FCF ¥400B+ FY2026',
      ],
      leverSettings: {
        'xtandi-ira-price-cut': 15,
        'xtandi-global-volume-growth': 2.0,
        'padcev-market-share-1l': 50,
        'veozah-annual-revenue': 110,
        'japan-nhi-revision': 3.5,
        'usd-jpy-rate': 155,
        'smt-savings-fy2026': 40,
        'rd-spend-percent': 16.4,
        'international-growth-rate': 5.8,
        'china-revenue-growth': 2.5,
        'vyloy-launch-revenue': 35,
        'share-buyback-eps-accretion': 100,
      },
    },
    {
      id: 'bull-ira-mild-padcev-acceleration',
      name: 'Bull — Mild IRA + PADCEV Acceleration + Weak Yen',
      description: 'CMS negotiates only 10pp XTANDI cut (mild IRA). PADCEV gains 60% 1L share. USD/JPY weakens to ¥162. SMT delivers ¥48B. VEOZAH ¥140B on payer coverage breakout. Core EPS approaches ¥290+.',
      icon: 'trending-up',
      confidence: 20,
      revenueImpact: 180000,
      marginImpact: 3200,
      keyAssumptions: [
        'XTANDI IRA price cut 10pp — CMS initial negotiation milder than feared',
        'PADCEV KEYNOTE-869 OS data further strengthens 1L position → 60% market share',
        'USD/JPY ¥162 — BoJ maintains accommodative stance, yen stays weak',
        'SMT delivers ¥48B — procurement savings outperform on API renegotiations',
        'VEOZAH payer coverage expands faster — DTC creates prescriber pull-through',
        'Japan NHI mild at 2.5%; XTANDI mCSPC Japan volume growth strong',
        'VYLOY ¥55B — Asia-Pacific uptake ahead of schedule',
        'PADCEV EU reimbursement decisions all positive in Q3 FY2026',
      ],
      leverSettings: {
        'xtandi-ira-price-cut': 10,
        'xtandi-global-volume-growth': 4.0,
        'padcev-market-share-1l': 60,
        'veozah-annual-revenue': 140,
        'japan-nhi-revision': 2.5,
        'usd-jpy-rate': 162,
        'smt-savings-fy2026': 48,
        'rd-spend-percent': 15.8,
        'international-growth-rate': 8.0,
        'china-revenue-growth': 4.0,
        'vyloy-launch-revenue': 55,
        'share-buyback-eps-accretion': 120,
      },
    },
    {
      id: 'bear-ira-severe-yen-appreciation',
      name: 'Bear — Severe IRA + JPY Appreciation + Competition',
      description: 'CMS cuts XTANDI 25pp. PADCEV loses 1L share to competing ADC+IO. USD/JPY ¥145 (yen strengthens significantly). Japan NHI −6%. SMT shortfall. Core EPS ¥200–215.',
      icon: 'trending-down',
      confidence: 15,
      revenueImpact: -280000,
      marginImpact: -5500,
      keyAssumptions: [
        'XTANDI IRA price cut 25pp — well above base case; ¥240B total headwind',
        'PADCEV 1L share falls to 35% as competing combinations gain ground',
        'USD/JPY ¥145 — BoJ rate hike significantly strengthens yen; ¥21B Core OP headwind vs plan',
        'Japan NHI revision 6% — severe reform; ¥15B Japan revenue headwind',
        'SMT shortfall: ¥28B vs ¥40B target — procurement and manufacturing delays',
        'VEOZAH payer coverage barriers slower than plan — ¥80B revenue vs ¥110B guidance',
        'International market launch headwinds — regulatory delays in key markets',
        'VYLOY reimbursement barriers in gastric cancer markets',
      ],
      leverSettings: {
        'xtandi-ira-price-cut': 25,
        'xtandi-global-volume-growth': -2.0,
        'padcev-market-share-1l': 35,
        'veozah-annual-revenue': 80,
        'japan-nhi-revision': 6.0,
        'usd-jpy-rate': 145,
        'smt-savings-fy2026': 28,
        'rd-spend-percent': 17.5,
        'international-growth-rate': 2.0,
        'china-revenue-growth': -2.0,
        'vyloy-launch-revenue': 15,
        'share-buyback-eps-accretion': 50,
      },
    },
    {
      id: 'padcev-peak-sales',
      name: 'PADCEV Peak Sales — 1L Standard of Care Fully Established',
      description: 'PADCEV+pembro fully established as 1L SOC across all urothelial subtypes. 65% market share. EU reimbursement complete. Japan PADCEV launched. XTANDI IRA and other levers at base. Represents PADCEV achieving its $4B+ peak sales potential ahead of schedule.',
      icon: 'zap',
      confidence: 30,
      revenueImpact: 120000,
      marginImpact: 1800,
      keyAssumptions: [
        'PADCEV 1L urothelial market share 65% — KEYNOTE-869 fully replaces chemo',
        'EU reimbursement for PADCEV complete across 6 major markets',
        'Japan PADCEV PMDA approval (may slip to FY2027 — scenario assumes FY2026 approval)',
        'Cisplatin-ineligible label expansion to full urothelial population',
        'PADCEV adjuvant bladder cancer Phase 3 positive read-out',
        'All other levers at base case',
        'Pfizer co-commercialization momentum maintained globally',
      ],
      leverSettings: {
        'xtandi-ira-price-cut': 15,
        'xtandi-global-volume-growth': 2.0,
        'padcev-market-share-1l': 65,
        'veozah-annual-revenue': 110,
        'japan-nhi-revision': 3.5,
        'usd-jpy-rate': 155,
        'smt-savings-fy2026': 40,
        'rd-spend-percent': 16.4,
        'international-growth-rate': 5.8,
        'china-revenue-growth': 2.5,
        'vyloy-launch-revenue': 35,
        'share-buyback-eps-accretion': 100,
      },
    },
    {
      id: 'smt-outperformance',
      name: 'SMT Outperformance — ¥50B Savings Ahead of Plan',
      description: 'SMT delivers ¥50B FY2026 (¥10B above target). Procurement API renegotiations outperform; manufacturing footprint rationalization completes H1 FY2026. Core OP margin expands to 28.5%+. All other levers at base. Represents SMT being the key earnings driver independent of product performance.',
      icon: 'building-2',
      confidence: 25,
      revenueImpact: 20000,
      marginImpact: 2200,
      keyAssumptions: [
        'SMT procurement workstream ¥20B (vs ¥15B target) — API multi-year supply agreements',
        'Manufacturing footprint consolidation completes H1 FY2026 — ¥18B savings (vs ¥15B target)',
        'Commercial SG&A digital transition fully executed — ¥9B savings (vs ¥7B target)',
        'G&A shared services consolidation accelerated — ¥3B on target',
        'SMT total ¥50B → cumulative ¥71B (above ¥65B target), creating buffer for FY2027',
        'Core OP margin expands to 28.5% vs 26.4% guidance — significant positive surprise',
        'All product revenue levers at base case',
      ],
      leverSettings: {
        'xtandi-ira-price-cut': 15,
        'xtandi-global-volume-growth': 2.0,
        'padcev-market-share-1l': 50,
        'veozah-annual-revenue': 110,
        'japan-nhi-revision': 3.5,
        'usd-jpy-rate': 155,
        'smt-savings-fy2026': 50,
        'rd-spend-percent': 16.4,
        'international-growth-rate': 5.8,
        'china-revenue-growth': 2.5,
        'vyloy-launch-revenue': 35,
        'share-buyback-eps-accretion': 100,
      },
    },
  ],
};
