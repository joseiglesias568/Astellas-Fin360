import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 37: Astellas Pharma Inc. — Medical Congress & Commercial Launch Calendar
//
// 12 events spanning FY25-FY26 across 5 categories.
//
// Categories:
//   oncology_congress      — ASCO, ESMO, EAU, AACR, ASH, JSCO; key data presentation events
//   product_launch         — VYLOY US launch, IZERVAY Year 2, PADCEV new indication
//   ira_communication      — XTANDI IRA Part D negotiation patient/payer outreach
//   market_access          — China VYLOY hospital listing, EU reimbursement campaigns
//   disease_awareness      — VEOZAH women's health DTC, geographic atrophy awareness
// =============================================================================

export async function seedPromotionalCalendar(prisma: PrismaClient, companyId: number) {
    console.log('Seeding Astellas Pharma medical congress & commercial launch calendar...');

    const events = [
        // =====================================================================
        // ONCOLOGY CONGRESS EVENTS
        // =====================================================================
        {
            companyId,
            campaignName: 'AACR Annual Meeting 2025 — Pipeline & Translational Data',
            startDate: new Date('2025-04-25'),
            endDate: new Date('2025-04-30'),
            category: 'oncology_congress',
            // AACR Annual Meeting (Chicago, April 2025): cancer biology and translational science.
            // Astellas pipeline presentations: ASP-2138 (CLDN18.2 bispecific Phase 1b POC data),
            // ASP-4780 (ROR1-ADC preclinical mechanistic data), and XTANDI resistance mechanisms.
            // CLDN18.2 bispecific data at AACR: if positive, will validate VYLOY → ASP-2138
            // treatment continuum strategy and accelerate Phase 2 initiation.
            // Revenue impact context: AACR does not drive near-term commercial revenue directly;
            // pipeline data presentation can drive long-term investor confidence and partnership
            // interest (revenueImpact reflects estimated pipeline NPV contribution from data validation).
            revenueImpact: 8500,       // ¥M estimated pipeline NPV contribution from positive AACR POC data
            transactionLift: null,
            ticketLift: null,
            status: 'complete',
            region: 'Global (Chicago, US)',
        },
        {
            companyId,
            campaignName: 'ASCO Annual Meeting 2025 — PADCEV, VYLOY, XTANDI Data',
            startDate: new Date('2025-05-30'),
            endDate: new Date('2025-06-03'),
            category: 'oncology_congress',
            // ASCO Annual Meeting (Chicago, June 2025): largest global oncology congress.
            // Key Astellas presentations:
            //   - PADCEV (EV+P) ESNM33 long-term OS update: 36-month data confirming survival benefit
            //     in first-line urothelial carcinoma — expected to further cement standard of care status
            //   - VYLOY SPOTLIGHT 24-month OS data: first-line gastric cancer CLDN18.2+ population
            //   - XTANDI EMBARK 2-year update: nmCSPC long-term outcomes post-metastasis prevention
            // ASCO is Astellas's single largest commercial-impact congress: new data drives HCP
            // prescribing decisions and supports formulary positioning discussions with payers.
            // Estimated revenue impact: ASCO presentation → 12-15% acceleration in PADCEV new patient
            // starts in Q2/Q3 FY25 (community oncology adoption inflection).
            revenueImpact: 28500,      // ¥M estimated incremental revenue from PADCEV/VYLOY ASCO-driven adoption lift
            transactionLift: 15.2,    // % new patient start acceleration post-ASCO (PADCEV + VYLOY combined)
            ticketLift: null,
            status: 'complete',
            region: 'Global (Chicago, US)',
        },
        {
            companyId,
            campaignName: 'EAU Congress 2025 — XTANDI/PADCEV Urology Data',
            startDate: new Date('2025-09-12'),
            endDate: new Date('2025-09-15'),
            category: 'oncology_congress',
            // European Association of Urology (EAU) Congress (Milan, September 2025).
            // Primary focus: XTANDI in EU prostate cancer treatment guidelines (EAU Guidelines).
            // Key sessions: XTANDI real-world evidence in nmCRPC and mHSPC; PADCEV EU launch
            // experience in first-line urothelial carcinoma (real-world effectiveness data from
            // early adopter EU centers). EAU Guidelines Committee meeting coincides with congress;
            // XTANDI expected to maintain EAU Category A recommendation across prostate indications.
            // EU commercial impact: EAU guidelines drive national reimbursement committee decisions
            // in Germany (AMNOG), France (HAS/ATU), Spain (AEMPS), and Italy (AIFA).
            revenueImpact: 9800,       // ¥M estimated EU XTANDI/PADCEV revenue uplift from EAU guideline reinforcement
            transactionLift: 6.2,     // % EU prescription growth acceleration post-EAU congress cycle
            ticketLift: null,
            status: 'complete',
            region: 'Europe (Milan, Italy)',
        },
        {
            companyId,
            campaignName: 'ESMO Congress 2025 — XTANDI EU Data & PADCEV EU Launch Support',
            startDate: new Date('2025-09-12'),
            endDate: new Date('2025-09-16'),
            category: 'oncology_congress',
            // ESMO Congress (Barcelona, September 2025): European oncology guidelines and
            // clinical practice standards. Key for EU reimbursement positioning.
            // Astellas presentations: XTANDI EU real-world outcomes in mCSPC and nmCSPC;
            // PADCEV EU launch data (safety and efficacy in EU population vs. US ESNM33 trial).
            // Japan Society of Oncology (JSCO) Annual Meeting also in September 2025 — parallel
            // Japan event; VYLOY Japan real-world launch data presented to Japanese oncologists.
            // ESMO/JSCO combined impact: EU and Japan physician prescribing behavior correlation
            // with congress attendance; estimated ¥6,800M combined revenue lift from ESMO/JSCO data.
            revenueImpact: 6800,       // ¥M combined EU + Japan revenue lift from ESMO + JSCO congress cycle
            transactionLift: 5.8,     // % EU+Japan prescription lift from congress data presentations
            ticketLift: null,
            status: 'complete',
            region: 'Europe (Barcelona, Spain) + Japan (JSCO)',
        },
        {
            companyId,
            campaignName: 'ASH Annual Meeting 2025 — XOSPATA AML Data',
            startDate: new Date('2025-12-06'),
            endDate: new Date('2025-12-09'),
            category: 'oncology_congress',
            // American Society of Hematology (ASH) Annual Meeting (New Orleans, December 2025).
            // Key for XOSPATA (gilteritinib): ADMIRAL trial long-term follow-up data in
            // FLT3-mutated relapsed/refractory AML. XOSPATA faces competition from quizartinib
            // (Vanflyta, Daiichi Sankyo) in FLT3-mutated AML — clinical differentiation data critical.
            // Also: ASP-2138 early AML data (if CLDN18.2 is expressed in AML subsets — exploratory).
            // XOSPATA FY25 revenue ¥71.8B; competition monitoring critical. ASH data reinforces
            // XOSPATA's role as standard of care in FLT3+ R/R AML where gilteritinib has 5-year
            // OS data that competitors lack. China XOSPATA update also expected at ASH.
            revenueImpact: 5200,       // ¥M estimated XOSPATA revenue protection/uplift from ASH data reinforcement
            transactionLift: 3.8,     // % XOSPATA new patient start protection from ASH guideline reinforcement
            ticketLift: null,
            status: 'complete',
            region: 'Global (New Orleans, US)',
        },
        // =====================================================================
        // PRODUCT LAUNCH EVENTS
        // =====================================================================
        {
            companyId,
            campaignName: 'IZERVAY Year 2 Patient Continuation Campaign — Q1 FY25',
            startDate: new Date('2025-04-01'),
            endDate: new Date('2025-06-30'),
            category: 'product_launch',
            // IZERVAY (avacincaptad pegol) entered Year 2 of commercial launch in April 2025.
            // Year 2 is critical for GA treatments: patients who began IZERVAY August 2023 - March 2025
            // face the decision to continue monthly injections based on Year 1 outcomes.
            // Astellas continuation campaign focuses on:
            //   - GATHER1/GATHER2 long-term data showing sustained benefit beyond Year 1
            //   - Physician education on monitoring GA growth reduction as efficacy marker
            //   - Patient education materials emphasizing slow progression as treatment success
            //     (GA is asymptomatic early-stage; patients may underestimate treatment benefit)
            //   - Insurance renewal support: ensuring annual prior authorization renewals approved
            // Year 2 continuation rates above forecast (72% vs. 65% expected) driven by this program.
            revenueImpact: 15800,      // ¥M IZERVAY annualized revenue from Year 2 continuation campaign success
            transactionLift: 10.8,    // % new patient start acceleration from Year 2 reputation/physician confidence boost
            ticketLift: null,
            status: 'complete',
            region: 'United States',
        },
        {
            companyId,
            campaignName: 'VYLOY US Launch Campaign — Q2 FY25 Gastric Cancer Awareness',
            startDate: new Date('2025-07-01'),
            endDate: new Date('2025-09-30'),
            category: 'product_launch',
            // VYLOY (zolbetuximab) US commercial launch intensification Q2 FY25.
            // VYLOY received FDA approval and is in early launch phase following ASCO 2025 data.
            // Key launch elements:
            //   - CLDN18.2 testing awareness: "Test Before You Treat" campaign to GI oncologists
            //     and pathology departments — driving biomarker testing infrastructure
            //   - MSL deployment: 85 Astellas oncology MSLs focus on gastric cancer HCP education
            //   - Patient ambassador program: gastric cancer survivor advocates promoting CLDN18.2
            //     testing conversation with oncologists
            //   - Payer access: formulary submissions to major commercial plans and Medicare Part D
            //     with Tier 2 placement target; HEOR dossier submission to major PBMs
            //   - VYLOY patient support program: financial assistance, infusion scheduling support
            revenueImpact: 8200,       // ¥M VYLOY US revenue contribution in Q2 FY25 launch quarter
            transactionLift: null,
            ticketLift: null,
            status: 'complete',
            region: 'United States',
        },
        // =====================================================================
        // IRA COMMUNICATION EVENTS
        // =====================================================================
        {
            companyId,
            campaignName: 'XTANDI IRA Patient & Payer Communication Program — Q3-Q4 FY25',
            startDate: new Date('2025-10-01'),
            endDate: new Date('2026-01-31'),
            category: 'ira_communication',
            // Critical program: communicating IRA Medicare Part D price negotiation implications
            // to XTANDI patients and payers ahead of effective date (January 2026).
            // Program components:
            //   - Patient communication: letters to ~48,000 US XTANDI Medicare Part D patients
            //     explaining IRA out-of-pocket cap ($2,000/year starting 2025) and post-negotiation
            //     access implications for 2026 plan year
            //   - Copay assistance expansion: non-Part D patients continued on existing copay
            //     assistance program; Part D patients eligible for new supplemental assistance program
            //   - HCP communication: XTANDI prescriber update on Medicare access continuity post-IRA;
            //     reassurance messaging that access will be maintained despite price negotiation
            //   - Payer communication: briefing to Medicare Part D plan formulary committees on
            //     XTANDI negotiated price; ensuring no formulary exclusion or restrictive step-edit
            //   - Government affairs: continuation of payer/policy dialogue to preserve XTANDI access
            //     for the ~62% of US XTANDI patients covered under Medicare Part D
            // Financial context: IRA negotiated price expected -30 to -40% vs. current WAC on
            // Part D volume; non-Part D commercial volume (~38% of US XTANDI scripts) unaffected.
            revenueImpact: -18500,     // ¥M estimated net IRA Part D revenue impact (FY26 annualized, worst-case scenario)
            transactionLift: null,
            ticketLift: null,
            status: 'in-progress',
            region: 'United States',
        },
        // =====================================================================
        // MARKET ACCESS EVENTS
        // =====================================================================
        {
            companyId,
            campaignName: 'China VYLOY Market Access Campaign — Q4 FY25 Hospital Listing',
            startDate: new Date('2025-12-01'),
            endDate: new Date('2026-03-31'),
            category: 'market_access',
            // VYLOY China NMPA approval received Q4 FY25; hospital listing campaign initiated.
            // Campaign structure:
            //   - Phase 1 (Q4 FY25): 85 tier-1 comprehensive cancer centers in Beijing, Shanghai,
            //     Guangzhou, Chengdu — high-volume gastric cancer referral hospitals
            //   - Phase 2 (Q1 FY26): provincial NHSA supplementary list applications in 5 provinces
            //     (Jiangsu, Zhejiang, Guangdong, Shandong, Sichuan)
            //   - CLDN18.2 testing partnerships: activated with Berry Genomics and Burning Rock
            //     for IHC testing across hospital network
            //   - Medical education: gastric cancer tumor board programs at 150 key accounts
            //   - Patient support: China patient assistance program for uninsured/underinsured patients
            //     during NRDL listing negotiation period
            // VYLOY NRDL application to be submitted in 2026 NRDL negotiation cycle; listing
            // expected to dramatically expand patient access beyond tier-1 hospitals.
            revenueImpact: 5800,       // ¥M estimated China VYLOY revenue in first 2 quarters of launch
            transactionLift: null,
            ticketLift: null,
            status: 'in-progress',
            region: 'China',
        },
        {
            companyId,
            campaignName: 'Q1 FY26 PADCEV New Indication Launch (US) — MIBC Neoadjuvant',
            startDate: new Date('2026-04-01'),
            endDate: new Date('2026-06-30'),
            category: 'product_launch',
            // Anticipated PADCEV sNDA approval for muscle-invasive bladder cancer (MIBC)
            // neoadjuvant setting (pre-cystectomy). FDA PDUFA date anticipated Q1 FY26 based on
            // Phase 3 data submission timeline. MIBC neoadjuvant is a new, large treatment setting:
            //   - ~80,000 new MIBC diagnoses annually in US; ~40% eligible for neoadjuvant therapy
            //   - PADCEV + pembrolizumab neoadjuvant: expected pathologic complete response rate >40%
            //     vs. ~15% for cisplatin-based standard of care
            //   - New indication expands PADCEV addressable market by ~32,000 eligible patients/year
            // Launch program: field oncology specialist (FOS) deployment at urology/oncology AMCs;
            // urologist/oncologist education on multidisciplinary tumor board coordination for MIBC;
            // hospital formulary submissions for PADCEV in neoadjuvant setting.
            revenueImpact: 42000,      // ¥M estimated annualized PADCEV MIBC new indication incremental revenue opportunity
            transactionLift: 28.5,    // % PADCEV total new patient start increase from MIBC indication addition
            ticketLift: null,
            status: 'upcoming',
            region: 'United States',
        },
        // =====================================================================
        // DISEASE AWARENESS EVENTS
        // =====================================================================
        {
            companyId,
            campaignName: 'VEOZAH Women\'s Health DTC Campaign — FY25 Ongoing',
            startDate: new Date('2025-04-01'),
            endDate: new Date('2026-03-31'),
            category: 'disease_awareness',
            // VEOZAH (fezolinetant) is the first non-hormonal treatment for moderate-to-severe
            // vasomotor symptoms (VMS/hot flashes) associated with menopause. DTC campaign targets
            // women aged 45-65 experiencing menopause who seek hormone-therapy alternatives.
            // Campaign elements:
            //   - Digital DTC: social media (Instagram, Pinterest, YouTube) targeted to peri/post-
            //     menopausal women; menopause symptom awareness content + VEOZAH brand education
            //   - HCP-directed: OB/GYN and primary care physician detailing on SKYLIGHT trial data
            //     (52-week safety data); prescribing tool kits with patient selection guides
            //   - Patient support: VEOZAH digital symptom tracker app (iOS/Android) tracking hot
            //     flash frequency and severity; adherence support notifications
            //   - PR/advocacy: partnership with Menopause Society and Let's Talk Menopause advocacy
            //     group; earned media on vasomotor symptom treatment destigmatization
            // VEOZAH FY25 revenue ¥46.6B — fastest-growing Astellas product in women's health.
            // Competition: conjugated estrogen/bazedoxifene (Duavee) and hormone therapies remain
            // dominant; VEOZAH differentiates as non-hormonal option for contraindicated patients.
            revenueImpact: 46600,      // ¥M VEOZAH FY25 full-year revenue (campaign-supported)
            transactionLift: 18.5,    // % VEOZAH new patient start rate from DTC awareness attribution
            ticketLift: null,
            status: 'in-progress',
            region: 'United States',
        },
        {
            companyId,
            campaignName: 'Geographic Atrophy Patient Identification Program — FY26',
            startDate: new Date('2026-04-01'),
            endDate: new Date('2026-09-30'),
            category: 'disease_awareness',
            // Geographic atrophy (GA) affects ~5M Americans; only ~160,000 diagnosed and
            // treated annually (massive underdiagnosis). Astellas/IZERVAY GA awareness campaign:
            //   - Community optometry GA screening: retinal photography programs at 8,500 US
            //     optometry practices to identify early GA and refer to retinal specialists
            //   - Patient education: "Eyes of Tomorrow" national campaign; GA progression animation
            //     explaining why early treatment matters before vision loss becomes severe
            //   - Genetics education: complement pathway genetic risk factor testing (CFH, ARMS2)
            //     to identify high-risk patients for proactive monitoring
            //   - Referral pathway optimization: standardized GA referral form from optometry to
            //     retinal specialist; target <4 week time from diagnosis to specialist consultation
            // FY26 target: 800 IZERVAY monthly new patient starts (from current 748 in Q2 FY25).
            // GA detection expansion is the primary driver of long-term IZERVAY market growth —
            // product efficacy is established; market development is the growth constraint.
            revenueImpact: 21500,      // ¥M estimated annualized IZERVAY revenue from expanded GA patient identification
            transactionLift: 9.5,     // % new patient start growth from FY26 patient identification program
            ticketLift: null,
            status: 'planned',
            region: 'United States',
        },
    ];

    const STATUS_MAP: Record<string, string> = {
        'complete': 'completed',
        'in-progress': 'active',
        'upcoming': 'planned',
        'planned': 'planned',
        'active': 'active',
        'completed': 'completed',
    };

    await prisma.promotionalCalendar.createMany({
        data: events.map(e => ({
            ...e,
            startDate: e.startDate instanceof Date ? (e.startDate as Date).toISOString().split('T')[0] : String(e.startDate),
            endDate: e.endDate instanceof Date ? (e.endDate as Date).toISOString().split('T')[0] : String(e.endDate),
            status: STATUS_MAP[e.status] ?? e.status,
        })),
    });
    console.log(`  ✓ ${events.length} PromotionalCalendar (Medical Congress & Launch Calendar) records seeded for Astellas Pharma`);
}
