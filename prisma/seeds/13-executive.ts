import { PrismaClient } from '@prisma/client';

export async function seedExecutive(prisma: PrismaClient, companyId: number) {
  console.log('Seeding executive summary & monthly report data...');

  // 1. Executive Narrative (State of the Business)
  await prisma.executiveNarrative.create({
    data: {
      companyId,
      periodLabel: 'Q1 FY25',
      overallStatus: 'Growing',
      statusColor: 'green',
      narrative:
        'Astellas Pharma Inc. delivered a strong Q1 FY25 (April–June 2025) with Core EPS of ¥54.88 (+45% YoY approximately), Total Revenue ¥537.9B (+8.8% YoY), and Core OP ¥130.8B (24.3% Core OP margin). Revenue growth was broad-based: XTANDI ¥240.2B sustained its franchise leadership, Strategic Brands ¥120.1B accelerated driven by PADCEV EV+P first-line urothelial cancer uptake and IZERVAY geographic atrophy growth. FY2025 full-year guidance is maintained: Revenue ¥2,200B, Core OP ¥600B, Core EPS ¥254. Four key strategic catalysts: (1) VYLOY global launch ramp including Japan and China regulatory milestones, (2) SMT programme ¥40B FY2026 savings delivery tracking ahead of plan in early workstreams, (3) XTANDI IRA CMS Medicare negotiation active monitoring — ¥9.6B revenue sensitivity per 1pp price reduction, (4) China revenue ¥101.5B FY2025 accelerating toward ¥150B+ FY2026 target. FX rate ¥151.8/USD in Q1 is broadly in line with ¥151 guidance assumption, providing minimal translation variance. PADCEV EV+P combination continues to displace platinum-based chemotherapy as first-line mUC standard, supporting the Strategic Brands growth trajectory toward ¥610B FY2026.',
      keyAchievements: [
        'Q1 FY25 Revenue ¥537.9B (+8.8% YoY) — all four geographic segments delivered positive growth',
        'XTANDI ¥240.2B Q1 maintained franchise leadership; ex-US volume growth partially offsetting pre-IRA US pricing dynamics',
        'Strategic Brands ¥120.1B Q1 (+43% annualised FY2025 base) — PADCEV EV+P first-line momentum and IZERVAY GA penetration driving upside',
        'SMT savings programme tracking on schedule — Q1 FY25 workstream milestones met; ¥40B full-year target confidence maintained',
        'VYLOY Japan NHI reimbursement secured Q1 FY25 and China NMPA submission filed for gastric cancer — global launch expansion on track',
      ],
      concerns: [
        'XTANDI IRA CMS negotiation timeline uncertainty — price reduction magnitude and effective date create ¥50B+ revenue headwind risk for FY2026',
        'ARSi competitive pressure from darolutamide and apalutamide intensifying in earlier-line prostate cancer indications — market share monitoring required',
        'VYLOY global launch execution risk — simultaneous Japan, China, and EU regulatory milestones create operational complexity; any 6-month approval delay reduces FY2026 contribution by ¥20B+',
        'Yen appreciation risk — BOJ rate normalisation trajectory could strengthen JPY beyond ¥148 vs ¥151 guidance, creating translational revenue headwind of ¥3B+ per ¥1 move',
      ],
    },
  });
  console.log('  Executive narrative seeded');

  // 2. Business Pillars (4 pillars used by both Executive Summary and Monthly Report)
  const pillars = [
    {
      externalId: 'commercial',
      label: 'XTANDI Franchise',
      value: '¥240.2B Q1 Revenue',
      change: 5.3,
      target: '≥¥960B FY25 Annualised',
      status: 'above',
      color: 'green',
      keyInsight:
        'XTANDI ¥240.2B Q1 FY25 sustains ARSi class leadership; ex-US volume growth +8% partially offsetting US pricing dynamics; IRA CMS negotiation active — ¥9.6B per 1pp price sensitivity is key monitoring item',
      actionRequired: false,
      metrics: [
        { label: 'XTANDI Revenue Q1 FY25', value: '¥240.2B', change: 5.3, vsTarget: 'On track Q1' },
        { label: 'ARSi Global Market Share', value: '>50%', change: 0.0, vsTarget: 'Class leadership maintained' },
      ],
      forecast:
        'XTANDI on track for ¥960B+ FY25; FY2026 trajectory depends on IRA negotiated price magnitude — base case ¥772B with 25pp price reduction offset by volume growth',
      sparkline: [215.8, 228.4, 235.9, 226.8, 240.2],
      subMetrics: [
        { name: 'IRA Sensitivity', value: '¥9.6B per 1pp cut' },
        { name: 'ex-US Growth', value: '+8% YoY' },
      ],
      sortOrder: 1,
    },
    {
      externalId: 'operational',
      label: 'Strategic Brands',
      value: '¥120.1B Q1 Revenue',
      change: 43.0,
      target: '¥610B FY2026',
      status: 'above',
      color: 'green',
      keyInsight:
        'Strategic Brands ¥120.1B Q1 FY25 (¥480.3B FY2025 annualised, +43%) led by PADCEV EV+P 1L mUC penetration (+34.8% FY2025), IZERVAY geographic atrophy ramp (+226% FY2025), and VYLOY gastric cancer launch momentum; ¥610B FY2026 target requires sustained +27% portfolio growth',
      actionRequired: false,
      metrics: [
        { label: 'Strategic Brands Q1 FY25', value: '¥120.1B', change: 43.0, vsTarget: '+43% YoY FY2025 base' },
        { label: 'PADCEV Q1 FY25', value: '¥55.3B', change: 34.8, vsTarget: 'Above plan' },
      ],
      forecast:
        'Strategic Brands ¥610B FY2026 target achievable if VYLOY EU/China approvals on schedule, IZERVAY sustains >40% GA market share, and PADCEV EV+P 1L penetration reaches 35%+',
      sparkline: [75.2, 88.6, 102.4, 94.8, 120.1],
      subMetrics: [
        { name: 'IZERVAY FY2025', value: '¥77.6B (+226%)' },
        { name: 'VYLOY FY2025', value: '¥63.1B (new)' },
      ],
      sortOrder: 2,
    },
    {
      externalId: 'financial',
      label: 'Core EPS & FCF',
      value: '¥54.88 Q1 Core EPS',
      change: 49.8,
      target: '¥256.77 FY2026',
      status: 'above',
      color: 'green',
      keyInsight:
        'Q1 FY25 Core EPS ¥54.88 (+45% YoY approximately); FCF ¥560.2B FY2025; dividend ¥78/share maintained; net cash positive balance sheet; FY2025 Core EPS ¥237.01 (+49.8% FY2025); FY2026 guidance ¥256.77 (+8.3%)',
      actionRequired: false,
      metrics: [
        { label: 'Core EPS Q1 FY25', value: '¥54.88', change: 45.0, vsTarget: 'Tracking FY25 guidance' },
        { label: 'FCF FY2025', value: '¥560.2B', change: 18.0, vsTarget: 'Above plan' },
      ],
      forecast:
        'FY2025 Core EPS ¥254 guidance achievable; FY2026 ¥256.77 guidance maintained; IRA headwind is primary downside risk to FY2026 EPS delivery',
      sparkline: [38.2, 42.6, 48.4, 45.8, 54.88],
      subMetrics: [
        { name: 'Dividend', value: '¥78/share FY2025' },
        { name: 'ROE', value: '17.4% FY2025' },
      ],
      sortOrder: 3,
    },
    {
      externalId: 'risk',
      label: 'IRA & Regulatory Risk',
      value: '2 Watch Items',
      change: 0.0,
      target: '0 critical issues',
      status: 'on-track',
      color: 'yellow',
      keyInsight:
        'XTANDI CMS IRA Medicare negotiation is the primary enterprise risk — ¥9.6B per 1pp price sensitivity, ¥50B+ FY2026 headwind scenario; ARSi competitive dynamics secondary risk; FX ¥151 guidance baseline monitoring',
      actionRequired: true,
      metrics: [
        { label: 'IRA Revenue Risk', value: '¥9.6B/1pp sensitivity', change: 0, vsTarget: 'Active monitoring' },
        { label: 'ARSi Competition', value: '>50% market share', change: 0, vsTarget: 'Monitor darolutamide' },
      ],
      forecast:
        'XTANDI ex-US volume growth and Strategic Brands acceleration are the primary IRA headwind offsets; FY2026 Core OP ¥620B guidance absorbs ¥50B IRA headwind if SMT ¥40B is delivered',
      sparkline: [1, 2, 2, 2, 2],
      subMetrics: [
        { name: 'IRA Sensitivity', value: '¥9.6B per 1pp' },
        { name: 'FX Baseline', value: '¥151 USD/JPY' },
      ],
      sortOrder: 4,
    },
  ];

  for (const p of pillars) {
    await prisma.businessPillar.create({
      data: { companyId, periodLabel: 'Q1 FY25', ...p },
    });
  }
  console.log(`  ${pillars.length} business pillars seeded`);

  // 3. Critical Actions (5 decisions used by Executive Summary)
  const criticalActions = [
    {
      title: 'Execute XTANDI IRA Negotiation Strategy to Minimise CMS Price Reduction',
      businessOutcome: 'Financial',
      priority: 'critical',
      urgency: 'immediate',
      dueDate: '2025-09-30',
      impact: 'Each 1pp CMS negotiated price reduction = −¥9.6B revenue; base case ¥50B+ FY2026 headwind; minimising reduction magnitude is the single highest-value action available',
      financialImpact: '5pp price reduction = −¥48B revenue (−¥20B Core OP at 42% margin); 25pp = −¥240B revenue requiring full Strategic Brands offset to hold ¥620B Core OP guidance',
      riskAssessment: 'Critical — CMS negotiation outcome is the largest binary risk in the Astellas FY2026 earnings bridge; strong QALY and cost-effectiveness data for XTANDI provides negotiating leverage but negotiated prices historically 30–60% below list for large oncology products',
      owner: 'CEO / Government Affairs / Medical Affairs / CFO',
      status: 'in-progress',
      category: 'Strategic',
      stakeholders: ['CEO', 'CFO', 'Government Affairs', 'Medical Affairs', 'Legal', 'IR', 'Pfizer Co-Promotion'],
      dependencies: ['CMS negotiation timeline and process milestones', 'XTANDI cost-effectiveness evidence package', 'Pfizer co-promotion alignment on IRA strategy', 'ex-US volume offset plan activation'],
      sortOrder: 1,
    },
    {
      title: 'Accelerate VYLOY Global Launch Excellence in Gastric Cancer',
      businessOutcome: 'Commercial',
      priority: 'critical',
      urgency: 'urgent',
      dueDate: '2025-09-30',
      impact: 'VYLOY FY2025 ¥63.1B (first year) targeting ¥100B+ FY2026 annualised; China NMPA and EU EMA approval milestones critical to ¥610B Strategic Brands target',
      financialImpact: 'Each 6-month delay in China NMPA approval = −¥20B+ VYLOY revenue vs plan; EU approval delay similarly removes ¥15B–¥20B; missing VYLOY ¥100B FY2026 target undermines ¥610B Strategic Brands guidance',
      riskAssessment: 'High — simultaneous China NMPA, EU EMA, and Japan NHI listing milestones require parallel regulatory and market access execution; gastric cancer market in China is the world\'s largest opportunity with approximately 500,000 new cases annually',
      owner: 'Chief Commercial Officer / International Business Unit / Regulatory Affairs',
      status: 'in-progress',
      category: 'Operational',
      stakeholders: ['CCO', 'International BU', 'Regulatory Affairs', 'Medical Affairs', 'Market Access', 'Japan BU', 'China BU'],
      dependencies: ['China NMPA regulatory review timeline', 'EU EMA approval timeline', 'Japan NHI formulary listing', 'CLDN18.2 companion diagnostic commercial availability', 'Field force training completion'],
      sortOrder: 2,
    },
    {
      title: 'Deliver SMT FY2026 ¥40B Savings Roadmap — ¥19B Incremental vs FY2025',
      businessOutcome: 'Financial',
      priority: 'high',
      urgency: 'urgent',
      dueDate: '2026-03-31',
      impact: '¥40B FY2026 SMT target is the primary lever delivering Core OP margin expansion to 27.9% from 26.0%; each ¥1B savings shortfall = −¥1B Core OP — a direct EPS drag of approximately ¥0.4',
      financialImpact: 'Full ¥40B delivery = 190bps Core OP margin expansion; SMT shortfall of ¥5B → Core OP ¥615B vs ¥620B guidance midpoint; must not cannibalise VYLOY or IZERVAY launch investment budgets',
      riskAssessment: 'Medium — ¥21B FY2025 delivery demonstrated programme credibility; ¥19B incremental step-up requires manufacturing network and R&D portfolio workstreams that carry regulatory and portfolio decision dependencies; execution confidence approximately 75%–80%',
      owner: 'CFO / COO / Chief Strategy Officer',
      status: 'in-progress',
      category: 'Financial',
      stakeholders: ['CFO', 'COO', 'HR', 'Manufacturing', 'R&D', 'Finance', 'IR'],
      dependencies: ['Manufacturing network rationalisation regulatory site approvals', 'R&D pipeline prioritisation decisions Q2 FY25', 'SG&A headcount programme design finalisation', 'Launch investment budget ring-fencing confirmation'],
      sortOrder: 3,
    },
    {
      title: 'Execute Strategic Brands ¥610B FY2026 Portfolio Roadmap',
      businessOutcome: 'Commercial',
      priority: 'high',
      urgency: 'planned',
      dueDate: '2026-03-31',
      impact: 'Strategic Brands ¥610B FY2026 (+27% vs ¥480.3B FY2025) is the primary revenue growth engine and XTANDI IRA headwind offset; PADCEV, VYLOY, IZERVAY, and VEOZAH must collectively contribute ¥130B+ incremental revenue',
      financialImpact: '¥610B target represents ¥130B incremental FY2026 revenue vs FY2025 ¥480.3B; at 42% Core OP contribution margin, this adds ¥55B Core OP — critical to absorbing IRA headwind and achieving ¥620B guidance',
      riskAssessment: 'Medium — PADCEV EV+P trajectory is high-confidence (+35% growth visible); VYLOY regulatory milestone risk is highest concentration risk; IZERVAY competitive share risk from Apellis Syfovre; VEOZAH managed care coverage expansion is a swing factor',
      owner: 'Chief Commercial Officer / Global Brand Teams',
      status: 'in-progress',
      category: 'Strategic',
      stakeholders: ['CCO', 'US BU', 'International BU', 'Japan BU', 'China BU', 'Market Access', 'Finance', 'IR'],
      dependencies: ['VYLOY global regulatory approvals (China, EU)', 'PADCEV EV+P first-line penetration >35%', 'IZERVAY >40% GA market share maintenance', 'VEOZAH managed care coverage >80%'],
      sortOrder: 4,
    },
    {
      title: 'Accelerate China ¥150B+ Revenue Growth — VYLOY and XTANDI Volume Expansion',
      businessOutcome: 'Commercial',
      priority: 'medium',
      urgency: 'planned',
      dueDate: '2026-03-31',
      impact: 'China ¥101.5B FY2025 → ¥150B+ FY2026 (+48% YoY) requires VYLOY NMPA approval and XTANDI NHSA deeper penetration; +¥1.0B revenue per 1pp China growth; China is highest-leverage geographic growth market',
      financialImpact: '¥150B FY2026 target vs ¥101.5B FY2025 = ¥48.5B incremental China revenue (+48%); primary contributor is VYLOY gastric cancer launch (¥20B–¥30B if approved H1 FY25) and XTANDI volume from Tier 2–3 hospital expansion',
      riskAssessment: 'Medium — NMPA approval risk is the primary gating factor for VYLOY China contribution; XTANDI NHSA volume growth is more predictable (+18% FY2025 demonstrates trajectory); China commercial infrastructure requires rapid expansion to support multi-product launch',
      owner: 'China Business Unit / International Strategy',
      status: 'in-progress',
      category: 'Operational',
      stakeholders: ['China BU', 'International BU', 'Regulatory Affairs', 'Market Access', 'Finance'],
      dependencies: ['VYLOY NMPA regulatory approval timeline', 'China XTANDI NHSA reimbursement expansion to Tier 3 hospitals', 'NHSA drug price negotiation cycle outcomes', 'China commercial field force hiring plan'],
      sortOrder: 5,
    },
  ];

  for (const a of criticalActions) {
    await prisma.criticalAction.create({ data: { companyId, ...a } });
  }
  console.log(`  ${criticalActions.length} critical actions seeded`);

  // 4. Forward Insights (4 items used by Monthly Report)
  const forwardInsights = [
    {
      type: 'opportunity',
      title: 'VYLOY Global Launch Ramp — China NMPA Approval Could Add ¥25B+ to FY2026 Revenue',
      insight:
        'VYLOY (zolbetuximab) generated ¥63.1B in its first full year FY2025, establishing the CLDN18.2-targeted therapy as a new standard of care in gastric/GEJ adenocarcinoma. China NMPA approval in H1 FY25 would unlock the world\'s largest gastric cancer market (approximately 500,000 new cases annually). Consensus models conservatively assume ¥80B VYLOY in FY2026 — successful China launch plus EU EMA approval would drive upside toward ¥110B–¥120B, adding ¥30B–¥40B above consensus and supporting the ¥610B Strategic Brands target with significant cushion.',
      impact: '¥25B–¥40B VYLOY revenue upside vs consensus if China NMPA approval obtained H1 FY25',
      timeframe: 'H1 FY25 (April–September 2025)',
      confidence: 'High',
    },
    {
      type: 'opportunity',
      title: 'SMT Outperformance — Potential ¥45B+ FY2026 Delivery vs ¥40B Target',
      insight:
        'Q1 FY25 SMT programme workstream tracking suggests run-rate savings are slightly ahead of the linear path to ¥40B. If SG&A rationalisation workstreams deliver 110% of plan (consistent with FY2025 beating ¥20B target at ¥21B), full-year savings could reach ¥44B–¥46B — a ¥4B–¥6B beat versus guidance. At ¥1B SMT = ¥1B Core OP, an SMT outperformance scenario delivers Core OP ¥624B–¥626B versus ¥620B guidance, improving Core EPS by approximately ¥2–¥3 versus guidance midpoint. This is the lowest-risk upside path to EPS outperformance.',
      impact: '¥4B–¥6B Core OP upside vs guidance if SMT delivers ¥44B–¥46B vs ¥40B target',
      timeframe: 'Full-year FY2025 (September–March 2026)',
      confidence: 'Medium',
    },
    {
      type: 'risk',
      title: 'XTANDI IRA Price Reduction Exceeds ¥50B — Core OP Guidance at Risk',
      insight:
        'If CMS Medicare negotiates XTANDI pricing at a 30pp+ reduction versus current list price (above the base case assumption), the FY2026 revenue headwind would exceed ¥288B, significantly compressing XTANDI\'s contribution and placing Core OP ¥620B guidance at risk unless Strategic Brands deliver above ¥640B. At 40pp price reduction, XTANDI revenue declines to approximately ¥576B (vs ¥960.8B FY2025), requiring a ¥384B revenue replacement from Strategic Brands — approximately ¥130B above the ¥610B FY2026 target. This scenario would require FY2027 Core OP guidance reduction unless SMT savings accelerate substantially.',
      impact: 'Each 5pp IRA price reduction above base case = −¥48B revenue, −¥20B Core OP, approximately −¥8–¥9 Core EPS',
      timeframe: 'H2 FY25 (October 2025–March 2026, effective from Jan 2026)',
      confidence: 'Medium',
    },
    {
      type: 'risk',
      title: 'Yen Appreciation to ¥140 vs ¥151 Guidance — Potential −¥23B Revenue Headwind',
      insight:
        'BOJ interest rate normalisation (ongoing rate hikes from FY2024) creates structural yen appreciation pressure. If USD/JPY moves to ¥140 (approximately ¥11 stronger than ¥151 guidance), Astellas FY2025 Revenue would face approximately −¥23B translation headwind on USD-denominated revenue (US is 44% of revenue). Core OP impact would be approximately −¥9B at current margin structure. This scenario is plausible given BOJ rate trajectory and JPY short positioning unwind that characterised 2024 FX dynamics. Natural hedging covers approximately 33% of USD exposure, limiting the net income impact.',
      impact: 'Yen ¥10 stronger than ¥151 guidance (→¥141) = −¥21B revenue, approximately −¥8B Core OP',
      timeframe: 'H2 FY25 (October 2025–March 2026)',
      confidence: 'Low-Medium',
    },
  ];

  for (const fi of forwardInsights) {
    await prisma.forwardInsight.create({ data: { companyId, ...fi } });
  }
  console.log(`  ${forwardInsights.length} forward insights seeded`);

  // 5. Executive Briefing (AI briefing for Executive Summary page)
  await prisma.executiveBriefing.create({
    data: {
      companyId,
      periodLabel: 'Q1 FY25',
      summary:
        'Q1 FY25 (April–June 2025) Core EPS ¥54.88 (+45% YoY approximately), Revenue ¥537.9B (+8.8% YoY), Core OP ¥130.8B (24.3% Core OP margin). FY2025 full-year guidance maintained: Revenue ¥2,200B, Core OP ¥600B, Core EPS ¥254. Strategic Brands ¥120.1B Q1 (+43% FY2025 base) led by PADCEV EV+P first-line urothelial cancer and IZERVAY geographic atrophy momentum. XTANDI ¥240.2B sustains ARSi class leadership with IRA CMS negotiation as primary H2 monitoring item (¥9.6B per 1pp sensitivity). SMT programme on track; VYLOY global launch on schedule; China growth trajectory toward ¥150B+ FY2026 target intact. Key FX monitoring: ¥151.8 Q1 average broadly on guidance baseline of ¥151.',
      keyHighlights: [
        { type: 'positive', text: 'Q1 FY25 Revenue ¥537.9B (+8.8% YoY) — broad-based growth across all four geographic segments' },
        { type: 'positive', text: 'Core EPS ¥54.88 Q1 (+45% YoY approx); FY2025 Core EPS ¥237.01 (+49.8%) — the strongest annual EPS growth in a decade' },
        { type: 'positive', text: 'Strategic Brands ¥120.1B Q1 — PADCEV EV+P 1L mUC penetration and IZERVAY GA growth tracking toward ¥610B FY2026 target' },
        { type: 'positive', text: 'SMT ¥21B FY2025 savings delivered; Q1 FY25 tracking on schedule toward ¥40B FY2026 annual target — direct ¥1B Core OP per ¥1B savings' },
        { type: 'warning', text: 'XTANDI IRA CMS Medicare negotiation active — ¥9.6B revenue sensitivity per 1pp price cut; ¥50B+ FY2026 headwind is base case scenario requiring ex-US and Strategic Brands offset' },
        { type: 'warning', text: 'VYLOY China NMPA approval pending — 6-month delay reduces FY2026 VYLOY revenue by ¥20B+ vs plan and strains ¥610B Strategic Brands target' },
      ],
      recommendations: [
        'Prioritise XTANDI IRA negotiation strategy with comprehensive QALY and cost-effectiveness evidence package — submission to CMS by Q2 FY25 is critical to maximising negotiating position',
        'Establish VYLOY global launch excellence dashboard with weekly milestone tracking across China NMPA, EU EMA, and Japan NHI approval pathways',
        'Validate SMT ¥40B workstream-level delivery plan for H2 FY25 — confirm manufacturing network rationalisation and R&D prioritisation savings are on schedule before quarterly investor update',
      ],
    },
  });
  console.log('  Executive briefing seeded');

  // 6. Business Insights (6 detailed insights for Executive Summary)
  const businessInsights = [
    {
      category: 'Oncology',
      businessOutcome: 'Financial',
      title: 'XTANDI IRA Risk Quantification: ¥9.6B per 1pp — Base Case ¥50B+ FY2026 Headwind',
      metric: 'XTANDI IRA Revenue Sensitivity (¥B per 1pp)',
      change: 5.3,
      status: 'high',
      insight:
        'XTANDI\'s CMS Medicare Part D price negotiation under IRA Section 1192 is the single largest risk item in Astellas\'s FY2026 earnings bridge. The ¥9.6B per 1pp revenue sensitivity reflects XTANDI\'s approximately ¥720B US revenue base and Medicare\'s approximately 40% share of US prostate cancer patients. The ¥50B+ base case assumes approximately 5pp negotiated price reduction — consistent with initial CMS negotiation guidance for large-market oncology products. A 25pp reduction (mid-range for large molecules) would create a −¥240B headwind, requiring Strategic Brands to deliver ¥750B (above the ¥610B target) to maintain Core OP ¥620B guidance. Ex-US XTANDI volume growth of +10% provides approximately ¥24B offset annually.',
      drivers: [
        'CMS Medicare Part D Price Negotiation Outcome (IRA Section 1192)',
        'XTANDI US Medicare Market Share (~40% of US patients)',
        'ex-US XTANDI Volume Growth Rate as Offset Mechanism',
        'Strategic Brands Revenue Acceleration as Primary Buffer',
      ],
      actions: [
        'Submit XTANDI cost-effectiveness QALY analysis to CMS negotiation process by Q2 FY25',
        'Activate ex-US XTANDI volume acceleration plan targeting +12% growth in Established Markets and China',
      ],
      relatedMetrics: { xtandiRevenueFY2025: '¥960.8B', iraSensitivity: '¥9.6B per 1pp', fy2026HeadwindBase: '¥50B+' },
      sortOrder: 1,
    },
    {
      category: 'Strategic Brands',
      businessOutcome: 'Commercial',
      title: 'Strategic Brands ¥480.3B → ¥610B Path: PADCEV + VYLOY + IZERVAY Execution',
      metric: 'Strategic Brands Revenue (¥B)',
      change: 43.0,
      status: 'high',
      insight:
        'Strategic Brands grew from ¥335.5B FY2024 to ¥480.3B FY2025 (+43%), driven by three simultaneous product launches and PADCEV EV+P first-line mUC approval. The ¥610B FY2026 target requires ¥129.7B incremental portfolio revenue — achievable through PADCEV +¥60B (EV+P 1L penetration), VYLOY +¥40B (China + EU), IZERVAY +¥20B (GA market depth), and VEOZAH +¥15B (managed care access). Q1 FY25 Strategic Brands ¥120.1B run-rate implies approximately ¥480B annualised — below ¥610B target, requiring H2 acceleration as VYLOY global approvals and PADCEV 1L penetration ramp. Each +1pp Strategic Brands growth = +¥4.8B revenue.',
      drivers: [
        'PADCEV EV+P First-Line mUC Penetration Rate (Target >35%)',
        'VYLOY China NMPA and EU EMA Approval Milestones',
        'IZERVAY Geographic Atrophy >40% Market Share Maintenance',
        'VEOZAH Managed Care Coverage Expansion >80%',
      ],
      actions: [
        'Implement weekly VYLOY global launch tracker including regulatory milestone dates, field force readiness, and payer access progress',
        'Analyse PADCEV EV+P 1L market share data versus darolutamide and cisplatin-based regimens — confirm Q2 FY25 penetration trajectory',
      ],
      relatedMetrics: { strategicBrandsFY2025: '¥480.3B', fy2026Target: '¥610B', incrementalRequired: '¥129.7B' },
      sortOrder: 2,
    },
    {
      category: 'Cost Transformation',
      businessOutcome: 'Financial',
      title: 'SMT ¥21B → ¥40B: ¥19B Incremental Step-Up Requires Accelerated Workstream Delivery',
      metric: 'SMT Annual Savings (¥B)',
      change: 90.5,
      status: 'high',
      insight:
        'The FY2025 SMT ¥21B delivery confirmed programme credibility and exceeded the ¥20B initial target by ¥1B. FY2026 ¥40B target requires ¥19B incremental savings — a 90% step-up requiring three parallel workstream accelerations: SG&A headcount optimisation (+¥6B vs FY2025), manufacturing network rationalisation (+¥6B, dependent on regulatory approvals), and R&D portfolio prioritisation (+¥7B from asset decisions). Early Q1 FY25 indicators suggest SG&A workstreams are tracking ahead of plan, while manufacturing savings carry 3–4 month execution lag risk from regulatory dependencies. Protection of VYLOY and IZERVAY launch investment is non-negotiable — any SMT programme encroachment on launch budgets would undermine ¥610B Strategic Brands target.',
      drivers: [
        'SG&A Headcount and Procurement Efficiency Workstreams',
        'Manufacturing Network Rationalisation (Regulatory Site Approvals Dependent)',
        'R&D Portfolio Prioritisation Decisions Q2 FY25',
        'Launch Investment Budget Ring-Fencing for VYLOY and IZERVAY',
      ],
      actions: [
        'Confirm Q2 FY25 manufacturing site rationalisation regulatory submission timeline — delays beyond Q3 FY25 risk ¥6B savings shortfall',
        'Present SMT workstream-level FY2026 delivery bridge to Board — including launch investment budget carve-out confirmation',
      ],
      relatedMetrics: { smtFY2025: '¥21B', smtFY2026Target: '¥40B', incrementalRequired: '¥19B' },
      sortOrder: 3,
    },
    {
      category: 'International Growth',
      businessOutcome: 'Commercial',
      title: 'China ¥101.5B → ¥150B+ FY2026: VYLOY NMPA + XTANDI Tier 2–3 Hospital Expansion',
      metric: 'China Revenue (¥B)',
      change: 29.6,
      status: 'high',
      insight:
        'China revenue growth of 29.6% in FY2025 confirms Astellas\'s position as a leading international oncology company in the Chinese market. The path to ¥150B+ in FY2026 (+48% YoY) is anchored by two parallel drivers: (1) VYLOY NMPA approval unlocking the world\'s highest gastric cancer incidence market (approximately 500,000 new cases/year) with potential ¥20B–¥30B first-year China contribution, and (2) XTANDI NHSA deeper hospital penetration — currently expanding from Tier 1–2 into Tier 3 hospital networks across provincial capitals. Each 1pp China growth = +¥1.0B revenue — the highest per-unit revenue leverage in Astellas\'s geographic portfolio. China gross margin is currently below global average due to NHSA negotiated pricing, but improving with scale.',
      drivers: [
        'VYLOY China NMPA Regulatory Approval Timeline',
        'XTANDI NHSA Reimbursement Expansion to Tier 3 Hospitals',
        'China Commercial Field Force Hiring and Training Plan',
        'NHSA Drug Price Negotiation Cycle Outcomes for New Products',
      ],
      actions: [
        'Confirm VYLOY NMPA approval timeline from regulatory affairs — June 2025 target; contingency plan if delayed to H2 FY25',
        'Present China ¥150B+ execution roadmap to Board including XTANDI hospital expansion map and VYLOY launch KPI targets',
      ],
      relatedMetrics: { chinaRevenueFY2025: '¥101.5B', chinaGrowthFY2025: '+29.6%', fy2026Target: '¥150B+' },
      sortOrder: 4,
    },
    {
      category: 'FX & Macro',
      businessOutcome: 'Financial',
      title: 'FX Sensitivity: ¥151 Baseline — BOJ Normalisation Creates Yen Appreciation Risk',
      metric: 'USD/JPY Exchange Rate',
      change: 0.0,
      status: 'medium',
      insight:
        'Astellas FY2025 guidance assumes ¥151 USD/JPY and ¥163 EUR/JPY. The Q1 FY25 average of ¥151.8/USD provided a ¥1.7B minimal revenue tailwind versus guidance. The structural risk is yen appreciation driven by BOJ rate normalisation — each ¥1 yen appreciation versus USD reduces revenue by ¥2.1B and Core OP by approximately ¥0.9B. A scenario of ¥140/USD (¥11 stronger than guidance) would reduce FY2025 Revenue by ¥23B and Core OP by ¥9.7B — compressing Core OP margin by approximately 43bps. Natural hedging through USD R&D and manufacturing costs provides approximately 33% coverage. Yen strengthening beyond ¥145 requires Board-level FX risk monitoring.',
      drivers: [
        'Bank of Japan Rate Normalisation Trajectory (Rate Hike Path FY2025)',
        'USD/JPY Spot Rate vs ¥151 Guidance Baseline',
        'EUR/JPY Rate vs ¥163 Guidance Baseline (26% of Revenue in EU)',
        'Natural Hedging Coverage Ratio Enhancement Through USD Cost Expansion',
      ],
      actions: [
        'Implement ¥145/USD early-warning trigger for Board FX risk escalation — current ¥151.8 provides limited cushion versus BOJ rate normalisation',
        'Review natural hedging coverage ratio — increasing USD R&D and manufacturing costs from FY2026 pipeline investment would improve coverage',
      ],
      relatedMetrics: { fxGuidance: '¥151 USD/JPY', revenueSensitivity: '+¥2.1B per ¥1', q1AverageRate: '¥151.8' },
      sortOrder: 5,
    },
    {
      category: 'R&D Pipeline',
      businessOutcome: 'Strategic',
      title: 'Pipeline POC Programme: 3 FY2025 POCs — Phase 3 Initiations FY2026 De-risk Post-XTANDI',
      metric: 'Annual POC Achievements (count)',
      change: 0.0,
      status: 'medium',
      insight:
        'Astellas achieved 3 POC milestones in FY2025, meeting the mid-term plan target for the second consecutive year. These assets are targeted for Phase 3 initiation in FY2026 (H1 starts maximise data readout for FY2028+ regulatory submissions). The pipeline POC programme is Astellas\'s primary organic mechanism to de-risk XTANDI patent cliff exposure from FY2028–FY2030. At a 15% Phase 3-to-approval success probability per asset, 3 annual POCs compound to a probability-weighted pipeline with approximately ¥300B–¥500B NPV — meaningful optionality for the post-XTANDI revenue profile. BD in-licensing is a parallel track: a ¥100B–¥200B approved asset acquisition would more immediately address concentration risk.',
      drivers: [
        'FY2025 POC Asset Phase 3 Initiation Timing (H1 vs H2 FY2026)',
        'Oncology ADC and Immunotherapy Assets Adjacent to PADCEV Franchise',
        'Rare Kidney Disease Gene Therapy Programme Regulatory Pathway',
        'BD In-Licensing Pipeline Evaluation for Late-Stage Oncology Assets',
      ],
      actions: [
        'Confirm Phase 3 initiation timelines for all 3 FY2025 POC assets — H1 FY26 starts are preferred for data readout alignment with FY2028 regulatory windows',
        'Evaluate FDA Breakthrough Therapy or Orphan Drug designation eligibility for each Phase 3 asset to compress approval timelines by 1–2 years',
      ],
      relatedMetrics: { pocAchievementsFY2025: '3', phase3InitiationsFY2026: 'Planned (multiple)', xtandiPatentCliff: 'FY2028–FY2030' },
      sortOrder: 6,
    },
  ];

  for (const bi of businessInsights) {
    await prisma.businessInsight.create({ data: { companyId, ...bi } });
  }
  console.log(`  ${businessInsights.length} business insights seeded`);

  // 7. Risk & Opportunities (for Executive Summary)
  const riskOpps = [
    {
      type: 'risk',
      title: 'IRA XTANDI Price Reduction >25pp — Core OP Guidance at Risk, Strategic Brands Must Offset',
      probability: 'Medium',
      impact: 'Each 5pp IRA price reduction = −¥48B revenue and −¥20B Core OP; at 30pp reduction, XTANDI revenue declines to ~¥672B, requiring Strategic Brands to deliver ¥680B+ to maintain ¥620B Core OP guidance',
      mitigation: 'Engage CMS with comprehensive cost-effectiveness and QALY data; activate ex-US XTANDI volume acceleration targeting +12% growth; ensure Strategic Brands ¥610B target has ¥30B buffer capacity above base case plan',
      trend: 'increasing',
      sortOrder: 1,
    },
    {
      type: 'risk',
      title: 'ARSi Competitive Share Loss — Darolutamide and Apalutamide Earlier-Line Penetration',
      probability: 'Low-Medium',
      impact: 'Each 1pp XTANDI ARSi market share loss = approximately −¥10B revenue annually; if darolutamide captures 5pp ARSi share in nmHSPC indication over 18 months, XTANDI revenue headwind of −¥50B compounds the IRA pricing impact',
      mitigation: 'Strengthen XTANDI label with combination data (PARP inhibitor partnerships); expand into earlier-line combination settings; leverage Pfizer co-promotion field force for oncologist relationship intensity in key accounts',
      trend: 'stable',
      sortOrder: 2,
    },
    {
      type: 'opportunity',
      title: 'VYLOY China NMPA Approval — ¥25B–¥30B FY2026 Revenue Upside vs Consensus',
      probability: 'High',
      impact: 'VYLOY China approval H1 FY25 unlocks world\'s largest gastric cancer market (~500,000 new cases/year); consensus models ¥80B FY2026 VYLOY — China addition drives ¥105B–¥120B scenario, adding ¥25B–¥40B above consensus and cushioning Strategic Brands ¥610B target',
      action: 'Confirm NMPA approval timeline from regulatory affairs; pre-position China field force training and HCP education programme; align NHSA price negotiation strategy for VYLOY gastric cancer prior to launch',
      trend: 'increasing',
      sortOrder: 3,
    },
    {
      type: 'opportunity',
      title: 'SMT Programme Outperformance — ¥44B–¥46B Delivery vs ¥40B Target, +¥4B Core OP',
      probability: 'Medium',
      impact: 'FY2025 SMT beat (¥21B vs ¥20B target) and Q1 FY25 SG&A workstream tracking ahead of plan support ¥44B–¥46B FY2026 scenario; at ¥1B SMT = ¥1B Core OP, this adds ¥4B–¥6B Core OP above guidance midpoint — partially offsetting any IRA headwind realisation',
      action: 'Validate Q2 FY25 SMT run-rate with workstream owners; if SG&A savings are tracking ¥2B+ ahead of plan, increase manufacturing workstream ambition to capture ¥44B total — maintain launch investment ring-fence as non-negotiable constraint',
      trend: 'increasing',
      sortOrder: 4,
    },
  ];

  for (const ro of riskOpps) {
    await prisma.riskOpportunity.create({ data: { companyId, ...ro } });
  }
  console.log(`  ${riskOpps.length} risk/opportunities seeded`);

  console.log('Executive data seeding complete!');
}
