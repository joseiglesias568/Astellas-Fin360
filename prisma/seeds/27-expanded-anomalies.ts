import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 27: Expanded Anomaly Detections — Astellas Pharma Inc. (OTC: ALPMY)
// ~25 anomalies covering financial, operational, pipeline, and strategic
// dimensions across FY25 and Q1 FY26.
//
// Severity: 'info' = noteworthy | 'warning' = below benchmark | 'critical' = risk
// Direction: 'above_expected' | 'below_expected'
// Status: 'new' | 'acknowledged' | 'resolved' | 'false-positive'
// =============================================================================

export async function seedExpandedAnomalies(prisma: PrismaClient, companyId: number) {
  console.log('  Seeding expanded anomaly detections (Astellas Pharma Inc.)...');

  const anomalies = [
    // ─────────────────────────────────────────────────────────────────────────
    // Q1 FY26 (Apr–Jun 2026) — KEY BEATS AND MISSES
    // ─────────────────────────────────────────────────────────────────────────
    {
      metricName: 'Q1 FY26 Core EPS ¥58.50 — Beat ¥55.20 Consensus by ¥3.30 (+6.0%)',
      detectedAt: '2026-08-01T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 55.20,
      actualValue: 58.50,
      deviationPct: 6.0,
      explanation:
        'Astellas Pharma Q1 FY26 Core EPS of ¥58.50 beat the ¥55.20 Street consensus by ¥3.30 (+6.0%), driven by stronger-than-expected VEOZAH prescription uptake in the US (+28% above plan), ahead-of-schedule SMT savings delivery (¥10.8B annualised vs. ¥10.0B plan), and a favourable USD/JPY rate of ¥153 vs. the ¥151 planning assumption adding approximately ¥1.2B to Core OP. Revenue of ¥560.0B was broadly in line with consensus, but Core OP margin of 25.4% beat the 24.8% model. Management maintained FY26 Core EPS guidance of ¥248–¥255, citing IRA price negotiation uncertainty as the key variable for H2. Status: acknowledged.',
      status: 'acknowledged',
      relatedDrivers: ['Core EPS', 'Core OP Margin', 'VEOZAH Revenue', 'SMT Savings', 'USD/JPY Rate'],
    },
    {
      metricName: 'VEOZAH US Prescription Volume Q1 FY26 — +28% Above Internal Plan; Women\'s Health Momentum',
      detectedAt: '2026-08-01T07:15:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 22.0,
      actualValue: 28.0,
      deviationPct: 27.3,
      explanation:
        'VEOZAH (fezolinetant) US prescription volume in Q1 FY26 grew 28% above the internal plan, reflecting three drivers: (1) a formulary access milestone — 62% of commercially-insured women now have Tier 2 or better VEOZAH coverage, up from 44% at Q4 FY25 end; (2) DTC advertising investment conversion rate above model, generating new patient starts at a cost-per-start approximately 15% below target; and (3) market research confirming VEOZAH\'s non-hormonal mechanism is capturing patients who cannot use or prefer to avoid HRT. VEOZAH revenue reached ¥23.8B in Q1 FY26, ahead of the ¥20.6B forecast, representing a ¥50B+ full-year annualised run rate. Management indicated payer coverage expansion to 70%+ by Q3 FY26 as a catalyst for continued above-trend growth.',
      status: 'acknowledged',
      relatedDrivers: ['VEOZAH Revenue', 'Strategic Brands Revenue', 'Payer Coverage Rate'],
    },
    {
      metricName: 'SMT Savings Q1 FY26 — ¥10.8B Annualised vs ¥10.0B Plan; Phase 2 Ahead of Schedule',
      detectedAt: '2026-08-01T07:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 10.0,
      actualValue: 10.8,
      deviationPct: 8.0,
      explanation:
        'Astellas SMT (Sustainable Margin Transformation) achieved ¥10.8B in annualised run-rate savings at Q1 FY26 — ¥0.8B ahead of the ¥10.0B quarterly plan, cumulative progress toward the ¥40B FY26 target and ¥65B total programme target. The outperformance reflects Phase 2 procurement renegotiations completing one quarter ahead of schedule (API supply chain consolidation, CMO rate agreements) and headcount reductions tracking 12% above the FY26 phased plan. SG&A ratio fell to 39.8% of Core Revenue in Q1 FY26, the lowest quarterly reading since FY22. Management confirmed Phase 3 (IT infrastructure rationalisation) is on schedule to contribute ¥8–¥9B of incremental savings in FY27.',
      status: 'acknowledged',
      relatedDrivers: ['SMT Savings', 'SG&A Ratio', 'Core OP Margin'],
    },
    {
      metricName: 'XTANDI Q1 FY26 US Volume — Below Plan by 3.2%; IRA Awareness Affecting New Patient Starts',
      detectedAt: '2026-08-01T07:45:00Z',
      severity: 'warning',
      direction: 'below_expected',
      expectedValue: 250.0,
      actualValue: 242.0,
      deviationPct: -3.2,
      explanation:
        'XTANDI (enzalutamide) US prescription volume in Q1 FY26 was 3.2% below plan, as IRA Maximum Fair Price negotiation awareness began to influence prescriber behaviour — some oncologists are initiating ERLEADA (apalutamide) or darolutamide ahead of XTANDI\'s anticipated 2026 price reduction. Market share in the mCRPC ARSi market declined modestly from 48.2% to 46.9%. Astellas and Pfizer commercial teams have accelerated "real-world evidence" engagement programmes to reinforce XTANDI\'s clinical differentiation and reassure oncologists that the IRA-negotiated price will not affect reimbursement for existing patients. Revenue impact in Q1 FY26: approximately -¥3.5B vs. plan. If trend continues for the full year, the impact would be approximately -¥14B on XTANDI US revenue — partially offset by mix shift toward the higher-margin non-US markets.',
      status: 'open',
      relatedDrivers: ['XTANDI Revenue', 'XTANDI US Market Share', 'IRA Maximum Fair Price'],
    },
    {
      metricName: 'USD/JPY Q1 FY26 — ¥153 vs ¥151 Baseline; +¥1.2B Core OP Tailwind',
      detectedAt: '2026-08-01T08:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 151.0,
      actualValue: 153.0,
      deviationPct: 1.3,
      explanation:
        'USD/JPY averaged ¥153 in Q1 FY26, ¥2 stronger than the ¥151 FY26 planning assumption. Astellas generates approximately 56% of revenues outside Japan, with USD the largest transactional currency — each ¥1 move in USD/JPY drives approximately +¥2.1B in Core OP on a full-year basis (approximately +¥0.5B per quarter). The Q1 FY26 ¥2 favourable deviation contributed approximately +¥1.2B to Core OP vs. plan. The FX tailwind was partially expected (currency market consensus for H1 FY26 was ¥152–¥154), and does not change the FY26 Core OP guidance which already reflects the ¥151 baseline. If USD/JPY sustains ¥153+ through FY26, the full-year FX tailwind vs. plan would be approximately +¥4.2B Core OP. Hedging coverage of 30–33% reduces but does not eliminate FX sensitivity.',
      status: 'resolved',
      relatedDrivers: ['USD/JPY Rate', 'Core OP', 'FX Translation Impact'],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Q4 FY25 (Jan–Mar 2026) — FULL-YEAR CLOSE ANOMALIES
    // ─────────────────────────────────────────────────────────────────────────
    {
      metricName: 'FY25 Core EPS ¥237.01 — Beat ¥230 Consensus by ¥7.01 (+3.0%); Largest Beat in 5 Years',
      detectedAt: '2026-05-12T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 230.0,
      actualValue: 237.01,
      deviationPct: 3.0,
      explanation:
        'Astellas Pharma FY25 Core EPS of ¥237.01 beat the ¥230 sell-side consensus by ¥7.01 (+3.0%) — the largest EPS beat relative to consensus in five years. The outperformance was driven by four factors: SMT savings exceeding plan by ¥3B (¥21B actual vs. ¥18B prior guidance), VEOZAH achieving ¥87.3B revenue vs. ¥72B plan, a favourable FX impact from Q3 JPY weakness (¥148–¥150 avg), and lower-than-expected Phase 3 costs (two trials enrolled faster than planned, reducing period costs). EPS grew 49.8% YoY from ¥158.24 in FY24, primarily driven by SMT cost optimisation (prior restructuring charge normalisation) and Strategic Brands launch momentum. Management guided FY26 Core EPS to ¥248–¥255.',
      status: 'resolved',
      relatedDrivers: ['Core EPS', 'Core OP Margin', 'SMT Savings', 'VEOZAH Revenue'],
    },
    {
      metricName: 'Q4 FY25 Core OP Margin 21.2% — Below 23.5% Plan; Japan NHI Q4 Pricing Impact',
      detectedAt: '2026-05-12T07:15:00Z',
      severity: 'warning',
      direction: 'below_expected',
      expectedValue: 23.5,
      actualValue: 21.2,
      deviationPct: -9.8,
      explanation:
        'Q4 FY25 (Jan–Mar 2026) Core OP margin of 21.2% was 230bps below the 23.5% internal plan, primarily due to: (1) Japan NHI biennial price revision effective April 2025 — the official announcement was made in Q4 FY25, requiring Astellas to accrue an estimated ¥6.8B impact on its Japan-region products at the Q4 balance sheet date even though the revision takes effect Q1 FY26; (2) Q4 Selling & Marketing costs elevated by the VYLOY global launch push (¥2.1B above Q4 plan); and (3) R&D expense ¥1.8B above plan due to two Phase 3 studies advancing faster than modelled (positive scientific milestone but negative Q4 cost timing). Full-year Core OP margin of 26.0% was in line with guidance despite the Q4 shortfall. The Q4 seasonality is structural — Astellas historically runs lower margins in Q4 due to Japan NHI cycle accruals and launch investment timing.',
      status: 'acknowledged',
      relatedDrivers: ['Core OP Margin', 'Japan NHI Revenue Impact', 'R&D Expense', 'VYLOY Revenue'],
    },
    {
      metricName: 'Strategic Brands FY25 ¥480.3B — +43% YoY; Exceeded ¥440B Annual Target',
      detectedAt: '2026-05-12T07:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 440.0,
      actualValue: 480.3,
      deviationPct: 9.2,
      explanation:
        'Strategic Brands (PADCEV + VEOZAH + IZERVAY + VYLOY + other launches) combined revenue of ¥480.3B in FY25 exceeded the ¥440B annual plan by ¥40.3B (+9.2%) and grew +43% year-over-year. PADCEV was the dominant contributor: ¥221.2B (+34.8% YoY) as first-line EV-cisplatin approval for urothelial carcinoma expanded the addressable market significantly. VEOZAH surprised to the upside at ¥87.3B vs. ¥72B plan (+21%), reflecting faster payer formulary access than modelled. IZERVAY reached ¥52.1B in its first full year of commercial availability (geographic atrophy). VYLOY delivered ¥59.7B in launch year revenue across Japan and select ex-Japan markets. The Strategic Brands portfolio grew from 18% to 22% of total Astellas revenue, accelerating the strategic portfolio shift away from XTANDI dependency.',
      status: 'resolved',
      relatedDrivers: ['Strategic Brands Revenue', 'PADCEV Revenue', 'VEOZAH Revenue', 'IZERVAY Revenue'],
    },
    {
      metricName: 'XTANDI IRA Maximum Fair Price Announcement — ¥9.6B per 1pp Sensitivity Confirmed',
      detectedAt: '2025-08-15T06:00:00Z',
      severity: 'critical',
      direction: 'below_expected',
      expectedValue: 0.0,
      actualValue: 1.0,
      deviationPct: 100.0,
      explanation:
        'CMS released the Maximum Fair Price (MFP) for enzalutamide (XTANDI) effective January 1, 2026 under the Inflation Reduction Act Medicare Drug Price Negotiation Programme. The negotiated MFP represents a significant reduction from WAC. Astellas and co-promotion partner Pfizer have disclosed a sensitivity of approximately ¥9.6B in annual Core OP impact per 1 percentage point of net price reduction vs. the FY25 baseline. The MFP negotiation outcome is classified as critical given XTANDI represents approximately 45% of FY25 Core Revenue (¥960.8B of ¥2,139.2B). While the MFP only applies directly to Medicare Part D claims (approximately 28–32% of XTANDI US volume), commercial payer reference pricing effects create additional downside risk. Astellas management has modelled a range of outcomes and confirmed the FY26 and FY27 guidance ranges already incorporate the disclosed MFP impact. The XTANDI IRA Risk Management strategic pillar and SMT programme are the primary financial offsets.',
      status: 'acknowledged',
      relatedDrivers: ['XTANDI Revenue', 'IRA Maximum Fair Price', 'Core EPS', 'Core OP'],
    },
    {
      metricName: 'China Revenue Q4 FY25 +29.6% YoY — Above 20% Plan; VYLOY NRDL Listing Accelerating',
      detectedAt: '2026-05-12T07:45:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 20.0,
      actualValue: 29.6,
      deviationPct: 48.0,
      explanation:
        'Astellas China revenue grew +29.6% YoY in Q4 FY25, 9.6 percentage points above the 20% annual plan, driving full-year China revenue to ¥101.5B (+29.6% FY25). The above-plan performance was primarily driven by VYLOY\'s inclusion in the National Reimbursement Drug List (NRDL) in January 2026, which came into effect in Q4 FY25 and triggered a significant prescription volume ramp. NRDL listing typically delivers a 3–5x volume uplift in China within 12–18 months. Additionally, PADCEV received National Medical Products Administration (NMPA) approval for urothelial carcinoma in December 2025, creating a new revenue stream. Management has increased the China FY26 growth target to ¥140–¥150B, implying +38–+48% growth driven by VYLOY NRDL ramp and PADCEV launch year.',
      status: 'resolved',
      relatedDrivers: ['China Revenue', 'VYLOY Revenue', 'PADCEV Revenue', 'NRDL Listing'],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Q3 FY25 (Oct–Dec 2025)
    // ─────────────────────────────────────────────────────────────────────────
    {
      metricName: 'Q3 FY25 Core OP Margin 32.8% — Structural High; Year-End Revenue Phasing and SMT Acceleration',
      detectedAt: '2026-02-10T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 27.5,
      actualValue: 32.8,
      deviationPct: 19.3,
      explanation:
        'Q3 FY25 Core OP margin of 32.8% was 530bps above the 27.5% internal plan — the highest quarterly margin in five years. The spike reflects three concurrent favourable factors: (1) royalty income from Pfizer XTANDI co-promotion agreement: a contractual milestone payment of approximately ¥8.5B was recognised in Q3 FY25 following a US market exclusivity extension confirmation; (2) SMT savings acceleration — Phase 1 procurement savings front-loaded to Q3, contributing approximately ¥5.2B of recognised savings vs. the ¥4.0B quarterly plan; and (3) R&D spend below plan as two Phase 3 trial enrolments were completed in Q2 rather than Q3, reducing Q3 period charges by approximately ¥3.1B. The 32.8% Q3 margin is not indicative of a sustained run-rate — Q4 FY25 core margin normalised to 21.2% as Japan NHI accruals and launch investment timing reversed the Q3 tailwinds. Full-year Core OP margin of 26.0% is the relevant benchmark.',
      status: 'acknowledged',
      relatedDrivers: ['Core OP Margin', 'SMT Savings', 'R&D Expense', 'Royalty Income'],
    },
    {
      metricName: 'PADCEV Phase 3 EV-302 Data — Confirms First-Line Standard of Care; ¥45B+ Upside to FY26',
      detectedAt: '2025-10-20T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 0.0,
      actualValue: 1.0,
      deviationPct: 100.0,
      explanation:
        'Astellas and Pfizer presented updated EV-302 Phase 3 data at ESMO 2025 confirming PADCEV (enfortumab vedotin) + pembrolizumab as the first-line standard of care for locally advanced or metastatic urothelial carcinoma (la/mUC). The data showed a median overall survival benefit vs. platinum-based chemotherapy not yet reached at data cutoff, with hazard ratio of 0.55. The clinical data supports continued formulary preference across major US payers and further international regulatory submissions. Revenue implication: first-line mUC is a significantly larger patient population than the second-line setting where PADCEV initially launched. Analyst consensus lifted PADCEV FY26 revenue estimates by ¥40–50B following the ESMO presentation, contributing to the positive earnings revisions that drove ALPMY ADR appreciation in October–November 2025. Management raised PADCEV guidance to ¥265–¥285B for FY26.',
      status: 'resolved',
      relatedDrivers: ['PADCEV Revenue', 'Strategic Brands Revenue', 'R&D Pipeline Value'],
    },
    {
      metricName: 'Japan Revenue Q3 FY25 — ¥73.1B, Slightly Above Plan; NHI Pre-Revision Stocking Effect',
      detectedAt: '2026-02-10T07:15:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 71.5,
      actualValue: 73.1,
      deviationPct: 2.2,
      explanation:
        'Japan segment revenue of ¥73.1B in Q3 FY25 was ¥1.6B above plan, primarily reflecting a pre-NHI revision inventory build by hospital and distribution channel partners ahead of the April 2025 price revision. Japanese wholesalers and hospital pharmacies typically build 3–6 weeks of inventory prior to a biennial NHI price revision, creating a Q3 revenue pull-forward. The stocking effect adds approximately ¥1.5–2.0B to Q3 revenue and will create a corresponding headwind in Q1 FY26 as channel inventory normalises. The underlying Japan prescription demand trend is broadly stable, with XTANDI maintaining strong market share in metastatic prostate cancer and VYLOY beginning its hospital formulary listing phase. Japan NHI revision effective April 2025 resulted in a -6.2% average price reduction on Astellas\'s Japan portfolio — the low end of the -5% to -8% guidance range provided at Q2 earnings.',
      status: 'resolved',
      relatedDrivers: ['Japan Revenue', 'XTANDI Revenue', 'Japan NHI Revenue Impact'],
    },
    {
      metricName: 'Free Cash Flow FY25 ¥520.8B — Above ¥498B Plan; Working Capital Improvement',
      detectedAt: '2026-05-12T08:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 498.0,
      actualValue: 520.8,
      deviationPct: 4.6,
      explanation:
        'Astellas Pharma free cash flow (operating cash flow minus capex) of ¥520.8B in FY25 exceeded the ¥498B internal plan by ¥22.8B (+4.6%). The outperformance reflects: (1) receivables collection — US managed care rebate receivables collected ¥8.5B faster than the contractual schedule following improved payer reconciliation processes; (2) SMT programme — headcount reduction delivered approximately ¥5.2B of personnel cost cash savings ahead of the planned recognition timing; and (3) capital expenditure ¥9.1B below plan as the Yamaguchi manufacturing expansion project was phased over two years rather than one. Operating cash flow of ¥560.2B supported the ¥78/share full-year dividend (¥139.7B total payout) and a ¥50B share repurchase programme announced in March 2026. Net cash position improved to +¥82B (net cash, not net debt) at FY25 year-end.',
      status: 'resolved',
      relatedDrivers: ['Operating Cash Flow', 'Core EPS', 'Net Cash Position'],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Q2 FY25 (Jul–Sep 2025)
    // ─────────────────────────────────────────────────────────────────────────
    {
      metricName: 'Q2 FY25 Core EPS ¥59.14 — Beat ¥56.50 Consensus; VEOZAH Payer Coverage Milestone',
      detectedAt: '2025-11-05T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 56.50,
      actualValue: 59.14,
      deviationPct: 4.7,
      explanation:
        'Q2 FY25 Core EPS of ¥59.14 beat the ¥56.50 consensus by ¥2.64 (+4.7%). VEOZAH exceeded Q2 revenue plan by ¥4.2B as the number of commercially insured women with Tier 2 or better formulary coverage crossed 50% — a key prescriber inflection threshold. SMT contributed ¥5.1B in Q2 savings vs. ¥4.8B plan. USD/JPY was broadly in line at ¥151.3. The Q2 EPS beat drove a modest positive earnings revision by sell-side analysts; full-year FY25 Core EPS consensus moved from ¥228 to ¥232 following the Q2 print.',
      status: 'resolved',
      relatedDrivers: ['Core EPS', 'VEOZAH Revenue', 'SMT Savings'],
    },
    {
      metricName: 'IZERVAY Q2 FY25 — ¥13.8B Revenue vs ¥12.0B Plan; Retinal Specialist Uptake Accelerating',
      detectedAt: '2025-11-05T07:15:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 12.0,
      actualValue: 13.8,
      deviationPct: 15.0,
      explanation:
        'IZERVAY (avacincaptad pegol) achieved ¥13.8B in Q2 FY25 revenue — ¥1.8B (+15%) above plan — as the complement C9 inhibitor mechanism gained traction among retinal specialists managing geographic atrophy (GA) patients with a GA growth rate above the median. IZERVAY competes with Apellis\'s Syfovre (pegcetacoplan) in the GA market; real-world data supporting monthly vs. bimonthly dosing preferences has benefited IZERVAY in practices that prefer less frequent injection schedules. IZERVAY payer coverage reached 68% of commercially insured patients in Q2 FY25, ahead of the 62% plan. The annualised revenue run-rate of ¥55.2B from Q2 supports the full-year ¥52.1B actual (reflecting a Q1 FY25 launch ramp that was below Q2 pace).',
      status: 'resolved',
      relatedDrivers: ['IZERVAY Revenue', 'Strategic Brands Revenue', 'Payer Coverage Rate'],
    },
    {
      metricName: 'R&D POC Programme — 2 of 3 Phase 3 POC Successes Achieved by Q2 FY25',
      detectedAt: '2025-11-05T07:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 1.0,
      actualValue: 2.0,
      deviationPct: 100.0,
      explanation:
        'By end of Q2 FY25, Astellas achieved 2 of the 3 targeted FY25 Phase 3 proof-of-concept milestones: (1) ASP3550 (ASC4FIRST Phase 3 completion — FGFR inhibitor for mUC) positive data presented at ASCO June 2025, and (2) selumetinib collaboration data reaching protocol-specified interim success criteria in a rare tumour indication (Q2 FY25 data cut). A third POC milestone (ASP7927, a novel oncology mechanism) reached protocol interim analysis with results expected in Q3 FY25. The above-plan POC delivery supports Astellas\'s pipeline value creation strategic pillar and adds optionality to the FY27–FY29 revenue pipeline. Each Phase 3 POC success in Astellas\'s model is associated with approximately ¥150–¥300B in potential peak sales NPV if the molecule achieves approval and launch.',
      status: 'resolved',
      relatedDrivers: ['R&D Pipeline Value', 'Phase 3 POC Count', 'R&D Expense'],
    },
    {
      metricName: 'Established Markets Revenue Q2 FY25 — ¥141.2B vs ¥143.0B Plan; European Generic Entry',
      detectedAt: '2025-11-05T07:45:00Z',
      severity: 'warning',
      direction: 'below_expected',
      expectedValue: 143.0,
      actualValue: 141.2,
      deviationPct: -1.3,
      explanation:
        'Established Markets segment revenue of ¥141.2B in Q2 FY25 was ¥1.8B (-1.3%) below plan, driven by two country-level headwinds: (1) Germany — generic entry for astellas\'s mature oncology product in the androgen deprivation therapy category resulted in a volume decline of approximately 15% in Q2 vs. a 10% plan; and (2) Italy — a regulatory delay in the PADCEV EMA label extension for first-line mUC (ultimately received Q3 FY25) pushed approximately ¥0.9B of expected Q2 revenue into Q3. The Japan-equivalent NHI-type pricing mechanisms in France and Germany contributed an additional -¥0.4B vs. plan from reference price adjustments. PADCEV growth in Established Markets (+28% YoY actual) and VEOZAH European launch (Germany, UK, Sweden) partially offset the headwinds. Full-year Established Markets revenue guidance maintained at ¥560–¥575B.',
      status: 'acknowledged',
      relatedDrivers: ['Established Markets Revenue', 'PADCEV Revenue', 'VEOZAH Revenue'],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Q1 FY25 (Apr–Jun 2025) — LAUNCH QUARTER ANOMALIES
    // ─────────────────────────────────────────────────────────────────────────
    {
      metricName: 'Q1 FY25 Core EPS ¥54.88 — Below ¥56.00 Consensus; Launch Investment Drag',
      detectedAt: '2025-08-05T07:00:00Z',
      severity: 'warning',
      direction: 'below_expected',
      expectedValue: 56.0,
      actualValue: 54.88,
      deviationPct: -2.0,
      explanation:
        'Q1 FY25 Core EPS of ¥54.88 missed the ¥56.00 consensus by ¥1.12 (-2.0%). The miss reflected front-loaded selling and marketing expense for the VYLOY and IZERVAY global launches (combined ¥8.5B above Q1 plan), partially offset by PADCEV outperformance (+¥3.2B above Q1 plan). The Q1 Core OP margin of 24.3% was 220bps below the 26.5% consensus as launch investment costs flowed through the P&L ahead of the revenue ramp. Management reiterated full-year FY25 Core EPS guidance of ¥225–¥235, framing Q1 as the investment quarter for the launch wave. The miss was understood by investors as consistent with the guided investment cadence; ALPMY ADR traded flat on the Q1 earnings announcement.',
      status: 'acknowledged',
      relatedDrivers: ['Core EPS', 'SG&A Expense', 'VYLOY Revenue', 'IZERVAY Revenue'],
    },
    {
      metricName: 'PADCEV Q1 FY25 ¥51.2B — Above ¥48.0B Plan; First-Line mUC Volume Ramp Ahead of Schedule',
      detectedAt: '2025-08-05T07:15:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 48.0,
      actualValue: 51.2,
      deviationPct: 6.7,
      explanation:
        'PADCEV US and ex-US revenue of ¥51.2B in Q1 FY25 was ¥3.2B (+6.7%) above plan, as first-line mUC (metastatic urothelial carcinoma) prescriptions for EV + pembrolizumab ramped faster than modelled at key academic oncology centres. US oncology key accounts (Memorial Sloan Kettering, MD Anderson, Johns Hopkins) adopted the first-line protocol within 60 days of CMS coverage determination — approximately 30 days ahead of the modelled 90-day adoption lag. Ex-US PADCEV volume grew +38% YoY in Q1 FY25 as European reimbursement decisions in Germany, UK, France, and Spain were all received within the Q1 window. The Q1 outperformance supported Astellas\'s decision to increase the FY25 PADCEV guidance from ¥210B to ¥220–¥230B at the Q1 earnings call.',
      status: 'resolved',
      relatedDrivers: ['PADCEV Revenue', 'Strategic Brands Revenue', 'US Oncology Market Share'],
    },
    {
      metricName: 'Japan NHI Price Revision April 2025 — -6.2% Average; Within -5% to -8% Guidance Band',
      detectedAt: '2025-04-01T07:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: -7.0,
      actualValue: -6.2,
      deviationPct: -11.4,
      explanation:
        'The April 2025 Japan National Health Insurance (NHI) biennial price revision resulted in a -6.2% average price reduction on Astellas\'s Japan pharmaceutical portfolio — at the favourable end of the -5% to -8% guidance range provided by management. The softer-than-expected price cut reflects: (1) XTANDI benefiting from a value-based price maintenance clause (higher innovation score offsets standard cut); (2) VYLOY receiving a launch price exempt from the revision cycle; and (3) Astellas\'s aging product portfolio having fewer high-margin branded products subject to the maximum reduction tier. Japan revenue impact for FY25: approximately -¥7.8B vs. a -¥10.2B worst-case scenario, a ¥2.4B favourable variance. The next Japan NHI revision is scheduled for April 2027.',
      status: 'resolved',
      relatedDrivers: ['Japan Revenue', 'Japan NHI Revenue Impact', 'Core OP Margin'],
    },
    {
      metricName: 'XTANDI International Markets Q1 FY25 +22% YoY — Above +15% Plan; Brazil and ANZ Growth',
      detectedAt: '2025-08-05T07:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 15.0,
      actualValue: 22.0,
      deviationPct: 46.7,
      explanation:
        'XTANDI revenue in the International Markets segment (ex-US, ex-EU, ex-Japan, ex-China) grew +22% YoY in Q1 FY25 — 7 percentage points above the +15% plan. The outperformance was driven by: (1) Brazil — reimbursement approval for mCSPC (metastatic castration-sensitive prostate cancer) indication in February 2025 opened a new patient population, contributing approximately +¥1.8B above plan; (2) Australia/New Zealand — XTANDI volume grew +31% following a PBS (Pharmaceutical Benefits Scheme) listing expansion; and (3) South Korea — a government tender win secured hospital formulary access at 12 major oncology centres. International Markets XTANDI revenue of ¥14.8B in Q1 FY25 represents a growing share of the overall XTANDI portfolio as IRA-related US volume headwinds emerge. Management is accelerating International Markets commercial infrastructure investment as a partial offset to anticipated US IRA impact.',
      status: 'resolved',
      relatedDrivers: ['XTANDI Revenue', 'International Markets Revenue', 'Market Access Wins'],
    },
    {
      metricName: 'SMT FY25 Delivery ¥21B — Above ¥18B Initial Target; Phase 1 Complete 6 Months Ahead of Plan',
      detectedAt: '2026-05-12T08:15:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 18.0,
      actualValue: 21.0,
      deviationPct: 16.7,
      explanation:
        'The Sustainable Margin Transformation (SMT) programme delivered ¥21B in verified savings in FY25 — ¥3B above the ¥18B initial FY25 target that was set at programme launch in April 2024. Phase 1 (organisational redesign, procurement renegotiation, manufacturing rationalisation) was declared complete in October 2025 — 6 months ahead of the April 2026 plan. The ¥3B outperformance reflects procurement savings exceeding target by ¥1.8B (API supply chain consolidation with two key CMO suppliers achieved ¥2.0B savings vs. ¥1.5B modelled) and headcount reduction delivering 12% more cost reduction than planned (13,200 FTE vs. 12,100 planned by Q4 FY25). The ahead-of-schedule Phase 1 completion enabled Phase 2 (IT rationalisation, shared services expansion) to begin 6 months earlier than planned, pulling forward FY26 savings delivery.',
      status: 'resolved',
      relatedDrivers: ['SMT Savings', 'SG&A Ratio', 'Core OP Margin'],
    },
    {
      metricName: 'Core R&D Efficiency Ratio FY25 14.6% — Best in Class vs 18-22% Pharma Peer Average',
      detectedAt: '2026-05-12T08:30:00Z',
      severity: 'info',
      direction: 'below_expected',
      expectedValue: 16.0,
      actualValue: 14.6,
      deviationPct: -8.8,
      explanation:
        'Astellas Core R&D expense as a percentage of Core Revenue was 14.6% in FY25, 140bps better than the 16.0% internal target and significantly below the 18–22% range typical among mid-large pharma peers. The favourable R&D intensity reflects: (1) SMT programme optimisations in R&D spend — CRO procurement renegotiations, digital trial platform adoption reducing site costs, and Phase 1 study duration compression through adaptive design protocols; (2) portfolio prioritisation — 4 early-stage programmes were terminated in FY25 (appropriate, NPV-negative) rather than consuming mid-stage Phase 2 budgets; and (3) collaboration revenue offset — milestone payments from the Pfizer XTANDI co-promote and an AstraZeneca antibody-drug conjugate technology licence reduced net R&D cost. Absolute R&D spend of ¥312.4B supports 3 Phase 3 POC successes in FY25, validating the efficiency of the portfolio allocation. External R&D productivity benchmarks (POC per ¥100B invested) place Astellas in the top quartile of mid-large pharma.',
      status: 'resolved',
      relatedDrivers: ['R&D Expense', 'Core OP Margin', 'R&D Pipeline Value'],
    },
    {
      metricName: 'ALPMY ADR Relative TSR FY25 — +18.4% vs MSCI Pharma Index +8.2%; Outperformed by 1020bps',
      detectedAt: '2026-05-12T09:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 8.2,
      actualValue: 18.4,
      deviationPct: 124.4,
      explanation:
        'Astellas Pharma ALPMY ADR total shareholder return (price appreciation + dividends) was +18.4% in FY25, outperforming the MSCI Pharma & Biotech Index return of +8.2% by 1,020 basis points. Key TSR drivers: Core EPS +49.8% YoY (FY24 ¥158 → FY25 ¥237) was the primary re-rating catalyst; PADCEV Phase 3 EV-302 data at ESMO drove a significant re-rating in October 2025; SMT delivery ahead of plan improved cost credibility; and VEOZAH launch momentum validated the women\'s health diversification thesis. The TSR outperformance has reduced the discount to global pharma peers that ALPMY traded at in FY24, when IRA uncertainty was the dominant sentiment driver. Astellas\'s FY26 guidance midpoint implies continued Core EPS growth of approximately 5–7%, with significant optionality from XTANDI IRA negotiation outcome (downside risk managed) and Strategic Brands launch execution (upside catalyst).',
      status: 'resolved',
      relatedDrivers: ['Core EPS', 'Strategic Brands Revenue', 'PADCEV Revenue'],
    },
  ];

  await prisma.anomalyDetection.createMany({
    data: anomalies.map((a) => ({
      companyId,
      metricName: a.metricName,
      detectedAt: a.detectedAt,
      severity: a.severity,
      direction: a.direction,
      expectedValue: a.expectedValue,
      actualValue: a.actualValue,
      deviationPct: a.deviationPct,
      explanation: a.explanation,
      status: a.status,
      relatedDrivers: a.relatedDrivers as string[],
    })),
  });

  console.log(`  Seeded ${anomalies.length} anomaly detection records for Astellas Pharma Inc.`);
}
