// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/alerts.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26] [CITED:MR-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// Alert thresholds calibrated against Astellas Pharma Inc. disclosed
// performance bands and FY2026 guidance (Revenue ¥2,220B;
// Core OP ¥620B; Core OP margin ~27.9%; Core EPS ~¥265).
// ─────────────────────────────────────────────────────────────────────
import { AlertsConfig } from '../../types';

export const alerts: AlertsConfig = {
  templates: [
    // ═══════════════════════════════════════════
    // CORE EPS & GUIDANCE
    // ═══════════════════════════════════════════
    {
      id: 'eps-guidance-risk',
      title: 'Quarterly Core EPS Below ¥62 Run-Rate (FY2026 Guidance Floor Risk)',
      category: 'Core EPS & Guidance',
      threshold: 'Quarterly Core EPS < ¥62 (annualizes to <¥248, below FY2026 guidance floor)',
      parsedThreshold: 62,
      parsedUnit: '¥ quarterly Core EPS',
      severity: 'critical',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Falls below',
      description: 'Core EPS quarterly run-rate below ¥62 puts FY2026 guidance at risk. FY2025 Core EPS was ¥237.01; FY2026 target ~¥265 supported by Core OP guidance of ¥620B. Monitor XTANDI IRA negotiation outcomes, SMT savings delivery pace, and USD/JPY FX rate trajectory as primary EPS levers.',
      suggestedActions: [
        'Decompose by segment: US oncology XTANDI revenue trend vs IRA negotiation impact timeline',
        'SMT: verify ¥40B FY2026 savings target is on track — which workstreams are behind?',
        'FX sensitivity: assess USD/JPY impact on USD-denominated XTANDI and PADCEV revenues',
        'Review PADCEV competitive dynamics — any market share loss to new urothelial cancer entrants?',
        'Assess VYLOY launch execution — Q1-Q2 ramp vs peak sales model',
      ],
    },
    {
      id: 'eps-guidance-beat',
      title: 'Quarterly Core EPS Above ¥68 (FY2026 Guidance Ceiling Beat)',
      category: 'Core EPS & Guidance',
      threshold: 'Quarterly Core EPS > ¥68 (annualizes to >¥272, above FY2026 guidance ceiling)',
      parsedThreshold: 68,
      parsedUnit: '¥ quarterly Core EPS',
      severity: 'info',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Exceeds',
      description: 'Core EPS run-rate above ¥68 per quarter puts FY2026 above guidance ceiling. Prepare management communications on guidance raise. Confirm beat is driven by structural volume growth (XTANDI/PADCEV performance) vs one-time FX or SMT acceleration. Note pharmaceutical revenue seasonality — H2 typically stronger.',
      suggestedActions: [
        'Confirm beat is structural (product revenue growth, SMT delivery) vs one-time FX translation',
        'Assess whether XTANDI revenue trajectory warrants annual estimate revision',
        'Prepare guidance revision analysis for CFO Atsushi Kitamura review',
        'Check VYLOY and VEOZAH ramp — is Strategic Brands growth ahead of schedule?',
        'Prepare next earnings call messaging on upside drivers and pipeline catalysts',
      ],
    },

    // ═══════════════════════════════════════════
    // XTANDI REVENUE & IRA RISK
    // ═══════════════════════════════════════════
    {
      id: 'xtandi-revenue-miss',
      title: 'XTANDI Quarterly Revenue Below ¥220B (Below Run-Rate)',
      category: 'XTANDI Revenue & IRA Risk',
      threshold: 'Quarterly XTANDI revenue < ¥220B (implies FY below ¥880B vs ¥960.8B FY2025 baseline)',
      parsedThreshold: 220,
      parsedUnit: '¥B quarterly XTANDI revenue',
      severity: 'critical',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Falls below',
      description: 'XTANDI is Astellas\'s largest revenue contributor (¥960.8B FY2025, ~45% of total revenue). Revenue below ¥220B quarterly would signal IRA pricing impact, competitive share loss, or Pfizer co-promotion issues. Each ¥10B quarterly XTANDI revenue shortfall ≈ −¥7B Core OP (at ~70% incremental margin). IRA negotiations are the primary structural risk — final negotiated price effective January 2026.',
      suggestedActions: [
        'Assess IRA negotiated price vs prior manufacturer price — is impact within modeled range?',
        'Review Pfizer co-promotion arrangement — any changes in US commercial execution?',
        'Check prescription volume (TRx) trends vs revenue — any volume/price disconnect?',
        'Evaluate emerging competitive landscape in mCRPC, nmCRPC, and ECS indications',
        'Assess geographic mix shift — is Japan and EU volume offsetting any US weakness?',
      ],
    },
    {
      id: 'xtandi-ira-policy-update',
      title: 'IRA Drug Price Negotiation Policy Change Alert',
      category: 'XTANDI Revenue & IRA Risk',
      threshold: 'Any CMS/IRA policy announcement affecting XTANDI negotiated pricing or small molecule exclusion',
      parsedThreshold: 0,
      parsedUnit: 'policy event trigger',
      severity: 'critical',
      alertType: 'event',
      frequency: 'daily',
      conditionPrefix: 'Triggered by',
      description: 'The Inflation Reduction Act designated XTANDI for Medicare price negotiation effective January 2026. Any policy change, court ruling, or CMS guideline update affecting the negotiation process, timeline, or scope of small molecule drug inclusion is an immediate material event. XTANDI Medicare revenue represents ~40% of US sales. Monitor DOJ/court challenges to IRA drug negotiation provisions.',
      suggestedActions: [
        'Alert CFO Atsushi Kitamura and legal team immediately on any policy development',
        'Quantify revenue impact range: 20%–40% IRA discount on Medicare segment of XTANDI sales',
        'Review commercial segment (non-Medicare) XTANDI pricing strategy',
        'Assess implications for PADCEV and future pipeline drugs subject to IRA Small Molecule treatment',
        'Review investor communications and guidance update requirements',
      ],
    },

    // ═══════════════════════════════════════════
    // STRATEGIC BRANDS GROWTH
    // ═══════════════════════════════════════════
    {
      id: 'strategic-brands-growth-miss',
      title: 'Strategic Brands Quarterly Revenue Below ¥105B (Below Plan)',
      category: 'Strategic Brands Growth',
      threshold: 'Quarterly Strategic Brands (PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA) revenue < ¥105B',
      parsedThreshold: 105,
      parsedUnit: '¥B quarterly Strategic Brands revenue',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'Strategic Brands combined revenue was ¥480.3B FY2025 (+43% YoY), implying ~¥120B quarterly. Below ¥105B would represent material deceleration in the high-growth portfolio and endanger the long-term strategy of diversifying beyond XTANDI. Monitor PADCEV, IZERVAY, VYLOY, VEOZAH, and XOSPATA individually as each has distinct competitive dynamics.',
      suggestedActions: [
        'Identify which Strategic Brand is driving the shortfall',
        'PADCEV: assess competitive pressure from new urothelial cancer entrants',
        'IZERVAY: monitor US launch penetration and payer coverage decisions for geographic atrophy',
        'VYLOY: track physician adoption and formulary wins in gastric and gastroesophageal junction cancer',
        'VEOZAH: assess market share in vasomotor symptoms vs hormone therapy alternatives',
      ],
    },
    {
      id: 'fda-approval-opportunity',
      title: 'FDA or PMDA Regulatory Decision Milestone Alert',
      category: 'Strategic Brands Growth',
      threshold: 'Any FDA PDUFA date, PMDA approval, or label expansion for Astellas pipeline assets',
      parsedThreshold: 0,
      parsedUnit: 'regulatory event trigger',
      severity: 'info',
      alertType: 'event',
      frequency: 'daily',
      conditionPrefix: 'Triggered by',
      description: 'Regulatory approvals or label expansions are key value creation events for Astellas pipeline. Positive decisions for new indications of PADCEV, IZERVAY, or pipeline compounds drive immediate commercial opportunity. Negative CRL or non-approval events trigger immediate guidance review. Monitor PDUFA dates and PMDA review timelines actively.',
      suggestedActions: [
        'Notify CEO Naoki Okamura and CFO immediately on approval or rejection outcomes',
        'Update commercial launch readiness and revenue guidance for new indications',
        'Prepare investor messaging on label expansion significance and peak sales estimates',
        'Review pipeline NPV model — update POC readout schedule and probability-weighted revenue',
        'Assess manufacturing and supply chain readiness for new indication commercial launch',
      ],
    },

    // ═══════════════════════════════════════════
    // SMT SAVINGS DELIVERY
    // ═══════════════════════════════════════════
    {
      id: 'smt-savings-miss',
      title: 'SMT Savings Delivery Below ¥8B Quarterly Run-Rate (Below ¥40B Annual Target)',
      category: 'SMT Savings Delivery',
      threshold: 'Quarterly SMT savings recognition < ¥8B (annualizes to <¥32B, below ¥40B FY2026 target)',
      parsedThreshold: 8,
      parsedUnit: '¥B quarterly SMT savings',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'Sustainable Margin Transformation (SMT) targets ¥40B in savings by FY2026. SMT encompasses R&D portfolio optimization, SG&A efficiency, manufacturing footprint rationalization, and procurement. Quarterly run-rate below ¥8B would put the annual target at risk and delay Core OP margin expansion from 26.0% (FY2025) toward 27.9% (FY2026 guidance).',
      suggestedActions: [
        'Identify which SMT workstream is falling behind: R&D rationalization, SG&A reduction, manufacturing',
        'Review headcount reduction and organizational efficiency programs — actual vs committed',
        'Assess procurement savings realization vs committed vendor contracts',
        'Check R&D portfolio pruning decisions — any programs reinstated increasing spend vs plan',
        'Prepare SMT delivery bridge for CFO and Executive Committee review',
      ],
    },

    // ═══════════════════════════════════════════
    // FX & CAPITAL STRUCTURE
    // ═══════════════════════════════════════════
    {
      id: 'fx-rate-adverse',
      title: 'USD/JPY Below ¥145 (Adverse FX — Revenue Translation Headwind)',
      category: 'FX & Capital Structure',
      threshold: 'USD/JPY spot rate < ¥145 (meaningful JPY appreciation vs ¥151 planning assumption)',
      parsedThreshold: 145,
      parsedUnit: '¥/USD spot rate',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Falls below',
      description: 'Approximately 65–70% of Astellas revenue is USD-denominated (XTANDI, PADCEV, US Strategic Brands). Planning assumption: ~¥151/USD. Each ¥5 JPY appreciation ≈ −¥45–55B annual revenue translation and −¥18–22B Core OP. Below ¥145 would create ~¥100B+ annual revenue headwind vs FY2026 guidance, potentially requiring disclosure or guidance revision.',
      suggestedActions: [
        'Quantify FX sensitivity: revenue and Core OP impact at ¥145, ¥140, ¥135 scenarios',
        'Review FX hedging position — coverage ratio and weighted average hedge rate vs current spot',
        'Assess whether FY2026 guidance requires revision or FX assumption disclosure update',
        'Evaluate additional hedging capacity — tenor and instrument availability at current rates',
        'Monitor Bank of Japan policy decisions and US Fed rate differential narrowing',
      ],
    },
    {
      id: 'fx-rate-favorable',
      title: 'USD/JPY Above ¥160 (Favorable FX — Revenue Translation Tailwind)',
      category: 'FX & Capital Structure',
      threshold: 'USD/JPY spot rate > ¥160 (significant JPY depreciation above ¥151 planning assumption)',
      parsedThreshold: 160,
      parsedUnit: '¥/USD spot rate',
      severity: 'info',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Exceeds',
      description: 'USD/JPY above ¥160 creates a meaningful FX tailwind vs ¥151 planning assumption. Each ¥10 JPY depreciation ≈ +¥70–80B annual revenue and +¥28–32B Core OP. Prepares basis for positive FY2026 guidance revision. Monitor for political/regulatory sensitivity around sustained JPY weakness.',
      suggestedActions: [
        'Quantify FX tailwind vs ¥151 planning rate for investor disclosure and guidance update',
        'Assess whether positive FX warrants upward guidance revision to revenue and Core OP',
        'Review FX hedging costs — extending hedge book at ¥160+ locks in favorable rates',
        'Prepare sensitivity analysis: Core EPS and Core OP at ¥160, ¥165, ¥170 scenarios',
        'Communicate FX mechanics to investors proactively to anchor expectations',
      ],
    },
  ],

  reports: [
    {
      id: 'weekly-enterprise',
      name: 'Astellas Weekly Enterprise Pulse',
      schedule: 'weekly',
      recipients: ['CFO', 'Regional Presidents', 'Finance Leadership'],
      sections: [
        'Enterprise Core OP vs. run-rate (¥620B FY2026 guidance)',
        'XTANDI: revenue tracker vs. IRA negotiation timeline; US TRx trends',
        'Strategic Brands: PADCEV/IZERVAY/VYLOY/VEOZAH combined revenue vs. +43% growth benchmark',
        'SMT savings: quarterly delivery vs. ¥40B FY2026 target',
        'USD/JPY FX rate: impact vs. ¥151 planning assumption; hedging coverage ratio',
        'R&D pipeline: key POC readouts, FDA/PMDA regulatory interactions',
      ],
    },
    {
      id: 'monthly-segment',
      name: 'Regional Performance Monthly Package',
      schedule: 'monthly',
      recipients: ['CFO', 'Regional FP&A'],
      sections: [
        'United States: XTANDI/PADCEV/IZERVAY revenue bridge; IRA price impact tracking',
        'Established Markets: XTANDI ex-US; product lifecycle management; EU pricing environment',
        'Japan: product portfolio revenue; PMDA interactions; NHI reimbursement pricing',
        'International Markets & China: VBP dynamics; VYLOY gastric cancer launch execution',
        'Enterprise: Core EPS bridge vs. FY2026 guidance; SMT delivery; FX reconciliation',
      ],
    },
  ],
};
