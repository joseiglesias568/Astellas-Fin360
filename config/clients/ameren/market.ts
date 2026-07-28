// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/market.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Q1 FY2026 earnings call, IR slides, and FY2025 Annual Report.
// Peer data from public filings and AlphaSense research (July 2026).
// Market focuses on oncology (prostate cancer, bladder cancer) and women's health.
// ─────────────────────────────────────────────────────────────────────
import { MarketConfig } from '../../types';

export const market: MarketConfig = {
  totalMarketSize: '~$250B global oncology market (2026E); prostate cancer ~$16B; bladder cancer ~$8B; VMS ~$3B',
  companyMarketShare: 4.2,              // Astellas ~$8B revenue / ~$190B addressable oncology+urology market [ASSUMED]
  marketShareTarget: 4.8,
  marketShareYoY: 0.3,
  segmentGrowth: 3.1,                   // Q1 FY2026 revenue growth rate [DERIVED]

  competitors: [
    {
      name: 'AstraZeneca (AZN)',
      marketShare: 8.5,                // AZN oncology leader by portfolio breadth [ASSUMED]
      yoyChange: 0.8,
      strengths: [
        'Lynparza (olaparib) and Calquence — broad hematology and solid tumor oncology franchise',
        'Tagrisso (osimertinib) — global lung cancer leader; strongest single-product oncology franchise',
        'AstraZeneca-Daiichi collaboration (Enhertu, DS-8201) — HER2-targeted ADC competing with Astellas PADCEV technology',
        'Imfinzi and Durvalumab — IO backbone competing in bladder and lung cancer',
        'Scale advantage: >$15B annual oncology revenues with broader pipeline than Astellas',
      ],
    },
    {
      name: 'Johnson & Johnson / Janssen (JNJ)',
      marketShare: 7.8,
      yoyChange: 0.2,
      strengths: [
        'Erleada (apalutamide) — most direct XTANDI competitor in nmCRPC and mCSPC prostate cancer',
        'Darolutamide (Nubeqa, co-dev with Bayer) gaining mCSPC label; direct head-to-head vs XTANDI',
        'Zytiga (abiraterone) legacy in mCRPC; generic erosion but still defending institutional accounts',
        'Carvykti (CAR-T) in multiple myeloma; J&J oncology pipeline breadth creates cross-selling leverage',
        'Largest pharma sales force globally — commercial resources to defend prostate cancer market share',
      ],
    },
    {
      name: 'Pfizer (PFE)',
      marketShare: 6.5,
      yoyChange: 0.1,
      strengths: [
        'Co-commercialization partner for both XTANDI and PADCEV — competitive risk if partnership terms change',
        'Ibrance (palbociclib) — CDK4/6 breast cancer leader demonstrates ability to build blockbuster oncology franchises',
        'Xtandi collaboration generates significant royalty/co-promotion revenue for Pfizer',
        'Large oncology pipeline post-Seagen acquisition — PADCEV competing with Pfizer-owned Tukysa ADCs',
        'Pfizer commercial muscle in hematology could be redirected toward competing in urothelial carcinoma',
      ],
    },
    {
      name: 'Merck (MSD) / Pembrolizumab (Keytruda)',
      marketShare: 9.2,
      yoyChange: 1.2,
      strengths: [
        'Keytruda (pembrolizumab) — world\'s best-selling drug; combination partner with PADCEV (KEYNOTE-869)',
        'Keytruda biosimilar risk post-2028 patent expiry could reduce IO backbone value of PADCEV+pembro combination',
        'MSD developing competing ADCs; future IO+ADC combinations could reduce PADCEV+pembro differentiation',
        'Keytruda co-commercialization gives MSD data visibility into PADCEV patient outcomes',
        'Merck investing in IL-6, VEGF, and other IO combinations that could supplant PADCEV+pembro regimen',
      ],
    },
    {
      name: 'Novartis (NVS)',
      marketShare: 5.8,
      yoyChange: 0.4,
      strengths: [
        'Lutathera and Pluvicto (PSMA-targeted radioligand therapy) — disruptive in prostate cancer; competes with XTANDI in late-line mCRPC',
        'Kisqali (ribociclib) competes in breast cancer; Novartis oncology platform breadth growing',
        'Cosentyx and immunology portfolio generates cash to fund oncology pipeline build',
        'Sandoz biosimilars business — generics capability could pressure Astellas transplantation franchise',
        'Strong global regulatory presence and market access teams; particularly strong in EU HTA processes',
      ],
    },
  ],

  forwardOutlook: [
    {
      period: 'Q2 FY2026',
      revenueGrowth: 3.5,
      marginExpansion: 0.3,
      keyDrivers: [
        'XTANDI: pre-IRA volume growth; CMS price effective Sept 2026 — Q2 not yet impacted',
        'PADCEV: continued 1L bladder cancer uptake in U.S. and EU reimbursement expansion',
        'VEOZAH: summer script growth; DTC awareness campaign summer launch',
        'SMT: Q2 savings ramping; procurement wins flowing through COGS',
        'FX: USD/JPY monitoring — ¥2.1B Core OP per ¥1 move',
      ],
    },
    {
      period: 'H2 FY2026',
      revenueGrowth: 2.8,
      marginExpansion: 0.2,
      keyDrivers: [
        'XTANDI IRA CMS price effective September 2026 — H2 impact begins',
        'VYLOY (zolbetuximab) gastric cancer launch ramp in H2 FY2026',
        'PADCEV EU country-by-country reimbursement decisions expected H2',
        'SMT H2 savings heavier-weighted in annual plan; manufacturing efficiency gains',
        'IZERVAY ophthalmology growth in geographic atrophy indication',
      ],
    },
    {
      period: 'FY2027',
      revenueGrowth: 4.5,
      marginExpansion: 0.8,
      keyDrivers: [
        'Full-year IRA XTANDI price impact — volume growth required to offset',
        'PADCEV global peak sales approaching as EU reimbursement fully penetrates',
        'VEOZAH Japan launch (if NDA approved FY2026) adds ¥15–25B incremental revenue',
        'SMT cumulative savings ¥65B target — margin expansion to 27.5%+',
        'VYLOY gastric cancer global launch scaling across markets',
      ],
    },
    {
      period: 'FY2028 Target',
      revenueGrowth: 5.0,
      marginExpansion: 1.2,
      keyDrivers: [
        'Core OP margin target 28%+ from sustained SMT and operating leverage',
        'Pipeline: next-generation oncology assets entering Phase 3 (XTANDI follow-on, new ADCs)',
        'Keytruda biosimilar entry post-2028 — reassessment of PADCEV+pembro combination dynamics',
        'VEOZAH international launch in EU and Japan contributing to women\'s health segment',
        'BD/licensing strategy: Astellas ¥400B+ FCF enabling strategic pipeline acquisitions',
      ],
    },
  ],

  volumeTrends: [
    {
      period: 'Q1 FY2025',
      revenue: 536.3,
      volume: 145.8,                   // XTANDI+PADCEV combined revenue ¥B as volume proxy [INTERPOLATED]
      averageRevenue: 63,              // Core EPS [INTERPOLATED]
    },
    {
      period: 'Q2 FY2025',
      revenue: 529.8,
      volume: 148.3,
      averageRevenue: 59,
    },
    {
      period: 'Q3 FY2025',
      revenue: 532.4,
      volume: 150.1,
      averageRevenue: 58,
    },
    {
      period: 'Q4 FY2025',
      revenue: 540.7,
      volume: 152.8,
      averageRevenue: 57,
    },
    {
      period: 'Q1 FY2026',
      revenue: 552.8,
      volume: 211.7,                   // XTANDI ¥146.5B + PADCEV ¥65.2B [DERIVED]
      averageRevenue: 67,              // Core EPS [CITED:EC-Q1-FY26]
    },
  ],
};
