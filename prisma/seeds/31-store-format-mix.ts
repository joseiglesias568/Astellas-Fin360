import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 31: Product Channel Mix — Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY)
//
// Reinterprets StoreFormatMix as Astellas's product distribution channel mix
// across 6 channel types and 5 quarters (Q1 FY25 through Q1 FY26). 30 total records.
//
// Channel types:
//   1. Specialty Oncology Channel         — ~8,500 oncology specialist offices (US); XTANDI/PADCEV
//   2. Hospital/Academic Center Channel   — ~3,200 hospital accounts; PADCEV infusion, IZERVAY
//   3. US Retail Pharmacy                 — ~45,000 retail pharmacy access points; XTANDI oral, VEOZAH
//   4. Japan Hospital Channel             — ~5,800 Japanese hospitals; NHI reimbursement
//   5. International Direct Channel       — ~12,000 EU hospital accounts; distributor direct
//   6. Digital/Patient Support Channel    — ~420,000 enrolled patients; adherence programs
// =============================================================================

export async function seedStoreFormatMix(
    prisma: PrismaClient,
    companyId: number,
    allPeriods: Record<string, { id: number }>,
) {
    console.log('Seeding Astellas Pharma product channel mix...');

    const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

    // Channel type definitions with per-quarter arrays: [Q1FY25, Q2FY25, Q3FY25, Q4FY25, Q1FY26]
    const formatTypes = [
        {
            format: 'Specialty Oncology Channel',
            segment: 'oncology' as const,
            // Oncology specialist offices, hospital specialty pharmacies, and XTANDI/PADCEV
            // direct distribution in the US. Primary driver: XTANDI (enzalutamide) mCRPC/nmCSPC
            // and PADCEV (enfortumab vedotin) urothelial carcinoma. Access points growing as
            // PADCEV + pembrolizumab first-line UC indication expands prescriber base.
            // storeCount = oncology specialist offices / distribution access points (US)
            storeCount:  [8200, 8320, 8420, 8500, 8580],
            pctOfTotal:  [50.5, 51.2, 51.8, 52.0, 52.4],
            // avgRevenue = ¥M per channel per quarter (blended XTANDI + PADCEV specialty revenue)
            avgRevenue:  [58200, 60100, 61800, 63500, 65200],
            yoyGrowth:   [7.2, 8.1, 8.8, 9.4, 10.1],
            compSales:   [5.8, 6.5, 7.2, 8.0, 8.8],
        },
        {
            format: 'Hospital/Academic Center Channel',
            segment: 'institutional' as const,
            // In-patient hospital pharmacy, PADCEV infusion centers, and IZERVAY retinal surgery
            // centers. PADCEV is an IV infusion requiring hospital or infusion center administration.
            // IZERVAY (avacincaptad pegol) administered by retinal specialists at academic medical
            // centers and ophthalmology surgery centers for geographic atrophy (GA).
            // storeCount = hospital and infusion center accounts (US + select international)
            storeCount:  [3050, 3100, 3140, 3185, 3220],
            pctOfTotal:  [27.5, 27.8, 28.0, 28.2, 28.5],
            // avgRevenue = ¥M per channel per quarter (PADCEV infusion + IZERVAY intravitreal)
            avgRevenue:  [21800, 22500, 23100, 23800, 24400],
            yoyGrowth:   [18.2, 20.5, 22.8, 24.5, 26.1],
            compSales:   [16.0, 18.2, 20.0, 22.0, 23.8],
        },
        {
            format: 'US Retail Pharmacy',
            segment: 'consumer' as const,
            // Walgreens, CVS, specialty retail pharmacy for XTANDI oral capsules (patient
            // self-administration at home) and VEOZAH (fezolinetant) for vasomotor symptoms
            // (VMS) in menopause. XTANDI is a Schedule IV oral oncology agent dispensed through
            // specialty-accredited retail pharmacies with REMS program requirements.
            // storeCount = accredited retail pharmacy access points (US national coverage)
            storeCount:  [43500, 44100, 44600, 45000, 45400],
            pctOfTotal:  [11.8, 11.9, 12.0, 12.1, 12.2],
            // avgRevenue = ¥M per channel per quarter (XTANDI oral + VEOZAH retail)
            avgRevenue:  [8850, 9200, 9580, 9920, 10250],
            yoyGrowth:   [3.5, 4.2, 4.8, 5.5, 6.2],
            compSales:   [2.8, 3.5, 4.0, 4.8, 5.5],
        },
        {
            format: 'Japan Hospital Channel',
            segment: 'japan' as const,
            // Japan National Health Insurance (NHI) reimbursement channel; hospital dispensing
            // through NHI-listed formulary. Astellas Japan revenue ~¥300B (14% of group).
            // Key products: XTANDI (approved mCRPC/nmCSPC), PADCEV (approved urothelial),
            // VYLOY (zolbetuximab, approved gastric/GEJ cancer Q1 FY25 Japan).
            // Biannual NHI price revisions (April/October) create step-down revenue headwinds.
            // storeCount = NHI-listed hospital dispensing accounts (acute + cancer specialist)
            storeCount:  [5720, 5750, 5775, 5800, 5820],
            pctOfTotal:  [8.2, 8.1, 8.0, 8.0, 7.9],
            // avgRevenue = ¥M per channel per quarter (Japan NHI blended portfolio)
            avgRevenue:  [18500, 18200, 17900, 17600, 17300],
            yoyGrowth:   [-2.8, -2.5, -2.2, -2.0, -1.8],
            compSales:   [-3.5, -3.2, -2.8, -2.5, -2.2],
        },
        {
            format: 'International Direct Channel',
            segment: 'international' as const,
            // EU/International distributor and hospital-direct sales channels.
            // Established Markets (EU): XTANDI reimbursed across all major EU5 markets;
            // PADCEV launched in EU following EMA approval. International Markets: emerging
            // market access via country-specific distributors and hospital listing programs.
            // storeCount = EU hospital accounts and international distributor reach points
            storeCount:  [11500, 11700, 11850, 12000, 12200],
            pctOfTotal:  [17.5, 17.8, 18.0, 18.2, 18.5],
            // avgRevenue = ¥M per channel per quarter (Established Markets + International)
            avgRevenue:  [16200, 16800, 17400, 18000, 18600],
            yoyGrowth:   [5.8, 6.5, 7.2, 8.0, 8.8],
            compSales:   [4.5, 5.2, 5.8, 6.5, 7.2],
        },
        {
            format: 'Digital/Patient Support Channel',
            segment: 'digital' as const,
            // Patient adherence programs, remote monitoring, and connected health initiatives.
            // XTANDI adherence program: nurse navigator support for mCRPC patients.
            // PADCEV patient support: infusion scheduling, financial assistance, clinical monitoring.
            // VEOZAH patient engagement: digital symptom tracker for VMS management.
            // storeCount = enrolled patients in Astellas patient support programs (all products)
            storeCount:  [385000, 396000, 406000, 416000, 426000],
            pctOfTotal:  [4.5, 4.6, 4.7, 4.8, 4.9],
            // avgRevenue = ¥M per channel per quarter (patient services and digital engagement)
            avgRevenue:  [1850, 1920, 1990, 2060, 2130],
            yoyGrowth:   [22.5, 25.0, 27.5, 30.0, 32.5],
            compSales:   [20.0, 22.5, 25.0, 27.5, 30.0],
        },
    ];

    const records = [];
    for (const fmt of formatTypes) {
        for (let qi = 0; qi < quarters.length; qi++) {
            const periodRecord = allPeriods[quarters[qi]];
            if (!periodRecord) continue;
            records.push({
                companyId,
                periodId: periodRecord.id,
                format: fmt.format,
                segment: fmt.segment,
                storeCount: fmt.storeCount[qi],
                pctOfTotal: fmt.pctOfTotal[qi],
                avgRevenue: fmt.avgRevenue[qi],
                yoyGrowth: fmt.yoyGrowth[qi],
                compSales: fmt.compSales[qi],
            });
        }
    }

    await prisma.storeFormatMix.createMany({ data: records });
    console.log(`  ✓ ${records.length} StoreFormatMix records seeded for Astellas Pharma`);
}
