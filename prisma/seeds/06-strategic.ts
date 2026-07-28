import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Strategic Initiatives, Risk Items, Forward Outlook, Key Opportunities
//
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Full-Year Results (May 2026),
// FY2025 Annual Report, Investor Day materials, and public guidance.
//
// Strategic initiatives reflect Astellas' four-pillar framework:
// (1) SMT (Sustainable Margin Transformation) — ¥40B FY2026 savings target,
// (2) Strategic Brands Acceleration — XTANDI, VYLOY, PADCEV, IZERVAY,
// (3) XTANDI IRA Risk Management — CMS negotiation monitoring,
// (4) Pipeline POC Programme — 3 FY2025 POCs, Phase 3 initiations FY2026.
// FY2025 Core Operating Profit: ¥556.4B. Core OP Margin: ~26.0%.
// =============================================================================

export async function seedStrategic(prisma: PrismaClient, companyId: number) {
  // ── Strategic Initiatives ─────────────────────────────────────────────────

  const smt = await prisma.strategicInitiative.create({
    data: {
      companyId,
      externalId: 'smt-savings-programme',
      name: 'SMT — Sustainable Margin Transformation Programme',
      description:
        'The Sustainable Margin Transformation (SMT) programme is Astellas\' structural cost reduction initiative targeting ¥65B in cumulative savings by the end of FY2026. FY2025 delivered ¥21B in confirmed savings, establishing the programme\'s credibility. The FY2026 target is ¥40B incremental, bringing the cumulative total to ¥61B. SMT has three delivery pillars: (1) R&D portfolio rationalisation — exiting non-core early-stage assets and concentrating investment in focused areas (oncology, immunology, rx+); (2) SG&A efficiency — reducing commercial infrastructure in ex-growth markets, consolidating regional operating models, and leveraging shared services; (3) Manufacturing and supply chain optimisation — plant network rationalisation, third-party manufacturing consolidation, and procurement savings. The ¥40B FY2026 target is the single largest internal earnings lever for Core OP margin expansion beyond the 26.0% FY2025 base. Each ¥10B of SMT delivery converts directly to Core OP at a ~100% flow-through rate given the fixed-cost nature of savings.',
      status: 'on-track',
      budget: 8500,
      spent: 3200,
      progress: 53,
    },
  });

  await prisma.initiativeMilestone.createMany({
    data: [
      { initiativeId: smt.id, name: 'FY2025 — ¥21B SMT Savings Delivered (Confirmed)', date: '2026-03-31', status: 'completed' },
      { initiativeId: smt.id, name: 'H1 FY2026 — ¥18B Incremental Savings on Track', date: '2026-09-30', status: 'in-progress' },
      { initiativeId: smt.id, name: 'FY2026 — ¥40B Incremental / ¥61B Cumulative Target', date: '2027-03-31', status: 'planned' },
    ],
  });

  await prisma.initiativeKPI.createMany({
    data: [
      { initiativeId: smt.id, label: 'FY2026 SMT Savings Target', target: '¥40B incremental', actual: 'On track H1 FY26', status: 'good' },
      { initiativeId: smt.id, label: 'Cumulative Savings FY2025–26', target: '¥61B', actual: '¥21B delivered FY2025', status: 'good' },
    ],
  });

  const strategicBrands = await prisma.strategicInitiative.create({
    data: {
      companyId,
      externalId: 'strategic-brands-acceleration',
      name: 'Strategic Brands Portfolio Acceleration',
      description:
        'Astellas\' Strategic Brands are the five products driving the next growth phase beyond XTANDI: VYLOY (zolbetuximab, gastric/GEJ cancer), PADCEV (enfortumab vedotin, urothelial cancer, co-promoted with Pfizer), IZERVAY (avacincaptad pegol, geographic atrophy), and the broader oncology franchise. Strategic Brands combined revenue reached ¥480.3B in FY2025, growing 43.0% YoY — the primary revenue growth driver. The FY2026 target is ¥610B (~+27% YoY), underpinned by: (1) VYLOY global launch roll-out across Japan, US, and EU following Phase 3 SPOTLIGHT/GLOW data; (2) PADCEV label expansion into earlier treatment lines (EV-302 perioperative data); (3) IZERVAY geographic atrophy market penetration in the US. The Strategic Brands mix shift is central to Astellas\' post-XTANDI IRA transition thesis — demonstrating that the pipeline can offset any XTANDI price erosion while maintaining group margin above 25%.',
      status: 'on-track',
      budget: 320000,
      spent: 168000,
      progress: 60,
    },
  });

  await prisma.initiativeMilestone.createMany({
    data: [
      { initiativeId: strategicBrands.id, name: 'FY2025 — Strategic Brands ¥480.3B (+43.0% YoY) Delivered', date: '2026-03-31', status: 'completed' },
      { initiativeId: strategicBrands.id, name: 'FY2026 H1 — VYLOY Reimbursement Secured Japan & EU Key Markets', date: '2026-09-30', status: 'in-progress' },
      { initiativeId: strategicBrands.id, name: 'FY2026 — Strategic Brands ¥610B Target', date: '2027-03-31', status: 'planned' },
    ],
  });

  await prisma.initiativeKPI.createMany({
    data: [
      { initiativeId: strategicBrands.id, label: 'Strategic Brands Revenue', target: '¥610B FY2026', actual: '¥480.3B FY2025', status: 'good' },
      { initiativeId: strategicBrands.id, label: 'Strategic Brands YoY Growth', target: '+27% FY2026', actual: '+43.0% FY2025', status: 'good' },
    ],
  });

  const iraRisk = await prisma.strategicInitiative.create({
    data: {
      companyId,
      externalId: 'xtandi-ira-risk-management',
      name: 'XTANDI IRA Price Negotiation Risk Management',
      description:
        'XTANDI (enzalutamide) was included in the second cycle of CMS Medicare Drug Price Negotiation under the Inflation Reduction Act (IRA). XTANDI US revenue was approximately ¥400B in FY2025 (~42% of total group revenue), making the IRA negotiation outcome the largest single risk to Astellas\' earnings profile through FY2028. The CMS Maximum Fair Price (MFP), if implemented, would reduce the net realised price for Medicare Part D patients. Astellas and Pfizer (co-promotion partner) are actively engaging CMS and monitoring the negotiation timeline. Management has guided that IRA impact is not expected to be material before FY2027 given the effective date mechanics. The risk management programme has three components: (1) legal review of the negotiation process with the Washington DC government affairs team; (2) scenario modelling of 0%, 10%, and 20% net price reduction impacts on group Core OP; (3) acceleration of Strategic Brands and SMT to provide offset capacity. A 10% XTANDI net price reduction = approximately -¥40B Core OP annual impact. Astellas targets maintaining Core OP margin above 23% even under a 20% IRA scenario with SMT offset.',
      status: 'at-risk',
      budget: 1200,
      spent: 450,
      progress: 35,
    },
  });

  await prisma.initiativeMilestone.createMany({
    data: [
      { initiativeId: iraRisk.id, name: 'CMS IRA Cycle 2 Negotiation Period — XTANDI Included', date: '2025-09-30', status: 'completed' },
      { initiativeId: iraRisk.id, name: 'CMS Maximum Fair Price Publication (expected)', date: '2026-08-01', status: 'in-progress' },
      { initiativeId: iraRisk.id, name: 'XTANDI IRA MFP Effective Date (Medicare Part D)', date: '2028-01-01', status: 'planned' },
    ],
  });

  await prisma.initiativeKPI.createMany({
    data: [
      { initiativeId: iraRisk.id, label: 'XTANDI US Revenue at Risk', target: 'Manage IRA impact <-¥50B Core OP', actual: 'MFP not yet published', status: 'warning' },
      { initiativeId: iraRisk.id, label: 'SMT Offset Capacity vs IRA', target: 'Full offset at ¥40B+ SMT', actual: 'FY2025 ¥21B base established', status: 'warning' },
    ],
  });

  const pipeline = await prisma.strategicInitiative.create({
    data: {
      companyId,
      externalId: 'pipeline-poc-programme',
      name: 'R&D Pipeline POC Programme — Phase 3 Initiation Pathway',
      description:
        'Astellas\' focused R&D model is built around a Proof of Concept (POC) gate that determines whether early-stage assets advance to Phase 3 investment. In FY2025, three POC successes were confirmed — the highest annual count since restructuring to the focused areas model (oncology, immunology, rx+). The FY2026 target is to advance three additional Phase 3 initiations from the POC-positive assets, building the mid-term revenue pipeline that will sustain growth in FY2029+ once XTANDI revenues normalise under IRA. Key pipeline assets progressing through POC in FY2026 include AT-527 (NS5B inhibitor repurposed oncology), gilteritinib combinations (AML post-POC Phase 3 expansion), and early-stage KRAS inhibitor programme. The POC programme is also the primary mechanism for external business development — POC-positive assets in partnered programmes (Pfizer PADCEV, Seagen legacy) demonstrate Astellas\' capability to attract co-development partners. Management targets a pipeline NPV replacement ratio of >1.0x vs XTANDI IRA erosion over the FY2027–2030 horizon.',
      status: 'on-track',
      budget: 314800,
      spent: 172000,
      progress: 55,
    },
  });

  await prisma.initiativeMilestone.createMany({
    data: [
      { initiativeId: pipeline.id, name: 'FY2025 — 3 POC Successes Confirmed (Record Annual Count)', date: '2026-03-31', status: 'completed' },
      { initiativeId: pipeline.id, name: 'FY2026 — 3 Phase 3 Initiations from POC-Positive Assets', date: '2027-03-31', status: 'in-progress' },
      { initiativeId: pipeline.id, name: 'FY2027 — Pipeline NPV Replacement Ratio >1.0x XTANDI IRA Erosion', date: '2028-03-31', status: 'planned' },
    ],
  });

  await prisma.initiativeKPI.createMany({
    data: [
      { initiativeId: pipeline.id, label: 'FY2025 POC Successes', target: '3 POCs per year', actual: '3 confirmed FY2025', status: 'good' },
      { initiativeId: pipeline.id, label: 'FY2026 Phase 3 Initiations', target: '3 initiations', actual: 'Progressing from POC-positive assets', status: 'good' },
    ],
  });

  const china = await prisma.strategicInitiative.create({
    data: {
      companyId,
      externalId: 'china-market-expansion',
      name: 'China Market Expansion — XTANDI & VYLOY Scale-Up',
      description:
        'China is Astellas\' fastest-growing regional market, with revenue reaching ¥101.5B in FY2025 (+29.6% YoY), driven by XTANDI volume growth following National Reimbursement Drug List (NRDL) inclusion and early VYLOY launch. The FY2026 target is ¥150B+ (+48% YoY), contingent on: (1) XTANDI volume expansion as NRDL coverage deepens into lower-tier cities; (2) VYLOY NRDL application submission and potential 2026 inclusion (gastric cancer is the leading cancer type in China by incidence); (3) PADCEV regulatory approval filing with NMPA for urothelial carcinoma. China now represents ~5% of group revenue and is expected to reach 8–10% by FY2027, making it the most important growth geography outside the US. The China market expansion is partially de-risked from XTANDI IRA pressure, as Chinese pricing is set independently through NRDL negotiation rather than CMS. Key risk: NRDL price reduction requirements at each renewal cycle (typically 10–15% per renegotiation) and market access delays for VYLOY.',
      status: 'on-track',
      budget: 45000,
      spent: 21000,
      progress: 45,
    },
  });

  await prisma.initiativeMilestone.createMany({
    data: [
      { initiativeId: china.id, name: 'FY2025 — China Revenue ¥101.5B (+29.6% YoY) Delivered', date: '2026-03-31', status: 'completed' },
      { initiativeId: china.id, name: 'FY2026 — VYLOY China NRDL Application Submission', date: '2026-09-30', status: 'in-progress' },
      { initiativeId: china.id, name: 'FY2027 — China Revenue ¥150B+ / 8% of Group Total', date: '2028-03-31', status: 'planned' },
    ],
  });

  await prisma.initiativeKPI.createMany({
    data: [
      { initiativeId: china.id, label: 'China Revenue', target: '¥150B+ FY2026', actual: '¥101.5B FY2025', status: 'good' },
      { initiativeId: china.id, label: 'China Revenue Growth', target: '+48% YoY FY2026', actual: '+29.6% FY2025', status: 'good' },
    ],
  });

  console.log('Seeded 5 strategic initiatives with milestones and KPIs');

  // ── Risk Items ──────────────────────────────────────────────────────────

  await prisma.riskItem.createMany({
    data: [
      {
        companyId,
        externalId: 'xtandi-ira-price-risk',
        category: 'Regulatory',
        title: 'XTANDI IRA Maximum Fair Price — Net Revenue Erosion Risk',
        description:
          'CMS selected XTANDI for IRA Cycle 2 drug price negotiation. The Maximum Fair Price (MFP), once published, applies to Medicare Part D utilisation. XTANDI US revenue (~¥400B FY2025) is concentrated in the prostate cancer patient population, of which a significant share are Medicare-eligible. A 10–25% net price reduction applied to the Medicare portion of XTANDI volume would represent the largest single earnings headwind Astellas has faced since the XTANDI launch.',
        severity: 'high',
        likelihood: 'high',
        impact:
          'Each 5% XTANDI net price reduction on Medicare-eligible volume ≈ -¥20B Core OP. A 20% MFP cut (bear case) = approximately -¥80B Core OP annually from FY2028, representing ~14% of FY2025 Core OP (¥556.4B). Combined SMT (¥40B FY2026) and Strategic Brands growth (+¥130B to ¥610B) provide partial offset capacity.',
        mitigation:
          'SMT cost savings (¥40B FY2026); Strategic Brands acceleration to ¥610B; legal engagement in CMS negotiation process; IRA scenario planning embedded in FY2027 financial guidance framework',
        owner: 'CFO Office / Government Affairs',
      },
      {
        companyId,
        externalId: 'arsi-competition-risk',
        category: 'Commercial',
        title: 'ARSi Competition — Erleada and Nubeqa Market Share Pressure on XTANDI',
        description:
          'XTANDI (enzalutamide) faces intensifying competition from J&J\'s Erleada (apalutamide) and Bayer\'s Nubeqa (darolutamide) in the androgen receptor signalling inhibitor (ARSi) class across mCRPC, nmCRPC, and mCSPC indications. Both competitors have equivalent efficacy data in key indications and are aggressively pursuing formulary and reimbursement positioning. XTANDI\'s volume growth has moderated in the US as the three-product market matures.',
        severity: 'high',
        likelihood: 'medium',
        impact:
          'XTANDI US volume growth has decelerated from double-digit to mid-single-digit YoY. A share loss of 3pp in any major indication = approximately -¥12B annual revenue. In a scenario where Erleada or Nubeqa gains preferential formulary tier in major US managed care plans, XTANDI could face co-pay and access headwinds that compound IRA net price pressure.',
        mitigation:
          'XTANDI label expansion into earlier lines of therapy; physician education on differentiated tolerability and CNS penetration profile; managed care formulary access management; combination therapy data generation (XTANDI + PADCEV in urothelial/prostate overlap)',
        owner: 'Global Commercial — Oncology',
      },
      {
        companyId,
        externalId: 'vyloy-launch-execution-risk',
        category: 'Commercial',
        title: 'VYLOY Launch Execution Risk — Gastric Cancer Market Penetration',
        description:
          'VYLOY (zolbetuximab) is the most important new launch in Astellas\' pipeline and the primary contributor to Strategic Brands growth beyond XTANDI. VYLOY targets CLDN18.2-positive, HER2-negative gastric and gastroesophageal junction (GEJ) cancer — the first approved therapy targeting this biomarker. Launch success requires: (1) rapid CLDN18.2 biomarker testing adoption by oncologists; (2) payer reimbursement in the US, EU, and Japan; (3) effective medical education in a patient population with short median survival and high physician urgency. Gastric cancer has historically been underserved by novel therapies outside Japan and East Asia, creating both opportunity and commercial execution challenge.',
        severity: 'high',
        likelihood: 'medium',
        impact:
          'VYLOY is expected to be the largest contributor to Strategic Brands growth acceleration from ¥480.3B to ¥610B (FY2026). A significant launch underperformance (50% below plan) would remove ¥30–40B from the FY2026 Strategic Brands revenue target and put the group revenue growth thesis at risk. VYLOY China launch is separately tracked as an upside opportunity given the high gastric cancer incidence in China.',
        mitigation:
          'Pre-launch biomarker testing infrastructure investment; companion diagnostic partnerships; payer access teams deployed ahead of approval; Japan early access programme leveraging existing oncologist relationships',
        owner: 'Global Commercial — Oncology / Medical Affairs',
      },
      {
        companyId,
        externalId: 'fx-yen-depreciation-risk',
        category: 'Financial',
        title: 'FX Risk — USD/JPY and Yen Strengthening Adverse Impact',
        description:
          'Astellas reports in Japanese Yen (¥) but generates approximately 44% of revenue in the United States (USD) and significant additional revenue in EUR and other currencies. Yen strengthening against USD is an adverse revenue translation risk — each ¥1 strengthening of the Yen vs the USD reduces reported group revenue by approximately ¥8–10B annualised and reduces Core OP by ¥4–5B given the revenue flow-through. FY2025 was conducted at an average USD/JPY rate of approximately ¥153. The FY2026 planning assumption is ¥151.',
        severity: 'medium',
        likelihood: 'medium',
        impact:
          'A sustained move from ¥151 to ¥140 = approximately -¥90B group revenue and -¥45B Core OP on an annualised basis — a ~8% Core OP headwind vs FY2025 actuals. Conversely, Yen depreciation to ¥165 = approximately +¥120B revenue tailwind. FX sensitivity is material enough that each quarterly earnings release requires a constant-currency revenue reconciliation.',
        mitigation:
          'Natural hedge via USD-denominated R&D and manufacturing costs; FX hedging programme managed by Treasury; constant-currency financial targets set alongside reported targets in management guidance',
        owner: 'Treasury / CFO Office',
      },
      {
        companyId,
        externalId: 'phase3-binary-outcome-risk',
        category: 'Pipeline',
        title: 'Phase 3 Binary Outcome Risk — POC-Positive Assets',
        description:
          'Astellas\' R&D model concentrates capital behind POC-positive assets advancing to Phase 3. Phase 3 trials involve hundreds of millions of yen in investment per programme. Binary Phase 3 failures in key assets (particularly in oncology, where overall survival endpoints require 3–5 year trial durations) can result in large one-time R&D charges and elimination of expected future revenue streams. With 3 FY2025 POC successes advancing to Phase 3 initiation in FY2026, the portfolio now has material binary clinical risk in multiple programmes simultaneously.',
        severity: 'high',
        likelihood: 'low',
        impact:
          'A Phase 3 failure in a lead oncology asset could result in a ¥30–80B one-time R&D write-down and removal of ¥150–300B in pipeline NPV. Multiple simultaneous failures (low probability) could cause a significant re-rating of Astellas\' pipeline multiple and pressure on the strategic value of the rx+ focused area.',
        mitigation:
          'POC gating framework concentrates capital behind data-validated assets; biomarker-selected patient populations improve success probability; ex-US partnering (Pfizer PADCEV model) shares development cost and risk; portfolio diversification across focused areas (oncology, immunology, rx+)',
        owner: 'Chief Scientific Officer / R&D',
      },
      {
        companyId,
        externalId: 'smt-delivery-risk',
        category: 'Operational',
        title: 'SMT Savings Delivery Shortfall — ¥40B FY2026 Target Risk',
        description:
          'The SMT programme target of ¥40B incremental savings in FY2026 is the largest internal earnings lever in the group plan. Delivery depends on headcount rationalisation, portfolio exits, and procurement savings that can be subject to execution delays, regulatory requirements, and commercial disruption if cuts are too deep in growth markets. The FY2025 ¥21B delivery established credibility, but FY2026 is nearly double the prior year\'s savings and involves more structurally complex actions (manufacturing network rationalisation).',
        severity: 'medium',
        likelihood: 'medium',
        impact:
          'Each ¥10B SMT shortfall vs ¥40B target reduces Core OP margin by approximately 0.5pp. A ¥15B shortfall (¥25B delivered vs ¥40B target) would keep Core OP margin near 26.0% FY2025 levels rather than the planned expansion, reducing EPS growth trajectory and the buffer against IRA price headwinds.',
        mitigation:
          'Programme management office with quarterly delivery tracking; early identification of at-risk workstreams; reinvestment of savings offset by commercial investment protection in VYLOY/PADCEV launch markets',
        owner: 'CFO / COO',
      },
    ],
  });

  console.log('Seeded 6 risk items');

  // ── Forward Outlook ───────────────────────────────────────────────────

  await prisma.forwardOutlook.createMany({
    data: [
      {
        companyId,
        period: 'H1 FY26',
        revenueForecast: 1068000,
        revenuePlan: 1050000,
        marginForecast: 26.5,
        marginPlan: 26.0,
        keyAssumptions: [
          'XTANDI US volume growth +5.3% sustained; no IRA MFP effective yet',
          'VYLOY launch ramp H1 — Japan and US reimbursement secured',
          'SMT FY2026 savings on track for ¥18B H1 delivery',
          'USD/JPY ~¥151 planning rate; FX neutral to minor tailwind assumed',
        ],
      },
      {
        companyId,
        period: 'H2 FY26E',
        revenueForecast: 1110000,
        revenuePlan: 1089245,
        marginForecast: 26.8,
        marginPlan: 26.5,
        keyAssumptions: [
          'VYLOY acceleration H2 — EU label expansion and China NRDL progress',
          'PADCEV EV-302 perioperative data supporting earlier line label expansion',
          'SMT FY2026 H2 savings: remaining ¥22B of ¥40B annual target',
          'CMS IRA MFP for XTANDI expected to be published — implementation FY2028',
        ],
      },
      {
        companyId,
        period: 'FY26E',
        revenueForecast: 2178245,
        revenuePlan: 2139245,
        marginForecast: 26.7,
        marginPlan: 26.3,
        keyAssumptions: [
          'Strategic Brands ¥610B target (+27% YoY from ¥480.3B FY2025)',
          'SMT ¥40B incremental savings; cumulative ¥61B delivered',
          'China revenue ¥130B+ (+28% YoY from ¥101.5B)',
          'Core OP margin guidance: 26%+ with SMT offset against IRA planning',
        ],
      },
      {
        companyId,
        period: 'FY27E',
        revenueForecast: 2310000,
        revenuePlan: 2280000,
        marginForecast: 27.0,
        marginPlan: 26.5,
        keyAssumptions: [
          'XTANDI IRA MFP effective January 2028 — FY2027 is pre-IRA peak revenue year',
          'VYLOY reaching ¥150B+ on global roll-out momentum',
          'Pipeline Phase 3 data readouts from FY2026 initiations',
          'SMT cumulative ¥65B target complete; focus shifts to productivity reinvestment',
        ],
      },
    ],
  });

  console.log('Seeded 4 forward outlook periods');

  // ── Key Opportunities ─────────────────────────────────────────────────

  await prisma.keyOpportunity.createMany({
    data: [
      {
        companyId,
        title: 'VYLOY Global Launch — ¥200B+ Revenue Opportunity by FY2027',
        revenueImpact: '¥200B+ peak annual revenue by FY2027; ¥70B FY2026 target',
        description:
          'VYLOY (zolbetuximab) is the first approved therapy targeting CLDN18.2-positive gastric and GEJ cancer — a biomarker present in approximately 38% of gastric/GEJ tumours globally. Approved in the US, Japan, and EU. The global gastric cancer market (~200,000 eligible patients/year in major markets) is transitioning from chemotherapy backbone to targeted add-on therapy. VYLOY\'s mechanism is differentiated from PD-1/PD-L1 immunotherapy and can be used in combination, creating an additive therapy opportunity. Key upside beyond base case: CLDN18.2 expression in additional tumour types (pancreatic, colon) being explored in line extension trials — if one additional indication is approved, addressable patient population doubles. China gastric cancer incidence (~500,000 cases/year) is the largest single market opportunity and is being pursued via NRDL expedited pathway.',
        timeline: '2026–2028',
      },
      {
        companyId,
        title: 'PADCEV Earlier Lines — EV-302 Perioperative Urothelial Carcinoma',
        revenueImpact: '¥80B incremental revenue opportunity in perioperative UC setting',
        description:
          'PADCEV (enfortumab vedotin) is co-promoted with Pfizer and is established in post-platinum metastatic urothelial carcinoma (mUC). EV-302 trial data exploring PADCEV + pembrolizumab in the earlier perioperative (neoadjuvant/adjuvant) setting could expand the eligible patient population by approximately 3–4x vs the current metastatic indication. Perioperative bladder cancer management is a high-value unmet need with no approved targeted therapies. If the EV-302 perioperative arm data are positive (expected readout FY2026–27), PADCEV label expansion would create one of the largest oncology revenue growth events in Astellas\' history. Combined PADCEV global peak revenue at earlier lines could exceed ¥250B vs the current ~¥120B trajectory.',
        timeline: '2026–2027',
      },
      {
        companyId,
        title: 'China Market — XTANDI + VYLOY Dual Growth to ¥150B+',
        revenueImpact: '¥150B+ China revenue by FY2026; ¥250B+ longer-term potential',
        description:
          'China represents Astellas\' highest-growth market at +29.6% YoY in FY2025, with two catalysts converging: XTANDI NRDL volume deepening into lower-tier cities (prostate cancer is under-diagnosed and under-treated in China relative to the true incidence), and VYLOY\'s potential NRDL inclusion given gastric cancer\'s status as the most prevalent cancer by incidence in China. PADCEV NMPA filing in FY2026 creates a third China growth pillar. China\'s value-based NRDL pricing compresses per-unit revenue vs US but the volume opportunity is structurally larger. Astellas\' China operation has invested in medical affairs and market access teams specifically for oncology — a competitive advantage vs smaller Japan pharma companies entering China.',
        timeline: '2026–2028',
      },
      {
        companyId,
        title: 'SMT Programme Overdelivery — ¥55B+ vs ¥40B FY2026 Target',
        revenueImpact: '¥15B additional Core OP if SMT delivers ¥55B vs ¥40B plan',
        description:
          'The SMT programme has delivered ahead of internal expectations at the individual workstream level in several SG&A and procurement categories. If the FY2026 delivery accelerates to ¥55B vs the ¥40B target (as was seen in FY2025 where execution quality established a strong base), the additional ¥15B Core OP upside would flow directly to EPS and provide a material IRA buffer. Manufacturing network rationalisation and third-party manufacturing consolidation are the two workstreams with the greatest potential for above-plan delivery — both involve structural decisions (plant closures, CMO contract renegotiation) where timing can pull forward savings into FY2026.',
        timeline: '2026',
      },
      {
        companyId,
        title: 'IZERVAY Market Leadership in Geographic Atrophy',
        revenueImpact: '¥50B+ peak revenue potential in US geographic atrophy market',
        description:
          'IZERVAY (avacincaptad pegol) is approved in the US for geographic atrophy (GA) — the advanced form of dry age-related macular degeneration. Geographic atrophy affects approximately 1.2M Americans and is the leading cause of severe vision loss in patients over 65. IZERVAY is one of only two approved therapies in this indication. The complement inhibition mechanism is the validated pathway for GA treatment. Astellas\' IZERVAY market share vs the first-approved pegcetacoplan (Syfovre, Apellis) is being built through patient and physician education, dosing frequency advantage (monthly vs bimonthly), and managed care formulary access. GA market penetration is still under 5% of eligible patients — representing a multi-year ramp opportunity as ophthalmologist adoption accelerates.',
        timeline: '2026–2028',
      },
    ],
  });

  console.log('Seeded 5 key opportunities');
}
