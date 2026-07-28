// Astellas Pharma scenario tab-specific lever and scenario configurations
// Four domain tabs: XTANDI IRA & US Oncology, Strategic Brands Launch Portfolio,
// Global Markets & FX Sensitivity, SMT & Digital Innovation
//
// Tab IDs match the AnalysisTab union in ScenarioModelingClient:
//   strategy-investment | real-estate-portfolio | global-markets | digital-platform
//
// Provenance: Astellas Pharma FY2025 Annual Report, FY2026 guidance, Q1 FY2026 IR materials.
// Figures are editorial ranges for CFO discussion — not Astellas guidance.

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

// ─── Tab 1: Strategic Investment — XTANDI IRA & US Oncology ──────────────────
export const xtandiIraTab: ScenarioTabConfig = {
  tabId: 'strategy-investment',
  label: 'XTANDI IRA & US Oncology',
  icon: 'Target',
  description: 'Model XTANDI IRA Medicare price negotiation impact, US prostate cancer TRx volume, PADCEV urothelial cancer market dynamics, Pfizer collaboration revenue, and new oncology indication approvals',
  levers: [
    {
      id: 'xtandi-ira-discount-pct',
      name: 'XTANDI IRA Medicare Price Discount',
      category: 'XTANDI IRA Risk',
      min: 0, max: 45, default: 25, step: 5,
      unit: '% discount vs prior price',
      description: 'IRA-negotiated XTANDI Medicare price reduction vs prior manufacturer price, effective January 2026. CMS negotiation process; final price classified. Base case: ~25% reduction. Medicare ~40% of XTANDI US sales (~¥200B est.); each 10pp additional discount ≈ −¥20B annual revenue and −¥14B Core OP.',
      impact: 'high',
    },
    {
      id: 'xtandi-us-trx-growth',
      name: 'XTANDI US Total Prescription Growth YoY',
      category: 'XTANDI Volume',
      min: -10, max: 15, default: 3, step: 1,
      unit: '% TRx growth',
      description: 'XTANDI US total prescription volume growth YoY (net of IRA price). Growth driven by nmCRPC label expansion, earlier-stage treatment penetration, and ECS indication. Partially offset by competitive entrants. Each +1pp TRx growth on ¥800B+ US revenue ≈ +¥8B annual revenue.',
      impact: 'high',
    },
    {
      id: 'padcev-market-penetration',
      name: 'PADCEV 1L Urothelial Cancer Penetration',
      category: 'PADCEV',
      min: 20, max: 75, default: 42, step: 5,
      unit: '% 1L market share',
      description: 'PADCEV (enfortumab vedotin + pembrolizumab) first-line urothelial cancer market share. ¥221.2B FY2025 revenue. EV+pembro label now 1L standard-of-care candidate. Each +5pp share gain ≈ +¥15–20B revenue based on addressable market size.',
      impact: 'high',
    },
    {
      id: 'pfizer-collaboration-adjustment',
      name: 'Pfizer Collaboration Revenue Adjustment',
      category: 'Pfizer Collaboration',
      min: 80, max: 120, default: 100, step: 5,
      unit: '% of base collaboration revenue',
      description: 'Pfizer co-promotion and royalty revenue as % of base case plan. Reflects Pfizer commercial execution quality, territory management, and contract term adjustments. Below 100% indicates Pfizer underperformance; above 100% indicates overperformance.',
      impact: 'medium',
    },
    {
      id: 'new-indication-revenue',
      name: 'New Indication Revenue Contribution (¥B)',
      category: 'New Indications',
      min: 0, max: 120, default: 20, step: 10,
      unit: '¥B annual revenue',
      description: 'Incremental revenue from new XTANDI or Astellas oncology product approvals beyond base portfolio. Includes ECS indication expansion, PADCEV label extensions, and pipeline compound approvals. Probability-adjusted contribution to current FY guidance.',
      impact: 'medium',
    },
    {
      id: 'us-oncology-sga-efficiency',
      name: 'US Oncology SG&A Efficiency Improvement',
      category: 'Cost Management',
      min: -15, max: 10, default: -5, step: 5,
      unit: '% SG&A reduction vs prior year',
      description: 'US commercial SG&A efficiency gains from SMT and field force optimization. −5% base case reflects headcount rationalization and targeting efficiency improvements. Each −5% on ~¥200B US SG&A ≈ +¥10B Core OP impact. Negative number = favorable (cost reduction).',
      impact: 'medium',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'xtandi-ira-bull',
      name: 'IRA Minimum Discount + Volume Acceleration',
      description: 'IRA discount at low end of range; strong TRx growth driven by earlier-stage treatment expansion',
      leverSettings: {
        'xtandi-ira-discount-pct': 15,
        'xtandi-us-trx-growth': 8,
        'padcev-market-penetration': 52,
        'pfizer-collaboration-adjustment': 108,
        'new-indication-revenue': 45,
        'us-oncology-sga-efficiency': -8,
      },
      revenueImpact: 280,
      marginImpact: 185,
      confidence: 25,
      keyAssumptions: [
        'CMS IRA negotiated price at 15% discount — lower than feared; litigation outcome favorable',
        'XTANDI TRx growth +8% from nmCRPC and ECS penetration above plan',
        'PADCEV 1L market share rapidly approaching 50% threshold with payer adoption',
        'Pfizer US co-promotion execution outperforming targets',
      ],
    },
    {
      id: 'xtandi-ira-base',
      name: 'Base Case — FY2026 Guidance',
      description: 'IRA discount at ~25%; XTANDI volume growth modest; PADCEV on current trajectory',
      leverSettings: {
        'xtandi-ira-discount-pct': 25,
        'xtandi-us-trx-growth': 3,
        'padcev-market-penetration': 42,
        'pfizer-collaboration-adjustment': 100,
        'new-indication-revenue': 20,
        'us-oncology-sga-efficiency': -5,
      },
      revenueImpact: 0,
      marginImpact: 0,
      confidence: 65,
      keyAssumptions: [
        'XTANDI IRA Medicare discount ~25% — FY2026 guidance already incorporates this',
        'XTANDI US TRx +3% reflecting competitive pressure offset by indication breadth',
        'PADCEV maintaining 42% 1L share; competitive dynamics stable for FY2026',
        'Pfizer collaboration on plan; no contractual changes',
      ],
    },
    {
      id: 'xtandi-ira-bear',
      name: 'Severe IRA Discount + Competition Escalation',
      description: 'IRA discount above 35%; aggressive competitor entry in urothelial cancer; volume loss',
      leverSettings: {
        'xtandi-ira-discount-pct': 38,
        'xtandi-us-trx-growth': -5,
        'padcev-market-penetration': 30,
        'pfizer-collaboration-adjustment': 93,
        'new-indication-revenue': 5,
        'us-oncology-sga-efficiency': 0,
      },
      revenueImpact: -380,
      marginImpact: -265,
      confidence: 20,
      keyAssumptions: [
        'IRA Medicare discount at 38% — above management base-case estimates',
        'XTANDI TRx −5% from new competitive entrant gaining share in nmCRPC',
        'PADCEV 1L penetration challenged by competing ADC or IO combination',
        'Pfizer collaboration revenue below plan due to execution issues',
      ],
    },
  ],
};

// ─── Tab 2: Real Estate Portfolio — Strategic Brands Launch Portfolio ─────────
export const strategicBrandsTab: ScenarioTabConfig = {
  tabId: 'real-estate-portfolio',
  label: 'Strategic Brands Launch Portfolio',
  icon: 'Building2',
  description: 'Model Strategic Brands growth trajectory: IZERVAY geographic atrophy penetration, VYLOY gastric cancer launch execution, VEOZAH market share, XOSPATA AML lifecycle, and pipeline compound launch readiness',
  levers: [
    {
      id: 'izervay-us-penetration',
      name: 'IZERVAY US Geographic Atrophy Penetration',
      category: 'IZERVAY',
      min: 5, max: 45, default: 18, step: 5,
      unit: '% diagnosed GA patients treated',
      description: 'IZERVAY (avacincaptad pegol) penetration in diagnosed geographic atrophy patients in the US. ¥77.6B FY2025 revenue. Treatment rate vs addressable patient pool. Competitive positioning vs Apellis Syfovre. Each +5pp penetration ≈ +¥25–35B incremental annual revenue potential.',
      impact: 'high',
    },
    {
      id: 'vyloy-peak-sales-achievement',
      name: 'VYLOY Peak Sales Achievement Rate',
      category: 'VYLOY',
      min: 25, max: 120, default: 65, step: 5,
      unit: '% of internal peak sales model',
      description: 'VYLOY (zolbetuximab) annual revenue as % of internal peak sales model. ¥63.1B FY2025 launch-year baseline. Gastric cancer launch KPIs: CLDN18.2+ patient testing rates, hospital formulary wins, physician adoption. Global launch across US, EU, Japan, China. 100% = on-model.',
      impact: 'high',
    },
    {
      id: 'veozah-prescriber-adoption',
      name: 'VEOZAH Prescriber Adoption Rate',
      category: 'VEOZAH',
      min: 10, max: 55, default: 28, step: 5,
      unit: '% of targeted OBGYN prescribers active',
      description: 'VEOZAH (fezolinetant) active prescriber base as % of targeted OB/GYN and primary care physicians. ¥46.6B FY2025 revenue. Women\'s health market share vs hormone therapy (HRT, MHT). Patient persistence and refill rate are critical to revenue durability. Each +5pp prescriber ≈ +¥10–18B incremental revenue.',
      impact: 'medium',
    },
    {
      id: 'xospata-lifecycle-extension',
      name: 'XOSPATA AML Lifecycle Extension Revenue (¥B)',
      category: 'XOSPATA',
      min: 55, max: 110, default: 72, step: 5,
      unit: '¥B annual revenue',
      description: 'XOSPATA (gilteritinib) revenue including lifecycle extension: combination therapy label, MRD-guided treatment, potentially broader FLT3+ or other AML subtype indications. ¥71.8B FY2025 baseline. Competitive pressure from quizartinib; clinical differentiation data critical.',
      impact: 'medium',
    },
    {
      id: 'strategic-brands-combined-growth',
      name: 'Strategic Brands Combined Growth Rate',
      category: 'Portfolio Growth',
      min: 10, max: 75, default: 43, step: 5,
      unit: '% YoY combined growth',
      description: 'PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA combined revenue YoY growth. FY2025: +43% to ¥480.3B. FY2026 growth trajectory depends on each brand\'s launch maturation and competitive dynamics. This metric is the primary offset to XTANDI IRA revenue headwind.',
      impact: 'high',
    },
    {
      id: 'next-launch-readiness',
      name: 'Next Pipeline Launch Readiness Score',
      category: 'Pipeline',
      min: 0, max: 100, default: 55, step: 5,
      unit: 'readiness score (0-100)',
      description: 'Composite readiness score for next Astellas pipeline compound approaching commercial launch: manufacturing scale-up, market access preparation, medical education, and sales force training. Higher score reduces launch risk and accelerates revenue ramp.',
      impact: 'medium',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'sb-bull',
      name: 'Strategic Brands Outperformance',
      description: 'IZERVAY and VYLOY exceed plan; VEOZAH prescriber adoption accelerates; combined +60% growth',
      leverSettings: {
        'izervay-us-penetration': 28,
        'vyloy-peak-sales-achievement': 90,
        'veozah-prescriber-adoption': 38,
        'xospata-lifecycle-extension': 88,
        'strategic-brands-combined-growth': 60,
        'next-launch-readiness': 75,
      },
      revenueImpact: 200,
      marginImpact: 140,
      confidence: 30,
      keyAssumptions: [
        'IZERVAY reaches 28% GA penetration as new-to-brand patient acquisition accelerates',
        'VYLOY 90% peak sales achievement on strong CLDN18.2+ testing and global rollout',
        'VEOZAH prescriber base expands rapidly with positive patient outcome data',
        'XOSPATA lifecycle extension data supports ¥88B revenue trajectory',
      ],
    },
    {
      id: 'sb-base',
      name: 'Base Case — FY2026 Guidance',
      description: 'Strategic Brands sustain ~43% YoY growth trajectory in line with management view',
      leverSettings: {
        'izervay-us-penetration': 18,
        'vyloy-peak-sales-achievement': 65,
        'veozah-prescriber-adoption': 28,
        'xospata-lifecycle-extension': 72,
        'strategic-brands-combined-growth': 43,
        'next-launch-readiness': 55,
      },
      revenueImpact: 0,
      marginImpact: 0,
      confidence: 62,
      keyAssumptions: [
        'IZERVAY maintains 18% GA penetration with steady payer coverage expansion',
        'VYLOY 65% peak sales — launch year ramp consistent with management view',
        'VEOZAH prescriber base builds at current cadence through FY2026',
        'XOSPATA stable at ¥71.8B baseline with modest lifecycle extension contribution',
      ],
    },
    {
      id: 'sb-bear',
      name: 'Launch Execution Headwind',
      description: 'IZERVAY faces payer pushback; VYLOY launch below model; competitive pressure across portfolio',
      leverSettings: {
        'izervay-us-penetration': 10,
        'vyloy-peak-sales-achievement': 40,
        'veozah-prescriber-adoption': 18,
        'xospata-lifecycle-extension': 60,
        'strategic-brands-combined-growth': 20,
        'next-launch-readiness': 35,
      },
      revenueImpact: -180,
      marginImpact: -130,
      confidence: 20,
      keyAssumptions: [
        'IZERVAY payer coverage restricted — formulary exclusions in major plans',
        'VYLOY launch below model: CLDN18.2+ testing rates lower than expected',
        'VEOZAH prescriber adoption slows amid HRT preference among gynecologists',
        'XOSPATA competitive pressure from quizartinib and other AML agents',
      ],
    },
  ],
};

// ─── Tab 3: Global Markets — FX Sensitivity & Geographic Growth ───────────────
export const globalMarketsTab: ScenarioTabConfig = {
  tabId: 'global-markets',
  label: 'Global Markets & FX Sensitivity',
  icon: 'Package',
  description: 'Model USD/JPY and EUR/JPY FX rate impacts, China VBP pricing dynamics, Established Markets growth, International Markets expansion, and FX hedging economics on consolidated Core OP',
  levers: [
    {
      id: 'usd-jpy-rate',
      name: 'USD/JPY Exchange Rate',
      category: 'FX — USD',
      min: 130, max: 175, default: 151, step: 1,
      unit: '¥/USD',
      description: 'USD/JPY spot rate vs ¥151 FY2026 planning assumption. ~65–70% of Astellas revenue is USD-denominated (XTANDI, PADCEV, US Strategic Brands). Each ¥10 JPY depreciation (higher number) ≈ +¥70–80B revenue and +¥28–32B Core OP. Each ¥10 JPY appreciation ≈ equivalent headwind.',
      impact: 'high',
    },
    {
      id: 'eur-jpy-rate',
      name: 'EUR/JPY Exchange Rate',
      category: 'FX — EUR',
      min: 140, max: 185, default: 165, step: 1,
      unit: '¥/EUR',
      description: 'EUR/JPY spot rate vs ¥165 planning assumption. EUR revenue primarily from Established Markets (EU-5, Nordics, other Europe). ~15% of Astellas revenue is EUR-denominated. Each ¥10 EUR/JPY move ≈ ±¥30–35B revenue and ±¥12–14B Core OP.',
      impact: 'medium',
    },
    {
      id: 'china-vbp-net-impact',
      name: 'China VBP Net Revenue Impact YoY',
      category: 'China',
      min: -25, max: 20, default: -5, step: 5,
      unit: '% China revenue growth (net of VBP)',
      description: 'China segment net revenue growth after VBP pricing reductions. VBP cuts are offset by volume inclusion in national programs. ~¥93B FY2025 China revenue. Each −10% VBP impact ≈ −¥9B revenue. VYLOY launch partially offsets VBP headwinds on legacy products.',
      impact: 'medium',
    },
    {
      id: 'established-markets-growth',
      name: 'Established Markets Underlying Revenue Growth',
      category: 'Established Markets',
      min: -5, max: 12, default: 3, step: 1,
      unit: '% constant-currency growth',
      description: 'Established Markets (EU, Canada, Australia) constant-currency revenue growth. ~¥391B FY2025 baseline. Growth from PADCEV, IZERVAY label approvals and reimbursement gains. Offset by XTANDI price negotiations and parallel import pressure in EU. Each +1% ≈ +¥3.9B revenue.',
      impact: 'medium',
    },
    {
      id: 'fx-hedge-coverage-rate',
      name: 'USD FX Hedging Coverage Rate',
      category: 'FX Hedging',
      min: 30, max: 80, default: 55, step: 5,
      unit: '% of USD exposure hedged',
      description: 'Percentage of USD-denominated revenues hedged on a rolling 12-month basis. Higher coverage protects against JPY appreciation but limits upside from JPY depreciation. Current: ~55%. Each 10pp change in coverage at current spot vs plan rates affects earnings volatility and CFO guidance confidence.',
      impact: 'medium',
    },
    {
      id: 'international-markets-growth',
      name: 'International Markets Growth Rate',
      category: 'International Markets',
      min: 0, max: 25, default: 8, step: 2,
      unit: '% revenue growth',
      description: 'International Markets segment (Southeast Asia, Middle East, Latin America) revenue growth. ~¥182B FY2025 baseline. VYLOY and PADCEV international launches driving growth. Regulatory approval timelines and access program investments pace the ramp.',
      impact: 'low',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'fx-bull',
      name: 'JPY Weakness Tailwind Scenario',
      description: 'Sustained JPY depreciation to ¥162 — significant revenue tailwind vs ¥151 plan',
      leverSettings: {
        'usd-jpy-rate': 162,
        'eur-jpy-rate': 175,
        'china-vbp-net-impact': 0,
        'established-markets-growth': 4,
        'fx-hedge-coverage-rate': 55,
        'international-markets-growth': 10,
      },
      revenueImpact: 180,
      marginImpact: 72,
      confidence: 40,
      keyAssumptions: [
        'USD/JPY at ¥162 — BOJ holds rates; Fed keeps rates higher for longer',
        'EUR/JPY at ¥175 driven by JPY weakness, not EUR strength',
        'China VBP impact neutral — VYLOY volume offsets legacy price cuts',
        'Additional FX hedge rolled at favorable ¥162 rate for H2',
      ],
    },
    {
      id: 'fx-base',
      name: 'Base Case — ¥151/USD Planning Rate',
      description: 'FX rate at planning assumption; Established Markets +3%; China neutral',
      leverSettings: {
        'usd-jpy-rate': 151,
        'eur-jpy-rate': 165,
        'china-vbp-net-impact': -5,
        'established-markets-growth': 3,
        'fx-hedge-coverage-rate': 55,
        'international-markets-growth': 8,
      },
      revenueImpact: 0,
      marginImpact: 0,
      confidence: 55,
      keyAssumptions: [
        'USD/JPY at ¥151 — consistent with FY2026 guidance planning assumption',
        'China −5% net of VBP on legacy products; VYLOY partially offsetting',
        'Established Markets +3% constant-currency: PADCEV and IZERVAY reimbursement gains',
        'FX hedge book rolling at ~55% coverage; weighted average hedge rate ~¥148',
      ],
    },
    {
      id: 'fx-bear',
      name: 'JPY Appreciation Headwind Scenario',
      description: 'JPY strengthens to ¥140 — material revenue and Core OP headwind vs plan',
      leverSettings: {
        'usd-jpy-rate': 140,
        'eur-jpy-rate': 152,
        'china-vbp-net-impact': -15,
        'established-markets-growth': 1,
        'fx-hedge-coverage-rate': 55,
        'international-markets-growth': 5,
      },
      revenueImpact: -160,
      marginImpact: -65,
      confidence: 30,
      keyAssumptions: [
        'USD/JPY at ¥140 from BOJ rate hike and Fed pivot — ~¥155B revenue headwind vs plan',
        'EUR/JPY also weaker, compounding Established Markets translation impact',
        'China VBP −15% — larger than expected price cuts in oncology round',
        'Guidance revision likely required; hedge book cushions H1 impact',
      ],
    },
  ],
};

// ─── Tab 4: Digital Platform — SMT & Digital Innovation ──────────────────────
export const smtDigitalTab: ScenarioTabConfig = {
  tabId: 'digital-platform',
  label: 'SMT & Digital Innovation',
  icon: 'Smartphone',
  description: 'Model Sustainable Margin Transformation savings delivery, R&D portfolio optimization efficiency, manufacturing footprint rationalization, AI-enabled clinical trial acceleration, and digital health platform investments',
  levers: [
    {
      id: 'smt-annual-savings',
      name: 'SMT Annual Savings Delivered (¥B)',
      category: 'SMT Program',
      min: 15, max: 75, default: 40, step: 5,
      unit: '¥B savings',
      description: 'Sustainable Margin Transformation program annual savings delivered. FY2026 target: ¥40B. Workstreams: SG&A headcount reduction (~¥15B), procurement (~¥10B), manufacturing footprint (~¥10B), R&D portfolio (~¥5B). Each ¥10B savings ≈ +0.5pp Core OP margin at ¥2,220B revenue base.',
      impact: 'high',
    },
    {
      id: 'rd-portfolio-optimization',
      name: 'R&D Portfolio Rationalization Savings (¥B)',
      category: 'R&D Efficiency',
      min: 0, max: 35, default: 12, step: 5,
      unit: '¥B R&D savings',
      description: 'Savings from R&D portfolio prioritization: terminating low-probability programs, out-licensing non-core assets, rationalizing early-stage investment. R&D is ~22% of revenue (~¥470B annually). Each ¥10B R&D rationalization ≈ +0.5pp Core OP margin (but may reduce pipeline optionality).',
      impact: 'high',
    },
    {
      id: 'manufacturing-footprint-savings',
      name: 'Manufacturing Footprint Rationalization (¥B)',
      category: 'Manufacturing',
      min: 0, max: 30, default: 10, step: 5,
      unit: '¥B manufacturing savings',
      description: 'Annual savings from manufacturing site consolidation, outsourcing, and operational efficiency. Astellas has manufacturing sites in Japan, Ireland, and US. Plant rationalization creates one-time charges but recurring savings thereafter. Each ¥5B savings ≈ +0.2pp Core OP margin.',
      impact: 'medium',
    },
    {
      id: 'ai-clinical-trial-efficiency',
      name: 'AI-Enabled Clinical Trial Time Reduction',
      category: 'Digital / AI',
      min: 0, max: 35, default: 10, step: 5,
      unit: '% trial timeline reduction',
      description: 'Reduction in clinical trial cycle times from AI-enabled patient recruitment, adaptive trial designs, and digital biomarker validation. 10% reduction in average Phase 2/3 trial time ≈ 6–12 months faster POC readouts → +¥50–150B NPV acceleration across pipeline. Reduces total R&D spend per approved drug.',
      impact: 'medium',
    },
    {
      id: 'digital-health-partnership-revenue',
      name: 'Digital Health Platform Partnership Revenue (¥B)',
      category: 'Digital Health',
      min: 0, max: 40, default: 5, step: 5,
      unit: '¥B incremental revenue',
      description: 'Revenue from Astellas digital health platform partnerships: companion diagnostics, digital therapeutics, remote monitoring, and data-driven patient support programs. Early stage; current contribution modest. Each ¥10B digital revenue ≈ +0.5% total revenue contribution at high margin.',
      impact: 'low',
    },
    {
      id: 'procurement-savings',
      name: 'Procurement & Vendor Renegotiation Savings (¥B)',
      category: 'SMT — Procurement',
      min: 0, max: 25, default: 10, step: 5,
      unit: '¥B savings',
      description: 'Annual savings from procurement renegotiation: CRO contracts, raw materials, logistics, IT services, and professional services. Centralized procurement model drives leverage across regions. Each ¥5B savings ≈ +0.2pp Core OP margin.',
      impact: 'medium',
    },
  ],
  preBuiltScenarios: [
    {
      id: 'smt-bull',
      name: 'SMT Outperformance — ¥55B Delivered',
      description: 'SMT delivers ¥55B vs ¥40B target; AI trial efficiency beats; Core OP margin exceeds 28%',
      leverSettings: {
        'smt-annual-savings': 55,
        'rd-portfolio-optimization': 20,
        'manufacturing-footprint-savings': 18,
        'ai-clinical-trial-efficiency': 18,
        'digital-health-partnership-revenue': 10,
        'procurement-savings': 17,
      },
      revenueImpact: 10,
      marginImpact: 180,
      confidence: 30,
      keyAssumptions: [
        'SMT ¥55B delivers — SG&A reduction deeper and faster than planned',
        'R&D portfolio rationalization frees ¥20B without materially reducing pipeline NPV',
        'Manufacturing site consolidation proceeds ahead of schedule',
        'AI clinical tools adopted across 50%+ of active trials, accelerating timelines',
      ],
    },
    {
      id: 'smt-base',
      name: 'Base Case — SMT ¥40B FY2026 Target',
      description: 'SMT on track for ¥40B; Core OP margin ~27.9% as guided; AI trials gradual adoption',
      leverSettings: {
        'smt-annual-savings': 40,
        'rd-portfolio-optimization': 12,
        'manufacturing-footprint-savings': 10,
        'ai-clinical-trial-efficiency': 10,
        'digital-health-partnership-revenue': 5,
        'procurement-savings': 10,
      },
      revenueImpact: 0,
      marginImpact: 0,
      confidence: 68,
      keyAssumptions: [
        'SMT ¥40B FY2026 target achieved — workstreams executing per plan',
        'R&D portfolio rationalization ¥12B savings without pipeline disruption',
        'Manufacturing efficiency ¥10B through yield improvement and centralization',
        'AI clinical tool adoption gradual but accelerating toward full deployment',
      ],
    },
    {
      id: 'smt-bear',
      name: 'SMT Execution Shortfall — ¥25B Delivered',
      description: 'SMT delayed by organizational change; savings ¥25B vs ¥40B target; margin misses guidance',
      leverSettings: {
        'smt-annual-savings': 25,
        'rd-portfolio-optimization': 5,
        'manufacturing-footprint-savings': 5,
        'ai-clinical-trial-efficiency': 3,
        'digital-health-partnership-revenue': 2,
        'procurement-savings': 6,
      },
      revenueImpact: 0,
      marginImpact: -115,
      confidence: 25,
      keyAssumptions: [
        'SMT savings only ¥25B — headcount reduction slower than planned due to labor relations',
        'R&D portfolio rationalization paused to preserve pipeline optionality amid POC readouts',
        'Manufacturing consolidation delayed by regulatory approval requirements in Japan',
        'Core OP margin ~26.8% — short of FY2026 guidance, requiring disclosure update',
      ],
    },
  ],
};
