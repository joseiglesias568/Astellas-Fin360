import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Alert Templates and Report Templates
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Full-Year Results (May 2026),
// FY2025 Annual Report, and investor supplement materials.
// =============================================================================

export async function seedAlertsAndReports(prisma: PrismaClient, companyId: number) {
  // ── Alert Templates ───────────────────────────────────────────────────

  await prisma.alertTemplate.createMany({
    data: [
      // ═══════════════════════════════════════════
      // FINANCIAL PERFORMANCE — CORE EPS & GUIDANCE
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'core-eps-guidance-risk',
        title: 'Quarterly Core EPS Run-Rate Below ¥62/Share Threshold',
        category: 'Financial Performance',
        threshold: '¥62/share quarterly',
        severity: 'critical',
        alertType: 'threshold',
        frequency: 'weekly',
        conditionPrefix: 'Falls below',
        description:
          'Quarterly Core EPS below ¥62 annualises to below ¥248/share, signalling risk to the FY2026 Core EPS growth trajectory above FY2025\'s ¥115.26 (note: FY2026 Core EPS target represents expected ~2x improvement from SMT and Strategic Brands). Monitor FY2026 quarterly Core OP margin vs 26%+ guidance. Key drivers: XTANDI volume trend, Strategic Brands growth pace, SMT savings recognition, and USD/JPY FX translation. Core EPS shortfall triggers CFO briefing and guidance reaffirmation assessment.',
        suggestedActions: [
          'Decompose Core EPS by segment: XTANDI revenue trend, Strategic Brands pace, SMT savings delivered',
          'Check USD/JPY rate impact — is shortfall FX translation or underlying Core OP miss?',
          'Review SMT savings recognition schedule — is the ¥40B target on quarterly delivery milestones?',
          'Assess XTANDI volume vs +5.3% YoY plan — any ARSi formulary losses or reimbursement changes?',
          'Prepare Core OP bridge for CFO review: revenue vs cost vs FX decomposition',
        ],
      },
      {
        companyId,
        externalId: 'core-eps-guidance-beat',
        title: 'Quarterly Core EPS Tracking Above FY2026 Upside Guidance Range',
        category: 'Financial Performance',
        threshold: '¥75/share quarterly',
        severity: 'info',
        alertType: 'forecast',
        frequency: 'monthly',
        conditionPrefix: 'Exceeds',
        description:
          'Quarterly Core EPS above ¥75 annualised would signal Core OP outperformance vs FY2026 plan — potentially from SMT overdelivery, Strategic Brands above-plan launch, or FX tailwind from Yen depreciation. Assess whether beat is structural (VYLOY launch acceleration, SMT ahead of schedule) or FX timing. Prepare guidance raise analysis for CFO review.',
        suggestedActions: [
          'Confirm beat source: structural (Strategic Brands, SMT) vs FX translation tailwind',
          'Model full-year Core OP margin if current quarter pace is sustained',
          'Assess whether VYLOY or PADCEV revenue is pulling ahead of quarterly plan',
          'Prepare guidance revision analysis for CFO and IR team review',
          'Review SMT delivery schedule — is acceleration sustainable or one-time catch-up?',
        ],
      },
      {
        companyId,
        externalId: 'core-eps-fy27-trajectory',
        title: 'ML Forecast: FY2027 Core EPS Below IRA-Adjusted Growth Trajectory',
        category: 'Financial Performance',
        threshold: '< ¥290/share FY2027',
        severity: 'critical',
        alertType: 'forecast',
        frequency: 'quarterly',
        conditionPrefix: 'Predicted to reach',
        description:
          'FY2027 is the last full year before XTANDI IRA MFP becomes effective (January 2028). If the forward model projects FY2027 Core EPS below ¥290/share, the Strategic Brands + SMT offset thesis against IRA is at risk. Triggers comprehensive multi-year EPS bridge update for CFO, detailing XTANDI IRA impact range and required Strategic Brands trajectory to maintain Core OP margin above 23% post-IRA.',
        suggestedActions: [
          'Build FY2027 Core EPS bridge: XTANDI volume + Strategic Brands + SMT + FX + IRA scenario',
          'Model three IRA scenarios: 10%, 15%, 20% net price reduction — EPS impact at each',
          'Assess Strategic Brands FY2027 pace: VYLOY peak trajectory, PADCEV label expansion readout',
          'Review R&D pipeline POC-to-Phase3 timeline — is the FY2028+ revenue bridge adequately funded?',
          'Prepare CFO board presentation on IRA impact scenarios with mitigation actions and confidence intervals',
        ],
      },

      // ═══════════════════════════════════════════
      // XTANDI REVENUE
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'xtandi-quarterly-miss',
        title: 'XTANDI Quarterly Revenue Below ¥220B — Volume or Price Alert',
        category: 'XTANDI Revenue',
        threshold: '¥220B quarterly',
        severity: 'critical',
        alertType: 'threshold',
        frequency: 'weekly',
        conditionPrefix: 'Falls below',
        description:
          'XTANDI combined global quarterly revenue below ¥220B annualises to below ¥880B — a material shortfall vs FY2025 full-year trajectory. XTANDI is ~35% of group revenue and the primary cash flow engine funding Strategic Brands launches and R&D. A miss signals either ARSi market share loss, managed care formulary adverse change, IRA-related pre-announcement pricing pressure, or adverse FX translation. Immediate decomposition by US/ex-US and volume vs price required.',
        suggestedActions: [
          'Decompose XTANDI revenue: US vs ex-US; volume vs net price; FX translation vs underlying',
          'Check US managed care formulary position — any quarter changes to XTANDI tier vs Erleada/Nubeqa?',
          'Review Japan NHI price revision schedule — is the shortfall from biannual price revision timing?',
          'Assess IRA signalling: has any CMS communication created early chilling effect on prescribing?',
          'Brief Global Commercial Oncology on volume trend and initiate formulary defence protocols if needed',
        ],
      },
      {
        companyId,
        externalId: 'xtandi-volume-deceleration',
        title: 'XTANDI Volume Growth Decelerating Below +3% YoY',
        category: 'XTANDI Revenue',
        threshold: '+3.0% YoY',
        severity: 'warning',
        alertType: 'trend',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'XTANDI volume growth below +3% YoY (vs +5.3% FY2025 base case) signals accelerating ARSi competitive pressure or prostate cancer market deceleration. Volume deceleration combined with IRA price reduction risk creates compounding earnings headwind. Monitor by geography: US volume (most important), Japan volume (NHI-influenced), and China volume (NRDL adoption pace).',
        suggestedActions: [
          'Analyse XTANDI new patient starts vs mature patient continuations — is new patient capture declining?',
          'Track Erleada and Nubeqa formulary wins in Tier-1 US payer accounts in the quarter',
          'Review XTANDI label data vs competition for mCSPC and nmCRPC indications — any head-to-head gaps?',
          'Model Core OP impact at +3%, +2%, and +1% volume growth to quantify downside to guidance',
          'Accelerate XTANDI combination therapy development (e.g., XTANDI + PADCEV bladder/prostate) to defend indication leadership',
        ],
      },

      // ═══════════════════════════════════════════
      // IRA POLICY
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'ira-policy-event',
        title: 'CMS IRA MFP Policy Event — XTANDI Price Announcement',
        category: 'Regulatory / IRA',
        threshold: 'Any CMS MFP announcement',
        severity: 'critical',
        alertType: 'event',
        frequency: 'realtime',
        conditionPrefix: 'CMS announces',
        description:
          'Any CMS announcement regarding XTANDI Maximum Fair Price (MFP) under the IRA Cycle 2 negotiation is a Tier-1 material event. The MFP publication date determines the effective net price reduction for Medicare Part D utilisation from January 2028. Each 5% MFP reduction applies to the Medicare-eligible portion of XTANDI US volume — estimated 40–50% of total US volume. Immediate management briefing, analyst communication preparation, and earnings guidance impact assessment required upon any CMS announcement.',
        suggestedActions: [
          'Quantify MFP at announced rate: 5%/10%/15%/20% impact on Core OP using the scenario model',
          'Issue internal guidance impact memo within 24 hours of CMS announcement for CFO review',
          'Prepare analyst/investor Q&A with key messages: SMT offset, Strategic Brands growth, FY2028 context',
          'Review hedging options: natural hedge via USD cost base, pricing actions in non-IRA channels',
          'Engage Government Affairs for legal options review within negotiation framework',
        ],
      },

      // ═══════════════════════════════════════════
      // STRATEGIC BRANDS
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'strategic-brands-quarterly-miss',
        title: 'Strategic Brands Quarterly Revenue Below ¥105B',
        category: 'Strategic Brands',
        threshold: '¥105B quarterly',
        severity: 'warning',
        alertType: 'threshold',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'Strategic Brands combined quarterly revenue below ¥105B annualises to below ¥420B — a significant shortfall vs the ¥610B FY2026 annual target (~¥152.5B/quarter). Strategic Brands are the primary growth offset to XTANDI IRA risk. A miss against quarterly run-rate signals VYLOY launch deceleration, PADCEV formulary pressure, or IZERVAY market penetration lag. Triggers immediate product-by-product revenue decomposition.',
        suggestedActions: [
          'Decompose by product: VYLOY vs PADCEV vs IZERVAY — which is missing plan?',
          'For VYLOY: check CLDN18.2 biomarker testing adoption rates and time-to-test from diagnosis',
          'For PADCEV: check co-promotion activity with Pfizer and managed care formulary tier positioning',
          'For IZERVAY: check ophthalmologist adoption rates and Medicare reimbursement claim volumes',
          'Brief Chief Commercial Officer on Strategic Brands quarterly trajectory vs ¥610B FY2026 target',
        ],
      },
      {
        companyId,
        externalId: 'vyloy-launch-tracker',
        title: 'VYLOY Launch Trajectory Below Quarterly Plan',
        category: 'Strategic Brands',
        threshold: 'Below ¥25B quarterly plan',
        severity: 'warning',
        alertType: 'trend',
        frequency: 'weekly',
        conditionPrefix: 'Falls below',
        description:
          'VYLOY (zolbetuximab) is the most watched new launch product and the primary investor-focus metric for Astellas\' post-XTANDI growth thesis. Weekly prescription tracking (IMS data), hospital formulary additions, and biomarker testing adoption rates are the leading indicators. VYLOY below quarterly plan signals biomarker testing bottleneck, physician education lag, or payer reimbursement delays — all addressable with commercial intervention if identified early.',
        suggestedActions: [
          'Pull weekly IQVIA/IQVIA US data on VYLOY new prescriptions and repeat fills',
          'Track CLDN18.2 testing volume from reference labs — is it growing at plan pace?',
          'Review hospital formulary committee approval status for VYLOY at top 100 US cancer centres',
          'Check payer prior authorisation approval rate for VYLOY claims submitted to date',
          'Brief VYLOY launch team: identify top 3 bottlenecks and corrective action plan within 2 weeks',
        ],
      },

      // ═══════════════════════════════════════════
      // SMT SAVINGS
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'smt-savings-shortfall',
        title: 'SMT Quarterly Savings Below ¥8B Run-Rate',
        category: 'Cost / SMT',
        threshold: '¥8B/quarter',
        severity: 'warning',
        alertType: 'threshold',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'SMT quarterly savings recognition below ¥8B annualises to below ¥32B — a ¥8B shortfall vs the ¥40B FY2026 target. SMT is the primary controllable lever for Core OP margin management and the buffer against XTANDI IRA price uncertainty. A delivery shortfall triggers programme management review and identification of at-risk workstreams. Manufacturing rationalisation and SG&A headcount reductions are the two most common delayed workstreams historically.',
        suggestedActions: [
          'Review SMT programme office delivery tracker by workstream: which workstreams are behind plan?',
          'Assess manufacturing rationalisation timeline: are plant closure decisions or CMO contract modifications delayed?',
          'Check SG&A rationalisation: are headcount reductions completing on schedule or facing regulatory/labour delays?',
          'Model FY2026 full-year SMT delivery at current run-rate vs ¥40B target',
          'Brief CFO on shortfall root cause and recovery actions; assess whether catch-up in H2 is feasible',
        ],
      },

      // ═══════════════════════════════════════════
      // FX
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'fx-adverse-yen-strength',
        title: 'USD/JPY Below ¥145 — Adverse FX Translation Alert',
        category: 'FX',
        threshold: '¥145/USD',
        severity: 'warning',
        alertType: 'threshold',
        frequency: 'weekly',
        conditionPrefix: 'Falls below',
        description:
          'USD/JPY below ¥145 represents Yen strengthening of ~¥6 vs the ¥151 FY2026 planning rate. Sustained below ¥145 = approximately -¥50B group revenue and -¥25B Core OP on an annualised basis from USD translation alone. EUR/JPY strengthening provides an additional headwind. FX translation can obscure underlying business performance — constant-currency revenue reporting becomes critical for investor communication when FX moves more than ¥5 vs plan.',
        suggestedActions: [
          'Calculate current-quarter USD/JPY average vs ¥151 plan rate: quantify translation impact',
          'Assess EUR/JPY and other major currency pairs for additional FX headwind beyond USD',
          'Review Treasury hedging positions: what portion of USD exposure is hedged and at what rate?',
          'Prepare constant-currency revenue bridge for CFO and investor communications',
          'Update full-year Core OP guidance sensitivity at ¥145, ¥140 and ¥135 USD/JPY scenarios',
        ],
      },
      {
        companyId,
        externalId: 'fx-yen-weakness-tailwind',
        title: 'USD/JPY Above ¥160 — FX Translation Tailwind',
        category: 'FX',
        threshold: '¥160/USD',
        severity: 'info',
        alertType: 'forecast',
        frequency: 'monthly',
        conditionPrefix: 'Exceeds',
        description:
          'USD/JPY above ¥160 provides a significant translation tailwind vs the ¥151 FY2026 planning rate. Each ¥10 Yen depreciation vs plan ≈ +¥80–100B group revenue and +¥40–50B Core OP on an annualised basis. Assess whether FX tailwind should be flagged in guidance or recognised as upside, and prepare constant-currency performance communications to distinguish operational from FX performance.',
        suggestedActions: [
          'Quantify FX tailwind vs ¥151 plan: calculate revenue and Core OP translation impact at ¥160',
          'Determine guidance presentation approach: raise guidance or cite FX-driven upside separately',
          'Prepare constant-currency performance disclosure to ensure investors understand underlying business vs FX',
          'Review hedging strategy: should Treasury lock in favourable rates on future USD revenue streams?',
          'Brief IR on how to communicate FX tailwind without creating the expectation it is permanent',
        ],
      },

      // ═══════════════════════════════════════════
      // CORE OP MARGIN
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'core-op-margin-risk',
        title: 'Core OP Margin Trending Below 24.0% — Margin Contraction Risk',
        category: 'Financial Performance',
        threshold: '24.0%',
        severity: 'critical',
        alertType: 'threshold',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'Core OP margin below 24.0% (vs 26.0% FY2025 actual) signals a 200bps deterioration from the FY2025 base — either from XTANDI revenue miss, Strategic Brands below plan, SMT shortfall, or adverse FX. A sustained sub-24% Core OP margin threatens Astellas\' ability to maintain the dividend and fund R&D at target levels. At 24%, Core EPS growth turns negative YoY and the IRA-offset thesis weakens materially.',
        suggestedActions: [
          'Decompose margin contraction: revenue miss vs cost increase vs FX translation vs mix shift',
          'Review SMT delivery: is the cost base reduction keeping pace with revenue pressure?',
          'Assess Strategic Brands gross margin — VYLOY and PADCEV early launch economics vs XTANDI mature product margin',
          'Calculate Core OP at constant currency: is the margin contraction a real or FX phenomenon?',
          'Prepare CFO margin recovery roadmap: SMT acceleration options and revenue growth requirements',
        ],
      },
      {
        companyId,
        externalId: 'core-op-margin-upside',
        title: 'Core OP Margin Tracking Above 28.0% — Guidance Upside',
        category: 'Financial Performance',
        threshold: '28.0%',
        severity: 'info',
        alertType: 'forecast',
        frequency: 'monthly',
        conditionPrefix: 'Exceeds',
        description:
          'Core OP margin above 28.0% (vs 26.0% FY2025 base) represents 200bps structural improvement — likely from SMT overdelivery and/or above-plan Strategic Brands launch. Assess sustainability: if driven by SMT cost reductions, the improvement is durable; if driven by FX tailwind, it is transient. Prepare guidance raise analysis.',
        suggestedActions: [
          'Confirm margin expansion source: SMT savings (structural) vs FX tailwind (transient)',
          'Model whether Strategic Brands gross margin is dilutive or accretive at current mix',
          'Assess R&D investment adequacy: is margin upside being achieved at cost of pipeline investment?',
          'Prepare CFO guidance raise analysis: conditions under which FY2026 guidance should be raised',
          'Brief IR on durable vs transient components of margin outperformance for investor communications',
        ],
      },

      // ═══════════════════════════════════════════
      // CHINA REVENUE
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'china-revenue-slowdown',
        title: 'China Revenue Growth Decelerating Below +15% YoY',
        category: 'China',
        threshold: '+15% YoY',
        severity: 'warning',
        alertType: 'trend',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'China revenue growth below +15% YoY (vs +29.6% FY2025 base) signals either NRDL renegotiation price cuts deeper than expected, XTANDI volume deceleration in lower-tier cities, or VYLOY launch delays. China is Astellas\' highest-growth market and a key component of the long-term Strategic Brands thesis. Deceleration below 15% would remove ¥15–20B from FY2026 group revenue plan.',
        suggestedActions: [
          'Decompose China revenue: XTANDI volume vs XTANDI NRDL price vs VYLOY ramp',
          'Review NRDL renegotiation outcome — was the price reduction rate higher than expected?',
          'Check VYLOY China launch KPIs: hospital formulary listings, physician prescribing volume',
          'Assess competitive dynamics in Chinese prostate cancer and gastric cancer markets',
          'Brief China affiliate management team on growth shortfall and recovery actions',
        ],
      },

      // ═══════════════════════════════════════════
      // ENTERPRISE CORE OP
      // ═══════════════════════════════════════════
      {
        companyId,
        externalId: 'core-op-guidance-risk',
        title: 'Core Operating Profit Tracking Below FY2026 Guidance',
        category: 'Financial Performance',
        threshold: '¥139B quarterly (¥556B annualised)',
        severity: 'critical',
        alertType: 'forecast',
        frequency: 'monthly',
        conditionPrefix: 'Falls below',
        description:
          'Core OP below ¥139B/quarter annualises to below ¥556B — the FY2025 actual level — implying flat or negative Core OP growth in FY2026 vs plan. FY2026 requires: XTANDI volume growth +5.3%, Strategic Brands +43% to ¥610B, and SMT ¥40B savings. Failure on any two of these three simultaneously would put Core OP below the FY2025 base. Quarterly shortfall triggers segment-level decomposition and guidance reaffirmation assessment.',
        suggestedActions: [
          'Build Core OP bridge vs FY2025 actuals: XTANDI vs Strategic Brands vs SMT vs FX vs other',
          'Identify which of the three key levers (XTANDI volume, Strategic Brands, SMT) is furthest behind plan',
          'Model full-year Core OP at current run-rate and identify exit rate required to meet guidance',
          'Check FX assumption: is Core OP shortfall primarily FX translation or underlying business?',
          'Prepare CFO quarterly guidance assessment memo with recovery actions and probabilities',
        ],
      },
    ],
  });

  console.log('Seeded 15 alert templates');

  // ── Report Templates ──────────────────────────────────────────────────

  await prisma.reportTemplate.createMany({
    data: [
      // ══════════════════════════════════════════════════════════════════
      // XTANDI & IRA
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'xtandi-1',
        name: 'XTANDI Revenue & Volume Tracker — IRA Sensitivity',
        category: 'XTANDI / IRA',
        frequency: 'Weekly',
        description:
          'XTANDI global revenue tracking: US (+5.3% volume YoY plan), ex-US (Japan, EU, China). Volume vs net price decomposition. IRA scenario sensitivity: 0%, 10%, 15%, 20% MFP impact on Core OP. ARSi market share (XTANDI vs Erleada vs Nubeqa). Managed care formulary tier monitoring. FY2025 XTANDI ~¥750B revenue run-rate.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Global Commercial FP&A — Oncology',
        rating: 4.9,
        views: 3400,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'xtandi-ira',
        relatedReportIds: ['xtandi-2', 'fin-1'],
        dataSource: 'Global Sales Reporting / IQVIA Data',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'Chief Commercial Officer', 'IR'],
        tags: ['xtandi', 'ira', 'mfp', 'arsi', 'volume', 'oncology'],
        nextUpdate: 'Every Monday 6:00 AM',
        executiveSummary:
          'FY2025 XTANDI global revenue ~¥750B, with US as the largest contributor (~¥400B). Volume growth +5.3% YoY. ARSi three-way competition (Erleada, Nubeqa) has not impaired XTANDI\'s market leadership in mCRPC. IRA Cycle 2: CMS selected XTANDI; MFP publication expected FY2026, effective January 2028. FY2026 planning assumption: 0% IRA price impact on reported revenue. SMT ¥40B provides a full offset buffer against even a 10% IRA MFP scenario.',
        aiInsight:
          'Volume model projects XTANDI global volume growth of +4.8%–5.8% for FY2026, consistent with base case +5.3% assumption. Primary risk: US managed care formulary position in nmCRPC indication — Erleada has gained in 3 top-10 payer accounts in Q1 FY2026. Monitor Q2 new patient start data for indication-level share trends.',
        recommendations: [
          'Maintain weekly XTANDI US new patient start tracking vs Erleada/Nubeqa from IQVIA specialty data',
          'Prepare IRA sensitivity analysis at 10%, 15%, 20% MFP for CFO and IR before CMS publication',
          'Review managed care formulary defence strategy in nmCRPC — 3 payer account losses require response',
          'Brief investor relations on FY2026 vs FY2027 IRA impact timeline — clarity on effective date is key',
        ],
        keyMetrics: [
          { label: 'FY2025 XTANDI Global Revenue', value: '~¥750B', trend: 'up', trendValue: '+5.3% YoY' },
          { label: 'XTANDI US Revenue', value: '~¥400B', trend: 'up', trendValue: 'FY2025' },
          { label: 'IRA MFP Status', value: 'Negotiation ongoing', trend: 'flat', trendValue: 'Effective Jan 2028' },
          { label: 'ARSi Market Share (XTANDI)', value: '~52% mCRPC US', trend: 'flat', trendValue: 'Stable vs FY2024' },
          { label: 'FY2026 Volume Growth Plan', value: '+5.3% YoY', trend: 'flat', trendValue: 'Base case' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'XTANDI Global Revenue by Quarter (¥B)',
            data: [
              { period: 'Q1 FY25', value: 183 },
              { period: 'Q2 FY25', value: 186 },
              { period: 'Q3 FY25', value: 189 },
              { period: 'Q4 FY25', value: 192 },
              { period: 'Q1 FY26E', value: 196 },
              { period: 'Q2 FY26E', value: 199 },
            ],
          },
          {
            type: 'line',
            title: 'IRA MFP Scenario: Core OP Impact (¥B)',
            data: [
              { period: '0% MFP', value: 0 },
              { period: '5% MFP', value: -20 },
              { period: '10% MFP', value: -40 },
              { period: '15% MFP', value: -60 },
              { period: '20% MFP', value: -80 },
            ],
          },
        ],
        tableData: {
          headers: ['Geography', 'FY2025 Revenue (¥B)', 'YoY', 'FY2026 Plan', 'IRA Risk'],
          rows: [
            ['United States', '~¥400B', '+6.5%', '+5.3% volume', 'MFP effective Jan 2028'],
            ['Japan', '~¥85B', '+1.2%', '+1–2%', 'None (NHI pricing separate)'],
            ['Europe / Established Mkts', '~¥180B', '+4.8%', '+4–5%', 'None (non-IRA)'],
            ['China', '~¥45B', '+28%', '+28–30%', 'None (NRDL separate)'],
            ['XTANDI Global Total', '~¥750B', '+5.3%', '+5.3% YoY', 'US Medicare portion only'],
          ],
        },
      },
      {
        companyId,
        externalId: 'xtandi-2',
        name: 'IRA MFP Monitoring & Policy Event Tracker',
        category: 'XTANDI / IRA',
        frequency: 'Weekly',
        description:
          'Real-time IRA CMS policy monitoring: Cycle 2 negotiation status, MFP publication timeline, legal proceedings, Congressional activity. XTANDI Medicare Part D claims exposure quantification. IRA scenario model: 0%–25% net price reduction impact on Core EPS. FY2028 effective date planning. Competitor IRA exposure comparison.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Government Affairs / CFO Office',
        rating: 4.9,
        views: 2800,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'xtandi-ira',
        relatedReportIds: ['xtandi-1', 'fin-2'],
        dataSource: 'CMS Policy Feeds / Government Affairs',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'General Counsel', 'IR'],
        tags: ['ira', 'cms', 'mfp', 'policy', 'regulatory', 'xtandi'],
        nextUpdate: 'Every Monday 7:00 AM',
      },

      // ══════════════════════════════════════════════════════════════════
      // STRATEGIC BRANDS
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'brands-1',
        name: 'Strategic Brands Revenue Dashboard — VYLOY / PADCEV / IZERVAY',
        category: 'Strategic Brands',
        frequency: 'Weekly',
        description:
          'Strategic Brands combined revenue: FY2025 ¥480.3B (+43.0% YoY). FY2026 target ¥610B (~+27%). Product-level tracking: VYLOY (gastric cancer), PADCEV (urothelial cancer, Pfizer co-promote), IZERVAY (geographic atrophy). Launch KPIs: prescriptions, new patient starts, biomarker testing volumes, formulary approvals. Regional decomposition: US, EU, Japan, China.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Global Commercial FP&A',
        rating: 4.9,
        views: 3200,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'strategic-brands',
        relatedReportIds: ['brands-2', 'fin-1'],
        dataSource: 'Global Sales Reporting / IQVIA',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'Chief Commercial Officer', 'IR'],
        tags: ['vyloy', 'padcev', 'izervay', 'strategic-brands', 'launch', 'oncology'],
        nextUpdate: 'Every Monday 6:00 AM',
        executiveSummary:
          'FY2025 Strategic Brands ¥480.3B (+43.0% YoY) — the primary earnings growth driver exceeding XTANDI base revenue growth. VYLOY is the highest-priority launch: gastric/GEJ cancer, CLDN18.2-positive biomarker selection, global launch underway. PADCEV urothelial cancer co-promotion with Pfizer growing strongly. IZERVAY geographic atrophy US launch building market awareness. FY2026 ¥610B target implies continued +27% YoY growth.',
        aiInsight:
          'VYLOY weekly prescription model tracks toward ¥65–70B FY2026 run-rate if CLDN18.2 testing adoption maintains current +15% weekly growth pace. PADCEV launch trajectory is tracking above plan on EV-302 earlier-line data enthusiasm. IZERVAY GA market penetration remains under 3% of addressable patients — ophthalmologist education programmes are the rate-limiting step.',
        recommendations: [
          'Accelerate CLDN18.2 biomarker testing at major cancer centres — partnership with Quest/LabCorp critical',
          'Brief PADCEV Pfizer co-promotion team on EV-302 perioperative data readout timeline for launch planning',
          'Invest in IZERVAY ophthalmologist education: GA market still under-penetrated; early mover advantage window',
          'Review China VYLOY NRDL application status — Q3 FY2026 submission target on track?',
        ],
        keyMetrics: [
          { label: 'Strategic Brands FY2025', value: '¥480.3B', trend: 'up', trendValue: '+43.0% YoY' },
          { label: 'FY2026 Target', value: '¥610B', trend: 'up', trendValue: '+27% YoY' },
          { label: 'VYLOY Status', value: 'Launched US/Japan/EU', trend: 'up', trendValue: 'Global roll-out ongoing' },
          { label: 'PADCEV Growth', value: 'Above plan', trend: 'up', trendValue: 'EV-302 label expansion' },
          { label: 'IZERVAY Penetration', value: '<3% GA patients', trend: 'up', trendValue: 'Early ramp phase' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'Strategic Brands Revenue Annual (¥B)',
            data: [
              { period: 'FY2022', value: 156 },
              { period: 'FY2023', value: 228 },
              { period: 'FY2024', value: 336 },
              { period: 'FY2025', value: 480.3 },
              { period: 'FY2026E', value: 610 },
            ],
          },
          {
            type: 'line',
            title: 'Strategic Brands Quarterly Run-Rate (¥B)',
            data: [
              { period: 'Q1 FY25', value: 109 },
              { period: 'Q2 FY25', value: 118 },
              { period: 'Q3 FY25', value: 124 },
              { period: 'Q4 FY25', value: 129 },
              { period: 'Q1 FY26E', value: 138 },
              { period: 'Q2 FY26E', value: 145 },
            ],
          },
        ],
        tableData: {
          headers: ['Product', 'FY2025 Revenue', 'YoY', 'FY2026 Target', 'Key Growth Driver'],
          rows: [
            ['VYLOY (zolbetuximab)', '~¥95B', '+180%', '~¥165B', 'Global launch, China NRDL'],
            ['PADCEV (enfortumab vedotin)', '~¥220B', '+38%', '~¥280B', 'EV-302 earlier lines, US/EU'],
            ['IZERVAY (avacincaptad pegol)', '~¥45B', '+95%', '~¥75B', 'GA market penetration'],
            ['Other Strategic Brands', '~¥120B', '+25%', '~¥90B', 'Oncology pipeline launches'],
            ['Strategic Brands Total', '¥480.3B', '+43.0%', '¥610B', 'VYLOY + PADCEV leadership'],
          ],
        },
      },
      {
        companyId,
        externalId: 'brands-2',
        name: 'VYLOY Launch Tracker — CLDN18.2 Biomarker & Market Penetration',
        category: 'Strategic Brands',
        frequency: 'Weekly',
        description:
          'VYLOY (zolbetuximab) weekly launch KPIs: new patient starts, CLDN18.2 testing adoption, formulary approvals, reimbursement coverage by payer. Gastric/GEJ cancer market size ~200K eligible patients globally. CLDN18.2-positive rate ~38%. US, EU, Japan, China launch status. Peak sales model ¥200B+. Pfizer combination regimen uptake.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'VYLOY Launch Team / Commercial FP&A',
        rating: 4.9,
        views: 3600,
        isNew: true,
        isTrending: true,
        relatedConsoleId: 'strategic-brands',
        relatedReportIds: ['brands-1', 'fin-1'],
        dataSource: 'IQVIA Specialty Data / Lab Testing Volumes',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'Chief Commercial Officer', 'IR'],
        tags: ['vyloy', 'cldn18.2', 'gastric-cancer', 'launch', 'biomarker'],
        nextUpdate: 'Every Monday 7:00 AM',
        executiveSummary:
          'VYLOY is Astellas\' highest priority new launch and the first approved therapy targeting CLDN18.2-positive gastric/GEJ cancer. Approved in US, Japan, EU. Biomarker testing adoption is the primary rate-limiting step for prescription growth. CLDN18.2 testing must be integrated into standard-of-care gastric cancer workup at point of diagnosis. Weekly prescription tracking began at US launch; Japan and EU tracking added with respective approvals.',
        aiInsight:
          'CLDN18.2 testing volume model indicates testing is reaching ~22% of newly diagnosed gastric/GEJ patients in the top-50 US oncology centres — up from 8% at launch. Full penetration (85%+ testing) would approximately triple the addressable patient pool from current scripts. China NRDL application timing is the single highest-NPV decision point for VYLOY in FY2026.',
        recommendations: [
          'Partner with Quest Diagnostics and LabCorp for CLDN18.2 reflex testing in gastric cancer protocol',
          'Sponsor ASCO/ESMO symposia featuring VYLOY SPOTLIGHT/GLOW data — physician education drives testing',
          'Accelerate China NRDL dossier preparation — every quarter delay = ¥6B revenue miss vs plan',
          'Track VYLOY prescribers: identify early adopters for case series and peer-to-peer education',
        ],
        keyMetrics: [
          { label: 'CLDN18.2 Testing Rate', value: '~22% US top centres', trend: 'up', trendValue: 'vs 8% at launch' },
          { label: 'VYLOY Formulary Coverage', value: '68% US commercial', trend: 'up', trendValue: 'H1 FY26' },
          { label: 'Eligible Patients (CLDN18.2+)', value: '~75K globally/yr', trend: 'flat', trendValue: '38% of gastric/GEJ' },
          { label: 'China NRDL Application', value: 'In preparation', trend: 'flat', trendValue: 'Target H2 FY26' },
          { label: 'Peak Sales Estimate', value: '¥200B+', trend: 'flat', trendValue: 'FY2028–2030' },
        ],
        chartData: [
          {
            type: 'line',
            title: 'VYLOY US Weekly New Patient Starts (Indexed)',
            data: [
              { period: 'Wk 4', value: 100 },
              { period: 'Wk 8', value: 118 },
              { period: 'Wk 12', value: 138 },
              { period: 'Wk 16', value: 155 },
              { period: 'Wk 20', value: 172 },
              { period: 'Wk 24', value: 186 },
            ],
          },
        ],
        tableData: {
          headers: ['Market', 'Launch Status', 'Reimbursement', 'CLDN18.2 Testing', 'FY2026 Revenue Target'],
          rows: [
            ['United States', 'Launched', 'FDA approved; CMS coverage', '~22% top centres', '~¥90B'],
            ['Japan', 'Launched', 'NHI listed', '>50% major cancer hospitals', '~¥35B'],
            ['European Union', 'Launched', 'EMA approved; HTA ongoing', 'Ramp in progress', '~¥30B'],
            ['China', 'Pre-launch', 'NRDL application pending', 'Not yet available', '¥10B+ if NRDL FY26'],
          ],
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // FINANCIAL PERFORMANCE — ENTERPRISE
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'fin-1',
        name: 'Enterprise Core OP Bridge Report',
        category: 'Financial Performance',
        frequency: 'Monthly',
        description:
          'Core Operating Profit waterfall: FY2025 ¥556.4B (26.0% margin). FY2026 bridge: XTANDI volume +¥40B, Strategic Brands +¥130B, SMT savings +¥40B, IRA 0%, FX impact. Core OP margin 26%+ guidance. YoY Core OP bridge. SMT delivery tracking vs ¥40B target.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Corporate FP&A',
        rating: 4.9,
        views: 3200,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'financial-performance',
        relatedReportIds: ['fin-2', 'xtandi-1'],
        dataSource: 'Financial Consolidation / SAP',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'IR', 'Controller'],
        tags: ['core-op', 'bridge', 'guidance', 'margin', 'waterfall'],
        nextUpdate: 'Monthly Day 10',
        executiveSummary:
          'FY2025 Core OP ¥556.4B (26.0% margin). FY2026 plan: Core OP 26%+ supported by Strategic Brands +¥130B incremental revenue, SMT ¥40B savings, and XTANDI volume +5.3%. IRA impact 0% in FY2026 (MFP effective January 2028). Primary risk: FX (USD/JPY ¥151 plan; Yen strengthening adverse). SMT delivery is the highest-conviction internal lever.',
        aiInsight:
          'Core OP model indicates 70% probability FY2026 Core OP finishes above ¥590B (6% growth vs FY2025). Key risk: if USD/JPY falls below ¥145 for a sustained period, Core OP translation headwind of ¥40–50B could offset SMT savings. Strategic Brands pace is tracking above plan — VYLOY weekly data positive.',
        recommendations: [
          'Track SMT savings recognition monthly: ¥10B/quarter run-rate required to reach ¥40B FY target',
          'Monitor USD/JPY weekly: at ¥145, prepare constant-currency bridge and guidance reaffirmation',
          'Brief IR on Core OP vs Core EPS bridge — amortisation, interest, and tax rate assumptions',
          'Prepare CFO Core OP sensitivity at three IRA scenarios for FY2027 planning purposes',
        ],
        keyMetrics: [
          { label: 'FY2025 Core OP', value: '¥556.4B', trend: 'up', trendValue: '+12% YoY' },
          { label: 'FY2025 Core OP Margin', value: '26.0%', trend: 'up', trendValue: '+2.0pp YoY' },
          { label: 'FY2026 SMT Target', value: '¥40B', trend: 'flat', trendValue: 'Incremental savings' },
          { label: 'Strategic Brands Growth', value: '+43% FY2025', trend: 'up', trendValue: '¥480.3B' },
          { label: 'FY2025 Core EPS', value: '¥115.26', trend: 'up', trendValue: '+17.5% YoY' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'Core OP Bridge FY2025 → FY2026E (¥B)',
            data: [
              { period: 'FY2025 Actual', value: 556.4 },
              { period: 'XTANDI Volume', value: 40 },
              { period: 'Strategic Brands', value: 130 },
              { period: 'SMT Savings', value: 40 },
              { period: 'FX Impact', value: -15 },
              { period: 'Other', value: -10 },
              { period: 'FY2026E Target', value: 741 },
            ],
          },
          {
            type: 'line',
            title: 'Core OP Margin (%) Annual',
            data: [
              { period: 'FY2022', value: 16.5 },
              { period: 'FY2023', value: 20.1 },
              { period: 'FY2024', value: 24.0 },
              { period: 'FY2025', value: 26.0 },
              { period: 'FY2026E', value: 26.5 },
            ],
          },
        ],
        tableData: {
          headers: ['Driver', 'FY2025 Base', 'FY2026 Target', 'Incremental Impact', 'Confidence'],
          rows: [
            ['XTANDI Volume (+5.3%)', '¥750B', '¥790B', '+¥40B', 'High'],
            ['Strategic Brands (+27%)', '¥480B', '¥610B', '+¥130B', 'Medium-High'],
            ['SMT Savings', '¥21B delivered', '¥40B', '+¥19B Core OP', 'High'],
            ['FX (USD/JPY ¥151 plan)', '¥153 FY2025 avg', '¥151', '−¥15B', 'Low (market risk)'],
            ['IRA Impact (FY2026)', '0%', '0%', '¥0 (pre-MFP)', 'Very High'],
          ],
        },
      },
      {
        companyId,
        externalId: 'fin-2',
        name: 'Core EPS vs Guidance Tracker',
        category: 'Financial Performance',
        frequency: 'Monthly',
        description:
          'Core EPS quarterly tracking vs FY2026 guidance. FY2025 Core EPS ¥115.26 (+17.5% YoY). EPS bridge: Core OP, amortisation add-back, interest expense (~¥45B annual), tax rate (~24%), weighted average shares (~1.32B). Consensus estimate tracking. Beat/miss analysis.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Corporate FP&A / IR',
        rating: 4.9,
        views: 3400,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'financial-performance',
        relatedReportIds: ['fin-1', 'fin-3'],
        dataSource: 'Financial Consolidation',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'IR', 'Controller'],
        tags: ['core-eps', 'eps', 'guidance', 'bridge', 'quarterly'],
        nextUpdate: 'Monthly Day 10',
        executiveSummary:
          'FY2025 Core EPS ¥115.26 (+17.5% YoY). FY2026 plan: continued double-digit Core EPS growth driven by Core OP expansion (SMT + Strategic Brands) and stable share count. Interest expense ~¥45B annual on net debt position. Effective tax rate ~24%. Amortisation of intangible assets from Agamatrix and other bolt-on acquisitions is modest vs global pharma peers.',
        aiInsight:
          'Analyst consensus models project FY2026 Core EPS of ¥135–145/share (+17–26% YoY). Top investor focus areas: (1) XTANDI IRA MFP announcement and FY2028 impact modelling, (2) VYLOY launch trajectory as the incremental growth engine, (3) SMT ¥40B delivery confidence. IRA scenario modelling is the most requested IR analysis.',
        recommendations: [
          'Publish IRA sensitivity table in every quarterly earnings materials: Core EPS impact at 10%/15%/20% MFP',
          'Address VYLOY launch pace with prescriber data transparency — investors need leading indicators',
          'Confirm SMT quarterly delivery schedule: ¥10B/quarter tracking vs ¥40B FY target',
          'Reinforce FY2026 guidance confidence: no IRA impact, SMT delivering, Strategic Brands on track',
        ],
        keyMetrics: [
          { label: 'FY2025 Core EPS', value: '¥115.26', trend: 'up', trendValue: '+17.5% YoY' },
          { label: 'FY2026 Core EPS Plan', value: '¥135–145', trend: 'up', trendValue: '+17–26% YoY est.' },
          { label: 'FY2025 Core OP', value: '¥556.4B', trend: 'up', trendValue: '+12% YoY' },
          { label: 'Shares (approx.)', value: '~1.32B', trend: 'flat', trendValue: 'Stable count' },
          { label: 'FY2025 Tax Rate', value: '24%', trend: 'flat', trendValue: 'Effective rate' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'Core EPS Annual (¥/share)',
            data: [
              { period: 'FY2022', value: 62.5 },
              { period: 'FY2023', value: 78.3 },
              { period: 'FY2024', value: 98.1 },
              { period: 'FY2025', value: 115.26 },
              { period: 'FY2026E', value: 138 },
            ],
          },
        ],
        tableData: {
          headers: ['Metric', 'FY2025 Actual', 'FY2026 Plan', 'YoY Change', 'Consensus'],
          rows: [
            ['Core EPS (¥/share)', '¥115.26', '¥135–145', '+17–26%', '¥140'],
            ['Group Revenue (¥B)', '¥2,139.2B', '¥2,178B+', '+1.8%', '¥2,200B'],
            ['Core OP (¥B)', '¥556.4B', '¥590B+', '+6%', '¥600B'],
            ['Core OP Margin', '26.0%', '26%+', '+0.5pp', '26.5%'],
            ['Strategic Brands', '¥480.3B', '¥610B', '+27%', '¥600B'],
          ],
        },
      },
      {
        companyId,
        externalId: 'fin-3',
        name: 'Cash Flow & Capital Allocation Monitor',
        category: 'Financial Performance',
        frequency: 'Monthly',
        description:
          'Free cash flow generation vs R&D investment, dividend, and deleveraging needs. Net debt position. FY2025 Core EPS ¥115.26. Dividend per share tracking. R&D spend vs ¥314.8B plan. SMT savings cash realisation. Share count and buyback optionality. FX hedging programme cash impact.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Treasury / FP&A',
        rating: 4.8,
        views: 2200,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'financial-performance',
        relatedReportIds: ['fin-2', 'risk-1'],
        dataSource: 'Treasury / Bloomberg',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'Treasurer', 'CEO', 'IR'],
        tags: ['cashflow', 'capital-allocation', 'dividend', 'rd-spend', 'net-debt'],
        nextUpdate: 'Monthly Day 7',
      },

      // ══════════════════════════════════════════════════════════════════
      // ENTERPRISE RISK
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'risk-1',
        name: 'Enterprise Risk Dashboard — IRA, FX, Pipeline Binary',
        category: 'Enterprise Risk',
        frequency: 'Monthly',
        description:
          'Top 5 enterprise risk monitoring: (1) XTANDI IRA MFP quantification; (2) USD/JPY FX translation sensitivity; (3) SMT delivery shortfall; (4) Phase 3 binary outcome pipeline risk; (5) ARSi competition and VYLOY launch execution. Risk register severity/likelihood matrix. Quarterly risk review for Audit Committee.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'Enterprise Risk / CFO Office',
        rating: 4.7,
        views: 1800,
        isNew: false,
        isTrending: false,
        relatedConsoleId: 'enterprise-risk',
        relatedReportIds: ['fin-3', 'xtandi-2'],
        dataSource: 'Risk Management System / Treasury',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'General Counsel', 'Audit Committee'],
        tags: ['risk', 'ira', 'fx', 'pipeline', 'smt', 'enterprise-risk'],
        nextUpdate: 'Monthly Day 8',
      },

      // ══════════════════════════════════════════════════════════════════
      // R&D PIPELINE
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'rd-1',
        name: 'R&D Pipeline & POC Programme Tracker',
        category: 'R&D Pipeline',
        frequency: 'Monthly',
        description:
          'R&D pipeline by phase: POC programme (3 successes FY2025), Phase 3 initiations (FY2026 target: 3 new initiations), focused areas (oncology, immunology, rx+). R&D expense ¥314.8B vs plan. POC success rate tracking. Phase 3 readout calendar. Pipeline NPV vs IRA replacement ratio. External BD/partnership activity.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'R&D Finance / CSO Office',
        rating: 4.8,
        views: 2000,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'rd-pipeline',
        relatedReportIds: ['fin-1', 'risk-1'],
        dataSource: 'R&D Operations System / Clinical Trial Databases',
        accessLevel: 'Finance + R&D Leadership',
        audience: ['CFO', 'CSO', 'CEO', 'Audit Committee'],
        tags: ['pipeline', 'poc', 'phase3', 'rd-spend', 'oncology', 'npv'],
        nextUpdate: 'Monthly Day 8',
        executiveSummary:
          'FY2025 R&D: 3 POC successes (record annual count in focused areas model), ¥314.8B spend. FY2026: 3 Phase 3 initiations targeted from POC-positive assets. Oncology focused area: XTANDI combinations, PADCEV perioperative, gilteritinib AML expansion. Immunology: fezolinetant (meno) label maintenance, ASP2215 combinations. rx+ focused area: novel mechanisms in Phase 2.',
        aiInsight:
          'Pipeline NPV model estimates risk-adjusted Phase 3 portfolio value of ¥1.2T (15 programmes at various stages, risk-adjusted at 50–75% phase-appropriate success probabilities). Three concurrent Phase 3 initiations in FY2026 increase binary outcome risk — portfolio breadth provides partial offset. Phase 3 programmes typically take 3–5 years to readout; FY2029+ revenue impact from current POC successes.',
        recommendations: [
          'Confirm Phase 3 initiation budget for each POC-positive asset advancing in FY2026',
          'Review PADCEV EV-302 perioperative trial — readout timeline and EPS impact at positive outcome',
          'Track R&D expense quarterly: ¥314.8B full-year budget vs ¥78.7B/quarter pace',
          'Present pipeline NPV vs XTANDI IRA replacement ratio at next investor day for long-term thesis support',
        ],
        keyMetrics: [
          { label: 'FY2025 R&D Spend', value: '¥314.8B', trend: 'flat', trendValue: '14.7% of revenue' },
          { label: 'FY2025 POC Successes', value: '3', trend: 'up', trendValue: 'Record annual count' },
          { label: 'FY2026 Phase 3 Target', value: '3 initiations', trend: 'flat', trendValue: 'From POC-positive assets' },
          { label: 'Pipeline NPV (risk-adj.)', value: '~¥1.2T', trend: 'up', trendValue: '15 active programmes' },
          { label: 'R&D Intensity', value: '14.7%', trend: 'flat', trendValue: 'Revenue share' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'R&D Pipeline by Phase (Asset Count)',
            data: [
              { period: 'Phase 1', value: 8 },
              { period: 'Phase 2 (Pre-POC)', value: 6 },
              { period: 'POC Evaluation', value: 3 },
              { period: 'Phase 3', value: 4 },
              { period: 'Registration / Approved', value: 5 },
            ],
          },
        ],
        tableData: {
          headers: ['Focused Area', 'Phase 3 Assets', 'POC Programme', 'Key Near-Term Readout', 'Revenue Potential'],
          rows: [
            ['Oncology', 'PADCEV EV-302, VYLOY ext.', '2 assets FY2026', 'PADCEV perioperative FY2026-27', 'High (¥150B+)'],
            ['Immunology', 'Fezolinetant', '1 asset FY2026', 'Phase 3 new indication', 'Medium (¥50B+)'],
            ['rx+ (novel)', '2 early Phase 3', '0 confirmed FY2026', 'FY2028+', 'Speculative'],
            ['Total Pipeline', '6+ Phase 3', '3 POC FY2026 target', 'Multiple FY2026-27', '¥400B+ risk-adj.'],
          ],
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // REGIONAL / CHINA
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'china-1',
        name: 'China Revenue Tracker — XTANDI NRDL + VYLOY Launch',
        category: 'China',
        frequency: 'Monthly',
        description:
          'China revenue: FY2025 ¥101.5B (+29.6% YoY). XTANDI NRDL volume deepening tracker. VYLOY China NRDL application status and launch preparation. China market share by product. NMPA regulatory filing pipeline. PADCEV NMPA filing FY2026. China team investment and headcount for VYLOY/PADCEV launches.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'China Affiliate FP&A / Commercial',
        rating: 4.8,
        views: 2200,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'china',
        relatedReportIds: ['brands-1', 'fin-1'],
        dataSource: 'China Affiliate Sales System / NMPA Regulatory Feeds',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'China Affiliate President', 'IR'],
        tags: ['china', 'nrdl', 'xtandi', 'vyloy', 'nmpa', 'emerging-markets'],
        nextUpdate: 'Monthly Day 8',
        executiveSummary:
          'China ¥101.5B FY2025 (+29.6% YoY) — Astellas\' fastest-growing region. XTANDI NRDL inclusion is driving volume expansion in lower-tier cities. VYLOY China launch is the highest near-term upside catalyst: gastric cancer is #1 by incidence in China, and CLDN18.2 biomarker positivity (~38% of Chinese gastric patients) provides a large eligible population. NRDL inclusion would be transformative for VYLOY China revenue.',
        aiInsight:
          'China revenue model projects ¥130B in FY2026 (+28% YoY) based on XTANDI volume momentum. VYLOY China NRDL inclusion would add ¥20–30B incremental, taking China to ¥150B+ scenario. PADCEV NMPA filing in FY2026 sets up a third China revenue driver from FY2028 onwards.',
        recommendations: [
          'Accelerate VYLOY China NRDL application dossier — every quarter delay = ¥6–8B revenue miss',
          'Invest in CLDN18.2 testing infrastructure partnership with China diagnostic labs ahead of NRDL',
          'Review XTANDI NRDL renegotiation timeline: next expected price review and volume offset modelling',
          'Brief IR on China revenue mix shift: from XTANDI-only to XTANDI + VYLOY + PADCEV multi-product',
        ],
        keyMetrics: [
          { label: 'China FY2025 Revenue', value: '¥101.5B', trend: 'up', trendValue: '+29.6% YoY' },
          { label: 'FY2026 China Target', value: '¥130B+', trend: 'up', trendValue: '+28% YoY' },
          { label: 'XTANDI NRDL Status', value: 'Listed — ramp ongoing', trend: 'up', trendValue: 'Lower-tier city expansion' },
          { label: 'VYLOY NRDL Status', value: 'Application pending', trend: 'flat', trendValue: 'Target H2 FY26' },
          { label: 'China % of Group Revenue', value: '~5%', trend: 'up', trendValue: 'Target 8% by FY2027' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'China Revenue Annual (¥B)',
            data: [
              { period: 'FY2022', value: 45 },
              { period: 'FY2023', value: 62 },
              { period: 'FY2024', value: 78.3 },
              { period: 'FY2025', value: 101.5 },
              { period: 'FY2026E', value: 130 },
            ],
          },
        ],
        tableData: {
          headers: ['Product', 'FY2025 China Revenue', 'Growth', 'Key FY2026 Action', 'Risk'],
          rows: [
            ['XTANDI', '~¥88B', '+27%', 'Lower-tier NRDL deepening', 'NRDL price renegotiation'],
            ['VYLOY', '~¥8B', 'N/M (new)', 'NRDL application H2 FY26', 'Approval timeline'],
            ['Other', '~¥5B', '+15%', 'Supportive care portfolio', 'Low'],
            ['China Total', '¥101.5B', '+29.6%', 'VYLOY NRDL + XTANDI volume', 'NRDL price risk'],
          ],
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // SMT / COST
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'smt-1',
        name: 'SMT Savings Delivery Tracker — ¥40B FY2026 Target',
        category: 'Cost / SMT',
        frequency: 'Monthly',
        description:
          'SMT programme savings delivery: FY2025 ¥21B base, FY2026 ¥40B incremental target, cumulative ¥61B. Workstream tracking: SG&A rationalisation, manufacturing network, procurement savings, portfolio exits. Quarterly delivery milestones. Savings by region and function. Reinvestment in VYLOY/PADCEV launch offset tracking.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'SMT Programme Office / CFO',
        rating: 4.9,
        views: 2800,
        isNew: false,
        isTrending: true,
        relatedConsoleId: 'smt-cost',
        relatedReportIds: ['fin-1', 'fin-2'],
        dataSource: 'SMT Programme Office System / HR / Procurement',
        accessLevel: 'Finance + Executive',
        audience: ['CFO', 'CEO', 'COO', 'IR'],
        tags: ['smt', 'savings', 'cost', 'efficiency', 'margin'],
        nextUpdate: 'Monthly Day 10',
        executiveSummary:
          'FY2025 SMT delivered ¥21B in savings — credibility established. FY2026 target ¥40B incremental: the highest single-year savings target in Astellas\' history. Key FY2026 workstreams: (1) Manufacturing network rationalisation (¥12B+ target); (2) SG&A headcount reduction ex-launch markets (¥15B target); (3) Procurement and API cost reduction (¥8B target); (4) Portfolio exit and licensing adjustments (¥5B). Quarterly tracking against ¥10B/quarter delivery milestone is critical.',
        aiInsight:
          'SMT delivery model projects 80% probability of hitting ¥35B+ by year-end, with upside to ¥48B if manufacturing rationalisation actions (2 planned plant closures) execute on current timeline. SG&A workstream is tracking ahead of plan. Manufacturing actions are the highest uncertainty workstream given regulatory notification requirements.',
        recommendations: [
          'Escalate manufacturing rationalisation workstream: regulatory notification filed and on track?',
          'Track SG&A savings by function and geography monthly — any commercial headcount cuts in launch markets?',
          'Review procurement savings realisation: are API contracts renegotiated and signed?',
          'Brief CFO on SMT quarterly delivery vs ¥10B/quarter milestone for earnings communication',
        ],
        keyMetrics: [
          { label: 'FY2025 SMT Delivered', value: '¥21B', trend: 'up', trendValue: 'FY2025 actuals' },
          { label: 'FY2026 SMT Target', value: '¥40B incremental', trend: 'flat', trendValue: '+90% vs FY2025' },
          { label: 'Cumulative Target FY25–26', value: '¥61B', trend: 'flat', trendValue: 'End of programme' },
          { label: 'Quarterly Delivery Milestone', value: '¥10B/quarter', trend: 'flat', trendValue: 'FY2026 plan' },
          { label: 'Core OP Impact per ¥10B', value: '+0.5pp margin', trend: 'up', trendValue: 'Direct flow-through' },
        ],
        chartData: [
          {
            type: 'bar',
            title: 'SMT Cumulative Savings (¥B)',
            data: [
              { period: 'FY2024', value: 8 },
              { period: 'FY2025', value: 21 },
              { period: 'FY2026 Target', value: 61 },
              { period: 'FY2026 Forecast', value: 56 },
            ],
          },
        ],
        tableData: {
          headers: ['Workstream', 'FY2026 Target (¥B)', 'Q1 FY26 Delivery', 'Confidence', 'Key Risk'],
          rows: [
            ['SG&A Rationalisation', '¥15B', '¥3.8B', 'High', 'Launch market carve-outs'],
            ['Manufacturing Network', '¥12B', '¥2.2B', 'Medium', 'Regulatory notification delays'],
            ['Procurement / API', '¥8B', '¥2.1B', 'High', 'Contract completion timing'],
            ['Portfolio Exits / Licensing', '¥5B', '¥1.4B', 'Medium', 'Deal timing uncertainty'],
            ['SMT Total FY2026', '¥40B', '¥9.5B', 'On Track', 'Manufacturing workstream pace'],
          ],
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // BOARD / INVESTOR RELATIONS
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'ir-1',
        name: 'Board Materials — Quarterly Financial Summary',
        category: 'Financial Performance',
        frequency: 'Quarterly',
        description:
          'Board of Directors quarterly financial summary: Core OP ¥556.4B FY2025 vs FY2026 plan, Core EPS ¥115.26 growth trajectory, Strategic Brands ¥480.3B → ¥610B path, XTANDI IRA risk status, SMT ¥40B delivery progress, China ¥101.5B → ¥130B+, Pipeline POC and Phase 3 status.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'CFO Office / IR Team',
        rating: 4.9,
        views: 2800,
        isNew: false,
        isTrending: false,
        relatedConsoleId: 'financial-performance',
        relatedReportIds: ['fin-1', 'fin-2', 'xtandi-1'],
        dataSource: 'Financial Consolidation',
        accessLevel: 'Leadership Only',
        audience: ['CEO', 'CFO', 'IR Team', 'Board Members'],
        tags: ['board', 'investor-relations', 'guidance', 'strategy', 'quarterly'],
        nextUpdate: 'Before each quarterly earnings release',
        executiveSummary:
          'FY2025: Revenue ¥2,139.2B, Core OP ¥556.4B (26.0% margin), Core EPS ¥115.26 (+17.5% YoY). Strategic Brands ¥480.3B (+43.0% YoY). SMT ¥21B delivered. China ¥101.5B (+29.6%). Three POC successes. FY2026 priorities: Strategic Brands to ¥610B, SMT ¥40B, XTANDI IRA pre-emptive management.',
        aiInsight:
          'Predictive investor model suggests top-3 analyst questions: (1) XTANDI IRA MFP expected rate and Core EPS impact at various scenarios; (2) VYLOY launch trajectory and CLDN18.2 testing adoption in US/Japan/EU; (3) SMT ¥40B FY2026 delivery confidence and workstream status.',
        recommendations: [
          'Lead with Strategic Brands momentum: ¥480.3B +43% demonstrates the post-XTANDI growth engine is real',
          'IRA messaging: MFP not effective until 2028; SMT and Strategic Brands provide full offset at base case',
          'Present VYLOY China NRDL timeline as the key upside catalyst for investor community',
          'Confirm SMT ¥40B delivery plan with quarterly milestones for investor confidence',
        ],
        keyMetrics: [
          { label: 'FY2025 Core EPS', value: '¥115.26', trend: 'up', trendValue: '+17.5% YoY' },
          { label: 'FY2025 Core OP Margin', value: '26.0%', trend: 'up', trendValue: '+2.0pp YoY' },
          { label: 'FY2025 Revenue', value: '¥2,139.2B', trend: 'up', trendValue: '+3.2% YoY (reported)' },
          { label: 'Strategic Brands Growth', value: '+43.0% YoY', trend: 'up', trendValue: '¥480.3B' },
          { label: 'XTANDI IRA Status', value: 'Cycle 2 negotiation', trend: 'flat', trendValue: 'MFP effective Jan 2028' },
        ],
        chartData: [
          {
            type: 'line',
            title: 'Astellas Group Revenue (¥B) Annual',
            data: [
              { period: 'FY2022', value: 1611 },
              { period: 'FY2023', value: 1553 },
              { period: 'FY2024', value: 2073 },
              { period: 'FY2025', value: 2139 },
              { period: 'FY2026E', value: 2178 },
            ],
          },
          {
            type: 'bar',
            title: 'Core EPS Annual (¥/share)',
            data: [
              { period: 'FY2022', value: 62.5 },
              { period: 'FY2023', value: 78.3 },
              { period: 'FY2024', value: 98.1 },
              { period: 'FY2025', value: 115.26 },
              { period: 'FY2026E', value: 138 },
            ],
          },
        ],
        tableData: {
          headers: ['Metric', 'FY2025 Actual', 'FY2026 Target', 'YoY', 'Analyst Consensus'],
          rows: [
            ['Revenue (¥B)', '¥2,139.2B', '¥2,178B+', '+1.8%', '¥2,200B'],
            ['Core OP (¥B)', '¥556.4B', '¥590B+', '+6%', '¥600B'],
            ['Core OP Margin', '26.0%', '26%+', '+0.5pp', '26.5%'],
            ['Core EPS (¥/share)', '¥115.26', '¥135–145', '+17–26%', '¥140'],
            ['Strategic Brands (¥B)', '¥480.3B', '¥610B', '+27%', '¥600B'],
          ],
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // MONTH-END CLOSE FLASH
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'mc-flash',
        name: 'Monthly Close CFO Flash Report',
        category: 'Financial Performance',
        frequency: 'Monthly',
        description:
          'CFO flash: Core OP vs guidance, Core EPS run-rate, XTANDI revenue vs plan, Strategic Brands vs ¥610B target, SMT savings delivery vs ¥40B, China revenue vs ¥130B, USD/JPY rate vs ¥151 plan, R&D spend vs ¥314.8B budget. For CFO review Day 9 of close cycle.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'FP&A',
        rating: 4.8,
        views: 2100,
        isNew: false,
        isTrending: false,
        relatedConsoleId: 'financial-performance',
        relatedReportIds: ['fin-1', 'fin-2', 'xtandi-1'],
        dataSource: 'Financial Consolidation',
        accessLevel: 'Leadership Only',
        audience: ['CFO', 'CEO', 'Controller', 'IR'],
        tags: ['close', 'flash', 'monthly', 'cfo', 'core-op'],
        nextUpdate: 'Monthly Day 9',
      },

      // ══════════════════════════════════════════════════════════════════
      // ESG / SUSTAINABILITY
      // ══════════════════════════════════════════════════════════════════
      {
        companyId,
        externalId: 'esg-1',
        name: 'ESG & Patient Access Progress Dashboard',
        category: 'Sustainability & ESG',
        frequency: 'Quarterly',
        description:
          'Astellas ESG progress: patient access (Access to Medicine Foundation ranking, emerging market access programmes), environmental targets (carbon neutrality 2050, renewable energy), TCFD climate risk disclosure, MSCI/Sustainalytics ESG scores. Workforce diversity and DE&I metrics. Clinical trial transparency and data sharing. Japan Stewardship Code engagement.',
        format: 'PowerBI',
        department: 'Finance',
        owner: 'ESG / Sustainability / IR',
        rating: 4.6,
        views: 1400,
        isNew: false,
        isTrending: false,
        relatedConsoleId: 'sustainability-esg',
        relatedReportIds: ['rd-1'],
        dataSource: 'ESG Reporting / HR / Sustainability Operations',
        accessLevel: 'All Finance',
        audience: ['CEO', 'CFO', 'IR', 'Board', 'ESG Stakeholders'],
        tags: ['esg', 'patient-access', 'sustainability', 'diversity', 'carbon'],
        nextUpdate: 'Quarterly Day 15',
      },
    ],
  });

  console.log('Seeded report templates');
}
