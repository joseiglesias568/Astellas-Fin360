import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 36: HCP & Patient Satisfaction — Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY)
//
// 6 stakeholder segments × 5 quarters (Q1 FY25 through Q1 FY26) = 30 records
//
// Segments:
//   1. Oncology HCP (US) — Physician/Oncologist NPS for XTANDI/PADCEV/VYLOY MSL engagement
//   2. Retinal Specialist HCP — IZERVAY ophthalmologist satisfaction; injection training support
//   3. XTANDI Patient Program — mCRPC/CSPC patient adherence program satisfaction
//   4. PADCEV Patient Support — Urothelial cancer infusion experience & patient navigator NPS
//   5. Payer/Managed Care — Formulary placement, prior authorization efficiency, outcomes data
//   6. Japan Hospital Channel — Japanese oncologist/urologist satisfaction with MR/MSL support
//
// Key satisfaction themes FY25-FY26:
//   - Oncology HCP NPS: MSL clinical data quality, congress follow-up, access to publications
//   - IZERVAY: retinal specialist injection confidence, patient identification support
//   - XTANDI patient: IRA/Part D communication clarity, copay program accessibility
//   - PADCEV: infusion center experience, pre-medication protocol clarity, safety monitoring
//   - Payer: formulary access efficiency, HEOR data quality, step-edit minimization
//   - Japan: NHI price revision impact communication, hospital formulary support
// =============================================================================

export async function seedCustomerSatisfaction(
    prisma: PrismaClient,
    companyId: number,
    allPeriods: Record<string, { id: number }>,
) {
    console.log('Seeding Astellas Pharma HCP and patient satisfaction metrics...');

    const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

    // Per-quarter arrays: [Q1 FY25, Q2 FY25, Q3 FY25, Q4 FY25, Q1 FY26]
    const segments = [
        {
            productLine: 'Oncology HCP (US) — XTANDI/PADCEV/VYLOY Physician NPS',
            // ~3,800 oncologists/urologists surveyed quarterly (US oncology community)
            // Key drivers: MSL engagement quality, scientific publication support, clinical trial
            // access, treatment guidelines alignment, REMS program ease-of-use (XTANDI)
            // ASCO/ESMO congress satisfaction: data presentation quality, symposia accessibility
            // Q4 FY25 slight dip: IRA communication creating uncertainty for prescribers
            // about XTANDI patient access starting January 2026 under Part D negotiations
            npsScore:       [52, 58, 64, 60, 62],
            csatScore:      [76, 80, 83, 80, 82],
            // waitTimeSatisfaction: MSL response time to scientific inquiry (0-100 scale)
            // Q2 FY25 peak from ASCO annual meeting — data-rich season improves engagement scores
            waitTimeSatisfaction: [72, 82, 78, 75, 78],
            // orderAccuracy: REMS program compliance rate; sample/literature request fulfillment (%)
            orderAccuracy:  [98.5, 98.8, 99.0, 98.9, 99.1],
            sampleSize:     [3800, 3800, 3800, 3800, 3800],
        },
        {
            productLine: 'Retinal Specialist HCP — IZERVAY Ophthalmologist Satisfaction',
            // ~2,850 retinal specialists now prescribing or evaluating IZERVAY
            // Key drivers: injection training program quality, patient identification tools,
            // GATHER clinical data accessibility, patient support program effectiveness
            // ASRS (American Society of Retina Specialists) congress satisfaction strongly correlated
            // Competing product: Syfovre (pegcetacoplan) from Apellis; relative satisfaction
            // versus competition tracked to understand prescribing preference dynamics
            // Injection confidence improves over time as physicians gain experience with monthly dosing
            npsScore:       [45, 50, 55, 58, 60],
            csatScore:      [74, 78, 81, 83, 84],
            // waitTimeSatisfaction: patient support program response time; IZERVAY benefits investigation (0-100)
            // Improving as patient services team scaled up from 12 to 32 patient navigators
            waitTimeSatisfaction: [68, 74, 78, 80, 82],
            // orderAccuracy: patient support program enrollment accuracy; sample intravitreal kit delivery (%)
            orderAccuracy:  [97.8, 98.2, 98.5, 98.8, 99.0],
            sampleSize:     [2850, 2850, 2850, 2850, 2850],
        },
        {
            productLine: 'XTANDI Patient Program — mCRPC/CSPC Adherence Program',
            // ~48,000 US patients enrolled in XTANDI patient support program
            // Key drivers: nurse navigator quality, copay assistance clarity, refill reminder effectiveness
            // IRA Part D sensitivity: patient satisfaction tracking for Medicare Part D enrollees
            // regarding out-of-pocket cost changes under IRA $2,000 Part D OOP cap (effective 2025)
            // and post-negotiation implications for 2026. Communication clarity is critical.
            // Patient adherence: PDC (proportion of days covered) target >0.80 for XTANDI
            // XTANDI adherence program: automated refill reminders, 90-day supply incentives
            // Q4 FY25 pressure: IRA negotiated price uncertainty creating patient access anxiety
            npsScore:       [55, 57, 58, 52, 58],
            csatScore:      [78, 80, 81, 76, 80],
            // waitTimeSatisfaction: nurse navigator response time; copay assistance processing speed (0-100)
            waitTimeSatisfaction: [72, 75, 76, 68, 74],
            // orderAccuracy: refill completion rate; copay assistance approvals processed correctly (%)
            orderAccuracy:  [96.8, 97.2, 97.5, 96.2, 97.8],
            sampleSize:     [5200, 5200, 5200, 5200, 5200],
        },
        {
            productLine: 'PADCEV Patient Support — Urothelial Cancer Infusion Program',
            // ~12,500 patients enrolled in PADCEV patient support program (US)
            // Key drivers: infusion center scheduling support, pre-medication protocol navigation,
            // financial assistance for IV infusion co-pays, safety monitoring education
            // PADCEV administration: IV infusion every 3 weeks (Cycle 1/2/3) in infusion center setting
            // Infusion experience satisfaction tracks patient navigator responsiveness, financial
            // assistance approval speed, and treatment discontinuation communication
            // Growing patient population: PADCEV first-line UC label expansion → more patients
            // Pfizer co-promotion: patient services jointly managed by Astellas and Pfizer teams
            npsScore:       [62, 65, 68, 70, 72],
            csatScore:      [82, 84, 86, 88, 89],
            // waitTimeSatisfaction: infusion scheduling support; prior auth turnaround time satisfaction (0-100)
            waitTimeSatisfaction: [76, 80, 83, 85, 87],
            // orderAccuracy: financial assistance approval accuracy; drug supply coordination error-free rate (%)
            orderAccuracy:  [97.5, 98.0, 98.5, 98.8, 99.0],
            // Sample size growing with patient population ramp (PADCEV approvals expanding)
            sampleSize:     [4800, 6200, 8500, 10500, 12500],
        },
        {
            productLine: 'Payer / Managed Care — Formulary Access & HEOR Satisfaction',
            // ~580 major US payer accounts (commercial health plans, PBMs, Medicare Part D plans)
            // Key drivers: formulary placement efficiency (no step edit for XTANDI/PADCEV),
            // health economics outcomes research (HEOR) data quality for formulary committee submissions,
            // prior authorization streamlining, patient access program support for appeals
            // IRA context: Medicare Part D plans negotiating XTANDI price for 2026; payer relationship
            // management critical to ensure access maintained post-IRA negotiation
            // Astellas value-based contracts: outcomes-based agreements piloted with 3 major payers
            // for XTANDI — linking price to real-world PSA response rates
            npsScore:       [32, 35, 38, 38, 40],
            csatScore:      [70, 72, 75, 76, 78],
            // waitTimeSatisfaction: prior authorization turnaround time satisfaction (target <24hr for PADCEV urgent PA)
            // Q1 FY25 lower: new year PA system changes creating processing delays; improving Q2+
            waitTimeSatisfaction: [62, 68, 72, 74, 76],
            // orderAccuracy: PA submission accuracy rate; formulary dossier completeness rate (%)
            orderAccuracy:  [96.5, 97.0, 97.8, 98.2, 98.5],
            sampleSize:     [580, 580, 580, 580, 580],
        },
        {
            productLine: 'Japan Hospital Channel — Japanese HCP Satisfaction (MR/MSL)',
            // ~4,200 Japanese oncologists and urologists regularly engaging with Astellas Japan MRs/MSLs
            // Key satisfaction drivers: NHI price revision communication (April/October),
            // new product medical information support (VYLOY Japan launch Q1 FY25),
            // clinical data support for XTANDI/PADCEV PMDA approval processes
            // Japan MR (Medical Representative) culture: personal relationships with hospital
            // physicians; access restrictions at academic medical centers (AMC) challenging
            // Japan MR-to-doctor access declining industry-wide post-COVID; MSL model expanding
            // NHI biannual price revision (April 2025: -5.2%) communication managed proactively
            // to maintain physician confidence in Astellas product access and pricing stability
            npsScore:       [42, 44, 46, 48, 50],
            csatScore:      [75, 76, 78, 79, 80],
            // waitTimeSatisfaction: medical information request fulfillment time; NHI revision notification speed (0-100)
            // Q2 FY25 improvement: VYLOY Japan launch provides new clinical engagement material
            waitTimeSatisfaction: [70, 74, 76, 77, 78],
            // orderAccuracy: medical information request accuracy rate; hospital formulary application support (%)
            orderAccuracy:  [98.8, 99.0, 99.2, 99.3, 99.5],
            sampleSize:     [4200, 4200, 4200, 4200, 4200],
        },
    ];

    const records = [];
    for (const seg of segments) {
        for (let qi = 0; qi < quarters.length; qi++) {
            const periodRecord = allPeriods[quarters[qi]];
            if (!periodRecord) continue;
            records.push({
                companyId,
                periodId: periodRecord.id,
                region: seg.productLine,
                npsScore: seg.npsScore[qi],
                csatScore: seg.csatScore[qi],
                waitTimeSatisfaction: seg.waitTimeSatisfaction[qi],
                orderAccuracy: seg.orderAccuracy[qi],
                sampleSize: seg.sampleSize[qi],
            });
        }
    }

    await prisma.customerSatisfaction.createMany({ data: records });
    console.log(`  ✓ ${records.length} CustomerSatisfaction records seeded for Astellas Pharma`);
}
