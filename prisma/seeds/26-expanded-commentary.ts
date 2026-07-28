import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 26: Expanded Executive Commentary — Astellas Pharma Inc. (OTC: ALPMY)
// ~22 commentary entries covering Q1 FY25 through Q1 FY26.
//
// Authors: Naoki Okamura (CEO), Atsushi Kitamura (CFO),
//   David Ramsay (Chief Commercial Officer),
//   Bernhardt Zeiher (Chief Medical Officer),
//   Hiroshi Miyamoto (Chief Strategy Officer)
//
// Periods: Q1–Q4 FY25 and Q1 FY26 (quarterly and annual perspectives)
// Fiscal Year: April 1 – March 31; Q1 FY25 = April–June 2025
// All monetary values in JPY billions (¥B) unless stated
// =============================================================================

export async function seedExpandedCommentary(prisma: PrismaClient, companyId: number) {
  console.log('Seeding expanded Astellas Pharma commentary (~22 entries, FY25–FY26)...');

  // Look up driver IDs for linking
  const driverNameToId = new Map<string, number>();
  const driverLookupNames = [
    'Core OP Margin',
    'Core Operating Income',
    'R&D Expense',
    'XTANDI Revenue',
    'SMT Savings',
    'PADCEV Revenue',
    'VEOZAH Revenue',
    'Strategic Brands Revenue',
    'Japan Revenue',
    'VYLOY Revenue',
    'IZERVAY Revenue',
    'China Revenue',
    'Established Markets Revenue',
    'United States Revenue',
    'Core EPS',
    'Operating Cash Flow',
    'Total Revenue',
    'USD/JPY Rate',
    'R&D Pipeline Value',
    'XTANDI US Market Share',
  ];
  for (const name of driverLookupNames) {
    const driver = await prisma.consoleDriver.findFirst({
      where: { console: { companyId }, name },
      select: { id: true },
    });
    if (driver) driverNameToId.set(name, driver.id);
  }

  const commentary = [

    // =========================================================================
    // Q1 FY25 PERSPECTIVES (4 entries: CEO, CFO, CMO, CCO)
    // =========================================================================
    {
      title: 'Q1 FY25 CEO Message — Strategic Brands Momentum and SMT Phase 1 Launch',
      content: `## Q1 FY25 — Strategic Brands Momentum and SMT Programme Launch

Q1 FY25 (April–June 2025) was a quarter of active investment and strong underlying momentum for Astellas. Revenue of ¥537.9B and Core OP of ¥130.8B (Core OP margin 24.3%) reflect the front-loaded investment in our strategic brand launches — VYLOY and IZERVAY both entered commercial markets in April 2025, and the initial SG&A investment is typical of launch quarters.

**CEO Perspective (Naoki Okamura):**

The Sustainable Margin Transformation (SMT) programme formally launched in Q1 FY25 with the announcement of our global organisational redesign. Approximately 2,400 positions were identified for elimination across G&A and select SG&A functions — a difficult decision but a necessary one to position Astellas for a future where portfolio efficiency and therapeutic focus create durable shareholder value.

Strategic Brands grew +38% YoY in Q1 FY25, confirming that PADCEV, VEOZAH, IZERVAY, and VYLOY collectively represent a credible second revenue pillar alongside XTANDI. The PADCEV first-line mUC prescribing ramp following the CMS coverage determination is performing at or above modelled expectations at leading academic oncology centres.

Three priorities define our FY25 execution agenda:
- **IRA preparedness**: XTANDI MFP negotiation process is ongoing; our disclosures remain at ¥9.6B Core OP sensitivity per 1pp. The ¥21B SMT savings target for FY25 is the primary financial offset.
- **Strategic Brands acceleration**: Every percentage point of revenue mix shift from XTANDI to PADCEV/VEOZAH/IZERVAY/VYLOY reduces our IRA sensitivity profile.
- **Geographic diversification**: China Q1 FY25 grew +32% YoY — the NRDL listing pathway and NMPA submissions underway for PADCEV and VYLOY will further reduce our US concentration.

We are confident in the FY25 guidance of Core EPS ¥230–¥245 and Core Revenue ¥2,100–¥2,160B.`,
      contentPlain: 'Q1 FY25 revenue ¥537.9B, Core OP ¥130.8B (24.3% margin). SMT launched with 2,400 positions identified. Strategic Brands +38% YoY. Three priorities: IRA preparedness, Strategic Brands acceleration, geographic diversification. FY25 guidance confirmed: Core EPS ¥230–245, Core Revenue ¥2,100–2,160B.',
      authorName: 'Naoki Okamura',
      authorRole: 'Representative Director, President and CEO',
      category: 'Strategic',
      tags: ['q1-fy25', 'ceo-message', 'smt', 'strategic-brands', 'ira-preparedness', 'china-growth'],
      relatedKPIs: ['Core EPS', 'Strategic Brands Revenue', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'strategic-brands-growth', 'smt-cost-transformation'],
      relatedDrivers: ['Core EPS', 'Strategic Brands Revenue', 'SMT Savings'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'executive_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY25 CFO Message — P&L Bridge: Launch Investment vs. SMT Savings Trajectory',
      content: `## Q1 FY25 CFO Commentary — P&L Bridge and Financial Framework

Q1 FY25 Core OP margin of 24.3% is 170bps below the full-year guidance midpoint of 26.0%. This variance is intentional and planned — not a structural deterioration signal. This commentary provides the Q1 P&L bridge to help investors distinguish the timing effect from the trend.

**CFO Perspective (Atsushi Kitamura):**

**Q1 FY25 Core OP Margin Bridge:**
| Category | Impact (¥B) | Margin pts |
|---|---|---|
| VYLOY launch investment (SG&A) | -4.2 | -0.8pp |
| IZERVAY launch investment (SG&A) | -4.3 | -0.8pp |
| VEOZAH DTC investment | -2.1 | -0.4pp |
| SMT Phase 1 savings delivery | +3.8 | +0.7pp |
| PADCEV/XTANDI volume uplift | +2.5 | +0.5pp |
| Net Q1 vs. FY25 average margin gap | | -0.8pp |

The launch investments in VYLOY and IZERVAY (combined ¥8.5B Q1 SG&A) represent a temporary front-loading — both products are expected to contribute positive P&L in H2 FY25 as prescribing volumes ramp. This is consistent with our historical launch investment pattern for PADCEV (Q1 FY22 was also below the full-year Core OP margin).

SMT savings in Q1 FY25 were ¥3.8B — ahead of the ¥3.2B Q1 plan — due to accelerated procurement renegotiations completing in late FY24 and taking effect from Q1 FY25. Phase 1 implementation cost (¥2.1B in Q1) is excluded from Core financials as disclosed.

**FY25 Financial Guidance Reaffirmed:**
- Core Revenue: ¥2,100–¥2,160B
- Core OP Margin: 25.5–26.5%
- Core EPS: ¥230–¥245
- FCF: ¥480B+

The Q1 margin trough is a feature of our launch calendar, not a signal to revise guidance.`,
      contentPlain: 'Q1 FY25 Core OP margin 24.3%, 170bps below FY25 average — planned due to VYLOY/IZERVAY launch investment (¥8.5B combined). SMT Q1 savings ¥3.8B, ahead of ¥3.2B plan. FY25 guidance reaffirmed: Core Revenue ¥2,100–2,160B, Core OP margin 25.5–26.5%, Core EPS ¥230–245.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['q1-fy25', 'cfo-message', 'margin-bridge', 'smt', 'launch-investment', 'financial-guidance'],
      relatedKPIs: ['Core OP Margin', 'Core Operating Income', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'smt-cost-transformation'],
      relatedDrivers: ['Core OP Margin', 'SMT Savings', 'Core Operating Income'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY25 CMO Commentary — Phase 3 POC Strategy: PADCEV EV-302 and VYLOY Clinical Data Readouts',
      content: `## Q1 FY25 — Clinical Data Strategy: EV-302 and VYLOY Phase 3 Programmes

Q1 FY25 marks a pivotal clinical quarter for Astellas — two Phase 3 trials that define our near-term revenue trajectory are approaching data maturity, and one pipeline compound has entered Phase 3 initiation.

**Chief Medical Officer Perspective (Bernhardt Zeiher):**

**PADCEV EV-302 Updated Overall Survival Data:**
The EV-302 Phase 3 trial (enfortumab vedotin + pembrolizumab vs. chemotherapy in first-line mUC) has reached the pre-specified interim OS analysis milestone. Data readout is scheduled for presentation at ESMO 2025 (October). Our expectation, based on the early PFS benefit (HR 0.45, NEJM 2024) and immuno-oncology mechanism of pembrolizumab, is that OS will confirm PADCEV's first-line standard-of-care status. An OS hazard ratio below 0.65 would be considered practice-defining.

The OS readout is not just a clinical milestone — it is a commercial milestone. Academic oncology centres and major payer systems have conditioned full first-line PADCEV adoption on mature OS data. With OS data confirmed, we expect further market penetration at the tier-2 and tier-3 oncology centres that currently represent the largest PADCEV volume opportunity.

**VYLOY (Zolbetuximab) Japan Launch:**
VYLOY launched commercially in Japan in April 2025 as the first approved CLDN18.2-targeted therapy. Phase 3 SPOTLIGHT (gastric cancer, first-line) and GLOW (gastric cancer, subsequent line) results confirmed OS benefit in CLDN18.2-positive, HER2-negative patients. CLDN18.2 testing rate in Japanese gastric cancer patients is approximately 45% at Phase 1 launch — a critical limitation. Our medical affairs programme will drive testing adoption to 70%+ by Q3 FY25 through pathologist education and testing kit reimbursement facilitation.

**Pipeline:**
ASP3550 (FGFR inhibitor, bladder cancer) initiated Phase 3 in April 2025 — the third oncology compound in Phase 3 alongside XTANDI combinations and PADCEV indication expansions.`,
      contentPlain: 'EV-302 OS data at ESMO October 2025; expect OS HR <0.65 confirming first-line mUC SoC. VYLOY Japan launch April 2025; CLDN18.2 testing rate 45%, targeting 70%+ by Q3 FY25. ASP3550 Phase 3 initiated April 2025.',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Executive Vice President and Chief Medical Officer',
      category: 'Scientific',
      tags: ['q1-fy25', 'cmo-message', 'padcev', 'ev-302', 'vyloy', 'phase3', 'clinical-data'],
      relatedKPIs: ['PADCEV Revenue', 'VYLOY Revenue', 'R&D Pipeline Value'],
      relatedConsoles: ['strategic-brands-growth', 'enterprise-pipeline'],
      relatedDrivers: ['PADCEV Revenue', 'VYLOY Revenue', 'R&D Pipeline Value'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'clinical_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY25 CCO Commentary — VEOZAH Commercial Launch: Payer Coverage Inflection Strategy',
      content: `## Q1 FY25 — VEOZAH Commercial Strategy: Driving Payer Coverage to the Prescriber Inflection Point

VEOZAH (fezolinetant) generated ¥18.2B in Q1 FY25 — solid execution given that payer coverage at quarter start was approximately 41% of commercial plan lives. Our commercial model for VEOZAH is built around a proven hypothesis: OBGYN and primary care prescribers will confidently prescribe once payer coverage exceeds 50%. Q1 FY25 was the quarter we crossed that threshold.

**Chief Commercial Officer Perspective (David Ramsay):**

**The Payer Coverage Inflection Model:**
Women's health pharmaceuticals — unlike oncology products — are highly sensitive to payer formulary status at the point of prescribing. Our market research with 300+ OBGYN and primary care physicians confirms:
- At <40% commercial coverage: prescribers are reluctant to start VEOZAH; prior authorisation burden is high
- At 40–50% coverage: prescribers are willing to try for appropriate patients; PA approval rates ~65%
- At >50% coverage: routine prescribing begins; PA approval rates >80%; office coordinators no longer flag VEOZAH as "coverage uncertain"

We reached 51% commercial coverage in May 2025 (Q1 FY25 end). The prescription acceleration in the final month of Q1 was 34% above the Q1 April average weekly TRx rate. This is the inflection we modelled.

**Q2 FY25 Coverage Target: 56%**
Two major payer formulary decisions are expected in Q2 FY25: a national Blue Cross Blue Shield plan association (17M lives) and a large regional managed care organisation (4M lives). Together, these would bring us to approximately 56% coverage. Each 5pp coverage increase translates to approximately ¥4–5B incremental annualised VEOZAH revenue at current TRx rates.

**DTC Investment:**
We are investing ¥3.2B in DTC advertising through Q1–Q2 FY25 to drive awareness and patient demand pull. Cost per new patient start is currently ¥145K — 12% below our ¥165K model — reflecting strong early DTC efficiency.`,
      contentPlain: 'VEOZAH Q1 FY25 ¥18.2B. Payer coverage reached 51% in May 2025 — the prescriber inflection point. Prescription acceleration +34% in final month. Q2 target 56%. Each 5pp coverage increase = ¥4–5B incremental annualised revenue. DTC cost per new patient ¥145K, 12% below plan.',
      authorName: 'David Ramsay',
      authorRole: 'Executive Vice President and Chief Commercial Officer',
      category: 'Commercial',
      tags: ['q1-fy25', 'cco-message', 'veozah', 'payer-coverage', 'dtc', 'womens-health'],
      relatedKPIs: ['VEOZAH Revenue', 'Strategic Brands Revenue'],
      relatedConsoles: ['strategic-brands-growth'],
      relatedDrivers: ['VEOZAH Revenue', 'Strategic Brands Revenue'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'commercial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },

    // =========================================================================
    // Q2 FY25 PERSPECTIVES (4 entries)
    // =========================================================================
    {
      title: 'Q2 FY25 CEO Message — H1 FY25 Performance: On Track; IRA MFP Disclosure Update',
      content: `## Q2 FY25 — H1 FY25 Results and IRA MFP Disclosure

H1 FY25 revenue of ¥1,074.9B and Core OP of ¥269.3B (H1 Core OP margin 25.1%) are tracking in line with the full-year 25.5–26.5% guidance range. The H1 margin reflects the Q1 launch investment ramp normalising into Q2 as VYLOY and IZERVAY volumes begin contributing positively to the P&L.

**CEO Perspective (Naoki Okamura):**

**IRA MFP Disclosure:**
We are providing an updated XTANDI IRA sensitivity disclosure in conjunction with Q2 FY25 results. As previously indicated, XTANDI has been selected for IRA Maximum Fair Price negotiation effective January 2026. Our sensitivity analysis is:
- **¥9.6B Core OP impact per 1 percentage point of net price reduction** (US only; ex-US XTANDI not affected)
- Effective date: January 1, 2026 (affects Q4 FY25 and all of FY26 on a run-rate basis)
- Primary financial offset: SMT programme (¥21B FY25, ¥40B FY26 targets)

We believe the market has partially priced IRA risk into ALPMY. Our objective is to be the most transparent pharma company in the IRA negotiation process — quarterly updates on sensitivity calibration, SMT savings progress, and XTANDI international mix shift will be the primary disclosure framework.

**H1 Strategic Brands Review:**
- PADCEV H1: ¥107.5B, +33.1% YoY — first-line mUC volume ramp on track
- VEOZAH H1: ¥41.3B, +165% YoY — payer coverage reached 56% Q2 FY25 end
- IZERVAY H1: ¥24.8B — launch tracking 10% above plan
- VYLOY H1: ¥28.9B — Japan formulary adoption at 38% of target hospitals

FY25 guidance confirmed unchanged. H2 margin improvement is expected from SMT savings acceleration and Strategic Brands revenue scaling.`,
      contentPlain: 'H1 FY25 revenue ¥1,074.9B, Core OP ¥269.3B (25.1% margin). IRA sensitivity reaffirmed: ¥9.6B Core OP per 1pp. H1 Strategic Brands: PADCEV ¥107.5B +33%, VEOZAH ¥41.3B +165%, IZERVAY ¥24.8B (+10% above plan), VYLOY ¥28.9B. FY25 guidance confirmed.',
      authorName: 'Naoki Okamura',
      authorRole: 'Representative Director, President and CEO',
      category: 'Strategic',
      tags: ['q2-fy25', 'h1-fy25', 'ira-mfp', 'strategic-brands', 'padcev', 'veozah'],
      relatedKPIs: ['Core EPS', 'XTANDI Revenue', 'Strategic Brands Revenue'],
      relatedConsoles: ['financial-performance', 'strategic-brands-growth', 'oncology-xtandi-performance'],
      relatedDrivers: ['Core EPS', 'XTANDI Revenue', 'Strategic Brands Revenue'],
      fiscalPeriod: 'Q2 FY25',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'executive_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q2 FY25 CFO Message — SMT Phase 1 Acceleration: ¥11.2B H1 Savings; Procurement Outperformance',
      content: `## Q2 FY25 CFO Commentary — SMT Phase 1 Delivery Ahead of Plan

H1 FY25 SMT savings of ¥11.2B (Q1: ¥3.8B, Q2: ¥7.4B) are tracking 24% ahead of the ¥9.0B H1 plan. The acceleration reflects earlier-than-planned completion of procurement renegotiations and faster headcount reduction delivery in G&A functions.

**CFO Perspective (Atsushi Kitamura):**

**SMT H1 Savings by Category:**
| Programme | H1 Plan (¥B) | H1 Actual (¥B) | Variance |
|---|---|---|---|
| Procurement renegotiations | 3.0 | 4.3 | +¥1.3B |
| G&A headcount reduction | 3.5 | 4.1 | +¥0.6B |
| Manufacturing rationalisation | 1.5 | 1.8 | +¥0.3B |
| Real estate / IT consolidation | 1.0 | 1.0 | Flat |
| **Total Phase 1 H1** | **9.0** | **11.2** | **+¥2.2B** |

The procurement outperformance (¥1.3B vs. plan) resulted from Astellas's consolidated commodity volume commitments enabling more aggressive renegotiation leverage than anticipated. Seventeen supplier contracts were renegotiated in H1 FY25 vs. the 12 originally planned.

**FY25 SMT Target Revised Upward to ¥21B (from ¥18B initial):**
Based on H1 delivery and the visibility into H2 Phase 1 completion, we are raising the FY25 SMT savings target to ¥21B from the initial ¥18B target. The additional ¥3B will accrue to Core OP — Core EPS guidance is being revised upward to ¥232–¥248 (from ¥230–¥245) for FY25.

**Working Capital and FCF:**
H1 FCF of ¥248.2B was ¥18B above plan, driven by accelerated US managed care receivables collection and the SMT savings cash conversion. Full-year FCF guidance raised to ¥500B+ (from ¥480B+).`,
      contentPlain: 'H1 FY25 SMT savings ¥11.2B vs ¥9.0B plan (+24%). FY25 SMT target raised to ¥21B (from ¥18B). Core EPS guidance raised to ¥232–248 (from ¥230–245). H1 FCF ¥248.2B, +¥18B above plan. Full-year FCF guidance raised to ¥500B+.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['q2-fy25', 'smt', 'savings', 'fcf', 'guidance-update', 'procurement'],
      relatedKPIs: ['SMT Savings', 'Operating Cash Flow', 'Core EPS'],
      relatedConsoles: ['smt-cost-transformation', 'financial-performance'],
      relatedDrivers: ['SMT Savings', 'Operating Cash Flow', 'Core EPS'],
      fiscalPeriod: 'Q2 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q2 FY25 CSO Commentary — China Growth Strategy: NRDL Pathway and NMPA Filing Roadmap',
      content: `## Q2 FY25 — China Growth Strategy: NRDL and NMPA Portfolio Expansion

China revenue of ¥51.3B in Q2 FY25 was +31% YoY — the highest single-quarter China growth in 5 years. This commentary outlines the strategic rationale and execution framework for China as a structural growth platform.

**Chief Strategy Officer Perspective (Hiroshi Miyamoto):**

**The China Pharmaceutical Opportunity:**
China is the world's second-largest pharmaceutical market (approximately ¥280T, growing 12% annually), yet Astellas generates only approximately 5% of revenue from China — significantly below our strategic potential. The gap reflects historical market access complexity and launch sequencing constraints. We are closing that gap systematically through three parallel workstreams.

**Workstream 1: NRDL Listings**
VYLOY received NRDL listing effective January 2026 — the fastest NRDL approval timeline for a foreign oncology product in our portfolio history (9 months from NMPA approval to NRDL listing). XTANDI has been on NRDL since 2020 but with price reduction of approximately 68% from WAC — the volume uplift (approximately 4x) has more than offset the price reduction in JPY terms. We are targeting PADCEV NRDL listing in Q2 FY26 following the NMPA approval (December 2025) and price negotiation (Q1 FY26 timeline).

**Workstream 2: NMPA Filing Expansion**
PADCEV NMPA sNDA for urothelial carcinoma was filed Q3 FY24; approval received December 2025. IZERVAY NMPA filing is planned for Q4 FY25 (geographic atrophy — a significant unmet need in China's aging population). VEOZAH will be assessed for NMPA filing in FY26 as the women's health market in China develops.

**Workstream 3: China Oncology Infrastructure**
We are doubling the China Astellas oncology sales force (180 → 360 representatives) in H2 FY25 to support VYLOY and the anticipated PADCEV launch. Hospital account management depth at tier-1 cancer hospitals is the primary commercial execution lever.

**FY26 China Revenue Target: ¥140–150B** (vs. ¥101.5B FY25)`,
      contentPlain: 'China Q2 FY25 ¥51.3B +31% YoY. Three workstreams: NRDL listings (VYLOY effective Jan 2026; PADCEV targeting Q2 FY26), NMPA filing expansion (PADCEV approved Dec 2025; IZERVAY Q4 FY25), China oncology sales force doubling (180→360). FY26 China target ¥140–150B.',
      authorName: 'Hiroshi Miyamoto',
      authorRole: 'Executive Vice President and Chief Strategy Officer',
      category: 'Strategic',
      tags: ['q2-fy25', 'china', 'nrdl', 'nmpa', 'vyloy', 'padcev', 'market-access'],
      relatedKPIs: ['China Revenue', 'VYLOY Revenue', 'PADCEV Revenue'],
      relatedConsoles: ['international-asia-performance', 'strategic-brands-growth'],
      relatedDrivers: ['China Revenue', 'VYLOY Revenue', 'PADCEV Revenue'],
      fiscalPeriod: 'Q2 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'strategic_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q2 FY25 CMO Commentary — ESMO Preview: EV-302 OS Data Will Define First-Line mUC Standard of Care',
      content: `## Q2 FY25 — Preparing the ESMO October 2025 Platform: EV-302 OS Data Preview

As we enter Q3 FY25 (July–September 2025), the medical and scientific calendar for Astellas is defined by a single event: the EV-302 overall survival data presentation at ESMO October 2025. This commentary provides the clinical rationale and commercial implications of the anticipated readout.

**Chief Medical Officer Perspective (Bernhardt Zeiher):**

**EV-302 Scientific Background:**
EV-302 was the Phase 3 registration trial for enfortumab vedotin (EV) + pembrolizumab (pembro) vs. platinum-based chemotherapy in previously untreated locally advanced/metastatic urothelial carcinoma (la/mUC). The primary endpoint (progression-free survival) showed HR 0.45 (95% CI 0.38–0.54), establishing PADCEV as first-line standard of care in most OECD markets. Overall survival was the key secondary endpoint — interim data at a protocol-specified event threshold is what we will present at ESMO.

**Expected Clinical Impact:**
Based on the landmark PFS benefit and the mechanism of pembrolizumab (durable responder population), we anticipate OS HR in the 0.55–0.65 range. An OS HR below 0.65 would represent a clinically meaningful, statistically significant OS benefit — placing PADCEV in the category of treatments that extend life, not just delay progression.

**Commercial Impact of OS Confirmation:**
Our market research with 250+ US and European oncologists identified three segments that conditioned PADCEV adoption on OS data:
1. Community oncologists (majority of prescription volume): currently prescribing PADCEV in 62% of first-line mUC patients. OS data expected to push adoption to 75–80%.
2. National payer P&T committees: several health plans have provisional PADCEV coverage pending OS data. Confirmation will convert provisional to permanent preferred formulary positioning.
3. European HTA bodies (France HAS, UK NICE, Germany G-BA): OS data confirmation is the primary evidence criterion for value-based reimbursement decisions.

We will present OS data alongside circulating tumour DNA (ctDNA) biomarker analysis to identify the molecular characteristics of patients achieving the most durable OS benefit — advancing the precision oncology narrative for PADCEV.`,
      contentPlain: 'EV-302 OS data at ESMO October 2025. Primary PFS HR 0.45 already confirmed SoC. Expected OS HR 0.55–0.65. Three market segments conditioned on OS: community oncologists (62%→75–80%), national payer P&T committees, European HTA bodies. ctDNA biomarker analysis to accompany OS.',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Executive Vice President and Chief Medical Officer',
      category: 'Scientific',
      tags: ['q2-fy25', 'esmo', 'ev-302', 'padcev', 'overall-survival', 'urothelial-carcinoma', 'clinical-data'],
      relatedKPIs: ['PADCEV Revenue', 'R&D Pipeline Value'],
      relatedConsoles: ['strategic-brands-growth', 'enterprise-pipeline'],
      relatedDrivers: ['PADCEV Revenue', 'R&D Pipeline Value'],
      fiscalPeriod: 'Q2 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'clinical_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },

    // =========================================================================
    // Q3 FY25 PERSPECTIVES (4 entries)
    // =========================================================================
    {
      title: 'Q3 FY25 CEO Message — ESMO Data Confirms PADCEV SoC; SMT Phase 1 Completion 6 Months Early',
      content: `## Q3 FY25 — PADCEV SoC Confirmation and SMT Phase 1 Complete

Q3 FY25 (October–December 2025) was the quarter that cemented Astellas's strategic direction. Two milestones define the quarter: the EV-302 OS data presentation at ESMO confirming PADCEV as the established standard of care for first-line mUC, and the completion of SMT Phase 1 — 6 months ahead of the April 2026 target.

**CEO Perspective (Naoki Okamura):**

**EV-302 OS Data — Scientific and Commercial Milestone:**
The EV-302 OS interim analysis confirmed an OS hazard ratio of 0.55 (95% CI 0.46–0.66) — the most significant overall survival benefit achieved in first-line urothelial carcinoma in the modern era. With chemotherapy as the comparator, PADCEV demonstrated the capability to extend median overall survival by approximately 31.5 months vs. 16.1 months for chemotherapy. This data ends the academic debate about first-line mUC standard of care and creates an unambiguous commercial mandate for PADCEV adoption.

Within 60 days of the ESMO presentation, three major US payer systems (covering approximately 45M lives) elevated PADCEV from "preferred with prior authorisation" to "preferred without prior authorisation" in their oncology formularies. This formulary change eliminates the primary prescription friction for community oncologists — we expect Q1 FY26 PADCEV prescriptions to reflect this access improvement.

**SMT Phase 1 Complete:**
SMT Phase 1 (organisational redesign, procurement, manufacturing) was declared complete in October 2025 — 6 months ahead of the April 2026 target. Final Phase 1 savings delivery: ¥21B in FY25, ¥3B above the revised upward target of ¥18B (initial) / ¥21B (H1 revised). Phase 2 begins immediately — IT rationalisation and shared services expansion — with a ¥15–18B additional savings target for FY26.

**Q3 FY25 Financial Highlights:**
Core OP margin of 32.8% — the highest quarterly margin in 5 years — reflects the royalty milestone payment from Pfizer (¥8.5B) and Phase 1 SMT savings front-loading. This is not a run-rate — the full-year 26.0% remains the relevant benchmark.`,
      contentPlain: 'Q3 FY25: EV-302 OS HR 0.55, confirming PADCEV SoC in first-line mUC. Three major US payers removed PA requirement for PADCEV. SMT Phase 1 complete in October 2025, 6 months early — ¥21B savings delivered. Q3 Core OP margin 32.8% (Pfizer royalty milestone + SMT front-load); not a run-rate.',
      authorName: 'Naoki Okamura',
      authorRole: 'Representative Director, President and CEO',
      category: 'Strategic',
      tags: ['q3-fy25', 'padcev', 'ev-302', 'esmo', 'smt', 'standard-of-care', 'milestone'],
      relatedKPIs: ['PADCEV Revenue', 'SMT Savings', 'Core OP Margin'],
      relatedConsoles: ['strategic-brands-growth', 'smt-cost-transformation', 'financial-performance'],
      relatedDrivers: ['PADCEV Revenue', 'SMT Savings', 'Core OP Margin'],
      fiscalPeriod: 'Q3 FY25',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'executive_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q3 FY25 CFO Message — Q3 Margin Spike Explained; IRA Financial Framework Finalised',
      content: `## Q3 FY25 CFO Commentary — Q3 32.8% Margin: Three-Factor Analysis and IRA Financial Planning

Q3 FY25 Core OP margin of 32.8% will attract significant investor attention as an anomaly above the full-year 26.0% average. This commentary explains the three specific factors and why the Q3 spike does not change full-year guidance.

**CFO Perspective (Atsushi Kitamura):**

**Q3 FY25 Core OP Margin Bridge from FY25 Average (26.0%):**
| Factor | Impact |
|---|---|
| Pfizer XTANDI royalty milestone (¥8.5B) | +¥8.5B / +4.0pp |
| SMT Phase 1 savings front-loaded to Q3 | +¥3.2B / +1.5pp |
| R&D spend below plan (Phase 3 enrolment) | +¥2.1B / +1.0pp |
| One-time manufacturing adjustment | +¥1.0B / +0.5pp |
| Q4 NHI Japan accrual (reverse effect) | recognised in Q4 |
| **Net Q3 vs. FY25 average** | **+6.8pp → 32.8%** |

The Pfizer royalty milestone (¥8.5B) is the largest single factor. This milestone is associated with XTANDI US market exclusivity extension and is recognised in Q3 per the collaboration agreement milestone schedule. It is not recurring — no similar milestone is expected in FY26.

**IRA Financial Planning Framework:**
Based on the now-disclosed XTANDI MFP outcome, I can provide the following financial framework for FY26 XTANDI IRA planning assumptions:
- Net US XTANDI price reduction impact embedded in FY26 guidance: approximately ¥11.2B
- This translates to approximately ¥4.7 of Core EPS headwind
- SMT Phase 2 savings of ¥15–18B provide a 3.2–3.8x offset
- FY26 Core EPS guidance of ¥248–¥255 reflects this net-of-SMT IRA impact

We are providing quarterly XTANDI IRA sensitivity updates to maintain full transparency through the MFP implementation period.`,
      contentPlain: 'Q3 FY25 32.8% margin: +4.0pp from Pfizer royalty (¥8.5B), +1.5pp SMT front-load, +1.0pp R&D below plan, +0.5pp manufacturing. FY26 IRA framework: ¥11.2B net XTANDI price impact; ¥4.7 Core EPS headwind; SMT Phase 2 ¥15–18B provides 3.2–3.8x offset. FY26 Core EPS guidance ¥248–255.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['q3-fy25', 'margin', 'ira', 'mfp', 'cfo-message', 'xtandi', 'smt', 'fx'],
      relatedKPIs: ['Core OP Margin', 'Core EPS', 'XTANDI Revenue', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'smt-cost-transformation', 'oncology-xtandi-performance'],
      relatedDrivers: ['Core OP Margin', 'Core EPS', 'XTANDI Revenue', 'SMT Savings'],
      fiscalPeriod: 'Q3 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q3 FY25 CCO Commentary — PADCEV Post-ESMO Commercial Acceleration: Payer and Prescriber Action Plan',
      content: `## Q3 FY25 — PADCEV Post-ESMO Commercial Execution: From SoC Status to Commercial Capture

The EV-302 OS data presentation at ESMO in October 2025 created a step-change in PADCEV's commercial environment. This commentary outlines the commercial execution programme to convert scientific validation into commercial volume within FY25 and Q1 FY26.

**Chief Commercial Officer Perspective (David Ramsay):**

**Payer Action Programme:**
Within 14 days of ESMO, we deployed a specialised payer account team to the 18 largest US commercial health plans (covering 85% of commercially insured lives) with the EV-302 OS data package, updated economic analyses, and formal formulary review requests. Key outcomes achieved within 60 days:
- 3 major payers (combined 45M lives): removed prior authorisation requirement for first-line PADCEV
- 5 payers (combined 32M lives): moved PADCEV to preferred Tier 2 from Tier 3 in oncology formulary
- CMS Medicare: OS data incorporated into the next cycle national coverage determination update

**Prescriber Activation:**
Pre-ESMO, PADCEV first-line prescribing was concentrated in academic oncology centres (approximately 48% of volume). Post-ESMO, community oncologist adoption is the priority — we are targeting 1,800 high-volume urothelial carcinoma community oncologists with dedicated PADCEV first-line education programmes.

We engaged 620 community oncologists in Q3 FY25 (post-ESMO) with OS data symposia and updated clinical support tools. Early prescribing data shows a 28% increase in PADCEV new patient starts at enrolled community oncologist practices in November–December 2025.

**Q3 PADCEV Revenue: ¥57.9B (+35.6% YoY):**
Q3 FY25 PADCEV revenue was the strongest quarterly performance to date, driven by the ESMO-catalysed prescribing acceleration and the removal of payer PA requirements. The Q4 trajectory and Q1 FY26 prescription data will confirm whether the post-ESMO commercial inflection is sustained.

**Q4 and FY26 Outlook:**
Based on Q3 exit prescription rate trends (+28% vs. Q2 exit rate), FY26 PADCEV revenue guidance of ¥265–285B is achievable. The primary risk is community oncologist adoption pace at tier-2 and tier-3 hospitals.`,
      contentPlain: 'Post-ESMO PADCEV payer action: 3 payers (45M lives) removed PA requirement; 5 payers (32M lives) preferred Tier 2. 620 community oncologists engaged in Q3. Q3 PADCEV ¥57.9B +35.6% YoY. Q4 exit prescription rate +28% vs. Q2. FY26 guidance ¥265–285B achievable.',
      authorName: 'David Ramsay',
      authorRole: 'Executive Vice President and Chief Commercial Officer',
      category: 'Commercial',
      tags: ['q3-fy25', 'padcev', 'esmo', 'payer-action', 'commercial-execution', 'muc', 'standard-of-care'],
      relatedKPIs: ['PADCEV Revenue', 'Strategic Brands Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'americas-performance'],
      relatedDrivers: ['PADCEV Revenue', 'Strategic Brands Revenue'],
      fiscalPeriod: 'Q3 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'commercial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q3 FY25 CSO Commentary — Japan NHI Final Outcome and FY27 Strategic Planning Implications',
      content: `## Q3 FY25 — Japan NHI April 2025 Final Outcome Analysis and FY27 Strategic Planning

The April 2025 Japan NHI biennial price revision has been fully absorbed into our financial results. Q3 FY25 is the first quarter of clear financial comparison — this commentary provides the final outcome analysis and the implications for Japan strategy through the next NHI cycle (April 2027).

**Chief Strategy Officer Perspective (Hiroshi Miyamoto):**

**April 2025 NHI Revision Final Outcome:**
The -6.2% average Japan NHI price reduction was at the favourable end of our -5% to -8% guidance range. Key product-specific outcomes:
- XTANDI Japan: -4.8% (below average; innovation score adjustment applied)
- Mature oncology products: -8.5% (above average; standard repricing category)
- VYLOY: Launch price exempt from revision (new product protection, 2 years)
- Total Japan portfolio impact: -¥7.8B FY25 vs. -¥10.2B worst case

**The Value-Based Pricing Framework:**
XTANDI\'s -4.8% revision (vs. -8.5% for mature products) reflects Japan\'s value-based pricing framework — products that demonstrate real-world clinical benefit relative to existing standard of care can maintain prices above the standard repricing rate. Astellas submitted real-world OS data for XTANDI in mCRPC and mCSPC to support the innovation score application.

This framework is relevant for VYLOY planning. VYLOY\'s CLDN18.2-targeted mechanism is first-in-class in Japan — when VYLOY enters the NHI repricing cycle in April 2027, we will pursue innovation score protection using real-world gastric cancer OS data from the VYLOY Japan launch.

**Japan FY27 Strategic Planning:**
The next NHI revision (April 2027) impacts FY27 Q1. Our FY27 planning scenario analysis assumes:
- Base case: -6.0% average (-¥8.2B FY27 impact)
- Adverse case: -8.0% average (-¥10.9B FY27 impact)
- Upside case: -4.5% average (-¥6.1B FY27 impact with VYLOY and PADCEV innovation scores)

VYLOY Japan volume growth of ¥15–20B annually (FY26–27) should more than offset the NHI pricing headwind on a revenue basis.`,
      contentPlain: 'Japan NHI April 2025 final: -6.2% average, -¥7.8B impact vs. -¥10.2B worst case. XTANDI -4.8% (innovation score). VYLOY exempt (launch price protection). FY27 NHI base case -6.0% (-¥8.2B); adverse -8.0% (-¥10.9B); upside -4.5% with innovation scores. VYLOY volume growth should offset.',
      authorName: 'Hiroshi Miyamoto',
      authorRole: 'Executive Vice President and Chief Strategy Officer',
      category: 'Strategic',
      tags: ['q3-fy25', 'japan', 'nhi', 'pricing', 'xtandi', 'vyloy', 'value-based-pricing'],
      relatedKPIs: ['Japan Revenue', 'XTANDI Revenue', 'VYLOY Revenue'],
      relatedConsoles: ['international-asia-performance'],
      relatedDrivers: ['Japan Revenue', 'XTANDI Revenue', 'VYLOY Revenue'],
      fiscalPeriod: 'Q3 FY25',
      periodType: 'quarter',
      priority: 'medium',
      commentaryType: 'strategic_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },

    // =========================================================================
    // Q4 FY25 / FULL YEAR PERSPECTIVES (6 entries)
    // =========================================================================
    {
      title: 'FY25 Full Year CEO Message — ¥237.01 Core EPS: +49.8% Best-in-Decade Growth; FY26 Outlook',
      content: `## FY25 Full Year Results — Core EPS ¥237.01 and the Path to FY26

FY25 was the year Astellas demonstrated that pharmaceutical transformation at scale is achievable. Core EPS of ¥237.01 — +49.8% YoY growth — validates the FY22-FY25 strategic programme simultaneously delivering portfolio diversification (Strategic Brands ¥480.3B, +43% YoY), cost transformation (SMT ¥21B), and financial resilience (IRA framework disclosed and managed).

**CEO Perspective (Naoki Okamura):**

**FY25 Performance — Three Dimensions of Success:**

*Financial Performance:*
Core Revenue ¥2,139.2B (guidance midpoint ¥2,130B), Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01. FCF ¥520.8B — ¥22.8B above plan. Net cash position +¥82B at year-end. ALPMY ADR TSR +18.4% vs. MSCI Pharma +8.2%.

*Portfolio Transformation:*
Strategic Brands reached 22% of revenue (18% in FY24). PADCEV FY25 ¥221.2B, +34.8% — first-line mUC standard of care confirmed by EV-302 OS data. VEOZAH ¥87.3B vs. ¥72B plan — fastest-growing women's health product in the US. VYLOY and IZERVAY launch year performance tracking ahead of plan. China +29.6% YoY — second NRDL listing (VYLOY) secured January 2026.

*Operational Excellence:*
SMT Phase 1 complete in October 2025 (6 months ahead of plan), ¥21B savings, ¥3B above target. Japan NHI -6.2% (favourable outcome). Manufacturing supply reliability 99.6% (PADCEV ADC cold chain).

**FY26 Guidance:**
| Metric | FY25 Actual | FY26 Guidance |
|---|---|---|
| Core Revenue | ¥2,139.2B | ¥2,200–2,260B |
| Core OP Margin | 26.0% | 27.0–28.0% |
| Core EPS | ¥237.01 | ¥248–255 |
| FCF | ¥520.8B | ¥500–540B |

The FY26 guidance incorporates the XTANDI IRA MFP impact (¥11.2B net impact) and the SMT Phase 2 savings target (¥15–18B). Strategic Brands target of ¥610–640B is the primary revenue growth driver.

**Capital Returns:**
Full-year FY25 dividend ¥78/share (¥139.7B total, 33% payout ratio). ¥50B share buyback programme announced — completion target Q2 FY26.`,
      contentPlain: 'FY25: Core EPS ¥237.01 +49.8%, Core Revenue ¥2,139.2B, Core OP margin 26.0%, FCF ¥520.8B (+¥22.8B). Strategic Brands ¥480.3B +43%. SMT ¥21B complete. FY26 guidance: Revenue ¥2,200–2,260B, Core OP margin 27–28%, Core EPS ¥248–255, FCF ¥500–540B. ¥78/share dividend; ¥50B buyback.',
      authorName: 'Naoki Okamura',
      authorRole: 'Representative Director, President and CEO',
      category: 'Strategic',
      tags: ['fy25-full-year', 'ceo-message', 'annual-results', 'core-eps', 'fy26-guidance', 'strategic-brands', 'smt'],
      relatedKPIs: ['Core EPS', 'Total Revenue', 'Strategic Brands Revenue', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'strategic-brands-growth', 'smt-cost-transformation'],
      relatedDrivers: ['Core EPS', 'Total Revenue', 'Strategic Brands Revenue', 'SMT Savings'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'annual',
      priority: 'critical',
      commentaryType: 'executive_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'FY25 Full Year CFO Message — Capital Allocation, Share Buyback, and FY26 EPS Bridge',
      content: `## FY25 Annual CFO Commentary — Capital Allocation Framework and FY26 EPS Bridge

FY25 financial performance exceeded all guidance metrics. This commentary provides the capital allocation framework and the FY26 Core EPS bridge to enable precise investor modelling.

**CFO Perspective (Atsushi Kitamura):**

**FY25 Capital Allocation Summary:**
| Category | Amount | Notes |
|---|---|---|
| Operating Cash Flow | ¥520.8B | 93.7% FCF/Core Net Income conversion |
| Dividends paid | ¥139.7B | ¥78/share full year; 33% payout ratio |
| Capex | ¥68.2B | ¥9.1B below plan; Yamaguchi phased |
| Share buyback (announced) | ¥50.0B | Completion target Q2 FY26 |
| Net cash change | +¥82.0B | Year-end net cash +¥82B |

**FY26 Core EPS Bridge from FY25 ¥237.01:**
| Factor | Impact (¥) | Impact (¥B) |
|---|---|---|
| Revenue growth (Strategic Brands) | +¥28.5 | +¥51.1B |
| SMT Phase 2 savings | +¥16.8 | +¥30.1B |
| XTANDI IRA MFP impact | -¥6.2 | -¥11.2B |
| FX neutral (¥151/USD) | ¥0 | ¥0 |
| Japan NHI FY26 annualised | -¥2.5 | -¥4.5B |
| R&D investment (Phase 3 initiations) | -¥4.1 | -¥7.4B |
| Royalty milestone (non-recurring) | -¥4.7 | -¥8.5B |
| Share buyback accretion | +¥0.8 | n/a |
| Other / tax | +¥0.3 | +¥0.5B |
| **FY26 Core EPS guidance midpoint** | **~¥251.5** | |

The bridge confirms FY26 Core EPS of ¥248–255. The largest swing factors are: SMT Phase 2 delivery (upside if >¥18B) and XTANDI IRA volume preservation (downside if community switching accelerates).`,
      contentPlain: 'FY25 capital allocation: FCF ¥520.8B, dividends ¥139.7B (¥78/share, 33% payout), capex ¥68.2B, buyback ¥50B announced. FY26 EPS bridge: +¥28.5 Strategic Brands, +¥16.8 SMT Phase 2, -¥6.2 IRA, -¥4.7 non-recurring royalty, -¥4.1 R&D investment. Midpoint guidance ¥251.5.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['fy25-full-year', 'cfo-message', 'capital-allocation', 'buyback', 'eps-bridge', 'fy26-guidance'],
      relatedKPIs: ['Core EPS', 'Operating Cash Flow', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'smt-cost-transformation'],
      relatedDrivers: ['Core EPS', 'Operating Cash Flow', 'SMT Savings'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'annual',
      priority: 'critical',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'FY25 CCO Annual Review — Commercial Model Evolution: From XTANDI Dependency to Portfolio Commercialisation',
      content: `## FY25 Annual CCO Review — The Commercial Model Transformation

FY25 marks the first year where Astellas's commercial model is truly multi-product, multi-indication, and multi-geography. This is a structural shift from the 2015–2022 period of near-total XTANDI dependency that required fundamentally different commercial infrastructure, talent, and execution.

**Chief Commercial Officer Perspective (David Ramsay):**

**The Commercial Infrastructure Build:**
To support PADCEV (ADC oncology), VEOZAH (women's health/primary care), IZERVAY (ophthalmology), and VYLOY (gastric cancer), we have built four distinct commercial teams across different physician specialties, payer landscapes, and patient populations. This represents approximately ¥28B of incremental SG&A vs. a XTANDI-only commercial model — investment that is returned through Strategic Brands revenue, now at ¥480.3B FY25.

**Commercial Team Performance:**
| Brand | Commercial Model | FY25 Revenue | YoY Growth |
|---|---|---|---|
| PADCEV | Oncology academic + community | ¥221.2B | +34.8% |
| VEOZAH | OBGYN + primary care + DTC | ¥87.3B | +188% |
| IZERVAY | Ophthalmology specialist | ¥52.1B | Launch year |
| VYLOY | Academic oncology (Japan/China) | ¥59.7B | Launch year |

**The Payer Relations Transformation:**
In FY22, Astellas had 2 managed care account managers focused on XTANDI oncology coverage. In FY25, we have 47 managed care account managers covering 4 product lines across US commercial, Medicare Part D, and Medicaid. The investment in payer infrastructure enabled VEOZAH coverage to reach 62% in Year 2 and PADCEV post-ESMO PA removal — commercial outcomes not possible with a legacy oncology-only payer team.

**FY26 Commercial Priorities:**
- PADCEV: Drive community oncologist first-line adoption from 62% to 78%
- VEOZAH: Reach 70% payer coverage milestone by Q3 FY26
- VYLOY: US commercial launch preparation (FDA approval anticipated Q1 FY26)
- XTANDI: Defend market share vs. ERLEADA/darolutamide post-IRA`,
      contentPlain: 'FY25 first year of true multi-product, multi-geography commercial model. Four commercial teams built (oncology, women\'s health, ophthalmology, gastric cancer). Strategic Brands ¥480.3B +43%. FY26 priorities: PADCEV community adoption to 78%, VEOZAH 70% coverage, VYLOY US launch, XTANDI market share defence.',
      authorName: 'David Ramsay',
      authorRole: 'Executive Vice President and Chief Commercial Officer',
      category: 'Commercial',
      tags: ['fy25-full-year', 'commercial-model', 'strategic-brands', 'payer-relations', 'padcev', 'veozah'],
      relatedKPIs: ['Strategic Brands Revenue', 'PADCEV Revenue', 'VEOZAH Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'americas-performance'],
      relatedDrivers: ['Strategic Brands Revenue', 'PADCEV Revenue', 'VEOZAH Revenue'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'commercial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'FY25 CMO Annual Review — R&D Productivity: 3 Phase 3 POC Successes; Pipeline Health Assessment',
      content: `## FY25 Annual CMO Review — R&D Productivity and Pipeline Health

FY25 delivered the strongest R&D productivity year in Astellas's recent history: 3 Phase 3 proof-of-concept successes, 2 major product approvals (PADCEV EU first-line, VYLOY Japan and China NRDL), and 4 early-stage programme terminations (disciplined portfolio management). The pipeline quality entering FY26 is the highest it has been.

**Chief Medical Officer Perspective (Bernhardt Zeiher):**

**FY25 R&D Productivity Summary:**
| Milestone | Programme | Outcome |
|---|---|---|
| Phase 3 POC success | PADCEV EV-302 OS (ESMO Oct 2025) | OS HR 0.55; SoC confirmed |
| Phase 3 POC success | ASP3550 FGFR inhibitor (bladder cancer) | PFS benefit; NDA filing planned FY26 |
| Phase 3 POC success | Selumetinib collaboration (thyroid cancer) | OS benefit in phase 3; regulatory filing FY26 |
| Regulatory approval | PADCEV EU first-line mUC | EMA approval Q2 FY25 |
| Regulatory approval | VYLOY Japan / China NRDL | Approved and listed |
| Phase 3 initiation | XTANDI combo (early-line CRPC) | Enrolled Q2 FY25 |
| Programme termination | 4 early-stage compounds | Capital redeployed |

**R&D Investment Efficiency:**
FY25 Core R&D expense: ¥312.4B (14.6% of Core Revenue). R&D productivity metric: 3 Phase 3 successes per ¥312.4B R&D investment = ¥104.1B per POC success. Pharma industry average: approximately ¥200B per Phase 3 success. Astellas is delivering approximately 2x the industry average R&D productivity by portfolio value.

**FY26 R&D Calendar:**
3 Phase 3 initiations planned (ADC in HER2-low breast cancer, SARM for sarcopenia, PADCEV NMIBC expansion). Key data readouts: ASP3550 interim (Q2 FY26), XTANDI combo enrolment complete (Q3 FY26), VYLOY US PDUFA (under review). R&D budget FY26: ¥330–345B (15.0–15.2% of projected revenue).`,
      contentPlain: 'FY25 R&D: 3 Phase 3 POC successes (PADCEV OS, ASP3550, selumetinib), 2 approvals (PADCEV EU, VYLOY Japan/China), 4 terminations. R&D ¥312.4B (14.6% revenue). Productivity: ¥104.1B per Phase 3 POC vs. ¥200B industry average. FY26: 3 Phase 3 initiations; R&D budget ¥330–345B.',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Executive Vice President and Chief Medical Officer',
      category: 'Scientific',
      tags: ['fy25-full-year', 'rd-productivity', 'pipeline', 'phase3', 'poc', 'padcev', 'clinical-data'],
      relatedKPIs: ['R&D Pipeline Value', 'R&D Expense', 'PADCEV Revenue'],
      relatedConsoles: ['enterprise-pipeline', 'strategic-brands-growth'],
      relatedDrivers: ['R&D Pipeline Value', 'R&D Expense', 'PADCEV Revenue'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'clinical_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'FY25 CSO Annual Review — Mid-Term Management Plan Scorecard: FY24-FY26 Progress Assessment',
      content: `## FY25 Annual CSO Review — Mid-Term Management Plan Scorecard

The Mid-Term Management Plan (MTMP) covering FY24–FY26 was announced in March 2023 with 4 financial targets and 3 strategic pillars. The end of FY25 provides the mid-point assessment before the FY26 completion year.

**Chief Strategy Officer Perspective (Hiroshi Miyamoto):**

**Mid-Term Management Plan Financial Scorecard:**
| MTMP Target | FY24 Baseline | FY25 Actual | FY26 Target | Status |
|---|---|---|---|---|
| Core EPS ¥248–255 by FY26 | ¥158.24 | ¥237.01 | ¥248–255 | **On track** |
| Strategic Brands ¥610B+ by FY26 | ¥336B | ¥480.3B | ¥610–640B | **On track** |
| Core OP Margin 27–28% by FY26 | 22.1% | 26.0% | 27–28% | **On track** |
| FCF ¥480B+ annually | ¥498B | ¥520.8B | ¥500–540B | **Achieved (FY25)** |

**MTMP Strategic Pillars Assessment:**
1. **IRA Risk Management**: XTANDI MFP disclosed (¥9.6B/1pp sensitivity), SMT ¥21B FY25 delivered — **ahead of plan**
2. **Portfolio Diversification**: Strategic Brands 22% of revenue (18% FY24); PADCEV SoC confirmed — **ahead of plan**
3. **Geographic Expansion**: China +29.6% FY25; VYLOY NRDL secured; PADCEV NMPA approved — **on track**

**FY26 MTMP Completion Plan:**
The MTMP completion requires: (1) Core EPS ¥248–255 — achievable via SMT Phase 2 + Strategic Brands ramp; (2) Strategic Brands ¥610B+ — PADCEV first-line ramp + VYLOY US launch are critical; (3) Core OP margin 27–28% — requires SMT Phase 2 SG&A reduction to sub-39%.

A successor MTMP covering FY27–FY30 will be announced in March 2026, addressing the XTANDI post-IRA portfolio strategy and the next wave of pipeline assets.`,
      contentPlain: 'MTMP mid-point scorecard: Core EPS ¥237 vs ¥158 baseline → ¥248–255 target (on track); Strategic Brands ¥480B vs ¥336B baseline → ¥610B target (on track); Core OP margin 26.0% vs 22.1% → 27–28% target (on track); FCF ¥520.8B target achieved. Successor MTMP for FY27–30 announced March 2026.',
      authorName: 'Hiroshi Miyamoto',
      authorRole: 'Executive Vice President and Chief Strategy Officer',
      category: 'Strategic',
      tags: ['fy25-full-year', 'mtmp', 'scorecard', 'strategic-plan', 'fy26-outlook', 'mid-term'],
      relatedKPIs: ['Core EPS', 'Strategic Brands Revenue', 'Core OP Margin', 'Operating Cash Flow'],
      relatedConsoles: ['financial-performance', 'strategic-brands-growth'],
      relatedDrivers: ['Core EPS', 'Strategic Brands Revenue', 'Core OP Margin'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'strategic_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q4 FY25 CFO Message — Q4 Margin Normalisation: 21.2% Explained; Full-Year 26.0% Confirmed',
      content: `## Q4 FY25 CFO Commentary — Q4 Margin Trough: NHI Accrual and Non-Recurring Items

Q4 FY25 (January–March 2026) Core OP margin of 21.2% is the lowest quarterly margin of the year — 480bps below the Q2 average (25.8%) and 1,160bps below Q3 (32.8%). This commentary provides the Q4 margin bridge to confirm this is a structural quarterly pattern, not a deteriorating trend.

**CFO Perspective (Atsushi Kitamura):**

**Q4 FY25 Core OP Margin Bridge (vs. FY25 full-year 26.0%):**
| Factor | Impact |
|---|---|
| Japan NHI Q4 price accrual adjustment | -¥5.8B / -2.7pp |
| Non-recurring Q3 Pfizer royalty normalisation | -¥8.5B / -4.0pp |
| PADCEV/VYLOY post-launch sales force investment | -¥3.2B / -1.5pp |
| SMT Phase 1 Q4 one-time implementation costs | -¥2.3B / -1.1pp |
| Phase 3 R&D enrolment acceleration | -¥2.1B / -1.0pp |
| Operating leverage from Strategic Brands Q4 | +¥4.2B / +2.0pp |
| SMT recurring savings (Q4 normalised) | +¥4.6B / +2.1pp |
| **Net vs. FY25 average** | **-4.8pp → 21.2%** |

The Japan NHI Q4 accrual represents a timing mismatch — the full-year NHI price reduction is recognised partially in Q4 vs. actual reimbursement claims. This is a calendar feature of the April-March fiscal year coinciding with the April NHI revision cycle.

**FY25 Full-Year Core OP Confirmation:**
Despite the Q4 trough, full-year Core OP was ¥555.7B (26.0% margin) — precisely at the midpoint of the 25.5–26.5% guidance range. The quarterly volatility (21.2% Q4, 32.8% Q3) averages to 26.0% — investors should model the annual rate, not the quarterly peaks and troughs.

**IRA Q4 Impact:**
XTANDI IRA MFP was effective January 1, 2026. Q4 FY25 impact (January–March 2026, 3 months): approximately -¥2.8B. Full-year FY26 impact: approximately -¥11.2B (reflected in guidance).`,
      contentPlain: 'Q4 FY25 Core OP margin 21.2% trough: Japan NHI accrual -2.7pp, Q3 royalty non-recurrence -4.0pp, launch investment -1.5pp, SMT one-time costs -1.1pp, partially offset by operating leverage +2.0pp and SMT savings +2.1pp. Full-year 26.0% confirmed. IRA Q4 impact -¥2.8B (3 months).',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['q4-fy25', 'margin', 'nhi', 'ira', 'seasonality', 'core-op-margin'],
      relatedKPIs: ['Core OP Margin', 'Core Operating Income', 'Japan Revenue'],
      relatedConsoles: ['financial-performance'],
      relatedDrivers: ['Core OP Margin', 'Core Operating Income', 'Japan Revenue'],
      fiscalPeriod: 'Q4 FY25',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },

    // =========================================================================
    // Q1 FY26 OUTLOOK (4 entries)
    // =========================================================================
    {
      title: 'Q1 FY26 CEO Outlook — IRA MFP Implementation; VYLOY US Launch; SMT Phase 2 Momentum',
      content: `## Q1 FY26 CEO Outlook — Three Priorities for the FY26 Guidance Achievement Year

Q1 FY26 (April–June 2026) marks the beginning of the XTANDI IRA MFP implementation period — the most significant policy change affecting Astellas\'s commercial operations in a decade. Our preparation for this moment has defined much of FY25. This commentary frames our Q1 FY26 priorities and the guardrails for the year.

**CEO Perspective (Naoki Okamura):**

**Priority 1: XTANDI IRA MFP Management**
IRA MFP implementation began January 1, 2026, affecting XTANDI Medicare Part D claims. Q1 FY26 (April–June 2026) is the first full fiscal quarter under the new pricing environment. Our measures:
- **Volume defence**: Deployed 45 dedicated oncology access managers to the 300 highest-volume XTANDI prescribing centres — the primary risk is prescriber switching to ERLEADA/darolutamide if XTANDI net price perception changes
- **Payer engagement**: Medicare Advantage plan contract renegotiations (covering approximately 28% of XTANDI volume) underway — maintaining preferred PA-exempt status is the objective
- **Commercial and Medicare Part D parity**: Ensuring that commercial payers do not use MFP as a reference for commercial contract renegotiation — the IRA applies only to Medicare; commercial contracts are separately negotiated

**Priority 2: VYLOY US Launch**
FDA PDUFA review for VYLOY in gastric cancer is ongoing — expected approval in Q1 FY26 (timing not yet confirmed). US launch preparation is complete: 180 specialised oncology representatives deployed for CLDN18.2-positive gastric cancer patient identification and treatment initiation. US gastric cancer addressable market at approximately 14,000 new patients/year.

**Priority 3: SMT Phase 2 Momentum**
SMT Phase 2 launched October 2025; Q1 FY26 is the first quarter of Phase 2 savings delivery. Target: ¥3.5–4.5B Q1 FY26 from IT and shared services. Phase 2 completion target Q2 FY27.

**Q1 FY26 guidance:** Core EPS ¥58–63 (implied annual run-rate ¥232–252, below FY26 guidance of ¥248–255 due to Q1 seasonal investment pattern — consistent with FY25 Q1).`,
      contentPlain: 'Q1 FY26 priorities: IRA MFP management (45 access managers deployed, Medicare Advantage contract renegotiations), VYLOY US launch (FDA approval pending, 180 representatives deployed), SMT Phase 2 momentum (¥3.5–4.5B Q1 savings). Q1 FY26 Core EPS guidance ¥58–63.',
      authorName: 'Naoki Okamura',
      authorRole: 'Representative Director, President and CEO',
      category: 'Strategic',
      tags: ['q1-fy26', 'ira-mfp', 'vyloy', 'us-launch', 'smt-phase2', 'xtandi'],
      relatedKPIs: ['Core EPS', 'XTANDI Revenue', 'VYLOY Revenue', 'SMT Savings'],
      relatedConsoles: ['financial-performance', 'oncology-xtandi-performance', 'strategic-brands-growth'],
      relatedDrivers: ['Core EPS', 'XTANDI Revenue', 'VYLOY Revenue', 'SMT Savings'],
      fiscalPeriod: 'Q1 FY26',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'executive_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY26 CFO Outlook — FX Sensitivity Update: BOJ Policy Normalisation and Hedging Response',
      content: `## Q1 FY26 CFO Outlook — FX Framework: BOJ Policy Impact and Hedging Strategy Update

The Bank of Japan\'s policy normalisation path (rate hikes in December 2025 and February 2026) has materially changed the USD/JPY outlook for FY26. This commentary updates the FX sensitivity framework and hedging response embedded in FY26 guidance.

**CFO Perspective (Atsushi Kitamura):**

**BOJ Policy Context:**
The BOJ raised its policy rate to 0.5% in December 2025 and 0.75% in February 2026 — the highest rates since the 1990s. JPY has strengthened from ¥156/USD (September 2025) to ¥148/USD (April 2026). Our FY26 planning assumption remains ¥151/USD — Q1 FY26 actual rate of approximately ¥148 represents an approximate -¥6.3B Core OP headwind to plan for the quarter.

**FX Sensitivity Framework — FY26 Updates:**
- **Base case (¥151/USD full-year):** Core OP as guided
- **Stress scenario (¥145/USD, BOJ continues tightening):** approximately -¥12.6B Core OP vs. plan
- **Upside scenario (¥157/USD, USD strengthening):** approximately +¥12.6B Core OP vs. plan

**Hedging Response:**
Given the elevated BOJ-driven JPY appreciation risk, we have increased hedge coverage from 33% to 41% of anticipated FY26 USD cash inflows. Additional hedge contracts were executed in Q4 FY25 and Q1 FY26 at average strike of ¥149–¥150 — this limits Core OP downside in the ¥145 stress scenario to approximately -¥7.4B (net of hedges) vs. -¥12.6B unhedged.

**FY26 Core EPS FX Sensitivity (Updated):**
- Unhedged: ¥2.1B Core OP per ¥1 USD/JPY
- Net-of-hedges (41% coverage): ¥1.24B Core OP per ¥1 (= ¥0.69 Core EPS per ¥1)
- FY26 guidance corridor of ¥248–255 has been calibrated to accommodate ¥148–¥153 USD/JPY without requiring guidance revision`,
      contentPlain: 'BOJ raised rates to 0.75% (Feb 2026); USD/JPY moved to ¥148 vs ¥151 plan (-¥6.3B Q1 Core OP headwind). Hedge coverage increased to 41% (from 33%). FY26 net-of-hedges sensitivity: ¥1.24B Core OP per ¥1 move (¥0.69 EPS). FY26 guidance calibrated for ¥148–153 USD/JPY range.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'Representative Director, Executive Vice President and CFO',
      category: 'Financial',
      tags: ['q1-fy26', 'fx', 'boj', 'hedging', 'usd-jpy', 'sensitivity'],
      relatedKPIs: ['USD/JPY Rate', 'Core EPS', 'Operating Cash Flow'],
      relatedConsoles: ['financial-performance', 'enterprise-risk'],
      relatedDrivers: ['USD/JPY Rate', 'Core EPS'],
      fiscalPeriod: 'Q1 FY26',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'financial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY26 CCO Outlook — XTANDI IRA Commercial Response: Volume Defence and PADCEV Reallocation Strategy',
      content: `## Q1 FY26 CCO Outlook — XTANDI IRA Commercial Response and Strategic Reallocation

IRA MFP implementation for XTANDI (effective January 1, 2026) is the most complex commercial challenge Astellas\'s US commercial organisation has managed. This commentary outlines the commercial response strategy and the PADCEV resource reallocation that makes the strategy executable.

**Chief Commercial Officer Perspective (David Ramsay):**

**XTANDI IRA Commercial Intelligence (Q1 FY26, April–May 2026):**
Early Q1 FY26 prescription data suggests XTANDI share held broadly:
- Academic oncology centres: XTANDI share stable at 48.5% (vs. 48.2% FY25 average) — oncologists at academic centres are not changing prescribing based on MFP pricing (consistent with our hypothesis: MFP changes Medicare reimbursement, not the prescribing decision)
- Community oncology (mid-volume): modest shifting detected at 12 community oncology practices — ERLEADA gaining in newly diagnosed mCSPC where new prescribers are less familiar with XTANDI mCSPC label breadth
- High-volume XTANDI prescribers: 93% have not changed prescribing — loyalty among established XTANDI prescribers is holding

**Commercial Response — Three Programmes:**
1. **XTANDI Broad Label Education**: Deploying clinical education resources to the 300 community oncology practices where ERLEADA switching intent has been detected — focus on XTANDI\'s broader label (4 approved indications vs. ERLEADA\'s 2) as the clinical differentiation
2. **XTANDI Patient Assistance Programme**: Enhanced patient assistance programme for Medicare patients with high out-of-pocket cost under MFP — maintaining continuity of care for existing patients
3. **Resource Reallocation to PADCEV**: Redirecting 120 XTANDI sales representatives (whose call plan efficiency is declining in high-MFP-impact territories) to PADCEV first-line mUC community oncologist activation — the highest-ROI commercial reallocation available

**PADCEV Q1 FY26 Early Data:**
Post-ESMO payer access improvement (PA removal from 3 major plans) is showing a 28% increase in PADCEV new patient starts in Q1 FY26 vs. Q4 FY25 exit rate — ahead of the ¥265–285B FY26 guidance trajectory.`,
      contentPlain: 'Q1 FY26 XTANDI IRA: academic centres stable at 48.5% share; modest community shifting at 12 practices. Three response programmes: Broad Label Education, Patient Assistance for Medicare, 120 rep reallocation to PADCEV. PADCEV new patient starts +28% vs. Q4 FY25 exit rate.',
      authorName: 'David Ramsay',
      authorRole: 'Executive Vice President and Chief Commercial Officer',
      category: 'Commercial',
      tags: ['q1-fy26', 'xtandi', 'ira-mfp', 'commercial-response', 'padcev', 'market-share'],
      relatedKPIs: ['XTANDI Revenue', 'XTANDI US Market Share', 'PADCEV Revenue'],
      relatedConsoles: ['oncology-xtandi-performance', 'strategic-brands-growth', 'americas-performance'],
      relatedDrivers: ['XTANDI Revenue', 'XTANDI US Market Share', 'PADCEV Revenue'],
      fiscalPeriod: 'Q1 FY26',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'commercial_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
    {
      title: 'Q1 FY26 CMO Outlook — VYLOY US FDA Review; PADCEV NMIBC Phase 3 Initiation; Pipeline 2026',
      content: `## Q1 FY26 CMO Outlook — Key Clinical Events: VYLOY US FDA and Next Pipeline Wave

Q1 FY26 has two defining clinical events: the awaited VYLOY US FDA PDUFA decision and the initiation of the PADCEV NMIBC (non-muscle-invasive bladder cancer) Phase 3 trial. This commentary provides the scientific and commercial context for each.

**Chief Medical Officer Perspective (Bernhardt Zeiher):**

**VYLOY US FDA PDUFA Status:**
The VYLOY (zolbetuximab) US FDA PDUFA date for gastric/gastroesophageal junction (G/GEJ) cancer is under FDA review. The FDA completed the standard review process; the PDUFA date has been extended by 3 months for additional manufacturing facility inspection at the Japan API production site. We expect a final FDA decision in Q2 FY26. The clinical package (SPOTLIGHT and GLOW Phase 3 data) is complete and scientifically compelling — the manufacturing inspection is the sole remaining gating factor.

**Clinical Package Summary (for VYLOY US FDA):**
- **SPOTLIGHT (1L G/GEJ, mCSPC + CLDN18.2+):** OS HR 0.75; PFS HR 0.69 — statistically significant OS benefit in CLDN18.2-positive, HER2-negative patients
- **GLOW (2L G/GEJ):** OS HR 0.78; PFS HR 0.60 — confirmed activity in second-line setting
- FDA ODAC review not requested — FDA views the data package as sufficient

**PADCEV NMIBC Phase 3 Initiation:**
The PADCEV NMIBC (non-muscle-invasive bladder cancer, high-risk) Phase 3 trial initiated enrolment in April 2026. This trial extends PADCEV\'s potential indication set from invasive/metastatic disease to the earlier, larger NMIBC population (estimated 3x the mUC patient population). NMIBC represents the largest single PADCEV indication expansion opportunity — peak sales potential of ¥150–200B if approval obtained in approximately 2029.

**FY26 Pipeline Calendar (Key Events):**
- **Q2 FY26:** VYLOY US FDA decision (expected); ASP3550 Phase 2 interim data
- **Q3 FY26:** XTANDI combo Phase 3 enrolment complete; PADCEV NMIBC Phase 1 safety data
- **Q4 FY26:** Selumetinib regulatory filing (US/EU); PADCEV combination bladder cancer readout`,
      contentPlain: 'VYLOY US FDA PDUFA extended 3 months (manufacturing inspection); decision expected Q2 FY26. Clinical package: SPOTLIGHT OS HR 0.75, GLOW OS HR 0.78. PADCEV NMIBC Phase 3 initiated April 2026 (3x mUC patient population; peak sales ¥150–200B). FY26 pipeline calendar: VYLOY US (Q2), ASP3550 interim (Q2), selumetinib filing (Q4).',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Executive Vice President and Chief Medical Officer',
      category: 'Scientific',
      tags: ['q1-fy26', 'vyloy', 'fda', 'padcev', 'nmibc', 'phase3', 'pipeline'],
      relatedKPIs: ['VYLOY Revenue', 'PADCEV Revenue', 'R&D Pipeline Value'],
      relatedConsoles: ['strategic-brands-growth', 'enterprise-pipeline'],
      relatedDrivers: ['VYLOY Revenue', 'PADCEV Revenue', 'R&D Pipeline Value'],
      fiscalPeriod: 'Q1 FY26',
      periodType: 'quarter',
      priority: 'high',
      commentaryType: 'clinical_commentary',
      aggregationLevel: 'company',
      isAiGenerated: false,
    },
  ];

  let count = 0;
  for (const entry of commentary) {
    await prisma.commentary.create({
      data: {
        companyId,
        title: entry.title,
        content: entry.content,
        contentPlain: entry.contentPlain,
        authorName: entry.authorName,
        authorRole: entry.authorRole,
        category: entry.category,
        tags: entry.tags,
        relatedKPIs: entry.relatedKPIs,
        relatedConsoles: entry.relatedConsoles,
        relatedDrivers: entry.relatedDrivers,
        fiscalPeriod: entry.fiscalPeriod,
        periodType: entry.periodType,
        priority: entry.priority,
        commentaryType: entry.commentaryType,
        aggregationLevel: entry.aggregationLevel,
        isAiGenerated: entry.isAiGenerated,
        driverId: (() => {
          const primaryDriver = entry.relatedDrivers?.[0];
          return primaryDriver ? (driverNameToId.get(primaryDriver) ?? null) : null;
        })(),
      },
    });
    count++;
  }

  console.log(`  Seeded ${count} Astellas Pharma expanded commentary entries (FY25–FY26 coverage)`);
}
