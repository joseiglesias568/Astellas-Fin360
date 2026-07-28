// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/market.ts
//
// Provenance Legend:
// [CITED:AR-FY25]     — Astellas Pharma FY2025 Annual Report / Financial Results (May 2025)
// [CITED:IR-FY25]     — Astellas FY2025 Earnings Call / IR Presentation (May 9, 2025)
// [CITED:GD-FY26]     — Astellas FY2026 Guidance (May 2025 disclosure)
// [DERIVED]           — Computed from cited values
// [ASSUMED]           — Informed estimate; not in any single source
// [CONFIG-ONLY]       — UI/engine parameter, not a business datum
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma FY2025 Annual Report, IR slides, and earnings call (May 9, 2025).
// Competitor data from public filings, EvaluatePharma, and IQVIA market reports (2025).
// Market size based on IQVIA Global Oncology Trends 2025 report (~$285B global oncology spend).
// All Astellas revenues in billions JPY (¥B). Competitor revenues in billions USD ($B).
// FX reference rate: ~150 JPY/USD (FY2025 average).
// ─────────────────────────────────────────────────────────────────────
import { MarketConfig } from '../../types';

export const market: MarketConfig = {
  // Global oncology pharmaceutical market (~$285B USD in 2025)
  // Astellas oncology revenue: XTANDI+PADCEV+XOSPATA+VYLOY ≈ ¥1,316.9B ≈ $8.8B USD
  // Astellas oncology market share: ~3.1% of global oncology pharma [DERIVED]
  totalMarketSize: '~$285B global oncology pharma market (2025E); ~$1.6T total global pharmaceutical market',
  companyMarketShare: 3.1,             // Astellas oncology revenue ~$8.8B / ~$285B global oncology [DERIVED]
  marketShareTarget: 3.8,             // FY2027 target as Strategic Brands ramp [ASSUMED]
  marketShareYoY: 0.4,                // Gained ~0.4pp share in FY2025 on PADCEV/VYLOY growth [DERIVED]
  segmentGrowth: 12.0,                // Global oncology pharma CAGR 2024-2025 (IQVIA est.) [ASSUMED]

  competitors: [
    {
      // Merck & Co. / MSD (NYSE: MRK) — FY2025 oncology revenue ~$25B; Keytruda alone ~$25B
      name: 'Merck & Co. / MSD (MRK) — Keytruda, Welireg, Lynparza',
      marketShare: 8.8,               // ~$25B Keytruda-led oncology / $285B global oncology [ASSUMED]
      yoyChange: 0.9,                 // Keytruda growing ~18% YoY in FY2025 [ASSUMED]
      strengths: [
        'Keytruda (pembrolizumab) is the world\'s best-selling oncology drug (~$25B revenue), generating 46% of Merck total revenue — dominant IO checkpoint inhibitor franchise across 20+ tumor types',
        'XTANDI (enzalutamide) co-development partnership with Pfizer for urothelial carcinoma (EV-302 trial combines PADCEV + pembro) creates a competitive dynamic AND collaborative dynamic with Astellas\'s PADCEV',
        'Lynparza (olaparib) co-developed with AstraZeneca; Welireg (belzutifan) for RCC represent targeted therapy depth beyond Keytruda IO',
        'MSD\'s manufacturing scale, US commercial infrastructure (10,000+ oncology sales force), and payer contracting strength make it the benchmark competitor in oncology',
        'Keytruda patent cliff arriving 2028-2032 creates strategic vulnerability — biosimilar competition will materially erode revenues; Merck pipeline (MK-6240, subcutaneous Keytruda) is primary mitigation',
        'Weakness: Keytruda concentration risk (~46% of total revenue); limited ophthalmology and urology exposure compared to Astellas\'s diversified specialty portfolio',
      ],
    },
    {
      // Bristol-Myers Squibb (NYSE: BMY) — FY2025 oncology ~$18B; Opdivo, Revlimid, Breyanzi
      name: 'Bristol-Myers Squibb (BMY) — Opdivo, Revlimid, Breyanzi, Reblozyl',
      marketShare: 6.3,               // ~$18B oncology revenues [ASSUMED]
      yoyChange: -0.3,                // Revlimid patent expiry creating headwinds [ASSUMED]
      strengths: [
        'Opdivo (nivolumab) IO franchise with strong data across NSCLC, RCC, ESCC, and HCC — broad indication coverage; Opdivo+Yervoy combination remains standard of care in multiple settings',
        'CAR-T portfolio (Breyanzi, Abecma) and Reblozyl hematology franchise provide diversification beyond solid tumor IO — directly competes with XOSPATA in AML/MDS adjacent space',
        'Cell therapy platform (Juno Therapeutics acquisition) gives BMS a first-mover position in commercially scaling CAR-T manufacturing — long-term differentiated capability',
        'Revlimid (lenalidomide) generics erosion creates near-term revenue headwinds (~$7B → declining), partially offset by Opdivo label expansions and new product approvals',
        'Weakness: Loss of Revlimid exclusivity significantly pressures BMS revenue base; reliance on IO alone (vs Astellas\'s multi-modality approach with ADCs, NK3R, and targeted small molecules) creates portfolio gap',
        'BMS does not compete in urology/nephrology or ophthalmology — areas where Astellas has structural advantages with XTANDI, PADCEV, and IZERVAY',
      ],
    },
    {
      // AstraZeneca (NYSE: AZN) — FY2025 oncology ~$19B; Tagrisso, Calquence, Lynparza, Enhertu
      name: 'AstraZeneca (AZN) — Tagrisso, Calquence, Lynparza, Enhertu',
      marketShare: 6.7,               // ~$19B oncology revenues [ASSUMED]
      yoyChange: 1.1,                 // Fastest-growing major oncology competitor [ASSUMED]
      strengths: [
        'Tagrisso (osimertinib) is the global standard of care for EGFR-mutated NSCLC (~$6.5B) and continues to expand into adjuvant and first-line settings — strongest single-indication product outside of Keytruda',
        'Enhertu (trastuzumab deruxtecan) ADC co-developed with Daiichi Sankyo is the most competitive ADC vs Astellas\'s PADCEV in solid tumors — broad HER2-low/ultralow approvals create a differentiated platform',
        'Lynparza (olaparib) PARP inhibitor + BRCA franchise: strong in ovarian, breast, prostate cancer (prostate CA overlaps with Astellas\'s XTANDI territory)',
        'AZ oncology pipeline is deepest among global pharma: >100 programs, including bispecific antibodies, ADCs, and cell therapies — poses the most credible long-term competitive threat to Astellas\'s pipeline-driven strategy',
        'Weakness: AZ does not compete in urology/nephrology standalone products or ophthalmology; XTANDI competition in CRPC is primarily from Erleada (J&J), not AZ direct products',
        'Enhertu ADC directly competes with PADCEV in the ADC modality, but urothelial carcinoma (PADCEV target) and solid tumor HER2 (Enhertu target) have limited patient overlap currently',
      ],
    },
    {
      // Johnson & Johnson / Janssen (NYSE: JNJ) — FY2025 oncology ~$17B; Darzalex, Erleada, Rybrevant
      name: 'Johnson & Johnson / Janssen (JNJ) — Darzalex, Erleada, Carvykti, Rybrevant',
      marketShare: 6.0,               // ~$17B oncology revenues [ASSUMED]
      yoyChange: 0.6,                 // Darzalex + Carvykti driving growth [ASSUMED]
      strengths: [
        'Erleada (apalutamide) is the most direct XTANDI competitor in prostate cancer (non-metastatic CRPC, mCSPC) — competes for the same urologist prescriber base; Erleada growing faster (~+15% YoY) than XTANDI in nmCRPC setting',
        'Darzalex (daratumumab) is the leading CD38 antibody in multiple myeloma (~$10B+ revenue) — demonstrates J&J\'s ability to build blockbuster specialty oncology franchises comparable to XTANDI\'s scale',
        'Carvykti (CAR-T for MM) and Tecvayli (bispecific) represent J&J\'s cell therapy and bispecific strategy — differentiated from Astellas\'s ADC-focused modality',
        'J&J global commercial infrastructure (medical device + pharma integration) and payer relationships create a powerful co-promotion and contracting advantage in hospital oncology settings',
        'Rybrevant (amivantamab) EGFR/MET bispecific for NSCLC represents J&J\'s bispecific platform — competing with AZ\'s Tagrisso in the same patient population',
        'Weakness: J&J does not compete in ophthalmology (IZERVAY/GA) or women\'s health (VEOZAH/menopause) — Astellas maintains differentiated positioning in these specialty areas',
      ],
    },
    {
      // Novartis (NYSE: NVS) — FY2025 oncology ~$15B; Kisqali, Scemblix, Lutathera, Kymriah
      name: 'Novartis (NVS) — Kisqali, Scemblix, Lutathera, Kymriah',
      marketShare: 5.3,               // ~$15B oncology revenues [ASSUMED]
      yoyChange: 0.4,                 // Kisqali HR+ breast cancer + Scemblix growth [ASSUMED]
      strengths: [
        'Kisqali (ribociclib) CDK4/6 inhibitor for HR+/HER2- breast cancer directly competes in the precision oncology space — demonstrates Novartis\'s capability to build targeted therapy blockbusters in defined biomarker-selected populations (comparable to Astellas\'s VYLOY Claudin 18.2 strategy)',
        'Scemblix (asciminib) STAMP inhibitor for CML provides a blueprint for next-generation targeted therapies in hematology — competes adjacently with XOSPATA AML focus in the broader leukemia space',
        'Lutathera (lutetium-177 DOTATATE) radioligand therapy and Pluvicto (lutetium PSMA-617 for prostate CA) represent Novartis\'s radioligand therapy (RLT) platform — novel modality competing in prostate cancer, directly threatening XTANDI\'s position in post-androgen therapy settings',
        'Kymriah CAR-T and Novartis\'s gene therapy pipeline (Zolgensma) demonstrate platform breadth across modalities — Novartis is the most diversified by treatment modality of Astellas\'s major competitors',
        'Weakness: Novartis exited immunology and cardiovascular to focus on oncology — creating execution concentration risk; RLT platform infrastructure requires specialized nuclear medicine centers limiting initial reach',
        'Pluvicto/PSMA-617 for CRPC is the most direct threat to XTANDI in the prostate cancer sequence — patients progressing on XTANDI may receive Pluvicto next; Astellas and Novartis are competing for the same post-docetaxel CRPC patient population',
      ],
    },
    {
      // Pfizer (NYSE: PFE) — XTANDI co-promotion partner AND competitor in oncology
      name: 'Pfizer (PFE) — XTANDI partner, Ibrance, Talzenna, Braftovi, Lorbrena',
      marketShare: 4.6,               // ~$13B oncology revenues (excluding XTANDI) [ASSUMED]
      yoyChange: -0.2,                // Ibrance declining; Pfizer oncology headwinds [ASSUMED]
      strengths: [
        'XTANDI co-promotion partner in the United States — Pfizer and Astellas jointly promote XTANDI to US urologists and oncologists, sharing commercial costs and revenues; this partnership is Astellas\'s most important commercial relationship globally',
        'Ibrance (palbociclib) CDK4/6 inhibitor for HR+/HER2- breast cancer faces biosimilar risk in 2027-2028 as Kisqali (Novartis) and Verzenio (AZ/Lilly) erode the category; Pfizer oncology revenues under structural pressure',
        'PADCEV co-development: Pfizer and Astellas co-develop and co-commercialize PADCEV globally — the partner relationship spans two major products (XTANDI, PADCEV), creating deep operational interdependencies',
        'Lorbrena (lorlatinib) ALK inhibitor for NSCLC and Braftovi (binimetinib/encorafenib) BRAF-targeted therapies give Pfizer solid tumor depth in NSCLC and melanoma — not overlapping with Astellas\'s primary indications',
        'Pfizer\'s global manufacturing scale, cold-chain distribution, and ADC manufacturing capability (Seagen acquisition 2023) creates long-term strategic alignment with PADCEV ADC platform needs',
        'Weakness: Pfizer\'s oncology business faces near-term headwinds from Ibrance exclusivity loss and COVID portfolio normalization; $43B Seagen acquisition creating integration complexity and leverage; post-merger execution distraction is a near-term risk to PADCEV co-commercialization focus',
      ],
    },
  ],

  marketDrivers: [
    'Global oncology drug market expanding at ~12% CAGR driven by aging demographics (65+ population growth in US, EU, Japan), improved cancer diagnosis rates, and expansion of precision medicine/biomarker-guided therapy selection — structural tailwind for Astellas\'s oncology-focused portfolio',
    'ADC (antibody-drug conjugate) platform proliferation: ADCs are the fastest-growing oncology modality (~40% category CAGR), directly benefiting PADCEV with expanding approvals across bladder, breast, and other solid tumor indications; ADC manufacturing capability becoming a strategic asset',
    'Companion diagnostic (CDx) ecosystem maturation enabling biomarker-selected patient populations — VYLOY (Claudin 18.2), XOSPATA (FLT3), and PADCEV (Nectin-4 IHC) all leverage CDx-driven precision prescribing; expanding CDx adoption directly expands addressable patient pools',
    'Geographic atrophy (GA) and dry AMD treatment market creation: IZERVAY and Syfovre are the first approved GA treatments, building a new ~$2-3B addressable market from near-zero — Astellas is a category-creator in ophthalmology with structural first-mover positioning',
    'Japan home-market gastric cancer incidence advantage for VYLOY: Japan has the world\'s highest gastric cancer rates (~40,000 new cases/year) with high Claudin 18.2 positivity, providing Astellas a structurally favorable launch environment for its newest blockbuster candidate',
    'Women\'s health unmet need in non-hormonal menopause therapy: VEOZAH (fezolinetant) addresses ~1.3M US patients seeking non-HRT vasomotor symptom treatment; market is underpenetrated with limited branded competition and growing awareness of hormonal therapy risk concerns',
  ],

  marketChallenges: [
    'XTANDI (enzalutamide) competitive intensity in CRPC/mCSPC: Erleada (J&J/Janssen apalutamide) growing faster in nmCRPC setting; Nubeqa (Bayer darolutamide) gaining share in mCSPC; Pluvicto (Novartis radioligand) creating a new treatment option post-XTANDI — requiring Astellas to demonstrate XTANDI\'s continued first-line value and defend share against next-generation competitors',
    'XTANDI royalty and patent structure: US and ex-US royalty agreements with UCLA/Medivation legacy create an earnings headwind from FY2026 as certain exclusivity provisions normalize, estimated ~¥50B revenue reduction in FY2026 guidance; mitigation requires accelerating Strategic Brands to offset',
    'R&D productivity and pipeline risk: 3 POC achievements in FY2025 is strong, but pharmaceutical R&D attrition rates remain high (~90% failure from Phase 1 to approval); Astellas\'s concentrated therapy area strategy creates binary risk — a major Phase 3 failure in oncology or ophthalmology would disproportionately impact pipeline value',
    'FX sensitivity: ~60% of Astellas revenues are denominated in USD and EUR; ongoing JPY depreciation has been a tailwind in FY2024-FY2025 but creates exposure if JPY strengthens; every ¥1 change in USD/JPY impacts Core OP by ~¥3-4B [ASSUMED]',
    'Drug pricing and reimbursement pressure: US IRA (Inflation Reduction Act) drug price negotiation creates long-term pricing risk for mature blockbusters; XTANDI may be eligible for CMS price negotiation in 2026-2027 if Medicare Part D volumes qualify — a ¥20-40B potential annual revenue risk [ASSUMED]',
    'ADC manufacturing complexity and capacity: PADCEV as an ADC requires specialized conjugation manufacturing; global ADC capacity constraints (shared industry infrastructure) could limit Astellas\'s ability to scale PADCEV supply as demand increases; Pfizer\'s Seagen acquisition may create internal capacity conflicts',
  ],

  regionalBreakdown: [
    {
      region: 'United States',
      revenue: 940.2,                  // FY2025 ¥940.2B (+8.1% est.) [CITED:AR-FY25]
      growth: 8.1,                     // est. YoY growth rate [DERIVED]
      keyInsight: 'US is 44% of Astellas total revenue — the primary commercial engine driven by XTANDI (Pfizer co-promotion), PADCEV (urothelial carcinoma), VEOZAH (women\'s health), and IZERVAY (geographic atrophy). FY2026 US dynamics: XTANDI ~flat, PADCEV first-line expansion, VYLOY US gastric cancer uptake. IRA drug pricing legislation monitoring for eligibility thresholds.',
    },
    {
      region: 'Established Markets (EU + Canada)',
      revenue: 563.6,                  // FY2025 ¥563.6B (+15.0% est.) [CITED:AR-FY25]
      growth: 15.0,                    // est. YoY growth rate [DERIVED]
      keyInsight: 'EU and Canada representing 26% of revenue, growing fastest among core geographies. PADCEV EMA approval in all urothelial carcinoma lines is the primary driver. XTANDI EU volume stable. VYLOY EU approval in progress. European market access (HTA processes across major EU5) is a key execution priority — Germany, France, UK, Italy, Spain each require separate reimbursement negotiations.',
    },
    {
      region: 'Japan (Home Market)',
      revenue: 289.0,                  // FY2025 ¥289.0B (+7.0% est.) [CITED:AR-FY25]
      growth: 7.0,                     // est. YoY growth rate [DERIVED]
      keyInsight: 'Japan at 13.5% of revenue — Astellas\'s home market with strong institutional relationships and government payer access. VYLOY Japan launch is the primary FY2026 growth driver (Japan has highest gastric cancer incidence globally). XTANDI Japan stable. XOSPATA Japan approval provides hematology revenue. NHI drug pricing revision cycle (every 2 years) creates pricing risk for mature products; XTANDI subject to price revision in FY2026.',
    },
    {
      region: 'International Markets (Emerging Economies)',
      revenue: 230.7,                  // FY2025 ¥230.7B (+22.0% est.) [CITED:AR-FY25]
      growth: 22.0,                    // est. YoY growth rate [DERIVED]
      keyInsight: 'International Markets (Southeast Asia, Latin America, Middle East) at 10.8% of revenue, fastest YoY growth rate. XTANDI and PADCEV expanding to markets with improving oncology access infrastructure. Astellas\'s international growth strategy relies on strategic partnerships and distributors in markets without direct commercial presence. Favorable demographic trends (aging populations, increasing cancer incidence) across Southeast Asia and Middle East are structural drivers.',
    },
    {
      region: 'China',
      revenue: 101.5,                  // FY2025 ¥101.5B (+19.0% est.) [CITED:AR-FY25]
      growth: 19.0,                    // est. YoY growth rate [DERIVED]
      keyInsight: 'China at 4.7% of revenue with strong growth trajectory. VYLOY is the primary FY2026 growth catalyst — China has the world\'s highest absolute gastric cancer incidence with significant Claudin 18.2 positivity rates. XTANDI China approved through local partner arrangement. China\'s National Reimbursement Drug List (NRDL) inclusion is critical for volume scaling; VYLOY NRDL negotiation is an FY2026 priority. Volume-based procurement (VBP) risk to mature products mitigated by Astellas\'s relatively modest China revenue base.',
    },
  ],
};
