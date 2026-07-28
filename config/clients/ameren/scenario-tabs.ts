// v2
// Scenario tab-specific lever and scenario configurations for Astellas Finance360
// Each tab has its own set of levers and pre-built scenarios for domain-specific what-if modeling
// ─────────────────────────────────────────────────────────────────────

export interface TabScenarioLever {
  id: string;
  name: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

export interface TabPreBuiltScenario {
  id: string;
  name: string;
  description: string;
  leverSettings: Record<string, number>;
  revenueImpact: number;
  marginImpact: number;
  confidence: number;
  keyAssumptions: string[];
}

export interface ScenarioTabConfig {
  tabId: string;
  label: string;
  icon: string;
  description: string;
  levers: TabScenarioLever[];
  preBuiltScenarios: TabPreBuiltScenario[];
}

// ─── Tab 2: Oncology Portfolio (XTANDI / IRA) ────────────────────────
export const healthCareBenefitsTab: ScenarioTabConfig = {
  tabId: 'oncology',
  label: 'Oncology Portfolio',
  icon: 'Pill',
  description: 'Model XTANDI IRA price negotiation impact, PADCEV 1L bladder cancer uptake, and prostate cancer market share dynamics on oncology segment Core OP and enterprise Core EPS',
  levers: [
    {
      id: 'tab-ira-cut',
      name: 'XTANDI IRA CMS Price Cut (pp)',
      category: 'IRA Pricing',
      min: 0, max: 30, default: 15, step: 1,
      unit: '% price reduction',
      description: 'CMS negotiated price reduction for XTANDI effective September 2026. FY2026 sensitivity: ¥9.6B Core OP per 1pp cut. A 15pp cut = ¥144B headwind — partially offset by volume growth and non-Part D channel expansion.',
      impact: 'high',
    },
    {
      id: 'tab-padcev-share',
      name: 'PADCEV 1L Bladder Cancer Market Share (%)',
      category: 'PADCEV Growth',
      min: 30, max: 70, default: 50, step: 5,
      unit: '% 1L urothelial market share',
      description: 'PADCEV+pembro (KEYNOTE-869) 1L market share in urothelial carcinoma. Q1 FY2026 ~50% in eligible patients. Each +5% share ≈ +¥6.5B PADCEV annual revenue at current treatment rates.',
      impact: 'high',
    },
    {
      id: 'tab-xtandi-volume',
      name: 'XTANDI Global Volume Growth (% YoY)',
      category: 'XTANDI Volume',
      min: -5.0, max: 10.0, default: 2.0, step: 0.5,
      unit: '% volume YoY growth',
      description: 'XTANDI volume growth across all markets (mCRPC, nmCRPC, mCSPC). Post-IRA, volume growth in non-Part D (commercial, VA) and ex-U.S. markets partially offsets price headwind. Each +1% volume ≈ +¥5.7B annual XTANDI revenue.',
      impact: 'high',
    },
    {
      id: 'tab-veozah-launch',
      name: 'VEOZAH U.S. Peak Year Revenue (¥B)',
      category: 'Women\'s Health',
      min: 60, max: 200, default: 110, step: 10,
      unit: '¥B annual revenue',
      description: 'VEOZAH full-year FY2026 revenue trajectory. ¥110B guidance vs Q1 run-rate ¥107B annualized. Payer coverage, DTC investment, and prescriber base expansion drive upside. Non-hormonal VMS market is largely untapped.',
      impact: 'medium',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'onc-base',
      name: 'Oncology Base — Guidance Midpoint',
      description: 'FY2026 guidance: XTANDI IRA 15pp cut, PADCEV 50% 1L share, VEOZAH ¥110B.',
      leverSettings: { 'tab-ira-cut': 15, 'tab-padcev-share': 50, 'tab-xtandi-volume': 2.0, 'tab-veozah-launch': 110 },
      revenueImpact: 0, marginImpact: 0, confidence: 60,
      keyAssumptions: ['XTANDI IRA CMS price −15pp effective Sept 2026', 'PADCEV 1L standard of care maintained', 'VEOZAH payer coverage expanding to 90%+', 'SMT savings offsetting IRA headwind'],
    },
    {
      id: 'onc-bull',
      name: 'Oncology Bull — Mild IRA + PADCEV Acceleration',
      description: 'CMS negotiates only 10pp cut. PADCEV gains 60% 1L share. VEOZAH ¥140B on payer coverage breakout.',
      leverSettings: { 'tab-ira-cut': 10, 'tab-padcev-share': 60, 'tab-xtandi-volume': 4.0, 'tab-veozah-launch': 140 },
      revenueImpact: 85000, marginImpact: 1800, confidence: 25,
      keyAssumptions: ['IRA price cut milder than feared — 10pp vs 15pp', 'PADCEV KEYNOTE-869 data strengthens 1L dominance', 'VEOZAH payer access superior to base case', 'XTANDI volume strong in ex-U.S. and VA channel'],
    },
    {
      id: 'onc-bear',
      name: 'Oncology Bear — Severe IRA + Competition',
      description: 'CMS cuts XTANDI 25pp. PADCEV loses share to competing ADC+IO regimens. VEOZAH payer access slower.',
      leverSettings: { 'tab-ira-cut': 25, 'tab-padcev-share': 35, 'tab-xtandi-volume': -2.0, 'tab-veozah-launch': 80 },
      revenueImpact: -180000, marginImpact: -3500, confidence: 15,
      keyAssumptions: ['IRA price cut 25pp — significantly above plan', 'Competing ADC combinations take PADCEV 1L share', 'VEOZAH formulary barriers slow commercial launch', 'XTANDI volume declines in Part D population'],
    },
  ],
};

// ─── Tab 3: Japan & Geographic Expansion ─────────────────────────────
export const healthServicesTab: ScenarioTabConfig = {
  tabId: 'japan-geographic',
  label: 'Japan & Geographic',
  icon: 'Globe',
  description: 'Model Japan NHI price revision impact, FX USD/JPY sensitivity, and geographic segment growth across Established Markets, International Markets, and China on Astellas enterprise financials',
  levers: [
    {
      id: 'tab-nhi-cut',
      name: 'Japan NHI Price Revision Severity (%)',
      category: 'Japan NHI',
      min: 1.0, max: 8.0, default: 3.5, step: 0.5,
      unit: '% avg NHI price cut',
      description: 'April 2026 Japan NHI biennial drug price revision. Base: −3.5% avg. Each additional 1% NHI cut ≈ −¥2.5B Japan annual revenue. Volume growth in new indications and new product launches (VEOZAH Japan) are primary offsets.',
      impact: 'high',
    },
    {
      id: 'tab-fx-rate',
      name: 'USD/JPY Exchange Rate (¥ per $)',
      category: 'FX',
      min: 140, max: 170, default: 155, step: 1,
      unit: '¥ per USD',
      description: 'USD/JPY planning rate ~¥155. FX sensitivity: ¥2.1B Core OP per ¥1 move. A move to ¥160 = +¥10.5B Core OP tailwind. Hedging covers ~40% of USD exposure. EUR/JPY has secondary sensitivity (¥0.9B per ¥1).',
      impact: 'high',
    },
    {
      id: 'tab-intl-growth',
      name: 'International Markets Revenue Growth (% YoY)',
      category: 'Geographic Growth',
      min: 0.0, max: 15.0, default: 5.8, step: 0.5,
      unit: '% YoY revenue growth',
      description: 'International Markets (ex-China, ex-Japan) YoY growth. Q1 FY2026: +5.8%. Driven by XTANDI expansion in Korea, Brazil, and MENA. Each +1% growth ≈ +¥4.7B annual revenue (on ~¥471.8B base).',
      impact: 'medium',
    },
    {
      id: 'tab-china-growth',
      name: 'China Revenue Growth (% YoY)',
      category: 'China',
      min: -5.0, max: 15.0, default: 2.5, step: 0.5,
      unit: '% YoY China revenue growth',
      description: 'China revenue growth — XTANDI NRDL volume expansion offset by NRDL price cut. PADCEV NMPA approval (expected FY2027) is next major China growth catalyst. Geopolitical risk monitored. Q1 FY2026: +2.5%.',
      impact: 'low',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'geo-base',
      name: 'Geographic Base — FY2026 Plan',
      description: 'Japan NHI −3.5%, USD/JPY ¥155, Int\'l +5.8% growth, China +2.5%.',
      leverSettings: { 'tab-nhi-cut': 3.5, 'tab-fx-rate': 155, 'tab-intl-growth': 5.8, 'tab-china-growth': 2.5 },
      revenueImpact: 0, marginImpact: 0, confidence: 65,
      keyAssumptions: ['NHI revision 3.5% — consistent with recent biennial history', 'USD/JPY stable at ¥155 planning rate', 'International Markets XTANDI launches on track', 'China NRDL volume growth offsetting price cut'],
    },
    {
      id: 'geo-bull',
      name: 'Geographic Bull — Weak Yen + Mild NHI',
      description: 'USD/JPY ¥162 (weak yen tailwind). NHI revision mild at 2.5%. International Markets +8% growth.',
      leverSettings: { 'tab-nhi-cut': 2.5, 'tab-fx-rate': 162, 'tab-intl-growth': 8.0, 'tab-china-growth': 4.0 },
      revenueImpact: 75000, marginImpact: 1600, confidence: 20,
      keyAssumptions: ['BoJ maintains accommodative policy — yen stays weak vs USD', 'NHI revision milder due to pharma industry advocacy', 'International Markets XTANDI launches outpace plan', 'China NRDL volume ramp accelerates'],
    },
    {
      id: 'geo-bear',
      name: 'Geographic Bear — JPY Appreciation + Severe NHI',
      description: 'USD/JPY ¥145 (yen appreciates). NHI revision 6.0%. International growth slows.',
      leverSettings: { 'tab-nhi-cut': 6.0, 'tab-fx-rate': 145, 'tab-intl-growth': 2.0, 'tab-china-growth': -2.0 },
      revenueImpact: -120000, marginImpact: -2400, confidence: 20,
      keyAssumptions: ['BoJ rate hike strengthens yen significantly', 'NHI revision more severe than history', 'International market launch headwinds', 'China geopolitical risk compresses revenue'],
    },
  ],
};

// ─── Tab 4: Pipeline & SMT Cost Transformation ───────────────────────
export const pharmacyConsumerWellnessTab: ScenarioTabConfig = {
  tabId: 'pipeline-smt',
  label: 'Pipeline & SMT',
  icon: 'TrendingUp',
  description: 'Model SMT cost savings realization, R&D pipeline success rates, and new product launch trajectories (VYLOY, IZERVAY) on Core OP margin and long-term earnings growth',
  levers: [
    {
      id: 'tab-smt-savings',
      name: 'SMT FY2026 In-Year Savings (¥B)',
      category: 'SMT',
      min: 25, max: 55, default: 40, step: 2,
      unit: '¥B annual savings',
      description: 'SMT FY2026 target ¥40B. FY2025 achieved ¥21B. Each ¥10B incremental savings ≈ +0.45ppt Core OP margin. Cumulative ¥65B by FY2027. Workstreams: procurement (¥15B), manufacturing (¥15B), commercial SG&A (¥7B), G&A (¥3B).',
      impact: 'high',
    },
    {
      id: 'tab-rd-productivity',
      name: 'R&D Spend as % of Revenue (%)',
      category: 'R&D Investment',
      min: 14.0, max: 20.0, default: 16.4, step: 0.5,
      unit: '% of revenue',
      description: 'R&D as % revenue. FY2026 plan: ¥360B / ¥2,200B = 16.4%. Reducing R&D below 15% risks pipeline value; exceeding 18% compresses near-term margins. Optimal zone 15–17% for Astellas current portfolio stage.',
      impact: 'high',
    },
    {
      id: 'tab-vyloy-launch',
      name: 'VYLOY FY2026 Revenue (¥B)',
      category: 'New Launches',
      min: 10, max: 80, default: 35, step: 5,
      unit: '¥B annual revenue',
      description: 'VYLOY (zolbetuximab) gastric/GEJ cancer launch revenue. Base: ¥35B FY2026. Earlier indication expansion and combination regimen adoption drives upside. First-in-class CLDN18.2 targeting agent — large addressable market in Asia-Pacific.',
      impact: 'medium',
    },
    {
      id: 'tab-sga-ratio',
      name: 'SG&A as % of Revenue (%)',
      category: 'Operating Efficiency',
      min: 22.0, max: 32.0, default: 26.5, step: 0.5,
      unit: '% SG&A / revenue',
      description: 'SG&A efficiency. FY2026 plan 26.5% of revenue. SMT commercial SG&A savings targeting reduction to 25.5% by FY2027. Each −1ppt SG&A ratio ≈ +¥22B Core OP improvement. Key driver: digital marketing vs personal promotion mix shift.',
      impact: 'medium',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'smt-base',
      name: 'SMT Base — ¥40B FY2026 Target Achieved',
      description: 'SMT delivers ¥40B FY2026 savings on plan. R&D 16.4%. SG&A 26.5%. VYLOY ¥35B.',
      leverSettings: { 'tab-smt-savings': 40, 'tab-rd-productivity': 16.4, 'tab-vyloy-launch': 35, 'tab-sga-ratio': 26.5 },
      revenueImpact: 0, marginImpact: 0, confidence: 65,
      keyAssumptions: ['SMT ¥40B savings achieved across all workstreams', 'R&D investment maintained at 16.4% of revenue', 'VYLOY launch on planned trajectory', 'SG&A at plan level'],
    },
    {
      id: 'smt-bull',
      name: 'SMT Bull — ¥48B Savings + VYLOY Outperformance',
      description: 'SMT delivers ¥48B vs ¥40B target. VYLOY ¥55B from Asia-Pacific uptake. SG&A 25.5%.',
      leverSettings: { 'tab-smt-savings': 48, 'tab-rd-productivity': 16.0, 'tab-vyloy-launch': 55, 'tab-sga-ratio': 25.5 },
      revenueImpact: 55000, marginImpact: 1200, confidence: 25,
      keyAssumptions: ['SMT procurement savings outperform on API renegotiations', 'VYLOY China and Korea uptake faster than base plan', 'Digital promotion efficiency gains materialize in SG&A', 'Manufacturing footprint rationalization complete ahead of schedule'],
    },
    {
      id: 'smt-bear',
      name: 'SMT Bear — Savings Shortfall + Launch Delays',
      description: 'SMT delivers only ¥28B (30% shortfall). VYLOY ¥15B on market access delays. R&D at 17.5%.',
      leverSettings: { 'tab-smt-savings': 28, 'tab-rd-productivity': 17.5, 'tab-vyloy-launch': 15, 'tab-sga-ratio': 28.0 },
      revenueImpact: -35000, marginImpact: -1500, confidence: 15,
      keyAssumptions: ['SMT procurement savings delayed by supplier negotiations', 'VYLOY reimbursement barriers in key markets', 'R&D investment increases for pipeline priority assets', 'SG&A inflation from commercial investments in launch markets'],
    },
  ],
};

export const cvsScenarioTabs: ScenarioTabConfig[] = [
  healthCareBenefitsTab,
  healthServicesTab,
  pharmacyConsumerWellnessTab,
];
