// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/alerts.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// Alert thresholds calibrated against Astellas Pharma Inc. disclosed
// performance bands and FY2026 guidance (Core EPS ¥250+;
// Core OP ¥580B+; SMT savings ¥40B; FCF ¥400B+).
// ─────────────────────────────────────────────────────────────────────
import { AlertsConfig } from '../../types';

export const alerts: AlertsConfig = {
  templates: [
    // ═══════════════════════════════════════════
    // CORE EPS & GUIDANCE
    // ═══════════════════════════════════════════
    {
      id: 'eps-guidance-risk',
      title: 'Quarterly Core EPS Below ¥62 (Guidance Floor Risk)',
      category: 'EPS & Guidance',
      threshold: 'Quarterly Core EPS < ¥62 (annualizes to <¥248, below FY2026 guidance floor ¥250)',
      parsedThreshold: 62,
      parsedUnit: '¥ quarterly Core EPS',
      severity: 'critical',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Falls below',
      description: 'Core EPS quarterly run-rate below ¥62 puts FY2026 guidance floor of ¥250 at risk. Q1 FY2026 actual ¥67 — strong start provides cushion. Key monitoring: XTANDI IRA price negotiation (CMS negotiated price effective Sept 2026), Japan NHI biennial price revision impact, and FX USD/JPY movements (¥2.1B Core OP per ¥1 move). SMT savings pace is a critical offset lever.',
      suggestedActions: [
        'Decompose by segment: U.S. XTANDI IRA pricing vs volume growth',
        'Quantify Japan NHI revision impact vs volume-based mitigation',
        'Check FX — USD/JPY spot vs planning rate assumption',
        'Verify SMT FY2026 ¥40B savings are on track by quarter',
        'Assess PADCEV and VEOZAH revenue ramp vs plan',
      ],
    },
    {
      id: 'eps-guidance-beat',
      title: 'Quarterly Core EPS Above ¥65 (Guidance Ceiling Beat)',
      category: 'EPS & Guidance',
      threshold: 'Quarterly Core EPS > ¥65 (annualizes to >¥260, above FY2026 guidance ceiling)',
      parsedThreshold: 65,
      parsedUnit: '¥ quarterly Core EPS',
      severity: 'info',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Exceeds',
      description: 'Core EPS run-rate above ¥65/quarter puts FY2026 above ¥260 guidance ceiling. Prepare management communications on guidance raise. Assess whether beat is structural (PADCEV/VEOZAH revenue acceleration, SMT ahead of schedule) vs FX windfall or one-time items.',
      suggestedActions: [
        'Confirm beat is product-volume-driven (structural) vs FX timing (one-time)',
        'Assess whether PADCEV 1L uptake is ahead of launch curve expectations',
        'Prepare guidance revision analysis for CFO — raise range or narrow range?',
        'Check SMT savings — is ¥40B target likely to exceed?',
        'Prepare next earnings call messaging on upside product drivers',
      ],
    },

    // ═══════════════════════════════════════════
    // XTANDI — IRA PRICE NEGOTIATION
    // ═══════════════════════════════════════════
    {
      id: 'xtandi-ira-breach',
      title: 'XTANDI IRA Price Cut Exceeds 10pp (¥96B Annual Impact)',
      category: 'Oncology Portfolio',
      threshold: 'CMS negotiated price reduction for XTANDI > 10 percentage points vs gross price',
      parsedThreshold: 10,
      parsedUnit: '% IRA price cut',
      severity: 'critical',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Exceeds',
      description: 'XTANDI IRA price reduction >10pp creates >¥96B annual Core OP headwind (¥9.6B per 1pp). CMS first negotiation effective September 2026. Each additional point of reduction meaningfully impacts FY2026 and FY2027 guidance. Pfizer co-commercialization agreement means impact is shared but significant. Volume growth in non-Part D populations (commercial, VA) is key offset.',
      suggestedActions: [
        'Quantify exact CMS negotiated price and compute annual headwind (¥9.6B × pp cut)',
        'Model XTANDI non-Medicare volume growth to assess net revenue impact',
        'Review Pfizer co-commercialization agreement — how is price negotiation risk shared?',
        'Assess PADCEV/VEOZAH revenue acceleration needed to fully offset XTANDI headwind',
        'Prepare government affairs response and investor messaging framework',
      ],
    },
    {
      id: 'xtandi-volume-decline',
      title: 'XTANDI Quarterly Volume Below ¥140B (Market Share Loss Risk)',
      category: 'Oncology Portfolio',
      threshold: 'XTANDI quarterly revenue < ¥140B (implies market share loss vs IRA price alone)',
      parsedThreshold: 140,
      parsedUnit: '¥B quarterly XTANDI revenue',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'XTANDI quarterly revenue below ¥140B would indicate market share erosion beyond the IRA price effect alone. Key watch: J&J darolutamide (Nubeqa) and niraparib competition in nmCRPC/mCSPC. Apalutamide (Erleada, J&J) gaining label expansions. XTANDI Q1 FY2026: ¥146.5B. Volume decline signal requires competitive response assessment.',
      suggestedActions: [
        'Decompose: IRA price effect vs volume — is Rx count declining?',
        'Check XTANDI new patient starts vs switches (Nubeqa, Erleada)',
        'Review SPS (specialty pharmacy) channel performance by indication (mCSPC, nmCRPC, mCRPC)',
        'Assess Pfizer co-promotion effort level and commercial investment',
        'Evaluate label expansion opportunities: earlier lines of therapy or new indications',
      ],
    },

    // ═══════════════════════════════════════════
    // PADCEV — BLADDER CANCER GROWTH
    // ═══════════════════════════════════════════
    {
      id: 'padcev-below-plan',
      title: 'PADCEV Quarterly Revenue Below ¥58B (Below ¥232B Annual Run-Rate)',
      category: 'Oncology Portfolio',
      threshold: 'PADCEV quarterly revenue < ¥58B (annualizes to <¥232B, below FY2025 base)',
      parsedThreshold: 58,
      parsedUnit: '¥B quarterly PADCEV revenue',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'PADCEV below ¥58B quarterly would signal deceleration of the primary growth driver. Q1 FY2026: ¥65.2B. Key risk: BMS nivolumab+cabozantinib and other combinations competing in 1L bladder cancer. Astellas-Pfizer PADCEV+pembro (KEYNOTE-869) must defend 1L standard of care position in HER2+ and negative MIBC/mUBC patients.',
      suggestedActions: [
        'Check PADCEV market share in 1L urothelial carcinoma vs competitor combination regimens',
        'Review patient access and payer coverage for PADCEV+pembro combination',
        'Assess PADCEV global expansion: EU reimbursement country-by-country status',
        'Verify KEYNOTE-869 data vs competing trials (CheckMate, IMvigor)',
        'Review Pfizer commercial co-promotion alignment in key urology accounts',
      ],
    },
    {
      id: 'padcev-acceleration',
      title: 'PADCEV Quarterly Revenue Above ¥72B (Tracking Above Plan)',
      category: 'Oncology Portfolio',
      threshold: 'PADCEV quarterly revenue > ¥72B (annualizes to >¥288B, above FY2026 guidance)',
      parsedThreshold: 72,
      parsedUnit: '¥B quarterly PADCEV revenue',
      severity: 'info',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Exceeds',
      description: 'PADCEV above ¥72B quarterly signals strong execution beyond plan. Consider guidance raise for PADCEV and enterprise Core EPS. Assess whether 1L uptake is faster than modeled — may indicate earlier physician adoption than planned launch curve assumed.',
      suggestedActions: [
        'Confirm that PADCEV outperformance is from 1L market share (structural) vs destocking/timing',
        'Prepare upside scenario modeling for FY2026 and FY2027 PADCEV forecasts',
        'Review gross-to-net assumptions — is payer coverage improving faster than plan?',
        'Assess capacity to support incremental supply volume demand',
        'Prepare investor messaging on PADCEV as a long-duration growth asset',
      ],
    },

    // ═══════════════════════════════════════════
    // FX — USD/JPY SENSITIVITY
    // ═══════════════════════════════════════════
    {
      id: 'fx-adverse-move',
      title: 'USD/JPY Below ¥148 (Significant FX Headwind vs Plan Rate)',
      category: 'FX & Treasury',
      threshold: 'USD/JPY spot rate < ¥148 (significant JPY appreciation vs planning rate ~¥155)',
      parsedThreshold: 148,
      parsedUnit: '¥ per USD (USD/JPY)',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'daily',
      conditionPrefix: 'Falls below',
      description: 'USD/JPY below ¥148 represents ~¥7 appreciation vs planning rate of ~¥155. FX sensitivity: ¥2.1B Core OP per ¥1 move → ~¥14.7B negative impact vs plan. ~70% of revenues are USD/EUR-denominated. Natural hedge through USD procurement and manufacturing. Below ¥148 triggers formal hedge review and guidance risk assessment.',
      suggestedActions: [
        'Compute FX impact: (planning rate − spot) × ¥2.1B Core OP sensitivity',
        'Review hedging book — what tenor and coverage ratio is in place?',
        'Assess whether guidance needs to be revised for FX assumption change',
        'Check USD/EUR mix in revenues vs natural hedge ratio',
        'Prepare FX sensitivity slide for Board and management reporting',
      ],
    },

    // ═══════════════════════════════════════════
    // JAPAN — NHI PRICE REVISION
    // ═══════════════════════════════════════════
    {
      id: 'japan-revenue-decline',
      title: 'Japan Segment Quarterly Revenue Below ¥82B (Below NHI Revision Plan)',
      category: 'Japan Segment',
      threshold: 'Japan quarterly revenue < ¥82B (below ¥328B annual run-rate, below plan)',
      parsedThreshold: 82,
      parsedUnit: '¥B quarterly Japan revenue',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'Japan revenue below ¥82B quarterly would indicate worse-than-planned NHI price revision impact and/or volume erosion. April 2026 NHI revision: average −3.5%. Q1 FY2026: ¥86.5B. Monitoring: XTANDI new indication volume growth, Prograf generic competition, and VEOZAH Japan NDA approval timeline.',
      suggestedActions: [
        'Decompose Japan decline: NHI price effect vs volume vs product mix',
        'Check XTANDI Japan new patient starts in mCSPC/nmCRPC indications',
        'Assess generic entry risk for transplantation products (Prograf, Astagraf)',
        'Review VEOZAH Japan NDA approval timeline — reimbursement pricing expectation',
        'Evaluate Japan-specific commercial investment ROI vs declining revenue base',
      ],
    },

    // ═══════════════════════════════════════════
    // SMT — SAVINGS PROGRAM
    // ═══════════════════════════════════════════
    {
      id: 'smt-savings-shortfall',
      title: 'SMT YTD Savings Below ¥8B (Q1 FY2026 Below ¥10B Run-Rate)',
      category: 'SMT & Cost Transformation',
      threshold: 'SMT YTD savings < ¥8B in Q1 FY2026 (below ¥10B quarterly run-rate for ¥40B full-year)',
      parsedThreshold: 8,
      parsedUnit: '¥B YTD SMT savings',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'SMT FY2026 target ¥40B in-year savings (cumulative ¥65B). Q1 below ¥8B suggests shortfall vs ¥10B quarterly run-rate. Key workstreams: procurement savings, manufacturing footprint, commercial SG&A efficiency, G&A reduction. FY2025: ¥21B achieved on target. SMT savings are primary Core OP margin expansion lever.',
      suggestedActions: [
        'Identify which SMT workstream is behind plan: procurement, manufacturing, SG&A, or G&A',
        'Assess phasing — is shortfall timing (H2-weighted) or structural underperformance?',
        'Review procurement savings: API and CMO contract renegotiations',
        'Check SG&A efficiency: commercial cost per call vs plan',
        'Escalate to SMT steering committee if shortfall exceeds ¥3B in-quarter',
      ],
    },

    // ═══════════════════════════════════════════
    // CAPITAL STRUCTURE & DIVIDENDS
    // ═══════════════════════════════════════════
    {
      id: 'fcf-shortfall',
      title: 'YTD Free Cash Flow Below ¥90B (Q1 FY2026 Below Guidance Run-Rate)',
      category: 'Treasury & Capital Allocation',
      threshold: 'YTD FCF < ¥90B in Q1 FY2026 (below ¥98.5B Q1 FY2026 actual baseline)',
      parsedThreshold: 90,
      parsedUnit: '¥B YTD FCF',
      severity: 'warning',
      alertType: 'threshold',
      frequency: 'weekly',
      conditionPrefix: 'Falls below',
      description: 'FCF below ¥90B would be below Q1 FY2026 levels and puts FY2026 ¥400B+ guidance at risk. FCF supports dividend (¥70/share annual), share buyback capacity, and BD/licensing investment. Monitor: working capital changes, capex discipline, tax payment timing.',
      suggestedActions: [
        'Decompose FCF vs Q1 FY2026: Core OP, working capital, capex, taxes paid',
        'Check receivables collection — any distributor payment delays?',
        'Verify capex discipline — any unplanned manufacturing investment?',
        'Assess dividend coverage ratio vs ¥17.5/share quarterly run-rate',
        'Review BD pipeline — any upfront licensing payments compressing FCF?',
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
        'Enterprise Core OP vs. ¥580B FY2026 guidance run-rate',
        'XTANDI: IRA pricing tracker; volume by market and indication',
        'PADCEV: 1L bladder cancer market share; EU reimbursement progress',
        'VEOZAH: U.S. prescriptions and payer coverage expansion',
        'SMT savings: YTD vs ¥40B FY2026 target by workstream',
        'FX: USD/JPY spot vs planning rate (¥2.1B/¥1 sensitivity)',
        'Japan: NHI post-revision revenue tracker vs plan',
      ],
    },
    {
      id: 'monthly-segment',
      name: 'Segment Performance Monthly Package',
      schedule: 'monthly',
      recipients: ['CFO', 'Regional FP&A'],
      sections: [
        'United States: XTANDI IRA bridge, PADCEV launch KPIs, VEOZAH coverage rate',
        'Japan: NHI revision waterfall, transplantation franchise, VEOZAH NDA timeline',
        'Established Markets: PADCEV EU reimbursement, XTANDI share by country',
        'International Markets & China: XTANDI NRDL volume, access programs',
        'Enterprise: Core EPS bridge vs FY2026 guidance, FCF reconciliation, SMT scorecard',
      ],
    },
  ],
};
