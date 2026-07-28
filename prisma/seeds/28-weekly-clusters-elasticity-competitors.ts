import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 28: Weekly Snapshots, Product/Geography Clusters, Elasticity Factors,
//          Competitor Quarterly Metrics — Astellas Pharma Inc. (ALPMY)
// =============================================================================

export async function seedAnalyticalData(
    prisma: PrismaClient,
    companyId: number,
    allPeriods: Record<string, { id: number }>,
) {
    console.log('Seeding analytical data (weekly snapshots, product/geography clusters, elasticity, competitors) for Astellas Pharma...');

    // =========================================================================
    // TABLE 1: WeeklySnapshot — 50 records (10 weeks × 5 metrics)
    // Q4 FY25 (Jan 5 – Mar 9, 2026) — Astellas fiscal year runs Apr 1 – Mar 31
    // =========================================================================

    const weekDefs = [
        { weekNumber: 1,  weekLabel: 'Week of Jan 5, 2026',  weekStartDate: '2026-01-05' },
        { weekNumber: 2,  weekLabel: 'Week of Jan 12, 2026', weekStartDate: '2026-01-12' },
        { weekNumber: 3,  weekLabel: 'Week of Jan 19, 2026', weekStartDate: '2026-01-19' },
        { weekNumber: 4,  weekLabel: 'Week of Jan 26, 2026', weekStartDate: '2026-01-26' },
        { weekNumber: 5,  weekLabel: 'Week of Feb 2, 2026',  weekStartDate: '2026-02-02' },
        { weekNumber: 6,  weekLabel: 'Week of Feb 9, 2026',  weekStartDate: '2026-02-09' },
        { weekNumber: 7,  weekLabel: 'Week of Feb 16, 2026', weekStartDate: '2026-02-16' },
        { weekNumber: 8,  weekLabel: 'Week of Feb 23, 2026', weekStartDate: '2026-02-23' },
        { weekNumber: 9,  weekLabel: 'Week of Mar 2, 2026',  weekStartDate: '2026-03-02' },
        { weekNumber: 10, weekLabel: 'Week of Mar 9, 2026',  weekStartDate: '2026-03-09' },
    ];

    // 5 metrics × 10 weeks — weekly prescription and commercial activity in Q4 FY25
    const metricSeries: Array<{
        metricName: string;
        values: number[];
        yoyValues: number[];
        statuses: ('good' | 'warning' | 'alert')[];
    }> = [
        {
            // XTANDI US weekly total prescriptions (TRx, thousands)
            // ~38-40K TRx/week; post-IRA MFP effective Jan 2026 — volume growth becomes key lever
            metricName: 'XTANDI US Weekly TRx (thousands)',
            values:    [38.2, 38.5, 38.9, 39.2, 39.5, 39.7, 39.4, 39.2, 38.9, 38.7],
            yoyValues: [36.1, 36.3, 36.6, 36.8, 37.1, 37.3, 37.0, 36.8, 36.6, 36.4],
            statuses:  ['good','good','good','good','good','good','good','good','good','good'],
        },
        {
            // PADCEV US weekly total prescriptions (TRx, thousands)
            // Strong 1L bladder cancer ramp from EV-302/KEYNOTE-A39 standard-of-care adoption
            metricName: 'PADCEV US Weekly TRx (thousands)',
            values:    [9.2, 9.6, 10.0, 10.4, 10.8, 11.1, 11.4, 11.7, 12.0, 12.3],
            yoyValues: [5.8, 6.1, 6.4, 6.7, 7.0, 7.2, 7.4, 7.6, 7.8, 8.0],
            statuses:  ['good','good','good','good','good','good','good','good','good','good'],
        },
        {
            // VEOZAH US weekly TRx (thousands) — OB/GYN launch ramp; VMS indication
            // Above-plan launch trajectory; patient refill >65% supporting repeat TRx
            metricName: 'VEOZAH US Weekly TRx (thousands)',
            values:    [3.8, 4.1, 4.4, 4.8, 5.1, 5.4, 5.7, 5.9, 6.2, 6.4],
            yoyValues: [1.1, 1.4, 1.7, 2.0, 2.2, 2.5, 2.7, 2.9, 3.1, 3.3],
            statuses:  ['good','good','good','good','good','good','good','good','good','good'],
        },
        {
            // HCP Oncology Field Calls per week (thousands) — US commercial field force
            // January ramp post-holiday; moderates through late Q4; above-plan intensity
            metricName: 'HCP Oncology Field Calls (thousands/week)',
            values:    [124, 138, 146, 150, 154, 157, 152, 149, 146, 144],
            yoyValues: [118, 131, 138, 143, 146, 149, 144, 141, 138, 136],
            statuses:  ['good','good','good','good','good','good','good','good','good','good'],
        },
        {
            // XTANDI US prostate cancer overall market share (%) — IQVIA weekly data
            // Monitoring ERLEADA (apalutamide) nmCSPC pressure; slight sequential erosion Q4
            metricName: 'XTANDI US Prostate Cancer Market Share (%)',
            values:    [41.4, 41.5, 41.6, 41.5, 41.4, 41.3, 41.1, 40.9, 40.8, 40.7],
            yoyValues: [40.2, 40.3, 40.4, 40.3, 40.2, 40.1, 39.9, 39.7, 39.6, 39.5],
            statuses:  ['good','good','good','good','good','good','warning','warning','warning','warning'],
        },
    ];

    const weeklySnapshotData = [];
    for (const metric of metricSeries) {
        for (let i = 0; i < weekDefs.length; i++) {
            const week = weekDefs[i];
            const statusMap: Record<string, string> = { good: 'on_track', warning: 'watch', alert: 'at_risk' };
            weeklySnapshotData.push({
                companyId,
                weekNumber: week.weekNumber,
                weekLabel: week.weekLabel,
                weekStartDate: week.weekStartDate,
                metricName: metric.metricName,
                value: metric.values[i],
                yoyValue: metric.yoyValues[i],
                status: statusMap[metric.statuses[i]] ?? 'on_track',
            });
        }
    }

    await prisma.weeklySnapshot.createMany({ data: weeklySnapshotData });
    console.log(`  ✓ ${weeklySnapshotData.length} WeeklySnapshot records`);

    // =========================================================================
    // TABLE 2: StoreCluster — 40 records (8 product/geography segments × 5 quarters)
    // Q1 FY25 through Q1 FY26 — reinterpreted as ProductSegment data
    // storeCount = active patient population or HCP prescribers
    // revenue = quarterly segment revenue (¥B); avgRevenue = revenue per 1K patients (¥B proxy)
    // =========================================================================

    const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

    // Per-quarter arrays: [Q1 FY25, Q2 FY25, Q3 FY25, Q4 FY25, Q1 FY26]
    const productSegments = [
        {
            clusterName: 'US — XTANDI Franchise',
            clusterType: 'consumer' as const,
            // ~178-186K active XTANDI US patients; IRA MFP effective Jan 2026 starts compressing per-unit price in Q4 FY25
            storeCount:       [178000, 181000, 183000, 185000, 181000],
            revenue:          [228, 232, 237, 242, 224],
            revenueShare:     [42.4, 43.2, 44.9, 45.1, 40.4],
            avgRevenue:       [1281, 1282, 1295, 1308, 1238],
            yoyGrowth:        [9.2, 8.1, 6.4, 5.1, -1.8],
            compSales:        [8.2, 7.1, 5.4, 4.1, -1.8],
            satisfactionScore:[84, 84, 85, 85, 83],
            churnRate:        [3.2, 3.1, 3.0, 3.1, 3.5],
            digitalAdoption:  [68, 71, 74, 76, 79],
        },
        {
            clusterName: 'US — PADCEV Franchise',
            clusterType: 'consumer' as const,
            // Rapid patient ramp from 1L bladder cancer standard-of-care adoption (EV-302 data)
            storeCount:       [35000, 42000, 51000, 59000, 67000],
            revenue:          [42, 52, 61, 68, 76],
            revenueShare:     [7.8, 9.7, 11.6, 12.7, 13.7],
            avgRevenue:       [1200, 1238, 1196, 1153, 1134],
            yoyGrowth:        [52.4, 49.1, 43.8, 39.2, 81.0],
            compSales:        [50.4, 47.1, 41.8, 37.2, 79.0],
            satisfactionScore:[86, 87, 87, 88, 89],
            churnRate:        [5.8, 5.5, 5.2, 4.9, 4.6],
            digitalAdoption:  [72, 75, 78, 80, 83],
        },
        {
            clusterName: 'US — Emerging Products (VEOZAH / IZERVAY / VYLOY)',
            clusterType: 'consumer' as const,
            // Launch-phase portfolio; prescriber adoption and patient identification building rapidly
            storeCount:       [18000, 26000, 35000, 44000, 54000],
            revenue:          [14, 22, 32, 43, 55],
            revenueShare:     [2.6, 4.1, 6.1, 8.0, 9.9],
            avgRevenue:       [778, 846, 914, 977, 1019],
            yoyGrowth:        [180.0, 220.0, 260.0, 290.0, 292.9],
            compSales:        [178.0, 218.0, 258.0, 288.0, 290.9],
            satisfactionScore:[81, 82, 83, 84, 85],
            churnRate:        [18.4, 16.2, 14.8, 13.5, 12.4],
            digitalAdoption:  [55, 60, 65, 70, 74],
        },
        {
            clusterName: 'Japan Segment',
            clusterType: 'consumer' as const,
            // Japan FY25 ~¥380B; April 2026 NHI biennial revision (~-6.5%) is the structural headwind
            storeCount:       [82000, 84000, 85000, 86000, 82000],
            revenue:          [96, 95, 97, 92, 86],
            revenueShare:     [17.9, 17.7, 18.4, 17.1, 15.5],
            avgRevenue:       [1171, 1131, 1141, 1070, 1049],
            yoyGrowth:        [3.2, 2.8, 1.4, -1.1, -10.4],
            compSales:        [2.2, 1.8, 0.4, -2.1, -10.4],
            satisfactionScore:[79, 79, 80, 79, 78],
            churnRate:        [4.8, 4.7, 4.6, 4.8, 5.1],
            digitalAdoption:  [44, 47, 50, 52, 55],
        },
        {
            clusterName: 'Established Markets (EU / AUS / CAN)',
            clusterType: 'business' as const,
            // ~¥280B FY25; PADCEV EU reimbursement rollout and XTANDI earlier disease-state label expansions driving growth
            storeCount:       [68000, 70000, 72000, 74000, 76000],
            revenue:          [67, 68, 74, 71, 72],
            revenueShare:     [12.5, 12.7, 14.0, 13.2, 13.0],
            avgRevenue:       [985, 971, 1028, 959, 947],
            yoyGrowth:        [6.4, 7.2, 9.1, 6.0, 7.5],
            compSales:        [5.4, 6.2, 8.1, 5.0, 6.5],
            satisfactionScore:[76, 77, 77, 78, 78],
            churnRate:        [4.2, 4.1, 4.0, 4.1, 4.0],
            digitalAdoption:  [62, 65, 67, 69, 72],
        },
        {
            clusterName: 'International Markets (EM ex-China)',
            clusterType: 'business' as const,
            // Emerging markets with XTANDI access programs and early PADCEV launches
            storeCount:       [28000, 30000, 32000, 34000, 36000],
            revenue:          [32, 35, 37, 36, 38],
            revenueShare:     [6.0, 6.5, 7.0, 6.7, 6.8],
            avgRevenue:       [1143, 1167, 1156, 1059, 1056],
            yoyGrowth:        [12.4, 14.8, 15.6, 12.5, 18.8],
            compSales:        [11.4, 13.8, 14.6, 11.5, 17.8],
            satisfactionScore:[72, 73, 73, 74, 74],
            churnRate:        [7.8, 7.5, 7.2, 7.0, 6.8],
            digitalAdoption:  [38, 42, 45, 48, 52],
        },
        {
            clusterName: 'China Segment',
            clusterType: 'business' as const,
            // NRDL listings driving volume access; XTANDI and PADCEV main products; Q4 FY25 NRDL timing impact
            storeCount:       [22000, 25000, 28000, 31000, 34000],
            revenue:          [18, 21, 24, 17, 22],
            revenueShare:     [3.4, 3.9, 4.6, 3.2, 4.0],
            avgRevenue:       [818, 840, 857, 548, 647],
            yoyGrowth:        [18.2, 22.4, 28.6, -5.6, 22.2],
            compSales:        [17.2, 21.4, 27.6, -6.6, 21.2],
            satisfactionScore:[71, 72, 73, 71, 73],
            churnRate:        [9.2, 8.8, 8.5, 9.5, 8.8],
            digitalAdoption:  [82, 85, 87, 88, 90],
        },
        {
            clusterName: 'Strategic Brands Portfolio',
            clusterType: 'business' as const,
            // Established oncology/transplant/urology products; ~¥480B FY25; stable declining base
            storeCount:       [145000, 146000, 148000, 149000, 150000],
            revenue:          [121, 113, 115, 131, 118],
            revenueShare:     [22.5, 21.1, 21.8, 24.4, 21.3],
            avgRevenue:       [834, 774, 777, 879, 787],
            yoyGrowth:        [2.1, 1.8, 0.9, 3.5, -2.5],
            compSales:        [1.1, 0.8, -0.1, 2.5, -2.5],
            satisfactionScore:[77, 77, 78, 78, 78],
            churnRate:        [6.2, 6.1, 6.0, 6.1, 6.2],
            digitalAdoption:  [58, 61, 63, 65, 68],
        },
    ];

    const clusterData = [];
    for (const seg of productSegments) {
        for (let qi = 0; qi < quarters.length; qi++) {
            const periodRecord = allPeriods[quarters[qi]];
            if (!periodRecord) continue;
            clusterData.push({
                companyId,
                periodId: periodRecord.id,
                clusterName: seg.clusterName,
                storeCount: seg.storeCount[qi],
                pctOfPortfolio: seg.revenueShare[qi],
                avgRevenue: seg.avgRevenue[qi],
                avgTicket: 0,
                avgDailyTxns: 0,
                compSales: seg.compSales[qi],
                operatingMargin: 0,
                rewardsPct: 0,
                mobileOrderPct: 0,
                laborCostPct: 0,
            });
        }
    }

    await prisma.storeCluster.createMany({ data: clusterData });
    console.log(`  ✓ ${clusterData.length} StoreCluster (ProductSegment) records`);

    // =========================================================================
    // TABLE 3: ElasticityFactor — 25 records
    // Key pharmaceutical, commercial, and financial elasticity relationships for Astellas
    // =========================================================================

    const elasticityData = [
        {
            companyId,
            metricA: 'XTANDI IRA MFP Discount vs. WAC (%)',
            metricB: 'XTANDI US Annual Revenue Impact (¥B)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: -9.6,
            elasticityUnit: '¥B revenue impact per 1 percentage point MFP discount',
            confidence: 0.95,
            explanation: 'Each 1pp increase in the IRA Maximum Fair Price discount vs. XTANDI WAC = approximately -¥9.6B annual US XTANDI revenue impact (based on ~¥960B FY25 global revenue, ~60% US, ~35% Medicare share, ¥9.6B per pp sensitivity). At a 15% MFP discount, annual headwind reaches ~¥144B. IRA MFP effective January 2026 is the single largest external pricing constraint on Astellas earnings — each additional 1pp discount negotiated by CMS equates directly to ¥9.6B lost annual Core OP.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'USD/JPY Rate Change (¥ per $1 move)',
            metricB: 'Core Operating Income Impact (¥B annual)',
            segment: 'Astellas Consolidated',
            elasticity: 2.1,
            elasticityUnit: '¥B Core OP per ¥1 USD/JPY appreciation',
            confidence: 0.98,
            explanation: 'Each ¥1 USD/JPY rate move = ¥2.1B annual Core OP impact (Astellas disclosed sensitivity, FY25 Annual Securities Report). ~60% of Astellas revenue is USD and EUR-denominated. At ¥151/USD baseline, a BoJ-driven appreciation to ¥140 creates a ¥23.1B Core OP headwind on unhedged exposure. Astellas hedges approximately 50% of annual FX exposure through rolling forward contracts at 12-18 month duration.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'XTANDI US Market Share Change (%)',
            metricB: 'XTANDI US Quarterly Revenue (¥B)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: 5.8,
            elasticityUnit: '¥B quarterly US XTANDI revenue per 1% market share gain',
            confidence: 0.92,
            explanation: '+1% XTANDI US prostate cancer market share = approximately +¥5.8B quarterly US revenue (at ~¥230B quarterly US XTANDI base and ~41% current share). Post-IRA, volume growth becomes the primary earnings lever in the US since per-unit price is constrained by MFP. Competitive defense against ERLEADA (apalutamide) in nmCSPC is the critical share battleground — each 1% share point protected is equivalent to ¥23B annual US revenue.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'PADCEV Biologics Manufacturing Capacity Utilization (%)',
            metricB: 'PADCEV Annual Revenue Opportunity (¥B)',
            segment: 'Astellas — US PADCEV Franchise',
            elasticity: 2.8,
            elasticityUnit: '¥B incremental annual revenue per 1% manufacturing capacity increase',
            confidence: 0.88,
            explanation: '+1% PADCEV biologics manufacturing capacity = ~¥2.8B incremental annual revenue (at ~72% current utilization vs. 100% commercial demand, implying ~28% unfilled demand on ¥221B FY25 base). Manufacturing scale-up is the primary PADCEV revenue constraint — patient and physician demand already exists from EV-302 1L bladder cancer standard-of-care adoption. Closing the 28pp gap could add ¥62B annual revenue.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'VEOZAH Active Prescriber Adoption Rate (%)',
            metricB: 'VEOZAH Annual US Revenue (¥B)',
            segment: 'Astellas — US Emerging Products',
            elasticity: 4.6,
            elasticityUnit: '¥B annual US revenue per 1% prescriber adoption increase',
            confidence: 0.85,
            explanation: '+1% VEOZAH active OB/GYN prescriber adoption = approximately +¥4.6B annual US revenue (at ~25,000 addressable US prescribers; 1% = 250 prescribers × ~¥18.4M average annual prescribing = ¥4.6B). Current adoption ~19%; reaching 40% could add ~¥95B+ annual revenue. Each new active prescriber represents significant long-term value given high patient persistence rates (>65% 6-month refill rate).',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Japan NHI Biennial Price Revision Rate (%)',
            metricB: 'Japan Segment Annual Revenue Impact (¥B)',
            segment: 'Astellas — Japan Segment',
            elasticity: 3.8,
            elasticityUnit: '¥B revenue impact per 1% NHI price revision on Japan portfolio',
            confidence: 0.94,
            explanation: '1% Japan NHI biennial price revision = approximately -¥3.8B annual Japan segment revenue (on ~¥380B Japan FY25 revenue base). April 2026 revision estimated at -6.5%, implying ~¥25-27B total headwind. Japan NHI biennial revision is a structural, manageable headwind — volume growth in XTANDI, PADCEV, and VYLOY launch are designed to absorb 40-50% of the pricing impact through patient expansion.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'SMT Savings Delivery vs. Target (¥B above/below ¥40B)',
            metricB: 'Core EPS Sensitivity (¥ per share)',
            segment: 'Astellas Consolidated',
            elasticity: 0.6,
            elasticityUnit: '¥ Core EPS per ¥1B additional SMT savings delivered',
            confidence: 0.90,
            explanation: 'Each ¥1B of SMT savings delivered above/below the ¥40B FY26 target = approximately ¥0.6 Core EPS impact (net of ~30% effective tax rate, on ~4.22B diluted shares). ¥40B SMT delivery = ~¥24B after-tax net income contribution = ~¥5.7/share Core EPS from SMT alone. H2 FY26 acceleration from ¥21B run-rate to ¥40B target requires ~¥19B incremental savings across commercial model transformation, procurement, and shared services workstreams.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'ERLEADA (apalutamide) US nmCSPC Market Share Gain (%)',
            metricB: 'XTANDI US nmCSPC Revenue at Risk (¥B annual)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: -3.2,
            elasticityUnit: '¥B XTANDI US nmCSPC revenue at risk per 1% ERLEADA share gain',
            confidence: 0.84,
            explanation: '+1% ERLEADA US nmCSPC market share gain = approximately -¥3.2B XTANDI US annual revenue at risk (nmCSPC is ~20% of XTANDI US patients; at ~¥576B US XTANDI annually, 20% × ¥576B = ¥115B nmCSPC; 1% share directly = ¥1.15B, plus deferred new patient starts over 2 years = ~¥3.2B total). ERLEADA once-daily dosing and aggressive promotion in nmCSPC represents the primary competitive threat to the franchise.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'R&D Phase 3 Pipeline Advancement Success Rate (%)',
            metricB: 'Expected NPV of Pipeline Portfolio (¥B)',
            segment: 'Astellas Consolidated',
            elasticity: 85.0,
            elasticityUnit: '¥B pipeline NPV per 1% improvement in Phase 3 success rate',
            confidence: 0.78,
            explanation: '+1% improvement in Phase 3 success rate (from ~68% baseline) = approximately +¥85B expected NPV across 20+ Phase 2/3 pipeline assets. Weighted by probability, each successful Phase 3 across the oncology portfolio (PADCEV combinations, XTANDI label expansions, gene therapy) creates ¥50-200B peak sales potential. Phase 3 success rate is the primary R&D productivity lever directly impacting the value of ¥312.4B FY25 R&D investment.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'PADCEV EU HTA Reimbursement Coverage (%)',
            metricB: 'PADCEV Annual European Revenue (¥B)',
            segment: 'Astellas — Established Markets',
            elasticity: 0.62,
            elasticityUnit: '¥B annual European PADCEV revenue per 1% HTA coverage increase',
            confidence: 0.82,
            explanation: '+1% EU Health Technology Assessment reimbursement coverage = approximately +¥0.62B annual European PADCEV revenue (at full 100% EU-5 coverage potential of ~¥62B annual European PADCEV revenue). Rolling from ~25% to ~75% EU HTA coverage over FY26-FY27 adds ~¥31B incremental annual PADCEV European revenue — representing the largest single international growth catalyst beyond Japan NHI headwind mitigation.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'CLDN18.2 Biomarker Testing Adoption Rate in Japan Gastric Cancer (%)',
            metricB: 'VYLOY Japan Annual Revenue Potential (¥B)',
            segment: 'Astellas — Japan Segment',
            elasticity: 0.35,
            elasticityUnit: '¥B annual VYLOY Japan revenue per 1% biomarker testing adoption',
            confidence: 0.80,
            explanation: '+1% CLDN18.2 biomarker testing adoption in Japan gastric cancer patients = approximately +¥0.35B annual VYLOY revenue (at ~8,000 eligible patients/year, 30% CLDN18.2+ = 2,400 patients; 1% testing adoption = 24 additional identified patients × ~¥14.5M/patient/year). Testing infrastructure deployment is the primary gating factor for VYLOY Japan commercial launch success following PMDA approval.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Core SG&A as % of Revenue Change (bps)',
            metricB: 'Core Operating Income Impact (¥B annual)',
            segment: 'Astellas Consolidated',
            elasticity: 2.14,
            elasticityUnit: '¥B Core OP per 100bps Core SG&A efficiency improvement',
            confidence: 0.93,
            explanation: '100bps improvement in Core SG&A as % of revenue = approximately +¥21.4B annual Core OP (on ¥2,139B FY25 revenue base). SMT program targets structural SG&A ratio reduction from ~26% to ~23-24% over FY26-FY28. Each 100bps SG&A efficiency improvement = ¥21.4B Core OP uplift — equivalent to approximately +¥9/share Core EPS annually. SG&A discipline is the controllable margin lever alongside revenue growth in the IRA-constrained environment.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'XTANDI Post-IRA Volume Growth in Non-Medicare US Populations (%)',
            metricB: 'XTANDI US Net Revenue Recovery (¥B annual)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: 5.76,
            elasticityUnit: '¥B annual US XTANDI revenue from 1% volume growth in non-Medicare segment',
            confidence: 0.86,
            explanation: '+1% XTANDI US volume growth in non-Medicare populations (commercial + Medicaid = ~65% of US patients) = approximately +¥5.76B annual US revenue recovery partially offsetting IRA MFP headwind. Non-Medicare XTANDI usage grows through label expansions into earlier disease states (younger nmCSPC patients). Post-MFP, volume becomes the dominant revenue driver — each 1% non-Medicare volume growth provides structural IRA offset.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'PADCEV Patient Treatment Completion Rate (%)',
            metricB: 'PADCEV Net Revenue Yield per Patient (¥M)',
            segment: 'Astellas — US PADCEV Franchise',
            elasticity: 0.8,
            elasticityUnit: '¥M net revenue per patient per 1% improvement in treatment completion rate',
            confidence: 0.84,
            explanation: '+1% PADCEV patient treatment completion rate = approximately +¥0.8M net revenue per patient (at ~¥12M average annual PADCEV revenue per patient; better tolerability management extends treatment duration). Dose reduction and discontinuation management by oncologists is a key real-world effectiveness metric. High completion rates support payer formulary position and reduce switching to alternative I/O-based regimens in bladder cancer.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Digital HCP Engagement Share of Total Interactions (%)',
            metricB: 'US Commercial SG&A Cost Reduction (¥B annual)',
            segment: 'Astellas — US Commercial',
            elasticity: 0.32,
            elasticityUnit: '¥B annual SG&A savings per 1% shift to digital HCP engagement',
            confidence: 0.82,
            explanation: '+1% shift from traditional field sales rep visits to digital HCP engagement channels = approximately -¥0.32B annual US commercial SG&A cost (digital engagement costs ~35% of in-person call). At ¥32B US commercial SG&A baseline, 1% channel shift saves ~¥0.32B. SMT commercial model transformation target: 40% digital engagement by FY27 from ~25% FY25 — a 15pp shift = ~¥4.8B annual cost savings while maintaining prescriber reach and detail frequency.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'IZERVAY US Geographic Atrophy Market Share (%)',
            metricB: 'IZERVAY Annual US Revenue (¥B)',
            segment: 'Astellas — US Emerging Products',
            elasticity: 2.5,
            elasticityUnit: '¥B annual US revenue per 1% GA market share gain',
            confidence: 0.81,
            explanation: '+1% IZERVAY US geographic atrophy market share = approximately +¥2.5B annual US revenue (at ~250,000 eligible US GA patients; 1% share = 2,500 patients × ~¥1M/patient/year). Current IZERVAY share ~21% vs. Syfovre (Apellis) ~79% in GA market. Monthly vs. every-other-month dosing is the key prescriber preference driver. FDA label expansion to dry AMD broadly would multiply the addressable market approximately 5×.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'EUR/JPY Rate Change (¥ per €1 move)',
            metricB: 'Established Markets Core OP Impact (¥B annual)',
            segment: 'Astellas — Established Markets',
            elasticity: 0.9,
            elasticityUnit: '¥B Core OP per ¥1 EUR/JPY move',
            confidence: 0.91,
            explanation: 'Each ¥1 EUR/JPY rate move = approximately ¥0.9B annual Core OP impact from Established Markets European revenue translation (European revenue ~¥280B FY25; ~45% EUR-denominated). EUR/JPY influences both revenue translation and partially offsets USD sensitivity when USD and EUR move asymmetrically vs. JPY. Combined USD + EUR FX represents ~70% of total Astellas FX exposure — USD sensitivity is the primary driver at ¥2.1B/¥1.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'China NRDL Listing Success Rate for Astellas Products (%)',
            metricB: 'China Segment Annual Revenue Growth (¥B incremental)',
            segment: 'Astellas — China Segment',
            elasticity: 1.8,
            elasticityUnit: '¥B incremental annual China revenue per 1% NRDL listing success rate improvement',
            confidence: 0.77,
            explanation: '+1% improvement in NRDL (National Reimbursement Drug List) listing success rate = approximately +¥1.8B incremental annual China revenue. NRDL listing accelerates patient access dramatically — XTANDI China NRDL listing increased patient volume ~4× within 12 months. PADCEV and VYLOY NRDL applications are in progress for FY26-FY27. Volume-driven revenue growth offsets mandatory NRDL price concessions in the China market.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'XTANDI Patient Persistence Rate at 12 Months (%)',
            metricB: 'XTANDI US Revenue per Patient Cohort (¥M annualized)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: 0.12,
            elasticityUnit: '¥M annualized cohort revenue per 1% persistence rate improvement',
            confidence: 0.87,
            explanation: '+1% improvement in 12-month XTANDI patient persistence rate = approximately +¥0.12M per-patient annualized revenue (at ~¥12M average annual XTANDI revenue per patient; 1% more patients completing 12 months). Physician education on tolerability management and nurse navigator programs are the primary persistence intervention tools. High persistence also supports payer formulary position and prior authorization success rates in the post-IRA environment.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Astellas Net Debt-to-EBITDA Ratio (x)',
            metricB: 'Annual Interest Expense (¥B)',
            segment: 'Astellas Consolidated',
            elasticity: 15.0,
            elasticityUnit: '¥B additional annual interest per 0.1x leverage increase',
            confidence: 0.94,
            explanation: '+0.1x net leverage = approximately +¥15B annual interest expense at Astellas total debt load and ~2.8% average cost of debt (lower than US pharma peers due to Japanese bank relationships and yen-denominated debt). Astellas conservative leverage policy targets net debt/EBITDA below 1.5x. Strong FCF generation from XTANDI/PADCEV enables rapid deleveraging — each ¥100B debt reduction saves ~¥2.8B annual interest expense.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'PADCEV + Pembrolizumab Combination 1L Bladder Cancer Penetration (%)',
            metricB: 'PADCEV US Quarterly Revenue Incremental (¥B)',
            segment: 'Astellas — US PADCEV Franchise',
            elasticity: 0.68,
            elasticityUnit: '¥B quarterly PADCEV US revenue per 1% 1L bladder cancer combination penetration',
            confidence: 0.89,
            explanation: '+1% PADCEV + pembrolizumab (Keytruda) penetration in first-line bladder cancer = approximately +¥0.68B quarterly US PADCEV revenue (combination standard-of-care creates longer treatment duration vs. prior 2L use; at ~¥11B quarterly US PADCEV and ~40% current 1L share, each 1% expansion = ¥0.68B). EV-302/KEYNOTE-A39 data established the combination — continued HCO medical education drives remaining share conversion from chemotherapy-only regimens.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Astellas R&D Investment as % of Revenue (%)',
            metricB: 'Core OP Margin Impact (bps)',
            segment: 'Astellas Consolidated',
            elasticity: -100.0,
            elasticityUnit: 'bps Core OP margin per 1% R&D investment rate change',
            confidence: 0.97,
            explanation: '1pp R&D investment rate change = -100bps Core OP margin (direct pass-through since R&D is fully expensed). At ¥312.4B FY25 R&D (~14.6% of revenue), sustained 1pp increase in R&D/revenue = ¥21.4B additional spend = -100bps margin compression. Astellas R&D discipline at 14-16% of revenue is an explicit capital allocation choice — incremental funding for oncology combinations and gene therapy programs must be weighed against near-term Core OP margin targets.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'VEOZAH Patient Refill Rate at 6 Months (%)',
            metricB: 'VEOZAH Annual Revenue per Patient Cohort (¥M)',
            segment: 'Astellas — US Emerging Products',
            elasticity: 0.18,
            elasticityUnit: '¥M annual revenue per patient per 1% 6-month refill rate improvement',
            confidence: 0.83,
            explanation: '+1% VEOZAH 6-month refill rate = approximately +¥0.18M per-patient annual revenue (at ~¥3.6M average annual VEOZAH revenue per adherent patient; better refill captures more of the patient lifetime value). Current refill rate >65% is above typical menopausal symptom treatment persistence — patient satisfaction with VMS symptom relief is the primary retention driver. Refill rate is the key VEOZAH commercial execution metric for FY26 revenue ramp.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Astellas Share Buyback as % of Excess Free Cash Flow (%)',
            metricB: 'Core EPS Accretion (¥ per share)',
            segment: 'Astellas Consolidated',
            elasticity: 0.05,
            elasticityUnit: '¥ Core EPS per ¥1B share buyback at current valuation',
            confidence: 0.88,
            explanation: 'Each ¥1B of Astellas share repurchase = approximately +¥0.05 Core EPS accretion (at ~4.22B diluted shares; ¥1B buyback at ~¥1,800/share retires ~0.56M shares; EPS accretion on ¥237 base = ~¥0.033/share direct plus ~3.3% float reduction premium = ~¥0.05 total). Capital allocation priority: (1) R&D investment, (2) dividend maintenance/growth, (3) strategic M&A optionality, (4) share repurchases from excess FCF above ¥600B threshold.',
            period: 'Q1 FY26',
        },
        {
            companyId,
            metricA: 'Competitive Prostate Cancer Phase 3 Positive Trials (per year)',
            metricB: 'XTANDI US Market Share Erosion Risk (bps per year)',
            segment: 'Astellas — US XTANDI Franchise',
            elasticity: -45.0,
            elasticityUnit: 'bps annual XTANDI US share erosion risk per competitive positive Phase 3',
            confidence: 0.75,
            explanation: 'Each positive Phase 3 trial in prostate cancer by a competitor = approximately -45bps annual XTANDI US market share risk (historical analysis: ERLEADA SPARTAN/ARCHES data contributed ~150bps total XTANDI share impact over 3 years = ~50bps/year; OPDIVO prostate cancer trials = ~30bps potential). Oncology competitive intelligence monitoring and XTANDI label expansion studies into earlier disease states are the strategic responses to preserve market leadership.',
            period: 'Q1 FY26',
        },
    ];

    await prisma.elasticityFactor.createMany({
        data: elasticityData.map((item: Record<string, unknown>) => ({
            companyId: item.companyId,
            driverMetric: item.metricA,
            impactedMetric: item.metricB,
            elasticity: item.elasticity as number,
            elasticityUnit: item.elasticityUnit,
            direction: (item.elasticity as number) >= 0 ? 'positive' : 'negative',
            confidence: item.confidence,
            description: item.explanation,
            segment: item.segment,
        })),
    });
    console.log(`  ✓ ${elasticityData.length} ElasticityFactor records`);

    // =========================================================================
    // TABLE 4: CompetitorQuarterlyMetric — 100 records
    // 5 competitors × 5 quarters × 4 metrics
    // Quarters: Q1 FY25 through Q1 FY26
    // Revenue in USD $M; EPS in USD; R&D as % revenue; Core OP margin %
    // =========================================================================

    const competitorDefs = [
        {
            // AstraZeneca — LYNPARZA (olaparib) oncology portfolio; competes in prostate/ovarian cancer
            // Tagrisso, Imfinzi, Calquence round out oncology; AZN growing faster than sector average
            name: 'AstraZeneca (AZN)',
            revenue:  [10200, 11500, 12100, 12800, 11000],  // USD $M quarterly
            eps:      [0.88, 1.12, 1.25, 1.38, 0.95],       // USD per ADR
            rdPct:    [18.2, 17.8, 17.5, 17.1, 18.5],       // R&D as % revenue
            opMargin: [22.4, 24.8, 26.1, 27.2, 23.1],       // Core operating margin %
        },
        {
            // Johnson & Johnson Innovative Medicine — ERLEADA (apalutamide) direct XTANDI competitor
            // Competes head-to-head in nmCSPC and expanding in mCRPC; well-capitalized promotion
            name: 'Johnson & Johnson / Janssen',
            revenue:  [13800, 14200, 14500, 14900, 14200],
            eps:      [2.71, 2.82, 2.95, 3.05, 2.88],
            rdPct:    [14.8, 14.5, 14.2, 13.9, 15.1],
            opMargin: [29.8, 30.4, 31.2, 30.8, 29.5],
        },
        {
            // Bristol-Myers Squibb — OPDIVO (nivolumab) I/O competing with PADCEV combinations in bladder cancer
            // Checkmate-901 data in urothelial carcinoma; nivolumab + chemotherapy regimen
            name: 'Bristol-Myers Squibb (BMY)',
            revenue:  [11800, 12000, 12200, 12500, 11200],
            eps:      [1.80, 1.72, 1.88, 1.95, 1.62],
            rdPct:    [17.5, 17.2, 16.9, 16.6, 18.0],
            opMargin: [26.2, 25.8, 27.4, 26.9, 24.8],
        },
        {
            // Novartis — broad oncology portfolio; Kisqali (breast), Kymriah (CAR-T), pipeline competitor
            // Not direct product competitor but competes in R&D talent, payer formulary budget share
            name: 'Novartis (NVS)',
            revenue:  [11100, 11800, 12400, 12800, 11500],
            eps:      [1.68, 1.84, 2.01, 2.18, 1.72],
            rdPct:    [16.8, 16.4, 16.1, 15.8, 17.2],
            opMargin: [28.5, 29.8, 31.4, 30.2, 27.9],
        },
        {
            // Roche — Tecentriq (atezolizumab) I/O competing in bladder cancer vs. PADCEV combinations
            // Also Alecensa (lung), Ocrevus (neuro); broad oncology + diagnostics portfolio
            name: 'Roche (RHHBY)',
            revenue:  [12000, 14200, 13500, 13800, 12500],
            eps:      [2.42, 3.08, 2.88, 2.98, 2.55],
            rdPct:    [19.8, 19.2, 18.8, 18.5, 20.1],
            opMargin: [30.2, 34.1, 32.8, 33.5, 30.8],
        },
    ];

    const competitorMetrics = [
        { name: 'Revenue ($M)',             unit: '$M',      getData: (c: typeof competitorDefs[0], qi: number) => c.revenue[qi] },
        { name: 'Earnings Per Share ($)',   unit: '$/share', getData: (c: typeof competitorDefs[0], qi: number) => c.eps[qi] },
        { name: 'R&D as % of Revenue (%)', unit: '%',       getData: (c: typeof competitorDefs[0], qi: number) => c.rdPct[qi] },
        { name: 'Core Operating Margin (%)', unit: '%',     getData: (c: typeof competitorDefs[0], qi: number) => c.opMargin[qi] },
    ];

    const competitorData = [];
    for (const comp of competitorDefs) {
        for (let qi = 0; qi < quarters.length; qi++) {
            const periodRecord = allPeriods[quarters[qi]];
            if (!periodRecord) continue;

            for (const metric of competitorMetrics) {
                const value = metric.getData(comp, qi);
                const baseValue = metric.getData(comp, 0); // Q1 FY25 baseline
                const yoyChange = baseValue !== 0
                    ? parseFloat(((value - baseValue) / Math.abs(baseValue) * 100).toFixed(1))
                    : 0;

                competitorData.push({
                    companyId,
                    periodId: periodRecord.id,
                    competitorName: comp.name,
                    metricName: metric.name,
                    value,
                    yoyChange,
                    unit: metric.unit,
                });
            }
        }
    }

    await prisma.competitorQuarterlyMetric.createMany({ data: competitorData });
    console.log(`  ✓ ${competitorData.length} CompetitorQuarterlyMetric records`);

    const total = weeklySnapshotData.length + clusterData.length + elasticityData.length + competitorData.length;
    console.log(`Astellas Pharma analytical data seeded: ${total} total records`);
}
