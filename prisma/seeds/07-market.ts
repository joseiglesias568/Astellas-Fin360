import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Market Data, Competitors, and Regional Breakdown
//
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Full-Year Results (May 2026),
// FY2025 Annual Report, EvaluatePharma global oncology market data,
// and competitor public filings (MRK, AZN, JNJ, BMY, NVS, PFE).
// Regional breakdown maps to Astellas management reporting structure:
// United States, Established Markets (EU/Canada/ANZ), Japan,
// International Markets (ROW), and China (separate reporting from FY2024).
// =============================================================================

export async function seedMarket(prisma: PrismaClient, companyId: number) {
  await prisma.marketData.create({
    data: {
      companyId,
      totalMarketSize: '~$285B Global Oncology Pharmaceuticals Market (2025, EvaluatePharma)',
      companyMarketShare: 3.1,
      marketShareTarget: 3.5,
      marketShareYoY: 0.3,
      segmentGrowth: 8.5,
      marketDrivers: [
        'Global Oncology Market Growth ~9% CAGR 2025–2030 (immuno-oncology + ADC expansion)',
        'Prostate Cancer ARSi Market — XTANDI, Erleada, Nubeqa three-product maturation',
        'Gastric/GEJ Cancer — CLDN18.2 and HER2 targeted therapy adoption (VYLOY)',
        'Antibody-Drug Conjugate (ADC) Platform Growth — PADCEV EV-302 earlier lines',
        'Geographic Atrophy — First-category ophthalmic drugs (IZERVAY)',
        'China Oncology Market Expansion — NRDL volume deepening for XTANDI + VYLOY',
        'IRA-Driven US Portfolio Restructuring — Specialty pharma focus on novel mechanisms',
        'Biomarker-Driven Patient Selection — CLDN18.2, Nectin-4 testing adoption enabling targeted launches',
      ],
      marketChallenges: [
        'XTANDI IRA CMS Price Negotiation — MFP publication risk FY2026, effective FY2028',
        'ARSi Market Maturity — Three-way competition (XTANDI vs Erleada vs Nubeqa) limiting share gains',
        'FX Headwind — Yen strengthening from ¥153 to ¥140 range compresses reported revenue',
        'VYLOY Launch Biomarker Adoption — CLDN18.2 testing infrastructure required at point of diagnosis',
        'Phase 3 Binary Risk — Multiple simultaneous trials following FY2025 POC successes',
        'SMT ¥40B Delivery Complexity — Manufacturing rationalisation and portfolio exits create execution risk',
        'Geographic Atrophy Market Penetration — Under-5% diagnosed patients treated; category still nascent',
        'China NRDL Price Reduction Risk — Annual renegotiation cycle compresses per-unit economics',
      ],
    },
  });

  console.log('Seeded market data');

  await prisma.competitor.createMany({
    data: [
      {
        companyId,
        name: 'Merck & Co. / MSD (MRK)',
        marketShare: 12.4,
        yoyChange: 0.8,
        strengths: [
          'Keytruda (pembrolizumab) — best-selling oncology drug globally (~$25B+ annual revenue)',
          'Broad PD-1/PD-L1 label across 30+ indications; backbone of combination regimens',
          'Keytruda + PADCEV (EV-103/302) combination competes with Astellas PADCEV in bladder cancer',
          'MSD-Astellas XTANDI co-promotion partnership in ex-US markets (Japan, Europe)',
          'Pipeline depth in ADC and bispecific antibodies for next-generation oncology leadership',
        ],
      },
      {
        companyId,
        name: 'AstraZeneca (AZN)',
        marketShare: 9.8,
        yoyChange: 1.2,
        strengths: [
          'Tagrisso (osimertinib) — EGFR-mutant NSCLC leader; ¥700B+ peak sales trajectory',
          'Enhertu (trastuzumab deruxtecan) — ADC with pan-tumour HER2-low activity; direct PADCEV ADC competitor',
          'Calquence (acalabrutinib) — BTK inhibitor in haematology; competes in adjacent haem-oncology',
          'Largest oncology pipeline by Phase 3 asset count among global pharma peers',
          'Strong China oncology franchise; benefits from same NRDL access Astellas seeks for VYLOY',
        ],
      },
      {
        companyId,
        name: 'Johnson & Johnson (JNJ)',
        marketShare: 8.3,
        yoyChange: 0.2,
        strengths: [
          'Erleada (apalutamide) — direct ARSi competitor to XTANDI in nmCRPC and mCSPC',
          'Darzalex (daratumumab) — multiple myeloma leader; J&J oncology revenue ~$17B+',
          'Rybrevant (amivantamab) + lazertinib EGFR bispecific — next-generation lung cancer',
          'Superior US commercial infrastructure for oncology vs Astellas standalone (Astellas co-promotes with Pfizer)',
          'Erleada aggressive managed care formulary positioning; gaining share in prostate cancer market',
        ],
      },
      {
        companyId,
        name: 'Bristol-Myers Squibb (BMY)',
        marketShare: 7.6,
        yoyChange: -0.3,
        strengths: [
          'Opdivo (nivolumab) — PD-1 inhibitor; broad oncology presence including gastric cancer (CHECKMATE trials)',
          'Opdivo direct competitor to VYLOY in gastric cancer first-line combination regimens',
          'Revlimid biosimilar transition managing; haematology franchise stabilising',
          'Eliquis (apixaban) cash flow funds oncology R&D investment',
          'CAR-T franchise (Breyanzi, Abecma) for haematologic malignancies',
        ],
      },
      {
        companyId,
        name: 'Novartis (NVS)',
        marketShare: 6.9,
        yoyChange: 0.1,
        strengths: [
          'Kisqali (ribociclib) — CDK4/6 inhibitor; breast cancer leader competing in adjacent oncology',
          'Radioligand therapy (RLT) platform — Pluvicto (lutetium PSMA) in prostate cancer; competes with XTANDI in late-line mCRPC',
          'Pluvicto in PSMA-positive mCRPC is an emerging competitor to XTANDI in treatment-refractory patients',
          'Strong European oncology market access and reimbursement infrastructure',
          'Cosentyx (secukinumab) immunology cash flow supports oncology pipeline investment',
        ],
      },
      {
        companyId,
        name: 'Pfizer (PFE)',
        marketShare: 5.2,
        yoyChange: -0.1,
        strengths: [
          'Co-promotion partner with Astellas on PADCEV (enfortumab vedotin) globally',
          'Ibrance (palbociclib) CDK4/6 inhibitor; breast cancer — adjacent oncology portfolio',
          'Xtandi US co-promotion legacy knowledge: Pfizer previously co-promoted XTANDI in US',
          'Largest global pharmaceutical commercial infrastructure — partnership provides Astellas distribution scale',
          'ADC and bispecific pipeline (post-Seagen acquisition) creates potential future PADCEV competition',
        ],
      },
    ],
  });

  console.log('Seeded 6 competitors');

  // Astellas regional breakdown matches FY2025 management reporting.
  // Revenue in ¥M from FY2025 Annual Report segment disclosures.
  await prisma.regionalBreakdown.createMany({
    data: [
      {
        companyId,
        region: 'United States',
        revenue: 940200,
        growth: 8.2,
        keyInsight:
          'Largest region at ¥940.2B (~44% of group revenue). Growth driven primarily by XTANDI US (+mid-single-digit volume), PADCEV (co-promoted with Pfizer, urothelial carcinoma), and IZERVAY (geographic atrophy launch ramp). XTANDI US faces IRA price negotiation risk from FY2028 (CMS Cycle 2 MFP effective date), creating urgency to diversify the US revenue mix toward PADCEV and IZERVAY. US Strategic Brands (VYLOY, PADCEV, IZERVAY) are the primary FY2026–27 growth drivers. VYLOY US launch in gastric/GEJ cancer began in FY2025 with CLDN18.2 biomarker testing adoption as the key ramp variable.',
      },
      {
        companyId,
        region: 'Established Markets',
        revenue: 563600,
        growth: 4.1,
        keyInsight:
          'EU, Canada, Australia, and New Zealand at ¥563.6B (~26% of group revenue). XTANDI is established in prostate cancer with stable share. VYLOY EU approval and reimbursement negotiation is the primary FY2026 growth driver — European HTA bodies (NICE, IQWiG, HAS) are evaluating CLDN18.2 biomarker-positive gastric cancer indication. PADCEV EU launch gaining traction post-EMA approval. European FX (EUR/JPY) is a secondary exposure after USD/JPY. Established Markets reflect mature oncology market dynamics — moderate volume growth and price pressure from HTA-driven reimbursement controls.',
      },
      {
        companyId,
        region: 'Japan',
        revenue: 289000,
        growth: 2.3,
        keyInsight:
          'Home market at ¥289.0B (~14% of group revenue). Japan revenue growth is modest (+2.3%) reflecting NHI price revisions (Japan biannual price revision system applies mandatory cuts every April/October) and XTANDI market maturity. VYLOY Japan approval and NHI listing in FY2025 is a positive catalyst; Japan has the highest gastric cancer incidence globally per capita. PADCEV Japan approval progressing. SMT savings in Japan SG&A infrastructure are disproportionately large given the historical Japan-centric organisational model. Japan accounts for a significant share of Astellas\' R&D investment given the regulatory pathway efficiency for Japan-first POC programmes.',
      },
      {
        companyId,
        region: 'International Markets',
        revenue: 230700,
        growth: 5.8,
        keyInsight:
          'Rest of world (ex-US, ex-EU major, ex-Japan, ex-China) at ¥230.7B (~11% of group revenue). Includes Latin America, Middle East, South/Southeast Asia, and Africa. XTANDI is available in most IM markets via licensing and generic partnerships where patent protection has lapsed. Strategic Brands penetration in IM is nascent — VYLOY and PADCEV market access is being pursued sequentially post-major-market approvals. SMT programme includes rationalisation of lower-priority IM distributor relationships to focus resources on markets with >¥10B revenue potential. Growth reflects emerging market volume expansion in prostate cancer treatment rates.',
      },
      {
        companyId,
        region: 'China',
        revenue: 101500,
        growth: 29.6,
        keyInsight:
          'Fastest-growing region at ¥101.5B (+29.6% YoY), now reported separately since FY2024 given its strategic importance. XTANDI China growth is driven by NRDL volume deepening — prostate cancer is significantly under-diagnosed in China relative to actual incidence, and NHI coverage expansion is bringing XTANDI to lower-tier city urology practices. VYLOY China launch is the FY2026–27 priority: gastric cancer is the most prevalent cancer in China by incidence (~500K new cases/year), and CLDN18.2 biomarker positivity rates in Chinese gastric cancer patients are comparable to global data. FY2026 China target: ¥130B+ (~+28% YoY). China is the single most important emerging market for Astellas\' Strategic Brands strategy and provides meaningful IRA offset given independent China pricing dynamics.',
      },
    ],
  });

  console.log('Seeded 5 regional breakdowns');
}
