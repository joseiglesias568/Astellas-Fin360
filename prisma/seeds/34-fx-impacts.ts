import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 34: FX Impacts — Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY)
//
// NOTE: FX is a PRIMARY financial driver for Astellas — ~56% of revenue is
// non-Japan (USD, EUR, CNY, GBP, EM basket). FY2025 average rate ¥151.0/USD.
// Sensitivity: every ¥1 USD/JPY change = ~¥2.1B Core OP translation impact.
//
// 5 currency pairs, multiple periods (Q1-Q4 FY25), total ~20 records.
//
// Currency pairs:
//   1. USD/JPY  — largest; US revenue ¥940.2B (44% of group); highly material
//   2. EUR/JPY  — Established Markets; ¥563.6B FY25 (26%); favorable EUR strength
//   3. CNY/JPY  — China; ¥101.5B FY25 (5%); stable CNY
//   4. GBP/JPY  — UK within Established Markets; modest incremental exposure
//   5. EM Basket/JPY — Intl Markets; minor residual emerging market exposure
// =============================================================================

export async function seedFXImpacts(
    prisma: PrismaClient,
    companyId: number,
    allPeriods: Record<string, { id: number }>,
) {
    console.log('Seeding Astellas Pharma FX translation impacts (primary financial driver — 56% non-Japan revenue)...');

    const fxRecords = [];

    // =========================================================================
    // CURRENCY PAIR 1: USD/JPY
    // Largest FX exposure by far. US revenue ¥940.2B FY25 (44% of group).
    // Sensitivity: +¥1 USD/JPY appreciation = +¥2.1B Core OP.
    // FY24 avg rate ¥148.5/USD → FY25 avg rate ¥151.0/USD: ¥2.5B favorable YoY.
    // Astellas hedges ~30-35% of net USD exposure via rolling forward contracts.
    // =========================================================================
    const usdJpyQuarters = [
        {
            quarterLabel: 'Q1 FY25',
            avgRate: 152.0,
            priorYearRate: 134.3,
            hedgedRate: 148.5,
            hedgeCoverage: 33,
            // Q1 FY25: ¥17.7 yen depreciation YoY → +¥37.2B revenue translation benefit on US book
            // Partially offset by hedged portion at ¥148.5 (lower than spot). Net quarterly benefit.
            revenueImpact: 37.2,
            operatingImpact: 12.8,
            explanation: 'Q1 FY25 USD/JPY averaged ¥152.0 vs. ¥134.3 in Q1 FY24 — a ¥17.7 yen depreciation (13.2% YoY) that is highly favorable for Astellas\'s US revenue translation. Astellas reports in Japanese yen; US revenues earned in USD translate at the average quarter rate. At ¥152.0/USD vs. ¥134.3 prior year, approximately ¥26.7B of the ¥37.2B revenue translation benefit is attributable to the year-over-year rate differential applied to US revenue of approximately ¥235B/quarter. The ¥2.1B Core OP sensitivity per ¥1 rate change implies ¥37.2B at the ¥17.7 rate differential — confirmed by management disclosures. Core OP translation impact ¥12.8B per quarter reflects: revenue translation benefit offset by (1) USD-denominated R&D and US SG&A costs (partially natural hedge), (2) PADCEV collaboration payments to Pfizer in USD, and (3) USD-denominated API and CMO procurement costs. Hedging: ¥148.5/USD forward contracts cover 33% of net USD revenue, capping upside but limiting downside risk if yen reverses sharply.',
        },
        {
            quarterLabel: 'Q2 FY25',
            avgRate: 149.8,
            priorYearRate: 143.5,
            hedgedRate: 149.0,
            hedgeCoverage: 32,
            revenueImpact: 13.2,
            operatingImpact: 5.1,
            explanation: 'Q2 FY25 USD/JPY averaged ¥149.8 vs. ¥143.5 in Q2 FY24 — a ¥6.3 yen depreciation (4.4% YoY) providing a moderate favorable translation tailwind. The smaller YoY differential vs. Q1 FY25 reflects yen partial recovery from the Q1 FY25 peak of ¥152+ as Bank of Japan signaled potential rate hikes in July 2024. Revenue impact ¥13.2B on quarterly US revenue of approximately ¥245B (XTANDI + PADCEV US growth). Hedged rate ¥149.0 nearly at spot — hedging program providing minimal incremental benefit this quarter; forwards entered at more favorable rates in prior period. Core OP impact ¥5.1B per quarter. Sensitivity reminder: if yen were to strengthen back to ¥140/USD, Astellas would face approximately ¥20.8B annualized Core OP headwind vs. FY25 rate — a key risk factor for FY26 guidance.',
        },
        {
            quarterLabel: 'Q3 FY25',
            avgRate: 152.5,
            priorYearRate: 149.2,
            hedgedRate: 150.0,
            hedgeCoverage: 31,
            revenueImpact: 6.9,
            operatingImpact: 2.5,
            explanation: 'Q3 FY25 USD/JPY averaged ¥152.5 vs. ¥149.2 in Q3 FY24 — a ¥3.3 yen depreciation (2.2% YoY) providing modest favorable translation. The narrowing YoY differential reflects that Q3 FY24 was itself a yen-weak period. Revenue impact ¥6.9B; Core OP impact ¥2.5B — smaller absolute benefit than Q1 FY25 despite similar spot rate because the YoY change is the key driver of translation variance. Q3 FY25 US revenue growth driven by PADCEV first-line UC rollout expanding from academic to community oncology setting — volume growth +22% YoY in US. Total FY25 YTD cumulative FX benefit (USD/JPY translation) through Q3: ¥57.3B revenue, ¥20.4B Core OP. BoJ rate decision (October 2025) being monitored as potential driver of yen appreciation; management sensitivity analysis disclosed at Q3 earnings.',
        },
        {
            quarterLabel: 'Q4 FY25',
            avgRate: 151.8,
            priorYearRate: 148.1,
            hedgedRate: 150.5,
            hedgeCoverage: 30,
            revenueImpact: 7.8,
            operatingImpact: 2.8,
            explanation: 'Q4 FY25 USD/JPY averaged ¥151.8 vs. ¥148.1 in Q4 FY24 — ¥3.7 yen depreciation (2.5% YoY). Revenue impact ¥7.8B; Core OP ¥2.8B. FY25 full-year USD/JPY average ¥151.0 vs. FY24 ¥148.5 — ¥2.5B net favorable Core OP translation impact for the full year, in line with management guidance sensitivity disclosures. FY26 planning rate disclosed by management: ¥149/USD (planning assumption based on forward curve mid-point). If actual FY26 rate stays at ¥151+, additional ¥4.2B favorable Core OP vs. plan. Conversely, if yen strengthens to ¥145/USD (within range of BoJ normalization scenarios), Core OP headwind of -¥12.6B vs. FY25 rate — a key FY26 downside scenario. IRA impact on US XTANDI revenues (Part D pricing) will also reduce the USD-denominated revenue base subject to translation.',
        },
    ];

    for (const q of usdJpyQuarters) {
        const periodRecord = allPeriods[q.quarterLabel];
        if (!periodRecord) continue;
        fxRecords.push({
            companyId,
            periodId: periodRecord.id,
            currencyPair: 'USD/JPY',
            segment: 'United States',
            revenueImpact: q.revenueImpact,
            operatingImpact: q.operatingImpact,
            avgRate: q.avgRate,
            priorYearRate: q.priorYearRate,
            hedgedRate: q.hedgedRate,
            hedgeCoverage: q.hedgeCoverage,
            explanation: q.explanation,
        });
    }

    // =========================================================================
    // CURRENCY PAIR 2: EUR/JPY
    // Established Markets: EU revenue ¥563.6B FY25 (26% of group).
    // EUR/JPY favorable: euro strengthening vs. yen adds revenue on translation.
    // Key products: XTANDI (all EU5), PADCEV (EU launch in progress), IZERVAY (EU).
    // =========================================================================
    const eurJpyQuarters = [
        {
            quarterLabel: 'Q1 FY25',
            avgRate: 162.5,
            priorYearRate: 151.8,
            hedgedRate: 160.0,
            hedgeCoverage: 25,
            revenueImpact: 15.2,
            operatingImpact: 5.8,
            explanation: 'Q1 FY25 EUR/JPY averaged ¥162.5 vs. ¥151.8 in Q1 FY24 — a ¥10.7 euro appreciation (7.0% YoY) providing significant favorable translation for Established Markets revenue. Astellas EU quarterly revenue approximately ¥140B (FY25 annualized ¥563.6B / 4); applied to ¥10.7 YoY rate differential, revenue translation benefit ¥15.2B. EUR/JPY strength reflects dual effect: yen depreciation vs. USD (cross-rate) and ECB maintaining higher interest rates relative to BoJ. Key EU revenue contributors: XTANDI Germany (Pfizer promotion; Astellas retains royalty stream), XTANDI France (Astellas direct), XTANDI UK. PADCEV EMA approval received; EU commercial launch commencing — adds EUR-denominated revenue stream from Q2 FY25. EU hedging: 25% coverage under EUR/JPY forward contracts; lower coverage ratio than USD reflects EUR natural hedge from EUR-denominated R&D and EU commercial costs.',
        },
        {
            quarterLabel: 'Q2 FY25',
            avgRate: 163.8,
            priorYearRate: 158.2,
            hedgedRate: 161.5,
            hedgeCoverage: 24,
            revenueImpact: 7.9,
            operatingImpact: 3.1,
            explanation: 'Q2 FY25 EUR/JPY averaged ¥163.8 vs. ¥158.2 in Q2 FY24 — ¥5.6 appreciation (3.5% YoY). Revenue impact ¥7.9B on approximately ¥141B EU quarterly revenue. EUR/JPY at historical highs reflecting ECB rate differential vs. BoJ; favorable for Astellas translation. PADCEV EU launch contributing first EUR-denominated revenue; ESMO congress (September 2025) presenting PADCEV EU real-world data. EU XTANDI revenue +6.8% in constant currency; translation boost adds approximately 3.5% incremental reported growth in yen terms. EU regulatory update: IZERVAY EMA marketing authorization application submitted Q2 FY25; EU geographic atrophy market estimated €800M annually — important diversification from US IZERVAY dependency.',
        },
        {
            quarterLabel: 'Q3 FY25',
            avgRate: 161.2,
            priorYearRate: 157.5,
            hedgedRate: 160.8,
            hedgeCoverage: 25,
            revenueImpact: 5.2,
            operatingImpact: 2.0,
            explanation: 'Q3 FY25 EUR/JPY averaged ¥161.2 vs. ¥157.5 in Q3 FY24 — ¥3.7 appreciation (2.3% YoY). More modest favorable translation than earlier quarters. Revenue impact ¥5.2B. EU revenue growing organically: PADCEV launch ramp contributing new EUR revenue, XTANDI EU volume growth +5.8% constant currency. EU macro environment: OECD GDP growth 1.2% EU; pharmaceutical reimbursement negotiations ongoing in Germany (AMNOG) and France (ATU/AP). XTANDI German AMNOG benefit assessment reaffirmed as "major additional benefit" — key to securing above-reference pricing. FY25 YTD cumulative EUR/JPY translation benefit: ¥28.3B revenue, ¥10.9B Core OP through Q3 FY25.',
        },
        {
            quarterLabel: 'Q4 FY25',
            avgRate: 162.0,
            priorYearRate: 159.8,
            hedgedRate: 161.2,
            hedgeCoverage: 25,
            revenueImpact: 3.1,
            operatingImpact: 1.2,
            explanation: 'Q4 FY25 EUR/JPY averaged ¥162.0 vs. ¥159.8 in Q4 FY24 — ¥2.2 appreciation (1.4% YoY), modest. Revenue impact ¥3.1B. Full-year FY25 EUR/JPY average ¥162.4 vs. FY24 ¥159.8: ¥2.6 favorable impact, contributing approximately ¥14.6B full-year revenue translation and ¥5.6B Core OP tailwind from European currencies. FY26 EUR/JPY planning assumption: ¥160/EUR (slight yen strengthening vs. EUR forecast in BoJ normalization scenario). EU portfolio diversification progressing: PADCEV launch revenue reached ¥18B in first full year in EU; IZERVAY EU approval anticipated FY26 — adding third growth product to EU portfolio alongside XTANDI and PADCEV.',
        },
    ];

    for (const q of eurJpyQuarters) {
        const periodRecord = allPeriods[q.quarterLabel];
        if (!periodRecord) continue;
        fxRecords.push({
            companyId,
            periodId: periodRecord.id,
            currencyPair: 'EUR/JPY',
            segment: 'Established Markets',
            revenueImpact: q.revenueImpact,
            operatingImpact: q.operatingImpact,
            avgRate: q.avgRate,
            priorYearRate: q.priorYearRate,
            hedgedRate: q.hedgedRate,
            hedgeCoverage: q.hedgeCoverage,
            explanation: q.explanation,
        });
    }

    // =========================================================================
    // CURRENCY PAIR 3: CNY/JPY
    // China revenue ¥101.5B FY25 (5% of group). CNY/JPY relatively stable.
    // CNY managed against USD basket; indirect yen weakening benefit.
    // =========================================================================
    const cnyJpyQuarters = [
        {
            quarterLabel: 'Q1 FY25',
            avgRate: 21.0,
            priorYearRate: 20.8,
            hedgedRate: null,
            hedgeCoverage: 0,
            revenueImpact: 0.9,
            operatingImpact: 0.2,
            explanation: 'Q1 FY25 CNY/JPY averaged ¥21.0 vs. ¥20.8 in Q1 FY24 — a modest ¥0.2 yen depreciation vs. CNY (1.0% YoY). China revenue Q1 FY25 approximately ¥27.8B; translation impact ¥0.9B from CNY rate differential. CNY is managed by PBOC against a trade-weighted basket (CFETS); CNY has been relatively stable vs. USD, tracking dollar strength. Astellas does not hedge CNY exposure — limited hedging instruments available and cross-border RMB convertibility restrictions. China revenue growth drivers predominantly volume (XTANDI NRDL listing), not FX — China is a local currency revenue market where yen translation is secondary to volume performance. Key risk: if yen appreciates sharply vs. USD, the CNY/JPY cross-rate would simultaneously become less favorable, amplifying top-line headwinds on China revenue translation.',
        },
        {
            quarterLabel: 'Q2 FY25',
            avgRate: 20.8,
            priorYearRate: 20.5,
            hedgedRate: null,
            hedgeCoverage: 0,
            revenueImpact: 1.0,
            operatingImpact: 0.2,
            explanation: 'Q2 FY25 CNY/JPY averaged ¥20.8 vs. ¥20.5 in Q2 FY24 — ¥0.3 appreciation (1.5% YoY). Revenue impact ¥1.0B on quarterly China revenue of approximately ¥32.5B. CNY stability reflects PBOC daily fixing mechanism maintaining orderly exchange rate. China revenue growth +18.9% YoY in Q2 FY25 — predominantly volume-driven from XTANDI hospital penetration and VYLOY launch. VYLOY China launch revenue (Q4 FY25 onwards) will increase CNY-denominated revenue base, gradually increasing CNY/JPY FX exposure as China segment share of revenue approaches management target of 7-8% by FY27.',
        },
        {
            quarterLabel: 'Q3 FY25',
            avgRate: 21.2,
            priorYearRate: 20.9,
            hedgedRate: null,
            hedgeCoverage: 0,
            revenueImpact: 0.8,
            operatingImpact: 0.2,
            explanation: 'Q3 FY25 CNY/JPY averaged ¥21.2 vs. ¥20.9 in Q3 FY24 — ¥0.3 appreciation (1.4% YoY). Revenue impact ¥0.8B. China quarterly revenue growing toward ¥37.5B target (FY26). VYLOY China NMPA approval received Q4 FY25; hospital listing campaign commenced in 85 tier-1 hospitals. CNY/JPY FX exposure management: Astellas treasury policy does not hedge CNY as forward market liquidity and basis costs make hedging uneconomical vs. the modest exposure scale. China transfer pricing: Astellas China sales are to a wholly-owned Chinese subsidiary that pays Astellas Japan a royalty/transfer price in CNY, then converts to JPY for group consolidation.',
        },
        {
            quarterLabel: 'Q4 FY25',
            avgRate: 21.1,
            priorYearRate: 20.8,
            hedgedRate: null,
            hedgeCoverage: 0,
            revenueImpact: 0.9,
            operatingImpact: 0.2,
            explanation: 'Q4 FY25 CNY/JPY averaged ¥21.1 vs. ¥20.8 in Q4 FY24 — ¥0.3 appreciation (1.4% YoY). Revenue impact ¥0.9B. Full-year FY25 China FX impact: ¥3.6B revenue translation tailwind — modest relative to USD and EUR but directionally favorable. China segment importance growing: management FY26 guidance incorporates China reaching ¥150B revenue (+48% from ¥101.5B FY25) — at that scale, CNY/JPY FX becomes a more material factor. VBP (volume-based procurement) risk: if XTANDI enters VBP in FY26, negotiated price reduction could offset favorable FX translation. Astellas monitoring NHSA VBP tender announcements closely.',
        },
    ];

    for (const q of cnyJpyQuarters) {
        const periodRecord = allPeriods[q.quarterLabel];
        if (!periodRecord) continue;
        fxRecords.push({
            companyId,
            periodId: periodRecord.id,
            currencyPair: 'CNY/JPY',
            segment: 'China',
            revenueImpact: q.revenueImpact,
            operatingImpact: q.operatingImpact,
            avgRate: q.avgRate,
            priorYearRate: q.priorYearRate,
            hedgedRate: q.hedgedRate,
            hedgeCoverage: q.hedgeCoverage,
            explanation: q.explanation,
        });
    }

    // =========================================================================
    // CURRENCY PAIR 4: GBP/JPY
    // UK market within Established Markets. Modest incremental exposure.
    // XTANDI UK revenue within Established Markets segment.
    // =========================================================================
    const q1fy25 = allPeriods['Q1 FY25'];
    if (q1fy25) {
        fxRecords.push({
            companyId,
            periodId: q1fy25.id,
            currencyPair: 'GBP/JPY',
            segment: 'Established Markets (UK)',
            revenueImpact: 2.8,
            operatingImpact: 0.9,
            avgRate: 192.5,
            priorYearRate: 171.2,
            hedgedRate: 188.0,
            hedgeCoverage: 20,
            explanation: 'Q1 FY25 GBP/JPY averaged ¥192.5 vs. ¥171.2 in Q1 FY24 — a ¥21.3 sterling appreciation (12.4% YoY), highly favorable for UK revenue translation into yen. UK contributes approximately ¥40-45B annually within the Established Markets segment; quarterly UK revenue approximately ¥10-11B. Revenue impact ¥2.8B from GBP/JPY rate differential. GBP/JPY strength reflects both yen depreciation and sterling resilience. UK commercial operations: XTANDI NHS England formulary inclusion; PADCEV UK launch following NICE Technology Appraisal completion expected FY26. UK hedging: 20% of net GBP exposure covered under forward contracts — lower than USD reflecting smaller absolute exposure. IZERVAY UK MHRA review timing: parallel submission with EMA; UK approval expected Q1 FY26.',
        });
    }

    // =========================================================================
    // CURRENCY PAIR 5: EM Basket/JPY
    // International Markets residual: rest-of-world distributor markets.
    // Basket of currencies: BRL, KRW, TWD, AUD, SGD, MXN, other EM.
    // =========================================================================
    const q1fy25b = allPeriods['Q1 FY25'];
    if (q1fy25b) {
        fxRecords.push({
            companyId,
            periodId: q1fy25b.id,
            currencyPair: 'EM Basket/JPY',
            segment: 'International Markets',
            revenueImpact: 1.8,
            operatingImpact: 0.4,
            avgRate: 100.0,           // indexed to 100.0 base (basket index, not a single rate)
            priorYearRate: 95.8,      // prior year basket index value (yen depreciation reflects as higher index)
            hedgedRate: null,
            hedgeCoverage: 0,
            explanation: 'Emerging market basket (International Markets segment) translation impact Q1 FY25: ¥1.8B revenue benefit. International Markets revenue ¥235.0B FY25 (11% of group) spans South Korea, Australia, Canada, Brazil, Taiwan, Southeast Asia, and Middle East. Individual currencies tracked against yen: KRW/JPY and TWD/JPY both reflect yen weakening (favorable); BRL/JPY highly volatile but immaterial at current Brazil revenue scale. No hedging on EM basket — combination of limited forward market liquidity, high hedging costs for EM currencies, and small absolute exposure per currency makes systematic hedging uneconomical. International Markets revenue growth in Q1 FY25 predominantly constant-currency driven: +9.2% constant currency; +14.1% reported yen (translation boost). Key FX sensitivity: Australian dollar largest EM exposure after CNY; AUD/JPY averaged ¥99.8 in Q1 FY25 vs. ¥90.5 Q1 FY24 — favorable. Korea XTANDI revenue growing +22% constant currency with HIRA reimbursement expansion.',
        });
    }

    await prisma.fXImpact.createMany({ data: fxRecords });
    console.log(`  ✓ ${fxRecords.length} FXImpact records seeded for Astellas Pharma (FX is a primary P&L driver — 56% non-Japan revenue)`);
}
