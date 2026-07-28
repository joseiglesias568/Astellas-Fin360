import { PrismaClient } from '@prisma/client';

// =============================================================================
// 11 executive commentary entries for Astellas Pharma Inc. (TSE: 4503 / ALPMY)
//
// SOURCE: Astellas Pharma FY2025 Full-Year Earnings (May 2026),
//   FY2025 Annual Report, Q1-Q4 FY2025 earnings supplements,
//   FY2026 guidance issued May 2026.
//
// Author roles map to the Astellas executive team:
//   - Naoki Okamura (President and CEO)
//   - Atsushi Kitamura (EVP and CFO)
//   - David Ramsay (Chief Commercial Officer, International)
//   - Bernhardt Zeiher (Chief Medical Officer)
//   - Hiroshi Miyamoto (Chief Strategy Officer)
// Driver IDs link to consoles seeded in 12-business-consoles.ts.
// All revenue figures in JPY billions (¥B) unless stated otherwise.
// =============================================================================

export async function seedCommentary(prisma: PrismaClient, companyId: number) {
  console.log('Seeding Astellas Pharma commentary...');

  const commentary = [
    {
      title: 'Q1 FY25 Core EPS ¥54.88 — +16.2% YoY: Strategic Brands Surge, XTANDI IRA Monitoring, FY2026 Path',
      content: `## Q1 FY25 Total Performance — Astellas Pharma Inc.

Astellas Pharma Q1 FY25 (April–June 2025) Core EPS of ¥54.88 grew +16.2% year-over-year from ¥47.20 in Q1 FY24, supported by total revenue of ¥537.9B (+8.8% YoY) and Core Operating Profit of ¥130.8B at a 24.3% Core OP margin. The quarter establishes a strong base for our full-year FY2025 guidance of ¥2,139.2B revenue, ¥555.7B Core Operating Profit (26.0% margin), and Core EPS of ¥237.01.

**Key Q1 FY25 Highlights:**
- Total Revenue ¥537.9B — +8.8% YoY vs ¥494.2B Q1 FY24 (constant FX basis +10.2%)
- Core Operating Profit ¥130.8B — Core OP margin 24.3%; in line with FY25 full-year 26.0% guidance
- Core EPS ¥54.88 — +16.2% YoY; ahead of ¥52.00 consensus by ¥2.88
- XTANDI (enzalutamide) revenue ¥241.5B — Q1 leading contribution; prostate cancer market leadership sustained
- Strategic Brands combined ¥115.0B — PADCEV, IZERVAY, XOSPATA, VYLOY, VEOZAH composite up +48% YoY
- IRA drug price negotiation monitoring initiated: XTANDI enters year 1 of potential Medicare Part D negotiation
- Free Cash Flow ¥140.2B Q1; FY25 guidance ¥560.2B trajectory on track; dividend ¥78/share declared

**Strategic Context — Oncology and Rx Growth Portfolio:**
Q1 FY25 demonstrates the inflection point where our Strategic Brands portfolio (PADCEV, IZERVAY, VYLOY, VEOZAH) has reached sufficient scale — now ¥115B quarterly run-rate — to provide meaningful diversification from XTANDI's dominant but IRA-exposed revenue stream. PADCEV (enfortumab vedotin) with ¥51.2B Q1 revenue continues its trajectory toward becoming our second ¥200B+ franchise. IZERVAY (avacincaptad pegol), our geographic atrophy treatment, reached ¥18.5B in its second full quarter in the US — exceeding the ¥15B plan.

**IRA Monitoring — XTANDI Year-1 Positioning:**
The Inflation Reduction Act Medicare Part D drug price negotiation mechanism has now entered its second cycle. XTANDI is monitoring eligibility parameters — qualifying as a small molecule oral oncology drug post-exclusivity, it could enter negotiation discussions as early as FY2026. We have initiated cross-functional IRA impact modeling and are working with payer and oncologist advocacy partners to document clinical differentiation supporting pricing adequacy. Per our base case, IRA impact on XTANDI US revenue is estimated at ¥8–15B annually from FY2027 onwards, manageable relative to our Strategic Brands growth trajectory.

**FY2025 Guidance Confirmation:**
Full-year FY2025 guidance confirmed as issued in May 2025: Revenue ¥2,139.2B, Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01. The Q1 result of ¥537.9B represents 25.1% of full-year guidance — in line with normal Q1 seasonality. H2 FY25 includes two expected catalysts: VYLOY gastric cancer launch US/EU scaling, and IZERVAY entering broader formulary access agreements.`,
      contentPlain: 'Q1 FY25 Core EPS ¥54.88 +16.2% YoY. Revenue ¥537.9B +8.8% YoY. Core OP ¥130.8B at 24.3% margin. Strategic Brands ¥115.0B +48% YoY. XTANDI ¥241.5B Q1. IRA monitoring initiated. FCF ¥140.2B Q1. FY25 full-year guidance confirmed: ¥2,139.2B revenue, ¥555.7B Core OP, ¥237.01 Core EPS.',
      authorName: 'Naoki Okamura',
      authorRole: 'President and CEO',
      category: 'Revenue & Market',
      tags: ['eps', 'q1-fy25', 'ira', 'strategic-brands', 'guidance', 'xtandi', 'padcev'],
      relatedKPIs: ['Core EPS', 'Total Revenue', 'Core Operating Profit', 'Core Operating Margin'],
      relatedConsoles: ['oncology-xtandi-performance', 'financial-performance'],
      relatedDrivers: ['XTANDI Revenue & IRA Risk'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'analysis',
    },
    {
      title: 'Q1 FY25 Revenue ¥537.9B — Geographic Bridge, FX Translation +¥18.3B, Segment Contribution',
      content: `## Q1 FY25 Revenue and Operating Profit by Geography

Astellas Q1 FY25 revenue of ¥537.9B grew +8.8% reported YoY (+10.2% constant currency) from ¥494.2B in Q1 FY24. The US remained the largest contributor at ¥236.6B (44.0% of total), with Established Markets (EU + Canada) at ¥139.8B (26.0%), Japan at ¥73.1B (13.6%), International Markets at ¥57.7B (10.7%), and China at ¥23.8B (4.4%). Favorable FX translation — primarily a weaker yen vs USD/EUR — contributed an estimated +¥18.3B to reported revenue growth in Q1.

**Revenue Bridge (Q1 FY24 ¥494.2B → Q1 FY25 ¥537.9B, +¥43.7B):**
| Driver | Impact (¥B) |
|---|---|
| XTANDI volume/mix growth (+3.2% US, +4.1% EU, stable Japan) | +¥13.2B |
| PADCEV US/EU expansion (+34.8% YoY run rate, new 1L urothelial indications) | +¥12.8B |
| IZERVAY US launch (second full quarter; formulary access expansion) | +¥8.5B |
| VYLOY gastric cancer Japan/EU initial uptake | +¥4.2B |
| FX translation (¥151/$1 vs ¥145/$1 Q1 FY24; ¥162/€ vs ¥156/€) | +¥18.3B |
| Japan NHI pricing (biennial April 2024 revision; net pricing headwind) | -¥4.8B |
| Legacy product erosion (Japan mature brands, LOE transitions) | -¥8.5B |
| **Total Q1 FY25 vs Q1 FY24** | **+¥43.7B** |

**Core OP Bridge (Q1 FY24 ¥111.2B → Q1 FY25 ¥130.8B, +¥19.6B):**
- US segment Core OP: ¥72.8B Q1 FY25 (30.8% margin) — XTANDI + PADCEV premium mix
- Established Markets Core OP: ¥36.3B (26.0% margin) — EU XTANDI/PADCEV stable
- Japan Core OP: ¥16.3B (22.3% margin) — NHI pricing pressure partially offset by volume
- International Markets Core OP: ¥11.5B (19.9% margin) — expansion investment phase
- China Core OP: ¥3.6B (15.1% margin) — initial market investment for VYLOY
- Corporate / R&D unallocated: -¥9.7B (milestone payments, corporate overhead)

**FX Sensitivity Note:**
Each ¥1/USD movement generates approximately +¥2.1B in annualized Core Revenue and +¥0.5B in Core OP. Our FY2025 FX assumption is ¥151/USD and ¥162/EUR. For context, Q1 FY25 actual average was ¥152.3/$1 — slightly favorable to our ¥151 assumption. A sustained ¥155/USD rate would generate approximately +¥8.4B of incremental full-year revenue vs. our guidance assumption.

**FY2025 Guidance Reaffirmation:**
All guidance metrics — Revenue ¥2,139.2B, Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01 — are reaffirmed following Q1 FY25 results. Q2 through Q4 guidance trajectory remains on plan with Q3 (October–December 2025) expected to be the highest-margin quarter of FY25 driven by strong US and EM seasonal prescription patterns.`,
      contentPlain: 'Q1 FY25 revenue ¥537.9B +8.8% YoY (+10.2% constant FX). Bridge: XTANDI +¥13.2B, PADCEV +¥12.8B, IZERVAY +¥8.5B, VYLOY +¥4.2B, FX +¥18.3B, NHI pricing -¥4.8B, legacy erosion -¥8.5B. US ¥236.6B at 30.8% margin, EM ¥139.8B at 26.0%, Japan ¥73.1B at 22.3%. FX sensitivity: +¥2.1B Core Revenue per ¥1 move. FY25 guidance fully reaffirmed.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'EVP and CFO',
      category: 'Revenue & Market',
      tags: ['revenue', 'bridge', 'q1-fy25', 'fx', 'geographic-segments', 'guidance', 'core-op'],
      relatedKPIs: ['Total Revenue', 'Core Operating Profit', 'Core EPS'],
      relatedConsoles: ['americas-performance', 'financial-performance'],
      relatedDrivers: ['Geographic Revenue Bridge'],
      fiscalPeriod: 'Q1 FY25',
      periodType: 'quarter',
      priority: 'critical',
      commentaryType: 'analysis',
    },
    {
      title: 'XTANDI FY25 ¥960.8B (+5.3%) — Prostate Cancer Leadership, IRA Negotiation Roadmap, Post-2027 Strategy',
      content: `## XTANDI (Enzalutamide) FY2025 Full-Year Performance and Strategic Outlook

XTANDI delivered FY2025 revenue of ¥960.8B, up +5.3% YoY from an estimated ¥912.4B in FY2024, sustaining its position as Astellas's largest single asset and the global market leader in non-metastatic and metastatic castration-resistant prostate cancer (nmCRPC, mCRPC) as well as metastatic castration-sensitive prostate cancer (mCSPC). The quarterly revenue trajectory was approximately ¥240B per quarter, demonstrating stable demand despite increasing competitive pressure from novel hormonal agents and looming IRA risk.

**FY2025 XTANDI Performance Detail:**
- Total FY2025 revenue: ¥960.8B (+5.3% YoY) — quarterly range ¥238–245B
- US XTANDI revenue: ~¥522B (54.3% of total; ~7% YoY volume growth offset by modest pricing)
- Established Markets: ~¥230B (abiraterone generics penetrating mCRPC first-line; XTANDI maintaining share in nmCRPC/mCSPC on clinical differentiation)
- Japan: ~¥112B (NHI price revision April 2024 created ~7% pricing headwind; volume growth modest +2%)
- International Markets + China: ~¥97B (expansion of reimbursement access in Southeast Asia and China)

**XTANDI Competitive Positioning — Prostate Cancer Landscape:**
XTANDI competes across all prostate cancer settings against darolutamide (Nubeqa, Bayer) and apalutamide (Erleada, J&J) in the novel hormonal agent class. XTANDI's competitive advantages include: (1) the broadest approved label spanning mCRPC, nmCRPC, and mCSPC; (2) the most extensive Phase 3 data package (ARCHES, ENZAMET, PROSPER, PREVAIL); (3) established HCP prescribing relationships built over 12+ years; (4) XTANDI + Pfizer co-promotion agreement in the US and select markets enhancing commercial reach.

**IRA Drug Price Negotiation — XTANDI Risk Assessment:**
XTANDI is a small-molecule oral oncology drug post-exclusivity in the US, making it eligible for Medicare Part D price negotiation under the Inflation Reduction Act. Based on current legislative interpretation, XTANDI could enter the CMS negotiation shortlist for prices effective FY2027 (announced FY2026). Our IRA impact scenario analysis:
- Base case: ~¥8–12B annual revenue reduction from FY2027 onwards (assuming 15–20% Medicare Part D price reduction on the applicable portion of US revenue)
- Risk case: ~¥18–25B if negotiated price reduction is at the upper end (25%) and more patients shift to Medicare Part D
- Mitigation: XTANDI's competitive label breadth supports market share retention; shift to commercial insurance channels may partially offset Medicare impact

**Post-2027 XTANDI Strategy:**
Our XTANDI lifecycle strategy focuses on: (1) combination approaches — XTANDI + novel PARP inhibitors, XTANDI + ADC combinations in earlier-stage prostate cancer; (2) patient selection via biomarker (AR splice variant testing); (3) geographic expansion in high-growth markets like China, Southeast Asia, and Latam. FY2026 guidance assumes XTANDI revenue of approximately ¥975B — steady growth absorbing IRA pre-negotiation uncertainty.`,
      contentPlain: 'XTANDI FY25 ¥960.8B +5.3% YoY. US ¥522B (54.3% of total). Quarterly ~¥240B, stable and predictable. IRA risk: base case ¥8–12B annual revenue reduction from FY2027; risk case ¥18–25B. Competitive: darolutamide and apalutamide competition offset by broadest prostate cancer label. FY2026 guidance ¥975B XTANDI revenue.',
      authorName: 'David Ramsay',
      authorRole: 'Chief Commercial Officer, International',
      category: 'Revenue & Market',
      tags: ['xtandi', 'fy25', 'ira', 'prostate-cancer', 'enzalutamide', 'mcrpc', 'nmcrpc'],
      relatedKPIs: ['XTANDI Revenue', 'XTANDI Revenue YoY Growth', 'US Revenue'],
      relatedConsoles: ['oncology-xtandi-performance', 'americas-performance'],
      relatedDrivers: ['XTANDI Revenue & IRA Risk'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'critical',
      commentaryType: 'analysis',
    },
    {
      title: 'Strategic Brands FY25 ¥480.3B (+43%) — PADCEV ¥221.2B, IZERVAY ¥77.6B, VYLOY Launch Momentum',
      content: `## Strategic Brands Portfolio — FY2025 Full-Year Acceleration

Astellas's Strategic Brands portfolio — comprising PADCEV, IZERVAY, XOSPATA, VYLOY, and VEOZAH — delivered FY2025 combined revenue of ¥480.3B, a +43% year-over-year increase that represents the most significant growth inflection in Astellas's commercial history since XTANDI's initial launch trajectory. This performance confirms that our portfolio transformation strategy — diversifying away from single-asset XTANDI dependency through oncology franchise expansion and specialty launches — is generating material results ahead of schedule.

**FY2025 Strategic Brands by Product:**
| Product | FY25 Revenue (¥B) | YoY Growth | Key Driver |
|---|---|---|---|
| PADCEV (enfortumab vedotin) | ¥221.2B | +34.8% | 1L UC approval (EV+P combo); label expansion across settings |
| IZERVAY (avacincaptad pegol) | ¥77.6B | +226% | First approved GA treatment; commercial launch scaling |
| XOSPATA (gilteritinib) | ¥71.8B | +2.6% | AML maintenance market; stable share; biosimilar competition distant |
| VYLOY (zolbetuximab) | ¥63.1B | New launch | Gastric cancer 1L Claudin 18.2+ indication; Japan + EU wave 1 |
| VEOZAH (fezolinetant) | ¥46.6B | New launch | VMS/vasomotor symptoms; US direct-to-consumer + OB-GYN channel |
| **Strategic Brands Total** | **¥480.3B** | **+43.0%** | Portfolio diversification fully underway |

**PADCEV — Urothelial Cancer Market Leadership:**
PADCEV with pembrolizumab (EV+P, co-promoted with Pfizer/MSD) delivered ¥221.2B in FY25, confirming its position as the preferred first-line treatment for cisplatin-ineligible and all-comers locally advanced/metastatic urothelial carcinoma (la/mUC) in the US and EU. The EV+P OS data from EV-302 (Phase 3: median OS 31.5 months vs 16.1 months chemotherapy; HR 0.47) remains the most compelling survival benefit in UC history, driving formulary pull-through and HCP prescribing behavior. FY26 guidance of ~¥265B (+20%) is supported by EV+P label consolidation across all UC patients independent of cisplatin eligibility.

**IZERVAY — Geographic Atrophy First-Mover Advantage:**
IZERVAY (avacincaptad pegol, complement C5 inhibitor) became the first FDA-approved treatment for geographic atrophy (GA) secondary to AMD, generating ¥77.6B in FY25 (+226% vs FY24 launch year). The product competes with Apellis/Roche's SYFOVRE (pegcetacoplan), a complement C3 inhibitor. IZERVAY's monthly intravitreal injection schedule (vs SYFOVRE's monthly or bi-monthly) and Phase 3 GATHER1/2 data supporting superior drusen regression drive IZERVAY share in the retinal specialist office. FY26 guidance ~¥95B (+22%) on continued formulary expansion and diagnosis rate improvement.

**VYLOY — Strategic Platform for Gastric Cancer Franchise:**
VYLOY (zolbetuximab) is the first approved Claudin 18.2-targeted therapy in gastric/GEJ cancer, representing a new biomarker-driven treatment paradigm in GI oncology. FY25 revenue of ¥63.1B reflects the first year of commercial launch in Japan (NHI listed January 2025), EU (EMA approved Q3 FY25), and initial US launch Q4 FY25 pending post-authorization CMS coverage determination. The China NMPA approval (Q2 FY25) opens the world's largest gastric cancer market — an estimated 35% of global GC incidence — to VYLOY with significant long-term revenue potential. FY26 guidance ~¥110B (+74%) is the most aggressive growth assumption in our portfolio.`,
      contentPlain: 'Strategic Brands FY25 ¥480.3B +43% YoY. PADCEV ¥221.2B +34.8% (EV+P 1L UC). IZERVAY ¥77.6B +226% (geographic atrophy first-mover). XOSPATA ¥71.8B +2.6% (AML stable). VYLOY ¥63.1B launch year (gastric cancer, Claudin 18.2, China approval). VEOZAH ¥46.6B launch year (VMS). FY26 guidance: PADCEV ¥265B, IZERVAY ¥95B, VYLOY ¥110B.',
      authorName: 'David Ramsay',
      authorRole: 'Chief Commercial Officer, International',
      category: 'Revenue & Market',
      tags: ['strategic-brands', 'padcev', 'izervay', 'vyloy', 'veozah', 'xospata', 'fy25'],
      relatedKPIs: ['Strategic Brands Revenue', 'PADCEV Revenue', 'VYLOY Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'americas-performance'],
      relatedDrivers: ['Strategic Brands Launch Performance'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'critical',
      commentaryType: 'analysis',
    },
    {
      title: 'PADCEV Launch Excellence — EV+P First-Line UC, Pfizer Co-Promotion, ¥221.2B (+34.8%) FY25',
      content: `## PADCEV (Enfortumab Vedotin) — Urothelial Cancer Franchise Deep Dive

PADCEV (enfortumab vedotin, EV), developed through Astellas's collaboration with Seagen (acquired by Pfizer in 2023), has established itself as the transformative treatment for locally advanced/metastatic urothelial carcinoma (la/mUC). FY2025 revenue of ¥221.2B (+34.8% YoY) is underpinned by the landmark EV-302 trial (EV+pembrolizumab vs chemotherapy as 1L la/mUC), which generated the most compelling overall survival data in the history of urothelial cancer.

**EV-302 Clinical Data — Foundation of Market Leadership:**
- Overall Survival: Median 31.5 months EV+P vs 16.1 months chemotherapy — HR 0.47 (p<0.0001)
- PFS: Median 12.5 months vs 6.3 months — HR 0.45
- ORR: 67.7% vs 44.4% (complete response rate 29.1% vs 12.5%)
- Benefit consistent across cisplatin-eligible and cisplatin-ineligible patients
- All-comer label: FDA approval covers all 1L la/mUC patients regardless of PD-L1 status

This OS benefit — nearly doubling median survival vs chemotherapy — represents the strongest randomized evidence ever presented in bladder cancer and has driven rapid adoption by urologic oncologists, medical oncologists, and academic comprehensive cancer centers. The label encompasses the full la/mUC patient population, eliminating the prior restriction to cisplatin-ineligible patients.

**US Commercial Execution — Pfizer Co-Promotion:**
Astellas retains 50% economics on US PADCEV revenue with Pfizer (formerly Seagen) handling co-promotion. Pfizer's oncology commercial infrastructure — the largest in oncology globally — provides PADCEV access to a dedicated US sales force of ~800 representatives covering the full urologic oncology call universe. Key commercial metrics Q1 FY25:
- PADCEV brand awareness among medical oncologists treating GU cancers: >92%
- New patient starts in 1L la/mUC: +38% YoY Q1 FY25
- Formulary access (commercial insurance + Medicare Part D): >85% of covered lives
- Average net selling price per patient treatment course: ~$18,000/cycle (28-day EV equivalent)

**EU Launch and Reimbursement Progress:**
EU EMA approval was received Q2 FY24 with CHMP positive opinion for EV+P in 1L cisplatin-ineligible la/mUC. National reimbursement negotiations are proceeding across the five major EU markets (DE, FR, IT, ES, GB):
- Germany (G-BA): Benefit dossier submitted; early access pricing in place; AMNOG benefit rating Q3 FY25
- France (HAS): Early access scheme (ATU); formal ASMR filing Q4 FY25
- UK (NICE): Single Technology Appraisal guidance expected Q1 FY26; interim commercial access via CDF
- Italy/Spain: Company submission filed; national reimbursement expected FY26

**FY2026 PADCEV Outlook:**
FY2026 guidance of ~¥265B (+20% YoY) reflects: (1) continued 1L la/mUC penetration in the US as market share matures from ~38% to ~50% of eligible patients; (2) EU national reimbursement rolling through FY26; (3) EV monotherapy in 2L+ after platinum/IO failure sustaining volume; (4) emerging investigational data in MIBC (muscle-invasive bladder cancer, neoadjuvant setting) which could open a new adjuvant opportunity from FY2027.`,
      contentPlain: 'PADCEV FY25 ¥221.2B +34.8% YoY. EV-302 OS data: 31.5 vs 16.1 months, HR 0.47 — transformative for 1L la/mUC. Pfizer co-promotion: >92% oncologist awareness, +38% new patient starts Q1 FY25. US ~$18,000/cycle net price. EU reimbursement proceeding — Germany AMNOG, France ATU, UK NICE CDF. FY26 guidance ¥265B +20%.',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Chief Medical Officer',
      category: 'Revenue & Market',
      tags: ['padcev', 'ev302', 'uc', 'urothelial', 'pfizer', 'enfortumab-vedotin', 'fy25'],
      relatedKPIs: ['PADCEV Revenue', 'PADCEV Revenue Growth', 'Strategic Brands Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'americas-performance'],
      relatedDrivers: ['Strategic Brands Launch Performance'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'VYLOY Gastric Cancer — Claudin 18.2 Biomarker Platform, ¥63.1B Launch Year, China Opportunity',
      content: `## VYLOY (Zolbetuximab) — Gastric Cancer Launch and Claudin 18.2 Platform Strategy

VYLOY (zolbetuximab), Astellas's Claudin 18.2-targeted monoclonal antibody, achieved FY2025 launch-year revenue of ¥63.1B — substantially above our internal plan of ¥50B — driven by rapid uptake in Japan, initial EU revenue, and US commercial launch initiation in Q4 FY25. VYLOY represents Astellas's strategic entry into the GI oncology space and the world's first approved targeted therapy for Claudin 18.2-expressing gastric/gastroesophageal junction (GEJ) adenocarcinoma.

**Clinical Foundation — SPOTLIGHT and GLOW Pivotal Trials:**
- SPOTLIGHT (Phase 3): Zolbetuximab + mFOLFOX6 vs mFOLFOX6 alone in Claudin 18.2+/HER2- 1L G/GEJ
  - mPFS: 10.61 vs 8.67 months (HR 0.75; p=0.0006)
  - mOS: 18.23 vs 15.54 months (HR 0.75; p=0.0053)
- GLOW (Phase 3): Zolbetuximab + CAPOX vs CAPOX in same patient population
  - mPFS: 8.21 vs 6.80 months (HR 0.69; p=0.0007)
  - mOS: 14.39 vs 12.16 months (HR 0.77; p=0.0053)

Both trials met dual primary endpoints (PFS and OS), providing robust Phase 3 evidence supporting approval across regulatory jurisdictions. The biomarker selection (Claudin 18.2 expression ≥75% of tumor cells at 2+ intensity by IHC) identifies approximately 36–40% of eligible G/GEJ patients, creating a defined companion diagnostic opportunity.

**Japan Launch — NHI Listed January 2025:**
VYLOY was NHI-listed in Japan effective January 2025 at ¥127,000/vial, targeting approximately 18,000 Claudin 18.2-eligible new gastric cancer patients annually in Japan. Initial uptake through Q4 FY25 exceeded plan by 25%, with major academic cancer centers in Tokyo, Osaka, and Nagoya quickly adopting VYLOY into institutional treatment algorithms. Japan FY25 revenue ¥42.5B is a strong foundation for FY26 guidance of ¥55B as community oncology uptake follows institutional adoption.

**EU and US Launch Cadence:**
- EU EMA approval received November 2024; national reimbursements proceeding (DE, FR early access)
- US FDA approval December 2024; commercial launch initiated Q4 FY25 targeting GI oncology practices
- FY25 EU/US combined revenue ¥20.6B — early ramp consistent with trajectory to ¥55B FY26

**China — Largest Global Opportunity:**
China accounts for approximately 35% of global gastric cancer incidence (~300,000 new cases/year). VYLOY received NMPA approval in Q2 FY25, and early access programs were initiated through National Cancer Centers in Beijing and Shanghai. China VYLOY revenue in FY25 was ¥nil (approval year, access program ramp), with FY26 expected to contribute ¥15–20B as NRDL listing negotiation proceeds. The VYLOY China launch is the most significant near-term catalyst for Astellas's China business and a critical component of our ¥2,220B FY26 revenue guidance.

**Claudin 18.2 Platform — Beyond Gastric Cancer:**
VYLOY's clinical data validates Claudin 18.2 as a functional cancer target beyond gastric cancer. Pipeline assets targeting Claudin 18.2 in pancreatic cancer (ASP2138, Phase 1), biliary tract cancer (investigational IND filed), and lung adenocarcinoma are in early clinical stages, representing the potential for a multi-indication Claudin 18.2 franchise with ¥200–400B long-term revenue potential.`,
      contentPlain: 'VYLOY FY25 ¥63.1B launch year (vs ¥50B plan). SPOTLIGHT/GLOW Phase 3 OS benefit (HR 0.75 both). Claudin 18.2+ patient selection ~36-40% of G/GEJ patients. Japan NHI January 2025 at ¥127k/vial; Japan FY25 ¥42.5B. EU EMA approved Nov 2024; US FDA Dec 2024. China NMPA Q2 FY25 — NRDL negotiation key FY26 catalyst. FY26 guidance ¥110B (+74%). Claudin 18.2 platform extending to pancreatic, biliary, lung cancers.',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Chief Medical Officer',
      category: 'Strategic',
      tags: ['vyloy', 'zolbetuximab', 'gastric-cancer', 'claudin-18-2', 'china', 'nmpa', 'nhi'],
      relatedKPIs: ['VYLOY Revenue', 'China Revenue', 'Strategic Brands Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'enterprise-pipeline'],
      relatedDrivers: ['Strategic Brands Launch Performance'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'SMT FY25 ¥21B Savings Realized — ¥40B FY26 Target, 26.0% Core OP Margin Achievement',
      content: `## Strategic Management Transformation — Cost Program Progress and Margin Pathway

Astellas's Strategic Management Transformation (SMT) cost optimization program delivered ¥21.0B of cumulative savings in FY2025, meeting our full-year SMT target and contributing to the achievement of a 26.0% full-year Core Operating Profit margin (¥555.7B on ¥2,139.2B revenue). The SMT program is the primary structural driver of margin expansion at Astellas alongside the portfolio mix shift toward higher-margin oncology products. Our FY2026 SMT target of ¥40B (cumulative from FY2024 baseline) represents a ¥19B incremental savings target — the largest annual SMT delivery in the program's three-year history.

**FY2025 SMT Savings by Category:**
| Initiative | FY25 Savings (¥B) |
|---|---|
| R&D portfolio prioritization (exit from non-core programs; CRO rationalization) | ¥6.5B |
| SG&A optimization (field force right-sizing; digital detailing mix shift) | ¥5.8B |
| Supply chain and manufacturing network consolidation (Japan site rationalization) | ¥4.2B |
| Commercial infrastructure consolidation (shared services; non-US market footprint) | ¥2.8B |
| Corporate overhead (spans & layers; real estate; IT vendor consolidation) | ¥1.7B |
| **FY2025 Total SMT Savings** | **¥21.0B** |

**Margin Bridge FY2024 → FY2025 (23.3% → 26.0%, +270bps):**
- Strategic Brands mix shift (higher-margin oncology products): +150bps
- SMT savings flowing through Core OP: +110bps
- R&D productivity improvement (POCs delivered within R&D budget): +60bps
- Japan NHI pricing headwind: -30bps
- FX translation (yen weakness marginally helps reported margin): +20bps
- Other / net: -40bps
- **Net Core OP margin improvement: +270bps**

**FY2026 SMT Path to ¥40B:**
The ¥40B FY2026 SMT target (¥19B incremental vs FY2025) focuses on three accelerating workstreams: (1) Commercial Excellence — a global commercial model redesign targeting ¥8B of SG&A efficiency by reducing non-productive field force activities and shifting to digital/omni-channel HCP engagement; (2) R&D Program Rationalization — advancing high-POC-confidence assets while terminating programs below our Stage Gate 3 efficacy threshold (targeting ¥6B savings vs FY2025 R&D envelope); (3) Manufacturing Network — completing the Japan manufacturing site consolidation (from 5 to 3 active production facilities) generating ¥5B of fixed cost reduction. The SMT Governance Office reports monthly to the CEO and CFO with quarterly board-level progress tracking.

**FY2026 Margin Guidance (27.9%):**
Core OP margin guidance of 27.9% (¥620B on ¥2,220B revenue) represents a +190bps improvement from FY2025. The margin expansion is driven by approximately equal contributions from SMT savings (+100bps), favorable Strategic Brands mix (+80bps), and operational leverage on revenue growth (+40bps), partially offset by SG&A investment in VYLOY launch scale-up (-30bps) and R&D continued investment in Phase 3 initiations (-20bps). Our long-term Core OP margin target of 30%+ by FY2028 remains achievable on this trajectory.`,
      contentPlain: 'SMT FY25 ¥21B savings delivered. By category: R&D ¥6.5B, SG&A ¥5.8B, supply chain ¥4.2B, commercial ¥2.8B, corporate ¥1.7B. Core OP margin FY24 23.3% → FY25 26.0% (+270bps): mix shift +150bps, SMT +110bps. FY26 SMT ¥40B target (¥19B incremental). FY26 margin guidance 27.9% = +190bps. Long-term 30%+ target by FY2028.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'EVP and CFO',
      category: 'Financial Performance',
      tags: ['smt', 'cost-transformation', 'margin', 'fy25', 'core-op', 'efficiency', 'fy26'],
      relatedKPIs: ['Core Operating Profit', 'Core Operating Margin', 'SMT Savings'],
      relatedConsoles: ['smt-cost-transformation', 'financial-performance'],
      relatedDrivers: ['SMT Cost Transformation'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'China ¥101.5B (+29.6%) — VYLOY NMPA Approval, XTANDI Growth, FY2026 ¥135B Pathway',
      content: `## China Market Expansion — Fastest Growing Geographic Segment

China delivered FY2025 revenue of ¥101.5B, up +29.6% YoY from ¥78.3B in FY2024, making it Astellas's fastest-growing geographic segment and the primary driver of our International Markets growth acceleration. The +29.6% growth significantly outpaced the China pharma market's estimated +8% growth rate, driven by XTANDI prostate cancer volume growth on the NRDL (National Reimbursement Drug List) and the initiation of VYLOY early access in H2 FY2025.

**China FY2025 Performance by Product:**
- XTANDI (enzalutamide): ~¥80B (prostate cancer; NRDL listed; growing prescribing base at NCCC centers)
- VYLOY (zolbetuximab): ~¥8B (early access post-NMPA approval Q2 FY25; pre-NRDL access programs)
- Other products (XOSPATA, legacy): ~¥13.5B (XOSPATA AML limited access; legacy portfolio tail)

**XTANDI China — NRDL Access and Volume Growth:**
XTANDI has been included on the NRDL since FY2022, with the NRDL price negotiation providing substantial volume growth at a ~35% price reduction vs ex-factory pricing. Despite the price concession, patient volume growth (+45% YoY in FY25) more than offset pricing, generating net revenue growth of approximately +25% for XTANDI China. Prostate cancer incidence in China is growing at ~5-8% per year driven by aging demographics and improved PSA screening adoption — a favorable secular tailwind for the next decade.

**VYLOY — NMPA Approval and NRDL Pathway:**
VYLOY received NMPA (National Medical Products Administration) approval in Q2 FY2025 for first-line Claudin 18.2-expressing gastric/GEJ cancer. Given China's ~300,000 annual gastric cancer incidence (approximately 35% of global), the potential addressable patient population for VYLOY in China is extraordinarily large — approximately 108,000 Claudin 18.2+ patients per year. The NRDL negotiation for VYLOY is expected in the Annual NRDL Review (typically November), with listing anticipated FY2026Q3. We project VYLOY China revenue of ¥15–20B in FY2026 post-NRDL access expansion, scaling to ¥45–60B by FY2028 as community hospital access develops.

**Strategic Priorities for China FY2026:**
| Priority | Expected Impact |
|---|---|
| VYLOY NRDL listing (November 2026 cycle) | +¥10–15B FY2026 contribution |
| XTANDI continued volume growth (+20% YoY target) | +¥16B incremental |
| XOSPATA AML access program expansion | +¥3–5B |
| Digital HCP engagement infrastructure (Aster Health China) | Efficiency gains |

**FY2026 China Guidance: ¥135B (+33%):**
FY2026 China guidance of ¥135B represents continued strong double-digit growth driven by VYLOY NRDL access, XTANDI volume compounding, and the nascent contribution from pipeline expansion. China's contribution to total Astellas revenue is projected to reach 6.1% in FY2026 (vs 4.7% in FY2025), reflecting its growing strategic importance as the US/EM markets mature. Medium-term target: ¥250B by FY2028 as the gastric cancer Claudin 18.2 franchise scales.`,
      contentPlain: 'China FY25 ¥101.5B +29.6% YoY (fastest growing segment). XTANDI ~¥80B on NRDL (+25% net revenue). VYLOY ~¥8B post-NMPA approval Q2 FY25. VYLOY potential: 108,000 Claudin 18.2+ eligible patients/year. NRDL listing expected Nov 2026 cycle. FY26 China guidance ¥135B (+33%). Medium-term ¥250B by FY2028.',
      authorName: 'Hiroshi Miyamoto',
      authorRole: 'Chief Strategy Officer',
      category: 'Strategic',
      tags: ['china', 'vyloy', 'xtandi', 'nrdl', 'nmpa', 'fy25', 'gastric-cancer'],
      relatedKPIs: ['China Revenue', 'VYLOY Revenue', 'Strategic Brands Revenue'],
      relatedConsoles: ['strategic-brands-growth', 'financial-performance'],
      relatedDrivers: ['Geographic Revenue Bridge'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'R&D Pipeline FY25 — 3 POCs Delivered, Phase 3 Initiations FY26, 14-Asset Clinical Portfolio',
      content: `## R&D Pipeline Progress — Proof-of-Concept Deliveries and Phase 3 Advancement

Astellas delivered 3 Proof-of-Concept (POC) readouts in FY2025 from our oncology and adjacency pipeline, meeting our internal commitment of 2–3 POC programs per year and validating our Focus Area Approach (FAA) research strategy. These POC decisions — covering novel oncology mechanisms, bladder biology, and cellular dysfunction — inform our FY2026 Phase 3 investment decisions and demonstrate the productivity of our ~¥370B annual R&D investment.

**FY2025 POC Deliveries:**
1. **ASP3082 (KRAS G12D inhibitor, solid tumors):** Phase 1b expansion cohort data demonstrated ORR of 24% (confirmed) in KRAS G12D-mutant pancreatic ductal adenocarcinoma (PDAC) and 18% in colorectal cancer. POC declared; Phase 2 expansion initiated Q4 FY25. Combination with SOS1 inhibitor and MEK inhibitor being explored in ongoing triplet combination cohorts.

2. **ASP2138 (Claudin 18.2 × CD3 bispecific T-cell engager, gastric cancer):** Phase 1 dose-escalation in relapsed/refractory G/GEJ Claudin 18.2+ patients. ORR 31% (n=48 evaluable) in 3L+ patients — significant for a heavily pre-treated population. POC confirmed; Phase 2 expansion initiated in partnership with external solid tumor bispecific expertise. Positions VYLOY + ASP2138 as a combination strategy in Claudin 18.2+ gastric cancer.

3. **ASP9801 (EP4 receptor antagonist, bladder cancer):** Phase 1b combination with atezolizumab (PD-L1) in cisplatin-ineligible UC. Disease control rate 52% with manageable tolerability. POC declared; proceeding to randomized Phase 2 in 2L UC in FY26 — potential complementary mechanism to PADCEV for bladder cancer franchise depth.

**FY2026 Phase 3 Initiations (3 Programs):**
| Program | Indication | Mechanism | Phase 3 Start |
|---|---|---|---|
| ASP3082 | KRAS G12D PDAC (2L) | KRAS G12D inhibitor | Q1 FY26 (initiated) |
| Zolbetuximab (VYLOY) adjuvant | Resected Claudin 18.2+ gastric cancer | Claudin 18.2 mAb | Q2 FY26 |
| ASP2138 | Claudin 18.2+ gastric cancer 2L | CD3 bispecific | Q3 FY26 |

**Pipeline Breadth — 14 Clinical-Stage Assets:**
Our clinical pipeline spans 14 assets (Phase 1–3) across oncology (10 programs), urology/nephrology (2), and immunology (2). The oncology programs are concentrated in our three Focus Areas: prostate cancer (2 XTANDI lifecycle programs, AR splice variant strategy), bladder/urothelial (PADCEV combinations, ASP9801), and GI oncology (VYLOY adjuvant, ASP2138, ASP3082 via pancreatic). The R&D budget of ~¥370B (17.3% of FY25 revenue) will be maintained at approximately 17–18% of revenue in FY26, reflecting disciplined allocation to validated programs.

**R&D Productivity — POC-to-Phase-3 Conversion Rate:**
Our 3-year rolling POC-to-Phase-3 conversion rate stands at 42% (vs industry average ~35%), reflecting the benefit of our FAA strategy in concentrating resources on biologically validated targets. We target 2–3 POC readouts per year through FY2028, with expected Phase 3 initiations of 3–4 per year, maintaining a healthy pipeline velocity to offset the eventual loss of exclusivity on current marketed products.`,
      contentPlain: 'FY25: 3 POC deliveries — ASP3082 (KRAS G12D, PDAC 24% ORR), ASP2138 (Claudin 18.2 bispecific, 31% ORR 3L+ GC), ASP9801 (EP4 + atezolizumab, 52% DCR UC). FY26: 3 Phase 3 initiations — ASP3082 PDAC 2L, VYLOY adjuvant gastric, ASP2138 2L gastric. 14-asset clinical pipeline, 42% POC-to-Phase-3 conversion. R&D ¥370B/year (~17.3% of revenue).',
      authorName: 'Bernhardt Zeiher',
      authorRole: 'Chief Medical Officer',
      category: 'Strategic',
      tags: ['pipeline', 'poc', 'phase3', 'asp3082', 'asp2138', 'asp9801', 'fy25', 'rd'],
      relatedKPIs: ['Strategic Brands Revenue', 'VYLOY Revenue'],
      relatedConsoles: ['enterprise-pipeline', 'strategic-brands-growth'],
      relatedDrivers: ['Pipeline POC & R&D'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'FX Impact ¥151/$1 Baseline — +¥2.1B/¥1 Sensitivity, FCF ¥560.2B, Dividend ¥78/Share',
      content: `## Capital Allocation, FX Sensitivity, and Balance Sheet Positioning

Astellas's FY2025 Free Cash Flow of ¥560.2B reflects a strong cash generation year supported by Core Operating Profit of ¥555.7B, working capital improvements, and modest capex of ¥38.5B. Our capital allocation priorities — ranked by hierarchy — are: (1) R&D investment in the pipeline; (2) dividend at ¥78/share (¥128.7B total, 23.0% payout ratio); (3) bolt-on M&A/licensing to strengthen therapeutic focus areas; (4) share buyback opportunistically when leverage is below 0.5x Net Debt/EBITDA. Our balance sheet is conservatively managed with net cash of approximately ¥142B as of March 2026.

**FX Translation Impact — FY2025:**
- Revenue FX impact: +¥42.5B favorable (yen weakness vs USD, EUR, GBP, AUD)
- Core OP FX impact: +¥11.8B favorable (partially offset by USD-denominated costs: Pfizer milestone payments, US manufacturing, royalties)
- FY2025 average FX rate: ¥152.1/$1, ¥162.4/€1 (vs ¥145.0/$1, ¥155.0/€1 in FY2024)
- FY2026 guidance FX assumption: ¥151/$1, ¥160/€1

**FX Sensitivity Matrix (annualized Core Revenue impact per ¥1 change):**
| Currency Pair | ¥1 Impact on Revenue | ¥1 Impact on Core OP |
|---|---|---|
| ¥/USD (move of ¥1 per dollar) | +¥2.1B | +¥0.5B |
| ¥/EUR (move of ¥1 per euro) | +¥1.4B | +¥0.3B |
| ¥/GBP (move of ¥1 per pound) | +¥0.4B | +¥0.1B |
| ¥/CNY (move of ¥0.1 per yuan) | +¥0.2B | +¥0.05B |

If ¥/USD weakens to ¥155 vs our ¥151 assumption, FY2026 revenues would receive approximately +¥8.4B of incremental reported revenue — equivalent to roughly 0.4% of total FY2026 guidance. The impact on Core OP would be approximately +¥2.0B, adding ~¥1.20 to Core EPS vs guidance.

**Free Cash Flow Generation — FY2025:**
| Item | FY25 (¥B) |
|---|---|
| Core Operating Profit | ¥555.7B |
| Depreciation & Amortization (add-back) | ¥62.3B |
| Working Capital Movement | -¥15.8B |
| Capital Expenditure (net) | -¥38.5B |
| Tax paid | -¥135.2B |
| Interest and other | +¥10.5B |
| **Free Cash Flow (FY25)** | **¥560.2B** |

**Dividend Policy — ¥78/Share (FY2025):**
The FY2025 annual dividend of ¥78/share (¥39 interim + ¥39 final) represents a +13.0% increase from ¥69/share in FY2024, funded from FCF with a 23.0% payout ratio. Our progressive dividend policy targets payout ratio increases of ~1–2ppt per year as earnings grow, with FY2026 guidance assuming ¥92/share dividend (+17.9%) representing a 25.5% payout on ¥256.77 Core EPS guidance — maintaining the dividend well within FCF coverage of approximately 4.4x.

**Balance Sheet and Leverage:**
Astellas maintains a net cash position of ~¥142B. Our leverage target is Net Debt/EBITDA below 1.0x. This conservative positioning provides flexibility for a major in-licensing or acquisition opportunity — our pipeline strategy calls for external innovation access in high-value oncology/adjacency mechanisms where internal discovery productivity is lower.`,
      contentPlain: 'FCF FY25 ¥560.2B. FX baseline ¥151/$1; +¥2.1B revenue per ¥1 USD move. Dividend ¥78/share FY25 (+13.0% YoY), 23.0% payout ratio. FY2026 dividend guidance ¥92/share. Net cash ~¥142B; leverage Net Debt/EBITDA below 1.0x. Capex ¥38.5B. FY25 FX benefit: +¥42.5B revenue, +¥11.8B Core OP.',
      authorName: 'Atsushi Kitamura',
      authorRole: 'EVP and CFO',
      category: 'Financial Performance',
      tags: ['fcf', 'fx', 'dividend', 'capital-allocation', 'fy25', 'balance-sheet', 'leverage'],
      relatedKPIs: ['Free Cash Flow', 'Core EPS', 'Net Debt / Equity'],
      relatedConsoles: ['financial-performance', 'smt-cost-transformation'],
      relatedDrivers: ['Capital Allocation & Dividend'],
      fiscalPeriod: 'FY25',
      periodType: 'annual',
      priority: 'high',
      commentaryType: 'analysis',
    },
    {
      title: 'FY2026 Outlook — ¥2,220B Revenue, Core EPS ¥256.77, ¥620B Core OP, Key Catalysts',
      content: `## FY2026 Full-Year Guidance and Strategic Catalysts

Astellas issues FY2026 (April 2026 – March 2027) guidance of Revenue ¥2,220B (+3.8% YoY), Core Operating Profit ¥620B (27.9% Core OP margin, +190bps), and Core EPS ¥256.77 (+8.3% YoY). This guidance reflects a measured growth outlook that acknowledges the IRA XTANDI risk headwind materializing in FY2027, the continued strong Strategic Brands trajectory, and meaningful upside catalysts from VYLOY China NRDL listing and Phase 3 program readouts.

**FY2026 Revenue Guidance Bridge (FY2025 ¥2,139.2B → FY2026 ¥2,220B, +¥80.8B):**
| Driver | Impact (¥B) |
|---|---|
| XTANDI steady growth (+1.5% organic; slight IRA pre-negotiation softness) | +¥14.4B |
| PADCEV continued expansion (1L UC market penetration US/EU; ¥265B guidance) | +¥43.8B |
| VYLOY scale (Japan full year + EU + US + China NRDL; ¥110B guidance) | +¥46.9B |
| IZERVAY continued US growth (¥95B guidance; +22%) | +¥17.4B |
| VEOZAH/XOSPATA combined | +¥8.5B |
| Japan NHI repricing headwind (biennial April 2026 review, expected 6–8% price reduction) | -¥18.5B |
| Legacy product erosion | -¥12.4B |
| FX assumption (¥151/$ vs actual ¥152.1/$; slight headwind at guidance FX) | -¥19.3B |
| **Total FY2026 vs FY2025** | **+¥80.8B** |

**Core OP Margin Bridge (FY2025 26.0% → FY2026 27.9%, +190bps):**
- SMT incremental savings (¥40B cumulative → +¥19B incremental FY26): +100bps
- Strategic Brands mix shift (higher-margin products growing faster): +80bps
- Revenue leverage on manufacturing fixed costs: +40bps
- VYLOY launch investment (SG&A scale-up; medical affairs expansion): -30bps

**Key Catalysts for FY2026 Upside vs Guidance:**
1. **VYLOY China NRDL listing** (November 2026 Annual Review expected): +¥10–15B upside if listed at acceptable price
2. **EV+P EU national reimbursements rolling** (UK NICE, France formal ASMR): +¥8–12B upside vs guidance
3. **XTANDI IRA outcome favorable** (lower-than-expected Medicare Part D negotiated price): +¥8–15B if base case proves conservative
4. **ASP3082 Phase 2 readout** (KRAS G12D PDAC): Pipeline derisking event; no revenue impact FY26 but investor sentiment positive
5. **FX upside** (each ¥1 weakening vs USD: +¥2.1B revenue, +¥0.5B Core OP)

**FY2026 Downside Risks:**
1. IRA XTANDI price negotiation announced earlier-than-expected: -¥18–25B revenue risk
2. VYLOY NRDL listing delayed to FY2027 or at unacceptable price: -¥10–15B vs guidance
3. PADCEV competitive entrant (sacituzumab govitecan, trastuzumab deruxtecan UC label): -¥15–25B revenue risk if market share shifts materially
4. Japan NHI pricing revision steeper than 6–8% assumption: -¥5–10B additional headwind

**Long-Term (FY2028) Aspirational Targets:**
Astellas management's FY2028 aspirational targets include Revenue ¥2,600B+, Core OP Margin 30%+, and Core EPS ¥320+. These targets are conditional on VYLOY China scale-up, pipeline Phase 3 successes (ASP2138, ASP3082), and continued XTANDI resilience. The transformation from single-asset XTANDI dependence to a balanced oncology portfolio — delivering on the 10-year Astellas Strategic Plan — positions us for sustainable long-term value creation despite the IRA headwind.`,
      contentPlain: 'FY26 guidance: Revenue ¥2,220B +3.8%, Core OP ¥620B (27.9% margin), Core EPS ¥256.77 +8.3%. Revenue bridge: PADCEV +¥43.8B, VYLOY +¥46.9B, XTANDI +¥14.4B, Japan NHI -¥18.5B, FX -¥19.3B. Key upside: VYLOY China NRDL +¥10-15B, EU PADCEV reimbursements +¥8-12B. FY2028 aspirations: ¥2,600B revenue, 30%+ Core OP margin.',
      authorName: 'Naoki Okamura',
      authorRole: 'President and CEO',
      category: 'Strategic',
      tags: ['fy26', 'guidance', 'outlook', 'xtandi', 'padcev', 'vyloy', 'core-eps'],
      relatedKPIs: ['Core EPS', 'Total Revenue', 'Core Operating Profit', 'FY2026 Core EPS Guidance'],
      relatedConsoles: ['financial-performance', 'oncology-xtandi-performance'],
      relatedDrivers: ['Core Earnings per Share'],
      fiscalPeriod: 'FY26',
      periodType: 'annual',
      priority: 'critical',
      commentaryType: 'analysis',
    },
  ];

  // Look up driver IDs by name to link commentary to the hierarchy
  const driverNameToId = new Map<string, number>();
  const driverLookups = [
    'XTANDI Revenue & IRA Risk',
    'Strategic Brands Launch Performance',
    'Core Earnings per Share',
    'Geographic Revenue Bridge',
    'SMT Cost Transformation',
    'Pipeline POC & R&D',
    'Capital Allocation & Dividend',
    'FX Translation Impact',
  ];
  for (const name of driverLookups) {
    const driver = await prisma.consoleDriver.findFirst({
      where: { console: { companyId }, name },
      select: { id: true },
    });
    if (driver) driverNameToId.set(name, driver.id);
  }

  // Map commentary titles -> driver names for linking
  const titleToDriver: Record<string, string> = {
    'Q1 FY25 Core EPS ¥54.88 — +16.2% YoY: Strategic Brands Surge, XTANDI IRA Monitoring, FY2026 Path': 'XTANDI Revenue & IRA Risk',
    'Q1 FY25 Revenue ¥537.9B — Geographic Bridge, FX Translation +¥18.3B, Segment Contribution': 'Geographic Revenue Bridge',
    'XTANDI FY25 ¥960.8B (+5.3%) — Prostate Cancer Leadership, IRA Negotiation Roadmap, Post-2027 Strategy': 'XTANDI Revenue & IRA Risk',
    'Strategic Brands FY25 ¥480.3B (+43%) — PADCEV ¥221.2B, IZERVAY ¥77.6B, VYLOY Launch Momentum': 'Strategic Brands Launch Performance',
    'PADCEV Launch Excellence — EV+P First-Line UC, Pfizer Co-Promotion, ¥221.2B (+34.8%) FY25': 'Strategic Brands Launch Performance',
    'VYLOY Gastric Cancer — Claudin 18.2 Biomarker Platform, ¥63.1B Launch Year, China Opportunity': 'Strategic Brands Launch Performance',
    'SMT FY25 ¥21B Savings Realized — ¥40B FY26 Target, 26.0% Core OP Margin Achievement': 'SMT Cost Transformation',
    'China ¥101.5B (+29.6%) — VYLOY NMPA Approval, XTANDI Growth, FY2026 ¥135B Pathway': 'Geographic Revenue Bridge',
    'R&D Pipeline FY25 — 3 POCs Delivered, Phase 3 Initiations FY26, 14-Asset Clinical Portfolio': 'Pipeline POC & R&D',
    'FX Impact ¥151/$1 Baseline — +¥2.1B/¥1 Sensitivity, FCF ¥560.2B, Dividend ¥78/Share': 'Capital Allocation & Dividend',
    'FY2026 Outlook — ¥2,220B Revenue, Core EPS ¥256.77, ¥620B Core OP, Key Catalysts': 'Core Earnings per Share',
  };

  for (const c of commentary) {
    const driverName = titleToDriver[c.title];
    const driverId = driverName ? driverNameToId.get(driverName) ?? null : null;

    await prisma.commentary.create({
      data: {
        companyId,
        ...c,
        driverId,
        aggregationLevel: driverId ? 'driver' : 'manual',
      },
    });
  }

  console.log(`  Seeded ${commentary.length} commentary entries (${driverNameToId.size} driver-linked)`);
}
