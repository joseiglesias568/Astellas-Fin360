import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed RegionalPerformance: 5 Astellas Pharma geographic segments x all quarters
// Astellas geographic breakdown (FY2025 full-year contribution):
//   1. United States (~44%)
//      — XTANDI, PADCEV, IZERVAY, VEOZAH, XOSPATA; highest ASP; IRA monitoring
//   2. Established Markets (~26%)
//      — EU, Canada, Australia; XTANDI+PADCEV+VYLOY; national payer pricing
//   3. Japan (~14%)
//      — Home market; NHI biennial pricing; XTANDI, PADCEV, XOSPATA; SMT MR reductions
//   4. International Markets (~11%)
//      — 40+ expansion markets; EM market access programs; XTANDI+PADCEV growth
//   5. China (~5%)
//      — Fastest growing; VYLOY NMPA approval FY24; NRDL negotiated pricing
// Astellas fiscal year: Q1=Apr-Jun, Q2=Jul-Sep, Q3=Oct-Dec, Q4=Jan-Mar
// Revenue in ¥M (millions of yen)
// Field semantic remapping vs original CVS schema:
//   storeCount        → active product count in segment (approved + reimbursed products)
//   compStoreSales    → XTANDI YoY revenue growth % (segment level)
//   compTransactions  → PADCEV YoY revenue growth % (segment level)
//   averageTicket     → avg revenue per patient treatment-month (¥k)
//   rewardsMemberPct  → patient assistance/access program enrollment % of treated patients
//   mobileOrderPct    → digital HCP engagement rate % (eRx, HCP portal, Veeva)
//   newStores         → new regulatory approvals / reimbursement inclusions in period
//   closedStores      → product lifecycle events (discontinuations / generic entries)
// =============================================================================

// Quarter labels in chronological order (must match periodMap keys)
const quarterLabels = [
  'Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24',
  'Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25',
  'Q1 FY26', 'Q2 FY26', 'Q3 FY26',
];

// ─── Segment definitions with per-quarter data ────────────────────────────────
// Each array has 11 entries: Q1 FY24 through Q3 FY26
// Astellas FY24: Q1=Apr-Jun 2023; FY25: Q1=Apr-Jun 2024; FY26: Q1=Apr-Jun 2025

interface RegionQuarterData {
  storeCount: number;        // active product count in segment (approved + reimbursed)
  revenue: number;           // ¥M (segment quarterly revenue)
  revenueYoY: number;        // percentage YoY revenue growth
  compStoreSales: number;    // XTANDI YoY revenue growth % (segment-level)
  compTransactions: number;  // PADCEV YoY revenue growth % (segment-level; 0 if not yet launched)
  averageTicket: number;     // avg revenue per patient treatment-month (¥k)
  operatingMargin: number;   // segment Core Operating Margin % (contribution)
  rewardsMemberPct: number | null;  // patient assistance / access program enrollment %
  mobileOrderPct: number | null;    // HCP digital engagement rate % (eRx / portal)
  newStores: number | null;         // new regulatory approvals / reimbursement inclusions
  closedStores: number | null;      // product discontinuations / generic entries
}

interface RegionSeed {
  name: string;
  quarters: RegionQuarterData[];
}

const regionData: RegionSeed[] = [
  // ── 1. United States ──────────────────────────────────────────────────────
  // 5 key products: XTANDI, PADCEV, IZERVAY, VEOZAH, XOSPATA
  // Highest margin segment; direct distribution; premium pricing (Pfizer PADCEV co-promote)
  // IRA headwind monitoring; oncology specialty channel dominates
  // US revenue FY24: ~¥841B | FY25: ¥940.1B | FY26 est: ~¥997B
  {
    name: 'United States',
    quarters: [
      // Q1 FY24 (Apr-Jun 2023) — XTANDI IRA risk begins; PADCEV post-bladder cancer sNDA
      {
        storeCount: 4,
        revenue: 212200,
        revenueYoY: 8.2,
        compStoreSales: -3.0,
        compTransactions: 65.0,
        averageTicket: 920,
        operatingMargin: 29.2,
        rewardsMemberPct: 24.0,
        mobileOrderPct: 35,
        newStores: 0,
        closedStores: 0,
      },
      // Q2 FY24 (Jul-Sep 2023)
      {
        storeCount: 4,
        revenue: 210300,
        revenueYoY: 7.8,
        compStoreSales: -2.5,
        compTransactions: 68.0,
        averageTicket: 920,
        operatingMargin: 30.5,
        rewardsMemberPct: 24.5,
        mobileOrderPct: 36,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY24 (Oct-Dec 2023) — US year-end hospital stocking; strongest Q
      {
        storeCount: 4,
        revenue: 204400,
        revenueYoY: 7.5,
        compStoreSales: -2.0,
        compTransactions: 72.0,
        averageTicket: 925,
        operatingMargin: 33.8,
        rewardsMemberPct: 25.0,
        mobileOrderPct: 37,
        newStores: 0,
        closedStores: 0,
      },
      // Q4 FY24 (Jan-Mar 2024) — PADCEV first-line urothelial approval
      {
        storeCount: 4,
        revenue: 215300,
        revenueYoY: 7.2,
        compStoreSales: -1.5,
        compTransactions: 75.0,
        averageTicket: 930,
        operatingMargin: 26.0,
        rewardsMemberPct: 25.2,
        mobileOrderPct: 38,
        newStores: 0,
        closedStores: 0,
      },
      // Q1 FY25 (Apr-Jun 2024) — IZERVAY full launch; IRA certainty = modest XTANDI growth
      {
        storeCount: 5,
        revenue: 236550,
        revenueYoY: 11.5,
        compStoreSales: 2.1,
        compTransactions: 55.0,
        averageTicket: 945,
        operatingMargin: 31.3,
        rewardsMemberPct: 26.0,
        mobileOrderPct: 38,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY25 (Jul-Sep 2024)
      {
        storeCount: 5,
        revenue: 234700,
        revenueYoY: 11.6,
        compStoreSales: 3.0,
        compTransactions: 58.0,
        averageTicket: 950,
        operatingMargin: 32.8,
        rewardsMemberPct: 26.8,
        mobileOrderPct: 39,
        newStores: 0,
        closedStores: 0,
      },
      // Q3 FY25 (Oct-Dec 2024) — strongest quarter; US year-end oncology demand
      {
        storeCount: 5,
        revenue: 228400,
        revenueYoY: 11.7,
        compStoreSales: 3.5,
        compTransactions: 62.0,
        averageTicket: 955,
        operatingMargin: 39.8,
        rewardsMemberPct: 27.5,
        mobileOrderPct: 40,
        newStores: 1,
        closedStores: 0,
      },
      // Q4 FY25 (Jan-Mar 2025) — VEOZAH menopause ramp; PADCEV + IZERVAY gaining share
      {
        storeCount: 5,
        revenue: 240450,
        revenueYoY: 11.7,
        compStoreSales: 4.2,
        compTransactions: 60.0,
        averageTicket: 960,
        operatingMargin: 28.1,
        rewardsMemberPct: 27.8,
        mobileOrderPct: 41,
        newStores: 0,
        closedStores: 0,
      },
      // Q1 FY26 (Apr-Jun 2025) — forecast; PADCEV second-line consolidation
      {
        storeCount: 5,
        revenue: 251000,
        revenueYoY: 6.1,
        compStoreSales: 3.5,
        compTransactions: 28.0,
        averageTicket: 975,
        operatingMargin: 32.5,
        rewardsMemberPct: 28.5,
        mobileOrderPct: 41,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY26 (Jul-Sep 2025) — forecast
      {
        storeCount: 5,
        revenue: 249000,
        revenueYoY: 6.1,
        compStoreSales: 4.0,
        compTransactions: 30.0,
        averageTicket: 980,
        operatingMargin: 33.2,
        rewardsMemberPct: 29.2,
        mobileOrderPct: 42,
        newStores: 0,
        closedStores: 0,
      },
      // Q3 FY26 (Oct-Dec 2025) — forecast; US Q3 seasonal strength
      {
        storeCount: 5,
        revenue: 243000,
        revenueYoY: 6.4,
        compStoreSales: 4.5,
        compTransactions: 32.0,
        averageTicket: 985,
        operatingMargin: 37.5,
        rewardsMemberPct: 29.8,
        mobileOrderPct: 43,
        newStores: 1,
        closedStores: 0,
      },
    ],
  },

  // ── 2. Established Markets ─────────────────────────────────────────────────
  // EU, Canada, Australia: XTANDI, PADCEV, VYLOY, XOSPATA, VEOZAH (EU pending)
  // National payer pricing (~20-25% below US); HEOR teams support reimbursement
  // VYLOY EU launch expanding gastric cancer treatment landscape (FY24 EU EMA approval)
  // EM revenue FY24: ~¥508B | FY25: ¥563.6B | FY26 est: ~¥606B
  {
    name: 'Established Markets',
    quarters: [
      // Q1 FY24 (Apr-Jun 2023)
      {
        storeCount: 4,
        revenue: 126000,
        revenueYoY: 6.8,
        compStoreSales: 5.0,
        compTransactions: 40.0,
        averageTicket: 720,
        operatingMargin: 25.0,
        rewardsMemberPct: 8.0,
        mobileOrderPct: 28,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY24 (Jul-Sep 2023)
      {
        storeCount: 4,
        revenue: 129100,
        revenueYoY: 7.0,
        compStoreSales: 5.5,
        compTransactions: 42.0,
        averageTicket: 720,
        operatingMargin: 26.0,
        rewardsMemberPct: 8.2,
        mobileOrderPct: 30,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY24 (Oct-Dec 2023) — EU year-end stocking; VYLOY EMA approval granted
      {
        storeCount: 4,
        revenue: 127600,
        revenueYoY: 7.2,
        compStoreSales: 6.0,
        compTransactions: 45.0,
        averageTicket: 725,
        operatingMargin: 29.5,
        rewardsMemberPct: 8.5,
        mobileOrderPct: 31,
        newStores: 0,
        closedStores: 0,
      },
      // Q4 FY24 (Jan-Mar 2024) — VYLOY national reimbursement negotiations begin EU
      {
        storeCount: 4,
        revenue: 125500,
        revenueYoY: 6.5,
        compStoreSales: 5.8,
        compTransactions: 48.0,
        averageTicket: 728,
        operatingMargin: 22.0,
        rewardsMemberPct: 8.8,
        mobileOrderPct: 32,
        newStores: 1,
        closedStores: 0,
      },
      // Q1 FY25 (Apr-Jun 2024) — VYLOY Germany/France first reimbursements
      {
        storeCount: 5,
        revenue: 139750,
        revenueYoY: 10.9,
        compStoreSales: 8.2,
        compTransactions: 45.0,
        averageTicket: 738,
        operatingMargin: 26.5,
        rewardsMemberPct: 9.2,
        mobileOrderPct: 33,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY25 (Jul-Sep 2024)
      {
        storeCount: 5,
        revenue: 143200,
        revenueYoY: 10.9,
        compStoreSales: 9.0,
        compTransactions: 48.0,
        averageTicket: 742,
        operatingMargin: 28.0,
        rewardsMemberPct: 9.5,
        mobileOrderPct: 34,
        newStores: 2,
        closedStores: 0,
      },
      // Q3 FY25 (Oct-Dec 2024) — EU Q3 seasonal strength; VYLOY multi-country launch
      {
        storeCount: 5,
        revenue: 141300,
        revenueYoY: 10.7,
        compStoreSales: 9.5,
        compTransactions: 52.0,
        averageTicket: 746,
        operatingMargin: 35.0,
        rewardsMemberPct: 9.8,
        mobileOrderPct: 35,
        newStores: 1,
        closedStores: 0,
      },
      // Q4 FY25 (Jan-Mar 2025)
      {
        storeCount: 5,
        revenue: 139350,
        revenueYoY: 11.0,
        compStoreSales: 9.8,
        compTransactions: 50.0,
        averageTicket: 750,
        operatingMargin: 23.5,
        rewardsMemberPct: 10.0,
        mobileOrderPct: 36,
        newStores: 1,
        closedStores: 0,
      },
      // Q1 FY26 (Apr-Jun 2025) — forecast; VYLOY broad EU reimbursement
      {
        storeCount: 5,
        revenue: 150200,
        revenueYoY: 7.5,
        compStoreSales: 8.5,
        compTransactions: 25.0,
        averageTicket: 760,
        operatingMargin: 27.5,
        rewardsMemberPct: 10.5,
        mobileOrderPct: 36,
        newStores: 2,
        closedStores: 0,
      },
      // Q2 FY26 (Jul-Sep 2025) — forecast
      {
        storeCount: 5,
        revenue: 154000,
        revenueYoY: 7.5,
        compStoreSales: 9.2,
        compTransactions: 28.0,
        averageTicket: 764,
        operatingMargin: 28.5,
        rewardsMemberPct: 10.8,
        mobileOrderPct: 37,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY26 (Oct-Dec 2025) — forecast
      {
        storeCount: 5,
        revenue: 152000,
        revenueYoY: 7.6,
        compStoreSales: 9.8,
        compTransactions: 30.0,
        averageTicket: 768,
        operatingMargin: 32.5,
        rewardsMemberPct: 11.0,
        mobileOrderPct: 38,
        newStores: 2,
        closedStores: 0,
      },
    ],
  },

  // ── 3. Japan ──────────────────────────────────────────────────────────────
  // Astellas home market: XTANDI, PADCEV, XOSPATA, VYLOY (domestic MR network)
  // NHI biennial price revision in April 2024 (Q1 FY25) — ~6-8% XTANDI price cut
  // SMT program: Japan MR headcount reduction; portfolio rationalization
  // Japan revenue FY24: ~¥294B | FY25: ¥289.0B | FY26 est: ~¥293B (+1.5%)
  {
    name: 'Japan',
    quarters: [
      // Q1 FY24 (Apr-Jun 2023) — Japan fiscal year start; inventory build; pre-NHI cut
      {
        storeCount: 3,
        revenue: 75200,
        revenueYoY: 1.5,
        compStoreSales: -4.5,
        compTransactions: 35.0,
        averageTicket: 640,
        operatingMargin: 19.5,
        rewardsMemberPct: 5.0,
        mobileOrderPct: 20,
        newStores: 0,
        closedStores: 0,
      },
      // Q2 FY24 (Jul-Sep 2023)
      {
        storeCount: 3,
        revenue: 74000,
        revenueYoY: 1.2,
        compStoreSales: -4.0,
        compTransactions: 38.0,
        averageTicket: 638,
        operatingMargin: 20.5,
        rewardsMemberPct: 5.2,
        mobileOrderPct: 21,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY24 (Oct-Dec 2023)
      {
        storeCount: 3,
        revenue: 73200,
        revenueYoY: 0.8,
        compStoreSales: -3.8,
        compTransactions: 40.0,
        averageTicket: 636,
        operatingMargin: 23.8,
        rewardsMemberPct: 5.5,
        mobileOrderPct: 22,
        newStores: 0,
        closedStores: 0,
      },
      // Q4 FY24 (Jan-Mar 2024)
      {
        storeCount: 3,
        revenue: 71700,
        revenueYoY: -0.5,
        compStoreSales: -3.5,
        compTransactions: 42.0,
        averageTicket: 634,
        operatingMargin: 17.0,
        rewardsMemberPct: 5.8,
        mobileOrderPct: 23,
        newStores: 0,
        closedStores: 0,
      },
      // Q1 FY25 (Apr-Jun 2024) — April NHI revision: XTANDI -7.5% price cut
      {
        storeCount: 4,
        revenue: 73100,
        revenueYoY: -2.8,
        compStoreSales: -2.8,
        compTransactions: 40.0,
        averageTicket: 625,
        operatingMargin: 21.3,
        rewardsMemberPct: 6.0,
        mobileOrderPct: 24,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY25 (Jul-Sep 2024)
      {
        storeCount: 4,
        revenue: 72100,
        revenueYoY: -2.6,
        compStoreSales: -2.2,
        compTransactions: 42.0,
        averageTicket: 623,
        operatingMargin: 22.8,
        rewardsMemberPct: 6.2,
        mobileOrderPct: 25,
        newStores: 0,
        closedStores: 0,
      },
      // Q3 FY25 (Oct-Dec 2024)
      {
        storeCount: 4,
        revenue: 71600,
        revenueYoY: -2.2,
        compStoreSales: -1.8,
        compTransactions: 45.0,
        averageTicket: 620,
        operatingMargin: 29.8,
        rewardsMemberPct: 6.5,
        mobileOrderPct: 26,
        newStores: 0,
        closedStores: 0,
      },
      // Q4 FY25 (Jan-Mar 2025) — VYLOY Japan PMDA full approval; modest recovery
      {
        storeCount: 4,
        revenue: 72200,
        revenueYoY: 0.7,
        compStoreSales: 0.2,
        compTransactions: 43.0,
        averageTicket: 618,
        operatingMargin: 18.1,
        rewardsMemberPct: 6.8,
        mobileOrderPct: 27,
        newStores: 1,
        closedStores: 0,
      },
      // Q1 FY26 (Apr-Jun 2025) — forecast; VYLOY Japan ramp; modest growth resumes
      {
        storeCount: 4,
        revenue: 74200,
        revenueYoY: 1.5,
        compStoreSales: 1.5,
        compTransactions: 22.0,
        averageTicket: 622,
        operatingMargin: 22.5,
        rewardsMemberPct: 7.0,
        mobileOrderPct: 27,
        newStores: 0,
        closedStores: 0,
      },
      // Q2 FY26 (Jul-Sep 2025) — forecast
      {
        storeCount: 4,
        revenue: 73200,
        revenueYoY: 1.5,
        compStoreSales: 2.0,
        compTransactions: 25.0,
        averageTicket: 620,
        operatingMargin: 23.2,
        rewardsMemberPct: 7.2,
        mobileOrderPct: 28,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY26 (Oct-Dec 2025) — forecast
      {
        storeCount: 4,
        revenue: 72700,
        revenueYoY: 1.5,
        compStoreSales: 2.5,
        compTransactions: 27.0,
        averageTicket: 618,
        operatingMargin: 27.5,
        rewardsMemberPct: 7.5,
        mobileOrderPct: 29,
        newStores: 0,
        closedStores: 0,
      },
    ],
  },

  // ── 4. International Markets ───────────────────────────────────────────────
  // 40+ expansion markets (Latin America, Middle East, Southeast Asia, Africa)
  // XTANDI + PADCEV primary drivers; market access investment phase
  // Highest YoY growth trajectory (14-15% FY25); multi-country regulatory approvals
  // Intl revenue FY24: ~¥201.5B | FY25: ¥230.7B | FY26 est: ~¥256B
  {
    name: 'International Markets',
    quarters: [
      // Q1 FY24 (Apr-Jun 2023)
      {
        storeCount: 3,
        revenue: 50400,
        revenueYoY: 12.5,
        compStoreSales: 10.0,
        compTransactions: 20.0,
        averageTicket: 495,
        operatingMargin: 17.2,
        rewardsMemberPct: 15.0,
        mobileOrderPct: 18,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY24 (Jul-Sep 2023)
      {
        storeCount: 3,
        revenue: 51000,
        revenueYoY: 13.0,
        compStoreSales: 11.0,
        compTransactions: 22.0,
        averageTicket: 498,
        operatingMargin: 18.0,
        rewardsMemberPct: 15.5,
        mobileOrderPct: 19,
        newStores: 2,
        closedStores: 0,
      },
      // Q3 FY24 (Oct-Dec 2023)
      {
        storeCount: 3,
        revenue: 50400,
        revenueYoY: 13.5,
        compStoreSales: 12.0,
        compTransactions: 25.0,
        averageTicket: 500,
        operatingMargin: 21.5,
        rewardsMemberPct: 16.0,
        mobileOrderPct: 20,
        newStores: 2,
        closedStores: 0,
      },
      // Q4 FY24 (Jan-Mar 2024)
      {
        storeCount: 3,
        revenue: 49800,
        revenueYoY: 12.8,
        compStoreSales: 11.5,
        compTransactions: 28.0,
        averageTicket: 502,
        operatingMargin: 14.5,
        rewardsMemberPct: 16.5,
        mobileOrderPct: 21,
        newStores: 2,
        closedStores: 0,
      },
      // Q1 FY25 (Apr-Jun 2024) — PADCEV market access acceleration
      {
        storeCount: 4,
        revenue: 57700,
        revenueYoY: 14.5,
        compStoreSales: 14.5,
        compTransactions: 30.0,
        averageTicket: 508,
        operatingMargin: 19.3,
        rewardsMemberPct: 17.0,
        mobileOrderPct: 22,
        newStores: 2,
        closedStores: 0,
      },
      // Q2 FY25 (Jul-Sep 2024)
      {
        storeCount: 4,
        revenue: 58250,
        revenueYoY: 14.2,
        compStoreSales: 15.0,
        compTransactions: 32.0,
        averageTicket: 512,
        operatingMargin: 20.8,
        rewardsMemberPct: 17.5,
        mobileOrderPct: 23,
        newStores: 2,
        closedStores: 0,
      },
      // Q3 FY25 (Oct-Dec 2024)
      {
        storeCount: 4,
        revenue: 57750,
        revenueYoY: 14.6,
        compStoreSales: 14.8,
        compTransactions: 35.0,
        averageTicket: 515,
        operatingMargin: 27.8,
        rewardsMemberPct: 18.0,
        mobileOrderPct: 24,
        newStores: 3,
        closedStores: 0,
      },
      // Q4 FY25 (Jan-Mar 2025)
      {
        storeCount: 4,
        revenue: 57000,
        revenueYoY: 14.5,
        compStoreSales: 14.2,
        compTransactions: 33.0,
        averageTicket: 518,
        operatingMargin: 16.1,
        rewardsMemberPct: 18.5,
        mobileOrderPct: 25,
        newStores: 2,
        closedStores: 0,
      },
      // Q1 FY26 (Apr-Jun 2025) — forecast; broad market access maturation
      {
        storeCount: 4,
        revenue: 64100,
        revenueYoY: 11.1,
        compStoreSales: 12.0,
        compTransactions: 18.0,
        averageTicket: 524,
        operatingMargin: 20.5,
        rewardsMemberPct: 19.0,
        mobileOrderPct: 25,
        newStores: 3,
        closedStores: 0,
      },
      // Q2 FY26 (Jul-Sep 2025) — forecast
      {
        storeCount: 4,
        revenue: 64700,
        revenueYoY: 11.1,
        compStoreSales: 13.0,
        compTransactions: 20.0,
        averageTicket: 528,
        operatingMargin: 21.2,
        rewardsMemberPct: 19.5,
        mobileOrderPct: 26,
        newStores: 2,
        closedStores: 0,
      },
      // Q3 FY26 (Oct-Dec 2025) — forecast
      {
        storeCount: 4,
        revenue: 64100,
        revenueYoY: 11.0,
        compStoreSales: 13.5,
        compTransactions: 22.0,
        averageTicket: 532,
        operatingMargin: 25.5,
        rewardsMemberPct: 20.0,
        mobileOrderPct: 27,
        newStores: 3,
        closedStores: 0,
      },
    ],
  },

  // ── 5. China ──────────────────────────────────────────────────────────────
  // Fastest growing segment; XTANDI (NRDL 2022) + VYLOY (NMPA approval FY24)
  // NRDL pricing: ~35% discount vs ex-factory; volume growth offsets ASP pressure
  // VYLOY NMPA approval catalyzes significant revenue ramp from Q1 FY25
  // China revenue FY24: ~¥68B | FY25: ¥101.5B (+49.3%) | FY26 est: ~¥127B
  {
    name: 'China',
    quarters: [
      // Q1 FY24 (Apr-Jun 2023) — XTANDI on NRDL; volume building
      {
        storeCount: 1,
        revenue: 16000,
        revenueYoY: 42.0,
        compStoreSales: 35.0,
        compTransactions: 0.0,
        averageTicket: 258,
        operatingMargin: 10.2,
        rewardsMemberPct: 12.0,
        mobileOrderPct: 22,
        newStores: 0,
        closedStores: 0,
      },
      // Q2 FY24 (Jul-Sep 2023) — VYLOY NMPA NDA submission
      {
        storeCount: 1,
        revenue: 16700,
        revenueYoY: 45.0,
        compStoreSales: 38.0,
        compTransactions: 0.0,
        averageTicket: 262,
        operatingMargin: 11.0,
        rewardsMemberPct: 12.5,
        mobileOrderPct: 24,
        newStores: 0,
        closedStores: 0,
      },
      // Q3 FY24 (Oct-Dec 2023) — VYLOY NMPA approval granted
      {
        storeCount: 1,
        revenue: 17700,
        revenueYoY: 48.0,
        compStoreSales: 42.0,
        compTransactions: 0.0,
        averageTicket: 265,
        operatingMargin: 14.5,
        rewardsMemberPct: 13.0,
        mobileOrderPct: 25,
        newStores: 1,
        closedStores: 0,
      },
      // Q4 FY24 (Jan-Mar 2024) — pre-Lunar New Year stocking; VYLOY hospital listing begins
      {
        storeCount: 1,
        revenue: 17600,
        revenueYoY: 47.0,
        compStoreSales: 44.0,
        compTransactions: 0.0,
        averageTicket: 268,
        operatingMargin: 7.5,
        rewardsMemberPct: 13.5,
        mobileOrderPct: 26,
        newStores: 0,
        closedStores: 0,
      },
      // Q1 FY25 (Apr-Jun 2024) — VYLOY full commercial launch; NRDL inclusion negotiation
      {
        storeCount: 2,
        revenue: 23800,
        revenueYoY: 48.8,
        compStoreSales: 28.0,
        compTransactions: 100.0,
        averageTicket: 272,
        operatingMargin: 12.3,
        rewardsMemberPct: 14.0,
        mobileOrderPct: 27,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY25 (Jul-Sep 2024) — VYLOY NRDL inclusion; volume acceleration
      {
        storeCount: 2,
        revenue: 26250,
        revenueYoY: 57.2,
        compStoreSales: 30.5,
        compTransactions: 120.0,
        averageTicket: 278,
        operatingMargin: 13.8,
        rewardsMemberPct: 15.0,
        mobileOrderPct: 28,
        newStores: 1,
        closedStores: 0,
      },
      // Q3 FY25 (Oct-Dec 2024) — strong hospital channel uptake; VYLOY gastric cancer share
      {
        storeCount: 2,
        revenue: 26850,
        revenueYoY: 51.7,
        compStoreSales: 28.8,
        compTransactions: 150.0,
        averageTicket: 282,
        operatingMargin: 20.8,
        rewardsMemberPct: 16.0,
        mobileOrderPct: 30,
        newStores: 0,
        closedStores: 0,
      },
      // Q4 FY25 (Jan-Mar 2025) — pre-Lunar New Year stocking; VYLOY peak quarter
      {
        storeCount: 2,
        revenue: 24600,
        revenueYoY: 39.8,
        compStoreSales: 22.5,
        compTransactions: 180.0,
        averageTicket: 286,
        operatingMargin: 9.1,
        rewardsMemberPct: 16.5,
        mobileOrderPct: 31,
        newStores: 1,
        closedStores: 0,
      },
      // Q1 FY26 (Apr-Jun 2025) — forecast; PADCEV NMPA approval expected; VYLOY expansion
      {
        storeCount: 2,
        revenue: 29800,
        revenueYoY: 25.2,
        compStoreSales: 20.0,
        compTransactions: 90.0,
        averageTicket: 290,
        operatingMargin: 13.5,
        rewardsMemberPct: 17.0,
        mobileOrderPct: 31,
        newStores: 1,
        closedStores: 0,
      },
      // Q2 FY26 (Jul-Sep 2025) — forecast
      {
        storeCount: 2,
        revenue: 32900,
        revenueYoY: 25.3,
        compStoreSales: 22.0,
        compTransactions: 85.0,
        averageTicket: 296,
        operatingMargin: 14.2,
        rewardsMemberPct: 17.5,
        mobileOrderPct: 32,
        newStores: 0,
        closedStores: 0,
      },
      // Q3 FY26 (Oct-Dec 2025) — forecast
      {
        storeCount: 2,
        revenue: 33600,
        revenueYoY: 25.1,
        compStoreSales: 24.0,
        compTransactions: 80.0,
        averageTicket: 300,
        operatingMargin: 18.5,
        rewardsMemberPct: 18.0,
        mobileOrderPct: 33,
        newStores: 1,
        closedStores: 0,
      },
    ],
  },
];

// =============================================================================
// Main seed function
// =============================================================================

export async function seedRegionalPerformance(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const availableQuarters = quarterLabels.filter((q) => periodMap[q]);

  if (availableQuarters.length === 0) {
    console.log('No matching quarters found in periodMap for regional performance — skipping');
    return;
  }

  let recordCount = 0;

  for (const region of regionData) {
    for (let qi = 0; qi < availableQuarters.length; qi++) {
      const quarterLabel = availableQuarters[qi];
      const periodId = periodMap[quarterLabel].id;

      const dataIndex = quarterLabels.indexOf(quarterLabel);
      if (dataIndex === -1 || dataIndex >= region.quarters.length) continue;

      const q = region.quarters[dataIndex];

      await prisma.regionalPerformance.create({
        data: {
          companyId,
          periodId,
          region: region.name,
          storeCount: q.storeCount,
          revenue: q.revenue,
          revenueYoY: q.revenueYoY,
          compStoreSales: q.compStoreSales,
          compTransactions: q.compTransactions,
          averageTicket: q.averageTicket,
          operatingMargin: q.operatingMargin,
          rewardsMemberPct: q.rewardsMemberPct,
          mobileOrderPct: q.mobileOrderPct,
          newStores: q.newStores,
          closedStores: q.closedStores,
        },
      });
      recordCount++;
    }
  }

  console.log(
    `Seeded ${recordCount} Astellas Pharma geographic segment performance records ` +
    `(${regionData.length} segments x ${availableQuarters.length} quarters)`,
  );
}
