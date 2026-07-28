import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed MonthlyFinancial table — Astellas Pharma Inc. (TSE: 4503 / ALPMY)
// 11 quarters x 3 months x 5 segments (US, EM, Japan, Intl, China) + Consolidated = 198 records
// Astellas fiscal year: Q1=Apr-Jun, Q2=Jul-Sep, Q3=Oct-Dec, Q4=Jan-Mar
//
// Covers FY24 (Q1-Q4), FY25 (Q1-Q4), FY26 (Q1-Q3)
// Astellas seasonal pattern:
//   Q1: Japan peaks (April NHI/fiscal year start); overall moderate
//   Q2: Stable quarter; US steady oncology demand
//   Q3: Strongest quarter (US year-end hospital stocking; EM seasonal marketing campaigns)
//   Q4: China pre-Lunar New Year stocking; US softer (post-holiday destocking)
// Revenue in ¥M (millions of yen)
// compStoreSales repurposed → Core Operating Margin % (per segment, adjusted for regional mix)
// =============================================================================

// ── Quarter metadata ─────────────────────────────────────────────────────────

interface QuarterDef {
  label: string;           // e.g. "Q1 FY24"
  quarter: 1 | 2 | 3 | 4; // Astellas fiscal: 1=Apr-Jun, 2=Jul-Sep, 3=Oct-Dec, 4=Jan-Mar
  cyYear: number;          // calendar year of the quarter start month (Q4: Jan start = cyYear+1 applied in getMonthLabel)
  totalRevenue: number;    // quarterly total in ¥M (consolidated)
  rxGrowth: number;        // consolidated Core Operating Margin % (repurposed field)
}

const QUARTERS: QuarterDef[] = [
  // FY24 — full year ¥1,913.0B
  { label: 'Q1 FY24', quarter: 1, cyYear: 2024, totalRevenue: 494200, rxGrowth: 22.5 },
  { label: 'Q2 FY24', quarter: 2, cyYear: 2024, totalRevenue: 484300, rxGrowth: 23.8 },
  { label: 'Q3 FY24', quarter: 3, cyYear: 2024, totalRevenue: 480100, rxGrowth: 27.2 },
  { label: 'Q4 FY24', quarter: 4, cyYear: 2024, totalRevenue: 454400, rxGrowth: 19.5 },
  // FY25 — full year ¥2,139.2B
  { label: 'Q1 FY25', quarter: 1, cyYear: 2025, totalRevenue: 537900, rxGrowth: 24.3 },
  { label: 'Q2 FY25', quarter: 2, cyYear: 2025, totalRevenue: 537000, rxGrowth: 25.8 },
  { label: 'Q3 FY25', quarter: 3, cyYear: 2025, totalRevenue: 527100, rxGrowth: 32.8 },
  { label: 'Q4 FY25', quarter: 4, cyYear: 2025, totalRevenue: 537200, rxGrowth: 21.1 },
  // FY26 — guidance/forecast ¥2,220B+
  { label: 'Q1 FY26', quarter: 1, cyYear: 2026, totalRevenue: 558000, rxGrowth: 25.5 },
  { label: 'Q2 FY26', quarter: 2, cyYear: 2026, totalRevenue: 562000, rxGrowth: 26.2 },
  { label: 'Q3 FY26', quarter: 3, cyYear: 2026, totalRevenue: 572000, rxGrowth: 30.5 },
];

// ── Segment revenue splits ───────────────────────────────────────────────────

const SEGMENTS = ['United States', 'Established Markets', 'Japan', 'International Markets', 'China'] as const;

// Revenue share by segment — Astellas geographic structure
// US (44%): XTANDI + PADCEV + IZERVAY + VEOZAH; US highest margin; Q3 strongest (year-end hospital)
// EM (26.3%): EU + Canada; XTANDI + PADCEV + VYLOY; stable with mild Q3 peak
// Japan (14%): home market; NHI pricing; Q1 peak (April NHI fiscal year start, budget decisions)
// International (10.8%): expansion markets; 40+ countries; steady growth
// China (4.7%): fastest growing; VYLOY launch; China peaks Q4 (pre-Lunar New Year stocking)
// Note: segments sum to ~99.3% of consolidated (small corporate/other reconciling item)

interface SeasonalShares {
  'United States': number;
  'Established Markets': number;
  'Japan': number;
  'International Markets': number;
  'China': number;
}

const QUARTERLY_SEGMENT_SHARES: Record<number, SeasonalShares> = {
  1: { // Q1 (Apr-Jun): Japan peaks April (NHI reimbursement decisions); US/EM stable
    'United States': 0.440,
    'Established Markets': 0.264,
    'Japan': 0.140,
    'International Markets': 0.108,
    'China': 0.047,
  },
  2: { // Q2 (Jul-Sep): Stable quarter; all segments proportional
    'United States': 0.437,
    'Established Markets': 0.267,
    'Japan': 0.134,
    'International Markets': 0.108,
    'China': 0.049,
  },
  3: { // Q3 (Oct-Dec): US strongest (year-end hospital stocking; flu season oncology); EM campaigns
    'United States': 0.433,
    'Established Markets': 0.268,
    'Japan': 0.136,
    'International Markets': 0.110,
    'China': 0.051,
  },
  4: { // Q4 (Jan-Mar): China peaks (pre-Lunar New Year); US softer (post-holiday)
    'United States': 0.448,
    'Established Markets': 0.260,
    'Japan': 0.134,
    'International Markets': 0.106,
    'China': 0.046,
  },
};

// ── Monthly revenue distribution within each quarter ─────────────────────────

// Month weights within quarter [month1, month2, month3] — sum to 1.0
// Q1 (Apr-Jun): April peak (Japan NHI fiscal start, inventory build); June moderates
// Q2 (Jul-Sep): Steady; September slightly stronger (pre-Q3 stocking)
// Q3 (Oct-Dec): December dominant (US year-end hospital stocking; year-end oncology demand)
// Q4 (Jan-Mar): January China pre-Lunar New Year peak; Feb/Mar normalizing
const MONTH_WEIGHTS: Record<1 | 2 | 3 | 4, [number, number, number]> = {
  1: [0.38, 0.32, 0.30], // Q1: Apr 38% (Japan/fiscal year), May 32%, Jun 30%
  2: [0.30, 0.34, 0.36], // Q2: Jul 30%, Aug 34%, Sep 36% (pre-Q3 stocking ramp)
  3: [0.28, 0.33, 0.39], // Q3: Oct 28%, Nov 33%, Dec 39% (US year-end surge)
  4: [0.38, 0.32, 0.30], // Q4: Jan 38% (China pre-Lunar New Year), Feb 32%, Mar 30%
};

// Calendar month names for Astellas fiscal quarters
// Q1=Apr-Jun | Q2=Jul-Sep | Q3=Oct-Dec | Q4=Jan-Mar (Jan-Mar are calendar year+1)
function getMonthLabel(quarter: 1 | 2 | 3 | 4, monthIdx: 0 | 1 | 2, cyYear: number): string {
  const MONTH_NAMES: Record<number, string[]> = {
    1: ['Apr', 'May', 'Jun'],
    2: ['Jul', 'Aug', 'Sep'],
    3: ['Oct', 'Nov', 'Dec'],
    4: ['Jan', 'Feb', 'Mar'], // Q4 months are in the NEXT calendar year
  };
  // Q4 spans January-March of the following calendar year
  const actualYear = quarter === 4 ? cyYear + 1 : cyYear;
  const names = MONTH_NAMES[quarter];
  return `${names[monthIdx]} ${actualYear}`;
}

// ── Cost structure by segment ────────────────────────────────────────────────

interface CostProfile {
  cogsPercent: number;      // Cost of sales (manufacturing, royalties, COGS)
  storeOpexPercent: number; // SG&A + medical affairs (field force, marketing, publications)
  otherOpexPercent: number; // R&D allocated + D&A on intangibles (milestones, platform)
}

// Base cost profiles (FY24 baseline) — Astellas pharma cost structure
// US: highest margin (XTANDI/PADCEV premium; dominant brand positioning)
//   COGS ~22%, SG&A ~33%, R&D/D&A ~15% → Core OP ~30%
// EM: EU NHS/national payer discounts reduce margin vs US
//   COGS ~24%, SG&A ~36%, R&D/D&A ~14% → Core OP ~26%
// Japan: NHI biennial price cuts; lower SG&A (established market)
//   COGS ~26%, SG&A ~38%, R&D/D&A ~14% → Core OP ~22%
// International Markets: expansion investment; higher SG&A per ¥ revenue
//   COGS ~27%, SG&A ~40%, R&D/D&A ~13% → Core OP ~20%
// China: early market investment; highest growth but lowest margin
//   COGS ~30%, SG&A ~42%, R&D/D&A ~13% → Core OP ~15%
const BASE_COST_PROFILES: Record<typeof SEGMENTS[number], CostProfile> = {
  'United States': {
    cogsPercent: 0.220,       // Manufacturing + Pfizer royalties (PADCEV co-dev)
    storeOpexPercent: 0.330,  // US oncology field force + DTC + managed care team
    otherOpexPercent: 0.150,  // R&D allocated + Seagen/Pfizer milestones + D&A
  },
  'Established Markets': {
    cogsPercent: 0.240,       // EU manufacturing + distribution
    storeOpexPercent: 0.360,  // EU field force + HEOR teams + reimbursement affairs
    otherOpexPercent: 0.140,  // D&A on regulatory intangibles + R&D allocated
  },
  'Japan': {
    cogsPercent: 0.260,       // Japan manufacturing + domestic distribution
    storeOpexPercent: 0.380,  // Japan MR (medical representative) field force
    otherOpexPercent: 0.140,  // Japan R&D allocated + NHI regulatory costs
  },
  'International Markets': {
    cogsPercent: 0.270,       // International distribution + partner markups
    storeOpexPercent: 0.400,  // International field force + expansion investment
    otherOpexPercent: 0.130,  // Local regulatory + D&A
  },
  'China': {
    cogsPercent: 0.300,       // China manufacturing (local + import), lower ASP
    storeOpexPercent: 0.420,  // China field force + NRDL negotiation + hospital access
    otherOpexPercent: 0.130,  // China regulatory + D&A
  },
};

// Cost efficiency improvement — SMT program (¥21B FY25, ¥40B FY26 cumulative)
// Primary savings in SG&A (commercial excellence) and R&D (portfolio rationalization)
// Manufacturing consolidation provides modest COGS savings from FY26
function getCostProfile(segment: typeof SEGMENTS[number], cyYear: number): CostProfile {
  const base = BASE_COST_PROFILES[segment];
  const yearsFromBaseline = cyYear - 2024;
  if (segment === 'United States') {
    return {
      cogsPercent: base.cogsPercent - yearsFromBaseline * 0.002,  // COGS stable (branded)
      storeOpexPercent: base.storeOpexPercent - yearsFromBaseline * 0.009, // SMT SG&A savings US (largest bucket)
      otherOpexPercent: base.otherOpexPercent + yearsFromBaseline * 0.002, // D&A growing (PADCEV milestones)
    };
  }
  if (segment === 'Established Markets') {
    return {
      cogsPercent: base.cogsPercent - yearsFromBaseline * 0.002,
      storeOpexPercent: base.storeOpexPercent - yearsFromBaseline * 0.008, // SMT EU field force rationalization
      otherOpexPercent: base.otherOpexPercent + yearsFromBaseline * 0.001,
    };
  }
  if (segment === 'Japan') {
    return {
      cogsPercent: base.cogsPercent - yearsFromBaseline * 0.001,  // Japan manufacturing consolidation
      storeOpexPercent: base.storeOpexPercent - yearsFromBaseline * 0.010, // Japan MR headcount reduction (SMT)
      otherOpexPercent: base.otherOpexPercent,
    };
  }
  if (segment === 'International Markets') {
    return {
      cogsPercent: base.cogsPercent - yearsFromBaseline * 0.002,
      storeOpexPercent: base.storeOpexPercent - yearsFromBaseline * 0.007,
      otherOpexPercent: base.otherOpexPercent,
    };
  }
  // China
  return {
    cogsPercent: base.cogsPercent - yearsFromBaseline * 0.003,  // COGS improving with scale
    storeOpexPercent: base.storeOpexPercent - yearsFromBaseline * 0.005, // China efficiency modest
    otherOpexPercent: base.otherOpexPercent + yearsFromBaseline * 0.002, // NMPA regulatory D&A growing
  };
}

// ── Core OP margin adjustment by segment ─────────────────────────────────────
// rxGrowth in QUARTERS = consolidated Core OP margin %
// getSegmentRxGrowth returns per-segment Core OP margin adjustment from consolidated
// Returns null only if the metric is not applicable to the segment
function getSegmentRxGrowth(
  consolidatedMargin: number,
  segment: typeof SEGMENTS[number],
): number | null {
  switch (segment) {
    case 'United States':
      // US highest margin (+700bps vs consolidated; XTANDI/PADCEV premium pricing)
      return +(consolidatedMargin + 7.0).toFixed(1);
    case 'Established Markets':
      // EM slightly above consolidated (+200bps; EU premium vs Japan/Intl)
      return +(consolidatedMargin + 2.0).toFixed(1);
    case 'Japan':
      // Japan below consolidated (-300bps; NHI pricing biennial cuts)
      return +(consolidatedMargin - 3.0).toFixed(1);
    case 'International Markets':
      // International below consolidated (-500bps; expansion investment)
      return +(consolidatedMargin - 5.0).toFixed(1);
    case 'China':
      // China lowest margin (-1200bps; high investment, NRDL price concessions)
      return +(consolidatedMargin - 12.0).toFixed(1);
  }
}

// ── Patient/customer metrics by segment ──────────────────────────────────────

interface CustomerMetrics {
  transactions: number; // patient treatment-months in thousands (proxy)
  averageTicket: number; // avg revenue per patient treatment-month in ¥k
}

function getCustomerMetrics(
  monthRevenue: number,   // in ¥M
  segment: typeof SEGMENTS[number],
  cyYear: number,
): CustomerMetrics {
  const yearDelta = cyYear - 2024;
  let baseAvgMonthlyRev: number; // ¥k per patient-month
  switch (segment) {
    case 'United States':
      // Key products: XTANDI (~¥1,300k=$8,700/month), PADCEV (~¥2,400k/cycle equiv), IZERVAY (~¥330k/injection)
      // Blended avg patient ASP ~¥1,000k/month across all Astellas US products
      baseAvgMonthlyRev = 1000 + yearDelta * 42; // ~4% annual ASP inflation
      break;
    case 'Established Markets':
      // EU/Canada: national payer discounts; avg ~¥780k/patient/month
      baseAvgMonthlyRev = 780 + yearDelta * 28; // modest ASP growth (reference pricing)
      break;
    case 'Japan':
      // NHI pricing constraints; biennial price cuts; avg ~¥650k/patient/month
      baseAvgMonthlyRev = 650 + yearDelta * 8;  // minimal ASP growth (NHI caps biennial cuts)
      break;
    case 'International Markets':
      // Mixed pricing landscapes; avg ~¥520k/patient/month
      baseAvgMonthlyRev = 520 + yearDelta * 22; // gradual ASP increase with market access
      break;
    case 'China':
      // NRDL pricing (~35% discount vs ex-factory); avg ~¥280k/patient/month
      baseAvgMonthlyRev = 280 + yearDelta * 38; // grows as volume + new products overcome pricing
      break;
  }
  // transactions in thousands of patient-months: monthRevenue (¥M) * 1000 / baseAvgMonthlyRev (¥k) / 1000
  // = monthRevenue / baseAvgMonthlyRev
  const transactions = +(monthRevenue * 1000 / baseAvgMonthlyRev / 1000).toFixed(0);
  return { transactions, averageTicket: +baseAvgMonthlyRev.toFixed(0) };
}

// ── Slight monthly variation noise ───────────────────────────────────────────

function jitter(value: number, pct: number = 0.01): number {
  const hash = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
  const noise = (hash - Math.floor(hash)) * 2 - 1;
  return +(value * (1 + noise * pct)).toFixed(1);
}

// =============================================================================
// Main seed function
// =============================================================================

export async function seedMonthlyFinancials(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const records: Array<{
    companyId: number;
    periodId: number;
    month: number;
    monthLabel: string;
    segment: string;
    revenue: number;
    cogs: number;
    grossProfit: number;
    storeOpex: number;
    otherOpex: number;
    operatingIncome: number;
    compStoreSales: number | null;
    transactions: number | null;
    averageTicket: number | null;
  }> = [];

  for (const qtr of QUARTERS) {
    if (!periodMap[qtr.label]) {
      console.log(`  Skipping ${qtr.label} (not in periodMap)`);
      continue;
    }

    const periodId = periodMap[qtr.label].id;
    const weights = MONTH_WEIGHTS[qtr.quarter];
    const segShares = QUARTERLY_SEGMENT_SHARES[qtr.quarter];

    const consolidatedMonths: Array<{
      month: number;
      monthLabel: string;
      revenue: number;
      cogs: number;
      grossProfit: number;
      storeOpex: number;
      otherOpex: number;
      operatingIncome: number;
      transactions: number;
    }> = [];

    for (let m = 0; m < 3; m++) {
      consolidatedMonths.push({
        month: m + 1,
        monthLabel: getMonthLabel(qtr.quarter, m as 0 | 1 | 2, qtr.cyYear),
        revenue: 0,
        cogs: 0,
        grossProfit: 0,
        storeOpex: 0,
        otherOpex: 0,
        operatingIncome: 0,
        transactions: 0,
      });
    }

    for (const segment of SEGMENTS) {
      const segmentRevenue = qtr.totalRevenue * segShares[segment];
      const costProfile = getCostProfile(segment, qtr.cyYear);
      const rxGrowth = getSegmentRxGrowth(qtr.rxGrowth, segment);

      for (let m = 0; m < 3; m++) {
        const monthRevBase = segmentRevenue * weights[m];
        const monthRev = jitter(monthRevBase, 0.008);
        const cogs = jitter(monthRev * costProfile.cogsPercent, 0.005);
        const grossProfit = +(monthRev - cogs).toFixed(1);
        const storeOpex = jitter(monthRev * costProfile.storeOpexPercent, 0.005);
        const otherOpex = jitter(monthRev * costProfile.otherOpexPercent, 0.005);
        const operatingIncome = +(grossProfit - storeOpex - otherOpex).toFixed(1);

        const customerMetrics = getCustomerMetrics(monthRev, segment, qtr.cyYear);

        // Core OP margin varies slightly by month within quarter
        let monthRxGrowth: number | null = null;
        if (rxGrowth !== null) {
          const growthOffsets = [-0.3, 0.0, 0.3];
          monthRxGrowth = +(rxGrowth + growthOffsets[m]).toFixed(1);
        }

        const monthLabel = getMonthLabel(qtr.quarter, m as 0 | 1 | 2, qtr.cyYear);

        records.push({
          companyId,
          periodId,
          month: m + 1,
          monthLabel,
          segment,
          revenue: monthRev,
          cogs,
          grossProfit,
          storeOpex,
          otherOpex,
          operatingIncome,
          compStoreSales: monthRxGrowth, // Core OP margin % (segment-adjusted); null if not applicable
          transactions: customerMetrics.transactions > 0 ? customerMetrics.transactions : null,
          averageTicket: customerMetrics.averageTicket > 0 ? customerMetrics.averageTicket : null,
        });

        consolidatedMonths[m].revenue += monthRev;
        consolidatedMonths[m].cogs += cogs;
        consolidatedMonths[m].grossProfit += grossProfit;
        consolidatedMonths[m].storeOpex += storeOpex;
        consolidatedMonths[m].otherOpex += otherOpex;
        consolidatedMonths[m].operatingIncome += operatingIncome;
        consolidatedMonths[m].transactions += customerMetrics.transactions;
      }
    }

    // Add consolidated rows
    for (let m = 0; m < 3; m++) {
      const c = consolidatedMonths[m];
      const growthOffsets = [-0.2, 0.0, 0.2];
      const consolidatedMargin = +(qtr.rxGrowth + growthOffsets[m]).toFixed(1);

      const avgTicket = c.transactions > 0
        ? +(c.revenue * 1000 / c.transactions / 1000).toFixed(0)
        : null;

      records.push({
        companyId,
        periodId,
        month: c.month,
        monthLabel: c.monthLabel,
        segment: 'Consolidated',
        revenue: +c.revenue.toFixed(1),
        cogs: +c.cogs.toFixed(1),
        grossProfit: +c.grossProfit.toFixed(1),
        storeOpex: +c.storeOpex.toFixed(1),
        otherOpex: +c.otherOpex.toFixed(1),
        operatingIncome: +c.operatingIncome.toFixed(1),
        compStoreSales: consolidatedMargin, // consolidated Core OP margin % monthly estimate
        transactions: c.transactions > 0 ? +c.transactions.toFixed(0) : null,
        averageTicket: avgTicket,
      });
    }
  }

  await prisma.monthlyFinancial.createMany({ data: records });

  const quartersSeeded = QUARTERS.filter((q) => periodMap[q.label]).length;
  console.log(
    `Seeded ${records.length} Astellas Pharma monthly financial records ` +
    `(${quartersSeeded} quarters x 3 months x 6 segments including Consolidated)`,
  );
}
