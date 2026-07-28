import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 38: Astellas Pharma Inc. — Capital & Pipeline Programs
//
// Reinterprets StoreRenovation as Astellas capital investment and pipeline programs.
// 4 programs × 3 quarters (Q4 FY24, Q1 FY25, Q2 FY25) = 12 records
//
// Programs:
//   1. Global Manufacturing Capacity Expansion  — ADC/API capacity for PADCEV demand ramp
//   2. R&D Pipeline Phase 3 Initiations         — New Phase 3 study starts (pipeline expansion)
//   3. SMT Operational Restructuring            — Headcount optimization, facility consolidation
//   4. China Hospital Listing Program           — VYLOY/XTANDI hospital formulary additions
//
// Field mapping (model fields unchanged):
//   storesComplete          → programsComplete  (units completed in the quarter)
//   storesInProgress        → programsInProgress (units actively in execution)
//   storesPlanned           → programsPlanned    (approved, not yet started)
//   avgCost                 → ¥M per program unit
//   avgRevenueUplift        → % revenue contribution per completed unit at maturity
//   avgThroughputImprovement → % operational improvement per unit (capacity, speed, efficiency)
// =============================================================================

export async function seedStoreRenovations(prisma: PrismaClient, companyId: number) {
    console.log('Seeding Astellas Pharma capital and pipeline program milestones...');

    const programs = [
        // =====================================================================
        // PROGRAM 1: Global Manufacturing Capacity Expansion
        // ADC manufacturing capacity for PADCEV (enfortumab vedotin) demand ramp;
        // API capacity expansion for XTANDI (enzalutamide) volume growth;
        // Biologic fill-finish capacity for IZERVAY and future biologic pipeline.
        // Segment: 'Manufacturing & Supply Chain'
        // Unit: individual manufacturing capacity upgrade projects
        //   (each unit = 1 ADC batch capacity expansion, API production line, or fill-finish suite)
        // totalTarget: 12 capacity upgrade projects over FY25-FY26 (full PADCEV demand support)
        // avgCost: ¥M per capacity project (equipment, validation, qualification, regulatory filing)
        // avgRevenueUplift: % PADCEV/product revenue uplift enabled by capacity addition
        // avgThroughputImprovement: % manufacturing batch output increase per completed upgrade
        // =====================================================================
        {
            renovationType: 'Global Manufacturing Capacity Expansion',
            segment: 'Manufacturing & Supply Chain',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    storesComplete: 2,       // Q4 FY24: 2 capacity upgrades completed (Pfizer McPherson ADC + Astellas Yaizu API)
                    storesInProgress: 3,     // 3 projects in active construction/installation
                    storesPlanned: 7,        // 7 projects approved for FY25-FY26 execution
                    totalTarget: 12,         // total manufacturing capacity program (FY25-FY26)
                    completionPct: 16.7,
                    avgCost: 4850,           // ¥M per project: cleanroom construction, equipment, validation, regulatory
                    avgRevenueUplift: 8.2,   // % PADCEV revenue enabled per capacity increment (batch output → fill units → revenue)
                    avgThroughputImprovement: 22.5, // % manufacturing batch output increase per completed upgrade
                },
                {
                    quarterLabel: 'Q1 FY25',
                    storesComplete: 4,       // +2 completions in Q1 FY25 (Pfizer McPherson Phase 2 ADC expansion + Catalent fill-finish)
                    storesInProgress: 3,
                    storesPlanned: 5,
                    totalTarget: 12,
                    completionPct: 33.3,
                    avgCost: 4920,           // modest cost inflation from construction and equipment lead times
                    avgRevenueUplift: 9.5,   // improving ROI as PADCEV volumes scale against fixed capacity investment
                    avgThroughputImprovement: 25.8, // cumulative batch throughput improvement from completed projects
                },
                {
                    quarterLabel: 'Q2 FY25',
                    storesComplete: 6,       // +2 completions in Q2 FY25 (Astellas Toyama VYLOY bioreactor + Netherlands ADC linker)
                    storesInProgress: 3,
                    storesPlanned: 3,
                    totalTarget: 12,
                    completionPct: 50.0,
                    avgCost: 5050,
                    avgRevenueUplift: 11.2,  // VYLOY manufacturing online: adds incremental revenue-generating capacity
                    avgThroughputImprovement: 28.5, // combined ADC + VYLOY + XTANDI API throughput improvement
                },
            ],
        },
        // =====================================================================
        // PROGRAM 2: R&D Pipeline Phase 3 Initiations
        // New Phase 3 clinical study starts — the most capital-intensive R&D investment
        // and the clearest signal of Astellas pipeline confidence.
        // Each Phase 3 initiation represents a ¥15-45B total investment commitment
        // over 3-6 years, with potential to add ¥50-200B+ peak revenue at approval.
        // Segment: 'Research & Development'
        // Unit: individual new Phase 3 study initiation (first patient enrolled)
        // totalTarget: 4 new Phase 3 initiations in FY25 (toward 8 total active programs)
        // avgCost: ¥M enrollment cost per Phase 3 study initiation (first 12 months of trial)
        // avgRevenueUplift: % portfolio revenue uplift per Phase 3 program at projected approval
        // avgThroughputImprovement: % improvement in pipeline advancement efficiency (POC→Phase3 time)
        // =====================================================================
        {
            renovationType: 'R&D Pipeline Phase 3 Initiations',
            segment: 'Research & Development',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    storesComplete: 1,       // Q4 FY24: 1 Phase 3 initiated — XOSPATA + azacitidine frontline AML
                    storesInProgress: 2,     // 2 programs in protocol finalization/site initiation (not yet first patient)
                    storesPlanned: 1,        // 1 program approved for Phase 3 in FY25 (ASP-2138 gastric cancer)
                    totalTarget: 4,          // FY25 Phase 3 initiation target (net new, to reach 8 total active programs)
                    completionPct: 25.0,
                    avgCost: 18500,          // ¥M per Phase 3 first-year enrollment costs (site activation + early enrollment)
                    avgRevenueUplift: 4.8,   // % Astellas portfolio revenue uplift per approved indication at peak (probability-weighted)
                    avgThroughputImprovement: 12.5, // % improvement in study startup timeline vs. prior Phase 3 generation
                },
                {
                    quarterLabel: 'Q1 FY25',
                    storesComplete: 2,       // +1 in Q1 FY25: ASP-2138 GASTRIC Phase 3 first patient enrolled
                    storesInProgress: 1,
                    storesPlanned: 1,
                    totalTarget: 4,
                    completionPct: 50.0,
                    avgCost: 19200,          // enrollment costs rising with global trial complexity
                    avgRevenueUplift: 5.5,   // probability-weighted portfolio revenue uplift improving with PADCEV/VYLOY validation
                    avgThroughputImprovement: 15.8, // adaptive design and decentralized trial elements reducing startup time
                },
                {
                    quarterLabel: 'Q2 FY25',
                    storesComplete: 4,       // +2 in Q2 FY25: VEOZAH Phase 3b long-term safety + PADCEV MIBC neoadjuvant
                    storesInProgress: 1,
                    storesPlanned: 0,
                    totalTarget: 4,
                    completionPct: 100.0,    // FY25 Phase 3 initiation target achieved by Q2 FY25
                    avgCost: 20100,
                    avgRevenueUplift: 6.8,   // uplift improving as PADCEV MIBC program represents highest-value new indication
                    avgThroughputImprovement: 18.2, // DCT (decentralized clinical trial) technology reducing patient enrollment time
                },
            ],
        },
        // =====================================================================
        // PROGRAM 3: SMT Operational Restructuring
        // Sustainable Margin Transformation (SMT) execution milestones:
        //   - Japan head office consolidation (completed Q1 FY25)
        //   - US commercial organization restructuring (Q1 FY25)
        //   - EU secondary manufacturing site consolidations (Q4 FY24-Q2 FY25)
        //   - Shared services migration (Manila: finance/HR; Krakow: regulatory ops)
        //   - Non-strategic country market exits (distributor model transition)
        // Segment: 'Corporate & Operations (SMT)'
        // Unit: individual restructuring program/site completion
        // totalTarget: 18 discrete SMT operational milestones over FY25-FY26
        // avgCost: ¥M per restructuring milestone (severance, site closure, migration costs)
        // avgRevenueUplift: null — cost savings not revenue-generating; annualized savings tracked
        // avgThroughputImprovement: % SG&A ratio improvement from completed milestones
        // =====================================================================
        {
            renovationType: 'SMT Operational Restructuring',
            segment: 'Corporate & Operations (SMT)',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    storesComplete: 3,       // Q4 FY24: 3 milestones — EU packaging site A closure, pre-clinical portfolio rationalization, Japan non-core TA exit
                    storesInProgress: 4,     // 4 milestones in active execution
                    storesPlanned: 11,       // 11 milestones planned for FY25-FY26 execution
                    totalTarget: 18,         // total SMT milestone program
                    completionPct: 16.7,
                    avgCost: 1850,           // ¥M per milestone: severance, lease exit, IT migration, change management
                    avgRevenueUplift: null,  // SMT is cost optimization; no direct revenue contribution
                    avgThroughputImprovement: 85.0, // % of planned annualized savings from completed milestones realized in P&L
                },
                {
                    quarterLabel: 'Q1 FY25',
                    storesComplete: 6,       // +3 in Q1 FY25: Japan HQ consolidation, US commercial restructuring, EU packaging site B closure
                    storesInProgress: 4,
                    storesPlanned: 8,
                    totalTarget: 18,
                    completionPct: 33.3,
                    avgCost: 1920,
                    avgRevenueUplift: null,
                    avgThroughputImprovement: 87.5, // savings realization rate improving as milestones reach full P&L run-rate
                },
                {
                    quarterLabel: 'Q2 FY25',
                    storesComplete: 10,      // +4 in Q2 FY25: Manila shared services Phase 1, Krakow regulatory center, 2 country distributor transitions
                    storesInProgress: 3,
                    storesPlanned: 5,
                    totalTarget: 18,
                    completionPct: 55.6,
                    avgCost: 2050,           // Q2 FY25 milestone cost elevated: Manila center setup and Krakow center launch (one-time capex)
                    avgRevenueUplift: null,
                    avgThroughputImprovement: 91.2, // 91% of annualized savings target from 10 completed milestones reflected in run-rate
                },
            ],
        },
        // =====================================================================
        // PROGRAM 4: China Hospital Listing Program
        // Astellas China hospital formulary access expansion across all oncology products.
        // VYLOY launch (Q4 FY25) accelerates hospital listing activity: new product provides
        // market access team reason to re-engage hospitals previously listed only for XTANDI.
        // China hospital listing is a multi-step process: NMPA approval → provincial drug catalog
        // inclusion → hospital formulary committee approval → pharmacy procurement setup.
        // Segment: 'China Commercial'
        // Unit: individual new hospital accounts added (first XTANDI/VYLOY/XOSPATA dispensing)
        // totalTarget: 200 new hospital accounts in FY25 (revised target: 250/year for FY26)
        // avgCost: ¥M per hospital account (market access team, formulary dossier, training)
        // avgRevenueUplift: % annualized incremental revenue per new hospital account at maturity
        // avgThroughputImprovement: % improvement in hospital listing timeline efficiency
        // =====================================================================
        {
            renovationType: 'China Hospital Listing Program',
            segment: 'China Commercial',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    storesComplete: 42,      // Q4 FY24: 42 new hospital accounts added (Q4 traditionally higher from year-end budget cycles)
                    storesInProgress: 65,    // 65 accounts in listing process (formulary committee applications submitted)
                    storesPlanned: 93,       // 93 accounts in pipeline (provincial catalog applications under review)
                    totalTarget: 200,        // FY25 annual new hospital account target
                    completionPct: 21.0,     // Q4 FY24 completions as % of FY25 200-account target
                    avgCost: 42,             // ¥M per new hospital account: market access staff, formulary dossier, medical education
                    avgRevenueUplift: 3.8,   // % incremental China segment revenue per 10 new hospital accounts at 12-month maturity
                    avgThroughputImprovement: 18.5, // % improvement in listing timeline vs. prior year cycle (streamlined dossier templates)
                },
                {
                    quarterLabel: 'Q1 FY25',
                    storesComplete: 55,      // +55 new accounts in Q1 FY25 — above 50/quarter run rate needed for 200/year target
                    storesInProgress: 72,
                    storesPlanned: 73,
                    totalTarget: 200,
                    completionPct: 27.5,
                    avgCost: 44,             // slight cost increase: VYLOY co-listing dossier preparation adds incremental cost per visit
                    avgRevenueUplift: 4.2,   // improving as VYLOY co-listing increases revenue per newly listed account
                    avgThroughputImprovement: 21.8, // VYLOY co-listing efficiency: combined formulary submission reduces duplicated effort
                },
                {
                    quarterLabel: 'Q2 FY25',
                    storesComplete: 62,      // +62 accounts in Q2 FY25 — best quarter (provincial catalog inclusion wave in May/June)
                    storesInProgress: 78,
                    storesPlanned: 48,
                    totalTarget: 200,
                    completionPct: 31.0,     // Q2 FY25 completions; cumulative 159/200 on pace to exceed target
                    avgCost: 45,
                    avgRevenueUplift: 5.0,   // VYLOY gastric cancer launch at newly listed hospitals driving higher per-account revenue
                    avgThroughputImprovement: 24.2, // system-level efficiency: tier-2 hospital listing now standardized from tier-1 learnings
                },
            ],
        },
    ];

    const records = [];
    for (const program of programs) {
        for (const qtr of program.quarters) {
            records.push({
                companyId,
                renovationType: program.renovationType,
                segment: program.segment,
                quarterLabel: qtr.quarterLabel,
                storesComplete: qtr.storesComplete,
                storesInProgress: qtr.storesInProgress,
                storesPlanned: qtr.storesPlanned,
                totalTarget: qtr.totalTarget,
                completionPct: qtr.completionPct,
                avgCost: qtr.avgCost,
                avgRevenueUplift: qtr.avgRevenueUplift,
                avgThroughputImprovement: qtr.avgThroughputImprovement,
            });
        }
    }

    await prisma.storeRenovation.createMany({ data: records });
    console.log(`  ✓ ${records.length} StoreRenovation (Capital & Pipeline Programs) records seeded for Astellas Pharma`);
}
