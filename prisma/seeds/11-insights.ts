import { PrismaClient } from '@prisma/client';

// =============================================================================
// 14 personalized insights for Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY)
//
// SOURCE: Astellas Pharma Inc. FY2025 Annual Results (May 2025),
//   FY2026 Full-Year Guidance, Q1 FY25 Quarterly Earnings (August 2025),
//   CMS IRA Section 1192 Medicare negotiation filings,
//   Astellas SMT programme progress reports.
//
// Insights span executive categories: Financial Performance, Oncology,
// Strategic Brands, Cost Transformation, FX & Macro, International Growth,
// Capital Allocation, R&D Pipeline.
// Console links use the Astellas console slug taxonomy implemented in
// 12-business-consoles.ts.
// =============================================================================

export async function seedInsights(prisma: PrismaClient, companyId: number) {
  const insights = [
    {
      title: 'FY2025 Core EPS ¥237.01 (+49.8% YoY) — FY2026 Guidance ¥256.77 (+8.3% Growth Path)',
      category: 'Financial Performance',
      kpiValue: '¥237.01',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas Pharma delivered FY2025 Core EPS of ¥237.01, up 49.8% YoY from ¥158.24 in FY2024, driven by XTANDI franchise strength (¥960.8B, +5.3%), Strategic Brands acceleration to ¥480.3B (+43%), and SMT savings of ¥21B. Enterprise Revenue ¥2,139.2B (+11.9%), Core OP ¥555.7B (26.0% margin). FY2026 guidance of Core EPS ¥256.77 (+8.3%) reflects XTANDI IRA negotiation headwind offset by Strategic Brands ¥610B target and Core OP margin expansion to 27.9%. Q1 FY25 Core EPS ¥54.88 is tracking on the annualised guidance path.',
      confidenceScore: 99,
      consoleLink: '/business-consoles/financial-performance',
      recommendations: [
        'Monitor XTANDI IRA CMS negotiation outcome — each 1pp price cut reduces revenue by ¥9.6B and pressures Core EPS by approximately ¥4',
        'Validate Q2–Q4 FY25 Strategic Brands ramp trajectory to confirm ¥610B FY2026 full-year target is achievable',
      ],
      relatedDrivers: {
        kpiLabel: 'Core EPS',
        value: '¥237.01 FY2025 (+49.8% YoY)',
        dataSource: 'FY2025 Annual Results (May 2025) and FY2026 Guidance',
        impactedMetrics: [
          { metric: 'Core EPS FY2025', value: '¥237.01', trend: 'positive' },
          { metric: 'Core EPS FY2024', value: '¥158.24', trend: 'positive' },
          { metric: 'Core EPS FY2026 Guidance', value: '¥256.77', trend: 'stable' },
        ],
        historicalContext:
          'Astellas Core EPS grew from ¥158.24 in FY2024 to ¥237.01 in FY2025 — the strongest annual growth rate in a decade, driven by XTANDI sustained volume expansion, breakthrough Strategic Brands contributions (PADCEV +34.8%, IZERVAY +226%), and the SMT ¥21B cost savings programme delivering its first full-year impact. Q1 FY25 Core EPS of ¥54.88 reflects typical H2 revenue weighting as XTANDI and new launch contributions build through the fiscal year.',
        predictiveInsight:
          'FY2026 Core EPS guidance of ¥256.77 is achievable if XTANDI IRA price reduction is contained below a 10pp threshold, Strategic Brands accelerate to ¥610B led by the VYLOY gastric cancer launch ramp, and SMT ¥40B target is delivered. Upside scenario: Strategic Brands exceed ¥640B driven by IZERVAY geographic atrophy market expansion — potential Core EPS ¥270+ vs ¥256.77 guidance.',
        dataQuality: 'Very High',
        modelAccuracy: '99%',
      },
    },
    {
      title: 'Core OP Margin 26.0% FY2025 → 27.9% FY2026 — SMT-Led 190bps Expansion Path',
      category: 'Financial Performance',
      kpiValue: '26.0% margin',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas FY2025 Core Operating Profit of ¥555.7B on Revenue ¥2,139.2B equates to a 26.0% Core OP margin — up from approximately 22% in FY2023. FY2026 guidance of Core OP ¥620B on Revenue ¥2,220B targets 27.9% Core OP margin, representing 190bps expansion. The primary driver is the SMT (Sustainable Margin Transformation) programme: ¥21B FY2025 savings stepping up to ¥40B FY2026 target. Each ¥1B SMT saving translates directly to ¥1B Core OP improvement. Revenue quality enhancement through Strategic Brands mix-up from lower-margin legacy products is a secondary driver.',
      confidenceScore: 97,
      consoleLink: '/business-consoles/financial-performance',
      recommendations: [
        'Track SMT savings by workstream monthly — ¥40B FY2026 target requires ¥19B incremental savings above FY2025 ¥21B base',
        'Monitor Strategic Brands gross margin contribution — VYLOY and IZERVAY carry elevated launch costs in FY2026 before scale efficiencies develop',
      ],
      relatedDrivers: {
        kpiLabel: 'Core Operating Profit Margin',
        value: '26.0% FY2025 (target 27.9% FY2026)',
        dataSource: 'FY2025 Annual Results and FY2026 Guidance (May 2025)',
        impactedMetrics: [
          { metric: 'Core OP FY2025', value: '¥555.7B', trend: 'positive' },
          { metric: 'Core OP FY2026 Guidance', value: '¥620B', trend: 'positive' },
          { metric: 'Core OP Margin FY2026 Target', value: '27.9%', trend: 'positive' },
          { metric: 'SMT Sensitivity', value: '+¥1B Core OP per ¥1B SMT savings', trend: 'positive' },
        ],
        historicalContext:
          'Astellas Core OP margin troughed near 20% in FY2022 as peak pipeline investment costs and legacy product revenue erosion compressed margin. Recovery to 26.0% in FY2025 reflects phased SMT programme impact, Strategic Brands revenue mix improvement, and disciplined R&D portfolio prioritisation. The 27.9% FY2026 target would be the highest Core OP margin in Astellas history if achieved.',
        predictiveInsight:
          'If SMT ¥40B target is achieved in FY2026 and Strategic Brands contribute at ¥610B+ with improving gross margin as launch investment scales, Core OP margin could reach 28.5%–29.0% — providing ¥13B–¥23B additional Core OP above the 27.9% guidance midpoint. Sensitivity: +1pp Core OP margin on ¥2,220B revenue = +¥22.2B Core OP and approximately +¥10 Core EPS.',
        dataQuality: 'Very High',
        modelAccuracy: '97%',
      },
    },
    {
      title: 'XTANDI IRA Medicare Negotiation — ¥9.6B Revenue Sensitivity per 1pp Price Reduction',
      category: 'Oncology',
      kpiValue: '¥9.6B/1pp sensitivity',
      trendDirection: 'down',
      priority: 'high',
      summary:
        'XTANDI (enzalutamide) has been selected for CMS Medicare drug price negotiation under IRA Section 1192 (Inflation Reduction Act). The negotiated price takes effect for Medicare Part D. Astellas estimates a ¥9.6B revenue sensitivity per 1 percentage point of price reduction versus current Medicare reimbursement. The ¥50B+ FY2026 headwind scenario assumes a 5pp+ negotiated price reduction. XTANDI US revenue (approximately ¥720B of total ¥960.8B global franchise) is disproportionately exposed given Medicare\'s approximately 40% share of US prostate cancer patients.',
      confidenceScore: 96,
      consoleLink: '/business-consoles/oncology-xtandi-performance',
      recommendations: [
        'Engage CMS negotiation process with robust cost-effectiveness and QALY data to minimise the magnitude of any price reduction',
        'Accelerate ex-US XTANDI volume growth to partially offset US IRA revenue pressure — Established Markets and China +10% target',
      ],
      relatedDrivers: {
        kpiLabel: 'XTANDI IRA Revenue Sensitivity',
        value: '¥9.6B per 1pp price reduction (CMS Part D negotiation)',
        dataSource: 'FY2026 Guidance and IRA Section 1192 CMS Negotiation Process',
        impactedMetrics: [
          { metric: 'XTANDI Global Revenue FY2025', value: '¥960.8B', trend: 'positive' },
          { metric: 'IRA Revenue Sensitivity', value: '−¥9.6B per 1pp cut', trend: 'negative' },
          { metric: 'Potential FY2026 IRA Headwind', value: '¥50B+', trend: 'negative' },
          { metric: 'XTANDI US Revenue Share', value: '~75% of global', trend: 'stable' },
        ],
        historicalContext:
          'XTANDI was FDA-approved in 2012 and has grown into Astellas\'s largest product at ¥960.8B in FY2025 global revenue. The IRA Sec 1192 selection for Medicare negotiation is the first major pricing headwind for the franchise since launch. The US co-promotion with Pfizer covers approximately 60% of US revenue. Large-market drugs selected for IRA negotiation have historically faced 30–60% reductions from current list prices in CMS early negotiations, though XTANDI\'s strong clinical value data provides negotiating support.',
        predictiveInsight:
          'Base case scenario: 25pp negotiated price reduction → approximately −¥240B FY2026 XTANDI revenue from IRA, offset by +5.3% volume growth (+¥51B), resulting in net −¥189B headwind, reducing XTANDI to approximately ¥772B. Upside: price reduction contained to 15pp → −¥144B headwind. Downside: 40pp price reduction → −¥384B, requiring Strategic Brands to exceed ¥640B to preserve Core OP ¥620B guidance.',
        dataQuality: 'High',
        modelAccuracy: '96%',
      },
    },
    {
      title: 'XTANDI ¥960.8B (+5.3%) — ARSi Class Leadership, ex-US Expansion Absorbs IRA Pressure',
      category: 'Oncology',
      kpiValue: '¥960.8B (+5.3%)',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'XTANDI (enzalutamide) delivered ¥960.8B FY2025 global revenue, up 5.3% YoY, confirming its leadership position as the top androgen receptor signalling inhibitor (ARSi) across mCRPC, nmCRPC, mHSPC, and nmHSPC prostate cancer indications. Volume growth of +8%+ was partially offset by price erosion. Established Markets (EU+Canada) and Japan contributed disproportionate growth as XTANDI label expansions drove earlier-line treatment adoption. China XTANDI revenue grew approximately +18% driven by NHSA National Reimbursement Drug List inclusion and rising prostate cancer diagnosis rates.',
      confidenceScore: 94,
      consoleLink: '/business-consoles/oncology-xtandi-performance',
      recommendations: [
        'Prioritise ex-US XTANDI volume acceleration to hedge FY2026 IRA US price headwind — China and Established Markets +10% target critical',
        'Defend ARSi class leadership versus darolutamide (Nubeqa) and apalutamide (Erleada) through life-cycle label expansions and PARP inhibitor combination data',
      ],
      relatedDrivers: {
        kpiLabel: 'XTANDI Global Revenue',
        value: '¥960.8B FY2025 (+5.3% YoY)',
        dataSource: 'FY2025 Annual Results (May 2025)',
        impactedMetrics: [
          { metric: 'XTANDI FY2025 Revenue', value: '¥960.8B', trend: 'positive' },
          { metric: 'XTANDI FY2024 Revenue', value: '¥912.4B', trend: 'positive' },
          { metric: 'ARSi Global Market Share', value: '>50%', trend: 'stable' },
          { metric: 'China XTANDI Growth', value: '+18% YoY', trend: 'positive' },
        ],
        historicalContext:
          'XTANDI has been Astellas\'s largest revenue product since FY2018, growing from ¥486B in FY2019 to ¥960.8B in FY2025 — near-doubling in six years through sequential label expansions from mCRPC to nmCRPC, mHSPC, and nmHSPC. The US co-promotion agreement with Pfizer covers approximately 60% of revenue. ARSi class volume has grown as the global standard-of-care in hormone-sensitive and castration-resistant prostate cancer, with XTANDI the class leader by prescription share.',
        predictiveInsight:
          'Ex-US XTANDI volume growth of 8%–10% annually in Established Markets and China can partially offset the US IRA price headwind in FY2026. China XTANDI is accelerating toward ¥50B+ annually as prostate cancer diagnosis rates increase with ageing demographics. Japan NHI reimbursement for nmHSPC indication provides incremental ¥8B–¥12B revenue. Medium-term risk: XTANDI patent cliff from FY2028–FY2030 when generic enzalutamide entry becomes possible in key markets.',
        dataQuality: 'Very High',
        modelAccuracy: '94%',
      },
    },
    {
      title: 'PADCEV ¥221.2B (+34.8%) — Urothelial Cancer First-Line Standard, Pfizer Co-Promotion Driving US Scale',
      category: 'Strategic Brands',
      kpiValue: '¥221.2B (+34.8%)',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'PADCEV (enfortumab vedotin) delivered ¥221.2B FY2025 global revenue, up 34.8% YoY, driven by accelerating first-line urothelial cancer adoption following FDA approval of EV+pembrolizumab (EV+P) in first-line metastatic urothelial carcinoma (mUC). The Pfizer co-promotion in the US has significantly expanded field force coverage and payer access. PADCEV is tracking toward becoming Astellas\'s second ¥300B+ product by FY2026–FY2027 on the strength of EV+P penetration as the first-line standard of care replacing platinum-based chemotherapy.',
      confidenceScore: 95,
      consoleLink: '/business-consoles/strategic-brands-growth',
      recommendations: [
        'Maximise EV+P first-line mUC penetration — market share conversion from platinum-based chemotherapy regimens is the primary volume driver',
        'Track PADCEV payer coverage expansion quarterly — broad commercial and Medicare Part B access is critical to sustained uptake',
      ],
      relatedDrivers: {
        kpiLabel: 'PADCEV Global Revenue',
        value: '¥221.2B FY2025 (+34.8% YoY)',
        dataSource: 'FY2025 Annual Results (May 2025)',
        impactedMetrics: [
          { metric: 'PADCEV FY2025 Revenue', value: '¥221.2B', trend: 'positive' },
          { metric: 'PADCEV FY2024 Revenue', value: '¥164.1B', trend: 'positive' },
          { metric: 'EV+P First-Line mUC Market Share', value: 'Growing vs chemo', trend: 'positive' },
          { metric: 'Pfizer Co-Promotion Coverage', value: 'US top-100 oncology accounts', trend: 'stable' },
        ],
        historicalContext:
          'PADCEV was developed through the Astellas-Seagen collaboration, with Seagen subsequently acquired by Pfizer. FDA accelerated approval was initially granted in 2019; the full approval and first-line EV+P combination data from the EV-302 trial provided the commercial inflection in FY2024. The EV-302 trial demonstrated approximately 50% reduction in mortality versus platinum-based chemotherapy in first-line mUC — a practice-changing result. Pfizer\'s acquisition of Seagen brought enhanced US commercial infrastructure supporting the EV+P launch.',
        predictiveInsight:
          'PADCEV is projected to reach ¥290B–¥320B in FY2026 assuming EV+P first-line penetration reaches 35%–40% of mUC patients (currently approximately 20%–25%). Additional approvals in adjuvant and neoadjuvant urothelial settings represent a ¥50B+ incremental opportunity by FY2028. PADCEV competitive position is strong — erdafitinib (FGFR3) is limited to FGFR3-altered subpopulations and does not compete head-to-head with the EV+P regimen.',
        dataQuality: 'Very High',
        modelAccuracy: '95%',
      },
    },
    {
      title: 'VYLOY+IZERVAY+VEOZAH: Strategic Brands ¥480.3B FY2025 — Path to ¥610B FY2026 (+27%)',
      category: 'Strategic Brands',
      kpiValue: '¥480.3B FY2025',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas Strategic Brands (PADCEV, VYLOY, IZERVAY, VEOZAH, XOSPATA) delivered ¥480.3B FY2025 (+43% YoY), with three new product launches contributing: VYLOY (zolbetuximab, ¥63.1B, gastric cancer), IZERVAY (avacincaptad pegol, ¥77.6B, +226%, geographic atrophy), and VEOZAH (fezolinetant, ¥46.6B, vasomotor symptoms). The ¥610B FY2026 guidance target requires +27% aggregate portfolio growth, achievable if VYLOY expands across global gastric cancer approvals, IZERVAY continues geographic atrophy market penetration, and PADCEV sustains first-line mUC momentum.',
      confidenceScore: 91,
      consoleLink: '/business-consoles/strategic-brands-growth',
      recommendations: [
        'Establish VYLOY global launch execution dashboard — EU and Japan gastric cancer approvals are critical to the ¥610B portfolio trajectory',
        'Monitor IZERVAY geographic atrophy market penetration monthly — competitive dynamics with Apellis\'s Syfovre affect share trajectory',
      ],
      relatedDrivers: {
        kpiLabel: 'Strategic Brands Portfolio Revenue',
        value: '¥480.3B FY2025 (+43% YoY)',
        dataSource: 'FY2025 Annual Results (May 2025)',
        impactedMetrics: [
          { metric: 'Strategic Brands FY2025', value: '¥480.3B', trend: 'positive' },
          { metric: 'Strategic Brands FY2026 Target', value: '¥610B', trend: 'positive' },
          { metric: 'IZERVAY FY2025 Revenue', value: '¥77.6B (+226%)', trend: 'positive' },
          { metric: 'VYLOY FY2025 Revenue', value: '¥63.1B (new launch)', trend: 'positive' },
          { metric: 'VEOZAH FY2025 Revenue', value: '¥46.6B (new launch)', trend: 'positive' },
        ],
        historicalContext:
          'Astellas Strategic Brands were ¥335.5B in FY2024, growing 43% to ¥480.3B in FY2025 as three new products launched simultaneously: VYLOY for HER2-negative, CLDN18.2-positive gastric/GEJ adenocarcinoma (FDA approved October 2023), IZERVAY for geographic atrophy (FDA approved August 2023), and VEOZAH for menopausal vasomotor symptoms (FDA approved May 2023). The simultaneous three-product launch execution stretched commercial infrastructure but substantially exceeded consensus expectations in all three therapeutic areas.',
        predictiveInsight:
          'The ¥610B FY2026 target is achievable but requires disciplined execution across three simultaneous launch platforms. Key risks: (1) VYLOY EU approval delay reduces FY2026 contribution by ¥20B+ per six months of delay; (2) IZERVAY geographic atrophy competitive pressure from Apellis\'s Syfovre intensifying in FY2026; (3) VEOZAH managed care coverage with label liver enzyme elevation warning restricting commercial formulary access. Upside: PADCEV single-agent label expansions could add ¥30B+ if approved in additional bladder cancer indications.',
        dataQuality: 'High',
        modelAccuracy: '91%',
      },
    },
    {
      title: 'SMT FY2025 ¥21B Delivered — ¥40B FY2026 Target Requires ¥19B Incremental Annual Savings',
      category: 'Cost Transformation',
      kpiValue: '¥21B FY2025',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas\'s Sustainable Margin Transformation (SMT) programme delivered ¥21B in savings in FY2025, contributing directly to Core OP improvement. FY2026 target of ¥40B (cumulative ¥65B) requires an additional ¥19B in annualised savings — nearly doubling the FY2025 rate. SMT covers SG&A rationalisation (approximately 50% of savings), manufacturing efficiency (approximately 30%), and R&D portfolio prioritisation (approximately 20%). Each ¥1B of SMT savings translates directly to ¥1B Core OP improvement, making SMT the most capital-efficient lever in the FY2026 earnings bridge.',
      confidenceScore: 90,
      consoleLink: '/business-consoles/smt-cost-transformation',
      recommendations: [
        'Confirm SMT workstream execution milestones — ¥19B incremental vs FY2025 base requires H1 FY25 savings acceleration to maintain full-year trajectory',
        'Ring-fence VYLOY and IZERVAY commercial launch investment budgets from SMT efficiency targets to protect Strategic Brands ¥610B revenue goal',
      ],
      relatedDrivers: {
        kpiLabel: 'SMT Annual Savings',
        value: '¥21B FY2025 (target ¥40B FY2026)',
        dataSource: 'FY2025 Annual Results and SMT Programme Progress Reports',
        impactedMetrics: [
          { metric: 'SMT FY2025 Savings', value: '¥21B', trend: 'positive' },
          { metric: 'SMT FY2026 Target', value: '¥40B', trend: 'positive' },
          { metric: 'SMT Cumulative Target', value: '¥65B', trend: 'positive' },
          { metric: 'Core OP Sensitivity', value: '+¥1B per ¥1B SMT savings', trend: 'positive' },
        ],
        historicalContext:
          'Astellas launched the SMT programme in FY2023 following sustained pressure on Core OP margins from pipeline investment intensity and revenue mix erosion from maturing legacy products. FY2025 delivered ¥21B versus the ¥20B initial guidance, demonstrating early programme credibility and management execution discipline. The step-up to ¥40B FY2026 reflects expanded programme scope across additional SG&A categories, manufacturing network rationalisation, and third-phase operational efficiency workstreams not included in early-stage delivery.',
        predictiveInsight:
          'SMT achievement probability at ¥40B FY2026 is approximately 75%–80% based on Q1 FY25 run-rate indicators. The most uncertain workstreams are manufacturing network consolidation (¥6B target, dependent on regulatory site approvals) and R&D portfolio prioritisation savings (¥4B, dependent on specific pipeline asset exit decisions). If SMT delivers ¥35B versus ¥40B target, Core OP impact is −¥5B (approximately ¥615B vs ¥620B guidance midpoint) — manageable if Strategic Brands partially offset.',
        dataQuality: 'High',
        modelAccuracy: '90%',
      },
    },
    {
      title: 'SMT SG&A Efficiency — Opex Ratio Targeting <25% of Revenue by FY2027',
      category: 'Cost Transformation',
      kpiValue: '<25% SG&A/Revenue',
      trendDirection: 'down',
      priority: 'medium',
      summary:
        'Astellas SG&A expenses as a percentage of revenue are targeted to decline below 25% by FY2027 through SMT-led headcount rationalisation, digital commercial model adoption, and procurement efficiencies. FY2025 SG&A ratio was approximately 27%–28% of revenue. The SMT SG&A workstream contributes approximately ¥10B–¥12B of the ¥40B FY2026 target. SMT SG&A savings must be carefully balanced against launch investment requirements for VYLOY and IZERVAY — cannibalising launch budgets would undermine the Strategic Brands ¥610B full-year target.',
      confidenceScore: 86,
      consoleLink: '/business-consoles/smt-cost-transformation',
      recommendations: [
        'Ring-fence VYLOY and IZERVAY commercial launch budgets explicitly within SMT SG&A programme to prevent efficiency targets from cutting launch investment',
        'Track SG&A per revenue dollar monthly — ratio declining faster than the target creates additional investment capacity for pipeline acceleration or BD activity',
      ],
      relatedDrivers: {
        kpiLabel: 'SG&A as % of Revenue',
        value: '~27–28% FY2025 (target <25% by FY2027)',
        dataSource: 'Astellas FY2025 Annual Results and SMT Programme',
        impactedMetrics: [
          { metric: 'SG&A FY2025 (estimated)', value: '~¥580B–¥600B', trend: 'stable' },
          { metric: 'SG&A as % Revenue FY2025', value: '~27–28%', trend: 'negative' },
          { metric: 'SG&A Target FY2027', value: '<25% of revenue', trend: 'positive' },
          { metric: 'SMT SG&A Workstream', value: '¥10B–¥12B contribution', trend: 'positive' },
        ],
        historicalContext:
          'Astellas SG&A ratio peaked near 31% of revenue in FY2021–FY2022 during peak pipeline investment and simultaneous US commercial build-out for PADCEV and IZERVAY. The SMT programme has driven SG&A ratio down approximately 3pp to 27%–28% in FY2025. Peer benchmarking indicates leading specialty pharma companies operating at 22%–25% SG&A/revenue — Astellas\'s target of <25% would be competitive with best-in-class operators while preserving the commercial investments required for new product launches.',
        predictiveInsight:
          'At FY2026 Revenue guidance of ¥2,220B, achieving <25% SG&A ratio implies SG&A ≤¥555B — approximately ¥25B–¥45B reduction vs FY2025 levels. SMT SG&A savings of ¥10B–¥12B plus natural attrition from legacy programme wind-downs provide a credible path. The FY2027 ambition of <25% requires incremental ¥15B–¥20B from digital commercial model adoption and global shared services centralisation. Sensitivity: each 1pp SG&A/revenue improvement on ¥2,220B revenue = ¥22.2B of cost headroom.',
        dataQuality: 'High',
        modelAccuracy: '86%',
      },
    },
    {
      title: 'FX ¥151 Baseline — +¥2.1B Revenue Sensitivity per ¥1 USD/JPY Movement',
      category: 'FX & Macro',
      kpiValue: '¥151 USD/JPY',
      trendDirection: 'flat',
      priority: 'medium',
      summary:
        'Astellas FY2026 guidance is based on a ¥151 USD/JPY assumption (¥163 EUR/JPY). Revenue sensitivity is +¥2.1B per ¥1 weakening of the yen versus USD (i.e., ¥1 yen appreciation versus USD = −¥2.1B revenue). Total FX sensitivity across all currencies is approximately ¥3.5B–¥4.0B per 1% yen movement. With approximately 44% of revenue in USD (US market ¥940.2B), yen appreciation is the largest macro risk to FY2026 guidance delivery. Q1 FY25 average rate of ¥151.8/USD provided a marginal tailwind versus guidance baseline.',
      confidenceScore: 88,
      consoleLink: '/business-consoles/enterprise-risk',
      recommendations: [
        'Monitor JPY/USD spot daily versus ¥151 guidance baseline — 5% yen appreciation (→¥143) would reduce Revenue by ¥15B+ and Core OP by approximately ¥6B',
        'Review natural hedging coverage ratio — expanding USD cost base against USD revenue reduces net FX exposure and the revenue translation impact',
      ],
      relatedDrivers: {
        kpiLabel: 'USD/JPY Exchange Rate Sensitivity',
        value: '+¥2.1B revenue per ¥1 USD/JPY (guidance baseline ¥151)',
        dataSource: 'FY2026 Guidance and Astellas FX Sensitivity Analysis',
        impactedMetrics: [
          { metric: 'FX Guidance Assumption', value: '¥151 USD/JPY, ¥163 EUR/JPY', trend: 'stable' },
          { metric: 'Revenue Sensitivity per ¥1 Move', value: '+¥2.1B USD/JPY', trend: 'stable' },
          { metric: 'US Revenue FY2025', value: '¥940.2B (44% of total)', trend: 'positive' },
          { metric: 'Yen Appreciation Risk', value: '¥5 JPY stronger = −¥10.5B revenue', trend: 'negative' },
        ],
        historicalContext:
          'Astellas generates approximately 44% of revenue in USD and 26% in EUR and GBP (Established Markets), creating significant JPY translation exposure. The 2022–2024 period of exceptional yen weakness (¥130–¥160/USD) inflated reported JPY revenue substantially, creating a high base for FY2026 comparison. The Bank of Japan rate normalisation trajectory (BOJ rate hikes from FY2024) creates potential yen appreciation headwinds for FY2026–FY2027 that could partially reverse the FX translation tailwinds of recent years.',
        predictiveInsight:
          'Consensus USD/JPY forecast for FY2025 (April 2025–March 2026) is ¥148–¥152, broadly aligned with guidance baseline. A market shock scenario of ¥140/USD (sharp yen appreciation) would reduce FY2025 Revenue by approximately ¥23B and Core OP by approximately ¥9B, compressing Core OP margin by about 40bps. Natural hedging through USD R&D and manufacturing costs offsets approximately 30%–40% of the USD revenue sensitivity, providing partial protection.',
        dataQuality: 'Very High',
        modelAccuracy: '88%',
      },
    },
    {
      title: 'China ¥101.5B (+29.6%) — ¥150B+ FY2026 Target on XTANDI NHSA Volume and VYLOY Launch',
      category: 'International Growth',
      kpiValue: '¥101.5B (+29.6%)',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas China revenue reached ¥101.5B in FY2025, growing 29.6% YoY — the fastest-growing geographic segment at 5% of total revenue. Growth was driven by XTANDI NHSA National Reimbursement Drug List inclusion expanding volume access across Tier 2–3 hospitals, and rising prostate cancer diagnosis rates with Chinese demographic ageing. FY2026 target of ¥150B+ (+48% YoY) requires VYLOY China gastric cancer NMPA approval and continued XTANDI volume expansion. China sensitivity: +1pp growth = +¥1.0B revenue — the highest per-unit growth leverage in Astellas\'s geographic portfolio.',
      confidenceScore: 88,
      consoleLink: '/business-consoles/international-asia-performance',
      recommendations: [
        'Accelerate VYLOY NMPA regulatory submission for gastric cancer in China — China has the world\'s highest gastric cancer incidence with approximately 500,000 new cases annually',
        'Expand XTANDI medical education and NHSA access programmes in Tier 2–3 hospitals — breadth of reimbursement coverage drives volume from underdiagnosed prostate cancer patient pools',
      ],
      relatedDrivers: {
        kpiLabel: 'China Revenue',
        value: '¥101.5B FY2025 (+29.6% YoY)',
        dataSource: 'FY2025 Annual Results (May 2025)',
        impactedMetrics: [
          { metric: 'China Revenue FY2025', value: '¥101.5B', trend: 'positive' },
          { metric: 'China Revenue FY2024', value: '¥78.3B', trend: 'positive' },
          { metric: 'China Revenue FY2026 Target', value: '¥150B+', trend: 'positive' },
          { metric: 'China Revenue Sensitivity', value: '+¥1.0B per 1pp growth', trend: 'positive' },
        ],
        historicalContext:
          'Astellas entered China strategically in the 2010s, initially anchored by XTANDI oncology launch following NMPA approval in FY2019. NHSA National Reimbursement Drug List inclusion in FY2022–FY2023 drove significant volume acceleration by extending reimbursement coverage to China\'s 1.4 billion population. The 29.6% growth rate in FY2025 reflects XTANDI volume scale, NHSA-driven access expansion, and early pipeline product contributions. Gross margin in China is lower than Established Markets due to NHSA negotiated pricing, but improving with revenue scale and lower promotional cost per patient as breadth of coverage increases.',
        predictiveInsight:
          'China ¥150B+ FY2026 target is achievable if VYLOY receives NMPA approval in H1 FY25 for CLDN18.2-positive gastric/GEJ adenocarcinoma. At ¥150B, China represents 6.8% of FY2026 Revenue guidance — the trajectory toward 8%–10% of revenue by FY2028 makes China one of the top-3 growth contributors globally alongside the US and Established Markets. Long-term, NHSA inclusion of PADCEV and IZERVAY would represent additional ¥30B–¥50B upside if approved through the NHSA drug negotiation cycle.',
        dataQuality: 'High',
        modelAccuracy: '88%',
      },
    },
    {
      title: 'FCF ¥560.2B FY2025 — Dividend ¥78/Share, Share Buyback Programme, ROE 17.4%',
      category: 'Capital Allocation',
      kpiValue: '¥560.2B FCF',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas generated Free Cash Flow of ¥560.2B in FY2025, supporting a full-year dividend of ¥78/share (consistent with the company\'s progressive dividend commitment) and active share buyback programme execution. Return on Equity of 17.4% reflects strong net income growth from the XTANDI franchise and Strategic Brands portfolio contributions. Astellas operates a net cash positive balance sheet, providing strategic flexibility for business development, pipeline in-licensing, and further capital return to shareholders without leverage constraint.',
      confidenceScore: 93,
      consoleLink: '/business-consoles/financial-performance',
      recommendations: [
        'Confirm FY2025 capital allocation priorities: dividend maintenance at ¥78/share, buyback programme continuation, and BD investment budget envelope for pipeline in-licensing',
        'Review net cash deployment strategy — strategic in-licensing of mid-stage oncology or rare disease assets would diversify pipeline and reduce XTANDI concentration risk',
      ],
      relatedDrivers: {
        kpiLabel: 'Free Cash Flow',
        value: '¥560.2B FY2025',
        dataSource: 'FY2025 Annual Results (May 2025)',
        impactedMetrics: [
          { metric: 'FCF FY2025', value: '¥560.2B', trend: 'positive' },
          { metric: 'Annual Dividend per Share', value: '¥78', trend: 'stable' },
          { metric: 'Return on Equity FY2025', value: '17.4%', trend: 'positive' },
          { metric: 'Net Cash Position', value: 'Net cash positive', trend: 'positive' },
        ],
        historicalContext:
          'Astellas has maintained a strong cash generation profile supported by XTANDI\'s high gross margins exceeding 80%. The net cash balance sheet is unusual among major global pharma companies, reflecting disciplined capital allocation and avoidance of large debt-funded M&A transactions. The FY2025 FCF of ¥560.2B is the highest in Astellas\'s history, driven by Core OP expansion from SMT savings and XTANDI/Strategic Brands revenue growth. Dividend per share has grown from ¥60 in FY2021 to ¥78 in FY2025, representing compound annual growth of approximately 6.8%.',
        predictiveInsight:
          'At FY2026 Core OP guidance ¥620B (versus ¥555.7B FY2025), FCF is expected to reach ¥580B–¥620B, supporting continued dividend growth and share buyback programme. The critical FCF risk is the XTANDI IRA headwind — a ¥50B+ revenue reduction from CMS negotiated pricing would reduce FCF by ¥35B–¥40B after tax, but remains manageable given net cash balance sheet strength. Business development capacity: ¥200B–¥300B of BD envelope available without leverage constraint at current net cash levels.',
        dataQuality: 'Very High',
        modelAccuracy: '93%',
      },
    },
    {
      title: 'Balance Sheet Strength: Net Cash Positive, A-rated Credit, ROE 17.4% Above 15% Target',
      category: 'Capital Allocation',
      kpiValue: 'Net Cash Positive',
      trendDirection: 'up',
      priority: 'medium',
      summary:
        'Astellas maintains a net cash positive balance sheet — a competitive advantage enabling strategic flexibility versus debt-burdened pharma peers. Credit rating (A- S&P) reflects conservative financial management and strong FCF generation. FY2025 ROE of 17.4% is above the 15% medium-term target. The net cash position exceeds ¥300B, providing a ¥200B–¥300B business development envelope that could fund a mid-size in-licensing deal or bolt-on acquisition without leverage concern. This financial strength supports Astellas\'s ability to execute pipeline investment during the IRA transition period.',
      confidenceScore: 89,
      consoleLink: '/business-consoles/financial-performance',
      recommendations: [
        'Articulate capital allocation framework to investors — balance between BD investment, buyback programme, and dividend increase given the net cash position and IRA uncertainty',
        'Maintain ROE above 15% medium-term target — the highest-ROE path is Strategic Brands acceleration with limited incremental capital expenditure requirements',
      ],
      relatedDrivers: {
        kpiLabel: 'Credit Rating and Balance Sheet',
        value: 'Net Cash Positive, A- S&P, ROE 17.4%',
        dataSource: 'FY2025 Annual Results and Credit Agency Reports',
        impactedMetrics: [
          { metric: 'Net Cash Position', value: '>¥300B', trend: 'positive' },
          { metric: 'Credit Rating', value: 'A- (S&P)', trend: 'stable' },
          { metric: 'Return on Equity FY2025', value: '17.4%', trend: 'positive' },
          { metric: 'ROE Medium-Term Target', value: '>15%', trend: 'stable' },
        ],
        historicalContext:
          'Astellas has maintained a net cash balance sheet since the early 2010s following disciplined deleveraging after the Fujisawa Pharmaceutical merger that created the company. Unlike US-listed pharma peers that typically use leverage aggressively for large-scale M&A, Astellas\'s Japanese governance norms favour balance sheet conservatism. ROE of 17.4% in FY2025 significantly exceeds TSE Prime Market averages and reflects effective capital deployment through the XTANDI franchise growth, Strategic Brands portfolio build, and progressive dividend and buyback programme.',
        predictiveInsight:
          'If the IRA XTANDI headwind materialises at ¥50B+, net cash position will moderate as FCF declines from the ¥560.2B FY2025 peak. However, A- credit is sustainable above ¥100B net cash — providing a 3–4 year buffer before leverage concerns could arise even in downside scenarios. BD capacity of ¥200B–¥300B is available for an oncology or rare disease asset in-licensing, positioned to diversify away from XTANDI revenue concentration ahead of the patent cliff horizon.',
        dataQuality: 'High',
        modelAccuracy: '89%',
      },
    },
    {
      title: 'R&D Pipeline: 3 POC Achievements FY2025 — Phase 3 Initiations Planned FY2026',
      category: 'R&D Pipeline',
      kpiValue: '3 POCs FY2025',
      trendDirection: 'up',
      priority: 'high',
      summary:
        'Astellas achieved 3 proof-of-concept (POC) milestones in the R&D pipeline during FY2025, meeting the annual target set in the mid-term plan. These POC assets progress to Phase 3 initiation in FY2026, representing the pipeline that will sustain revenue post-XTANDI patent cliff (FY2028–FY2030). Key programme areas include oncology (targeted ADC and immuno-oncology approaches), rare kidney disease (gene therapy), and urology (extending the VEOZAH urology platform). Successful Phase 3 initiation within 18 months of POC is a key process KPI for Astellas R&D productivity.',
      confidenceScore: 85,
      consoleLink: '/business-consoles/enterprise-pipeline',
      recommendations: [
        'Confirm Phase 3 initiation timelines for the 3 FY2025 POC assets — H1 FY25 starts would maximise data readout timing for FY2028 regulatory submissions',
        'Evaluate whether any FY2025 POC assets qualify for accelerated approval pathway — FDA Breakthrough Therapy or Orphan Drug designation could compress approval timelines by 1–2 years',
      ],
      relatedDrivers: {
        kpiLabel: 'R&D POC Achievements',
        value: '3 POCs FY2025 (FY2026 target: 3+ programmes)',
        dataSource: 'Astellas FY2025 Annual Results R&D Progress Report',
        impactedMetrics: [
          { metric: 'POC Achievements FY2025', value: '3', trend: 'positive' },
          { metric: 'Annual POC Target FY2026', value: '3+ programmes', trend: 'stable' },
          { metric: 'Phase 3 Initiations FY2026', value: 'Planned from FY2025 POCs', trend: 'positive' },
          { metric: 'XTANDI Patent Cliff Horizon', value: 'FY2028–FY2030', trend: 'negative' },
        ],
        historicalContext:
          'Astellas\'s Focused Innovation R&D strategy concentrates investment in oncology, urology-related diseases, and immunology. The POC model measures the number of pipeline assets demonstrating sufficient clinical signal to progress to confirmatory Phase 3 trials. FY2024 delivered 3 POCs, meeting the target; FY2025 similarly delivered 3 POCs. The compounding effect of 3 annual POC achievements sustains a Phase 3 portfolio depth of 9–12 assets — providing diversification against individual trial failures that is critical given XTANDI\'s strategic importance to the revenue profile.',
        predictiveInsight:
          'If 2 of the 3 FY2025 POC assets successfully complete Phase 3 and receive regulatory approval (probability approximately 30% per asset = approximately 51% combined probability), they would enter commercial phase approximately 5–6 years after POC initiation. To sustain ¥2,000B+ revenue post-XTANDI patent cliff, at least 2 new ¥200B+ products must launch commercially by FY2032. Current Phase 2+ pipeline depth suggests this is achievable, though timeline execution is tight given the level of XTANDI revenue dependence.',
        dataQuality: 'High',
        modelAccuracy: '85%',
      },
    },
    {
      title: 'Phase 3 Pipeline FY2026: Oncology and Rare Disease Assets De-risking Post-XTANDI Growth',
      category: 'R&D Pipeline',
      kpiValue: 'Phase 3 Initiations',
      trendDirection: 'up',
      priority: 'medium',
      summary:
        'Astellas plans multiple Phase 3 programme initiations in FY2026 based on FY2025 POC successes. Initiation decisions cover oncology assets in the ADC (antibody-drug conjugate) space adjacent to the PADCEV franchise, rare kidney disease programmes, and an urology platform extension building on VEOZAH\'s neuroscience mechanism. Successful Phase 3 initiation is a value-creating event reducing the binary risk of XTANDI revenue dependence. Astellas\'s BD strategy also includes potential in-licensing of late-stage pipeline assets to supplement the organic Phase 3 portfolio depth ahead of the XTANDI cliff.',
      confidenceScore: 80,
      consoleLink: '/business-consoles/enterprise-pipeline',
      recommendations: [
        'Communicate Phase 3 initiation plans with indication detail and timeline to investors — pipeline visibility is a key ALPMY valuation driver for the post-XTANDI growth thesis',
        'Ensure BD team is evaluating ADC and immunology assets in Phase 2 for in-licensing — mid-stage acquisitions add pipeline depth at lower cost than approved asset transactions',
      ],
      relatedDrivers: {
        kpiLabel: 'Phase 3 Pipeline Initiations',
        value: 'Multiple FY2026 Phase 3 starts from FY2025 POCs',
        dataSource: 'Astellas R&D Day Presentations and FY2025 Annual Results',
        impactedMetrics: [
          { metric: 'FY2026 Phase 3 Initiations', value: 'Planned (multiple)', trend: 'positive' },
          { metric: 'Oncology Phase 3 Assets', value: 'ADC and immunotherapy focus', trend: 'positive' },
          { metric: 'Rare Disease Phase 3 Assets', value: 'Gene therapy and nephrology', trend: 'positive' },
          { metric: 'BD Pipeline Target', value: '1–2 in-licensing deals FY2026', trend: 'stable' },
        ],
        historicalContext:
          'Astellas\'s Phase 3 portfolio has historically been anchored by XTANDI label expansions, PADCEV urothelial cancer, VYLOY gastric cancer, and IZERVAY geographic atrophy — all now commercial products. The next-generation Phase 3 pipeline initiated in FY2024–FY2026 is earlier-stage and requires 3–4 years to produce pivotal data. To bridge the XTANDI patent cliff risk, Astellas has signalled strategic openness to BD transactions in the ¥100B–¥300B range for late-stage or commercial-stage assets in oncology and rare diseases.',
        predictiveInsight:
          'Phase 3 initiation in FY2026 for 3+ assets creates a probability-weighted NPV pipeline contribution of approximately ¥300B–¥500B using typical phase success probabilities (approximately 15% from Phase 3 to commercial approval). This represents meaningful optionality value supporting ALPMY\'s valuation above the XTANDI-only scenario. BD in-licensing of an approved rare disease product with ¥100B–¥200B revenue potential would most directly reduce XTANDI concentration risk by FY2028 without requiring organic pipeline success on the tight timeline.',
        dataQuality: 'Medium-High',
        modelAccuracy: '80%',
      },
    },
  ];

  await prisma.personalizedInsight.createMany({
    data: insights.map((i) => ({
      companyId,
      title: i.title,
      category: i.category,
      kpiValue: i.kpiValue,
      trendDirection: i.trendDirection,
      priority: i.priority,
      summary: i.summary,
      confidenceScore: i.confidenceScore,
      consoleLink: i.consoleLink,
      recommendations: i.recommendations,
      relatedDrivers: i.relatedDrivers,
    })),
  });

  console.log(`Seeded ${insights.length} personalized insights`);
}
