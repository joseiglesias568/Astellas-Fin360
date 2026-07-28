import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 33: Astellas Pharma Inc. — Pharmaceutical Input Costs & Manufacturing Inputs
//
// 7 commodity/pricing records for period 'Q1 FY25'
//
// Astellas's key pharmaceutical manufacturing and raw material cost inputs:
//   1. Active Pharmaceutical Ingredient (API) Cost Index
//   2. Biological/Biologic Manufacturing Cost (ADC — PADCEV)
//   3. XTANDI Raw Material Cost (enzalutamide API)
//   4. Outsourced Contract Manufacturing (CMO) Rate
//   5. R&D Clinical Trial Cost per Patient
//   6. Japan NHI Price Revision Impact
//   7. USD/JPY Exchange Rate (FX Input)
// =============================================================================

export async function seedCommodityPrices(prisma: PrismaClient, companyId: number) {
    console.log('Seeding Astellas Pharma pharmaceutical input costs and manufacturing cost drivers...');

    const commodities = [
        {
            companyId,
            commodity: 'Active Pharmaceutical Ingredient (API) Cost Index',
            unit: 'index (YoY % chg)',
            periodLabel: 'Q1 FY25',
            spotPrice: -2.1,          // current YoY deflation rate (%) — Astellas multi-supplier strategy achieving mild deflation
            hedgedPrice: -1.5,        // contracted pricing under multi-year API supply agreements
            priorYearPrice: -0.8,     // Q1 FY24 API cost change (near flat)
            hedgeCoverage: 65,        // % of API volume under long-term supply contracts (2-3 year fixed price)
            yoyChange: -1.3,          // change in API cost trend (more deflationary vs prior year due to dual-source program)
            forecastNext: -2.5,       // Q2 FY25 forecast — continued mild deflation as dual-source programs mature
        },
        {
            companyId,
            commodity: 'Biological/Biologic Manufacturing Cost — PADCEV ADC (¥M per batch)',
            unit: '¥M per manufacturing batch',
            periodLabel: 'Q1 FY25',
            spotPrice: 485.0,         // Q1 FY25 cost per ADC manufacturing batch (enfortumab vedotin linker-payload)
            hedgedPrice: 462.0,       // contracted batch cost under Astellas/Pfizer co-manufacturing agreement
            priorYearPrice: 468.0,    // Q1 FY24 batch cost (early-scale production, higher unit cost)
            hedgeCoverage: 80,        // % of PADCEV batch capacity under contracted manufacturing agreement with Pfizer
            yoyChange: 3.6,           // % increase in nominal batch cost YoY (process complexity; offset by batch size increase)
            forecastNext: 478.0,      // Q2 FY25 forecast — slight improvement as capacity expansion at McPherson facility delivers scale
        },
        {
            companyId,
            commodity: 'XTANDI Raw Material Cost — Enzalutamide API (¥M per metric ton)',
            unit: '¥M per metric ton',
            periodLabel: 'Q1 FY25',
            spotPrice: 2850.0,        // Q1 FY25 enzalutamide API cost per metric ton (synthetic organic chemistry)
            hedgedPrice: 2750.0,      // contracted API price under 3-year dual-source supply agreement
            priorYearPrice: 2920.0,   // Q1 FY24 API cost (prior to dual-source program completion)
            hedgeCoverage: 85,        // % of XTANDI API volume under contracted fixed-price supply (primary + secondary supplier)
            yoyChange: -2.4,          // % cost reduction YoY from dual-source competitive pricing
            forecastNext: 2820.0,     // Q2 FY25 forecast — modest further reduction as secondary supplier scales up
        },
        {
            companyId,
            commodity: 'Outsourced Contract Manufacturing (CMO) Rate (% of net drug sales)',
            unit: '% of net drug sales',
            periodLabel: 'Q1 FY25',
            spotPrice: 18.8,          // Q1 FY25 CMO costs as % of net drug sales (secondary manufacturing, packaging, fill-finish)
            hedgedPrice: 18.2,        // contracted CMO rate under multi-year CMO framework agreements
            priorYearPrice: 19.5,     // Q1 FY24 CMO rate (higher due to smaller volumes and legacy contracts)
            hedgeCoverage: 72,        // % of CMO spend under framework agreements (volume-based pricing commitments)
            yoyChange: -0.7,          // percentage point improvement in CMO rate YoY (volume leverage + contract renegotiation)
            forecastNext: 18.5,       // Q2 FY25 forecast — continued gradual improvement as PADCEV volumes increase CMO scale
        },
        {
            companyId,
            commodity: 'R&D Clinical Trial Cost per Patient (¥M per patient per year)',
            unit: '¥M per enrolled patient per year',
            periodLabel: 'Q1 FY25',
            spotPrice: 8.5,           // Q1 FY25 average global clinical trial cost per enrolled patient per year
            hedgedPrice: null,        // no hedging applicable — clinical trial costs are variable and milestone-driven
            priorYearPrice: 8.1,      // Q1 FY24 average clinical trial cost per patient (lower patient count, smaller trials)
            hedgeCoverage: null,      // N/A — clinical trial costs cannot be hedged; managed through protocol design and site selection
            yoyChange: 4.9,           // % increase in per-patient clinical trial cost YoY (site overhead, patient complexity, monitoring requirements)
            forecastNext: 8.8,        // Q2 FY25 forecast — continued modest inflation in clinical operations costs globally
        },
        {
            companyId,
            commodity: 'Japan NHI Price Revision Impact (% average drug price reduction)',
            unit: '% average NHI price reduction',
            periodLabel: 'Q1 FY25',
            spotPrice: -5.2,          // Q1 FY25 (April 2025): average NHI price reduction applied to Astellas Japan portfolio
            hedgedPrice: -4.8,        // internal planning assumption used for FY25 Japan revenue budgeting
            priorYearPrice: -3.5,     // April 2023 NHI revision: lighter revision cycle (alternate-year pattern)
            hedgeCoverage: null,      // N/A — NHI price revisions are regulatory mandates; no hedging possible
            yoyChange: -1.7,          // incremental NHI revision severity vs prior revision cycle (percentage points)
            forecastNext: -5.5,       // October 2025 mid-year NHI revision forecast (minor adjustment cycle)
        },
        {
            companyId,
            commodity: 'USD/JPY Exchange Rate (Primary FX Driver)',
            unit: '¥ per USD',
            periodLabel: 'Q1 FY25',
            spotPrice: 152.0,         // Q1 FY25 average USD/JPY rate (¥152.0 per USD)
            hedgedPrice: 150.5,       // Q1 FY25 hedged rate on ~30-35% of USD revenue exposure under forward contracts
            priorYearPrice: 134.3,    // Q1 FY24 average USD/JPY rate (yen significantly stronger in prior year)
            hedgeCoverage: 32,        // % of net USD revenue exposure hedged under rolling forward contract program
            yoyChange: 13.2,          // % yen depreciation YoY (Q1 FY25 vs Q1 FY24) — highly favorable translation impact
            forecastNext: 150.8,      // Q2 FY25 forecast rate (modest yen strengthening expected from Q1 peak)
        },
    ];

    // Pharmaceutical input cost context notes (for documentation — not stored in model):
    //
    // API Cost Index: Astellas sources APIs from a diversified global supplier base spanning
    //   Japan, EU, India, and China. Multi-sourcing strategy implemented under SMT program:
    //   XTANDI enzalutamide now dual-sourced (Japanese primary + Indian secondary supplier);
    //   IZERVAY pegaptanib API single-sourced through specialized oligonucleotide manufacturer.
    //   API cost deflation of -2.1% YoY reflects competitive pricing as dual-source programs
    //   leverage incumbent supplier negotiations. API represents ~8% of Astellas COGS.
    //
    // ADC Manufacturing Cost (PADCEV): Antibody-drug conjugates are among the most complex
    //   biologic manufacturing processes — enfortumab vedotin requires: (1) expression and
    //   purification of the anti-Nectin-4 antibody (Pfizer manufacturing); (2) MMAE cytotoxin
    //   synthesis; (3) site-specific conjugation under GMP conditions. Astellas and Pfizer
    //   share manufacturing responsibilities under the collaboration agreement; Pfizer's McPherson
    //   KS ADC facility expanded capacity in Q1 FY25 (+40% batch output) partially offsetting
    //   the 3.6% per-batch cost increase through lower per-unit cost at larger batch volumes.
    //   PADCEV COGS ratio improving toward 22-25% gross margin target for biologics manufacturing.
    //
    // XTANDI API (Enzalutamide): Enzalutamide is a synthetic organic compound manufactured
    //   through multi-step chemical synthesis. API represents the largest COGS component for
    //   XTANDI (~45% of manufacturing cost). Astellas completed transition to dual-source API
    //   in Q4 FY24 — Indian API manufacturer approved by FDA and PMDA. Dual-source program
    //   targets ¥2.1B annualized COGS savings and supply chain resilience. XTANDI patent
    //   expiration in major markets: US 2027, Japan 2028, EU 2026 — generic entry risk monitored.
    //
    // CMO Rate: Astellas outsources secondary manufacturing (tablet compression, blister packaging,
    //   fill-finish for injectables) to contract manufacturers. Key CMOs include: Patheon/Thermo
    //   Fisher (US oral solid dose), Catalent (injectables), and Nichi-Iko (Japan secondary).
    //   CMO rate improvement from 19.5% to 18.8% driven by: PADCEV volume scale (ADC co-manufacturing
    //   economics), XTANDI production consolidation to fewer CMO sites, and procurement renegotiations
    //   under SMT. Further improvement to 17-18% targeted by FY26 as VYLOY launches add volume.
    //
    // Clinical Trial Cost per Patient: Global clinical trial costs have risen 15-20% since 2020
    //   driven by patient complexity, site overhead inflation, digital monitoring requirements,
    //   and competition for CRO capacity. Astellas FY25 R&D budget ¥285B (~4,200 patients enrolled
    //   across all active studies) implies ~¥8.5M/patient/year blended cost. Cost management:
    //   adaptive trial designs reduce expected enrollment by 20-25% vs. traditional designs;
    //   decentralized clinical trial (DCT) technology deployment reducing site visit requirements.
    //
    // Japan NHI Price Revision: Japan's Ministry of Health, Labour and Welfare (MHLW) conducts
    //   biannual drug price revisions (April and October). April 2025 major revision (-5.2%
    //   average) applied to all NHI-listed drugs based on market price surveys and R-zone
    //   adjustment. Astellas Japan portfolio impact: ¥12.5B revenue reduction in FY25 from
    //   April revision. XTANDI and PADCEV both subject to full market basket revision; newer
    //   products (VYLOY) partially protected as new product pricing not yet subject to revision.
    //   October 2025 minor revision expected -1.0 to -1.5% — less material.
    //
    // USD/JPY Exchange Rate: The single most important financial driver for Astellas beyond
    //   product performance. US revenue represents 44% of group revenue (¥940.2B FY25).
    //   Every ¥1 depreciation of the yen vs. USD adds approximately ¥2.1B to Core OP through
    //   translation effects. Q1 FY25 average ¥152.0/USD vs. Q1 FY24 ¥134.3/USD: ¥17.7 yen
    //   depreciation generated approximately ¥37.2B favorable Core OP translation tailwind in
    //   Q1 FY25 alone. FY25 full-year average ¥151.0/USD vs. FY24 ¥148.5/USD: ¥2.5B incremental
    //   favorable translation. Hedging program: Astellas hedges 30-35% of net USD exposure using
    //   12-month rolling forward contracts — providing partial protection against yen appreciation
    //   while retaining upside from yen depreciation. Forward contracts entered when USD/JPY
    //   rate exceeds internal ¥145/USD threshold considered "favorable for hedging."

    await prisma.commodityPrice.createMany({ data: commodities });
    console.log(`  ✓ ${commodities.length} CommodityPrice records seeded for Astellas Pharma`);
}
